---
name: daily-checkin
description: |
  Runs a lean 10-minute daily morning check-in. Loads Rock Health from the active
  sprint, the full weekly Drumbeat, and the Braindump Vault — then guides through:
  Rock Health snapshot, Revenue First, Today's TOP 3, and Dependencies. Outputs a
  dated Daily Work Notes file to the vault. The Drumbeat is the full week's task
  map — updated daily, not rebuilt daily. Run every morning before the outreach
  block starts.
  Trigger on: "daily check-in", "morning check-in", "start my day", "daily plan",
  "daily drumbeat", "plan today", "morning session".
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 2.2.0
  created: 2026-03-06
  updated: 2026-04-18
  language: English
  distribution: marketplace-ready
---

# Daily Check-in Skill

**Workflow: Context Load → Rock Health → Revenue First → TOP 3 → Skill Scan → Dependencies → Output**

10-minute morning session. No bloat.

## Elicitation Widget

Collect all phase inputs in **one widget** — not question by question. This is the required approach: more token-efficient and gives the operator a full context overview as they fill it in.

**Steps (every check-in):**
1. Complete Phase 0 (context load) first
2. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` (silent — no output)
3. Build and call `mcp__visualize__show_widget` with a form that has:
   - A read-only context card inside `.elicit-body` showing: today's date + sprint week, rock health (colored dots for 🟡/🔴/🟢), week's TOP 3, drumbeat counts (total / done / to do)
   - Q0 day-shape pills: `Full work day` / `Light session` / `Truly off`
   - Q1 revenue-first pills: pre-suggest the obvious from the Drumbeat + `Other` with text reveal
   - Q2 TOP 3 multi-select pills: carry-forwards from the Drumbeat; add `data-accent="danger"` on urgent items
   - Q3 dependencies textarea: pre-fill placeholder hints from the last dependencies section
4. Submit button label: **"Lock the day"**
5. Wait for the single-line submission, parse answers, then create the daily work notes file


---

## Phase 0 — Context Load (automatic, no questions)

Load these three files before asking anything:

1. **Sprint file** — find the most recent `*90 Day Strategic Goal Attainment Sprint*` in `00 - COMMAND CENTER/Daily Notes/` — extract the 3 Rocks and their current status
2. **Weekly Plan** — find the most recent `*Weekly Plan*` in `00 - COMMAND CENTER/Daily Notes/` — extract: today's day type, week's TOP 3, and the full Drumbeat table with current statuses
3. **Braindump Vault** — search for the most recent `*Braindump Vault*` in `00 - COMMAND CENTER/Daily Notes/` — it lives in the current week's folder as `YY-MM-DD - Braindump Vault.md` — note any `[ ]` A-items not already in the Drumbeat

Surface this compact block before asking anything:

```
Today is [Day], [Date]. Week [N] of The Quarter of [Theme].
Day type: [Outreach / Delivery / Infrastructure / Transition]

🏔️ Rock Health:
  Rock 1 — [Name]: [🔴 / 🟡 / 🟢] [one-line status]
  Rock 2 — [Name]: [🔴 / 🟡 / 🟢] [one-line status]
  Rock 3 — [Name]: [🔴 / 🟡 / 🟢] [one-line status]

Week's TOP 3: (1) [Goal] (2) [Goal] (3) [Goal]
Drumbeat: [N] tasks · [N] done · [N] in progress · [N] to do
```

If no weekly plan or sprint file exists, proceed without and note it.

---

## Phase 1 — Revenue First (1 question)

**Q1**
"Where does TODAY the money come from?"

If it's already obvious from the Drumbeat (e.g., a booked call today), confirm it rather than asking again.

---

## Phase 1.5 — Timeboxes (confirm or adjust)

Default daily container — adjust to the operator's actual schedule:

| Block | Hours |
|-------|-------|
| Build (CCC GTM / infrastructure) | 2h |
| Calls / Revenue / Outreach | 5h |
| Lunch break | 1h |
| Delivery | 2h |
| Close / organise / pipeline admin | 1h |

Confirm or adjust based on today's shape. Surface it as: "X hours available — default container: 2h build · 5h calls · 1h lunch · 2h delivery · 1h close. Any changes?"

---

## Phase 2 — TODAY's TOP 3 (1 input)

**Q2**
"From the Drumbeat — what are the three things that, if done, make today a success?"

Pre-suggest TOP 3 based on: Revenue First action + today's day-type items from the Drumbeat. Confirm or let the user swap.

---

## Phase 2.5 — Skill Scan (automatic, no questions)

After TOP 3 are locked, silently scan the installed skills and plugins (CCC + BenAI + standalone). If any skill directly matches one of today's TOP 3 tasks, mention it in one line:

> "💡 For TOP 1 you could use `sales:lead-qualification`. For TOP 3 the `marketing:linkedin-writer` might help."

Rules:
- Only suggest if there's a genuine, high-confidence match. No forced suggestions.
- Maximum 1-2 suggestions. If nothing matches, say nothing.
- Also check the Capability Map at `00 - COMMAND CENTER/Capability Map.md` for network-layer matches (e.g., "Heiko could handle the implementation part of TOP 2").
- This is a 10-second step, not a deep analysis. Keep it lean.

---

## Phase 3 — Dependencies (1 input)

**Q3**
"Quick check: anyone waiting on you today? Anything you're waiting on that could move today?"

Pull from last available dependencies list as default. User confirms or updates. Keep to one line per item.

---

## Phase 4 — Output

**File location:**
`00 - COMMAND CENTER/Daily Notes/[YEAR (folder)]/[QUARTER (folder)]/[WEEK FOLDER e.g. 26-03-15 to 21]/YY-MM-DD - Daily Work Notes.md`

Always save into the correct week subfolder. If the week folder doesn't exist yet, create it first.

**Template:**

```markdown
# Daily Work Notes — [Day], [Date]
**Day Type:** [Outreach / Delivery / Infrastructure / Transition]
**Week's TOP 3 (reference):** [Goal 1] · [Goal 2] · [Goal 3]

