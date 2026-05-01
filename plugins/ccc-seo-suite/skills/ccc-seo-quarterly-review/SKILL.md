---
name: ccc-seo-quarterly-review
description: |
  Quarterly review session — operator-facing orchestrator. Runs once per quarter on every active client. Composes: ccc-seo-analyze-cohort (d90 + d180 passes — produces winners-pattern.md updates) + ccc-seo-tools-audit (refresh against baseline for trend analysis) + ccc-seo-tools-geo (site-level audit including off-site brand-presence signals) + strategy refresh decision (recommends running ccc-seo-strategy-session in refresh mode if drift detected) + brand-presence audit (Phase 5+ ccc-seo-brand-presence skill called when available; until then, surfaces the structural ceiling flag from tools-geo for operator action). Quarterly .docx report. The compounding mechanism's quarterly checkpoint.
  Use this skill when an operator says "quarterly review", "Q-end review", "cohort analysis", "strategy refresh check", "what's compounding", or when the scheduled task fires for the client's quarterly review day. ~2 hours interactive; fully automatable in scheduled-autonomous mode.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: user-task-orchestrator
  composes:
    - ccc-seo-analyze-cohort
    - ccc-seo-tools-audit
    - ccc-seo-tools-geo
distribution: ccc-internal
---

# ccc-seo-quarterly-review — The Quarterly Compounding Checkpoint

**Workflow: Cohort attribution → audit refresh → site GEO + brand-presence → strategy refresh decision → quarterly report.**

## What this is

The quarterly checkpoint where compounding becomes visible. The d30 weekly cohort signal is noisy; the d90 monthly is the cohort attribution; the d180 quarterly is what confirms long-term winners and demotes 90-day false positives. This orchestrator runs both d90 and d180 passes, refreshes the audit baseline, re-checks AI-citation readiness at site level, and decides whether the strategy needs a refresh.

For ongoing clients (post-rescue + post-onboarding), this is THE session where evidence of the compounding flywheel appears. After 12 weeks of suite operation, the d90 cohort produces high-confidence winners pattern. After 24 weeks, the d180 quarterly confirms which patterns persist.

## When to use

- **Scheduled:** quarterly per client, on the client's review day (typically end of quarter or first week of new quarter).
- **Manual:** operator wants a deep cohort review mid-quarter (rare — typically wait for natural cadence).
- **Strategy-drift trigger:** when `ccc-seo-weekly-review` flags strategic-review items that accumulate, the next quarterly review prioritises them.

## Inputs

- `client` (required) — wikilink.
- `quarter` (optional) — defaults to most recently completed calendar quarter.
- `interactive` (optional, default true).
- `auto_recommend_strategy_refresh` (optional, default true) — if drift detected, surfaces strategy-refresh recommendation. If false, just reports without recommendation.

## Procedure

### Stage 0 — Pre-flight

1. Read client config + verify the client is mature enough for quarterly review:
   - At least one quarter of activity since onboarding.
   - At least 12 articles published (suite-published or pre-suite, total).
   - At least one prior weekly review run.
