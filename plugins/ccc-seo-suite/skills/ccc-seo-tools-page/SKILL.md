---
name: ccc-seo-tools-page
description: |
  Single-page deep SEO audit for any URL — on-page, content quality, technical meta tags, schema, images, performance.
  Light CCC wrapper around the BenAI marketplace skill seo:seo-page. Adds optional vault persistence: when called within a CCC client engagement, audit output is written to `01 - Tech Audit/single-page-{slug}-{date}.md` so subsequent skills can reference it.
  Use this skill when an operator says "audit this page", "check page SEO", "single-page review", "on-page SEO", "deep page audit", or provides a single URL for SEO inspection. Also called ad-hoc from `ccc-seo-strategy-session` when a specific page needs deeper inspection beyond what `ccc-seo-tools-audit` produces sitewide.
allowed-tools: "Read, Write, Bash, WebFetch"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-page (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: light-passthrough
distribution: ccc-internal
---

# ccc-seo-tools-page — Single-Page Deep SEO Audit

**Workflow: Receive URL → invoke `seo:seo-page` → optionally persist to vault.**

## What this is

A thin CCC adapter over `seo:seo-page` from the BenAI marketplace. The marketplace skill does the actual analysis (on-page, content, technical, schema, images, performance). This wrapper adds CCC-specific vault context so audit output integrates with the rest of `ccc-seo-suite`.

## When to use

- Operator provides a single URL and wants deep SEO inspection.
- `ccc-seo-strategy-session` flags a specific page that needs deeper analysis than the sitewide audit produces.
- `ccc-seo-trigger-rewrite` identifies a high-priority decline page that warrants page-level investigation.
- Manual ad-hoc invocation when an operator wants a single-page report.

## Procedure

1. **Receive inputs:**
   - `url` (required) — the URL to audit
   - `client` (optional) — wikilink to a CCC client. If provided, output gets persisted to that client's vault folder.
   - `context` (optional) — any additional context to pass through to the marketplace skill

2. **Invoke `seo:seo-page`** with the URL and any operator-provided options. Capture the full output.

3. **If `client` provided:**
   - Determine output path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/01 - Tech Audit/single-page-{slug}-{YYYY-MM-DD}.md`
   - Write output with frontmatter:
     ```yaml
     ---
     type: single-page-audit
     client: "[[Client]]"
     url: <url>
     audited: <date>
     skill_version: 0.1.0
     wraps: seo:seo-page
     ---
     ```
   - Append wikilink to this audit in the client's `00 - Strategy.md` audit log section.

4. **If `client` not provided:** return the marketplace output directly without persistence.

5. **Surface to operator:** the score / grade, top 3 critical issues, and (if persisted) the vault path.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §11 (quality standards, anti-patterns).

Marketplace skill source: `seo:seo-page` (BenAI). The wrapper does NOT modify the marketplace skill's logic — it only adds vault-side persistence. If `seo:seo-page` evolves upstream, this wrapper will continue working as long as input/output shapes remain compatible.

## Anti-patterns

- Do NOT replace the marketplace skill's audit logic. This is a passthrough — the marketplace skill is the source of truth for what to check.
- Do NOT persist output to vault when no client context exists. Avoid orphan audit files.
- Do NOT modify or interpret the marketplace skill's findings. Pass them through verbatim.
