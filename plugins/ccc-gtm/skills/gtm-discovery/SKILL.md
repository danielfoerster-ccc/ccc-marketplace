---
name: gtm-discovery
description: |
  Runs a structured GTM discovery process for AI automation businesses, producing
  ICP.md, positioning.md, voice.md, offer.md, and context.md. Use this skill whenever
  a founder, consultant, or AI automation professional needs to define or sharpen their
  market strategy — including niche selection, positioning, entry offer design, brand
  voice, and operational context (network, infrastructure, team, parallel objectives).
  Trigger on: "run the GTM process", "help me find my niche", "define my ICP", "what
  should I sell and to whom", "build my GTM foundation", "work through my positioning".
  Also trigger when a user wants to start or structure an AI automation consulting business.
allowed-tools: "Read, Glob, Grep, Write"
metadata:
  author: Claude Cowork Consultants (Daniel Förster + Heiko Lube)
  version: 2.2.0
  based-on: BenAI GTM Framework (Parts 1–6)
  updated: 2026-03-03
  changelog: |
    2.2.0 — ABS run learnings: added Q1.5 (industry brainstorm beyond first instinct); added
    Q2.4 (how ICP buys — outcome vs. technology framing); expanded Q5.3 (partner timing and
    contribution window); added Rules 9–10; updated self-improvement with ABS as 2nd example.
    2.1.0 — Added Phase 5: Operational Context → context.md as 5th output
distribution: marketplace-ready
---

# GTM Discovery Process

Guides AI automation founders through a structured discovery process, producing five
foundational documents: ICP.md, positioning.md, voice.md, offer.md, and context.md.

## Workflow Pattern

**Wizard + Feedback Loop.** Ask one question at a time. Synthesize answers into
structured documents. Iterate until each document is accurate. Do not generate
documents speculatively — earn every decision through conversation.

---

## Phase 0: Context Scan (Before Any Questions)

Before asking anything, load context in this order:

**Step 1 — Check for your-context.md (primary source)**
Read `references/your-context.md`. This is the founder's pre-filled context file.
- If filled in: use it as the primary source of truth for who they are, what's decided,
  and where existing documents live. Load any documents listed under "Existing Strategic
  Documents" and read them now.
- If empty or missing: proceed to Step 2.

**Step 2 — Scan working context (fallback)**
If no your-context.md, scan the available environment for strategic documents —
positioning notes, ICP drafts, offer docs, daily notes, brand guides, personal bios.
Flag anything older than 90 days as potentially stale.

**Step 3 — Identify the scope**
- Which business is this GTM for? (founders often have multiple — establish this first)
- What phases are already decided? What's still open?
- What documents exist vs. what needs to be built from scratch?

**Step 4 — Open with a synthesis**
Briefly summarize: what you found, what you're treating as current, what's stale or
missing, and what this session will focus on. This saves 20+ minutes of re-explaining.

**Step 5 — Load the framework**
Read `references/gtm-framework.md` for niche criteria, positioning framework,
and BenAI course structure before starting Phase 1.

---

## Phase 1: Niche Selection

Ask questions one at a time. Move on only when WHO + WHERE + WHY YOU is clearly locked.

**Q1.1 — Instinct first:**
"When you imagine a client for this business, who do you instinctively picture? Not who
you *should* serve — who actually comes to mind? What's frustrating them, and why would
they specifically need someone like you?"

*Push back on vague answers. "Anyone who needs AI" is not a niche. Drive toward a
specific role, industry, or business type.*

**Q1.2 — Geography and language:**
"Where will you primarily market — local, national, a language community, or
international? What's your unfair advantage in that geography?"

**Q1.3 — Specificity pressure:**
"If you had 100 phone numbers tomorrow and could call only one type of person — who is it?"

*BenAI: every layer of specificity multiplies value. Push until you have a specific type
of business, not a category.*

**Q1.4 — Verify against criteria:**
Once a niche candidate is identified, check it against the four niche criteria and four
founder criteria in `references/benai-framework.md`. Surface any gaps.

