---
name: 2-week-sprint-review
description: |
  Runs the Todd Herman 2-Week Sprint Review every other Friday at Days 14/28/42/56/70 of an
  active 90-day cycle. Aggregates 2 weekly plans + 14 daily-checkouts (Scorecard, 5 Pillars,
  Pile-Up Zone, reflection) against active 90-day Rocks. Drives the load-bearing Start / Stop /
  Continue / More / Less decision engine across goals, projects, activities, routines, and
  Pillars. Surfaces the 14-day Pillars trend, tallies Scorecard per venture, filters Pile-Up,
  picks the 1–2 highest-leverage adjustments for the next sprint, harvests rules to Decisions
  & Rules. Outputs a dated file and routes carry-forward into next weekly-planning. Trigger on:
  "2-week review", "bi-weekly sprint review", "biweekly review", "fortnight review", "sprint
  review", "every other Friday review", "Start Stop Continue review", "Start Stop Continue More
  Less", "five change-making questions", "Herman sprint review", "14-day review", "Day
  14/28/42/56/70 review", "mid-sprint review". MANDATORY at Days 14/28/42/56/70 of an active
  90-day sprint.
allowed-tools: "Read, Write, Glob, Grep, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.1
  created: 2026-05-16
  updated: 2026-05-16
  language: English
  framework: Todd Herman 90 Day Year (Module 3) + CCC Decision Harvest extension
  distribution: marketplace-ready
---

# 2-Week Sprint Review Skill

**Workflow: Aggregate → Reflect (Start/Stop/Continue/More/Less) → Adjust → Harvest → Route**

Session time: ~45–75 min. The single most important cadence Daniel's previous planning system was missing — the **compound-effects window**. Two weeks is long enough for patterns to emerge, short enough to course-correct before drift becomes 90-day damage. Herman: *Run a tight feedback loop between action and reflection at five nested cadences. The bi-weekly cadence is where compound effects show.*

The load-bearing mechanism in this skill is the **5 change-making questions: Start / Stop / Continue / More / Less**. Everything else is scaffolding around that decision engine.

---

## Phase 0 — Context Load (automatic, no questions)

Before asking anything, load all five:

1. **Active 90-day Sprint file** — find the most recent `*90 Day Strategic Goal Attainment Sprint*` file in `00 - COMMAND CENTER/Daily Notes/[year]/[quarter]/`. Extract the Quarter Theme, the 3 Rocks (with current sprint-slice targets if present), the active 2-Week Sprint slice number (which of the 6 slices we're closing — Day 14 = Slice 1, Day 28 = Slice 2, etc.).
2. **Last 2 Weekly Plans** — Glob for the two most recent `*Weekly Plan*` files. Extract: TOP 3 per week, Rock statuses, Drumbeat completion, carry-forwards.
3. **Last 14 Daily Check-outs** — Glob for `*Daily Checkout*` files in the last 14 days. From each, extract: Wins, Scorecard tallies (per-venture revenue-producing-activity counts), 5 Pillars rating (Body / Being / Balance / Business / Belonging), Pile-Up Zone items, 3-part reflection items.
4. **Pillars trend** — invoke `pillars-trend` for the 14-day window (or, if `pillars-trend` is not yet shipped, compute the trend inline: 14-day average per pillar, drift direction, any pillar ≤ 3 for 2+ days on the 1-10 scale — bottom 30% = floor-breach territory).
5. **Decisions & Rules log** — read `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` so the Decision Harvest at the end can avoid duplicating rules already on the books.

Surface a compact summary block:

```
2-Week Sprint Review — Slice [N] of 6 closing
Quarter Theme: [Theme]
Active Rocks: (1) [Rock 1 — status] (2) [Rock 2 — status] (3) [Rock 3 — status]
Window: [YY-MM-DD] → [YY-MM-DD] (14 days)
Pillars 14-day average (1-10 scale): Body [X.X] · Being [X.X] · Balance [X.X] · Business [X.X] · Belonging [X.X]
Drifting Pillars: [list — any ≤ 6 (below the healthy 7-10 band) or trending down]
Scorecard tally: CCC [N] · LONNEL [N] · EI [N] · [other venture] [N]
Pile-Up Zone (open): [N items]
Decision Harvest delta since last sprint review: [N rules added]
```

If any input is missing (e.g., only 12 daily-checkouts exist, not 14), note the gap in the summary and proceed — don't block on incomplete data. Honesty is part of the review.

---

## Phase 1 — Wins & Progress Capture (~5 min)

Ask:

**Q1 — Wins from the 2-week window**

"What were the wins of the last 2 weeks? Revenue booked, clients signed, content shipped, Rocks advanced, routines held, breakthroughs. Quantify when possible — euros, calls, posts, days streak. List everything that earned the word *win*."

*Tip: offer to read the 14 daily-checkouts and surface wins the operator may have forgotten or under-counted.*

**Q2 — Rock progress vs. sprint-slice target**

"For each Rock — how much did the last 2 weeks move it vs. what the sprint-slice plan said it should? Quantify the gap (or surplus)."

---

## Phase 2 — The 5 Change-Making Questions (~25 min — THE CORE)

**This is the load-bearing reflection. Do not skip, compress, or merge.** The 5 questions are applied to five domains: goals · projects · daily activities · routines · 5 Pillars. The operator may not have an answer in every cell — that's fine, but ASK every cell before moving on.

Ask one question at a time. For each, prompt the operator across the five domains. Capture 1–3 items per question (more than that = the operator is overscoping the next sprint).

**Q3 — START doing**

"What do you want to **start** doing in the next 2 weeks? Across goals, projects, daily activities, routines, and Pillars — what's not on the page yet that needs to be? 1–3 items max."

*Note: START is the hardest routine type per Herman's R.O.A.R. taxonomy. If a START item appears, flag it for potential R.O.A.R. design.*

**Q4 — STOP doing**

"What do you want to **stop** doing? What activity, project, commitment, or pattern is consuming time without producing? 1–3 items max."

*Note: STOP is also hardest per R.O.A.R. Resistance here is the signal that the item matters.*

**Q5 — CONTINUE doing**

"What's working that you want to **continue** doing? Name it explicitly so it gets protected in next sprint's plan — things working quietly tend to get displaced when something new arrives. 1–3 items max."

**Q6 — MORE of**

"What do you want to do **more** of? Things you're already doing but at sub-optimal dose. 1–3 items max."

**Q7 — LESS of**

"What do you want to do **less** of? Things you're doing too much of but aren't ready to stop entirely. 1–3 items max."

---

## Phase 3 — 10,000-Foot View (~5 min)

**Q8 — Outside view**

"Step out of the operator seat for a moment. What shifted in the last 2 weeks in the industry, in AI capabilities, in the market, in your personal life, in your network that's not yet reflected in your sprint plan? Threats, opportunities, signal you've been ignoring."

Pull from any Strategic Intelligence captures from the prior 2 weeks if available (Glob `01 - KNOWLEDGE BASE/📥 Inbox/` and recent daily-checkouts for flagged signal items).

---

## Phase 4 — Pile-Up Zone Filter (~5 min)

The Pile-Up Zone is where items go that piled up uncompleted across the 14 days. They don't get to roll silently into next sprint — every item gets a decision.

For each Pile-Up Zone item:

| Decision | Meaning |
|---|---|
| **Act now** | Block & Tackle it before the review ends (or before the next sprint starts) |
| **Promote** | Goes into next 2-Week Sprint plan with an explicit slot |
| **Delegate** | Hand to Jack, partner, or AI — route to `handoff-prep` if it needs a brief |
| **Delete** | Kill it. Note the reasoning |
| **Park** | Survives this review but goes to Braindump Vault C-list. If it survives a SECOND sprint review without being acted on, it gets surfaced at the next 75-Day Retro for cycle-level consideration |

---

## Phase 5 — Top 1–2 Adjustments for Next 2-Week Sprint (~5 min)

**Q9 — The leverage call**

"Of everything we surfaced — the Start/Stop/Continue/More/Less items, the Pile-Up filter results, the outside-view signal — what are the **1 or 2 highest-leverage adjustments** for the next 2-week sprint? Not 5. Not 10. The 1–2 that, if implemented, change the trajectory of the next slice."

This is the editorial call. The reflection produces 15+ candidate items across Q3–Q7; the operator's job is to pick the 1–2 that compound. The skill's job is to push back if the operator hedges into 4 or 5.

*Common pattern: one START item + one STOP item is the strongest pair. Cuts ineffective AND adds effective in one sprint.*

---

## Phase 6 — Plan Next 2-Week Sprint (~10 min)

**Q10 — Next sprint-slice activities**

"Looking at the 90-day Roadmap — which Activities from the next slice of the plan move forward in the next 14 days? Map them to the 3 Rocks. Be specific about what 'done' looks like at Day 14 of the next slice."

**Q11 — Daily Scorecard target**

"What's the daily Scorecard target (revenue-producing-activity count or daily target value) per venture for the next 14 days? Does it shift vs. the last slice given what we just learned?"

**Q12 — Routine adjustments**

"From the Q3–Q7 reflection: any routines being added, redesigned, or retired? If a START or STOP routine surfaces, flag it for `roar-routine-design` (or run R.O.A.R. inline here using Trigger → 4 E's → Reward). If a Pillar is drifting, decide which routine intervenes."

---

## Phase 7 — Decision Harvest (~5 min)

**Q13 — Rules earned**

"Any rule that emerged in the last 2 weeks worth codifying? Patterns you noticed about how you work, what fails, what succeeds, what to never do again? Phrasings like 'whenever X, do Y' or 'never do X without Y first'."

For each rule:

1. Read `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` (already loaded in Phase 0) — check for duplicates or near-duplicates.
2. Append the new rule with date prefix and source: `**[YY-MM-DD] · [Rule].** Source: 2-Week Sprint Review Slice [N], [Quarter Theme] cycle.`
3. If a rule contradicts an existing rule, surface that explicitly — Daniel decides whether the new rule supersedes the old, or whether both stand with conditions.

*Herman has no Decision Harvest equivalent. This is CCC-original mechanism extended into the bi-weekly cadence — wisdom compounds explicitly through codified rules, not implicitly through 3-cycle mastery. The bi-weekly Decision Harvest is what makes this cadence compound across the 90-day cycle.*

If no rule emerged this cycle, write `**[YY-MM-DD] · No new rule this sprint.**` explicitly — better to log the absence than to manufacture a rule.

---

## Phase 8 — Output

**File location:**

`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[current-week-folder]/[YY-MM-DD] - 2 Week Sprint Review.md`

Date prefix = the Friday (or Saturday) the review runs.

**Template:**

```markdown
---
type: 2-week-sprint-review
sprint_slice: [N] of 6
quarter_theme: "[Theme]"
window_start: [YY-MM-DD]
window_end: [YY-MM-DD]
created: [YY-MM-DD]
related:
  - "[[YY-MM-DD — 90 Day Strategic Goal Attainment Sprint — Theme]]"
  - "[[YY-MM-DD - Weekly Plan]]"
tags:
  - 2-week-sprint-review
  - 90-day-year
  - ccc-planning
---

# 2-Week Sprint Review — Slice [N] of 6

**Window:** [YY-MM-DD] → [YY-MM-DD]
**Quarter Theme:** [Theme]
**Active Sprint:** [[YY-MM-DD — 90 Day Strategic Goal Attainment Sprint — Theme]]

---

## Context Snapshot

**Pillars trend (14-day average):**

| Pillar (1-10) | Avg | Trend | Flag |
|---|---|---|---|
| Body | [X.X] | up/down/flat | [flag if ≤ 6 avg or 2+ days ≤ 3] |
| Being | [X.X] | up/down/flat | |
| Balance | [X.X] | up/down/flat | |
| Business | [X.X] | up/down/flat | |
| Belonging | [X.X] | up/down/flat | |

**Scorecard tally (14-day total per venture):**

| Venture | RPA count | Target | Delta |
|---|---|---|---|
| CCC | [N] | [N] | [+/-] |
| LONNEL | [N] | [N] | [+/-] |
| EI | [N] | [N] | [+/-] |
| [other] | [N] | [N] | [+/-] |

**Rock progress:**

| Rock | Slice target | Actual | Status |
|---|---|---|---|
| Rock 1 — [Name] | [target] | [actual] | red/yellow/green |
| Rock 2 — [Name] | [target] | [actual] | red/yellow/green |
| Rock 3 — [Name] | [target] | [actual] | red/yellow/green |

---

## Wins (Phase 1)

- [Win 1]
- [Win 2]

---

## The 5 Change-Making Questions (Phase 2 — the core)

### START doing
1. [Item]
2. [Item]

### STOP doing
1. [Item]
2. [Item]

### CONTINUE doing
1. [Item]
2. [Item]

### MORE of
1. [Item]
2. [Item]

### LESS of
1. [Item]
2. [Item]

---

## 10,000-Foot View (Phase 3)

[Threats, opportunities, market/industry/personal signals to integrate]

---

## Pile-Up Zone Filter (Phase 4)

| Item | Decision | Note |
|---|---|---|
| [Item] | Act now / Promote / Delegate / Delete / Park | [reasoning] |

---

## Top 1–2 Adjustments for Next Sprint (Phase 5)

1. **[Adjustment]** — [why this compounds]
2. **[Adjustment]** — [why this compounds]

---

## Next 2-Week Sprint Plan (Phase 6)

**Sprint slice:** [N+1] of 6 · Window: [YY-MM-DD] → [YY-MM-DD]

**Activities per Rock:**
- Rock 1 — [Activity 1, Activity 2]
- Rock 2 — [Activity 1]
- Rock 3 — [Activity 1, Activity 2]

**Daily Scorecard target:** CCC [N] · LONNEL [N] · EI [N] · [other] [N]

**Routine adjustments:** [list — or "none this sprint"]

---

## Decision Harvest (Phase 7)

- **[YY-MM-DD]** · [Rule earned] — appended to `Decisions & Rules.md`
- *(or)* **[YY-MM-DD]** · No new rule this sprint.

---

## Carry-Forward to Next Weekly Plan

The next `weekly-planning` invocation reads this section first:

- **Top adjustments to slot:** [from Phase 5]
- **Activities to plan into the week:** [from Phase 6]
- **Routines to install / redesign:** [from Phase 6]
- **Drifting Pillar to intervene on:** [from Phase 0, if any]
```

After saving, confirm the file path and say:

"Sprint review complete. Slice [N] closed, Slice [N+1] planned. Carry-forward staged for the next weekly plan. [N] rules harvested to Decisions & Rules."

---

## Rules (Update This Section When Things Go Wrong)

1. Never skip the 5 questions in Phase 2 to save time. The Start/Stop/Continue/More/Less is the load-bearing decision engine — everything else is scaffolding. If time is tight, compress Phases 1/3/4, never Phase 2.
2. Never allow more than 1–3 items per change-making question. Operators who list 5+ items per question are not editing — they are wishing. Push back: "Of these 5, which 2 actually compound? Park the others to the Braindump Vault."
3. Never let the top-adjustments call (Phase 5) bloom past 2. The whole point of the review is the editorial decision: 1–2 leverage moves for the next slice. 3+ adjustments = no adjustment.
4. Never silently roll Pile-Up items into the next sprint. Every Pile-Up item gets one of the 5 decisions (Act/Promote/Delegate/Delete/Park) — silence is a failure mode that compounds.
5. Never invent a Decision Harvest rule to feel productive. If no rule emerged, log `No new rule this sprint.` explicitly. Manufactured rules dilute the Decisions & Rules file.
6. Always check Decisions & Rules in Phase 0 so harvest in Phase 7 doesn't duplicate. Near-duplicates get explicitly reconciled (supersede / both-stand-with-conditions).
7. Always reference the active 90-day Sprint Rocks throughout — the 2-week sprint is a slice of the 90-day cycle, not an independent unit. Reflection without Rock-anchoring drifts into general venting.
8. Always route the carry-forward to the next weekly-planning invocation explicitly (the "Carry-Forward" section). The bi-weekly cadence only compounds if its outputs become the next week's inputs.
9. If Day 14/28/42/56/70 falls in a week where the operator is sick, traveling, or in capacity collapse — run a compressed version (Phases 1, 2 only, ~15 min) rather than skipping. Skipping kills the cadence.
10. If a Rock is clearly obsolete by the time of this review, do not silently kill — the review IS the place to explicitly kill it, redirect remaining slice Activities, and document the kill + reasoning in Decision Harvest (per Herman's mid-cycle Rock-obsoletion protocol).

---

## Dependencies & Connections

**Reads from:**
- `daily-checkout` outputs (Scorecard, 5 Pillars, Pile-Up Zone, 3-part reflection) — 14 days
- `weekly-planning` outputs — 2 weeks
- `90-day-sprint` active file — Quarter Theme, Rocks, slice targets
- `pillars-trend` (read-skill) — 14-day Pillars window
- `Decisions & Rules.md` — to avoid duplicates in harvest

**Writes to:**
- `2-Week Sprint Review` file in current week folder
- `Decisions & Rules.md` (appended rules)
- Carry-forward section feeds the next `weekly-planning` Phase 0

**Connects to:**
- `75-day-retro` — accumulated Sprint Review files feed Day-75 retro inputs
- `90-day-sprint-review` — final-cycle Sprint Reviews surface the cycle's recurring patterns
- `roar-routine-design` — START / STOP routine flags route here
- `handoff-prep` — Pile-Up Zone "Delegate" decisions route here

---

## Self-Improvement

When a sprint review produces no Decision Harvest rule, no top adjustment, or all-green Pillars and Rocks — diagnose:
- Was the cycle genuinely uneventful, or was the review run as a check-the-box exercise?
- Did Phase 2 get compressed?
- Did the operator hedge in Phase 5?

When a top adjustment from a review compounds visibly into the next slice — note the pattern (which Q in Phase 2 surfaced it, how it was phrased, what made it leverage-y) and add the framing to the Rules section as a reference example.

When a Pile-Up Zone item survives 3+ sprint reviews without being acted on — that's a cycle-level question, not a sprint-level one. Surface explicitly to the next 75-Day Retro.

This skill is never finished. Th