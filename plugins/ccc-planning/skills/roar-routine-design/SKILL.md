---
name: roar-routine-design
description: |
  Designs a high-performance routine using Todd Herman's R.O.A.R. methodology
  (Routines Optimized As Rituals): Trigger → 4 E's (Enroll, Establish, Embed,
  Elevate) → Reward. Produces a 30-day install plan with weekly milestones,
  a maintenance schedule, and a check-in cadence so the routine actually sticks
  past the resistance window (days 10–14) and reaches automaticity (day 30+).
  Use this skill whenever the operator says "design a routine", "build a habit",
  "fix my morning routine", "my routine is broken", "install a new routine",
  "habit stacking", "ROAR", "4 E's", "Trigger Action Reward", "Tiny Habits",
  "BJ Fogg", "I keep falling off my [X] routine", "make this stick", or wants
  to install/repair any behavior pattern (morning startup, evening shutdown,
  deep work block, exercise cadence, weekly review discipline, relationship
  rituals, reading, training). Also auto-triggered when weekly-planning Q5
  reveals routine breakdown OR when pillars-trend flags a degrading Pillar
  (especially Body, Being, Balance). The output is a saved routine design
  document plus the install plan — not just generic advice.
allowed-tools: "Read, Write, Glob, Edit"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-05-16
  updated: 2026-05-16
  language: English
  framework: Todd Herman R.O.A.R. + BJ Fogg Tiny Habits — habit installation engine
  distribution: marketplace-ready
---

# R.O.A.R. Routine Design Skill

**Workflow: Diagnose → Trigger → 4 E's → Reward → 5-Filter Pressure-Test → 30-Day Install Plan → Maintenance Schedule**

A routine doesn't fail because the operator is undisciplined. It fails because the Trigger is fuzzy, the Action is too big on Day 1, the Reward doesn't fire, the install plan ignores the resistance window, or no one ever circles back to maintain it.

This skill walks the operator through the design once, then the routine maintains itself.

Session time: ~15–25 minutes for a new routine. ~5–10 min for a repair.

---

## Background: Why R.O.A.R.

Todd Herman's R.O.A.R. — Routines Optimized As Rituals — is the core habit-installation engine of the 90 Day Year. The thesis: most "discipline problems" are really **design problems**. A well-designed routine survives bad days because it's anchored to a strong existing cue, sized small enough not to fire resistance, and rewarded immediately enough to close the dopamine loop.

The R.O.A.R. ecosystem has three parts:

```
TRIGGER  →  ACTION (the 4 E's)  →  REWARD
```

The 4 E's — **Enroll, Establish, Embed, Elevate** — are the phased install curve. Each E is a different difficulty tier, with day-windows tuned to the ~66-day-to-habit research finding. Skipping a phase is the most common failure mode (people try to install at Establish strength on Day 1 and burn out by Day 4).

BJ Fogg's Tiny Habits methodology layers underneath: anchor to an existing routine, make the behavior tiny, celebrate immediately.

Herman's **Maintenance Mindset** layers on top: routines decay. Every routine must include a re-anchor mechanism and a quarterly re-evaluation, or it silently rots.

---

## Phase 0 — Context Load (automatic)

1. Glob for an existing routine document for this routine name in `00 - COMMAND CENTER/Foundational Docs/Personal/Routines/`. If found, this is a **repair**, not a new install — read it and surface what's been tried.
2. Read most recent `*Daily Check-in*` and `*Weekly Plan*` for Pillars context.
3. If `pillars-trend` data is available (read latest pillars-trend output from session log or daily checkout files), surface which Pillar is currently degrading — that often points to the routine target.
4. Read `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` if it exists, to check for prior routine-related rules the operator has codified.

---

## Phase 1 — Identify the Routine Target (1–2 questions, ~2 min)

**Q1 — What behavior pattern are we installing or repairing?**

