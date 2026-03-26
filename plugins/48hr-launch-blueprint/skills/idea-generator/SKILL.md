---
name: idea-generator
description: Runs a structured Customer First deep-dive (WHO/WHAT/WHERE) followed by all 4 Idea Generators (Zone of Influence, Network Complaints, Marketplace Scan, Personal Spending) to produce a ranked top-3 shortlist. Triggers on "business idea", "what should I sell", "I don't know what to offer", "find an idea", "brainstorm ideas", "customer first approach", "what can I sell in 48 hours" — generates actionable, reachable ideas filtered by market demand.
allowed-tools:
  - read-vault-file
  - web-search
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

## WORKFLOW: Interview → Generate → Filter → Shortlist

This skill generates 8-15 raw ideas via 4 independent generators, then filters down to a ranked top-3 based on excitement and reachability.

---

## PHASE 1: CUSTOMER FIRST DEEP-DIVE

Before any idea generation, the user answers three foundation questions:

**WHO (Specific Person Type)**

Do NOT accept vague answers like "small businesses" or "busy people."

Push for specificity:
- "What TYPE of small business? (Shopify stores doing €10K-50K/month? SaaS founders? Freelance coaches?)"
- "What's their title/role?"
- "What's their annual revenue or monthly spend?"
- "How old are they? What's their industry?"

Goal: Create a persona specific enough that you could find 10 of these people in 48 hours.

**WHAT (Skills, Access, Knowledge)**

Ask the user:
- What skills do you have that this person needs?
- What insider knowledge or access do you have? (Network, industry, platform, data, relationships)
- What do you know that others don't?
- What have people asked YOU for help with in the past?

