---
name: ccc-seo-research-brief
description: |
  Research subagent that produces a complete brief for an article before it's written. Combines DataForSEO SERP scan + Tavily competitor scrape + structured analysis. Output: research brief with top-10 SERP shape, content gap analysis, suggested H2/H3 outline, FAQ candidates from PAA + related queries, internal-link candidates from this client's pillar tree, and (when available) winner-cohort feature constraints to feed into the article-write skill. Replaces the BenAI "Research Team" Langchain agent — but using Tavily + Claude instead of Perplexity + GPT, and persisting structured output to vault rather than dumping into Airtable.
  Use this skill when an operator says "research a topic", "research brief", "prepare an article brief", "SERP analysis", "competitor content gap", or when `ccc-seo-publish-next` orchestrator needs a brief for the next topic in queue. Always runs before `ccc-seo-write-article` — the writer expects a brief, not a raw topic.
allowed-tools: "Read, Write, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: atomic-substrate
  category: novel-ccc
  pattern: subagent
  replaces: "BenAI Research Team Langchain agent (n8n/SEOneu.json)"
  reference_prompt: "01 - Source Material/prompts-extracted/research-team.md"
distribution: ccc-internal
---

# ccc-seo-research-brief — Research Subagent

**Workflow: Receive topic file → SERP scan → competitor scrape → structured synthesis → research brief written to vault.**

## What this is

The research layer between topic ideation and article writing. Takes a topic with a target keyword and produces everything the writer needs to draft a Sirion-quality article: SERP shape, content gap, outline scaffold, FAQ candidates, internal-link candidates, and winner-pattern constraints (when cohort data exists).

Architecturally a subagent — invoked by `ccc-seo-publish-next` (or directly by operator). Internally combines: DataForSEO SERP API + Tavily competitor scrape + Claude synthesis. CCC-voiced rewrite of BenAI's Research Team agent system prompt (extracted to `01 - Source Material/prompts-extracted/research-team.md` — read it as a reference, then use the CCC system prompt below, not the BenAI verbatim).

## When to use

- Mandatory before `ccc-seo-write-article` — the writer expects a brief, not a raw topic.
- Manual: operator wants a research-only output without proceeding to write.
- During strategy: occasionally called by `ccc-seo-strategy-session` for spot-research on candidate topics during topic ideation.

## Inputs

- `topic_path` (required) — path to a topic file in `04 - Silos/[Pillar]/[Silo].md` or `05 - Sub-Silos/[Pillar]/[Silo]/[SubSilo].md`. The topic file's frontmatter has `target_kw`, `intent`, `language`, `parent_silo`, `shape`.
- `client` (required) — wikilink to client. Drives credentials + URL inventory + winners-pattern lookup.

## Procedure

### Step 1 — Load context

Read:
- The topic file (target KW, intent, parent silo, language, shape).
- Client's `00 - Strategy.md` (business overview, focus, library prefix, languages, locations).
- Client's `02 - URL Inventory.md` (existing URLs — for internal-link candidate generation).
- Client's `11 - Cohorts/winners-pattern.md` if status is not `insufficient-data` (otherwise proceed without).
- Client's brand voice profile.

### Step 2 — SERP scan via DataForSEO

Call DataForSEO SERP API with:
- Query = topic's `target_kw`
- `language_code` = topic's `language`
- `location_code` = client's primary location (or topic's location if different)
- Depth = top 10 + SERP features

Capture:
- Top 10 organic results (URL, title, meta description, brand)
- SERP features present (PAA, related searches, featured snippets, knowledge panels, video carousels, image packs)
- PAA questions (typically 4–8)
- Related searches (typically 8)

### Step 3 — Competitor content scrape via Tavily

For top 5 organic results, invoke Tavily Extract on each URL. Capture:
- Article structure (H1, H2 list, H3 list)
- Word count
- FAQ block presence + Q/A count
- Internal linking patterns (rough count of in-content links)
- Distinctive content angles

### Step 4 — Internal-link candidate identification

Read client's URL Inventory + recent articles. For each existing article, score relevance to the new topic on:
- Same parent silo (high relevance)
- Cross-cluster but topically adjacent (medium relevance — these become the cross-cluster links)
- Pillar pages (always candidates — articles should up-link to their pillar)

Output: top 10 internal-link candidates with anchor text suggestions.

### Step 5 — Cohort-aware constraint extraction

