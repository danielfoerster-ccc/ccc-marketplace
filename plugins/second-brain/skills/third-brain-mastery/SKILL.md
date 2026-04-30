---
name: third-brain-mastery
description: |
  Runs the daily delivery mechanism for the Five Stages of Third Brain Mastery curriculum. Integrates into daily check-in: selects one question from TOP 3, applies the Frontier Prompting Protocol (Pattern Bridge / Void Space / Quantum Leap), shows original + frontier-shaped versions, and captures practice results. Stage 1 focuses on reflex mastery of frontier question-shaping; graduates after 7 consecutive days of reflexively frontier-shaping questions without prompting. Use on daily check-in workflow to build operator mastery incrementally. Attribution: CCC-original curriculum architecture; frontier prompting techniques from Michael Simmons.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Claude · CCC (curriculum design by Daniel Förster)
  version: 0.1.0
  status: v0.1 — Stage 1 implementation, ready for 2026-05-01 launch
  dependencies: ["frontier-prompting skill", "daily-checkin skill"]
  trademark_seed: "[[Five Stages of Third Brain Mastery — Seed]]"
---

# Third Brain Mastery Skill

**Workflow: Stage Verify → Question Select → Frontier Transform → Comparison → Capture → Graduate Check.**

Daily practice engine for [[The Five Stages of Third Brain Mastery — Curriculum]]. Runs as a follow-up to (or integrated into) daily check-in to build operator reflex mastery in frontier question-shaping (Stage 1), with hooks for Stages 2–5 as they become active.

---

## Why This Matters

The vault has 138+ Lenses, 44 Recipes, 9 Operations + 72 Moves — but the bottleneck is **First Brain mastery**, not Third Brain capacity. Reading a Lens proves nothing. Mastery is when the operator does the move *without thinking about it*. This skill detects and reinforces that reflex through daily, applied practice on real work questions.

The curriculum spans five stages over ~5 months. Stage 1 (current) is Frontier Prompting — the ability to reflexively reshape vague questions into field-activating ones before sending them to Claude. Graduation criterion: 7 consecutive daily check-ins where Daniel's original question was already frontier-shaped, so the skill wasn't needed to reshape it.

---

## Context & State Management

Before running any stage, verify the operator's current stage:

**State file location:** `02 - MISSION CONTROL/skill-state/third-brain-mastery.json`

**State structure (auto-create if missing):**
```json
{
  "current_stage": 1,
  "stage_1_start_date": "2026-05-01",
  "consecutive_reflex_days": 0,
  "last_practice_date": null,
  "stage_1_graduated": false,
  "stage_2_unlocked": false,
  "streak_reset_count": 0,
  "notes": "Stage 1 in progress"
}
```

- **current_stage:** 1 (only), 2-5 stubbed for future
- **consecutive_reflex_days:** Tracks 7-day graduation threshold for Stage 1
- **last_practice_date:** Prevents double-runs on the same day
- **streak_reset_count:** If Daniel skips 3+ days, reset streak (not abandoned)

Load and update this file at the start and end of each run.

---

## Phase 0 — Context Load

