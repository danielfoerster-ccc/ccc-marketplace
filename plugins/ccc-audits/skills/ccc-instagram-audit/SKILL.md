---
name: ccc-instagram-audit
description: >
  CCC Instagram Audit Skill. Audits Instagram profiles via Chrome browser
  automation and client context docs (Brand Voice, Client Context). Scores 7
  weighted dimensions and produces a .docx report with scorecard, dimension
  analysis, brand alignment findings, and a 30-day action plan. Full mode
  (Insights access) and Light mode (public profile only) supported.

  USE THIS SKILL when asked to: audit an Instagram account, review Instagram
  presence, check Instagram bio/profile, analyse Instagram engagement, assess
  content strategy, or build an Instagram action plan. Also triggers on:
  "Instagram audit", "IG audit", "check their Instagram", "how is the
  Instagram performing", "Instagram content review", "social media audit",
  "Instagram score", "Instagram report".
---

# CCC Instagram Audit Skill

## Overview

This skill runs a structured Instagram audit across 7 weighted dimensions,
produces a scored report, and generates a prioritised 30-day action plan.

It is designed for agency use: sandboxed Claude Cowork sessions, client
engagements with pre-existing context documents, and delivering professional
client-facing .docx reports.

**Two audit modes:**
- **Full Audit** — requires access to Instagram Insights (account owner logged in via Chrome)
- **Light Audit** — public profile only (default when no account access available)

For a Light Audit, approximately 70% of dimensions are scorable. The remaining
30% (Reach, Saves, Story retention, Audience demographics) require Insights and
are marked as [Insights Required] in the report.

---

## Scoring Framework — 7 Dimensions

| # | Dimension | Weight | What we measure |
|---|-----------|--------|-----------------|
| 1 | Profile & Discoverability | 15% | Bio keyword optimisation, CTA clarity, profile picture, category, link in bio, name field SEO |
| 2 | Visual Identity & Brand Consistency | 20% | Feed aesthetic, colour palette consistency, image quality, caption voice alignment, Highlights covers |
| 3 | Content Strategy & Mix | 20% | Format distribution (Reels/Carousel/Static/Stories), posting frequency, content pillars, caption quality (hook, structure, CTA), hashtag strategy |
| 4 | Engagement & Performance | 25% | Engagement rate vs. benchmark for account size, comment quality (generic vs. substantive), best/worst post analysis, format performance comparison |
| 5 | Audience & Growth | 10% | Follower/Following ratio, follower quality signals, visible growth trajectory, audience alignment with ICP |
| 6 | Stories & Highlights | 10% | Highlights structure and categorisation, cover branding, story posting activity, interactive elements usage |
| 7 | Competitive Context | 10% | 2–3 competitor profiles, benchmark gap, content opportunities |

**2025/2026 Engagement Benchmarks:**

| Account size | Good engagement rate |
|-------------|---------------------|
| Under 10K followers | 4–6% |
| 10K–50K | 2–4% |
| 50K–500K | 1–3% |
| 500K+ | 0.5–1% |

Industry average (all accounts): ~0.50%
Creative studios and niche B2C typically run 3–8x above average.

**Format benchmarks (2025):**
- Carousels: strongest reach stability, best for educational/storytelling content (6–13 slides)
- Reels: best for discovery and new audience reach
- Static images: declining engagement YoY (-17%)
- Algorithm priority: Watch time > DM shares > Likes per reach (NOT follower count)

---

## Phase 0: Context Loading

**Before asking any questions, load available context documents.**

### Step 0.1 — Identify audit type

Ask: "Are we auditing your own channel or a client's channel?"
- **Own channel** → look for foundational docs in the Obsidian vault (see Step 0.2a)
- **Client channel** → look for Client Context doc + Brand Voice doc (see Step 0.2b)

### Step 0.2a — Own Channel: Load Vault Foundational Docs

