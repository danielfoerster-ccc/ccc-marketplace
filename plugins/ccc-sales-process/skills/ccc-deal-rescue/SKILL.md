---
name: ccc-deal-rescue
description: "Drafts an 'I'm confused. You said…' re-engagement message for prospects or clients who have gone dark, stalled, raised a late objection, or pushed back on price. Reads the person file, last 3 interaction-log entries, last meeting note's Pipeline State (Current/Future/Gap/Intrinsic Motivation/Decision Criteria/Buying Process/Next Yes), and the active Kanter threat captured at last contact. Produces a short, specific message — for WhatsApp, email, or LinkedIn — that holds the buyer accountable to their own stated future state without defending product or price. Refuses to send anything generic. USE THIS SKILL when Daniel says 'rescue [Name]', 'they went dark', 'follow up with X', 'they haven't replied', 'stalled deal', 'they want a discount', 'they're pushing back on price', 'rescue this deal', 'how do I re-engage X', or any time a previously-warm deal has gone quiet or wobbled."
allowed-tools: Read, Write
---

# CCC Deal Rescue

**Workflow: Diagnose → Reframe → Draft.** Reads the deal's accumulated context, diagnoses *which kind* of stall has happened (dark / stalled / late objection / price pushback), then drafts a specific *"I'm confused. You said…"* message that anchors the buyer back to their own stated future state. The message refuses to defend product or price — it makes the buyer defend their own contradiction against their own goal.

