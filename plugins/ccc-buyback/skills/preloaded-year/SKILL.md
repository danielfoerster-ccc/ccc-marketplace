---
name: preloaded-year
description: |
  Builds the operator's Preloaded Year — a proactive annual calendar that places the
  most important events and activities first (Big Rocks), before reactive demands fill
  the space. Reads the 10X Vision to set strategic direction, breaks it into checkpoints,
  scores tactics with ICE scoring, and builds the year in five layers: Big Rocks, Batched
  Pebbles, Maintenance, Pebbles, and Stress Test. Outputs a dated Preloaded Year document
  to the vault. Use this skill whenever the operator says "preloaded year", "plan my
  year", "annual planning", "I keep missing important things", "I want to plan ahead",
  "help me set up this year", "yearly goals", "year plan", "big rocks", "plan next year",
  or any time the operator wants a proactive annual structure rather than a reactive one.
  Run after the 10X Vision skill for best results. Connects to the 90-Day Sprint skill
  — the year's Big Rocks feed directly into quarterly Rocks.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.1.0
  created: 2026-03-06
  updated: 2026-03-20
  language: English
  framework: Buy Back Your Time — Dan Martell (Preloaded Year + ICE scoring)
---

# Preloaded Year Skill

**Workflow: Vision → Checkpoints → Tactics → ICE Score → Build the Year → Stress Test → Output**

The Preloaded Year is what happens when you treat your calendar like your Production Quadrant — the most important things go in first, everything else fills the gaps.

Session time: ~45–60 minutes.

---

## Background: Big Rocks First

Stephen Covey's analogy: if you pour small pebbles into a bucket first, the big rocks don't fit. But if you put the big rocks in first, the pebbles fill in around them. Same bucket. Different result.

Most operators plan reactively — they fill their year with what shows up and wonder why the important things never happen. The Preloaded Year inverts this. You decide what matters most, put it in the calendar first, and let everything else find space around it.

**The year builds in five layers:**
1. **Big Rocks** — the non-negotiable personal and business events that must happen
2. **Batched Pebbles** — recurring tasks grouped into focused multi-day events
3. **Maintenance** — proactive energy management (don't wait until you're depleted)
4. **Pebbles** — recurring events that matter but aren't critical
5. **Stress Test** — look at the full calendar and ask: is this year worth saying "Damn!" at the end?

---

## Phase 0 — Context Load (automatic)

1. Check for 10X Vision: search for `*10X Vision*` in `03 - OPERATIONS/Buyback System/`
2. Check for existing Preloaded Year: search for `*Preloaded Year*` in `03 - OPERATIONS/Buyback System/`
3. Check for current sprint: search for `*90 Day Strategic Goal Attainment Sprint*` in `00 - COMMAND CENTER/Daily Notes/`
4. Surface what's found:
   - If 10X Vision exists: "I found your 10X Vision from [date] — I'll use it to set checkpoints."
   - If sprint exists: "Your current Rocks are [list] — these will anchor the Q1 Big Rocks."
   - If Preloaded Year exists: "You have a Preloaded Year from [date] — we're updating it."

---

## Phase 1 — From Vision to Checkpoints (~10 min)

If a 10X Vision exists in the vault, read the 3-Year Checkpoint section and use it as input. Otherwise ask:

**Q1 — Vision horizon**
"Quick anchor: in 10 years, what does the big picture look like — your business, team, lifestyle? One sentence per element (Team / Business / Empire / Lifestyle). Don't overthink it — we're just setting direction, not solving for it."

**Q2 — This year's checkpoint**
"If the 10-year vision is the destination: what does the 1-year checkpoint look like? What would you need to have achieved by December 31st of this year to know you're on track? One sentence per element."

Work backward to specific targets per element.

---

## Phase 2 — List Tactics for the Next Checkpoint (~10 min)

**Q3 — Brainstorm tactics**
"For each of those 1-year targets: what are all the things you could do this year to get there? Brainstorm everything — no filtering. Aim for 10–20 ideas. We'll score them next."

Prompt for completeness:
- "What events, conferences, or launches would move the needle?"
- "What hires, partnerships, or collaborations?"
- "What content, outreach, or visibility plays?"
- "What systems, tools, or processes need to be built?"
- "What personal development investments?"

Capture everything.

---

## Phase 3 — ICE Score Each Tactic (~10 min)

Score each tactic on three dimensions (1–10 each, max 30):

- **Impact**: What's the revenue or business effect if this works? (10 = massive; 1 = minimal)
- **Confidence**: How sure are you this will work? (10 = near-certain; 1 = Hail Mary)
- **Ease**: How easy is it to implement? (10 = very easy; 1 = extremely hard)

Work through the list together. For anything the operator can't score quickly, skip and come back.

Top 3–5 scoring tactics become the year's **Business Big Rocks** — the non-negotiable strategic activities.

---

## Phase 4 — Personal Big Rocks (~5 min)

**Q4 — Personal non-negotiables**
"What are the personal events, milestones, or commitments that absolutely cannot be missed this year? Birthdays, anniversaries, family vacations, health goals, significant life events. These go in first — no exceptions."

List them with approximate months.

**Q5 — Business Big Rocks (confirm)**
"From the ICE scoring, your top business priorities for the year are [list from Phase 3]. Do these feel right? Anything missing?"

