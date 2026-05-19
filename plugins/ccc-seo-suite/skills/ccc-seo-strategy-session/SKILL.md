---
name: ccc-seo-strategy-session
description: |
  The full strategy build / refresh orchestrator. Composes: tools-audit (refresh) → classify-urls → tools-plan with DataForSEO competitor SERP enrichment → dual-strategy tree generation → cluster index briefs → ideate-topics first pass (3 pillars × 3 silos × 3 sub-silos minimum, or BOFU/MOFU equivalent) → topic queue. Output: complete `00 - Strategy.md` with pillar tree + populated topic queue ready for `ccc-seo-publish-next` to consume. Two modes: `initial` (first build at onboarding) and `refresh` (quarterly evidence-based adjustment).
  Use this skill when an operator says "build the strategy", "strategy session", "generate the pillar tree", "create the topic queue", "refresh the strategy", or when `ccc-seo-onboard` recommends the next step or `ccc-seo-quarterly-review` decides a refresh is warranted.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.2.0
  layer: orchestration-surface
  category: user-task-orchestrator
  composes:
    - ccc-seo-tools-audit
    - ccc-seo-classify-urls
    - ccc-seo-tools-plan
    - ccc-seo-ideate-topics
  shared_libs:
    - _lib/dataforseo-client.js
    - _lib/docx-helpers.js
distribution: ccc-internal
---

# ccc-seo-strategy-session — The Strategy Builder

**Workflow: Audit → classify → plan → generate tree → ideate topics → populate queue.**

## What this is

The strategy build orchestrator. After onboarding captures who-the-client-is + how-they-operate, this skill builds what-they're-going-to-publish. End state: a populated pillar tree + topic queue ready for `ccc-seo-publish-next` to start producing articles.

Two modes:
- **`initial`** — first strategy build at onboarding. From-scratch pillar tree generation.
- **`refresh`** — quarterly refresh against accumulated evidence (GSC opportunities, cohort patterns, audit deltas). Delta + recommendations rather than full re-plan.

## When to use

- After `ccc-seo-onboard` completes (initial mode).
- After `ccc-seo-quarterly-review` decides a strategy refresh is warranted (refresh mode — only when accumulated evidence justifies it; not auto-quarterly).
- Manual: operator wants an ad-hoc strategy refresh (rare — usually fits naturally with quarterly cadence).

## Inputs

- `client` (required) — wikilink.
- `mode` (optional) — `initial` (default) or `refresh`.
- `interactive` (optional, default true).
- `topic_count_per_silo` (optional, default 3) — sub-silo target count per silo for initial mode. **Warning: > 3 produces a very long pipeline** (5 sub-silos × 3 silos × 5 pillars = 75 sub-silos = ~22 months at 1/week). Use > 3 only on explicit operator request.
- `pillar_count` (optional, default 3) — pillar target count for initial mode.
- `prioritization_strategy` (optional, default `quick-win`) — how the topic-queue is ordered:
  - `quick-win` — Pillar with weakest brand-competition first (best for Greenfield / new sites < 6 months — conversion-intent beats volume)
  - `volume-first` — Pillar with highest aggregate KW-volume first (best for sites with existing domain authority)
  - `hybrid` — alternate top-2 pillars; dilutes compounding, use sparingly
  - `manual` — operator orders the queue by hand post-generation
  See Stage 5 for the decision-tree.

## Procedure

### Stage 0 — Pre-flight

1. Verify client folder exists + onboarding is complete (read `00 - Strategy.md` frontmatter — focus, languages, locations should be set).
2. **DataForSEO availability check** — confirm credentials present. If missing → STOP, this skill cannot run without DataForSEO (Stages 3, 3a, 8 all depend on it). Use `_lib/dataforseo-client.js` `userInfo()` for a zero-cost auth check.
3. Read [[02 - Methodology|methodology]] §2 (dual strategy), §3 (company wikipedia pattern), §6.1 (keyword identification — 5 lenses) to ground the run.

### Stage 1 — Audit refresh

