---
name: ccc-seo-tools-optimize
description: |
  GSC-driven SEO optimization. Pulls Google Search Console data, runs 8 analysis modes (striking distance, low-CTR, cannibalization, decline, trends, content gaps, quick wins, top-performers-at-risk), persists snapshots to the client's `08 - GSC/` folder. The closed-loop analysis half — what `ccc-seo-trigger-rewrite` reads to decide what to act on. Wraps the BenAI marketplace skill seo:seo-optimize with full CCC extension: per-client GSC credentials routing, vault snapshot persistence with weekly cadence files, before/after comparisons across runs, integration with article frontmatter for cohort attribution.
  Use this skill when an operator says "GSC pull", "weekly GSC review", "striking distance", "find quick wins", "low CTR pages", "keyword cannibalization", "declining pages", "GSC opportunities", "search performance review", or when `ccc-seo-weekly-review` orchestrator runs its scheduled weekly cadence.
allowed-tools: "Read, Write, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-optimize (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: full-extension
  ccc_role: gsc-loop-analysis
distribution: ccc-internal
---

# ccc-seo-tools-optimize — GSC Pull + 8 Analysis Modes

**Workflow: Receive client → pull GSC → run all 8 analysis modes → persist snapshots → integrate with publishing log → return action queue input.**

## What this is

The GSC closed-loop analysis layer. Wraps `seo:seo-optimize` (which ships ~148 KB of analysis playbooks across 8 modes) with the CCC integration layer: per-client credentials, vault snapshot persistence with weekly cadence, before/after comparisons across runs, and direct hand-off into the article frontmatter cohort attribution flow.

Replaces my earlier proposed `gsc-pull` + `gsc-delta` atomic skills — the marketplace skill covers both natively, so wrapping is sufficient.

## When to use

- Weekly: called by `ccc-seo-weekly-review` orchestrator on its scheduled cadence
- Quarterly: called by `ccc-seo-quarterly-review` for a deeper longitudinal analysis
- Manual: operator wants ad-hoc GSC analysis (specific mode, specific date range)
- Diagnostic: when GSC anomalies surface, run a single mode to investigate

## The 8 analysis modes

Inherited from `seo:seo-optimize`. Each surfaces a different category of opportunity.

| Mode | Surfaces | Primary use |
|---|---|---|
| Striking distance | Keywords ranking position 8–20 | **Highest-ROI rewrite targets.** Small effort, big rank gain. |
| Low-CTR | Pages with high impressions + low CTR | Title / meta / hero rewrites. Indicates packaging miss, not content miss. |
| Cannibalization | Multiple URLs competing for same query | Consolidate, differentiate, or add canonical. |
| Decline | Pages losing position week-over-week | Cause analysis: algorithm? Content drift? Crawl issue? |
| Trends | Aggregate week-over-week movement (clicks, impressions, position) | Health check. Surface anomalies. |
| Content gaps | Top-10 covers query, we appear nowhere | Priority new article candidates → topic queue. |
| Quick wins | Multi-factor heuristic: striking-distance + decent volume + low effort | Operator's "do these now" list. |
| Top performers at risk | Top-3 pages showing early decline signals | Defensive plays — don't lose what's working. |

## Procedure

1. **Receive inputs:**
   - `client` (required) — wikilink to a CCC client
   - `mode` (optional) — specific mode (`striking-distance`, `low-ctr`, etc.) OR `all` (default)
   - `date_range` (optional) — defaults to last 28 days
   - `compare_to_previous` (optional, default true) — if true, compute deltas vs. prior run

2. **Read client config:**
   - GSC property URL from `00 - Strategy.md` frontmatter
   - GSC service account credentials (from Cowork connector OR fallback path)
   - Site library prefix
   - Languages + locations

3. **Invoke `seo:seo-optimize`** for each requested mode. Pass language + location config.

