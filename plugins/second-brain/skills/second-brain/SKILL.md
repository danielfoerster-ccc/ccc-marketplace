---
name: second-brain
description: "Sets up or audits a Second Brain as a cognitive exoskeleton — Layer 1 infrastructure in the Four-Layer Architecture (Simmons): a substrate where the 9 cognitive operations can actually execute, not just notes that can be retrieved. Two modes: Setup (fresh vault — interviews the user, designs the five-folder architecture with wikilink density, category grammar, and stable folder semantics, outputs a human-executed setup guide + Why This Matters primer) and Audit (existing vault — scans structure AND operation-readiness, diagnoses fragmentation and storage-only patterns, proposes a phased migration with mandatory backup-first protocol). USE THIS SKILL when user says set up my second brain, organize my Obsidian, vault audit, reorganize my notes, build a second brain, my Obsidian is a mess, PKM setup, knowledge management system, digital brain, Three Brains setup, cognitive exoskeleton, or my vault is just storage."
allowed-tools: Read, Write, Bash
---

# Second Brain — Setup & Audit Skill

**Workflow: Assess → Architect → Deliver.**
Ask a few targeted questions to understand context, design an architecture specific to this person, then produce a document they can act on immediately. Claude never touches the vault directly — the human always owns the physical setup.

---

## The reframe — what this skill actually builds

Most Second Brain guides treat the vault as **storage**: a place to put notes so they can be retrieved later. That's necessary but not sufficient. A storage vault is a filing cabinet; a filing cabinet doesn't think.

This skill builds a **cognitive exoskeleton** — the Layer 1 infrastructure that makes the other three layers of the [[Simmons Under-the-Hood Pattern — Reconstruction|Four-Layer Architecture]] executable:

- **Layer 1 — Persistent Knowledge Infrastructure:** the substrate (this skill)
- **Layer 2 — 9 Cognitive Operations:** the verbs that run against the substrate (Analogical, Abductive, Counterfactual, Falsification, Bayesian, First Principles, Dialectical, Systems, Perspective)
- **Layer 3 — program.md + The Arena:** declarative contracts for how AI should act on the substrate
- **Layer 4 — Orchestration:** many AI instances running program.md against the substrate in parallel

The vault is the floor everything else stands on. If Layer 1 is broken, Layers 2–4 can't compound. That's the diagnostic frame of this skill.

**What "executable substrate" means in practice:** AI can navigate the vault by folder semantics alone; every concept, person, and framework is wikilinked so neighbourhood search works; notes are categorised (Lens / Operation / Recipe / Concept / Reference / Reflection / Trademark-candidate) so AI knows what kind of move each note affords; nothing lives in an orphan directory.

Embed this reframe in every output. The user should leave understanding they're not organising notes — they're building the substrate AI runs on.

---

## The Three Brains framing (keep in the output, not just in your head)

Simmons' Three Brains, adapted for the vault:

- **First Brain — Command Center:** the human's strategic operating layer. Daily notes, weekly plans, quarterly goals, identity documents, decisions log. Visited every day.
- **Second Brain — Knowledge Base:** permanent, compounding memory. Mental models, concepts, thinkers, distills, archives. What you want to know forever. In the AI era this is also the data layer AI queries.
- **Third Brain — Mission Control:** execution architecture. SOPs, Claude skills, prompt templates, playbooks. Where the factory is built — not where the work is done.

The operational layer (active projects, ongoing life) sits below these three cognitive layers. Together:

```
00 - COMMAND CENTER       ← First Brain — extension
01 - KNOWLEDGE BASE       ← Second Brain — conceptual memory
02 - MISSION CONTROL      ← Third Brain — interface
03 - OPERATIONS           ← Active projects + ongoing life areas (Second Brain — operational memory)
04 - ARCHIVE              ← Everything retired or completed
```

Numbered prefixes sort to the top in any PKM tool. The architecture is tool-agnostic; Obsidian implements it with folders and wikilinks, Notion with pages and databases, Logseq with namespaces. Note Obsidian specifics where relevant, but don't tie the architecture to one tool.

---

## Phase 1: Assess

Three questions — not more. You want to understand who this person is, what they already have, and what's broken. Don't ask for a tour; the audit does that.

1. **"Existing vault, or starting fresh?"** — fresh → Setup Mode; existing → Audit Mode. If you already know from context (path provided, files listed), skip this question.
2. **"What's the primary context? (Professional knowledge worker, entrepreneur/business owner, student, creative, or a mix?)"** — shapes what goes in Operations and how to talk about Command Center.
3. **"What's the one thing most broken or missing right now? If fresh, what's your biggest fear about building this?"** — surfaces real pain so the output feels tailored.

