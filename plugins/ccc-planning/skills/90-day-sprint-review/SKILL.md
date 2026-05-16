---
name: 90-day-sprint-review
description: |
  Runs a 90-day sprint closeout session. Loads the active sprint, scores Rocks
  against Good/Better/Best targets, runs a 5-question pattern debrief,
  Stop/Continue/Start, decision harvest, and 5 Pillars baseline→close delta.
  Appends harvested rules to Decisions & Rules, closes the sprint file with a
  footer, and outputs a dated Sprint Closeout note. Handles clean 90-day
  completions and mid-sprint strategic interrupts. Bridges to active
  Transition Sprint if running. Phase 0 guard: if today is Day 70-80 of an
  active sprint, suggests running 75-day-retro FIRST — the retro is the
  planning-through; this closeout is the closing. USE when operator says
  "sprint review", "90-day review", "close the sprint", "sprint closeout",
  "quarterly review", "end of sprint", "score my OKRs", "review the quarter",
  or after a major strategic pivot that supersedes the active sprint
  mid-course.
allowed-tools: "Read, Write, Glob, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.1.0
  created: 2026-05-16
  updated: 2026-05-16
  language: English
  framework: Todd Herman (90 Day Year) + OKR Retrospective Best Practices
  sop: "02 - MISSION CONTROL/SOPs & Playbooks/SOP — 90 Day Sprint Review.md"
  distribution: marketplace-ready
---

# 90-Day Sprint Review Skill

**Workflow: Phase 0 Day-75 Check → Context Load → Elicitation → OKR Scoring → Pattern Debrief → Stop/Continue/Start → Decision Harvest → Output → Transition Bridge**

Structured sprint closeout. ~45–60 minutes. Produces vault artifacts, appends decisions, closes the sprint cleanly. Works for both clean completions and mid-sprint strategic interrupts.

---

## Phase 0 — Day-75 Guard (MANDATORY — runs before anything else)

**Before** loading the active sprint or showing the widget, compute the current day-of-cycle:

1. Glob `00 - COMMAND CENTER/Daily Notes/` for the most recent `*90 Day Strategic Goal Attainment Sprint*` file. Read the `period:` field (or first dated period line) in the frontmatter.
2. Compute: `day_of_cycle = today − sprint_start_date`
3. **If `day_of_cycle` is between 70 and 80** (i.e., the operator is in the day-75 ± 5 window):

   Surface this to the operator BEFORE proceeding:

   ```
   You're on Day [N] of 90 of the active sprint.

   The 75-day-retro is the *planning-through* mechanism — it drafts the next
   cycle's Roadmap through Step 9 so Day 91 is not a cold start. The
   sprint-review (this skill) is the *closing* — it scores Rocks, harvests
   rules, and archives the cycle.

   These are different rituals. Both should run, in order: retro first
   (planning-through), then sprint-review (closing).

   Recommended path:
     → Run [[75-day-retro]] now (today or this week)
     → Run this sprint-review at Day 90 (closeout only)

   Do you want to:
     [a] Run 75-day-retro first, return for sprint-review at Day 90
     [b] Run sprint-review now anyway (e.g., strategic interrupt scenario)
     [c] Skip and exit
   ```

4. **If the operator picks [a]:** Exit gracefully. Tell them: "Run `75-day-retro` next. I'll be here for sprint-review at Day 90."
5. **If the operator picks [b]:** Continue with full Phase 1+. Note in the closeout file that the day-75 guard was overridden and why.
6. **If the operator picks [c]:** Exit silently.
7. **If `day_of_cycle` is outside the 70–80 window:** No prompt. Continue silently to Phase 1.

**Why this guard exists:** The 75-day-retro is the *single load-bearing instruction* of the SOP (per Appendix C of `SOP — Running the 90 Day Year`). If it's skipped, Day 91 cold-starts and the cycle's compounding effect dies. The sprint-review skill *cannot* be the catch-all for both retro and closeout — they have different outputs (next-cycle draft vs. cycle closeout) and different timings. The Phase 0 guard prevents accidentally collapsing them.

If the operator is running a *strategic interrupt* (sprint ending early on Day 35, Day 50, etc.), Phase 0 does NOT fire — strategic interrupts close immediately and don't go through the retro path. The 70–80 window check is precisely scoped to natural day-75 timing.

---

## Elicitation Widget

Collect all review inputs in **one widget** — not question by question.

**Steps:**
1. Complete Phase 0 (Day-75 guard) and Phase 1 (context load) first
2. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` (silent)
3. Build and call `mcp__visualize__show_widget` with a form that has:
   - Read-only context card showing: sprint name, period, Rocks + targets + status, days run, interrupt type (clean / strategic), retro-already-run flag (if the 75-day-retro was run, its key insights are summarized here)
   - **Sprint type pill** (single-select): `Clean 90-day close` · `Strategic interrupt (pivot)` · `Mid-sprint pause`
   - **Rock scores** (one textarea per Rock): "Score 0–100% + one sentence: what drove the score?"
   - **Pattern debrief** (5 textareas, one per question — see Phase 2)
   - **Stop / Continue / Start** (3 short textareas)
   - **Decision harvest** textarea: "Any rules that should be pre-decided next time? Patterns that kept repeating?"
   - **Transition Sprint active?** (pill): `Yes — it's running` · `No`
