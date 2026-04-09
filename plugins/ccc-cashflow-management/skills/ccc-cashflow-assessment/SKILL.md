---
name: ccc-cashflow-assessment
description: "Runs the Profit First Instant Assessment — the foundational cashflow diagnostic for CCC clients. Gathers 12 months of financials, calculates Real Revenue, computes Current vs. Target Allocation Percentages (CAPs vs. TAPs), identifies The Bleed (allocation gap), and designs phased rollout plan. Transforms raw financial data into clear diagnosis: where money actually goes vs. where it should go. Calculates CBS (Cashflow Business Score) for single-number health metric. Handles VAT/MwSt for DACH businesses. Triggers: 'cashflow assessment', 'profit first assessment', 'where is my money going', 'cash flow diagnosis', 'allocation analysis', 'bleed analysis', 'instant assessment', 'financial health check', 'cashflow diagnosis', 'CBS score', 'cashflow development tool', 'CDT setup', 'revenue diagnosis'."
allowed-tools: "Read, Write, Edit, Bash"
---

**Workflow: Interview → Calculate → Diagnose → Plan.** Transforms 12 months of financial data into a precise diagnosis of allocation health and a phased transformation roadmap.

# Profit First Instant Assessment

**One-line:** Transforms 12 months of financial data into a precise diagnosis of allocation health and a phased transformation roadmap.

---

## Overview

The Instant Assessment answers the question every founder asks but few can answer with precision: *Where is my money actually going, and where should it go?*

This skill runs the complete six-phase diagnostic:

