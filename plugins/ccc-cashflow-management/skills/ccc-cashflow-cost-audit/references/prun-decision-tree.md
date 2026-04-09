# PRUN Decision Tree & Expense Classification Guide

*Referenced by: ccc-cashflow-cost-audit skill, Phase 2 (PRUN Classification)*

Use this guide when classifying expenses as Fat, Muscle, or Bone. Follow the tree systematically — the path you take determines classification. Do NOT rely on gut feeling.

---

## Full Decision Tree

```
START: Classifying expense [Vendor Name]

├─ Q1: Is this legally required or does it protect the company from legal/operational risk?
│   ├─ YES → BONE (Protect this expense)
│   │         └─ Examples: Insurance, accounting, taxes, compliance, domain registration, security
│   │
│   └─ NO → Continue to Q2

├─ Q2: Does this directly enable revenue generation or client delivery?
│   ├─ YES → Likely MUSCLE
│   │         └─ Sub-check: Is it being used at planned capacity?
│   │            ├─ Underutilized (€500/mo plan, using 10% of features) → MUSCLE (candidate for downgrade)
│   │            └─ Optimized (matching actual usage) → MUSCLE (protect, optimize pricing)
│   │
│   └─ NO → Continue to Q3

├─ Q3: Is this expense used regularly (weekly or more) by core team?
│   ├─ YES → Likely MUSCLE
│   │         └─ Verify: Is ROI tracking in place? Is pricing competitive?
│   │
│   └─ NO → Continue to Q4

├─ Q4: Would cutting this expense noticeably harm operations, team morale, or revenue within 60 days?
│   ├─ YES → Reclassify as MUSCLE (requires more careful review)
│   │         └─ Document the business impact if cut
│   │
│   └─ NO → Continue to Q5

├─ Q5: Is this a duplicate of another tool serving the same function?
│   ├─ YES → FAT (Consolidate to cheaper/better tool)
│   │         └─ Examples: Multiple project managers, redundant email services, overlapping design tools
│   │
│   └─ NO → Continue to Q6

└─ Q6: Is this a "nice to have" or "might be useful someday" with no current active use?
    ├─ YES → FAT (Cut immediately or pause)
    │         └─ Examples: Unused subscriptions, abandoned tools, aspirational memberships
    │
    └─ NO → MUSCLE (Lowest confidence; monitor quarterly)

END: Expense classified
```

---

## Quick Classification Reference

Use this table as a checklist. Check the box if the expense shows the indicator. More checkmarks in FAT = likely FAT. More in MUSCLE/BONE = likely not FAT.

| Indicator | FAT | MUSCLE | BONE |
|-----------|-----|--------|------|
| Unused for 30+ days | ✓ | | |
| Duplicate tool (same function exists elsewhere) | ✓ | | |
| Premium tier when basic would suffice | ✓ | | |
| "Nice to have" with no ROI tracking | ✓ | | |
| Legacy expense from old strategy | ✓ | | |
| Ego/vanity purchase | ✓ | | |
| Used daily by core team | | ✓ | |
| Directly generates leads/customers (trackable) | | ✓ | |
| Enables revenue-generating delivery | | ✓ | |
| Clear positive ROI (€5K → €25K) | | ✓ | |
| Would cut revenue within 60 days if removed | | ✓ | |
| Legally required | | | ✓ |
| Protects company from liability | | | ✓ |
| Core infrastructure (domain, hosting, email) | | | ✓ |
| Minimum viable team payroll | | | ✓ |
| Cannot be substituted or replaced | | | ✓ |

---

## Sample Classifications (Common Agency Expenses)

Use these as anchors. Your classifications may differ based on your specific situation — these are examples of reasoning, not rules.

### Team & Payroll

| Expense | Class | Reasoning |
|---------|-------|-----------|
| Salaries (3 core ops team) | BONE | Without them, operations stop. Minimum viable team. |
| Salary (4th junior hire) | MUSCLE | Generating billable client work. Could pause if revenue drops. Not minimum viable. |
| Contractor (active project) | MUSCLE | Direct project delivery, trackable ROI. |
| Contractor retainer (idle, underutilized) | FAT | Paying for capacity not being used. Renegotiate to project-based or cut. |
| Learning/development budget (structured) | MUSCLE | 1 formal skill per quarter, measurable skill gains, enables better delivery. |
| Learning/development budget (ad-hoc, abandoned) | FAT | No structure, no outcomes tracked, not reinforced. |

### Rent & Office

