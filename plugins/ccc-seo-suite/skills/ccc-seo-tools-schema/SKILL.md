---
name: ccc-seo-tools-schema
description: |
  Detect, validate, and generate Schema.org structured data (JSON-LD only). Wrapper around the BenAI marketplace skill seo:seo-schema with one CCC-specific addition — HARD BLOCK on `HowTo` schema (retired by Google September 2023). Validates that Article + FAQPage + BreadcrumbList are present on any article we publish, per CCC methodology.
  Use this skill when an operator says "schema", "structured data", "JSON-LD", "rich results", "schema validation", "generate schema", "schema.org markup", or when `ccc-seo-write-article` needs schema for a draft, or when `ccc-seo-publish-wp` validates schema before publish.
allowed-tools: "Read, Write, Bash, WebFetch"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-schema (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: light-passthrough-plus-howto-block
distribution: ccc-internal
---

# ccc-seo-tools-schema — Schema.org JSON-LD with HowTo Hard-Block

**Workflow: Receive request → invoke `seo:seo-schema` → enforce CCC HowTo hard-block → optionally persist.**

## What this is

A thin CCC adapter over `seo:seo-schema` with one mandatory enforcement: `HowTo` schema is hard-blocked. Google retired `HowTo` rich results in September 2023; emitting `HowTo` markup adds no value and signals outdated SEO knowledge. The wrapper detects and rejects any output containing `HowTo`.

## When to use

- `ccc-seo-write-article` calls this to generate JSON-LD for a draft article.
- `ccc-seo-publish-wp` calls this to validate schema before publishing to WordPress.
- Operator wants to validate or generate schema for any URL.
- Operator wants to detect existing schema on a page.

## Procedure

### Mode: Generate

1. **Receive inputs:**
   - `mode: generate`
   - `content` (required) — the article body or input data
   - `types` (required) — array of Schema.org types requested
   - `frontmatter` (optional) — article frontmatter for context

2. **HowTo guard:** if `types` contains `HowTo`, **REJECT** with error: "HowTo schema is hard-blocked per CCC methodology — retired by Google September 2023. See methodology §4.3."

3. **Invoke `seo:seo-schema`** in generate mode with the validated types.

4. **Validate output** for any `HowTo` types that may have been generated despite not being requested. Strip them.

5. **Required-types check (when called from publish flow):** verify the output contains `Article`, `FAQPage`, `BreadcrumbList` at minimum. If any are missing, generate them in a follow-up call before returning.

6. **Return** the JSON-LD blob.

### Mode: Validate

1. **Receive inputs:**
   - `mode: validate`
   - `url` (required if no inline schema) — page URL to extract schema from
   - `schema_inline` (alternative) — paste-in JSON-LD to validate

2. **Invoke `seo:seo-schema`** in validate mode.

3. **HowTo check:** if `HowTo` schema is detected in the validated input, flag as HARD BLOCK violation in the output. The page must have its `HowTo` schema removed before passing the validation gate.

4. **Required-types check:** if validating a CCC-suite published article, confirm `Article`, `FAQPage`, `BreadcrumbList` are all present.

5. **Return** validation report.

### Mode: Detect

1. **Receive inputs:**
   - `mode: detect`
   - `url` (required)

2. **Invoke `seo:seo-schema`** in detect mode.

3. **Return** the detected schema types + any HowTo violations flagged.

## Persistence

If `client` is provided, write a record to `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/01 - Tech Audit/schema-audit-{YYYY-MM-DD}.md` for validation/detection runs. Generation runs do not persist (the article frontmatter and body carry the schema).

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §4.3 (Schema requirements — Article + FAQPage + BreadcrumbList mandatory; HowTo hard-blocked).

Marketplace skill source: `seo:seo-schema` (BenAI) — provides current schema templates including FAQ restriction status, deprecated types list, and active schema type catalogue.

## Anti-patterns

- Do NOT emit `HowTo` schema, ever. Hard-block is non-negotiable.
- Do NOT skip the required-types check (Article + FAQPage + BreadcrumbList) when called from the publish flow. Missing schema = failed publish.
- Do NOT modify the marketplace skill's templates. CCC-specific behaviour lives in this wrapper, not in upstream changes.
- Do NOT emit Microdata or RDFa. JSON-LD only.
