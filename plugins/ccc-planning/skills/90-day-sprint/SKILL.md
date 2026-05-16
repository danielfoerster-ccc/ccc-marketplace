---
name: 90-day-sprint
description: |
  Runs a 90-Day Goal Attainment Sprint kickoff integrating Todd Herman's
  Achievement Phase mechanics onto Daniel's Boulder → Rock → Pebble → Activity
  hierarchy. Reads the active sprint and prior 75-day-retro draft to skip
  redundant questions, then runs Quarter Review → Vision → Theme → 5 Pillars
  baseline → Rocks (OPP "so that" framing + Good/Better/Best + Effort×Impact)
  → Pebbles → Activities. Produces THREE artifacts: the full Sprint doc, a
  condensed MAPIT action sheet, and a per-venture Entrepreneur Scorecard
  configuration that daily-checkout reads each evening. Use at quarter start,
  when resetting priorities, or to promote a 75-day-retro draft into a live
  sprint. Trigger on: "90-day plan", "quarterly planning", "new sprint",
  "reset OKRs", "plan next 90 days", "sprint kickoff", "promote retro draft",
  "Achievement Phase", "Pillars baseline", "MAPIT sheet".
allowed-tools: "Read, Write, Glob, Edit"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 2.0.1
  updated: 2026-05-16
  created: 2026-03-06
  language: English
  framework: Flashhub Boulders/Rocks/Pebbles + OKR + Todd Herman 90 Day Year (Achievement Phase)
  sop: "02 - MISSION CONTROL/SOPs & Playbooks/SOP — Running the 90 Day Year.md"
  distribution: marketplace-ready
---

# 90-Day Sprint Planning Skill

**Workflow: Context Load → Quarter Review → Vision Anchors → 5 Pillars Baseline → 90-Day Theme → Rocks (OPP + GBB + Effort×Impact) → Pebbles → Activities → Scorecard Config → Dual Output (Sprint Doc + MAPIT Sheet)**

Lean, execution-focused quarterly planning. The Boulder/Rock/Pebble/Activity backbone stays. Herman's Achievement Phase mechanics are layered as *filters* on top of the hierarchy — they don't replace the hierarchy, they decide which candidates survive.

Session time: ~60–75 minutes (was ~45 — the extra 15–30 covers Pillars baseline + OPP/GBB/Effort×Impact scoring + Scorecard config).

---

## Phase 0 — Context Load (automatic, no questions)

Before asking anything, read the vault:

1. Search `00 - COMMAND CENTER/Daily Notes/` for the most recent file matching `*90 Day Strategic Goal Attainment Sprint*`. Read it.
2. Search the same folder for the most recent `*75 Day Retro*` or `*75-Day Retro & Next Sprint Draft*` file. **If found, this draft is the primary input.** It already contains Steps 1–9 of the Roadmap from the previous cycle's day-75 work — your job is to confirm, refine, and complete Step 10 (first 2-Week Sprint + Activities), not to re-do Steps 1–9.
3. Search for the most recent file matching `*Sprint Closeout*` — extract Decision Harvest rules and the "what changes this quarter" answer.
4. Read `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` — surface any rules tagged for this cycle's Theme candidates.
5. Surface a compact summary block:

```
Last sprint: [Name] · [Period] · Theme: [Theme]
Closeout: [Day 90 done / Strategic interrupt on Day N / Not yet closed]
Rocks scored: [Rock 1 X%, Rock 2 X%, Rock 3 X%]
75-day-retro draft: [Found — promote / Not found — full Achievement Phase]
Decision Harvest from cycle: [N rules added]
Pillars trend (if available): [last cycle's baseline → close deltas]
```

Tell the operator which questions you will skip because they're already answered.

If no prior sprint or retro file exists, proceed from scratch (full Achievement Phase, no skipping).

---

## Elicitation Widget — Quarter Review

Collect Quarter Review inputs (Q1–Q3) in **one widget**. This is the only widget in the skill — the rest flows as conversation because Pillars, OPP, GBB, and Effort×Impact need back-and-forth that a single form would flatten.

