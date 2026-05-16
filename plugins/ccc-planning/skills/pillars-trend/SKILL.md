---
name: pillars-trend
description: |
  Surfaces 7/14/30/90-day trends across the 5 Performance Pillars (Body, Being,
  Balance, Business, Belonging — Herman's 90 Day Year frame) using daily
  Pillars ratings from daily-checkout. Aggregates per Pillar (current, 7d/14d/
  30d avg, trend), flags floor breaches (rating 1-2 for 3+ consecutive days),
  trend degradation, and imbalance gaps. Checks the Charter v3 binding
  constraint — 5 consecutive days off substrate → STOP venture work, return
  to substrate. Read-only — produces analysis, never writes unless asked.
  Use whenever the operator says "pillars trend", "5 pillars status", "show
  me my pillars", "how am I doing on pillars", "Body/Being/Balance/Business/
  Belonging pillar", "substrate floor check", or "substrate status".
  Also auto-invoked as context by daily-checkin, weekly-planning Q5,
  2-week-sprint-review, 75-day-retro, and 90-day-sprint kickoff + close.
allowed-tools: "Read, Glob, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.1
  created: 2026-05-16
  updated: 2026-05-16
  language: English
  framework: Todd Herman — 5 Performance Pillars (90 Day Year) · Charter v3 Substrate-Floor
  distribution: marketplace-ready
---

# Pillars Trend Skill

**Workflow: Scan → Aggregate → Flag → Surface.**

Read-only analysis. Scans daily-checkout Pillars data over a configurable window, aggregates the five Pillars (Body / Being / Balance / Business / Belonging), surfaces drift signals, and checks the Charter v3 binding constraint. Produces a transient table + flags — does not modify any file unless the operator explicitly asks.

The point of this skill: Pillars ratings accumulate every night through `daily-checkout` Step 3. Without surfacing, the data is invisible. Without surfacing, drift compounds for weeks before anyone notices. This skill makes drift visible while it's still small.

---

## When this skill runs

| Invocation | Window | Output emphasis |
|---|---|---|
| `daily-checkin` (auto context) | 7-day + yesterday | Yesterday's ratings + current trend (compact, 3-line summary) |
| `weekly-planning` Q5 (routines) | 7-day + 14-day | Which Pillar(s) are degrading — routes to `roar-routine-design` if a Pillar is broken |
| `2-week-sprint-review` | 14-day | Full table + signal flags |
| `75-day-retro` | sprint-to-date vs. baseline | Sprint comparison (current avg vs. kickoff baseline per Pillar) |
| `90-day-sprint` kickoff | (none — captures baseline) | Save baseline rating for end-of-sprint comparison |
| `90-day-sprint` close | sprint-to-date vs. baseline | Final delta per Pillar |
| Operator on-demand | configurable (default 7d) | Full table + signal flags |

If the operator asks for "the last 30 days" or "this month", use 30 days. If they name a specific Pillar ("how's my Body pillar?"), still show all five but highlight the named one.

---

## Phase 0 — Detect window

Default is **7 days**. Override if:
- Operator named a window ("last 30 days", "this month", "this sprint", "this week" → 7, "this 2-week sprint" → 14, "this quarter" → 90)
- Auto-invoked from another skill — use that skill's preferred window (see table above)

Always also compute the **prior 7 / 14 / 30-day rolling averages** for context inside the chosen window's table (so the operator can see if today's number is up or down relative to recent history).

---

## Phase 1 — Scan the daily notes folder

The Pillars data lives in daily-checkout files under `00 - COMMAND CENTER/Daily Notes/{YEAR}/{QUARTER}/{WEEK}/` as one of:

- A `## End-of-Day` section containing a `**5 Pillars:**` line, OR
- A YAML or frontmatter block with `pillars:` keys, OR
- A standalone `## 5 Pillars` section

**Find candidate files.** Use Glob on `00 - COMMAND CENTER/Daily Notes/**/*Daily Check-in*.md` (the daily-checkout writes back into the morning check-in file — see [[daily-checkout]] Phase 4). For each file in the window, read it and extract the Pillars line.

**Parsing — robust to format variation.** Look for any of these shapes:

```
**5 Pillars:** Body 3 · Being 4 · Balance 2 · Business 5 · Belonging 4
```
```
## 5 Pillars
- Body: 3
- Being: 4
- Balance: 2
- Business: 5
- Belonging: 4
```
```
pillars:
  body: 3
  being: 4
  balance: 2
  business: 5
  belonging: 4
```

Match case-insensitively. Each Pillar score is an integer 1-10.

> *"1-10 is easier to quantify mentally — 1 = 0-10% (didn't show up), 5 = approximately 50%, 10 = 100% (fully showed up). The Pillar rating answers: 'how much did I show up for this today?' as a percentage on a 1-10 scale."*

This is the scale the operator rates against every night in `daily-checkout` Step 3. All thresholds and signals in this skill assume the 1-10 scale.

