---
name: ccc-seo-rescue
description: |
  Engagement-start retrofit orchestrator for clients with substantial existing content. Runs ONCE at the beginning of an engagement when a client has > 20 existing articles (typical scenario: previous agency engagement, in-house content team, or older blog). Composes: tools-audit (full) + classify-urls (full crawl) + tools-optimize (full GSC analysis) + tools-content audit-mode (E-E-A-T scoring on every existing article) + tools-geo audit-mode (AI-citation readiness on every existing article) + link-internal retrofit-mode + trigger-rewrite (existing-content opportunities prioritised by ROI). Outputs prioritised retrofit queue + rescue report. The first 90 days of a rescue engagement are typically high-ROI retrofit work (internal linking, E-E-A-T fixes, striking-distance rewrites) BEFORE the suite's new-content flywheel starts.
  Use this skill when an operator says "rescue this client", "retrofit existing content", "fix the existing site first", "rescue mode", "audit and improve everything", or when `ccc-seo-onboard` detects a client with > 20 existing articles and recommends rescue before strategy-session. Particularly relevant for clients arriving with E-E-A-T crises (indexing failures, ranking decline, agency-departure remediation).
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: user-task-orchestrator
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

**Workflow: Audit everything → score everything → prioritise everything → propose retrofit queue → operator decides scope.**

## What this is

The most under-appreciated session in the suite. For clients arriving with substantial existing content — often the majority of paying CCC clients — rescue mode produces the high-ROI early wins that justify the engagement before any new content has been written.

Internal linking retrofit alone can lift entire sites. E-E-A-T retrofits recover lost indexing. Striking-distance rewrites convert near-ranks into ranks. Combined, the first 90 days of a rescue engagement often show stronger results than the next 6 months of new-content work — because we're improving content that already exists rather than waiting for new content to mature.

This is the session that makes Investment Mastery (with its 37% non-indexing crisis) the suite's flagship case study. The recovery arc is the story.

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

### Stage 0 — Pre-flight

1. Verify client is onboarded (`00 - Strategy.md` exists with focus + languages set).
2. Verify rescue threshold met: count existing articles in URL Inventory (or via crawl if inventory not yet built). If < 20, surface warning: "Rescue mode is heaviest. For < 20 articles, individual `ccc-seo-tools-*` calls are usually more efficient than full rescue. Proceed anyway?"
3. Read [[02 - Methodology|methodology]] §5 (E-E-A-T as indexing foundation), §3.5 (cross-cluster linking), §6.1 (keyword identification).

### Stage 1 — Full audit baseline

Invoke `ccc-seo-tools-audit` against the full client domain. Capture:
- All technical issues (16 categories, 148 rules).
- Critical issues prioritised (blocking-indexing class).
- Comparison to prior audits if any.

This is the same audit `ccc-seo-tools-audit` produces normally — but rescue runs it specifically to identify SITE-WIDE technical issues that may be suppressing many existing articles' performance.

### Stage 2 — Full URL classification

Invoke `ccc-seo-classify-urls` in `initial` mode (full crawl + classify). For existing-content clients, this is the first time the URL inventory gets built — captures every page, classifies its role, flags pattern mismatches (articles not at expected `/library/{cluster}/` pattern).

Pattern mismatches surface as URL migration opportunities — typically high-ROI because they fix structural authority distribution.

### Stage 3 — Full GSC analysis

Invoke `ccc-seo-tools-optimize` with `mode: all`. This produces:
- Striking-distance opportunities (existing articles ranking 8–20 — top retrofit targets).
- Low-CTR opportunities (high-impressions / low-CTR articles — title/meta retrofit targets).
- Cannibalization issues (multiple existing URLs competing — consolidation needed).
- Decline pattern (declining articles — investigation + retrofit).
- Top performers at risk (high-rankers showing early decline — defensive retrofits).
- Content gaps (covered by competitors, missing from us — new-article candidates for later).

For rescue mode specifically, the focus is on the first five — not new articles. Content gaps surface but are deferred to strategy-session post-rescue.

### Stage 4 — E-E-A-T audit on every existing article

