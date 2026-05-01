---
name: ccc-seo-publish-wp
description: |
  Pushes a draft article from the vault to WordPress via REST API. Composes pre-publish quality gates (ccc-seo-tools-content for E-E-A-T, ccc-seo-tools-geo for AI citation readiness, ccc-seo-tools-schema for JSON-LD validation). Hard-fails abort publish (no exceptions for YMYL E-E-A-T failures). Sets featured image (uploads from hero image prompt or pre-generated image), categories, tags, Yoast/RankMath meta, schema. Validates URL pattern matches client's `/{prefix}/{cluster}/{slug}`. Writes publish-day frontmatter snapshot to article + appends row to `10 - Publishing Log.md`.
  Use this skill when an operator says "publish to WordPress", "ship the article", "publish article", or when `ccc-seo-publish-next` orchestrator runs the publish step. Always called after `ccc-seo-write-article`. Always runs all three quality gates before pushing — this is the last gate before the article exists publicly.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: atomic-substrate
  category: novel-ccc
  extends: "[[ccc-wordpress-seo-implementation]]"
distribution: ccc-internal
---

# ccc-seo-publish-wp — WordPress REST Publisher

**Workflow: Receive article path → run quality gates → validate URL pattern → upload featured image → POST to WordPress REST API → write publish-day frontmatter snapshot → log row.**

## What this is

The publish gate. Last checkpoint before an article exists on the public internet. Composes the three quality gates (E-E-A-T + GEO + schema) AND the structural validations (URL pattern, frontmatter completeness, author existence, schema correctness). Hard-fails abort the publish — by design.

Extends [[ccc-wordpress-seo-implementation]] (the existing CCC marketplace skill) with the suite-specific lifecycle integration.

## When to use

- Mandatory step in `ccc-seo-publish-next` orchestrator after `ccc-seo-write-article`.
- Operator wants to publish a previously-written draft.
- Rewrite mode: publishing an updated article that replaces an existing WordPress post (URL preserved, post ID updated, content replaced).

## Inputs

- `article_path` (required) — path to the draft article in `06 - Articles/`.
- `client` (required).
- `mode` (optional) — `new` (default — creates new WP post) or `update` (replaces existing post; requires existing `wp_post_id` in article frontmatter).
- `schedule_date` (optional) — if set, schedules the post for that date instead of immediate publish.
- `skip_gates` (optional, default false) — for emergency / corrective publishes only. Logged loudly. Never used in normal flow.

## Procedure

### Step 1 — Read article + validate frontmatter completeness

Required fields present and non-null:
- `slug`, `shape`, `language`, `parent_silo` (for sub-silo / silo articles), `target_kw`, `intent`, `ymyl`, `author`, `word_count`, `h2_count`, `faq_count`, `schema`, `read_time_minutes`.

Required fields valid:
- `shape` ∈ enum.
- `schema` contains Article + FAQPage + BreadcrumbList; does NOT contain HowTo.
- `faq_count` ∈ [4, 8].
- `author` resolves to an existing author profile.
- `parent_silo` resolves to an existing silo / pillar note (when applicable).

Failure aborts publish with specific error.

### Step 2 — Validate URL pattern

Construct intended URL: `{client.domain}{client.library_prefix}/{cluster_slug}/{slug}`.

Where `cluster_slug` is derived from `parent_silo` (Service strategy) or directly assigned (Product strategy).

If the constructed URL does NOT match the configured pattern, abort. URL pattern compliance is a methodology hard requirement (§3.3).

### Step 3 — Run quality gates

Skip only if `skip_gates: true` (emergency mode — logged loudly).

Otherwise, in order:
1. **`ccc-seo-tools-schema`** — validate the JSON-LD blob in the article. Hard-fail if HowTo present, hard-fail if required types (Article + FAQPage + BreadcrumbList) missing.
2. **`ccc-seo-tools-content`** — E-E-A-T gate. Pass-through scoring. Hard-block YMYL articles below threshold. Warn-only for non-YMYL below threshold (publish proceeds with warning logged).
3. **`ccc-seo-tools-geo`** — AI citation readiness gate. Warn-only at any YMYL level. Captures per-platform scores to frontmatter. Surfaces structural ceiling flag if applicable.

Hard-block from any gate aborts publish. Warnings from gates are logged but do not block.

Update article frontmatter with returned scores:
- `eeat_score`, `eeat_breakdown`
- `geo_score`, `geo_breakdown`

### Step 4 — Upload featured image

