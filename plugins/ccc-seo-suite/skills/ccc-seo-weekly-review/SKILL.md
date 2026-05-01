---
name: ccc-seo-weekly-review
description: |
  Weekly GSC + opportunity review session — operator-facing orchestrator. Composes: ccc-seo-tools-optimize (GSC pull + 8 analysis modes + cohort backfill on published articles) → ccc-seo-trigger-rewrite (decision layer, action queue update) → weekly .docx report (what shipped, GSC delta highlights, top-3 actions for next week, AI-citation footprint summary). Runs scheduled weekly per client. The visibility + decision rhythm of the suite.
  Use this skill when an operator says "weekly review", "GSC review", "what should I do this week", "weekly SEO check-in", "weekly client report", or when the scheduled task fires for the client's review day. ~30 minutes interactive (operator skims report + approves any strategic-review items); fully automatable in scheduled-autonomous mode.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: user-task-orchestrator
  composes:
    - ccc-seo-tools-optimize
    - ccc-seo-trigger-rewrite
distribution: ccc-internal
---

# ccc-seo-weekly-review — The Weekly GSC Session

**Workflow: GSC pull → 8 mode analysis → decision pass → action queue update → weekly report.**

## What this is

The weekly rhythm of the suite. Pull GSC, see what changed, decide what to act on, generate the report. Visibility for the operator (what's working, what's not) and the client (what was shipped, what's coming, AI-citation footprint).

In v0.2 (Phase 2 era), cohort analysis is not yet integrated — that lands in Phase 4. v0.2 produces the report from current-week data + simple week-over-week deltas; the cohort feature attribution layer is a Phase 4 enhancement to this same orchestrator.

## When to use

- Scheduled: weekly, on the client's review day (typically Monday for Friday's prior-week data).
- Manual: operator wants an ad-hoc GSC review (e.g., after an algorithm update, after a major publishing push).
- Ad-hoc diagnostic: when GSC anomalies surface mid-week.

## Inputs

- `client` (required) — wikilink.
- `week` (optional) — defaults to last completed ISO week.
- `interactive` (optional, default true).
- `report_to` (optional) — Slack channel, email recipient, file-only. Default: file-only (`.docx` to vault).

## Procedure

### Stage 0 — Pre-flight

1. Read client config (GSC property, languages, locations, review-day cadence).
2. Verify GSC credentials.
3. Determine target week.

### Stage 1 — GSC analysis

1. Invoke `ccc-seo-tools-optimize` with `mode: all`, `compare_to_previous: true`.
2. Skill pulls GSC for the week, runs all 8 analysis modes, persists snapshots, backfills article frontmatter d30/d60/d90/d180 GSC fields where the windows are reached, returns opportunities proposal.
3. Capture: pull path, deltas path, opportunities proposal, articles backfilled count.

### Stage 2 — Decision pass

1. Invoke `ccc-seo-trigger-rewrite` with the opportunities proposal + `mode: weekly`.
2. Skill scores each opportunity, assigns action types, applies cohort weighting (if winners-pattern available), updates `08 - GSC/opportunities.md`, returns top-3 priority actions.
3. Capture: queued actions by type, manual reviews, strategic reviews, top-3 actions.

### Stage 3 — Weekly report generation

Generate a `.docx` report at `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/_reports/weekly/{YYYY-Www}.docx`.

Report sections:

**1. Executive Summary** (~150 words)
- Total clicks + impressions this week vs. last week (% change).
- Articles published this week (from publishing log) — count + URLs.
- Top 3 actions for next week (from trigger-rewrite output).
- Headline finding (the most operator-relevant single fact from the GSC analysis).

**2. What Shipped This Week**
- Pull rows from `10 - Publishing Log.md` where publish_date is in this week.
- Per article: URL, target KW, shape, EEAT score, GEO score.
- Note any cohort-eligible articles (aged d30 / d60 / d90 / d180 this week — first GSC backfill snapshots captured).

