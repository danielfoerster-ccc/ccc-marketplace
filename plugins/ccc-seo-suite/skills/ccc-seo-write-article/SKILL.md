---
name: ccc-seo-write-article
description: |
  Produces a complete Sirion-quality article from a research brief. Six shape templates (glossary, pillar, opinion, case-study, report-summary, video-episode) — different prompt template per shape, all enforcing CCC methodology hard requirements (FAQ block, author byline, schema, definitional opener, numbered subsections for process content, cross-cluster internal links, hero image prompt, multi-language compliance, em-dash avoidance, the 10 well-written characteristics from methodology §4.6). Reads brief + brand voice + winners-pattern (when available) + author profile + strategy. Outputs: full article body + meta title/description + slug + JSON-LD schema (Article + FAQPage + BreadcrumbList; never HowTo) + image prompt + FAQ block. Heart of the suite.
  Use this skill when an operator says "write the article", "draft the article", "produce article from brief", or when `ccc-seo-publish-next` orchestrator runs the write step. Always called after `ccc-seo-research-brief`. Output goes through quality gates (E-E-A-T + GEO + schema) before publish.
allowed-tools: "Read, Write, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: atomic-substrate
  category: novel-ccc
  reference_prompts:
    - "01 - Source Material/prompts-extracted/writer.md"
    - "01 - Source Material/prompts-extracted/writer1.md"
    - "01 - Source Material/prompts-extracted/bofu-copywriter.md"
    - "01 - Source Material/prompts-extracted/metatitle-metadescription.md"
    - "01 - Source Material/prompts-extracted/pillarpage-writer-MISSING.md"
distribution: ccc-internal
---

# ccc-seo-write-article — The Article Producer

**Workflow: Receive brief → load context → select shape template → draft body → produce meta + slug + schema + FAQ + image prompt → write to vault.**

## What this is

The heart of the suite. Every article published by `ccc-seo-suite` comes through this skill. Sirion-quality output — definitional opener, FAQ blocks, author byline, schema, cross-cluster internal links — is enforced at the prompt level, not as a post-write pass.

Six shape templates handle the spectrum of content types a service business needs. Single skill, six prompts, one consistent quality bar.

## When to use

- Mandatory step in `ccc-seo-publish-next` orchestrator after `ccc-seo-research-brief`.
- Operator wants to draft an article from an existing brief.
- Operator wants to rewrite an existing article (read existing as input + new brief; produce new draft).
- NEVER called without a brief. The writer requires a brief — refusing to write without one is a feature, not a bug.

## Inputs

- `brief_path` (required) — path to a research brief in `07 - Research Briefs/`.
- `client` (required).
- `mode` (optional) — `new` (default — writing a fresh article) or `rewrite` (input is an existing article + new brief; output is a rewritten version).
- `existing_article_path` (required if mode=rewrite).

## Procedure

### Step 1 — Load full context

Read in this order:
1. The research brief — content gap hypothesis, suggested outline, FAQ candidates, internal-link candidates, brand voice notes, cohort constraints, external citation candidates.
2. Client `00 - Strategy.md` — focus (Service / Product), pillar tree, library prefix.
3. Client brand voice profile — voice tone characteristics, language DOs, language DON'Ts, conviction statements.
4. Author profile (resolved from `author` field — must be set on the topic file or supplied explicitly).
5. Client `11 - Cohorts/winners-pattern.md` if available (already digested into the brief, but writer reads directly too for completeness).
6. Methodology document § 4 (hard requirements) and § 4.6 (the 10 well-written characteristics).
7. Existing article (if mode=rewrite).

### Step 2 — Select shape template

The brief frontmatter declares `shape`. Match to one of six templates:

| Shape | When | Word count target | Structural emphasis |
|---|---|---|---|
| `glossary` | "What is X?" definitional articles. Sub-Silo level. Long-tail KW. | 1200–2000 | Definitional opener mandatory. Numbered or H2-listed sections defining sub-concepts. FAQ block. Schema: Article + FAQPage + BreadcrumbList. |
| `pillar` | Core topical authority anchors. Pillar level. Comprehensive guides. | 2500–3500 | Comprehensive coverage. Multi-section with deep H2/H3 hierarchy. Links outward to all silos under it. FAQ block. Schema: Article + FAQPage + BreadcrumbList. |
| `opinion` | Branded thought leadership. POV pieces. | 1500–2500 | Strong opinion statement in opener. Substantiated argument. Brand voice front-and-centre. FAQ optional but recommended. Schema: Article + FAQPage (if FAQ present) + BreadcrumbList. |
| `case-study` | Customer proof with quantified results. | 1500–2500 | Situation → Action → Result structure. Quantified outcomes. Customer voice (with permission). Schema: Article + BreadcrumbList; optionally FAQPage if Q/A on results. |
| `report-summary` | Executive summary of longer analyst report / whitepaper. | 1500–2500 | Lead with key finding. Methodology overview. Results summary. CTA to full report. Schema: Article + FAQPage + BreadcrumbList. |
| `video-episode` | Show notes + transcript + key moments for video / podcast. | 1500–3000 | Episode summary, key moments with timestamps, action takeaways, transcript section, related episodes. Schema: Article + VideoObject + Clip (key moments) + FAQPage + BreadcrumbList. |

