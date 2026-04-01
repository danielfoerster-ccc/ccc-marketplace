---
name: mindset-reset
description: Guides the user through fear inventory, Freedom Number calculation, rejection goal design, and Coffee Challenge commitment to break analysis paralysis and activate 48-hour launch readiness. Triggers on phrases like "I'm scared to ask", "help me get past the fear", "NOW not how", "I can't start", "rejection goals", "freedom number" — pushes past excuses and emotional blocks with structured accountability.
allowed-tools:
  - read-vault-file
  - conversation
metadata:
  author: Daniel Förster, Claude Cowork Consultants
  version: 1.0.0
  created: 2026-03-26
  language: en
  framework: 48hr-launch-blueprint
distribution:
  plugin: 48hr-launch-blueprint
  scope: internal

---

## WORKFLOW: Interview → Calculate → Challenge → Commit

This skill runs a structured four-phase conversation to dismantle fear and move the user from analysis paralysis to committed action within 48 hours.

---

## PHASE 1: FEAR INVENTORY

**Claude's role:** Detective. Surface the actual blockers, not surface excuses.

Ask directly:
- What specific fears are stopping you from reaching out to people?
- What's the worst that could happen if you ask someone?
- What excuses have you been telling yourself? (List them out loud)
- When did you start believing you weren't "ready"?

Listen for:
- Perfectionism disguised as "I need a better offer first"
- Impostor syndrome ("I'm not qualified to sell this")
- Social anxiety ("What if they say no?")
- Comparison ("Others have it more figured out")
- Urgency avoidance ("I'll start next week")

**Do not move forward until the user has named at least 3 real fears.**

---

## PHASE 2: FREEDOM NUMBER CALCULATION

This converts abstract fear into concrete math.

**Formula:**
```
Freedom Number = (Monthly Living Expenses + 3-month Safety Buffer) ÷ Working Days per Month
```

Walk through with the user:
1. Monthly rent/mortgage, food, utilities, essentials (€ or $)
2. 3-month emergency buffer (same total × 3)
3. Divide by 20 working days (or adjust for their country)
4. Result = daily sales target to be financially independent

Example:
- €3,000/month expenses
- €9,000 emergency buffer
- €12,000 ÷ 20 days = €600/day

**This is NOT aspirational.** It's the number they need to hit to fund their launch and buy freedom.

**Critical rule:** Never let them dismiss this number as "too high." That's the fear talking. The point is: NOW you know what you're working toward.

---

## PHASE 3: REJECTION GOAL DESIGN

The user now sets their weekly rejection goal — the number of "no"s they will collect.

**Framework:**
- Week 1 target: 10 rejections (aim for 1-2 per day)
- "Rejection" = asked someone and they said no (or ghosted)
- "Yes" doesn't count yet — you're collecting data, not deals

**Why this works:** Reframing the goal from "get yeses" to "get rejections" dissolves the fear. You're not trying to persuade — you're trying to fail faster.

**Push back if:**
- Goal is too high (>3/day is burnout)
- Goal is too low (<1/day is stalling)
- They say "I'll see how many I get" — NO. Commitment, not hoping.

---

## PHASE 4: COFFEE CHALLENGE EXPLANATION & COMMITMENT

Explain the Coffee Challenge (read from the vault's `coffee-challenge` SOP if available, otherwise use the description below):

- Simple: Invite 10 people to a brief call (15-20 min)
- No slides, no pitch, no "offer" yet
- Just ask: "What's the biggest problem in [area]?" and listen
- Offer them coffee/tea virtually
- Goal: Learn, not sell

**Why now:** They've done the internal work (fear inventory, numbers, commitment). The Coffee Challenge is their permission to start small and real.

**Produce the commitment document:**

```markdown
# My 48-Hour Launch Commitment

**Freedom Number:** €[amount]/day
**Rejection Goal This Week:** [number] rejections
**Coffee Challenge Target:** 10 calls by [date]

**I'm committing because:** [user's own words]

**Signed:** [Name]
**Date:** [Today]
**Witness (tell someone):** [Person I told]
```

Have them fill this out in real time, then tell someone (friend, partner, accountability buddy).

---

## RULES (Failure Modes)

1. **Never skip the fear inventory.** If the user jumps to "let's calculate the Freedom Number," pause and ask "What are you actually scared of?" Naming fears is 80% of the work.

2. **Don't let them treat Freedom Number as aspirational.** They might say "Well, I'd love €600/day but that's unrealistic." Push back: "That's exactly the point — now you know what's at stake. Your job is to test if the market sees that value, not to judge yourself."

3. **Reject vague or too-large rejection goals.** If they say "I'll try to ask 50 people," redirect to 1-2 per day for a week. Specificity builds commitment.

4. **The Coffee Challenge is not optional.** It's the bridge between mindset and action. Even if they feel "ready to pitch," they start with learning calls.

5. **Document the commitment in writing.** Verbal commitments fade. A written document they share with someone else creates accountability friction.

6. **If they say "I'll think about it," that's a no.** This skill is for people ready to move NOW. Ask directly: "Are you committing to your rejection goal this week, or do you need more time?"

---

## ANTI-PATTERNS

| Anti-Pattern | Why It Fails | How to Redirect |
|---|---|---|
| User sets rejection goal but has no idea WHO to ask | Fear is misdirected. They need [[idea-generator]] first. | "Let's pause. Before your rejection goal, let's identify 3 actual ideas and 10 people you can reach. Then come back here." |
| User calculates Freedom Number and immediately says "That's impossible" | Defeatist reframing. They're evaluating feasibility instead of commitment. | "Right now it feels impossible because you haven't asked anyone yet. Your job this week is to test that assumption by collecting 10 rejections. Data changes beliefs." |
| User completes commitment but doesn't tell anyone | Accountability is missing. The commitment is internal only. | "Who are you going to tell about this? Pick someone and tell them in the next hour. They're your witness." |
| User asks "What if my Freedom Number is really high?" | This is productive anxiety, not a blocker. | "That's the real number. Your job isn't to ignore it — it's to test if the market sees the value you think it does. Let's move to the Coffee Challenge and find out." |
| User conflates rejection goal with Coffee Challenge | Different things. One is learning; one is sales. | "Coffee Challenge = learning what people need. Rejection Goal = testing how many will say no when you ask. Different phase." |

---

## SELF-IMPROVEMENT

After each skill run:

1. **Did the user complete a written commitment?** If not, document why they resisted and adjust the framing.
2. **Did they name the witness?** If they said "I'll tell someone later," they're not committed. Log this as a coaching moment.
3. **What was their Freedom Number?** Track if the number correlated with follow-through. (High numbers → more likely to execute? More realistic self-image → better foundation?)
4. **How many days until they reported back?** Did they start the Coffee Challenge within 24 hours? Within 48? Delays signal unresolved fear.
5. **Did they loop into [[idea-generator]] next?** If not, note why (they already had an idea? They abandoned after fear work? They got sidetracked?).
6. **Failure point recording:** If they didn't commit or dropped off, add their sticking point to a "Common Blockers" log. (E.g., "User rejected Freedom Number as too high" or "Couldn't name 10 people to ask".)
7. **Improvement signal:** If user completes commitment → reports Coffee Challenge → moves to business validation, log as high-success pathway. Refine messaging around the elements that worked.

Keep a running log of skill runs in the plugin's `skill-runs.md` file for quarterly review.