| Expense | Class | Reasoning |
|---------|-------|-----------|
| Office lease (current utilization) | BONE | Long-term lock-in, client meetings required, difficult to change. Renegotiate at renewal. |
| Office lease (post-pandemic, 50% empty) | FAT candidate | Renegotiate, sublet, or downsize. No longer supports operations. |
| Utilities + maintenance | BONE | Tied to office lease; cannot separate. |
| Internet + phone | BONE | Essential infrastructure; business cannot function without it. |
| Furniture upgrades (nice chairs) | FAT | Nice-to-have; defer or buy secondhand. |
| Premium coffee service (€200/mo) | FAT | Replaceable with €20/mo basic coffee. Nice but not essential. |

### Software & SaaS

| Expense | Class | Reasoning |
|---------|-------|-----------|
| Slack (core team, daily use) | BONE | Daily operations hub, integrations essential, no substitute. Protect. |
| Slack Plus (unnecessary tier) | FAT | Free tier covers current needs. Downgrade immediately. |
| Figma (used for client design delivery) | MUSCLE | Direct to revenue-generating deliverables. Protect and optimize pricing. |
| Figma unused seat (0 uses in 90 days) | FAT | Remove immediately. Sunk cost bias won't bring activity back. |
| Adobe Creative Cloud (active daily use) | MUSCLE | Used for client delivery. Protect. |
| Adobe Creative Cloud (3 licenses, 1 used) | FAT | Consolidate to 1–2 licenses. Remove idle seats. |
| CRM (integrated into sales workflow, tracked ROI) | MUSCLE | Leads tracked, conversions attributed, clear pipeline visibility. Protect. |
| CRM (implemented but unused, gathering dust) | FAT | Kill or consolidate. Implementation didn't stick; pushing features won't help. |
| Notion Plus (heavy user, team wiki) | MUSCLE | Core knowledge store, daily reference, enables team efficiency. Protect. |
| Notion Plus (bought aspirationally, basic Free would suffice) | FAT | Downgrade to Free. Upgrade only if you hit the limits. |
| Accounting software | BONE | Tax + legal compliance mandatory. Protect. |
| Google Workspace (email, Drive, Docs) | BONE | Essential infrastructure, part of team identity, compliance. Protect. |

### Marketing & Ads

| Expense | Class | Reasoning |
|---------|-------|-----------|
| Paid ads (tracked: €5K spent → €25K revenue) | MUSCLE | 5:1 ROI, measurable, drives pipeline. Protect and optimize bidding. |
| Paid ads (tracked: €5K spent → €8K revenue) | FAT candidate | Negative ROI; cut or pivot channel. Unless early testing phase. |
| Paid ads (untracked) | FAT | Set up tracking immediately, or cut. Can't justify blind spend. |
| Content creation tool (€200/mo, 2 posts/week, trackable leads) | MUSCLE | Regular output, measurable results, part of sales funnel. Protect. |
| "Inspiration" design service (€150/mo, used <2x/year) | FAT | Ad-hoc access, negligible utilization. Cut. |
| Agency retainer (clear deliverables, trackable results) | MUSCLE | But audit quarterly. Vague deliverables = FAT. |
| Email marketing platform (active list, 20%+ open rate) | MUSCLE | Part of revenue funnel, regularly used. Protect. |
| Email marketing platform (abandoned list, <5% open) | FAT | Newsletter is dead. Kill the subscription. |
| LinkedIn Sales Navigator (active sales team, leads generated) | MUSCLE | Direct sales tool, team uses regularly, trackable pipeline. Protect. |
| LinkedIn Sales Navigator (bought, never used) | FAT | Cut. Sales team isn't using it; forcing it won't change behavior. |

### Insurance

| Expense | Class | Reasoning |
|---------|-------|-----------|
| Professional liability (E&O) | BONE | Mandatory for service firms. Clients often require it. Protects company. |
| General liability | BONE | Required for most business structures. Protects assets. |
| Workers compensation | BONE | Legal requirement if you have employees. Non-negotiable. |
| Cyber insurance | MUSCLE/BONE | If handling PII (employee data, client lists), should be BONE. Otherwise MUSCLE. |
| Health insurance (offered to team) | BONE | Retention tool + tax deductible. Part of competitive compensation. |

### Professional Services

