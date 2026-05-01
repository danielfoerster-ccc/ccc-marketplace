---
name: perfect-week
description: |
  Designs the operator's Perfect Week — a structured weekly time template that
  eliminates wasted buffer time, prevents context-switching, protects deep work, and
  batches similar tasks together. Guides through an audit of the current schedule,
  identifies time leaks (buffer time, bleed time, scattered task types), and builds a
  concrete weekly grid with energy-optimized time blocks. Outputs a dated Perfect Week
  document to the vault. Use this skill whenever the operator says "perfect week",
  "design my week", "I'm scattered all week", "I keep getting pulled into meetings",
  "I want to batch my tasks", "I need structure in my week", "my schedule is chaos",
  "I'm always reactive", or wants to protect time for deep work and high-value activities.
  Run after the Buyback Audit so you know what belongs in the Production Quadrant.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-03-06
  language: English
  framework: Buy Back Your Time — Dan Martell (Perfect Week)
distribution: marketplace-ready
---

# Perfect Week Skill

**Workflow: Current Schedule Audit → Identify Leaks → Design Grid → Stress Test → Output**

Build the week that protects your highest-value work. Not an ideal fantasy — an honest template you'll actually honor.

Session time: ~30 minutes.

---

## Background: The Three Time Killers

Before designing anything, understand what to eliminate:

1. **Buffer time** — gaps between tasks that feel like breaks but aren't. They accumulate silently. Fix: stack tasks tight and schedule real breaks deliberately.
2. **Bleed time** — meetings and calls that run over. They cascade into the rest of the day. Fix: hard-stack meetings with no gap before the next commitment.
3. **Context switching** — bouncing between different types of work. Every switch costs ~10 minutes of re-entry time. Doing the same task in fragmented pieces takes 6× longer than doing it in one block. Fix: batch same-type tasks together.

**N.E.T. Time** (No Extra Time) = using time that would otherwise be dead — commutes, waiting, walks — by pairing it with audio content, calls, or review.

---

## Phase 0 — Context Load (automatic)

1. Check if a Buyback Audit exists: search for `*Buyback Audit*` in `A - A - Empire/Buyback System/`
2. If found, read the Production Quadrant section — these are the tasks that must be protected in the Perfect Week
3. Check if a previous Perfect Week exists: search for `*Perfect Week*` in `A - A - Empire/Buyback System/`
4. Surface what's found: "Your Production Quadrant work from the audit: [list]. I found a previous Perfect Week from [date] — we're updating it."

---

## Phase 1 — Current Schedule Audit (4 questions, ~10 min)

**Q1 — Current reality**
"Walk me through a typical week right now. What does Monday to Friday actually look like — not the ideal, the real? What kinds of work fill your days, and roughly when?"

**Q2 — Recurring commitments**
"What are the non-negotiables — things that happen every week no matter what? Meetings, calls, client commitments, team check-ins. List them with their usual day/time."

**Q3 — The leaks**
"Where does time disappear in your week? Buffer gaps, meetings that run over, random interruptions, tasks you keep bouncing between — name the patterns."

**Q4 — Energy map**
"When in the day are you at your sharpest? When does your energy dip? And when are you most creative versus most mechanical? Be honest — most people have 2–3 peak hours and the rest is varying levels of decline."

---

## Phase 2 — Design Principles (share before building)

Before building the grid, confirm these principles apply:

- **Most important work first** — Production Quadrant work goes in peak energy hours (typically morning). Admin, email, and meetings go later.
- **Batch by task type** — Group all calls together. All deep work together. All admin together. Never mix.
- **Day-type theming** — Assign each day a primary mode: Outreach / Delivery / Infrastructure. Mixing all three in one day = constant context switching.
- **Protect the deep work block** — At least 2 hours of uninterrupted Production Quadrant time every day. Non-negotiable.
- **Honor it** — A Perfect Week is a template, not a wish list. Once designed, commit to it for at least 4 weeks before adjusting.

Confirm with the operator: "Do any of these principles need adjusting for your situation before we build?"

---

## Phase 3 — Build the Grid (interactive, ~15 min)

