---
name: ccc-cashflow-start
description: "Entry router for the CCC Cashflow Management system. Assesses the user's current situation and routes to the right cashflow skill. Use this skill whenever someone mentions cashflow, Profit First, money management, financial health, profit allocation, business finances, cash management, improve profitability, cashflow system, profit first system, Cashflow Control, financial health check, money management for business, business finances, cash management system, improve cashflow, profit first help, cashflow consulting, Cashflow Business Score, CBS, or isn't sure where to start. Also triggers on: 'cashflow help', 'where do I start with Profit First', 'fix my cashflow', 'I need help with business finances', 'profit first setup', 'cashflow management'. Always use this skill as the entry point when the user hasn't specified which cashflow skill they need."
allowed-tools: "Read, Write, Edit, Bash"
---

# CCC Cashflow Start — Entry Router

**Workflow: Assess → Route → Launch.** Ask 3-5 diagnostic questions, determine where the user is in the Cashflow Management journey, and route them to the right skill with context.

This skill exists because the Cashflow Management system has 8 specialized skills, and most users don't know which one they need. The router prevents wasted time and wrong starting points.

---

## The System at a Glance

The CCC Cashflow Management system transforms businesses from reactive bank-balance spending to proactive, profit-first cash management. It's built on Mike Michalowicz's Profit First methodology, extended with Daniel Förster's Cashflow Control System, 12 Profit Points, and PRUN Formula.

**The core formula:** Revenue - Profit = Expenses (not the other way around).

**Typical journey:** Assessment → Setup → Cost Audit → first quarterly cycle (Review + Distribution). After Q2: Profit Points optimization. Ongoing: quarterly reviews every 90 days.

**8 specialized skills:**

| Skill | What it does | When to route here |
|-------|-------------|-------------------|
| `ccc-cashflow-assessment` | Full Instant Assessment — Real Revenue, CAPs vs TAPs, The Bleed, rollout plan | Starting fresh. No assessment done yet. |
| `ccc-cashflow-setup` | Account structure (5+2 accounts) + first allocation + 10/25 rhythm | Assessment done, accounts not yet set up. |
| `ccc-cashflow-cost-audit` | PRUN Formula — classify expenses as Fat/Muscle/Bone, build lean budget | Accounts set up, need to reduce OpEx to fit allocation. |
| `ccc-cashflow-quarterly-review` | Quarterly review + profit distribution + next-quarter adjustment | System running, time for quarterly checkpoint. |
| `ccc-cashflow-profit-points` | Score 12 profit levers, prioritize top 2-3, design action plans | System stable, want to optimize beyond cost control. |
| `ccc-cashflow-report` | Generate 18+ page Profit Strategy Assessment report | Consultant needs a client deliverable. |
| `ccc-cashflow-client-onboard` | 32-step onboarding checklist for new cashflow clients | Consultant just signed a new client. |
| `ccc-cashflow-workshop-prep` | Prepare Cashflow Control workshop materials | Consultant has a workshop coming up. |

---

## Step 1: Detect User Type

Before asking questions, determine who you're talking to from context:

**Consultant** (CCC or Profit First Professional):
- Mentions "client", "engagement", "onboarding", "workshop", "deliverable"
- Asks about preparing materials for someone else
- References CCC, Cashflow Control System, or Profit First Professional

**Business Owner** (self-service):
- Speaks in first person about their own business
- Mentions personal financial concerns
- Doesn't reference consulting frameworks

**Unknown**: Ask — "Are you a consultant setting this up for a client, or a business owner working on your own finances?"

---

## Language Support

This system works in both **English and German**. If the user writes in German, acknowledge it and use German/English terminology side-by-side:
- Profit (Gewinn)
- Owner's Compensation (Unternehmergehalt)
- Tax (Steuern)
- Operating Expenses (Betriebskosten)

Adjust questions and routing language to match the user's preference.

---

## Step 2: Diagnostic Questions

Ask 3-5 questions to pinpoint where they are. Adapt based on user type.

### For Business Owners

1. **"Have you ever done a Profit First Instant Assessment?"**
   - No / What's that? → Route to `ccc-cashflow-assessment`
   - Yes, a while ago → Route to `ccc-cashflow-assessment` (re-run with current data)
   - Yes, recently → Continue to question 2

