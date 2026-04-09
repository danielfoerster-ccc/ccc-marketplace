---
name: ccc-cashflow-cost-audit
description: "Guides business owners and consultants through a systematic, four-phase expense audit using the PRUN Formula. Classifies every recurring business expense as Fat (unnecessary), Muscle (revenue-generating), or Bone (structural necessity), then builds a lean operating budget that fits within the Profit First OpEx allocation. Best for: companies with OpEx pressure, post-assessment cost optimization, consultant-led audits. Use this skill whenever the user mentions cost cutting, expense optimization, reducing overhead, tightening OpEx, building a budget within a specific allocation, PRUN formula, Fat Muscle Bone, expense classification, reduce operating expenses, cut costs, OpEx too high, budget audit, expense review, or lean budget."
allowed-tools: "Read, Write, Edit, Bash"
---

## Workflow: PRUN Formula Cost Audit

Guides the user through a disciplined, four-phase expense classification and lean budget construction. Transforms emotion-driven cost cutting into systematic architecture: classify first, decide second, execute third. Outputs a documented lean operating budget proven to fit within OpEx constraints.

---

## Mode Detection

**Ask at the start:** "Are you running this audit for yourself or a client?"

- **Self-service mode**: You guide the business owner through the four phases with their own data. The user builds the inventory; Claude asks clarifying questions and handles classification.
- **Consultant mode**: You're helping a consultant deliver this to a client. Same four phases, but with explicit client communication points and deliverable staging.

Both paths produce the same outputs; communication style differs.

---

## The Four Phases

### Phase 1: Expense Inventory (90–120 minutes)

**Goal:** Complete visibility. Surface hidden costs. Establish baseline against which to measure cuts.

**Steps:**

1. **Gather expense data** — Ask the user for sources:
   - Last 12 months of bank statements + corporate card
   - Accounting software export (P&L, expense breakdown) if available
   - Subscription manager tool or manual list
   - Payroll software (team roster with salaries/benefits)
   - Email search for "invoice from:" to find forgotten subscriptions
   - Contracts with renewal dates and termination clauses

2. **Build the expense sheet** — Create a spreadsheet with these columns:
   - Vendor | Category | Monthly Cost | Annual Cost | Frequency | What It Delivers | Who Uses It | Contract Details | Notes

3. **Use standard categories** — Help the user sort expenses into:
   - Team & Payroll
   - Rent & Office
   - Software & SaaS Tools
   - Marketing & Ads
   - Infrastructure & Hosting
   - Insurance
   - Professional Services
   - Travel
   - Subscriptions & Memberships
   - Equipment & Hardware
   - Other

4. **Sort by cost (Pareto principle)** — Identify the top 20% of expenses by count; they'll be 60–80% of OpEx. Focus energy there.

**Example OpEx Breakdown (€16,456/month total):**
When you complete the inventory, you'll see a breakdown like this:
- Team Member A: €2,800 (17%)
- Team Member B: €5,000 (30%)
- Fixed costs (rent, insurance): €1,200 (7%)
- Advisory board: €2,333 (14%)
- Miscellaneous: €3,000 (18%)
- Other: €2,123 (13%)

This is what a complete, categorized expense inventory looks like. Use it as your reference for what the final Phase 1 output should contain.

5. **Document contract terms** — For every expense over €500/month annual cost:
   - Termination notice period
   - Next renewal date
   - Lock-in period
   - Downgrade options
   - Renegotiation triggers

**Deliverable:** Complete expense inventory spreadsheet, sorted by cost, categorized, with contract terms documented.

---

### Phase 2: PRUN Classification (60 minutes)

**Goal:** Diagnostic accuracy. Move from gut feeling to systematic decision framework.

**Definitions** (customize language to user context, keep logic intact):

**FAT (Cut)**
- Unused for 30+ days (tool), 2+ weeks (Slack), or never used
- Duplicate tool (multiple project managers, multiple email services)
- Premium tier when basic suffices
- "Nice to have" with no ROI tracking
- Legacy expense from old strategy
- Ego/vanity purchase (expensive coffee, branded merch)
- Threshold: "Would I buy this again today knowing what I know?" No = Fat.

**MUSCLE (Keep/Strengthen)**
- Used daily by core team
- Directly generates leads or customers (with trackable ROI)
- Enables delivery of revenue-generating products/services
- Productive team member
- Clear ROI (€5K spent → €25K revenue)
- Threshold: "If cut, would revenue drop within 60 days?" Yes = Muscle.

