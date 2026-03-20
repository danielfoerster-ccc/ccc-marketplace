---
name: audit
description: |
  Runs the Buyback Audit — the core diagnostic of the Buy Back Your Time system.
  Guides the operator through a complete Time & Energy Audit, applies the DRIP Matrix
  to categorize every task (Delegate / Replace / Invest / Produce), calculates the
  operator's Buyback Rate, and scores tasks using a combined ICE + Opportunity Cost
  model to produce a prioritized delegation roadmap. Outputs a dated audit document
  to the vault. Use this skill whenever the operator says "buyback audit", "DRIP matrix",
  "time audit", "what should I delegate", "I'm doing too many things", "help me figure
  out what only I should be doing", "I need a delegation plan", or any time the operator
  wants to identify their highest-leverage work and remove everything else. This is the
  foundation skill — run it before Perfect Week or Replacement Ladder.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.1.0
  created: 2026-03-06
  updated: 2026-03-20
  language: English
  framework: Buy Back Your Time — Dan Martell (DRIP Matrix + ICE + OCA scoring)
---

# Buyback Audit Skill

**Workflow: Task Dump → Score → Categorize → Prioritize → Roadmap**

The most valuable hour you'll spend on your business. A complete map of where your time goes and a concrete plan for what to do about it.

Session time: ~60 minutes.

---

## Background: Why This Works

Most operators are stuck because they're doing work they should have handed off — not because they're not working hard enough. The DRIP Matrix makes this visible. You score every task on two axes: how much energy it gives you, and how much it returns in business value. The quadrant tells you what to do with each task.

**The DRIP Matrix:**

| | Low Return | High Return |
|---|---|---|
| **Low Energy** | **D**elegate — pass it immediately | **R**eplace — document and hire for it |
| **High Energy** | **I**nvest — personal development, do yourself | **P**roduce — your Production Quadrant |

Your goal: ruthlessly move time from D, R, and I into P.

**Your Buyback Rate** is the minimum value of one hour of your time. Any task worth less than this rate per hour should be handed off. Formula:
> Desired annual income ÷ 2,000 working hours = Buyback Rate (€/hr)

---

## Phase 0 — Context Load (automatic)

Before asking anything:
1. Check if a previous buyback audit exists: search for `*Buyback Audit*` in `03 - OPERATIONS/Buyback System/`
2. If found, read it and surface: "I found a previous audit from [date]. I'll use it as a baseline — we're updating, not starting from scratch."
3. If not found, note: "No previous audit found — we're building from scratch."

---

## Phase 1 — Buyback Rate (1 question, ~3 min)

**Q1**
"First: what's your target annual income — the number that would make this year feel like a real success? Don't anchor to current revenue. Name the goal."

Calculate and state the Buyback Rate:
> "Your Buyback Rate is €[X]/hour. Any task you're doing that's worth less than this should leave your plate."

Keep this number visible throughout the session.

---

## Phase 2 — Task Dump (1 input, ~15 min)

**Q2**
"Now let's map everything you're actually doing. Walk me through a typical week — what are all the tasks, activities, and responsibilities that land on your plate? Include everything: the recurring stuff, the one-offs, the things you shouldn't be doing but are. Don't filter — just dump."

As the user lists tasks, capture them in a running list. Prompt for any obvious gaps:
- "What about email and comms management?"
- "What about client delivery or fulfillment tasks?"
- "Admin, invoicing, bookkeeping?"
- "Content creation or marketing activities?"
- "Sales calls, proposals, follow-ups?"
- "Systems and tools maintenance?"

Keep going until the list feels complete. Confirm: "Is that everything? Anything you're doing that we haven't named yet?"

---

## Phase 3 — Score Each Task (interactive, ~20 min)

For each task on the list, ask the operator to score two dimensions:

**Energy Score (E): 1–5**
- 1 = drains you completely
- 3 = neutral
- 5 = energizes you, you'd do it for free

**Return Score (R): 1–5**
- 1 = low business value, someone else could do it equally well
- 3 = moderate value
- 5 = high direct return — revenue, client retention, strategic leverage

To keep this moving, batch similar tasks together rather than scoring one at a time. For example: "For all the admin and email tasks — what's a typical energy score and return score for that category?"

