---
name: ccc-seo-strategy-session
description: |
  The full strategy build / refresh orchestrator. Composes: tools-audit (refresh) → classify-urls → tools-plan with DataForSEO competitor SERP enrichment → dual-strategy tree generation → cluster index briefs → ideate-topics first pass (3 pillars × 3 silos × 3 sub-silos minimum, or BOFU/MOFU equivalent) → topic queue. Output: complete `00 - Strategy.md` with pillar tree + populated topic queue ready for `ccc-seo-publish-next` to consume. Two modes: `initial` (first build at onboarding) and `refresh` (quarterly evidence-based adjustment).
  Use this skill when an operator says "build the strategy", "strategy session", "generate the pillar tree", "create the topic queue", "refresh the strategy", or when `ccc-seo-onboard` recommends the next step or `ccc-seo-quarterly-review` decides a refresh is warranted.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: user-task-orchestrator
  composes:
    - ccc-seo-tools-audit
    - ccc-seo-classify-urls
    - ccc-seo-tools-plan
    - ccc-seo-ideate-topics
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
- `topic_count_per_silo` (optional, default 3) — sub-silo target count per silo for initial mode.
- `pillar_count` (optional, default 3) — pillar target count for initial mode.

## Procedure

### Stage 0 — Pre-flight

1. Verify client folder exists + onboarding is complete (read `00 - Strategy.md` frontmatter — focus, languages, locations should be set).
2. Read [[02 - Methodology|methodology]] §2 (dual strategy), §3 (company wikipedia pattern), §6.1 (keyword identification — 5 lenses) to ground the run.

### Stage 1 — Audit refresh

1. Invoke `ccc-seo-tools-audit` against the client domain.
2. In `initial` mode: produces a baseline if onboarding's audit is stale (>30 days).
3. In `refresh` mode: produces a fresh audit for trend comparison.
4. Capture audit summary — critical issues become priority constraints in planning.

### Stage 2 — URL classification

1. Invoke `ccc-seo-classify-urls`:
   - `initial` mode: full crawl + classify.
   - `refresh` mode: incremental refresh (only new/changed URLs).
2. Capture URL inventory + flagged-for-review items + pattern mismatches.

### Stage 3 — Competitor SERP enrichment

1. From `00 - Strategy.md` business overview, extract 5-8 primary KW seeds (for initial mode) OR pull existing pillar-level KWs (for refresh mode).
2. Run DataForSEO SERP queries against the seeds (with `language_code` + `location_code`).
3. Capture top-10 competitor URLs across queries. Top 5 most-frequent competitors become the analysis set.
4. For each competitor, fetch via Tavily Extract:
   - Library / hub URL pattern (do they have a `/library/`? `/resources/`? Other?).
   - Cluster count + content type mix (glossary-heavy? video-heavy? blog-only?).
   - Approximate article volume.
   - Branded series presence (video / podcast / report-series).
5. Persist competitor analysis to `_planning/competitors-{YYYY-MM-DD}.md` with structured findings.

### Stage 4 — Strategic plan generation

1. Invoke `ccc-seo-tools-plan` with:
   - Client context (loaded from vault).
   - Mode (`initial` / `refresh`).
   - Audit findings (from Stage 1).
   - URL inventory (from Stage 2).
   - Competitor enrichment (from Stage 3).
2. Capture the plan output at `_planning/plan-{YYYY-MM-DD}-{mode}.md`.

### Stage 5 — Operator review of strategy

**Operator checkpoint** (if interactive): operator reviews:
- Proposed pillar tree (Service) or BOFU/MOFU/TOFU funnel (Product).
- Per-pillar rationale.
- Recommended publishing cadence.
- Refresh-mode delta recommendations (which pillars to over-invest in, which to pause).