Examples to offer if the operator is vague:
- Morning startup (Body / Being)
- Evening shutdown (Balance)
- Weekly review / planning discipline (Business)
- Deep-work block protection (Business)
- Exercise cadence (Body)
- Lyra / relationship connection time (Belonging)
- Reading / learning ritual (Being)
- Cash / finance review (Business)

If `pillars-trend` flagged a degrading Pillar, propose 2–3 routines that would directly serve that Pillar.

**Q2 — Install or repair?**

- **Install** = brand-new behavior. Run full 4 E's, day 1 → 30.
- **Repair** = the routine existed and broke. Diagnose where it broke (Trigger faded? Reward stopped firing? Resistance won at day 12?) before redesigning.

If repair, ask: *"When did it last work, and what changed?"* — the change-point usually IS the diagnosis.

---

## Phase 2 — Trigger Design (~3 min)

A routine without a Trigger is just a wish. Triggers can be:

- **Time-based** ("at 06:30") — weak; willpower-dependent
- **Cue-based** ("after the kettle boils") — medium
- **Anchor-based** ("after I close my laptop for the day, I will...") — strongest; this is BJ Fogg's habit-stacking pattern

**Q3 — What existing strong routine will anchor this one?**

Push for an anchor that already fires reliably. Examples: brushing teeth, closing the laptop, putting Lyra to bed, the first coffee, opening the daily checkout.

Write the trigger sentence in the form:

> **After I [existing anchor], I will [new tiny behavior].**

If the operator can't name an existing anchor, that itself is a finding — the routine needs an external anchor (alarm, calendar block, location cue) added before it can be installed.

---

## Phase 3 — The 4 E's Install Curve (~8 min — the core)

Walk through all four phases. Each phase has a day-window, an intensity, and a success criterion.

### Enroll — Days 1–7

- **Intensity:** Smallest possible version of the routine. If the target is a 30-min morning workout, Enroll is "put on workout clothes." If the target is daily writing, Enroll is "open the document and write one sentence."
- **Success criterion:** **Consistency, not completeness.** 6 of 7 days = success even if every session is the tiny version.
- **Why:** The brain is not yet wired for this behavior. Asking for full intensity now fires resistance, which encodes the routine as "the thing I avoid."
- **What to capture:** *Enroll version =* [tiny version of the routine].

### Establish — Days 8–21

- **Intensity:** Grow toward the full routine. Add the parts that were trimmed in Enroll.
- **Success criterion:** Hitting the routine ~5 of 7 days at increasing depth.
- **The resistance window:** Days 10–14 are when resistance peaks. Name this explicitly to the operator: *"You will feel resistance around day 10–14. That feeling is the install working, not a sign to quit. Pre-decide what you do when it shows up."*
- **What to capture:** *Establish version =* [full routine] + *resistance plan =* [what the operator will do when resistance hits].

### Embed — Days 22–30

- **Intensity:** Full routine, executed with less conscious will. The routine starts to maintain itself.
- **Success criterion:** It would feel weird NOT to do it.
- **What's different from Establish:** No more "should I?" decision cost. Trigger fires, routine runs.
- **What to capture:** *Embed signal =* [the specific feeling/observation that confirms automaticity, e.g. "I do it without checking the time"].

### Elevate — Day 31+ (the ongoing tier)

- **Intensity:** Refine for quality. Add depth, intensity, or new layers. The routine becomes part of identity.
- **The identity shift:** Move from *"I am trying to do X"* to *"I am a person who does X."* This is the language test for whether Elevate has landed.
- **What to capture:** *Elevate target =* [the higher-quality version of this routine 90 days out] + *identity statement =* [the "I am a person who..." sentence].

---

## Phase 4 — Reward Design (~2 min)

The Reward closes the loop. Without it, the brain doesn't encode the trigger→action chain.

**Q4 — What's the immediate reward that fires when the routine completes?**