4. **Persist raw GSC pull:**
   - Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/08 - GSC/pulls/{YYYY-Www}.csv`
   - Contains: query, page, clicks, impressions, CTR, position. Filtered to last 28 days.

5. **Persist analysis output:**
   - Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/08 - GSC/deltas/{YYYY-Www}.md`
   - Frontmatter: type, client, week, modes_run, generated_by
   - Body: one section per mode, structured as `seo:seo-optimize` outputs them. Include sortable tables.

6. **Compare to previous (if available):**
   - Find the most recent prior `deltas/` file for this client.
   - Compute changes per mode (e.g., striking-distance keywords gained / lost / moved up / moved down).
   - Surface in a "Week-over-Week Changes" section at the top of the new deltas file.

7. **Update opportunities queue:**
   - Read existing `08 - GSC/opportunities.md`.
   - For each mode's findings, propose new opportunity entries (or mark existing ones as resolved/superseded).
   - **Do NOT auto-write the queue updates** — return them as a proposal that `ccc-seo-trigger-rewrite` decides on. Separation of analysis (this skill) from decision (trigger-rewrite skill).

8. **Article-level GSC backfill (cohort-attribution prep):**
   - For each article in `06 - Articles/` aged ≥ 30 / 60 / 90 / 180 days that has a `null` GSC snapshot at that age, attempt to fill it from this pull.
   - Match on `wp_url` (canonical URL stored in article frontmatter at publish time).
   - Update article frontmatter: `gsc.d30:`, `gsc.d60:`, `gsc.d90:`, `gsc.d180:` with `{clicks, imp, ctr, pos}`.
   - This is what makes `ccc-seo-analyze-cohort` (Phase 4) work — without this backfill at every weekly run, cohort data is gappy.

9. **Return** structured result:
   ```yaml
   client: "[[Client]]"
   week: "2026-W18"
   modes_run: ["all"]
   pull_path: "08 - GSC/pulls/2026-W18.csv"
   deltas_path: "08 - GSC/deltas/2026-W18.md"
   opportunities_proposed:
     striking_distance: [<list of new candidates>]
     low_ctr: [<list>]
     cannibalization: [<list>]
     decline: [<list>]
     content_gaps: [<list>]
     quick_wins: [<list>]
     top_performers_at_risk: [<list>]
   articles_backfilled: <int>  # how many article frontmatter snapshots were filled
   ```

## Special handling — first run

On the first run for a client (no prior `deltas/` file), skip the comparison step. The first run establishes the baseline. Subsequent runs compute deltas against it.

## Special handling — multi-language clients

GSC properties typically aggregate across all locales served from one domain. For multi-language clients:
- The pull is unfiltered (all languages combined).
- Per-language analysis runs as a follow-up: filter the pull data by URL pattern (e.g., `/de/` vs `/en/`), run each mode per language slice, persist as `08 - GSC/deltas/{YYYY-Www}-{lang}.md`.
- The aggregate file (`{YYYY-Www}.md`) and per-language files coexist; `ccc-seo-trigger-rewrite` reads the per-language files for language-specific opportunity prioritisation.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6.1 (keyword identification — 5 lenses, first three covered by this skill), §6.2 (cohort learning — frontmatter backfill is what feeds the analyser).

Marketplace skill source: `seo:seo-optimize` (BenAI). Ships ~148 KB of analysis playbooks (`analysis-playbooks.md` is 53 KB alone). The wrapper does NOT modify those playbooks — they're production-grade SEO ops methodology and should be treated as the source of truth for HOW each mode works.

## Anti-patterns

- Do NOT skip the article frontmatter backfill (step 8). Without it, cohort analysis breaks.
- Do NOT auto-write opportunities to `opportunities.md` from this skill. The analysis surfaces opportunities; the decision lives in `ccc-seo-trigger-rewrite`.
- Do NOT report aggregate "AI citation" or "performance" metrics — keep modes separate. Aggregating loses the signal each mode is designed to surface.
- Do NOT modify the marketplace skill's mode definitions. CCC behaviour lives at the integration layer (vault persistence + cohort backfill + opportunities proposal), not at the analysis layer.
