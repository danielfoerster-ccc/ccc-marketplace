# Integration Hooks for ccc-mental-model-recipes Skill

These three hooks should be added to `ccc-mental-model-recipes/SKILL.md` once frontier-prompting v0.1 is approved and shipped.

## Hook 1: Pre-Recipe Question Shaping

**Location in recipes skill:** Add to "When to use this skill" section or as a new "Setup" phase before the recipe runs.

**Text to add:**
```
## Setup: Shape Your Question (Optional but Recommended)

Before running a recipe, if your question feels vague, overly constrained, or you're tempted to pick 
one "best" answer, consider reshaping it first using [[Frontier Prompting]]. Better-formed questions 
produce better recipe outputs.

**Quick check:**
- Vague or too many degrees of freedom? → Use [[Frontier Prompting]] Pattern Bridge first
- Binary choice or either/or framing? → Use [[Frontier Prompting]] Void Space first  
- Picking one future or forecasting? → Use [[Frontier Prompting]] Quantum Leap first

Once your question is field-activated, then run your recipe for maximum insight density.
```

**Why this matters:** Frontier Prompting designs the question; Mental Model Recipes process it. The sequence matters.

---

## Hook 2: Post-Recipe Synthesis

**Location in recipes skill:** Add to "After you run the recipe" or in the Self-Improvement section.

**Text to add:**
```
## Synthesis Across Recipe Outputs

Once you've gathered multiple perspectives via a recipe (especially Perspective Prompting with council 
mode), use [[Frontier Prompting]] techniques to synthesize the diverse outputs:

- **Across perspectives:** Apply [[Frontier Prompting]] Void Space to find the novel synthesis that 
  emerges *between* the expert viewpoints rather than averaging them
- **For meta-insights:** Use Pattern Bridge to identify the structural principles that recur across 
  all perspectives simultaneously
- **For robust strategy:** Apply Quantum Leap thinking to find moves that work across all perspectives 
  held in superposition, not just the most-likely one

The combination of recipe diversity + frontier-prompting synthesis creates insights neither alone could reach.
```

**Why this matters:** Recipes surface diverse perspectives; Frontier Prompting helps synthesize across them at the field level.

---

## Hook 3: Curriculum Pathway

**Location in recipes skill:** Add as a new "Five Stages of Third Brain Mastery" section, or at the very end as a "Next Steps" callout.

**Text to add:**
```
## The Five Stages of Third Brain Mastery

[[Mental Model Recipes]] is stage 2 of a five-stage learning progression for working with Claude as 
a genuine cognitive extension. Each stage builds on the previous one:

**Stage 1: [[Frontier Prompting]]** — Learn to design field-activating questions that shift AI's 
processing from linear to simultaneous. This is the foundation: better questions unlock all downstream 
stages. Master: Pattern Bridge, Void Space, Quantum Leap.

**Stage 2: Perspective Prompting (Coming v0.2)** — Summon councils of diverse expert viewpoints 
without ego or confirmation bias. Learn to engineer productive disagreement and synthesize opposing 
positions into higher-order frameworks. Master: Council mode, diversity conditions, synthesis types.

**Stage 3: Multi-Prompting (Coming v0.2)** — Run questions across multiple reasoning models 
simultaneously, not sequentially. Leverage mixture-of-agents to access different processing modes at 
once. Master: Model selection, parallel execution, output aggregation.

**Stage 4: Infinite Prompting (Coming v0.2)** — Activate extended-thinking mode for questions that 
need deeper reasoning space. Trade latency for thinking depth when the problem warrants it. Master: 
Thinking-mode prompting, complexity detection, timing tradeoffs.

**Stage 5: Harvard Protocol (Coming v0.2)** — Psychological scaffolding: structure questions to 
activate the ideal parent archetype in Claude, producing outputs that are simultaneously wise, 
protective, and growth-oriented. Master: Psychological framing, archetype activation, integrated outputs.

**Why this sequence matters:** Stage 1 (questions) prepares the ground. Stages 2-3 (perspectives + 
diversity) surface insights. Stages 4-5 (extended thinking + psychological depth) integrate and mature them.

**Recommended path:** Learn Frontier Prompting (stage 1) first. Use it on every question. Then layer 
Perspective Prompting (stage 2) for high-stakes decisions. Add Multi-Prompting (stage 3) and Infinite 
Prompting (stage 4) as needed for complexity. Reserve Harvard Protocol (stage 5) for questions that 
benefit from psychological depth.

See [[Frontier Prompting]] for where to start.
```

**Why this matters:** Creates a coherent learning journey from question design → perspective diversity → processing parallelism → extended thinking → psychological integration.

---

## Cross-Linking Details

### In ccc-mental-model-recipes SKILL.md, add wikilinks:
- `[[Frontier Prompting]]` — 3 times (hooks 1, 2, 3)
- `[[Mental Model Recipes]]` — in frontier-prompting SKILL.md (one-way link back)

### In frontier-prompting SKILL.md, existing reference:
- Already mentions "Perspective Prompting (Council mode)" in Step 4 "Optional adjacent moves"
- Will be expanded in v0.2 once Perspective Prompting skill is built

### In vault MOC level:
- Create `02 - MISSION CONTROL/Claude Skills & Plugins/Five Stages of Third Brain Mastery.md` (meta-guide)
- Link all five skills from that MOC
- Link from Second Brain plugin description

---

## Timing for Integration

**v0.1 (now):** frontier-prompting skill created and ready for review. ccc-mental-model-recipes remains unchanged.

**v0.2 (after Daniel approval):** Add these three hooks to ccc-mental-model-recipes SKILL.md after frontier-prompting is tested and approved.

**v0.3 (future):** Once other stages (Perspective, Multi, Infinite, Harvard) are built, expand each hook to include them.

---

## Testing These Hooks

Before shipping v0.2, run a test case on ccc-mental-model-recipes that uses frontier-prompting as Setup:

**Test case:** "I want to use mental model recipes to design our pricing strategy. How should I ask about it?"
- Step 1: Operator asks their raw question
- Step 2: I invoke frontier-prompting to reshape it (Void Space technique)
- Step 3: Operator runs a recipe with the frontier-prompting-shaped question
- Step 4: I apply Hook 2 to synthesize recipe outputs using Void Space thinking
- Expected output: More novel, less database-like

---

## Questions for Daniel

1. Should Hook 3 (Five Stages) mention the other four stages as "Coming v0.2" or "In development"?
2. Should the curriculum progression be part of ccc-mental-model-recipes SKILL.md or only in a separate MOC?
3. Any edits to the wording or examples in the three hooks?
4. Should we add a "How to use Frontier Prompting + Recipes together" example to the vault?