Listen for:
- Their unfair advantage (not "I'm hardworking" — that's not an advantage)
- Patterns of what others struggle with but they find easy
- Relationships or platforms they can leverage

**WHERE (Communities & Platforms)**

Ask:
- Where does this person hang out? (Facebook groups, Slack communities, Reddit, LinkedIn, conferences, Discord)
- Which platform can you access in the next 24-48 hours?
- Where do they spend money or time currently?

Document 2-3 specific communities/platforms per idea later.

---

## PHASE 2: RUN ALL 4 IDEA GENERATORS

Generate raw ideas from four independent sources. **Do not filter yet.** Quantity first.

### Generator 1: Zone of Influence

Ask:
- People you know personally who have a specific problem
- People who've complained to you about something
- Your own past frustrations (that others likely share)
- Communities you're already active in

List all candidates. Goal: 5-10 ideas.

### Generator 2: Network Complaints

Ask:
- In the last week, what have people COMPLAINED about in conversations, Slack, email?
- "I wish there was a tool/service that..."
- "This is such a pain, someone should..."
- "I'd pay for something that..."

Scan your inbox, text threads, group chats. Goal: 3-8 ideas.

### Generator 3: Marketplace Scan

Ask:
- What courses/products/services already exist at €20-200 price point in this space?
- If people are already paying, demand exists
- If no one is selling to this person, either no demand or market not evolved yet

Spend 15 minutes searching Google, Gumroad, AppSumo, Skillshare, ProductHunt. Goal: 3-8 ideas.

### Generator 4: Personal Spending

Ask:
- What do you spend money on regularly? (Tools, courses, services, memberships)
- What do you WISH you had that would save you time/money?
- What's a repeated purchase you make reluctantly?

Personal spending = you understand the pain point. Goal: 2-5 ideas.

**Total raw list: Aim for 8-15 candidate ideas.**

---

## PHASE 3: APPLY FILTERS

Now filter down from raw list to top-3.

### Filter A: Excitement Test

For each idea, ask: **"Would I work on this for a year if it failed at week 8?"**

If the answer is "I'm not sure" or "No," remove it. You need genuine interest to push through 48 hours.

### Filter B: Reachability Test

For each remaining idea, ask: **"Can I reach 10 buyers in 48 hours?"**

This requires:
- Knowing exactly WHO the customer is (from Phase 1)
- Having direct access to those 10 people OR
- Access to a platform/community where they're concentrated

If you can't answer "Yes, I know where to find 10 people in my network or a specific community," kill the idea.

Examples of REACHABILITY:
- ✅ "Coaches who use my Facebook group" (you moderate the group)
- ✅ "Shopify store owners in my Slack community" (you're active, have credibility)
- ❌ "Fortune 500 CIOs" (not reachable in 48 hours without a warm connection)
- ❌ "Busy professionals" (vague, no specific channel)

---

## PHASE 4: RANK TOP-3 AND PRODUCE SHORTLIST

For each of the top-3 ideas, create a structured card:

```markdown
## Idea #[1-3]: [Name]

**Customer Type:** [WHO — specific]
**Problem/Offer Sketch:** [WHAT — 1-2 sentences]
**Reachability:** [WHERE — specific platform/community + estimated # of people]
**Excitement Level:** [Your gut: 7/10, 9/10, etc.]
**Why this one:** [Personal connection or market signal]
```

Rank them 1-3 by excitement + reachability (higher excitement = better, higher reachability = better).

**Output:** Three-idea shortlist document. User picks ONE to validate in the next skill.

---

## RULES (Failure Modes)

1. **Never accept vague customer descriptions.** "Small businesses" is not a customer. Push until they say "Shopify store owners with €50K-200K revenue doing email marketing to 5K+ subscribers" or similar specificity.

2. **Do not skip the deep-dive phase.** If they jump straight to "I have an idea: an app for X," pause and ask: "Who specifically would pay for this? Where can you reach 10 of them in 48 hours?" Make them justify reachability FIRST.

3. **Kill ideas that require building before testing.** If the idea is "an app that does X," ask: "Can you test this theory with a landing page or conversation without building?" If not, remove it. (Building takes >48 hours.)

4. **Challenge ideas based on market signals, not personal Zone of Influence.** If an idea is "Everyone at my company struggles with this," it's worth exploring. If it's "I think crypto will be huge," but no real evidence of spending, push back: "What's the existing market evidence that people will pay for this?"

5. **Do not filter out ideas too early.** Run all 4 generators fully BEFORE applying Excitement and Reachability tests. Quantity matters; it unlocks combinations you wouldn't see otherwise.

6. **Reject ideas with unclear reachability.** If the user says "I'll just post on social media and see who responds," that's NOT a reachability plan. Social media is a broadcast channel, not a targeted audience. If they can't name a specific community, email list, or group of 10+ people, the idea fails the reachability test.

7. **One final check: "Can I make a sales call to one of these people today?"** If the answer is "No, I'd need to build landing page first" or "I don't know anyone yet," the reachability test failed. Remove the idea.

---

## ANTI-PATTERNS

| Anti-Pattern | Why It Fails | How to Redirect |
|---|---|---|
| User generates ideas from Zone of Influence only, skips other 3 generators | Misses opportunities in networks they're not already in. Limits to what's obvious. | "Good start. Now let's run the other 3 generators. You might spot a stronger idea from Marketplace Scan or Network Complaints." |
| "I have an idea but I don't know who the customer is yet" | Idea without customer = feature looking for a problem. | "Let's flip this. WHO is the person who would pay for this? Can you name a specific type? If not, move to a different idea." |
| User lists 20+ ideas and can't decide | Overwhelm. Too many options. | "Let's apply Excitement Filter first. For each idea, 10-second gut check: Would I work on it for a year? Kill all the "maybes." Then reachability." |
| "I can reach them on LinkedIn" — but user has 200 followers | LinkedIn as broadcast ≠ reachability. | "LinkedIn is a broadcast channel to 200 people. Who specifically would you message? Can you name 10 people by first/last name? If not, find a different channel (a specific Facebook group, Slack community, email list)." |
| Customer type is too broad: "People who want to make money online" | Not a customer, a desire. Too many variations. | "Too broad. Narrow to: 'Shopify store owners making €10K-50K/month who want to improve email open rates.' Now it's specific." |
| User picks idea #1 and abandons others | No fallback plan. If #1 fails validation, they're stuck. | "You're going with Idea #1. But keep ideas #2 and #3 warm. If testing shows #1 has no market, you validate #2 next day." |

---

## SELF-IMPROVEMENT

After each skill run:

1. **Did user complete all 4 generators?** If not, which was skipped? (Zone skipped = they didn't explore personal network. Marketplace skipped = they didn't research existing competition. etc.) Log pattern.

2. **How specific was their final WHO description?** Rate 1-10 on specificity. (1 = "busy people", 10 = "Shopify store owners in beauty vertical, €100K-500K revenue, actively building email lists"). Track if specificity correlates with follow-through in next phase (validator skill).

3. **Which generator produced the winning idea?** Log if certain generators are more productive for certain user profiles (e.g., Marketplace Scan wins for analytical users; Zone of Influence wins for networked users).

4. **Did they have a reachability crisis?** Did they realize mid-skill that they can't actually reach their customer in 48 hours? Document what made them realize it — and whether they pivoted or abandoned.

5. **Did they pick Idea #1 or #3?** Track if users anchor to the first idea or explore all three equally. If they anchor, might indicate decision fatigue or insufficent filtering.

6. **How many ideas did they generate?** Target was 8-15. If <5, they're not thinking big enough. If >20, they're not filtering. Log and adjust prompting.

7. **Did they loop into [[business-model-validator]] next?** If yes, smooth handoff. If they paused, stalled, or picked a different skill, log the reason — signals a skill ordering issue.

Keep a running log in `skill-runs.md` for quarterly pattern analysis.

