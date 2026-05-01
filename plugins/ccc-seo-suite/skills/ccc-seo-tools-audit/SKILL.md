---
name: ccc-seo-tools-audit
description: |
  Full technical SEO audit using Seomator CLI — 16 categories, 148 rules. CCC-extension wrap of seo:seo-audit. Adds vault persistence to client's `01 - Tech Audit/`, quarterly cadence integration, audit history for trend analysis (before/after comparisons across runs), and frontmatter integration so subsequent skills (strategy-session, classify-urls) can read priorities.
  Use this skill when an operator says "site audit", "full SEO audit", "Seomator audit", "tech audit", "audit the site", "comprehensive site audit", or when `ccc-seo-onboard` runs the baseline audit at engagement start, or when `ccc-seo-quarterly-review` runs the quarterly refresh.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-audit (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: full-extension
distribution: ccc-internal
---

# ccc-seo-tools-audit — Full Site Audit

**Workflow: Receive client + scope → invoke `seo:seo-audit` → persist to vault → diff against prior runs → return prioritised findings.**

## What this is

The full-site audit. 16 categories × 148 rules running against the live site via Seomator CLI. The wrapper adds CCC integration: vault persistence with dated audit files, trend analysis across audit runs (this audit's findings vs. last quarter's), priority extraction so other skills can read what to act on first.

## When to use

- **Onboarding baseline:** `ccc-seo-onboard` invokes this at engagement start to establish the baseline.
- **Quarterly refresh:** `ccc-seo-quarterly-review` runs this for trend analysis vs. baseline.
- **Strategy session input:** `ccc-seo-strategy-session` reads the most recent audit for priorities.
- **Manual:** operator wants an ad-hoc full audit (rare — use `ccc-seo-tools-page` for single-page deep dives).

## Inputs

- `client` (required) — wikilink.
- `scope` (optional) — `full` (default) or `categories: [list]` for partial audit.
- `compare_to_baseline` (optional, default true if prior audit exists) — diff vs. most recent prior audit.

## Procedure

1. **Read client config** — domain URL, languages, locations, exclusions list (URLs marked `seo_excluded: true`).
2. **Invoke `seo:seo-audit`** with the configured scope. Capture full structured output: per-category findings, severity ratings, recommended fixes.
3. **Apply CCC priority extraction:**
   - Hard issues (blocks indexing or significantly suppresses ranking) → priority `critical`
   - Significant issues (likely depressing performance) → priority `high`
   - Best-practice misses → priority `medium`
   - Nice-to-haves → priority `low`
   This priority is what `ccc-seo-strategy-session` reads as input, not the raw severity ratings.
4. **Persist:**
   - Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/01 - Tech Audit/full-{YYYY-MM-DD}.md`
   - Frontmatter: type, client, scope, audited (date), categories_run, total_issues, critical_count, high_count, medium_count, low_count, skill_version, wraps, baseline_diff (if applicable).
   - Body: per-category findings + recommended fixes + priority tags.
5. **Compare to baseline** (if prior audit exists in `01 - Tech Audit/`):
   - Find most recent prior `full-*.md` audit.
   - Compute deltas: new issues, resolved issues, persistent issues (still present from prior audit), regressed issues (resolved but back).
   - Surface in a "Trend Analysis" section at the top of the new audit file.
6. **Update Strategy.md audit log:**
   - Append wikilink to this audit + 1-line summary (critical/high/total counts) to `00 - Strategy.md` audit log section.
7. **Return** structured result:
   ```yaml
   audit_path: "01 - Tech Audit/full-2026-04-30.md"
   total_issues: <int>
   critical: <int>
   high: <int>
   medium: <int>
   low: <int>
   trend:
     new_issues: <int>
     resolved_issues: <int>
     persistent_issues: <int>
     regressed_issues: <int>
   top_5_critical: [<list of issue summaries>]
   ```

## Reference

Marketplace skill source: `seo:seo-audit` (BenAI). Ships ~27 KB of references including category breakdowns, language bias warnings for non-English sites, crawl budget guidance for WordPress + WooCommerce, and platform-specific fix mapping. The wrapper does NOT modify these — they're production-grade.

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §5 (E-E-A-T as indexing foundation — many critical issues this audit surfaces are E-E-A-T-related), §11 (anti-patterns).

## Anti-patterns

- Do NOT skip baseline comparison when prior audits exist. Trends are what matter, not snapshots.
- Do NOT promote priority above what severity warrants. Priority extraction is conservative — when in doubt, downgrade.
- Do NOT modify the marketplace skill's category set. New categories propagate from upstream.
- Do NOT delete prior audit files. Audit history is needed for longitudinal trend analysis (12+ month view shows what's working).