If a day's file has no Pillars data (the operator skipped checkout, or it predates the upgrade), record it as `missing` — don't impute, don't average it as zero.

**Backward compatibility note:** Daily files written before 2026-05-16 used a 1-5 scale (Cycle 1 operator-adapted). When parsing those legacy files, multiply each rating by 2 to normalize to the 1-10 scale (1→2, 2→4, 3→6, 4→8, 5→10). Flag the conversion in `Data quality`.

**Use bash for speed on larger windows.** For 7-day windows, reading files in sequence is fine. For 30/90-day windows, prefer a single `grep`/`awk` pass:

```bash
grep -ihE "(body|being|balance|business|belonging)[[:space:]]*[:·][[:space:]]*([1-9]|10)" \
  "00 - COMMAND CENTER/Daily Notes/"**/*"Daily Check-in"*.md 2>/dev/null
```

Then map each line back to its file's date.

---

## Phase 2 — Aggregate per Pillar

For each of the 5 Pillars, compute:

| Metric | How |
|---|---|
| **Today** (or most recent) | Latest non-missing rating |
| **7-day avg** | Mean of last 7 non-missing daily ratings |
| **14-day avg** | Mean of last 14 non-missing daily ratings |
| **30-day avg** | Mean of last 30 non-missing daily ratings |
| **Trend** | Slope sign over the active window: `↑` (positive), `→` (flat ±0.2), `↓` (negative), `↓↓` (strongly negative, ≥0.5 drop) |

If fewer than 3 data points exist in a window, mark the average as `n/a — need more data` rather than producing a misleading number from 1-2 days.

---

## Phase 3 — Detect signals

Run these checks in order:

### Signal A — Floor breach (CRITICAL)

For each Pillar, scan the daily series. If a Pillar is rated **1-3 for 3+ consecutive days** (bottom 30% of the 1-10 scale — "barely showed up at all"), flag: `⚠️ FLOOR BREACH — [Pillar] at [rating] for [N] consecutive days`.

A rating of **1-2 (bottom 20%) is crisis territory — the pillar is effectively abandoned that day**. A rating of **7-10 (top 40%) is the healthy / thriving band**. Between is calibration zone.

### Signal B — Substrate-floor binding constraint (CRITICAL — Charter v3)

The Substrate-Floor 30-Day Pilot is a **precondition** for sustained venture work. Per Charter v3 binding constraint from [[Decisions & Rules]]:

> *5 consecutive days off → STOP venture work, return to substrate.*

The substrate-floor maps onto **Body + Being + Balance** (the three substrate layers — somatic, mindset, routine — that the Pillars structure captures). Compute substrate-floor status:

- A day counts as **"off substrate"** if ANY of Body / Being / Balance is rated 1-3 that day (bottom 30% of the 1-10 scale — "barely showed up" or worse on a substrate layer).
- If 5+ consecutive days are off substrate → emit `🛑 SUBSTRATE FLOOR BREACH — Charter v3 binding constraint triggered. STOP venture work. Return to substrate.`
- If 3-4 consecutive days off substrate → emit `⚠️ SUBSTRATE WARNING — [N] consecutive days off. One more day triggers the binding constraint.`
- Otherwise emit `Substrate floor: OK.`

This is the most important signal in the skill. It overrides every other recommendation. If the binding constraint trips, surface it FIRST, before the table.

### Signal C — Trend degradation

For each Pillar with a downward slope across the active window (≥1.0-point drop on the 1-10 scale from window start to window end), flag: `[Pillar] trending down across [N]-day window — review routines (suggest [[roar-routine-design]])`.

### Signal D — Pillar imbalance gap

If one Pillar's 7-day average is **3+ points below** the mean of the other four (on the 1-10 scale — preserves the same proportion as the legacy "1.5-point gap" on a 1-5 scale), flag: `[Pillar] is 3+ points below the others — imbalance pattern`.

### Signal E — Sustained strength (positive signal — surface it too)

If a Pillar has averaged ≥9.0 for 14+ days (the top 10% of the 1-10 scale), surface as `[Pillar] sustained at [avg] for [N] days — strong base`. Strength matters because Herman's framing is performance-positive, not deficit-driven.

---

## Phase 4 — Produce output

ALWAYS use this exact structure. If the substrate-floor binding constraint trips, the 🛑 banner goes FIRST, above the heading.

```markdown
[🛑 SUBSTRATE FLOOR BREACH banner here if triggered]

## Pillars Trend — [Window label, e.g. "Last 7 days · 2026-05-10 → 2026-05-16"] · Scale: 1-10

| Pillar (1-10) | Today | 7-day avg | 14-day avg | 30-day avg | Trend | Flag |
|---|---|---|---|---|---|---|
| Body | 6 | 6.4 | 6.0 | 6.8 | ↓ | none |
| Being | 8 | 8.2 | 8.0 | 8.4 | → | none |
| Balance | 3 | 3.6 | 4.4 | 5.0 | ↓↓ | ⚠️ FLOOR BREACH |
| Business | 9 | 9.2 | 9.0 | 8.8 | ↑ | strong |
| Belonging | 8 | 7.8 | 7.4 | 7.2 | ↑ | none |

## Signal flags
- Balance pillar at 3 for 4 consecutive days → intervention needed (suggest [[roar-routine-design]] for whichever routine is broken)
- Body pillar trending down across 14-day window → review routines
- Business pillar sustained at 9.2 for 14+ days → strong base

## Substrate-floor status
[OK / WARNING — N consecutive days off / 🛑 CRITICAL — binding constraint tripped]

## Data quality
- Days covered: [N of N]
- Missing days: [list dates if any]
```

