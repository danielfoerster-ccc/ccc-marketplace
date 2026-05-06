---
name: specialized-profile-builder
description: Builds a Specialized Memory Profile (Simmons Class 2 architecture) for one operator-domain pair so future AI sessions reason from inside the operator's actual values, thinking style, blindspots, frameworks, decision history, constraints, and goals — not generic defaults. Two MVP branches — Strategic/Decision-Making and Learning/Coaching/Creative — selected from the prototypical problem. Uses Disconfirming Evidence Questioning to surface blindspots the operator can't self-report. Produces 4 artefacts (Profile Card, Usage Guide, Prompt Templates, Refresh SOP) saved to 00 - COMMAND CENTER/Foundational Docs/Profiles/. USE THIS SKILL when user says 'build a profile', 'specialized memory profile', 'operator profile', 'profile for my [domain]', 'the AI doesn't know how I think', 'I keep re-explaining my context', 'make AI more domain-specific', or wants Claude domain-aware for repeated sessions.
allowed-tools: Read, Write, Edit, Glob, Bash, AskUserQuestion
---

# Specialized Profile Builder

**Workflow: Wizard + Feedback Loop.** Four-input intake → branch selection → dimension-weighted questioning with Disconfirming Evidence pushback → synthesis → four output artefacts saved to the vault. One question (or tight cluster) at a time; draft options before locking; iterate until the operator says it lands.

This is a **process skill** — the output is a 7-dimensional self-model, not a deterministic transform. Quality comes from the quality of the conversation, not from rigid templates.

---

## Why this skill exists

Generic AI prompting plateaus once the operator has the basics. The next leverage layer (Simmons Class 2: *Specialized Memory*) is **domain-specific operator profiles** — pre-loaded context that lets future AI sessions reason from inside the operator's actual values, frameworks, decision history, constraints, and goals rather than from the model's defaults.

The bottleneck is not *more prompting skill*. It is *the AI not knowing who it's prompting for*. Profiles close that gap.

The skill produces operator self-models, not project documents. Project docs (CCC ICP, EI offer, LONNEL positioning) live in `gtm-discovery` outputs. Profiles cite those docs as inputs but answer a different question: *how does this operator actually think and decide in this domain?*

---

## What it produces

For each invocation: ONE specialized profile for ONE (operator × domain) pair. Outputs land in `00 - COMMAND CENTER/Foundational Docs/Profiles/[Domain Name]/` as four files:

1. **`Profile Card.md`** — the 7 dimensions, 2-5 sentences each, dated and versioned. **System-prompt-embeddable** — designed to be loaded as context into future sessions.
2. **`Usage Guide.md`** — when and how to invoke this profile; example prompts; integration notes.
3. **`Prompt Templates.md`** — 3-5 ready-to-use prompts that pre-load the profile (e.g., "Using my CCC strategic profile, respond to this client objection: …").
4. **`Refresh SOP.md`** — when to refresh the profile, how (full re-run vs. dimension-specific update), what triggers an update.

---

## Phase 0 — Intake (4 required inputs before questioning starts)

Use `AskUserQuestion` to collect these efficiently. Group as one tool call where the schema permits, otherwise sequential. Don't proceed to Phase 1 without all four.

1. **Domain name** — free text. Examples: "CCC strategic decision-making", "Leadership of LONNEL business with Jack and Anitta", "Personal learning of new technology", "Thought partnership for content ideas". Push for specificity if the operator says "business" or "work" — what subset of business?

2. **Prototypical problem** — free text, 1-3 sentences. A *real, current, concrete decision or challenge* in this domain. This grounds every subsequent question against a lived example, not abstractions. If the operator can't name one, that itself is signal — push: "What's one decision in this domain you've made (or avoided making) in the last 30 days?"

3. **Use case** — single-select pills:
   - **Personal** — profile is for the operator's own future sessions
   - **Team** — profile represents how the operator + their team approaches this domain (multi-stakeholder)
   - **Product** — profile is for a product/service Claude will use (e.g., a CCC client)

4. **Refresh cadence** — single-select pills (defaults to Monthly):
   - **Weekly** — high-volatility domain, new evidence each week
   - **Monthly** — most common; balanced freshness vs. effort
   - **Quarterly** — slow-moving domain, infrequent updates
   - **Ad-hoc** — refresh only when a decision surprises the operator

**Save the intake answers as a temporary scratch file** at `/tmp/profile-intake-<domain-slug>.json` for use in later phases.

---

## Phase 1 — Branch selection

Based on the **prototypical problem**, infer which branch fits. Two branches in MVP:

| Branch | When it fits | Front-weighted dimensions |
|--------|--------------|---------------------------|
| **Strategic / Decision-Making** | The prototypical problem is about a decision, trade-off, allocation, plan, or judgement call (CCC engagements, LONNEL strategy, GTM choices, hiring, pricing, scope decisions) | Decision History · Frameworks · Constraints |
| **Learning / Coaching / Creative** | The prototypical problem is about understanding something new, building skill, reflecting on patterns, or producing creative output (learning a new technology, coaching a relationship, content ideation, identity work) | Values · Thinking Style · Blindspots |

**Important:** "Front-weighted" means *more questions land on those dimensions*, not that the others are skipped. All 7 dimensions get covered in the final Profile Card.

If the prototypical problem genuinely straddles both (e.g., "How do I decide what to learn next?"), default to **Strategic** but ask the operator at branch-selection time: *"This sits between Strategic decision-making and Learning/Creative work. Which lens feels more accurate for the kind of profile you want?"*

If a third branch is clearly needed (e.g., a Leadership/Relational profile that doesn't fit either), surface that to the operator and skip to v0.2 territory — don't force-fit MVP branches.

For deeper branch-specific questioning sequences, read `references/branches.md`.

---

## Phase 2 — Dimension-weighted questioning

For each of the 7 dimensions, ask 1-3 questions calibrated to the branch. **Apply Disconfirming Evidence Questioning at each dimension** — push the operator where their answer feels too clean.

The 7 dimensions, in canonical order:

| # | Dimension | Question shape (general) |
|---|-----------|--------------------------|
| 1 | **Values** | What's non-negotiable in this domain? What would you walk away from a deal/decision/relationship over? |
| 2 | **Thinking Style** | How do you process information here — fast/intuitive, slow/deliberate, written/spoken, alone/with input? When do you trust your gut vs. defer to analysis? |
| 3 | **Blindspots** | Where do you know you systematically miss or distort? Where have you been corrected most often? What do trusted advisors push back on? |
| 4 | **Frameworks** | Which mental models do you reach for in this domain? Which do you trust most in conflict situations? |
| 5 | **Decision History** | What's the most consequential decision you've made in this domain? What's the pattern across your last 3-5 decisions here? |
| 6 | **Constraints** | What can't you spend (time / money / attention / risk)? What are the non-negotiable obligations? |
| 7 | **Goals** | What does "success" look like in this domain over the next 6-12 months? How will you know you got there? |

### Disconfirming Evidence Questioning (the signature move)

After every initial answer, push where it feels too clean. The operator will give a "should-be" answer first; the *true* answer surfaces under pressure. Use one of these prompts:

- *"That's a clear value. When have you violated it? What did that situation tell you about how you actually decide vs. how you think you decide?"*
- *"You said you reach for [framework] — when did it fail you? What did you learn from that failure?"*
- *"You said your blindspot is X. Who's told you that? What's the evidence? Or is X just what you've named to look self-aware about?"*
- *"You said the constraint is time. If I gave you 10× the time tomorrow, what would actually change? If nothing — time isn't the real constraint."*

This is what surfaces real Blindspots specifically (the operator can't self-report what they don't see) and refines every other dimension.

### Branch-specific question depth

- **Strategic branch:** spend 50%+ of questioning time on dimensions 4-6 (Frameworks · Decision History · Constraints). Decision History is where the *pattern of past choices* reveals priors better than any self-report.
- **Learning/Creative branch:** spend 50%+ of questioning time on dimensions 1-3 (Values · Thinking Style · Blindspots). The operator is figuring out *who they are* in the domain; the work is meta-cognitive.

For full branch-specific question banks, read `references/branches.md`.

### Pacing

One question (or tight 2-3-question cluster on the same dimension) per turn. Wait for the operator's answer. Apply Disconfirming Evidence pushback. Move on once the answer feels earned, not generic.

**Refuse to accept generic answers.** "I value honesty" is not a value — every operator says that. "I close the laptop and walk away when a client lies about scope" is a value. Push until the answer is operator-specific and example-grounded.

---

## Phase 3 — Synthesis

When all 7 dimensions have earned answers (typically 25-40 minutes of conversation):

1. **Read every existing artefact** the operator named during questioning that could ground a dimension. If they cited the CCC ICP doc — read it. If they cited a [[Decisions & Rules]] entry — read it. If they cited a thinker (Simmons, Stutz, Tegmark) — note the lineage. This makes the profile *cite-aware*, not just self-reported.

2. **Draft the Profile Card** (see Output Formats below). Each dimension: 2-5 sentences, operator-specific, example-grounded.

3. **Show the draft to the operator before saving.** Critical step. Ask: *"Here's the draft Profile Card. Read it as if a future Claude session were loading it. What lands? What's wrong? What's missing?"* Iterate until the operator says it captures them.

4. **Once locked,** generate the other three artefacts (Usage Guide, Prompt Templates, Refresh SOP) — these are derived from the Profile Card and the intake, less iteration needed.

For full output templates, read `references/templates.md`.

---

## Phase 4 — Save & integrate

1. **Folder:** `00 - COMMAND CENTER/Foundational Docs/Profiles/[Domain Name Slug]/`. Slug the domain name (replace spaces with `-`, lowercase).

2. **Files:**
   - `Profile Card.md`
   - `Usage Guide.md`
   - `Prompt Templates.md`
   - `Refresh SOP.md`
   - `_intake.md` (the original 4 intake answers + branch decision, for audit trail)

3. **Frontmatter on Profile Card.md:**
   ```yaml
   ---
   type: specialized-memory-profile
   operator: "[[Daniel Förster]]"  # or the named operator
   domain: "[domain name]"
   branch: strategic | learning-creative
   use_case: personal | team | product
   refresh_cadence: weekly | monthly | quarterly | ad-hoc
   created: YYYY-MM-DD
   last_refreshed: YYYY-MM-DD
   version: v0.1
   related:
     - "[[Three Brains Charter]]"
     - "[[The Five Stages of Third Brain Mastery — Curriculum]]"
     # plus any domain-specific docs the profile cites
   tags: [specialized-profile, simmons, second-brain]
   ---
   ```

4. **Cross-link from related vault docs.** If the profile is for a CCC strategic domain → wikilink from CCC foundations. If it's a leadership-of-LONNEL profile → wikilink from LONNEL person files. The profile shouldn't be an orphan note.

5. **Update `_index.md` in the Profiles folder** (create if missing) listing all profiles with their domain + branch + last_refreshed date.

6. **Confirm the save** with a Cowork file link (`computer://...`) so the operator can open the Profile Card and verify.

---

## Integration with other skills (post-build, no action needed during build)

Once the Profile Card exists, these skills should detect and use it:

- **`second-brain-connect`** — when running cognitive operations in this domain, load the Profile Card as system context to ground operations in the operator's actual priors. Add detection: glob for matching profile in `00 - COMMAND CENTER/Foundational Docs/Profiles/` based on the target domain.
- **`third-brain-mastery`** — Stage 2 (Perspective Prompting) of the Five Stages curriculum requires specialized profiles. After this skill completes, surface to the operator: *"You've now built one of the profiles required for Stage 2. Stage 2 unlocks once you have 3 profiles."*
- **`ccc-mental-model-recipes`** — when the operator's preferred Recipes are noted in the Frameworks dimension, auto-suggest those when matching task shape.
- **`ccc-sales-prep`** / **`ccc-discovery-roleplay`** — a CCC sales profile sharpens these skills' outputs. When run for a CCC engagement, check for a CCC strategic profile and load it.
- **`gtm-discovery`** — *parallel, not merged*. If the operator's domain has a GTM venture (CCC, EI, LONNEL), suggest running gtm-discovery for the venture's market-facing docs *separately*. The profile cites those docs; they answer different questions.

---

## Output Formats

### Profile Card.md template

```markdown
# Specialized Memory Profile — [Domain Name]

**Operator:** [[Operator Name]]
**Domain:** [domain name]
**Branch:** Strategic / Learning-Creative
**Version:** v0.1 (created YYYY-MM-DD)
**Last refreshed:** YYYY-MM-DD

> *Load this Profile Card as system-prompt context before working with the operator in this domain. Future Claude sessions: cite specific dimensions when offering analysis, recommendations, or pushback.*

---

## 1. Values
[2-5 sentences. Operator-specific, example-grounded. Front-weight in Learning/Creative branch.]

## 2. Thinking Style
[2-5 sentences. How they process information in THIS domain — not generic.]

## 3. Blindspots
[2-5 sentences. Surfaced via Disconfirming Evidence Questioning. NOT just "I'm too detail-oriented".]

## 4. Frameworks
[2-5 sentences. Mental models reached for in THIS domain. Cite vault wikilinks where they exist.]

## 5. Decision History
[2-5 sentences. Pattern across last 3-5 consequential decisions. Includes specific examples.]

## 6. Constraints
[2-5 sentences. Real constraints — time/money/attention/risk/obligations — that pre-shape choices.]

## 7. Goals
[2-5 sentences. Success criteria over 6-12 months. How the operator will know they got there.]

---

## How to use this profile

[1-2 sentences pointing to Usage Guide.]

*Refresh cadence: [weekly|monthly|quarterly|ad-hoc]. See Refresh SOP.*
```

### Usage Guide template, Prompt Templates structure, Refresh SOP

For the full templates of the other three output artefacts, read `references/templates.md`.

---

## Rules (Update This Section When Things Go Wrong)

1. **Never produce a Profile Card without showing the draft to the operator first.** A profile that the operator hasn't validated will not be loaded into future sessions — it's dead artefact. Iteration in Phase 3 is non-negotiable.

2. **Never accept a generic answer to a dimension question.** "I value integrity" is not a Value. "I walked away from a 50K engagement when the prospect lied about scope" is a Value. Push until specific.

3. **Never skip Disconfirming Evidence Questioning.** It feels uncomfortable to push back; that discomfort is what surfaces Blindspots. The skill's value is mostly here — without it, you produce a sanitised LinkedIn-bio version of the operator.

4. **Never merge profile-building with project discovery.** If the operator starts answering Values questions with their company's mission or their offer's positioning, gently redirect: *"That's the venture's positioning. I want yours — the operator behind the venture. What do YOU value here, separately from what the venture sells?"*

5. **Never invent dimensions the operator didn't earn.** If after Phase 2 a dimension is still thin (e.g., they couldn't name a Decision History pattern), say so on the Profile Card: *"Dimension under-developed at v0.1; revisit at next refresh."* Padding with generic content destroys trust in the artefact.

