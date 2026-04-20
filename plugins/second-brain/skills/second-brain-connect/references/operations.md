# Operation Prompts — The 9 Cognitive Operations

*Last updated: 2026-04-19. Review after every 5 real runs; tune prompts that produce weak outputs.*

Each operation below gives:
1. **Core prompt** — use verbatim when running the operation
2. **Output contract** — what a good output looks like
3. **Failure modes** — what to watch for

Load only the operation that's being executed. Do not load all nine.

---

## 1. Analogical Reasoning

**Core prompt:**
> Read the target notes. Identify the deep **structure** (not surface features) — what are the entities, relationships, and dynamics? Now search the loaded corpus for other domains that share that same structure. For each candidate analogy, state: (a) the source domain, (b) the mapping (which entity maps to which), (c) what the analogy **predicts** about the target domain that isn't obvious without it, (d) where the analogy breaks down.

**Output contract:**
- At least two candidate analogies (one obvious, one non-obvious)
- A "breaks-down-where" section for each — no analogy is perfect
- At least one predicted new connection (wikilink proposal)

**Failure modes:**
- Surface matching ("both contain the word X") instead of structural matching — reject and retry
- Analogy that only explains; good analogies also **predict**
- Forgetting to state where the analogy fails — always required

---

## 2. Abductive Reasoning

**Core prompt:**
> Read the target notes. Identify the observed pattern or data points. Generate **three** candidate explanations — the obvious one, a non-obvious one, and a contrarian one. For each, state: (a) what the explanation requires to be true, (b) what evidence in the loaded corpus supports or contradicts it, (c) what would decisively favour this explanation over the others. Pick the most likely based on simplicity + evidence weight (Occam + Bayes).

**Output contract:**
- Exactly three candidate explanations
- A "would-be-decisive" test for each
- A clear ranking with reasoning

**Failure modes:**
- Defaulting to one explanation and justifying it — always three
- Contrarian option that's just "the opposite" — make it structurally different
- Picking the most complex explanation because it sounds sophisticated

---

## 3. Counterfactual Analysis

**Core prompt:**
> Read the target notes. Identify the focal event or decision. Now rewind: vary ONE input at a time (not a bundle) and describe what would plausibly have happened. Do this for the 3–5 most influential inputs. Distinguish between: (a) **necessary** inputs (changing this flips the outcome), (b) **incidental** inputs (changing this barely matters), (c) **amplifying** inputs (changing this scales the outcome up or down). End with: "The real cause was …" — the necessary input(s) that did the work.

**Output contract:**
- 3–5 single-variable counterfactuals
- Clear necessary / incidental / amplifying classification
- A named "real cause" conclusion

**Failure modes:**
- Changing multiple variables at once — isolate one at a time
- Confusing correlation with cause — demand the "if X hadn't been the case, Y wouldn't have happened" test
- Skipping the final "real cause" — leaving the output ambiguous defeats the purpose

---

## 4. Falsification

**Core prompt:**
> Read the target notes. Extract the central claim as a single sentence. Now design the hypothetical evidence that would **disprove** it — be specific about what would need to be observed, not general skepticism. Then search the loaded corpus for evidence matching those disproof conditions. For each match: does it actually disprove, weakly challenge, or get absorbed into a nuanced version of the claim? End with: "Verdict: [holds / weakened / falsified]" and state what the claim should be reframed as, if anything.

**Output contract:**
- The claim stated as one sentence
- At least three specific disproof conditions (not "what if you're wrong")
- Evidence search results with verdict classification
- A final verdict + reframe if applicable

**Failure modes:**
- Vague skepticism ("but what if …") instead of specific disproof conditions
- Treating a counter-example as falsification when the claim can be refined to accommodate it — distinguish properly
- Skipping the reframe — if the claim survived weakened, the reframe is the deliverable

---

## 5. Bayesian Updating

**Core prompt:**
> Read the target notes. Identify the **prior belief** — what was held before the new evidence arrived. State the prior as a rough probability (high / medium / low) with the reasoning. Now identify the new evidence (specifically: which note, which observation, which conversation). Ask: how strong is this evidence? How likely would I have seen it if the prior belief were true vs. false? Based on that, update: state the **posterior** and the **magnitude** of the update (small / medium / large). Flag if the update crosses a decision threshold — i.e., would change what Daniel should do.

**Output contract:**
- Clear prior + reasoning
- Specific new evidence (wikilinked)
- Posterior + update magnitude
- Decision-threshold flag if relevant

