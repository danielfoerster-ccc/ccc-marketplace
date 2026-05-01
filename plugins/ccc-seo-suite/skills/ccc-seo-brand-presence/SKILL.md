---
name: ccc-seo-brand-presence
description: |
  Off-site brand-presence audit + recommendations. Audits a client's mention footprint across YouTube, Reddit, Wikipedia, podcast directories. Scores off-site signal strength per channel. Correlates findings with the client's per-platform AI-citation performance (from `ccc-seo-tools-geo`). When the structural ceiling on AI-citation visibility is detected (on-site quality high but per-platform AI citations capped low), this skill identifies WHICH off-site surfaces would unlock the ceiling. Outputs a prioritised brand-presence work queue. Does NOT produce video / podcast / article content — audits + recommends only. Per `seo:seo-geo` research data, brand mentions on these surfaces correlate 3× more strongly with AI-citation visibility than backlinks (YouTube 0.737 vs. Domain Rating 0.266).
  Use this skill when an operator says "brand presence audit", "off-site audit", "AI citation ceiling", "where to invest off-site", "YouTube / Reddit / Wikipedia presence", or when `ccc-seo-quarterly-review` flags `brand_presence_ceiling: true` for a client and the operator wants follow-up recommendations. Phase 5+ scope.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: audit-and-recommend
  ccc_role: off-site-loop
distribution: ccc-internal
---

# ccc-seo-brand-presence — Off-site Brand-Presence Audit

**Workflow: Audit each off-site surface → score signal strength → correlate with per-platform AI citations → identify ceiling-breaking opportunities → prioritised recommendations.**

## What this is

The off-site half of Loop 3 in the methodology (§6.3). On-site SEO has a ceiling that on-site work alone can't break — the ceiling is structural, set by off-site brand presence. AI systems (ChatGPT, Perplexity, Google AI Overviews, Gemini, Copilot) weight brand mentions on YouTube / Reddit / Wikipedia / podcast directories 3× more strongly than backlinks for citation visibility.

This skill audits where the client currently shows up off-site, where they don't, and which absences are causing the AI-citation ceiling. It does NOT produce video or podcast or community content — that's outside CCC's scope. It tells the operator (and the client) WHERE off-site work would unlock measurable AI-citation gains, and how much gain is plausible.

## When to use

- Quarterly: invoked by `ccc-seo-quarterly-review` when site-level GEO audit flags `brand_presence_ceiling: true`.
- Engagement-start (rare): for clients arriving with explicit AI-citation goals, run during onboarding to baseline.
- Manual: operator wants ad-hoc off-site assessment.
- Strategy refresh trigger: when quarterly review surfaces persistent AI-citation ceiling, this audit's recommendations feed `ccc-seo-strategy-session` refresh decisions.

## Inputs

- `client` (required) — wikilink.
- `surfaces` (optional, default `all`) — `all` or subset (e.g., `[youtube, reddit, wikipedia]`).
- `competitor_benchmark` (optional, default true) — compare client's signal strength against top 3 competitors (from `_planning/competitors-*.md`).

## Procedure

### Step 1 — Load context

Read:
- `00 - Strategy.md` — client business name, focus, languages, locations.
- `_planning/competitors-*.md` (most recent) — competitor set for benchmarking.
- Latest `01 - Tech Audit/geo-site-*.md` — most recent site-level GEO audit (for per-platform AI-citation baseline).
- `06 - Articles/` aggregate `ai_citations` data (per-platform totals across articles).

### Step 2 — Audit each off-site surface

#### YouTube (highest correlation: 0.737)
- Search for client brand name + variants on YouTube via Tavily.
- Capture: own channel exists? subscriber count? video count? upload cadence?
- Capture: third-party videos mentioning the brand (interviews, reviews, mentions).
- Score: own channel quality + third-party mention frequency.

#### Reddit (strong correlation)
- Search for brand name on Reddit via Tavily.
- Capture: official subreddit (if any), brand mentions in relevant subreddits, AMA history, Reddit-active employees.
- Score: organic mention volume + sentiment + mention frequency in topical subreddits.

#### Wikipedia (strong correlation)
- Direct check: does the brand have a Wikipedia entry?
- If yes: capture page authority, citations to/from, last edit date, edit-war flags.
- If no: identify whether the brand is notable enough for Wikipedia (typical thresholds — €5M+ revenue, multiple notable mentions in independent sources).
- Score: presence + entry quality.

#### Podcast directories
- Search for brand on Spotify / Apple Podcasts / Google Podcasts via Tavily.
- Capture: own podcast (if any) — listener count, episode count, cadence; appearances on other podcasts (guest interviews).
- Score: own podcast + appearance footprint.

#### Other (LinkedIn, Twitter/X, Quora, Stack Exchange, GitHub for tech brands)
- Lower correlation than the top 4 but still relevant.
- Capture mentions + activity level. Lower weight in scoring.

### Step 3 — Per-platform AI-citation correlation

Read the article-aggregate `ai_citations` per-platform data:
- ChatGPT citations: low / medium / high
- AI Overviews citations: low / medium / high
- Perplexity citations: low / medium / high
- Gemini citations: low / medium / high
- Copilot citations: low / medium / high

