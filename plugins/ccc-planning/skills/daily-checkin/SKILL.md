---
name: daily-checkin
description: |
  Runs a lean 10-minute daily morning check-in. Reads the active weekly plan to pull
  today's day type, TOP 3 goals, and remaining tasks — then guides through five quick
  inputs: Revenue First question, Daily Drumbeat task list, Today's TOP 3, supporting
  tasks, and dependencies. Outputs a dated daily check-in file to the vault. Update
  the Drumbeat table throughout the day as tasks move. Run every morning before the
  outreach block starts.
  Trigger on: "daily check-in", "morning check-in", "start my day", "daily plan",
  "daily drumbeat", "plan today", "morning session".
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-03-06
  language: English
---

# Daily Check-in Skill

**Workflow: Context Load → 5 Inputs → Output**

10-minute morning session. Five components, no bloat.

---

## Phase 0 — Context Load (automatic, no questions)

1. Find and read the most recent `*Weekly Plan*` file in `A - A - Empire/A - Daily Notes/`
2. Identify today's day type from the day assignments table (Outreach / Delivery / Infrastructure)
3. Pull the week's TOP 3 goals and the TOP 10 task list with current checkbox states
4. Surface this in one compact block before asking anything:

```
Today is [Day], [Date]. Day type: [Outreach / Delivery / Infrastructure]
Week's TOP 3: (1) [Goal] (2) [Goal] (3) [Goal]
Remaining from TOP 10: [list unchecked tasks only]
```

If no weekly plan file exists, proceed without it and note: "No weekly plan found — I'll build today's check-in from scratch."

---

## Phase 1 — Revenue First (1 question)

**Q1**
"Revenue First: what is the one action you can take today that moves money forward? A call made, a message sent, a proposal closed, a follow-up done. Name it specifically."

This answer becomes the first item in the Drumbeat and the anchor for TOP 3.

---

## Phase 2 — Daily Drumbeat Setup (1 input)

**Q2**
"Let's build your Drumbeat — the complete task list for today. I'll pre-populate it with your Revenue First action and any unchecked items from this week's TOP 10 that belong today. Add anything else you want on today's list, and tell me the priority of each: High / Mid / Low."

Pre-populate with:
- Revenue First action (from Q1) → High
- Any TOP 10 tasks assigned to today's day type → carry over their priority
- Leave status as `To Do` for all

The Drumbeat is a live table. It gets updated when the user comes back during the day and reports progress. See update instructions at the end of this skill.

---

## Phase 3 — TOP 3 for Today (1 input)

**Q3**
"From everything on today's Drumbeat: what are the three things that, if done, make today a success? These are your TOP 3."

If the Revenue First action is obvious as #1, say so and confirm. Don't make the user repeat themselves.

---

## Phase 4 — Dependencies (1 input)

**Q4**
"Quick dependencies check: who are you waiting on today? And is anyone waiting on you for something?"

Keep this to one line per dependency. If none, skip.

---

## Phase 5 — Output

Save a new file at:
`A - A - Empire/A - Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] - Daily Check-in.md`

Use this exact template:

```markdown
# Daily Check-in — [Day, Date]
**Day Type:** [Outreach / Delivery / Infrastructure]
**Week's TOP 3 (reference):** [Goal 1] · [Goal 2] · [Goal 3]

---

## ⚡ Revenue First
> [The specific revenue action for today]

---

## 🥁 Daily Drumbeat

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | [Revenue First action] | High | To Do | |
| 2 | [Task] | High | To Do | |
| 3 | [Task] | High | To Do | |
| 4 | [Task] | Mid | To Do | |
| 5 | [Task] | Mid | To Do | |
| 6 | [Task] | Mid | To Do | |
| 7 | [Task] | Low | To Do | |
| 8 | [Task] | Low | To Do | |

*Status options: To Do · In Progress · Done · Blocked*
*Update this table throughout the day.*

---

## ✅ Today's TOP 3
1. [Task / Goal]
2. [Task / Goal]
3. [Task / Goal]

---

## 📋 Supporting Tasks
- [ ] [Task]
- [ ] [Task]
- [ ] [Task]

---

## 🔗 Dependencies
**Waiting on:** [Name — what for] *(or: none)*
**They're waiting on me:** [Name — what for] *(or: none)*

---

## End-of-Day (fill in before shutdown)
**TOP 3 completed:** Yes / Partial / No
**Revenue First done:** Yes / No
**Carry-forward to tomorrow:** [tasks not completed]
**One thing that would have made today better:**
```

After saving, confirm the file path and say:
"Your day is set. Revenue First action is locked. Start the outreach block now."

---

## Drumbeat Updates (during the day)

When the user returns mid-day or end-of-day and reports progress:

1. Read the existing daily check-in file
2. Update the Status column for each task mentioned: `To Do → In Progress → Done / Blocked`
3. Add brief notes if the user provides context (e.g., "blocked: waiting for Justin reply")
4. If new tasks come in, append them to the Drumbeat table
5. Save the updated file back to the same path (overwrite — this is a live document)

Trigger phrases for Drumbeat updates:
- "Update my drumbeat"
- "Mark [task] as done"
- "I finished [task]"
- "[Task] is blocked"
- "Add [task] to today"

---

## Rules

- Always load the weekly plan first. The day type determines what kind of work the Drumbeat should be loaded with.
- Revenue First is always item #1 in the Drumbeat and always High priority.
- TOP 3 come from the Drumbeat — don't invent new goals.
- Supporting tasks are anything on the Drumbeat below priority High that didn't make the TOP 3.
- Keep the session to 4 questions. If context load gives enough to pre-fill everything, reduce to 2 questions (Q1 + Q4).
- The daily file is a live document — it gets updated throughout the day, not just in the morning.
- Always create a new dated file in the morning. The Drumbeat update flow overwrites the same file.
- Keep all output in English.
- End-of-Day section stays blank at creation — filled by the user or via a Drumbeat update session.
