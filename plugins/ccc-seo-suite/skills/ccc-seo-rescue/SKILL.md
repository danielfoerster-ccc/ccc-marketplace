---
name: ccc-seo-rescue
description: |
  Engagement-start retrofit orchestrator for clients with substantial existing content. Runs ONCE at the beginning of an engagement when a client has > 20 existing articles (typical scenario: previous agency engagement, in-house content team, or older blog). Composes: tools-audit (full) + classify-urls (full crawl) + tools-optimize (full GSC analysis) + tools-content audit-mode (E-E-A-T scoring on every existing article) + tools-geo audit-mode (AI-citation readiness on every existing article) + link-internal retrofit-mode + trigger-rewrite (existing-content opportunities prioritised by ROI). Outputs prioritised retrofit queue + rescue report. The first 90 days of a rescue engagement are typically high-ROI retrofit work (internal linking, E-E-A-T fixes, striking-distance rewrites) BEFORE the suite's new-content flywheel starts.
  Use this skill when an operator says "rescue this client", "retrofit existing content", "fix the existing site first", "rescue mode", "audit and improve everything", or when `ccc-seo-onboard` detects a client with > 20 existing articles and recommends rescue before strategy-session. Particularly relevant for clients arriving with E-E-A-T crises (indexing failures, ranking decline, agency-departure remediation).
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.2.0
  layer: orchestration-surface
  category: user-task-orchestrator
  pattern: orchestrator-selective-dispatch
  composes:
    - ccc-seo-tools-audit
    - ccc-seo-classify-urls
    - ccc-seo-tools-optimize
    - ccc-seo-tools-content
    - ccc-seo-tools-geo
    - ccc-seo-link-internal
    - ccc-seo-trigger-rewrite
distribution: ccc-internal
---

# ccc-seo-rescue — Engagement-Start Retrofit

**Workflow: Dispatch every audit/score/graph pass → build the ROI-ranked retrofit queue inline → operator decides scope → dispatch the apply passes.**

## What this is

The most under-appreciated session in the suite. For clients arriving with substantial existing content — often the majority of paying CCC clients — rescue mode produces the high-ROI early wins that justify the engagement before any new content has been written.

Internal linking retrofit alone can lift entire sites. E-E-A-T retrofits recover lost indexing. Striking-distance rewrites convert near-ranks into ranks. Combined, the first 90 days of a rescue engagement often show stronger results than the next 6 months of new-content work — because we're improving content that already exists rather than waiting for new content to mature.

This is the session that makes Investment Mastery (with its 37% non-indexing crisis) the suite's flagship case study. The recovery arc is the story.

## The orchestration model — read this before running

