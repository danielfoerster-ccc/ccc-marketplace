---
name: daily-checkin
description: |
  Runs a lean 7-10 minute morning Confirmation Check-In — the morning half of the
  90 Day Year daily loop (the evening half lives in `daily-checkout`). Loads Rock
  Health, the active sprint's Daily Target Value, yesterday's 5 Pillars score, the
  full weekly Drumbeat, the Braindump Vault, and last night's staged TOP 3 + 3
  Block & Tackle slots — then guides through: Rock Health snapshot, Pillars-trend
  awareness, TOP 3 + Block & Tackle confirmation (NOT generation — the items
  were drafted at last night's checkout), Revenue First confirmation, and
  Dependencies. Outputs a dated Daily Work Notes file. The Drumbeat is the full
  week's task map — updated daily, not rebuilt daily. Run every morning before the
  first Block & Tackle slot starts.
  Trigger on: "daily check-in", "morning check-in", "start my day", "daily plan",
  "daily drumbeat", "plan today", "morning session", "confirm today", "confirm
  blocks", "morning confirmation", "Block & Tackle today", "daily target", "what's
  my target today".
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 3.0.1
  created: 2026-03-06
  updated: 2026-05-16
  language: English
  framework: CCC Planning System + Todd Herman 90 Day Year (Confirmation Check-In)
  distribution: marketplace-ready
---

# Daily Check-in Skill

**Workflow: Context Load → Rock Health + Pillars Trend → Confirm TOP 3 + Block & Tackle → Confirm Revenue First → Skill Scan → Dependencies → Output**

7-10 minute morning session. **This is a confirmation ritual, not a generation ritual.** Tomorrow's TOP 3 and Block & Tackle slots were staged at last night's [[daily-checkout]] (the End-of-Day Optimizer). Morning re-reads them with 24-hour-later perspective, applies minor adjustments where reality has shifted overnight, and slides into execution.

The "evening-plan, morning-confirm" timing shift is the single highest-leverage discipline in the 90 Day Year loop. Plan-tomorrow at night escapes the resistance-voice that fires on do-it-now demands; the morning then doesn't fight a blank page.

## Elicitation Widget

Collect all phase inputs in **one widget** — not question by question. More token-efficient; gives the operator a full context overview as they fill it in.

**Steps (every check-in):**
1. Complete Phase 0 (context load) first
2. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` (silent — no output)
3. Build and call `mcp__visualize__show_widget` with a form that has:
   - A read-only context card inside `.elicit-body` showing: today's date + sprint week, Rock Health (colored dots 🟡/🔴/🟢), week's TOP 3, Drumbeat counts (total / done / to do), **Daily Target Value (€[N]/day)**, **yesterday's 5 Pillars score (1-10 scale) with any flags from `pillars-trend`**, **last night's staged TOP 3 + Block & Tackle slots**
   - Q1 day-shape pills: `Full work day` / `Light session` / `Truly off`
   - Q2 confirmation pills per staged TOP 3 item: `Confirm` / `Revise` (with reveal field for revision reason) — flag any major revisions explicitly
   - Q3 Block & Tackle confirmation: 3 rows, each with task name + estimated minutes pre-filled from last night; pills `Confirm` / `Adjust`
   - Q4 Revenue First pill confirmation: `Confirm` / `Other` (with reveal)
   - Q5 dependencies textarea: pre-fill from yesterday's dependencies section
4. Submit button label: **"Lock the day"**
5. Wait for the single-line submission, parse answers, then create the daily work notes file

---

## Phase 0 — Context Load (automatic, no questions)

Load these files before asking anything. **Order matters** — last night's staged plan is the spine of this morning.

1. **Last night's checkout staging** — find yesterday's daily work notes file in `00 - COMMAND CENTER/Daily Notes/[year]/[quarter]/[week]/YY-MM-DD - Daily Work Notes.md` and read the `## Tomorrow Staged` (or equivalent end-of-day section) — extract: TOP 3 drafted, 3 Block & Tackle slots with durations, Pile-Up Zone items needing decisions, yesterday's 5 Pillars rating
2. **Sprint file** — find the most recent `*90 Day Strategic Goal Attainment Sprint*` in `00 - COMMAND CENTER/Daily Notes/` — extract the Rocks + current status + **Daily Target Value** (€[N]/day, configured in sprint Phase 1.7; per-venture if multiple revenue Rocks active)
3. **Weekly Plan** — find the most recent `*Weekly Plan*` in `00 - COMMAND CENTER/Daily Notes/` — extract: today's day-shape (Outreach / Delivery / Infrastructure / Transition), optional Daily Theme if set, week's TOP 3, full Drumbeat table with statuses
4. **Braindump Vault** — search for the most recent `*Braindump Vault*` in the current week folder — note any `[ ]` A-items not in the Drumbeat
5. **Pillars trend** — if `pillars-trend` skill is installed, invoke it (read-only) for the 7-day window. Otherwise read the last 3-5 daily files' Pillars section manually. Flag any pillar trending down ≥ 3 days or rated ≤ 6 on 2+ days in a week — these are calibration signals, not alarms. (Pillars rated 1-10; ≤ 6 is "below the healthy 7-10 band.")

Surface this compact block before asking anything:

```
Today is [Day], [Date]. Week [N] of The Quarter of [Theme].
Day type: [Outreach / Delivery / Infrastructure / Transition]  ·  Daily Theme: [if set]

🏔️ Rock Health:
  Rock 1 — [Name]: [🔴 / 🟡 / 🟢] [one-line status]
  Rock 2 — [Name]: [🔴 / 🟡 / 🟢] [one-line status]
  Rock 3 — [Name]: [🔴 / 🟡 / 🟢] [one-line status]

🎯 Daily Target Value: €[N]/working day  ·  [per-venture breakdown if applicable]

🩺 Pillars (yesterday, 1-10): Body [N] · Being [N] · Balance [N] · Business [N] · Belonging [N]
[Flag any pillar trending down or ≤ 6 — from pillars-trend]

📋 Staged last night (confirm or revise):
  TOP 1: [Task]                            Block 1: [Task] · [N] min
  TOP 2: [Task]                            Block 2: [Task] · [N] min
  TOP 3: [Task]                            Block 3: [Task] · [N] min

🧺 Pile-Up Zone (items needing a decision today):
  - [Item] — [park / promote / delegate / delete]

Week's TOP 3: (1) [Goal] (2) [Goal] (3) [Goal]
Drumbeat: [N] tasks · [N] done · [N] in progress · [N] to do
```

If no prior checkout staged the day (e.g., a Monday with a skipped Friday checkout, or first morning of a new operator), say so plainly and fall through to a one-pass generation mode for TOP 3 + Block & Tackle. Log this as a missed-checkout so the pattern is visible.

---

## Phase 1 — TOP 3 + Block & Tackle Confirmation (the core of the morning)

This is where the timing shift earns its keep. The items are **already drafted**. The morning is for *confirmation + adjustment*, not regeneration.

**Q1 — TOP 3 confirmation.** "Read what was staged last night. Any of these need to change because of something that happened overnight (new call booked, urgent input, sleep clarified something)?"

- Default: confirm all three as-is. This is the expected outcome on most days.
- Minor revision (small wording, swap one task for an obviously-related one): apply silently.
- **Major revision (replacing a task entirely, reordering by priority shift): flag it explicitly** and capture *why* in one sentence — that "why" is calibration data for whether the evening planning is working. If 3+ days in a row show major morning revisions, the evening planning is mis-firing — surface that pattern at the next 2-Week Sprint Review.

**Q2 — Block & Tackle confirmation.** For each of the 3 staged slots: confirm task + estimated minutes. If anything changed overnight, replace **that block only** — do not regenerate all 3.

**Why the 3-block hard cap (4 max):** Herman's "playground paradox" — kids only explore the whole playground when there's a fence. Constraints unlock flow. The reason 4+ blocks fail isn't that the work is too big; it's that the *gravity of "blocks remaining"* overwhelms attention on the block actually in front of you. 3 blocks ≈ 6-9h of real, focused output, which is more than most days actually produce. Do not exceed 4.

**Eisenhower order rule (synthesis of Herman's Q1-first + Daniel's Revenue First):**
- **Q1 (Important + Not Urgent)** sits in the **morning protected block** (typical: 07:30–09:30). Strategic, infrastructure, relationship, exercise. Q1 protects the cycle.
- **Revenue First (Q2 — Important + Urgent)** sits **mid-morning + afternoon**. Revenue First pays rent. Revenue First is the daily anchor.
- Q3 / Q4 get delegated, batched, or deleted — never make it into Block & Tackle.

---

## Phase 2 — Revenue First Confirmation (1 question)

**Q3** — "Confirming Revenue First: today's revenue-producing action is [staged item]. Does that match where the money actually comes from today?"

If yes, lock it. If a booked call or new lead overnight changes the answer, swap it. Revenue First is *always* the anchor of TODAY's TOP 3 — it shouldn't ever be absent.

Note today's expected Scorecard contribution: roughly which $-column does Revenue First sit in (Col 4 strategic / Col 3 high-leverage / Col 2 mid / Col 1 admin)? Just an awareness ping — full scoring happens at tonight's checkout.

---

## Phase 2.5 — Skill Scan (automatic, no questions)

After TOP 3 + Block & Tackle are locked, silently scan installed skills + plugins. If any skill directly matches one of today's Block & Tackle tasks, mention it in one line:

> "💡 For Block 1 you could use `sales:lead-qualification`. For Block 3 the `marketing:linkedin-writer` might help."

Rules:
- Only suggest if there's a genuine, high-confidence match. No forced suggestions.
- Maximum 1-2 suggestions. If nothing matches, say nothing.
- Also check the Capability Map at `00 - COMMAND CENTER/Capability Map.md` for network-layer matches (e.g., "Heiko could handle the implementation part of Block 2").
- 10-second step, not deep analysis.

---

## Phase 3 — Dependencies (1 input)

**Q4** — "Anyone waiting on you today? Anything you're waiting on that could move today?"

Pull from yesterday's dependencies list as default. Confirm or update. One line per item.

---

## Phase 4 — Output

**File location:**
`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[WEEK FOLDER]/YY-MM-DD - Daily Work Notes.md`

Always save into the correct week subfolder. If the week folder doesn't exist yet, create it first.

**Template:**

```markdown
# Daily Work Notes — [Day], [Date]
**Day Type:** [Outreach / Delivery / Infrastructure / Transition]  ·  **Daily Theme:** [if set]
**Week's TOP 3 (reference):** [Goal 1] · [Goal 2] · [Goal 3]
**Daily Target Value:** €[N]/day  ·  [per-venture breakdown if applicable]

---

## 🏔️ Rock Health

| Rock | Target ([sprint end]) | Status | This Week's Move |
|------|----------------|--------|-----------------|
| Rock 1 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |
| Rock 2 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |
| Rock 3 — [Name] | [Target] | 🔴/🟡/🟢 | [move] |

---

## 🩺 Pillars — Yesterday's Reading (1-10)
Body [N] · Being [N] · Balance [N] · Business [N] · Belonging [N]
[Flag if any pillar trending down or ≤ 6 on 2+ days in current week — surfaces routine drift]

---

## ⚡ Revenue First (today)
> [The specific revenue action]

---

## 🎯 Block & Tackle (3 slots — one task per block)
| # | Task | Estimated | Actual | Eisenhower |
|---|------|-----------|--------|-----------|
| 1 | [Q1 morning block — strategic / compounding] | [N] min | — | Q1 |
| 2 | [Revenue First — Q2 mid-morning] | [N] min | — | Q2 |
| 3 | [Q2 afternoon block] | [N] min | — | Q2 |

*One task per block. Hard cap 3 (max 4). Time-track in 15-min increments; log Actual at checkout.*

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
1. [Task]   — *confirmed from last night* / *revised: [reason]*
2. [Task]
3. [Task]

---

## 🔗 Dependencies

**They're waiting on me:**
- [Name — what for]

**I'm waiting on:**
- [Name — what for]

---

## 🧺 Pile-Up Zone (today's catches)
*Anything new / shiny / off-plan arrives here, not into Block & Tackle. Reviewed at the next 2-Week Sprint Review.*
- [Item — note]

---

## 📝 Notes
*(Add during the day)*

---

## End-of-Day
*This section is filled at `daily-checkout` (End-of-Day Optimizer). Stays blank at morning creation.*
```

After saving, confirm the file path and say:

*"Day confirmed. Revenue First is locked. First block: [Block 1 task, N min, starting [time]]."*

---

## Drumbeat Rules

The Daily Drumbeat is the **full week's task map** — not a daily to-do list rebuilt each morning.

- **Monday (first day of week):** build the Drumbeat fresh from the Weekly Plan's full task list
- **Tuesday–Sunday:** carry the Drumbeat forward with updated statuses — do not rebuild
- New tasks during the week → appended to the bottom
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

1. Always load last night's checkout staging FIRST in Phase 0. The morning is a confirmation, not a generation — without the staged plan, the timing shift collapses.
2. Always load Sprint + Weekly Plan + Braindump Vault + Pillars trend. Rock Health and the staged TOP 3 appear before everything else.
3. Revenue First is always the anchor of TODAY's TOP 3.
4. TODAY's TOP 3 comes from last night's staging — confirmed, not invented. If a complete swap is needed, flag the why (calibration data for the evening loop).
5. Block & Tackle is hard-capped at 3 (4 max). Never let it grow to 5+. The constraint is the mechanism.
6. Eisenhower order: Q1 morning protected block → Revenue First (Q2) mid-morning → Q2 afternoon. Q1 protects the cycle; Revenue First protects the month.
7. The Drumbeat is a weekly map, not a daily list. Carry it forward.
8. Keep the session to ≤5 confirmations (1 TOP 3 set + 3 Block & Tackle + Revenue First). Don't ask anything that's clear from context.
9. Always create a new dated file in the morning in the correct week subfolder.
10. The daily file is a live document — updated throughout the day, not just morning.
11. End-of-Day section stays blank at creation — filled via `daily-checkout`.
12. Pillars-trend awareness is for calibration, not action. Acute drift (≥3 days down or ≤ 6 on 2+ days, on the 1-10 scale) is a *flag*, not an interrupt. Action lives at the next 2-Week Sprint Review or via `roar-routine-design` if flagged urgent.
13. If no checkout staged the previous day (missed evening, weekend gap), fall through to one-pass generation but log the gap. Missing staging is signal — the evening loop is the load-bearing piece.
14. Keep all output in English.

---

## Self-Improvement

After every daily check-in, observe:
- Was Phase 0 loading slow or did it miss a file? Note which load step failed.
- Did the morning require ≤5 confirmations, or did it slip into regeneration? Regeneration = the evening loop didn't fire properly — surface as 2-Week Sprint Review input.
- Were Block & Tackle estimates close to last night's actuals? Persistent over-estimation or under-estimation is calibration data.
- Did the Pillars-trend flag fire usefully, or noise? Tune the threshold.

Add findings to Rul