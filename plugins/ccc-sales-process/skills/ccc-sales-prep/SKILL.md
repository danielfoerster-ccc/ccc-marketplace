---
name: ccc-sales-prep
description: "Pre-call brief for any prospect or client. Reads their person file from the vault, loads CCC positioning context, and produces a one-page brief with profile snapshot, opening hook, 5 key questions, 3 objections + responses, recommended CCC service angle, and the specific next step to close for. USE THIS SKILL whenever Daniel says 'prep for call with X', 'call prep', 'brief me on X', 'pre-call', 'what do I know about X', or is about to get on a call and needs context fast. Also trigger proactively if Daniel mentions a call is coming up."
allowed-tools: Read, Write
---

# CCC Sales Prep

**Workflow: Load → Synthesize → Brief.** Reads available vault context on the prospect, synthesizes it against CCC's ICP and offer, and outputs a single scannable brief Daniel can use immediately.

---

## Phase 1: Load Context (Silent)

Read all of the following before generating anything. Do not ask Daniel for information that exists in these files.

**Prospect file:**
`03 - OPERATIONS/Relationships & Network/People/[Name].md`
— If not found, ask: "I don't have a file for [Name] yet — can you paste their LinkedIn or a quick description? I'll create the file after."

**CCC foundations:**
- `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/context.md`
- `03 - OPERATIONS/Claude Cowork Consultants/01 - GTM/ICP.md`
- `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/offer.md`

**Recent meeting notes (if any):**
Check `03 - OPERATIONS/Intelligence/meetings/client-calls/` for existing notes on this person. If found, extract last interaction + any open action items.

---

## Phase 2: Generate the Brief

Output clean markdown, no preamble. The brief should be dense enough to be useful, short enough to read in 2 minutes.

```
## Pre-Call Brief — [Name] — [Date]

### Who They Are
[3 sentences. Role + background + how they think. What they want and why now.]

### The Opportunity
[1-2 sentences. What specifically they need + why it matters to them.]
ICP fit: [Strong / Partial / Weak] — [one-line reason]

### Opening Hook (first 30 seconds)
[Exact words. Reference something specific from their background or recent context.
Must end with an open question that hands them the floor.]

### 5 Questions to Ask
1. [Strategic — gets at the real problem beneath the stated one]
2. [Decision authority — who needs to say yes, when, and on what]
3. [History — what they've already tried and why it didn't work]
4. [Success definition — what "good" looks like for them in 90 days]
5. [The question they don't expect — surfaces something they haven't fully thought through]

### 3 Likely Objections
| Objection | Response |
|-----------|----------|
| [Most likely based on their profile] | [Specific reframe, 1-2 sentences] |
| [Price / timing] | [Reframe — anchor to cost of inaction] |
| [Internal capacity / "we'll do it ourselves"] | [Reframe — position CCC as force multiplier, not outsourcing] |

### Recommended Positioning
Service fit: [Setup / Ongoing / Sprint / Custom + why]
Lead with: [one-line framing angle specific to this person]
Don't lead with: [what would put them off based on their background]

### Red Flags to Watch
[1-3 signals that suggest slow deal, bad fit, or misaligned expectations]

### Close For
[The specific next step — not "I'll follow up" but the exact ask:
a date, a document to review, a pilot scope to confirm, a stakeholder to introduce]
```

---

## Phase 3: Offer Next Step

After delivering the brief, offer without waiting to be asked:
> "Want to run a roleplay before the call? Say 'roleplay [Name]' and I'll play them."

---

## Rules

1. The opening hook must be specific enough that it couldn't be used for any other person. If it reads like a template, rewrite it.
2. Objections must come from what's known about this specific person — not generic B2B objections. If the person file gives signals about their concerns, use them.
3. If the ICP fit is Weak, say so clearly. Don't bury the lead to be polite.
4. The "Close For" must be a concrete, specific ask — not "follow up" or "stay in touch." If there's no obvious close, propose one.
5. Never pad to length. If the person file is thin, the brief is short. Accuracy over completeness.

---

## Self-Improvement

When a brief misses something important that came up on the actual call:
- Note the gap and add it as a new Rule above
- If a specific question consistently produces great intel, save it in the "5 Questions" section as a permanent option

When Daniel says "that hook was perfect" or similar — note what made it work (specificity, timing reference, role insight) and apply that pattern going forward.