2. Read [[02 - Methodology|methodology]] §6.2 (cohort learning), §6.3 (off-site brand presence), §10 (operator's mental model — quarterly cadence).

### Stage 1 — Cohort attribution (d90 + d180 passes)

1. Invoke `ccc-seo-analyze-cohort` with `cadence: d90`. Produces / updates `winners-pattern.md`. Captures: n_winners, n_losers, informative patterns, constraints for writer, confidence level.
2. Invoke `ccc-seo-analyze-cohort` with `cadence: d180`. Produces longitudinal confirmation. Notes which 90-day patterns persisted (high-confidence) vs. which faded (false-positive demotions).
3. Capture both quarterly snapshots to `11 - Cohorts/history/{YYYY-Q}.md`.

If d90 status is `insufficient-data` (< 18 articles aged ≥ 90 days), surface clearly: "Cohort attribution at d90 insufficient — fewer than 18 articles in the partition window. Continue normal cadence; next quarterly will likely produce first-confidence pattern."

### Stage 2 — Audit refresh

Invoke `ccc-seo-tools-audit` against full client domain. Skill compares to most recent prior audit and produces trend analysis:
- New issues since last quarter
- Resolved issues since last quarter
- Persistent issues (still present from prior audit)
- Regressed issues (resolved but back)

Surface notable shifts. Persistent critical issues across multiple quarters are a flag for operator attention.

### Stage 3 — Site-level GEO + brand-presence audit

Invoke `ccc-seo-tools-geo` in `site-audit` mode. Captures:
- Aggregate per-platform AI citability across all articles
- Off-site brand-presence signal scores (YouTube, Reddit, Wikipedia, podcast directory presence)
- Crawler accessibility (GPTBot, Google-Extended, ClaudeBot, PerplexityBot)
- Comparison to prior site-audit (citation count change per platform, brand-presence signal change)

The skill returns a `brand_presence_ceiling` flag if structural ceiling persists.

### Stage 3a — Brand-presence audit (Phase 5+)

When `ccc-seo-brand-presence` skill is available (Phase 5+), invoke it for off-site presence audit + recommendations.

Until Phase 5 ships: surface the `brand_presence_ceiling` flag from Stage 3 as an actionable recommendation: "Site-level GEO score is below what on-site quality predicts. Consider off-site work: YouTube series, Reddit AMA, Wikipedia entity work. The Phase 5+ `ccc-seo-brand-presence` skill will automate audit + recommendations; until then, this is operator-led work."

### Stage 4 — Strategy refresh decision

Read:
- `00 - Strategy.md` — current pillar tree.
- `winners-pattern.md` — d90 cohort findings.
- `08 - GSC/opportunities.md` — accumulated quarter-over-quarter opportunity surface.
- `01 - Tech Audit/` trend deltas from Stage 2.

Detect drift indicators:
- **Pillar-level winners diverge from current strategy:** cohort shows Pillar X dominating winners but strategy under-invests there → refresh likely.
- **Loser silos accumulate:** cohort shows specific silos consistently losing → refresh likely (drop or reframe).
- **Content-gap accumulation:** opportunities.md shows content gaps surfacing every week without being addressed → refresh likely.
- **Cannibalization spiral:** opportunities.md shows cannibalization issues recurring → strategy-level fix needed.
- **Audit trend regression:** persistent critical issues across quarters → site-wide structural intervention needed.
- **Brand-presence ceiling:** structural ceiling persists → strategic-level decision (whether to invest in off-site work).

Apply weighted scoring:
- 0–2 drift indicators triggered → strategy stable; recommend continuing cadence.
- 3–4 drift indicators → strategy refresh recommended.
- 5+ drift indicators → strategy refresh strongly recommended; possibly even a fresh strategy build (re-onboarding-style).

### Stage 5 — Operator review

**Operator checkpoint** (interactive mode): operator reviews:
- d90 + d180 winners pattern (what's actually working).
- Audit trend deltas.
- Site-level GEO + brand-presence findings.
- Strategy refresh decision recommendation.

Operator decides:
- **Continue cadence** — no strategy change. Just keep running publish-next + weekly-review.
- **Run strategy-session in refresh mode** — `ccc-seo-strategy-session` with `mode: refresh`. Skill will use the cohort findings as input.
- **Investigate specific concerns** — operator queues atomic skills to dig into a flagged area (e.g., persistent audit issues → schedule a `ccc-seo-tools-technical` deep-dive).

### Stage 6 — Quarterly report

Generate `.docx` at `_reports/quarterly/{YYYY-Q}.docx`:

**1. Quarterly Executive Summary**
- Articles published this quarter (count + URLs).
- Aggregate clicks, impressions, position trend.
- AI citation footprint trend per platform.
- Top 3 winners (highest-performing articles by clicks at d90).
- Top 3 patterns identified by cohort analysis.
- Strategy refresh recommendation (yes/no/maybe).

**2. Cohort Findings**
- d90 winners pattern (current).
- d180 longitudinal confirmation.
- Confidence level + sample size.
- Notable shifts vs. prior quarter.

**3. Audit Trend**
- New, resolved, persistent, regressed issues.
- Site-wide health score trend.

**4. AI Citation + Brand Presence**
- Per-platform aggregate citation count this quarter.
- Brand-presence signal scores.
- Structural ceiling assessment.
- Recommended off-site work (if ceiling persists).

**5. Strategy Refresh Recommendation**
- Drift indicators triggered (if any).
- Recommendation: continue / refresh / fresh build.
- Rationale.

**6. Action Plan for Next Quarter**
- If continuing: next-quarter publishing cadence + opportunity queue.
- If refreshing: scheduled `ccc-seo-strategy-session` run + scope of refresh.
- Ongoing improvements (off-site brand work, technical debt, etc.).

### Stage 7 — Distribution + commit

- File-only by default.
- Optional: send via Slack / email per client preference.
- Update `00 - Strategy.md` quarterly review log section with summary + wikilink.

### Stage 8 — Return

```yaml
status: complete | partial | aborted
client: "[[Client]]"
quarter: "2026-Q3"
cohort:
  d90:
    n_winners: 18
    n_losers: 18
    confidence: high
    informative_patterns_count: 7
  d180:
    longitudinal_confirmed: 5    # of 7 d90 patterns confirmed at d180
    demoted: 2
    new_persistent_patterns: 1   # patterns not detectable at d90 but emerging at d180
audit:
  new_issues: 4
  resolved_issues: 11
  persistent_issues: 3
  regressed_issues: 0
geo:
  brand_presence_ceiling: true
  per_platform_change:
    chatgpt: +12
    ai_overviews: +8
    perplexity: +21
    gemini: +5
    copilot: +7
strategy_drift_indicators: 2
strategy_refresh_recommendation: "Continue cadence"
report_path: "_reports/quarterly/2026-Q3.docx"
notable_findings: [<list of 3-5 most operator-relevant facts>]
```

## When the cohort says "insufficient data"

For clients in their first 1–2 quarters, the d90 cohort is often insufficient (< 18 articles aged ≥ 90 days). The orchestrator handles this gracefully:
- d90 cohort analysis returns `insufficient-data` status.
- d180 cohort definitely returns `insufficient-data` (article ages are too young).
- Audit + GEO + strategy-refresh stages still produce useful output.
- Quarterly report explicitly notes "compounding mechanism still warming up — typically first-confidence pattern at quarter 3 or 4 of operation."
- Recommended action: continue cadence; next quarterly will likely produce first-confidence pattern.

This is normal and expected for new clients. Compounding takes time.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6 (closed GSC learning loop — quarterly is where Halves 2 + 3 produce visible compounding evidence), §10 (operator's mental model — quarterly cadence in the operator workflow).

Atomic skills composed:
- [[ccc-seo-analyze-cohort]]
- [[ccc-seo-tools-audit]]
- [[ccc-seo-tools-geo]]

Phase 5+ integration: `ccc-seo-brand-presence` skill (when shipped) replaces Stage 3a's manual operator surfacing with automated audit + recommendations.

## Anti-patterns

- Do NOT auto-trigger strategy refresh without operator approval. Refresh is a strategic decision; surfaces recommendation, doesn't auto-execute.
- Do NOT skip d180 pass when articles ≥ 180 days old exist. Longitudinal confirmation prevents 90-day false positives from misleading the writer.
- Do NOT promise compounding in clients with <12 articles. Surface honest expectation: pattern first emerges at quarter 3-4.
- Do NOT report aggregate AI citation as a single number. Always per-platform — only 11% domain overlap means aggregation loses signal.
- Do NOT auto-distribute report without operator confirmation in interactive mode. Quarterly reports go to clients; mistakes propagate.
- Do NOT skip the audit refresh. Persistent issues across quarters often correlate with cohort-level pattern drift.