6. **Never start questioning without all 4 intake inputs.** No prototypical problem = no grounding for questions, and the profile becomes abstract. Stop and collect.

7. **Never default to Personal when the operator means Team.** A team profile (e.g., "How LONNEL leadership decides") needs *who's in scope* — Daniel + Jack + Anitta? Daniel only? Push for clarity.

8. **Always cite vault wikilinks where they exist.** If the operator names [[The Operator as Bottleneck]] as a framework they use, wikilink it in the Profile Card. The profile becomes part of the graph, not a standalone orphan.

9. **Always save the intake to `_intake.md`** in the profile folder. Future audits and v0.2 (domain-aware branching) need to know what triggered which branch.

10. **Always offer multiple options at branch-selection ambiguity.** If the prototypical problem straddles branches, name it explicitly and let the operator choose — don't silently pick.

---

## Self-Improvement

When the operator corrects a draft Profile Card or rejects an output:
- Note which dimension was too generic, too specific, off-tone, or missing key context
- Add a Rule above if the failure mode could repeat
- Save the corrected version as a reference example in `references/examples/` for future runs

When a Profile Card is approved on first draft:
- Note which framings of the questioning produced the strongest dimensions
- Save the conversation pattern as a reference example
- Surface to the operator whether the approved profile should become a template for similar domains (e.g., approved CCC strategic profile → template for "Strategic / Founder-led-business" use case)