**Failure modes:**
- Updating too aggressively from weak evidence (base-rate neglect)
- Not updating when the evidence is strong (confirmation bias protection — watch for "well, but …")
- Missing the decision-threshold step — the update only matters if it changes what to do

---

## 6. First Principles

**Core prompt:**
> Read the target notes. List the **assumptions** embedded in the current framing — what is being taken for granted? Now strip them all away. What are the **axioms** that actually hold regardless of the assumptions? (Axioms are non-negotiable: physics, economics identities, human nature, stated goals.) Rebuild the reasoning from the axioms upward, and check at each step whether the previous framing still holds or whether a better one emerges.

**Output contract:**
- Numbered list of ≥3 assumptions
- Clearly stated axioms (distinct from assumptions)
- Rebuilt reasoning that either confirms the prior framing or names a better one
- Explicit note on which assumptions survived the rebuild

**Failure modes:**
- Confusing assumptions with axioms (axioms are truly non-negotiable; assumptions are culturally embedded)
- Rebuilding that happens to land exactly where the framing started — suspicious, redo with fresh eyes
- Stripping assumptions but not actually rebuilding — just skepticism in disguise

---

## 7. Dialectical Synthesis

**Core prompt:**
> Read the target notes. Identify the **thesis** — the position being advocated. Now construct the strongest possible **antithesis** — not a strawman, the steelman version held by the sharpest critic. State both in their strongest form. Now find a **synthesis** that respects what's true in both — not a compromise, not a pick-a-side, but a move that contains both constraints. If no such synthesis exists, say so explicitly; that is a valid output.

**Output contract:**
- Thesis stated in its strongest form
- Steelmanned antithesis (should feel genuinely compelling)
- A synthesis OR an explicit "no synthesis — these are genuinely incompatible" verdict
- Named trade-offs if synthesis exists

**Failure modes:**
- Strawmanning the antithesis — reject and rewrite as the sharpest critic would
- Synthesis that's just "both are somewhat right" — that's a compromise, not a synthesis
- Forcing a synthesis where none exists — better to name the incompatibility

---

## 8. Systems Thinking

**Core prompt:**
> Read the target notes. Identify the **system boundary** — what's in, what's out. Map the key **stocks** (accumulating quantities) and **flows** (rates of change between stocks). Identify the **feedback loops**: reinforcing (R) and balancing (B). Name the **time delays** — where does a cause not produce an effect immediately? Find the **leverage points** (Meadows' hierarchy: from constants up to paradigms). Which leverage point has the highest impact for the lowest effort right now?

**Output contract:**
- Stated system boundary
- At least one reinforcing loop and one balancing loop
- At least one named time delay
- A specific leverage point recommendation (not "try several things")

**Failure modes:**
- Listing components without connecting them into loops — the loops are the point
- Recommending the lowest leverage point (change a constant) when a higher one exists (change the goal or the paradigm)
- Ignoring time delays — most system failures are delay-driven

---

## 9. Perspective Simulation

**Core prompt:**
> Read the target notes AND the person file for the target subject (mandatory — if missing, stop and create it first). Simulate their viewpoint on the focal question: (a) what are their top 3 priorities in this situation, (b) what are their blind spots, (c) what would they consider an acceptable outcome, a win, a deal-breaker, (d) what's their most likely next move, (e) what would cause them to change that move? Stay in their frame — do not lapse back into Daniel's frame. End with: "What I see from here that Daniel might not: …"

**Output contract:**
- All five questions answered from the simulated viewpoint
- A distinct "what I see from here" insight — not a paraphrase of Daniel's likely read
- Specific next-move prediction (not generic "they'll push back")

**Failure modes:**
- Slipping back into Daniel's frame and rationalising from there — reject and restart from the simulated viewpoint
- Running this operation without a person file — always block and create the file first
- Generic profile ("they're a CEO so they care about growth") — specific person files exist for a reason

---

## Meta-rules across all operations

1. **Always name the target explicitly.** Every operation output starts with the list of wikilinked notes loaded. Audit trail.
2. **Always produce concrete vault edits.** An operation that produces only insight without actionable proposals is half-done.
3. **Always include "Open questions" or "What I couldn't resolve."** Every operation has limits. Name them.
4. **If an operation runs against a surprisingly weak corpus (few notes, no wikilinks), stop and flag it.** The output will be thin no matter how well the operation is tuned.
