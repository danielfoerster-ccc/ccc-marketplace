---
name: buyback
description: |
  Entry skill for the Buy Back Your Time system. Runs a 5-question assessment to
  identify the operator's current stage and biggest time problem, then routes to the
  right sub-skill: Audit (DRIP Matrix + prioritization), Perfect Week (schedule design),
  Vision (10X Vision), Preloaded Year (annual planning), or Replacement Ladder (hiring
  roadmap). Also explains what the full Buyback System contains and when to use each tool.
  Use this skill whenever the user says "buyback", "buy back my time", "I'm stuck doing
  everything myself", "where do I start with the buyback system", "I need to delegate
  more", "I'm trapped in low-value work", "I'm the bottleneck", "help me figure out
  what to delegate", or any variation of wanting to reclaim time and focus as a business
  operator. Always use this skill as the entry point if the user isn't sure which
  buyback sub-skill to use.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-03-06
  language: English
  framework: Buy Back Your Time — Dan Martell (adapted for CCC operators)
distribution: marketplace-ready
---

# Buy Back Your Time — Entry & Assessment Skill

**Workflow: Assess → Route → Launch**

5-question assessment to find where you are on the Buyback journey, then route directly to the right tool. No fluff.

Session time: ~5 minutes.

---

## The Core Idea (context for routing)

The Buyback Principle: don't hire to grow your business — hire (or delegate) to buy back your time. Then reinvest that time into the work only you can do.

The system has one loop: **Audit → Transfer → Fill.**
1. **Audit** — find what's stealing your time
2. **Transfer** — move that work to someone (or something) else
3. **Fill** — reinvest freed time into your Production Quadrant

There are six tools in this system, each serving a different moment:

| Skill | What it does | When to use |
|---|---|---|
| `buyback:audit` | Time & Energy Audit + DRIP Matrix + prioritization scoring | First diagnostic — always start here |
| `buyback:perfect-week` | Design your ideal weekly schedule | After audit, to protect your reclaimed time |
| `buyback:vision` | Build your 10X Vision (Team · Business · Empire · Lifestyle) | When you've lost the "why" or need a North Star |
| `buyback:preloaded-year` | Annual planning: Big Rocks first, ICE scoring, Stress Test | Start of year or quarter, after vision is clear |
| `buyback:replacement-ladder` | Identify your next hire and how to test-hire them | When you have revenue and are ready to delegate to a person |

---

## Phase 1 — Assessment (5 questions, ~5 min)

Ask one at a time. Keep it fast.

**Q1 — Stage**
"Quick picture of where you are: do you have a team, or are you solo right now? If you have a team, roughly how many people?"

**Q2 — Biggest time drain**
"What's taking up your time that you know shouldn't be? Give me the honest answer — the thing you keep doing even though it's not your highest-value work."

**Q3 — Revenue & pressure**
"What's the current revenue situation — pre-revenue, early revenue (under €5k/month), or growing with some cash flow? This affects which tools are most useful right now."

**Q4 — The bottleneck**
"Where are you the bottleneck right now? Sales, delivery, admin, all three — or something else?"

**Q5 — Goal horizon**
"What's the most urgent thing to fix: your *daily schedule* (you're doing everything and it's chaos), your *longer-term direction* (you're not sure where this is all going), or your *team/delegation* (you need to hand things off but don't know how)?"

---

## Phase 2 — Route

Based on the answers, route directly with a clear recommendation. Be decisive.

**Routing logic:**

- Solo + pre-revenue + chaotic schedule → **Start with `buyback:audit`** (the core diagnostic). Then `buyback:perfect-week`.
- Solo + early revenue + direction uncertainty → **Start with `buyback:vision`**, then `buyback:preloaded-year`.
- Has team + delegation problems → **`buyback:audit`** first to find what to delegate, then **`buyback:replacement-ladder`**.
- Has team + wants to restructure their week → **`buyback:perfect-week`** directly.
- Knows they want annual planning → **`buyback:preloaded-year`** directly (check if vision exists first).
- Says "I don't know where to start" → Always **`buyback:audit`**. It's the universal entry point.

Give the recommendation as a concrete path, for example:
> "Based on what you've described, the right starting point is the Buyback Audit — a structured session to map every task you're doing, score each one, and produce a concrete delegation roadmap. Want to run it now?"

Then offer to launch the recommended skill in the same session.

---

## Rules

- Never skip the assessment to go straight to a recommendation. The 5 questions take 5 minutes and prevent routing someone to the wrong tool.
- If the user already knows which skill they want, confirm briefly and launch it — don't force the full assessment.
- The audit is the right starting point for 80% of operators. When in doubt, route there.
- Keep operator language throughout. No spiritual frameworks, no "journeys", no "alignment".
- The vision skill is not a luxury — it's a decision-making accelerator. Frame it that way.
- If the user asks what the Buyback System is, use the table above. Don't improvise a description.
