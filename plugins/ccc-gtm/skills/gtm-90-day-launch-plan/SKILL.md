---
name: gtm-90-day-launch-plan
description: |
  Produces a structured, actionable 90-day launch plan for AI automation businesses
  and consultants. Reads existing GTM foundation documents (ICP, positioning, voice,
  offer) when available, interviews the user about their current state, goals, capacity,
  and channels, then generates a phased plan with specific weekly actions, time budget,
  and a 90-day hypothesis.

  Use this skill when a user wants to: create a launch plan, quarterly execution roadmap,
  or go-to-market action plan. Also trigger on: "what should I do first", "how do I get
  my first client", "build me a plan for the next 90 days", "I need a launch roadmap",
  "help me plan my GTM execution", "plan out my next quarter".

  Works best after the GTM Discovery skill has run (foundation docs exist), but can
  operate without them by interviewing the user directly.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants (claudecoworkconsultants.com)
  version: 1.0.1
  updated: 2026-03-02
  part-of: GTM Strategy Plugin — Part 1
  based-on: Live GTM discovery session for CCC, March 2026
---

# GTM 90-Day Launch Plan Skill

**Workflow: Interview → Synthesize → Deliver.** Gather context from existing documents and a short interview, then produce a phased, specific, honest launch plan grounded in the user's real situation.

---

## Phase 0: Context Scan

Before asking a single question, read what already exists. This is where 80% of the context comes from.

1. Check `references/your-context.md` in this skill folder — if filled in, treat it as the primary context source
2. Scan the vault for GTM foundation docs. Look for `ICP.md`, `positioning.md`, `voice.md`, `offer.md` — likely in a `00 - Foundation` or similar folder near the current project. Read all four if found.
3. Check for any existing 90-day plan or OKR document (look for files named `90-day`, `OKR`, `sprint`, `quarterly`). If one exists, read it — you're updating or complementing it, not replacing it.
4. Note what you found and what's missing, then open with a brief synthesis: "I've read your ICP, positioning, offer, and existing OKR. Here's what I understand about your situation so far: [2-3 sentences]. I have a few questions before I build the plan."

This opening matters. It shows the user you've done the work — and it surfaces any misreads early.

---

## Phase 1: Interview

Ask these five questions. Ask them one or two at a time, not all at once — you learn more from their phrasing and emphasis than from a form filled in at speed. Read between the lines.

**Q1 — Current state**
"Where are you right now — zero clients, a few conversations, first paying client? And what channels are already active (LinkedIn, network outreach, cold email, workshops, etc.)?"

**Q2 — Success metrics**
"What does success look like at the end of these 90 days? Give me a specific number if you can — clients signed, revenue, something else that matters."

Push back on vague answers. "Grow my business" is not a target. "Sign 10 case study clients at €500 each by April 15" is. The specificity reveals what they actually believe is possible — which is the most useful thing to know.

**Q3 — Capacity**
"How many hours per week can you realistically give to this? And are there other projects or objectives running in parallel that share those hours?"

This question often surfaces the multi-bet reality. Someone running two businesses and a job search at 50 hrs/week needs a different plan than someone who's all-in. The plan must reflect actual capacity, not aspiration.

**Q4 — Brand situation**
"How established is your personal brand versus your company brand right now? LinkedIn following, existing content, existing network — which is stronger?"

At early stage, personal brand almost always leads. The plan structure changes depending on whether they're selling as a person or an unknown company.

**Q5 — Hard constraints**
"Anything I should know that would change the plan? A deadline, a commitment, a thing you've already tried that didn't work?"

This catches the things that don't fit neatly into the other questions.

---

## Phase 2: Synthesize

Before writing, think. The plan should be grounded in their specific situation, not a generic template.

**Identify the primary lever.** For zero-client businesses, this is almost always direct personal outreach to existing network — not LinkedIn content, not cold email, not a website. Those amplify; outreach does the work. Name this explicitly at the top of Phase 1 in the plan.

**Assess the brand situation.** If personal brand > company brand, add a "Two Brands, One Motion" framing section: personal brand is the vehicle, company brand is the offer. This is especially important if they haven't named this tension themselves.

