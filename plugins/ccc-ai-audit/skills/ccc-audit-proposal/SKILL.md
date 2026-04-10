---
name: ccc-audit-proposal
description: "Generates the Phase 5b tiered commercial proposal from audit findings. Produces a 3-tier proposal (Quick Wins / Foundation / Full Transformation) with ROI calculations using the client's actual numbers. Works within the full audit flow (after the report) or standalone when fed discovery data from any client engagement. Pricing is set per engagement based on scope — not hardcoded. USE THIS SKILL when the audit report is done and it's time for pricing, when the user says 'write the proposal for [client]', 'create the pricing tiers', 'build the commercial proposal', 'generate the investment options', or 'put together the offer for [client]'. Also trigger when the consultant says 'they asked for a number' or 'I need to quote this'."
allowed-tools: Read, Write
---

# AI Audit — Phase 5b: Tiered Commercial Proposal

**Workflow: Gather → Price → Build → Review.** Pulls findings from the audit (or from discovery context), determines appropriate pricing per tier, builds the three-tier proposal, and reviews with the consultant before finalizing.

**Time investment:** 1-2 hours
**Requires:** At minimum, a clear understanding of what will be delivered (from audit report, discovery notes, or consultant briefing)

---

## Step 1 — Gather Pricing Inputs

Read the following from the client folder (when available):

1. `05 - Audit Report — [Client Name].md` — findings, solutions, roadmap
2. `04 - Solution Matching.md` — tool costs, setup hours, ROI calculations
3. `03 - VALUE Scoring Matrix.md` — scored opportunities and implementation order

If these don't exist (standalone proposal without full audit), ask the consultant for:
- What's being delivered (specific automations, tools, outcomes)
- Estimated hours of work per deliverable
- Client's approximate budget range or budget signals from conversation
- Any retainer or ongoing support expectations

Also check the consultant's pricing framework:
- Read `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/offer.md` for standard pricing ranges and engagement types
- Read the person file for any budget signals, company size, or pricing context

---

## Step 2 — Determine Tier Pricing

Pricing is NOT hardcoded — it's calculated per engagement based on scope, complexity, and client context. The three tiers follow a consistent structure but the numbers are set fresh each time.

### Pricing Logic

**Quick Wins tier** — scope:
- Top 1-3 simplest automations (highest VALUE score + lowest complexity)
- 2-week implementation timeline
- Basic training included
- 14 days post-launch support
- **Typical range:** $1,500-$5,000 (set based on hours + tool costs + margin)

**Foundation tier** — scope:
- Everything in Quick Wins PLUS 3-5 additional automations
- 4-8 week implementation
- Comprehensive training + documentation
- 30 days post-launch support + monthly check-in
- **Typical range:** $5,000-$15,000
- Mark as "⭐ Most Popular" — this is the anchor

**Full Transformation tier** — scope:
- Everything in Foundation PLUS remaining automations + advanced integrations
- 12-16 week phased implementation
- Custom integrations, AI agents, or complex workflows
- 90 days priority support + optimization sessions
- **Typical range:** $15,000-$50,000

### Setting the Actual Numbers

For each tier, calculate:

```
Base cost = Estimated setup hours × Consultant hourly rate
Tool costs = Monthly tool costs × Implementation months
Margin = 20-40% (higher for simpler work, lower for complex)
Total = Base cost + Tool costs + Margin
```

Round to clean numbers. The three tiers should feel like natural steps — not random jumps. A common pattern: Quick Wins is ~40% of Foundation, Foundation is ~50% of Full Transformation.

Present the proposed pricing to the consultant for adjustment. They may have context (budget signals, competitive pressure, relationship stage) that changes the numbers.

---

## Step 3 — Build the Proposal

Save to: `[Client Folder]/AI Audit/06 - Proposal — [Client Name].md`

Read `references/tiered-proposal-template.md` for the full template.

The proposal has four sections:

### Section 1: Engagement Summary

2-3 sentences connecting the audit findings to the proposal. This is NOT a repeat of the executive summary — it's a bridge from "here's what we found" to "here's what we'll do about it."

### Section 2: Investment Options

Three tiers, clearly formatted. Each tier includes:
- **Package name and price**
- **What's included** (specific deliverables, not vague promises)
- **Timeline**
- **Best for** (who should choose this tier — helps the client self-select)

Mark Foundation as "⭐ Most Popular" — this is the psychological anchor. Most clients choose the middle option.

### Section 3: ROI Projections

A table showing Investment, Year 1 Savings, ROI%, and 3-Year Savings for each tier. All numbers must come from the actual ROI calculations in Solution Matching.

```
| Package | Investment | Year 1 Savings | ROI | 3-Year Savings |
|---------|-----------|----------------|-----|----------------|
| Quick Wins | $X | $X | X% | $X |
| Foundation | $X | $X | X% | $X |
| Full Transform | $X | $X | X% | $X |
```

The ROI table is the conversion engine. When a client sees 300%+ ROI using their own numbers, the investment becomes a no-brainer.

### Section 4: Next Steps

Frictionless call-to-action:
1. Select a package (reply to this email / message)
2. Kickoff call scheduled within 3 days
3. Implementation starts [specific date or "the following week"]

Include:
- Proposal validity period (14 days standard)
- Contact information
- Payment terms (e.g., 50% upfront, 50% on completion)

---

## Step 4 — Consultant Review

Before finalizing, present the full proposal to the consultant and check:

- Do the prices match what the client can afford? (Budget signals from discovery)
- Is the "Most Popular" tier realistic for this client's situation?
- Are the deliverables per tier correctly scoped? (Not too much in Quick Wins, not too little in Full Transformation)
- Do the payment terms work for this engagement?
- Is the timeline realistic given current capacity?

The consultant may also want to adjust language, add specific terms, or modify the next steps based on the relationship. Make all changes and re-save.

---

## Standalone Mode

This skill can work outside the full audit flow. When invoked without audit files:

1. Ask the consultant what engagement this is for
2. Gather: what's being delivered, estimated hours, client context, budget signals
3. Skip the ROI table if there are no VALUE scores (or estimate if consultant provides numbers)
4. Build the three-tier proposal using the same template
5. Note in the proposal that detailed ROI projections are available with a full audit

This makes the proposal skill usable for any CCC engagement, not just audit-originated ones.

---

## Rules

1. Never hardcode prices. Every proposal is priced fresh based on scope, hours, and client context. The ranges in this skill are guidelines, not rules.
2. Always include three tiers. Research consistently shows three options outperform one or two. The middle tier is the target — the other two provide contrast.
3. Use the client's actual numbers for ROI. If the audit was done properly, these numbers exist. If they don't (standalone mode), flag estimates clearly.
4. The proposal expires. Always include a validity period (14 days standard). Urgency without pressure.
5. Payment terms must be explicit. "50% upfront, 50% on completion" or "monthly billing" — whatever applies. Don't leave it ambiguous.
6. The proposal is a separate document from the report. The report is the analytical case; the proposal is the commercial offer. They may be delivered together but they serve different purposes. The report builds trust; the proposal converts trust into action.

---

## Self-Improvement

When a proposal doesn't convert, document why — wrong pricing, wrong tier structure, missing urgency, or client wasn't ready. When a proposal converts on a specific tier, note what made that tier compelling. When pricing feedback comes back ("too high" / "surprisingly reasonable"), adjust the pricing logic commentary for future engagements.