**BONE (Protect)**
- Legally required or protects company from liability
- Core infrastructure (domain, hosting, internet, security)
- Cannot be substituted or moved easily
- Minimum viable team + payroll for operations
- Threshold: "If cut, would business become inoperable or exposed?" Yes = Bone.

**Classification process:**

1. Use the decision tree in `references/prun-decision-tree.md` to classify each expense.
2. Go through the full inventory and sort each line into FAT / MUSCLE / BONE with rationale.
3. Shadow review: second pass to catch emotional attachments and biases. Adjust ~5–15% of classifications.

**Deliverable:** PRUN Classification spreadsheet with every expense marked FAT / MUSCLE / BONE + brief rationale.

---

### Phase 3: Decision Matrix (60–90 minutes)

**Goal:** Move from diagnosis to treatment. Turn "I know this is Fat" into "I will cancel it by [date] and save €X/month."

**For FAT expenses — execute in order:**

1. Can it be cancelled immediately (no contract, month-to-month)?
   - YES → Schedule cancellation this week. Done.
   - NO → Continue.

2. Is it under contract? When does it end?
   - YES → Mark termination date on calendar. Set 30-day reminder. Add to "waitlist" column.
   - NO → Continue.

3. Can it be downgraded to cheaper tier without losing core functionality?
   - YES → Downgrade this week. Save €X/month.
   - NO → Continue.

4. Can it be renegotiated lower?
   - YES → Call vendor this week. (See SOP Appendix C for scripts.)
   - If refuse → Move to cancellation.
   - NO → Cancel.

Create FAT Execution Table:
| Vendor | Current Cost | Action | Target Date | Owner | Status |

**For MUSCLE expenses — optimize without cutting:**

1. Is ROI being tracked?
   - NO → Set up tracking this week. Can't keep blind spending.
   - YES → Continue.

2. Could it be cheaper at another vendor?
   - YES → Run 2-week trial. If equivalent → switch.
   - NO → Continue.

3. Is pricing competitive (annual vs. monthly, volume discounts)?
   - NO → Renegotiate or switch. Most SaaS has 15–25% savings available.
   - YES → Keep as-is.

4. Used at planned capacity?
   - UNDERUTILIZED → Downgrade to tier matching actual usage.
   - OPTIMIZED → Keep.

Create MUSCLE Optimization Table:
| Vendor | Current Cost | Optimization | Potential Savings | Owner | Status |

**For BONE expenses — protect, negotiate for better terms:**

1. Is the pricing competitive?
   - NO → Renegotiate at renewal. Collect quotes from competitors.
   - YES → Protect as-is.

2. Can contract terms be improved?
   - YES → Negotiate longer term for discount, or flexible payment.
   - NO → Protect as-is.

**Deliverable:** Complete Decision Matrix with actions, target dates, and owners assigned to every expense.

---

### Phase 4: Lean Budget Calculation & Implementation (60 minutes)

**Goal:** Prove the expense model works within OpEx allocation. Execute cuts systematically.

**Critical Connection:** Your OpEx allocation from the Instant Assessment is your budget ceiling. The PRUN audit's job is to make actual OpEx fit under that ceiling. This phase confirms that the classified expenses (Muscle + Bone) land within the target, with Fat removed.

**Calculation:**

1. Sum all MUSCLE + BONE expenses = **New Minimum OpEx**.
2. Compare to OpEx allocation target (from Instant Assessment or Profit First framework).
3. If over allocation:
   - DON'T cut BONE (it damages structure).
   - Optimize MUSCLE further: renegotiate, find cheaper alternatives, downgrade underutilized tools.
   - Only after Muscle optimization is complete, revisit borderline Muscle/Fat classifications.
4. If under allocation:
   - Document the buffer. Consider strategic growth in high-ROI Muscle (sales tools, client delivery).

**Build Lean Operating Budget document:**