**Q1.5 — Industry brainstorm (go beyond the first answer):**
Don't stop at the founder's initial instinct. Proactively suggest 3–5 adjacent industries
they may not have considered, ranked by fit against their unfair advantages. Present a brief
fit rationale for each. Ask: "Which of these feels obviously wrong? Which ones are worth
exploring further?"

*The ABS run showed that going beyond the first answer added strong industries (e.g., care
homes / Seniorenheime) that weren't in the initial instinct but matched the offer perfectly.
The brainstorm phase is generative, not just validating.*

**Human-in-loop checkpoint:** Before moving to Phase 2, confirm:
"Here's what I'm locking in as your niche: [summary]. Does this feel right, or is
something off?" Offer 2–3 variations if the founder seems uncertain.

**Phase 1 output:** WHO + WHERE + WHY YOU

---

## Phase 2: Positioning

**Q2.1 — The specific problem:**
"What is the single most painful, expensive, or time-consuming thing your target customer
is doing manually — that AI specifically could solve?"

*Don't accept "productivity" or "AI workflows." Push for a concrete workflow: client
reporting, content production, lead qualification, onboarding sequences.*

**Q2.2 — The value proposition:**
"Are you helping them make money, save money, save time, or reduce risk? Which is primary?"

*Making money is the strongest offer. But "save time" is often the entry hook and
"make money" the secondary benefit — help them articulate both.*

**Q2.3 — Draft the statement:**
Draft a positioning statement: "We help [audience] [do what] using [method] — [outcome]."
Have them react: Is it true? Is it specific enough? Would their ideal client read it and
immediately recognize themselves?

**Q2.4 — How the ICP buys (critical for professional services and any non-tech ICP):**
"How does your ideal client describe their problem to themselves? When they go looking for
help, what words do they use — 'AI tools', 'automation', 'marketing help', 'more bookings',
'better follow-up', 'fixing revenue', something else?"

*This is not a voice question — it is a positioning architecture question. If the ICP doesn't
self-identify as needing AI, automation, or technology, then leading with those words in
positioning and outreach guarantees a disconnect. Professional services ICPs (lawyers, dental
practices, financial advisors) buy outcomes: "fill my calendar", "more revenue", "stop losing
leads". They don't buy tool categories. Surface this explicitly and encode it in both
positioning.md and voice.md. Mark the outcome language as canonical; mark the tech language
as prohibited in outreach.*

**Human-in-loop checkpoint:** Offer 2–3 positioning statement variations.
Let the founder pick and refine before locking in.

**Phase 2 output:** Core positioning statement + value proposition priority

---

## Phase 3: Entry Offer

**Q3.1 — What you can deliver now:**
"What can you confidently deliver for your target customer TODAY, if they called you
tomorrow? Not what sounds good — what you can actually execute."

*Listen for: audit, workshop, implementation sprint, done-for-you build.*

**Q3.2 — The specific promise:**
"What specific, measurable thing can you promise inside a 30-day engagement? What would
make the client say 'that was worth it'?"

*Push for: hours saved, specific automations delivered, roadmap produced.
Not "we'll improve your business."*

**Q3.3 — First 10 clients:**
"How do you get your first 10 clients in the next 90 days? What's the first call you
make tomorrow?"

*BenAI: start with personal network. Content is for clients 11–100.*

**Q3.4 — Model:**
"Are you building a services business that uses content to get clients — or a
content/community business that uses services as an upsell? Both work. Pick one."

**Human-in-loop checkpoint:** Offer 2–3 entry offer structures (e.g., audit,
discovery month, workshop series) before drafting the full offer.md.

**Phase 3 output:** Entry offer + pricing model + first acquisition action

---

## Phase 4: Voice (Derived, Not Asked)

Derive voice from existing brand documents and from how the founder speaks in this
conversation. Do not ask "how would you describe your voice?" — that produces generic
answers.

**Extract:**
- 3–5 tone characteristics (direct, conviction-driven, practitioner-not-consultant, etc.)
- Language DOs: specific outcomes, action verbs, numbers
- Language DON'Ts: buzzwords, vague promises, passive voice
- 3–5 sample messages — cold outreach, workshop intro, content hook
  (in both DE + EN if the founder is bilingual or targets a bilingual market)
- 3–5 conviction statements — their strong POVs about the market, the problem, the solution