If the operator asked about a specific Pillar, add a short trailing paragraph naming that Pillar's trajectory in plain language ("Your Body pillar is down 0.4 over the last week — the dip started around May 10. Worth checking what changed in the routine around then.").

---

## Phase 5 — Suggested next moves (optional)

After the table, if any flag is active, name the downstream skill that would address it:

- Floor breach OR trend degradation on a Pillar tied to a routine → `roar-routine-design` (when built — currently P4 in upgrade plan)
- Substrate-floor binding constraint tripped → return to [[2026-05-18 — Substrate-Floor 30-Day Pilot Tracker]] — STOP venture work, do not plan new Rocks today
- All Pillars green, sustained ≥14 days → operator is on solid base; surface as confirmation, not action

Never invoke the downstream skill automatically. Surface the suggestion; the operator chooses.

---

## Phase 6 — Optional save

Default: output is transient (markdown to the chat, no file written).

**Save only if** the operator explicitly asks ("save this", "log the snapshot", "put this in today's note"). When saving:
- 7/14-day snapshots → append to today's daily check-in file under a `## Pillars Snapshot` subsection
- 30/90-day snapshots → save to `00 - COMMAND CENTER/Daily Notes/{YEAR}/{QUARTER}/{YY-MM-DD} — Pillars Trend {window}.md`

This preserves the read-only default while letting the operator capture point-in-time snapshots when they matter (e.g., sprint kickoff baseline, sprint close, retro).

---

## Rules

1. **Read-only by default.** The skill produces analysis; it does not modify state unless the operator explicitly asks. Saving a snapshot is opt-in, not automatic.
2. **The substrate-floor binding constraint is the most important signal.** If 5+ consecutive days off substrate → emit the 🛑 banner FIRST, above everything else. The operator should see the STOP signal before reading the table. This is Charter v3 doctrine, not a soft recommendation.
3. **Don't impute missing days.** If a daily-checkout was skipped, mark the day missing and note it in the "Data quality" section. Averaging a missing day as zero or as the mean produces lies that compound across weeks.
4. **Don't average 1-2 data points into a "7-day avg".** Mark as `n/a — need more data`. False precision in early days produces false alarms.
5. **Surface strength too, not just deficits.** Herman's 5 Pillars is a performance frame, not a deficit frame. If a Pillar has been sustained at ≥9.0 for 14+ days (top 10% of the 1-10 scale), name it. The signal flags section includes both warnings and strengths.
6. **Trend symbols carry weight.** `↑` / `→` / `↓` / `↓↓` are deliberately coarse — they read at a glance. Don't substitute numbers ("trend: -0.3"). The glanceable format is the point.
7. **Don't auto-invoke downstream skills.** Surface the suggestion ("→ consider `roar-routine-design`") but let the operator decide. The skill is a measurement layer, not a decision layer.
8. **Use [[wikilinks]] everywhere** for references to other skills, foundational docs, or the Substrate-Floor Pilot Tracker — per the vault's standing rule.
9. **Substrate floor = Body + Being + Balance.** Not Business or Belonging. The substrate-floor binding constraint only triggers on the substrate layers, because the substrate is what Charter v3 names as *jointly prior* to the upper Brain layers. Business or Belonging dipping is a different signal (downstream, addressable through routines or scheduling), not a STOP signal.
10. **Sub-30 seconds for 7-day; sub-2-minutes for 90-day.** If aggregation is slow, drop to a single `grep` + `awk` pass over the daily notes folder rather than reading file-by-file.

---

## Anti-patterns

| Situation | Broken output | Root cause | Fix |
|---|---|---|---|
| Only 2 days of data | "7-day avg: 6.0" | Averaging tiny samples produces noise | Mark `n/a — need more data` until ≥3 points |
| 5 consecutive days off substrate | Table shows degradation but no 🛑 banner | Charter v3 binding constraint not surfaced first | Emit 🛑 banner ABOVE the heading — make it impossible to miss |
| Missing days imputed as zero | "Body 7-day avg: 3.6" (when 4 of 7 days were missing) | Treating missing as zero | Skip missing days from the average, report in Data quality |
| Trend shown as -0.34 slope | Operator can't read it at a glance | False precision | Use `↑ / → / ↓ / ↓↓` symbols only |
| Skill writes a file every invocation | Vault accumulates Pillars snapshot files daily | Defaulted to save instead of transient | Default is tr