```
LEAN OPERATING BUDGET — [Company Name]
Audit Date: [YYYY-MM-DD]

BONE (Protect)
| Expense | Monthly | Annual | Rationale |
| ---|---|---|---|
| [Items classified as Bone] | | | |

**Subtotal BONE:** €X/month, €Y/year

MUSCLE (Keep/Optimized)
| Expense | Monthly | Annual | Optimization |
| ---|---|---|---|
| [Items classified as Muscle] | | | [Any downgrades/renegotiations] |

**Subtotal MUSCLE:** €X/month, €Y/year

**Total Lean OpEx:** €Z/month, €A/year

FAT REMOVED (Execution Plan)
| Vendor | Monthly Savings | Action | Target Date | Owner |
| ---|---|---|---|---|
| [Items cut] | €X | [cancel/downgrade] | [date] | [owner] |

**Total FAT Savings:** €B/month, €C/year

BUDGET COMPARISON
| Metric | Amount |
| ---|---|
| Previous OpEx | €X |
| New Lean OpEx | €Y |
| Savings | €Z |
| Savings % | X% |
| Buffer for Growth | €? |

IMPLEMENTATION TRACKER
- Week 1: [All month-to-month cancellations executed]
- Week 2: [All downgrades executed]
- Week 3–4: [Renegotiations in progress]
- Day 30: [Savings validation — confirm all cuts processed]
```

**Implementation rhythm:**

- **Week 1:** All month-to-month FAT cuts (immediate cancellations).
- **Week 2:** All downgrades executed.
- **Week 3–4:** Renegotiations and contract terminations initiated.
- **Day 30:** Validate savings achieved. Track all changes on implementation tracker.

**Deliverable:** Documented lean operating budget + implementation tracker with progress updates weekly.

---

## Rules (Update When Things Go Wrong)

1. **Never cut expenses without PRUN classification first.** Gut-driven cost cutting always cuts Muscle (revenue tools) while protecting Fat (vanity expenses). The framework prevents emotion from overriding logic.

2. **Never cut BONE.** Bone expenses protect operations, compliance, or team structure. Cutting Bone feels good short-term but breaks the business long-term. If OpEx doesn't fit, optimize Muscle — don't damage Bone.

3. **Always require the 90-day revenue test for borderline expenses.** If you can't answer "Would revenue drop within 90 days if this disappeared?" with confidence, reclassify. Muscle/Bone are revenue-related or structural; Fat is neither.

4. **Never accept "we might use it someday" as a reason to keep Fat.** That's the definition of Fat. If it hasn't been used in 30+ days, it's cancelled unless there's a specific, documented reason (e.g., seasonal expense, annual software renewal used once a year — but even then, consider if that's really Muscle).

5. **Always document contract terms before deciding actions.** You can't cut an expense locked for 6 months — you just add it to the termination calendar. Know the constraints before committing to a timeline.

6. **Renegotiation happens BEFORE cancellation, not after.** Most vendors will discount 10–20% to keep a customer. Try this first for borderline expenses. Only cancel if they refuse.

7. **For consultants: Share the decision matrix with the client before execution.** Don't surprise them with cancellations. PRUN is subjective at boundaries — get client buy-in on the Muscle/Bone lines, especially for larger expenses.

8. **Track savings relentlessly.** Without proof that cuts achieved the target, the exercise loses credibility. Compare previous OpEx (actual bank statements) to new OpEx (actual processed cuts) 30 days in.

9. **Never let new expenses sneak in during the audit.** If the user proposes "just one more subscription" while building the budget, add it to inventory and reclassify. Otherwise, OpEx creep undoes the savings.

10. **Quarterly refresh is mandatory.** Run a PRUN refresh every 90 days, aligned with the quarterly review cycle. New expenses creep in — subscriptions, tools, one-time costs that become recurring. The quarterly refresh catches them before they compound. Make it a standing ritual, not a one-time event.

---

## Self-Improvement

When a user corrects a classification or identifies a failure mode:
- Add the pattern to the Rules section above
- Document what the misclassification was and what clarified it

When a user approves a final budget and confirms savings were achieved:
- Note which PRUN definitions were clearest
- Save a copy of the completed decision matrix as a reference example
- If the user's business model is repeatable (e.g., a CCC client), save anonymized classifications for that industry

This skill is never finished. Each audit makes it smarter for the next one.

---

## Reference Files

- **`prun-decision-tree.md`** — Full PRUN decision tree and expense classification guide. Load when classifying Phase 2.
- **SOP source:** `02 - MISSION CONTROL/SOPs & Playbooks/Cashflow Management/SOP PRUN Formula Cost Audit — CCC 2026-04-08.md` (for extended examples, scripts, and appendices)
