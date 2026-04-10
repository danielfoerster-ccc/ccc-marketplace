---
name: ccc-audit-report
description: "Generates the Phase 5a audit report: a professional 5-page findings document with executive summary, current state assessment, opportunity matrix, solution recommendations, and implementation roadmap. Uses the client's actual data from discovery, process documentation, and VALUE scoring — never generic estimates. The report is the analytical deliverable; the commercial proposal is a separate skill. USE THIS SKILL when scoring and solution matching are complete and it's time to write the report, when the user says 'write the report for [client]', 'generate audit report', 'create the findings document', 'build the audit deliverable', or 'we're ready for the report'. Also trigger when all Phase 3+4 files exist in the client folder."
allowed-tools: Read, Write
---

# AI Audit — Phase 5a: Findings Report

**Workflow: Gather → Structure → Write → Quality Check.** Pulls all client data from previous phases, structures it into the 5-page report format, writes each section, and runs a quality checklist before marking complete.

**Time investment:** 2-3 hours
**Requires:** Completed VALUE Scoring Matrix (03) and Solution Matching (04) in the client folder

---

## Step 1 — Gather All Inputs

Read the following files from `[Client Folder]/AI Audit/`:

1. `01 - Discovery Notes.md` — business context, tech stack, goals, stakeholder quotes
2. `02 - Process Documentation/` — all process docs (7-element model + pain points)
3. `03 - VALUE Scoring Matrix.md` — scored opportunity matrix with reasoning
4. `04 - Solution Matching.md` — tool recommendations with ROI calculations

If any file is missing, stop and tell the consultant which phase needs to be completed first. A report without scoring data or solution matching is a summary, not an audit report.

Also read the person file from `03 - OPERATIONS/Relationships & Network/People/[Name].md` for any additional client context.

---

## Step 2 — Write the Report

The report follows a strict 5-page structure. Read `references/report-structure.md` for the full template with formatting guidance and examples.

Save to: `[Client Folder]/AI Audit/05 - Audit Report — [Client Name].md`

### Page 1: Executive Summary

The single most important page. A busy decision-maker will read this and nothing else.

Content:
- **Opening hook:** One sentence quantifying the total opportunity — hours wasted, annual cost
- **Key opportunities:** 3-5 bullet points, each with process name → problem → savings
- **Total opportunity:** First-year and three-year projections
- **Recommended next step:** One specific action with a concrete outcome and timeframe

Rules for this page:
- Use the client's actual numbers from the ROI calculations
- Lead with the single most impactful finding
- The recommended next step should be the highest-VALUE-scored process
- This page must stand alone — someone reading only this page should understand the full picture

### Page 2: Current State Assessment

Builds credibility by showing you understand their business.

Content:
- **Business context:** 2-3 sentences — industry, size, what triggered the audit
- **Evaluated processes table:** Process name, time per execution, weekly volume, monthly hours, pain rating (High/Medium/Low)
- **Current tech stack:** Bulleted by category (CRM, PM, Communication, etc.)
- **Integration gaps:** Where tools don't talk to each other and what manual work fills the gap
- **Before/After workflow comparison:** For the top-scored process, show the current manual flow vs. proposed automated flow (pull from process docs)
- **Stakeholder quote:** At least one direct quote capturing the pain — this is the emotional anchor

### Page 3: Opportunity Matrix

The analytical heart of the report.

Content:
- **VALUE scoring table:** All processes with V/A/L/U/E scores, totals, and priority ratings
- **Scoring legend:** Brief explanation of what each letter means
- **Implementation order:** Phased — Quick Wins (30-60 days), Foundation (60-120 days), Expansion (120+ days)
- For each phase, explain why that process is sequenced there (not just the score — the strategic reasoning)

### Page 4: Solutions

Specific, actionable recommendations — this is where generic audits fail and specific ones convert.

For each recommended automation (top 3-5 by VALUE score):

```
[#]. [PROCESS NAME]

Problem: [Current pain in 1 sentence — from process doc]
Solution: [Exact tool(s)] workflow: [Trigger] → [Step 1] → [Step 2] → [Output]
Expected Result: [Current time] → [Automated time] | Save [X] hrs/month ($[X]) | [Error improvement]

Complexity: [Low/Medium/High] | Tool: [Name] ($[X]/month) | Setup: [X] hours
```

Every recommendation must include specific tool names, not "an automation platform." Every result must use the client's actual numbers.

### Page 5: Implementation Roadmap

The bridge between analysis and action. This page sets up the proposal.

Content:
- **Phased timeline:** What happens in each phase, week by week
- **Milestones:** What's delivered and what result is expected at each phase boundary
- **Total transformation summary:** Monthly hours saved at completion, annual cost reduction

This page does NOT include pricing — that's the proposal (Phase 5b). The roadmap shows what will be built and when, creating natural demand for the "how much" conversation.

---

## Step 3 — Quality Checklist

Before marking the report complete, verify every item:

**Content accuracy:**
- [ ] All numbers come from the client's actual data (discovery notes, process docs)
- [ ] ROI calculations use their hourly rates (flagged as estimates if assumed)
- [ ] Executive summary stands alone — readable without the rest of the report
- [ ] Recommendations match the client's budget range and technical capacity
- [ ] At least one direct stakeholder quote included

**Specificity:**
- [ ] Tools are named specifically ("Make" not "automation platform")
- [ ] Results are quantified ("26 hrs/month" not "significant time savings")
- [ ] Time estimates distinguish active vs. elapsed where relevant
- [ ] Error rates are quantified ("30% error rate" not "frequent errors")

**Completeness:**
- [ ] All 5 pages present with substantive content
- [ ] Every process scored 15+ has a solution recommendation
- [ ] Before/After comparison included for at least the top process
- [ ] Implementation roadmap has specific week-by-week milestones

**Tone:**
- [ ] Professional but not stiff — the client should feel understood, not lectured
- [ ] Honest about what NOT to automate (builds trust)
- [ ] Confident in recommendations without overpromising

If any item fails, fix it before saving. If data is missing (e.g., no stakeholder quote), flag it for the consultant to add from their notes.

---

## Rules

1. Never use generic numbers. Every figure in the report must trace back to a specific data point from discovery or process documentation. If a number is estimated, label it explicitly.
2. Never skip the executive summary test. If someone reads only Page 1, they should understand: what's wrong, what to do about it, and what it's worth. If the executive summary fails this test, rewrite it.
3. The report is the analytical deliverable, not the sales pitch. It presents findings and recommendations. The commercial proposal (pricing, packages, terms) is a separate document produced by `ccc-audit-proposal`. Don't include pricing in the report.
4. Always include at least one "do not automate" recommendation if any process scored below 15. Showing restraint is more credible than recommending everything.
5. The Before/After workflow comparison is the most powerful visual in the report. It makes the abstract concrete. Never skip it for the top process.

---

## Self-Improvement

When a report fails to convert (client doesn't move to proposal), ask what was weak — usually it's vague numbers, missing emotional anchors (stakeholder quotes), or recommendations that didn't match the client's actual capacity. Add the pattern to the quality checklist. When a report converts well, note which sections the client referenced in their response — that's what mattered to them.
