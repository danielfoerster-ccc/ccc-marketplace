---
name: ccc-seo-weekly-review
description: |
  Weekly GSC + opportunity review session — operator-facing orchestrator. Composes: ccc-seo-tools-optimize (GSC pull + 8 analysis modes + cohort backfill on published articles) → ccc-seo-trigger-rewrite (decision layer, action queue update) → weekly .docx report (what shipped, GSC delta highlights, top-3 actions for next week, AI-citation footprint summary). Runs scheduled weekly per client. The visibility + decision rhythm of the suite.
  Use this skill when an operator says "weekly review", "GSC review", "what should I do this week", "weekly SEO check-in", "weekly client report", or when the scheduled task fires for the client's review day. ~30 minutes interactive (operator skims report + approves any strategic-review items); fully automatable in scheduled-autonomous mode.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.2.0
  layer: orchestration-surface
  category: user-task-orchestrator
  pattern: orchestrator-selective-dispatch
  composes:
    - ccc-seo-tools-optimize
    - ccc-seo-trigger-rewrite
distribution: ccc-internal
---

# ccc-seo-weekly-review — The Weekly GSC Session

**Workflow: Selective-Dispatch Orchestration.** Dispatch the one heavy step → run the light decision step inline → build the report inline. Pull GSC, see what changed, decide what to act on, generate the report.

## What this is

The weekly rhythm of the suite. Visibility for the operator (what's working, what's not) and the client (what was shipped, what's coming, AI-citation footprint).

In v0.2 (Phase 2 era), cohort analysis is not yet integrated — that lands in Phase 4. v0.2 produces the report from current-week data + simple week-over-week deltas; the cohort feature attribution layer is a Phase 4 enhancement to this same orchestrator.

## The orchestration model — read this before running

This orchestrator uses **selective dispatch**, not all-dispatch. The distinction is the whole point of v0.2, and it differs deliberately from `ccc-seo-publish-next` (which dispatches every step).

The dispatch decision rule applies at *sub-skill granularity inside this orchestrator*: dispatch a composed step as a scoped `Task` sub-agent **only when it is both (a) genuinely heavy** — loads a large playbook/wrap, scrapes, or processes large data — **and (b) self-contained** — its result is consumable by the next stage as a structured return or a persisted file read by path. Keep inline: light decision/scoring steps, and the synthesis stage where the orchestrator must see the data to do its job well.

Applied to this skill's three steps:

- **Stage 1 — `ccc-seo-tools-optimize` → DISPATCHED.** It is the one genuinely heavy unit: it wraps `seo:seo-optimize` (~148 KB of analysis playbooks), pulls the GSC CSV, runs 8 analysis modes, and writes snapshots. Running that inline dumps the playbook load, the raw CSV, and the 8-mode analysis scratch into the orchestrator's context — the bulk of the run's noise. Dispatched, all of that stays in a throwaway context; only the structured return and the persisted file paths come back. The unit is heavy enough that its own value far exceeds the fixed cost of spawning a sub-agent.
- **Stage 2 — `ccc-seo-trigger-rewrite` → INLINE.** It is a light decision-layer skill (`Read/Write/Edit/Glob` only, heuristic scoring over an opportunities list, no scrape, no heavy wrap). Dispatching it would pay the full fixed cost of spawning a sub-agent to isolate almost no noise — a net loss. It also benefits from sitting in the same context as the Stage 1 return it scores.
- **Stage 3 — Report build → INLINE.** The `.docx` report is this skill's deliverable, and its value is the *synthesis*: the headline finding, the top-3 narrative, the week-over-week story. That synthesis must be done in a context that has actually seen the data — the deltas, the winners/decliners, the opportunity surface. Dispatching it would make the synthesis blind. Stage 1 already ran isolated, so the orchestrator enters Stage 3 light anyway.

**What stays in the orchestrator (never dispatched):** target-week selection, the Stage 2 decision step, the report synthesis, operator checkpoints, distribution judgment, the final summary. The orchestrator decides and synthesises; only the one heavy analytical unit is dispatched.

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

### Stage 0 — Pre-flight (orchestrator, inline)

Pure orchestrator judgment — light config reads, not dispatched.

1. Read client config (GSC property, languages, locations, review-day cadence) from `00 - Strategy.md`. Capture the client SEO folder root path — the orchestrator needs it to brief the Stage 1 dispatch.
2. Verify GSC credentials are configured (the orchestrator confirms they exist; the sub-agent will use them).
3. Determine target week.

### Stage 1 — GSC analysis (dispatch `ccc-seo-tools-optimize`)

**Dispatch a scoped sub-agent** for `ccc-seo-tools-optimize`. The orchestrator does NOT run the GSC pull or the 8-mode analysis itself — that is exactly the heavy, noisy, self-contained work that belongs in a clean throwaway context.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-tools-optimize`.
- Task: pull GSC for the target week, run all 8 analysis modes, persist snapshots, backfill article frontmatter d30/d60/d90/d180 GSC fields where the windows are reached.
- `client` — the client wikilink + the client SEO folder root path.
- `week` — the target week.
- `mode: all`, `compare_to_previous: true`.
- Credentials pointer: where the GSC credentials live (vault config path — never inline the creds).
- Expected output: GSC pull persisted to `08 - GSC/pulls/{week}.csv`; deltas persisted to `08 - GSC/deltas/{week}.md`; article frontmatter backfilled.
- Return contract: the skill's defined YAML — `pull_path`, `deltas_path`, `opportunities_proposed` (the 7 candidate lists), `articles_backfilled`.

**On return:** the orchestrator receives `{pull_path, deltas_path, opportunities_proposed, articles_backfilled}`. It carries these forward — paths, not file contents.

### Stage 2 — Decision pass (`ccc-seo-trigger-rewrite`, inline)

Run `ccc-seo-trigger-rewrite` **inline** — it is a light decision-layer skill, and isolating it would cost more than it saves (see the orchestration model above).

1. Run `ccc-seo-trigger-rewrite` with `mode: weekly`, passing the Stage 1 `deltas_path` (the skill reads the opportunities proposal from there).
2. The skill scores each opportunity, assigns action types, applies cohort weighting (if winners-pattern available), updates `08 - GSC/opportunities.md`, returns top-3 priority actions.
3. Capture: queued actions by type, manual reviews, strategic reviews, top-3 actions.

### Stage 3 — Weekly report generation (orchestrator, inline)

Build the `.docx` report **inline** — the synthesis must happen in a context that has seen the data. Read the `deltas_path` file (for winners/decliners + WoW figures) and `08 - GSC/opportunities.md` (the updated queue); the opportunity surface is also in the Stage 1 `opportunities_proposed` return already carried forward.

Generate the report at `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/_reports/weekly/{YYYY-Www}.docx`.

Report sections:

**1. Executive Summary** (~150 words)
- Total clicks 