For each existing article:
1. Invoke `ccc-seo-tools-content` in `audit` mode (no hard-block, scoring only).
2. Capture E-E-A-T score + per-signal breakdown.
3. Flag articles below threshold (warn at 70 non-YMYL, warn at 80 YMYL).

For YMYL clients, this stage often surfaces the indexing crisis explicitly: a substantial portion of articles below threshold = the cause of de-indexing.

Produce: `_reports/rescue-eeat-audit-{YYYY-MM-DD}.md` with full per-article scores + flagged subset.

### Stage 5 — AI-citation readiness audit

For each existing article:
1. Invoke `ccc-seo-tools-geo` in `article-gate` audit mode.
2. Capture per-platform GEO score.
3. Flag low-scoring articles for citation-readiness retrofit.

Also invoke `ccc-seo-tools-geo` in `site-audit` mode for site-level signals (off-site brand presence). The structural ceiling flag may fire — surface it explicitly in the rescue report.

### Stage 6 — Internal linking retrofit audit

Invoke `ccc-seo-link-internal` in `retrofit` mode with `apply: false`. Skill produces full audit:
- Tier 1 — orphans (highest leverage)
- Tier 2 — weak inbound (< 3 links)
- Tier 3 — no cross-cluster connections
- Tier 4 — missing up-links to pillar
- Tier 5 — broken internal links
- Tier 6 — high-authority sources under-linking

Captures the full internal-linking improvement queue.

### Stage 7 — Build the unified retrofit queue

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

### Stage 8 — Operator review + scope decision

**Operator checkpoint** (interactive mode): operator sees the unified queue + per-tier ROI estimate + total effort estimate.

Operator decides:
- **Full retrofit:** approve all tiers; skill applies in batches over 4–8 weeks.
- **Aggressive retrofit:** Tiers 1–4 applied immediately; Tiers 5–8 over next month.
- **Conservative retrofit:** Tiers 1–3 only; defer everything else to `ccc-seo-quarterly-review`.
- **Custom subset:** operator selects specific tiers or specific items.

The decision drives Stage 9.

### Stage 9 — Apply approved retrofits

For each approved item:
- Invoke the relevant atomic skill in apply mode.
- Internal linking: `ccc-seo-link-internal` in `retrofit` mode with `apply: true`.
- Meta rewrites: not yet a dedicated atomic skill in v0.4 — for now, manual operator action with structured suggestions from this orchestrator. **Phase 5 enhancement: add `ccc-seo-meta-rewrite` atomic for batch meta operations.**
- Schema additions: `ccc-seo-tools-schema` in generate mode for missing schemas, then WPCode bulk pattern via [[ccc-wordpress-seo-implementation]].
- Striking-distance rewrites: queue for `ccc-seo-publish-next` in `mode: rewrite`. Operator runs publish-next per article.
- E-E-A-T retrofits: similar to striking-distance — queue for publish-next in rewrite mode with E-E-A-T constraints surfaced.

### Stage 10 — Rescue report

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

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §5 (E-E-A-T as indexing foundation — section 5.3 specifically covers the recovery pattern, which this skill operationalises), §3.5 (cross-cluster linking — internal linking retrofit), §6.1 (keyword identification — what tools-optimize surfaces).

Atomic skills composed: [[ccc-seo-tools-audit]], [[ccc-seo-classify-urls]], [[ccc-seo-tools-optimize]], [[ccc-seo-tools-content]], [[ccc-seo-tools-geo]], [[ccc-seo-link-internal]], [[ccc-seo-trigger-rewrite]].

## Anti-patterns

- Do NOT run rescue on greenfield clients. Wastes time and produces empty findings.
- Do NOT auto-apply retrofits without operator approval, even Tier 1. Bulk changes have bulk consequences.
- Do NOT promise "30 days to recover indexing" deterministically. Client circumstances vary; surface pattern + expected impact, never absolute guarantees.
- Do NOT skip the E-E-A-T audit for YMYL clients. The whole point of rescue for YMYL clients is YMYL recovery.
- Do NOT defer internal-linking Tier 1 + 2 work. Highest ROI, lowest effort. Always in scope.
- Do NOT compete for orchestration scope with `ccc-seo-strategy-session`. Rescue is BEFORE strategy. Strategy plans new content; rescue fixes existing content. Run rescue, then run strategy.