---

## Phase 2: Architect

### Setup Mode (Fresh Vault)

No scanning. Design the architecture from the three answers.

Produce:

1. The five-folder structure with personalised sub-folders (see `references/architecture-patterns.md` for context-specific variants).
2. A naming convention guide — numbered prefixes; wikilink-first ethos; category grammar tags in frontmatter (`type: Lens|Operation|Recipe|Concept|Reference|Reflection|Trademark-candidate`).
3. The first 10 anchor notes to create — one per layer minimum, plus a `CLAUDE.md` at root that tells any AI agent the folder semantics. Without the CLAUDE.md, AI loses orientation on every session.
4. A "Week 1 ritual" — the smallest possible daily habit (10 min max) that starts activating the system. Usually: one daily note + one wikilinked inbox capture.
5. **Context pre-loading (optional but strongly recommended):** offer a structured brain-dump covering business overview, customers, positioning, brand voice, goals & strategy, operations & tools, key relationships, personal background, working style, and Claude preferences. Answers feed directly into foundational files (`organization.md`, `brand.md`, `icp.md`, `strategy.md`, `stakeholders.md`, `Profile.md`, `CLAUDE.md`). This step is what makes AI useful from session one. If existing docs exist (agency briefs, brand guides, SOPs), ingest those first and only ask about gaps. Voice transcription beats typing (~10 min talking vs. 30 min typing).

### Audit Mode (Existing Vault)

Before analysing anything, output the backup block — and keep it prominent. Then scan structure AND operation-readiness.

> ⚠️ **STOP. BACKUP FIRST — THIS IS NOT OPTIONAL.**
>
> Before any reorganisation, create a complete backup of your entire vault folder. Copy it to an external drive, cloud storage, or commit everything with Obsidian Git. **Do this before moving a single file.**
>
> Your vault may contain book manuscripts, years of personal and professional diary entries, proprietary business documents, and intellectual property that cannot be recreated. No structural improvement is worth that risk.
>
> **⚖️ Liability notice:** This skill provides structural analysis and recommendations only. Every file operation described in this document is performed by you, the human operator — not by Claude or any automated agent. Neither this skill, its author, nor Anthropic can be held responsible for any data loss, corruption, or unintended changes resulting from reorganisation activities you choose to undertake. By proceeding, you confirm that you have created a verified backup.

Then scan using `Bash` (`tree`, `find`, `wc`) to map:

- Total note count
- Root-level loose files (homeless notes — the most reliable chaos indicator)
- Top-level folder count and their file distribution
- Folder naming patterns (any existing prefix system?)
- Nesting depth (anything beyond 4 levels is a navigation problem)
- Fragmented topics (same subject spread across multiple folders)
- **Published/versioned folder pairs** — folders that may be internal/external duplicates (`publish`, `public`, `site`, or near-identical folder names where one was likely created for Obsidian Publish, a website, or external sharing). Flag explicitly — never recommend merge without the human verifying which is live.

**Structural diagnostic checklist:**

| Check | Healthy | Flag |
|-------|---------|------|
| Root-level loose .md files | 0–5 | >10 |
| Top-level folder count | 4–8 | >12 or <3 |
| Max nesting depth | ≤4 levels | >5 levels |
| Single topic in multiple folders | 0 | Any |
| Published/versioned folder pairs | None | Any |
| Consistent naming convention | Yes | Mixed |
| Three Brains layers present | All 3 | Missing any |
| Archive folder exists | Yes | No |

**Operation-readiness diagnostic (the reframe):**

| Check | Healthy | Flag | Why it matters |
|-------|---------|------|----------------|
| Wikilink density (avg links per note) | ≥3 | <1 | Without links, AI can't traverse neighbourhoods — it sees isolated files, not a graph. |
| Root `CLAUDE.md` exists and describes folder semantics | Yes | No | Every session starts cold. No CLAUDE.md = AI re-infers the vault each time and gets it wrong. |
| Category grammar used (`type:` in frontmatter or consistent folders) | Yes | No | AI can't tell a Lens from a Reflection without tags. Category tells it which Operation applies. |
| Orphan directories (no CLAUDE.md, no README, unlinked) | 0 | Any | Dead zones. AI skips them; humans forget them. |
| Thinker / person profiles exist as first-class notes | Yes | No | Enables Perspective Simulation (one of the 9 Operations). |
| Decisions / Rules file exists and is appended to | Yes | No | Enables the teaching loop: corrections become codified. |

Surface the **top 3–5 structural problems AND the top 2–3 operation-readiness gaps** — don't list every flaw. Prioritise by impact on daily navigation and on whether Layers 2–4 can actually execute.

---

## Phase 3: Deliver

