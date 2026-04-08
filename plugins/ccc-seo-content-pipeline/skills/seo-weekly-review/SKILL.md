---
name: seo-weekly-review
description: "Weekly SEO performance review for the content pipeline. Pulls traffic data (GSC/manual input/Seomator), compares against baseline, identifies top/declining articles, flags keyword opportunities, produces weekly report with recommendations. Loops back to competitor analysis when new gaps found."
allowed-tools: "Read, Write, Edit, Bash, WebSearch, WebFetch, Glob, Grep"
---

## Overview

This skill executes the **Pull → Compare → Flag → Report → Loop** workflow to track SEO performance over time and identify optimization opportunities. It's the most important skill for pipeline compound growth—weekly reviews reveal what's working and what needs adjustment.

**Entry triggers:** "weekly SEO review", "how is the SEO doing?", "traffic report", "check keyword rankings", "SEO performance", "Monday SEO check"

**Frequency:** Run every Monday morning (or after each content publish batch).

---

## Workflow: Pull → Compare → Flag → Report → Loop

### Step 1: Load Baseline & Previous Report

Read from vault:

1. `03 - OPERATIONS/[client]/SEO/pipeline-config.md` → Extract:
   - Client URL, target audience
   - Publishing cadence (expected articles this week)

2. `03 - OPERATIONS/[client]/SEO/weekly-reports/[most-recent-report].md` → Extract:
   - Previous week's metrics (baseline)
   - Total traffic, top 3 articles, bottom 3 articles
   - Keywords ranking top 10, keywords in 11–20 range (striking distance)

3. `03 - OPERATIONS/[client]/SEO/content-calendar/13-week-calendar.md` → Extract:
   - This week's published articles (if any)

### Step 2: Pull Current Week Traffic Data

**Three options (in order of preference):**

#### Option A: Google Search Console (GSC) MCP

If GSC MCP is available and connected:

```bash
# Query GSC for past 7 days
gsc_query() {
  local client_url="$1"
  local days_back="$2"
  
  # [Pseudo-code for GSC API]
  # Returns: keyword, impressions, clicks, ctr, avg_position
}

gsc_query "https://example.com" 7
```

**Output expected:**

```
Keyword,Impressions,Clicks,CTR,Avg Position
SaaS pricing comparison,320,28,8.75%,6
how to build a SaaS,1200,45,3.75%,18
SaaS infrastructure costs,180,5,2.78%,22
[...]
```

#### Option B: Manual Input / CSV Upload

Ask user to provide GSC data (CSV export):
- Last 7 days
- Columns: keyword, impressions, clicks, CTR, avg_position
- Sort by impressions descending

**Format:**

```
Keyword | Impressions | Clicks | CTR | Position
SaaS pricing comparison | 320 | 28 | 8.75% | 6
how to build a SaaS | 1200 | 45 | 3.75% | 18
```

#### Option C: Seomator API

If Seomator is available:

```bash
#!/bin/bash

SEOMATOR_API_KEY="$1"
CLIENT_URL="$2"

curl -s https://api.seomator.io/v1/domain-stats \
  -H "X-API-Key: $SEOMATOR_API_KEY" \
  -d "domain=$CLIENT_URL" \
  | jq '.keywords[] | {keyword, position, traffic, volume}'
```

**Output:**

```json
{
  "keyword": "SaaS pricing comparison",
  "position": 6,
  "traffic": 28,
  "volume": 320
}
```

### Step 3: Compare Against Baseline

Build a comparison table:

