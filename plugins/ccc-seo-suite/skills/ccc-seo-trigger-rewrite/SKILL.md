---
name: ccc-seo-trigger-rewrite
description: |
  The decision layer of the closed GSC loop. Reads `ccc-seo-tools-optimize` outputs (8 modes' findings) + the publishing log + cohort patterns (when available) and decides per opportunity what to do: rewrite an existing article, queue a new article, batch internal links, defer, or ignore. Updates `08 - GSC/opportunities.md` with the action queue. The analysis surfaces opportunities; THIS skill decides what to act on. Decision-making logic in v0.1 is heuristic-based; Phase 4 hooks in cohort patterns for evidence-based prioritisation.
  Use this skill when an operator says "what should I act on", "prioritise opportunities", "update the action queue", "what's next", or when `ccc-seo-weekly-review` orchestrator runs its weekly cadence after `ccc-seo-tools-optimize`.
allowed-tools: "Read, Write, Edit, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: atomic-substrate
  category: novel-ccc
  ccc_role: gsc-loop-decision
distribution: ccc-internal
---

# ccc-seo-trigger-rewrite — Decision Layer

**Workflow: Receive opportunities proposal → score per opportunity → assign action → update opportunities.md queue.**

## What this is

The decision skill in the closed GSC loop. `ccc-seo-tools-optimize` analyses; this skill decides. Separating analysis from decision keeps each skill testable and lets the decision logic evolve independently of the analysis modes.

In v0.1, decision logic is heuristic-based (rule-driven). Phase 4 will hook cohort patterns in: "this client's winners had X feature, so opportunities matching X get higher priority."

## When to use

- Mandatory step in `ccc-seo-weekly-review` after `ccc-seo-tools-optimize`.
- Manual: operator wants to re-prioritise opportunities after manually updating `opportunities.md`.
- Quarterly: called by `ccc-seo-quarterly-review` for a deeper re-prioritisation against d180 cohort patterns (Phase 4+).

## Inputs

- `client` (required) — wikilink.
- `opportunities_proposal` (optional) — direct from `ccc-seo-tools-optimize` return value. If absent, read from latest `08 - GSC/deltas/{week}.md`.
- `mode` (optional) — `weekly` (default — uses d30 cohort signals when available) or `quarterly` (uses d90 + d180 patterns).

## Procedure

### Step 1 — Load context

Read:
- The opportunities proposal (each mode's findings).
- Existing `08 - GSC/opportunities.md` (current queue + history).
- `10 - Publishing Log.md` (what's been published recently — affects "rewrite vs new" decisions).
- `00 - Strategy.md` (pillar tree — affects "fits our strategy" filtering).
- `11 - Cohorts/winners-pattern.md` if available (drives priority weighting in mode=quarterly or when winners-pattern is well-populated).
- `02 - URL Inventory.md` (for cannibalization decisions — which URL is canonical).

### Step 2 — Score each opportunity

For each opportunity from each mode, compute a priority score based on heuristics:

**Striking distance:**
- Position 8-12 + decent volume (>100 monthly impressions) + matches a published article = **Highest priority rewrite**.
- Position 13-20 + decent volume + matches a published article = **High priority rewrite**.
- Position 8-20 + low volume = **Medium priority rewrite or defer**.

**Low-CTR:**
- High impressions (>500/mo) + CTR <2% + position top 10 = **Highest priority — title/meta rewrite, not full article rewrite**.
- Decision: action type is `meta-rewrite` rather than `article-rewrite`. Cheaper, faster.

**Cannibalization:**
- Two URLs competing for same query, one significantly better = **Add canonical from weaker to stronger**.
- Two URLs competing, both decent = **Manual review** (operator decides whether to consolidate or differentiate).
- Three+ URLs competing = **Strategic review** (likely a strategy bug — surface to operator).

**Decline:**
- Drop of 5+ positions week-over-week + decent prior performance = **High priority — investigate cause first**.
- Drop of 1-4 positions = **Monitor, do not act unless pattern persists 3+ weeks**.
- Steady decline over 4+ weeks = **High priority — content refresh + republish**.

**Content gaps:**
- Top 10 covers query, we're absent + matches an existing pillar/silo = **High priority — queue for topic ideation**.
- Top 10 covers query, we're absent + would require new pillar/silo = **Strategic review** (operator decides whether to expand).
- Low volume gap = **Defer**.

**Quick wins:**
- Always **Highest priority** by definition (the heuristic already filtered).

**Top performers at risk:**
- Top-3 page showing decline signal = **High priority — defensive refresh**.

### Step 3 — Assign action type

Each opportunity gets one of:
- `article-rewrite` — full article rewrite via `ccc-seo-write-article` mode=rewrite + republish via `ccc-seo-publish-wp` mode=update.
- `meta-rewrite` — title + meta description only. Lighter operation; doesn't need full write skill.
- `new-article` — queue for topic ideation → research-brief → write → publish.
- `internal-link-batch` — `ccc-seo-link-internal` adds inbound links to a struggling article.
- `canonical-add` — set canonical from weaker URL to stronger URL.
- `manual-review` — flagged for operator attention; no automated action.
- `strategic-review` — flagged for next strategy session; affects pillar tree decisions.
- `defer` — opportunity exists but ROI doesn't justify acting now. Re-evaluated next week.
- `monitor` — observation only; act only if pattern persists.

### Step 4 — Apply cohort weighting (when available)

If `winners-pattern.md` has data (status ≠ `insufficient-data`), boost priorities for opportunities matching winner features:
- Opportunity is in a winner parent_silo? → boost priority.
- Opportunity is for a shape that the cohort shows wins on this site? → boost.
- Opportunity is for an intent that the cohort shows wins? → boost.

Reduce priorities for opportunities matching loser features (rare — usually decline/cannibalization rather than ideation, but applies to new-article candidates from content gaps).

### Step 5 — Apply business filters

Reject opportunities that:
- Don't match the strategy focus (Service-strategy clients shouldn't queue product-page rewrites unless they have e-commerce; Product-strategy clients shouldn't queue ideation for off-funnel TOFU at scale).
- Match URLs explicitly excluded from SEO scope (operator can mark URLs as `seo_excluded: true` in URL Inventory).
- Are duplicates of already-queued items (don't re-queue the same striking-distance opportunity week-over-week without pause).

### Step 6 — Update opportunities.md

Append/update entries. Each entry:
```
| Type | URL / KW | Current Position | Opportunity | Recommended Action | Priority | Status | Date Added |
|---|---|---|---|---|---|---|---|
| striking-distance | /library/.../efflorescence-removal/ | #14 | KW "efflorescence removal" | article-rewrite | High | Queued | 2026-04-30 |
```

Move resolved opportunities to History section (don't delete — needed for cohort attribution).

For new opportunities surfaced this run that weren't in last week's: add to top of queue with `Date Added: <today>`.

For opportunities resolved this run: update Status to `Resolved`, add `Date Resolved` and `Outcome` columns.

For opportunities that re-surface: increment a counter in their entry (so an opportunity that's been queued 4 weeks running shows up clearly).

### Step 7 — Return

Return:
```yaml
client: "[[Client]]"
week: "2026-W18"
new_opportunities: <int>
resolved_opportunities: <int>
queued_actions:
  article-rewrite: [<entries>]
  meta-rewrite: [<entries>]
  new-article: [<entries>]
  internal-link-batch: [<entries>]
  canonical-add: [<entries>]
manual_reviews: <int>     # ops attention required
strategic_reviews: <int>  # next strategy session attention
top_3_actions: [<top 3 by priority — what operator should act on this week>]
```

## v0.1 vs Phase 4 evolution

v0.1 = heuristic decisions (volume + position rules + simple cohort boost when winners-pattern populated).

Phase 4 enhancement = cohort-evidence-driven decisions. Once `ccc-seo-analyze-cohort` produces high-confidence winner patterns, the priority boosts become quantified ("opportunities matching winner-shape `glossary` get +30% priority because winners cohort showed glossary wins 2.4x more often than other shapes on this site"). The decision logic stays in this skill; the evidence comes from cohort.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6.1 (keyword identification — what `ccc-seo-tools-optimize` surfaces), §6.2 (cohort learning — Phase 4 enhancement source).

## Anti-patterns

- Do NOT auto-execute actions. This skill DECIDES; orchestrators (and the operator) EXECUTE. Separation of decision from execution.
- Do NOT silently re-queue the same opportunity week after week without surfacing it. Opportunities that recur 3+ weeks signal a deeper issue.
- Do NOT delete resolved opportunities from `opportunities.md`. History is needed for cohort attribution + retrospective.
- Do NOT use cohort boosts before winners-pattern has confidence (status ≠ `insufficient-data`). Falsely confident decisions on n=2 cohorts produce noise.
- Do NOT bypass business filters. Off-strategy opportunities don't get queued, even if they look promising.
