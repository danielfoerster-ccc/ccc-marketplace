---
name: weekly-planning
description: |
  Runs a structured weekly review and planning session. Loads the active 90-day sprint,
  last week's plan, and the Braindump Vault. Guides through: Week Review (wins, gaps,
  decisions, learnings, routines, issues, dependencies), Braindump (read vault + dump
  new items + re-prioritize), and Week Plan (TOP 3, week shape, daily container, carry-
  forwards, parking lot). Creates the new week folder and saves the weekly plan file.
  Outputs a dated weekly plan to the vault. Run on Sunday evening or Monday morning.
  Trigger on: "weekly planning", "weekly review", "plan my week", "week review",
  "Sunday planning", "start of week", "weekly check-in".
allowed-tools: "Read, Write, Glob, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 2.1.0
  created: 2026-03-06
  updated: 2026-04-15
  language: English
  framework: HEROIC SOP + Flashhub cadence hybrid
  distribution: marketplace-ready
---

# Weekly Planning Skill

**Workflow: Context Load → Week Review → Braindump → Week Plan → Output**

Session time: ~25 minutes.

## Elicitation Widget

Collect the Week Review inputs (Q1–Q7) in **one widget** — not question by question. This is the required approach for the review phase.

**Steps (every weekly planning session):**
1. Complete Phase 0 (context load) first — surface the compact summary block
2. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` (silent — no output)
3. Build and call `mcp__visualize__show_widget` with a form that has:
   - A read-only context card inside `.elicit-body` showing: sprint name, week N of 13, rocks with colored status dots, last week's carry-forwards, braindump A/B counts
   - Q1 wins: textarea
   - Q2 what didn't move: textarea
   - Q3 what changes next week: textarea (the single most important change)
   - Q4 key learnings: textarea (1–3 things max)
   - Q5 routines maintained: pills — `Held` / `Partial` / `Broke down`
   - Q6 current issues: textarea
   - Q7 dependencies: textarea
4. Submit button label: **"Start the plan"**
5. Wait for submission, parse, then continue to Phase 1b (Braindump) and Phase 2 (Week Plan) in conversation

Use the widget for the **review phase only**. Braindump and Week Plan phases flow naturally as conversation after the form is submitted.


---

## Phase 0 — Context Load (automatic, no questions)

Before asking anything, load all three:

1. **Sprint file** — find the most recent `*90 Day Strategic Goal Attainment Sprint*` in `00 - COMMAND CENTER/Daily Notes/` — extract Rocks, Pebbles, quarter theme
2. **Last week's Weekly Plan** — find the most recent `*Weekly Plan*` file — extract last week's TOP 3, Rock statuses, carry-forwards, and open dependencies
3. **Braindump Vault** — search for the most recent `*Braindump Vault*` in `00 - COMMAND CENTER/Daily Notes/` — it lives in the previous week's folder as `YY-MM-DD - Braindump Vault.md` — note A-items and B-items for context

Surface a brief summary:
```
Active Sprint: The Quarter of [Theme] · Week [N] of 13
Rocks: (1) [Rock 1] (2) [Rock 2] (3) [Rock 3]
Last week's carry-forwards: [list]
Braindump Vault: [N] A-items open · [N] B-items open
```

---

## Phase 1 — Week Review (~12 min)

Ask one at a time. Wait for each answer.

**Q1 — Wins**
"What were this week's wins? Revenue, calls made, clients signed, milestones hit, progress on Rocks. However small — list them."

*Tip: offer to read the week's daily work notes to unearth wins the user may have forgotten.*

**Q2 — What didn't move**
"What should have happened this week that didn't? One honest sentence per item."

**Q3 — What changes next week**
"Based on the wins and gaps: what's the one thing you're doing differently next week?"

**Q4 — Key learnings**
"What did you learn this week worth holding onto? One to three things max."

**Q5 — Routines maintained**
"Did you maintain your core routines? Was the daily container held? Rate it honestly — not for guilt, for calibration."

**Q6 — Current issues**
"What live issues are creating friction or sitting unresolved — business or life?"

**Q7 — Dependencies**
"Who are you waiting on? Who is waiting on you?"

---

## Phase 1b — Braindump (~5 min)

After the review, before planning.

1. Read the Braindump Vault — surface current A and B items
2. Ask: "Before we plan: full brain dump. Everything on your mind — tasks, ideas, commitments, nagging things. Don't organise it, just dump it."
3. Take the dump and re-prioritize the full list into A / B / C:
   - **A** — Urgent & Important (must address this week or has hard deadline)
   - **B** — Important, semi-urgent (aim for this week, flex if needed)
   - **C** — Parking Lot / Someday (captured, not this week)
4. Create this week's Braindump Vault file at `[new week folder]/YY-MM-DD - Braindump Vault.md` (Sunday date of the new week):
   - Copy all open `[ ]` and this-week `[ ] →` items from last week's vault, carrying their status
   - Add new items from the user's dump, assigned to A / B / C
   - Mark items that were completed this past week as `[x]` (move to Done section)
   - Re-sort A / B / C based on updated priorities
   - Update "Last updated" date
5. Each week's Braindump Vault is a snapshot — a fresh file per week in the week folder. This creates a record of how the braindump evolves week to week. Items are never deleted from a week's file, only status-updated.

---

## Phase 2 — Week Plan (~8 min)

**Q8 — TOP 3 Goals**
"What are the three outcomes that, if achieved by Friday, make this week a success?"

**Q9 — Week shape**
"Let's assign the week. What's the primary focus for each day — Outreach / Delivery / Infrastructure? And what are the non-negotiable milestones for each day?"

**Q10 — Daily container**
"What's your daily rhythm this week? Confirm or adjust the container:
- Wake time
- Deep Work I (until when)
- Reset (movement + EFT)
- Lunch + rest
- Deep Work II (until when)
- Evening presence
- Shutdown + sleep"

**Q11 — Carry-forwards**
"From last week's open items and the Braindump Vault A-list: which carry-forwards get hard day slots this week, and which go to the Parking Lot?"

**Q12 — Parking Lot**
"What's explicitly NOT this week — captured but parked?"

**Q13 — Daily Drumbeat**
"What are the non-negotiable recurring items every day this week?"

---

## Phase 3 — Output

**Folder creation:**
Before saving, create the new week folder:
`00 - COMMAND CENTER/Daily Notes/[YEAR (folder)]/[QUARTER (folder)]/[YY-MM-DD to YY-MM-DD]/`

Use the format `26-03-16 to 21` for week of March 16–21.

**File location:**
`[new week folder]/YY-MM-DD - Weekly Plan.md` (date = Monday of the week)

**Template:**

```markdown
# Weekly Plan — Week of [Monday Date]
**Sprint:** [Quarter name and dates]
**Week:** [N] of 13
**Theme:** [One-line theme for this week]