```markdown
## Weekly Performance Summary

**Report Date:** 2026-04-15
**Period:** 2026-04-08 to 2026-04-15 (Week 2)
**Baseline:** Previous week (2026-04-01 to 2026-04-07)

### Overall Metrics

| Metric | This Week | Last Week | Change | Trend |
|---|---|---|---|---|
| Total Impressions | 12,450 | 10,200 | +2,250 (+22%) | 📈 |
| Total Clicks | 890 | 720 | +170 (+24%) | 📈 |
| Avg CTR | 7.1% | 7.1% | 0% | — |
| Avg Rank Position | 8.2 | 8.5 | +0.3 (better) | ✓ |

### Top 5 Articles by Traffic

| Rank | Keyword | Article Title | Traffic | Position | 7d Change |
|---|---|---|---|---|---|
| 1 | "SaaS pricing comparison" | The Complete Guide to SaaS Pricing... | 28 clicks | #6 | —— |
| 2 | "how to build a SaaS" | How to Build a SaaS Product in 2026 | 45 clicks | #18 | +2 clicks |
| 3 | "SaaS business model" | SaaS Business Model 101 | 22 clicks | #11 | NEW |
| 4 | "free alternatives to X" | Best Free [X] Alternatives | 18 clicks | #9 | —— |
| 5 | "API rate limiting" | Understanding API Rate Limiting | 15 clicks | #12 | -5 clicks |

### Bottom 5 Articles (Opportunity for Updates)

| Keyword | Article Title | Traffic | Position | Notes |
|---|---|---|---|---|
| "SaaS hiring guide" | SaaS Hiring Best Practices | 2 clicks | #45 | Consider updating; 12 weeks old |
| "microservices architecture" | Intro to Microservices | 1 click | #67 | Low intent match; consider sunset |
| "DevOps tools 2025" | The Top 20 DevOps Tools | 3 clicks | #38 | Outdated; needs refresh |
```

### Step 4: Flag Critical Insights

Identify and flag:

#### A. Ranking Improvements (keywords entering top 10)

```markdown
## 🎯 Ranking Breakthroughs

Keywords that moved into top 10 this week:

1. **"SaaS business model"** → #11 → #8 (3 positions gained!)
   - Article: [SaaS Business Model 101]
   - Action: Consider promoting via social/email to amplify clicks

2. **"low-code platform features"** → #17 → #13 (4 positions gained)
   - Article: [Best Low-Code Platforms]
   - Action: Update internal links from related articles
```

#### B. Declining Articles (>20% week-over-week drop)

```markdown
## ⚠️ Performance Declines

Articles losing significant traffic:

1. **"API rate limiting"** dropped 5 clicks (25% decline)
   - Current position: #12
   - Possible causes:
     - Seasonal drop-off
     - Competitor published fresh content
     - Need to refresh/update article
   - Recommended action: Analyze competitor articles, update ours

2. **"free alternatives to X"** stable but declining over 3 weeks
   - Check: Competitor ranking? Seasonality? Outdated data?
```

#### C. Keywords in Striking Distance (Positions 11–20)

```markdown
## 💪 Close to Top 10

Keywords almost ranking in top 10 (11–20 range):

1. **"SaaS pricing models"** → #13
   - Current clicks: 12/week
   - Potential if moved to #8: ~25 clicks/week
   - Action: Update article + get 2–3 high-quality backlinks

2. **"how to calculate SaaS CAC"** → #15
   - Current clicks: 8/week
   - Potential if moved to #5: ~30 clicks/week
   - Action: Improve content depth, add case study
```

#### D. New Keywords Ranking (First Time in Top 50)

```markdown
## ✨ New Opportunities

Keywords newly ranking in top 50:

1. **"SaaS accounting software"** → #28 (NEW!)
   - Article: [Best SaaS Accounting Tools]
   - Clicks so far: 2
   - Action: Optimize for this keyword if it has intent fit
```

### Step 5: Competitor Activity Detection

Check if competitors have published new content on similar keywords:

```bash
#!/bin/bash

COMPETITOR_URL="$1"
TARGET_KEYWORD="$2"

# Search for competitor content on target keyword
google_search="$COMPETITOR_URL intitle:\"$TARGET_KEYWORD\""

curl -s "https://www.google.com/search?q=$google_search" \
  | grep -o '<h3.*<\/h3>' | head -5

# If competitor recently published, flag for client content update
```

