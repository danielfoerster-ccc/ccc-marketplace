---
name: ccc-cashflow-setup
description: "Guides Profit First account structure setup: primary bank selection (5 core accounts), secondary bank selection (2 savings accounts), Materials & Subcontractors decision, MwSt/VAT decision (DACH), first allocation execution, and 10/25 rhythm establishment. Consultant or self-service mode. Triggers: 'set up profit first accounts', 'open profit first bank accounts', 'cashflow account structure', 'first allocation', 'profit first setup', 'account architecture', 'allocation rhythm', 'bank account setup', 'Profit First accounts', 'open new accounts', 'allocation accounts', 'multi-account structure', '5 account model', 'income account setup', 'separate accounts for profit'. Complete Steps 3+4 of Profit First implementation in 2–3 weeks."
allowed-tools: "Read, Write, Edit, Bash"
metadata:
  author: Daniel Förster, Claude Cowork Consultants
  version: 1.0.0
  created: 2026-04-08
  language: en
  framework: Profit First (Baboa)
  requires: Instant Assessment completion (allocation percentages must exist)
distribution:
  plugin: ccc-cashflow-management
  scope: internal

---

<!-- 
OPTIMIZATION NOTE (Future Refactor):
This skill is 567 lines (slightly over the 500-line guideline).
Phase 2 (Account Opening, lines ~166–196) and Phase 3 (Account Verification, lines ~223–277)
contain step-by-step bank application instructions that could be extracted to a reference file
(e.g., references/phase-2-account-opening-guide.md and references/phase-3-verification-guide.md)
without losing inline context. This would reduce core content to ~450 lines.
Consider this refactor when Phase 2/3 stabilizes after 2–3 skill runs.
-->

## Workflow: Select → Open → Allocate → Lock In

This skill guides a one-time account setup that establishes the Profit First multi-bank infrastructure. Once complete, the [[CCC Cashflow — Quarterly Review Cycle]] handles all ongoing allocations. Total duration: 2–3 weeks.

**Philosophy:** Control cash by dividing it at entry, not at exit. Separate accounts for income, profit, tax, owner compensation, and operations make good financial decisions automatic and corruption-proof.

---

## Mode Detection: Consultant vs. Self-Service

At the start, ask: **"Are you setting up these accounts WITH a consultant, or handling this yourself?"**

- **Consultant Mode:** Steps move faster. Client runs bank applications. Consultant reviews account ledger and validates first allocation math. More hand-holding on rhythm establishment.
- **Self-Service Mode:** Owner executes everything. Detailed checklists and worksheets essential. Extra validation on OpEx safety before first allocation.

Proceed accordingly through Phases 1–4 below.

---

## PHASE 1: BANK SELECTION & STRUCTURE DECISION (Days 1–3)

### Step 1: Primary Bank Selection

The primary bank holds **5 operational checking accounts**: Income, Profit, Owner's Compensation, Tax, OpEx.

Ask the user to compare 2–3 banks on these criteria:

| Criterion | Why It Matters | Examples |
|-----------|----------------|----------|
| **Monthly cost for 5 accounts** | Wrong choice = €200–300/year waste | Holvi €18/mo vs. Sparkasse €40/mo |
| **Per-account minimums** | Affects starting balance strategy | €0 minimum (good) vs. €500 (friction) |
| **Mastercard availability** | OpEx, Owner Comp, Profit need cards | 3+ cards available (non-negotiable) |
| **Online transfer speed** | You'll move money 2× per month | Instant (ideal) vs. 24-hour delays |
| **Geographic availability** | Local support, in-person options if needed | Austria/Germany/EU presence |

Use the **Bank Comparison Checklist** (in references/) to document their choices. Guide them to fill in each row: two candidate banks and a winner.

**CCC Reference Banks:**
- Holvi (Finland): €18/month, 5 accounts + 3 Mastercards, excellent UX, fast onboarding
- N26 Business (Germany): €11–15/month, good onboarding, solid UX
- Kontist (Germany): Better for freelancers than teams
- Sparkasse/Volksbank (Austria/Germany): Traditional, slower, higher fees (€20–40/mo), very reliable

