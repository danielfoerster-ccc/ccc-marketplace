---
name: ccc-post-call-log
description: "Post-call vault update with behavioural signals + Gap Selling pipeline-state capture. Takes Daniel's raw call notes (pasted or dictated), structures them into a meeting note, runs a Behavioural Signals pass (energy / trust / decision / power / priority / language / timing / cultural), runs a Pipeline State pass (Current State / Future State / Gap math / Intrinsic Motivation / Decision Criteria / Buying Process / Next Yes), runs the CRM Challenge self-test on the resulting notes, updates the person's file with new intel + signals + an interaction log entry, routes decisions to Decisions & Rules.md, and confirms exactly what was saved where. USE THIS SKILL when Daniel says log this call, post-call, update after the call with X, save call notes, debrief this call, capture signals, behavioural signals, or pastes raw notes after a meeting. Also trigger if Daniel says we just got off a call, or wants to capture the interaction before the nuance fades."
allowed-tools: Read, Write
---

# CCC Post-Call Log

**Workflow: Extract → Signals → Pipeline State → CRM Challenge → Route → Confirm.** Takes raw call notes, extracts structured intel (decisions, action items, new factual intel), runs a dedicated Behavioural Signals pass (8 categories), runs a Pipeline State pass (Gap Selling fields — Current/Future/Gap/Why/DC/BP/Next-Yes), runs the CRM Challenge self-test, then routes each piece to the right vault file and reports exactly what changed.

The Behavioural Signals pass turns a call log into cognitive data for Perspective Simulation. The Pipeline State pass turns it into deal-progression data for [[ccc-sales-prep]] (next call prep), [[ccc-proposal-draft]] (gap-anchored proposals), and `ccc-deal-rescue` (re-engagement when deals stall). The CRM Challenge ensures both passes are deep enough to be useful — if the notes can't pass it, discovery was too shallow and the next call needs to fix that.

---

## Phase 1: Capture Notes

If Daniel hasn't pasted notes yet, ask:
> "Paste your notes — can be messy. I'll structure them."

If notes were shared in the conversation already, proceed silently.

---

## Phase 2: Load Context (Silent)

Before processing, read:

1. Person file: `03 - OPERATIONS/Relationships & Network/People/[Name].md`
   — Needed to correctly update the interaction log, avoid duplicating existing intel, and compare today's signals against prior ones.
2. Meeting note template: `03 - OPERATIONS/Intelligence/meetings/_TEMPLATE — Meeting.md` if it exists; otherwise use the standard format below.

---

## Phase 3: Extract Factual Intel

From the raw notes, extract:

