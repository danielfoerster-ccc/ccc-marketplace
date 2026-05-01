---
name: ccc-seo-ideate-topics
description: |
  Generates child topics from a parent (Pillar → Silos, Silo → Sub-Silos, BOFU → MOFU, MOFU → TOFU) using extracted BenAI prompts (BOFO_to_MOFO, MOFU_to_TOFU_Topics, GeneralCategory, Create_Sub_SoloTopics) CCC-voiced for Claude. Each topic is born with target keyword (DataForSEO-validated for volume + intent), proposed shape, intent classification, language, and parent-silo wikilink. Output: new topic files in `04 - Silos/` or `05 - Sub-Silos/`. Read by `ccc-seo-strategy-session` (initial topic queue) and `ccc-seo-trigger-rewrite` (gap-filling new-article queue).
  Use this skill when an operator says "generate topics", "ideate topics", "topic ideation", "what should we write next", "expand the silo", "fill out the pillar tree", or when `ccc-seo-strategy-session` runs the topic ideation stage or `ccc-seo-trigger-rewrite` queues a new-article action from a content-gap finding.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: atomic-substrate
  category: novel-ccc
  reference_prompts:
    - "01 - Source Material/prompts-extracted/bofo-to-mofo.md"
    - "01 - Source Material/prompts-extracted/mofu-to-tofu-topics.md"
    - "01 - Source Material/prompts-extracted/generalcategory.md"
    - "01 - Source Material/prompts-extracted/create-sub-solotopics.md"
    - "01 - Source Material/prompts-extracted/extractkeywords.md"
distribution: ccc-internal
---

# ccc-seo-ideate-topics — Topic Tree Generation

**Workflow: Receive parent → load context → LLM ideate (CCC-voiced from BenAI prompts) → DataForSEO keyword enrichment → write child topic files → return queue update.**

## What this is

The topic ideation layer. Given a parent (Pillar / Silo / BOFU / MOFU), produces child topics that fill out the topical tree. Uses the four extracted BenAI prompt chains as starting templates, CCC-voiced for Claude execution.

The four prompts:
- `BOFO_to_MOFO` (Product strategy) — BOFU page → MOFU comparison/use-case topics
- `MOFU_to_TOFU_Topics` (Product strategy) — MOFU article → TOFU awareness topics
- `GeneralCategory` (Service strategy) — Pillar → Silo topics
- `Create_Sub_SoloTopics` (Service strategy) — Silo → Sub-Silo topics

Plus DataForSEO `keywords_data` enrichment per generated topic — volume, difficulty, intent confirmation.

## When to use

- **Initial topic queue at strategy time:** `ccc-seo-strategy-session` invokes for each Pillar (or BOFU) to fill 3 silos × 3 sub-silos minimum.
- **Gap-filling:** `ccc-seo-trigger-rewrite` queues a new-article action from content-gap finding → calls this skill to generate the topic file before research-brief runs.
- **Manual:** operator wants to expand a specific cluster (e.g., "give me 10 sub-silos under this silo").

## Inputs

- `parent_path` (required) — wikilink to a Pillar / Silo / Sub-Silo / BOFU / MOFU file.
- `client` (required).
- `count` (optional) — how many child topics to generate (default 5).
- `excluded_topics` (optional) — topics to avoid duplicating (auto-populated from existing siblings under the parent).
- `language` (optional) — defaults to parent's language.
- `seed_keyword` (optional) — when called from gap-filling, the specific gap KW seeds the generation.

## Procedure

### Step 1 — Load context

Read:
- Parent file frontmatter (target_kw, intent, language, focus inferred from parent type, brand voice notes if pillar-level).
- Client `00 - Strategy.md` (focus, library prefix, business overview).
- All sibling topics already under this parent (for `excluded_topics` auto-population).
- Client brand voice profile.
- Client winners-pattern.md (if available — informs shape preferences in topic generation).

### Step 2 — Determine generation mode + prompt template

Map parent type to prompt template:

| Parent type | Strategy | Prompt template |
|---|---|---|
| Pillar | Service | `GeneralCategory` (CCC-voiced) |
| Silo | Service | `Create_Sub_SoloTopics` (CCC-voiced) |
| BOFU page | Product | `BOFO_to_MOFO` (CCC-voiced) |
| MOFU article | Product | `MOFU_to_TOFU_Topics` (CCC-voiced) |

The CCC-voiced version of each prompt: read the extracted BenAI prompt for STRUCTURE (what it asks for, what output schema it expects). Rewrite the prompt for Claude with:
- Removed em-dashes.
- Removed n8n-specific template variable syntax (`{{ $json.X }}` becomes plain `{X}`).
- CCC methodology references inline ("FAQ block mandatory; cross-cluster linking 3-4; definitional opener for glossary shapes; HowTo schema forbidden").
- Brand voice constraints from this client (not generic).
- Cohort constraint hints from `winners-pattern.md` when available.

### Step 3 — Generate candidate topics

Invoke Claude (Sonnet for nuance OR Haiku in batch mode if count > 10).

System prompt (Service Pillar → Silo example):

