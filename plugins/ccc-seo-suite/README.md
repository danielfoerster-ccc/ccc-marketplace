# ccc-seo-suite

The CCC SEO AI Suite. A Claude Cowork plugin that deploys a complete AI-native SEO operation for any client — strategy, content production, publishing, GSC learning loop, per-platform AI-citation tracking, and engagement-start rescue mode for clients with substantial existing content.

## What it is

Two-layer architecture, one plugin, **28 components shipped**:

**Atomic substrate** (17 single-purpose skills):

*Marketplace wraps (9) — forked, CCC-voiced for self-dependence:*
- `ccc-seo-tools-audit` — full Seomator-driven site audit (16 categories / 148 rules)
- `ccc-seo-tools-optimize` — GSC pull + 8 analysis modes (striking distance / low-CTR / cannibalization / decline / trends / content gaps / quick wins / top performers at risk)
- `ccc-seo-tools-content` — E-E-A-T quality gate
- `ccc-seo-tools-geo` — AI citation readiness gate (per-platform)
- `ccc-seo-tools-plan` — strategic planning + competitor SERP enrichment
- `ccc-seo-tools-page` — single-page deep audit
- `ccc-seo-tools-technical` — technical SEO (CWV, robots, indexability, JS rendering)
- `ccc-seo-tools-schema` — JSON-LD generation/validation (HowTo hard-blocked, FAQPage required)
- `ccc-seo-tools-sitemap` — XML sitemap analysis/generation

*Novel CCC atomics (8):*
- `ccc-seo-classify-urls` — URL inventory across 12 role types
- `ccc-seo-ideate-topics` — parent → child topic generation (uses extracted BenAI prompts CCC-voiced)
- `ccc-seo-research-brief` — DataForSEO + Tavily research subagent
- `ccc-seo-write-article` — 6 shape templates, methodology hard requirements enforced inline
- `ccc-seo-publish-wp` — WordPress REST publisher with 3-gate pre-publish flow
- `ccc-seo-link-internal` — dual-mode (new-article scaffolding + retrofit on existing content)
- `ccc-seo-analyze-cohort` — d30/d60/d90/d180 cohort attribution (pre-suite-content aware)
- `ccc-seo-trigger-rewrite` — heuristic decision layer

**Orchestration surface (7 user-task skills):**

*One-time (engagement start, in order):*
- `ccc-seo-onboard` — intake (interactive OR fast-forward from discovery-call findings) + folder bootstrap + credentials + baseline audit
- `ccc-seo-rescue` — engagement-start retrofit for clients with > 20 existing articles
- `ccc-seo-strategy-session` — full strategy build (pillar tree + topic queue, with mandatory brand-term reality-check)
- `ccc-seo-pillar-wave-launch` — sequences one pillar's publishing wave (conversion-champion first, hub last)

*On cadence:*
- `ccc-seo-publish-next` — daily/weekly content session, end-to-end one article
- `ccc-seo-weekly-review` — weekly GSC + opportunity + action queue + report
- `ccc-seo-quarterly-review` — quarterly cohort + audit refresh + strategy refresh decision

**Client-facing layer (1):**
- `ccc-seo-client-handoff` — jargon-free client review documents (translates Pillar/Silo terminology, strips tool-names, voice-calibrated)

**Plus:**
- `ccc-seo` — entry router (top-level intent → correct sub-skill)
- `ccc-seo-dashboard` — live HTML artifact (one per client, re-fetches data on each open)
- `ccc-seo-brand-presence` — off-site brand-presence audit + recommendations

**Shared infrastructure (introduced v1.1.0):**
- `_lib/` — `docx-helpers.js` (CCC-branded report builders + smart-quote-safe escaping), `dataforseo-client.js` (API wrapper with auto cost-logging + parallel-bulk-SERP pattern), `voice-loader.js` (brand-voice profile loader)
- `schemas/` — onboarding-findings, author-profile, article-frontmatter schemas
- `templates/` — client SEO folder template

**Total: 28 skills + shared `_lib`/`schemas`/`templates`, plugin v1.1.0.**

## Architecture

See [[02 - Methodology|the full methodology document]] for the complete operational and architectural philosophy. Every skill in this plugin references it.

