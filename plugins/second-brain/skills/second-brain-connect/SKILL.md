---
name: second-brain-connect
description: "Runs the 9 cognitive operations (Simmons) against Daniel's vault: Analogical, Abductive, Counterfactual, Falsification, Bayesian Updating, First Principles, Dialectical Synthesis, Systems Thinking, Perspective Simulation. Takes a target (single note, folder cluster, recent captures, or free-text query), runs one or more operations, and returns connection proposals — wikilinks to add, reframings to consider, falsifications to pressure-test, analogies to map across domains, perspectives to simulate. Never auto-edits the vault. Human always approves. USE THIS SKILL when Daniel says connect my notes, find links, run falsification, analogy check, counterfactual, Bayesian update, first principles, dialectical, systems view, perspective shift, pressure-test this, how does this link to, what am I missing, run an operation, cognitive ops, or wants to activate Layer 2 of the Four-Layer Architecture against a specific part of the vault."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Second Brain Connect — Cognitive Operations Orchestrator

**Workflow: Scope → Operate → Propose → Approve.**
The vault ([[second-brain]] skill) is Layer 1 — the substrate. This skill is Layer 2 — the verbs that run against it. It never edits the vault without Daniel's explicit approval; it produces connection proposals Daniel reads, edits, and commits.

See [[Simmons Under-the-Hood Pattern — Reconstruction]] for the full architecture this skill implements.

---

## The 9 Cognitive Operations

Each operation is a move performed **on** existing notes, not a new note written from scratch. The output format is consistent across all nine: target → move → result → proposed vault edits.

The 9 operations are organised into **4 functions** per [[Michael Simmons]]' canonical clustering. The function tag is a selection heuristic: it tells you what *kind* of cognitive work you're doing, before you pick the specific operation.

| # | Operation | Function | The move | Output shape |
|---|-----------|----------|----------|--------------|
| 1 | **Analogical Reasoning** | GENERATE | Map structure from a known domain to an unknown one. | "X behaves like Y because both have structure Z." Proposes wikilinks between domains. |
| 2 | **Abductive Reasoning** | GENERATE | Infer the most likely explanation from incomplete evidence. | "Given A, B, C, the simplest explanation is D." Flags what would need to be true. |
| 3 | **Counterfactual Analysis** | EVALUATE | Run "what if this had been different" to isolate the real cause. | "If X hadn't happened, Y would/wouldn't." Isolates necessary vs. incidental. |
| 4 | **Falsification** | EVALUATE | Ask what would prove this wrong; look for that evidence. | "This claim fails if [test]. Evidence against: [list]." |
| 5 | **Bayesian Updating** | EVALUATE | Move belief gradually in proportion to new evidence. | "Prior: P. New evidence: E. Posterior: P'. Magnitude of update: [small/medium/large]." |
| 6 | **First Principles** | DECONSTRUCT | Strip assumptions; rebuild from axioms. | "Assumed: A1, A2, A3. Axioms: X, Y. Rebuild: …" |
| 7 | **Dialectical Synthesis** | INTEGRATE | Hold two opposing positions; find the move that contains both. | "Thesis vs Antithesis → Synthesis that respects both constraints." |
| 8 | **Systems Thinking** | INTEGRATE | Map feedback loops, stocks, flows, delays. | Reinforcing vs balancing loops; leverage points; time delays. |
| 9 | **Perspective Simulation** | INTEGRATE | Model another mind and reason from inside it. | "From [person/role]'s vantage: priorities / blind spots / likely move." |

**The 4 functions** (Simmons-canonical, attributed to [[Lenses Operations Recipes — Manual Appendix — Simmons|Simmons paid bonus]]):
- **GENERATE** — create new possibilities. When stuck for novel options, work here. (Analogical, Abductive)
- **EVALUATE** — test against reality. When over-confident or in a high-stakes choice, work here. (Counterfactual, Falsification, Bayesian Updating)
- **DECONSTRUCT** — strip to foundations. When the framing itself feels wrong, work here. (First Principles)
- **INTEGRATE** — combine across boundaries. When holding tension between perspectives, work here. (Dialectical Synthesis, Systems Thinking, Perspective Simulation)