Then apply the DRIP Matrix:
- E ≤ 2, R ≤ 2 → **Delegate** (remove immediately)
- E ≤ 2, R ≥ 3 → **Replace** (document and hire for it)
- E ≥ 3, R ≤ 2 → **Invest** (personal development — keep but don't over-invest)
- E ≥ 3, R ≥ 3 → **Produce** (your Production Quadrant — protect this time)

---

## Phase 4 — Prioritization Scoring (for Delegate + Replace tasks, ~10 min)

For any task in the **Delegate** or **Replace** quadrant, score it with a combined ICE + Opportunity Cost formula to decide what to remove *first*:

**Priority Score = Time × (11 − Importance) × (11 − Complexity) × Goal-Alignment Multiplier**

- **Time**: hours per week spent on this task (1–10)
- **Importance**: how important it is that *you* specifically do it (1–10, lower = easier to delegate)
- **Complexity**: how complex/specialized it is (1–10, lower = easier to hand off)
- **Goal-Alignment Multiplier**: 10 if NOT aligned to your main goals (i.e., a distraction), 1 if it is

Higher score = delegate this first.

Also apply a quick **ICE check** for any task you're considering replacing with a new hire or system:
- **Impact** (revenue effect 1–10) + **Confidence** (will it work 1–10) + **Ease** (implementation 1–10)
- Top ICE score = highest leverage delegation to implement

Produce a ranked delegation list.

---

## Phase 5 — 5 Time Assassins Check (5 min)

Quick diagnostic against the five common patterns where operators bleed time without realizing it:

1. **Diving** — doing work below your level because it's faster or feels good
2. **Rescuing** — solving your team's problems instead of coaching them to solve their own
3. **Administrating** — managing paperwork, systems, logistics that could be handled by someone else
4. **Producing** — making things (content, reports, decks) that others could produce
5. **Performing** — showing up places where your presence isn't actually needed

For each one: "Does this show up in what you listed? How often?"

This usually surfaces a few tasks the operator missed in the dump phase.

---

## Phase 6 — Output

Save a new file at:
`03 - OPERATIONS/Buyback System/[YYYY-MM-DD] - Buyback Audit.md`

Use this exact template:

```markdown
# Buyback Audit — [Date]
**Buyback Rate:** €[X]/hour
**Total tasks audited:** [N]

---

## DRIP Matrix Summary

### 🔴 Delegate (remove immediately)
| Task | E | R | Priority Score | Action |
|---|---|---|---|---|
| [Task] | [1-5] | [1-5] | [score] | [specific next action] |

### 🟡 Replace (document + hire for)
| Task | E | R | ICE Score | Action |
|---|---|---|---|---|
| [Task] | [1-5] | [1-5] | [score] | [what to document / who to hire] |

### 🔵 Invest (keep, but cap time)
| Task | E | R | Note |
|---|---|---|---|
| [Task] | [1-5] | [1-5] | [why you're keeping it] |

### 🟢 Produce (protect this time)
| Task | E | R | Note |
|---|---|---|---|
| [Task] | [1-5] | [1-5] | [how to protect more of this] |

---

## Top 5 Delegation Priorities (ranked by Priority Score)

1. **[Task]** — Priority Score: [X] — Action: [specific step]
2. **[Task]** — Priority Score: [X] — Action: [specific step]
3. **[Task]** — Priority Score: [X] — Action: [specific step]
4. **[Task]** — Priority Score: [X] — Action: [specific step]
5. **[Task]** — Priority Score: [X] — Action: [specific step]

---

## 5 Time Assassins Found

| Assassin | Present? | Example | Estimated hrs/week |
|---|---|---|---|
| Diving | Yes / No | | |
| Rescuing | Yes / No | | |
| Administrating | Yes / No | | |
| Producing | Yes / No | | |
| Performing | Yes / No | | |

---

## Production Quadrant — Protect This

These are your highest-value activities. The goal is to move more time here:
- [Task 1]
- [Task 2]
- [Task 3]

---

## Next Steps

**Immediate (this week):**
- [ ] [Delegate or stop this task]
- [ ] [Delegate or stop this task]

**Short-term (next 30 days):**
- [ ] [Document this process for handoff]
- [ ] [Set up system / tool to replace this]

**Longer-term (when ready to hire):**
- See Replacement Ladder skill for hiring sequence
```

After saving, confirm the file path and say:
"Your delegation roadmap is saved. The top priority on your list is [#1 task]. Start there — one transfer at a time."

---

## Anti-Patterns

| Situation | Error | Why it fails | Correct approach |
|-----------|-------|--------------|-----------------|
| Operator lists only 5–8 tasks | Accepting the short list without prompting | Short lists produce a shallow audit — real delegation opportunities stay hidden | Use the gap prompts (email? admin? sales? delivery?) to surface at least 15–20 tasks before scoring |
| Operator agonises over every task score | Spending 2+ minutes per task during Phase 3 | Kills session momentum; DRIP is designed for fast intuitive scoring | Score in batches by category; remind the operator "this should feel fast — there are no wrong scores" |
| Every task lands in "Produce" quadrant | Operator over-scores their own energy and return | If everything is high-value, nothing is a priority — the audit produces no delegation roadmap | Push back: "If everything is Produce, you have no delegation lever. Score against your Buyback Rate, not your feelings about the work." |
| Operator scores admin as high-return (R=5) | "But someone has to do it" rationalisation | Admin is low-return by definition — only its *necessity* is high, not its strategic return | Reframe: "Return = what it returns in revenue or strategic leverage, not whether it's necessary. Admin is always low-return, even if it's essential." |
| Priority Score phase is skipped | Moving straight from DRIP to output | The Priority Score is the entire point — without it, the operator doesn't know what to delegate *first* | Always complete Phase 4 before Phase 6. If time is short, score the top 5 Delegate tasks only. |

---

## Rules

- The task dump phase is critical. Don't rush it. A short list produces a shallow audit.
- Never skip the Buyback Rate calculation. It anchors everything else.
- Score in batches for similar task categories to keep momentum.
- DRIP is a 2×2 matrix — resist the urge to make every task a nuanced case. Scores should take seconds.
- Priority Score is for deciding *what to delegate first*, not whether to delegate. Everything in D and R quadrant gets delegated eventually.
- If the user is solo and pre-revenue, Claude Cowork is the primary delegation target. Frame the D and R quadrant tasks as "Claude tasks" where appropriate.
- Always create a new dated file. Never overwrite.
- Keep all output in English.

## Self-Improvement

When a task category consistently confuses users during scoring, add a clarifying example to Phase 3.
When a task type appears repeatedly that doesn't fit the DRIP categories cleanly, add a note to the Rules section.
