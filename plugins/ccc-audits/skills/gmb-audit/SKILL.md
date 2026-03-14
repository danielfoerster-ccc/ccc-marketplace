---
name: gmb-audit
description: >
  Runs a live Google My Business (GMB) / Google Business Profile audit via Chrome browser automation.
  Scores the profile across 7 weighted dimensions, benchmarks against top local competitors,
  and produces a professional .docx report with an overall health score, Quick Wins, and a 30-day action plan.

  USE THIS SKILL for: "GMB audit", "Google Business Profile audit", "GBP audit", "audit my Google listing",
  "check our Google Maps presence", "optimize our GMB", "why aren't we showing up on Google Maps",
  "local SEO audit", "improve our local visibility", or any request to analyze a business's Google Maps presence.
  Also trigger on: "how do we look on Google", "check our reviews", "Google rating analysis",
  "local search ranking", "profile completeness", "GMB optimization", or "GBP health check".

allowed-tools: Read, Write, Bash, WebSearch, WebFetch, mcp__Claude_in_Chrome__tabs_context_mcp, mcp__Claude_in_Chrome__navigate, mcp__Claude_in_Chrome__computer, mcp__Claude_in_Chrome__find, mcp__Claude_in_Chrome__read_page, mcp__Claude_in_Chrome__get_page_text, mcp__Claude_in_Chrome__javascript_tool
---

# GMB Audit Skill

**Workflow: Scrape → Score → Benchmark → Report.**
Navigate live Google Maps via Chrome automation, extract all public GMB data, score 7 dimensions against a scoring rubric, benchmark against the top 3–5 local competitors, then generate a professional .docx audit report.

---

## On Skill Load — Immediate Actions

1. **Verify Chrome is connected FIRST** — call `tabs_context_mcp`. If it returns no tabs or an error:
   - Tell the user: "Chrome needs to be connected for a live GMB audit. Please make sure the Claude Chrome extension is running and showing 'Connected'."
   - **Do NOT fall back to web search silently.** Web search cannot verify live GMB profile data. An audit built on web search estimates will have wrong scores and miss critical missing fields.
   - Wait for user confirmation that Chrome is connected before proceeding.
2. Confirm the target business: name, city, and (optionally) their Google Maps URL
3. Ask whether to include a competitor benchmark (yes by default)

Then proceed with the audit — no further questions needed.

---

## Phase 1: Find the Business on Google Maps

Search Google Maps for the business. If user provided a Google Maps URL, navigate directly. Otherwise:

```
Navigate to: https://www.google.com/maps/search/<business name> <city>
```

Wait 2–3 seconds for the map to load. Take a screenshot to confirm you found the right listing. If multiple results appear, pick the one that matches name + address.

---

## Phase 2: Extract GMB Data

For each data point below, navigate within the Google Maps listing and extract the value. If a field is absent, note it as "Not set" — missing fields are scored differently from zero.

**Start with `get_page_text()`** — call this first on the listing page before anything else. The raw page text delivers rating, review count, categories, phone, website, hours, photo categories, review keywords, and visible reviews in a single pass. It's significantly faster and more reliable than clicking individual tabs or using JS extraction. Most of the checklist below can be filled from this one call.

**Tabs visible = instant completeness signal.** Before reading individual sections, note which tabs appear in the listing header (e.g., Übersicht, Rezensionen, Info, Produkte, Aktuelles). If only "Übersicht" and "Rezensionen" appear — with no Info, no Produkte, no Aktuelles — that's a hard confirmation the business has no description, no posts, and no products/services listed. Mark all three as "Not set" immediately; no need to click further.

**"Fehlende Informationen hinzufügen" = confirmed missing fields.** If Google renders this box in the listing (visible after scrolling), it lists exactly what's absent — e.g., "Öffnungszeiten hinzufügen" or "Telefonnummer hinzufügen". These are authoritative missing-field signals straight from Google. Note each one explicitly.

