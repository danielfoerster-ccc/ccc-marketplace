---
name: daily-checkout
description: |
  Runs the End-of-Day Optimizer — a 5-10 min evening ritual that closes today
  AND stages tomorrow. Evening half of the 90 Day Year daily loop (morning half
  is `daily-checkin`). Reads today's daily work notes, then guides 7 steps:
  (1) Wins capture, (2) Entrepreneur Scorecard tally per venture vs. Daily
  Target Value, (3) 5 Pillars rating (Body/Being/Balance/Business/Belonging,
  1-10 each), (4) Pile-Up Zone disposition, (5) Tomorrow's TOP 3, (6) Tomorrow's
  3 Block & Tackle slots with durations + Eisenhower order, (7) 3-part
  reflection (went well / needs work / never again — non-negotiable closing).
  Updates today's file, stages tomorrow for morning check-in, harvests rules
  into `Decisions & Rules`. Run 17:30–18:30 CET.
  Trigger on: "checkout", "end of day", "EoD", "End of Day Optimizer", "close
  the day", "daily checkout", "shutdown", "wrap up today", "done for the day",
  "score the day", "rate my pillars", "stage tomorrow", "plan tomorrow",
  "evening planning", "scorecard tally".
allowed-tools: "Read, Write, Glob, Edit"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 2.0.1
  created: 2026-03-06
  updated: 2026-05-16
  language: English
  framework: CCC Planning System + Todd Herman 90 Day Year (End-of-Day Optimizer)
  distribution: marketplace-ready
---

# Daily Checkout Skill — End-of-Day Optimizer

**Workflow: Load Today → 7-Step Optimizer → Update Today's File → Stage Tomorrow → Decision Harvest**

5-10 minute evening ritual. Closes today, stages tomorrow, surfaces calibration data. The 3-part reflection (what went well / what needs work / never again) is the **closing act** — Herman's End-of-Day Optimizer wraps around it, never replaces it.

**Why evening, not morning:** The voice in your head that resists doesn't fire on planning-tomorrow tasks, because to it "you're already procrastinating." It fires on do-it-now demands. Plan in the morning and you'll resist. Plan at night and you slide right into execution. This is the load-bearing timing in the 90 Day Year daily loop.

## Elicitation Widget

Collect all phase inputs in **one widget** — not question by question. The widget is denser than the previous checkout (more fields, more compact). Operator fills as they read down the page.

**Steps (every checkout):**
1. Complete Phase 0 (context load) first
2. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` (silent — no output)
3. Build and call `mcp__visualize__show_widget` with a form that has:
   - A read-only context card inside `.elicit-body` showing: today's TOP 3 with current status, Block & Tackle estimated-vs-actual rows, Drumbeat done/carry/to-do count, Revenue First status, today's date + Daily Target Value (€[N]/day)
   - **Step 1 — Wins:** textarea (1-3 wins, bullets)
   - **Step 2 — Scorecard:** per-venture activity rows (CCC / LONNEL / Venture A / etc. — populated from sprint Phase 2.5b config). Each row: hours worked × $-column → daily total + venture-total. Auto-sum vs. Daily Target Value with delta (+/− €[N]).
   - **Step 3 — 5 Pillars:** five 1-10 sliders or pill groups: Body, Being, Balance, Business, Belonging — label the scale: "How much did I show up for this today? 1 = 0-10% (didn't show up), 5 ≈ 50%, 10 = 100% (fully showed up)"
   - **Step 4 — Pile-Up Zone:** textarea, prepopulated with today's logged Pile-Up items, with per-item disposition pills: `Park` / `Promote next sprint` / `Delegate` / `Delete`
   - **Step 5 — Tomorrow's TOP 3:** textarea (3 items)
   - **Step 6 — Tomorrow's Block & Tackle:** 3 rows, each with task + estimated minutes + Eisenhower pill (Q1/Q2). Default order: Q1 morning, Q2 mid-morning (Revenue First), Q2 afternoon.
   - **Step 7 — Reflection (the closing):** three textareas in fixed order
       - Q7a went-well — *label as personal journal; preserve exact operator language*
       - Q7b needs-work
       - Q7c never-again (optional — operator may skip)
4. Submit button label: **"Close the day and stage tomorrow"**
5. Wait for the single-line submission, parse answers, then update today's file and stage tomorrow's plan

---

## Phase 0 — Context Load (automatic)

1. Find today's daily work notes file: `00 - COMMAND CENTER/Daily Notes/[year]/[quarter]/[week]/YY-MM-DD - Daily Work Notes.md`
2. Read the file — surface this compact block:

```
Today is [Day], [Date]. Sprint Week [N] · Theme: [Theme]
Daily Target Value: €[N]/day  ·  [per-venture breakdown if applicable]

