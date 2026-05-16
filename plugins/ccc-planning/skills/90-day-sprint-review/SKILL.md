---
name: 90-day-sprint-review
description: |
  Runs a structured 90-day sprint closeout session — the Sprint Review. Loads the
  active sprint, scores OKRs (0–100% with Green/Yellow/Orange/Red thresholds), runs
  a 5-question pattern debrief, Stop/Continue/Start, and decision harvest. Closes the
  sprint file with a footer, appends harvested rules to Decisions & Rules, and outputs
  a dated Sprint Closeout note to the vault. Handles both clean 90-day completions and
  mid-sprint strategic interrupts. Bridges to the active Transition Sprint if one is
  running. USE THIS SKILL when the operator says "sprint review", "90-day review",
  "close the sprint", "sprint closeout", "quarterly review", "end of sprint",
  "score my OKRs", "review the quarter", or when a sprint is ending and the operator
  wants to extract learnings before starting the next one. Also trigger after any
  major strategic pivot that supersedes the active sprint mid-course.
allowed-tools: "Read, Write, Glob, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-05-16
  updated: 2026-05-16
  language: English
  framework: Todd Herman (90 Day Year) + OKR Retrospective Best Practices
  sop: "02 - MISSION CONTROL/SOPs & Playbooks/SOP — 90 Day Sprint Review.md"
  distribution: marketplace-ready
---

# 90-Day Sprint Review Skill

**Workflow: Context Load → Elicitation → OKR Scoring → Pattern Debrief → Stop/Continue/Start → Decision Harvest → Output → Transition Bridge**

Structured sprint closeout. ~45–60 minutes. Produces vault artifacts, appends decisions, closes the sprint cleanly. Works for both clean completions and mid-sprint strategic interrupts.

---

## Elicitation Widget

Collect all review inputs in **one widget** — not question by question.

**Steps:**
1. Complete Phase 0 (context load) first
2. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` (silent)
3. Build and call `mcp__visualize__show_widget` with a form that has:
   - Read-only context card showing: sprint name, period, Rocks + targets + status, days run, interrupt type (clean / strategic)
   - **Sprint type pill** (single-select): `Clean 90-day close` · `Strategic interrupt (pivot)` · `Mid-sprint pause`
   - **Rock scores** (one textarea per Rock): "Score 0–100% + one sentence: what drove the score?"
   - **Pattern debrief** (5 textareas, one per question — see Phase 2)
   - **Stop / Continue / Start** (3 short textareas)
   - **Decision harvest** textarea: "Any rules that should be pre-decided next time? Patterns that kept repeating?"
   - **Transition Sprint active?** (pill): `Yes — it's running` · `No`
4. Submit button label: **"Close this sprint"**
5. Wait for submission, then execute Phases 3–6

---

## Phase 0 — Context Load (automatic, no questions)

Before showing anything, load:

1. **Active sprint file** — search `00 - COMMAND CENTER/Daily Notes/` for the most recent `*90 Day Strategic Goal Attainment Sprint*` or `*Transition Sprint*` file. Read it. Extract: sprint name, period, Rocks with targets and status indicators.
2. **Most recent weekly plan** — search the current quarter folder for `*Weekly Plan*`. Extract Rock Health rows for current statuses.
3. **Active Transition Sprint** (if any) — search for any `*Transition Sprint*` file. If found, note its deliverable statuses.

Surface this compact block before the widget:

```
Sprint: [Name]
Period: [Start] → [End] · Day [N] of 90
Status: [Clean completion / Strategic interrupt on Day N / Mid-sprint pause]

🏔️ Rock Health (loaded from sprint + last weekly plan):
  [Rock 1 name]: [target] · [🔴/🟡/🟢] [last known status]
  [Rock 2 name]: [target] · [🔴/🟡/🟢]
  [Rock 3 name]: [target] · [🔴/🟡/🟢]

Transition Sprint: [Active — N of 8 deliverables done / Not active]
```

If no sprint file exists, note it and proceed in open mode (all fields manually filled).

---

## Phase 1 — Elicitation (all inputs collected at once via widget)

The widget collects everything. Pattern debrief questions appear in the widget as labelled textareas:

**Q1 — What moved faster than expected?**
*(Your real leverage — name it specifically, not generally)*

**Q2 — What was consistently delayed?**
*(Name the pattern, not the excuse — "didn't feel like it" is a pattern)*

**Q3 — What did you learn about how you work best?**
*(Substrate insight — feeds directly into the pilot tracker)*

**Q4 — What decision, if made earlier, would have changed this sprint most?**
*(The delayed decision is the biggest invisible cost)*

**Q5 — What did you need to believe about yourself that you didn't?** *(Todd Herman)*
*(Only answer this if something major didn't move and you can't explain it operationally — otherwise skip)*

---

## Phase 2 — OKR Scoring (automatic after submission)

Parse the Rock scores from the widget. Format each Rock as:

```
Rock: [Name]
Target: [Original target]
Actual: [What was achieved — infer from scores + weekly plan data + operator's own words]
Score: [X]% · [🟢/🟡/🟠/🔴]
Why: [Operator's sentence + any inference from context]
```

Scoring thresholds:
| Score | Color | Read as |
|-------|-------|---------|
| 100% | 🟢 | Fully delivered |
| 60–99% | 🟡 | Meaningful progress |
| 20–59% | 🟠 | Partial only |
| 0–19% | 🔴 | Did not move |

**For strategic interrupts:** Score against what was achievable in the days the sprint actually ran, not the full target. Add a line: `Interrupt: Sprint ended Day [N] of 90 — [one sentence on why]`.