Output a single `.md` document saved to the vault root (or a specified output folder). Name it:

- Setup: `Second Brain — Setup Guide.md`
- Audit: `Second Brain — Vault Audit [YYYY-MM-DD].md`

### Setup output structure

```
# Second Brain Setup Guide
*[Date] — [Name / context]*

## Why You're Building This (the reframe)
[2–3 paragraphs on cognitive exoskeleton + Three Brains — specific to this person]

## Your Architecture
[Five folders with personalised sub-folder suggestions]

## How Each Layer Works in Daily Life
[Short, concrete: what goes there, when you visit, which Operations it enables]

## Category Grammar
[type: Lens|Operation|Recipe|Concept|Reference|Reflection|Trademark-candidate — what each means and when to use it]

## Setting It Up: Step-by-Step
[Numbered list — folder creation, first 10 anchor notes, root CLAUDE.md template, naming conventions]
[Obsidian-specific: enable core plugins, set daily note template location]

## Your Week 1 Ritual
[10-min daily habit that activates the system]

## What Comes Next
[Phase 2: content capture with knowledge-distill / knowledge-archive; Phase 3: interlinking via second-brain-connect]
```

### Audit output structure

```
# Second Brain Vault Audit
*[Date]*

## The Diagnosis
[2–3 sentences — honest, not harsh. Is this a storage vault or a cognitive exoskeleton?]

## By The Numbers
[Total notes, root-level homeless files, folder count, deepest nesting, wikilink density, CLAUDE.md presence]

[⚠️ BACKUP + LIABILITY BLOCK — HERE, NOT LATER]

## The Top Structural Problems
[3–5 problems with why each matters]

## The Operation-Readiness Gaps
[2–3 gaps — what Layer 2/3/4 capability is blocked by this]

## Your New Architecture
[Five-folder structure with migration mapping]

## Migration Plan
[Phased — 4 weeks max. One zone per week.]

## Why This Structure (the reframe)
[2–3 paragraphs: cognitive exoskeleton + Three Brains, specific to their context]

## What Comes Next
[Phase 2 capture skills; Phase 3 interlinking via second-brain-connect]
```

---

## Rules

1. **Never skip or bury the backup + liability block in audit mode.** It appears immediately after the diagnostic stats — before problems, before architecture, before anything actionable. If it's buried in the migration section, someone eager to start will move files before they read it. Position is everything.

2. **Never assume a duplicate folder is safe to merge.** When two folders cover the same topic (published/versioned pairs, manual internal/external copies), flag them with: "⚠️ Possible published or versioned pair — verify before merging or deleting." Obsidian Publish, static site generators, and manual public-facing copies are common. Merging can silently break a live site. Let the human investigate.

3. **Never produce a generic output.** An entrepreneur building an AI consulting empire needs a completely different setup than a student. Use what Phase 1 surfaced — names, contexts, specific examples.

4. **Don't audit note content — only structure and operation-readiness.** Scanning filenames, folder trees, wikilink counts, and CLAUDE.md presence is fast and non-invasive. Reading thousands of note bodies is slow, invasive, and out of scope. The structural + operation-readiness audit reveals 90% of what's broken. Atomic-note quality audits are a future skill.

5. **Keep the migration plan phased.** "Reorganise everything this weekend" will not be followed. Four weeks, one zone per week. The human needs to feel safe and in control.

6. **The reframe goes in the output every time.** Without it, the user treats the vault as storage and the architecture never compounds. Two paragraphs on cognitive exoskeleton + Three Brains, specific to their context — this is what makes the difference between a system they set up once and forget, and one they actually use.

7. **Don't get into internal linking, backlinks, or cognitive operations.** When users ask about linking, neighbourhood search, or running operations against their vault, acknowledge it's powerful and point at the [[second-brain-connect]] skill. This skill builds the substrate; that one executes against it.

8. **The architecture is the architecture.** Don't negotiate the five folders down to three or inflate them to ten based on preference. The numbered 00–04 structure is the prescription. Sub-folders inside each layer can be customised freely; the top-level structure is stable because AI needs predictable semantics across every session.

9. **Include a root CLAUDE.md in every setup, and flag its absence in every audit.** It's the single highest-leverage operation-readiness lever. Without it, every AI session starts blind.

---

## Self-Improvement

When a user pushes back on the architecture or a section consistently needs revision:
- Add the failure mode to the Rules section above
- Note what framing or language fixed it

When an output is approved without major edits:
- Note which specific framing of cognitive exoskeleton / Three Brains resonated
- Note which migration plan structure the user found most actionable
- Save approved outputs as reference examples (anonymised) in `references/`

This skill gets better every time it's used. The Rules section is a living document.
