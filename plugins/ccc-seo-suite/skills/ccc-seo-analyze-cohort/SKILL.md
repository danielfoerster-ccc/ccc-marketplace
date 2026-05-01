---
name: ccc-seo-analyze-cohort
description: |
  The cohort attribution engine. The compounding mechanism's load-bearing skill. Reads publishing log + GSC time-series + AI-citation history. Partitions articles into winners (top quartile by clicks at d90) vs. losers (bottom quartile). Computes feature averages per cohort. Writes `winners-pattern.md` — the file `ccc-seo-write-article` reads on every call as a system-prompt constraint. Three cadences: d30 weekly (quick signals), d90 monthly (the cohort that updates winners-pattern), d180 quarterly (longitudinal confirmation). PRE-SUITE-CONTENT AWARE: handles articles missing full suite frontmatter (publishes from previous agency / pre-deployment work) by partitioning pre-suite vs. suite-published cohorts; both produce useful pattern signal.
  Use this skill when an operator says "cohort analysis", "what's working", "winner pattern", "what features predict winners", or when `ccc-seo-weekly-review` runs the d30 quick-signal pass, or `ccc-seo-quarterly-review` runs the d90 + d180 passes.
allowed-tools: "Read, Write, Edit, Bash, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: atomic-substrate
  category: novel-ccc
  ccc_role: compounding-engine
distribution: ccc-internal
---

# ccc-seo-analyze-cohort — Cohort Attribution Engine

**Workflow: Receive cadence → load articles + GSC + AI citations → partition winners/losers → compute feature deltas → write winners-pattern.**

## What this is

The differentiator. Most AI SEO systems plateau because they treat each article as isolated production — never learning from what worked. This skill reads what worked on THIS specific client's site and translates it into constraints the writer reads on every subsequent call.

After 12 weeks of running, the suite writes article 13 with empirical evidence of what won on articles 1–12. After 24 weeks, article 25 inherits the lessons of 24. **This is what compounds.**

## When to use

- **`ccc-seo-weekly-review`** runs the d30 quick-signal pass on articles aged 30–60 days.
- **`ccc-seo-quarterly-review`** runs the d90 + d180 passes monthly + quarterly.
- Manual: operator wants to inspect cohort state mid-cycle.

## Inputs

- `client` (required) — wikilink.
- `cadence` (required) — `d30` (weekly quick-signal) or `d90` (monthly cohort attribution — updates winners-pattern.md) or `d180` (quarterly longitudinal confirmation).
- `min_n_per_partition` (optional, default 9) — minimum article count per cohort partition before producing winner pattern. If below, writes `status: insufficient-data`.

## Procedure

### Step 1 — Load context

Read:
- `10 - Publishing Log.md` — the publish history.
- `06 - Articles/` — all article frontmatter (suite-published).
- `08 - GSC/pulls/` — GSC history (last N weeks).
- `08 - GSC/deltas/` — per-week analysis (for AI citation history if tracked there).
- `02 - URL Inventory.md` — for pre-suite-content articles (those without `06 - Articles/` entries).
- Existing `11 - Cohorts/winners-pattern.md` (current state).

### Step 2 — Build the article cohort

Two sources:

**Suite-published (canonical cohort):**
- Articles in `06 - Articles/` with `status: published`.
- Each has full frontmatter: `shape`, `language`, `parent_silo`, `target_kw`, `intent`, `ymyl`, `author`, `word_count`, `h2_count`, `faq_count`, `internal_links_in/out`, `cross_cluster_links_out`, `schema`, `eeat_score`, `geo_score`, `publish_date`, plus `gsc.dN` snapshots.

**Pre-suite (auxiliary cohort):**
- Articles classified in `02 - URL Inventory.md` as `pillar`/`silo`/`sub-silo` etc. but NOT in `06 - Articles/`.
- These have partial frontmatter (URL, classification, cluster, possibly publish date from sitemap).
- For these, derive what we can:
  - Word count: fetch via Tavily Extract.
  - H2 count: same.
  - FAQ block presence (yes/no): same.
  - Author byline (yes/no): same.
  - Schema types: GET the URL, parse JSON-LD.
  - GSC data: from the GSC pull (matched on URL).
  - Per-platform AI citations: from any AI citation tracking source.

The pre-suite cohort gives us pattern signal even from content the suite didn't produce. This is what makes rescue-mode-then-suite engagements work — we learn from existing wins, not just from suite-published wins.

### Step 3 — Filter to cadence-eligible articles

For `cadence: d30`:
- Articles with `publish_date` between 30 and 60 days ago.
- Must have `gsc.d30` snapshot (or fillable from current GSC pull).

For `cadence: d90`:
- Articles with `publish_date` ≥ 90 days ago.
- Must have `gsc.d90` snapshot.

For `cadence: d180`:
- Articles with `publish_date` ≥ 180 days ago.
- Must have `gsc.d180` snapshot.

If filtered cohort is below `min_n_per_partition × 2` (default 18 — 9 winners + 9 losers), write `status: insufficient-data` to winners-pattern.md and exit early. Compounding requires statistical floor.

### Step 4 — Partition winners vs. losers

By clicks at the cadence's age:
- **Winners**: top quartile (top 25%).
- **Losers**: bottom quartile (bottom 25%).
- Middle 50% excluded (signal lives at the extremes).

For pre-suite + suite-published mixed cohorts: partition them together (the question is "what wins on this site," regardless of authorship).

### Step 5 — Compute feature averages per cohort

For each frontmatter feature, compute winner average / loser average / delta:

```
shape:                    distribution per cohort (e.g., glossary in winners 11/18 vs losers 4/18)
word_count:               winner median + range vs loser median + range
h2_count:                 winner median + range vs loser median + range
faq_count:                winner median + range vs loser median + range
internal_links_in (14d):  winner median vs loser median (suite-published only — pre-suite content rarely has 14d-tracked data)
cross_cluster_links_out:  winner median vs loser median
schema:                   distribution of present types per cohort
intent:                   distribution per cohort
parent_silo:              which silos cluster winners vs losers
eeat_score:               winner threshold (10th percentile of winners — articles below this rarely win)
geo_score:                winner threshold (10th percentile of winners)
ai_citations.dN.platform: per-platform winner threshold
language:                 (multi-language clients only) which language has more winners proportionally
ymyl:                     (mixed YMYL/non-YMYL clients only) which type wins
```

### Step 6 — Identify statistically meaningful patterns

For each feature, mark as "informative" only if:
- Winner cohort and loser cohort distributions differ by ≥ 30% on the dominant value, OR
- Winner cohort threshold is ≥ 1.5× loser cohort median (for numeric features).

Features without meaningful difference get noted as "no signal yet" — they may become informative as N grows.

### Step 7 — Translate informative patterns into constraints

For each informative pattern, produce a writer constraint:

| Pattern type | Constraint format |
|---|---|
| Shape distribution | "Default shape: glossary unless topic explicitly warrants different (winners: 61% glossary)." |
| Numeric range | "Target word count: 1700–2200 (median 1840). Losers averaged 1450." |
| Threshold | "EEAT score ≥ 80 hard floor — losers averaged 64." |
| Silo bias | "Prioritize Surface Cleaning silo for new topic ideation (8/18 winners; 1/18 losers)." |
| Predictor | "AI citations within 30 days (any platform) ≥ 1: strong predictor of d180 winner — flag articles missing this for accelerated brand-presence work." |

### Step 8 — Write `winners-pattern.md`

Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/11 - Cohorts/winners-pattern.md`.

Frontmatter:
```yaml
---
type: winners-pattern
client: "[[Client]]"
last_updated: 2026-08-15
generated_by: ccc-seo-analyze-cohort v0.1.0
cadence: d90
n_winners: 18
n_losers: 18
n_excluded_middle: 36
n_pre_suite: 24
n_suite_published: 30
status: active                 # active | insufficient-data | partial
confidence: high               # high | medium | low (function of N + variance)
---
```

Body:
1. **Cohort partition section** — counts, threshold details.
2. **Winner pattern section** — informative features only. Loser pattern noted for contrast.
3. **Constraints for next writes section** — the bullet list `ccc-seo-write-article` reads.
4. **History section** — append a row per run showing N + notable shifts ("d180 confirmed glossary advantage; word count ceiling tightened from 2200 → 2050").

### Step 9 — Write quarterly snapshot

For `cadence: d90` and `cadence: d180`: also write a snapshot to `11 - Cohorts/history/{YYYY-Q}.md` so prior quarters' patterns are preserved (the "running" winners-pattern.md keeps getting overwritten; history preserves the longitudinal view).

### Step 10 — Update article frontmatter cohort flags

For each article in this cohort, update its frontmatter with `cohort_status`:
- `winner` (top quartile)
- `loser` (bottom quartile)
- `middle` (excluded from this cadence's partition)

This lets `ccc-seo-write-article` (rewrite mode) and `ccc-seo-trigger-rewrite` (decision layer) know per-article cohort outcomes.

### Step 11 — Return

```yaml
client: "[[Client]]"
cadence: d90
status: active | insufficient-data
n_winners: 18
n_losers: 18
n_pre_suite: 24
n_suite_published: 30
informative_patterns_count: 7
constraints_for_writer: [<list of constraint strings>]
quarterly_snapshot_path: "11 - Cohorts/history/2026-Q3.md"
notable_shifts_vs_prior_run: [<list>]
```

## Pre-suite-content awareness

The pre-suite cohort is critical for rescue-mode-then-suite engagements. Without it, the analyser would have to wait until 12+ suite-published articles aged ≥ 90 days before producing useful pattern — that's 6+ months of operating before the compounding mechanism kicks in.

With pre-suite-cohort awareness, the analyser produces pattern signal much earlier (sometimes from the first weekly review post-rescue, if the existing content base is large enough). The pattern is mixed-source but still empirically grounded in this client's actual GSC outcomes.

When the cohort is mostly pre-suite (e.g., 24 pre-suite + 4 suite-published), constraints should be more conservative — the pattern is real, but the writer adapting to it has fewer suite-published examples to point to.

## Confidence levels

- **High confidence** — N ≥ 18 per partition + suite-published is ≥ 30% of cohort + at least one quarterly snapshot showing pattern stability.
- **Medium confidence** — N ≥ 9 per partition OR pre-suite-only.
- **Low confidence** — N < 9 per partition. Constraints should be advisory, not mandatory in writer prompt.

The writer skill reads `confidence` from winners-pattern frontmatter and adjusts constraint strength accordingly.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6.2 (cohort learning — the compounding mechanism — written before this skill existed; this skill is the implementation).

## Anti-patterns

- Do NOT produce winners-pattern at confidence below threshold without flagging it. Falsely confident constraints produce noise that misleads the writer.
- Do NOT discard the middle 50% — they're the control; if the middle and losers look similar, partition is healthy. If middle and winners look similar, partition threshold may be too aggressive.
- Do NOT mix d30 + d90 + d180 cohorts in one analysis run. Each cadence is independent.
- Do NOT overwrite quarterly history snapshots. Longitudinal view requires preserved past states.
- Do NOT ignore pre-suite content. The skill's existence partly justifies running rescue-mode engagements (see ccc-seo-rescue) — without pre-suite analysis, rescue clients wait 6+ months for compounding to start.
- Do NOT promote a feature to "informative" without the 30%/1.5× thresholds. Random variance produces fake patterns at low N.
