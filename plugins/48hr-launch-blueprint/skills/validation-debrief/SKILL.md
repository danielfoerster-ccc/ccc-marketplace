---
name: validation-debrief
description: Collects and analyzes 48-hour outreach results using a diagnostic framework. Builds the Validation Scorecard, runs rejection analysis via four diagnostic questions, and produces a HIT/SOFT-MISS/HARD-MISS/GHOST-CITY decision with next-action plan. Triggers on "validation debrief", "here are my results", "did I validate", "nobody bought", "should I pivot", "48 hours are up", "scorecard", "what do my results mean".
allowed-tools:
  - read
  - write
  - search
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: "1.0.0"
  created: "2026-03-26"
  language: en
  framework: 48hr-launch-blueprint
distribution:
  plugin: 48hr-launch-blueprint
  category: process-skill
---

# Validation Debrief

**Workflow: Collect → Analyze → Decide → Plan**

Claude collects outreach results from the Dream Ten, runs the diagnostic framework on rejections, analyzes the Validation Scorecard, and recommends HIT/PIVOT/KILL with a clear next-action plan.

---

## Named Workflow

### Phase 1: Collect Outreach Results

1. **Review the Dream Ten outreach log**
   - Ask user to provide: all 10 names, who responded, what they said, when messages were sent
   - If fewer than 10 contacted, address that first: "You only reached 7. Let's complete the other 3 before we analyze."
   - Do NOT proceed to analysis with incomplete data

2. **For each "yes" response:**
   - What specifically did they say yes to?
   - Did they commit money or just say "that sounds cool"?
   - Only count: paid, signed agreement, scheduled implementation, or clear binding commitment
   - Soft interest ("great idea!", "I'm interested") doesn't count yet
   - Get details: what problem did they mention? What objection didn't come up?

3. **For each "no" response:**
   - Run the 4 diagnostic questions from [[48hr-Launch-Blueprint SOP - Rejection Diagnostics]]:
     - Q1: "Did they say the problem doesn't exist for them?" → Wrong Problem
     - Q2: "Was the price the issue?" → Wrong Price
     - Q3: "Did they say the timing is off (too early, too busy)?" → Wrong Timing
     - Q4: "Did they suggest someone else who might want it?" → Right Problem, Wrong Person
   - Log which diagnostic category each rejection falls into
   - For every "no," ask: "Who else do you know with this problem?" Mine for referrals

4. **For each "ghost" (no response):**
   - When was the message sent? (If within 24 hours, too early to call it a ghost)
   - Was a follow-up sent? If not, note: "Ghost → Data point unknown until follow-up"
   - If 48+ hours with no response and no follow-up, log as: Ghost (no signal)

### Phase 2: Build the Validation Scorecard

Create a simple summary:

```
VALIDATION SCORECARD
====================
Total asks: 10
Yeses (money/commitment): [X]
Nos (with diagnostic): [A wrong problem, B wrong price, C wrong timing, D wrong person]
Maybes (interested, no commitment): [Y]
Ghosts (no response + 48+ hours): [Z]
Follow-ups needed: [count]

REJECTION PATTERN
=================
Dominant diagnostic:
- Wrong Problem: [#] comments
- Wrong Price: [#] comments
- Wrong Timing: [#] comments
- Wrong Person: [#] comments
```

### Phase 3: Apply the Decision Framework

#### HIT (3+ paying customers or binding commitments)
- **Decision:** VALIDATED
- **What it means:** You have proof of demand. Customers are real.
- **Next action:**
  - Confirm delivery scope with each customer (what did they actually agree to?)
  - Define MVP scope: what's the minimum viable product/service to deliver?
  - Set delivery timeline and first milestone
  - Document what specifically resonated in your messaging (link to [[dream-ten-launcher]] output)