### Profile Data Checklist

| Field | Where to find it |
|-------|-----------------|
| Business name | Listing header |
| Primary category | Below name |
| Secondary categories | "About" tab |
| Description | "About" tab |
| Hours (regular) | "Hours" section |
| Special/holiday hours | "Hours" section |
| Phone number | Contact section |
| Website URL | Contact section |
| Address | Contact section |
| Booking/reservation link | Action buttons |
| Message/Chat enabled | Action buttons |
| Attributes (accessibility, payments, etc.) | "About" tab |
| Products or Services listed | "Products" / "Services" tab |
| Q&A: questions count + answered/unanswered | "Q&A" tab |
| Posts: count + most recent date | "Updates" tab |
| Post types (offer, event, update) | "Updates" tab |
| Photos: total count | "Photos" tab — **note: the total count is not shown in the listing overview.** Estimate from the number of visible category thumbnails in the "Fotos und Videos" section (each category implies several photos). If you need a more precise count, scroll through the photo grid and count visible items. Always note it as "~X photos (estimated)". |
| Photos: cover photo present | Header |
| Photos: logo present | "Photos" tab |
| Photos: most recent date | "Photos" tab |
| Reviews: average rating | Listing header |
| Reviews: total count | Listing header |
| Reviews: owner response count (sample last 10) | "Reviews" tab |
| Reviews: most recent date | "Reviews" tab |
| Reviews: keyword mentions (what do people praise?) | "Reviews" tab |

### NAP Consistency Check

Compare Name / Address / Phone on the GMB listing against the business website. Note any discrepancies.

---

## Phase 3: Competitor Benchmark

Search Google Maps for the top competitors (same category, same city). Target 3–5 businesses.

**Shortcut: "Wird auch oft gesucht"** — scroll to the bottom of any GMB listing page and Google surfaces a section of directly related businesses. This is the fastest way to identify genuine direct competitors without a separate search. Use these as your primary benchmark set, then supplement with a cold Maps search if needed.

For each competitor, extract:
- Business name
- Average rating
- Total review count
- Photos count (approximate from the listing)
- Response to reviews: yes/no (check 1–2 reviews)
- Posts: has recent posts yes/no

Present findings in a benchmark table. This context will inform the competitive scoring section of the report.

---

## Phase 4: Score Each Dimension

Score each of the 7 dimensions on a 0–100 scale. Apply the rubric in `references/scoring-rubric.md`.

| # | Dimension | Max Score | Weight |
|---|-----------|-----------|--------|
| 1 | Profile Completeness | 100 | 20% |
| 2 | Visual Content (Photos) | 100 | 15% |
| 3 | Reviews & Reputation | 100 | 25% |
| 4 | Posts & Engagement | 100 | 10% |
| 5 | Q&A & Community | 100 | 5% |
| 6 | Local SEO Signals | 100 | 15% |
| 7 | Features & Conversion | 100 | 10% |

**Overall Health Score** = weighted average across all 7 dimensions.

Color coding:
- 🟢 **80–100** — Healthy. Maintain and optimize.
- 🟡 **60–79** — Needs attention. Clear opportunities.
- 🔴 **0–59** — Critical. Prioritize immediately.

---

## Phase 5: Generate Report

Read the docx skill at `/sessions/wizardly-upbeat-bardeen/mnt/.skills/skills/docx/SKILL.md` before generating the report.

The report is a professional `.docx` file. Follow the structure below exactly.

### Report Structure

