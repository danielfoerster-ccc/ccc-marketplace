---
name: seo-keyword-strategy
description: "Generates prioritized keyword list and 13-week content calendar from competitor gap analysis. Proposes 20-30 keywords with article titles, scores by search intent and competition, requires human approval before locking the calendar."
allowed-tools: "Read, Write, Edit, Bash, WebSearch, Glob, Grep"
---

## Overview

This skill executes the **Extract → Propose → Approve → Lock** workflow to turn competitor gap analysis into a concrete, human-approved keyword strategy and content calendar. The human approval gate is mandatory — some keywords may be off-brand, strategically wrong, or lower priority than others.

**Entry triggers:** "keyword strategy", "content calendar", "which keywords should we target?", "article topics", "plan the blog content"

---

## Workflow: Extract → Propose → Approve → Lock

### Step 1: Extract Gap Analysis Data

Read `03 - OPERATIONS/[client]/SEO/competitor-analysis/competitor-gap-report.md`:

- Extract HIGH OPPORTUNITY keywords (Score 25+)
- Extract MEDIUM OPPORTUNITY keywords (Score 15–24)
- Note search volume, intent level, competition notes

Load client context from `03 - OPERATIONS/[client]/SEO/pipeline-config.md`:

- Brand voice
- Primary & secondary CTAs
- Target article cadence
- Tone preference

### Step 2: Propose Keyword List with Article Titles

Build a 20–30 keyword ranked list. For each keyword:

```
| Rank | Keyword | Intent | Est. Volume | Competition | Article Title | Score |
|---|---|---|---|---|---|---|
| 1 | "SaaS pricing comparison" | BOFU | 1200 | Medium | The Complete Guide to SaaS Pricing Models [2026] | 32 |
| 2 | "how to build a SaaS app" | MOFU | 2400 | High | [Article] | 28 |
| 3 | "low-code platform demo" | BOFU | 580 | Low | [Article] | 22 |
```

**Article title rules:**

- Include year (e.g., "[2026]") for freshness perception
- Front-load the keyword
- Match brand voice (formal vs. casual)
- Promise + Specificity (e.g., "Complete Guide", "5 Ways", "2026 Trends")

**Example titles for different voices:**

| Brand Voice | Keyword | Article Title |
|---|---|---|
| Formal/Professional | "API rate limiting" | "Understanding API Rate Limiting: Best Practices & Implementation Guide" |
| Casual/Fun | "API rate limiting" | "Stop Getting Rate Limited: Your API's Best Friend" |
| Educational | "API rate limiting" | "What Is API Rate Limiting? Why It Matters & How to Handle It" |

### Step 3: Present Full Ranked List to Human

Format the proposal as a clear, scannable table:

```markdown
# [[Client Name]] — Keyword Strategy Proposal

**Total Keywords Proposed:** 24
**Date Proposed:** [date]
**Analysis Source:** [[Competitor Gap Report]] (dated [date])

---

## HIGH PRIORITY (BOFU) — Recommend: Rank First

| Rank | Keyword | Intent | Volume | Competition | Title | Score |
|---|---|---|---|---|---|---|
| 1 | "SaaS pricing comparison" | BOFU | 1200 | Medium | The Complete Guide to SaaS Pricing Models [2026] | 32 |
| 2 | "low-code platform features" | BOFU | 890 | Low | Best Low-Code Platforms for Startups: Feature Comparison [2026] | 28 |

---

## MEDIUM PRIORITY (MOFU) — Follow-Up Content

| Rank | Keyword | Intent | Volume | Competition | Title | Score |
|---|---|---|---|---|---|---|
| 6 | "SaaS infrastructure costs" | MOFU | 2100 | High | How Much Does It Cost to Build a SaaS Product? [2026] | 25 |

---

## AWARENESS (TOFU) — Build Authority Over Time

| Rank | Keyword | Intent | Volume | Competition | Title | Score |
|---|---|---|---|---|---|---|
| 18 | "what is SaaS" | TOFU | 12000 | Very High | SaaS Explained: Definition, Examples, and How It Works | 18 |

---

## 📋 Review Instructions

**IMPORTANT: This is a proposal, not locked strategy. You decide.**

- ✅ **Approve as-is:** Click below, move to calendar lock
- 🎯 **Edit:** Remove, reorder, or modify any keyword/title
- ❌ **Reject:** Start over with different search approach

**Red flags to watch for:**

- Keywords outside your core service (will waste content effort)
- Article titles that don't match your brand voice
- Too many TOFU (awareness) keywords vs. BOFU (conversion keywords)
- Keywords you're not equipped to rank for yet (high-authority targets)

**After you approve, I'll:**

1. Lock the keywords into a 13-week publishing calendar
2. Save to `keyword-strategy/` folder
3. Generate article briefs for [[seo-content-generate]] skill

---

**Ready to proceed with these keywords, or make edits?**
```

### Step 4: Human Approval & Edits

Wait for explicit human approval. Options:

1. **"Looks good, lock it in"** → Proceed to Step 5
2. **"Remove [keyword]", "Add [keyword]", "Change title to [new title]"** → Edit and re-present
3. **"Start over, focus on [different angle]"** → Run new WebSearch on different competitor themes