Today's TOP 3:
  1. [Task] — [Done ✅ / Partial ⏳ / Not done ❌]
  2. [Task] — [status]
  3. [Task] — [status]

Block & Tackle:
  Block 1 ([Eisenhower]): [Task] · estimated [N] min · actual [_] min
  Block 2 ([Eisenhower]): [Task] · estimated [N] min · actual [_] min
  Block 3 ([Eisenhower]): [Task] · estimated [N] min · actual [_] min

Drumbeat: [X] Done · [Y] In progress · [Z] To Do
Revenue First: [Done / Not done]
Pile-Up Zone logged today: [N] items
```

3. **Load Scorecard config** — read the active sprint file's `## Entrepreneur Scorecard Setup` block (configured in `90-day-sprint` Phase 2.5b). Extract: list of ventures being tracked separately (e.g., CCC / LONNEL / Venture A), and the $-column matrix for each venture's current stage (Start-Up / Ramp-Up / Build-Up / Scale-Up / Leader-Up). The Scorecard math is **per-venture** when multiple revenue Rocks active.
4. **Load Pillars baseline** — pull last 3-5 days' Pillars ratings to give the operator immediate trend context as they rate today.
5. If no daily work notes file exists for today: "No work notes found for today — let's run a quick close-out from scratch." Note the gap and proceed.

---

## The End-of-Day Optimizer (7 steps in fixed order)

This is the 7-step sequence. **Order matters** — Herman's design moves from concrete (what happened) to evaluative (what was the value) to substrate (how is the operator doing) to forward (what's next), with reflection as the final closing act.

### Step 1 — Wins Capture (~1 min)

**Q1** — "What were today's wins? 1-3 of them, named explicitly."

Bullets, not paragraphs. A win is something *named* — "got the proposal out," "Heiko approved scope," "ran my 5k," not "good day." If today was rough, "showed up" is a valid win — but make it specific. Wins are fuel; they feed both motivation and the 2-Week Sprint Review's "wins + progress" capture.

### Step 2 — Entrepreneur Scorecard Tally (~3 min)

**Q2** — For each venture being tracked separately, log activity hours into the 4 $-columns. Use the per-venture column matrix loaded in Phase 0.

| Stage | Col 1 (admin) | Col 2 | Col 3 | Col 4 (strategic) |
|---|---|---|---|---|
| Start-Up | €10 | €50 | €250 | €1,000+ |
| Ramp-Up | €10 | €100 | €500 | €5,000+ |
| Build-Up / Scale-Up / Leader-Up | €10 | €100 | €1,000 | €10,000+ |

- **Col 4 (strategic):** sales calls with qualified prospects, building partnerships, creating offers, key marketing campaigns, hiring decisions, strategy work tied directly to a Rock
- **Col 3 (high-leverage):** content creation, client delivery on flagship work, key meetings
- **Col 2 (mid):** routine client work, standard meetings, most email
- **Col 1 (admin):** scheduling, data entry, bank, social media browsing, most cold outreach

For each venture: sum (hours × column) → venture total. Sum venture totals → day total. Compare vs. Daily Target Value.

**Delta interpretation rules:**
- Day total ≥ Daily Target Value → on-track. No action.
- Day total < Daily Target Value → note without judgment. Pattern over time is what matters, not single days.
- Day total < 50% of target for 3+ days in a row → the work is mostly Col 1/2 ("minimum-wage activities," per Jim Rohn). Surface at next 2-Week Sprint Review as a Prada Protocol candidate (ASSD: Automate / Systematize / Simplify / Delegate the low-$ work).

Persist the Scorecard tally in today's file so 2-week and 75-day reviews have the data.

### Step 3 — 5 Pillars Rating (~30 sec)

**Q3** — Rate each pillar 1-10.