```
You are generating Silo topics under a Pillar page for {client_name}.

Pillar context:
- Pillar name: {pillar.target_kw}
- Pillar description: {pillar body description}
- Library prefix: {client.library_prefix}
- Language: {language}
- Location: {primary_location}

Client business: {business_overview}
Client focus: Service (Pillar → Silo → Sub-Silo)
Brand voice: {voice notes}
{If winners-pattern available:} This client's winning topics historically have been: {winner shapes + parent silos + intents}

Generate {count} Silo topic candidates. Each Silo:
- Should be a distinct, deep sub-topic of the Pillar — not a shallow re-phrasing.
- Should have search intent (informational / commercial / transactional / navigational).
- Should fit the brand's voice and offer clearly.
- Should not duplicate existing Silos: {excluded_topics list}

For each Silo, output:
- `topic` — concise topic name (becomes the H1 / page title eventually)
- `target_kw` — the primary KW we'd target with this Silo
- `intent` — the search intent
- `description` — 2-3 sentences describing what the Silo covers + why it matters for the Pillar
- `proposed_shape` — `pillar` | `glossary` | `opinion` | `case-study` | `report-summary` | `video-episode`. Most Silos are `pillar` (cluster index pages); Sub-Silos under them will be `glossary`/`opinion`/etc.
- `expected_sub_silos` — 3-5 sub-silo topics this Silo would naturally cover (informs whether Silo is rich enough)

Constraints:
- Avoid em-dashes. Use colons or sentence breaks.
- Use straight quotes only.
- Be specific. Generic topics like "Best Practices for X" are weak — push toward "How [specific stakeholder] handles [specific scenario] in [specific context]".

Output as YAML list.
```

Equivalent prompts for the other three parent types — same structure, different schema fields per strategy stage.

### Step 4 — DataForSEO keyword enrichment

For each candidate topic's `target_kw`, invoke DataForSEO `keywords_data` (with `language_code` + `location_code`):
- Search volume (monthly)
- Keyword difficulty
- CPC (signals commercial intent)
- Related KW + PAA (for the eventual research brief)

Discard candidates with:
- Volume < threshold (default 50/mo for sub-silo, 200/mo for silo, 500/mo for pillar — adjustable per client)
- Volume null AND no clear topical relevance (often a sign of over-niche or fabricated topics)

For each remaining candidate, attach the DataForSEO data to its frontmatter.

### Step 5 — Write topic files

For each surviving candidate:

Path:
- Service strategy:
  - Pillar children: `04 - Silos/[Pillar]/[Silo].md`
  - Silo children: `05 - Sub-Silos/[Pillar]/[Silo]/[Sub-Silo].md`
- Product strategy:
  - BOFU children (MOFU): `04 - Silos/[BOFU]/[MOFU].md` (using same folder structure with naming convention)
  - MOFU children (TOFU): `05 - Sub-Silos/[BOFU]/[MOFU]/[TOFU].md`

Frontmatter:
```yaml
---
type: topic
status: queued                        # queued | researched | drafted | published | deferred | archived
client: "[[Client]]"
parent_silo: "[[Parent]]"
target_kw: "..."
intent: informational
language: en
location: US
ymyl: false
shape: glossary                       # proposed shape
search_volume: 320
keyword_difficulty: 24
cpc: 0.85
related_kws: [...]
paa_questions: [...]
generated: 2026-04-30
generated_by: ccc-seo-ideate-topics v0.1.0
priority: medium                      # set by trigger-rewrite if from gap-filling; default medium otherwise
---

# {Topic name}

## Description
{2-3 sentence description from generation}

## Expected coverage
{If Pillar/Silo: list of expected child topics that flesh out this cluster}

## Notes
(Operator notes, manual edits, refinements — preserved across re-runs of ideation.)
```

Append wikilink to client's topic queue in `00 - Strategy.md`.

### Step 6 — Return

```yaml
parent: "[[Parent]]"
mode: service-pillar-to-silo
generated_count: 5
discarded_low_volume: 2
written_count: 5
topic_paths: [...]
queue_updated: true
```

## Cohort awareness

When `winners-pattern.md` is populated, ideation gets weighted:
- Shapes the cohort shows wins on this site get over-generated (e.g., if `glossary` dominates winners, 60% of generated sub-silos default to `glossary` shape).
- Parent silos with high winner concentration get prioritised in operator-suggested topics ("over-invest in Surface Cleaning silo — winners cluster there").
- Loser-shape patterns get under-generated (rare cleanup case).

When cohort is `insufficient-data`: fall back to methodology defaults (per shape ratios in §3.2).

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §2 (dual strategy framework — what shapes generate at each parent type), §6.2 (cohort learning — drives shape weighting).

BenAI reference prompts (in `01 - Source Material/prompts-extracted/`):
- `bofo-to-mofo.md`, `mofu-to-tofu-topics.md` (Product strategy)
- `generalcategory.md`, `create-sub-solotopics.md` (Service strategy)
- `extractkeywords.md` (kept as separate enrichment now via DataForSEO)

Read for STRUCTURE; rewrite as Claude-native CCC-voiced prompts. Don't use verbatim — they're n8n + Gemini Flash flavoured.

## Anti-patterns

- Do NOT generate topics that duplicate existing siblings. Read the excluded list before generation.
- Do NOT skip DataForSEO enrichment. Volume + intent confirmation is what makes generated topics empirically grounded.
- Do NOT use BenAI's prompts verbatim — they're optimised for a different runtime + different model family.
- Do NOT skip cohort weighting when winners-pattern is populated. Compounding depends on this hand-off.
- Do NOT generate sub-silos under Pillars directly (skipping the Silo layer). Two-level hops produce flat sites without topical hierarchy.