When operators report 4+ weeks after building that the profile is being loaded into future sessions and producing better outputs:
- Capture the outcome in the Refresh SOP (what to preserve at refresh time)
- Use that signal to prioritise v0.2 features (which domain branches to add next)

When operators report the profile is *not* being loaded or is being ignored:
- That's a v0.3 signal — the closed-loop infrastructure (Decision Logger trigger + Refresh Orchestrator + Outcomes Tracker) is what closes this gap
- Capture the failure mode in `references/examples/` and surface to the next v0.3 build session

This skill is never finished. The more profiles get built and used, the better the questioning sequences become. Treat the references/ folder as a living archive.

---

## Anti-patterns table (the 3 most common failure modes)

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| Operator gives clean, sanitised answers throughout | Profile reads like a LinkedIn bio — generic, defensible, useless | No Disconfirming Evidence pushback applied | Re-run with explicit pushback at every dimension; expect 2-3 rounds before earning the real answer |
| Profile dimensions all 5+ sentences, very thorough | Profile is too long to load as system-prompt context (>800 tokens for the card alone) | Treating Profile Card as exhaustive documentation rather than embeddable context | Constrain to 2-5 sentences per dimension; move overflow into the Usage Guide |
| Operator says "I don't know" to several dimensions | Profile has multiple "Dimension under-developed" markers | Either the prototypical problem was too narrow OR the domain is too new for a profile | Either deepen via more time on dimensions that did land, OR defer the profile and recommend the operator try ad-hoc prompting in this domain for 4 weeks first, then re-build |

---

## When NOT to use this skill

- **Project / venture documents** — use `gtm-discovery` instead. ICP, positioning, voice, offer = market-facing artefacts, not operator profiles.
- **Single-session context** — if the operator is asking a one-off question, a Frontier Prompting move is faster than building a profile.
- **Brand-new domains** — if the operator has < 4 weeks of experience in a domain, the prototypical problem won't be grounded enough; defer the profile build.
- **Pure execution checklists** — if what's actually needed is a SOP, route to `ccc-sop-creator`.

---

*Skill v0.1 created 2026-05-06 from Simmons AI Second Brain Course Class 2 framework-extract. Companion to [[Vector DB Pilot — Project Plan]] (semantic profile retrieval upgrade) and [[Specialized Profile Builder — Skill Placement Decision]] (architecture decisions). v0.2 adds domain branches; v0.3 adds closed-loop infrastructure (Decision Logger trigger, Refresh Orchestrator, Outcomes Tracker).*