This orchestrator uses **selective dispatch** — and it is the most dispatch-heavy of the five SEO orchestrators, because almost every stage is a heavy full-site analytical pass. The dispatch decision rule applies at *sub-skill granularity inside this orchestrator*: dispatch a composed unit as a scoped `Task` sub-agent **only when it is both (a) genuinely heavy** — loads a large playbook/wrap, scrapes, generates long-form, or processes large data — **and (b) self-contained** — its result is consumable by the next stage as a structured return or a persisted file read by path. Keep inline: light decision/scoring units, and any synthesis / judgment stage where the orchestrator must see the data. This is the [[Decisions & Rules#The Dispatch Decision Rule|Dispatch Decision Rule]] applied per composed unit, established by the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]].

Applied to this skill's stages:

- **Stage 1 — `ccc-seo-tools-audit` → DISPATCHED.** Heavy + self-contained: the `seo:seo-audit` marketplace wrap + a slow Seomator crawl (148 rules) across the full domain, persisting a dated audit file.
- **Stage 2 — `ccc-seo-classify-urls` → DISPATCHED.** Heavy + self-contained: a full-site crawl + LLM classification of every URL, persisting `02 - URL Inventory.md`.
- **Stage 3 — `ccc-seo-tools-optimize` → DISPATCHED.** Heavy + self-contained: it wraps `seo:seo-optimize` (~148 KB of playbooks), pulls the GSC CSV, runs 8 analysis modes, persists snapshots.
- **Stage 4 — `ccc-seo-tools-content` E-E-A-T audit pass → DISPATCHED as ONE sub-agent.** It wraps the `seo:seo-content` marketplace skill and in rescue is invoked **for every existing article** (often 100–200+). That whole per-article loop is heavy + self-contained — it persists a per-article audit report. Dispatch the entire Stage 4 pass as one sub-agent that loops internally; do NOT spawn one sub-agent per article.
- **Stage 5 — `ccc-seo-tools-geo` AI-citation audit pass → DISPATCHED as ONE sub-agent.** Same shape: wraps `seo:seo-geo`, scores every existing article (article-gate audit) plus a site-level pass. Heavy loop, self-contained. One sub-agent for the whole pass.
- **Stage 6 — `ccc-seo-link-internal` retrofit audit → DISPATCHED.** Heavy + self-contained: it builds the full internal-link graph across the entire content base and scores every page across 6 tiers, persisting a diff/audit report.
- **Stage 7 — Unified retrofit queue build → INLINE.** This is the synthesis stage — the orchestrator aggregates the findings of Stages 1–6 into one ROI-ranked queue. It must *see* the audit issues, the GSC opportunity surface, the E-E-A-T flags, the GEO flags, and the linking tiers to rank them. `ccc-seo-trigger-rewrite` — a light decision-layer skill (`Read/Write/Edit/Glob` only, heuristic scoring, no scrape, no heavy wrap) — runs **inline** here as the decision engine for the existing-content opportunities. Dispatching it would pay a full sub-agent spawn cost to isolate almost no noise, and dispatching the queue build would make the ROI synthesis blind to the data.
- **Stage 8 — Operator review + scope decision → INLINE.** Judgment — the operator owns the scope call with the queue in view.
- **Stage 9 — Apply approved retrofits → DISPATCH the heavy apply passes.** `ccc-seo-link-internal` in `retrofit` + `apply: true` mode is a heavy WP-write pass over many articles → dispatch it. `ccc-seo-tools-schema` generate-mode for missing schemas → dispatch. Striking-distance + E-E-A-T rewrites are queued for `ccc-seo-publish-next` in `rewrite` mode — that orchestrator runs its own all-dispatch flow per article, separately.
- **Stage 10 — Rescue report → INLINE.** The `.docx` report is a deliverable whose value is synthesis: the pre/post-rescue narrative, the recovery-arc story, the expected-impact projection. That synthesis must be done in a context that has seen the data.

**What stays in the orchestrator (never dispatched):** the rescue-threshold pre-flight, the Stage 7 unified-queue synthesis (with `ccc-seo-trigger-rewrite` running inline as its decision engine), the Stage 8 scope decision, the report synthesis, the handoff, the final summary. The orchestrator decides and synthesises; the heavy full-site analytical + apply passes are dispatched.

## When to use

- **Engagement start, after onboarding, when client has > 20 existing articles.** `ccc-seo-onboard`'s Block H (existing state) is the trigger — if existing content count exceeds threshold, recommend rescue.
- **Recovery scenarios** specifically: client arriving from agency departure, client experiencing indexing crisis (de-indexed / "Discovered – currently not indexed" / "Crawled – currently not indexed"), client showing widespread ranking decline.
- **Periodic full-site refreshes** (every 12+ months for ongoing clients) — though `ccc-seo-quarterly-review` typically handles ongoing maintenance and a full rescue run rarely needs to happen twice per engagement.

## Inputs

- `client` (required) — wikilink.
- `interactive` (optional, default true).
- `scope` (optional, default `full`) — `full` (all 7 tiers) or `tiers: [list]` (subset, e.g., `[1, 2, 3]` for orphans + weak inbound + cross-cluster only).
- `apply_immediately` (optional, default false) — if true, applies tier 1+2 retrofits immediately after operator approval. If false, produces queue only.

## Procedure

### Stage 0 — Pre-flight (orchestrator, inline)

Pure orchestrator judgment — light reads, not dispatched.

1. Verify client is onboarded (`00 - Strategy.md` exists with focus + languages set). Capture the client SEO folder root path — the orchestrator needs it to brief every downstream dispatch.
2. Verify rescue threshold met: count existing articles in URL Inventory (or via crawl if inventory not yet built). If < 20, surface warning: "Rescue mode is heaviest. For < 20 articles, individual `ccc-seo-tools-*` calls are usually more efficient than full rescue. Proceed anyway?"
3. Verify credentials are configured (Seomator/DataForSEO, GSC, Tavily, WordPress). The orchestrator confirms they exist; the sub-agents will use them.
4. Read [[§5 — E-E-A-T as the Indexing Foundation]] (E-E-A-T as indexing foundation), [[§3 — The Company Wikipedia Pattern]] §3.5 (cross-cluster linking), [[§6 — The Closed GSC Learning Loop]] §6.1 (keyword identification).

### Stage 1 — Full audit baseline (dispatch `ccc-seo-tools-audit`)

**Dispatch a scoped sub-agent** for `ccc-seo-tools-audit` against the full client domain — the Seomator crawl (148 rules) is heavy, noisy, self-contained work.

**Brief to hand the sub-agent:** skill to load `ccc-seo-tools-audit`; task — full-domain audit, identify site-wide technical issues suppressing existing articles; `client` + the client SEO folder root path; `scope: full`, `compare_to_baseline: true`; the sub-agent runs its own time-budget-check (crawls ≥35s route to local execution); files by path — `01 - Tech Audit/` history, `00 - Strategy.md`; credentials pointer — Seomator/DataForSEO config path; expected output — a dated audit file persisted to `01 - Tech Audit/`; return contract — all technical issues by category, critical (blocking-indexing) issues prioritised, the persisted audit file path.

**On return:** the orchestrator carries the audit summary + path forward.

### Stage 2 — Full URL classification (dispatch `ccc-seo-classify-urls`)

**Dispatch a scoped sub-agent** for `ccc-seo-classify-urls` in `initial` mode — the full-site crawl + per-URL LLM classification is heavy, self-contained work.

**Brief to hand the sub-agent:** skill to load `ccc-seo-classify-urls`; task — full crawl + classify every URL into its structural role, flag pattern mismatches (articles not at the expected `/library/{cluster}/` pattern); `client` + the client SEO folder root path; `mode: initial`, `url_source: crawl`; files by path — `00 - Strategy.md` (exclusions), any prior `02 - URL Inventory.md`; expected output — `02 - URL Inventory.md` written; return contract — total URL count, per-role counts, pattern mismatches (the URL-migration opportunity list), the persisted inventory path.

**On return:** the orchestrator carries the inventory summary + path forward. Pattern mismatches feed Stage 7 as high-ROI URL-migration opportunities.

### Stage 3 — Full GSC analysis (dispatch `ccc-seo-tools-optimize`)

**Dispatch a scoped sub-agent** for `ccc-seo-tools-optimize` with `mode: all` — the `seo:seo-optimize` wrap (~148 KB of playbooks), the GSC pull, and the 8-mode analysis are heavy, self-contained work.

**Brief to hand the sub-agent:** skill to load `ccc-seo-tools-optimize`; task — full GSC analysis, all 8 modes, persist snapshots; `client` + the client SEO folder root path; `mode: all`; credentials pointer — GSC config path; expected output — GSC pull + deltas persisted under `08 - GSC/`; return contract — the skill's defined YAML: striking-distance, low-CTR, cannibalization, decline, top-performers-at-risk, and content-gap candidate lists; the persisted pull + deltas paths.

For rescue mode the focus is the first five — not new articles. Content gaps surface but are deferred to strategy-session post-rescue.

**On return:** the orchestrator carries the opportunity lists + paths forward.

### Stage 4 — E-E-A-T audit on every existing article (dispatch `ccc-seo-tools-content` as ONE sub-agent)

**Dispatch ONE scoped sub-agent** to run the E-E-A-T audit pass over every existing article. `ccc-seo-tools-content` wraps the `seo:seo-content` marketplace skill and is invoked per-article — across 100–200+ articles that whole loop is heavy + self-contained. Dispatch the **whole pass as one sub-agent** that loops internally; do NOT spawn one sub-agent per article (that multiplies the harness-entry tax by the article count).

**Brief to hand the sub-agent:** skill to load `ccc-seo-tools-content`; task — run `ccc-seo-tools-content` in `audit` mode (scoring only, no hard-block) for every existing article in the client's content base; capture the E-E-A-T score + per-signal breakdown per article; flag articles below threshold (warn at 70 non-YMYL, 80 YMYL); `client` + the client SEO folder root path; files by path — the article directory (`06 - Articles/` + any pre-suite content per the URL inventory), the Stage 2 `02 - URL Inventory.md` path; expected output — `_reports/rescue-eeat-audit-{YYYY-MM-DD}.md` with full per-article scores + the flagged subset; return contract — count of articles scored, count below threshold, the YMYL-correlation summary, the persisted audit-report path.

**On return:** the orchestrator carries the E-E-A-T summary + report path forward. For YMYL clients this pass often surfaces the indexing crisis explicitly: a large below-threshold share = the cause of de-indexing.

### Stage 5 — AI-citation readiness audit (dispatch `ccc-seo-tools-geo` as ONE sub-agent)

**Dispatch ONE scoped sub-agent** to run the AI-citation audit pass. `ccc-seo-tools-geo` wraps the `seo:seo-geo` marketplace skill; the per-article scoring pass plus the site-level pass is heavy + self-contained. One sub-agent for the whole pass.

**Brief to hand the sub-agent:** skill to load `ccc-seo-tools-geo`; task — run `article-gate` audit mode for every existing article (capture per-platform GEO score, flag low-scoring articles), then run `site-audit` mode for site-level off-site brand-presence signals; `client` + the client SEO folder root path; files by path — the article directory, the Stage 2 `02 - URL Inventory.md`; credentials pointer — Tavily config path; expected output — a per-article GEO audit report + a site-audit snapshot persisted; return contract — count scored, count below threshold, per-platform aggregate, the `brand_presence_ceiling` site-level flag, the persisted report paths.

**On return:** the orchestrator carries the GEO summary + the `brand_presence_ceiling` flag forward — surface the ceiling explicitly in the rescue report.

### Stage 6 — Internal linking retrofit audit (dispatch `ccc-seo-link-internal`)

**Dispatch a scoped sub-agent** for `ccc-seo-link-internal` in `retrofit` mode with `apply: false` — building the full internal-link graph across the entire content base and scoring every page across 6 tiers is heavy, self-contained work.

**Brief to hand the sub-agent:** skill to load `ccc-seo-link-internal`; task — full retrofit audit (no apply) across the existing content base; `client` + the client SEO folder root path; `mode: retrofit`, `apply: false`; files by path — the article directory, the Stage 2 `02 - URL Inventory.md`, `00 - Strategy.md`, the Stage 3 GSC pull path; expected output — a diff/audit report persisted under `09 - Internal Linking/`; return contract — per-tier counts (Tier 1 orphans, Tier 2 weak inbound, Tier 3 no cross-cluster, Tier 4 missing up-link to pillar, Tier 5 broken internal links, Tier 6 high-authority under-linking) + the persisted report path.

**On return:** the orchestrator carries the per-tier linking queue + report path forward.

### Stage 7 — Build the unified retrofit queue (orchestrator, inline)

This is the **synthesis stage** — kept inline. The orchestrator must see the findings of Stages 1–6 to rank them. `ccc-seo-trigger-rewrite` runs **inline** here as the decision engine for the existing-content opportunities — it is a light decision-layer skill (`Read/Write/Edit/Glob`, heuristic scoring, no scrape, no heavy wrap), and it benefits from sitting in the same context as the Stage 3 opportunity lists it scores. Read the persisted reports from Stages 1–6 by path where detail is needed; the structured returns already carried forward supply most of it.

Aggregate findings from Stages 1–6 into one prioritised queue, ordered by ROI (impact / effort):

**Highest ROI / lowest effort (do first):**
1. **Internal linking retrofit Tier 1+2** — orphans + weak inbound. One-paragraph inserts in source articles. Usually 5-line fix per article. Massive ranking lift potential.
2. **Title + meta rewrites for low-CTR pages** — text-only changes. No content rewrites.
3. **Schema additions** — adding missing FAQPage / BreadcrumbList / Article schema to existing articles via WPCode bulk pattern.
4. **Up-links to pillar** (Tier 4) — single-line fix per article.

**Medium ROI / medium effort:**
5. **Striking-distance article rewrites** — full content refresh for position 8–20 articles.
6. **E-E-A-T retrofits on indexing-failed articles** — author byline addition, citation enrichment, internal-link scaffolding.
7. **Cross-cluster connection retrofits** (Tier 3) — multi-article batches.
8. **Cannibalization consolidations** — merge or canonical.

**Lower ROI or higher effort (tackle after first round):**
9. **Decline investigations + content refresh** — needs root-cause analysis first.
10. **Pattern-mismatch URL migrations** — high-impact but high-friction (redirects, canonical changes, sitemap updates).
11. **Site-wide technical fixes** from audit — depends on severity.
12. **Defensive refreshes** for top-performers-at-risk.

### Stage 8 — Operator review + scope decision (orchestrator, inline)

Judgment — the operator owns the scope call with the queue in view. Not dispatched.

**Operator checkpoint** (interactive mode): operator sees the unified queue + per-tier ROI estimate + total effort estimate.

Operator decides:
- **Full retrofit:** approve all tiers; skill applies in batches over 4–8 weeks.
- **Aggressive retrofit:** Tiers 1–4 applied immediately; Tiers 5–8 over next month.
- **Conservative retrofit:** Tiers 1–3 only; defer everything else to `ccc-seo-quarterly-review`.
- **Custom subset:** operator selects specific tiers or specific items.

The decision drives Stage 9.

### Stage 9 — Apply approved retrofits (dispatch the heavy apply passes)

For the approved items, **dispatch the heavy apply passes as scoped sub-agents** — the orchestrator briefs and sequences, it does not run the WP writes itself:

- **Internal linking apply:** **dispatch `ccc-seo-link-internal`** in `retrofit` mode with `apply: true` — a heavy WP-write pass across many articles. Brief: skill to load, `client` + folder root path, `mode: retrofit`, `apply: true`, the Stage 6 audit report path as the input queue, the approved tier scope, the WordPress Application Password config pointer; return contract — links applied count, cross-cluster count, the diff report path.
- **Schema additions:** **dispatch `ccc-seo-tools-schema`** in generate mode for the missing schemas, then the WPCode bulk pattern via [[ccc-wordpress-seo-implementation]]. Brief: skill to load, `client` + folder root path, the article list needing schema, the schema types; return contract — schemas generated + the WPCode-pattern handoff note.
- **Meta rewrites:** not yet a dedicated atomic skill — for now, structured suggestions surfaced for manual operator action. **Phase 5 enhancement: add `ccc-seo-meta-rewrite` atomic for batch meta operations** (a dispatch candidate when it ships).
- **Striking-distance rewrites:** queue for `ccc-seo-publish-next` in `mode: rewrite`. The operator runs publish-next per article — that orchestrator runs its own all-dispatch flow separately; this orchestrator only produces the queue.
- **E-E-A-T retrofits:** similar to striking-distance — queue for publish-next in rewrite mode with the E-E-A-T constraints surfaced.

### Stage 10 — Rescue report (orchestrator, inline)

Build the `.docx` report **inline** — the synthesis (the pre/post-rescue narrative, the recovery-arc story, the expected-impact projection) must happen in a context that has seen the data carried forward from the dispatched stages and the operator's scope decision.

Generate `.docx` at `_reports/rescue/rescue-{YYYY-MM-DD}.docx`:

1. **Executive summary** — pre-rescue state vs. expected post-rescue state.
2. **Audit findings** — site-wide technical issues + priority.
3. **URL inventory summary** — total articles, pattern mismatches, orphans.
4. **GSC opportunity surface** — striking distance / low-CTR / cannibalization / decline counts.
5. **E-E-A-T audit** — articles below threshold, YMYL implications, indexing-failure correlation.
6. **AI-citation readiness audit** — per-platform aggregate, structural ceiling assessment.
7. **Internal linking audit** — per-tier counts.
8. **Unified retrofit queue** — what was approved, what was deferred, what was rejected.
9. **Expected impact** — based on tier ROI estimates, what to expect at d30 / d60 / d90.
10. **Recommended next** — when does rescue-mode work transition to suite normal cadence (typically when retrofit queue Tiers 1–4 are complete).

### Stage 11 — Hand off to ongoing cadence

After rescue work completes (typically 4–8 weeks of retrofit, depending on scope):
- Existing-content base is now performing closer to its potential.
- Surface to operator: "Rescue mode complete. Run `ccc-seo-strategy-session` next to plan new-content production. Then ongoing cadence: `ccc-seo-publish-next` (daily/weekly) + `ccc-seo-weekly-review` (weekly) + `ccc-seo-quarterly-review` (quarterly)."

### Stage 12 — Return

```yaml
status: complete | partial | aborted
client: "[[Client]]"
existing_articles_count: 187
audit_critical_issues: 4
url_inventory_pattern_mismatches: 23
striking_distance_count: 31
low_ctr_count: 18
cannibalization_count: 7
declining_count: 4
eeat_below_threshold: 23   # of 187 articles
geo_below_threshold: 47
internal_linking:
  orphans: 12
  weak_inbound: 84
  missing_cross_cluster: 65
  missing_up_link_pillar: 31
  broken_internal_links: 5
unified_queue_total: 287   # all opportunities across tiers
operator_approved_scope: "Full retrofit (all tiers)"
report_path: "_reports/rescue/rescue-2026-04-30.docx"
recommended_next: "Begin Tier 1+2 retrofits this week; run ccc-seo-strategy-session in parallel for new-content planning"
stages_dispatched: [tools-audit, classify-urls, tools-optimize, tools-content, tools-geo, link-internal, link-internal-apply, tools-schema]
```

## When NOT to use rescue

- Greenfield clients (no existing content, < 20 articles): skip directly to `ccc-seo-strategy-session`. Rescue would have nothing to operate on.
- Clients in mid-engagement after rescue has already run: use `ccc-seo-quarterly-review` for ongoing maintenance.
- Single-issue scenarios (e.g., "we have 5 broken links to fix"): use the relevant atomic skill directly. Rescue is a heavyweight orchestration; don't use it when atomic precision suffices.

## Investment Mastery as the canonical case study

Rescue mode IS the case study. The Investment Mastery 37% non-indexing crisis is the example arc:
- Pre-rescue: 37% of 200+ articles not indexed; ranking decline; YMYL E-E-A-T failures.
- Stage 1–6 produces full diagnosis: 78 articles below E-E-A-T threshold (cause of indexing failure); 12 orphans; 64 articles with weak inbound linking; 23 missing FAQPage schema; 18 striking-distance opportunities.
- Stage 7–9 retrofits: author retrofits + citation enrichment on the 78 affected articles; orphan + weak-inbound link scaffolding; schema additions via WPCode.
- 30 days post-rescue: indexing rate recovered from 63% to 89%. Striking-distance rewrites ranked. AI citations begin climbing.
- 60 days: site stabilised; suite begins normal new-content cadence.
- The recovery arc — from indexing crisis to stable + growing — is the case study that sells the suite to every other founder-led service business with existing content.

## Rules (Update This Section When Things Go Wrong)

1. **Dispatch Stages 1–6 (and the Stage 9 apply passes) each with a complete, self-contained brief.** Each brief must let the atomic skill run standalone: the skill to load, the task, `client` + folder root path, the mode flags, the credentials pointer, the file paths to read, the expected output, the return contract. An under-briefed sub-agent corrodes the output — a well-briefed one does not. Write each brief as if to a smart colleague with zero prior context.
2. **Pass file paths, not file contents, in every brief.** Hand the sub-agent the client SEO folder root path + specific file paths; let it read them in its own context. Pasting contents re-bloats the orchestrator — the exact thing dispatch avoids.
3. **Dispatch the Stage 4 E-E-A-T pass and the Stage 5 GEO pass as ONE sub-agent each.** Both wrap a marketplace skill invoked per-article across 100–200+ articles. One sub-agent loops over the article base internally; spawning one sub-agent per article multiplies the harness-entry tax by the article count — catastrophic on a large rescue.
4. **Do NOT dispatch Stage 7, Stage 8, or Stage 10.** Stage 7 is ROI synthesis that must see all six analyses (and `ccc-seo-trigger-rewrite` is a light decision skill run inline as its engine); Stage 8 is the operator's scope go/no-go; Stage 10 is report synthesis. Dispatching any of them pays a sub-agent's fixed spawn cost for no real noise isolation, and dispatching the synthesis makes it blind to the data. This is selective dispatch by design.
5. **The orchestrator never runs a Seomator crawl, a GSC analysis, a per-article scoring loop, or a WP-write pass inline.** If you catch yourself crawling, scoring, or pushing to WordPress in the orchestrator's context, stop — that is the monolithic-session failure mode this version exists to fix. On a 200-article rescue, running these inline guarantees context compaction.
6. **Do NOT run rescue on greenfield clients.** Wastes time and produces empty findings. < 20 articles → use atomic skills directly or skip to `ccc-seo-strategy-session`.
7. **Do NOT auto-apply retrofits without operator approval, even Tier 1.** Bulk changes have bulk consequences.
8. **Do NOT promise "30 days to recover indexing" deterministically.** Client circumstances vary; surface the pattern + expected impact, never absolute guarantees.
9. **Do NOT skip the E-E-A-T audit for YMYL clients.** The whole point of rescue for YMYL clients is YMYL recovery.
10. **Do NOT defer internal-linking Tier 1 + 2 work.** Highest ROI, lowest effort. Always in scope.
11. **Do NOT compete for orchestration scope with `ccc-seo-strategy-session`.** Rescue is BEFORE strategy. Strategy plans new content; rescue fixes existing content. Run rescue, then run strategy.
12. **Carry the dispatched stages' paths forward, not their file contents.** Stage 7 and Stage 10 read a persisted report once when they need detail — they do not re-run a dispatched stage.

## Reference

Full methodology: [[§5 — E-E-A-T as the Indexing Foundation]] (E-E-A-T as indexing foundation — section 5.3 specifically covers the recovery pattern, which this skill operationalises), [[§3 — The Company Wikipedia Pattern]] §3.5 (cross-cluster linking — internal linking retrofit), [[§6 — The Closed GSC Learning Loop]] §6.1 (keyword identification — what tools-optimize surfaces).

Dispatch doctrine: [[Decisions & Rules#The Dispatch Decision Rule|The Dispatch Decision Rule]] — applied here at sub-skill granularity (the Dispatch-Selection Rule). Test that produced this skill's selective-dispatch design: [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]].

Atomic skills composed:
- [[ccc-seo-tools-audit]] — Stage 1, dispatched
- [[ccc-seo-classify-urls]] — Stage 2, dispatched
- [[ccc-seo-tools-optimize]] — Stage 3, dispatched
- [[ccc-seo-tools-content]] — Stage 4, dispatched (whole E-E-A-T pass as one sub-agent)
- [[ccc-seo-tools-geo]] — Stage 5, dispatched (whole GEO pass as one sub-agent)
- [[ccc-seo-link-internal]] — Stage 6 dispatched (audit) + Stage 9 dispatched (apply)
- [[ccc-seo-trigger-rewrite]] — Stage 7, inline (light decision engine for the queue synthesis)

## Anti-patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| Orchestrator runs the Seomator crawl / GSC analysis / per-article scoring inline | On a 200-article rescue the orchestrator context compacts mid-run; findings are lost; the queue synthesis degrades | Treating the heavy composed skills as inline steps | Brief-and-dispatch Stages 1–6; the orchestrator only plans, synthesises, and decides |
| One sub-agent spawned per article in Stage 4 / Stage 5 | Harness-entry tax paid 100–200+ times; the rescue becomes absurdly expensive | Treating each per-article scoring call as an independent dispatch unit | Dispatch the whole pass as one sub-agent that loops over the article base internally |
| Brief pastes the URL inventory / audit report / article bodies inline | The dispatch saves nothing — the orchestrator still carries the heavy content | Confusing "hand off the work" with "hand off the text" | Pass file *paths*; the sub-agent reads them in its own context |
| Stage 7 unified-queue build dispatched to a sub-agent | The ROI ranking gets made blind to the audit / GSC / E-E-A-T / GEO / linking findings | Dispatching synthesis, not just execution | Keep Stage 7 inline — the ROI ranking needs all six analyses in view; `ccc-seo-trigger-rewrite` runs inline as its engine |
| `ccc-seo-trigger-rewrite` dispatched as a sub-agent | A full sub-agent spawn cost paid to isolate a light heuristic-scoring skill | Over-applying dispatch to a light decision unit | Run `ccc-seo-trigger-rewrite` inline within Stage 7 |
| Stage 8 scope decision dispatched | Loses the operator's go/no-go authority over the retrofit scope | Dispatching judgment, not execution | Keep Stage 8 inline — the operator owns the scope call |
| Rescue report rebuilt by re-reading every dispatched report | Orchestrator re-bloats at the end | Not trusting the dispatched stages' structured returns | Assemble the report from the carried-forward returns + the inline-stage outputs |

## Self-Improvement

When an operator corrects an output or identifies something that consistently goes wrong:
- Add a rule to the Rules section above.
- Note what the failure mode was and what fixed it.

When a dispatched stage produces a weak analysis:
- The first suspect is brief quality, not the atomic skill. Check what context the brief omitted, then tighten that stage's brief shape.

When a rescue engagement produces a strong recovery arc:
- Note which brief shapes produced the strongest sub-agent outputs; those become the reference brief templates for the next rescue.

This skill is never finished. The more rescues it runs, the better the briefs get.

## Version history

- **v0.2.0 (2026-05-20)** — Restructured from inline-invocation to **orchestrator-selective-dispatch** — the most dispatch-heavy of the five SEO orchestrators. Stages 1–6 (`ccc-seo-tools-audit`, `ccc-seo-classify-urls`, `ccc-seo-tools-optimize`, the `ccc-seo-tools-content` E-E-A-T pass, the `ccc-seo-tools-geo` AI-citation pass, `ccc-seo-link-internal` retrofit audit) and the Stage 9 apply passes (`ccc-seo-link-internal` apply, `ccc-seo-tools-schema`) are now explicit scoped sub-agent dispatches, each with a complete brief and a stated return contract — every one is a heavy full-site analytical or write pass. The Stage 4 and Stage 5 per-article passes each dispatch as ONE sub-agent that loops over the article base internally (not one per article). Stage 7 (unified retrofit queue) stays inline as the synthesis stage, with the light `ccc-seo-trigger-rewrite` running inline as its decision engine; Stage 8 (scope decision) and Stage 10 (report) stay inline as judgment and synthesis. Added the orchestration-model section, `## Rules`, an anti-patterns table, `## Self-Improvement`, `## Version history`, and `pattern: orchestrator-selective-dispatch`. Implements the rollout of the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]] verdict per Phase 2 of the [[2026-05-14 — Multi-Agent & Token-Efficiency Architecture — Assessment]]. Per skill-creator-pro: this was a surgical structural pattern-change against a target validated by the head-to-head test, so the full eval loop was not re-run.
- **v0.1.0** — Initial build. Inline-invocation orchestrator composing 7 atomic skills.
