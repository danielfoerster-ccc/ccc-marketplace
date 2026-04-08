---
name: seo-competitor-analysis
description: "Runs structured competitor gap analysis for the CCC SEO Content Pipeline. Researches 3-5 competitor websites, identifies top-ranking pages, extracts keyword themes, and finds bottom-of-funnel keyword gaps where the client can compete. Outputs structured report to vault."
allowed-tools: "Read, Write, Edit, Bash, WebSearch, WebFetch, Glob, Grep"
---

## Overview

This skill executes the **Research → Analyze → Score → Report** workflow to identify SEO opportunities by comparing the client against direct competitors. The output is a structured Competitor Gap Report that feeds directly into [[seo-keyword-strategy]].

**Entry triggers:** "analyze competitors", "find keyword gaps", "competitor SEO research", "what are my competitors ranking for?", "SEO gap analysis"

---

## Workflow: Research → Analyze → Score → Report

### Step 1: Load Pipeline Context

Read `03 - OPERATIONS/[client]/SEO/pipeline-config.md`:

- Extract competitor list (top 5)
- Extract client URL & industry
- Extract brand voice & CTAs (context for intent analysis)

### Step 2: Competitor Web Research

For each of the 3-5 competitors:

1. Use **WebSearch** to find top-ranking pages for their brand name + industry keywords
2. Use **WebFetch** to extract:
   - Title, H1, meta description
   - Main keyword focus (from content)
   - Estimated word count
   - Internal linking strategy (do they link between topics?)
   - CTA placement & messaging
   - Backlink profile (rough estimate from domain authority)

3. Map competitor content pillars:
   - Educational content (TOFU: awareness)
   - Problem-solution content (MOFU: consideration)
   - Comparison/ROI content (BOFU: decision)

### Step 3: Identify Keyword Themes

Extract keyword themes by searching for:

```
site:[competitor1.com] intitle:"keyword"
site:[competitor1.com] "solution"
site:[competitor1.com] "pricing"
site:[competitor1.com] "how to"
```

Build a matrix:

| Competitor | TOFU Themes | MOFU Themes | BOFU Themes |
|---|---|---|---|
| A | [awareness keywords] | [consideration keywords] | [decision keywords] |
| B | [awareness keywords] | [consideration keywords] | [decision keywords] |

### Step 4: Gap Analysis – BOFU Priority

**Critical:** Prioritize BOFU (bottom-of-funnel) keywords. These convert.

For each BOFU theme the competitors rank for:

1. Can the client rank for this? (Check: industry fit, audience match, existing authority)
2. Is it low-hanging fruit? (Check: competitor count in top 10, search intent clarity)
3. What's the effort-to-value ratio? (Check: article complexity vs. estimated conversion potential)

Build a gap report table:

| Keyword | Search Intent | Competition Level | Client Fit? | Effort | Value | Score |
|---|---|---|---|---|---|---|
| "SaaS pricing models" | BOFU | Medium | Yes | 3 | 9 | 27 |
| "low-code platform cost" | BOFU | Low | Yes | 2 | 8 | 16 |

### Step 5: Score Opportunities

Score each keyword (0–40 scale):

```
Score = (Search Intent Weight × 10) + (Volume Estimate / 10) + (Achievability Factor × 10)

Where:
  - Search Intent Weight: BOFU=4, MOFU=3, TOFU=2
  - Volume Estimate: 100/month=1, 1000/month=5, 10000/month=10
  - Achievability: Low competition + client fit = 8–10, medium = 4–7, hard = 1–3
```

**Example:**
- "low-code no-code platform pricing" (BOFU=4) + (500 volume = 5) + (medium competition, good fit = 6) = **Score: 15**
- "how to build a SaaS product" (MOFU=3) + (2000 volume = 8) + (high competition = 3) = **Score: 14**

### Step 6: Generate Gap Report

Create `03 - OPERATIONS/[client]/SEO/competitor-analysis/competitor-gap-report.md`:

