# Integration Guide: Third Brain Mastery + Daily Check-in

## Quick Start (2026-05-01)

The `third-brain-mastery` skill runs as a follow-up to `daily-checkin`. Here's how to activate it:

### Setup (one-time)

1. **Install the updated second-brain plugin (v1.6.0)** containing the new skill
2. **Create the state file** at `02 - MISSION CONTROL/skill-state/third-brain-mastery.json`:
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
3. **Create the mastery log file** at `00 - COMMAND CENTER/Daily Notes/[current week]/Third Brain Mastery Log.md`:
   ```markdown
   # Stage 1 Mastery Log — Frontier Prompting Reflex
   
   *Tracks consecutive reflex-graduation days. 7 consecutive = Stage 1 graduation.*
   
   | Date | Day # | Question (brief) | Original Frontier-shaped? | Technique Used | Notes |
   |------|-------|------------------|---------------------------|----------------|-------|
   ```

### Daily Workflow (recommended)

**Option A: Lightweight (manual invocation)**

After running daily check-in and locking your TOP 3:

```
Daniel: frontier prompting practice
```

or

```
Daniel: Want to practice frontier prompting on one of today's TOP 3?
```

The skill will:
1. Load your TOP 3 from the daily check-in file
2. Ask which task needs an AI question
3. Run Frontier Prompting Protocol
4. Capture to the mastery log

**Option B: Tighter integration (suggested by daily-checkin)**

After daily-checkin outputs TOP 3, it says:

```
💡 Ready for your Stage 1 Frontier Prompting practice? 
Pick one of your TOP 3 that needs an AI question for today.
Type /third-brain-mastery or just tell me which task.
```

### Expected Timing

- **First practice (Day 1):** 10 minutes (discovery, explanation, three frontier versions)
- **Days 2-7:** 5-7 minutes (operator increasingly reflex-ready)
- **Day 7:** Graduation + Stage 2 setup

### What Happens at Day 7

When consecutive_reflex_days reaches 7:

1. Skill displays graduation message
2. State file updates: `stage_1_graduated: true`, `current_stage: 2`
3. Session Log gets an entry: "Stage 1 graduated — [date]"
4. Stage 2 (Perspective Prompting) setup begins tomorrow

---

## Handoff: Third Brain Mastery ↔ Daily Check-in

### Information flow

**Daily Check-in → Third Brain Mastery:**
- Rock Health status (context for question selection)
- Week's TOP 3 (the pool from which to select practice questions)
- Day of week (for streak tracking)

**Third Brain Mastery → Daily Check-in:**
- Optional: suggest a skill to use on the practice question
  (e.g., "For your GTM narrative question, the frontier-prompting skill is active")

### File locations Daniel will see

**Daily check-in creates:** `00 - COMMAND CENTER/Daily Notes/[week]/YY-MM-DD - Daily Work Notes.md`

**Third Brain Mastery creates/updates:**
- `02 - MISSION CONTROL/skill-state/third-brain-mastery.json` (streak tracking)
- `00 - COMMAND CENTER/Daily Notes/[week]/Third Brain Mastery Log.md` (practice log)
- `00 - COMMAND CENTER/Session Log.md` (graduation event)

---

## FAQ

**Q: What if I skip a day?**
A: Skill will gently prompt "You took a few days — let's pick up where we left off." Streak resets to 0 only if you skip 3+ days. The stage stays "in progress."

**Q: What if today's TOP 3 don't need AI questions?**
A: That's okay. The skill will note "No AI questions today — you've learned discrimination." Still counts as a practice day.

**Q: Can I run the skill multiple times per day?**
A: No. The skill checks `last_practice_date` and skips if you've already practiced today.

**Q: What happens when I graduate Stage 1?**
A: Stage 2 (Perspective Prompting) unlocks. Same daily rhythm, different move. Skill will guide the transition.

**Q: Can I force a reset or restart?**
A: Yes. Manual edit to `third-brain-mastery.json` (e.g., set `consecutive_reflex_days: 0` if you want to restart the streak). Or reach out and Daniel can reset via Decisions & Rules.

---

## For Daniel: How to Know It's Working

**Signs of progress (Days 1-3):**
- You notice the three techniques and which one fits your question type
- The frontier versions feel different from how you normally ask questions
- You're surprised by the cross-domain patterns (that's good — that's field activation)

**Signs of reflex (Days 4-7):**
- Your original questions start sounding more like frontier versions
- You catch yourself asking "what perspectives illuminate this?" before the skill prompts
- The three techniques become automatic — you can spot which one fits in seconds

**Signs of mastery (Day 7 +):**
- You're reshaped 7 questions in a row without needing the skill to reshape them
- You can smell a linear question (step-by-step thinking) from 100 yards away
- You reflexively ask Claude field-activating questions without consulting a recipe

That's Stage 1 graduation. It doesn't mean you've "learned" Frontier Prompting; it means you **are** a frontier-prompting operator.

---

## Future: Stages 2-5

Stage 1 implementation is complete and ready for launch. Stages 2-5 are defined but stubbed:

- **Stage 2 (Perspective Prompting):** Daily council-of-experts prompts on high-stakes decisions
- **Stage 3 (Multi-Prompting):** Parallelising questions across Claude + GPT + Gemini
- **Stage 4 (Infinite Prompting):** Weekly extended-thinking sessions for deepest questions
- **Stage 5 (Harvard Protocol):** AI for psychological scaffolding (attachment, identity, regulation)

Each stage will follow the same pattern: daily practice, 7-day reflex graduation, gentle streak resets on missed days.

---

## Contact / Feedback

When the skill works well, or when you spot something that needs refinement, note it and update `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` with a new rule or correction. The skill is designed to compound with use — every correction sharpens the next practice.
