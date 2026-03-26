---
name: daily-checkout
description: |
  Runs a fast 3-minute end-of-day shutdown ritual. Reads today's daily check-in
  file, surfaces the TOP 3 and Drumbeat, then guides through a lean close-out:
  what got done, what carries forward, and a three-part reflection (what went well,
  what needs work, what should never happen again). Updates the End-of-Day
  section of the existing check-in file and closes the day cleanly.
  Use this skill whenever the operator says "checkout", "end of day", "close the day",
  "daily checkout", "shutdown", "wrap up today", "done for the day", "day review",
  "close out today", or any variation of ending the workday.
  Run this before shutting down — takes 3 minutes.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.1.0
  created: 2026-03-06
  updated: 2026-03-26
  language: English
  framework: CCC Planning System — daily close-out
  distribution: marketplace-ready
---

# Daily Checkout Skill

**Workflow: Load Today → Review Progress → Close Out → Update File**

3-minute end-of-day ritual. No bloat. Close the day, protect tomorrow.

---

## Phase 0 — Context Load (automatic)

1. Find today's daily check-in file: search for today's date in `00 - COMMAND CENTER/Daily Notes/`
   - Format: `YY-MM-DD - Daily Check-in.md`
2. Read the file — surface the TOP 3 and current Drumbeat status in one compact block:

```
Today's TOP 3:
1. [Task] — [current status]
2. [Task] — [current status]
3. [Task] — [current status]

Drumbeat: [X] Done · [Y] Carry-forward · [Z] To Do
Revenue First: [Done / Not done]
```

3. If no check-in file exists for today: "No check-in found for today — let's do a quick close-out from scratch." Then proceed without context.

---

## Phase 1 — TOP 3 Review (1 question)

**Q1**
"How did your TOP 3 go today? Mark each as Done, Partial, or Not done — and if anything's partial or not done, one sentence on why."

Don't ask the user to repeat what's already marked Done in the Drumbeat. Pre-fill obvious completions and only ask for confirmation or the gaps.

---

## Phase 2 — Carry-Forward (1 question)

**Q2**
"What's carrying forward to tomorrow or next week? Anything urgent for tomorrow specifically?"

If the Drumbeat already has Carry-forward items, read them out and ask: "Anything to add or change?"

---

## Phase 3 — Reflection (3 questions, always in this order)

Ask these three questions in sequence — never collapse them into one:

**Q3a — What went well today?**

**Q3b — What needs work?**

**Q3c — What should never happen again?**

Keep each answer brief. This is calibration, not a retrospective. The three-part format is fixed — do not substitute a single "what would have made today better?" or any other variant.

---

## Phase 4 — Update the File

Update the End-of-Day section of today's check-in file:

```markdown
## End-of-Day
**TOP 3 completed:** [Yes / Partial / No]
- [✅ / ⏳ / ❌] [Task 1] — [note if partial/not done]
- [✅ / ⏳ / ❌] [Task 2] — [note if partial/not done]
- [✅ / ⏳ / ❌] [Task 3] — [note if partial/not done]

**Revenue First done:** [✅ Yes / ❌ No]

**Carry-forward to tomorrow:**
- [Task]
- [Task]

**Carry-forward to next week:**
- [Task]
- [Task]

**What went well:**
- [point]

**What needs work:**
- [point]

**What should never happen again:**
- [point]
```

Also update any Drumbeat rows that changed status during the checkout conversation.

Save the updated file (overwrite — same path).

---

## Phase 5 — Close Out

After saving, say:

*"Day closed. [Short 1-line summary of the day — e.g. 'Solid revenue-first day. IWD campaign shipped.'] See you tomorrow."*

If there's an urgent carry-forward item for tomorrow, surface it once:
*"First thing tomorrow: [item]."*

---

## Rules

1. Keep it lean — 5 questions total (Q1 + Q2 + Q3a/b/c). This is a shutdown ritual, not a second planning session.
2. Don't re-ask things that are already clear from the Drumbeat. Pre-fill and confirm.
3. The reflection is always three parts — What went well / What needs work / What should never happen again — in that order. Never substitute a single "what would have made today better?" question. Never collapse the three into one. This is non-negotiable.
4. If the operator just wants to close quickly ("done, checkout"), accept short answers and fill in what you can from the Drumbeat context. Still ask all three reflection questions, even briefly.
5. Always update the file — even if the answers are minimal. A closed day has a record.
6. Keep all output in English.

---

## Self-Improvement

When a reflection question consistently produces shallow answers, consider whether the framing can be sharpened. When the operator skips a question ("it's okay / nothing"), log it briefly and move on — don't push. If a new failure mode appears, add it as a rule above.
