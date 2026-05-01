---
name: ccc-seo-classify-urls
description: |
  Crawls a client's site (or accepts an existing URL list) and classifies every URL into a structural role: Pillar / Silo / Sub-Silo / Product / Category / BOFU / MOFU / TOFU / Legal / Landing / Homepage / About / Other. LLM-driven classification with manual override that's preserved across re-runs. Output: `02 - URL Inventory.md`. Read by `ccc-seo-strategy-session`, `ccc-seo-tools-plan`, and `ccc-seo-trigger-rewrite` to understand the current URL footprint.
  Use this skill when an operator says "classify URLs", "URL inventory", "map the site", "what URLs exist", or when `ccc-seo-onboard` runs the initial inventory or `ccc-seo-strategy-session` needs an updated inventory before planning.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: atomic-substrate
  category: novel-ccc
distribution: ccc-internal
---

# ccc-seo-classify-urls — URL Inventory + Classification

**Workflow: Source URLs → fetch metadata → LLM classify → preserve manual overrides → write inventory.**

## What this is

The URL classification layer. Every URL on the site gets a role assigned, drawn from the methodology's classification taxonomy. The taxonomy is dual-strategy aware (`Pillar` / `Silo` / `Sub-Silo` for Service; `BOFU` / `MOFU` / `TOFU` for Product) plus shared categories (`Legal`, `Landing`, `Homepage`, `About`, `Other`).

Output is the canonical URL footprint that the strategy + planning skills read.

## When to use

- **Onboarding:** `ccc-seo-onboard` runs this once to establish the inventory.
- **Strategy refresh:** `ccc-seo-strategy-session` runs this in refresh mode (re-classify only changed URLs).
- **Manual:** operator added new pages and wants to refresh the inventory.

## Inputs

- `client` (required) — wikilink.
- `mode` (optional) — `initial` (default — full crawl + classify) or `refresh` (incremental — only new/changed URLs).
- `url_source` (optional) — `crawl` (default — discover via sitemap + crawl) or `list` (operator provides explicit URL list).
- `urls` (required if `url_source: list`) — explicit URL list.

## Procedure

### Step 1 — Source URLs

Three sources, in priority order:

1. **Sitemap** (preferred): fetch `[domain]/sitemap.xml` (and any sitemap index children). Extract URLs.
2. **Crawl fallback**: if no sitemap, invoke a targeted crawl from the homepage. Limited depth (3 levels).
3. **Operator-supplied list**: if `url_source: list`, use the provided URLs directly.

Apply exclusions: any URL marked `seo_excluded` in prior inventory + any pattern in client's `00 - Strategy.md` exclusions field.

### Step 2 — Fetch URL metadata

For each URL, fetch (in batches of ~20 to avoid rate limits):
- HTTP status code
- Title tag
- Meta description
- Canonical URL
- First H1
- URL path structure (segments)
- Content type (article / product page / category page / ...)

