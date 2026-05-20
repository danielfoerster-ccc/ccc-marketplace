---
name: ccc-seo-quarterly-review
description: |
  Quarterly review session — operator-facing orchestrator. Runs once per quarter on every active client. Composes: ccc-seo-analyze-cohort (d90 + d180 passes — produces winners-pattern.md updates) + ccc-seo-tools-audit (refresh against baseline for trend analysis) + ccc-seo-tools-geo (site-level audit including off-site brand-presence signals) + strategy refresh decision (recommends running ccc-seo-strategy-session in refresh mode if drift detected) + brand-presence audit (Phase 5+ ccc-seo-brand-presence skill called when available; until then, surfaces the structural ceiling flag from tools-geo for operator action). Quarterly .docx report. The compounding mechanism's quarterly checkpoint.
  Use this skill when an operator says "quarterly review", "Q-end review", "cohort analysis", "strategy refresh check", "what's compounding", or when the scheduled task fires for the client's quarterly review day. ~2 hours interactive; fully automatable in scheduled-autonomous mode.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.2.0
  layer: orchestration-surface
  category: user-task-orchestrator
  pattern: orchestrator-selective-dispatch
  composes:
    - ccc-seo-analyze-cohort
    - ccc-seo-tools-audit
    - ccc-seo-tools-geo
distribution: ccc-internal
---

# ccc-seo-quarterly-review — The Quarterly Compounding Checkpoint

**Workflow: Dispatch cohort attribution → dispatch audit refresh → dispatch site GEO → decide strategy refresh inline → build quarterly report inline.**

## What this is

The quarterly checkpoint where compounding becomes visible. The d30 weekly cohort signal is noisy; the d90 monthly is the cohort attribution; the d180 quarterly is what confirms long-term winners and demotes 90-day false positives. This orchestrator runs both d90 and d180 passes, refreshes the audit baseline, re-checks AI-citation readiness at site level, and decides whether the strategy needs a refresh.

For ongoing clients (post-rescue + post-onboarding), this is THE session where evidence of the compounding flywheel appears. After 12 weeks of suite operation, the d90 cohort produces high-confidence winners pattern. After 24 weeks, the d180 quarterly confirms which patterns persist.

## The orchestration model — read this before running