Work through the week day by day. For each day:
1. Name the day type (Outreach / Delivery / Infrastructure — same language as the planning plugin)
2. Assign the morning block (06:00–12:00): what type of work, what specific tasks
3. Assign the afternoon block (12:00–18:00): what type of work, what specific tasks
4. Flag any hard commitments (existing meetings, calls)
5. Place a Day Close block (15–30 min at end of day: review what happened, prep tomorrow)

For operators using the planning plugin, cross-reference the weekly day assignments:
- Outreach days (ABS/CCC calls) → morning block = outreach, afternoon = follow-ups or calls
- Delivery days → morning block = deep client work, afternoon = delivery or check-ins
- Infrastructure days → morning block = system-building, afternoon = admin and review

Also place:
- N.E.T. Time slots (commute, lunch, transitions) with suggested uses
- Buffer blocks (1–2 per week, intentional — not accidental)
- Wind Down block (evening: disconnect from work, recharge)

---

## Phase 4 — Stress Test (2 questions, ~5 min)

**Q5**
"Looking at this grid: does it feel achievable for a normal week — not a perfect week, a typical one? Or does it feel like wishful thinking?"

If it feels too full: identify what to trim or move. The Perfect Week must be sustainable, not aspirational to the point of being ignored.

**Q6**
"What's the most common thing that will blow this up — and what's your pre-decided response when it happens?"

One answer per likely disruption. This becomes the "defend the week" rule.

---

## Phase 5 — Output

Save a new file at:
`A - A - Empire/Buyback System/[YYYY-MM-DD] - Perfect Week.md`

Use this exact template:

```markdown
# Perfect Week — [Date]
**Created:** [Today's Date]
**Review date:** [4 weeks from today]

---

## Design Principles (my commitments)
- Most important work gets peak hours (morning)
- Task batching: calls with calls, deep work with deep work, admin with admin
- Day types: [Mon/Wed = Outreach | Tue/Thu = Delivery | Fri = Infrastructure] (adjust as noted)
- Deep work block: minimum 2 hours, uninterrupted, every day
- Honor it for 4 weeks before changing anything

---

## Weekly Grid

| Time | Monday | Tuesday | Wednesday | Thursday | Friday |
|---|---|---|---|---|---|
| 06:00–07:00 | [Wind Up] | | | | |
| 07:00–09:00 | [Deep Work / Revenue First] | | | | |
| 09:00–12:00 | [Outreach / Delivery / Deep Work] | | | | |
| 12:00–13:00 | [Lunch + N.E.T.] | | | | |
| 13:00–17:00 | [Calls / Admin / Delivery] | | | | |
| 17:00–17:30 | [Day Close] | | | | |
| 17:30+ | [Wind Down — no work] | | | | |

*(Populate each cell with specific task types based on session answers)*

---

## Day Types
| Day | Mode | Primary Focus |
|---|---|---|
| Monday | [Outreach / Delivery / Infra] | [What] |
| Tuesday | | |
| Wednesday | | |
| Thursday | | |
| Friday | | |

---

## N.E.T. Time Slots
| Slot | Activity | Use for |
|---|---|---|
| [Time/context] | [e.g., Morning commute] | [e.g., Audio learning / podcast] |

---

## Recurring Commitments (hard blocks)
| Day | Time | Commitment |
|---|---|---|
| [Day] | [Time] | [Meeting/call] |

---

## Defend the Week
**Most likely disruption:** [What]
**Pre-decided response:** [What I'll do when it happens]

---

## Review Notes (fill at 4-week mark)
**What worked:**
**What to change:**
**Version 2 adjustments:**
```

After saving, confirm the file path and say:
"Your Perfect Week template is saved. Honor it for 4 weeks before making changes. The goal isn't perfection — it's consistency."

---

## Rules

- Never design the Perfect Week without understanding the operator's current reality first. An ideal grid with no grounding in actual commitments will be ignored.
- Day Close is non-negotiable. It belongs in every day's grid.
- If the operator has no Production Quadrant time in the morning, flag it directly: "You have no protected deep work time in the morning — that's the highest-leverage change we can make."
- The review date (4 weeks) is mandatory in the output. Perfect Weeks are iterated, not designed once and used forever.
- If the operator has an existing planning plugin week structure, align day types to match.
- Keep all output in English.
