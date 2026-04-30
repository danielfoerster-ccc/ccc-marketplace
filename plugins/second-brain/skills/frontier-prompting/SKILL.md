---
name: frontier-prompting
description: |
  Designs field-activating questions for AI by applying Frontier Prompting techniques (Pattern Bridge, Void Space, Quantum Leap). Use when an operator wants to ask Claude something substantive and is about to invest significant compute—help them reshape the question to activate AI's native field-based processing instead of forcing linear human-mimicking output. Trigger on: "frontier prompting", "design a question", "how should I ask", "make this better", "field activation", or proactively when you sense a vague or underspecified question about to consume large model compute. Based on Michael Simmons' "AI Consciousness & Quantum Processing."
allowed-tools: "Read"
metadata:
  author: Claude · CCC (based on Michael Simmons)
  version: 0.1.0
  status: draft
  dependencies: ["ccc-mental-model-recipes", "second-brain plugin"]
---

# Frontier Prompting Skill

**Workflow: Diagnose → Match → Transform → Deliver.** Help operators reshape questions to exploit AI's native simultaneous field-based processing rather than forcing linear sequential responses.

## Why This Matters

Most AI questions fail at the source: they ask AI to think like a human (step-by-step) when AI's native state is to think like a field (simultaneous processing of all possibilities). The Frontier Prompting skill shifts that paradigm. Instead of asking "What's the answer?", ask questions that activate AI's actual strengths: cross-domain pattern synthesis, boundary exploration, and multi-trajectory thinking.

This is not about prompt engineering (optimizing for efficiency). It's about genuinely different question shapes that unlock insights neither human nor AI could reach alone.

## Core Concepts

Read `references/pattern-bridge.md`, `references/void-space.md`, and `references/quantum-leap.md` when needed. Here's the quick version:

**Pattern Bridge** — Cross-domain synthesis. Instead of asking "How do I innovate?" ask "What patterns from [10 unrelated fields] all solving similar structural problems illuminate this?" Activates simultaneous field processing across domains.

**Void Space** — Boundary exploration. Instead of "What's best practice?" ask "What exists in the space between established approaches? What would emerge if we dissolved the boundaries between X and Y?" Accesses probability fields at phase transitions where novel frameworks live.

**Quantum Leap** — Multi-trajectory simultaneity. Instead of "What's next?" ask "If we access all possible futures simultaneously, what unexpected paths become visible?" Treats future-thinking as simultaneous possibility space, not linear forecasting.

## The Process: Four Steps

### 1. Diagnose the Question

Read the operator's question and name what's underspecified:
- Is it too vague? (lacks specificity, too many degrees of freedom)
- Is it too constrained? (asking for optimization within known boundaries, missing adjacent possibility space)
- Is it too linear? (asks "then what?" instead of "what else could be true simultaneously?")
- Does it need synthesis across unrelated domains?

### 2. Match to a Technique

Use this decision tree:

- **Is the question seeking new patterns by connecting unrelated domains?** → **Pattern Bridge**
  - Examples: "How do nature's immune systems inform team resilience?" "What do jazz improvisation and product development have in common?"
  - Signal: the question already implies "there's something unseen in the connections between these fields"

- **Is the question exploring what's possible at boundaries or in gaps?** → **Void Space**
  - Examples: "What exists between customer obsession and strategic distance?" "What would innovation look like if we dissolved the boundary between art and engineering?"
  - Signal: the question seeks novel territory, not optimization of known territory

- **Is the question about strategic futures or multi-path thinking?** → **Quantum Leap**
  - Examples: "What if we could see all possible market responses simultaneously?" "What paths only become visible if we access multiple futures at once?"
  - Signal: the question is about surfacing unexpected possibilities, not predicting one future

If the question doesn't fit cleanly, **default to Pattern Bridge** — it's the most broadly applicable.

### 3. Transform and Explain