> *"1-10 is easier to quantify mentally — 1 = 0-10% (didn't show up), 5 = approximately 50%, 10 = 100% (fully showed up). The Pillar rating answers: 'how much did I show up for this today?' as a percentage on a 1-10 scale."*

This is the canonical rating instruction site. All other skills that mention the rating defer back to this one.

| Pillar | What it measures |
|---|---|
| **Body** | Sleep · movement · nutrition · energy |
| **Being** | Mental focus · emotional regulation · presence |
| **Balance** | Personal life axis · relationships · recovery time |
| **Business** | Execution quality · clarity on direction · momentum |
| **Belonging** | Tribe · community · connection · social fuel |

**Why these 5 (and not the 6-layer substrate floor):** Phase E of the 90 Day Year integration kept Herman's 5 here for the daily Scorecard rating because they're operationally compact (30-second tap-out). The candidate 6-layer Substrate Floor (Body / Mindset / Routine / Relationship / Material / Spirit-Purpose) lives in a separate substrate-floor pilot tracker, not in the daily ritual. The reconciliation is documented in the Planning System Upgrade Plan; do not duplicate the systems here.

Today's ratings feed [[pillars-trend]] — the read-skill that surfaces 7/14/30/90-day Pillars windows and flags drift. Tomorrow's [[daily-checkin]] reads today's rating into its context card.

Do not analyze or interpret in this step — just rate. Pattern detection happens at the 2-Week Sprint Review.

### Step 4 — Pile-Up Zone Surfacing (~1 min)

**Q4** — Today's Pile-Up Zone catches surface here for explicit decision. Each item gets one of four dispositions:

- **Park** — keep on pile, review at next 2-Week Sprint Review
- **Promote** — moves to next sprint's planning as a candidate (it's earned a seat)
- **Delegate** — route to [[handoff-prep]] or a specific person
- **Delete** — kill it; not aligned

This is the explicit-disposition rule. The whole 90 Day Year cycle depends on the Pile-Up Zone **not silently rolling forward as ambient pressure.** Forced decision-at-EoD prevents that.

If no items piled up today: skip the step. Note the empty Pile-Up as a positive signal — focus was protected.

### Step 5 — Tomorrow's TOP 3 (~1-2 min)

**Q5** — "What are tomorrow's 3 things that, if done, make tomorrow a success?"

Pull candidates from:
- Today's carry-forward (TOP 3 items that didn't complete)
- Drumbeat items due tomorrow per the Weekly Plan
- Promoted Pile-Up items from Step 4
- Tomorrow's day-shape (Outreach / Delivery / Infrastructure / Transition)

**This is the timing shift's load-bearing move.** Tomorrow's TOP 3 is generated **at tonight's checkout**, not at tomorrow's morning check-in. Morning becomes confirmation, not generation.

Revenue First is always one of the 3. If tomorrow's day-shape is "truly off," Revenue First is replaced by the day-shape's anchor (recovery, family, etc.) — the Personal Life Axis is a Charter peer.

### Step 6 — Tomorrow's 3 Block & Tackle Slots (~2 min)

**Q6** — For each of the 3 TOP 3 items (or directly tied to them), define a Block & Tackle slot.

Each block:
- **One task only.** Context-switching costs 20-75% of effective time. The block's whole point is single-focus.
- **Estimated duration in 15-min increments.** Estimate is the planning data; actual is the calibration data; the delta is the feedback.
- **Eisenhower-tagged.** Q1 (Important + Not Urgent) or Q2 (Important + Urgent). Q3/Q4 don't make Block & Tackle.

