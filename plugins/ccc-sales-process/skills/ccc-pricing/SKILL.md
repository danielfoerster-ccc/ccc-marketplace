---
name: ccc-pricing
description: "Runs a structured pricing analysis for any CCC engagement. Loads client context, applies four converging pricing lenses — value-based (Weiss, Enns), Hormozi value equation, CCC offer architecture, and BenAI market reality (2 years AI automation pricing data) — then runs sanity checks and outputs a recommendation with full reasoning. Maintains a pricing log for compounding learning. USE THIS SKILL whenever Daniel needs to price an engagement, quote a client, decide between pricing options, or gut-check a number. Triggers on: 'what should I charge', 'price this', 'help me with pricing', 'what's the right price', 'am I overpricing', 'am I underpricing', 'quote for [client]', 'pricing for [client]', 'how much for this engagement'. Also trigger proactively when ccc-proposal-draft is building an offer and no price has been set."
allowed-tools: Read, Write
---

# CCC Pricing — Value-Based Engagement Pricing

**Workflow: Load → Assess → Calculate → Check → Recommend → Log.** Gather all client and engagement context, assess the value of the outcome to the client, calculate a price using three converging frameworks, run sanity checks against CCC positioning and market reality, present a recommendation with reasoning, and log the decision for future learning.

**This skill is v1.1 — now includes BenAI practitioner pricing data (2 years of AI automation pricing from 100+ engagements) alongside the consulting theory frameworks. Future versions will incorporate full book ingestion from Tier 1-3 sources. See `references/development-roadmap.md` for the planned evolution.**

---

## Step 1 — Load Context

Gather everything relevant about the client and the engagement. Read from the vault:

1. **Client file** — `03 - OPERATIONS/Relationships & Network/People/[Name].md`
   - Company size, revenue signals, budget signals, tech stack
   - Relationship stage (new / warm intro / case study / proven / premium)
   - Competitive context (are others quoting? how many? what kind?)
   - Who introduced them (warm vs. cold)

2. **CCC offer architecture** — `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/offer.md`
   - Engagement type and standard pricing ranges
   - Current phase (case study, post-case-study, premium)

3. **CCC positioning** — `03 - OPERATIONS/Claude Cowork Consultants/01 - GTM/positioning.md`
   - Premium positioning guard — pricing must be coherent with brand

4. **Call notes / meeting notes** — any recent interactions that contain budget signals, urgency signals, or competitive intel

5. **Pricing log** — `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/pricing-log.md`
   - What was charged before for similar engagements, what converted, what didn't

If any context is missing, ask. Pricing without context is guessing.

---

## Step 2 — Value Assessment

This is the core of value-based pricing: price the outcome, not the hours.

### 2a — What is this worth to the client?

Ask three questions about the engagement:

**1. What problem does it solve, and what does that problem cost them?**
Think in annual terms. If a CEO is waiting a week for reports that should be instant, what's the cost of slow decisions? If customer care is manual across 50k customers, what's the cost in churn, staffing, missed escalations?

The problem cost establishes the ceiling — the maximum the client would theoretically pay to make the problem disappear.