| Content type | Route to |
|---|---|
| Meeting summary + key points | New meeting note file (see format below) |
| New factual intel about the person | Append to their person file |
| Interaction log entry | Append to Interaction Log in their person file |
| Decisions made | Append to `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` if they affect CCC direction |
| Action items (Daniel's) | Meeting note + flag clearly in output |
| Action items (theirs) | Meeting note + note in person file |
| New stakeholders mentioned | Create stub in `03 - OPERATIONS/Relationships & Network/People/` if named |
| Project updates | Relevant project file in `03 - OPERATIONS/` |

---

## Phase 4: Behavioural Signals Pass

This is the new core of the skill. Run through the raw notes a **second time** with one question in mind: *what does this tell me about how this person operates, decides, and relates — that I would not otherwise have on file?*

Walk through the eight signal categories. For each one, either extract a specific observation OR explicitly write `none observed` — never fabricate a signal to fill the section.

| # | Signal | Listen for | Example observation |
|---|--------|-----------|---------------------|
| 1 | **Energy** | What lifted them, what deflated them, where attention spiked | "Visibly energised when talking about international expansion; flat on compliance topic." |
| 2 | **Trust** | What they disclosed, what they held back, what personal context emerged | "Opened up about family business dynamics — hadn't mentioned before. Signals rising trust." |
| 3 | **Decision style** | Fast/slow, consensus/unilateral, data-driven/intuitive, risk-tolerant/risk-averse | "Checked twice with co-founder before confirming timeline — consensus-driven." |
| 4 | **Power** | Who pushed back, who deferred, who set the agenda, who closed | "She drove 80% of the agenda; he deferred to her on pricing. Real buyer is her." |
| 5 | **Priority** | What they circled back to repeatedly, what they sidestepped, what earned silence | "Circled back to delivery timeline three times. Price was not a concern." |
| 6 | **Language** | Metaphors they used, words they repeated, domain vocabulary | "Uses 'we need to move fast' and 'execution' repeatedly. Operator mindset, not strategist." |
| 7 | **Timing** | Urgency signals, stalling signals, gate-keeping signals | "Asked twice when we could start. Wants momentum." |
| 8 | **Cultural** | Org dynamics, decision culture, relational style | "Referred to legal as 'the lawyers' with an eye-roll. Compliance is friction, not a partner." |

**Extraction discipline:**

- If a signal is inferred (not directly stated), tag it with `⟨inferred⟩` so later re-reads know to apply a lighter weight.
- If today's signal **contradicts** a previously logged signal on the person file, flag it explicitly as `⟨contradiction⟩` — shifts in signal are the most valuable data Daniel has about relationship trajectory.
- Never invent a signal to fill a category. `none observed` is a valid, honest output.

---

## Phase 4.5: Pipeline State Capture (Gap Selling fields)

This pass turns the call log into deal-progression data. Run only if the call had a sales/engagement intent (discovery, follow-up, scoping, proposal review). For pure relationship calls, skip this phase.

Walk through the seven Gap-Selling pipeline fields. For each, either extract specifics from the notes OR mark `not surfaced — for next call`. Don't fabricate.

| Field | What to capture | If not surfaced |
|-------|-----------------|-----------------|
| **Current State (5 elements)** | Quantified facts + the 1-3 most material problems + their impact in the prospect's currency + the root cause + their emotional state | Mark `current state thin — re-discover next call` |
| **Future State (3 layers)** | Layer 1 (technical) + Layer 2 (business, quantified) + Layer 3 (intrinsic motivation, the personal WHY) | If only Layer 1+2: mark `Layer 3 not surfaced — explicit goal next call`. Layer 3 is where deals close. |
| **The Gap** | Future − Current, in their currency. e.g., "from 22% to 25% growth = €X over 12 months" | Mark `gap math pending — surface next call` |
| **Decision Criteria** | What they said matters most when they decide. Flag any that don't align with their stated future state. | Mark `DC unknown — ask "How are you going to decide what's the best solution for you?" next call` |
| **Buying Process** | Literal steps from now to signed contract. RFP? Committee? CFO? Partner sign-off? Number of decision-makers (per Gartner: 5.4 average). | Mark `BP unknown — ask "Walk me through how a purchase like this gets approved at your company"` |
| **Next Yes** | The smallest specific commitment we're working toward right now (e.g., "intro to CFO by Friday", "approve scope for kickoff", "sign mutual NDA"). Not "follow up." | Mark `next Yes unclear — Daniel must define before close` |
| **Active Kanter threat (if any)** | Which of the 10 change-resistance threats appeared in this call (loss-of-control, excess uncertainty, surprises, too-much-at-once, loss-of-face, insecurity, extra work, ripple, past resentments, real danger). See `references/kanter-10-threats.md`. | Mark `none active` if no threat surfaced |

These fields populate a structured `## Pipeline State` block in the meeting note (see Phase 5 below). They feed [[ccc-sales-prep]] for the next call's brief and `ccc-deal-rescue` if the deal subsequently goes dark.

---

## Phase 5: Write the Files

### Meeting Note

Save to: `03 - OPERATIONS/Intelligence/meetings/client-calls/[YYYY-MM-DD] - [Company] - [Context].md`

```markdown
---
type: meeting
subtype: client-call
date: YYYY-MM-DD
attendees: [Names]
project: [Project name]
status: completed
---

## Context
[1–2 sentences: where this fits in the relationship arc]

## Key Points
[Bullet points of substantive things covered]

## Decisions
[Anything agreed, confirmed, or resolved]

## Action Items
### Daniel
- [ ] [Action] — by [date if known]

### [Other party]
- [ ] [Action] — by [date if known]

## Behavioural Signals
**Energy:** [observation OR `none observed`]
**Trust:** [observation OR `none observed`]
**Decision style:** [observation OR `none observed`]
**Power:** [observation OR `none observed`]
**Priority:** [observation OR `none observed`]
**Language:** [observation OR `none observed`]
**Timing:** [observation OR `none observed`]
**Cultural:** [observation OR `none observed`]

*Tag inferences with ⟨inferred⟩. Tag contradictions with prior signals as ⟨contradiction⟩.*

## Pipeline State (Gap Selling — only if sales intent)
**Current State:** [quantified facts + 1-3 problems + impact + root cause + emotional state]
**Future State:** Layer 1: [technical] · Layer 2: [business, quantified] · Layer 3: [intrinsic motivation]
**The Gap:** [Future − Current, in their currency]
**Decision Criteria:** [list — flag misalignments with stated future state]
**Buying Process:** [steps + named players + estimated timeline]
**Next Yes:** [the specific smallest commitment we're working toward]
**Active Kanter threat:** [which of the 10, or `none active`]

*Mark any field as `not surfaced — for next call` if it didn't come up. Don't fabricate.*

## Notes
[Anything else worth capturing — tone, side comments, between-the-lines]

---
*Meeting note created: YYYY-MM-DD*
```

### Person File Update

Append to the Interaction Log table:

```
| [Date] | [Event — e.g., "Follow-up call"] | [2–3 sentence summary of what happened + most important signal of the day] |
```

The interaction log summary should **always** name the single most important behavioural signal from this call — not just the factual takeaway. That single line is what makes the log scannable for Perspective Simulation later.

If the person file has a `## Behavioural Profile` section, update it with new signals (don't duplicate — update in place where possible, append genuine new data). If that section doesn't exist yet, create it with the template:

```
## Behavioural Profile
*Accumulated signals across all interactions. Updated post-call.*

### Decision style
[What we've learned over time]

### Priority patterns
[What consistently matters to them; what they deflect]

### Power & relational style
[Who drives decisions around them; how they relate to team / family / advisors]

### Language & framing
[Words, metaphors, vocabulary they use repeatedly]

### Known contradictions / shifts
[When signal has materially changed — date + what changed]
```

If new factual intel emerged about their role, company, concerns, or decision authority — add it to the relevant section of their person file (don't duplicate, update in place where possible).

### Wikilinks

Every person, project, or note referenced in any saved file must use `[[wikilinks]]`. Never plain text for named entities.

---

## Phase 5.5: CRM Challenge Self-Test (silent — gate to Phase 6)

Before confirming, run the CRM Challenge from [[Gap Selling — Keenan]] Ch. 8: *if a peer read these notes anonymously — without the prospect's name or company — would they be able to identify which prospect this is?*

Test against these specific cuts:
- **Pipeline State block alone**: would the Gap math + Future State + Intrinsic Motivation uniquely identify this prospect? Or could it describe any operator?
- **Behavioural Signals + Pipeline State together**: now is it unique?

If the answer is *no* on the first cut, the discovery was thin in measurable ways. **Don't fail silently.** In the confirmation message, surface the specific gap:

> "**CRM Challenge result:** the Pipeline State block reads generic — [specific weakness, e.g., 'gap math is missing because future state Layer 2 wasn't quantified']. **Action for Daniel:** before the next call, [specific question to ask, e.g., 'press for the actual revenue number behind their growth target']."

This isn't punitive — it's a feedback loop. Per the framework, the depth of post-call notes determines the quality of every subsequent step (proposal, pricing, deal-rescue). Naming the weakness now is what fixes it on the next call.

If the notes pass the Challenge, just note `CRM Challenge: passed` in the confirmation.

---

## Phase 6: Confirm

After saving all files, output a brief confirmation:

```
## Saved

- Meeting note → [file path]
- [Name]'s person file → updated interaction log + [what new factual intel was added] + [N] new behavioural signals ([M] inferred, [K] contradicting prior)
- [if applicable] Decisions & Rules → [what was added]
- [if applicable] New person stub → [name + path]

Most important signal today:
> "[The single signal that most changes how Daniel should read this relationship going forward]"

Pipeline State (if sales intent):
- The Gap: [Future − Current, in their currency, OR "not yet quantified"]
- Next Yes: [the specific commitment to pursue OR "needs definition"]
- Active Kanter threat: [which one OR "none active"]

CRM Challenge: [passed | weak — see action]
[If weak: "Action for next call: [specific question to ask to fix the weakness]"]

Action items for you:
- [ ] [Item 1]
- [ ] [Item 2]
```

The "Most important signal today" line is the skill's highest-leverage output — it forces a judgement call every time a call is logged, which is what eventually calibrates the signal pass itself.

---

## Phase 7: Queue for Perspective Simulation (optional)

After the person file has been updated with today's signals, append a queue marker at the top of the person file's `## Behavioural Profile` section (or create that section with the marker if it doesn't exist yet):

```
⟨pending-simulation: YYYY-MM-DD⟩
```

Where `YYYY-MM-DD` is today's date. This marker signals to the weekly [[Weekly Knowledge Sweep — Recipe Spec|Weekly Knowledge Sweep]] that Perspective Simulation should be run against this person file before the next call. The marker is removed by the weekly rhythm once Simulation runs.

If a prior `⟨pending-simulation: ...⟩` marker already exists on the file, update the date to today — do not stack markers. The queue is a latest-pointer, not a list.

**Why this phase exists.** Without an explicit queue, signals captured today don't reach Perspective Simulation until Daniel manually invokes [[second-brain-connect]]. That delay (D3 in the Systems Thinking operation of 2026-04-20) is where the reinforcing loop R2 stalls — behavioural signals pile up as dead stock in person files and never become sharper Simulation output. The queue marker makes the backlog visible to the weekly rhythm so the loop actually spins. See [[Third Brain Charter]] §5 for the loop terminal rule.

**Skip this phase if:**
- The person is not an active relationship (an old contact being logged for completeness, no upcoming interaction expected).
- No new signals were extracted in Phase 4 (`none observed` across all eight categories).

---

## Rules

1. **Never create a meeting note without routing action items.** Decisions buried in text get forgotten.

2. **If the person file doesn't exist yet, create it using the standard template before updating it.** Don't skip this and just write a meeting note — a person without a file is invisible to Perspective Simulation.

3. **Wikilinks are mandatory for every named person, company, and project in every file saved.** This is how the knowledge graph builds.

4. **Never invent behavioural signals to fill a category.** `none observed` is a valid output. Fabricated signals poison Perspective Simulation weeks later when Daniel has forgotten which signals were real vs. padded.

5. **Always tag inferred signals with ⟨inferred⟩ and contradictions with ⟨contradiction⟩.** These tags are how downstream operations know what weight to give each signal.

6. **Always name the single most important signal in the confirmation.** If there is genuinely no important signal (rare), say so explicitly.

7. **If Daniel's notes are very sparse (e.g., just "good call, will send proposal"), still create the meeting note and log the interaction.** Sparse notes are still worth preserving. Ask one clarifying question if something important is missing (like the agreed next step OR the single most important signal of the call).

8. **Never ask "should I save this?" — just save and report.**

9. **Never fabricate Pipeline State fields.** `not surfaced — for next call` is the correct, honest output when discovery didn't reach a field. Fabricated gap math, invented intrinsic motivation, or invented decision criteria poison [[ccc-sales-prep]] briefs and `ccc-deal-rescue` messages downstream.

10. **Always run the CRM Challenge silently before confirming.** Surface weaknesses in the confirmation message, not generically — name the specific field that reads thin and the specific question Daniel should ask next call. This is how the discovery loop tightens over time.

---

## Self-Improvement

When Daniel adds something to a saved note afterward ("I forgot to mention X"):
- Note which category (factual intel or behavioural signal) gets forgotten
- Add a prompt to the extract phase above to specifically ask about that category

When Daniel says a particular signal observation was exactly right:
- Note the framing that worked; it's evidence the category boundaries are well-drawn

When Daniel says a signal was wrong or fabricated:
- Tighten Rule 4 with the specific failure pattern
- Review similar past signals on that person's file for potential retractions

When a new signal category emerges that doesn't fit the current eight:
- Propose it to Daniel first; add to the table only after his approval
- The categories are a contract with downstream skills — changing them without sync breaks Perspective Simulation