1. **Data Gathering** — Collect 12 months of clean financial data (or verify what founder provides)
2. **Real Revenue Calculation** — Extract true operating revenue (Total Revenue - Materials/Subcontractors)
3. **Current Allocations (CAPs)** — Calculate what % of Real Revenue flows to Profit, Owner's Comp, Tax, and OpEx
4. **Target Allocations (TAPs)** — Look up benchmarks for the revenue tier (based on Mike Michalowicz's Profit First system)
5. **The Bleed Analysis** — Calculate gaps between CAPs and TAPs; identify the most critical diagnosis
6. **Rollout Plan** — Design quarterly moves (1-3% per quarter) to close The Bleed over 4–8 quarters

The output is a diagnostic document that founders understand deeply and can act on immediately.

---

## Dual Audience Mode

### Consultant Mode
Running the assessment **with a client** during a paid engagement. More structured, more documentation, produces a deliverable.
- Data gathering is formal (accounting software access, data audit checklist)
- Each phase is documented and signed off
- Output: Assessment Report saved to project folder
- Typically 2 sessions, 130 minutes total

### Self-Service Mode
Business owner running the assessment **for themselves** with Claude's guidance. More narrative-driven, more explanation of why each step matters.
- Data gathering is conversational; suggest ways to gather from bank exports, accounting software, or manual entry
- Explanations are built in throughout
- Output: Assessment summary suitable for personal vault or team sharing
- Typically 1–2 sessions, 60–90 minutes total

Detect the mode from context: *Is this a CCC client with a contract, or is the founder exploring solo?*

---

## Quick Mode vs. Full Mode

**Full Mode:** Complete 12 months of data, all four allocations calculated, full TAPs analysis, detailed rollout plan. Use for high-stakes engagements.

**Quick Mode:** Summary financials (4-quarter data or annual totals), fewer questions, same core calculations. Use for initial screening or health check. Produces a lighter diagnosis but same methodology.

Ask upfront: *"Do you have 12 months of detailed monthly financials, or would a quicker summary-based assessment work better?"*

---

## Core Methodology: Interview → Calculate → Diagnose → Plan

### PHASE 1: Data Gathering (40 min in consultant mode, 20 min in self-service)

**Goal:** Get 12 months of clean financial data. Most assessments fail here — incomplete or miscategorized data = false diagnosis.

**Steps:**

1. **Clarify data source:**
   - If consultant mode: Request accounting software access (QuickBooks, Xero, Freshbooks, Wave, DATEV, Billomat, Lexoffice)
   - If self-service: Ask what's available (bank exports, accounting software, spreadsheet, accountant summary)

2. **Gather the essentials:**
   - P&L for 12 months (or 4 quarters, with monthly detail if possible)
   - Balance sheet snapshot (current month)
   - Cash flow statement (if available; we'll reconstruct if needed)

3. **Data quality audit:**
   - Are all 12 months present? (No unexplained gaps)
   - Is revenue realistic? (No suspicious months of zero)
   - Are expense categories consistent month-to-month?
   - Are "Other" / "Miscellaneous" buckets < 5% of revenue?
   - Does the founder agree the data reflects reality?

4. **Decision point:**
   - **If data is clean:** Proceed to Phase 2
   - **If data has gaps:** Create a data cleaning task. Reschedule assessment. Do not force a false diagnosis.

### PHASE 2: Real Revenue Calculation (15 min)

**Goal:** Calculate the TRUE operating revenue. This is critical — most founders conflate gross revenue with operating revenue.

**Why this matters:** If you bill €100K but subcontract €70K of work, your Real Revenue is €30K, not €100K. Using gross revenue would make the business look healthier than it actually is.

**Formula:**
```
Real Revenue = Total Revenue - Materials & Subcontractors
```

**Materials & Subcontractors** = costs passed through to clients (COGS for products; freelancer costs for services). Does NOT include employee payroll or your own operating costs.

**Steps:**

1. Extract Total Revenue from P&L (sum of 12 months)
2. Identify Materials & Subcontractors:
   - For agencies: Freelancer costs, media spend billed to clients, white-label services, tools/licenses passed through
   - For product: COGS, raw materials, manufacturing
   - For pure service (coaching, consulting): Usually minimal or zero
3. Calculate: Real Revenue = Total Revenue - Materials & Subcontractors
4. Validate with founder: "Does this Real Revenue number feel right?"

**Document the result.** Real Revenue is the only valid denominator for everything that follows.

**For DACH Businesses (Germany, Austria, Switzerland):**

Add a decision point before calculating Real Revenue:

**Does your business charge MwSt/VAT?**
- If YES (standard business): Deduct MwSt from Total Revenue BEFORE calculating Real Revenue. Formula becomes:
  ```
  Real Revenue = Total Revenue - MwSt - Materials & Subcontractors
  ```
  This accounts for VAT obligations that reduce operating cash. MwSt is typically listed separately on your P&L or accounting software.

- If NO (Kleinunternehmer exemption or reverse-charge model): Proceed with standard formula:
  ```
  Real Revenue = Total Revenue - Materials & Subcontractors
  ```

**Note:** This aligns with Daniel Förster's CDT (Cashflow Development Tool) which has a dedicated MwSt row. If founder is using CDT simultaneously, ensure both calculations match the same VAT treatment.

### PHASE 3: Current Allocation Percentages (CAPs) — (20 min)

**Goal:** Extract from actual 12-month data what percentages went to Profit, Owner's Comp, Tax, and OpEx. This is the truth about how the business currently runs.

**Steps:**

1. **Extract Profit** — Net income (bottom of P&L, after all expenses). If the founder took draws/dividends outside the P&L, add those back. Profit = what stayed in the business + what was distributed.

2. **Extract Owner's Compensation** — Everything paid to the founder: salary, draws, dividends, benefits (health insurance, car allowance, phone), bonuses. Add them all up. Most founders forget benefits.

3. **Extract Tax** — Actual tax paid or reserved (income tax, VAT, social contributions, corporate tax). Use actual paid/reserved, not an estimated rate.

4. **Extract Operating Expenses** — Everything else: payroll (excluding owner), rent, software, marketing, insurance, professional services, travel, etc.

5. **Calculate CAPs:**
   ```
   CAP % = (Actual Amount ÷ Real Revenue) × 100%
   ```
   
   Verify that CAPs sum to 100%. If not, recalculate.

6. **Calculate CBS (Cashflow Business Score):**
   ```
   CBS = Profit% + Owner's Comp% + Tax%
   ```
   
   CBS is a single health score (0–100%) that measures how much of Real Revenue actually flows to the founder's benefit (profit + pay + taxes paid). Higher CBS = healthier business for the founder.
   
   **Example:** A €1.2M Real Revenue business with 8% Profit, 25% Owner's Comp, and 15% Tax CAPs has a CBS of 48%. This means €576K (48% of €1.2M) flows to the founder's benefit annually.
   
   CBS serves as a quick diagnostic metric: Does the founder have enough personal compensation + profit reinvestment + tax coverage? If CBS is below 30%, the founder is severely under-compensated or the business is unprofitable.

**Document clearly.** CAPs are the baseline of where money actually goes. CBS is the health snapshot.

### PHASE 4: Target Allocation Percentages (TAPs) — (10 min)

**Goal:** Look up healthy benchmarks for the revenue tier. TAPs are not law, but they guide the diagnosis.

**Steps:**

1. **Identify Real Revenue tier:**
   - €0–250K (Tier A): Pre-seed, solo founder
   - €250K–500K (Tier B): Growth-stage, first team
   - €500K–1M (Tier C): Scaling, established team (MOST COMMON CCC CLIENT)
   - €1M–5M (Tier D): Established business
   - €5M–10M (Tier E): Enterprise-adjacent
   - €10M+ (Tier F): Large business

2. **Look up standard TAPs** for that tier (see references/taps-table-and-calculations.md for full table)

3. **Optional: Adjust TAPs** for:
   - Industry norms (consulting may run higher OpEx than standard)
   - Business stage (growth-phase businesses may allocate differently)
   - Founder's personal situation (e.g., if founder has outside income, may lower Owner's Comp target)
   - Jurisdiction (Germany/DACH, US, other — tax rates vary)

4. **Get founder sign-off:** "Do these targets feel realistic for your business in 12–24 months?"

**Lock the TAPs.** Don't let them shift week-to-week; they're the reference point for diagnosis.

### PHASE 5: The Bleed Analysis — (15 min)

**Goal:** Calculate the gap between current (CAPs) and target (TAPs). This is the diagnosis — the precise specification of what needs to change.

**Steps:**

1. **Create the Bleed table:**
   ```
   The Bleed = TAP - CAP (for each allocation)
   
   - Positive Bleed: Under-allocating; need to INCREASE
   - Negative Bleed: Over-allocating; need to DECREASE
   ```

2. **Example:** If Profit CAP is 8% and Profit TAP is 15%, then Profit Bleed is +7% (need to increase profit allocation by 7 percentage points).

3. **Write the Bleed narrative:**
   - Identify the #1 most critical Bleed
   - Explain in plain language what it means
   - Example: "The founder is extracting €100K from a €250K real revenue business. This is over-leveraging. Owner's Comp should drop to €50K, freeing €50K for reinvestment."

4. **Calculate CBS Bleed (additional metric):**
   - Current CBS: Sum of actual Profit% + Owner's Comp% + Tax% CAPs
   - Target CBS: Sum of target Profit% + Owner's Comp% + Tax% TAPs
   - CBS Bleed: Target CBS - Current CBS
   
   Interpret: "Your current CBS is 35%. To reach a healthy business, your CBS should be 50%. This means you need to free up an additional 15 percentage points for founder benefit through the quarterly moves outlined in the rollout plan."

5. **Get founder acknowledgment:** "Does this diagnosis match what you felt intuitively?"

**The Bleed is not judgment; it's precision.** CBS gives the founder a single number to track improvement.

### PHASE 6: Rollout Plan Design — (30 min)

**Goal:** Create a quarterly roadmap that moves allocations incrementally from CAP toward TAP. Never jump to TAPs overnight; phase in gradually.

**Steps:**

1. **Decide on aggressiveness:**
   - **CONSERVATIVE (1% per quarter):** 8–16 quarters to reach TAPs. Best for cash-tight businesses, new founders, high risk aversion.
   - **MODERATE (2% per quarter):** 4–8 quarters. Balanced pace. Most common.
   - **AGGRESSIVE (3% per quarter):** 3–4 quarters. Fast change. Requires strong cash reserves and founder commitment.

   Guidance: Check founder's cash reserves (1-2 months = conservative; 3-6 months = moderate; 6+ = moderate/aggressive). Check founder's commitment and risk tolerance.

2. **Choose rollout method:**

   **Option A: Auto-Calculated Rollout (Linear)**
   - System automatically distributes the quarterly moves evenly across all quarters.
   - Example: If Profit needs to move from 8% to 15% (+7%) over 8 quarters at MODERATE pace, each quarter increases exactly 2%.
   - Pros: Predictable, simple to track, no guesswork.
   - Cons: Doesn't account for business seasonality or specific events (hiring dates, new contracts, seasonal cash crunches).
   
   **Option B: Manually Adjusted Rollout (Customized)**
   - Consultant or founder customizes quarterly allocation moves based on real-world business dynamics.
   - Example: "Q1 conservative (1% increase) due to seasonal revenue dip. Q2–Q3 aggressive (3% each) after major contract begins. Q4 moderate (2%) due to holiday patterns."
   - Pros: Aligned with actual cash flows, accounts for hiring plans, contract cycles, market seasonality.
   - Cons: Requires more planning upfront; needs deeper business knowledge.

   **Recommendation:** Start with auto-calculated as the baseline. Then manually adjust if founder has strong conviction about quarterly cash availability or planned business events.

3. **Project quarterly allocations** for each allocation independently:
   - Example: Profit CAP 8% → 10% → 12% → 14% → 15% (4 quarters at +2%/quarter)
   - Owner's Comp CAP 40% → 38% → 36% → 34% → 32%... (continues until TAP reached)
   - Other allocations follow similar logic
   
   If using manually adjusted method, modify the % moves for specific quarters to match business realities.

3. **Convert to dollar amounts:**
   - For a €250K real revenue business with 2%/quarter aggressiveness:
     - Q1: Profit €25K, Owner €95K, Tax €35K, OpEx €100K
     - Q2: Profit €30K, Owner €90K, Tax €38K, OpEx €102K
     - (And so on)

4. **Write the quarterly narrative:**
   - What happens each quarter in plain language?
   - Which team members get hired?
   - Which owner comp changes?
   - Example: "Q1: You reduce owner draw from €100K to €95K. Q2: You hire your first junior team member. Q3: Add an ops person. By Q4, you have a small team and are operationally leveraged."

5. **Specify in-quarter actions:**
   - Exact dates for owner comp reduction
   - Specific OpEx increases (new tools, new hires)
   - Verification checkpoints at quarter-end (P&L check, cash check)

6. **Optional: ZIEL (Goal) Planning — Reverse Revenue Target**

   After the rollout plan is locked, offer a revenue target scenario:

   **"What is your target monthly owner compensation?"**
   - Example: Founder answers "I want €20K gross per month."
   - Back-calculate required Real Revenue:
     ```
     If Owner's Comp TAP = 10% and target = €20K/month:
     Required monthly Real Revenue = €20K ÷ 10% = €200K
     Required annual Real Revenue = €2.4M
     ```
   - Interpretation: "To reach your €20K/month owner comp target, the business needs to hit €2.4M annual Real Revenue. Current Real Revenue is €1.2M, so you need to grow ~2x. The allocation changes will help optimize what you extract NOW, but revenue growth will get you to the target."

   **Document this ZIEL alongside the rollout plan.** It gives the founder a dual-track objective: (1) Optimize allocations through the rollout; (2) Grow revenue toward the ZIEL.

   This aligns with Daniel Förster's CDT framework, which tracks both TATSÄCHLICH (actual) and ZIEL (goal) scenarios.

7. **Get founder signature:**
   - Confirm aggressiveness level
   - Confirm timeline
   - Confirm quarterly actions
   - Confirm quarterly verification checkpoints
   - If ZIEL planning included: Confirm target owner comp and required revenue milestone

---

## Output & Deliverables

### Consultant Mode Deliverable: Assessment Report

A comprehensive document (8–12 pages) containing:
- Executive summary (one-page overview of diagnosis and rollout)
- All 6 phases with calculations, tables, and notes
- Real Revenue calculation (with founder sign-off)
- CAPs and TAPs tables (with founder sign-off)
- The Bleed analysis (with narrative interpretation)
- Quarterly rollout plan (with founder aggressiveness sign-off)
- Next steps and implementation timeline

**Saved to:** CCC project folder for the client
**Format:** PDF or Word doc
**Signatures:** Founder confirms data accuracy and rollout aggressiveness

### Self-Service Mode Deliverable: Assessment Summary

A working document (4–6 pages) containing:
- Quick narrative of what the assessment revealed
- Real Revenue number
- CAPs summary table (including CBS)
- TAPs selection and rationale
- The Bleed narrative (3–4 sentences on diagnosis)
- Quarterly rollout table (% allocations + key actions)
- ZIEL (Goal) revenue target (if planning completed)
- Guidance on next steps (quarterly reviews, implementation)

**Saved to:** Founder's personal vault / system
**Format:** Markdown or plaintext
**Signatures:** Optional (personal document)

### CDT (Cashflow Development Tool) Export Guidance

If the founder is using Daniel Förster's CDT spreadsheet alongside this assessment, provide export data in CDT format:

**TATSÄCHLICH (Actual) Section — 12-month actuals:**
- Umsatz (Total Revenue)
- Material und Subunternehmer (Materials & Subcontractors)
- MwSt (VAT) — if applicable
- Real-Umsatz (Real Revenue)
- Gewinn (Profit)
- Unternehmer-Gehalt (Owner's Compensation)
- Steuern (Tax)
- Betriebskosten (Operating Expenses)

**Monthly breakdown (TATSÄCHLICH monatlich):**
- Same line items broken into 12 monthly columns

**ZIEL (Goal) Section — if revenue target planning completed:**
- Target Real-Umsatz (target Real Revenue)
- Implied monthly allocations for the ZIEL scenario

This ensures the assessment integrates seamlessly with the CDT for ongoing quarterly tracking and updates.

---

## Decision Points & Workflow Branches

```
START
  ↓
[Detect mode: Consultant or Self-Service?]
  ├─→ CONSULTANT MODE
  │    ├─ Formal data gathering (accounting software access)
  │    ├─ Data audit checklist
  │    ├─ If clean → proceed
  │    └─ If gaps → data cleaning subtask + reschedule
  │
  └─→ SELF-SERVICE MODE
       ├─ Conversational data gathering (what do you have?)
       ├─ Informal validation (does this feel right?)
       └─ Proceed as far as possible with available data

[Is 12-month data available? Quick mode or Full mode?]
  ├─→ Full mode: 12 months monthly detail
  └─→ Quick mode: Annual or 4-quarter summary

[PHASES 2-5: Calculate, compare, diagnose]

[PHASE 6: Rollout plan]
  ├─→ [Check cash reserves and founder commitment]
  ├─→ [Choose aggressiveness: Conservative / Moderate / Aggressive]
  └─→ [Project 4-8 quarters of allocation movement]

[Get founder sign-off on TAPs and rollout aggressiveness]

[Produce deliverable: Report (consultant) or Summary (self-service)]

END
```

---

## Rules & Failure Modes

1. **Never calculate CAPs/TAPs without verified Real Revenue.** Garbage in, garbage out. If founder can't confirm Materials & Subcontractors, stop and ask clarifying questions.

2. **Never proceed to rollout plan if founder doesn't understand The Bleed.** Ask: "Can you explain in your own words what The Bleed means for your business?" If answer is vague, revisit the diagnosis narrative.

3. **Never use estimated tax rates instead of actual paid/reserved tax.** If founder hasn't paid tax yet, get accountant's estimate in writing.

4. **Never let TAPs shift mid-assessment.** Once locked, they stay locked. Adjustments are documented as assumptions, not changes.

5. **Never force a rollout plan timeline if founder's cash reserves don't support it.** If cash is tight (< 2 months), default to CONSERVATIVE (1% per quarter) even if founder wants faster.

6. **Never skip founder acknowledgment of The Bleed.** If founder doesn't accept the diagnosis, something is misaligned in earlier phases. Revisit CAPs or TAPs.

7. **Never create a rollout plan without quarterly action items.** "Profit increases 2%" is vague. "Owner reduces draw from €100K to €98K in Q1" is actionable.

8. **Never leave the assessment without a next-step milestone.** Schedule quarterly review call, implementation kickoff, or follow-up check-in. The assessment is diagnostic; implementation is separate.

9. **When Profit CAP is 0% or negative (business is losing money):**
   - **Do not panic the founder.** Frame this as: "This is common — most businesses we work with start here. The assessment reveals what's hidden so we can fix it."
   - **Set Profit TAP conservatively.** Don't use the standard benchmark. Start the rollout plan at 1–2% Profit in Q1, gradually building toward a realistic positive number. A business losing money may reasonably target 2–5% Profit as the first milestone (not 15%).
   - **Prioritize OpEx reduction.** When Profit is negative, the rollout plan's first moves should focus on identifying and cutting operating expense waste (the Cost Audit is a natural follow-up skill). Profit increases come after OpEx stabilizes.
   - **Validate revenue quality.** Sometimes negative profit signals a deeper issue: unprofitable customers, underpriced services, or misclassified expenses. Ask: "Are there specific customers or projects that lose money? Are any service lines systematically underpriced?"
   - **Document the edge case clearly.** Note in the assessment: "Profit is currently negative. The rollout plan focuses on OpEx optimization in Q1–Q2, with profit recovery beginning in Q3."

---

## Self-Improvement Rules

After each assessment, evaluate:

1. **Did founder understand Real Revenue?** If not, improve the explanation. (The Bleed is invisible without a correct Real Revenue anchor.)

2. **Did founder feel the diagnosis was accurate?** If not, investigate: Were CAPs miscalculated? Was a TAP tier wrong? Was there hidden data we missed?

3. **Is the founder likely to execute the rollout plan?** If confidence is low, was aggressiveness set correctly? Does founder need phased implementation support? (If yes, recommend CCC Quarterly Review skill or ongoing advisory.)

4. **What financial data was hardest to gather?** Note patterns: Do founders struggle with Materials & Subcontractors categorization? Owner's Comp extraction? This informs our data request templates.

5. **Did the rollout plan timeline match founder's expectations?** If founder expected faster progress, was our MODERATE (2%) too conservative? If slower, was AGGRESSIVE (3%) too risky?

6. **Would a visual dashboard or spreadsheet version help founder tracking?** After assessment, some founders benefit from a live quarterly tracker (reference: CDT — Cashflow Development Tool in vault).

---

## Success Criteria

Assessment is **successful** when:

- [ ] Real Revenue verified (founder confirms accuracy)
- [ ] MwSt/VAT decision documented (if DACH business)
- [ ] CAPs calculated from actual 12-month data (spot-check at least 3 months)
- [ ] CBS (Cashflow Business Score) calculated and interpreted
- [ ] TAPs tier correctly selected based on actual Real Revenue
- [ ] The Bleed calculated for all 4 allocations + CBS Bleed
- [ ] Founder understands The Bleed (self-reported 8+/10 confidence)
- [ ] Rollout plan method chosen (auto-calculated or manually adjusted)
- [ ] Rollout plan spans minimum 4 quarters
- [ ] Aggressiveness level chosen and documented
- [ ] ZIEL (revenue target) planning completed or deferred with documentation
- [ ] Founder signed off on TAPs and rollout plan
- [ ] If using CDT: Export data formatted for CDT integration
- [ ] Deliverable saved to appropriate location (project folder for consultant; vault for self-service)
- [ ] Next milestone scheduled (quarterly review, implementation, or follow-up)

---

## Connection to Other Skills

- **ccc-cashflow-client-onboard:** Runs before assessment; establishes context, contract, financial access
- **ccc-cashflow-quarterly-review:** Runs after assessment; tracks progress against rollout plan, adjusts allocations
- **ccc-cashflow-report:** Wraps assessment data into strategic narrative (Profit Strategy Assessment document)
- **ccc-cashflow-cost-audit:** Digs deeper into OpEx during rollout (identify efficiency gains)
- **ccc-cashflow-profit-points:** Maps The Bleed to the 12 Profit Points for targeted optimization

---

## References

Full TAPs table, calculation templates, and worked examples: `references/taps-table-and-calculations.md`
