---
name: ccc-seo-tools-technical
description: |
  Technical SEO audit covering 9 categories — crawlability, indexability, security, URL structure, mobile, Core Web Vitals, structured data, JavaScript rendering, and IndexNow. Light CCC wrapper around the BenAI marketplace skill seo:seo-technical. Adds optional vault persistence when called within a CCC client engagement.
  Use this skill when an operator says "technical SEO audit", "Core Web Vitals", "crawl issues", "robots.txt review", "JS rendering", "site speed audit", or wants a deep technical-only inspection (not full content audit). Called by `ccc-seo-tools-audit` for the technical portion of broader audits.
allowed-tools: "Read, Write, Bash, WebFetch"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-technical (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: light-passthrough
distribution: ccc-internal
---

# ccc-seo-tools-technical — Technical SEO Audit

**Workflow: Receive URL → invoke `seo:seo-technical` → optionally persist to vault.**

## What this is

A thin CCC adapter over `seo:seo-technical` from the BenAI marketplace. The marketplace skill checks: crawlability, indexability, security headers, URL structure, mobile-first compliance, Core Web Vitals, structured data validity, JavaScript rendering, IndexNow integration. The wrapper adds vault persistence for client engagements.

## When to use

- Operator wants a technical-only audit separate from content / on-page audits.
- A site's GSC shows widespread coverage issues and needs technical root-cause analysis.
- After a site migration or major infrastructure change, to verify technical SEO health.
- Called by `ccc-seo-tools-audit` for the technical portion of broader sitewide audits.

## Procedure

1. **Receive inputs:**
   - `url` (required) — the URL or domain to audit
   - `client` (optional) — wikilink to a CCC client
   - `scope` (optional) — `single-url` or `domain` (default: `single-url`)
   - `categories` (optional) — array, subset of the 9 categories. If omitted, runs all 9.

2. **Invoke `seo:seo-technical`** with the inputs. Capture the structured output (per-category findings, severity ratings, recommended fixes).

3. **If `client` provided:**
   - Output path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/01 - Tech Audit/technical-{YYYY-MM-DD}.md`
   - Write with frontmatter:
     ```yaml
     ---
     type: technical-audit
     client: "[[Client]]"
     scope: <scope>
     audited: <date>
     skill_version: 0.1.0
     wraps: seo:seo-technical
     ---
     ```
   - Append wikilink to client's `00 - Strategy.md` audit log.

4. **If `client` not provided:** return marketplace output directly without persistence.

5. **Surface to operator:** total issues by severity (critical / high / medium / low), top 5 critical issues, vault path if persisted.

## Special handling — AI crawler robots.txt rules

`seo:seo-technical` includes guidance on AI crawler management (GPTBot, Google-Extended, ClaudeBot, etc.). This wrapper does NOT make policy decisions for the client — it surfaces the recommendations and flags them for operator review. Whether to allow or block AI crawlers is a client-level decision (typically: allow Google-Extended for AI Overviews inclusion, allow GPTBot for ChatGPT inclusion, evaluate ClaudeBot per client preference).

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6.3 (off-site brand presence — AI crawlers are upstream of AI citation surface).

Marketplace skill source: `seo:seo-technical` (BenAI).

## Anti-patterns

- Do NOT auto-decide AI crawler allow/block — surface to operator.
- Do NOT modify the marketplace skill's category set. If the BenAI skill adds a 10th category, propagate.
- Do NOT skip persistence when client is provided. Audit history is needed for trend analysis.