**Decision Output:**
```
Primary Bank Selected: [Bank Name]
Monthly Cost: €[amount]
Reason: [2–3 sentences]
```

### Step 2: Secondary Bank Selection

The secondary bank holds **2 savings accounts only**: Profit Savings and Tax Savings. These MUST be hard to access (intentional friction = money stays put).

Ask:

| Factor | What to Look For |
|--------|------------------|
| **Access difficulty** | No online transfer. No debit card. Phone/in-person withdrawal only. |
| **Interest rate** | If €10K+ sits monthly, even 2–3% APY matters. Accept 1–2% if friction is good. |
| **Minimum balance** | Can you open with €0? |
| **Location** | Within 30 min if occasional in-person visits needed? |

**CCC Reference Options:**
- Traditional bank savings (Sparkasse, Raiffeisen, Volksbank): 2–4% APY, zero cards, phone-only = **best friction**
- Online-only savings (Wise, Revolut): 1–2% APY, slightly too easy to access = acceptable fallback
- Crypto/alternative: Only if owner is comfortable (not recommended for first setup)

**CRITICAL RULE:** Secondary bank must have NO online transfer option to primary bank. If owner can transfer in 2 clicks, the system fails. Friction is the feature.

**Decision Output:**
```
Secondary Bank Selected: [Bank Name]
Access Method: [Phone withdrawal / In-person only]
Interest Rate: [X%]
Reason: [Why this choice protects Profit & Tax savings]
```

### Step 3: Materials & Subcontractors Account Decision

Ask: **"Does your business have significant pass-through costs?"**

Answer YES if:
- COGS (cost of goods sold) > 25% of monthly revenue
- Regular freelancer / contractor / subcontractor spend
- Media spending (Ads) > 10% of revenue
- Buy-and-resell business model

Answer NO if:
- Pure services (owner + team deliver)
- COGS < 10% of revenue
- No significant materials or vendor costs

**If YES:** Open an 8th account at primary bank: **Materials & Subcontractors (Mat&Sub)**
- Receives a separate weekly/bi-weekly transfer for all vendor costs
- Isolates COGS from operational expenses
- Makes margin calculation transparent

**If NO:** Roll materials/vendor costs into OpEx or document as a line item.

**Decision Output:**
```
Materials & Subcontractors Account: ☐ Yes ☐ No
Reason: COGS is [X]% of revenue / [Yes/No, we have/don't have significant contractor spend]
```

### Step 4: MwSt/VAT Account Decision (DACH Businesses Only)

Ask: **"Does your business charge and remit VAT (MwSt in Germany/Austria)?"**

If your business is registered in Germany, Austria, or Switzerland and has VAT liability, this decision matters. The VAT account is separate from the Tax account (which reserves income tax, corporate tax, or similar). VAT must often be remitted monthly or quarterly, and separating it from income tax reserves prevents confusion and cash flow surprises.

Answer YES if:
- You're VAT-registered and charge VAT to customers
- You remit VAT monthly or quarterly
- Your business is in Germany, Austria, Switzerland, or another EU country with mandatory VAT

Answer NO if:
- You're not VAT-registered (small business exemption) or don't charge VAT
- Your business is outside DACH/EU
- VAT is negligible or bundled into pricing

**If YES:** Choose one of two options:

**Option A (Recommended for higher VAT turnover):** Open a 7th account at the primary bank: **MwSt/VAT Holding**
- Receives a separate weekly/monthly transfer for VAT collected (based on sales invoices)
- Isolates VAT liability from income tax reserves
- Makes quarterly VAT reconciliation and filing transparent
- When VAT is due, pay directly from this account to tax authority
- Keep 2–3 months of runway in this account (VAT liability can be lumpy)

**Option B (For lower VAT turnover):** Earmark a portion of the existing Tax account
- All tax reserves (income tax + VAT) go to the same Tax account
- Track VAT liability separately in a spreadsheet (% of Tax balance reserved for VAT)
- Simple but requires discipline not to spend VAT reserves on income tax liabilities
- Works if VAT is <20% of total tax reserve needs

**If NO:** Roll VAT (if any) into the existing Tax account. No separate decision needed.

