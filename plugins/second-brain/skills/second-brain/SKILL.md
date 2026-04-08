---
name: second-brain
description: "Sets up and audits Second Brain knowledge systems in Obsidian (and other PKM tools) using the Three Brains framework. Two modes: Setup (fresh vault — interviews the user, designs a 5-folder architecture, outputs a step-by-step guide + Why This Matters primer the human executes themselves) and Audit (existing vault — scans folder structure, diagnoses fragmentation, proposes a migration plan with mandatory backup-first protocol). USE THIS SKILL when user says set up my second brain, organize my Obsidian, second brain setup, vault audit, reorganize my notes, help me build a second brain, my Obsidian is a mess, PKM setup, knowledge management system, digital brain, organize my knowledge, second brain for Obsidian, Three Brains setup, or any request to set up or improve a personal knowledge management system."
allowed-tools: Read, Write, Bash
---

# Second Brain — Setup & Audit Skill

**Workflow: Assess → Architect → Deliver.**
Ask a few targeted questions to understand context, design the right architecture for this specific person, then produce a document they can act on immediately. Claude never touches the vault directly — the human always owns the physical setup.

---

## The Framework This Skill Builds On

Every output from this skill is rooted in Michael Simmons' **Three Brains** model, adapted for Obsidian (or any PKM tool). Embed this in your output — don't assume the user knows it.

The Three Brains are:

- **First Brain — Command Center:** Your strategic operating layer. Where you think, decide, and direct. Daily notes, weekly plans, quarterly goals, your vision and identity documents. You visit this every day.
- **Second Brain — Knowledge Base:** Your permanent, compounding memory. Mental models, ideas, thinkers, concepts, health knowledge, culture. Everything you want to know forever lives here and grows richer over time. In the AI era, this is also the data layer your AI agents query.
- **Third Brain — Mission Control:** Your execution architecture. SOPs, Claude skills, prompt templates, playbooks, workflows. This is where you build the factory — not just do the work.

The operational layer (active projects, ongoing life responsibilities, archived work) sits below these three cognitive layers. Together, the full structure is five folders:

```
00 - COMMAND CENTER       ← First Brain
01 - KNOWLEDGE BASE       ← Second Brain
02 - MISSION CONTROL      ← Third Brain
03 - OPERATIONS           ← Active projects + ongoing life areas
04 - ARCHIVE              ← Everything retired or completed
```

Numbers always sort to the top regardless of PKM tool. This replaces informal prefix hacks (like `A -`, `_`, `!`) with a clean, stable system.

**Tool note:** This architecture works in any PKM tool. Obsidian implements it with folders and `[[wikilinks]]`. Notion implements it with pages and databases. Logseq with namespaces. The skill output notes Obsidian specifics where relevant but the architecture is universal.

---

## Phase 1: Assess

Start with exactly **three questions** — not more. You want to understand who this person is, what they already have, and what's broken. Don't ask for a tour of their current system; the audit does that.

**Question 1:** "Do you have an existing vault/knowledge base, or are you starting fresh?"
- If **fresh** → go to Setup Mode
- If **existing** → go to Audit Mode

**Question 2:** "What's the primary context? (Professional knowledge worker, entrepreneur/business owner, student, creative, or a mix?)"

This shapes the architecture's emphasis — an entrepreneur's Operations folder looks very different from a student's.

**Question 3:** "What's the one thing most broken or missing right now? If you have no vault, what's your biggest fear about building one?"

This surfaces the real pain and makes the output feel tailored, not generic.

If the user gave you their vault path or you can see it from context, skip Question 1 — you already know it's existing. Don't ask questions you can already answer.

---

## Phase 2: Architect

### Setup Mode (Fresh Vault)

No vault scanning needed. Design the architecture based on their context from the three questions.

