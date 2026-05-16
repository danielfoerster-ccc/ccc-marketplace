---
name: 75-day-retro
description: |
  Runs the 75-Day Retro — Todd Herman's load-bearing planning-through
  mechanism. Drafts the NEXT 90-day Roadmap through Step 9 (stopping before
  the first 2-Week Sprint definition) while still inside the current cycle.
  Triggers on Day 75 ± 5 of an active sprint. Eliminates end-of-cycle drift in
  days 76–90 — Day 91 becomes a slide, not a cold start. Reads the active
  sprint doc, 2-week-sprint-reviews, daily-checkout Scorecard data, and
  pillars-trend. Runs Herman's retro questions, re-scores the 5 Pillars vs.
  cycle baseline, builds a carry/retire/emerge Rock decision table, applies
  OPP + Good/Better/Best + Effort×Impact to next-sprint Rocks, proposes a
  next-cycle Theme (not locked), and harvests cycle-level rules to Decisions &
  Rules. THE MOST INVIOLABLE RITUAL — skip it and Day 91 cold-starts. USE on
  "75 day retro", "draft next sprint", "day 75 review", "plan-through retro",
  "next cycle draft", or when the active sprint is at Day 70-80.
allowed-tools: "Read, Write, Glob, Edit, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-05-16
  updated: 2026-05-16
  language: English
  framework: Todd Herman (90 Day Year) — Module 7 75-Day Retro
  sop: "02 - MISSION CONTROL/SOPs & Playbooks/SOP — Running the 90 Day Year.md (Phase 3)"
  distribution: marketplace-ready
---

# 75-Day Retro Skill

**Workflow: Day-Check → Context Load → Herman Retro Questions → 5 Pillars Re-Score → Cycle Aggregation → Next-Sprint Rock Draft (carry/retire/emerge) → Apply Herman Filters → Theme Candidate → Decision Harvest → Output**

This is the single most-skipped, highest-leverage ritual in the planning system.

**Time budget:** Half-day block (~4–5 hours). Schedule it. Treat as non-negotiable. Stop at Step 9 of the Roadmap — do not define the next first 2-Week Sprint. That definition happens at next-cycle kickoff via [[90-day-sprint]] v2.

---

## The Load-Bearing Rule (read this first, every time)

> **Run this retro at Day 75 ± 5. Draft the next 90-Day Roadmap through Step 9 (stopping before the first 2-Week Sprint definition). Treat this retro as more inviolable than any client meeting.**
> *— SOP — Running the 90 Day Year, Appendix C*

If the operator skips one instruction in the entire planning system, the cycle fails. That instruction is *this retro*. Everything else can be partially run and the cycle still produces value. Skip this retro and:

- Day 91 is a cold start.
- The cycle's compounding effect dies.
- After two cycles of cold starts, the operator concludes "the system doesn't work" — when in fact a single missed half-day caused the collapse.

If the operator tries to defer this retro to Day 85, Day 88, or Day 90: **push back hard.** The Day-75 timing is not arbitrary. It's the mechanism that prevents days 76–90 from drifting into resistance-and-procrastination territory. By drafting the next cycle *while still inside the current one*, Day 91 slides into Day 1 with momentum.

This rule overrides the operator's calendar.

---

## Phase 0 — Day-of-Cycle Check (~2 min)

Before anything else:

1. Glob `00 - COMMAND CENTER/Daily Notes/` for the most recent `*90 Day Strategic Goal Attainment Sprint*` file. Read its `period:` field.
2. Compute: `day_of_cycle = today − sprint_start_date`
3. **If `day_of_cycle < 70`:** Warn the operator. *"You're on Day [N] of 90 — earlier than the Day 75 ± 5 window. The retro is most effective when there's enough cycle data to learn from but enough cycle remaining (10-15 days) to slide into the next one. Run now anyway, or wait until Day 70+?"* Accept either answer; if running early, note it in the output file.
4. **If `day_of_cycle > 85`:** Warn the operator. *"You're on Day [N] of 90 — past the Day 75 ± 5 window. The retro's planning-through mechanism needs ≥10 days of remaining cycle to absorb the drafting work. Run now (compressed) or accept that Day 91 will be partly a cold start?"* Accept either answer; if running late, compress Phase 7 (next-sprint draft) and flag the cold-start risk in the output.
5. **If `day_of_cycle` ∈ [70, 80]:** Confirm and proceed. *"You're on Day [N] of 90 — in the Herman-canonical Day 75 ± 5 window. Let's run the retro."*

