---
name: ccc-cashflow-report
description: "Generates premium 18+ page Profit Strategy Assessment reports for CCC consultants. Transforms Instant Assessment data into strategic narrative: Real Revenue analysis, CAPs benchmarks, Bleed diagnosis, rollout timeline, 12 Profit Points scorecard, Cashflow Business Score (CBS), and implementation roadmap. Consultant-only deliverable—not for self-service clients. Use when ready to create a client-facing report after completing the assessment phase. Triggers: 'generate report', 'create assessment report', 'build profit roadmap', 'assessment follow-up report', 'Profit Strategy Assessment', 'PSA report', 'Cashflow Business Score', 'CBS report', 'client deliverable', 'strategy report', 'assessment report for client'."
allowed-tools: "Read, Write, Edit"
---

# ccc-cashflow-report

**Workflow: Extract → Structure → Generate → Review.** Converts completed Instant Assessment data into a professional, 18+ page client deliverable. The skill manages data gathering, report templating, narrative construction, and output organization.

## Purpose

Transform raw cashflow assessment numbers into a premium strategic narrative that clients remember and act on. The Profit Strategy Assessment Report is the anchor deliverable of any CCC cashflow engagement — it crystallizes diagnostic findings into a clear vision of where the business is, why it got there, and where it's going. Core philosophy: data without narrative is noise. This skill wraps findings into a three-part story with confidence, specificity, and clear next actions.

## When to Use This Skill

**Trigger this skill when:**
- Assessment phase is complete (all data collected, Real Revenue calculated, CAPs verified, TAPs benchmarked, 12 Profit Points scored)
- You're preparing to walk a client through findings (90-minute presentation session)
- Client needs a professional, branded deliverable to share with their leadership team
- You're consolidating diagnostic findings into actionable quarterly roadmap

**Do NOT use this skill if:**
- Assessment data is incomplete or unvalidated
- Client has not yet had discovery/kick-off conversation
- You're just organizing raw assessment numbers (use a spreadsheet template instead)
- Client is self-serve mode (they get assessment output directly; this is consultant-only)

## Inputs Required

Before starting, gather:

1. **Assessment data** (from ccc-cashflow-assessment)
   - Real Annual Revenue (gross, adjusted for refunds/cancellations)
   - Monthly revenue average
   - Current Account Purpose allocations (Operating %, Tax %, Profit %, Owner Comp %, Debt Service %)
   - Target/needed allocations for same categories

2. **Bleed analysis**
   - Monthly Needed vs. Allocated for each account (shows the gap)
   - Annual Bleed cost (monthly × 12)
   - Root causes identified during assessment

3. **12 Profit Points scores**
   - All 12 points scored 1–10 with supporting evidence
   - Top 3 problem areas identified
   - Any cost audit data (if PRUN analysis was completed)

4. **Client context**
   - Business name, industry, revenue range
   - Assessment completion date
   - Your name/consultant info
   - Any client-specific language or priorities from kick-off call

5. **Optional**: Rollout assumptions
   - Does client want 4-quarter or 8-quarter execution timeline?
   - Any constraints on structural changes?
   - Growth rate assumptions for projections?

## Process: Four Phases

### Phase 1: Data Audit & Narrative Planning (30 min)

1. **Verify all assessment inputs** — spot-check Real Revenue calculation, CAPs math, Bleed computation. If anything looks off, loop back to assessment.

2. **Identify top 3 findings** — these drive the entire report narrative
   - What surprised the client most in your discovery call?
   - Which single change would have the highest impact?
   - What is the "hardest truth" you need to communicate?

3. **Write the opening statement** — this is the thesis of the report
   - Example: "Over the past [period], [Company] has grown to €[X] annual revenue. Our analysis reveals €[Y] in untapped profit opportunity — profit being systematically left on the table through account structure and allocation misalignment."
   - This statement shapes the entire document. Make it strong.

4. **Rough outline** — 2–3 bullets per section (Executive Summary, Financial Snapshot, Bleed, Benchmarks, Rollout Plan, 12 Profit Points, Recommendations, Roadmap, Appendix)

### Phase 2: Write the Report (2–3 hours)

Use the report template (see references/report-template.md). Fill each section in order:

#### 1. Executive Summary (1 page)
- **Cashflow Business Score (CBS) as headline metric** — Lead with current CBS vs. target: "Your current CBS is [X]%; our roadmap targets [Y]% by end of year. Here's how."
- Opening statement (2–3 sentences on current state + opportunity)
- Key findings (bulleted: Real Revenue, total Bleed, CBS gap, top 1–2 Profit Point gaps)
- Top 3 recommendations (numbered with €/month impact estimates and CBS impact)
- Timeline (when changes take effect, when ROI appears, CBS progression quarter-by-quarter)
- Call-to-action ("Detailed findings on pages X–X. Walkthrough session locked in for [DATE].")