4. Submit button label: **"Close this sprint"**
5. Wait for submission, then execute Phases 3–6

---

## Phase 1 — Context Load (automatic, no questions)

Before showing anything, load:

1. **Active sprint file** — search `00 - COMMAND CENTER/Daily Notes/` for the most recent `*90 Day Strategic Goal Attainment Sprint*` or `*Transition Sprint*` file. Read it. Extract: sprint name, period, Rocks with Good/Better/Best targets and status indicators, 5 Pillars baseline (if present).
2. **Most recent weekly plan** — search the current quarter folder for `*Weekly Plan*`. Extract Rock Health rows for current statuses.
3. **75-day-retro output (if any)** — search for `*75 Day Retro & Next Sprint Draft*`. If found, surface the retro's "what worked / what didn't / what surprised" answers as context AND the next-sprint Theme candidate so the closeout knows what's already drafted.
4. **Active Transition Sprint** (if any) — search for any `*Transition Sprint*` file. If found, note its deliverable statuses.

Surface this compact block before the widget:

```
Sprint: [Name]
Period: [Start] → [End] · Day [N] of 90
Status: [Clean completion / Strategic interrupt on Day N / Mid-sprint pause]
75-day-retro: [Run on Day [N] — next-Theme drafted / Not run]

Rock Health (loaded from sprint + last weekly plan):
  [Rock 1 name]: [Good/Better/Best targets] · [last known status]
  [Rock 2 name]: [Good/Better/Best targets] · [last known status]
  [Rock 3 name]: [Good/Better/Best targets] · [last known status]

5 Pillars (baseline → current if known):
  [Pillar deltas if retro re-scored already]

Transition Sprint: [Active — N of 8 deliverables done / Not active]
```

If no sprint file exists, note it and proceed in open mode (all fields manually filled).

---

## Phase 2 — Elicitation (all inputs collected at once via widget)

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

## Phase 3 — OKR Scoring (automatic after submission)

Parse the Rock scores from the widget. Score against Good/Better/Best targets (Herman framing — Rocks have three target tiers, not one). Format each Rock as:

```
Rock: [Name]
Good target: [X] · Better target: [X] · Best target: [X]
Actual: [What was achieved]
Score: [X]% · [tier hit: Good / Better / Best / Below Good]
Color: [🟢/🟡/🟠/🔴]
Why: [Operator's sentence + any inference from context]
```

Scoring thresholds (Herman-aligned):
| Score | Color | Read as |
|-------|-------|---------|
| Hit Best | 🟢 Best | Audacious target achieved |
| Hit Better | 🟢 | Stretch target achieved |
| Hit Good | 🟢 | Planned target delivered |
| 60–99% of Good | 🟡 | Meaningful progress |
| 20–59% of Good | 🟠 | Partial only |
| 0–19% of Good | 🔴 | Did not move |

**For strategic interrupts:** Score against what was achievable in the days the sprint actually ran, not the full target. Add a line: `Interrupt: Sprint ended Day [N] of 90 — [one sentence on why]`.

Do not moralize about low scores. State them factually. The score is data, not judgment.

---

## Phase 4 — Stop / Continue / Start (parsed from widget)

Present these back formatted cleanly — one line each. No elaboration unless the operator's answer is ambiguous:

```
⛔ Stop: [What to stop]
✅ Continue: [What to protect]
🚀 Start: [One new behaviour — not a project]
```

If the operator gave vague answers, prompt one clarifying question before moving on: "For 'Start' — you said [X]. Is that a behaviour you'd do every week, or more of a project goal?"

---

## Phase 5 — Decision Harvest (write to vault)

Parse the decision harvest field. For each rule candidate:

1. Format it as: `**[Rule statement]** — [brief reasoning] *(Sprint Closeout [date])*`
2. Append ALL rule candidates to `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` in the most appropriate section
3. Confirm: "Appended [N] rule(s) to Decisions & Rules under [section name]."

If the operator's harvest field is empty, ask one prompt: "Anything you found yourself re-deciding this sprint that should be pre-decided next time?" Accept "no" and move on.

---

## Phase 6 — Output

### 6a: Sprint Closeout Note

Create a new file at:
`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] — Sprint Closeout — [Sprint Name].md`