**Flag in report:**

```markdown
## 👀 Competitor Activity

1. **Competitor A** just published "SaaS Pricing Comparison 2026"
   - Published: 4 days ago
   - Currently ranking: #4
   - Risk: They may capture your keywords
   - Action: Promote our article more aggressively; consider refresh with 2026 data
```

### Step 6: Generate Weekly Report

Create `03 - OPERATIONS/[client]/SEO/weekly-reports/2026-04-15-weekly-review.md`:

```markdown
# [[Client Name]] — Weekly SEO Review

**Report Date:** 2026-04-15
**Period:** Week of April 8–15, 2026
**Review Run By:** [[seo-weekly-review]]

---

## Executive Summary

✅ **This week: POSITIVE MOMENTUM**

- **Total traffic:** 890 clicks (+24% vs. last week)
- **New article published:** "SaaS Business Model 101" (ranked #8 immediately!)
- **Keywords in top 10:** 6 (up from 5)
- **Keywords in striking distance (11–20):** 8

**Bottom line:** Pipeline is working. Content is indexing fast. Keep this cadence.

---

## Traffic Metrics

[Performance comparison table from Step 3]

---

## Top Performers

[Top 5 articles table]

**Notes:**
- "SaaS pricing comparison" remains #1 generator (28 clicks/week)
- "How to build a SaaS" is on the edge—one refresh could push it from #18 to #10

---

## Bottom Performers & Refresh Opportunities

[Bottom 5 articles table]

**Actions:**
1. Update "SaaS Hiring Guide" with 2026 data (currently #45, <2 clicks/week)
2. Consider retiring "Microservices Architecture 101" (very low intent match)
3. Refresh "DevOps Tools 2025" (change year to 2026, update tool list)

---

## Keyword Ranking Changes

### Into Top 10 ✅
- "SaaS business model" #11 → #8
- [others]

### Close (11–20 range) 💪
- "SaaS pricing models" #13 (potential: 25 clicks/week if moved to #8)
- "How to calculate SaaS CAC" #15 (potential: 30 clicks/week if moved to #5)

### Declining ⚠️
- "API rate limiting" -25% week-over-week (investigate competitor content)

---

## Competitor Activity

- **Competitor A** published "SaaS Pricing 2026" 4 days ago, currently #4
- **Recommendation:** Promote our "Pricing Comparison" article more aggressively

---

## Content Calendar Progress

| Article | Planned | Actual | Status | Traffic (1wk) |
|---|---|---|---|---|
| "SaaS Business Model 101" | Week 2 | 2026-04-08 | LIVE | 22 clicks |
| "Low-Code Platform Features" | Week 3 | — | QUEUED | — |

---

## Recommendations

### Immediate (This Week)

1. **Promote "Pricing Models" (#13)** via social/email to get 3–5 backlinks
   - Goal: Push into top 10
   - Effort: 30 minutes

2. **Update "Hiring Guide"** with 2026 data
   - Currently: #45, 2 clicks/week
   - Expected post-refresh: #25–30, 8+ clicks/week
   - Effort: 1–2 hours

### Next 2 Weeks

1. **Analyze why "API Rate Limiting" dropped**
   - Check competitor content
   - Update our article if needed

2. **Prepare refresh schedule for 3 oldest articles**
   - Assign to content calendar for Week 8–10

### Strategic

1. **Monitor competitor activity** on "pricing" keywords
2. **Expand BOFU keyword coverage** next cycle
3. **Add internal linking strategy** for top-10 articles to push #11–15 articles up

---

## Questions for Client

1. Is there a sales/promotional push happening next week? (Can drive traffic to articles)
2. Are you open to refreshing older articles (Week 8 onwards)?
3. Should we prioritize "pricing" keywords or "technical" keywords next?

---

## Next Steps

1. **Next review:** Monday, 2026-04-22 (1 week)
2. **Content publish:** Week 3 articles (pending approval)
3. **Competitor re-analysis:** Run [[seo-competitor-analysis]] if major new gaps found

---

**Generated:** 2026-04-15 by [[seo-weekly-review]]
**Confidence:** High (GSC data, 7-day averages)
```

