---
name: prada-audit
description: |
  Runs Todd Herman's Prada Protocol as a quarterly ASSD audit (Automate /
  Systematize / Simplify / Delegate) across the operator's recent activities.
  Reads daily-checkout Scorecard tallies, Drumbeat carry-forwards, and
  weekly-planning Activities from the last 30 days, categorizes each recurring
  activity into one of the four ASSD buckets, ranks candidates by
  time-saved × frequency × leverage, then routes downstream: Automate → propose
  scheduled task / n8n workflow / new skill (skill-creator-pro), Systematize →
  ccc-sop-creator, Simplify → operator review, Delegate → handoff-prep.
  Use this skill whenever the operator says "PRADA audit", "ASSD audit",
  "Prada Protocol", "what should I automate", "what should I delegate",
  "where is my time leaking", "time audit", "what can I cut", "what can be
  eliminated", "automate audit", "decision fatigue audit", "what's a low-value
  activity", or wants to identify which recurring activities should be removed
  from their plate. Also auto-triggered at the end of each 90-day cycle
  (paired with the 75-day-retro window) or when a sprint review reveals
  time-waste patterns. Produces a saved ASSD audit document plus routed
  proposals to the downstream skills — not just generic advice.
allowed-tools: "Read, Write, Glob, Edit"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-05-16
  updated: 2026-05-16
  language: English
  framework: Todd Herman Prada Protocol + ASSD — decision-fatigue elimination
  distribution: marketplace-ready
---

# Prada Protocol Audit Skill

**Workflow: Source Activity Data → Categorize ASSD → Prioritize → Route Downstream → Schedule Re-PRADA**

The Prada Protocol's thesis: every recurring decision the operator makes that doesn't add value is decision fatigue. Tom Ford, Steve Jobs, Zuckerberg, Obama — all pre-decided low-value choices (uniform, food, schedule) so their decision-making capacity went to high-value work.

This skill applies that thesis as a structured audit. It looks at what the operator actually spent time on, then asks: of these recurring activities, which should be **Automated, Systematized, Simplified, or Delegated**?

The output isn't just a list — it's downstream proposals to the relevant building skills (`handoff-prep`, `ccc-sop-creator`, `skill-creator-pro`).

Session time: ~30–45 minutes for a quarterly audit. ~15 min for an on-demand audit.

---

## Background: Why ASSD

Herman's Prada Protocol uses four moves, in this order of leverage:

| Move | What it does | Best for |
|---|---|---|
| **Automate** | Machine or system runs it without the operator | High-frequency, rules-based, no judgment required |
| **Systematize** | Repeatable SOP / template; still human-executed | Recurring work that needs judgment but follows a known pattern |
| **Simplify** | Cut steps without losing value | Overcomplex processes that grew accidentally |
| **Delegate** | Hand to another human or sub-agent | Work that needs judgment but not Daniel's specific judgment |

**The Maintenance Mindset gatekeeper:** Every YES to a new activity creates a maintenance burden across 4 resources (money, time, skills, people). Before the audit ends, every kept activity must answer "what is this routine costing me on each axis, and is it worth it?" The audit is also when activities that were once worth automating get re-evaluated — what's automate-worthy now might be eliminate-worthy next quarter.

---

## Phase 0 — Context Load (automatic)

1. Read most recent active 90-day sprint from `00 - COMMAND CENTER/Daily Notes/2026/Q*/`
2. Glob daily checkouts from the last 30 days: `00 - COMMAND CENTER/Daily Notes/2026/Q*/**/*Daily Check-out*` and `*Daily Checkout*`
3. Glob weekly plans from the last 4 weeks: `*Weekly Plan*`
4. Read current Drumbeat (active weekly task map)
5. Read `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` to check for prior ASSD-related rules
6. Surface a summary back to the operator:
   ```
   Audit window: [start date] → [end date]
   Daily checkouts loaded: [N]
   Weekly plans loaded: [N]
   Active sprint: [name]
   Prior ASSD rules: [count, with summary]
   ```

If insufficient checkout data exists (< 7 days of Scorecard tallies), tell the operator and offer to run a smaller-window audit using just the Drumbeat + weekly plans.

---

## Phase 1 — Identify Recurring Activities (~8 min)

Extract every activity that appears **3+ times** across the audit window. Use these signals:

- **Scorecard tallies** in `daily-checkout` files (per-venture activity counts)
- **Drumbeat carry-forwards** (tasks that recur week-to-week without completion)
- **Weekly-planning Activity blocks** (lowest level of the Boulder/Rock/Pebble/Activity hierarchy)
- **Pile-Up Zone entries** that repeat (signal: same kind of distraction surfacing repeatedly)

Group by category. Example output:

```
Recurring activities identified (last 30 days):

CCC operations:
  - Pipeline status updates (daily × ~22)
  - Discovery call prep (~6 × week)
  - Proposal drafting (~2 × week)
  - Client onboarding handoffs (~3 × month)

LONNEL:
  - Weekly sales meeting prep (×4)
  - Sales update messages to Lonnel (×8)

Personal:
  - Lyra evening routine (daily)
  - Email triage (daily × 2)
  - Calendar coordination (~daily)

Content / GTM:
  - LinkedIn post drafting (~3 × week)
  - Newsletter writing (×4)
  - Repurposing video → text (×2)
```

Present this to the operator. Ask: *"Anything missing that should be on this list? Any activity that's wrong-category?"* Refine before proceeding.

---

## Phase 2 — ASSD Categorization (~12 min)

For each activity, walk through the ASSD decision sequence in this order:

1. **AUTOMATE first** — Can this run without the operator's decision-making? (Cowork scheduled tasks, n8n flow, plugin skill, Claude subagent on a cron)
2. **SYSTEMATIZE next** — If automation isn't possible/worth it, can a repeatable SOP make it 3× faster?
3. **SIMPLIFY next** — Is this currently more complex than it needs to be? Can we cut steps?
4. **DELEGATE last** — Is this judgment-required but not Daniel-specific judgment? (Jack, Heiko, future operator-partners, AI subagent on a brief)

For each activity, capture:

```
Activity: [name]
Frequency: [N per week / month]
Avg duration: [estimate]
Total time / month: [frequency × duration]
Move: AUTOMATE | SYSTEMATIZE | SIMPLIFY | DELEGATE | KEEP-AS-IS
Reasoning: [why this move, not the others]
Routing target: [skill / system / person it gets handed to]
```

**The exclusion rule:** Mark activities as `KEEP-AS-IS` only if (a) they require Daniel's specific judgment, (b) they're already optimal, and (c) they directly produce strategic value. Push back on "but I like doing it" — that's a different decision, made elsewhere, not in this audit.

---

## Phase 3 — Prioritize (~5 min)

Rank candidates within each move by **time-saved × frequency × leverage**:

- **Time-saved** = current duration − target duration after the move
- **Frequency** = how often the activity recurs
- **Leverage** = does fixing this also fix downstream activities, or only this one?

Output the top 3–5 per category:

```
TOP AUTOMATE CANDIDATES (proposed for skill-creator-pro / n8n / scheduled tasks):
  1. [activity] — ~[X hrs/month saved] — proposed mechanism: [specific tool]
  2. ...

TOP SYSTEMATIZE CANDIDATES (proposed for ccc-sop-creator):
  1. [activity] — current = ad-hoc, target = SOP — proposed SOP name: [name]
  2. ...

TOP SIMPLIFY CANDIDATES (for operator review):
  1. [activity] — current = [N] steps, proposed = [N−k] steps — what to cut: [steps]
  2. ...

TOP DELEGATE CANDIDATES (proposed for handoff-prep):
  1. [activity] — recipient: [Jack / Heiko / AI subagent / new hire] — brief seed: [...]
  2. ...
```

---

## Phase 4 — Route Downstream (~8 min)

For each prioritized candidate, route to the appropriate downstream skill. The audit's job isn't to build the SOP / skill / handoff — it's to **stage** each move so the right tool can finish the work.

### Automate candidates → `skill-creator-pro` or scheduled tasks

For each, produce a one-paragraph build seed:

```
PROPOSED AUTOMATION: [name]
What it does: [outcome]
Mechanism: [Cowork scheduled task | n8n workflow | new skill]
Trigger: [time / event / phrase]
Inputs: [what it reads]
Outputs: [what it writes]
Next action: Invoke `skill-creator-pro` with this brief, OR add scheduled task via `scheduled-tasks` MCP.
```

Ask the operator: *"Should I invoke `skill-creator-pro` now for [top candidate], or stage these for later?"* If yes, hand off.

### Systematize candidates → `ccc-sop-creator`

For each, produce a one-paragraph SOP seed:

```
PROPOSED SOP: [name]
What it documents: [the recurring process]
Current pain: [why ad-hoc is breaking down]
Trigger to use the SOP: [phrase / event]
Estimated SOP length: [short / medium / long]
Next action: Invoke `ccc-sop-creator` with this brief.
```

Ask: *"Should I invoke `ccc-sop-creator` now for [top candidate]?"*

### Simplify candidates → operator review

These don't route to a sub-skill — they go to a focused 5-min review with the operator inside this same session, OR get logged into the daily check-in for tomorrow's morning work.

For each, propose specific step-cuts: *"Currently you do [step A] → [step B] → [step C]. Step B exists because [historical reason], but [current reason it's no longer needed]. Drop B. Estimated time saved: [X]."*

### Delegate candidates → `handoff-prep`

For each, produce a delegation seed:

```
PROPOSED DELEGATION: [activity]
Recipient candidate: [Jack | Heiko | future hire | AI subagent]
Why this person: [judgment-fit reasoning]
Brief seed: Goal = [...] / Context = [...] / DoD = [...]
Next action: Invoke `handoff-prep` to package the full brief.
```