If `winners-pattern.md` has data (status ≠ `insufficient-data`):
- Read the winner pattern.
- Translate into constraints for the writer: target word count, target FAQ count, recommended shape, recommended schema, parent silo bias, eeat threshold.
- Surface explicitly in the brief — the writer will see them as system-prompt constraints.

If status = `insufficient-data`:
- Use methodology defaults (per [[02 - Methodology|Methodology]] §3.2 word counts by shape, §4 hard requirements).

### Step 6 — Synthesize the brief

Use Claude (Sonnet) with this system prompt:

```
You are a senior SEO content strategist producing a research brief for a writer.

The writer will produce a Sirion-quality article from your brief — it must follow the CCC SEO AI Suite methodology hard requirements (FAQ block, author byline, schema, definitional opener, cross-cluster internal links, hero image, numbered subsections for process content).

Your brief must contain:
1. **Topic context** — target KW, intent, parent silo, shape, language, location.
2. **SERP shape analysis** — what's ranking, what kind of content (listicle / definitional / opinion / case study), what features (PAA, snippets) — and what gap exists that this article can fill better than the top 10.
3. **Content gap hypothesis** — explicit thesis: "The top 10 do X. They don't do Y. This article wins by doing Y while matching X."
4. **Suggested outline** — H2 list, with brief description per H2. For glossary/process content, include H3s. Aim for the H2 count appropriate to the shape (per cohort or methodology default).
5. **FAQ candidates** — 6–10 question/answer pairs sourced from PAA + related queries + your judgment of what the topic naturally raises. The writer will pick 4–8.
6. **Internal-link candidates** — 8–12 anchors with target URL + anchor text suggestion + rationale. Mix same-silo, cross-cluster, and up-links to pillar.
7. **Brand voice notes** — pull 2–3 specifics from the client's voice profile that should show up in this article (specific tone characteristics, language DOs, language DON'Ts).
8. **Cohort constraints** (if winner-pattern available) — write as explicit constraints the writer must match: "target word count: 1800-2000", "target FAQ count: 5", "schema must include: Article, FAQPage, BreadcrumbList".
9. **External citation candidates** — 5–8 authoritative external sources the writer should consider citing, with why each adds E-E-A-T signal.

Be specific. Avoid generic SEO advice. The writer doesn't need "make it engaging" — they need "open with the definitional sentence: 'Efflorescence is the white crystalline deposit that forms when soluble salts migrate to a masonry surface and react with carbon dioxide.'"

Avoid em-dashes (replace with colons or sentence breaks). Use straight quotes only.
```

Pass: topic + SERP analysis + competitor scrape + internal-link candidates + cohort constraints (if any) + brand voice + business overview.

### Step 7 — Write to vault

Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/07 - Research Briefs/[topic-slug].md`

Frontmatter:
```yaml
---
type: research-brief
client: "[[Client]]"
topic: "[[topic-slug]]"
target_kw: "..."
language: en
shape: glossary
parent_silo: "[[Pillar — X]]"
generated: 2026-04-30
generated_by: ccc-seo-research-brief v0.1.0
serp_top10: ["url1", "url2", ...]
paa_count: 6
related_queries_count: 8
internal_link_candidates_count: 10
cohort_constraints_active: true | false
---
```

Body: the synthesized brief in the structure from Step 6.

### Step 8 — Return

Return the brief path + a 1-paragraph summary of the content gap hypothesis (so the operator can decide whether to proceed to write or refine the topic).

## Anti-patterns

- Do NOT scrape the SERP results' full content via Tavily without filtering — too expensive and noisy. Top 5 results, structural extraction only (H-tags, word count, FAQ presence). Save full extraction for cases where the writer specifically needs to dig into a competitor.
- Do NOT generate internal-link candidates without checking they exist (resolve the wikilinks). Broken internal-link suggestions waste the writer's time.
- Do NOT skip the cohort constraints when winner-pattern is available. The compounding mechanism depends on this hand-off.
- Do NOT produce generic "make sure to include keywords naturally" advice. Brief must be specific to THIS topic, THIS SERP, THIS client.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6.1 (keyword identification — last two lenses live in this skill: SERP-gap and PAA harvest), §3.5 (cross-cluster linking).

BenAI reference: `01 - Source Material/prompts-extracted/research-team.md` — extracted prompt of BenAI's Research Team Langchain agent. Read for inspiration; don't use verbatim (it's GPT/Gemini-flavoured and OpenRouter-shaped).