Detailed prompts for each Operation live in `references/operations.md` (lazy-loaded only when an Operation is executed — keeps this SKILL.md short).

---

## Phase 1: Scope — what is the target?

Four target modes. Ask which one applies if Daniel hasn't specified:

1. **Single note** — e.g., "Run falsification on [[Three Brains Charter]]."
2. **Folder cluster** — e.g., "Run analogical reasoning across `01 - KNOWLEDGE BASE/Mental Models/Lenses/` and find cross-domain bridges."
3. **Recent captures** — e.g., "Run Bayesian update on all notes added in the last 7 days — how should my beliefs shift?"
4. **Free-text query** — e.g., "Run perspective simulation on [prospect name] across all meeting notes in Operations."

For cluster mode, build a file list using `Glob` + `Grep`. For recent captures, use `find ... -mtime -7`. For free-text queries, resolve the entities first (which person? which prospect?) before loading notes.

**Hard rule:** never load more than ~20 notes per run. More than that and the operation degenerates into vague synthesis. If the scope is too big, break it into batches and run them separately — each with its own proposal output.

---

## Phase 2: Operate — pick which operation(s) to run

If Daniel named the operation → run it. If not, the suggestion logic is two-step.

**Step 2a — Identify the function first** (Simmons' GENERATE / EVALUATE / DECONSTRUCT / INTEGRATE meta-grouping). Ask: what *kind* of cognitive work does this target need?
- Stuck for new options? → **GENERATE** (Analogical, Abductive)
- Over-confident / high-stakes / new evidence arrived? → **EVALUATE** (Falsification, Counterfactual, Bayesian Updating)
- Framing feels wrong? → **DECONSTRUCT** (First Principles)
- Holding tension across perspectives or systems? → **INTEGRATE** (Dialectical Synthesis, Systems Thinking, Perspective Simulation)

**Step 2b — Within that function, suggest 1–3 specific operations** that fit the target, briefly explain why each is appropriate, and let him choose:

- Conflicting notes or an argument → **Falsification** or **Dialectical Synthesis**
- New information arrived → **Bayesian Updating**
- Trying to understand a decision outcome → **Counterfactual**
- Stuck on conventional framing → **First Principles**
- Looking for cross-domain bridges → **Analogical**
- Complex system with unclear dynamics → **Systems Thinking**
- Preparing for a conversation / negotiation → **Perspective Simulation**
- Unexplained pattern in the data → **Abductive**

Load the operation-specific prompt from `references/operations.md`. Run the operation against the loaded notes.

**Why the two-step suggestion:** the function tag prevents category errors. A "evaluate" task being mismatched to a "generate" operation produces vague output. Naming the function first forces the right family of moves before the specific tool.

---

## Phase 3: Propose — produce a connection proposal (never edit)

Output a single `.md` proposal file saved to `00 - COMMAND CENTER/Daily Notes/[current week]/` named:

`YYYY-MM-DD — Operation [Operation] on [target] — Proposal.md`

The proposal always follows this template:

```
# [Operation] on [Target]
*[YYYY-MM-DD] — Generated by second-brain-connect*

## Target
[What notes were loaded, in a bulleted list of wikilinks]

## The move
[1–3 sentences describing what the operation did against the target]

## Findings
[The operation's actual output — whatever shape the operation produces:
- new connections (analogical)
- new beliefs or updated probabilities (Bayesian)
- failed claims (falsification)
- leverage points (systems)
- simulated viewpoints (perspective)
- etc.]

## Proposed vault edits
[A numbered list of concrete edits Daniel can approve or reject, one by one:
1. Add [[link]] to [[note]] in the "See also" section
2. Reframe the opening of [[note]] as: "…" (why: falsification revealed X)
3. Create new note: [[title]] — synthesis across [[A]] + [[B]]
4. Update [[Decisions & Rules]] with: "…"]

## Open questions
[Things the operation could not resolve — explicitly flag what would need human input or more evidence]

## Next operation suggestion (optional)
[If a follow-up operation would sharpen the output, name it and why]
```

**No wikilinks are added to the vault at this stage.** The proposal file is the artefact; Daniel reviews, then tells Claude which edits to execute.

---

## Phase 4: Approve — execute only what Daniel greenlights

After Daniel reviews the proposal:

1. He marks which proposed edits to execute (by number, e.g., "do 1, 2, 4; skip 3").
2. Claude executes only those, using `Edit` for surgical wikilink additions and `Write` for new notes.
3. Claude reports what was changed, with file paths.
4. The proposal file is left intact as the audit trail — Daniel can re-read it later to see why a link was added.

**If Daniel says "do all" → still list what was executed. No silent bulk edits.**

---

## Common Recipes (pre-composed operation sequences)

Recipes are named multi-operation sequences for recurring jobs. Load from `references/recipes.md` when Daniel names one:

- **Weekly Knowledge Sweep** — Bayesian update across the last 7 days of captures + Falsification on one active belief + Perspective Simulation on one stalled relationship.
- **Pre-Call Cognitive Prep** — Perspective Simulation on the person + Counterfactual on prior interactions + Abductive on their likely current priorities.
- **New-Concept Integration** — Analogical (bridge to existing Lenses) + First Principles (strip the jargon) + Dialectical (opposing Lens to stress-test).
- **Decision Pressure-Test** — Falsification + Counterfactual + Perspective Simulation (from a dissenting advisor) + First Principles.
- **Trademark Candidate Graduation** — Systems Thinking (where does this fit in the broader framework?) + Analogical (what existing IP does it look like?) + Falsification (what would invalidate it?).

Daniel can define new Recipes over time — append them to `references/recipes.md` with a brief description and the operation sequence.

---

## Rules

1. **Never edit the vault without explicit approval.** The proposal phase is non-negotiable. Claude's job is to surface connections; Daniel's job is to decide which ones are real. Auto-linking degrades the signal of wikilinks — every link should be an intentional act.

2. **Never run an operation against more than ~20 notes at once.** Larger scopes produce vague pattern-matching, not real moves. If the target exceeds this, batch it — and output one proposal per batch, each small enough to review in under 5 minutes.

3. **Load operation prompts from `references/operations.md`, not from memory.** The prompts are tuned; paraphrasing them degrades output quality. If a prompt seems weak after a real run, improve the reference file — not the ad-hoc prompt.

4. **Always include "Open questions" in the proposal.** A proposal with no open questions is either suspiciously complete or a hallucination. Every operation has limits; naming them keeps Daniel in the loop as the final judge.

5. **Proposals live in the daily week folder, not alongside source notes.** This keeps the audit trail in Command Center (First Brain) where decisions live, rather than polluting the Knowledge Base. The vault edits themselves, once approved, land in the KB.

6. **Operations are verbs, notes are nouns — keep the grammar clean.** Never file an operation output as a Concept or Lens. It's a Reflection or a Reference at most. Only the user's synthesis of many operations becomes a new Concept — and only through a deliberate note-writing act, not a skill output.

7. **Recipes are named. Ad-hoc sequences aren't.** If Daniel runs the same 2–3 operations together three times, it's a recipe — name it and append to `references/recipes.md`. Named recipes are how this skill compounds.

8. **If a person is involved in the target, make sure their person file exists first.** Perspective Simulation against a person without a person file is hallucination. If missing, stop and offer to create the person file first — then run the operation.

---

## Self-Improvement

When an operation output is weak:
- Improve the prompt in `references/operations.md`, not in this SKILL.md
- Note which target + operation pair broke the prompt

When Daniel approves every proposed edit:
- The operation prompt is working — record which framing succeeded
- Consider whether this use case is a Recipe candidate (3+ repetitions = promote to `references/recipes.md`)

When Daniel rejects most proposed edits:
- The operation was mismatched to the target — record the mismatch and refine Phase 2 operation-suggestion logic

When a new Operation or Recipe is discovered through use:
- Add it to the relevant reference file, not SKILL.md body
- Reference files grow; SKILL.md stays lean

This skill is the executable form of the [[Simmons Under-the-Hood Pattern — Reconstruction]]. Its quality is a direct function of how often it's used and how rigorously its outputs are fed back into the reference files.
