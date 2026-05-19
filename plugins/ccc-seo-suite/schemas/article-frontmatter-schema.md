# Article Frontmatter Schema

Every article produced via `ccc-seo-write-article` and published via `ccc-seo-publish-wp` follows this frontmatter schema. Cohort-analysis (`ccc-seo-analyze-cohort`) reads these fields to partition winners vs. losers.

## Required (set by `ccc-seo-write-article`)

```yaml
---
type: article
shape: glossary | pillar | opinion | case-study | report-summary | video-episode
status: queued | drafted | quality-gated | published | rewritten | archived
client: "[[<Client>]]"
author: "[[_authors/<slug>]]"
language: de | en | fr | <ISO>
location_code: <DataForSEO geo code>
parent_silo: "[[<silo wikilink>]]" | null
parent_pillar: "[[<pillar wikilink>]]"
target_kw: <primary keyword>
secondary_kws:
  - <kw1>
  - <kw2>
intent: informational | commercial | navigational | transactional
title: <article title — H1>
slug: <url-slug>
meta_title: <SERP title 30–60 chars>
meta_description: <SERP description 130–160 chars, 920px max width>
created: YYYY-MM-DD
---
```

## Quality-Gate Fields (added by gates)

```yaml
eeat_score: <0–100>
eeat_gate_passed: true | false
geo_score: <0–100 composite>
geo_per_platform:
  ai_overviews: <0–100>
  chatgpt: <0–100>
  perplexity: <0–100>
  gemini: <0–100>
  copilot: <0–100>
schema_types_present:
  - Article
  - FAQPage
  - BreadcrumbList
schema_gate_passed: true | false
gates_run_at: YYYY-MM-DDTHH:MM:SSZ
```

## Publish Fields (set by `ccc-seo-publish-wp`)

```yaml
wp_post_id: <int>
wp_url: <https://...>
publish_date: YYYY-MM-DD
featured_image_url: <https://...>
yoast_focus_kw: <target_kw>
```

## Cohort-Backfill Fields (set by `ccc-seo-tools-optimize` weekly when windows reach)

```yaml
gsc_d30:
  impressions: <int>
  clicks: <int>
  ctr: <float>
  avg_position: <float>
  captured_at: YYYY-MM-DD
gsc_d60: {...}
gsc_d90: {...}
gsc_d180: {...}
ai_citations_d30:
  ai_overviews: <int>
  chatgpt: <int>
  perplexity: <int>
  gemini: <int>
  copilot: <int>
  captured_at: YYYY-MM-DD
ai_citations_d60: {...}
ai_citations_d90: {...}
ai_citations_d180: {...}
```

## Cohort-Classification (set by `ccc-seo-analyze-cohort`)

```yaml
cohort_d90_status: winner | loser | unmeasured
winners_pattern_features:
  word_count: <int>
  faq_block_present: <bool>
  internal_links_inbound: <int>
  internal_links_outbound: <int>
  schema_types_count: <int>
  publish_dow: monday | tuesday | ...
```

---

*Introduced: v0.2.0 (2026-05-18) — formalised from informal usage in v0.1.*