Quick map:
- **Claude is the orchestrator** — no n8n, no Airtable webhooks, no external workflow engines
- **Vault is the data layer** — markdown + frontmatter, per-client folders, no Supabase/Airtable
- **WordPress is the only CMS** — REST API + Application Passwords
- **Claude is the only LLM** — Sonnet for writing, Haiku for cheap parallel calls, Opus when truly needed
- **DataForSEO + Tavily + GSC + WordPress REST** — the entire connector stack
- **Closed GSC learning loop** — cohort instrumentation at every publish, d30/d90/d180 cadences, winner pattern feeds back into article-write prompts on every call

## What makes it different

Most AI SEO systems plateau because they treat each article as isolated production. The CCC suite compounds because every loop closes:

- **Loop 1 — Strategy → Architecture:** quarterly refresh against accumulated GSC + cohort evidence
- **Loop 2 — Article → Content:** every article informed by what won at d90 on this client's specific site
- **Loop 3 — Measurement → Off-site:** per-platform AI citation tracking + structural ceiling detection + brand-presence audit when on-site work alone won't break the ceiling

Plus rescue mode for the existing-content reality: most clients arrive with 50–500 existing articles from previous agency work. Rescue runs ONCE at engagement start, retrofits internal linking + E-E-A-T + striking-distance rewrites + schema additions across the existing base. Often produces stronger first-90-day results than new-content work.

Reference deployment from our partner network: +57% organic in 6 months, +114% YoY, 20k+ keywords gained, 550+ AI citations / month, 5–6 month timeline to compounding inflection.

## Engagement model

Designed for **6-month minimum engagements.** The reference deployment took 5–6 months from install to compounding inflection. Sub-6-month engagements sell premature failure.

For existing-content clients (> 20 articles): first 90 days are typically rescue/retrofit work; months 4–6 transition to new-content cadence + the cohort flywheel activating.

For greenfield clients: full strategy session at engagement start, then 6 months of new-content production while compounding mechanism warms up.

## Operator workflow

**One-time setup, in order:**
1. `ccc-seo-onboard` — intake + folder bootstrap (~45 min; near-instant in fast-forward mode if a discovery-call findings-file already exists)
2. `ccc-seo-rescue` *(if > 20 existing articles)* — full retrofit audit + queue (~2-3h interactive + 4-8 weeks application)
3. `ccc-seo-strategy-session` — pillar tree + topic queue (~2h)
4. `ccc-seo-pillar-wave-launch` — sequence the first pillar's publishing wave (~20 min)
5. `ccc-seo-client-handoff` — generate jargon-free review docs for the client to sign off (~30 min)

**On cadence:**
- `ccc-seo-publish-next` — daily / 2-3× weekly (~45-90 min per article)
- `ccc-seo-weekly-review` — weekly (~30 min)
- `ccc-seo-quarterly-review` — quarterly (~2h)
- `ccc-seo-client-handoff` — monthly/quarterly client reports

A handful of sessions cover the full operation. When unsure which skill to run, invoke `ccc-seo` — the entry router picks the next step.

## Configuration

Per-client config lives in `00 - Strategy.md` frontmatter at `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/`. Required fields: client name, url, focus (Service / Product / Hybrid), languages, locations, library_prefix, ymyl flags, authors (wikilinks), brand voice reference, created date.

Credentials handled via Cowork connector store OR vault config — never inline in skills or output.

## Troubleshooting

**Common issues:**

| Symptom | Likely cause | Resolution |
|---|---|---|
| `ccc-seo-publish-wp` fails on E-E-A-T gate | Missing author byline or YMYL article with unqualified author | Verify author profile exists; check `ymyl_qualified.[domain]` for YMYL content |
| `ccc-seo-publish-wp` fails on schema gate | HowTo schema present in output | Re-run `ccc-seo-write-article` — HowTo hard-blocked since Sept 2023 |
| `ccc-seo-publish-wp` fails on URL pattern | Slug + cluster don't match `/{prefix}/{cluster}/{slug}` | Check client's `library_prefix` config and parent_silo of the article |
| GSC connector returns no data | GSC service account not authorised on property | Verify service account has access in Search Console |
| WordPress REST returns 401/403 | Application Password expired or REST API disabled | Regenerate Application Password; check WP REST API plugin not blocked |
| `ccc-seo-analyze-cohort` returns `insufficient-data` | < 18 articles aged ≥ 90 days | Continue cadence; first-confidence pattern typically emerges at quarter 3-4 of operation |
| `ccc-seo-write-article` ignores winners-pattern | Wi