**Steps:**
1. Complete Phase 0 first — surface the summary
2. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` (silent)
3. Call `mcp__visualize__show_widget` with a form that has:
   - Read-only context card inside `.elicit-body` showing: last sprint Theme + Rocks + OKR scores, Decision Harvest highlights, Pillars baseline-vs-close deltas if available
   - Q1 what moved: textarea (revenue, clients signed, milestones, wins)
   - Q2 what didn't move and why: textarea (one-sentence-per-item diagnosis, no justification)
   - Q3 what changes this quarter: textarea (single most important change)
4. Submit button: **"Start the sprint"**
5. Wait for submission, parse, then proceed to Phase 2

If a 75-day-retro draft was found in Phase 0, the widget shows a 4th read-only field summarizing the retro's "what worked / what didn't / what surprised" answers as context. The retro draft IS the data; this phase confirms it's still accurate.

---

## Phase 2 — Vision Anchors (~5 min)

Quick anchors, not deep reflection. Pull from existing sprint if available — only ask if missing or clearly outdated.

**Q4 — 3-Year Personal Vision (5 goals).** Skip if already in sprint file and still accurate.

**Q5 — 3-Year Business Vision (5 goals).** Skip if already in sprint file and still accurate. *Multi-venture note:* Daniel runs multiple ventures (CCC, LONNEL or whatever it becomes, EI, Venture A, etc.). Vision goals can span ventures or stay venture-specific; don't force one-venture framing if the operator's vision is portfolio-level.

**Q6 — "What I really want" braindump.** Skip if already captured. Motivational anchor, not planning tool.

---

## Phase 2.5 — 5 Pillars Baseline (~10 min) **[NEW — Herman Achievement Phase]**

Score the **5 Business Pillars** 1–10 each. This is the cycle's baseline — it'll be re-scored at the 75-day-retro and again at sprint-close so deltas surface.

> *"1-10 is easier to quantify mentally — 1 = 0-10% (didn't show up), 5 = approximately 50%, 10 = 100% (fully showed up). The Pillar rating answers: 'how much did I show up for this today?' as a percentage on a 1-10 scale."*
>
> The same 1-10 scale anchors both the **Business Pillars** baseline (this phase) and the **Performance Pillars** rated daily via `daily-checkout` Step 3 (Body / Being / Balance / Business / Belonging). One scale, mentally consistent across cadences.

| # | Pillar | Question |
|---|--------|----------|
| 1 | Marketing, Sales & Product | Lead gen, conversion, offers, messaging — where are we right now? |
| 2 | Operations & Technology | Systems, processes, tools, infrastructure — what's running cleanly? |
| 3 | Distribution Channels | How product reaches the market — what's working, what's blocked? |
| 4 | People & Leadership | Team, culture, hiring, development — what's the state? |
| 5 | Financial | Cashflow, profit, pricing, allocation, reporting — what's the truth? |

**Multi-venture handling:** Score each Pillar *per active venture* (CCC, LONNEL, EI, Venture A as relevant). Use the higher score where ventures share infrastructure (Operations & Technology is often shared).

Plus the **Foundation rating** — 1–10 on the execution system itself (how well did the operating cadence run last cycle?).

For any Pillar scored < 7, write a one-sentence cause statement. These become candidate insights for Rock selection — pain-Pillars source *defensive* Rocks (fix what's broken); strength-Pillars source *offensive* Rocks (compound what works).

**Why this matters:** Without a baseline, the 75-day-retro and sprint-close can't measure delta. Pillars data is the substrate-floor measurement layer the Charter currently lacks at this cadence.

Persist as `## 5 Pillars Baseline (Cycle N)` block in the sprint file. Feeds [[pillars-trend]].

---

## Phase 2.5b — Entrepreneur Scorecard Configuration (~10 min) **[NEW — Herman Achievement Phase, ships LIVE this sprint]**

For each active venture, define the per-day revenue-producing-activity math. This config doc is what `daily-checkout` Step 2 reads from when capturing the daily Scorecard tally.

For each venture (CCC / LONNEL / EI / Venture A — whichever are active), ask sequentially:

1. **Revenue goal for this sprint?** (post-tax target, e.g., €30k for CCC)
2. **Tax rate + cost ratio** (defaults: 30% tax, 20% cost — confirm or override)
3. **Working days this sprint?** (default 61 from a 90-day cycle minus weekends/holidays — confirm)
4. **What counts as a logged activity?** Per-stage examples Herman uses:
   - *Start-Up:* cold call ($10), proposal sent ($50), discovery call held ($250), client signed ($1,000+)
   - *Ramp-Up:* same shape, $10 / $100 / $500 / $5,000+
   - *Build-Up / Scale-Up:* $10 / $100 / $1,000 / $10,000+
   - Daniel customizes per venture's actual conversion economics — ask, don't assume.
5. **Which Rocks does this venture's Scorecard support?** (Maps the Scorecard tally back to the Rock layer — when the daily Scorecard hits target, which Rock does it advance?)

**The math (compute and surface):**
```
After-tax goal / (1 - tax_rate) = pre-tax goal
Pre-tax goal / (1 - cost_ratio) = revenue needed
Revenue needed / working days = Daily Target Value (€/day of scored activity)
```

Worked example (CCC, €30k post-tax target, 30% tax, 20% cost, 61 working days):
- €30,000 / 0.70 = €42,857 pre-tax
- €42,857 / 0.80 = €53,571 revenue needed
- €53,571 / 61 = **€878/working day** of scored activity value

**Output:** Create a separate file at:
`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] — Entrepreneur Scorecard Config — Cycle [N].md`

```markdown
---
type: scorecard-config
sprint: [[Sprint File Name]]
cycle: [N]
created: [today]
---

# Entrepreneur Scorecard Configuration — Cycle [N]

This is the source-of-truth that `daily-checkout` Step 2 reads when capturing per-venture daily Scorecard tallies.

## Venture: CCC
- **Revenue goal (post-tax):** €[N]
- **Tax rate:** [N]% · **Cost ratio:** [N]%
- **Working days in cycle:** [N]
- **Daily Target Value:** €[N]/day of scored activity
- **Logged activity → $-value table:**
  | Activity | $-value |
  |---|---|
  | [Activity] | €[N] |
  | [Activity] | €[N] |
- **Rocks this venture supports:** [[Rock 1]], [[Rock 2]]

## Venture: LONNEL (or whatever it becomes)
[same structure]

## Venture: EI
[same structure]

## Venture: [Venture A]
[same structure]

---

*Used by `daily-checkout` Step 2 (Scorecard tally) and `pillars-trend` for cross-venture analysis.*
```

**Why a separate file (not embedded in the Sprint doc):** Daily-checkout reads this every evening. Putting it in the Sprint doc would force the checkout skill to scan a 200-line file for 5 lines. Separate config file = clean read path.

---

## Phase 3 — 1-Year Boulders (~10 min)

Three columns (preserved from v1): **S&M: Revenue Generation | S&M: Thought Leadership | Operations**

Pull from prior sprint if Boulders are still current. Only re-ask if explicitly stale.

**Q7 — 1-Year Revenue Boulder** (max 2, directional and inspiring, not task-like).

**Q8 — 1-Year Thought Leadership Boulder** (max 2).

**Q9 — 1-Year Operations Boulder** (max 1).

---

## Phase 4 — 90-Day Theme (1 question)

**Q10 — Quarter Theme.** "If you were to give this quarter a theme — a phrase that motivates and focuses you — what would it be?"

The Theme is the **80%-pull-magnet** (Herman). 80% of Rocks must support the Theme; 20% can be off-theme maintenance Rocks (e.g., substrate-floor health).

**Acceptance criterion:** Can the Theme be stated in 1–3 words, fits on a sticky note, and visibly governs the Rocks you'll pick? If not, push for a sharper Theme — vague Themes don't filter.

If a 75-day-retro draft proposed a Theme, surface it: *"The retro draft proposed '[Theme]'. Lock as-is, refine, or replace?"*

---

## Phase 5 — 90-Day Rocks with OPP + GBB + Effort×Impact (~20 min) **[Herman filters added]**

Rocks are the specific outcomes you will achieve *this quarter* that move toward the Boulders. Max 5 total across all three columns.