Options (BJ Fogg's celebration patterns):

- **Physical** — fist pump, smile, "yes!", small body movement
- **Mental** — explicit acknowledgement ("I just did that")
- **Sensory** — coffee, music, a specific playlist tied only to this routine
- **Logging** — a check-mark, a streak counter, a tiny visible record

The reward must fire **immediately** (within ~3 seconds of the action). Delayed rewards (end-of-week review, monthly summary) do not encode the habit — they reinforce a different routine (the reviewing one).

For routines tied to existing CCC infrastructure: the daily checkout's Scorecard tally or Drumbeat check-off CAN serve as the reward IF the operator reliably runs the checkout. If not, build a more immediate reward.

---

## Phase 5 — The 5 Routine Filters (~3 min — pressure-test)

Herman's filters. Walk through each as a yes/no question. Any "no" is a design weakness to address before commitment.

1. **Is this routine COMPOUNDING?** Does executing it today make tomorrow's execution easier (or downstream effects larger)? If not, it's a one-shot task, not a routine.
2. **Is this routine PROTECTED?** Does the trigger live somewhere reality can't easily override it? (e.g., is it scheduled, anchored, fenced?)
3. **Is this routine MEASURABLE?** Can the operator look at any given day and answer "did I do it?" with a yes or no — no judgment call?
4. **Is this routine REVIEWABLE?** Is there a built-in review point (weekly check, monthly check, sprint review hook) where the routine surfaces for evaluation?
5. **Is this routine REPLACEABLE when context changes?** When seasons, ventures, or life-shape shift, does the routine have a successor — or will it just break silently? (Maintenance Mindset preview.)

If 1–2 filters fail, refine the design before moving on. If 3+ fail, the routine probably isn't the right target — return to Phase 1 and pick a different behavior.

---

## Phase 6 — 30-Day Install Plan (~3 min)

Generate the install plan as a table the operator can paste into their daily check-in or weekly plan.

```
Day-by-day install plan — [Routine Name]

Days 1–7 (Enroll):
  Daily check-in question: "Did I run the Enroll version today? (Y/N)"
  Day 7 milestone: Did I hit 6 of 7? If yes → graduate to Establish.

Days 8–21 (Establish):
  Daily check-in question: "Did I run the full routine today?"
  Day 10–14: Resistance window — pre-decide response now.
  Day 21 milestone: 5+ of 7 days last week at full version? If yes → graduate to Embed.

Days 22–30 (Embed):
  Daily check-in question: "Did the routine fire without conscious decision?"
  Day 30 evaluation: Run the routine evaluation (Phase 7 below).

Day 31+ (Elevate):
  Weekly review hook: Routine surfaces in weekly-planning Q5.
  Quarterly hook: Routine re-evaluated in next 90-day-sprint or 75-day-retro.
```

---

## Phase 7 — Maintenance Schedule (~2 min)

This is the Maintenance Mindset operationalized. Routines decay; the install plan must include re-anchor points.

For each routine, set:

- **Day 30 evaluation** (one-off): Is it embedded? Is the Reward still firing? Is the Trigger still anchored? Has the operator's context changed in a way that requires re-design?
- **Weekly re-anchor hook**: Routine appears in `weekly-planning` Q5 every week.
- **Quarterly re-evaluation** (`90-day-sprint` kickoff or `75-day-retro`): Still serving? Still anchored? Still rewarding? Promote / refine / replace / retire.

**The replacement rule:** When the operator's context shifts (new venture, new household rhythm, new season), routines that no longer fit get *replaced*, not abandoned. The skill explicitly schedules this question quarterly.

---

## Phase 8 — Output

Save the routine design to:

```
00 - COMMAND CENTER/Foundational Docs/Personal/Routines/[routine-name].md
```

Create the `Routines/` folder if it doesn't exist. Use this structure:

```markdown
---
type: routine-design
created: [today]
status: installing | embedded | elevating | retired
target-pillar: [Body | Being | Balance | Business | Belonging]
related:
  - "[[pillars-trend]]"
  - "[[weekly-planning]]"
tags: [routine, roar, habit-installation]
---

# [Routine Name]

## Target
[The behavior pattern + which Pillar it serves]

## Trigger
After I [anchor], I will [behavior].

## The 4 E's
- **Enroll (days 1–7):** [tiny version]
- **Establish (days 8–21):** [full version] · resistance plan: [what to do on day 10–14]
- **Embed (days 22–30):** [automaticity signal]
- **Elevate (day 31+):** [refined version] · identity: "I am a person who [...]"

## Reward
[Immediate reward that fires within 3 seconds of completion]

## 5 Routine Filters
- Compounding: [yes + how / no + fix]
- Protected: [yes + how / no + fix]
- Measurable: [yes / no]
- Reviewable: [where it surfaces]
- Replaceable: [successor plan when context changes]

## 30-Day Install Plan
[The plan table from Phase 6]

## Maintenance Schedule
- Day 30 evaluation: [date]
- Weekly hook: weekly-planning Q5
- Quarterly hook: next 90-day-sprint / 75-day-retro

## Install Log
- [date] — installed
- [date] — [check-in note]
```

Then say:

> *"Your routine design is saved at [path]. Start the Enroll version [today / tomorrow] anchored to [trigger]. I'll surface it in your weekly review and flag the day-10 resistance window."*

If a Pillar-degradation in `pillars-trend` triggered this skill, also write back to the operator's current daily checkout file: *"Designed [routine] to serve [Pillar]. Install starts [date]."*

---

## Phase 9 — Decision Harvest

Before closing, ask: *"Did anything surface here that should become a permanent rule?"*

Candidate rules:
- A trigger pattern that consistently works for this operator ("after coffee" anchors all morning routines)
- A reward pattern that reliably fires
- A failure mode this operator hits repeatedly (e.g. always tries to install at Establish strength on day 1)
- A context-shift pattern (always replace routines at quarter boundary)

If yes, append to `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` under a `## Routines` section.

---

## Rules

1. **Never skip the Enroll phase.** Operators will want to start at full intensity ("but I know I can do the 30-min version"). They cannot. The brain hasn't installed the trigger→action wiring yet. Resistance fires on day 4 and the routine dies. Always start tiny.
2. **The Trigger must be a real existing anchor, not a wish.** "At 6am" is not an anchor — it's a hope. "After the kettle boils" is an anchor. Push back on time-only triggers unless the operator can name an existing reliable time-locked behavior.
3. **The Reward must fire within 3 seconds.** End-of-week reviews are not rewards for the daily routine. They reinforce the review routine itself. Push for an immediate, in-body or in-context signal.
4. **Name the resistance window explicitly.** Day 10–14 is where most routines die. If the operator doesn't know this, they interpret normal resistance as "I'm not cut out for this" and quit. Pre-decide the response.
5. **For repairs, diagnose the failure point before redesigning.** The same broken design will break again. Ask when it last worked and what changed.
6. **Identity language is a real signal, not flourish.** "I am a person who [X]" only works after Embed. Don't have the operator force the language at Enroll — it backfires (the self-contradiction fires resistance).
7. **Maintenance Mindset is non-optional.** Every routine gets a quarterly re-evaluation hook. Without it, the routine rots silently and the operator concludes "routines don't work for me."
8. **One routine at a time per install window.** Operators want to install morning + evening + workout + reading simultaneously. The brain can't. One routine, 30 days, then the next. Push back on multi-installs.

---

## Self-Improvement

When a routine succeeds for Daniel:
- Note which Trigger anchor worked, which Reward worked, what resistance pattern showed up at day 10–14
- Save the routine document as a reference example for future installs

When a routine breaks:
- Diagnose where in the 4 E's curve it broke (Enroll? Establish day 10? Embed slipped to Establish?)
- Add the failure pattern to the Rules section above
- Update the operator's `Decisions & Rules.md` with the new pattern

This skill is never finished. The more Daniel installs, the more accurate the diagnosis becomes.