Operator can:
- Approve as-is.
- Modify (rename pillars, drop pillars, add pillars). Skill captures changes.
- Request alternative options (skill regenerates with the operator's feedback applied).

### Stage 6 — Pillar tree commit to Strategy.md

After operator approval, merge the approved pillar tree into `00 - Strategy.md`:
- Pillar list with rationale.
- Per-pillar: target KW, intent, expected silos.
- Cluster index page briefs (for Service strategy — every Pillar gets a real index page per methodology §3.4).

For Service: also create the Pillar files at `03 - Pillars/[Pillar Name].md` with topic frontmatter (status: queued, shape: pillar).

### Stage 7 — Cluster index briefs

For Service-strategy clients, every Pillar needs a real index page (not just a URL prefix). Generate cluster index briefs — these are "topic specs" for the Pillar pages themselves:
- Frontmatter: status: queued, shape: pillar, target_kw (the Pillar topic KW), language, location.
- Body: brief description + expected silos to cover.
- These get processed first by `ccc-seo-publish-next` in Phase 2+ — pillars before silos before sub-silos.

### Stage 8 — Topic ideation first pass

For each Pillar:
1. Invoke `ccc-seo-ideate-topics` with parent = Pillar, count = `pillar_count` × `topic_count_per_silo` (default 3 silos).
2. Each Silo lands as a topic file at `04 - Silos/[Pillar]/[Silo].md`.

For each generated Silo:
1. Invoke `ccc-seo-ideate-topics` with parent = Silo, count = `topic_count_per_silo` (default 3 sub-silos).
2. Each Sub-Silo lands at `05 - Sub-Silos/[Pillar]/[Silo]/[Sub-Silo].md`.

For Product strategy:
1. For each BOFU page (existing): invoke ideate-topics for MOFU children.
2. For each MOFU article: invoke ideate-topics for TOFU children.

End state: pillar count × 3 silos × 3 sub-silos = 27 topics queued (default). Plus 3 pillar topics. Total: 30 topics in queue.

### Stage 9 — Queue order in Strategy.md

Append all generated topics to the topic queue section in `00 - Strategy.md`:
- Order: Pillars first, Silos second, Sub-Silos third (BFS — pillars before deeper).
- Within each level: ordered by KW search volume × intent fit × cohort weighting (when available).
- Each entry: target KW, intent, parent silo, target word count (from shape), priority.

### Stage 10 — Operator review of queue

**Operator checkpoint** (if interactive): operator reviews:
- The topic queue (typically 30 topics).
- Operator can: approve, reorder priorities, defer specific topics, drop specific topics.

### Stage 11 — Strategy session report

Generate a `.docx` report at `_reports/strategy-sessions/{YYYY-MM-DD}.docx`:
- Strategy decision summary.
- Pillar tree visualisation.
- Topic queue (top 10 next-up).
- Competitor landscape findings.
- Audit findings affecting strategy.
- Recommended publishing cadence.
- For refresh mode: delta from prior strategy.

### Stage 12 — Return

```yaml
status: complete | partial | aborted
client: "[[Client]]"
mode: initial | refresh
strategy_path: "00 - Strategy.md"
plan_path: "_planning/plan-2026-04-30-initial.md"
competitors_path: "_planning/competitors-2026-04-30.md"
report_path: "_reports/strategy-sessions/2026-04-30.docx"
audit_critical: <int>
url_inventory_total: <int>
url_inventory_flagged: <int>
pillars_count: 3
silos_count: 9
sub_silos_count: 27
topic_queue_total: 39   # 3 pillars + 9 silos + 27 sub-silos
recommended_cadence: "2 articles/week"
recommended_next: "Start ccc-seo-publish-next on next-up topic in queue"
```

## Refresh mode specifics

In `refresh` mode (typically called after `ccc-seo-quarterly-review` decides a refresh is warranted):
- Stage 1: audit refresh produces trend deltas (resolved / persistent / new issues vs. baseline).
- Stage 2: URL classification incremental (only new/changed URLs).
- Stage 3: competitor enrichment refreshed (competitive landscape may have shifted).
- Stage 4: tools-plan in `refresh` mode produces a delta + recommendations rather than full re-plan.
- Stage 5: operator reviews recommendations specifically — what changes are approved.
- Stages 6-9: implement approved changes (rename / drop / add pillars; reorder topics; queue replacement topics for losers).
- Stage 10: queue review preserves manual priority overrides from prior runs.

The whole point of refresh: preserve what's working, change what isn't, based on the evidence from `winners-pattern.md` + `opportunities.md` + the audit deltas.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §2 (dual strategy framework — what this orchestrator implements), §3 (company wikipedia pattern — what the strategy targets), §6 (closed GSC learning loop — refresh mode reads its outputs).

Atomic skills composed:
- [[ccc-seo-tools-audit]]
- [[ccc-seo-classify-urls]]
- [[ccc-seo-tools-plan]]
- [[ccc-seo-ideate-topics]]

## Anti-patterns

- Do NOT skip the audit refresh in initial mode if onboarding's audit is >30 days old. Stale baselines produce theoretical plans.
- Do NOT skip operator review at Stage 5. Pillar tree decisions are strategic; operator owns them.
- Do NOT auto-commit pillar tree changes in refresh mode without operator approval. Refresh recommendations are recommendations.
- Do NOT generate sub-silos before silos. BFS order matters — operators publish pillars first to anchor topical authority.
- Do NOT skip Pillar files generation in Service mode. Cluster index pages are required (methodology §3.4).
- Do NOT use a Sub-Silo target count > 5 in initial mode without operator request. 3 sub-silos × 9 silos × 3 pillars = 27 sub-silos is already a substantial 12-week pipeline at 2 articles/week.
- Do NOT skip the cohort weighting hand-off to ideate-topics in refresh mode. Compounding depends on it.
