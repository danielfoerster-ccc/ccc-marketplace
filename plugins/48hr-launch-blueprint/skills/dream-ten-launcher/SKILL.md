---
name: dream-ten-launcher
description: Guides the user through building a named 10-person prospect list, crafting a one-message offer using the benefit-timeframe-price-risk-reversal formula, adapting presell scripts, and producing personalized outreach messages. Activates the 48-hour validation clock. Use when user says "dream ten", "who should I reach out to", "build my prospect list", "craft my offer", "write outreach", "help me find 10 people", "48hr challenge", or "preselling".
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

# Dream Ten Launcher

**Workflow: List → Craft → Adapt → Launch**

Claude helps build the named Dream Ten prospect list, crafts the offer using the benefit-timeframe-price-risk-reversal formula, adapts outreach scripts, and produces ready-to-send messages. THIS IS WHERE THE 48HR CLOCK STARTS.

---

## Named Workflow

### Phase 1: Dream Ten List Building

1. **Review the validated One-Minute Business Model**
   - Ask user to confirm they've completed the [[business-model-validator]] skill
   - If not, pause here — you can't prospect without clarity on the core offer

2. **Elicit specific names** (not categories)
   - Ask: "Who are 10 specific people who have the problem we identified?"
   - Push back on: "marketing managers", "startup founders", "my network"
   - Get first names, last names, how you know them
   - For each name, identify: (a) their specific pain point, (b) contact method (WhatsApp, email, LinkedIn, phone)
   - Challenge every entry: "Can you actually send them a message within the next 30 minutes?"

3. **Validate reachability**
   - If user can't reach 8+ people by day's end, the idea may be too abstract
   - Flag: "Your Dream Ten is mostly cold. This will be harder. Proceed knowing that."
   - If under 7 warm contacts, suggest: expand your network first, or rethink the customer type

### Phase 2: Craft the Offer

1. **Apply the formula**
   - [Specific Benefit] + [Time Frame] + [Price] + [Risk Reversal]
   - Example: "A 30-min call to map your 90-day roadmap + my feedback + you only pay if you implement"

2. **Single-message constraint**
   - Must fit in one text message (~160 characters)
   - Must be explainable in 15 seconds
   - If it doesn't fit, cut it down. Simplify. Again.

3. **Generate 2-3 variations**
   - Different benefit framing (speed vs. certainty vs. risk reduction)
   - Different price anchors (if testing)
   - Different risk reversal (refund vs. no-pay-until vs. free-trial)

4. **Never spend more than 1 hour on offer crafting**
   - Perfectionism here is fear masquerading as diligence
   - "Good enough to send" beats "perfect but delayed"

### Phase 3: Adapt the Listen-Options-Transition Script

Provide the user with the presell script structure from [[48hr-Launch-Blueprint SOP - Presell Script]]:

1. **Listen:** Open with a question about THEIR specific problem
   - "What's your biggest challenge with [problem area]?"
   - Not: "How would you like a solution?"

2. **Options:** Present 2-3 offer variations
   - "I'm testing three approaches. Which sounds most relevant?"
   - Get their instinct before you commit to one

3. **Transition:** Propose the offer
   - "Would it be crazy if I offered you [X] for [price]?"
   - Pause. Let them respond.

### Phase 4: Draft Personalized Outreach Messages

For each Dream Ten member, generate a unique opener:
- Reference something specific about them or your relationship
- State the problem they have (not the solution)
- Include one of your offer variations
- One clear ask: "Can we talk for 15 min tomorrow?"

Example:
```
Hey [Name], I know you've been struggling with client retention
(you mentioned it at [context]). I'm testing an offer for that
exact problem: 30-min audit + roadmap + you only pay if you
implement. Would 15 min tomorrow work to explore if it's a fit?
```

### Phase 5: Launch (Within 30 Minutes)

- The 48hr clock starts WHEN THE FIRST MESSAGE GOES OUT, not when you finish planning
- Remind the user: first message in the next 30 minutes, or the deadline is already lost
- Provide the tracking spreadsheet with all 10 names and send dates
- Set up the [[validation-debrief]] skill as the follow-up

