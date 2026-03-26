---
name: business-model-validator
description: Tests each idea against market reality via Million-Dollar Opportunity Test, builds the One-Minute Business Model (Revenue Goal ÷ Price = Customers Needed), and runs Revenue Dials scenarios to select one committed idea. Triggers on "business model", "validate my idea", "one minute business model", "revenue dials", "is my idea viable", "market test", "price my offer", "how much should I charge", "will people pay for this" — kills non-viable ideas with documented reasoning.
allowed-tools:
  - read-vault-file
  - web-search
  - conversation
metadata:
  author: Daniel Förster, Claude Cowork Consultants
  version: 1.0.0
  created: 2026-03-26
  language: en
  framework: 48hr-launch-blueprint
distribution:
  plugin: 48hr-launch-blueprint
  scope: internal

---

## WORKFLOW: Test → Model → Stretch → Commit

This skill validates whether an idea has real market demand, models pricing/revenue scenarios, and drives the user to a single committed selection with documented kill reasoning.

---

## PHASE 1: MILLION-DOLLAR OPPORTUNITY TEST (15 minutes per idea)

For each of the 3 shortlist ideas from [[idea-generator]], ask:

### Question 1: **What is the existing market size for this problem?**

The user must find evidence that OTHER people already spend money on this problem. (Not that they WOULD; that they already DO.)

Examples of evidence:
- ✅ "There are 500+ courses on Udemy in this category" (demand exists)
- ✅ "Competitors charging €99-299 for this service" (market proven)
- ✅ "€2B market for X according to [research firm]" (industry analyst data)
- ❌ "I think people need this" (hope, not evidence)
- ❌ "My friends said they'd buy it" (social proof ≠ market proof)

Ask: **"What's ONE piece of evidence that someone else is already making money in this space?"**

If they can't find it in 3-5 minutes, the market signal is weak. Document this as a weakness.

### Question 2: **What is the pain level for this customer?**

Ask: **"On a scale of 1-10, how painful is this problem for them? Will they be actively searching for a solution, or is it a nice-to-have?"**

- 8-10 = They're motivated to pay. Viable.
- 5-7 = They'd like a solution but aren't desperate. Medium viability.
- 1-4 = Nice to have. Risky.

If pain level is <6 AND there's no evidence of existing spend, kill the idea.

### Question 3: **What is the annual customer lifetime value of this market?**

Ask: **"If you acquired one customer, how much would they likely spend in a year? (Once or recurring?)"**

Examples:
- Course (one-time): €97 × 1 = €97/year
- Monthly service: €19 × 12 = €228/year
- Consulting package: €1,500 × 2 = €3,000/year

If LTV is <€100/year, the math gets harder (you need many customers). Document it.

### Produce the Kill List

After testing all 3 ideas:
- Ideas that fail any part of the Million-Dollar Test → **KILL list**
- Ideas that pass → **SURVIVORS** (move to Phase 2)

Document each kill with the specific reason:
```
❌ Idea: [Name]
   Reason: No evidence of existing spend (searched 5 competitors, found none pricing >€50)
   Pain Level: 4/10 (nice-to-have, not urgent)
```

**Rule: No exceptions.** If there's no evidence of existing spend, the idea dies here. Do not proceed to modeling.

---

## PHASE 2: ONE-MINUTE BUSINESS MODEL

For each SURVIVING idea (those that passed the Million-Dollar Test), build the One-Minute Business Model:

```
Revenue Goal ÷ Price = Customers Needed
```

### Step 1: Set the Revenue Goal

Ask: **"How much do you need to make from this idea in the first 30 days to prove it works?"**

Examples:
- €1,000 = "I want to prove market validation"
- €5,000 = "I want to recoup my launch costs"
- €10,000 = "I want to fund my Freedom Number for a month"