Ask: *"Should I invoke `handoff-prep` now for [top candidate]?"*

---

## Phase 5 — Save the Audit + Schedule Re-PRADA (~3 min)

Save the audit to:

```
00 - COMMAND CENTER/[today's date] — PRADA Audit.md
```

Use this structure:

```markdown
---
type: prada-audit
created: [today]
audit-window: [start] → [end]
related:
  - "[[handoff-prep]]"
  - "[[ccc-sop-creator]]"
  - "[[skill-creator-pro]]"
  - "[[75-day-retro]]"
tags: [prada, assd, automation, delegation, audit]
---

# PRADA Audit — [today's date]

## Audit Window
[Start] → [End], [N] checkouts loaded, [N] weekly plans loaded.

## Recurring Activities Identified
[From Phase 1]

## ASSD Categorization
[Full table from Phase 2]

## Top Candidates by Move
[Prioritized lists from Phase 3]

## Downstream Routing
[Seeds from Phase 4 — what got routed where, plus status of each handoff]

### Routed to skill-creator-pro
- [candidate] — status: [staged | invoked | shipped]

### Routed to ccc-sop-creator
- [candidate] — status: [staged | invoked | shipped]

### Operator-review Simplify items
- [candidate] — owner: Daniel — due: [date]

### Routed to handoff-prep
- [candidate] — recipient: [...] — status: [staged | invoked | shipped]

## Maintenance Mindset — Re-evaluation Flags
Activities that should be re-PRADA'd next quarter (because their automation/systematization status will likely change):
- [activity] — current move: [...] — likely next move: [...] — why: [...]

## Next PRADA Audit
Scheduled for: [end of next 90-day cycle, ± 75-day-retro window]
```

Then say:

> *"PRADA audit saved at [path]. [N] candidates routed to skill-creator-pro, [N] to ccc-sop-creator, [N] to handoff-prep, [N] simplify items for your review. Re-PRADA scheduled at next 75-day-retro."*

---

## Phase 6 — Decision Harvest

Before closing, ask: *"Did anything surface here that should become a permanent rule?"*

Candidate rules:
- An activity-class that consistently shows up as Automate-able (e.g., "any data-aggregation task → automate")
- A delegation pattern that works repeatedly (e.g., "Jack handles all client logistics")
- A simplification heuristic (e.g., "any 5-step process gets cut to 3 by next quarter")
- A re-PRADA trigger pattern (e.g., "anything I'm doing weekly for 8+ weeks gets PRADA'd")

If yes, append to `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` under a `## PRADA / ASSD` section.

---

## Rules

1. **Run ASSD in order — Automate first, Delegate last.** Operators love to delegate (it feels productive); the highest leverage is Automate (it runs forever). If an activity can be automated, never delegate it — that's just moving the cost to another human.
2. **The audit doesn't build anything — it routes.** Don't try to build the skill, SOP, or handoff inside this skill. Stage the seed, then invoke the right downstream skill. Trying to do everything in-session burns context and degrades each output.
3. **Time-saved × frequency × leverage, in that order.** A 5-min activity that runs daily beats a 60-min activity that runs once a quarter. Prioritize on total monthly time saved, not per-instance gain.
4. **Push back on "but I like doing it."** That's a different conversation. If the operator wants to keep an activity for non-leverage reasons, fine — but flag it explicitly as `KEEP-AS-IS — operator preference` so it's visible at next audit.
5. **Maintenance Mindset is non-optional.** Every activity gets a re-PRADA flag for next quarter. Today's automation might be next quarter's "should be eliminated entirely" — the world changes.
6. **The exclusion rule for KEEP-AS-IS is tight:** (a) needs Daniel's specific judgment, (b) already optimal, (c) directly produces strategic value. All three. If only one or two are true, the activity gets re-evaluated.
7. **For Delegate candidates with no current recipient:** Don't kill the move — log it as "Delegate-when-hire-arrives" with a hiring-trigger note. This becomes input to the next sprint's hiring decision.
8. **Quarterly cadence is the default; on-demand is the override.** Don't run a full PRADA monthly — it produces noise. But DO run on-demand when a sprint review surfaces clear time-waste (e.g., the operator is doing the same firefight three weeks running).

---

## Self-Improvement

When a routed candidate ships successfully (skill / SOP / handoff lands and saves real time):
- Note which signal in the audit pointed to it (frequency? leverage? specific phrase in the checkouts?)
- Save the activity → move → routing pattern as a reference example
- Promote any consistently-working pattern to a Rule above

When a routed candidate stalls (skill never gets built, SOP never gets followed, delegation fails):
- Diagnose: was the seed brief insufficient? Was the move wrong (e.g., Delegate when it should have been Automate)? Was the operator not ready?
- Add the failure pattern to Rules above
- Update `Decisions & Rules.md` if the pattern is general

This skill is never finished. The more PRADA audits run, the more accurate the categorization becomes — and the more activities reach the "shouldn't exist at all" state.