For each Rock candidate, apply three filters in sequence — these are Herman's Achievement Phase Steps 6, 7, 8:

### Filter 1: OPP "so that" framing **[NEW]**

Every Rock must be stated as: **"[outcome] so that [downstream effect]"**.

Without the "so that," it's a Project (Pebble layer), not a Rock. The "so that" clause forces clarity on *why this Rock*.

Examples:
- "Sign 3 Discovery Month clients" — missing downstream effect (reject)
- "Sign 3 Discovery Month clients **so that** Q3 revenue covers FULCRUM seed" (accept)
- "Ship the CCC AI Audit Playbook v1 **so that** the next cohort onboarding takes <2 hours instead of 6" (accept)

If the operator can't state the "so that," the candidate is either a Pebble or a vanity goal. Demote or kill.

### Filter 2: Good/Better/Best targets **[NEW]**

For each Rock, define three target tiers:

| Tier | Probability | Plan toward this? |
|------|-------------|-------------------|
| **Good** | ~80% confident hit | Yes — this is the realistic plan |
| **Better** | ~50% probability | Stretch — what would need to be different? |
| **Best** | ~15% probability | Audacious — fuels possibility |

Plan projects (Pebbles/Activities) toward GOOD. Then ask: "What would need to be different to hit BETTER?" Then BEST. This removes the men-set-only-best-goals trap — multiple ways to win per Rock, no failure-feeling on missing the moonshot.

**Replaces** the v1 single Committed/Stretch field — Committed maps to Good, Stretch maps to Better, Best is new.

### Filter 3: Effort × Impact scoring (Project Impact Matrix) **[NEW]**

For Rock candidates that compete for the 5 slots, score each 1–10 on Effort and 1–10 on Impact. Apply the kill rule:

| Impact / Effort | Low Effort | High Effort |
|---|---|---|
| **High Impact** | Quick Wins — *chase first* | Major Projects — *max 1–2 in flight* |
| **Low Impact** | Fill-Ins — *delegate or Pile-Up* | **Hard Slogs** — *kill without ceremony* |

Hard Slogs are the silent killer. If a candidate scores Low Impact + High Effort, do not negotiate — drop it.

### Ask sequence

**Q11 — Revenue Rock(s):** "What specific, measurable outcome makes this quarter a success? Max 2."
For each: get OPP "so that" clause → Good/Better/Best targets → Effort×Impact score.

**Q12 — Thought Leadership Rock(s):** Same structure. Max 2.

**Q13 — Operations Rock:** Same structure. Max 1.

**Goal Decision Matrix (Final Filter):** List all surviving candidates. Columns: Theme aligned? Stage appropriate? Resources available? Net YES? **Most candidates should end NO.** Land on 1–3 Rocks per column = max 5 Rocks total.

---

## Phase 6 — Pebbles (weekly metrics, ~10 min)

For each Rock: 1–5 weekly measurements that prove it's on track.

"For your Rock '[Rock name]': what are the weekly numbers or actions you need to be hitting consistently? These are your Pebbles — lead indicators, not outcomes."

Examples:
- "20 cold calls made per dedicated calling day"
- "3 LinkedIn outreach messages sent per day"
- "1 new Discovery Month client signed per week"

Pebbles are the weekly read; Activities (next phase) are the daily-placeable units.

---

## Phase 7 — Activities (committed vs. stretch, ~5 min)

For each Pebble: committed activities (non-negotiable weekly actions) and stretch activities (added when momentum is high). Max 5 activities per Pebble. Mark **Committed** or **Stretch**.

Each Activity must be calendar-placeable and have a Daily Target Value contribution (links to the Scorecard config).

---

## Phase 8 — Output (TWO deliverables + Scorecard config)

### Deliverable 1: Sprint Document

Create at:
`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] — 90 Day Strategic Goal Attainment Sprint — [Theme].md`