Document their choice. (No wrong answer here; it's their threshold.)

### Step 2: Set the Price

Ask: **"What's your price point? How much will you charge per unit/service/course/package?"**

If they're uncertain, use benchmarking:
- Look at 3 competitors charging in this space
- Average their prices
- Start 10-20% lower if you're unproven, 20% higher if you have existing credibility

Common price anchors:
- One-time digital product: €39-199
- Monthly service: €19-99
- Consulting package: €297-2,000
- Custom/premium: €5,000+

If they set price TOO LOW out of fear ("I'll charge €9"), challenge them:
- "If you charge €9, you need [high number] customers in 30 days. Is that realistic?"
- "What would you charge a friend? Someone who knows your work?"

### Step 3: Calculate Customers Needed

```
Customers Needed = Revenue Goal ÷ Price
```

Example:
- Revenue Goal: €2,000
- Price: €200
- Customers Needed: 10 customers

Ask: **"Can you realistically find and convert 10 customers in 48 hours + 30 days?"**

- If yes → keep the idea
- If no (price too low, market too fragmented) → adjust price and recalculate

### Produce the One-Minute Business Model

Document each survivor as:

```markdown
## Idea: [Name]

**Revenue Goal (30 days):** €[amount]
**Price per [unit]:** €[amount]
**Customers Needed:** [number]

**Viability Check:** [Yes / Needs adjustment]
**Notes:** [Why this price point, confidence level]
```

---

## PHASE 3: REVENUE DIALS ANALYSIS

For each surviving idea, run 4 "Revenue Dial" scenarios. These show how small changes create leverage.

### Dial 1: Raise Price

Ask: **"What if you increased price by 20%?"**

Recalculate:
- New Price: [Original × 1.2]
- New Customers Needed: Revenue ÷ New Price

Example:
- Original: €200/unit → 10 customers needed
- Dial up: €240/unit → 8.3 customers needed (you need fewer)

Show the user: **"By raising price 20%, you'd need 1-2 fewer customers. Does that feel more realistic?"**

### Dial 2: Increase Transaction Frequency

Ask: **"What if customers bought more than once? (Recurring, upsell, multi-pack)"**

Example:
- Original: €200 one-time → 10 customers
- With recurring: €200 × 2 purchases per month → 5 customers (same revenue, half the customers)

### Dial 3: Upsell / Cross-Sell

Ask: **"Is there a higher-tier offer you could bundle or sell to the same customer?"**

Example:
- Core offer: €200 (course)
- + Upsell: €300 group coaching
- If 30% of buyers take the upsell: €200 × 10 + €300 × 3 = €2,900 revenue (vs. €2,000 base goal)

### Dial 4: New Product Line

Ask: **"Could you offer a complementary product to the same customer?"**

Example:
- Offer 1: €200 course
- Offer 2: €50 template library
- If you sell both to each customer: €250 total per customer → need only 8 customers for €2,000

### Present the Dials Comparison

Create a table:

```markdown
| Scenario | Price | Frequency | Customers Needed | Achievable? |
|----------|-------|-----------|------------------|-------------|
| Base Model | €200 | 1x | 10 | Ambitious |
| Raise Price 20% | €240 | 1x | 8.3 | More realistic |
| + Recurring (2x) | €240 | 2x | 4.15 | Highly realistic |
| + 30% Upsell | €200 + €300 | Mixed | 5 (at base level) | Realistic |
```

**Question:** "Which scenario feels most aligned with your offer and capacity?"

---

## PHASE 4: SINGLE COMMITTED SELECTION

Now the user picks ONE idea to launch.

### The Decision Moment

Present the survivors side-by-side:
- Idea A: [Customer, Price, Customers Needed, Revenue Dials comparison]
- Idea B: [Customer, Price, Customers Needed, Revenue Dials comparison]

Ask directly: **"Which one are you choosing? This is your 48-hour sprint. Pick one."**

Listen for:
- ✅ "Idea A because [specific reason]" — They're committed
- ❓ "I'm not sure yet" — They need more time. Not ready for 48-hour sprint.
- ❌ "Can I do both?" — No. Focus is the whole point.

### Produce the Commitment Document

Once they choose, create:

```markdown
# My Business Model — 48-Hour Launch

**Chosen Idea:** [Name]
**Target Customer:** [WHO — specific]
**Offer:** [WHAT — brief]
**Price:** €[amount]
**Revenue Goal (30 days):** €[amount]
**Customers Needed:** [number]
**Why this idea:** [User's own words — why they believe in it]

**Action this week:**
- Coffee Challenge: 10 calls by [date]
- Pre-launch: [landing page / email list / other]
- Soft launch: [target date + method]

**Signed:** [Name]
**Date:** [Today]
**Accountability partner:** [Person I told]
```

Have them **tell someone** about their choice. A phone call, message, or conversation. This creates social accountability.

### The Kill List (Survivors Only)

Document the ideas that didn't make the cut and why:

```markdown
## Ideas We're Not Launching (And Why)

❌ Idea B: [Name]
   - Would need 25 customers in 48 hours (unrealistic)
   - Pain level: 5/10 (not enough urgency)
   - [Reason they didn't pick it]

❌ Idea C: [Name]
   - No evidence of existing market spend
   - Benchmarking showed similar solutions at €50; our €200 price point requires more credibility
```

The kill list is valuable. It documents thinking. If the chosen idea fails in testing, they know which backup to validate.

---

## RULES (Failure Modes)

1. **Never skip the Million-Dollar Opportunity Test.** If they say "I'm pretty sure people will buy this," ask for evidence. 15 minutes of research (Google, competitors, Gumroad, ProductHunt) must happen. No exceptions.

2. **Do not let them set price too low out of fear.** If they say "I'll start at €9 to build credibility," challenge: "At €9, you need 222 customers for your €2,000 goal. How will you reach 222 people in 48 hours?" Most will realize €9 is unsustainable and adjust. The Revenue Dials section forces this conversation.

3. **Reject ideas with unachievable customer counts.** If the math says "You need 50+ customers in 48 hours," and they have no existing audience, kill the idea. It's not viable for a 48-hour sprint.

4. **The Kill List is mandatory.** Do not skip documenting why ideas died. It's as valuable as the winning idea. (If they pivot, the kill list explains why — and the backup idea is documented.)

5. **One idea, not multiple.** If the user says "I'll launch two ideas in parallel," redirect: "Pick one. If idea #1 fails validation, idea #2 is your next launch. But split focus kills both."

6. **Commitment must be public.** Writing alone isn't enough. They must tell someone. ("I'll tell my spouse / accountability buddy / co-founder"). Log who they told.

7. **The math must close.** If the model shows "You need 15 customers but can only reach 5 people," the numbers don't work. Either raise price, add a revenue dial, or kill the idea.

---

## ANTI-PATTERNS

| Anti-Pattern | Why It Fails | How to Redirect |
|---|---|---|
| User skips Million-Dollar Test, jumps to pricing | They might build a model for a market that doesn't exist. | "Let's pause. Before we price, we need to confirm that OTHER people are already spending money on this. 15 minutes of research first." |
| "There are no direct competitors, which means I found a gap!" | Might mean opportunity, might mean no market. | "No direct competitors could mean two things: (1) unmet market or (2) market doesn't exist. Let's search for adjacent solutions. If zero people are spending money on this problem, it's not a gap — it's a non-demand." |
| User calculates customers needed and immediately says "That's impossible" | Defeatism. They should adjust price or revenue dial instead. | "You're right, 30 customers is tough. Let's use the Revenue Dials. Can you raise price 20%? Or add a recurring component? Or bundle with something else?" |
| User wants to build a product before testing | 48-hour launch means validation, not production. | "You can't build an app in 48 hours. What can you test WITHOUT building? (Landing page + email? Pre-sales calls? Waitlist + rough prototype?)" |
| User picks Idea A but doesn't tell anyone | No accountability. Commitment is internal only. | "Great, you're launching Idea A. Who are you telling today? Call or message someone right now. They're your witness." |
| "My price is €9 because I don't have a following yet" | Underpricing from insecurity. | "The price you charge is not about your following — it's about the value you're delivering. Would you charge €9 if you had 10,000 followers? If not, that's your actual price. Start there." |
| User has multiple ideas of equal appeal | Analysis paralysis. | "You've got 10 minutes to pick one. Close your eyes. Which one would you regret not trying? That's the answer." |

---

## SELF-IMPROVEMENT

After each skill run:

1. **Did the user kill any ideas in the Million-Dollar Test?** If yes, log which one and the reason. Track if certain idea types repeatedly fail (e.g., "Apps/tools with no existing market" or "Coaching with vague customer type").

2. **What was the breakdown of surviving ideas?** Did 1, 2, or all 3 ideas survive the Million-Dollar Test? If all 3 survive, the test might be too lenient. If 0 survive, the user might have bad pre-filtering in [[idea-generator]].

3. **Did they adjust price using Revenue Dials?** If yes, by how much? (Small tweaks = confidence in price; large dials = uncertainty). Track if dials correlate with follow-through or with later abandon.

4. **Customers Needed vs. Customers Available:** For the chosen idea, log the number they calculated and their confidence level in reaching it. After 48-72 hours, check: Did they actually reach that many? Over/under? Misalignment signals a calibration issue in the model.

5. **Revenue Goal accuracy:** Did they pick a realistic goal? (Some users set €10K for a first launch; others set €500. Both valid, but log the range. Over time, see if lower/higher goals correlate with success rate.)

6. **Did they tell someone?** If yes, who? (Spouse, friend, business partner, accountability buddy?). Log pattern. If they didn't tell anyone, note as red flag.

7. **Smooth handoff:** After this skill, do they loop into launch prep (landing page, email, etc.) or into execution tracking? Log which resource they access next. Indicates whether they're ready to launch or still in planning.

8. **Failure analysis:** If user abandons after this skill or doesn't launch the chosen idea, what was the blocker? (Market testing showed weakness? Fear returned? Execution got stuck?). Document in a "Abandonment Triggers" log for skill refinement.

Keep running log in `skill-runs.md` for monthly review.