#### SOFT MISS (1-2 customers + actionable rejection data)
- **Decision:** PIVOT
- **What it means:** You have signal but not enough. The rejection data tells you what to change.
- **Analysis:**
  - Which diagnostic question dominated the rejections? (wrong problem, price, timing, person)
  - Did any customer feedback suggest a better framing or audience?
- **Next action:**
  - Pick ONE variable to change: problem scope, price point, target audience, or positioning
  - Do NOT change everything at once — you'll lose the learning signal
  - New Dream Ten list (same 10 or subset + new names)
  - New offer variation or script
  - Run another 48-hour cycle with the new variable
  - Document the hypothesis: "We're testing [variable] because [diagnostic insight]"

#### HARD MISS (0 customers + common refrain: "not a problem for me")
- **Decision:** KILL
- **What it means:** The core assumption failed. The problem doesn't resonate or doesn't exist.
- **Process the loss:**
  - Don't sugarcoat it. The data says this idea doesn't work.
  - Frame it: "This idea didn't validate. That's the method working. Here's what we learned."
  - Extract the learning: What assumption was wrong? (problem size, customer type, willingness to pay, market timing)
  - Post-mortem: Document what you'd do differently next time
- **Next action:**
  - Return to [[business-model-validator]] or [[idea-validator]] to generate a new idea
  - Carry forward: "Customers care about [X] but not [Y]" — log for future reference

#### GHOST CITY (majority no responses, <2 yeses)
- **Decision:** DIAGNOSE BEFORE DECIDING
- **What it means:** You don't have enough data to conclude anything.
- **Diagnostic questions:**
  - Were all 10 messages actually sent? (Did user get cold feet after "launch"?)
  - Is the Dream Ten too cold? (Mostly strangers = low response)
  - Is 48 hours too short for your channel? (Email: often no; WhatsApp: usually yes)
  - Did follow-ups go out? (Some ghosts turn to responses with one follow-up)
- **Next action:**
  - If messages weren't sent: overcome the activation block, send them now, wait another 48 hours
  - If Dream Ten is too cold: expand with warm intros, resend with social proof ("Sarah already said yes")
  - If it's a channel issue: switch to faster channels (WhatsApp over email)
  - If no follow-ups: send one follow-up to every ghost, wait 24 more hours
  - Then re-run the debrief

### Phase 4: Produce Next-Action Plan

**Format:**

```
DECISION: [HIT | PIVOT | KILL | DIAGNOSE]

REASONING:
[Summary of scorecard data + which diagnostic question dominated]

NEXT ACTIONS (Priority order):
1. [First concrete step with owner and timeline]
2. [Second step]
3. [Third step]

LEARNING CAPTURED:
- What assumption was tested: [X]
- What the data showed: [Y]
- Carry forward to next idea: [Z]
```

---

## Rules (Failure Modes)

1. **Never accept "they said no" without diagnostic data.** Always push for the 4 diagnostic questions: problem, price, timing, person. Undiagnosed rejections are wasted data.

2. **Never count "interested" or "great idea!" as validation.** Only money, signed agreements, or binding commitments count. Interest is a hygiene factor. Payment is proof.

3. **When recommending a pivot, change only ONE variable at a time.** Price, audience, or problem framing — not all three. If you change everything, you learn nothing. The learning signal gets lost.

4. **Don't sugarcoat a kill decision.** If the data says kill, say kill. But frame it constructively: "This idea didn't work. The data tells us why. Here's what to try next." It's not failure; it's learning at speed.

5. **Always mine rejection data for referrals.** "Who else might want this?" often produces the best leads for the next iteration or a different idea. Every "no" person knows a "yes" person.

6. **If the user didn't complete all 10 outreach attempts, address that before analyzing.** Incomplete data leads to wrong conclusions. Push them to finish the other 3 first.

7. **Ghost ≠ No.** A no-response after 12 hours is different from no-response after 72 hours. Recommend follow-up before calling it final data.

8. **Respect the 48-hour constraint even for pivots.** The magic is in the speed and the deadline pressure. If pivoting, don't "take a week to think about it." Start the new cycle immediately or schedule it for next week.