Do not moralize about low scores. State them factually. The score is data, not judgment.

---

## Phase 3 — Stop / Continue / Start (parsed from widget)

Present these back formatted cleanly — one line each. No elaboration unless the operator's answer is ambiguous:

```
⛔ Stop: [What to stop]
✅ Continue: [What to protect]
🚀 Start: [One new behaviour — not a project]
```

If the operator gave vague answers, prompt one clarifying question before moving on: "For 'Start' — you said [X]. Is that a behaviour you'd do every week, or more of a project goal?"

---

## Phase 4 — Decision Harvest (write to vault)

Parse the decision harvest field. For each rule candidate:

1. Format it as: `**[Rule statement]** — [brief reasoning] *(Sprint Closeout [date])*`
2. Append ALL rule candidates to `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` in the most appropriate section
3. Confirm: "Appended [N] rule(s) to Decisions & Rules under [section name]."

If the operator's harvest field is empty, ask one prompt: "Anything you found yourself re-deciding this sprint that should be pre-decided next time?" Accept "no" and move on.

---

## Phase 5 — Output

### 5a: Sprint Closeout Note

Create a new file at:
`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] — Sprint Closeout — [Sprint Name].md`

```markdown
---
type: sprint-closeout
sprint: [[Sprint File Name]]
date: [today]
sprint_type: clean | strategic-interrupt | mid-sprint-pause
days_run: [N] of 90
---

# Sprint Closeout — [Sprint Name]

**Closed:** [Date] · [Sprint type]

---

## OKR Scores

| Rock | Target | Score | Color | Why |
|------|--------|-------|-------|-----|
| [Name] | [Target] | [X]% | [🟢/🟡/🟠/🔴] | [Sentence] |
| [Name] | [Target] | [X]% | [🟢/🟡/🟠/🔴] | [Sentence] |
| [Name] | [Target] | [X]% | [🟢/🟡/🟠/🔴] | [Sentence] |

---

## Pattern Debrief

**What moved faster than expected:**
[Answer]

**What was consistently delayed:**
[Answer]

**What I learned about how I work best:**
[Answer]

**Decision that, if made earlier, would have changed the most:**
[Answer]

**What I needed to believe that I didn't:** *(if answered)*
[Answer / Skipped]

---

## Stop / Continue / Start

⛔ **Stop:** [Answer]
✅ **Continue:** [Answer]
🚀 **Start:** [Answer]

---

## Decision Harvest

[List of rule candidates — same text as appended to Decisions & Rules]

---

## Strategic Interrupt Note *(if applicable)*

[One paragraph on why the sprint ended early, what it produced, and the honest frame: "the sprint worked if it produced a better architecture."]

---

*Sprint closed [date]. Next: [[Next Sprint Name or Transition Sprint]].*
```

### 5b: Sprint File Footer

Append this footer to the original sprint file:

```markdown
---
*Sprint formally closed [date]. [Superseded by / Continues into:] [[Next Sprint or Transition Sprint name]].*
*OKR scores: [Rock 1] [X]% · [Rock 2] [X]% · [Rock 3] [X]%.*
*Days run: [N] of 90. Type: [clean / strategic-interrupt].*
*Key pattern: [one sentence — the most honest summary of what this sprint revealed].*
```

### 5c: Session Log

Append one line to `00 - COMMAND CENTER/Session Log.md`:
`[Date] — Sprint Closeout: [Sprint Name] — [N] days, scores [O1:X%/O2:X%/O3:X%], [N] rules harvested`

---

## Phase 6 — Transition Bridge (if Transition Sprint is active)

If Phase 0 found an active Transition Sprint, run a quick status pass:

1. List the deliverables from the Transition Sprint file with their current status
2. Flag anything off-track (status ⏳ with fewer than X days remaining)
3. Route any carry-forwards from the closed sprint that are still live: update `03 - OPERATIONS/pipeline-status.md` rows if applicable, prompt to add to Transition Sprint drumbeat if not already there
4. Check: is the Substrate-Floor pilot active? If yes, note what day it's on and whether tracking is current

Output a brief summary: "Transition Sprint: [N] of [total] deliverables on track. [Any flags]. Next milestone: [date + deliverable]."

Do NOT rebuild the Transition Sprint. Just surface what needs attention.

---

## Rules

1. Phase 0 loads must happen before anything is shown to the operator. Never skip context load.
2. OKR scores must come from the operator — never infer them without input. The widget collects them explicitly.
3. Scores are data, not judgments. Never soften low scores with hedges like "understandably" or "given the circumstances." State factually.
4. For strategic interrupts: explicitly frame the early close as a signal that the sprint worked (it revealed a better architecture) — not as a failure. Do this in the Sprint Closeout Note, not in conversation.
5. Decision harvest goes to Decisions & Rules immediately — not "I'll save these later." Append during Phase 4, confirm it happened.
6. The sprint file footer is mandatory. Never close without it — it's the vault's clean signal that the sprint is done.
7. The Transition Bridge is only run if Phase 0 found an active Transition Sprint. Do not invent one.
8. Maximum session interaction after widget submission: 2–3 clarifying exchanges. The widget collects the hard stuff; the session should flow to output quickly.
9. Keep all output in English.

---

## Self-Improvement

After every sprint review session, check:
- Did the widget collect everything needed, or were post-submission questions required? If yes, add a field to the widget.
- Did any Rock score prompt confusion about the scoring scale? If yes, tighten the scale description in the widget.
- Did the decision harvest produce anything worth adding to the Rules section above?
- Was the Transition Bridge step needed and accurate? Note any edge cases.

Add findings to the Rules section. This skill gets better by accumulating real session patterns.