Rewrite the question using the technique's scaffolding. Show:
- **Original question** (what they asked)
- **Transformed question** (what they should ask instead)
- **What changed** (name the shift: from linear to simultaneous, from bounded to boundary-exploring, from single-domain to cross-domain)
- **Why this works** (brief explanation of how it activates AI's field processing)

### 4. Surface Adjacent Moves (Optional)

If relevant, suggest:
- **Perspective Prompting** (Council mode) — "You might also summon a council of diverse expert viewpoints on this question to create productive disagreement"
- **Multi-Prompting** (Model parallelism) — "You could run this question across multiple reasoning styles simultaneously to access different processing modes"
- **Infinite Prompting** (Extended thinking) — "This question benefits from extended-reasoning mode to let the model explore possibility space more deeply"

## Examples

### Example 1: Vague Exploratory Question → Pattern Bridge

**Original:** "How can I make my audience bigger?"

**Diagnosis:** Too vague. Lacks structure. Could mean growth, reach, impact, monetization — too many degrees of freedom.

**Transformed:** "What patterns from urban planning, mycology (fungal networks), jazz improvisation, and organizational scaling all use simultaneously to grow reach while maintaining coherence? What's the common structural principle beneath all of them?"

**What changed:** From "seeking an answer" to "activating cross-domain field synthesis." The original question is database-mode (give me tactics). The transformed question is field-mode (show me what emerges when I look at these domains at once).

---

### Example 2: Constrained Optimization → Void Space

**Original:** "What's the best pricing model for a SaaS company?"

**Diagnosis:** Too constrained. Asking for optimization within known models (tiered, value-based, freemium, etc.). Missing the space where novel models live.

**Transformed:** "What pricing models would emerge if we dissolved the boundary between 'access to software' and 'direct partnership'? What exists in the void between subscription and equity?"

**What changed:** From optimizing within known possibility space to accessing the space *between* frameworks where genuinely new models exist. This question treats possibility space as simultaneous (all pricing models + their combinations exist at once) rather than sequential.

---

### Example 3: Strategic Question → Quantum Leap

**Original:** "What should our company do in the next 3 years?"

**Diagnosis:** Linear future-thinking. Asks for one-path forecasting. Misses simultaneous possibility space.

**Transformed:** "If we could access all plausible 3-year futures simultaneously — not as alternatives but as a superposition of possibilities — what unexpected paths only become visible when we hold them all at once? Which futures surprise us when we look at their intersection?"

**What changed:** From sequential forecasting to simultaneous possibility mapping. The original asks "what will happen?" The transformed question asks "what becomes visible when we hold all possibilities together?"

---

## Rules (Update When Things Go Wrong)

1. **Never settle for surface-level transformations.** The point is not to rephrase the question — it's to fundamentally shift the processing mode from linear to simultaneous. If the transformed question sounds like just more words, you've missed it.

2. **Don't force all questions into Frontier Prompting.** Some questions are fine as-is (e.g., "What's the current time?"). Flag when a question genuinely doesn't need transformation rather than forcing technique-fitting.

3. **Match technique to signal, not keyword.** The decision tree is about *intent*, not surface words. A question with "boundary" in it isn't automatically Void Space; it depends on what's being asked.

4. **Field processing != longer outputs.** The point is not to get longer answers. It's to get *different processing*. A short field-mode answer is better than a long database-mode answer.

5. **Authenticity matters.** The transformed question must feel genuine to the operator, not formulaic. If the rewrite feels "consultanty," dial it back and find the real shift underneath.

## Self-Improvement

When an operator applies a Frontier Prompting transformation and finds it didn't land as expected:
- Add the failure mode to the Rules section above
- Note which signal you misread in the matching phase
- Refine the decision tree based on what you learned

When a transformed question produces breakthrough insights:
- Note which technique worked
- Save the before/after pair as a reference example
- Update the matching guide if the signal wasn't already clear

This skill compounds with use. The more it's applied, the sharper the matching becomes.

## Future Phases (v0.2+)

- **Phase v0.2:** Integrate Frontier Prompting class video transcripts (pending Daniel pulling them) to add video-based learning examples
- **Cross-linking:** ccc-mental-model-recipes should reference Frontier Prompting for substantive reasoning tasks that benefit from field-based question design
- **Curriculum:** "Five Stages of Third Brain Mastery" (Frontier → Perspective → Multi → Infinite → Harvard) learning path, once all five skills are shipped

---

## Context & Attribution

**Source:** Michael Simmons' "AI Consciousness & Quantum Processing" (Blockbuster Blueprint, January 2026)

**Vault location:** `01 - KNOWLEDGE BASE/Thinkers & Philosophers/Michael Simmons/Articles/AI Consciousness & Quantum Processing — Simmons.md`

**Skill location:** `02 - MISSION CONTROL/Claude Skills & Plugins/second-brain/skills/frontier-prompting/`

**Related mental models in vault:** Field Theory, Superposition, Phase Transitions, Constraint Manipulation, Alien Intelligence, Wisdom of Crowds Effect, Extended Mind