Cross-reference with off-site signal strength to identify gaps:
- ChatGPT citations LOW + Reddit signal LOW → "Reddit work would likely lift ChatGPT citations specifically — Reddit is one of ChatGPT's strongest training surfaces."
- AI Overviews citations LOW + Wikipedia presence MISSING → "Wikipedia entry would lift AI Overviews citations — AI Overviews weights Wikipedia heavily."
- Perplexity citations LOW + YouTube weak → "Perplexity weights video transcripts heavily; YouTube series would lift Perplexity citations."
- Gemini citations LOW + Reddit + Quora weak → "Gemini weights conversational sources; Reddit + Quora work would help."
- Copilot citations LOW + LinkedIn weak → "Copilot weights professional/business sources; LinkedIn presence would help."

These correlations are heuristic — `seo:seo-geo` research data establishes the patterns, but per-client variation exists.

### Step 4 — Competitor benchmark (if enabled)

For each top 3 competitor:
- Audit the same surfaces.
- Compute relative signal strength.
- Identify where competitors are present and the client isn't (gap to close) AND where the client is present and competitors aren't (defensible advantage to widen).

### Step 5 — Build the recommendation queue

Categorise recommendations into tiers by ROI:

**Tier 1 — Highest ROI / Lowest effort:**
- Wikipedia entry creation/expansion (if notable but missing or thin).
- Existing-podcast guest pitching (the client has expertise; they should be on relevant podcasts).
- Reddit AMA scheduling (one-shot high-leverage event).

**Tier 2 — Medium ROI / Medium effort:**
- YouTube series launch (ongoing — significant time investment).
- Subreddit moderation / posting cadence.
- Quora answer programme.

**Tier 3 — Higher effort / Longer payoff:**
- Own podcast launch.
- LinkedIn newsletter (relevant for B2B clients specifically).
- Conference/event speaking (not typically tracked by AI systems but lifts adjacent surfaces).

**Tier 4 — Defensive / Maintenance:**
- Wikipedia entry maintenance (preventing edit-war degradation).
- Existing YouTube SEO optimization (titles, descriptions, transcripts).

For each recommendation, output:
- Surface (which off-site channel).
- Action (specific work).
- Expected impact (which AI platform's citations should lift, and roughly how much).
- Effort estimate (hours / weeks / ongoing).
- Dependency (operator-led, partner-led, client-led).

### Step 6 — Generate report

Path: `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/_reports/brand-presence/{YYYY-MM-DD}.docx`

Sections:
1. **Executive summary** — overall off-site presence score + structural ceiling assessment.
2. **Per-surface audit** — own presence + third-party mentions + competitor benchmark.
3. **Per-platform AI-citation correlation** — which platforms' citations the off-site surfaces are likely capping.
4. **Recommendation queue** — Tier 1-4 prioritised.
5. **Expected impact** — if Tier 1-2 implemented, what AI-citation lift to model.
6. **Out of scope** — what CCC won't do (produce video / podcast / Reddit content). Operator + client decide whether to engage external partners.

### Step 7 — Return

```yaml
status: complete
client: "[[Client]]"
overall_off_site_score: 42  # /100
structural_ceiling_confirmed: true | false
per_surface_scores:
  youtube: 28
  reddit: 51
  wikipedia: 0   # missing
  podcasts: 35
  other: 60
ai_citation_correlations:
  - { platform: chatgpt, status: capped, likely_cause: "Reddit signal weak" }
  - { platform: ai_overviews, status: capped, likely_cause: "Wikipedia missing" }
  - ...
recommendation_count_by_tier:
  tier_1: 4
  tier_2: 5
  tier_3: 3
  tier_4: 2
top_3_recommendations:
  - "Wikipedia entry creation (Tier 1, ~8h, expected +20% AI Overviews citations within 60d)"
  - "Reddit AMA in r/{topic} (Tier 1, ~4h prep + 3h event, expected +15% ChatGPT citations within 30d)"
  - "Podcast guest pitching to top 5 industry podcasts (Tier 1, ~10h, expected +10% Perplexity citations within 90d)"
report_path: "_reports/brand-presence/2026-04-30.docx"
recommended_next: "Operator + client decide which Tier 1 items to engage; CCC can scope external-partner engagement if needed (production work outside CCC scope)"
```

## What this skill does NOT do

- Produce video content, podcast episodes, Reddit posts, Wikipedia articles, LinkedIn newsletters. **CCC scope is on-site SEO + measurement + recommendation.** Production of off-site brand assets is operator-led, client-led, or external-partner-led.
- Auto-execute Wikipedia edits or Reddit posts. Brand-presence work in these surfaces requires careful, attributable, ongoing engagement that CCC's AI-mediated workflow isn't appropriate for.
- Replace human judgment on Wikipedia notability thresholds or Reddit subreddit fit. Surfaces recommendations; humans decide engagement.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §6.3 (off-site brand presence as Loop 3 — the hidden ceiling on AI-citation visibility).

Marketplace skill source: `seo:seo-geo` (BenAI) — research data establishes the per-platform / per-surface correlation matrix this skill uses.

## Anti-patterns

- Do NOT auto-execute off-site work. Surfaces, correlates, recommends. Doesn't produce.
- Do NOT promise specific AI-citation lifts deterministically. Correlations are heuristic; surface "expected" with acknowledged uncertainty.
- Do NOT recommend Wikipedia entries for non-notable brands. Wikipedia editors will reject and the brand may be flagged. Notability check first.
- Do NOT skip competitor benchmark when competitor data is available. The relative gap matters more than absolute score.
- Do NOT confuse own-channel presence with third-party mention volume. Both matter; they correlate with different AI platforms differently.
- Do NOT treat "AI citations" as a single aggregate metric — always per-platform per the methodology.
