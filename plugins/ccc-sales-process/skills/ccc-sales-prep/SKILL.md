---
name: ccc-sales-prep
description: "Pre-call brief for any prospect or client. Reads their person file, loads CCC positioning context + the CCC Problem Identification Chart + Gap Selling references, then produces a one-page brief with profile snapshot, current/future-state hypothesis, quantified gap hypothesis, opening hook, 5 discovery questions (mapped to Probing/Process/Provoking/Quantification/Why), 3 likely objections (mapped to Kanter's 10 change-resistance threats with the I'm-confused-you-said reframe pre-loaded), recommended CCC positioning, red flags, and the specific next Yes to close for. USE THIS SKILL whenever Daniel says 'prep for call with X', 'call prep', 'brief me on X', 'pre-call', 'what do I know about X', or is about to get on a call and needs context fast. Also trigger proactively if Daniel mentions a call is coming up."
allowed-tools: Read, Write
---

# CCC Sales Prep

**Workflow: Load → Hypothesise → Brief.** Reads available vault context on the prospect, applies the [[CCC-PIC]] + Gap Selling discovery framework to hypothesise their current state, future state, and quantified gap, then outputs a single scannable brief Daniel can use immediately. The brief is a structured set of *hypotheses to test on the call* — not a script to read.

---

## Phase 1: Load Context (Silent)

Read all of the following before generating anything. Do not ask Daniel for information that exists in these files.

**Prospect file:**
`03 - OPERATIONS/Relationships & Network/People/[Name].md`
— If not found, ask: "I don't have a file for [Name] yet — can you paste their LinkedIn or a quick description? I'll create the file after."

**CCC foundations:**
- `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/context.md`
- `03 - OPERATIONS/Claude Cowork Consultants/01 - GTM/ICP.md`
- `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/offer.md`
- `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/CCC-PIC.md` — the Problem Identification Chart that grounds the current-state hypothesis

**Gap Selling references** (lazy-loaded — read only the ones you need for this brief):
- `02 - MISSION CONTROL/Claude Skills & Plugins/ccc-sales-process/references/discovery-question-bank.md` — for question construction
- `02 - MISSION CONTROL/Claude Skills & Plugins/ccc-sales-process/references/kanter-10-threats.md` — for objection mapping
- `02 - MISSION CONTROL/Claude Skills & Plugins/ccc-sales-process/references/im-confused-you-said.md` — for the reframe templates

**Recent meeting notes (if any):**
Check `03 - OPERATIONS/Intelligence/meetings/client-calls/` for existing notes on this person. If found, extract last interaction + any open action items + most recent behavioural signals.

---

## Phase 2: Hypothesise (Silent)

Before drafting, do the analytical work. Don't show this to Daniel; it shapes what the brief contains.

1. **Pick 3-5 PIC rows** that most likely apply to this prospect, given the person file + ICP fit + behavioural signals. These become the discovery hypotheses.
2. **Hypothesise their Current State** across the 5 elements (Facts, Problems, Impact, Root Cause, Emotional State) — using the PIC rows as scaffolding. Be specific.
3. **Hypothesise their Future State** across the 3 layers (Technical, Business, Intrinsic Motivation). The intrinsic motivation guess is the highest-leverage hypothesis to surface on the call.
4. **Estimate the Gap** in their currency (rev, time, headcount, % growth) — even if it's a wide range. Without a gap hypothesis, the brief can't drive the call.
5. **Pick the 1-2 Kanter threats** most likely to surface as objections, given role tenure + past experience + organisational moment.

---

## Phase 3: Generate the Brief

Output clean markdown, no preamble. Dense enough to be useful, short enough to read in 2 minutes. Follow this structure exactly:

```
## Pre-Call Brief — [Name] — [Date]

### Who They Are
[3 sentences. Role + background + how they think. What they want and why now.]

### The Opportunity
[1-2 sentences. What specifically they need + why it matters to them.]
ICP fit: [Strong / Partial / Weak] — [one-line reason]

### Current State Hypothesis  ← test these on the call
- **Likely facts:** [from person file + PIC]
- **Suspected problems:** [2-3 PIC rows that most likely apply, named with PIC #]
- **Hypothesised impact:** [in their currency — quantified ranges OK]
- **Probable root cause:** [the underlying mechanism, not the symptom]
- **Likely emotional state:** [which 1-2 Kanter threats are active — e.g., loss-of-face, insecurity]

### Future State Hypothesis  ← anchor proposal here
- **Layer 1 (Technical):** [what the system would do operationally]
- **Layer 2 (Business):** [what changes in the business — quantified]
- **Layer 3 (Intrinsic Motivation):** [the personal WHY — explicitly a guess; surface on the call]

### Suspected Gap
[Future − Current, in their currency. Range OK.]

### Opening Hook (first 30 seconds)
[Exact words. Reference something specific from their background or recent context.
Lead with a problem hypothesis from the PIC, not a CCC pitch.
Must end with an open question that hands them the floor.]

### 5 Discovery Questions  ← mapped to Gap Selling question types
1. **Probing (facts):** [Tell-me / Walk-me-through prompt that surfaces specifics about the operation]
2. **Process (how):** [How-do-you / What's-your-process question that exposes operational workflow]
3. **Provoking (root cause):** [What-happens-when / Has-there-ever-been question that challenges assumptions]
4. **Quantification (future state):** [Question that forces a number on the desired outcome — Layer 2]
5. **Why (intrinsic motivation):** ["Tell me a bit about what's driving this change." Then shut up.]

### 3 Likely Objections  ← Kanter threat + reframe pre-loaded
| Objection | Active Kanter threat | "I'm confused. You said…" reframe |
|-----------|---------------------|-----------------------------------|
| [Most likely from this profile] | [Threat #N — name] | [Specific reframe anchored to their stated future state] |
| [Price / timing] | [Threat #N — name] | [Reframe quantifying cost of inaction in their currency] |
| [Internal capacity / "we'll do it ourselves"] | [Threat #N — name] | [Reframe — position CCC as architect-peer, not outsource vendor] |

### Recommended Positioning
Service fit: [Workshop / Diagnostic Engagement / Retainer / Custom + why]
Lead with: [one-line framing angle specific to this person + the PIC row that anchors it]
Don't lead with: [what would put them off, based on background or active Kanter threat]

### Red Flags to Watch
[1-3 signals that suggest slow deal, bad fit, or misaligned expectations]

### Close For (the next Yes)
[The specific next commitment. Not "I'll follow up." A named ask: a date, a document to review, a pilot scope to confirm, a stakeholder to introduce, an audit step to schedule.]
```

---

## Phase 4: Offer Next Step

After delivering the brief, offer without waiting to be asked:
> "Want to run a roleplay before the call? Say 'roleplay [Name]' and I'll play them."

---

## Rules

1. **The current-state and future-state hypotheses must be specific.** Generic hypotheses ("they probably have efficiency problems") fail the call. Tie every hypothesis to a numbered PIC row + a behavioural signal from the person file. If you can't, the person file is too thin — say so and ask Daniel for two more signals before generating the brief.

2. **The opening hook must lead with a problem hypothesis, not a pitch.** "I imagine [PIC #] is showing up as [specific symptom] for you — is that right?" beats "We help operators with AI architecture." Test the hypothesis; don't sell.

3. **Objections must come from what's known about this specific person + their active Kanter threat.** Generic B2B objections are cheap and useless. If the person file gives signals about their concerns, use them. If their last engagement burned them (past resentments threat), name it directly in the reframe.

4. **The Layer 3 (intrinsic motivation) hypothesis must be explicit and labelled as a guess.** Daniel's job on the call is to surface the real WHY; the brief's job is to give him a starting point so the call doesn't open cold on Layer 3.

5. **If ICP fit is Weak, say so clearly.** Don't bury the lead to be polite. Recommend disqualifying or reshaping scope.

6. **The "Close For" must be a concrete next Yes — the smallest specific commitment that moves the deal.** Not "follow up" or "stay in touch." Per Gap Selling Ch. 12, the deal advances on small Yeses, not big closes.

7. **Never pad to length.** If the person file is thin, the brief is short. Accuracy over completeness. If a section can't be filled with real signal, mark it `[insufficient data — surface on call]`.

8. **The PIC is canonical.** When a hypothesis can't be anchored to a PIC row, either propose updating the PIC (note it in Self-Improvement) or flag the hypothesis as speculative.

---

## Anti-Patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| Brief reads like it could fit any operator | Generic hypotheses, generic questions, generic objections | Person file too thin OR PIC not loaded | Refuse to generate; ask Daniel for two specific signals; load PIC explicitly |
| Layer 3 hypothesis is "wants to grow the business" | Surface-level guess masquerading as motivation | The WHY beneath the why wasn't reasoned through | Apply [[Intrinsic Motivation (sales) — Keenan]] — what does this *specific person* personally get from this change? Career? Exit? Vindication? Time? Identity? |
| 5 questions are all probing, no provoking | Discovery will produce facts but not surface root cause | Gap Selling question types weren't mapped | Force one Probing, one Process, one Provoking, one Quantification, one Why |
| Opening hook leads with CCC capabilities | Buyer disengages within 30 seconds (Mandi-with-an-i pattern) | Skill defaulted to product framing | Lead with the prospect's suspected problem from the PIC; capabilities only earn airtime once the problem is acknowledged |

---

## Self-Improvement

When a brief misses something important that came up on the actual call:
- Note the gap and add it as a Rule above
- If a specific question consistently produces great intel, save it in `references/discovery-question-bank.md` as a permanent option
- If a PIC row was missing, propose adding it to [[CCC-PIC]] in the next refresh

When Daniel says "that hook was perfect" or "that intrinsic motivation guess nailed it":
- Note what made it work (specificity, behavioural-signal grounding, PIC anchoring)
- Apply that pattern in future briefs

When a Kanter threat assignment turned out to be wrong:
- Note which threat was actually active
- Update the prompt in Phase 2 to look for that signal earlier

This skill is never finished. The more it is used, the better its hypotheses become.