This orchestrator uses **selective dispatch**. The dispatch decision rule applies at *sub-skill granularity inside this orchestrator*: dispatch a composed unit as a scoped `Task` sub-agent **only when it is both (a) genuinely heavy** — loads a large playbook/wrap, scrapes, or processes large data — **and (b) self-contained** — its result is consumable by the next stage as a structured return or a persisted file read by path. Keep inline: light decision/scoring steps, and any synthesis / judgment stage where the orchestrator must see the data to do its job well. This is the [[Decisions & Rules#The Dispatch Decision Rule|Dispatch Decision Rule]] applied per composed unit, established by the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]].

Applied to this skill's stages:

- **Stage 1 — `ccc-seo-analyze-cohort` (d90 + d180 passes) → DISPATCHED.** Heavy + self-contained: it loads the full publishing log, the GSC time-series, the AI-citation history, and `02 - URL Inventory.md`, partitions winners/losers, computes feature deltas, and writes `winners-pattern.md` + `11 - Cohorts/history/{YYYY-Q}.md`. Two cadence passes compound the load. All of that scratch belongs in a throwaway context; only the structured return + persisted paths come back. The two passes are dispatched as **one sub-agent** that runs both cadences (they share the same loaded data — splitting them would double the load cost).
- **Stage 2 — `ccc-seo-tools-audit` → DISPATCHED.** Heavy + self-contained: it wraps the `seo:seo-audit` marketplace skill, runs a Seomator crawl (16 categories, 148 rules — slow, ~5s/page), persists dated audit files to `01 - Tech Audit/`, and diffs against prior runs. The crawl output and the marketplace wrap are pure noise to the orchestrator; the trend deltas come back as a structured return + a persisted file path.
- **Stage 3 — `ccc-seo-tools-geo` (site-audit mode) → DISPATCHED.** Heavy + self-contained: it wraps the `seo:seo-geo` marketplace skill in site-level mode, scoring aggregate per-platform AI citability across all articles plus off-site brand-presence signals and crawler accessibility. Site-wide scoring is a large pass; the result (per-platform scores + `brand_presence_ceiling` flag) is a thin structured return.
- **Stage 3a — Brand-presence surfacing → INLINE.** Until `ccc-seo-brand-presence` ships (Phase 5+), this stage is pure orchestrator judgment — it surfaces the `brand_presence_ceiling` flag from the Stage 3 return as a recommendation. Nothing heavy. When the Phase 5+ skill exists, re-evaluate it against the heavy-and-self-contained test (an off-site presence audit that scrapes would qualify for dispatch).
- **Stage 4 — Strategy refresh decision → INLINE.** This is judgment, not execution. The orchestrator must *see* the cohort findings, the audit trend deltas, the accumulated opportunity surface, and the brand-presence flag to score drift indicators and make a go/no-go recommendation. Dispatching it would make the decision blind to the data. Stages 1–3 already ran isolated, so the orchestrator enters Stage 4 light anyway.
- **Stage 6 — Quarterly report build → INLINE.** The `.docx` report is this skill's deliverable, and its value is the *synthesis*: the headline finding, the top-3 winners narrative, the quarter-over-quarter story, the strategy recommendation rationale. That synthesis must be done in a context that has actually seen the data — the cohort patterns, the audit deltas, the GEO trend. Dispatching it would make the synthesis blind.

**What stays in the orchestrator (never dispatched):** client-maturity pre-flight, the Stage 4 strategy-refresh decision, the report synthesis, operator checkpoints, distribution judgment, the final summary. The orchestrator decides and synthesises; the three heavy analytical units are dispatched.

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

### Stage 0 — Pre-flight (orchestrator, inline)

Pure orchestrator judgment — light config reads, not dispatched.

1. Read client config from `00 - Strategy.md` + verify the client is mature enough for quarterly review:
   - At least one quarter of activity since onboarding.
   - At least 12 articles published (suite-published or pre-suite, total).
   - At least one prior weekly review run.
2. Capture the client SEO folder root path — the orchestrator needs it to brief every downstream dispatch.
3. Verify credentials are configured (GSC for cohort, Seomator/DataForSEO for audit, Tavily for GEO). The orchestrator confirms they exist; the sub-agents will use them.
4. Read [[§6 — The Closed GSC Learning Loop]] §6.2 (cohort learning), §6.3 (off-site brand presence), [[§10 — The Operator's Mental Model]] (operator's mental model — quarterly cadence).

### Stage 1 — Cohort attribution (dispatch `ccc-seo-analyze-cohort`)

**Dispatch a scoped sub-agent** for `ccc-seo-analyze-cohort`. The orchestrator does NOT load the publishing log, the GSC time-series, or run the partition computation itself — that is the heavy, self-contained work that belongs in a clean throwaway context. The d90 and d180 passes share the same loaded data, so they run in **one sub-agent** that executes both cadences.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-analyze-cohort`.
- Task: run the `d90` cadence pass (updates `winners-pattern.md`), then the `d180` cadence pass (longitudinal confirmation) for the target quarter; capture both quarterly snapshots.
- `client` — the client wikilink + the client SEO folder root path.
- `quarter` — the target quarter.
- Files it must read (pass paths, not contents): `10 - Publishing Log.md`, `06 - Articles/`, `08 - GSC/pulls/`, `08 - GSC/deltas/`, `02 - URL Inventory.md` (pre-suite content), the existing `11 - Cohorts/winners-pattern.md`.
- Credentials pointer: where the GSC credentials live (vault config path — never inline the creds).
- Expected output: `11 - Cohorts/winners-pattern.md` updated from the d90 pass; both d90 + d180 snapshots persisted to `11 - Cohorts/history/{YYYY-Q}.md`.
- Return contract: for each cadence — `status` (`ok` | `insufficient-data`), `n_winners`, `n_losers`, `confidence`, `informative_patterns`; for d180 — which d90 patterns persisted vs. demoted; plus the persisted `winners-pattern.md` path and history path.

**On return:** the orchestrator carries `{winners_pattern_path, history_path, d90_summary, d180_summary}` forward — paths, not file contents. If d90 status is `insufficient-data` (< 18 articles aged ≥ 90 days), surface clearly: "Cohort attribution at d90 insufficient — fewer than 18 articles in the partition window. Continue normal cadence; next quarterly will likely produce first-confidence pattern."

### Stage 2 — Audit refresh (dispatch `ccc-seo-tools-audit`)

**Dispatch a scoped sub-agent** for `ccc-seo-tools-audit`. The Seomator crawl (16 categories, 148 rules, ~5s/page) and the `seo:seo-audit` marketplace wrap are exactly the heavy, noisy, self-contained work that belongs in a clean context — not the orchestrator's.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-tools-audit`.
- Task: run a full-domain audit, persist the dated audit file, diff against the most recent prior audit, return prioritised trend findings.
- `client` — the client wikilink + the client SEO folder root path.
- `scope: full`, `compare_to_baseline: true`.
- Note the execution-environment rule: the sub-agent runs its own time-budget-check; crawls ≥35s estimated route to local execution. The orchestrator does not need to pre-compute this — it just hands the task.
- Files it must read (paths, not contents): the client's `01 - Tech Audit/` history directory, `00 - Strategy.md`.
- Credentials pointer: where Seomator / DataForSEO credentials live (vault config path).
- Expected output: a dated audit file persisted to `01 - Tech Audit/`.
- Return contract: `new_issues`, `resolved_issues`, `persistent_issues`, `regressed_issues` counts; the site-wide health score + delta; the persisted audit file path; persistent-critical-issue flags.

**On return:** the orchestrator carries the trend deltas + the audit file path forward. Persistent critical issues across multiple quarters are a flag for Stage 4.

### Stage 3 — Site-level GEO + brand-presence audit (dispatch `ccc-seo-tools-geo`)

**Dispatch a scoped sub-agent** for `ccc-seo-tools-geo` in `site-audit` mode. Site-wide AI-citability scoring across every article via the `seo:seo-geo` marketplace wrap is a large, self-contained pass.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-tools-geo`.
- Task: run a site-level GEO re-audit and return the aggregate result + brand-presence assessment.
- `client` — the client wikilink + the client SEO folder root path.
- `mode: site-audit`.
- Files it must read (paths, not contents): `06 - Articles/` (all article frontmatter), the most recent prior site-audit snapshot under the GEO history path, `00 - Strategy.md`.
- Credentials pointer: where Tavily credentials live (vault config path).
- Expected output: a dated site-audit snapshot persisted.
- Return contract: aggregate per-platform AI citability scores; off-site brand-presence signal scores (YouTube, Reddit, Wikipedia, podcast directory presence); crawler accessibility (GPTBot, Google-Extended, ClaudeBot, PerplexityBot); per-platform change vs. prior site-audit; the `brand_presence_ceiling` flag; the persisted snapshot path.

**On return:** the orchestrator carries the GEO result + the `brand_presence_ceiling` flag forward.

### Stage 3a — Brand-presence surfacing (orchestrator, inline)

Pure orchestrator judgment — not dispatched. When `ccc-seo-brand-presence` ships (Phase 5+), this becomes a dispatch candidate: re-evaluate it against the orchestration model's heavy-and-self-contained test — an off-site presence audit that scrapes YouTube/Reddit/Wikipedia would qualify.

Until Phase 5 ships: surface the `brand_presence_ceiling` flag from the Stage 3 return as an actionable recommendation: "Site-level GEO score is below what on-site quality predicts. Consider off-site work: YouTube series, Reddit AMA, Wikipedia entity work. The Phase 5+ `ccc-seo-brand-presence` skill will automate audit + recommendations; until then, this is operator-led work."

### Stage 4 — Strategy refresh decision (orchestrator, inline)

This is judgment, not execution — it stays inline. The orchestrator must see the cohort findings, the audit trend deltas, the opportunity surface, and the brand-presence flag to score drift. It reads the persisted files Stages 1–3 returned by path:
- `00 - Strategy.md` — current pillar tree.
- `winners-pattern.md` — d90 cohort findings (the Stage 1 `winners_pattern_path`).
- `08 - GSC/opportunities.md` — accumulated quarter-over-quarter opportunity surface.
- `01 - Tech Audit/` trend deltas from the Stage 2 return.

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

### Stage 6 — Quarterly report (orchestrator, inline)

Build the `.docx` report **inline** — the synthesis must happen in a context that has seen the data. Read the persisted files the dispatched stages returned (the cohort history file, the audit file, the GEO snapshot) where the report needs detail; the structured returns already carried forward supply most of it.

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
stages_dispatched: [analyze-cohort, tools-audit, tools-geo]
```

## When the cohort says "insufficient data"

For clients in their first 1–2 quarters, the d90 cohort is often insufficient (< 18 articles aged ≥ 90 days). The orchestrator handles this gracefully:
- d90 cohort analysis returns `insufficient-data` status.
- d180 cohort definitely returns `insufficient-data` (article ages are too young).
- Audit + GEO + strategy-refresh stages still produce useful output.
- Quarterly report explicitly notes "compounding mechanism still warming up — typically first-confidence pattern at quarter 3 or 4 of operation."
- Recommended action: continue cadence; next quarterly will likely produce first-confidence pattern.

This is normal and expected for new clients. Compounding takes time.

## Rules (Update This Section When Things Go Wrong)

1. **Dispatch Stages 1–3 each with a complete, self-contained brief.** Each brief must let the atomic skill run standalone: the skill to load, the task, `client` + folder root path, the quarter/scope/mode, the credentials pointer, the file paths to read, the expected output, the return contract. An under-briefed sub-agent corrodes the analysis — a well-briefed one does not. Write each brief as if to a smart colleague with zero prior context.
2. **Pass file paths, not file contents, in every brief.** Hand the sub-agent the client SEO folder root path; let it read config + history files in its own context. Pasting contents re-bloats the orchestrator — the exact thing dispatch avoids.
3. **Do NOT dispatch Stage 3a, Stage 4, or Stage 6.** Stage 3a is light surfacing; Stage 4 is a strategic go/no-go that must see the cohort + audit + GEO data; Stage 6 is report synthesis that must see the data. Dispatching any of them pays a sub-agent's fixed spawn cost for no real noise isolation, and dispatching the decision/report makes it blind. This is selective dispatch by design — not an oversight to "fix" by dispatching everything.
4. **The orchestrator never runs the cohort partition, the Seomator crawl, or the site-GEO scoring inline.** If you catch yourself loading the publishing log, crawling the site, or scoring articles in the orchestrator's context, stop — that is the monolithic-session failure mode this version exists to fix.
5. **Run the cohort d90 + d180 passes in ONE dispatched sub-agent.** Both cadences read the same loaded data (publishing log, GSC time-series, AI-citation history). Splitting them into two sub-agents doubles the load cost and the harness-entry tax for no gain.
6. **Do NOT auto-trigger strategy refresh without operator approval.** Refresh is a strategic decision; the orchestrator surfaces a recommendation, it does not auto-execute.
7. **Do NOT skip the d180 pass when articles ≥ 180 days old exist.** Longitudinal confirmation prevents 90-day false positives from misleading the writer. The Stage 1 brief must request both cadences.
8. **Do NOT promise compounding in clients with < 12 articles.** Surface the honest expectation: first-confidence pattern emerges at quarter 3–4.
9. **Do NOT report aggregate AI citation as a single number.** Always per-platform — only 11% domain overlap means aggregation loses signal.
10. **Do NOT auto-distribute the report without operator confirmation in interactive mode.** Quarterly reports go to clients; mistakes propagate.
11. **Do NOT skip the audit refresh.** Persistent issues across quarters often correlate with cohort-level pattern drift.
12. **Carry the dispatched stages' paths forward, not their file contents.** The orchestrator holds the structured returns + persisted paths. Stage 4 and Stage 6 read a persisted file once when they need detail — they do not re-run a dispatched stage.

## Reference

Full methodology: [[§6 — The Closed GSC Learning Loop]] (closed GSC learning loop — quarterly is where Halves 2 + 3 produce visible compounding evidence), [[§10 — The Operator's Mental Model]] (operator's mental model — quarterly cadence in the operator workflow).

Dispatch doctrine: [[Decisions & Rules#The Dispatch Decision Rule|The Dispatch Decision Rule]] — applied here at sub-skill granularity (the Dispatch-Selection Rule). Test that produced this skill's selective-dispatch design: [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]].

Atomic skills composed:
- [[ccc-seo-analyze-cohort]] — Stage 1, dispatched
- [[ccc-seo-tools-audit]] — Stage 2, dispatched
- [[ccc-seo-tools-geo]] — Stage 3, dispatched

Phase 5+ integration: `ccc-seo-brand-presence` skill (when shipped) replaces Stage 3a's manual operator surfacing with automated audit + recommendations — and becomes a dispatch candidate at that point.

## Anti-patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| Orchestrator runs the Seomator crawl / cohort partition / site-GEO scoring itself | Orchestrator context bloats with crawl output, GSC time-series, and marketplace-wrap scratch; the strategy decision + report synthesis degrade | Treating the heavy composed skills as inline steps | Brief-and-dispatch Stages 1–3; the orchestrator only plans, decides, and synthesises |
| Brief pastes the strategy doc / audit history / article frontmatter inline | The dispatch saves nothing — the orchestrator still carries the heavy content | Confusing "hand off the work" with "hand off the text" | Pass the folder root path; the sub-agent reads files in its own context |
| Cohort d90 + d180 dispatched as two separate sub-agents | The publishing log + GSC time-series load twice; harness-entry tax paid twice | Treating each cadence as an independent unit | One sub-agent runs both cadences over the data it loaded once |
| Strategy refresh decision dispatched to a sub-agent | The drift scoring + recommendation get made blind to the cohort, audit, and GEO data | Dispatching judgment, not just execution | Keep Stage 4 inline — the go/no-go needs the data in view |
| Quarterly report build dispatched to a sub-agent | The headline finding + top-3 winners synthesis get made blind to the actual data | Dispatching synthesis, not just execution | Keep Stage 6 inline — synthesis needs the data in view |
| Final summary rebuilt by re-running a dispatched stage | Orchestrator re-bloats at the end; defeats the whole pattern | Not trusting the dispatched stages' structured returns | Assemble the summary from the carried-forward returns + the inline-stage outputs |

## Self-Improvement

When an operator corrects an output or identifies something that consistently goes wrong:
- Add a rule to the Rules section above.
- Note what the failure mode was and what fixed it.

When a dispatched stage produces a weak analysis:
- The first suspect is brief quality, not the atomic skill. Check what context the brief omitted, then tighten that stage's brief shape.

When an operator approves a clean run:
- Note which brief shapes produced the strongest sub-agent outputs; those become the reference brief templates.

This skill is never finished. The more it is used, the better the briefs get.

## Version history

- **v0.2.0 (2026-05-20)** — Restructured from inline-invocation to **orchestrator-selective-dispatch**. Stages 1–3 (`ccc-seo-analyze-cohort` d90+d180, `ccc-seo-tools-audit`, `ccc-seo-tools-geo` site-audit) are now explicit scoped sub-agent dispatches, each with a complete brief and a stated return contract — all three are genuinely heavy + self-contained (cohort partition over the full publishing log + GSC time-series; the Seomator 148-rule crawl; site-wide GEO scoring via the `seo:seo-geo` wrap). The cohort d90 + d180 passes run in a single sub-agent since they share loaded data. Stage 3a (brand-presence surfacing), Stage 4 (strategy refresh decision), and Stage 6 (report build) stay inline by design: the first is light, the second is a strategic go/no-go that must see the data, the third is synthesis that must see the data. Added `## Rules`, anti-patterns table, `## Self-Improvement`, the orchestration-model section, and `pattern: orchestrator-selective-dispatch`. Implements the rollout of the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]] verdict per Phase 2 of the [[2026-05-14 — Multi-Agent & Token-Efficiency Architecture — Assessment]]. Per skill-creator-pro: this was a surgical structural pattern-change against a target validated by the head-to-head test, so the full eval loop was not re-run.
- **v0.1.0** — Initial build. Inline-invocation orchestrator composing 3 atomic skills.