**Calculate the realistic time budget.** Take their total hours, subtract other commitments, and work out what this project actually gets. Don't use the aspiration — use the number. A plan built on 8 hrs/week instead of 20 hrs/week looks very different and is far more useful.

**Name the delivery flywheel.** If the business involves building systems for clients, there's almost always a flywheel: every client engagement produces a reusable system that becomes a product component. Name this explicitly. It reframes delivery from a cost to an investment and is often the most motivating insight in the plan.

**Set the 90-day hypothesis.** One question the 90 days will answer. Not a goal — a question. "Which type of client produces the highest ROI?" or "Does cold outreach or workshop attendance convert better?" This anchors the plan as a learning instrument, not just an execution checklist.

Read `references/plan-template.md` for the proven output structure. Use it as a scaffold, not a constraint — adapt sections that don't fit.

---

## Phase 3: Deliver

Write the plan as a markdown file. Save it to:
- If foundation docs exist: same folder as `ICP.md` (sibling file, named `90-day-launch-plan.md`)
- Otherwise: wherever makes sense in the user's vault, or ask

The plan should be honest. If their March target is a stretch, say so — and explain what "good" actually looks like. Plans that only reflect best-case scenarios fail to build trust and don't survive first contact with reality.

**Also save `process-notes.md` alongside the plan**, structured clearly with two separate sections:

```
## Assumptions I Made to Proceed
[Things you inferred from context and proceeded with — the user doesn't need to answer these,
but should know what the plan is built on. E.g.: "Assumed personal brand leads company brand
based on LinkedIn follower count mentioned." "Assumed warm outreach is viable given 3 months
of posting history."]

## Questions for You to Answer
[Things that require the user's actual input to refine the plan. E.g.: "What's your current
pricing — do you have a number in mind yet?" "Do you have a LinkedIn network in your ICP, or
is your audience mostly general?" These are refinements for iteration, not blockers.]
```

This separation matters: assumptions are things you took responsibility for deciding; questions are things only the user can answer. Mixing them makes both less actionable.

After saving, present the plan and ask: "What feels right? What feels off? Is there anything missing from your situation that the plan doesn't account for?"

---

## Output Structure

The proven structure from the live CCC session (see `references/plan-template.md` for full templates):

1. **Header** — dates, version, OKR mapping if relevant
2. **Before Strategy: The One Thing** — the primary lever, named bluntly
3. **Two Brands, One Motion** — only if personal brand ≠ company brand
4. **Phase 1 (Days 1–14)** — first clients, week-by-week
5. **Phase 2 (Days 15–45)** — deliver, document, amplify
6. **Phase 3 (Days 46–90)** — scale with proof
7. **Weekly Time Budget** — realistic table, multi-objective if applicable
8. **What Not To Do** — 4–5 specific failure modes for this situation
9. **The 90-Day Hypothesis** — one question the plan will answer

---

## Rules

1. Never write the plan before reading the foundation docs and completing the interview. A plan built on partial context is a generic plan, and generic plans don't get executed.

2. Never accept vague success metrics. "Sign 10 clients by April 15 at €500 each" is a target. "Grow the business" is not. Push until you have a number and a date.

3. Always ask about other active projects. Someone running three bets simultaneously needs a time budget that reflects all three — not a plan that assumes this is their only focus.

4. Be honest about stretch targets. If their goal is ambitious, say so, explain what's realistically achievable, and structure the plan to maximize the chance of hitting the stretch. Don't validate fantasy, but don't deflate ambition either.

5. The delivery flywheel insight should appear in every plan where the business involves building systems for clients. It reframes the hardest part of scaling (delivery capacity) as the most valuable part (product development). Don't omit it.

6. Always end with the 90-day hypothesis. It gives the whole plan a point beyond just executing tasks.

---

## Self-Improvement

When a plan misses something important or a section consistently generates clarifying questions:
- Add a question to Phase 1 that would have caught it
- Add a rule above if it's a failure mode to prevent

When a plan is approved or produces a strong result:
- Note what framing or structure worked particularly well
- Save approved examples as reference plans in `references/examples/` for future runs

The CCC 90-day plan from March 2026 is the first reference example. It's saved at:
`A - A - Empire/Claude Cowork Consultants/00 - CCC Foundation/90-day-launch-plan.md`

This skill is never finished. Every plan it produces makes the next one better.