**Produce:**
1. The five-folder structure with personalized sub-folder suggestions (see reference file `references/architecture-patterns.md` for context-specific variants)
2. A naming convention guide (numbered prefixes, CamelCase vs. kebab-case for notes)
3. First 10 notes to create (priming the brain — starting with a few anchor notes in each layer makes it feel real)
4. A "Week 1 ritual" — the smallest possible daily habit that starts putting the system to work
5. **Context pre-loading (optional):** If the user wants to pre-load their vault with rich business and personal context from day one, offer a structured brain-dump covering: business overview, customers, positioning, brand voice, goals & strategy, operations & tools, key relationships, personal background, working style, and Claude preferences. The answers feed directly into foundational vault files (organization.md, brand.md, icp.md, strategy.md, stakeholders.md, Profile.md, CLAUDE.md). This step is optional but dramatically improves AI usefulness from the first session. Users can talk through the questions via voice transcription (~10 min talking beats 30 min typing). If they have existing docs (agency briefs, brand guides, SOPs), ingest those first and only ask about gaps.

### Audit Mode (Existing Vault)

Before analyzing, always:

> ⚠️ **BACKUP FIRST.** Before any reorganization, create a complete backup of your vault. In Obsidian: copy the entire vault folder to a backup location, or use the Obsidian Git plugin to commit everything. **Do this before moving a single file.** Personal manuscripts, years of diary entries, proprietary business documents — none of this is worth risking.

Before analyzing or presenting any architecture recommendation, always output the backup + disclaimer block **immediately after the diagnostic stats table** — before the problems list, before the architecture, before anything actionable:

> ⚠️ **STOP. BACKUP FIRST — THIS IS NOT OPTIONAL.**
>
> Before any reorganization, create a complete backup of your entire vault folder. Copy it to an external drive, cloud storage, or commit everything with Obsidian Git. **Do this before moving a single file.**
>
> Your vault may contain book manuscripts, years of personal and professional diary entries, proprietary business documents, and intellectual property that cannot be recreated. No structural improvement is worth that risk.
>
> **⚖️ Liability notice:** This skill provides structural analysis and recommendations only. Every file operation described in this document is performed by you, the human operator — not by Claude or any automated agent. Neither this skill, its author, nor Anthropic can be held responsible for any data loss, corruption, or unintended changes resulting from reorganization activities you choose to undertake. By proceeding, you confirm that you have created a verified backup.

Then scan the vault structure using `Bash` (tree or find commands) to map:

- Total note count
- Root-level loose files (homeless notes — the most reliable chaos indicator)
- Top-level folder count and their file distributions
- Folder naming patterns (any existing prefix system?)
- Nesting depth (anything beyond 4 levels is a navigation problem)
- Fragmented topics (same subject spread across multiple folders)
- **Published/versioned folder pairs** — folders that appear to be internal/external duplicates (e.g., a "publish", "public", or "site" subfolder; or near-identical folder names where one was likely created for Obsidian Publish, a website, or external sharing). These must be flagged explicitly — they are NOT safe to merge or delete without understanding which is live.

**Run the diagnostic checklist:**

| Check | Healthy | Flag |
|-------|---------|------|
| Root-level loose .md files | 0–5 | >10 |
| Top-level folder count | 4–8 | >12 or <3 |
| Max nesting depth | ≤4 levels | >5 levels |
| Single topic in multiple folders | 0 | Any |
| Published/versioned folder pairs detected | None | Any |
| Consistent naming convention | Yes | Mixed |
| Three Brains layers present | All 3 | Missing any |
| Archive folder exists | Yes | No |

Surface the **top 3–5 structural problems** only — don't list every flaw. Prioritize by impact on daily navigation and AI-agent usability (because the vault is also a data layer for Claude).

---

## Phase 3: Deliver

Output a single `.md` document saved to the vault root (or a specified output folder). Name it:
- Setup: `Second Brain — Setup Guide.md`
- Audit: `Second Brain — Vault Audit [YYYY-MM-DD].md`

### Document structure for Setup output:

```
# Second Brain Setup Guide
*[Date] — [Their name/context if known]*

## Why You're Building This
[2–3 paragraphs on Three Brains — written for a human, not a framework doc]

## Your Architecture
[The five folders with their personalized sub-folder suggestions]

## How Each Layer Works in Daily Life
[Short, concrete description of each layer — what goes there, when you visit it]

## Setting It Up: Step-by-Step
[Numbered list — folder creation, first notes, naming conventions]
[Obsidian-specific: enable core plugins, set daily note template location]

## Your Week 1 Ritual
[Concrete daily habit — 10 minutes max — that starts activating the system]

## What Comes Next
[Brief pointer to Phase 2: note capture, internal linking, AI integration]
```

### Document structure for Audit output:

```
# Second Brain Vault Audit
*[Date]*

## The Diagnosis
[2–3 sentence summary of the vault's current state — honest, not harsh]

## By The Numbers
[Stats: total notes, root-level homeless files, folder count, deepest nesting]

## The Top Problems
[3–5 problems with brief explanation of why each one matters]

## Your New Architecture
[The five-folder structure with migration mapping — what currently goes where]

## Migration Plan
[Backup instruction (PROMINENT), then phased migration — 4 weeks max, don't try to do it all at once]

## Why This Structure
[2–3 paragraphs on Three Brains — make the framework real for this specific person's context]

## What Comes Next
[Phase 2: content capture skill, internal linking, AI agent integration]
```

---

## Rules

1. **Never skip the backup + liability block in audit mode, and never bury it.** It must appear immediately after the diagnostic stats — before the architecture proposal, before the problems list, before anything the user might act on. If it's in the migration section, someone eager to start will move files before they read it. Position is everything here. The liability notice is not optional language — it makes explicit that Claude recommends, the human acts, and the human bears responsibility for outcomes.

2. **Never assume a duplicate folder is safe to merge.** When two folders cover the same topic (e.g., "EXINN Intelligence" and "EXINN Intelligence - Build Up", or any folder pair where one may be a published/external version), flag them explicitly with a warning: "⚠️ Possible published or versioned pair — verify before merging or deleting." Obsidian Publish, static site generators, and manual "public-facing" copies are common. Merging one into the other could silently break a live website or destroy an intentional separation. Let the human investigate and confirm before recommending any action.

3. **Never produce a generic output.** The setup guide for an entrepreneur building an AI consulting empire should feel completely different from one for a student. Use what you learned in Phase 1. Names, contexts, specific folder examples — all of it.

4. **Don't audit note content — only structure.** Scanning filenames and folder trees is fast and non-invasive. Reading thousands of note bodies is slow, invasive, and out of scope for v1. The structural audit reveals 80% of what's broken. Content analysis (linking, atomic note quality) is a future skill.

5. **Keep the migration plan phased.** A big-bang "reorganize everything this weekend" recommendation will not be followed. Four weeks, one zone per week. The human needs to feel safe and in control.

6. **Three Brains goes in the output, not just in your head.** Every person using this skill deserves to understand the *why* behind the structure. Two or three well-written paragraphs on the framework — specific to their context — makes the difference between a system they set up and forget and one they actually use.

7. **Don't get into internal linking or backlinks.** When users bring up Obsidian's linking features, acknowledge it's powerful and note it's Phase 2 — but don't try to handle it in this skill. It's a separate, substantial workflow.

8. **The architecture is the architecture.** Don't negotiate the five folders down to three or inflate them to ten based on user preference. The numbered 00–04 structure is the prescription. Sub-folders inside each layer can be customized freely; the top-level structure should not.

---

## Self-Improvement

When a user pushes back on the architecture or a section of the output consistently needs revision:
- Add the failure mode to the Rules section above
- Note what framing or language fixed it

When an output is approved without major edits:
- Note which specific framing of Three Brains resonated
- Note which migration plan structure the user found most actionable

This skill gets better every time it's used. The Rules section is a living document.
