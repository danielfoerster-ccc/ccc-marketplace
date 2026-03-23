---
name: daily-checkout
description: |
  Runs a fast 3-minute end-of-day shutdown ritual. Reads today's daily check-in
  file, surfaces the TOP 3 and Drumbeat, then guides through a lean close-out:
  what got done, what carries forward, and one reflection. Updates the End-of-Day
  section of the existing check-in file and closes the day cleanly.
  Use this skill whenever the operator says "checkout", "end of day", "close the day",
  "daily checkout", "shutdown", "wrap up today", "done for the day", "day review",
  "close out today", or any variation of ending the workday.
  Run this before shutting down — takes 3 minutes.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-03-06
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

## Phase 3 — Reflection (3 questions)

**Q3a** "What went well today?"
**Q3b** "What needs work?"
**Q3c** "What should never happen again?"

Keep each to one sentence. Calibration, not self-critique.

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

**What went well:** [sentence]
**What needs work:** [sentence]
**Never again:** [sentence]
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

- Keep it to 3 questions max. This is a shutdown ritual, not a second planning session.
- Don't re-ask things that are already clear from the Drumbeat. Pre-fill and confirm.
- The reflection question (Q3) is brief and forward-looking. Don't linger on it.
- If the operator just wants to close quickly ("done, checkout"), accept a one-word answer and fill in what you can from the Drumbeat context.
- Always update the file — even if the answers are minimal. A closed day has a record.
- Keep all output in English.