**Decision Output:**
```
MwSt/VAT Account: ☐ Not applicable ☐ Option A (separate account) ☐ Option B (portion of Tax account)
Reasoning: [Business location, VAT registration, monthly VAT liability estimate]
```

---

## PHASE 2: ACCOUNT OPENING (Days 4–10)

### Step 1: Gather Documents

Before applying, collect:
- [ ] Government-issued ID (passport, driver's license, national ID)
- [ ] Proof of address (utility bill, lease, bank statement <3 months old)
- [ ] Business registration or tax ID (VAT number, tax registration)
- [ ] Proof of business (invoices, tax return, or business license)

**Consultant tip:** Client gathers these in parallel with your review of Phase 1 choices.

### Step 2: Submit Primary Bank Application

Guide the user through:

1. **Go to primary bank website** → Click "Open a Business Account"
2. **Fill in:**
   - Business name (must match tax registration)
   - Business address
   - Owner name and personal address
   - Tax ID / VAT number
   - Expected monthly turnover (realistic estimate)
3. **Upload documents** (have copies ready)
4. **Submit** and note the confirmation number + expected activation date
5. **Document:** Confirmation number, expected timeline, bank contact

**Timeline Expectations:**
- Holvi: 24 hours approval, 3–5 days for cards
- N26: 2–3 days primary, 1–2 days per additional account
- Sparkasse/Volksbank: 5–10 days, may need in-person visit

### Step 3: Submit Secondary Bank Application

Once primary bank confirms, apply to secondary:

1. Go to secondary bank website
2. Specify: "Savings accounts only, no debit cards"
3. Provide same business info
4. If asked for "proof of address," reference primary bank application confirmation

### Step 4: Create Account Ledger Template

While waiting for activation, populate the Account Ledger table (in references/). Document:

| Account Name | Bank | Account Holder | Purpose | Card? | Opening Balance | Status |
|---|---|---|---|---|---|---|
| Income | [Primary] | Business | All revenue deposits | No | €0 | Pending |
| Profit | [Primary] | Business | Owner profit (taken first) | Master | €0 | Pending |
| Owner Compensation | [Primary] | Business | Owner salary/draw | Master | €0 | Pending |
| Tax | [Primary] | Business | Tax reserve (set-aside) | Master | €0 | Pending |
| OpEx | [Primary] | Business | Operating expenses only | Master | €0 | Pending |
| Profit Savings | [Secondary] | Business | Profit reserve (hard access) | No | €0 | Pending |
| Tax Savings | [Secondary] | Business | Tax reserve (hard access) | No | €0 | Pending |
| (Optional) Mat&Sub | [Primary] | Business | Materials & contractors | Master | €0 | Pending |

---

## PHASE 3: ACCOUNT VERIFICATION & SETUP (Days 11–14)

### Step 1: Confirm Each Account

As accounts activate:

1. **Log in to online banking**
2. **Verify account appears** in dashboard
3. **Note full account number and IBAN**
4. **Test with micro-transfer:** Send €0.01 from Income to each account to verify responsiveness
5. **Update Account Ledger:** Change status from "Pending" to "Active"

### Step 2: Configure Online Banking Rules (Optional but Recommended)

For supported banks:

**Standing Orders:**
- Income account: Set to auto-distribute on the 10th (or weekly on Monday)
- OpEx: Set to transfer from Tax account on 1st if paying tax monthly

**Spending Limits:**
- OpEx Mastercard: No limit (business operations)
- Profit Mastercard: €500–1,000/day (prevents accidents)
- Owner Comp Mastercard: €500–1,000/day

**Transaction Alerts:**
- OpEx: Alert if balance < 2-week expense target
- Profit: Alert on any withdrawal
- Tax: Alert on any withdrawal (should only move on 25th)

### Step 3: Assign Mastercards

If multiple team members exist:

| Card | Assigned To | Use |
|------|-------------|-----|
| OpEx Mastercard | Finance manager or ops person | All recurring bills (25th payment day) |
| Owner Comp Mastercard | Owner or CFO | Owner personal draw only |
| Profit Mastercard | Owner personally | Locked away (profit never spent, only distributed quarterly) |

**Document in Account Ledger who has each card.**

### Step 4: Verification Checklist

Before moving to Phase 4, confirm:

- [ ] Income account: Active, accepting deposits
- [ ] Profit account: Active, Mastercard received
- [ ] Owner Compensation account: Active, Mastercard received
- [ ] Tax account: Active, Mastercard received
- [ ] OpEx account: Active, Mastercard received and tested
- [ ] Profit Savings account: Active, no card issued
- [ ] Tax Savings account: Active, no card issued
- [ ] (If Mat&Sub: Open and Mastercard received)

---

## PHASE 4: FIRST ALLOCATION (Day 15)

**Critical:** First allocation must use percentages from the Instant Assessment (Quarter 1 rollout plan), NOT full-term allocation percentages. Conservative first = successful ramp.

### Step 1: Gather Current Balance

1. Log into business's main/current bank account
2. Get total balance (include all cash, not just checking)
3. **This is your allocation starting point**

Example: Current balance = €50,000

**EDGE CASE: Zero or Negative Starting Balance**

If the owner has minimal cash or is in debt:

- **Don't panic.** Profit First works even with zero starting balances.
- **Step 1:** Open all accounts NOW with €0 balance (account structure is more important than initial money).
- **Step 2:** When the next revenue deposit arrives, execute the first allocation from that deposit (not from prior balance).
- **Step 3:** If business debt exists (loans, credit card balances, owner advances), consider opening an optional 8th account: **Debt Service**.
  - Allocate 1–3% of early revenue deposits to Debt Service
  - Pay down debt on a predictable schedule (reduces financial stress, builds confidence in system)
  - Once debt is cleared, reallocate that percentage to Profit or OpEx
  
Example:
```
Founder has €500 cash, €8,000 credit card debt.
- Set up all 5+ accounts with €0
- Wait for first client payment (€2,000 arrives)
- Allocate: Profit 2% (€40), Owner Comp 50% (€1,000), Tax 15% (€300), OpEx 20% (€400), Debt Service 13% (€260)
- Debt Service €260 → payment to credit card
- In 1–2 months, debt cleared → shift that 13% to Profit or OpEx
```

**The system works because the structure is the point, not the opening balance.**

### Step 2: Set Allocation Percentages

Use Quarter 1 CCC defaults (from Instant Assessment):

**Standard (no Mat&Sub):**
| Account | % | Amount (€50K example) |
|---------|---|---|
| Profit | 5% | €2,500 |
| Owner Compensation | 50% | €25,000 |
| Tax | 15% | €7,500 |
| OpEx | 30% | €15,000 |

**With Mat&Sub account:**
| Account | % | Amount (€50K example) |
|---------|---|---|
| Profit | 5% | €2,500 |
| Owner Compensation | 50% | €25,000 |
| Tax | 15% | €7,500 |
| OpEx | 20% | €10,000 |
| Mat&Sub | 10% | €5,000 |

**RULE:** If user has an Instant Assessment with custom percentages, use those instead. If not, use CCC defaults above.

### Step 3: Safety Check: OpEx Coverage

**This is non-negotiable.** Before executing transfers, confirm OpEx will cover at least 2 weeks of operating expenses.

Ask: **"What are your committed fixed costs for the next 2 weeks? (rent, salaries, subscriptions, utilities)"**

Calculate:
```
2-Week Committed Costs: €[X]
OpEx Allocation: €[Y]
Days of Coverage: (Y ÷ X) × 14

✓ SAFE: ≥14 days coverage
❌ RISKY: <14 days coverage
```

**If OpEx is short:**
- Reduce Profit allocation to 2–3% (defer growth)
- Keep Owner Comp and Tax normal
- Increase OpEx percentage
- Ramp Profit next month when OpEx is healthier
- **Document the conservative choice in daily notes**

Example if short:
```
Conservative First Allocation (OpEx Safety):
- Profit: 2% (€1,000) ← deferred
- Owner Comp: 50% (€25,000)
- Tax: 15% (€7,500)
- OpEx: 33% (€16,500) ← increased for safety
```

### Step 4: Execute Transfers

1. **Log into Income account** (or main account if temporarily holding balance there)
2. **For each account, initiate a transfer:**

| To Account | Amount | Reference/Memo |
|---|---|---|
| Profit (checking) | €[X] | "Initial allocation - Profit" |
| Owner Compensation | €[X] | "Initial allocation - Owner Comp" |
| Tax (checking) | €[X] | "Initial allocation - Tax Reserve" |
| OpEx (checking) | €[X] | "Initial allocation - Operating" |
| (If Mat&Sub) Mat&Sub | €[X] | "Initial allocation - Materials & Subs" |

3. **If balance remains in Income account,** allocate remainder to OpEx or Profit Savings
4. **Wait for transfers to clear** (1–2 business days)
5. **Verify receipt** in each account (check balances match expected amounts)

### Step 5: Document First Allocation

Complete the **First Allocation Receipt** (in references/):

```
FIRST ALLOCATION — [Date]

Starting Balance: €50,000

Transfers Executed:
- Profit: €2,500 ✓
- Owner Compensation: €25,000 ✓
- Tax: €7,500 ✓
- OpEx: €15,000 ✓

OpEx Safety Check:
- 2-week expenses: €6,000
- OpEx balance: €15,000
- Days covered: 35 days ✓

Status: Complete — All transfers cleared [Date]
Signed: [Name]
```

---

## PHASE 5: ESTABLISH THE RHYTHM (Days 16–21)

**Rule:** The system only works if it's a rhythm. Allocation is not a one-time event; it's the heartbeat of Profit First.

### Step 1: Choose Allocation Frequency

Ask: **"How volatile is your monthly revenue?"**

| Frequency | Best For | Example | Cash Rhythm |
|-----------|----------|---------|-------------|
| **Weekly** | Highly variable (agencies, freelancers, project-based) | Revenue arrives Mon-Fri unpredictably | Every Monday 10 AM — tightest control |
| **Bi-weekly** | Moderate (mix of retainer + project) | Revenue arrives mid-week and end-week | 10th and 25th of month — balanced |
| **Monthly** | Stable/predictable (retainers, SaaS, subscriptions) | Revenue arrives throughout month, consolidated | 10th of month only — loosest control |

**CCC Default:** Weekly (agencies) or bi-weekly (SaaS/retainer). Start weekly if uncertain.

**Decision Output:**
```
Allocation Frequency: ☐ Weekly ☐ Bi-weekly ☐ Monthly
Reason: [Revenue volatility assessment]
```

### Step 2: Set Calendar Events

Create recurring calendar events for the FULL YEAR (2026 onward):

**Allocation Day (every 10th, or weekly on Monday):**
- Time: 10:00 AM (before day gets busy)
- Duration: 30 min
- Reminder: 1 day before (verify revenue has cleared)
- Attendees: Finance person or owner
- Recurring: Every month or week, full year

**Bill Payment Day (every 25th):**
- Time: 2:00 PM (after bank cutoff)
- Duration: 1 hour
- Reminder: 2 days before (audit bills due)
- Attendees: Finance person or owner
- Recurring: Every month, full year

Use Google Calendar, Outlook, or Obsidian daily notes. Export calendar view to daily notes.

**Output:** Screenshot or link showing 12+ months of allocation days and bill payment days marked.

### Step 3: Assign Execution Authority

If delegating, assign and document:

- **Allocation executor:** Who logs in and moves money?
- **Bill payer:** Who pays from OpEx account on 25th?
- **OpEx monitor:** Who checks balance daily and alerts if low?
- **Finance reviewer:** Who reviews allocation every month?

Create a 1-page **Allocation Day Checklist** (in references/) for the executor to use every cycle.

### Step 4: Document the System

Handoff to the team member who will execute (if delegated):

**Give them:**
1. **Account Ledger** — which account is which bank, what's the purpose, who has the card
2. **Allocation Day Checklist** — step-by-step execution process (sign and date each cycle)
3. **12-Month Calendar** — visual rhythm of 10th and 25th
4. **First Allocation Receipt** — proof the system works, reference for percentages
5. **Contact info** — who to call if transfers are delayed or OpEx is low

**Get sign-off:** The executor understands the process and will not deviate.

### Step 5: Test One Full Cycle

Execute the rhythm for ONE complete cycle (Allocation Day 10th → Bill Payment Day 25th) as a dry run:

1. **Allocation Day (10th):** Execute all transfers as documented
2. **Bill Payment Day (25th):** Pay all standing bills from OpEx account only
3. **Post-cycle review:** Confirm OpEx balance is healthy for next period

If something breaks:
- Document the error
- Fix it
- Adjust the process
- Re-test next cycle

**Do NOT move forward** until one full cycle completes successfully.

---

## Output Format

By the end of Phase 5, deliver:

1. **Account Ledger** — Complete table with all account names, banks, IBANs (last 4 digits), opening balances, card assignments, and status
2. **First Allocation Receipt** — Screenshot or form showing initial balance, percentages, transfer amounts, and OpEx safety verification
3. **Allocation Day Checklist** — Printable/bookmarked step-by-step process for monthly execution
4. **12-Month Calendar** — Google Calendar export or Obsidian daily notes showing allocation days (10th/Monday) and bill days (25th) for full year
5. **Payment Routing Map** — Document showing all income sources → Income account, all recurring bills → OpEx account
6. **Delegation SOP** (if applicable) — 1-page checklist for team member executing the rhythm

**Save to:** `03 - OPERATIONS/[Business Name]/Cashflow Management/` with reference link in daily notes.

---

## Rules & Anti-Patterns (Update When Things Go Wrong)

**Do:**
- ✅ Choose primary bank based on cost + card availability (not location or brand)
- ✅ Choose secondary bank based on access difficulty (the harder to reach, the better)
- ✅ Test OpEx coverage before confirming first allocation (2+ weeks of expenses minimum)
- ✅ Use rollout percentages from Instant Assessment, not aggressive targets
- ✅ Set calendar events for the FULL YEAR (rhythm is non-negotiable)
- ✅ Assign one person to execute allocation (no confusion, one process)
- ✅ Review allocation monthly; adjust percentages quarterly based on performance

**Don't:**
- ❌ Use the same bank for checking and savings (too easy to raid Profit)
- ❌ Keep both banks in the primary bank ecosystem (secondary must be genuinely separate)
- ❌ Forget to update auto-payments (rent, salaries, subscriptions still drafting from old account = system fails)
- ❌ Allocate aggressively in Month 1 (OpEx runs out mid-month = owner abandons system)
- ❌ Skip the secondary bank setup (Profit and Tax savings must be hard to access)
- ❌ Let allocation slide for "just one month" (rhythm is the system; without it, Profit First decays)
- ❌ Use Materials & Subcontractors account for non-COGS expenses (separate = clarity)

---

## Self-Improvement

After Phase 5 is complete, ask:

1. **What was the hardest part?** (Bank selection? Transferring money? Setting calendar reminders?)
2. **What would have made this faster?** (Better checklists? More detailed explanations? Examples for your industry?)
3. **Did OpEx feel safe after first allocation?** (If not, adjustment plan for next quarter)
4. **Is the 10/25 rhythm sustainable?** (Can the assigned person execute every month without friction?)

Use feedback to refine:
- Checklist wording
- Decision matrices in Phase 1
- OpEx safety calculations
- Delegation SOP examples

---

## PREREQUISITES & NEXT STEPS

**Must have completed:**
- [[ccc-cashflow-assessment]] (Instant Assessment) — provides allocation percentages for first allocation

**After this skill completes:**
- [[CCC Cashflow — Quarterly Review Cycle]] — occurs every Q (review/adjust allocation percentages)
- [[CCC Cashflow — Profit Distribution]] — occurs Q4 (distribute Profit Savings to owner)
- Day 25 bill payment becomes a recurring operational task (documented in Allocation Day Checklist)

**Links:**
- [[CCC Cashflow Management System Master]] — full Profit First framework overview
- [[Profit First Framework]] — conceptual foundation
- `03 - OPERATIONS/[Business]/Cashflow Management/` — where all artifacts live