**3. GSC Trends**
- Total clicks, impressions, CTR, avg position WoW.
- Top 5 winners (biggest position improvements).
- Top 5 decliners.

**4. Opportunity Surface**
- Striking distance (top 5).
- Low CTR (top 5).
- Cannibalization issues.
- Content gaps (top 5 — candidates for new articles).

**5. AI Citation Footprint**
- Per-platform citation counts this week (when tracking is available — detection mechanism evolves; v0.2 may have manual entry, Phase 5 brand-presence skill auto-detects).
- ChatGPT / AI Overviews / Perplexity / Gemini / Copilot — separate columns.
- Trend vs. prior weeks.

**6. Action Queue**
- Top 3 actions for the operator next week.
- Per action: type (article-rewrite / new-article / etc.), URL or KW, expected impact, estimated effort.

**7. Manual + Strategic Reviews**
- Any items flagged for operator attention.
- Any items flagged for next strategy session.

### Stage 4 — Operator review (interactive mode)

**Operator checkpoint** (if interactive):
- Skim the report.
- Approve action queue (or override priorities).
- Resolve any manual review flags.
- Decide on report distribution (Slack, email, hold for client meeting).

### Stage 5 — Distribution

Per `report_to`:
- `slack` → invoke Slack send to specified channel with executive summary + .docx attachment.
- `email` → compose email with summary + .docx attachment, send to specified recipient (manual operator confirm before sending in interactive mode).
- `file-only` → keep at vault path; no distribution.

### Stage 6 — Return summary

```yaml
status: completed | aborted
client: "[[Client]]"
week: "2026-W18"
gsc:
  total_clicks: 1247
  total_clicks_wow_change: +12.3
  total_impressions: 48312
  total_impressions_wow_change: +8.1
  avg_position: 18.4
  avg_position_wow_change: -0.7   # negative = improved
articles_shipped_this_week: 3
articles_backfilled_with_gsc: 7
opportunities_surfaced: 24
opportunities_resolved: 5
top_3_actions:
  - {type: striking-distance-rewrite, url: "...", priority: high}
  - {type: new-article, kw: "...", priority: high}
  - {type: meta-rewrite, url: "...", priority: medium}
manual_reviews: 1
strategic_reviews: 0
report_path: "_reports/weekly/2026-W18.docx"
distributed_to: ["slack:#client-channel"]
```

## Phase 4 enhancement preview

When Phase 4 ships (`ccc-seo-analyze-cohort`), this orchestrator gains an additional stage between Stage 1 and Stage 2:

**Stage 1.5 — Cohort d30 quick-signal pass**
1. Invoke `ccc-seo-analyze-cohort` with `cadence: d30`.
2. Identifies articles aged 30-60 days that are early winners or fast failures.
3. Surfaces in the report under a new section "Cohort Signals — Early Winners + Fast Failures".
4. Feeds into trigger-rewrite as additional priority weighting.

The orchestrator structure stays — only the cohort skill addition.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6 (the closed GSC learning loop — this orchestrator runs Halves 1 + 2 weekly).

Atomic skills composed:
- [[ccc-seo-tools-optimize]]
- [[ccc-seo-trigger-rewrite]]

## Anti-patterns

- Do NOT auto-distribute reports without operator confirmation in interactive mode. Reports go to clients; mistakes propagate.
- Do NOT skip the cohort backfill in Stage 1. Without it, cohort analysis breaks at d90.
- Do NOT generate reports without action queue updates. The point is decision-making, not just status reporting.
- Do NOT lump AI citations as "AI mentions: X". Always per-platform — only 11% domain overlap between platforms.
- Do NOT move resolved opportunities out of `opportunities.md` history. Needed for cohort attribution + retrospective.
- Do NOT bypass the report when running in non-interactive scheduled-autonomous mode. Scheduled runs still produce reports — they just don't pause for operator review before distribution.