**Voice:** Direct, confident, zero jargon. Talk to the CFO and the owner the same way. Example: "You're leaving €500/month on the table and your CBS shows why. Here's how to fix it — we'll move your CBS from 55% to 85% in 12 months."

#### 2. Financial Snapshot (2 pages)
- **Cashflow Business Score (CBS) — headline metric** (calculated as: Profit % + Owner's Comp % + Tax % = single health score out of 100%. Example: if Profit = 10%, Owner Comp = 25%, Tax = 20%, CBS = 55. Target is typically 85–100% depending on growth stage.)
- Real Revenue summary (annual, monthly, per-customer if applicable)
- Current allocation pie chart (Operating, Tax, Profit, Owner Comp, Debt Service)
- Target allocation pie chart (side-by-side comparison)
- Key metrics table (Monthly Revenue, COGS %, OpEx %, Tax %, Profit %, Owner Comp %, CBS (Current), CBS (Target), Emergency Reserve)
- Cash reserve status (current vs. target: 3–6 months of operating expenses)

**Visual hierarchy:** Lead with CBS as the health diagnosis ("Your CBS is currently 55; we're targeting 85 by Q4"). Follow with the biggest, most important chart (current vs. ideal allocation). Support with numbers. CBS frames the entire narrative: "This report shows how to move your Cashflow Business Score from [Current CBS] to [Target CBS] in 12 months."

#### 3. The Bleed Analysis (2 pages)
- Bleed definition (150 words: what it is, why it happens, why it matters)
- Your Bleed chart (bar chart: Monthly Needed vs. Allocated for Tax, Profit, Debt Service)
- Annual impact (Monthly Bleed × 12 = €[X]/year cost)
- Root cause analysis (per major gap: is it unknown tax obligations? Historical under-allocation? Seasonal variance?)
- Urgency (if compounding problem exists, flag it with timeline and risk)

**Tone:** Sympathetic but unflinching. Diagnose, don't blame. Example: "This isn't a character flaw. It's a structural gap in your financial architecture."

#### 4. Benchmarks (1 page)
- Comparison table: Your Current vs. Industry Typical vs. Gap
  - Profit margin %
  - Tax provision %
  - Owner compensation %
  - Cash reserve (months)
- Growth velocity (month-over-month vs. their own historical average)
- Caveat language: "Note: benchmarks vary by industry, geography, and business model. These are directional."

#### 5. Rollout Plan (2 pages)
- Quarter-by-quarter roadmap (visual timeline: Q1 → Q2 → Q3 → Q4, extendable to Q8 if 8-quarter timeline agreed)
- **Allocation Rollout Table** (for DACH clients, use German headers; for international, use English):
  - **Rows:** Gewinn/Profit, Unternehmer/Owner Comp, Steuern/Tax, Betriebskosten/OpEx
  - **Columns:** AKTUELL/Current, Q1, Q2, Q3, Q4 (extend to Q8 if needed)
  - **Sub-rows per quarter:** "Anpassung" (adjustment: increase/decrease per quarter), "kumulativ" (cumulative allocation to date)
  - **Bottom row:** "100%-Check" (verify each quarter allocations sum to 100% across all four categories)
  - Example format (English):
    ```
    | Category      | Current | Q1    | Q2    | Q3    | Q4    |
    |---|---|---|---|---|---|
    | Profit        | 8% | 10% | 12% | 14% | 15% |
    | Owner Comp    | 20% | 22% | 24% | 25% | 25% |
    | Tax           | 18% | 20% | 21% | 22% | 23% |
    | OpEx          | 54% | 48% | 43% | 39% | 37% |
    | 100%-Check    | 100% | 100% | 100% | 100% | 100% |
    ```
- Implementation sequence (what changes first, why)
- Projected outcomes per quarter (revenue targets if growing, CBS improvement, profit improvement €, cashflow improvement, reserve balance)
- Key milestones (dates when targets should be hit, decision points to review and adjust)
- Success metrics (how will we know it's working?)

**Example Q1 detail:**
```
Week 1–2: Restructure accounts, launch allocation tracking
Week 3–4: First allocation sync (money moves to correct accounts)
Month 1: Weekly check-in on allocation discipline
Month 3: Quarterly review of actual vs. projected results (check CBS progress)
```

**Note on bilingual support:** For DACH market clients (Germany, Austria, Switzerland), use German column names: IST € (Actual €), IST % (Actual %), PS % (Target/Profit Strategy %), PS € (Target €), Delta, Korrektur (AUF = increase, AB = decrease). For international clients, use English headers: Current €, Current %, Target €, Target %, Delta, Adjustment.

#### 6. 12 Profit Points Assessment (3 pages)
- Scorecard table (all 12 points: current score, target, gap, priority)
- Top 3 opportunities (one-pager each):
  - Name and current score
  - Why it's being missed
  - Specific action to improve
  - Expected result (€/month or % improvement)
  - Timeline to target score
- Long-tail opportunities (bulleted summary of points 4–12)

#### 7. Strategic Recommendations (3 pages)
Organized by time horizon, each action formatted as:
```
ACTION: [Specific, verb-forward title]
OWNER: [Name, role]
START DATE: [MM-DD]
DEADLINE: [MM-DD]
RESOURCES NEEDED: [Tools, time, people]
SUCCESS MEASURE: [Quantified metric]
IMPACT: [€/month or % improvement]
```

**Grouping:**
- Immediate actions (Week 1–2): Do before next meeting
- Short-term (Month 1–3): First quarter wins
- Medium-term (Month 3–6): System optimization
- Long-term (Month 6–12): Structural transformation

#### 8. Implementation Roadmap (2 pages)
- Week-by-week first 12 weeks (table: Week | Action | Owner | Status | Blocker)
- Monthly decision gates (when to review data, what to decide)
- Quarterly review cadence (scheduled dates, deliverables, your role)
- Dependency map (which actions must happen in sequence)
- Risk mitigation (what could slow this down, how you'll handle it)

#### 9. Appendix (2–3 pages)
- **A1: Methodology Notes** — How Real Revenue was calculated, how CAPs were derived, how Bleed was computed, data limitations
- **A2: 12 Profit Points Detailed Definitions** — One paragraph per point explaining what it is, why it matters, how it's scored
- **A3: TAPs Reference Table** — Industry-standard allocation percentages for their sector (with source and caveats)
- **A4: Glossary** — Real Revenue, CAP, Bleed, TAP, Profit Points, Account Structure, Allocation %, Emergency Reserve, COGS, Operating Expense
- **A5: Next Steps & Contact** — Next quarterly review date, your contact info, tools/platforms used, client portal link

### Phase 3: Visualizations (1–2 hours)

Create 5–7 core charts:

1. **"CAP Day 1" pie chart** — Current allocation percentages across five categories (Profit, Owner Comp, Tax, Operating, Debt Service). Insight line: "This is where your money goes today."

2. **"TAP Target" pie chart** — Target allocation percentages (side-by-side with CAP Day 1 for direct comparison). Insight line: "This is where your money needs to go to close the Bleed."

3. **Bleed bar chart** — per account: Needed vs. Allocated (what's the gap?). Separate bars for Tax, Profit, Debt Service. Insight line: "The red zone is profit you're leaving on the table every month."

4. **Quarter-over-quarter progression bar chart** — Shows the five allocation categories moving from Current (CAP Day 1) → Q1 → Q2 → Q3 → Q4 → Target (TAP). Each quarter shows stacked or grouped bars for Profit, Owner Comp, Tax, OpEx. Visualizes the rollout journey. Insight line: "Your transition from Day 1 to Target in 12 months."

5. **CBS progress line chart** — Cashflow Business Score trending from Current CBS → Target CBS across quarters. Shows the single headline metric moving upward. Insight line: "Your financial health trajectory."

6. **12 Profit Points scorecard** — bar chart or radar: current vs. target for all 12 points. Highlight top 3 opportunities in color. Insight line: "Where your biggest opportunities for improvement live."

7. **Opportunity impact ranking chart** — Top 5–7 recommendations ranked by €/month impact (bar chart, descending). Color by time horizon (immediate, short-term, medium-term). Insight line: "These actions, in order, will move your CBS highest fastest."

**Design rules:**
- Use client brand colors if possible
- White space matters — don't overcrowd
- Every chart gets a title + one-line insight below it
- No chart without a clear call-out: "This is the problem. This is the opportunity."
- CBS and allocation progression charts are mandatory; others (Points scorecard, Impact ranking) are optional for brief reports but strongly recommended for comprehensive reports.

### Phase 4: Prepare for Walkthrough (1 hour)

1. **Send to client 24–48 hours before meeting** with:
   - Report PDF attached
   - Agenda: "We'll spend 90 minutes reviewing findings, testing your understanding, and locking in first-month actions."
   - Request attendance: "Primary decision-maker + finance lead (whoever handles money)"

2. **Prepare talking points** for each section:
   - What's the key insight they need to remember?
   - What question will they probably ask?
   - What's the most important number to emphasize?

3. **Backup slides ready** for deeper dives:
   - "How we calculated your Real Revenue"
   - "Industry benchmarks explained"
   - "Account structure before/after"

4. **Lock walkthrough date** before sending report (report + walkthrough = one deliverable)

## Output Format

**Deliverable:** One branded PDF document (18–24 pages) organized as follows:

- **Cover Page** — Business name, assessment date, consultant info, confidentiality notice
- **Executive Summary** (1 page) — Standalone asset for distribution to leadership
- **Financial Snapshot** (2 pages) — Current state with visualizations
- **The Bleed Analysis** (2 pages) — Gap diagnosis and root causes
- **Benchmarks** (1 page) — Industry comparison and context
- **Rollout Plan** (2 pages) — Quarter-by-quarter roadmap
- **12 Profit Points Assessment** (3 pages) — Scorecard and top 3 opportunities
- **Strategic Recommendations** (3 pages) — Prioritized action list with owners
- **Implementation Roadmap** (2 pages) — Week-by-week + monthly gates
- **Appendix** (2–3 pages) — Methodology, definitions, reference tables, glossary

**File naming:** `[Client Name] - Profit Strategy Assessment — [Date].pdf`

**Storage:** `/03 - OPERATIONS/[Client Folder]/Reports/`

## Rules (Update When Things Go Wrong)

1. **Never start the report without auditing assessment data first.** Incomplete data = incomplete narrative. You'll have to rewrite half the report. Audit all inputs before opening the template.

2. **Never list all findings equally.** Force yourself to pick top 3. Kill everything else for main narrative. Use appendix for long-tail. Client won't remember 12 findings; they'll remember 3.

3. **Never dump data without narrative.** Numbers without "so what?" = boring. Client disengages. Every number gets a reason. Narrative first. Data supports narrative.

4. **Never create 10+ charts.** Overwhelm and noise. Client misses the point. Stick to 4–6 max. One insight per chart.

5. **Never use consultant-speak** ("leverage," "synergize," "optimize"). Creates distance. Client feels audited, not advised. Use peer language. Short sentences. Direct statements.

6. **Never deliver report without scheduling walkthrough first.** Report sits. Client reads it wrong. No aha moments. Lock walkthrough before sending. Report + walkthrough = one deliverable.

7. **Never present to the wrong audience.** Bookkeeper can't commit to changes. Owner doesn't know report exists. No action. Require owner/primary decision-maker + finance person at walkthrough. Non-negotiable.

8. **Never make recommendations vague or "nice to have."** Client deprioritizes. Nothing happens. Every recommendation must answer: "What will this specifically improve and by how much?" Make the link direct.

9. **Never create a Rollout Plan that's too complex.** Client gets overwhelmed. Stalls after Month 2. Make Q1 detailed and specific (week by week). Q2–Q4 are directional only. You'll refine quarterly. Keep it simple.

10. **Never ghost after delivery.** Schedule quarterly review IMMEDIATELY after walkthrough. Lock the date. Send calendar invite same day. No momentum = no adoption = no data for next review.

11. **When data shows negative profit, frame it as opportunity, not failure.** Negative profit or near-zero profit is common and not shameful — it's the starting point for transformation. In the Executive Summary, lead with: "[Company] is currently allocating [X]% of revenue to Profit, which shows a structural gap in account allocation. This isn't a judgment; it's the baseline. Our roadmap moves Profit allocation from [negative/X]% to [Target]% by [Quarter], reclaiming €[amount]/month." Use language like "starting point," "structural gap," "immediate opportunity," never "problem" or "failure." Negative profit opens the door to the biggest impact transformations.

## Self-Improvement

When a client gives feedback on the report:
- Note which findings landed most strongly (save as template language for future reports)
- Capture any "aha moment" language that worked (update Executive Summary examples)
- If a client struggled with a concept, make the explanation clearer in the Appendix

When a client executes on recommendations post-walkthrough:
- Note which specific actions had fastest adoption (update the Recommendations section template)
- Track what % of top 3 were implemented by Month 1 (if <70%, the report narrative wasn't compelling enough — strengthen next time)
- Document what worked in your talking points (update Phase 4 backup slides)

This skill is never finished. The more you use it with real clients, the sharper the narrative and the higher the adoption rate.
