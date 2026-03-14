---
name: weekly-planning
description: |
  Runs a structured weekly review and planning session. Reads the active 90-day sprint
  file to surface current Rocks and Pebbles as context, then guides through a lean
  review of the past week and a concrete plan for the next. Outputs a dated weekly plan
  file to the vault. Run on Sunday evening or Monday morning before the week begins.
  Trigger on: "weekly planning", "weekly review", "plan my week", "week review",
  "Sunday planning", "start of week", "weekly check-in".
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-03-06
  language: English
  framework: HEROIC SOP + Flashhub cadence hybrid
---

# Weekly Planning Skill

**Workflow: Context Load → Week Review → Week Plan → Output**

Lean weekly review and planning session. No spiritual frameworks. Pure execution.

Session time: ~20 minutes.

---

## Phase 0 — Context Load (automatic, no questions)

Before asking anything:

1. Find and read the most recent `*90 Day Strategic Goal Attainment Sprint*` file in `A - A - Empire/A - Daily Notes/`
2. Find and read last week's `*Weekly Plan*` file if it exists
3. Surface a brief summary: "Your active Rocks this quarter: [list]. Your Pebbles for each: [list]."
4. This becomes the reference frame for the entire session — no need to re-state OKRs during the review or plan.

---

## Phase 1 — Week Review (9 questions, ~12 min)

Ask one at a time. Wait for each answer.

**Q1 — Wins**
"What were this week's wins? Revenue, calls made, clients signed, milestones hit, progress on Rocks. However small — list them."

**Q2 — What didn't happen**
"What should have happened this week that didn't? Give me the honest one-sentence reason for each."

**Q3 — Key decisions + assumptions**
"What were the most important decisions you made this week? And were the assumptions behind those decisions actually correct — or just the most available ones at the time?"

**Q4 — Key learnings**
"What did you learn this week that's worth holding onto? One to three things maximum."

**Q5 — Routines maintained**
"Did you maintain your core routines this week? Specifically: was the outreach block protected? Rate it honestly — not for guilt, for calibration."

**Q6 — Current issues**
"What are the live issues in your business and life right now — the things that are creating friction, slowing momentum, or sitting unresolved in the back of your mind?"

**Q7 — Solutions**
"For each issue you just listed: what's the solution or next action? Even a partial answer counts."

**Q8 — Assets from issues**
"From solving any of those issues: is there a system, SOP, process, or reusable asset that should be built? If yes, name it — it goes into next week's TOP 10."

**Q9 — Dependencies**
"Who are you waiting on right now? And who is waiting on you?"

---

## Phase 2 — Week Plan (5 inputs, ~8 min)

**Q10 — TOP 3 Goals**
"What are the three things you absolutely must achieve this week? One per major focus area (ABS, CCC, personal or infrastructure). These are your non-negotiables."

**Q11 — TOP 10 Tasks**
"List up to 10 tasks you want to complete this week — beyond the TOP 3. Include anything carried over from last week, assets identified in Q8, and Pebble-level activities from your sprint. Prioritise as you list them."

**Q12 — Day assignments**
"Let's assign the week. Which days are Outreach days (ABS calls / CCC LinkedIn+email), which are Delivery days (client work), and which are Infrastructure days (systems, skills, planning)?
Standard template to confirm or adjust:
- Mon / Wed: Outreach (ABS)
- Tue / Thu: Outreach (CCC) or Delivery
- Fri: Infrastructure + weekly review prep
Just tell me what changes, if anything."

**Q13 — Pre-mortem**
"What's the most likely thing that derails this week — and what's your pre-decided response if it happens?"

**Q14 — Meeting audit**
"Are there any meetings this week you can cancel, shorten, or move to protect your outreach block?"

**Q15 — Delegation queue**
"Which tasks from your TOP 10 are ready to hand off this week — to Claude or a team member? Think: research, drafting, building, analysis, structured workflows, admin — anything where someone else can produce a complete output if you give them good context. List them and note who you're handing off to and what context they'll need."

Pre-populate with any tasks from the TOP 10 that match common delegation patterns (research, writing, systems-building, analysis, document creation, admin).

---

## Phase 3 — Output

Save a new file at:
`A - A - Empire/A - Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] - Weekly Plan.md`

Use this exact template:

```markdown
# Weekly Plan — Week of [Monday Date]
**Created:** [Today's Date]
**Active Quarter:** [Sprint period from loaded file]

---

## This Week's Rocks & Pebbles (from 90-Day Sprint)
| Rock | Pebble Targets This Week |
|---|---|
| [Rock 1 — S&M Revenue] | [Target] |
| [Rock 2 — S&M Thought Leadership] | [Target] |
| [Rock 3 — Operations] | [Target] |

---

## TOP 3 Goals This Week
1. [Goal — Business/Area]
2. [Goal — Business/Area]
3. [Goal — Business/Area]

---

## TOP 10 Tasks
- [ ] 1. [Task] — [Priority: High/Mid/Low]
- [ ] 2. [Task]
- [ ] 3. [Task]
- [ ] 4. [Task]
- [ ] 5. [Task]
- [ ] 6. [Task]
- [ ] 7. [Task]
- [ ] 8. [Task]
- [ ] 9. [Task]
- [ ] 10. [Task]

---

## Day Assignments
| Day | Mode | Focus |
|---|---|---|
| Monday | [Outreach / Delivery / Infra] | [Business / task] |
| Tuesday | | |
| Wednesday | | |
| Thursday | | |
| Friday | | |

---

## Dependencies
**Waiting on:** [Name — what for]
**They're waiting on me:** [Name — what for]

---

## Pre-Mortem
**Most likely derail:** [What]
**Pre-decided response:** [What I'll do if it happens]

---

## Delegation Queue This Week

| Task | Recipient (Claude / Name) | Context needed | Expected output | When |
|---|---|---|---|---|
| [Task from TOP 10] | [Claude / VA name / etc.] | [Files, background, specifics needed] | [What they should produce] | [Mon / Tue / etc.] |

*Tip: use the Handoff Prep skill before each delegation to package a tight brief — AI or human.*

---

## Week Review (completed at end of week)

**Wins:**

**What didn't happen + why:**

**Key decisions + assumptions check:**

**Key learnings:**

**Routines maintained:** Yes / Partial / No — [note]

**Issues + solutions:**

**Asset to build:**
```

After saving, confirm the file path and say:
"Your week is set. Start Monday with the outreach block — everything else follows."

---

## Rules

- Always load the active sprint file first. The Rocks and Pebble targets are the anchor for every week plan.
- Never ask about OKRs or quarterly goals during the session — those live in the sprint file.
- The Week Review section in the output stays blank — it gets filled at the end of the week (or feeds into next week's Phase 1).
- TOP 10 tasks are a list, not a project plan. Keep them single-line.
- Day assignments default to the standard template. Only change what the user specifies.
- Always create a new dated file. Never overwrite.
- Keep all output in English.
- If the user is short on time, Phase 1 can be compressed: ask Q1, Q2, Q6, and Q9 only, then move to Phase 2.