**Critical rule:** Do NOT lock until the human explicitly approves. Some keywords will be wrong—it's the human's job to catch them.

### Step 5: Lock into 13-Week Calendar

Once approved, create `03 - OPERATIONS/[client]/SEO/content-calendar/13-week-calendar.md`:

```markdown
# [[Client Name]] — 13-Week Content Calendar

**Lock Date:** [date]
**Cadence:** [X articles/month]
**Total Keywords:** [N]
**Approval Gate:** [[Name]] (date)

---

## Week 1–3 (Batch 1: Highest Priority BOFU)

| Week | Publish Date | Keyword | Article Title | Status | Notes |
|---|---|---|---|---|---|
| 1 | [date] | "SaaS pricing comparison" | The Complete Guide to SaaS Pricing Models [2026] | QUEUED | Send brief to [[seo-content-generate]] |
| 2 | [date] | "low-code platform features" | Best Low-Code Platforms: Feature Comparison [2026] | QUEUED | — |
| 3 | [date] | "SaaS infrastructure costs" | How Much Does It Cost to Build a SaaS? [2026] | QUEUED | — |

## Week 4–6 (Batch 2: MOFU & Secondary BOFU)

[similar structure]

## Week 7–9 (Batch 3: Mixed)

[similar structure]

## Week 10–13 (Batch 4: Authority & Long-Tail)

[similar structure]

---

## Calendar Rules

- **Publish pace:** [X per week / per 2 weeks]
- **Internal linking:** Week 3 article links to Week 1 (topical clustering)
- **Social repurposing:** Every article → 3 social posts via [[seo-social-repurpose]]
- **Republishing:** Old article updates schedule in Week 11+

---

## Approval Chain

- **Keywords approved by:** [[Name]] on [date]
- **Calendar locked:** [date]
- **First brief sent:** [date]
- **Target first publish:** [date]
```

### Step 6: Create Article Brief Template

Create one brief per keyword, saved to `content-calendar/article-briefs/`:

```markdown
# Article Brief: "[Keyword]"

**Article Title:** [Title]
**Target Keyword:** [Keyword]
**Search Intent:** [BOFU/MOFU/TOFU]
**Internal Link Targets:** [[Previous article 1]], [[Previous article 2]]
**Target Word Count:** 1800–2200 words

## Content Outline

1. **Introduction (150–200 words)**
   - Hook: Why reader cares
   - Preview of key points

2. **Section 1: [Subtopic]**
   - Key point 1
   - Key point 2

3. **Section 2: [Subtopic]**
   - [similar]

4. **Comparison/Examples** (if applicable)
   - [Examples from [[client context]]]

5. **Call-to-Action**
   - Primary CTA: [CTA from config]
   - Secondary: [if relevant]

6. **Conclusion**
   - Summarize key takeaways
   - Reinforce CTA

## Brand Requirements

- **Tone:** [formal | conversational | educational]
- **Voice:** [from [[pipeline-config]]]
- **Avoid:** [topics/language to skip]
- **Emphasize:** [unique angles from client]

## Publishing Details

- **Target Publish Date:** [date]
- **Author/Generator:** [[seo-content-generate]] via Arvo API
- **Social Post Count:** 3 (LinkedIn, Facebook, Instagram)

## Success Metrics

- **Target ranking position:** Top 10 in 8 weeks
- **Target CTR:** [estimate based on keyword]
- **Conversion goal:** [demo, signup, call]
```

### Step 7: Confirm & Next Step

Once calendar is locked:

> "Calendar locked! All [N] keywords approved and sequenced into 13 weeks. Article briefs saved to `content-calendar/article-briefs/`. 
>
> **Next:** Run [[seo-content-generate]] to send Week 1 briefs to Arvo and publish the first batch."

---

## Rules

1. **Human approval is mandatory.** Never lock without explicit sign-off. The keyword strategy is the client's roadmap.
2. **Titles matter as much as keywords.** A great keyword with a weak title won't rank. Iterate on titles.
3. **Intent alignment is critical.** BOFU keywords come first. TOFU comes last. Don't reverse this without explicit client request.
4. **Calendar flexibility.** The 13-week calendar is a guide, not a prison. If a keyword becomes irrelevant, skip it. If a new opportunity emerges, add it.
5. **Wikilinks always.** Reference [[seo-content-generate]], [[seo-social-repurpose]], and [[SOP SEO Pipeline — Keyword Strategy & Approval]] with wikilinks.

---

## Self-Improvement

After each keyword strategy approval:

1. **Title effectiveness:** Did the approved titles rank well? Which title patterns worked? Update title template.
2. **Intent accuracy:** Did BOFU keywords outperform MOFU? Adjust balance if needed.
3. **Volume estimates:** Were our volume estimates accurate? Refine search volume methodology.
4. **Approval speed:** Did the human ask for many edits? Improve the initial proposal—better keywords upfront = fewer edits.
5. **Calendar adherence:** Did the client stick to the 13-week schedule or defer articles? Document constraints for next project.

---

## Reference

**SOP:** [[SOP SEO Pipeline — Keyword Strategy & Approval]]
**Previous Skill:** [[seo-competitor-analysis]]
**Next Skill:** [[seo-content-generate]]