### Step 7: Suggest Optimizations & Next Skill

Based on findings, recommend:

1. **If keywords in striking distance:** Update those articles (add depth, case studies, backlink outreach)
2. **If declining keywords:** Run [[seo-competitor-analysis]] to check if competitors published new content
3. **If new gaps found:** Schedule another [[seo-competitor-analysis]] for next month
4. **If traffic is strong:** Continue current cadence; increase publishing volume if possible

### Step 8: Loop Back if Major Gaps Found

If the weekly review reveals a significant opportunity:

> "Weekly review found 3 new competitor keywords in 'pricing' space that we're missing. Should I run a fresh [[seo-competitor-analysis]] to identify new article opportunities for the calendar?"

---

## Weekly Report Template

```markdown
# [[Client Name]] — Weekly SEO Review

**Report Date:** [date]
**Period:** [week start] to [week end]

## Executive Summary

[1–3 sentences on overall trend: positive, neutral, concerning?]

**Key metrics:**
- Total traffic: [X] clicks (+/- Y%)
- Keywords in top 10: [N]
- Articles published: [N]

## Metrics & Performance

[Performance comparison table]

## Top 5 Articles

[Ranked by clicks]

## Bottom 5 Articles (Refresh Opportunities)

[Ranked by lowest clicks; note potential]

## Ranking Changes

### Breakthroughs (Moved into top 10)
- [keyword] → #[new position]

### Striking Distance (11–20)
- [keyword] → #[position]

### Declines (>20% week-over-week)
- [keyword] → [reason?]

## Competitor Activity

- [Any new articles from competitors?]

## Recommendations

### Immediate
1. [Action + effort estimate]

### Next 2 Weeks
1. [Action + effort estimate]

## Content Calendar Status

| Article | Status | Traffic |
|---|---|---|

## Next Review

- **Date:** [1 week from now]
- **Suggested focus:** [1–2 areas to watch]
```

---

## Rules

1. **Weekly reviews are mandatory.** Run every Monday (or within 24 hours of publishing batch).
2. **Compare to baseline, not gut feeling.** Use concrete numbers (GSC, Seomator, or manual input).
3. **Flag decisions, not just data.** Always end with "What should we do?" not just "Here's what happened."
4. **BOFU keywords are priority.** If a BOFU keyword drops, investigate immediately. TOFU drops are OK.
5. **Wikilinks always.** Reference [[seo-competitor-analysis]], [[seo-keyword-strategy]], [[seo-content-generate]], and [[SOP SEO Pipeline — Monitoring & Iteration]].

---

## Self-Improvement

After each weekly review cycle:

1. **Data accuracy:** Did GSC/Seomator data match reality? Any discrepancies to flag?
2. **Recommendation quality:** Did recommended actions (promoting, updating, refreshing) have measurable impact?
3. **Prediction accuracy:** Did your "potential rank" estimates prove right? Calibrate if needed.
4. **Report clarity:** Did the client understand the report? Any sections confusing?
5. **Loop effectiveness:** Did competitor re-analysis lead to new, valuable keywords? Adjust frequency if needed.

---

## Reference

**SOP:** [[SOP SEO Pipeline — Monitoring & Iteration]]
**Prerequisite Skills:** [[seo-content-generate]], [[seo-keyword-strategy]], [[seo-competitor-analysis]]
**Triggered By:** [[seo-content-generate]] (weekly after publish), or manual schedule (every Monday)
**May Trigger:** [[seo-competitor-analysis]] (if major gaps found)