```markdown
---
type: 90-day-sprint
period: [Start] – [End]
created: [today]
quarter: [Q1 | Q2 | Q3 | Q4]
theme: "[Theme]"
cycle: [N]
scorecard_config: "[[YYYY-MM-DD — Entrepreneur Scorecard Config — Cycle [N]]]"
mapit_sheet: "[[YYYY-MM-DD — MAPIT Action Sheet — Cycle [N]]]"
sources:
  - "[[Todd Herman]]"
  - "[[ccc-planning]]"
  - "[[Decisions & Rules]]"
---

# 90-Day Strategic Goal Attainment Sprint — [Theme]

**Period:** [Start Date] – [End Date]
**Quarter Theme:** [Theme]
**Cycle:** [N] · **Daily Target Value (aggregate):** €[N]/day
**Scorecard config:** [[YYYY-MM-DD — Entrepreneur Scorecard Config — Cycle [N]]]
**MAPIT action sheet:** [[YYYY-MM-DD — MAPIT Action Sheet — Cycle [N]]]

---

## 5 Pillars Baseline (Cycle [N])

| Pillar | Score | Cause statement (if <7) |
|---|---|---|
| Marketing, Sales & Product | [N]/10 | [Sentence if <7] |
| Operations & Technology | [N]/10 | [Sentence if <7] |
| Distribution Channels | [N]/10 | [Sentence if <7] |
| People & Leadership | [N]/10 | [Sentence if <7] |
| Financial | [N]/10 | [Sentence if <7] |
| **Foundation (execution system)** | [N]/10 | [Sentence if <7] |

*Per-venture variants if applicable. Re-scored at 75-day-retro and sprint-close.*

---

## 3-Year Vision

### Personal (5 Goals)
1. [Goal]

### Business (5 Goals)
1. [Goal]

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

For each Rock: OPP "so that" framing + Good/Better/Best + Effort×Impact.

### Rock 1 (Revenue Generation): [Outcome] so that [downstream effect]
| Tier | Target | Probability |
|---|---|---|
| Good | [Target] | ~80% |
| Better | [Target] | ~50% |
| Best | [Target] | ~15% |
- **Effort×Impact:** E[N]/10 · I[N]/10 — [Quick Win / Major Project / Fill-In / Hard Slog]
- **Boulder:** [[Boulder it rolls up to]]

*(Repeat per Rock)*

---

## Pebbles (Weekly Metrics per Rock)

### Rock: [Rock Name]
| Pebble | Target | Committed Activities | Stretch Activities |
|---|---|---|---|
| [Pebble 1] | [Number/frequency] | [Activity] | [Activity] |
| [Pebble 2] | | | |

*(Repeat per Rock)*

---

## Quarter Review (from last sprint)

**What moved:** [Summary]

**What didn't move and why:** [Summary]

**What changes this quarter:** [Single sentence]

---

## Tracker Note
> Copy the Google Sheets 90 Day Plan V4 tracker, rename it `[YYYY-MM-DD] 90 Day Plan V4`,
> and transfer the Rocks, Pebbles, and Activities into the corresponding cells.

---

*Daily Target Value lives in [[Entrepreneur Scorecard Config]]. Pillars trend tracked via [[pillars-trend]].*
```

### Deliverable 2: MAPIT Action Sheet **[NEW]**

Create at:
`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] — MAPIT Action Sheet — Cycle [N].md`

A condensed, single-page action-sheet version of the sprint. The Sprint doc is the *full* artifact; the MAPIT sheet is the *operating* artifact — what the operator looks at every morning. Herman's MAPIT condenses Map → Act → Plan → Iterate → Track.

