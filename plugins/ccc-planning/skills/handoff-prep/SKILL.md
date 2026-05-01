---
name: handoff-prep
description: |
  Runs a fast 5-minute delegation handoff prep. Reads the active weekly plan to
  surface queued tasks, then helps the operator package the next 1–3 tasks with
  a clear brief — whether handing off to Claude (AI session) or a human team
  member (VA, contractor, specialist).
  Produces a tight brief with Goal, Context, and Definition of Done so whoever
  receives the task can start immediately — no back-and-forth needed.
  Use this skill whenever the operator says "prepare a handoff", "prep for Claude",
  "brief my VA", "delegation brief", "task handoff", "what should I hand off today",
  "prepare for my session with Claude", "prep a task for my team member",
  "I want to delegate something today", "get a task ready to assign", or any time
  they want to package a task for delegation — AI or human.
  Run before opening a Claude session or assigning work to a team member.
allowed-tools: "Read, Write, Glob"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.1.0
  created: 2026-03-06
  updated: 2026-03-06
  language: English
  framework: CCC Planning System — delegation & AI capacity optimization
  distribution: marketplace-ready
---

# Handoff Prep Skill

**Workflow: Load Queue → Select Task(s) → Identify Recipient → Package Brief**

Treat every handoff — to Claude or a human — like briefing a capable employee. The clearer the brief, the better the output. This skill front-loads the prep so execution starts immediately.

Session time: ~5 minutes.

---

## Background: Why Handoff Prep Matters

Whether you're opening a Claude Cowork session or assigning a task to a VA or contractor, the bottleneck is almost never capability — it's clarity. Vague handoffs produce vague outputs, require correction rounds, and eat more time than just doing it yourself.

A good handoff brief has three things: a clear goal, enough context to not need you during execution, and a crisp Definition of Done (DoD) so the recipient knows when they're finished.

This skill builds that brief in 5 minutes.

---

## Phase 0 — Context Load (automatic)

1. Read the active weekly plan: search for the most recent `*Weekly Plan*` in `00 - COMMAND CENTER/Daily Notes/`
2. Find the Delegation Queue table (added during weekly planning)
3. Read today's daily check-in if it exists: search for today's `*Daily Check-in*`
4. Surface what's queued:
   ```
   Tasks queued for delegation this week:
   1. [Task] — recipient: [Claude / Name] — context: [notes] — output: [expected]
   2. [Task] — recipient: [Claude / Name] — context: [notes] — output: [expected]
   ...
   ```
5. If no tasks are queued in the weekly plan: "No tasks pre-planned for handoff this week. Let's find the right one now."

---

## Phase 1 — Select Task(s) (1–2 questions, ~2 min)

**Q1 — Task selection**

*If tasks are queued:*
"Your delegation queue has [N] tasks. Which one do you want to prep — or should we batch [2–3 tasks] if they're small enough for one session?"

*If no tasks are queued:*
"Nothing pre-planned. What's on your TOP 10 list today that could be fully delegated — with a clear deliverable someone else can produce start to finish? (Research, drafting, building, analysis, systems, structured documents, admin — anything with a defined output.)"

**Q2 — Recipient**

"Who is this handoff for?"
- **Claude (AI session)** — will be pasted as a brief into a new Cowork session
- **Human team member** — will be shared via message/Slack/email or verbally

This determines how the brief is framed and formatted.

---

## Phase 2 — Context Check (~1 min)

"For [selected task(s)]: do you have all the files, background, and specifics [Claude / team member name] needs to start without asking questions? Or is there anything to gather first?"

If context is incomplete, help the operator identify what's needed before handing off — rather than burning session time or creating back-and-forth mid-task.

---

## Phase 3 — Package the Brief (~2 min)

For each task, produce a crisp brief in this format:

```
TASK: [Task name]
RECIPIENT: [Claude / Name + role]
GOAL: [What needs to be produced — specific output]
CONTEXT: [Background, key information, file paths, links, constraints, preferences]
DEFINITION OF DONE:
  - Facts: [measurable result — what does done look like objectively]
  - Feelings: [how should the output feel to read/use]
  - Functionality: [what must it enable or allow the next person to do]
PRIORITY: [High / Mid]
```

**Framing by recipient:**

- **Claude brief** — include file paths, vault locations, relevant system context. End with: *"Give Claude this brief directly as your first message in the new session."*
- **Human brief** — write in plain, direct language. Avoid internal jargon. Include any logins, tools, or references they'll need. Specify preferred communication method for questions (async message / one check-in call).

If batching multiple tasks for Claude, order by priority and estimate roughly how many turns each should take.

---

## Phase 4 — Output

Display the brief(s) directly in conversation.

Then say:
*"Your handoff brief is ready for [recipient]. [Start the Claude session with this / Send this to [name]] and they can begin immediately."*

Also offer:
*"Do you want me to save this brief to today's daily check-in file so it's on record?"*

If yes, append to today's Daily Check-in file under a new section:
```markdown
## Handoff Brief — [Recipient] — [Time]
[Brief content]
```

---

## Rules

- The goal is speed and clarity, not comprehensiveness. Keep it to 5 minutes. Don't over-engineer the brief.
- If the operator hasn't done weekly planning and has no tasks queued, help them identify one task quickly — don't spend the whole session deciding.
- The **Definition of Done is the most critical part**. Vague tasks produce vague outputs. Push for specificity here even if the rest stays loose.
- For Claude handoffs: remind the operator this prep is most valuable before opening a new session. If they're mid-session, the brief still helps — they can use it to reorient the current session.
- For human handoffs: flag any task that seems too vague or under-specified. Better to spend 2 more minutes clarifying than to get a wrong deliverable back.
- Never suggest delegating tasks that require the operator's judgment, relationships, or unique knowledge — those stay with them. Flag this if relevant.
- Keep all output in English.
