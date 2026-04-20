---
name: framework-extractor
description: Extracts structured, actionable systems from books, courses, and frameworks — and turns them into Claude Cowork Skills and plugins. USE THIS SKILL when working with any framework source material: a book PDF, course transcript, notes, or a framework described in conversation. Runs five phases: (1) ingest and clarify the source, (2) decode the framework skeleton — steps, principles, decision points, sequencing, (3) build a Master SOP + step-level SOPs in HEROIC format, (4) run an automation audit (Claude Cowork Skill primary; n8n/tools/other automation secondary; human-only flagged), (5) output a plugin architecture proposal. Trigger on: "extract this framework", "turn this book into skills", "make a plugin from this course", "framework to SOP", "knowledge to plugin", "build a skill from this", or any time raw framework material (book, course, PDF, notes) needs to become a structured Claude Cowork system.
allowed-tools: Read, Write, Bash
version: 1.0.0
updated: 2026-03-26
---

**Workflow: Decode → Build → Audit → Architect.** Ingest raw framework material, extract its skeleton, build the SOP hierarchy, audit each step for Claude Cowork Skill potential, then propose a plugin architecture.

---

## Context

Frameworks — from books, courses, methodologies — are strategic in nature. They require a human to think through the process and apply it to a specific use case: either a CCC consultant doing this for a client, or a client working through it themselves. The goal of this skill is NOT to automate frameworks away. It is to turn them into **Claude Cowork Skills** — guided human processes where Claude acts as thinking partner, asking the right questions and structuring the outputs.

This skill is the first step in a three-skill pipeline:

> `framework-extractor` → `ccc-sop-creator` → `skill-creator-pro`

The output of this skill feeds directly into those two.

---

## Phase 1 — Ingest & Clarify

Start by understanding the source material and the operator's intent.

**Ask (or extract from context) the following:**

1. **Source type** — Is this a book, course, PDF, transcript, the operator's own notes, or a framework described verbally? Multiple sources allowed.
2. **Source content** — What has been shared so far? Read any uploaded files. Ask for what's missing.
3. **Operator's purpose** — Are they building this for CCC clients to use themselves? For CCC consultants to run with clients? For their own business? This shapes which steps need Skills vs. human-only judgment.
4. **Existing assets** — Has a Master SOP or any step-level SOPs already been created? Are there existing skills in this domain? Avoid duplication.
5. **Target plugin name** — Where should this live? Is it a new plugin or added to an existing one (e.g., `ccc-operations`, `ccc-buyback`, `ccc-planning`)?

Don't proceed to Phase 2 until you have enough to decode the framework accurately. One round of clarification is usually enough — don't over-interview.

---

## Phase 2 — Decode the Framework

Extract the skeleton of the framework from the source material.

Produce a structured summary with these components:

### Framework Skeleton

```
Framework Name: [Name as used in the source]
Core Promise: [What outcome does this framework deliver? One sentence.]
When to Use It: [What situation/problem does it solve?]
Who Runs It: [Consultant? Client? Both?]

Steps / Phases:
1. [Step name] — [what happens, what decisions are made, what the human does]
2. ...
N. [Step name] — ...

Key Principles: [3–5 non-negotiable rules the framework depends on]
Decision Points: [Moments where the human must make a judgment call — flag these]
Sequencing Rules: [Steps that must happen in order vs. steps that can flex]
Common Failure Modes: [What goes wrong when the framework is applied badly?]
```

Surface the framework logic, not just the steps. A step-by-step list without the principles behind it produces generic SOPs. The principles are where the leverage is.

---

## Phase 3 — Build the SOP Hierarchy

Produce two levels of SOP, ready to hand to `ccc-sop-creator` for formatting in HEROIC format.

### 3a — Master Framework SOP

One document covering:
- What this framework is and what it delivers
- When to use it (triggering conditions)
- The complete step sequence with brief descriptions
- Key principles and failure modes
- How the framework connects to other CCC tools and skills
- Prerequisites (what needs to be true before running this)

Keep this under 400 words. It is the navigation layer, not the detail layer.

### 3b — Step-Level SOPs

One SOP per major step (or per cluster of closely related micro-steps). Each step SOP covers:
- **Objective**: What this step achieves
- **Input**: What the human/consultant brings into this step
- **Process**: How to execute — what to do, what to ask, what to decide
- **Output**: What gets produced — a document, a decision, a conversation
- **Quality check**: How do you know this step is done well?
- **Common mistakes**: What goes wrong here