**2. What will the client gain when it's solved?**
Not just hours saved (that's the proof point, not the value). Think: what can they DO with that freed capacity? More revenue? Better decisions? Faster scaling? Reduced risk?

**3. How confident is the client that this will work?**
A proven system with case studies commands higher prices than an experimental approach. Daniel's live demo (showing his own system running) increases perceived likelihood dramatically.

### 2b — The Hormozi Value Equation

Score the engagement on four dimensions:

```
Perceived Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort & Sacrifice)
```

| Dimension | Score 1-10 | Reasoning |
|-----------|-----------|-----------|
| **Dream Outcome** | How big is the transformation? | A CEO Copilot that gives real-time truth = high (8-9). A minor workflow fix = low (3-4). |
| **Perceived Likelihood** | How confident are they it'll work? | Live demo shown + proven system = high (7-8). First-time, untested = low (3-4). |
| **Time Delay** | How fast do they get results? | 2 weeks to live system = low delay (good). 6 months = high delay (bad). |
| **Effort & Sacrifice** | How much does the client have to do? | 3 hours of their time = low effort (good). Major team disruption = high (bad). |

High perceived value (high outcome × high likelihood / low delay × low effort) supports higher pricing. Low perceived value means either the price needs to come down or the offer needs restructuring to increase one of the dimensions.

### 2c — The Weiss 1% Test

Calculate: if this problem costs the client €X per year, what is 1% of that?

If the engagement price is at or below 1% of the annual problem cost, it's a no-brainer for the client. This is the "good news fee" — the moment you name the price, the client feels relief, not resistance.

If the engagement price is above 5% of the annual problem cost, you need strong justification or the client will hesitate.

The sweet spot for consulting is typically 1-3% of the annual value delivered.

---

## Step 3 — Price Calculation

Now converge four pricing lenses to find the right number. When lenses disagree, use this hierarchy: (1) BenAI Market Reality sets the floor/ceiling based on what the AI automation market actually pays, (2) Value-Based sets the target within that range, (3) CCC Architecture provides guardrails for brand coherence, (4) Market & Relationship adjusts for context.

### Lens 1: Value-Based (primary)

From Step 2: what's the annual value to the client? Take 1-5% as the engagement price.

| Value-to-client | Suggested price range |
|----------------|----------------------|
| Under €50k/year | 3-5% = €1,500-€2,500 |
| €50-200k/year | 2-4% = €1,000-€8,000 |
| €200k-1M/year | 1-3% = €2,000-€30,000 |
| Over €1M/year | 1-2% = €10,000-€20,000+ |

### Lens 2: BenAI Market Reality (practitioner anchor)

BenAI has priced 100+ AI automation engagements over 2 years. Their data provides the market reality check against pure value theory. Source: `01 - KNOWLEDGE BASE/Business & Marketing/BenAI/How to Price Your AI & Automation Services.md`

**Pricing Power Assessment** — score Daniel's position before calculating:

```
Pricing Power = AI Skills + Business Experience + Business Impact
```

| Dimension | Score 1-5 | What to assess |
|-----------|-----------|----------------|
| **AI Skills** | Ability to build AI automations, optimize workflows, integrate systems | Daniel: 4-5 (proven system, live demos, production-grade builds) |
| **Business Experience** | AI project experience (plan, scope, execute) + domain expertise | Daniel: 3-4 (growing portfolio, strong marketing/operations domain, building case studies) |
| **Business Impact** | Revenue generated OR cost/time saved for the client | Varies per engagement — assess specifically |

**Pricing Power drives the markup multiplier:**
- Low (3-6 total): 2x cost markup → stay at market floor
- Medium (7-9): 3x markup → mid-market pricing
- High (10-13): 4-5x markup → premium pricing
- Daniel's current position: 7-9 range (strong skills, building experience proof)

**BenAI market-tested price anchors (AI automation space, 2024-2026):**

| Model | Range | When to use |
|-------|-------|-------------|
| **Fixed-price project** | €2,000-€5,000 per automation/build | Clear scope, defined deliverable, one-time work |
| **Subscription / Chief AI Officer** | €2,000-€5,000/month | Ongoing builds + consulting, "become AI-first" clients |
| **Performance-based** | 10-30% of revenue generated | Only when ROI is provable and you're confident in delivery |

**Critical BenAI insight for case study phase:** The first 2-3 projects should prioritize experience, portfolio, and testimonials over margin. BenAI explicitly recommends first projects at cost or even free. CCC's approach (pricing below framework during case study phase) is aligned with this — but should be conscious and time-boxed, not permanent.

**BenAI scoping reality check:** A well-scoped project has 4 phases (Scope → Design → Build → Iterate). When pricing, account for all four — not just the build. The proposal should include a diagram and onboarding doc. Source: `01 - KNOWLEDGE BASE/Business & Marketing/BenAI/How to Plan, Scope & Build AI Automations.md`

### Lens 3: CCC Architecture (guardrails)

From `offer.md`, what are the defined ranges for this engagement type?

| Engagement Type | Range | Current Phase Adjustment |
|----------------|-------|--------------------------|
| Diagnostic Engagement | €5,000-€10,000 | Case study phase: €5,000 floor |
| In-Company Workshop | €2,000-€5,000 | Standalone or credited |
| Retainer Growth | €3,300/mo | — |
| Retainer Scale | €6,600/mo | — |
| Retainer Premium | €9,900/mo | — |

**Important:** These ranges exist for a reason (brand coherence, positioning signal), but they are not sacred. If the value assessment clearly points to a different number, the value assessment wins — and the offer.md ranges should be updated to reflect reality.

### Lens 4: Market & Relationship (adjustment)

Adjust the value-based price for real-world factors:

| Factor | Effect on Price | Why |
|--------|----------------|-----|
| Case study phase (first 5 clients) | -20% to -40% | Investment in social proof. You're buying their testimonial as much as they're buying your service. |
| Warm intro via trusted partner | -10% to -15% | Lower acquisition cost = you can afford a slightly lower price. Also honors the relationship. |
| Multiple competitors quoting | -10% to -20% | If you're not the only option, price needs to be competitive enough to not lose on price alone. Don't race to the bottom, but be realistic. |
| Strong urgency ("need this yesterday") | +10% to +20% | Urgency means they value speed, and speed has a premium. |
| Multi-venture scope (2+ companies) | +30% to +50% | More complexity, more value delivered, more of your time. |
| Proven results / repeat client | +20% to +30% | You've demonstrated value. Price should reflect the reduced risk for the client. |
| Enterprise / large company | +30% to +50% | Higher budgets, higher stakes, higher value of the outcome. |
| Founder is resource-constrained | Adjust scope, not price | Never discount. Reduce intensity instead. (Professional Standards rule) |

---

## Step 4 — Sanity Checks

Before recommending, run these checks:

### Check 1: Positioning Coherence
Does this price match CCC's premium positioning? A €500 engagement from someone who positions as a "world-class arena architect" creates cognitive dissonance. The price IS a signal. Too low and the client wonders what's wrong. Too high and the client is blocked from starting.

### Check 2: The Enns "Options Not Estimates" Rule
Are we presenting options, not a single number? Single prices invite yes/no. Options invite which-one. The pricing skill should always output at least two options at different scope/intensity levels. This is non-negotiable.

### Check 3: The Regret Test
Will Daniel regret this price in 3 months? Underpricing creates resentment, especially in ongoing relationships. The right price today should still feel right when you're deep in delivery.

### Check 4: The Client Regret Test
Will the client feel ripped off? If the value delivered doesn't clearly exceed the price, the relationship suffers. Better to undercharge slightly and overdeliver than overcharge and create buyer's remorse.

### Check 5: The Professional Standards Check
Read `00 - COMMAND CENTER/Foundational Docs/Professional Standards.md` — are any standards being violated? "Pricing is fixed. Intensity is negotiable." Are we adjusting price or scope?

---

## Step 5 — Recommend

Present the pricing recommendation to Daniel with full reasoning:

```
## Pricing Recommendation — [Client Name]

### Value Assessment
- Annual problem cost to client: €[X]
- Hormozi Value Score: [X/10] (Dream [X] × Likelihood [X] / Delay [X] × Effort [X])
- Weiss 1% reference: €[X]

### Recommended Options

**Option A — [Scope Description]**
Price: €[X]
Reasoning: [Why this number — which lens drove it, which adjustments applied]

**Option B — [Scope Description]**
Price: €[X]  
Reasoning: [Why this number]

### Sanity Checks
- Positioning coherence: [Pass/Flag]
- Options presented: [Yes]
- Daniel regret test: [Assessment]
- Client regret test: [Assessment]
- Professional standards: [Pass/Flag]

### Confidence Level
[High / Medium / Low] — [Why. What could change this?]
```

Daniel makes the final call. This skill provides the analysis — the decision is always human.

---

## Step 6 — Log the Decision

After Daniel confirms the price, append to `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/pricing-log.md`:

```
## [Date] — [Client Name]

**Engagement:** [Type and scope]
**Options presented:** Option A: €[X] / Option B: €[X]
**Final price:** €[X] ([which option])
**Key factors:** [What drove the price — 2-3 bullet points]
**Value basis:** Annual problem cost €[X], price = [X]% of value
**Relationship stage:** [New / Case Study / Proven / Premium]
**Conversion:** [Pending / Converted / Lost — update when known]
**Notes:** [Anything relevant for future pricing decisions]
```

This log is the skill's long-term memory. Over time, it reveals patterns: what price points convert for which engagement types, which adjustments matter most, where Daniel's gut diverges from the framework (and who's usually right).

---

## Rules

1. Never present a single price. Always present at least two options at different scope/intensity levels. The options frame the decision as "which one" not "yes or no." (Blair Enns)
2. Never negotiate on price. If the client says "too expensive," adjust the scope, not the number. This preserves positioning integrity. (CCC Professional Standards)
3. Always show the value math. A price without context is just a number. A price that's 2% of a €300k annual problem is a no-brainer. The framing matters more than the number. (Alan Weiss)
4. Never skip the pricing log. Every engagement priced — converted or not — teaches something. A skill without memory doesn't improve.
5. Trust Daniel's gut when it diverges from the framework. His Spleen authority (first impulse) has been right before. But document the divergence so we can learn from the pattern.
6. The case study phase is real, and it's strategic. Lower pricing during the first 5 engagements isn't discounting — it's investment in social proof. But it must be conscious and time-bound, not a permanent habit.
7. Currency matters. CCC prices in EUR for European clients. Adjust framework examples (which use USD) to EUR before presenting.

---

## Anti-Patterns

| Situation | Broken outcome | Root cause | Fix |
|-----------|---------------|------------|-----|
| Gut says €2.5k, framework says €5k | Depends on context | Value theory ignoring market reality OR gut anchoring on client's budget | Check BenAI market anchors. If the engagement is a single fixed-price build (€2-5k range) and it's case study phase, the gut may be correct. If it's a multi-phase diagnostic, the framework may be right. Document the divergence either way. |
| Client seems "small" so price drops | Positioning incoherence, attracts wrong clients | Confusing client size with problem value — a small company can have a high-value problem | Price the problem, not the company |
| Competitor is cheaper, so we match | Race to the bottom, destroys premium positioning | Competing on price instead of on value and differentiation | Compete on the demo, the methodology, the system. If they choose cheaper, they weren't the right client. |
| Same deliverable, different client, same price | Leaving money on the table OR overcharging | Cost-plus thinking instead of value-based | Two clients with the same deliverable but different problem costs should pay different amounts |
| "Just this once" discount | Sets a precedent, hard to raise later | Pressure to close overrides pricing discipline | Adjust scope instead. Smaller engagement at the right rate > bigger engagement at the wrong rate. |
| Framework says €10k but market says €3k | Client laughs, deal lost, confidence shaken | Over-indexing on consulting theory (Weiss, Enns) without grounding in AI automation market reality | BenAI data: fixed projects €2-5k, subscriptions €2-5k/mo. These are the market. Price above only when the value is clearly justified AND the client understands the value framing. |
| Staying in "case study pricing" forever | Revenue never scales, becomes permanent discount | Comfort with lower prices, fear of raising | Time-box it: 2-3 engagements max at case-study rates (BenAI). After that, Pricing Power should be high enough to charge full market or above. |

---

## Self-Improvement

When a price converts: note what made it work — was it the value framing? The options structure? The relationship context? Add to the pricing log.

When a price doesn't convert: ask why. Too high? Wrong framing? Wrong engagement type? Client wasn't ready? Note the pattern.

When Daniel's gut diverges from the framework: track both the gut price and the framework price. Over time, this reveals whether the framework needs recalibrating or whether the gut has a pattern (e.g., consistently underpricing for warm intros).

**Planned development:** This skill will be significantly upgraded when full book content is ingested. Priority sources: Blair Enns (Pricing Creativity) for the options architecture, Alan Weiss (Value Based Fees) for the consulting-specific value model, Hormozi ($100M Offers) for offer-stacking logic, Jonathan Stark (Hourly Billing is Nuts) for the mindset framework, David C. Baker (The Business of Expertise) for expertise pricing, and Van Westendorp research for productized offerings. Each will be added as a reference file under `references/`.