Use Tavily Extract for content type sensing (cheap, fast). Skip URLs that 404 or 5xx (note them in inventory but don't classify).

### Step 3 — LLM classification

Use Claude (Sonnet for nuance OR Haiku for cheap parallel classification across many URLs).

Classification system prompt:

```
You are classifying URLs from a client's website into structural roles.

Client context:
- Business: {business overview}
- Focus: {Service / Product / Hybrid}
- Library prefix: {prefix}
- Existing pillar tree (if any): {list}

Classification taxonomy:

For Service-strategy clients:
- `pillar` — top-level Pillar page covering a core topic comprehensively. Hub page.
- `silo` — Silo-level cluster page within a Pillar.
- `sub-silo` — Sub-Silo article (typically glossary, opinion, case-study, etc.).
- `cluster-index` — index page for a cluster (lists all silos / sub-silos under it).

For Product-strategy clients:
- `bofu` — BOFU product / service page (purchase intent).
- `mofu` — MOFU comparison / use-case article.
- `tofu` — TOFU awareness article.
- `category` — e-commerce category page.
- `product-detail` — single product page.

Shared:
- `legal` — privacy / terms / impressum / disclaimer.
- `landing` — marketing landing page (paid traffic — not SEO target).
- `homepage` — site homepage.
- `about` — about / team / contact.
- `tag-archive` — tag or category archive (often noindex on WordPress).
- `author-archive` — author archive.
- `pagination` — paginated archive.
- `redirect` — URL that redirects (note destination).
- `other` — anything not matching above. Flag for manual review.

For each URL provided, output:
- `url`
- `classification` (from above)
- `cluster` (which Pillar / silo / BOFU it belongs to — extract from URL path or content)
- `confidence` (low / medium / high)
- `flag_for_review` (true if classification is uncertain or URL pattern doesn't match expected library prefix)
- `notes` (1 sentence — why this classification)

Be conservative on classification. If unclear, classify as `other` with `flag_for_review: true` rather than guessing.
```

### Step 4 — Preserve manual overrides

If a prior `02 - URL Inventory.md` exists, read it. For each URL where the prior classification has a `manual_override: true` flag, preserve the prior classification regardless of what the LLM says now. Surface the difference in the audit but don't change the assignment.

### Step 5 — Validate URL pattern

For URLs with classifications `pillar`, `silo`, `sub-silo`: validate against the client's `library_prefix` + `/{cluster}/{slug}` pattern.

URLs that should be in the library structure but aren't (e.g., a `sub-silo`-classified article living at `/blog/efflorescence/` instead of `/library/surface-cleaning/efflorescence/`) get flagged as `pattern_mismatch: true` — `ccc-seo-trigger-rewrite` reads this to surface URL migration opportunities.

### Step 6 — Write `02 - URL Inventory.md`

```markdown
---
type: url-inventory
client: "[[Client]]"
generated: 2026-04-30
generated_by: ccc-seo-classify-urls v0.1.0
total_urls: 247
classified_count: 240
manual_override_count: 12
flagged_for_review: 8
pattern_mismatch_count: 5
---

# URL Inventory

| URL | Classification | Cluster | Status | Confidence | Manual Override | Pattern Match | Notes |
|---|---|---|---|---|---|---|---|
| / | homepage | — | live | high | false | n/a | |
| /library/ | cluster-index | — | live | high | false | yes | Service hub |
| /library/surface-cleaning/ | pillar | Surface Cleaning | live | high | false | yes | |
| /library/surface-cleaning/efflorescence-removal/ | sub-silo | Surface Cleaning | live | high | false | yes | glossary article |
| ... | ... | ... | ... | ... | ... | ... | ... |
```

### Step 7 — Return

Return:
```yaml
inventory_path: "02 - URL Inventory.md"
total_urls: <int>
classified: <int>
flagged_for_review: <int>
pattern_mismatches: <int>
manual_overrides_preserved: <int>
new_since_last_run: <int>     # for refresh mode
```

## Mode: refresh

In refresh mode:
- Read existing inventory.
- Source URLs (sitemap or crawl).
- Compute set difference: new URLs (not in inventory), removed URLs (in inventory but no longer present), changed URLs (different metadata).
- Classify only new + changed.
- Preserve all existing manual overrides.
- Mark removed URLs as `status: removed` rather than deleting (history matters).

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §3 (company wikipedia pattern — classification matches the structural taxonomy), §3.3 (URL architecture pattern — pattern mismatch detection).

URL inventory schema seeded in: `04 - Templates/_TEMPLATE - Client SEO Folder/02 - URL Inventory.md`.

## Anti-patterns

- Do NOT classify URLs without fetching their metadata. Title + H1 + content type matter for classification confidence.
- Do NOT overwrite manual overrides. Operator's manual classification is canonical.
- Do NOT delete removed URLs from inventory. Mark `status: removed`. URL history matters for SEO archaeology.
- Do NOT skip pattern validation. URL pattern mismatches are migration opportunities the trigger-rewrite layer needs to see.
- Do NOT re-classify URLs unchanged in refresh mode. Wastes tokens and risks classification drift.