Before asking anything, run Phase 0 of `daily-checkin` (it's already done during daily check-in). Retrieve:

1. **Today's date and day type** (from daily check-in context)
2. **Week's TOP 3 goals** (from active weekly plan)
3. **Today's TOP 3 tasks** (from daily check-in widget output or Drumbeat)

If the operator has not run daily check-in yet today, prompt gently: "Run daily check-in first to lock your TOP 3 — then we'll practice frontier prompting on one of them."

---

## Phase 1 — Stage Verify & Streak Check

Load the state file. Check:

- **Is it Stage 1?** If yes, proceed to Phase 2.
- **Is today the same day as last_practice_date?** If yes, skip (already ran today). Surface the result from yesterday.
- **Has 3+ days passed since last_practice_date?** If yes, reset consecutive_reflex_days to 0 and gently prompt: "You skipped a few days — no worries. Let's pick up where we left off."

---

## Phase 2 — Question Selection

Display a simple choice menu:

```
Today's TOP 3 tasks:
1. [Task from daily check-in]
2. [Task from daily check-in]
3. [Task from daily check-in]

Which of these will require an AI question today?
```

The operator picks ONE task. (If none require an AI question, that's fine — skip the day and note it: "No AI questions needed today. That counts as practice too — you've learned when not to ask.")

Once selected, ask:

**"What's your actual question for Claude on [Task]? Just ask it however it naturally comes to you — don't overthink it yet."**

Capture the **original question** verbatim.

---

## Phase 3 — Frontier Prompting Transform

Apply the three techniques from the Frontier Prompting Protocol. You do NOT need to invoke the frontier-prompting skill directly — instead, execute the protocol inline:

### Technique A — Pattern Bridge
"What patterns from [3-5 unrelated fields all solving similar structural problems] illuminate this question? What's the structural parallel?"

Rewrite the original question to activate cross-domain field synthesis.

### Technique B — Void Space
"What exists in the gaps or boundaries between the conventional approaches? What would emerge if we dissolved the constraint?"

Rewrite to explore phase transitions and boundary spaces.

### Technique C — Quantum Leap
"If we access multiple futures or solution paths simultaneously, what unexpected patterns become visible?"

Rewrite to activate superposition instead of linear forecasting.

**You will generate all three transformed versions.** (Yes, three. All three. The operator will choose which one feels most aligned, or synthesize across them.)

---

## Phase 4 — Comparison & Operator Choice

Show the operator:

```
ORIGINAL QUESTION:
[Verbatim original]

---

FRONTIER-SHAPED VERSIONS:

Pattern Bridge:
[Transformed via cross-domain synthesis]

Void Space:
[Transformed via boundary exploration]

Quantum Leap:
[Transformed via simultaneous possibility mapping]

---

Which feels right? Or would you like to synthesize across them?
```

Then ask:

**"Which version will you send to Claude, or do you want to use your original?"**

Capture the operator's choice: which frontier version (or original if it was already frontier-shaped).

---

## Phase 5 — The Reflex Graduate Question

This is the key to Stage 1 mastery detection:

**"Was your original question already frontier-shaped — meaning you didn't need me to reshape it?"**

This is a YES/NO question. It's the signal for streak tracking.

- **If YES:** increment `consecutive_reflex_days` by 1. This counts as a practice day (reflex graduation day).
- **If NO:** the operator chose one of the frontier versions (or wants to synthesize), so this is a "learning" day. Keep `consecutive_reflex_days` at current count (don't increment).

---

## Phase 6 — Capture to Mastery Log

Append one row to: `00 - COMMAND CENTER/Daily Notes/[current week]/Third Brain Mastery Log.md`

**File structure (auto-create if missing):**

```markdown
# Stage 1 Mastery Log — Frontier Prompting Reflex

*Tracks consecutive reflex-graduation days. 7 consecutive = Stage 1 graduation.*

| Date | Day # | Question (brief) | Original Frontier-shaped? | Technique Used | Notes |
|------|-------|------------------|---------------------------|----------------|-------|
| 2026-05-01 | 1 | Pricing model for SaaS | No | Void Space | Used boundary dissolution |
| 2026-05-02 | 2 | Hiring for ops role | Yes | — | Reflexively asked for structural patterns |
| 2026-05-03 | 3 | Content distribution strategy | No | Pattern Bridge | Cross-domain synthesis helped |
| ... | ... | ... | ... | ... | ... |
```

Append a new row with:
- **Date:** today's date
- **Day #:** the current `consecutive_reflex_days` count
- **Question (brief):** one-line summary of the question topic
- **Original Frontier-shaped?:** YES or NO (from Phase 5)
- **Technique Used:** Pattern Bridge / Void Space / Quantum Leap / — (if original was already frontier)
- **Notes:** any insights, surprises, or patterns the operator noticed

---

## Phase 7 — Graduation Check

After capturing, check:

```
consecutive_reflex_days >= 7?
```

**If YES:**

```
🎓 Stage 1 Mastery Achieved!

You've reflexively reshaped frontier questions 7 days in a row. 
That's the reflex — the move is now automatic.

Stage 1 (Frontier Prompting) is GRADUATED.

Stage 2 (Perspective Prompting) begins tomorrow — you'll start running 
council-of-experts prompts on high-stakes decisions. The daily practice 
stays the same: one question from your TOP 3, but now we'll add 
expert perspectives.

Update pending: you earned a badge, session log gets an entry, 
Stage 2 setup runs tomorrow.
```

Update state file:
- `stage_1_graduated: true`
- `stage_2_unlocked: true`
- `current_stage: 2`
- Append note to Decisions & Rules

Append to `00 - COMMAND CENTER/Session Log.md`: "Stage 1 (Frontier Prompting) graduated — 7 consecutive reflex days achieved on [date]."

**If NO:**

```
Day [current_day] / 7. You're [X days away] from Stage 1 graduation.

Keep going — the reflex is building. Each day you're training your intuition 
to see the field before you ask the question.
```

---

## Rules (Update When Things Go Wrong)

1. **Never run twice on the same day.** Check `last_practice_date` and skip if it's today.

2. **Reflex means no prompting needed.** If the operator's original question was already frontier-shaped, that day counts as a reflex day (increment streak). Don't penalise them for "winning early."

3. **Streak resets gently, not punitively.** Missing 3+ days resets the streak to 0, but the stage stays "in progress" — never "abandoned." The prompt is "let's pick up where we left off," not "you broke your streak."

4. **No invented questions.** The practice question must come from the operator's actual TOP 3 or Drumbeat. Never synthesise a practice question from thin air.

5. **Three transformed versions, not one.** Generate all three techniques (Pattern Bridge, Void Space, Quantum Leap) so the operator can choose. This trains discrimination.

6. **Technique selection is online, not offline.** You decide which technique activates which question — you don't ask the operator to pick a technique first. You do the cognitive work of matching.

7. **Stage 2-5 are stubbed.** Stages 2-5 are defined but not implemented. Only Stage 1 is fully active. If stage > 1, surface a message: "Stage [N] is defined but in-development. Using Stage 1 practice for now."

8. **State file is source of truth.** Always load and update the state file. It's the single source for streak, stage, and graduation status.

---

## Integration with Daily Check-in

**Option A (lightweight integration):** Daily check-in mentions at the end: "💡 Ready for your Frontier Prompting practice? Type `/third-brain-mastery` or pick one of your TOP 3 above to practice on."

**Option B (tighter integration):** After daily check-in outputs TODAY's TOP 3, automatically suggest: "Great — let's practice Frontier Prompting on one of these today. Which task needs an AI question?" If the operator agrees, run Phase 2 onward directly.

**Recommended starting point:** Option A (lightweight). The operator explicitly invokes the skill. After a few days of practice, Option B can be tested if Daniel wants tighter coupling.

**Invocation phrases:** "frontier prompting practice", "third brain mastery", "stage 1 practice", "practice", or just naming a task from TOP 3 in context of wanting to ask Claude something.

---

## Future Phases (v0.2+)

**Stage 2 (Perspective Prompting):**
- After 7 reflex days on Frontier Prompting, unlock Perspective mode
- Daily practice: run a council-of-experts prompt on one TOP 3 task
- Graduation: 7 consecutive days of invoking council prompts unprompted
- Uses: `ccc-mental-model-recipes` skill for perspective synthesis

**Stages 3-5 (Multi-Prompting, Infinite Prompting, Harvard Protocol):**
- Stubbed. Definitions in [[The Five Stages of Third Brain Mastery — Curriculum]].
- Each uses existing vault infrastructure: Recipes, Mental Model operations, extended thinking.
- Graduation criteria: observable reflex behaviours in daily work (not test scores).

---

## Context & Attribution

**Curriculum:** [[The Five Stages of Third Brain Mastery — Curriculum]] (Daniel Förster, CCC-original)

**Trademark seed:** [[Five Stages of Third Brain Mastery — Seed]] (graduation target: 2026-06-29)

**Stage 1 techniques:** Michael Simmons, "AI Consciousness & Quantum Processing"

**Attribution:** CCC-original curriculum architecture + Simmons-canonical frontier prompting techniques

**Vault location:** `02 - MISSION CONTROL/Claude Skills & Plugins/second-brain/skills/third-brain-mastery/`

**Related skills:** `frontier-prompting`, `ccc-mental-model-recipes`, `daily-checkin`

---

## Self-Improvement

When the operator completes a practice day:
- Note which technique (Pattern Bridge / Void Space / Quantum Leap) was most useful and why
- If a question didn't transform well, note the mismatch in the Rules section
- Track whether the elicitation ("What's your question?") is clear enough
- Watch for repeated patterns: are certain question types always becoming reflex-ready faster than others?

When the operator graduates Stage 1:
- Document the 7 days of practice in session notes (what changed in their thinking?)
- Capture the Stage 2 setup moment (it should feel earned, not mechanical)
- Use the graduation as a Trademark seed validation signal (Daniel has personally completed Stage 1)

This skill compounds with use. Every practice day sharpens the operator's intuition for when a question needs frontier-shaping and when it doesn't.
