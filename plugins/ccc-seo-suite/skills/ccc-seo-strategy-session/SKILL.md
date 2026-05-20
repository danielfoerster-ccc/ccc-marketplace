---
name: ccc-seo-strategy-session
description: |
  The full strategy build / refresh orchestrator. Composes: tools-audit (refresh) → classify-urls → tools-plan with DataForSEO competitor SERP enrichment → dual-strategy tree generation → cluster index briefs → ideate-topics first pass (3 pillars × 3 silos × 3 sub-silos minimum, or BOFU/MOFU equivalent) → topic queue. Output: complete `00 - Strategy.md` with pillar tree + populated topic queue ready for `ccc-seo-publish-next` to consume. Two modes: `initial` (first build at onboarding) and `refresh` (quarterly evidence-based adjustment).
  Use this skill when an operator says "build the strategy", "strategy session", "generate the pillar tree", "create the topic queue", "refresh the strategy", or when `ccc-seo-onboard` recommends the next step or `ccc-seo-quarterly-review` decides a refresh is warranted.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.3.0
  layer: orchestration-surface
  category: user-task-orchestrator
  pattern: orchestrator-selective-dispatch
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

**Workflow: Dispatch audit → dispatch classify → dispatch plan → decide tree inline → dispatch ideate-topics → populate queue + build report inline.**

## What this is

The strategy build orchestrator. After onboarding captures who-the-client-is + how-they-operate, this skill builds what-they're-going-to-publish. End state: a populated pillar tree + topic queue ready for `ccc-seo-publish-next` to start producing articles.

Two modes:
- **`initial`** — first strategy build at onboarding. From-scratch pillar tree generation.
- **`refresh`** — quarterly refresh against accumulated evidence (GSC opportunities, cohort patterns, audit deltas). Delta + recommendations rather than full re-plan.

## The orchestration model — read this before running

