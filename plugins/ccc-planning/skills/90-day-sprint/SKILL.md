---
name: 90-day-sprint
description: |
  Runs a structured 90-Day Goal Attainment Sprint planning session. Reads the most
  recent active OKR and sprint files from the vault to skip redundant questions, then
  guides through a lean quarterly review and goal-setting process using the
  Boulders → Rocks → Pebbles → Activities hierarchy. Outputs a complete dated sprint
  document to the vault, structured to mirror the Google Sheets tracker for direct
  copy-paste. Use at the start of every quarter or when resetting strategic priorities.
  Trigger on: "90-day plan", "quarterly planning", "new sprint", "reset my OKRs",
  "plan the next 90 days", "quarterly goals".
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.1.0
  updated: 2026-04-24
  created: 2026-03-06
  language: English
  framework: Flashhub Boulders/Rocks/Pebbles + OKR hybrid
  distribution: marketplace-ready
---

# 90-Day Sprint Planning Skill

**Workflow: Context Load → Quarter Review → Vision Anchors → Set Structure → Output**

Lean, execution-focused quarterly planning. No spiritual frameworks. Pure operator logic.

Session time: ~45 minutes.

## Elicitation Widget

Collect the Quarter Review inputs (Q1–Q3) in **one widget** — not question by question. This is the required approach for the review phase.