If no active sprint file exists, exit gracefully: *"No active 90-day sprint found. The 75-day-retro is a mid-cycle ritual — it needs an active sprint to retro on. Did you mean to run `90-day-sprint` to kick off a new cycle?"*

---

## Phase 1 — Context Load (automatic, no questions, ~10 min)

Read the vault in this order:

1. **Active sprint file** — full read. Extract: Theme, Rocks (with Good/Better/Best targets + OPP "so that" clauses + Effort×Impact scores), Boulders, 5 Pillars baseline (Cycle N), Scorecard config link, MAPIT sheet link.
2. **All `*2-Week Sprint Review*` files** in the current quarter folder — extract Start / Stop / Continue / More / Less answers from each (typically 4–5 by Day 75).
3. **All `*daily-checkout*` files** in current quarter — aggregate Scorecard tally data + Pillars ratings + Pile-Up Zone captures. Compute: average Daily Target Value hit rate, Pillars trend per Pillar, top recurring Pile-Up items (appearing in 2+ sprint reviews without action).
4. **The transition sprint file (if any)** — extract deliverable statuses.
5. **`pillars-trend` data** (if pillars-trend skill is available, invoke it; otherwise read raw Pillars data from checkouts). Surface 7/14/30/75-day Pillars trends.
6. **Decisions & Rules.md** — extract rules added during this cycle (tagged `cycle-[N]` if convention followed; otherwise scan timestamps within the cycle's date range).
7. **Charter / strategic layer alignment** — read `00 - COMMAND CENTER/Foundational Docs/Third Brain Charter.md` and any active strategic context. Check whether the current Theme still aligns with the strategic frame.

Surface this compact block:

```
Active sprint: [Name] · [Period] · Day [N] of 90
Theme: [Theme]
Rocks: [Rock 1 — Good/Better/Best targets + tier-status estimate]
        [Rock 2 — ...]
        [Rock 3 — ...]

Cycle data so far:
  · 2-Week Sprint Reviews completed: [N] of 5 expected by Day 75
  · Daily-checkout completion rate: [N]%
  · Scorecard hit rate (days hit Daily Target Value): [N]%
  · Pillars trend (cycle baseline → today):
      MSP: [N] → [N] ([±N])
      Ops/Tech: [N] → [N] ([±N])
      Distribution: [N] → [N] ([±N])
      People: [N] → [N] ([±N])
      Financial: [N] → [N] ([±N])
      Foundation: [N] → [N] ([±N])
  · Decision Harvest rules added this cycle: [N]
  · Pile-Up Zone — items aged 2+ sprint reviews without action: [list]

Strategic alignment: [Theme still aligned with Charter? Y/N — flag if N]
```

---

## Phase 2 — Herman Retro Questions (~45 min, long-form)

Ask the operator to answer five long-form questions. These are the Herman canonical 75-day retro worksheet. Each answer should be *evidence-backed* by the cycle data Phase 1 surfaced, not vibes.

Ask one at a time. Wait for each answer. The depth is what makes this ritual load-bearing — do not let the operator one-line through them.

**Q1 — What worked over the last 75 days that I want to keep?**
*Push: name the mechanism, not just the outcome. "Block & Tackle 3 slots in the morning held attention" is useful; "I had good days" is not.*

**Q2 — What didn't work that I need to stop?**
*Push: pattern, not excuse. "I deferred the evening checkout when tired, so mornings cold-started" is the pattern; "I was tired" is the excuse.*

**Q3 — What is starting to work that I want to continue to develop?**
*Push: the early-signal work. What's working at 30%-confidence that, given another cycle, could become a strength?*

**Q4 — What threats are emerging on my radar?**
*Industry shifts, AI capabilities, regulatory, personal life, venture-specific risks. Each threat should have a one-sentence "how would I know early" attached.*

**Q5 — What opportunities are emerging that I want to be ready for?**
*Same shape — opportunities + an early-signal trigger.*

**Optional Q6 (only if a major Rock missed):** "What did you need to believe about yourself that you didn't?" (Herman's identity-layer probe.) Skip if all Rocks at-or-above Good.

---

## Phase 3 — 5 Pillars Re-Score vs. Cycle Baseline (~15 min)

Re-score the **5 Business Pillars** 1–10 each — same scoring exercise as the sprint kickoff baseline.

Then compute deltas vs. the baseline captured in the sprint kickoff:

| Pillar | Baseline (Cycle [N] start) | Day 75 score | Delta | Read as |
|---|---|---|---|---|
| Marketing, Sales & Product | [N] | [N] | [±N] | [Strength / Leak / Stable] |
| Operations & Technology | [N] | [N] | [±N] | [Strength / Leak / Stable] |
| Distribution Channels | [N] | [N] | [±N] | [Strength / Leak / Stable] |
| People & Leadership | [N] | [N] | [±N] | [Strength / Leak / Stable] |
| Financial | [N] | [N] | [±N] | [Strength / Leak / Stable] |
| Foundation (execution system) | [N] | [N] | [±N] | [Strength / Leak / Stable] |

Read as:
- **Delta ≥ +2:** Strength. Source of *offensive* Rocks for next cycle (compound what works).
- **Delta ≤ -1:** Leak. Source of *defensive* Rocks for next cycle (fix what's broken).
- **|Delta| ≤ 1:** Stable. Maintain.

**Multi-venture handling:** If baselines were scored per-venture, re-score per-venture. Surface deltas at venture granularity.

---

## Phase 4 — Cycle Aggregation Synthesis (~30 min)

Combine the Phase 1 evidence with the Phase 2 retro answers + Phase 3 Pillar deltas. Produce three synthesis blocks the operator confirms:

### 4a — Recurring patterns

What appeared across multiple 2-Week Sprint Reviews? What recurring issues appeared 3+ times in daily logs? Each pattern gets one sentence.

### 4b — Strategic threats + opportunities (synthesized from Q4/Q5 with cycle data)

Each item ranked High / Medium / Low priority based on combined likelihood × impact.

### 4c — Cycle health verdict (1 paragraph)

A 3-5 sentence honest summary: did the cycle work? Where did it leak? What's the most important thing the next cycle should do differently?

---

## Phase 5 — Next-Sprint Rock Drafting (carry / retire / emerge) (~30 min)

For the next 90 days, build a decision table of Rock candidates. Three sources:

**Source 1: Carry-forward Rocks** — Rocks from the current cycle that didn't hit Good but should continue. Ask: "What's missing — more time, different approach, different resource? Does the Rock survive into next cycle as-is, or restructured?"

**Source 2: Retire Rocks** — Rocks that hit Good (or are clearly going to) and don't need more cycle time. Ask: "Done — what gets retired into Operations / archive?"

**Source 3: Emerging Rocks** — new candidates from Pillar leaks, opportunities surfaced in Q5, Pile-Up Zone items that earned promotion, strategic-layer shifts.

Build this table:

| Candidate Rock | Source (carry / retire / emerge) | Pillar it addresses | Rationale |
|---|---|---|---|
| [Rock] | Carry-forward | [Pillar] | [Why it didn't close, why it survives] |
| [Rock] | Retire | [Pillar] | [Done — no next-cycle work needed] |
| [Rock] | Emerge | [Pillar] | [Why it's emerging now] |

---

## Phase 6 — Apply Herman Filters to Next-Sprint Rocks (~30 min)

For each *survivor* candidate (carry-forward + emerge), apply the same three filters the 90-day-sprint v2 uses. These produce the draft-quality Rock entries for the next sprint kickoff to confirm.

### Filter 1: OPP "so that" framing
Restate each candidate as **"[outcome] so that [downstream effect]"**. If the "so that" can't be articulated, demote to Pebble or kill.

### Filter 2: Good/Better/Best targets
For each surviving candidate, draft Good (~80% confident), Better (~50%), Best (~15%) targets. Mark as DRAFT — the operator will lock at sprint kickoff.

### Filter 3: Effort × Impact (Project Impact Matrix)
Score each surviving candidate 1–10 on Effort, 1–10 on Impact. Categorize as Quick Win / Major Project / Fill-In / Hard Slog. **Kill Hard Slogs in draft phase.**

Final Goal Decision Matrix check (Step 9 of the Roadmap): list all surviving candidates. Most should end NO. Target: 1–3 Rocks per column (Revenue / Thought Leadership / Operations) = max 5 Rocks total.

---

## Phase 7 — Theme Candidate (NOT LOCKED) (~10 min)

Propose 1–3 candidate Themes for the next cycle. Each candidate must:

- Be statable in 1–3 words
- Visibly govern the Rocks drafted in Phase 6 (80/20 alignment)
- Connect to the strategic layer (Charter, active substrate-floor pilot, ventures' stage)

**Important:** The Theme is NOT locked at the retro. It's a candidate. Locking happens at the next sprint kickoff via [[90-day-sprint]] v2 Phase 4. This is intentional — between Day 75 and Day 91, the operator has 15 days for the Theme to incubate. If the candidate still resonates at kickoff, lock it; if a better one emerged, lock that.

Persist the candidate(s) with reasoning per candidate.

---

## Phase 8 — Decision Harvest (~10 min)

Any rule that emerged across the *full cycle* (not just one sprint) goes to `Decisions & Rules.md`. Cycle-level rules are different from sprint-level rules — they survived multiple sprint-review evaluations and are now codified pre-decisions.

For each rule candidate:
1. Format: `**[Rule statement]** — [brief reasoning, evidence from cycle] *(75-Day Retro Cycle [N], [date])*`
2. Tag with `cycle-[N]` for traceability
3. Append to the most appropriate section of `Decisions & Rules.md`
4. Confirm: "Appended [N] cycle-level rule(s) to Decisions & Rules under [section]."

---

## Phase 9 — Output

### Deliverable: 75-Day Retro & Next Sprint Draft

Create one file at:
`00 - COMMAND CENTER/Daily Notes/[YEAR]/[QUARTER]/[YYYY-MM-DD] — 75 Day Retro & Next Sprint Draft — Cycle [N].md`

(Save into the *current* quarter folder if the next cycle hasn't started yet; the file's wikilinks will tie it to the next-cycle sprint document at kickoff.)

```markdown
---
type: 75-day-retro
cycle_closing: [N]
cycle_drafting: [N+1]
active_sprint: "[[Current Sprint File]]"
retro_date: [today]
day_of_cycle: [N]
status: draft-through-step-9
theme_candidates: ["[Candidate 1]", "[Candidate 2]"]
sources:
  - "[[Todd Herman]]"
  - "[[SOP — Running the 90 Day Year]]"
  - "[[Decisions & Rules]]"
---

# 75-Day Retro — Cycle [N] Closing · Cycle [N+1] Drafting

**Day [N] of 90 of active sprint.** Drafted: [date]. Locked at next cycle kickoff: [target date around Day 91].

> **The next cycle's first 2-Week Sprint is intentionally NOT defined here. That happens at Day 91 via [[90-day-sprint]] v2 Phase 7. Stopping at Step 9 is what makes Day 91 a slide, not a cold start.**

---

## Phase 2 — Retro Worksheet (Herman canonical)

### Q1 — What worked that I want to keep
[Operator's answer, evidence-backed]

### Q2 — What didn't work that I need to stop
[Operator's answer]

### Q3 — What's starting to work that I want to develop further
[Operator's answer]

### Q4 — Emerging threats
[Operator's answer + early-signal triggers]

### Q5 — Emerging opportunities
[Operator's answer + early-signal triggers]

### Q6 — Identity-layer probe (if answered)
*"What did I need to believe about myself that I didn't?"*
[Answer / Skipped]

---

## Phase 3 — 5 Pillars Re-Score vs. Cycle Baseline

| Pillar | Baseline (Cycle [N] kickoff) | Day 75 score | Delta | Read as |
|---|---|---|---|---|
| Marketing, Sales & Product | [N] | [N] | [±N] | [Strength/Leak/Stable] |
| Operations & Technology | [N] | [N] | [±N] | [...] |
| Distribution Channels | [N] | [N] | [±N] | [...] |
| People & Leadership | [N] | [N] | [±N] | [...] |
| Financial | [N] | [N] | [±N] | [...] |
| Foundation (execution system) | [N] | [N] | [±N] | [...] |

**Strengths to compound:** [Pillars with delta ≥ +2]
**Leaks to fix:** [Pillars with delta ≤ -1]

---

## Phase 4 — Cycle Synthesis

### Recurring patterns
- [Pattern 1]
- [Pattern 2]

### Strategic threats + opportunities
| Item | Threat/Opp | Priority | Early signal |
|---|---|---|---|
| [Item] | T/O | H/M/L | [Trigger] |

### Cycle health verdict
[3–5 sentence honest summary]

---

## Phase 5 — Carry / Retire / Emerge Decision Table

| Candidate Rock | Source | Pillar it addresses | Rationale |
|---|---|---|---|
| [Rock] | Carry-forward | [Pillar] | [Why survives] |
| [Rock] | Retire | [Pillar] | [Done] |
| [Rock] | Emerge | [Pillar] | [Why now] |

---

## Phase 6 — Next-Sprint Rock Draft (Herman filters applied)

### Draft Rock 1 (Revenue / Thought Leadership / Operations): [Outcome] so that [downstream effect]
| Tier | Target (DRAFT) | Probability |
|---|---|---|
| Good | [Target] | ~80% |
| Better | [Target] | ~50% |
| Best | [Target] | ~15% |
- **Effort×Impact:** E[N]/10 · I[N]/10 — [Quick Win / Major Project / Fill-In / Hard Slog]
- **Source:** [Carry / Emerge]

*(Repeat per surviving Rock — typically 3–5 total)*

**Killed Hard Slogs (for the record):** [List of candidates dropped at the Effort×Impact filter]

---

## Phase 7 — Theme Candidates (NOT LOCKED)

| Candidate | Reasoning | Strategic alignment |
|---|---|---|
| [Theme] | [Why this Theme fits the Rocks] | [Charter / pilot / venture] |
| [Theme] | [...] | [...] |

*Locked at next-sprint kickoff via [[90-day-sprint]] v2 Phase 4 around Day 91.*

---

## Phase 8 — Decision Harvest (cycle-level rules)

[List of rule candidates — same text as appended to Decisions & Rules]

---

## Days 80–90 Execution Plan (current cycle finishes)

The remaining 10–15 days of the current cycle are *pure execution* of what's already planned. No new Rocks. No new Projects. The next cycle is drafted; today's cycle is finishing.

- Remaining Activities: [list]
- Pillars to maintain at floor: [list]
- Pile-Up Zone evaluation rule: any new capture is evaluated against the *next* cycle's drafted Theme (visible above), not the current cycle's.

---

*Cycle [N] closes at Day 90. Cycle [N+1] kickoff target: Day 91 via [[90-day-sprint]] v2.*
*This file is the primary input to the next sprint kickoff — the v2 skill reads from here to skip redundant questions.*
```

### After saving

Tell the operator:

"75-day-retro saved at [path]. Day 91 kickoff is staged — when you run [[90-day-sprint]] v2 in [N] days, Phase 0 will pick up this draft and skip Steps 1–9. Your job in the next 10–15 days: finish the current sprint's remaining Activities, maintain Pillars at floor, and let the candidate Theme incubate. Lock or replace at Day 91."

---

## Rules

1. **The Day 75 ± 5 timing is non-negotiable.** If the operator wants to defer past Day 80, push back. Past Day 85, accept reluctantly and flag the cold-start risk in the output. This is the load-bearing instruction of the entire planning system (per SOP Appendix C).
2. **STOP at Step 9 of the Roadmap.** Never define the next first 2-Week Sprint inside this retro. That definition is what happens at Day 91 via [[90-day-sprint]] v2. The 15-day gap between the retro draft and kickoff is the "greased slide" mechanism.
3. **Re-scoring the 5 Pillars vs. baseline is mandatory.** Without it, the substrate-floor data captured at kickoff has no surfacing event. Force the re-score even if the operator wants to skip.
4. **Herman's retro questions must be answered long-form, evidence-backed.** Push back on one-line answers. The depth is what makes this ritual load-bearing — a 30-minute retro produces a cold-start; a 4-hour retro produces a slide.
5. **Carry / Retire / Emerge is the right granularity for next-cycle Rocks.** Don't ask "what are next cycle's Rocks?" cold — that's the kickoff's job. Ask "of the current cycle's Rocks, which carry / retire / emerge?"
6. **Apply OPP + Good/Better/Best + Effort×Impact to draft Rocks.** Same filters as the 90-day-sprint kickoff. This is what makes the retro draft promotable — the kickoff confirms and completes, doesn't redo.
7. **Theme is a candidate, not a lock.** Surface 1–3 candidates with reasoning. Locking happens at kickoff.
8. **Decision Harvest at cycle level is different from sprint-review level.** Cycle-level rules survived multiple sprint reviews. Tag with `cycle-[N]`.
9. **The output file goes to the current quarter folder.** If the next cycle starts in a new quarter (e.g., Q2 → Q3), the file still saves to *this* cycle's quarter — the next-quarter sprint document will wikilink back.
10. Multi-venture handling: re-score Pillars per-venture if baselines were per-venture. Don't collapse for convenience.
11. Keep all output in English.
12. **If the operator tries to bundle the 75-day-retro with the 90-day-sprint-review, refuse.** They are different rituals with different outputs. The sprint-review's Phase 0 guard suggests running this retro *first* — these two run sequentially, not as one.

---

## Self-Improvement

After every 75-day-retro session, check:
- Did the timing fall in the Day 75 ± 5 window? If not, what dragged it earlier or later?
- Did the retro questions produce evidence-backed answers, or did the operator one-line through them?
- Did the carry/retire/emerge table produce a clean next-cycle Rock draft, or did the operator try to re-do the kickoff inside the retro?
- Did the candidate Theme survive to kickoff, or did a better one emerge during the 15-day incubation?
- Did Day 91 cold-start anyway? If yes, what part of this retro failed — and the answer is the highest-leverage fix.

Add findings to the Rules section. This skill gets better by accumulating real cycle patterns.

---

## Why This Skill Exists (the philosophical case)

Herman's central insight (paraphrased): *"Goal-setting **through** the next 90 days, not goal-setting **to** Day 90."*

If you wait until Day 90 to plan Day 91, you create a natural stopping point. Resistance, procrastination, and avoidance creep into Days 76–90 because there's no forward pull. By doing the retro at Day 75 and drafting the next cycle (stopping at Step 9), you've already created the forward pull. Days 76–90 become the runway, not the finish line.

This is the mechanism. Everything else in this skill is scaffolding around it.