Flag which step SOPs are candidates for a Claude Cowork Skill (carry this forward to Phase 4).

---

## Phase 4 — Automation Audit

For each step, assess where Claude Cowork Skills add value. Be precise — not every step warrants a skill.

### Audit Framework

| Step | Claude Cowork Skill? | Rationale | Other Automation? | Human-Only? |
|------|---------------------|-----------|-------------------|-------------|
| [Step name] | ✅ / ❌ | [Why or why not] | [n8n, tool, webhook — if relevant] | [If yes, why] |

**Claude Cowork Skill = YES when:**
- The step requires the human to think through a process, apply a framework to their specific context, or make a structured series of decisions
- Claude can ask guiding questions, surface relevant vault context, and structure the output — but the human provides the judgment
- The step would benefit from being repeatable and consistent across different uses (different clients, different sprints, etc.)

**Claude Cowork Skill = NO when:**
- The step is a pure data transformation (better as a script or n8n workflow)
- The step is a single atomic action (send a message, book a meeting)
- The step requires physical presence, real relationships, or creative work that Claude cannot meaningfully scaffold

**Other automation flag:** Note n8n workflows, API calls, tool integrations that could handle deterministic parts of a step. These are secondary — flag them, don't design them.

**Human-only flag:** Explicitly mark steps that must remain with the human — relationship moments, intuition calls, final approvals. These are not failures of the framework; they are intentional. Mark them clearly so future skill builders don't try to automate them.

---

## Phase 5 — Plugin Architecture Proposal

Synthesise the output of Phase 4 into a concrete plugin proposal.

```
Plugin Name: [e.g., noah-kagan-launch / 48hr-blueprint]
Folder: 02 - MISSION CONTROL/Claude Skills & Plugins/[plugin-name]/

Skills to build:
- [skill-name] → covers [step(s)] → feeds into [output]
- [skill-name] → covers [step(s)] → feeds into [output]
...

Master SOP: [path where master SOP will be saved]
Step SOPs: [path where step SOPs will be saved]

Reads vault context from:
- [ICP/positioning/voice files if relevant — do not duplicate, point to canonical]

Suggested build order: [which skill to build first, which depends on others]

Estimated scope: [N skills, M SOPs, total plugin complexity: light / medium / heavy]
```

After presenting this proposal, confirm with the operator before anything is written to the vault. This is a design document, not a final output.

---

## Output Format

Deliver all five phases as a single structured response, with clear section headers. After Phase 5, ask:

> "Does this look right? Any steps to rename, merge, or split? Any skills I've missed or over-proposed?"

Once confirmed, offer to:
1. Write the Master SOP and step SOPs to the vault using `ccc-sop-creator` format
2. Create the plugin directory structure
3. Hand off to `skill-creator-pro` for each identified skill

---

## Rules

1. Never skip Phase 1. Decoding a framework without understanding the operator's purpose produces generic SOPs. Even if the source material is clear, ask about purpose and target audience.
2. Don't turn every step into a skill. Over-proposing skills creates maintenance burden and dilutes value. A good plugin has 3–7 tightly scoped skills, not 12 loosely defined ones.
3. Principles before steps. If the source material is a book or course, the principles are more important than the step list. Steps without principles produce checklists, not frameworks.
4. Point to vault context files — never duplicate them. If a skill will need ICP, positioning, or voice files, note the canonical vault path. Don't copy those files into the plugin folder.
5. Flag human-only steps explicitly. It's not a failure if a step can't be a skill. The framework is more trustworthy when its human-only moments are clearly marked.
6. Confirm before writing to vault. Phase 5 is a proposal. Get operator sign-off before creating any files.

---

## Self-Improvement

When a framework extraction produces an output the operator reshapes significantly:
- Add the pattern (what was wrong, what was right) to the Rules section above
- If a new source type causes problems (e.g., a course with non-linear modules), add a note to Phase 1 on how to handle it

When an extraction produces a plugin that gets built and used:
- Note which Phase 4 audit calls were accurate vs. missed
- Adjust the "Skill = YES when" criteria based on real usage

This skill is the entry point for all framework-to-plugin work at CCC. The more it's used, the better CCC's systems become. Keep it current.
