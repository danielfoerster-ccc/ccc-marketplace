---
name: ccc-seo-dashboard
description: |
  Generates a live HTML dashboard artifact (via mcp__cowork__create_artifact) for any CCC SEO client. The artifact persists across sessions and re-fetches data on load — pillar coverage, publishing queue, this-week action list, top movers, striking-distance keywords, per-platform AI citation counts + trend, cohort status, EEAT + GEO score distribution. One artifact per client. The visibility layer — what makes the suite's work visible to operators and (optionally) clients.
  Use this skill when an operator says "dashboard", "live dashboard", "client dashboard", "show me the state of [Client]", "build a dashboard", "weekly view", or wants a persistent visual surface that re-fetches client SEO data on each open. Run once per client at engagement maturity (typically after first 4 articles published — before that, dashboard is mostly empty placeholders).
allowed-tools: "Read, Write, Edit, Bash, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: artifact-generator
  artifact_type: live-html
distribution: ccc-internal
---

# ccc-seo-dashboard — Live Client Dashboard

**Workflow: Receive client → build self-contained HTML with embedded JS that calls connectors on load → save via create_artifact → return artifact link.**

## What this is

The visibility layer of the suite. A live HTML page that the operator (and optionally the client) opens any time. On every open, the page re-fetches GSC + reads vault frontmatter via `window.cowork.callMcpTool` and `window.cowork.askClaude` and renders the current state.

This is what makes the operation feel real to a non-technical operator: pillar coverage you can see, publishing queue you can see, top movers you can see, AI citation counts you can see — all current, all the time.

One dashboard per client. Operator regenerates after major changes (new pillars, new author, etc.) but doesn't need to regenerate weekly — the artifact's data refreshes itself.

## When to use

- After client has at least 4 articles published (before that, dashboard is mostly empty placeholders).
- Manual: operator wants a fresh dashboard for client review meetings.
- After strategy refresh: regenerate to reflect new pillar tree.

## Inputs

- `client` (required) — wikilink.
- `audience` (optional, default `operator`) — `operator` (full detail, all internals visible) or `client-facing` (curated for client review, no internals).

## Procedure

### Step 1 — Load client config

Read:
- `00 - Strategy.md` — focus, languages, pillar tree, library prefix.
- `02 - URL Inventory.md` — for URL counts.
- `10 - Publishing Log.md` — for published article list.
- `08 - GSC/opportunities.md` — for current opportunity queue.
- `11 - Cohorts/winners-pattern.md` — for cohort status + confidence.
- Latest `01 - Tech Audit/full-*.md` — for site health summary.
- Latest `08 - GSC/deltas/*.md` — for week-over-week trend.

### Step 2 — Compose the HTML

Build a self-contained HTML page. Use:
- Chart.js (CDN — allowed) for trend lines.
- Grid.js (CDN — allowed) for sortable tables.
- Inline CSS (no external stylesheets).
- Inline JS that calls `window.cowork.callMcpTool` for live data on page load.

Page sections (operator audience):

```html
<!-- Header -->
<header>
  <h1>{Client Name} — SEO Dashboard</h1>
  <p>Last refresh: <span id="refresh-time"></span></p>
  <p>Strategy: {Service / Product / Hybrid} · Languages: {list} · Library: {prefix}</p>
</header>

<!-- Section 1: Pillar Coverage Tree -->
<section id="pillar-coverage">
  <h2>Pillar Coverage</h2>
  <div id="pillar-tree">
    <!-- Rendered from vault frontmatter on load -->
    <!-- Each pillar shows: target KW, # silos, # sub-silos, last-published date, % published vs queued -->
  </div>
</section>

<!-- Section 2: Publishing Queue -->
<section id="queue">
  <h2>Publishing Queue (Top 10)</h2>
  <div id="queue-grid"></div>
  <!-- Sortable table: priority, target KW, shape, parent silo, intent, ETA -->
</section>

<!-- Section 3: This Week's Actions -->
<section id="actions">
  <h2>Top 3 Actions This Week</h2>
  <ol id="action-list"></ol>
  <!-- From opportunities.md, top 3 by priority -->
</section>

<!-- Section 4: Top Movers (last 7 days) -->
<section id="movers">
  <h2>Top Movers — Last 7 Days</h2>
  <div class="movers-grid">
    <div id="winners">
      <h3>↑ Winners</h3>
      <!-- Top 5 by position improvement -->
    </div>
    <div id="decliners">
      <h3>↓ Decliners</h3>
      <!-- Top 5 by position decline -->
    </div>
  </div>
</section>

<!-- Section 5: Striking Distance -->
<section id="striking-distance">
  <h2>Striking Distance Keywords (Position 8-20)</h2>
  <div id="sd-grid"></div>
  <!-- Sortable: KW, current position, impressions, URL, recommended action -->
</section>

<!-- Section 6: AI Citations Per Platform (Trend) -->
<section id="ai-citations">
  <h2>AI Citations — Per Platform</h2>
  <canvas id="citations-chart"></canvas>
  <!-- 5 lines: ChatGPT / AI Overviews / Perplexity / Gemini / Copilot — last 12 weeks -->
  <p>Total this week: <span id="citations-total"></span> · Last week: <span id="citations-prev"></span></p>
</section>

<!-- Section 7: Cohort Status -->
<section id="cohort">
  <h2>Cohort Learning Status</h2>
  <p>Status: <span id="cohort-status"></span> (n_winners: <span id="n-winners"></span>, n_losers: <span id="n-losers"></span>)</p>
  <p>Confidence: <span id="cohort-confidence"></span></p>
  <h3>Active Constraints (read by ccc-seo-write-article)</h3>
  <ul id="cohort-constraints"></ul>
</section>

<!-- Section 8: EEAT + GEO Score Distribution -->
<section id="quality-distribution">
  <h2>Quality Score Distribution</h2>
  <canvas id="eeat-histogram"></canvas>
  <canvas id="geo-histogram"></canvas>
  <!-- Histograms across all published articles -->
</section>

<!-- Section 9: Site Health Summary -->
<section id="site-health">
  <h2>Site Health (Last Audit)</h2>
  <div id="health-summary"></div>
  <!-- Critical / High / Medium / Low issue counts + trend vs prior audit -->
</section>
```