**Order (per Daniel's synthesis):**
- **Block 1 — Q1 morning protected slot** (typical 07:30-09:30). Strategic, infrastructure, relationship, deep work, exercise — the compounding work that becomes Q2 fires if neglected.
- **Block 2 — Revenue First (Q2 mid-morning).** The day's anchor revenue-producing activity.
- **Block 3 — Q2 afternoon block.** Delivery, sales, anything Important + Urgent that isn't Revenue First.

**Hard cap: 3 blocks (4 max).** The reason 4+ blocks fail isn't workload — it's that the "blocks remaining" gravity overwhelms attention on the block in front of you. Herman's "playground paradox" — kids only explore the whole playground when there's a fence. Constraints unlock flow.

If a Block & Tackle slot has no clear Q1 candidate tomorrow, leave Block 1 explicitly named ("strategic block — TBD at morning check-in") rather than padding it with Q2 work. Compounding work must be protected by name, not by hope.

### Step 7 — The 3-Part Reflection (the closing — non-negotiable)

These three questions, in this exact order, never substituted, never collapsed into one. **This is the existing skill's load-bearing rule and it survives the upgrade unchanged.**

**Q7a — What went well today?**

Capture the answer in the operator's own words — preserve exact language, emphasis, phrasing. Don't clean it up, summarize, or reformat. This is a personal journal entry. It should sound exactly like Daniel because effectively it *is* Daniel. Voice is the discipline; this is where Daniel-the-operator becomes Daniel-the-data.

**Q7b — What needs work?**

**Q7c — What should never happen again?**

Keep each answer brief. This is calibration, not retrospective. The three-part format is fixed — do not substitute a single "what would have made today better?" or any other variant. The three parts pull in three different cognitive directions: appreciation (what worked, build on it), correction (what to tune, calibrate), elimination (what to never repeat, rule-make).

**Decision Harvest:** If a "never again" answer crystallizes a rule (e.g., "never schedule a deep block right after a call"), append it to `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` with a date stamp. The reflection is where rules originate; the harvest is where they get codified.

---

## Phase 8 — Update Today's File

Update the End-of-Day section of today's daily work notes file:

```markdown
## End-of-Day Optimizer

### TOP 3 outcome
- [✅ / ⏳ / ❌] [Task 1] — [note if partial/not done]
- [✅ / ⏳ / ❌] [Task 2] — [note if partial/not done]
- [✅ / ⏳ / ❌] [Task 3] — [note if partial/not done]
**Revenue First done:** [✅ Yes / ❌ No]

### Block & Tackle — estimated vs. actual
| # | Task | Estimated | Actual | Delta | Eisenhower |
|---|------|-----------|--------|-------|-----------|
| 1 | [Task] | [N] min | [N] min | ±[N] | Q1 |
| 2 | [Task] | [N] min | [N] min | ±[N] | Q2 |
| 3 | [Task] | [N] min | [N] min | ±[N] | Q2 |

### 1 — Wins
- [Win]
- [Win]
- [Win]

### 2 — Entrepreneur Scorecard
| Venture | Stage | Col 1 hrs | Col 2 hrs | Col 3 hrs | Col 4 hrs | Total € |
|---|---|---|---|---|---|---|
| [CCC] | [Stage] | [N] | [N] | [N] | [N] | €[N] |
| [LONNEL] | [Stage] | [N] | [N] | [N] | [N] | €[N] |
| [Venture A] | [Stage] | [N] | [N] | [N] | [N] | €[N] |
| **Day total** | | | | | | **€[N]** |

**Daily Target Value:** €[N]  ·  **Delta:** +/− €[N]  ·  **On-track:** [✅ / ⚠️ / ❌]

### 3 — 5 Pillars
Body [N/10] · Being [N/10] · Balance [N/10] · Business [N/10] · Belonging [N/10]
[Auto-flag any pillar ≤ 3 today (bottom 30%)]

### 4 — Pile-Up Zone dispositions
- [Item] → [Park / Promote / Delegate / Delete]
- [Item] → [...]

### 5 — Carry-forward
**To tomorrow:**
- [Task]
**To next week:**
- [Task]

### 7 — Reflection
**What went well:**
- [point — operator's exact language]

**What needs work:**
- [point]

**What should never happen again:**
- [point]
```

Also update any Drumbeat rows that changed status during the checkout. Save the updated file (overwrite — same path).

---

## Phase 9 — Stage Tomorrow

Append a `## Tomorrow Staged` section to today's file (this is what `daily-checkin` reads first thing tomorrow morning):

```markdown
## Tomorrow Staged ([Tomorrow's Day], [Tomorrow's Date])

### 6 — Tomorrow's TOP 3
1. [Task]
2. [Task]
3. [Task]

### 6 — Tomorrow's Block & Tackle
| # | Task | Estimated | Eisenhower |
|---|------|-----------|-----------|
| 1 | [Q1 morning — strategic / compounding] | [N] min | Q1 |
| 2 | [Revenue First] | [N] min | Q2 |
| 3 | [Afternoon block] | [N] min | Q2 |

### Revenue First (tomorrow)
> [Specific action]

### Pillars carry-in (today's reading for tomorrow's context card)
Body [N] · Being [N] · Balance [N] · Business [N] · Belonging [N]
```

---

## Phase 10 — Decision Harvest (if applicable)

If today's reflection produced a rule-grade insight (especially in "never again"), append it to `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md`:

```markdown
### [YYYY-MM-DD] — [Rule one-liner]
Source: daily-checkout reflection
Context: [one sentence]
Rule: [the rule, phrased as a constraint]
```

Not every reflection yields a rule. Most don't. Only harvest when a *constraint* emerged — something Daniel will now do or not do in the future. Squishy observations stay in the daily file.

---

## Phase 11 — Close Out

After saving, say:

*"Day closed. [1-line summary — e.g. 'Solid revenue-first day, Scorecard €[N] vs. target €[N], all Pillars ≥ 7.'] Tomorrow's first block: [Block 1 task, N min] starting [time]. See you in the morning."*

If a Pillar dropped ≤ 3 or a multi-day drift is now flagged: surface once.
*"Heads-up: [Pillar] at [N] today, [trend description]. If it persists 1-2 more days, fire `roar-routine-design`."*

If a "never again" rule was harvested: confirm it.
*"New rule added to Decisions & Rules: [rule]."*

---

## Rules

1. The 7-step Optimizer runs in fixed order. Wins → Scorecard → Pillars → Pile-Up → Tomorrow's TOP 3 → Tomorrow's Block & Tackle → Reflection. Order is part of the design — concrete to evaluative to substrate to forward to closing.
2. The 3-part reflection (Q7a / Q7b / Q7c) is non-negotiable as the closing act. Never substitute, never collapse, never skip. Even on a "done, checkout" short close — ask all three, even briefly.
3. Tomorrow's TOP 3 + Block & Tackle are **generated tonight** at this checkout. The morning check-in confirms them, doesn't regenerate. The whole timing shift depends on this.
4. Block & Tackle is hard-capped at 3 (4 max). One task per block. Estimated in 15-min increments. Eisenhower-tagged. Q1 morning → Revenue First (Q2) mid-morning → Q2 afternoon.
5. Scorecard is **per-venture** when multiple revenue Rocks active. Use the per-venture column matrix loaded from the active sprint's Phase 2.5b config. If no per-venture config exists yet (Cycle 1), score in aggregate and note the gap.
6. Don't re-ask things already clear from today's daily work notes (TOP 3 status, Block & Tackle actuals, Drumbeat updates). Pre-fill and confirm.
7. Pillars are rated 1-10 (operator-adapted from Herman-canonical). The 1-10 scale anchors mentally as a percentage — 1 = 0-10% showed up, 5 ≈ 50%, 10 = 100% fully showed up. The Pillar rating answers: "how much did I show up for this today?" Pattern detection happens via [[pillars-trend]] over days/weeks, not single-day precision.
8. Pile-Up Zone items each get an explicit disposition (Park / Promote / Delegate / Delete). Silent roll-forward is a failure mode — the whole cycle depends on explicit pile triage.
9. Q7a answers are personal and voice-driven — they read like journal entries, not reports. Preserve exact operator words. Never summarize or paraphrase.
10. Decision Harvest is selective. Only append to `Decisions & Rules.md` when an actual constraint emerged. Most reflections don't yield rules; that's fine.
11. Always update the file — even if answers are minimal. A closed day has a record.
12. If today's daily work notes file is missing (skipped morning), run the Optimizer anyway against memory + Drumbeat reconstruction. Log the gap. A missing morning is signal — the loop is fragile if it skips a day.
13. Total time budget: 5-10 min. If the Optimizer routinely exceeds 12 min, surface at the next 2-Week Sprint Review — either the design needs tightening or the operator is using it as a longer reflection (legitimate, but should be named).
14. Keep all output in English.

---

## Self-Improvement

When an Optimizer step consistently produces shallow or skipped answers:
- **Wins skipped 3+ days running** → either the day-shape is consistently rough (substrate issue, surface to Pillars), or the prompt needs sharpening
- **Scorecard tally feels arbitrary** → the per-venture column matrix may be miscalibrated; revisit at 2-Week Sprint Review
- **Pillars rated identically every day (e.g., all 7s on the 1-10 scale)** → the rating has lost meaning; force-rank or use sub-questions to recover signal