### Step 3 — Compose system prompt for the writer

Use Claude Sonnet 4.6. System prompt structure:

```
You are a senior content strategist + writer producing a {shape} article for {client_name}, a {brief description from business overview}.

The article must follow the CCC SEO AI Suite methodology — non-negotiable hard requirements:

1. **Definitional opener** — first paragraph answers "what is this?" cleanly, no lead-up. (For opinion / case-study / video-episode: open with the angle, finding, or context — not a lead-up.)
2. **FAQ block** at the bottom: 4-8 Q/A pairs sourced from the brief. Each answer 2-4 sentences, self-contained.
3. **Author byline + bio block** at the bottom — render from author profile. Include short bio (1-2 sentences) + role + canonical photo URL placeholder.
4. **Numbered subsections** for sequential / process content. Plain H2 for topic-by-topic content.
5. **Cross-cluster internal links** — pick 3-4 from the brief's candidate list. Mix same-silo, cross-cluster, up-link to pillar. Anchor text natural, not exact-match keyword stuffed.
6. **Hero image prompt** — produce a one-paragraph image generation prompt suited to the article's topic. Used by publish-wp to generate + upload featured image.
7. **Schema markup** — produce JSON-LD blob with: Article, FAQPage, BreadcrumbList. (Plus VideoObject + Clip for video-episode shape.) NEVER HowTo (Google retired Sept 2023). Author + Organization linked from Article.
8. **Meta title** ≤ 60 chars, **meta description** ≤ 155 chars, **slug** URL-safe lowercase-hyphenated.

Voice constraints (from brand voice profile):
{voice tone characteristics}
{language DOs}
{language DON'Ts}

Cohort constraints (from this client's empirical winners pattern, where available):
{cohort constraints from brief — target word count, FAQ count, etc.}
{If insufficient cohort data, fall back to methodology defaults for {shape}.}

Citation requirements:
- Include 3-5 external citations to authoritative sources.
- Each citation: link + brief context. Not "fluff links". Cite where it adds genuine E-E-A-T signal.

Stylistic constraints (the 10 well-written characteristics — methodology §4.6):
1. Definitional opener (above).
2. NEVER use em-dashes — replace with colons, semicolons, or sentence breaks.
3. Use straight quotes ONLY. Never curly quotes.
4. Self-contained sentences — every sentence makes sense without surrounding context.
5. Specific over abstract — numbers, named examples, quantified outcomes.
6. Numbered lists for sequence; bulleted for parallel; never mix.
7. No "we"/"our"/"us" without antecedent. Use the brand name in the opening.
8. No filler transitions ("Now, let's dive into..."). Move to the next H2.
9. One claim per sentence — compound claims weaken AI citation surface.
10. Source attribution where credible — sparingly, where it adds value.

Language: {language}. {If non-English: produce in target language. If client supports cultural adaptation, adjust examples and references for the locale.}

Target audience: {ICP from business overview}.

Brief content gap hypothesis (your guidance for HOW this article wins):
{content gap from brief}

Suggested outline (refine as needed):
{outline from brief}

FAQ candidates (pick 4-8):
{FAQ candidates from brief}

Internal-link candidates (pick 3-4 cross-cluster + 2-3 same-silo):
{candidates from brief}

External citation candidates:
{candidates from brief}

Author profile (for byline):
{author profile data}

Output structure (in this order, separated by `---`):
1. Article frontmatter (YAML — see schema)
2. Article body (markdown)
3. FAQ block (markdown — H2 "Frequently Asked Questions" + Q/A pairs)
4. Author byline block (markdown — H3 "About the Author" + bio paragraph + photo placeholder)
5. Schema JSON-LD (one fenced block per schema type)
6. Hero image prompt (one paragraph — the prompt that will be sent to image generation)
```

### Step 4 — Generate

Pass the full system prompt + brief + voice + cohort constraints + author profile to Claude Sonnet. Capture full output.

### Step 5 — Validate output

