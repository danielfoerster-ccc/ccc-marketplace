---
name: ccc-seo-tools-sitemap
description: |
  Analyze existing XML sitemaps or generate new ones with industry templates. Validates format, URLs, structure. Supports sitemap index files and content-type splitting. Light CCC wrapper around the BenAI marketplace skill seo:seo-sitemap. Adds optional vault persistence and CCC-specific URL pattern enforcement (`/{prefix}/{cluster}/{slug}` for library content).
  Use this skill when an operator says "sitemap", "XML sitemap", "generate sitemap", "validate sitemap", "sitemap index", or when `ccc-seo-strategy-session` needs to verify the client's sitemap structure during onboarding.
allowed-tools: "Read, Write, Bash, WebFetch"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-sitemap (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: light-passthrough
distribution: ccc-internal
---

# ccc-seo-tools-sitemap — XML Sitemap Audit & Generation

**Workflow: Receive request → invoke `seo:seo-sitemap` → optionally enforce CCC URL patterns → optionally persist.**

## What this is

A thin CCC adapter over `seo:seo-sitemap` from the BenAI marketplace. The marketplace skill handles XML sitemap analysis, validation, and generation including sitemap index files. The wrapper adds vault persistence for client engagements and CCC URL pattern checks when validating sitemaps for suite-managed clients.

## When to use

- Onboarding: validate the client's existing sitemap during `ccc-seo-onboard`.
- Strategy: verify sitemap reflects the new pillar/silo tree after `ccc-seo-strategy-session` runs.
- Audit: weekly or quarterly sitemap health check.
- Generation: produce a new sitemap from scratch when one doesn't exist.

## Procedure

### Mode: Analyze

1. **Receive inputs:**
   - `mode: analyze`
   - `sitemap_url` (required) — URL of the sitemap or sitemap index
   - `client` (optional)

2. **Invoke `seo:seo-sitemap`** in analyze mode. Capture: total URLs, format issues, broken URLs, sitemap-index structure, last-modified distribution, content-type splits.

3. **CCC URL pattern check (if `client` provided):** for URLs under the client's configured `library_prefix` (default `/library/`), verify they match `/{prefix}/{cluster}/{slug}` pattern. Flag mismatches. (URL pattern is part of CCC methodology §3.3 — sitemap is a place to catch violations early.)

4. **Persist if client provided:**
   - Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/01 - Tech Audit/sitemap-{YYYY-MM-DD}.md`
   - Frontmatter as for other tech audit files.

5. **Return** analysis report.

### Mode: Generate

1. **Receive inputs:**
   - `mode: generate`
   - `client` (required) — client whose sitemap to generate
   - `url_inventory` (optional) — uses client's `02 - URL Inventory.md` if available

2. **Invoke `seo:seo-sitemap`** in generate mode using the URL inventory + client config.

3. **Return** the generated XML.

### Mode: Validate

1. **Receive inputs:**
   - `mode: validate`
   - `sitemap_url` or `sitemap_inline` (one required)

2. **Invoke `seo:seo-sitemap`** in validate mode. Standard XML sitemap protocol checks.

3. **Return** validation report.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §3.3 (URL architecture pattern).

Marketplace skill source: `seo:seo-sitemap` (BenAI) — ships 6 industry templates and sitemap index handling logic.

## Anti-patterns

- Do NOT generate sitemaps that violate the `/{prefix}/{cluster}/{slug}` pattern for library content.
- Do NOT skip the URL pattern check when validating client sitemaps — early warning system for URL drift.
- Do NOT bypass the sitemap-index protocol when a site has > 50,000 URLs or > 50 MB of sitemap data.