| Expense | Class | Reasoning |
|---------|-------|-----------|
| Accountant/bookkeeper | BONE | Tax filing + compliance mandatory. Non-negotiable. |
| Legal retainer | BONE | Contracts, IP protection, liability. Mandatory. |
| Fractional CFO | MUSCLE | Only if actively used for strategy + forecasting. If reports sit unread = FAT. |
| Tax advisor | BONE | Essential for compliance. Mandatory. |
| Consulting (strategic, tied to specific project) | MUSCLE | Only if outcomes are documented. Vague "advice" = FAT. |
| Consulting (ongoing, vague advice) | FAT | Consolidate to one advisor. Multiple advisors with no clear ROI = waste. |

### Travel

| Expense | Class | Reasoning |
|---------|-------|-----------|
| Client meeting travel | MUSCLE | If directly generating revenue from meetings. Track: meetings attended → deals closed. |
| Industry conference | MUSCLE | Only if trackable: clients sourced, partnerships formed, skills applied. Networking-only = FAT. |
| Team off-site (culture + strategy) | MUSCLE | Culture investment + strategic planning. Document outcomes. |
| Travel to conferences (never attended) | FAT | Cut. If you're not going, stop paying. |

### Subscriptions & Memberships

| Expense | Class | Reasoning |
|---------|-------|-----------|
| Premium industry membership (leads generated, used) | MUSCLE | Trackable value. Keep. |
| Premium industry membership (never used) | FAT | Cut. Paying for prestige, not participation. |
| Online courses (relevant to service delivery) | MUSCLE | If skills are applied to client work. Keep. |
| Online courses (bought, never completed) | FAT | Stop buying. You have a course graveyard. Delete subscriptions and reset habit. |
| Gym membership (office perk, actually used) | MUSCLE | Culture investment, modest cost, team morale. Keep. |
| Gym membership (office perk, no one goes) | FAT | Cut. It's not being used; offers aren't enough to change behavior. |

---

## The 90-Day Revenue Test (Tiebreaker)

When an expense straddles FAT and MUSCLE, ask this question:

**"If this expense disappeared tomorrow, would revenue drop noticeably within 90 days?"**

- **YES** → MUSCLE or BONE (keep, with optimization)
- **NO** → FAT (cut)

Examples:

| Expense | Revenue Test | Classification |
|---------|--------------|-----------------|
| Sales tool used daily | "If gone, sales pipeline dies in 60 days" | MUSCLE |
| Premium Slack tier | "If gone, team still works fine on Free tier" | FAT |
| Office rent | "If gone, can't meet clients; business grinds" | BONE |
| Abandoned newsletter tool | "If gone, nothing happens (newsletter is dead anyway)" | FAT |
| Contractor doing active project | "If gone, project delivery suffers" | MUSCLE |
| Contractor on retainer, idle | "If gone, nothing happens (they're not working)" | FAT |

---

## Common Misclassifications (Watch For These)

| Misclassification | Why It Happens | Correction |
|---|---|---|
| Labeling everything BONE out of fear | Emotional attachment; "what if we need it?" | Use the 90-day revenue test. "What if" = FAT. |
| Keeping tools because they have potential | Sunk cost bias; "I paid for it, should use it" | Potential is not revenue. No track record = FAT. |
| Classifying unused freelancers as MUSCLE | They used to deliver; they're on retainer | If idle now, they're FAT. Renegotiate to project-based or cut. |
| Protecting vague retainers (coach, advisor) | Hard to quantify value | If no documented outcomes in 90 days, FAT. |
| Cutting all premium tiers without auditing usage | "Cheaper tier saves money" | Only cut if you're not using the premium features. Otherwise wasted downgrade. |
| Including one-time expenses in recurring OpEx | E.g., conference pass, software license renewal | One-time ≠ recurring. Separate for budgeting. Only include true monthly/annual recurring. |

---

## Facilitation Tips

**When the user is stuck between two categories:**

1. Ask: "Is this used every week by someone on the team?"
2. Ask: "If this disappeared, would a customer notice or complain within 90 days?"
3. Ask: "Could you replace this with a cheaper tool and lose nothing important?"
4. Ask: "Is this a legal/compliance requirement?"

If Q1 or Q4 = YES, it's not FAT. If Q3 = YES and Q2 = YES, it's MUSCLE. If Q4 = YES, it's BONE.

**For consultants working with clients:**

- Explain the distinction clearly in your pre-audit conversation
- Don't surprise clients with aggressive FAT cuts — present the decision matrix for their review first
- Help them see that protecting BONE is smart, optimizing MUSCLE is where the real savings live
- Document client buy-in on borderline classifications (this prevents "why did you cut that?" arguments post-implementation)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-08 | Initial decision tree + classification reference. Full PRUN taxonomy. |