1. **Audit-staleness check first.** Look at the most recent file in `01 - Tech Audit/`. If its date is **within the last 7 days**, the audit is fresh — skip the re-run, link-reference the existing audit, and proceed to Stage 2. Re-auditing a site that was audited days ago wastes time and (if CWV) money. (This was a friction point in the first engagement — onboarding's audit was hours old and the skill re-ran it anyway.)
2. If the most recent audit is **older than 30 days** (or absent): invoke `ccc-seo-tools-audit`.
3. In `refresh` mode: always produce a fresh audit regardless of age — trend comparison needs the current snapshot.
4. Capture audit summary — critical issues become priority constraints in planning.

### Stage 2 — URL classification

1. Invoke `ccc-seo-classify-urls`:
   - `initial` mode: full crawl + classify.
   - `refresh` mode: incremental refresh (only new/changed URLs).
2. Capture URL inventory + flagged-for-review items + pattern mismatches.

### Stage 3 — Competitor SERP enrichment

1. From `00 - Strategy.md` business overview, extract 5-8 primary KW seeds (for initial mode) OR pull existing pillar-level KWs (for refresh mode).
2. Run DataForSEO SERP queries against the seeds (with `language_code` + `location_code`).
   - **Use `_lib/dataforseo-client.js`** — its `serpBulk()` handles the parallel-call pattern (the Live-Advanced endpoint accepts only 1 task per call, so N seeds = N parallel calls) and auto-logs cost to `_planning/dataforseo-spend-log.md`.
3. Capture top-10 competitor URLs across queries. Top 5 most-frequent competitors become the analysis set.
4. For each competitor, fetch via Tavily Extract (fallback: `curl` if Tavily unavailable):
   - Library / hub URL pattern (do they have a `/library/`? `/resources/`? Other?).
   - Cluster count + content type mix (glossary-heavy? video-heavy? blog-only?).
   - Approximate article volume (sitemap URL-count is a fast proxy).
   - Branded series presence (video / podcast / report-series).
5. Persist competitor analysis to `_planning/competitors-{YYYY-MM-DD}.md` with structured findings.

### Stage 3a — Brand-Term Reality Check  *(added v0.2.0 — mandatory)*

**This stage is non-negotiable. Skipping it risks building an entire pillar against the wrong SERP.**

The client's strategic brand-term may mean something completely different in Google than in the client's head. In the first engagement, the client's brand-term "Verantwortungsvolle Männlichkeit" turned out to be SERP-occupied by NGOs (Plan International, Heinrich Böll Stiftung) and political discourse — not coaching. Building a pillar named after that term would have meant 19 topics competing against organisations we cannot outrank, in a content-field that isn't even ours.

Procedure:
1. Extract from `00 - Strategy.md` frontmatter the client's `brand_term` (and any `brand_term_internal` / strategic positioning phrase from the Business Overview).
2. Run a dedicated SERP query for each brand-term via `_lib/dataforseo-client.js`.
3. **Disconnect heuristic:** examine the top-5 organic results. Do they belong to the client's actual competitive field (coaching / consulting / the client's industry)? Or to an adjacent-but-wrong field (NGO / politics / academia / news / government)?
   - If top-5 are field-appropriate → brand-term is SEO-safe, can be a pillar/silo target.
   - If top-5 are wrong-field → **DISCONNECT FLAG.** The brand-term must NOT be used as a pillar/silo/sub-silo target keyword. The client keeps the term internally; the SEO-pillar gets a different, field-appropriate name.
4. Persist the check to `_planning/brand-term-reality-check-{YYYY-MM-DD}.md` with the decision documented.
5. **If a DISCONNECT FLAG fires:** surface it to the operator at Stage 5 explicitly, with 2-3 alternative pillar-term options and their SERP-realities. The operator decides the rename. The client must be told about the rename transparently (this becomes a line item in the `ccc-seo-client-handoff` strategy-review doc).

### Stage 4 — Strategic plan generation

1. Invoke `ccc-seo-tools-plan` with:
   - Client context (loaded from vault).
   - Mode (`initial` / `refresh`).
   - Audit findings (from Stage 1).
   - URL inventory (from Stage 2).
   - Competitor enrichment (from Stage 3).
2. Capture the plan output at `_planning/plan-{YYYY-MM-DD}-{mode}.md`.

### Stage 5 — Operator review of strategy + prioritization decision

**Operator checkpoint** (if interactive): operator reviews:
- Proposed pillar tree (Service) or BOFU/MOFU/TOFU funnel (Product).
- Per-pillar rationale.
- **Brand-Term Reality-Check result** (from Stage 3a) — if a DISCONNECT FLAG fired, present the rename decision here with 2-3 alternative pillar-term options.
- Recommended publishing cadence.
- Refresh-mode delta recommendations (which pillars to over-invest in, which to pause).

Operator can:
- Approve as-is.
- Modify (rename pillars, drop pillars, add pillars). Skill captures changes.
- Request alternative options (skill regenerates with the operator's feedback applied).

#### Prioritization-Strategy decision

The `prioritization_strategy` input determines pillar-publishing-order. Walk the operator through this decision-tree if they haven't pre-set it:

| Client situation | Recommended strategy | Why |
|------------------|---------------------|-----|
| Greenfield site, < 6 months old, no domain authority | **`quick-win`** | Conversion-intent beats raw volume. Start with the pillar whose SERP has the weakest brand-competition — fastest path to first rankings + first leads. Volume in the Ads-tool under-counts PAA-long-tail anyway. |
| Established site, existing rankings, domain authority present | **`volume-first`** | Authority can absorb harder SERPs. Lead with the highest-aggregate-volume pillar to maximise traffic-capture. |
| Operator explicitly wants risk-spreading across two themes | **`hybrid`** | Acceptable but dilutes per-pillar compounding (internal-linking + cohort-attribution need cluster-depth). Use sparingly. |
| Operator has strong domain-specific intuition | **`manual`** | Operator hand-orders the queue post-generation. |

**The recommendation is a recommendation.** Operator owns the call. Document the chosen strategy + rationale in `00 - Strategy.md` Decisions-Log.

Note from the first engagement: the operator can override the *recommendation* but should hear the reasoning. Kai Reichel's run had a volume-champion pillar (Midlife, 8,100/mo) tempting a `volume-first` switch — but `quick-win` (Trennung pillar, weak brand-competition + acute-pain searchers) was the right call for a Greenfield coaching site. Volume ≠ conversions.

### Stage 6 — Pillar tree commit to Strategy.md

After operator approval, merge the approve