---
name: ccc-seo-tools-audit
description: |
  Full technical SEO audit using Seomator CLI — 16 categories, 148 rules. CCC-extension wrap of seo:seo-audit. Adds vault persistence to client's `01 - Tech Audit/`, quarterly cadence integration, audit history for trend analysis (before/after comparisons across runs), and frontmatter integration so subsequent skills (strategy-session, classify-urls) can read priorities.
  Use this skill when an operator says "site audit", "full SEO audit", "Seomator audit", "tech audit", "audit the site", "comprehensive site audit", or when `ccc-seo-onboard` runs the baseline audit at engagement start, or when `ccc-seo-quarterly-review` runs the quarterly refresh.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.2.0
  wraps: "seo:seo-audit (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: full-extension
distribution: ccc-internal
---

# ccc-seo-tools-audit — Full Site Audit

**Workflow: Time-budget-check → invoke Seomator (local OR sandbox) → persist to vault → diff against prior runs → return prioritised findings.**

## ⚠️ EXECUTION-ENVIRONMENT — READ FIRST

Seomator crawls are slow (~5s per page; CWV-rendering adds ~30s). The Cowork sandbox bash-tool has a **45-second hard cap per call**, and background-detached processes (`nohup`/`setsid`) do NOT survive bash-session resets reliably.

**This means: crawls of more than ~5 pages will fail in the Cowork sandbox.** Discovered the hard way in the first full engagement (Kai Reichel, May 2026).

**Decision rule — run a time-budget-check before any crawl:**

```
estimated_seconds = (pages × 5) + (cwv_enabled ? pages × 30 : 0)
```

- `estimated_seconds < 35` → run in Cowork sandbox directly
- `estimated_seconds ≥ 35` → **route to local-Windows execution** (see "Local Execution" below). Do not attempt the sandbox crawl — it will time out and produce a partial or empty result.

**Default is `--no-cwv`.** Core Web Vitals require Playwright (~200MB browser download) and a headed render per page. CWV is a Phase-2 performance-optimisation concern, not an Audit-1 necessity. Only enable CWV when the operator explicitly asks for it, and even then prefer local execution.

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
- `crawl_pages` (optional, default 20) — max pages to crawl. Small sites (< 20 pages) auto-detect actual count.
- `cwv` (optional, default `false`) — include Core Web Vitals. Requires local execution. **Default off** — see Execution-Environment note.
- `compare_to_baseline` (optional, default true if prior audit exists) — diff vs. most recent prior audit.

## Procedure

### Stage 0 — Time-budget-check

1. Estimate page-count: small-site assumption ~8–20 pages. If unknown, assume `crawl_pages` value.
2. Compute `estimated_seconds = (pages × 5) + (cwv ? pages × 30 : 0)`.
3. If `≥ 35` → route to **Local Execution** (give operator the command, await uploaded output-file). If `< 35` → proceed in-sandbox.

### Stage 1 — Run the audit

1. **Read client config** — domain URL, languages, locations, exclusions list (URLs marked `seo_excluded: true`).
2. **Invoke Seomator** with the configured scope. Standard command:
   ```bash
   seomator audit <url> --crawl -m <crawl_pages> --no-cwv --format llm -o seomator-output-<date>.md
   ```
   (drop `--no-cwv` only if `cwv: true` AND running locally). Capture full structured output: per-category findings, severity ratings, recommended fixes.
3. **Output-size handling:** if the output `.md` exceeds 80 KB, do NOT load it with the Read tool. Use the rule-extraction script (see References) to pull critical/warning issues by rule with page-counts. This is automatic, not optional — large outputs silently truncate otherwise.
3. **Apply CCC priority extraction:**
   - Hard issues (blocks indexing or significantly suppresses ranking) → priority `critical`
   - Significant issues (likely depressing performance) → priority `high`
   - Best-practice misses → priority `medium`
   - Nice-to-haves → priority `low`
   This priority is what `ccc-seo-strategy-session` reads as input, not the ra