---

## Rules (Failure Modes)

1. **Never accept categories instead of names.** "Marketing managers" is not a Dream Ten entry. "Sarah Chen, VP Ops at TechCorp, I met her at SXSW" is. Push every single time.

2. **Every name must have a concrete contact method.** WhatsApp, LinkedIn DM, email, phone — not "I'll figure out how to reach them later." If you can't contact them today, they're not in the Dream Ten.

3. **The offer must fit in a single text message.** If it doesn't, simplify. Cut out hedges ("might", "possibly", "some"). Remove pre-objection handling. Benefit + Time + Price + Risk Reversal. That's it.

4. **Don't let the user spend more than 1 hour on offer crafting.** When they hit the hour mark, force a decision: "Which variation are we sending?" Perfectionism here kills the 48-hour window.

5. **Always remind them: the first message goes out within 30 minutes.** Not tomorrow. Not after dinner. Not after "one more round of refinement." The clock starts with the first send. Enforce this hard.

6. **Generate at least 2 offer variations.** The user's first instinct is rarely the best framing. Test multiple angles: speed, certainty, risk reduction, price point, time commitment.

7. **If the Dream Ten has fewer than 7 warm contacts, flag that directly.** "You have 6 people you can reach today and 4 cold contacts. This validation will be harder. Proceed knowing that." Don't hide this information.

8. **Never let the user skip personalized openers.** "Hi [Name], I have an offer for you" gets deleted. The opener must reference something specific about them, their situation, or your relationship. Generic messages get ignored.

---

## Anti-patterns Table

| Situation | Broken output | Root cause | Fix |
|-----------|--------------|------------|-----|
| Listing "startup founders" instead of "[[Sarah Chen]], founder of OpsFlow, met at SXSW" | No actionable prospect list | Thinking in categories, not people | Ask: "What's their first name? How do you know them?" Get specific identifiers. |
| Offer is 3 paragraphs long with multiple benefit mentions | Recipients won't read it; too many decision points | Trying to pre-handle every objection before they've even said yes | Cut ruthlessly to: ONE benefit + Time + Price + Risk Reversal. One sentence max. Test variations if needed. |
| User says "I'll send messages tomorrow" | 48-hour window wasted on prep and fear | Perfectionism disguised as planning | Set a 30-min timer right now. Send the roughest version. Refine messaging after first responses come in. |
| Dream Ten is 8/10 cold contacts | Low response rate; weak validation signal | User doesn't have warm network for this market segment | Either (a) pause and expand network first (referrals), or (b) rethink the customer type to match existing warm relationships. |
| Same generic message sent to all 10 people | Ignore rate 90%+; no conversation started | Treating outreach as broadcast, not 1-to-1 presale conversation | Rewrite every message to reference something specific: their problem, a mutual connection, a shared context. Personalization is the signal. |
| User gets stuck debating price for 2+ hours | Momentum dies; first message delayed | Confusing "testing price" with "finding the perfect price" | Set the price. You'll learn the real price after 3 conversations, not in prep. Send with what you have. |

---

## Self-Improvement

After each dream-ten-launcher session:

1. **Did the user complete all 10 names with contact methods?** If not, note which step broke down (identifying names, finding contact info, reachability check) and tighten that phase next time.

2. **Did the first message go out within 30 minutes?** If not, what held it back — offer clarity, perfectionism, activation inertia? Build guardrails for next time.

3. **Did we generate 2+ offer variations?** If the user only tested one, ask next session: "What other angle could we test?" Teach variation-thinking.

4. **Was the Dream Ten all warm contacts or mostly cold?** If mostly cold, note this for validation-debrief — it will affect the response rate and what we conclude from "silence".

5. **Personalization quality:** In validation-debrief, check if responses correlated with message personalization. Log the pattern.

6. **Offer fit:** Did the final offer that went out match the formula (Benefit + Time + Price + Risk Reversal)? If not, note which component was missing and coach more explicitly next time.