Check the output against the methodology hard requirements:
- Definitional opener present? (For glossary/pillar/report-summary shapes — required.)
- FAQ block has ≥ 4 and ≤ 8 Q/A pairs?
- Author byline block present + matches author profile?
- Schema JSON-LD valid? Article + FAQPage + BreadcrumbList present? NO HowTo?
- Em-dashes absent? Curly quotes absent?
- Internal-link count ≥ 5 (3-4 cross-cluster + 2-3 same-silo)?
- Word count within target range for shape?
- Meta title ≤ 60 chars, meta description ≤ 155 chars?

If any fail, do ONE re-prompt cycle: tell Claude what failed, ask for revision. If second pass still fails, return error to operator with the specific failures listed. Do NOT auto-iterate further — repeated failures signal a brief problem or a methodology adherence problem worth operator review.

### Step 6 — Write to vault

Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/06 - Articles/[YYYY-MM-DD] - [slug].md`

Frontmatter (matches `03 - Schemas/article-frontmatter-schema.md`):
```yaml
---
slug: efflorescence-removal
shape: glossary
language: de
parent_silo: "[[Pillar — Surface Cleaning]]"
target_kw: efflorescence removal
intent: informational
ymyl: false
author: "[[Heiko Lube]]"
publish_date: null            # set by publish-wp at publish time
read_time_minutes: 9
word_count: 1840
h2_count: 7
faq_count: 4
internal_links_in: 0          # backfilled by publish-wp + link-internal
internal_links_out: 5
cross_cluster_links_out: 2
schema:
  - Article
  - FAQPage
  - BreadcrumbList
eeat_score: null              # filled by tools-content gate
geo_score: null               # filled by tools-geo gate
status: draft
---
```

Body: article + FAQ block + author byline. Schema JSON-LD as fenced code blocks at the bottom. Hero image prompt as a final commented section (`<!-- hero-image-prompt: ... -->`).

### Step 7 — Return

Return article path + word count + FAQ count + internal-link counts + a 1-paragraph summary of what the article does (so the operator can decide whether to proceed to gate + publish, or send back for revision).

## Multi-language behaviour

For non-English articles:
- Generate directly in target language. Do NOT generate in English then translate.
- Cultural adaptation pass automatically: examples, references, idioms adjusted for locale.
- Brand voice profile in target language (per `voice.{lang}.md` if exists; otherwise use the canonical voice profile and translate the constraints).
- Author profile: ensure author has the language listed in `languages:` array. Validate before generation.

## Mode: rewrite

When mode=rewrite:
- Input includes the existing article body.
- The system prompt adds: "This is a rewrite of an existing article that's not performing. The existing article is below — read it for what's there, but rewrite from scratch using this brief. Don't preserve verbatim text unless it's clearly worth keeping. The point of a rewrite is to fix what's not working, not preserve what is."
- The new article inherits the existing slug + URL (so the publish-wp call updates rather than creates).

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] — read § 4 (hard requirements) and § 4.6 (10 well-written characteristics) before every write, every time. They are the contract.

BenAI reference prompts (in `01 - Source Material/prompts-extracted/`):
- `writer.md`, `writer1.md` — main BenAI writer chains. Read for what concepts they cover; don't use verbatim.
- `bofu-copywriter.md` — BenAI BOFU writer. Useful for Product strategy article-write of BOFU shape (we don't currently have a "bofu" article shape — Product strategy clients use existing Product pages and the writer is invoked only for MOFU / TOFU shapes which map to our `glossary` / `opinion` / `case-study`).
- `metatitle-metadescription.md` — BenAI's meta generator. Reference only — meta is produced inline by this writer skill, not as a separate call.
- `pillarpage-writer-MISSING.md` — confirms BenAI's shipped workflow has NO pillar page writer. We're shipping stronger.

## Anti-patterns

- Do NOT write without a brief. Refusing to write without one is a feature.
- Do NOT preserve em-dashes from external citations or the brief itself. Replace at write time.
- Do NOT generate `HowTo` schema. Hard-blocked by methodology + by tools-schema gate. Don't even reference it.
- Do NOT skip the FAQ block. "But the topic doesn't lend itself to FAQ" → if there are no plausible questions, the topic isn't ready for an article. Refine the brief.
- Do NOT skip the author byline. Auto-generated articles without authors fail E-E-A-T gate + fail to index in YMYL.
- Do NOT write articles longer than the shape's word count range. Long articles dilute the ranking signal.
- Do NOT write articles shorter than the shape's word count range. Thin content fails E-E-A-T.
- Do NOT auto-iterate past one re-prompt cycle when validation fails. Repeated failures need operator attention.
- Do NOT generate generic "in conclusion" or "in summary" closing paragraphs. End on the last substantive H2.