---

## Phase 5 — Build the Year (~15 min)

Work through the five layers:

**Layer 1: Place Big Rocks First**
Assign each personal and business Big Rock to a specific month. Note any that need a specific date (anniversary) vs. a flexible window (conference, launch).

**Layer 2: Batch Pebbles into Big Rocks**
"Are there recurring activities you need to do multiple times this year that could be batched into one focused event? For example: all VIP client check-ins in one two-day stretch, all quarterly reviews in one dedicated day."
Identify the batching opportunities and turn them into Big Rock events on the calendar.

**Layer 3: Add Maintenance**
"When does your energy typically dip during the year? After a big event? End of quarter? Mid-summer? Schedule recovery deliberately — a long weekend after a major conference, a lighter week after a heavy launch. When do you need to recharge?"
Add maintenance windows to the calendar.

**Layer 4: Insert Pebbles**
"What recurring things happen every month or quarter that aren't critical but need to happen? Monthly team reviews, quarterly board updates, regular client check-ins, skill investments?"
Add these as recurring calendar events.

**Layer 5: Stress Test**
Look at the assembled year:
- "Does this feel overwhelming, or achievable?"
- "Are any months dangerously overloaded — events too close together?"
- "At the end of this year, if you did everything in this calendar, would you say 'Damn, that was an amazing year'?"

If the answer to the last question is no — rework it until it is.

---

## Phase 6 — Output

Save a new file at:
`03 - OPERATIONS/Buyback System/[YYYY] - Preloaded Year.md`

Use this exact template:

```markdown
# Preloaded Year — [YYYY]
**Created:** [Today's Date]
**10X Vision horizon:** [Year]
**1-Year Checkpoint:** See below

---

## 1-Year Checkpoint (from 10X Vision)
| Element | By Dec 31, [YYYY] |
|---|---|
| Team | |
| One Business | |
| Empire | |
| Lifestyle | |

---

## Top Tactics by ICE Score

| Tactic | Impact | Confidence | Ease | Total | Decision |
|---|---|---|---|---|---|
| [Tactic] | [1-10] | [1-10] | [1-10] | [sum] | Big Rock / Later / Drop |

---

## Big Rocks (non-negotiables)

### Personal Big Rocks
| Month | Event / Milestone |
|---|---|
| [Month] | [Event] |

### Business Big Rocks
| Month | Rock | From Vision element |
|---|---|---|
| [Month] | [Rock] | [Team / Business / Empire] |

---

## Annual Calendar

| Month | Big Rocks | Batched Pebbles | Maintenance | Pebbles |
|---|---|---|---|---|
| January | | | | |
| February | | | | |
| March | | | | |
| April | | | | |
| May | | | | |
| June | | | | |
| July | | | | |
| August | | | | |
| September | | | | |
| October | | | | |
| November | | | | |
| December | | | | |

---

## Stress Test Results
**Overwhelmed?** Yes / No — [note]
**Any colliding events?** [List if yes]
**Does this year jazz you up?** Yes / No — [if no, what to change]

---

## "Hell Yeah!" Filter
*When an ad-hoc opportunity comes up and you're tempted to deviate from this plan: ask "Is this a Hell Yeah opportunity?" If yes — consider changing plans. If no — stay on course. Only change course ~5–10% of the time.*

---

## Q1 → 90-Day Sprint Bridge
Your Q1 Big Rocks feed directly into your next 90-Day Sprint. See `planning:90-day-sprint`.

**Q1 Rocks (for sprint):**
- Rock 1 (Revenue): [from Big Rocks]
- Rock 2 (Thought Leadership): [from Big Rocks]
- Rock 3 (Operations): [from Big Rocks]
```

After saving, confirm the file path and say:
"Your Preloaded Year is set. Transfer the Q1 Rocks into your 90-Day Sprint now — run `planning:90-day-sprint` if you haven't this quarter."

---

## Rules

- Never build the Preloaded Year without an anchor to the 10X Vision, even a rough one. A year with no direction is just a reactive calendar with better formatting.
- Personal Big Rocks go in before Business Big Rocks. Always. Non-negotiable.
- The Stress Test is mandatory. A calendar that doesn't excite you won't be honored.
- The "Hell Yeah!" filter belongs in the output as a standing reminder — operators will need it when shiny opportunities appear.
- The Q1 → 90-Day Sprint bridge is critical for connecting this skill to the existing planning system.
- Always create a new file per year. Never overwrite.
- Keep all output in English.

---

## Self-Improvement

When the Stress Test answer is "no, this year doesn't excite me" but no changes are made, flag this more firmly: "A year that doesn't excite you won't be followed. We need to rework it — which element is the problem?"

When a Big Rock placed in a specific month consistently collides with an unplanned reality (school holidays, client surge, health dip), add it as a standing "watch" to the Stress Test: "Flag [month] as historically high-load — don't place two Big Rocks here."

When the ICE scoring session produces all-high scores (operator inflating confidence or ease), add a calibration check: "If everything scores 25+, the ICE tool isn't doing its job. Which one would you drop if you had to cut 20% of the list?"

When the "Hell Yeah! Filter" needs to be applied mid-year, update the "Notes & Updates" section of the Preloaded Year file with the decision and whether the course change was made.
