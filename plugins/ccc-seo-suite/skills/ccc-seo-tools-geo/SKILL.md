---
name: ccc-seo-tools-geo
description: |
  AI-citation readiness quality gate. Scores articles + sites for AI Overviews / ChatGPT / Perplexity / Gemini / Copilot citability. Wraps the BenAI marketplace skill seo:seo-geo with a CCC-specific persistence + decision layer: per-platform scores written to the article's frontmatter (`geo_score:` composite + per-platform breakdown), warn thresholds applied, brand-presence audit suggested when off-site signals are weak (3× higher correlation with AI citation visibility than backlinks per seo:seo-geo research).
  Use this skill when an article needs AI-citation scoring before publish — `ccc-seo-publish-wp` calls it as a mandatory gate alongside `ccc-seo-tools-content`. Also called by `ccc-seo-quarterly-review` for site-level GEO re-audit and by `ccc-seo-brand-presence` (Phase 5+) for off-site presence assessment. Always-on from Phase 2 onward.
allowed-tools: "Read, Write, Bash, WebFetch"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-geo (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: full-extension
  ccc_role: quality-gate
distribution: ccc-internal
---

# ccc-seo-tools-geo — AI Citation Readiness Quality Gate

**Workflow: Receive article OR site → score via `seo:seo-geo` → apply CCC thresholds → write per-platform scores to frontmatter → return pass/fail + brand-presence flag.**

## What this is

The AI-citation readiness gate. Scores how citable an article (or full site) is in AI Overviews, ChatGPT, Perplexity, Gemini, and Copilot. Critical because AI citation surface is a Tier-1 outcome metric (reference deployment hit 550+ AI citations / month) AND because brand mentions correlate 3× more strongly with AI-citation visibility than backlinks (YouTube 0.737 vs. Domain Rating 0.266).

Two modes: article-level (called by publish flow) and site-level (called by quarterly review).

## When to use

- **Mandatory** in publish flow — every article gets a GEO score before publish.
- Quarterly: site-level re-audit captures evolution of brand-presence signals.
- Manual: operator wants to assess a specific page or compare two pages' AI-citation readiness.
- Brand-presence triggering: when site-level GEO score has weak off-site brand signals, this skill flags for `ccc-seo-brand-presence` follow-up (Phase 5+).

## Procedure

### Mode: Article (publish-flow gate)

1. **Receive inputs:**
   - `article_path` (required)
   - `client` (required)
   - `mode: article-gate` (default for this code path)

2. **Read article frontmatter** for `language:`, `shape:`, `target_kw:`, existing schema list.

3. **Invoke `seo:seo-geo`** with the article body + frontmatter context. Marketplace skill returns:
   - Per-platform citability scores: `ai_overviews`, `perplexity`, `chatgpt`, `gemini`, `copilot` (each 0–100)
   - Composite GEO score (0–100)
   - Brand-presence signal scores (off-site mentions on YouTube, Reddit, Wikipedia, podcasts)
   - Recommended improvements per platform

4. **Apply CCC threshold logic:**

   | Mode | Threshold | Action |
   |---|---|---|
   | article-gate, default | warn <70 | <70: WARN, allow publish; 70+: PASS |
   | article-gate, YMYL | warn <80 | YMYL articles get tighter warn (not hard-block — hard-block lives in eeat gate). |

   Per-client overrides via `client_overrides.geo_threshold` in `00 - Strategy.md`.

5. **Write to article frontmatter:**
   ```yaml
   geo_score: 76
   geo_breakdown:
     ai_overviews: 78
     perplexity: 82
     chatgpt: 71
     gemini: 75
     copilot: 74
   ```

6. **Brand-presence flag:** if the site-level brand-presence signals are weak (operator's site has no YouTube / Reddit / Wikipedia mentions detected), include `brand_presence_ceiling: true` in the return — this signals the operator that on-site improvements alone won't break the AI-citation ceiling.

7. **Return** result with per-platform scores, warnings, recommended improvements, and the brand-presence flag.

### Mode: Site (quarterly-review)

1. **Receive inputs:**
   - `client` (required)
   - `mode: site-audit`

2. **Invoke `seo:seo-geo`** in site mode against the client's full domain.

3. **Capture site-level signals:**
   - Aggregate per-platform AI citability across all known articles
   - Off-site brand mention scores (YouTube, Reddit, Wikipedia, podcast directory presence)
   - Domain Rating (for reference comparison)
   - Crawler accessibility (GPTBot, Google-Extended, ClaudeBot, PerplexityBot)

4. **Persist:**
   - Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/01 - Tech Audit/geo-site-{YYYY-MM-DD}.md`
   - Include: per-platform aggregate scores, off-site signal breakdown, recommended brand-presence work, structural ceiling assessment.

5. **Compare to previous run:** if a prior site-audit exists in the same folder, compute delta (per-platform AI-citation count change, brand-presence signal change). Surface trends.

6. **Return** site report + structural ceiling flag if applicable.

## The structural ceiling concept

When a client has a `geo_breakdown` consistently capping below the level their on-site quality would predict, the cause is almost always **insufficient off-site brand presence**. The skill detects this by comparing on-site quality (article scores aggregate) against AI-citation outcomes (actual citations recorded) — when the gap is significant, the structural ceiling flag fires.

Operators receiving this flag have three options:
1. **Accept the ceiling** — articulate to the client that on-site SEO will plateau at level X, and breaking past requires off-site work outside the suite's scope.
2. **Run the brand-presence skill** — `ccc-seo-brand-presence` (Phase 5+) audits and recommends YouTube / Reddit / Wikipedia / podcast presence work.
3. **Recommend external work** — refer the client to a video / podcast / community-manager partner. CCC scope ends at recommendation; execution is outside.

The methodology is explicit (§6.3): the suite ships the on-site loop and tells clients honestly when on-site alone is insufficient.

## Per-platform optimization observations

The marketplace skill's research: **only 11% domain overlap between ChatGPT and Google AI Overviews**. A site cited by ChatGPT is not necessarily cited by AI Overviews. Different training data, different retrieval mechanisms.

This means:
- Optimizing for "AI" generically loses signal.
- Per-platform scoring exists because per-platform improvements look different.
- Cohort analysis partitions winners by which platform's citations they captured — see methodology §6.2.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6.3 (off-site brand presence), §11.2 (anti-patterns — aggregate AI citation metric).

Marketplace skill source: `seo:seo-geo` (BenAI) — ships brand-mention correlation research data, AI crawler management guidance, platform-specific signal frameworks.

## Anti-patterns

- Do NOT report aggregate "AI citation score" without per-platform breakdown. Always five columns.
- Do NOT skip the structural ceiling flag when off-site signals are weak. Honest expectation-setting is what makes the suite credible.
- Do NOT lower thresholds without per-client cohort evidence.
- Do NOT block YMYL articles on GEO score — that's the E-E-A-T gate's job. GEO is warn-only at any YMYL level.