**One optional question:**
"Is there a sentence you've written or said that sounds most like you — where you thought
'yes, that's exactly how I think about this'?"

*This often unlocks the core voice pattern faster than any framework.*

**Phase 4 output:** voice.md

---

## Phase 5: Operational Context

Derive operational reality — the things a 90-day plan needs that the strategic docs don't contain. Ask these last, after the four foundation documents are confirmed. The answers feed directly into `context.md`, which the 90-Day Launch Plan skill reads in Phase 0 to eliminate redundant interview questions.

**Q5.1 — Network and audience:**
"What's your current LinkedIn network — followers, connections, and rough audience composition? Do you know approximately how many are decision-makers vs. general network?"

*The answer determines whether Phase 1 of the plan is a Warm Sprint or a Build Phase. 200 warm contacts is a very different starting point than 2,000.*

**Q5.2 — Infrastructure readiness:**
"What's in place today — Calendly or booking link, CRM, outreach tools, content tools? What's missing that you'd need to sign a client tomorrow?"

*Missing Calendly on Day 1 is a plan blocker. Surface it here so the plan can fix it.*

**Q5.3 — Team:**
"Who is involved in this business and in what capacity? Are there partners, collaborators, or
a team? For each person: what do they own — and when does their contribution actually become
active? Day 1 warm network activation is structurally different from Phase 3 cold outreach
support. Establish the timing and form of each person's contribution explicitly."

*Solo founder vs. 3-person partnership changes the plan structure significantly. But timing
matters as much as roles: a partner who activates their warm network from Day 1 changes
Phase 1; a partner who joins cold outreach in Month 2 changes Phase 3. The 90-day plan must
reflect the actual timing — not the aspiration. If a partner's contribution is uncertain or
schedule-dependent, flag it clearly so the plan doesn't rely on it.*

**Q5.4 — Parallel objectives:**
"Are you running other businesses or objectives in parallel? If so, how many hours per week does each actually get — not aspiration, actual allocation?"

*Someone running CCC + ABS + job search simultaneously at 50 hrs/week needs a time budget that reflects all three. Don't let the plan assume this is their only focus.*

**Q5.5 — Warm contact inventory:**
"How many warm contacts could you realistically reach out to in the next two weeks? Any specific clusters — agencies, consultants, former colleagues — worth prioritizing?"

*Tier structure for outreach depends on this. Don't estimate — get the actual number.*

**Phase 5 output:** context.md

---

## Output Documents

Load `references/output-templates.md` for the section structure of each document.

Save all **five** outputs to a dedicated folder agreed with the founder.
Suggested path: `[Business Name]/00 - GTM Foundation/`

The five outputs and their purpose:
- **ICP.md** — who you serve, the problem, trigger moments, objections
- **positioning.md** — your market position, differentiation, core statement
- **offer.md** — entry offer, pricing, delivery model, first acquisition action
- **voice.md** — tone, language DOs/DON'Ts, sample messages, conviction statements
- **context.md** — operational reality: network, infrastructure, team, parallel objectives, warm inventory

`context.md` is the bridge between strategy and execution. The 90-Day Launch Plan skill reads it in Phase 0 to skip operational questions it would otherwise have to ask.

After outputs are approved: note which specific framings or decisions produced the
strongest reaction from the founder. These become reference examples for future runs.

---

## Rules (Update This Section When Things Go Wrong)

1. Never generate the five output documents without completing all five phases. Partial
   context produces generic, forgettable outputs.
2. Never accept vague answers. "AI automation for businesses" is not a niche. Push every
   time until the answer is specific enough to call one particular person tomorrow.
3. Always offer multiple options at human-in-loop checkpoints — not just one
   recommendation. The founder's reaction to options reveals more than their open answers.
4. Distinguish documents from multiple businesses. Do not conflate a personal brand
   strategy with the new business being positioned.
5. Flag third-party documents (downloaded templates, lead magnets, external guides) as
   external — never treat them as the founder's strategic decisions.
6. Voice comes from observation, not from asking. Watch how the founder writes and speaks;
   extract the pattern rather than asking them to describe it.
7. Trigger moments and pain points are placeholders until real market research confirms
   which ones resonate. Label them as such in ICP.md.