```markdown
# [[Client Name]] — Competitor Gap Analysis Report

**Analysis Date:** [date]
**Competitors Analyzed:** [A, B, C, D, E]
**Methodology:** Content pillar mapping + BOFU priority

---

## Executive Summary

- **Total competitor BOFU keywords identified:** [X]
- **Client currently ranking for:** [Y]
- **Opportunity gap:** [X - Y]
- **Recommended first batch:** Top 8–12 BOFU keywords

---

## Competitor Profile Summary

### Competitor A: [Name]
- **Domain Authority:** [est.]
- **Content Volume:** ~[X] articles
- **Strongest Topics:** [list]
- **BOFU Keywords:** [list top 5]

### Competitor B: [Name]
[similar structure]

---

## Keyword Gap Scorecard

### HIGH OPPORTUNITY (Score 25+)

| Keyword | Intent | Volume | Competition | Effort | Value | Score | Reasoning |
|---|---|---|---|---|---|---|---|
| [KW1] | BOFU | [vol] | Low | 2 | 9 | 28 | [why client should rank] |

### MEDIUM OPPORTUNITY (Score 15–24)

[table]

### LOWER PRIORITY (Score <15)

[table]

---

## Content Pillar Gaps

### BOFU Pillar: [Pillar Name]
- **Competitors covering:** [A, B, C]
- **Client gap:** Yes / No
- **Recommended articles:** [list]
- **Estimated difficulty:** [Low | Medium | High]

### MOFU Pillar: [Pillar Name]
[similar]

### TOFU Pillar: [Pillar Name]
[similar]

---

## Backlink Opportunities

- **Competitor A's top-linked pages:** [list]
- **Potential outreach:** [which topics client should build for authority]

---

## Recommendations

1. **Next step:** Run [[seo-keyword-strategy]] to approve top 8–12 keywords
2. **Timeline:** Expect 4–6 weeks to rank on new BOFU keywords
3. **Quick wins:** [List 2–3 keywords with <6 week ranking potential]

**Report prepared by:** Claude SEO Pipeline
**Next review:** [in 4 weeks, after first content batch]
```

### Step 7: Save & Log

Save to `03 - OPERATIONS/[client]/SEO/competitor-analysis/competitor-gap-report.md`. Update the pipeline config with:

```
## Last Analysis

- **Run Date:** [date]
- **Keywords Identified:** [X]
- **Recommended Batch:** Top [8–12]
- **Next Review:** [date + 4 weeks]
```

---

## Rules

1. **BOFU is non-negotiable.** Always prioritize bottom-of-funnel keywords (pricing, comparisons, ROI, demos) over awareness keywords.
2. **WebSearch first.** Use WebSearch to find competitor rankings. WebFetch is for content extraction only.
3. **Score is relative.** A score of 15 for a niche B2B service is high; a score of 15 for a consumer keyword is low. Adjust thresholds per industry.
4. **Competitors must be direct.** If the client provided indirect competitors, ask for clarification before running analysis.
5. **Wikilinks always.** Reference [[seo-keyword-strategy]] and [[SOP SEO Pipeline — Competitor Gap Analysis]] with proper wikilinks.

---

## Self-Improvement

After each competitor analysis:

1. **Scoring accuracy:** Did the top-scored keywords produce good results in subsequent keyword strategy? If not, calibrate the scoring formula.
2. **Competition data:** Did we underestimate or overestimate competitor strength? Adjust "achievability" thresholds.
3. **Pillar coverage:** Did we miss entire content pillar categories? Add them to the template.
4. **Speed:** How long did research take? Streamline if repetitive; add automation opportunities to the SOP.

---

## Reference

**SOP:** [[SOP SEO Pipeline — Competitor Gap Analysis]]
**Previous Skill:** [[seo-pipeline-setup]]
**Next Skill:** [[seo-keyword-strategy]]