### Step 3 — Embed live-fetch JavaScript

The artifact's embedded JS runs on page load:

```js
async function loadDashboard() {
  // 1. Read vault frontmatter via callMcpTool
  const strategyData = await window.cowork.callMcpTool('read_file', { 
    path: '03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/{Client}/SEO/00 - Strategy.md' 
  });
  // ... parse, render pillar tree

  // 2. Read publishing log
  const logData = await window.cowork.callMcpTool('read_file', { 
    path: '03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/{Client}/SEO/10 - Publishing Log.md' 
  });
  // ... parse rows, render queue

  // 3. Read opportunities
  const oppsData = await window.cowork.callMcpTool('read_file', { 
    path: '03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/{Client}/SEO/08 - GSC/opportunities.md' 
  });
  // ... parse, render top 3

  // 4. Pull fresh GSC data via connector
  const gscData = await window.cowork.callMcpTool('gsc_query', { 
    site: '{client_domain}', 
    days: 7 
  });
  // ... compute movers + striking distance

  // 5. Read cohort winners-pattern
  const cohortData = await window.cowork.callMcpTool('read_file', { 
    path: '03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/{Client}/SEO/11 - Cohorts/winners-pattern.md' 
  });
  // ... parse, render cohort status

  // 6. Read recent audit
  const auditData = await window.cowork.callMcpTool('read_file', { 
    path: '03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/{Client}/SEO/01 - Tech Audit/' 
  });
  // ... find latest, render

  // 7. Update refresh time
  document.getElementById('refresh-time').textContent = new Date().toLocaleString();
}

// Run on load
loadDashboard();

// localStorage for filter/sort persistence
window.addEventListener('DOMContentLoaded', () => {
  const savedFilters = localStorage.getItem('ccc-seo-{Client}-filters');
  if (savedFilters) applyFilters(JSON.parse(savedFilters));
});
```

### Step 4 — Audience-aware variants

If `audience: client-facing`:
- Hide: cohort confidence levels, internal linking diagnostics, raw EEAT/GEO breakdowns, audit category drill-downs.
- Show: pillar coverage, published article count, top movers (winners only — decliners hidden), AI citations trend, "what's coming" queue (top 3 only).
- Tone: outcome-focused. "Articles published this quarter," "Average ranking position improvement," "AI citations per platform."

If `audience: operator` (default):
- Show everything per the section list above.

### Step 5 — Save via create_artifact

Use `mcp__cowork__create_artifact` with:
- Title: `{Client} SEO Dashboard ({audience})`
- Body: the assembled HTML with embedded JS
- mcp_tools: list of tool names the embedded JS will call (read_file + gsc connector tool names)

Capture the artifact link.

### Step 6 — Return

```yaml
status: created | updated
client: "[[Client]]"
audience: operator | client-facing
artifact_link: <link returned by create_artifact>
sections_rendered:
  - pillar-coverage
  - publishing-queue
  - actions
  - movers
  - striking-distance
  - ai-citations
  - cohort
  - quality-distribution
  - site-health
notes:
  - "Re-fetches data on each open via window.cowork.callMcpTool"
  - "localStorage persists filter/sort choices across sessions"
  - "Run once per client; regenerate after major strategy changes"
```

## Operator usage pattern

After running this skill once for a client, the artifact persists. Operator can:
- Open the artifact any time → fresh data renders.
- Bookmark the artifact link → quick access.
- Share the `client-facing` variant with the client (operator decision — careful with what's exposed).

## Audience-handling note

Be careful with `client-facing` mode. Internal cohort confidence numbers and audit drill-downs are operator-only. Sharing operator-mode dashboards with clients can create confusion ("what does eeat_score: 64 mean?"). Always default to `client-facing` mode when client review is the audience.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §10.2 (operator's mental model — dashboard as the visibility layer).

Cowork artifact docs (system prompt): the `mcp__cowork__create_artifact` tool saves a self-contained HTML page that persists across sessions and pulls fresh data from the user's connectors each time it's opened. `window.cowork.callMcpTool(name, args)` calls any connector tool. `window.cowork.askClaude(prompt, data[])` runs Haiku inference for summaries.

## Anti-patterns

- Do NOT bake static data into the artifact. The whole point is live re-fetch on open.
- Do NOT include credentials in the artifact body. Connectors handle auth via the MCP layer; the artifact just calls the tools.
- Do NOT use external CSS/JS beyond Chart.js + Grid.js + Mermaid (the only allowed CDNs per Cowork artifact rules).
- Do NOT use localStorage for any data that should be in the vault. localStorage is for UI state (filter/sort), not strategic state.
- Do NOT default to `operator` mode when client review is the audience. Audience mismatch is the most common dashboard mistake.
- Do NOT regenerate the dashboard weekly. The data refreshes itself on each open. Regenerate only after strategy changes / new pillars / audience shift.