**Steps (every sprint planning session):**
1. Complete Phase 0 (context load) first — surface the compact summary
2. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` (silent — no output)
3. Build and call `mcp__visualize__show_widget` with a form that has:
   - A read-only context card inside `.elicit-body` showing: last sprint objectives, rocks + status, quarter theme
   - Q1 what moved: textarea (revenue, clients signed, milestones, wins)
   - Q2 what didn't move and why: textarea (honest one-sentence-per-item diagnosis)
   - Q3 what changes this quarter: textarea (single most important change)
4. Submit button label: **"Start the sprint"**
5. Wait for submission, parse, then continue to Phase 2 (Vision Anchors) and goal-setting phases in conversation

Use the widget for the **quarter review phase only**. Vision Anchors and goal-setting phases flow naturally as conversation after the form is submitted.


---

## Phase 0 — Context Load (automatic, no questions)

Before asking anything, read the vault:

1. Search for the most recent sprint file matching `*90 Day Strategic Goal Attainment Sprint*` in `00 - COMMAND CENTER/Daily Notes/`
2. Read `00 - COMMAND CENTER/Daily Notes/2026 (Early - from 25-12 onwards)/Q1/26-03-02 - 90 Day Strategic Goal Attainment Sprint.md`
3. Surface a brief summary: "Here's what I found in your last sprint: [Objectives, Rocks, status]."
4. Tell the user which questions you will skip because they're already answered.

If no sprint file exists, proceed from scratch.

---

## Phase 1 — Quarter Review (3 questions, ~10 min)

Ask one at a time. Wait for each answer before proceeding.

**Q1 — What moved?**
"Looking back at the last 90 days: what actually happened? List revenue, clients signed, milestones hit, and any significant wins — however small."

**Q2 — What didn't move, and why?**
"What were you supposed to do that didn't happen? Give me the honest one-sentence reason for each. No justification needed — just diagnosis."

**Q3 — What changes?**
"Based on what you just said: what is the single most important thing you're doing differently this quarter?"

---

## Phase 2 — Vision Anchors (~5 min)

These are quick anchors, not deep reflection exercises. Pull from existing sprint if available — only ask if missing or clearly outdated.

**Q4 — 3-Year Personal Vision (5 goals)**
"What are the 5 things you want to have achieved or become personally in 3 years?"
*(Skip if already in sprint file and still accurate.)*

**Q5 — 3-Year Business Vision (5 goals)**
"What does your business empire look like in 3 years? Revenue, structure, what you've built."
*(Skip if already in sprint file and still accurate.)*

**Q6 — "What I really want" braindump**
"Quick braindump: what are the things you actually want — experiences, possessions, relationships, achievements — that this business is meant to fund and enable?"
*(Skip if already captured. This section is a motivational anchor, not a planning tool.)*

---

## Phase 3 — 1-Year Boulders (~10 min)

Three columns: **S&M: Revenue Generation | S&M: Thought Leadership | Operations**

**Q7 — 1-Year S&M Revenue Boulder**
"In 12 months, what does 'winning' look like for your revenue-generating outreach motion? (ABS, FULCRUM, or whichever business is your primary revenue engine.) Max 2 Boulders — directional and inspiring, not task-like."

**Q8 — 1-Year S&M Thought Leadership Boulder**
"In 12 months, what does 'winning' look like for your personal brand and CCC GTM motion? Max 2 Boulders."

**Q9 — 1-Year Operations Boulder**
"In 12 months, what does your operational infrastructure look like? Systems running, delivery automated, team/AI in place. Max 1 Boulder."

---

## Phase 4 — 90-Day Theme (1 question)

**Q10 — Quarter Theme**
"If you were to give this quarter a theme — a phrase that motivates and focuses you — what would it be? ('The Quarter of...')"

---

## Phase 5 — 90-Day Rocks (~10 min)

Rocks are the specific outcomes you will achieve *this quarter* that move toward the Boulders. Max 5 total across all three columns.

**Q11 — 90-Day Revenue Rock(s)**
"What specific, measurable outcome in ABS (or FULCRUM if active) would make this quarter a success? This is your Rock — something you can point to in 90 days and say 'done'. Max 2."

**Q12 — 90-Day Thought Leadership Rock(s)**
"What specific, measurable outcome for CCC/personal brand GTM makes this quarter a success? Max 2."

**Q13 — 90-Day Operations Rock**
"What one operational outcome — a system built, a process running, a delivery playbook complete — makes this quarter a success? Max 1."

---

## Phase 6 — Pebbles (weekly metrics, ~10 min)

For each Rock: what are the 1–5 weekly measurements that prove it's on track?

Work through each Rock one at a time:
"For your Rock '[Rock name]': what are the weekly numbers or actions you need to be hitting consistently? These are your Pebbles — lead indicators, not outcomes."

Examples of good Pebbles:
- "20 cold calls made per dedicated calling day"
- "3 LinkedIn outreach messages sent per day"
- "1 new Discovery Month client signed per week"
- "Weekly GTM motion 100% completed"

---

## Phase 7 — Activities (committed vs. stretch, ~5 min)

For each Pebble: what are the committed activities (non-negotiable weekly actions) and stretch activities (done when momentum is high)?

"For Pebble '[Pebble name]': what are your committed weekly activities — the minimum you must do regardless of mood or urgency? And what would you add when things are going well (stretch)?"

Keep it to max 5 activities per Pebble. Mark each: **Committed** or **Stretch**.

---

## Phase 8 — Output

### Generate the Sprint Document

Create a new file at:
`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] - 90 Day Strategic Goal Attainment Sprint.md`

Use this exact template:

```markdown
# 90-Day Strategic Goal Attainment Sprint
**Period:** [Start Date] – [End Date]
**Created:** [Today's Date]
**Quarter Theme:** [Theme]

---

## 3-Year Vision

### Personal (5 Goals)
1. [Goal]
2. [Goal]
3. [Goal]
4. [Goal]
5. [Goal]

### Business (5 Goals)
1. [Goal]
2. [Goal]
3. [Goal]
4. [Goal]
5. [Goal]

### What I Really Want
[Braindump list]

---

## 1-Year Boulders

| S&M: Revenue Generation | S&M: Thought Leadership | Operations |
|---|---|---|
| [Boulder 1] | [Boulder 1] | [Boulder 1] |
| [Boulder 2] | [Boulder 2] | |

---

## 90-Day Rocks

| S&M: Revenue Generation | S&M: Thought Leadership | Operations |
|---|---|---|
| [Rock 1] | [Rock 1] | [Rock 1] |
| [Rock 2] | [Rock 2] | |

---

## Pebbles (Weekly Metrics per Rock)

### Rock: [Rock Name]
| Pebble | Target | Committed Activities | Stretch Activities |
|---|---|---|---|
| [Pebble 1] | [Number/frequency] | [Activity] | [Activity] |
| [Pebble 2] | | | |

*(Repeat for each Rock)*

---

## Quarter Review (from last sprint)

**What moved:**
[Summary]

**What didn't move and why:**
[Summary]

**What changes this quarter:**
[Single sentence]

---

## Tracker Note
> Copy the Google Sheets 90 Day Plan V4 tracker, rename it `[YYYY-MM-DD] 90 Day Plan V4`,
> and transfer the Rocks, Pebbles, and Activities into the corresponding cells.
> Dashboard tab: update Week 1 start date.
```

### After saving:
Tell the user the file path and confirm it's saved. Then say:
"Your Google Sheets tracker is ready to be filled. Copy the V4 template, rename it with today's date, and transfer the Rocks and Pebbles. The Pebble table maps directly to the 'Rocks & Pebbles' tab."

---

## Rules

- Never ask questions already answered in the loaded sprint file unless the user flags them as outdated.
- Always create a new dated file — never overwrite the previous sprint.
- Keep all output in English.
- No motivational filler. No spiritual frameworks. Operator language only.
- If FULCRUM is not yet active, include it as a placeholder Rock under Revenue Generation with a note: "Activates when [trigger condition]."
- If the user gives short answers, accept them. Don't push for elaboration unless something is clearly missing for the output to be useful.
- Maximum session questions: 13 (phases 1–7). Skip any that are already answered.

---

## Self-Improvement

After every sprint planning session, check whether any phase produced friction (too many questions, redundant input, misaligned Rock structure). Add the finding to the Rules section above.