8. Always complete Phase 5 before closing the session. The four strategy docs without
   context.md leave the 90-Day Launch Plan blind to operational reality — and it will
   have to re-ask everything Discovery already covered.
9. When a multi-partner business has one person as the "face/driver" and another as a
   "network activator", establish explicitly: (a) which partner's network is ICP-relevant,
   (b) when the network activator's contribution becomes active (Day 1 vs. Phase 3), and
   (c) what can be planned around vs. what must be treated as upside. Context.md must reflect
   this clearly so the 90-day plan isn't built on partner assumptions that don't hold.
10. Always surface how the ICP buys (Q2.4) before finalising positioning.md. If the ICP
    doesn't self-identify as buying "AI tools", "automation", or "digital marketing", then
    every document — positioning, voice, outreach scripts — must lead with outcomes, not
    methods. This is especially critical for professional services ICPs. Encode the outcome
    language as canonical and the tech language as prohibited in outreach.

---

## Self-Improvement

When a user corrects an output or identifies something that consistently goes wrong:
- Add a rule to the Rules section above
- Note what the failure mode was and what fixed it

When a user approves the final four documents:
- Note which specific choices or framings produced the strongest output
- Save approved documents as reference examples for future runs

This skill is never finished. The more it is used, the better it gets.

**Reference examples (live GTM runs):**

*CCC run (2026-03-02) — first live test:*
- Business: Claude Cowork Consultants (AI automation consultancy, DACH marketing agencies)
- Key insight from run: personal brand leads company brand; LinkedIn warm sprint is Phase 1 lever
- What produced the strongest output: Q1.3 specificity pressure drove to "DACH marketing agencies, 5–50 people" — removed all ambiguity
- Saved: `CCC/00 - CCC Foundation/` (five docs + context.md)

*ABS run (2026-03-03) — second live test, new learnings:*
- Business: Always Booked Solid (revenue pipeline consultancy, local professional services)
- What the CCC run didn't surface, the ABS run did:
  1. **"ICP doesn't buy AI" pattern** — the professional services ICP (lawyers, dental, financial advisors) buys outcomes ("fill my calendar", "fix the pipeline") not categories ("AI tools", "automation"). This wasn't explicitly asked in Phase 2 — next run catches it with Q2.4.
  2. **Industry brainstorm was generative** — going beyond Justin's initial ICP document added strong industries (care homes, Seniorenheime) not in the original list. Now encoded as Q1.5.
  3. **Partner timing required a correction** — initial context.md described Justin as "later stage cold calling partner." Daniel corrected: Justin joins with warm network from Day 1. Q5.3 now explicitly asks when each partner's contribution becomes active.
- Saved: `ABS/00 - ABS Foundation/` (five docs + context.md)

---

## Edge Cases

- **Multiple businesses in the vault:** Establish which business this GTM is for before
  Phase 0. Use other businesses only to identify unfair advantages, not as the subject.
- **Partial documents already exist:** Read them all in Phase 0. Use them to skip or
  accelerate phases — but not to validate uncritically. Old documents may reflect a
  previous iteration of the business.
- **Bilingual market:** Run sample messages in both languages. Translate for meaning and
  idiom, not word-for-word. German precision reads differently from English directness.
- **Founder instinct conflicts with niche criteria:** Surface the tension explicitly.
  Don't override their instinct — but name what the criteria suggest and let them decide.
- **Founder can't articulate their offer:** Back up to Q3.1 and scale down.
  Ask: "What would you do in one week if a client needed help tomorrow?"

---

## Error Handling

| Situation | Response |
|-----------|----------|
| No prior context found | Start Phase 1 cold; note in synthesis that no prior strategic context was found |
| Multiple conflicting ICP documents | Flag the conflict explicitly; ask which is current before proceeding |
| Founder stuck on Q3.2 (the promise) | Back up: "What would you deliver in one week, not one month?" |
| Positioning statement feels generic | Run specificity pressure: "Which specific type of [industry] reads this and says 'that's me'?" |
| Voice sounds like every other consultant | Find their most opinionated sentence and amplify it |
| Founder wants to skip phases | Acknowledge, but note which document will be weakest as a result |