This skill is the operational expression of the [[I'm Confused You Said — Reframe (Keenan)]] Recipe applied to written re-engagement.

---

## Phase 1: Load Context (Silent)

Read in order:

1. **Person file**: `03 - OPERATIONS/Relationships & Network/People/[Name].md` — read the full Behavioural Profile + the Interaction Log
2. **Last 3 interaction-log entries** — extract what was said, decided, and what behavioural signal was logged each time
3. **Last meeting note** in `03 - OPERATIONS/Intelligence/meetings/client-calls/` for this person — extract the **Pipeline State block** specifically:
   - Current State (quantified facts + problems + impact + root cause + emotional state)
   - Future State (Layer 1 / Layer 2 / Layer 3)
   - The Gap (Future − Current, in their currency)
   - Decision Criteria
   - Buying Process
   - Next Yes
   - Active Kanter threat at last contact
4. **`02 - MISSION CONTROL/Claude Skills & Plugins/ccc-sales-process/references/im-confused-you-said.md`** — the message templates by situation
5. **`02 - MISSION CONTROL/Claude Skills & Plugins/ccc-sales-process/references/kanter-10-threats.md`** — to interpret the active threat and pick the right defuse

If the last meeting note has **no Pipeline State block** (older meeting, or [[ccc-post-call-log]] wasn't run), tell Daniel directly: *"The pipeline state for this deal isn't documented. Without the Gap math + Future State + Intrinsic Motivation, I can draft a generic check-in but it will perform like a generic check-in. Recommend either (a) running [[ccc-post-call-log]] on the most recent call notes, or (b) Daniel pastes the missing fields and I draft from those."*

Don't generate a generic message. The whole leverage of this skill is the specificity.

---

## Phase 2: Diagnose the Stall Type

Pick exactly one. The diagnosis determines the message structure.

| Stall type | Signal | Primary failure mode to defuse |
|------------|--------|--------------------------------|
| **Going dark** | Buyer has not replied to N days of outreach after a verbal/written commitment to a next step | They feel guilty about owing a response. Generic check-ins make it worse. |
| **Stalled (responsive but not advancing)** | Buyer keeps engaging but meetings get postponed, specs don't arrive, the next Yes never lands | Their priorities shifted but they haven't said so. Cost-of-inaction reframe wakes them up. |
| **Late objection** | A new objection appeared that contradicts a previously-stated priority or future state outcome | A Kanter threat surfaced. The objection is the threat's logical-sounding form. |
| **Price pushback (too expensive / not in budget / can't afford)** | Buyer agrees with the value but is fighting the number | Three different problems with three different responses — see `im-confused-you-said.md` price section. |

If Daniel's request doesn't make the diagnosis obvious, ask one question: *"Which one is this — they've gone dark, they're stalling, a new objection came up, or it's about price?"* Don't ask more.

---

## Phase 3: Draft the Message

Output the draft message ready to send. Include the channel hint (WhatsApp / email / LinkedIn) and a short rationale below.

### Structure (per [[I'm Confused You Said — Reframe (Keenan)]])

```
[Optional one-line opening if longer than a few days have passed: "Hey [Name],"]

I'm confused. You said [specific stated commitment, in their language, with numbers if possible].

[Optional: cost-of-inaction quantified in their currency, OR the contradiction made specific]

[One direct question that requires them to defend the contradiction or recommit.]

[Sign-off matched to the channel — terse for WhatsApp, slightly fuller for email.]
```

### Channel-specific length

- **WhatsApp**: 2-4 lines. Crisp. No subject line.
- **Email**: 4-8 lines + a specific subject line that doesn't lead with "Following up" or "Just checking in." Lead with the contradiction or the cost.
- **LinkedIn DM**: 3-5 lines. Skip pleasantries. Reference the prior conversation directly.

### Worked examples (for reference — never copy verbatim)

**Going dark (WhatsApp):**
> Hey Sven, I'm confused. Last call you said losing 30 hours/week to manual ops was killing your rollout — and we agreed to scope the fix by end of week. Three weeks now, no reply. Did you find another path, or did priorities shift?

**Stalled (email):**
> Subject: The €50K/month question
>
> Hi Marcus,
>
> I'm confused. You said every month without this you're losing roughly €50K to channel friction. We've now postponed twice — that's €100K of the gap we were closing. Are you OK with that, or is the priority no longer where it was on the 8th?
>
> Daniel

**Late objection (LinkedIn):**
> Hi Lara, I'm confused. You said the priority was getting first-time buyer conversion above 12% — that was the whole reason for the rebuild. The local-vendor question came up today, but a local vendor doesn't move that number. Help me understand which goal is winning?

**Price — too expensive:**
> Hi Patxi, I'm confused. The system produces ~€8K/month in recovered revenue based on your own numbers — €40K once is roughly five months of payback, then pure margin. How are we calling that too expensive? Walk me through the math you're using.

### After the question — silence is part of the message

The draft must end on the question, not on a softener like *"Let me know if you'd like to chat!"* That tells the buyer you'll fill the silence so they don't have to. The technique requires their reply to do the work.

---

## Phase 4: Output

Present in this format:

```
## Deal Rescue — [Name] — [Date]

**Diagnosis:** [Going dark / Stalled / Late objection / Price pushback]
**Active Kanter threat (from last meeting):** [Threat name OR "none captured"]
**Channel:** [WhatsApp / Email / LinkedIn]

### Draft message
[The actual message, ready to copy-paste]

### Why this should land
[2-3 sentences. Which stated commitment from their Pipeline State the message anchors to. Which Kanter threat it's defusing (if any). What Daniel's silence is supposed to surface.]

### What to listen for in their reply
[2-3 specific signals — e.g., "If they argue against the math, the objection wasn't really about price. If they say 'sorry, I've been swamped', priorities shifted — re-discover what's actually now active. If they propose a smaller scope, the Gap was right but the threat is too-much-at-once — phase the rollout."]

### If they don't reply within [N days]
[The next move. Not "follow up again" — a specific next move: walk gracefully with a referral, escalate to a different stakeholder mentioned in the buying process, run a final call with a hard close.]
```

---

## Rules

1. **Never draft generic.** If the Pipeline State isn't documented, refuse — surface what's missing instead. The leverage is in the specificity.

2. **The message must reference a specific prior commitment in their language.** Vague restatements (*"You said this would be a priority"*) read as manipulative. Specific quotes or quantified commitments (*"You said 30 hours/week"*) read as honest.

3. **Never defend the product or the price.** The reframe makes the buyer defend their contradiction against their own future state. If the draft contains *"this is worth it because X"*, kill it — that's defending. The structure is *"You said X. Why is X no longer true?"*

4. **Tone must be confused, curious, slightly puzzled — never angry, sarcastic, or triumphant.** Daniel will read this aloud before sending; if it doesn't sound right when spoken, the tone is off.

5. **Don't soften the question.** Endings like *"Let me know your thoughts!"* or *"Happy to discuss whenever works"* tell the buyer you'll keep the conversation alive without them — which means they don't have to defend anything. The message must end on the question.

6. **One contradiction per message.** If three things are wrong, pick the most load-bearing and let the others surface in the reply.

7. **If the diagnosis is "real affordability" (not just budgeting), recommend walking** — and draft a graceful exit message instead. Don't waste the reframe on a buyer who genuinely can't pay. Refer them on; the integrity earns the next referral.

8. **Always include the "if they don't reply within N days" next move.** Without it, the rescue becomes another open loop. The next move is what closes the loop either way.

---

## Anti-Patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| "Just checking in!" message | Reads as the seller filling silence to avoid awkwardness | Defaulted to politeness | Replace with the contradiction-anchored message; politeness without a question makes the silence the seller's problem, not the buyer's |
| Defends the product/price ("our system would actually save you...") | Buyer doubles down on objection because they're being sold to | Skill defaulted to selling instead of reframing | Strip every justification. The reply should make the buyer reconstruct the value, not the seller |
| Quotes a stated commitment that's actually paraphrase, not the buyer's words | Buyer reads "you said" and thinks "I never said that exactly" — trust hit | Source documentation was thin or skill paraphrased | If the Pipeline State doesn't have the exact words, frame as "as I understood it" rather than "you said" |
| Multiple contradictions stacked in one message | Buyer can deflect by addressing the weakest one | Skill tried to be thorough | Pick the most load-bearing contradiction. Save others for the reply-pivot. |
| "Hope you're well!" preamble | Buyer scans, sees pleasantry, files for later | Mistaking warmth for relationship | Skip preamble entirely OR keep it to one line that references something specific from the prior conversation |

---

## Self-Improvement

When a draft message gets a reply that re-engages the deal:
- Note which contradiction structure landed (the anchor → the cost → the question? Or just the anchor → the question?)
- If a specific phrasing produced a reliable reply pattern, save it as a worked example in `references/im-confused-you-said.md`

When a draft fails (no reply, or worse, the deal dies):
- Note whether the diagnosis was wrong (it was actually a different stall type) OR whether the message was right but the deal was already lost
- If the diagnosis was wrong, add a Rule to Phase 2 about the signal that distinguishes the two types

When Daniel rewrites the draft significantly before sending:
- Note which parts he changed — tone? specificity? channel match? — and update Phase 3 to default to that

This skill is sharpest when its drafts get sent without rewriting. Track that.

---

## Cross-links

- Source method: [[Gap Selling — Keenan]] Ch. 12 + Ch. 13
- Recipe: [[I'm Confused You Said — Reframe (Keenan)]]
- Lens: [[The Gap (Keenan)]], [[Future State (3 layers) — Keenan]], [[Intrinsic Motivation (sales) — Keenan]]
- Upstream: [[ccc-post-call-log]] (produces the Pipeline State this skill reads)
- Reference docs: `references/im-confused-you-said.md`, `references/kanter-10-threats.md`