```
COVER PAGE
  Business Name — Google My Business Audit
  Prepared by: [Consultant Name]
  Date: [Today's Date]

1. EXECUTIVE SUMMARY
   - Overall Health Score (large, color-coded)
   - 3-sentence summary of the most important findings
   - Top 3 Quick Wins (can be done today, free)

2. AUDIT DIMENSIONS SCORECARD
   Table: Dimension | Score | Status | Key Finding
   (All 7 dimensions, color-coded by score)

3. DIMENSION-BY-DIMENSION ANALYSIS
   For each of the 7 dimensions:
   - Score bar (e.g., "Profile Completeness: 62/100 🟡")
   - What we found (bullet list of observed facts)
   - What's missing or suboptimal
   - Recommended actions (specific, actionable)

4. COMPETITIVE BENCHMARK
   Table: Competitor | Rating | Reviews | Photos | Posts
   (Include target business in first row, highlighted)
   Brief analysis: where you're ahead, where you're behind

5. 30-DAY ACTION PLAN
   Quick Wins (0–7 days, free, high impact)
   Short-term actions (8–30 days, may require content creation)
   Ongoing habits (monthly cadence)

6. APPENDIX
   - Raw data extracted from the profile (for client reference)
   - Screenshot references (note where screenshots were taken)
```

Save the report to the workspace as:
`GMB-Audit-[BusinessName]-[Date].docx`

---

## Rules (Update This Section When Things Go Wrong)

0. **Verify Chrome is connected before starting.** If `tabs_context_mcp` returns no tabs, stop and tell the user to connect Chrome. Do NOT fall back to web search — a web-search-only audit will have estimated scores and wrong missing-field detection. A bad audit is worse than no audit.

1. **Always use Chrome for live data — never rely on knowledge alone.** GMB profiles change constantly. A profile you know from training may be completely different today. Only scraped live data is valid.

2. **Google Maps navigation requires patience.** Wait 2–3 seconds after each page load or tab click. Elements load asynchronously. Take a screenshot before trying to find elements.

3. **"Not set" is different from "0".** A missing phone number (field absent) is more critical than a phone number that's incorrect. Note the distinction explicitly.

4. **Score conservatively when uncertain.** If you can't verify a data point (e.g., number of photos is hard to count exactly), use the visible number or estimate low, and note the uncertainty.

5. **The benchmark is comparative, not absolute.** A score of 65/100 might be industry-leading if competitors average 40. Always contextualize scores against competitors found.

6. **Respect the report structure.** Clients (and consultants presenting to clients) need a consistent format. Don't invent new sections or skip sections.

7. **Quick Wins must be genuinely free and fast.** Don't list "run Google Ads" as a Quick Win. Quick Wins = adding missing info, responding to reviews, adding a post, etc.

8. **NAP consistency check is non-negotiable.** Even if the rest of the profile looks great, conflicting NAP across web properties hurts local SEO. Always do this check.

9. **`get_page_text()` first, always.** Run it as the very first extraction call on any listing page. It returns the full visible text — rating, reviews, categories, hours, contact info, photo categories, review keywords — in one shot. Don't start clicking tabs or running JS until you've read the page text. Most of the Phase 2 checklist fills itself from this single call.

10. **Photo count is not shown in the overview — estimate it.** Google does not display a total photo count in the listing panel. Do not try to extract it as a number. Instead, estimate from the number of photo category thumbnails visible in the "Fotos und Videos" section (each implies several photos), and note as "~X–Y photos (estimated)". Only commit to an exact count if you manually scroll through the full photo grid.

11. **Tabs visible = instant profile completeness shortcut.** If a listing shows only "Übersicht" and "Rezensionen" (no "Info", "Produkte", or "Aktuelles"), that definitively means: no description, no products/services listed, and no posts — all three confirmed missing in one glance. Log them as "Not set" and move on without clicking into each one. Learned from Monochrome Me audit, March 2026.

---

## Self-Improvement

When a client corrects an audit or identifies something that was missed:
- Update the scoring rubric in `references/scoring-rubric.md`
- Add the failure mode as a Rule above

When an audit leads to visible improvement (client follows recommendations and ranking/reviews improve):
- Note which recommendations had the highest impact
- Update the 30-day action plan template accordingly

This skill improves with every audit run.