If article has a `<!-- hero-image-prompt: ... -->` comment at the bottom:
- Generate image via Cowork's image-gen capability OR delegate to operator (operator-supplied path).
- Upload to WordPress media library via REST API.
- Capture media ID for the post.
- Strip the comment from the article body (it doesn't need to render).

If pre-generated image path supplied: upload directly without generating.

### Step 5 — Convert markdown to WordPress-compatible HTML

The body block is markdown (the article body + FAQ block + author byline).
- Convert markdown to HTML with WordPress's expected paragraph + list + heading conventions.
- Preserve internal links as relative URLs (Cowork wikilink format `[[Slug]]` → resolve to public WP URL → emit as `<a href="..."`).
- Preserve external links as absolute URLs with `rel="noopener"` for off-domain.
- Embed FAQ block in body (NOT as separate WP block — the FAQ is part of the article).

### Step 6 — Build the WP REST API payload

```json
{
  "title": "<meta title from article>",
  "content": "<HTML body>",
  "excerpt": "<meta description>",
  "slug": "<slug>",
  "status": "publish" | "future" (if scheduled),
  "date": "<schedule_date if scheduled, else now>",
  "categories": [<category IDs>],
  "tags": [<tag IDs>],
  "featured_media": <media ID from step 4>,
  "author": <WP user ID for the resolved author>,
  "yoast_meta": {
    "yoast_wpseo_title": "<meta title>",
    "yoast_wpseo_metadesc": "<meta description>",
    "yoast_wpseo_canonical": "<canonical URL>"
  },
  "meta": {
    "schema_jsonld": "<entire JSON-LD blob — multi-type — for theme to render in head>"
  }
}
```

(If client uses RankMath, equivalent meta fields.)

### Step 7 — POST to WordPress

POST `/wp-json/wp/v2/posts` (or PUT for update mode against existing post ID).

Use Application Password authentication (configured at onboarding, stored in vault config — NEVER inline in skill prompts or output).

Capture response: `id`, `link` (canonical URL), `status`.

If response indicates failure (4xx, 5xx, schema rejection, slug collision):
- Log full error.
- Do NOT retry automatically — return error to caller (operator or orchestrator).

### Step 8 — Update article frontmatter

Set:
- `status: published`
- `wp_post_id: <id from response>`
- `wp_url: <link from response>`
- `publish_date: <today>`
- Keep `gsc.d30/d60/d90/d180: null` (filled by future weekly-review runs).
- Keep `ai_citations.d30/d60/d90: null` (filled by future weekly-review runs).
- Keep `internal_links_in: 0` (filled by `ccc-seo-link-internal` at publish + 7d + 14d).

### Step 9 — Append to publishing log

Append a row to `10 - Publishing Log.md`:
```
| 2026-04-15 | efflorescence-removal | glossary | de | Surface Cleaning | efflorescence removal | Heiko Lube | 84 | 76 | 1840 | https://example.com/library/surface-cleaning/efflorescence-removal/ | d30 pending |
```

### Step 10 — Trigger inbound link scaffolding

Invoke `ccc-seo-link-internal` (Phase 4 skill — until Phase 4 ships, this step is a no-op marker for the orchestrator to handle).

The full scaffolding cadence: at publish, at 7 days post-publish, at 14 days post-publish. Methodology §4.5 — "≥ 3 inbound within first 14 days" is the empirical winner predictor.

### Step 11 — Return

Return:
```yaml
success: true | false
wp_post_id: <id>
wp_url: <url>
publish_date: <date>
gates:
  schema: pass | fail
  eeat: pass | warn | fail | "score: 84"
  geo: pass | warn | "score: 76"
warnings: [<warning strings>]
errors: [<error strings, if failure>]
```

## Mode: update (rewrite)

When `mode: update`:
- Article frontmatter must have existing `wp_post_id`.
- PUT (not POST) to `/wp-json/wp/v2/posts/{id}`.
- Slug + URL preserved (don't change them — destroys SEO history).
- New body, new schema, new author (if different).
- Publishing log row added with status `update` rather than new publish.

## Mode: schedule

If `schedule_date` is in the future:
- Status set to `future` in WP API.
- Article frontmatter `status: scheduled`, `publish_date: <future date>`.
- The actual frontmatter `published` flip happens later (when WP processes the scheduled post). Subsequent `ccc-seo-weekly-review` runs detect status changes and update vault accordingly.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §4 (hard requirements — gates enforce them), §4.5 (internal linking cadence), §5 (E-E-A-T as indexing foundation).

Article frontmatter schema: [[03 - Schemas/article-frontmatter-schema|article-frontmatter-schema]].

CCC marketplace ancestor: [[ccc-wordpress-seo-implementation]] — for legacy bulk fixes (WPCode pattern). This skill is the publish-flow specifically; that skill is for retroactive sitewide implementation.

## Anti-patterns

- Do NOT use `skip_gates: true` in normal flow. Reserve for genuine emergencies. When used, log loudly.
- Do NOT preserve `wp_post_id` from a previous publish in `new` mode. New publish = new post.
- Do NOT change the slug in `update` mode. Preserves SEO history.
- Do NOT publish without a featured image. Methodology §4.1 — hero banner mandatory.
- Do NOT publish if any required frontmatter field is null or missing. Validate first; fail fast.
- Do NOT inline credentials anywhere. Application Passwords stored in vault config OR Cowork connector store, NEVER in this skill's output.
- Do NOT retry on REST API failure. Surface to caller; operator decides retry strategy.