2. **"Do you know your Cashflow Business Score (CBS)?"**
   - No / What's that? → Route to `ccc-cashflow-assessment` (CBS is calculated during assessment)
   - Yes, and it's below 50% → Route to `ccc-cashflow-assessment` (deep dive to understand what's breaking down)
   - Yes, and it's above 50% → Continue to question 3

3. **"Do you have separate bank accounts for Profit, Owner's Comp, Tax, and OpEx?"**
   - No → Route to `ccc-cashflow-setup`
   - Yes → Continue to question 4

4. **"Are you doing regular allocations (10th/25th of the month)?"**
   - No / Inconsistently → Route to `ccc-cashflow-setup` (rhythm re-establishment)
   - Yes → Continue to question 5

5. **"What's your biggest challenge right now?"**
   - "Expenses are too high / can't fit within OpEx allocation" → Route to `ccc-cashflow-cost-audit`
   - "Time for quarterly review" / "Haven't reviewed in a while" → Route to `ccc-cashflow-quarterly-review`
   - "Want to grow profit beyond just cutting costs" → Route to `ccc-cashflow-profit-points`
   - "Not sure, just want a health check" → Route to `ccc-cashflow-assessment` (quick mode)

### For Consultants

1. **"What do you need help with?"**
   - "New client" / "Just signed someone" → Route to `ccc-cashflow-client-onboard`
   - "Running an assessment" → Route to `ccc-cashflow-assessment`
   - "Need to generate a report" → Route to `ccc-cashflow-report`
   - "Preparing a workshop" → Route to `ccc-cashflow-workshop-prep`
   - "Quarterly review with a client" → Route to `ccc-cashflow-quarterly-review`
   - "Client needs help with expenses" → Route to `ccc-cashflow-cost-audit`
   - "Client wants to optimize" → Route to `ccc-cashflow-profit-points`

---

## Step 3: Route with Context

When routing, provide context to the user about what happens next:

**Template:**
```
Based on what you've told me, the right next step is [SKILL NAME] — [one sentence about what it does].

Here's what we'll need:
- [Prerequisite 1]
- [Prerequisite 2]

Ready to start? [Invoke the skill]
```

**If prerequisites are missing**, help the user gather them first:
- Assessment needs 12 months of financial data (P&L minimum)
- Setup needs completed assessment (allocation percentages)
- Cost audit needs completed assessment (OpEx target)
- Quarterly review needs previous assessment data for comparison
- Report needs completed assessment data
- Client onboard needs signed engagement
- Workshop prep needs confirmed date and participant list

---

## Step 4: Handle Edge Cases

**"I just want to understand the system"**
→ Explain the core framework briefly (Revenue - Profit = Expenses, 5-account model, quarterly rhythm), then ask if they want to start with an assessment.

**"I've been doing Profit First but it stopped working" / "I tried Profit First but it didn't stick"**
→ Ask a follow-up to pinpoint where it broke:
   - "Did you set up accounts but stopped allocating?" → Route to `ccc-cashflow-setup` (rhythm re-establishment)
   - "Are you allocating but raiding the Profit or Tax accounts?" → Route to `ccc-cashflow-quarterly-review` (behavioral reset and why)
   - "Never got past the assessment or felt stuck from the start?" → Route to `ccc-cashflow-assessment` (fresh start with current data)

**"I want everything — the full setup"**
→ Start with `ccc-cashflow-assessment`. Explain the sequence: Assessment → Setup → Cost Audit → then quarterly cycles. Offer to guide them through each step in order.

**"Can you just fix my finances?"**
→ Reframe: this system doesn't fix finances overnight. It installs a behavioral system that compounds over 4-8 quarters. Start with the assessment to see where you stand.

---

## Rules

1. Never skip the assessment. Even if the user says "I already know my numbers," the assessment creates the baseline that all other skills depend on. At minimum, run a quick mode assessment.
2. Never route to consultant-only skills for self-service users. The report, client onboard, and workshop prep skills are designed for consultants — they'll confuse a business owner.
3. Always confirm the route before launching. Don't assume — ask "Does that sound right?" before invoking the next skill.
4. If in doubt, route to assessment. It's the safest starting point and reveals what's actually needed.
5. Keep the routing conversation under 5 minutes. This is a triage skill, not a deep dive. Get the user to the right place fast.

---

## Self-Improvement

When a user gets routed to the wrong skill:
- Add the misroute scenario to the edge cases above
- Note what question would have caught the mismatch earlier

When routing consistently works well:
- Note which diagnostic questions are most effective
- Simplify the flow if certain questions never change the routing