---

## Anti-patterns Table

| Situation | Broken output | Root cause | Fix |
|-----------|--------------|------------|-----|
| Only 4/10 people contacted in 48 hours | Scorecard is inconclusive; user draws wrong conclusion | User didn't push hard enough on the launch; procrastination or fear-based slowdown | Pause the debrief. Complete the other 6 first. Can't diagnose with incomplete data. |
| "Everyone said it's a great idea but nobody bought" | False positive reading; user wants to proceed to delivery | Confusing interest signal with validation; user wants validation to be true | Reframe hard: "Interest ≠ money. You have interest validation, not market validation. Score only actual commitments. We know they like it. We don't know if they'll pay or use it." |
| User wants to "try for one more week" or "give it more time" | Deadline erosion; method loses its power | Discomfort with the kill or pivot decision; seeking extension instead of deciding | The 48-hour constraint IS the method. Respect it. If data is inconclusive after 48 hours + follow-up, you have your answer (not validated). Start fresh with a new idea or pivoted hypothesis next week. |
| Pivoting everything at once (new price, new audience, new problem framing, new script) | No learning extracted; next cycle is just another guessing game | Panic response to rejection; user treats rejection as "everything is wrong" | Isolate ONE variable. "Last time we tested price=$99 to accountants with WhatsApp. This time we're testing price=$199 to the same audience. Everything else stays the same." Teach scientific method thinking. |
| Not asking for referrals during rejection conversations | Missed warm leads; cold prospects stay cold | Forgetting that "no" people often know "yes" people; social anxiety about asking | Train the user: "When someone says no, always ask: 'Who else do you know with this problem?' Write down every name. Those are pre-warmed for your next outreach or your next idea." Make this automatic. |
| User interprets "soft miss" as "continue with same offer" | Wasted next cycle; repeats the failure | Misunderstanding what "pivot" means; user thinks it means "try again harder" | Be explicit: "Pivot = change ONE thing based on what you learned. Same audience, new price. Same price, new audience. Same offer, new script. Not trying the exact same thing again." |
| Scorecard shows "3+ yeses but all were polite interest, nobody actually paid" | False positive HIT | Conflating "soft yes" responses with actual commitments | Recount: Only count "paid", "signed", "scheduled implementation", or clear binding commitment. Re-score. If true count is 0-2, you're in SOFT MISS, not HIT. |

---

## Self-Improvement

After each validation-debrief session:

1. **Was the user able to complete all 10 contacts before debriefing?** If not, at what point did activation break down? (Fear, perfectionism, unclear follow-up process?) Add guardrails to [[dream-ten-launcher]] for next user.

2. **Did rejections include diagnostic data or just "not interested"?** If the user collected shallow feedback, train them harder on the 4 questions. Rejections without diagnostics are low-signal.

3. **Did the scorecard clearly distinguish between interest, commitment, and payment?** If the user conflated "I'm interested" with "I'm buying," they'll make wrong pivot decisions. Calibrate the language: only PAID, SIGNED, or SCHEDULED counts.

4. **For SOFT MISS users: Did they clearly identify ONE variable to change?** If they pivoted everything at once, you didn't hold them accountable to the isolation principle. Tighten that next time.

5. **For KILL users: Did they process the loss productively or defensively?** If they left discouraged, you missed a chance to reframe: "This is the method working. You learned something real in 48 hours." Better coaching needed.

6. **Did the user mine rejections for referrals?** If not, remind them: "Every no person knows a yes person. You just need to ask." Make this a habit.

7. **What was the dominant diagnostic pattern?** (If most rejections were "wrong problem," the issue-market fit was weak. If "wrong price," pricing was too aggressive, etc.) Log this pattern — it informs future idea generation and positioning.

8. **For DIAGNOSE cases: Did the user complete the follow-up loop?** If they ghosted the Ghost City diagnosis, the next cycle is still compromised data. Coach follow-up discipline.

