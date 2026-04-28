# Kanter's 10 Change-Resistance Threats — Objection Generator

*Reference doc for the [[ccc-sales-process]] plugin. Source: Rosabeth Moss Kanter (Harvard Business School), via [[Gap Selling — Keenan]] Ch. 2 (Truthbomb #5: Sales are Emotional).*

---

## Why this matters

Most objections in B2B sales aren't logical — they're emotional resistance to change, expressed in logical-sounding language. Kanter identifies 10 distinct threats that trigger change-resistance. Knowing which threat is active for a specific buyer lets the seller (or the proposal) defuse it before it surfaces as an objection.

In CCC's [[ccc-sales-prep]], objections are mapped to which Kanter threat is most likely active for *this* prospect, given their behavioural profile. In [[ccc-discovery-roleplay]], the AI-prospect uses these as objection generators to test Daniel's responses.

---

## The 10 threats

### 1. Loss of control

The buyer fears the change will reduce their authority, autonomy, or visibility. ("I used to be the funnel; now anyone can input — I'll lose control of quality.")

**Defuse**: emphasise what new control / visibility / leverage the change *gives* them. Surface the trade explicitly.

### 2. Excess uncertainty

The product / service is too new, the data is too thin, the future state isn't proven. ("I want to be forward-thinking but I want to see proof first.")

**Defuse**: case studies, demonstrations, low-risk proof points. The [[Show-Me Economy — Keenan]] lens applies — pre-meeting demonstration material does the work here.

### 3. Surprises

The buyer was lured in by something unexpected (a discount, a deadline, a feature) and now feels rushed or unstable. ("I'm not against this but I have a process and you're trying to bypass it.")

**Defuse**: respect their process. Restructure pacing to fit their cycle, even if it costs you the quarter.

### 4. Too much change at once

The buyer's organisation is already in upheaval; one more change is too much. ("Federal mandate just landed; we can't take this on too.")

**Defuse**: scope down. Phase the rollout. Start with the smallest valuable wedge, even if you'd rather sell the bigger system.

### 5. Loss of face

The new approach implicitly makes the buyer's prior decision look bad. ("I built that system 5 years ago — replacing it makes me look like I failed.")

**Defuse**: frame the prior system as having served its time well; frame the new one as the natural next step. Never imply the prior decision was wrong. (This is *load-bearing* in CCC sales — the operator often has a vault, has tools, has tried things; honour that.)

### 6. Insecurity

The buyer staked reputation on the deal; if it goes wrong, they're toast. ("I championed this internally — if it doesn't deliver, my career is at risk.")

**Defuse**: shared risk structures. Pilot with success criteria. Be the partner who shares accountability, not the vendor who throws the project over the wall.

### 7. Extra work

The change requires effort the buyer doesn't want. ("It's not complicated but I'll waste time learning it instead of doing my actual job.")

**Defuse**: own the implementation effort. Quantify what the buyer's actual time investment will be (low) vs what you / your team will absorb (high).

### 8. The ripple effect

The change benefits the buyer's department but creates problems further down the chain. ("My team will be efficient but support is going to hate it.")

**Defuse**: map the ripple proactively. Surface the second-order effects in the proposal. Show you've thought about the downstream impact.

### 9. Past resentments

The buyer has been burned before — by a previous vendor, by a previous internal change, by a previous deal where they trusted a salesperson. ("Last guy hit us with surprise fees; I'm watching for it now.")

**Defuse**: be specific about what you *will* and *won't* do. No vague reassurances. Reference the past resentment directly: "I know the last engagement wasn't what was promised. Here's what's different about how we work."

### 10. Real danger

The change has a genuine downside — jobs lost, capabilities disabled, irreversible consequences. ("This could make 3 of my team redundant.")

**Defuse**: don't pretend the danger isn't there. Address it directly. Sometimes the right move is to redesign the engagement so the danger is reduced; sometimes it's to acknowledge it openly and let the buyer weigh it. Never minimise.

---

## How to use this in CCC sales

### In `ccc-sales-prep`

For each prospect, hypothesise which 1-3 threats are most likely active given their:
- **Role / tenure** (long tenure → loss-of-face risk; new role → insecurity risk)
- **Past experience signals from the person file** (previous failed engagements → past resentments)
- **Organisational moment** (recent restructure → too-much-at-once)
- **Behavioural signals from prior interactions** (energy, language, decision style)

Then draft each likely objection as the threat's logical-sounding surface form, with the defuse pre-loaded.

### In `ccc-deal-rescue`

When a prospect goes dark or stalls, the underlying threat usually shifted (something escalated). Test which threat is now active and draft the recovery message with that specific defuse. Often the buyer doesn't know themselves — the message that names the threat ("I imagine [threat] is on your mind") gives them permission to surface it.

### In `ccc-discovery-roleplay`

The AI-prospect is assigned 1-2 dominant threats from the person file's behavioural signals and uses them as the objection-generation engine. This produces realistic, role-grounded objections rather than generic ones.

## Cross-links

- Source: Kanter (HBS), via [[Gap Selling — Keenan]] Ch. 2
- Lens: connects to [[Change Management]] (Heifetz adaptive vs technical) and [[Future State (3 layers) — Keenan]] (Layer 3 is often where the threat lives)
- Operationalised by: [[ccc-sales-prep]], [[ccc-discovery-roleplay]], `ccc-deal-rescue`