```markdown
---
type: sprint-closeout
sprint: [[Sprint File Name]]
date: [today]
sprint_type: clean | strategic-interrupt | mid-sprint-pause
days_run: [N] of 90
retro_already_run: yes | no
---

# Sprint Closeout — [Sprint Name]

**Closed:** [Date] · [Sprint type]
**75-day-retro:** [Run on Day [N] / Not run]

---

## OKR Scores (against Good/Better/Best targets)

| Rock | Good | Better | Best | Actual | Tier hit | Color | Why |
|------|------|--------|------|--------|----------|-------|-----|
| [Name] | [X] | [X] | [X] | [X] | [Good/Better/Best/Below] | [🟢/🟡/🟠/🔴] | [Sentence] |
| [Name] | [X] | [X] | [X] | [X] | [Tier] | [Color] | [Sentence] |
| [Name] | [X] | [X] | [X] | [X] | [Tier] | [Color] | [Sentence] |

---

## 5 Pillars — Cycle Delta (baseline → close)

| Pillar | Baseline | Close | Delta |
|---|---|---|---|
| Marketing, Sales & Product | [N] | [N] | [±N] |
| Operations & Technology | [N] | [N] | [±N] |
| Distribution Channels | [N] | [N] | [±N] |
| People & Leadership | [N] | [N] | [±N] |
| Financial | [N] | [N] | [±N] |
| Foundation (execution system) | [N] | [N] | [±N] |

*Pillars baseline scored at sprint kickoff; re-scored at 75-day-retro; final close score here.*

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
*If 75-day-retro was run on Day [N], the next-sprint Theme draft lives in [[75 Day Retro & Next Sprint Draft]].*
```

### 6b: Sprint File Footer

Append this footer to the original sprint file:

```markdown
---
*Sprint formally closed [date]. [Superseded by / Continues into:] [[Next Sprint or Transition Sprint name]].*
*OKR tier hits: [Rock 1: Good/Better/Best/Below] · [Rock 2: tier] · [Rock 3: tier].*
*5 Pillars delta (baseline → close): MSP [±N], OpsTech [±N], Dist [±N], People [±N], Finance [±N], Foundation [±N].*
*Days run: [N] of 90. Type: [clean / strategic-interrupt].*
*Key pattern: [one sentence — the most honest summary of what this sprint revealed].*
```

### 6c: Session Log

Append one line to `00 - COMMAND CENTER/Session Log.md`:
`[Date] — Sprint Closeout: [Sprint Name] — [N] days, tiers [O1:Good/O2:Better/O3:Below], [N] rules harvested`

---

## Phase 7 — Transition Bridge (if Transition Sprint is active)

If Phase 1 found an active Transition Sprint, run a quick status pass:

1. List the deliverables from the Transition Sprint file with their current status
2. Flag anything off-track (status ⏳ with fewer than X days remaining)
3. Route any carry-forwards from the closed sprint that are still live: update `03 - OPERATIONS/pipeline-status.md` rows if applicable, prompt to add to Transition Sprint drumbeat if not already there
4. Check: is the Substrate-Floor pilot active? If yes, note what day it's on and whether tracking is current

Output a brief summary: "Transition Sprint: [N] of [total] deliverables on track. [Any flags]. Next milestone: [date + deliverable]."

Do NOT rebuild the Transition Sprint. Just surface what needs attention.

---

## Rules

1. **Phase 0 (Day-75 guard) runs before anything else.** If `day_of_cycle` ∈ [70, 80] and the operator is in a clean-completion path, suggest 75-day-retro first. Do not collapse retro and closeout into one ritual — they have different outputs and different timings. Strategic interrupts bypass Phase 0.
2. Phase 1 loads must happen before anything is shown to the operator. Never skip context load.
3. OKR scores must come from the operator — never infer them without input. The widget collects them explicitly.
4. **Score against Good/Better/Best targets, not a single target.** The new 90-day-sprint v2 sets three tiers per Rock; the closeout reads against all three.
5. **Re-score the 5 Pillars at close if a baseline exists.** Delta vs. baseline is the substrate-floor signal — without it, the Pillars data is captured but not surfaced. If the 75-day-retro already re-scored, treat that as the mid-cycle data point and add the close score as the third.
6. Scores are data, not judgments. Never soften low scores with hedges like "understandably" or "given the circumstances." State factually.
7. For strategic interrupts: explicitly frame the early close as a signal that the sprint worked (it revealed a better architecture) — not as a failure. Do this in the Sprint Closeout Note, not in conversation.
8. Decision harvest goes to Decisions & Rules immediately — not "I'll save these later." Append during Phase 5, confirm it happened.
9. The sprint file footer is mandatory. Never close without it — it's the vault's clean signal that the sprint is done.
10. The Transition Bridge is only run if Phase 1 found an active Transition Sprint. Do not invent one.
11. Maximum session interaction after widget submission: 2–3 clarifying exchanges. The widget collects the hard stuff; the session should flow to output quickly.
12. Keep all output in English.

---

## Self-Improvement

After every sprint review session, check:
- Did Phase 0 (Day-75 guard) fire correctly? Did the operator accept the retro-first path, or override?
- Did the widget collect everything needed, or were post-submission questions required? If yes, add a field to the widget.
- Did any Rock score prompt confusion about Good/Better/Best scoring? If yes, tighten the scale description in the widget.
- Did the 5 Pillars delta produce a useful insight, or was it noise?
- Did the decision harvest produce anything worth adding to the Rules section above?
- Was the Transition Bridge step needed and accurate? Note any edge cases.

Add findings to the Rules section. This skill gets better by accumulating real session patterns.
