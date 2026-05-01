---
name: ccc-seo-tools-plan
description: |
  Strategic SEO planning — competitive analysis, content strategy templates, implementation roadmap. Full-extension wrap of seo:seo-plan with CCC-specific layer: reads CCC client vault context (no re-discovery — business overview, ICP, voice, focus already captured at onboarding), feeds output into WordPress publishing calendar via the topic queue, integrates with quarterly refresh cycle, supports both Service (Pillar→Silo→Sub-Silo) and Product (BOFU→MOFU→TOFU) strategy outputs.
  Use this skill when an operator says "build the SEO strategy", "strategy plan", "content strategy", "competitor analysis", "content roadmap", or when `ccc-seo-strategy-session` orchestrator runs its planning stage.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-plan (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: full-extension
distribution: ccc-internal
---

# ccc-seo-tools-plan — Strategic SEO Planning

**Workflow: Receive client → load context → competitor SERP analysis → industry template selection → dual-strategy tree generation → roadmap output to vault.**

## What this is

The strategic planning layer. Wraps `seo:seo-plan` (industry templates + competitive analysis frameworks) with the CCC integration: the marketplace skill expects discovery inputs that we've already captured at onboarding, so the wrapper sources them from the vault rather than re-asking. Output integrates with the topic queue + the quarterly refresh cycle.

`seo:seo-plan` ships templates-only (no automated competitor data fetch). The wrapper adds DataForSEO-driven competitor SERP data to enrich the templates with real signals.

## When to use

- Composed by `ccc-seo-strategy-session` orchestrator at every strategy run (onboarding + quarterly).
- Manual: operator wants the plan output without the full strategy session (rare — usually run as part of strategy-session).

## Inputs

- `client` (required) — wikilink.
- `mode` (optional) — `initial` (default — first strategy build) or `refresh` (quarterly refresh against existing strategy + accumulated GSC data).
- `competitor_urls` (optional) — list of competitors. If absent, derived from DataForSEO SERP data on the client's primary KW set.

## Procedure

1. **Load client context from vault** (no re-discovery):
   - `00 - Strategy.md` — focus, business overview, ICP, voice profile, library prefix
   - `02 - URL Inventory.md` (if classify-urls has run) — current URL footprint
   - `01 - Tech Audit/` most recent — existing site state
   - `08 - GSC/opportunities.md` (if GSC loop has run) — for refresh mode
   - `11 - Cohorts/winners-pattern.md` (if available) — for refresh mode
2. **Determine industry template:**
   - Match client's industry from business overview to `seo:seo-plan`'s industry templates (it ships 6).
   - Fallback: closest-fit template if no exact match.
3. **Competitor SERP enrichment (CCC addition):**
   - If `competitor_urls` not supplied, run DataForSEO SERP queries against client's primary KWs (top 5 KWs from existing pillar set, or fallback queries derived from business overview).
   - Capture top-10 competitor URLs across queries. De-duplicate. Top 5 most-frequent become the competitor set.
   - For each competitor, capture: top-ranking content shapes, sitemap structure (cluster count, articles per cluster), library/content-hub presence.
4. **Invoke `seo:seo-plan`** with the loaded client context + selected industry template + enriched competitor set.
5. **Output structure:**
   - **For Service strategy:** Pillar list with rationale, Silo proposals per Pillar, Sub-Silo proposals per Silo, content shape recommendations per cluster, recommended publishing cadence, 90-day content calendar shape.
   - **For Product strategy:** BOFU pages list (existing or to-create), MOFU article proposals per BOFU page, TOFU funnel content per MOFU, recommended publishing cadence, 90-day shape.
   - **For Hybrid:** both, partitioned by URL space.
6. **Refresh mode (if `mode: refresh`):**
   - Read existing `00 - Strategy.md` pillar tree.
   - Read `winners-pattern.md` if available.
   - Recommend: which Pillars to over-invest in (winner silos), which Sub-Silos to pause (loser silos), which new clusters to add (content-gap opportunities from `seo-optimize`), which existing articles to retire or consolidate.
   - Produce a delta report rather than a full re-plan.
7. **Persist** (this skill writes a planning artifact, NOT the Strategy.md itself — `ccc-seo-strategy-session` orchestrator merges the output into Strategy.md after operator approval):
   - Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/_planning/plan-{YYYY-MM-DD}-{mode}.md`
   - Frontmatter: type, client, mode, generated, competitors, industry_template.
   - Body: structured plan output.
8. **Return** plan path + summary (top recommendations, pillar count, silo count, sub-silo count proposed).

## Multi-language strategy

For multi-language clients, the plan considers:
- Per-locale competitor sets (different SERPs, different competitors per country).
- Translation-only vs. cultural-adaptation decisions per cluster.
- Per-locale publishing cadence (some locales may sustain higher cadence than others).

The output explicitly partitions strategy elements by language when the client has > 1 locale.

## Reference

Marketplace skill source: `seo:seo-plan` (BenAI). 7.8 KB SKILL.md + 6 industry templates + templates.json. Phase-based discovery → architecture → roadmap workflow.

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §2 (dual strategy framework — what this skill produces), §3 (company wikipedia pattern — what the strategy implements).

## Anti-patterns

- Do NOT re-ask discovery questions. Onboarding captured them. Read from vault.
- Do NOT use generic templates without competitor enrichment. The DataForSEO SERP layer is what makes the plan empirically grounded vs. theoretical.
- Do NOT auto-write to `00 - Strategy.md`. The orchestrator merges output after operator approval.
- Do NOT replan from scratch in refresh mode. Refresh = delta + recommendations, preserves the existing strategy where it's working.
- Do NOT skip the cohort weighting in refresh mode. Refresh's whole point is evidence-based adjustment.