```markdown
---
type: mapit-action-sheet
sprint: "[[YYYY-MM-DD — 90 Day Strategic Goal Attainment Sprint — [Theme]]]"
cycle: [N]
period: [Start] – [End]
created: [today]
---

# MAPIT Action Sheet — Cycle [N] — [Theme]

**This is the operating one-pager.** Print it. Pin it. Read it every morning.

## MAP — Where I'm aimed

**Theme:** [Theme]
**Boulders this Rock work rolls up to:** [Boulder names]
**Cycle period:** [Start] → [End] · Day 1 of 90

## ACT — The Rocks (Good targets only)

| # | Rock (with "so that") | Good Target | Effort/Impact |
|---|---|---|---|
| 1 | [Outcome] so that [effect] | [Good] | E[N]/I[N] |
| 2 | [Outcome] so that [effect] | [Good] | E[N]/I[N] |
| 3 | [Outcome] so that [effect] | [Good] | E[N]/I[N] |

**Daily Target Value (aggregate):** €[N]/working day · See [[Scorecard Config]] per venture.

## PLAN — First 2-Week Sprint (Days 1–14)

| Pebble | Weekly target | Days 1–7 | Days 8–14 |
|---|---|---|---|
| [Pebble] | [Number] | [Activity] | [Activity] |
| [Pebble] | [Number] | [Activity] | [Activity] |

## ITERATE — Review cadence

- **Daily:** Block & Tackle 3 slots + Scorecard tally + Pillars rating (via [[daily-checkin]] + [[daily-checkout]])
- **Weekly (Monday):** [[weekly-planning]]
- **Bi-weekly (Friday of even week):** [[2-week-sprint-review]] — Day 14, 28, 42, 56, 70
- **Day 75 ± 5:** [[75-day-retro]] — inviolable. Draft next cycle through Step 9.
- **Day 90:** [[90-day-sprint-review]] — closeout only.

## TRACK — Key metrics

- 5 Pillars baseline → re-score at Day 75 → re-score at Day 90 (deltas reveal real movement)
- Decision Harvest count target: ≥4 rules/cycle to [[Decisions & Rules]]
- Daily Scorecard hit rate target: ≥60% of days hit Daily Target Value

---

*If you read nothing else this quarter, read this sheet.*
```

### After saving all three files (Sprint doc + MAPIT sheet + Scorecard config)

Tell the operator the three paths. Then say:

"Three artifacts saved: the full Sprint document, the MAPIT action sheet, and the Scorecard config. The MAPIT sheet is the daily operating one-pager. The Scorecard config is what daily-checkout reads every evening. The Pillars baseline lives in the Sprint doc; the 75-day-retro will re-score against it at Day 75."

---

## Rules

1. **Never re-do Steps 1–9 if a 75-day-retro draft exists.** The retro IS the planning-through; the sprint kickoff confirms + completes Step 10 (first 2-Week Sprint definition). Re-doing the retro's work breaks the planning-through mechanism that makes Day 91 not a cold start.
2. Never ask questions already answered in loaded sprint files unless the operator flags them as outdated.
3. Always create a new dated file — never overwrite a previous sprint.
4. **Always produce all three artifacts: Sprint doc + MAPIT sheet + Scorecard config.** The MAPIT sheet is the operating artifact; the Sprint doc is the source of truth; the Scorecard config is daily-checkout's read path.
5. **OPP "so that" framing is mandatory for every Rock.** Without it, the operator has a Project pretending to be a Rock. Push back until the "so that" exists.
6. **Good/Better/Best replaces single-target Committed/Stretch.** Plan toward Good; surface what would shift to Better; let Best fuel possibility.
7. **Effort×Impact is the kill filter.** Low Impact + High Effort = Hard Slog = no negotiation, drop it.
8. **Pillars baseline is required, not optional.** Without it, the 75-day-retro and sprint-close cannot measure delta. Score all 5 + Foundation. Per-venture where relevant.
9. **Scorecard config is per-venture, not global.** Daniel runs CCC, LONNEL, EI, and potentially Venture A — each has its own revenue economics. One global Daily Target Value collapses signal.
10. **Theme governs Rocks (80/20 rule).** 80% of Rocks support the Theme; 20% can be off-theme maintenance. If a candidate Rock can't articulate Theme-alignment, demote it.
11. Keep all output in English.
12. No motivational filler. No spiritual frameworks. Operator language only.
13. If the operator gives short answers, accept them — but only for fields where vagueness is cheap. OPP "so that" clauses and Effort×Impact scores cannot be vague.
14. Maximum session: ~75 minutes. If the Pillars + OPP + GBB work is dragging, table the deeper retroactive scoring to a separate session — better to ship the Sprint doc with placeholders than to abort.

---

## Self-Improvement

After every sprint planning session, check:
- Did the 75-day-retro draft promotion path work cleanly, or did the operator re-do Steps 1–9?
- Did the OPP "so that" framing p