This orchestrator uses **selective dispatch**. The dispatch decision rule applies at *sub-skill granularity inside this orchestrator*: dispatch a composed unit as a scoped `Task` sub-agent **only when it is both (a) genuinely heavy** — loads a large playbook/wrap, scrapes, generates long-form, or processes large data — **and (b) self-contained** — its result is consumable by the next stage as a structured return or a persisted file read by path. Keep inline: light decision/scoring steps, and any synthesis / judgment stage where the orchestrator must see the data to do its job well. This is the [[Decisions & Rules#The Dispatch Decision Rule|Dispatch Decision Rule]] applied per composed unit, established by the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]].

Applied to this skill's stages:

- **Stage 1 — `ccc-seo-tools-audit` → DISPATCHED** (when it runs at all). Heavy + self-contained: it wraps the `seo:seo-audit` marketplace skill and runs a slow Seomator crawl (148 rules), persisting a dated audit file. The crawl output is pure noise to the orchestrator; the critical-issue list comes back as a structured return + a persisted path. Note the conditional: if `01 - Tech Audit/` has a file < 7 days old (and mode is `initial`), the audit is skipped entirely — there is nothing to dispatch.
- **Stage 2 — `ccc-seo-classify-urls` → DISPATCHED.** Heavy + self-contained: it crawls the full site (sitemap + depth-3 fallback), fetches metadata for every URL, and runs LLM classification across the whole footprint, persisting `02 - URL Inventory.md`. The crawl + per-URL metadata is large; the result is a thin structured return + a persisted file.
- **Stage 3 — Competitor SERP enrichment → INLINE procedural, with a dispatch option.** This is *not* a composed atomic skill — it is orchestrator-procedural work using `_lib/dataforseo-client.js` (bulk SERP) + Tavily Extract over 5+ competitor sites. It is moderately heavy. Run it inline by default (it feeds Stage 4's brief directly and the orchestrator wants the competitor findings in view for Stage 5). If a run hits many competitors and the Tavily scrape bloats the context, it MAY be dispatched as a raw procedural `Task` that returns `{competitors_path, top5_summary}` — but it is not a named composed skill, so this is the exception, not the default.
- **Stage 3a — Brand-Term Reality Check → INLINE.** A light decision unit: one SERP call per brand-term + a disconnect heuristic over the top-5 results. It produces a judgment the orchestrator must surface at Stage 5. Dispatching it would pay a full sub-agent spawn cost to isolate almost nothing.
- **Stage 4 — `ccc-seo-tools-plan` → DISPATCHED.** Heavy + self-contained: it wraps the `seo:seo-plan` marketplace skill, runs DataForSEO competitor SERP enrichment, selects an industry template, and generates the dual-strategy tree, persisting the plan file. The marketplace wrap + SERP data is heavy; the plan comes back as a persisted path + a structured summary.
- **Stage 5 — Operator review + prioritization decision → INLINE.** Judgment. The pillar tree, the brand-term rename decision, and the prioritization-strategy choice are strategic calls the orchestrator must own with the data in view.
- **Stage 8 — `ccc-seo-ideate-topics` → DISPATCHED.** Heavy + self-contained: it is invoked once per pillar and once per silo (pillar_count × silos × sub-silos — dozens of calls), each running LLM ideation from the BenAI prompt chains + DataForSEO keyword enrichment + writing topic files. This is the heaviest stage by volume. Dispatch the **whole Stage 8 ideation pass as one sub-agent** — it loops internally over the approved pillar tree and writes every topic file; the orchestrator gets back a topic-count summary + the file paths. Spawning one sub-agent per ideate call would multiply the harness-entry tax dozens of times.
- **Stages 6, 7, 9 — Strategy.md commit / pillar files / queue order → INLINE.** Bookkeeping over the operator-approved tree — light writes, not heavy work.
- **Stage 11 — Strategy session report → INLINE.** The `.docx` report is a deliverable whose value is synthesis: the strategy-decision narrative, the competitor-landscape story, the prioritization rationale. That synthesis must be done in a context that has seen the data.

**What stays in the orchestrator (never dispatched):** the brand-term reality check, the pillar-tree + prioritization decisions, all operator checkpoints, the Strategy.md commits, the queue ordering, the report synthesis, the final summary. The orchestrator decides and synthesises; the heavy analytical + generative units (audit, classify, plan, ideate) are dispatched.

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
3. Read [[§2 — Dual Strategy Framework]] (dual strategy), [[§3 — The Company Wikipedia Pattern]] (company wikipedia pattern), [[§6 — The Closed GSC Learning Loop]] §6.1 (keyword identification — 5 lenses) to ground the run.

### Stage 1 — Audit refresh (conditionally dispatch `ccc-seo-tools-audit`)

1. **Audit-staleness check first (orchestrator, inline).** Look at the most recent file in `01 - Tech Audit/`. If its date is **within the last 7 days** (and mode is `initial`), the audit is fresh — skip the dispatch, link-reference the existing audit, and proceed to Stage 2. Re-auditing a site audited days ago wastes time and (if CWV) money. (This was a friction point in the first engagement — onboarding's audit was hours old and the skill re-ran it anyway.)
2. If the most recent audit is **older than 30 days** (or absent), or mode is `refresh` (which always needs a fresh snapshot for trend comparison): **dispatch a scoped sub-agent** for `ccc-seo-tools-audit`.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-tools-audit`.
- Task: run a full-domain audit; in `refresh` mode also diff against the prior baseline.
- `client` — the client wikilink + the client SEO folder root path.
- `scope: full`; `compare_to_baseline: true` in refresh mode.
- Note: the sub-agent runs its own time-budget-check; crawls ≥35s estimated route to local execution.
- Files it must read (paths, not contents): the client's `01 - Tech Audit/` history directory, `00 - Strategy.md`.
- Credentials pointer: where Seomator / DataForSEO credentials live (vault config path).
- Expected output: a dated audit file persisted to `01 - Tech Audit/`.
- Return contract: critical-issue count + the prioritised findings list (+ trend deltas in refresh mode); the persisted audit file path.

**On return:** the orchestrator carries the audit summary + path forward — critical issues become priority constraints fed into the Stage 4 brief.

### Stage 2 — URL classification (dispatch `ccc-seo-classify-urls`)

**Dispatch a scoped sub-agent** for `ccc-seo-classify-urls`. The orchestrator does NOT crawl the site or run per-URL classification itself — the full-site crawl + LLM classification across every URL is the heavy, self-contained work that belongs in a clean context.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-classify-urls`.
- Task: crawl + classify every URL into its structural role; persist the inventory.
- `client` — the client wikilink + the client SEO folder root path.
- `mode` — `initial` (full crawl + classify) or `refresh` (incremental — only new/changed URLs).
- `url_source: crawl`.
- Files it must read (paths, not contents): `00 - Strategy.md` (for exclusions), any prior `02 - URL Inventory.md` (to preserve manual overrides).
- Expected output: `02 - URL Inventory.md` written/updated, manual overrides preserved.
- Return contract: total URL count, per-role counts, flagged-for-review items, pattern mismatches; the persisted inventory file path.

**On return:** the orchestrator carries the inventory summary + path forward.

### Stage 3 — Competitor SERP enrichment (orchestrator-procedural, inline)

This stage is **not a composed atomic skill** — it is orchestrator-procedural work, run inline by default so its competitor findings stay in view for the Stage 4 brief and the Stage 5 operator review. If a run hits many competitors and the Tavily scrape bloats the context materially, it MAY be dispatched as a raw procedural `Task` returning `{competitors_path, top5_summary}` — the exception, not the default.

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

### Stage 3a — Brand-Term Reality Check  *(added v0.2.0 — mandatory; orchestrator, inline)*

**This stage is non-negotiable. Skipping it risks building an entire pillar against the wrong SERP.** It stays inline — it is a light decision unit (one SERP call per brand-term + a disconnect heuristic), and its judgment must be in the orchestrator's view to surface at Stage 5.

The client's strategic brand-term may mean something completely different in Google than in the client's head. In the first engagement, the client's brand-term "Verantwortungsvolle Männlichkeit" turned out to be SERP-occupied by NGOs (Plan International, Heinrich Böll Stiftung) and political discourse — not coaching. Building a pillar named after that term would have meant 19 topics competing against organisations we cannot outrank, in a content-field that isn't even ours.

Procedure:
1. Extract from `00 - Strategy.md` frontmatter the client's `brand_term` (and any `brand_term_internal` / strategic positioning phrase from the Business Overview).
2. Run a dedicated SERP query for each brand-term via `_lib/dataforseo-client.js`.
3. **Disconnect heuristic:** examine the top-5 organic results. Do they belong to the client's actual competitive field (coaching / consulting / the client's industry)? Or to an adjacent-but-wrong field (NGO / politics / academia / news / government)?
   - If top-5 are field-appropriate → brand-term is SEO-safe, can be a pillar/silo target.
   - If top-5 are wrong-field → **DISCONNECT FLAG.** The brand-term must NOT be used as a pillar/silo/sub-silo target keyword. The client keeps the term internally; the SEO-pillar gets a different, field-appropriate name.
4. Persist the check to `_planning/brand-term-reality-check-{YYYY-MM-DD}.md` with the decision documented.
5. **If a DISCONNECT FLAG fires:** surface it to the operator at Stage 5 explicitly, with 2-3 alternative pillar-term options and their SERP-realities. The operator decides the rename. The client must be told about the rename transparently (this becomes a line item in the `ccc-seo-client-handoff` strategy-review doc).

### Stage 4 — Strategic plan generation (dispatch `ccc-seo-tools-plan`)

**Dispatch a scoped sub-agent** for `ccc-seo-tools-plan`. The orchestrator does NOT run the `seo:seo-plan` marketplace wrap, the DataForSEO SERP enrichment, or the dual-strategy tree generation itself — that is heavy, self-contained work.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-tools-plan`.
- Task: generate the dual-strategy plan for the client (pillar tree for Service, BOFU/MOFU/TOFU funnel for Product).
- `client` — the client wikilink + the client SEO folder root path.
- `mode` — `initial` or `refresh`.
- Inputs to point at by PATH (never inline the contents): `00 - Strategy.md`, the Stage 2 `02 - URL Inventory.md`, the Stage 1 audit file path (or "audit fresh — skipped" with the link-referenced existing file), the Stage 3 `_planning/competitors-{date}.md`, plus `08 - GSC/opportunities.md` + `11 - Cohorts/winners-pattern.md` in refresh mode.
- Pass the Stage 1 critical-issue list as an explicit planning constraint in the brief.
- Credentials pointer: where DataForSEO credentials live (vault config path).
- Expected output: the plan persisted to `_planning/plan-{YYYY-MM-DD}-{mode}.md`.
- Return contract: the plan file path + a structured summary of the proposed pillar tree (or funnel), per-pillar rationale, recommended cadence.

**On return:** the orchestrator carries `{plan_path, plan_summary}` forward into the Stage 5 operator review.

### Stage 5 — Operator review of strategy + prioritization decision (orchestrator, inline)

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

### Stage 8 — Topic ideation first pass (dispatch `ccc-seo-ideate-topics`)

**Dispatch the whole ideation pass as ONE scoped sub-agent.** This is the heaviest stage by volume — `ccc-seo-ideate-topics` is invoked once per Pillar and once per generated Silo (pillar_count × silos × sub-silos — dozens of LLM-ideation + DataForSEO-keyword-enrichment calls writing dozens of topic files). Run inline, it dumps all of that generation scratch + keyword-API output into the orchestrator. Dispatched as one sub-agent that loops internally over the approved tree, all of it stays in a throwaway context. Do **not** spawn one sub-agent per ideate call — that multiplies the harness-entry tax dozens of times; one sub-agent runs the whole loop.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-ideate-topics`.
- Task: run the full topic-ideation pass over the operator-approved pillar tree. For Service strategy: for each Pillar, ideate `topic_count_per_silo` Silos (default 3); for each generated Silo, ideate `topic_count_per_silo` Sub-Silos (default 3). For Product strategy: for each BOFU page, ideate MOFU children; for each MOFU article, ideate TOFU children.
- `client` — the client wikilink + the client SEO folder root path.
- Inputs by PATH: the approved pillar tree in `00 - Strategy.md`, the Pillar files in `03 - Pillars/`, the plan file from Stage 4.
- Parameters: `topic_count_per_silo`, `pillar_count`.
- Credentials pointer: where DataForSEO credentials live (vault config path — for keyword enrichment).
- Expected output: Silo topic files at `04 - Silos/[Pillar]/[Silo].md` and Sub-Silo files at `05 - Sub-Silos/[Pillar]/[Silo]/[Sub-Silo].md` (or MOFU/TOFU equivalents for Product), each with complete topic frontmatter.
- Return contract: counts (pillars, silos, sub-silos generated) + the list of created topic file paths + any DataForSEO-validation flags (e.g. zero-volume KWs).

**On return:** the orchestrator carries the topic counts + file paths forward. End state: pillar count × 3 silos × 3 sub-silos = 27 topics queued (default). Plus 3 pillar topics. Total: 30 topics in queue.

### Stage 9 — Queue order in Strategy.md

Append all generated topics to the topic queue section in `00 - Strategy.md`:
- **Pillar-order** follows the `prioritization_strategy` decided in Stage 5 (`quick-win` / `volume-first` / `hybrid` / `manual`).
- **Within a pillar:** Pillars first, Silos second, Sub-Silos third (BFS — pillars before deeper) — UNLESS the first-article-modification applies (see note).
- Within each level: ordered by KW search volume × intent fit × cohort weighting (when available).
- Each entry: target KW, intent, parent silo, target word count (from shape), priority.

**First-article modification:** For Greenfield clients on `quick-win` strategy, the first article shipped is often NOT the pillar-index page (which usually has near-zero own volume) but the strongest conversion-intent sub-silo from the first pillar — a direct PAA-hit. The pillar-index then ships as article 4-5 once sub-silos exist for it to link. This is a deliberate deviation from strict BFS; `ccc-seo-pillar-wave-launch` formalises the first-5-weeks sequence. Record the first-article choice in the queue's `next_up` marker.

### Stage 10 — Operator review of queue

**Operator checkpoint** (if interactive): operator reviews:
- The topic queue (typically 30 topics).
- Operator can: approve, reorder priorities, defer specific topics, drop specific topics.

### Stage 11 — Strategy session report (orchestrator, inline)

Build the `.docx` report **inline** — the synthesis (strategy-decision narrative, competitor-landscape story, prioritization rationale) must happen in a context that has seen the data carried forward from the dispatched stages and the operator decisions.

Generate a `.docx` report at `_reports/strategy-sessions/{YYYY-MM-DD}-strategy-session-{mode}.docx`. **Use `_lib/docx-helpers.js`** for CCC-branded output (avoids the smart-quote build-bug + re-defining brand constants). Persist the build-script alongside the output for re-generation.

Report contents:
- Strategy decision summary.
- Pillar tree visualisation.
- Topic queue (top 20 next-up).
- Competitor landscape findings.
- Brand-Term Reality-Check result (if a rename happened).
- Prioritization-strategy chosen + rationale.
- Audit findings affecting strategy.
- Recommended publishing cadence.
- For refresh mode: delta from prior strategy.

This report is the *internal* deliverable. For the *client-facing* version (jargon-free, "Themen-Plan zur Review"), run `ccc-seo-client-handoff handoff_type=strategy-review` afterwards — do NOT hand this internal .docx to the client directly.

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
stages_dispatched: [tools-audit, classify-urls, tools-plan, ideate-topics]
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

Full methodology: [[§2 — Dual Strategy Framework]] (dual strategy framework — what this orchestrator implements), [[§3 — The Company Wikipedia Pattern]] (company wikipedia pattern — what the strategy targets), [[§6 — The Closed GSC Learning Loop]] (closed GSC learning loop — refresh mode reads its outputs).

Dispatch doctrine: [[Decisions & Rules#The Dispatch Decision Rule|The Dispatch Decision Rule]] — applied here at sub-skill granularity (the Dispatch-Selection Rule). Test that produced this skill's selective-dispatch design: [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]].

Atomic skills composed:
- [[ccc-seo-tools-audit]] — Stage 1, dispatched (conditionally — skipped if a fresh audit exists)
- [[ccc-seo-classify-urls]] — Stage 2, dispatched
- [[ccc-seo-tools-plan]] — Stage 4, dispatched
- [[ccc-seo-ideate-topics]] — Stage 8, dispatched (whole ideation pass as one sub-agent)

## Rules (Update This Section When Things Go Wrong)

0a. **Dispatch Stages 1, 2, 4, 8 each with a complete, self-contained brief.** Each brief must let the atomic skill run standalone: the skill to load, the task, `client` + folder root path, the mode, the credentials pointer, the file paths to read, the expected output, the return contract. An under-briefed sub-agent corrodes the output — a well-briefed one does not. Write each brief as if to a smart colleague with zero prior context.
0b. **Pass file paths, not file contents, in every brief.** Hand the sub-agent the client SEO folder root path + specific file paths; let it read them in its own context. Pasting contents re-bloats the orchestrator — the exact thing dispatch avoids.
0c. **Dispatch the whole Stage 8 ideation pass as ONE sub-agent.** `ccc-seo-ideate-topics` is invoked dozens of times across the pillar tree. One sub-agent loops over the approved tree internally; spawning one sub-agent per ideate call multiplies the harness-entry tax dozens of times for no gain.
0d. **Do NOT dispatch Stage 3a, Stage 5, the Strategy.md commits (6/7/9), or the report (11).** Stage 3a is a light decision; Stage 5 is a strategic go/no-go that must see the data; 6/7/9 are light bookkeeping writes; the report is synthesis. Dispatching any of them pays a sub-agent's fixed spawn cost for no real noise isolation. This is selective dispatch by design — not an oversight to "fix" by dispatching everything.
0e. **The orchestrator never runs the Seomator crawl, the URL classification, the `seo:seo-plan` wrap, or the ideation loop inline.** If you catch yourself crawling, classifying, or generating topic files in the orchestrator's context, stop — that is the monolithic-session failure mode this version exists to fix.
1. **Never skip Stage 3a (Brand-Term Reality-Check).** A client's brand-term can be SERP-occupied by a completely different field. Building a pillar against the wrong SERP wastes an entire content-wave. This stage is cheap (one SERP call) and prevents an expensive mistake.
2. **Never re-run a fresh audit.** If `01 - Tech Audit/` has a file dated within 7 days, link-reference it and skip Stage 1's re-run. Re-auditing days-old data wastes time and (with CWV) money.
3. **Never confuse Ads-volume with real interest.** Google-Ads `search_volume` under-counts PAA-driven long-tail. A KW showing volume=0 can still pull steady long-tail traffic — Reddit ranking #1 for a "volume=0" term proves the interest exists. Weight conversion-intent over raw volume, especially for Greenfield clients.
4. **Never skip operator review at Stage 5.** Pillar tree + prioritization decisions are strategic; the operator owns them.
5. **Never auto-commit pillar tree changes in refresh mode without operator approval.** Refresh recommendations are recommendations.
6. **Never generate sub-silos before silos.** BFS order matters — operators publish pillars first to anchor topical authority.
7. **Never skip Pillar files generation in Service mode.** Cluster index pages are required (methodology §3.4).
8. **Never use a Sub-Silo target count > 5 without explicit operator request.** 5 × 3 × 5 = 75 sub-silos is a ~22-month pipeline at 1/week. When the operator does request it, generate a `ccc-seo-pillar-wave-launch` plan so the first 30 topics are clearly prioritised — otherwise the pipeline-depth becomes unmanageable.
9. **Never hand the internal strategy-session .docx to the client.** Run `ccc-seo-client-handoff` for the jargon-free version.
10. **Never skip the cohort weighting hand-off to ideate-topics in refresh mode.** Compounding depends on it.

## Anti-patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| Orchestrator runs the Seomator crawl / URL classification / `seo:seo-plan` wrap / ideation loop itself | Orchestrator context bloats with crawl output, per-URL metadata, marketplace-wrap scratch, and dozens of topic generations; the Stage 5 decision + report synthesis degrade | Treating the heavy composed skills as inline steps | Brief-and-dispatch Stages 1, 2, 4, 8; the orchestrator only plans, decides, and synthesises |
| Brief pastes the strategy doc / URL inventory / plan file inline | The dispatch saves nothing — the orchestrator still carries the heavy content | Confusing "hand off the work" with "hand off the text" | Pass file *paths*; the sub-agent reads them in its own context |
| One sub-agent spawned per `ccc-seo-ideate-topics` call | Harness-entry tax paid dozens of times; far more expensive than running inline | Treating each ideate call as an independent dispatch unit | Dispatch the whole Stage 8 pass as one sub-agent that loops over the approved tree |
| Stage 3a brand-term check dispatched as a sub-agent | A full sub-agent spawn cost paid to isolate a single SERP call | Over-applying dispatch to a light decision unit | Run Stage 3a inline — its judgment must be in the orchestrator's view for Stage 5 |
| Stage 5 strategy decision dispatched to a sub-agent | The pillar-tree + prioritization call gets made blind to the audit, inventory, plan, and competitor data | Dispatching judgment, not just execution | Keep Stage 5 inline — the strategic go/no-go needs the data in view |
| Strategy report rebuilt by re-reading all dispatched outputs | Orchestrator re-bloats at the end | Not trusting the dispatched stages' structured returns | Assemble the report from the carried-forward returns + the operator decisions |
| Re-running a fresh audit | Wastes time and (with CWV) money | Ignoring the Stage 1 staleness check | If `01 - Tech Audit/` has a file < 7 days old (initial mode), skip the dispatch and link-reference it |

## Self-Improvement

When a strategy-session reveals a new failure-mode or a SERP-pattern worth remembering:
- Add it to the Rules section above
- If a brand-term-disconnect pattern recurs for an industry, note the industry + the wrong-field it collides with

When a dispatched stage produces a weak output:
- The first suspect is brief quality, not the atomic skill. Check what context the brief omitted, then tighten that stage's brief shape.

When a published strategy produces strong early rankings (visible at the first quarterly review):
- Note which `prioritization_strategy` was used + the client-situation — sharpen the Stage-5 decision-tree

This skill compounds: every engagement teaches the next one's strategy-build.

## Version history

- **v0.3.0 (2026-05-20)** — Restructured from inline-invocation to **orchestrator-selective-dispatch**. Stages 1, 2, 4, 8 (`ccc-seo-tools-audit`, `ccc-seo-classify-urls`, `ccc-seo-tools-plan`, `ccc-seo-ideate-topics`) are now explicit scoped sub-agent dispatches, each with a complete brief and a stated return contract — all four are genuinely heavy + self-contained (the Seomator crawl; the full-site URL crawl + LLM classification; the `seo:seo-plan` marketplace wrap + DataForSEO enrichment; the dozens-of-calls ideation loop). Stage 1 dispatches conditionally (skipped when a fresh audit exists). Stage 8 dispatches the whole ideation pass as one sub-agent. Stage 3a (brand-term reality check), Stage 5 (operator review + prioritization decision), Stages 6/7/9 (Strategy.md commits), and Stage 11 (report) stay inline by design: light decision, strategic go/no-go, light bookkeeping, and synthesis respectively. Stage 3 (competitor SERP enrichment) is orchestrator-procedural and stays inline by default (dispatchable as a raw procedural Task only if a heavy-scrape run bloats the context). Added the orchestration-model section, dispatch rules to `## Rules`, an anti-patterns table, a `## Self-Improvement` dispatch note, `## Version history`, and `pattern: orchestrator-selective-dispatch`. Implements the rollout of the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]] verdict per Phase 2 of the [[2026-05-14 — Multi-Agent & Token-Efficiency Architecture — Assessment]]. Per skill-creator-pro: this was a surgical structural pattern-change against a target validated by the head-to-head test, so the full eval loop was not re-run.
- **v0.2.0** — Added the mandatory Stage 3a Brand-Term Reality-Check, prioritization-strategy decision tree, `_lib/` shared libraries.
- **v0.1.0** — Initial build. Inline-invocation orchestrator composing 4 atomic skills.