---

## 🏔️ Rock Health

| Rock | Target (May 31) | Status | This Week's Move |
|------|----------------|--------|-----------------|
| Rock 1 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |
| Rock 2 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |
| Rock 3 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |

---

## ⚡ Revenue First
> [The specific revenue action for today]

---

## 🥁 Daily Drumbeat

*The full week's task map — updated daily, not rebuilt daily.*
*Carry statuses forward from the previous day. Add new tasks at the bottom.*

| # | Task | Day | Priority | Status | Notes |
|---|------|-----|----------|--------|-------|
| 1 | [Revenue First / top priority] | [Day] | High | To Do | |
| 2 | [Task] | [Day] | High | To Do | |
| … | … | … | … | … | |

*Status options: To Do · In Progress · Done ✅ · Blocked*
*Update throughout the day. Completed tasks stay in the table — do not remove.*

---

## ✅ Today's TOP 3
1. [Task]
2. [Task]
3. [Task]

---

## 🔗 Dependencies

**They're waiting on me:**
- [Name — what for]

**I'm waiting on:**
- [Name — what for]

---

## 📝 Notes
*(Add during the day)*

---

## ⏱️ Timeboxes
**Default container:** 2h build · 5h calls · 1h lunch · 2h delivery · 1h close

| Block | Planned | Actual |
|-------|---------|--------|
| Build | 2h | — |
| Calls / Outreach | 5h | — |
| Lunch | 1h | — |
| Delivery | 2h | — |
| Close / Admin | 1h | — |

---

## End-of-Day
**TOP 3 completed:** Yes / Partial / No
**Revenue First done:** Yes / No
**Timeboxes held:** Yes / Partial / No
**Carry-forward to tomorrow:** [tasks]
**What went well:**
**What needs work:**
**Never again:**
```

After saving, confirm the file path and say:
"Your day is set. Revenue First is locked."

---

## Drumbeat Rules

The Daily Drumbeat is the **full week's task map** — not a daily to-do list rebuilt each morning.

- **Monday (first day of week):** build the Drumbeat fresh from the Weekly Plan's full task list
- **Tuesday–Sunday:** carry the Drumbeat forward with updated statuses — do not rebuild
- New tasks that arrive during the week get appended to the bottom
- Completed tasks stay in the table marked Done ✅ — they are not removed
- The Drumbeat always shows the full picture: done, in progress, to do

**Drumbeat update triggers** (mid-day or end-of-day):
- "Update my drumbeat"
- "Mark [task] as done"
- "I finished [task]"
- "[Task] is blocked"
- "Add [task] to today"

When updating: read the existing daily file → update status column → append new tasks if any → overwrite the file.

---

## Rules

- Always load Sprint + Weekly Plan + Braindump Vault in Phase 0. Rock Health appears before everything else.
- Revenue First is always the anchor of TODAY's TOP 3.
- TODAY's TOP 3 comes from the Drumbeat — don't invent goals.
- The Drumbeat is a weekly map, not a daily list. Carry it forward.
- Keep the session to 3 questions max. If Phase 0 pre-fills enough, reduce to 1–2.
- Always create a new dated file in the morning in the correct week subfolder.
- The daily file is a live document — updated throughout the day, not just morning.
- End-of-Day section stays blank at creation — filled via Drumbeat update or checkout.
- Keep all output in English.

---

## Self-Improvement

After every daily check-in, check whether Phase 0 loading was slow or redundant, whether question count stayed ≤3, and whether the Drumbeat carried forward correctly. Add findings to Rules above.