Look for these files in the workspace (adjust paths to user's vault structure):
- `Foundational/ICP.md` or equivalent → target audience definition
- `Foundational/Positioning.md` → brand positioning, value proposition
- `Foundational/BrandVoice.md` → tone, language DOs/DON'Ts
- `Foundational/ContentPillars.md` → content themes

Note what was found and what's missing. Missing docs = ask in Discovery (Phase 2).

### Step 0.2b — Client Channel: Load Client Context + Brand Voice

Ask the user to provide:
1. **Client Context Document** (Google Drive link, uploaded file, or paste) — business profile, engagement status, known gaps
2. **Brand Voice Document** (Google Drive link, uploaded file, or paste) — tone, language, caption patterns, known contradictions
3. **Website URL** — for visual and messaging alignment check

These three inputs together enable alignment-based scoring for Dimensions 1, 2, and 3.
Without them, scoring is observation-based (still valid, less precise).

⚠️ **Do NOT skip or estimate if context docs are mentioned but not accessible.**
Ask the user to provide them before proceeding. Context docs turn observations
into findings.

### Step 0.3 — Save Context Checkpoint

After loading all available context, save a summary:

```bash
cat > instagram-audit-context.json << 'EOF'
{
  "audit_type": "client|own",
  "client_name": "",
  "instagram_handle": "",
  "audit_mode": "full|light",
  "context_docs_loaded": {
    "client_context": true/false,
    "brand_voice": true/false,
    "website_url": ""
  },
  "known_issues_from_docs": [],
  "target_audience": "",
  "brand_positioning": ""
}
EOF
```

---

## Phase 1: Pre-Audit Setup

### Step 1.1 — Confirm Instagram Handle

Verify the handle from context docs or ask the user.
Note: there may be multiple accounts with similar names — confirm the correct one.

### Step 1.2 — Confirm Audit Mode

- **Full Audit:** User will navigate to Instagram while logged into the account.
  Insights data (reach, saves, story views, audience demographics) will be accessible.
- **Light Audit:** Public profile only. State clearly at the start of the report:
  *"This is a Light Audit based on publicly visible data. Dimensions marked [Insights Required]
  would benefit from Instagram Insights data for complete scoring."*

### Step 1.3 — Browser Check

Open Chrome and navigate to `https://www.instagram.com/[handle]`

```
⚠️ Instagram is heavily JS-rendered. Allow 3–5 seconds for the page to load
before reading content. If prompted to log in, the audit proceeds in Light mode
unless the user logs in.
```

---

## Phase 2: Discovery Questions

**Only ask what context docs haven't already answered.**

If Client Context + Brand Voice docs are loaded, most of these are already known.
Skip questions where the answer is clear from docs.

1. **Primary goal for Instagram** — What should this account achieve? (Awareness / Bookings / Community / Brand authority)
2. **Target audience** — Who is the ideal follower/customer? (Age, gender, interest, location)
3. **Current satisfaction** — What does the client think is working? What isn't?
4. **Posting frequency** — How often are they currently posting? (If not visible from profile)
5. **Platform access** — Are we doing a Full or Light audit? (Confirms Step 1.2)
6. **Primary language** — German, English, bilingual? This affects caption analysis and hashtag evaluation.

---

## Phase 3: Data Collection via Chrome

Navigate systematically through the profile. Capture all observable data.

### Step 3.1 — Profile Header

Record:
- Full name field (is it keyword-optimised or just brand name?)
- Bio text (full text, emoji usage, keyword presence, CTA clarity)
- Link in bio (destination, tool used — Linktree / native / beacons.ai)
- Follower count, Following count, Post count
- Profile picture (quality, brand-aligned, recognisable at small size)
- Category label (if visible)
- Contact button / action button (type, destination)
- Verified badge (yes/no)

### Step 3.2 — Feed Grid (First Impression)

Before scrolling: screenshot the top 9 posts.

Evaluate:
- Overall aesthetic: coherent or chaotic? colour temperature consistent?
- Format mix visible: any Reels thumbnails? Carousel indicators?
- Production quality: professional/editorial vs. phone snapshots
- Does it look like the website? (visual alignment check — use website URL from context)

### Step 3.3 — Last 12 Posts (Deep Dive)

For each of the last 12 posts, record:
- Format (Reel / Carousel / Static)
- Approximate like count (if visible)
- Comment count
- First line of caption (hook quality)
- Notable comments (any substantive engagement?)
- Post topic / content pillar

Then calculate:
- **Separate engagement rates for collab vs. own content** — this is critical.
  Collab posts reach the collab partner's audience and will almost always outperform
  own-content posts. Mixing them gives a misleading average. Calculate both:
  - `ER_collab = avg likes (collab posts) / followers × 100`
  - `ER_own = avg likes (own posts) / followers × 100`
  - Note the gap ratio (e.g. "3× better" or "6× better") — this is a key finding
- Format breakdown: % Reels / % Carousel / % Static
- **Format performance per type:** check if the same piece of content was posted as
  both Reel and Carousel for the same customer/subject. If so, compare engagement
  directly — this reveals the format preference of this account's specific audience.
- Caption formula: does it follow the brand's documented pattern? (if Brand Voice doc loaded)
- Hashtag count per post (average) — and flag if pinned/older posts have dramatically
  more hashtags than recent posts (inconsistency signal)
- **Posting cadence estimate:** `posts_count / months_active ÷ 4` = posts per week.
  Estimate months active from oldest visible post date if account age is unknown.

⚠️ **If like counts are hidden:** Note this explicitly. Estimate engagement rate
from comments only, flag as [Estimated] in the report.

### Step 3.4 — Highlights

Record:
- Number of Highlights
- Names/labels (are they descriptive and strategic?)
- Cover design (branded/consistent? or default screenshot thumbnails?)
- Open top 2–3 Highlights and note content quality and recency

### Step 3.5 — Reels Tab (if present)

Navigate to Reels tab. Click into individual Reels to check engagement.

Record:
- **Like counts** per Reel (visible by clicking into the post — desktop web shows likes)
- **Comment counts** and comment quality
- Hook quality (first frame visible in thumbnail)
- Any notable Reels performing significantly above/below average

⚠️ **View count limitation:** Instagram Reel view counts are NOT visible on the
desktop web browser in the Reels grid. They are only accessible via the Instagram
mobile app or Instagram Insights. If view counts matter, flag as [Insights Required].
Do not state "view counts not available" as an error — it is a known Light mode
limitation. Document like counts and comment quality instead.

### Step 3.6 — Bio & Positioning Alignment Check

**Only if Brand Voice / Client Context docs are loaded:**

Compare bio text against:
- Known brand positioning (does bio reflect the core value proposition?)
- Documented language rules (any DON'T words used in bio?)
- Known contradictions (flag "Fotobox" type issues if present in docs)

### Step 3.7 — Competitive Context (2–3 Profiles)

Navigate to 2–3 competitor profiles identified from:
- Client Context doc (if available) — use documented competitors
- Manual search for same niche if not documented

**Searching for competitors:**
- Try direct handle navigation first: `instagram.com/[handle]`
- If handles from context docs return "Seite nicht verfügbar" (page not found), try
  alternative handle formats (dots, underscores, without city suffix)
- Use the Instagram **in-app search bar** (not URL-based keyword search — this does not
  work reliably on desktop). Click the search icon → type the studio/brand name.
- If Instagram search finds no results: also try searching in German if the client is
  German-speaking (e.g. "Fotostudio Berlin" vs "photo studio berlin")

**If no direct competitors are found on Instagram:**
This is a significant finding in itself — document it as a **first-mover opportunity**
rather than a data gap. Score Dimension 7 at 75–85 and include in the report:
*"No Instagram-active direct competitors were found for [niche] in [city]. This means
[client] can become the category-defining account for this concept on Instagram."*
Do NOT leave this dimension unscored or score it low because no competitors exist.

For each competitor found, record:
- Follower count
- Posting frequency estimate
- Format mix
- Engagement rate on last post
- One notable content strength

---

## Phase 3b: Data Checkpoint

**Before analysis or report generation, save all collected data to disk.**

```bash
cat > instagram-audit-data.json << 'EOF'
{
  "profile": {
    "handle": "",
    "name_field": "",
    "bio": "",
    "link_in_bio": "",
    "followers": 0,
    "following": 0,
    "post_count": 0,
    "profile_pic_quality": "",
    "category": "",
    "verified": false
  },
  "feed_analysis": {
    "aesthetic_score_notes": "",
    "format_breakdown": {"reels_pct": 0, "carousel_pct": 0, "static_pct": 0},
    "avg_engagement_rate": 0,
    "best_performing_post": "",
    "worst_performing_post": "",
    "caption_formula_followed": true/false
  },
  "highlights": {
    "count": 0,
    "names": [],
    "covers_branded": true/false
  },
  "competitors": [],
  "brand_alignment_issues": [],
  "insights_available": false,
  "audit_date": ""
}
EOF
```

This checkpoint enables session resumption if context limits are reached.

---

## Phase 4: Analysis & Scoring

Score each dimension 0–100. Multiply by weight. Sum for overall score.

### Scoring Guide

**Dimension 1 — Profile & Discoverability (15%)**
- 80–100: Bio has keyword, clear value prop, strong CTA, optimised name field, working link
- 60–79: Most elements present, minor gaps
- 40–59: Bio unclear, CTA weak, link absent or broken
- 0–39: Bio generic or misleading, no CTA, no keyword optimisation

**Known traps:**
- **Name field SEO:** Instagram's name field is searchable — it is separate from the handle.
  A handle like `@monochrome.me.studio` is not searchable, but a name field like
  `"Selbstporträt Studio Berlin"` is. Always check whether the name field is a pure
  brand name (wasted) or a keyword phrase (good). This is an easy 5-minute quick win.
- **Positioning contradiction in bio:** If brand docs document an explicit decision against
  a term (e.g. "we are NOT a Fotobox") and the bio still uses that term — flag this as
  Priority 1, even above Highlights gaps. It undermines the entire brand positioning on
  the most-viewed piece of text on the profile.
- **Zero Highlights for service businesses:** If a service/studio business has zero
  Highlights, this is a Critical finding (not just an Average-range gap). Highlights are
  conversion infrastructure for first-time profile visitors. Without them, visitors must
  scroll to understand what the service is, how it works, and how to book — most won't.
  Score Dimension 6 at maximum 15/100 if Highlights count = 0 for a service business.

**Dimension 2 — Visual Identity & Brand Consistency (20%)**
- 80–100: Feed looks like the website, clear visual language, consistent palette, high production quality
- 60–79: Mostly consistent with occasional outliers
- 40–59: Inconsistent aesthetic, mixed quality, doesn't clearly reflect brand
- 0–39: No visual coherence

**If Brand Voice doc loaded:** Cross-reference caption tone against documented patterns.
Flag any captions that use DON'T words or break brand voice.

**Dimension 3 — Content Strategy & Mix (20%)**
- 80–100: Clear content pillars, varied formats (Reels + Carousel + Static), consistent posting frequency, strong caption hooks, strategic hashtags
- 60–79: Some pillars visible, mostly one format, decent frequency
- 40–59: Random content, single format, irregular posting, weak hooks
- 0–39: No visible strategy, very irregular posting

**Dimension 4 — Engagement & Performance (25%)**
- **Always split collab vs. own-content engagement rates** before scoring (see Phase 3.3).
  Use the own-content ER as the baseline benchmark comparison. Collab posts inflate the
  average and can mask critically underperforming organic content.
- Compare own-content ER against benchmark for account size (see table above)
- Excellent: 2× benchmark or above
- Good: At benchmark
- Below average: 50–100% of benchmark
- Poor: Below 50% of benchmark
- **Format performance gap:** If the same collab/customer appeared as both Reel and Carousel
  format, document the performance gap explicitly. This is more actionable than generic
  "carousels perform well" advice.
- Also assess comment quality: generic ("❤️", "So schön!") vs. substantive (story responses, questions, sharing)
- **High collab ER with low own-content ER** = Systematic opportunity: the account has
  proof of strong resonance when it borrows an established audience, but hasn't built its
  own organic draw. Action: convert the top-performing collab content formula into a
  repeatable own-content template.

**Dimension 5 — Audience & Growth (10%)**
- Following/Follower ratio: under 0.3 = healthy; 0.3–0.7 = acceptable; above 1.0 = signal of low organic draw
- Commenter quality: are comments from accounts that look like real customers?
- Follower trajectory: growing, static, or shrinking? (Estimate from post frequency + engagement trends)

**Dimension 6 — Stories & Highlights (10%)**
- Are Highlights organised for a first-time visitor? (think: FAQ, How it works, Portfolio, Reviews)
- Are covers branded or default screenshots?
- Evidence of recent Story activity?

**Dimension 7 — Competitive Context (10%)**
- Is the account ahead of, at, or behind direct competitors on: follower count, engagement rate, content quality, posting frequency?
- Are there obvious content gaps competitors are filling that this account isn't?

### Score Interpretation

| Score | Label | Implication |
|-------|-------|-------------|
| 80–100 | Excellent 🟢 | Best-in-class for account size/stage |
| 65–79 | Good 🟡 | Solid foundation, targeted improvements needed |
| 50–64 | Average 🟠 | Clear gaps, structured improvement plan needed |
| 35–49 | Below Average 🔴 | Significant underperformance, overhaul required |
| 0–34 | Poor ⛔ | Fundamental problems, rebuild strategy needed |

---

## Phase 5: Report Generation

Generate a professional .docx report using the docx skill pattern.

### Report Structure

**Cover Page**
- Client name + handle
- Audit date
- Prepared by: Claude Cowork Consultants (CCC)
- Audit mode: Full / Light

**Section 1: Executive Summary**
- Overall score (0–100) with label
- Top 3 strengths
- Top 3 critical gaps
- One-paragraph business context (from Client Context doc if available)
- If Light Audit: explicit statement about what Insights would add

**Section 2: Dimension Scorecard**
- Table: Dimension | Score | Weight | Weighted Score | Label
- Visual bar or emoji indicators per dimension
- Total weighted score

**Section 3: Dimension Analysis**
One sub-section per dimension with:
- Score and label
- 2–4 specific observations (with evidence: post examples, bio text quoted)
- Brand alignment note (if context docs loaded — what's aligned vs. off)
- 1–2 quick wins

**Section 4: Brand Alignment Findings**
*Only included when Brand Voice / Client Context docs are loaded.*
- Known contradictions surfaced (bio vs. positioning docs)
- Caption voice: aligned vs. off-brand examples
- Language audit: DOs present / DON'Ts found

**Section 5: 30-Day Action Plan**

Three phases:

*Week 1–2: Quick Wins (< 2 hours each)*
- Profile fixes (bio, name field, link in bio, category)
- Highlight cover redesign
- Tag each item with source: [Brand Alignment] / [Content] / [Engagement] / [Technical]

*Weeks 3–4: Content Structure*
- Define/confirm content pillars
- Format mix adjustment
- Caption template roll-out (if Brand Voice doc available)
- Hashtag set refresh

*Month 2+: Growth Levers*
- Competitor gap actions
- Reels strategy (if underutilised)
- Insights-dependent improvements (flagged as [Requires Account Access])

**Section 6: [Insights Required] — Upgrade Path**
*Only included in Light Audit.*
- List what data points are missing and what they would reveal
- How to collect them (account owner screenshots / Insights export)
- Impact on action plan if collected

**Appendix**
- Raw data table (last 12 posts with format, engagement, topic)
- Competitor benchmark table
- Methodology note

---

## Troubleshooting

### Instagram Not Loading in Chrome
- Wait 5–10 seconds for JS rendering
- Try scrolling once to trigger lazy loading
- If login wall appears: confirm with user whether to log in or proceed in Light mode

### Like Counts Hidden
- Instagram allows accounts to hide like counts
- Use comment counts only for engagement rate (note as [Estimated])
- ⚠️ Reel view counts are NOT visible on desktop web (grid or individual Reel view)
  — they require the Instagram mobile app or Insights access. Do not flag this as
  an error. Note as [Insights Required] and use like+comment data instead.

### Profile Not Found
- Confirm handle spelling with user
- Search Instagram directly (sometimes handles have periods, underscores)
- Check for multiple similar accounts (e.g. @monochrome.me.studio vs @monochromberlin)

### Brand Voice Doc Has Contradictions
- Document them as findings, do not resolve them in the audit
- State: "This contradiction was present in the brand documentation before this audit. It needs a decision from [client name] before implementing any bio changes."
- Do NOT pick a side — surface the decision, don't make it

### Context Docs Not Available
- Proceed with observation-based scoring
- Note at the top of the report: "This audit is observation-based. A brand voice document and client context document would upgrade alignment scoring for Dimensions 1, 2, and 3."

---

## Related Skills

| Skill | When to use |
|-------|-------------|
| `docx` | Required for report generation (Phase 5) |
| `ccc-seo-audit` | If Instagram audit reveals SEO gaps on the linked website |
| `gmb-audit` | Run alongside Instagram for a full local presence audit |
| `ccc-sop-creator` | If a repeatable Instagram content process needs to be documented post-audit |

---

## Real-World Learnings Log

Improvements discovered during actual client audits. Applied to the skill immediately after each run.

### Audit 1 — monochrome.me (@monochrome.me.studio), March 2026 — Light Audit

| # | Learning | Problem | Fix Applied |
|---|----------|---------|-------------|
| 1 | Reel view counts not available on desktop web | Skill stated "view counts publicly visible on Reels" — this is only true in the mobile app / Insights | Updated Step 3.5: clarify view counts require app/Insights; use likes+comments on desktop |
| 2 | Competitor handles from context docs may not exist on Instagram | Both documented competitors had zero Instagram presence — skill had no guidance for this | Updated Step 3.7: added fallback search flow + "no competitors found = first-mover finding" scoring rule |
| 3 | Collab vs. own content ER must be split | Averaging collab posts with own content masked critically low own-content ER (2.9% vs 13.9% collab) | Added to Step 3.3 and Dimension 4 scoring: always separate ER by content type |
| 4 | Format performance gap needs same-subject comparison | Katharinapk: 209 likes as carousel, 29 likes as Reel for identical story — this is the clearest format signal possible | Added to Step 3.3: flag when same content appears in multiple formats and compare directly |
| 5 | Zero Highlights = Critical (not just Average) for service businesses | Skill scoring didn't distinguish between "few Highlights" and "zero Highlights" | Updated Dimension 1 known traps: score ≤15/100 if Highlights count = 0 for a service business |
| 6 | Instagram in-app search beats URL-based keyword search | URL keyword search returned zero results; in-app search bar works correctly | Updated Step 3.7: use in-app search bar, not URL-based approach |
| 7 | Name field SEO is a 5-minute quick win that's easy to miss | Handle was not keyword-optimised; name field was pure brand name | Strengthened Dimension 1 known traps: explicitly describe the name field tactic and its impact |
| 8 | Posting cadence formula not in skill | Skill didn't include how to estimate cadence from profile data | Added formula to Step 3.3: `posts / months_active ÷ 4 = posts/week` |

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| v1.0 | March 2026 | Initial skill — framework built, first run: monochrome.me (Light Audit) |
| v1.1 | March 2026 | 8 improvements from monochrome.me audit — see Learnings Log above |

---

*Daniel Förster & Heiko Lube | Claude Cowork Consultants (CCC)*
*claudecoworkconsultants.com*