---

## 🏔️ Rock Health Check

| Rock | Target (end of sprint) | Status | This Week's Move |
|------|----------------------|--------|-----------------|
| Rock 1 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |
| Rock 2 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |
| Rock 3 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |

---

## 🎯 TOP 3 This Week

1. [Goal]
2. [Goal]
3. [Goal]

---

## 🗓️ Week Shape

### [Day] — [Theme]
**Milestone:** [non-negotiable outcome]
- [Task]
- [Task]

*(repeat for each day)*

---

## ⏱️ Daily Container

| Time | Block |
|------|-------|
| [Wake] | Wake |
| [Start]–[End] | Deep Work I |
| [Time] | Movement + EFT tapping |
| [Time]–[Time] | Lunch + full rest |
| [Time]–[End] | Deep Work II |
| [Time]–[Time] | [Evening presence] |
| [Time]–[Time] | Shutdown ritual |
| [Time] | Sleep |

---

## 🥁 Daily Drumbeat

| # | Item | Time/Volume |
|---|------|-------------|
| 1 | [Recurring daily task] | [Amount] |
| 2 | [Recurring daily task] | [Amount] |
| 3 | [Recurring daily task] | [Amount] |

---

## 🔗 Dependencies

**They're waiting on me:**
- [Name — what for · day]

**I'm waiting on:**
- [Name — what for]

---

## 💰 Pipeline Tracker

| Lead | Value | Offer | Status |
|------|-------|-------|--------|
| [Name] | [€] | [Offer] | [Status] |

---

## 🅿️ Parking Lot (not this week)

- [Item]
- [Item]

---

## 📝 Braindump / New Items This Week

*(Add here during the week — capture, don't act)*

---

## Week Review (filled at end of week — or feeds next week's Phase 1)

**Wins:**

**What didn't move + why:**

**What changes next week:**

**Key learnings:**

**Routines maintained:** Yes / Partial / No

**Issues + solutions:**
```

After saving, confirm the file path and say:
"Your week is set."

---

## Rules

- Always load Sprint + last week's plan + Braindump Vault in Phase 0.
- The Braindump Vault is a per-week file living in the week folder (`YY-MM-DD - Braindump Vault.md`). Read last week's vault in Phase 0. Create this week's fresh vault in Phase 1b by carrying forward open items. This creates a week-by-week record of how the braindump evolves.
- Week Review goes at the bottom of last week's plan (not this week's).
- Always create the new week folder before saving.
- Rock Health appears at the top of every weekly plan — before TOP 3.
- The Braindump phase (1b) always runs between Review and Planning — it is not optional.
- Parking Lot items go to the Braindump Vault as C-items, not into the weekly plan.
- Keep all output in English.
- If the user is short on time, Phase 1 can be compressed to Q1 + Q2 + Q6 + Q7 only.

---

## Self-Improvement

After every weekly planning session, check whether the Braindump Vault carry-forward was smooth, whether Rock Health was accurate, and whether TOP 3 aligned with sprint priorities. Add findings to Rules above.
