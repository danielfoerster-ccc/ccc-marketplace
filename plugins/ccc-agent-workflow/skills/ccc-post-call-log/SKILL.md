---
name: ccc-post-call-log
description: Post-call vault update. Takes Daniel's raw call notes (pasted or dictated), structures them into a meeting note, updates the person's file with new intel and interaction log entry, routes decisions to Decisions & Rules.md, and confirms exactly what was saved where. USE THIS SKILL when Daniel says "log this call", "post-call", "update after the call with X", "save call notes", "debrief this call", or pastes raw notes after a meeting. Also trigger if Daniel says "we just got off a call" and wants to capture it before moving on.
allowed-tools: Read, Write
---

# CCC Post-Call Log

**Workflow: Extract → Route → Confirm.** Takes raw call notes, extracts structured intel (decisions, action items, new intel on the person, relationship updates), routes each piece to the right vault file, and reports exactly what changed.

---

## Phase 1: Capture Notes

If Daniel hasn't pasted notes yet, ask:
> "Paste your notes — can be messy. I'll structure them."

If notes were shared in the conversation already, proceed silently.

---

## Phase 2: Load Context (Silent)

Before processing, read:
1. Person file: `03 - OPERATIONS/Relationships & Network/People/[Name].md`
   — Needed to correctly update the interaction log and avoid duplicating existing intel
2. Meeting note template: `03 - OPERATIONS/Intelligence/meetings/_TEMPLATE — Meeting.md`
   — If it exists; otherwise use the standard format below

---

## Phase 3: Extract and Route

From the raw notes, extract:

| Content type | Route to |
|---|---|
| Meeting summary + key points | New meeting note file (see format below) |
| New intel about the person | Append to their person file |
| Interaction log entry | Append to Interaction Log in their person file |
| Decisions made | Append to `00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md` if they affect CCC direction |
| Action items (Daniel's) | Meeting note + flag clearly in output |
| Action items (theirs) | Meeting note + note in person file |
| New stakeholders mentioned | Create stub in `03 - OPERATIONS/Relationships & Network/People/` if named |
| Project updates | Relevant project file in `03 - OPERATIONS/` |

---

## Phase 4: Write the Files

### Meeting Note

Save to: `03 - OPERATIONS/Intelligence/meetings/client-calls/[YYYY-MM-DD] - [Company] - [Context].md`

```markdown
---
type: meeting
subtype: client-call
date: YYYY-MM-DD
attendees: [Names]
project: [Project name]
status: completed
---

## Context
[1-2 sentences: where this fits in the relationship arc]

## Key Points
[Bullet points of substantive things covered]

## Decisions
[Anything agreed, confirmed, or resolved]

## Action Items
### Daniel
- [ ] [Action] — by [date if known]

### [Other party]
- [ ] [Action] — by [date if known]

## Notes
[Anything else worth capturing — tone, signals, things said between the lines]

---
*Meeting note created: YYYY-MM-DD*
```

### Person File Update

Append to the Interaction Log table:

```
| [Date] | [Event — e.g., "Follow-up call"] | [2-3 sentence summary of what happened and key signals] |
```

If new intel emerged about their role, company, concerns, or decision authority — add it to the relevant section of their person file (don't duplicate, update in place where possible).

### Wikilinks

Every person, project, or note referenced in any saved file must use `[[wikilinks]]`. Never plain text for named entities.

---

## Phase 5: Confirm

After saving all files, output a brief confirmation:

```
## Saved

- Meeting note → [file path]
- [Name]'s person file → updated interaction log + [what new intel was added]
- [if applicable] Decisions & Rules → [what was added]
- [if applicable] New person stub → [name + path]

Action items for you:
- [ ] [Item 1]
- [ ] [Item 2]
```

---

## Rules

1. Never create a meeting note without routing action items. Decisions buried in text get forgotten.
2. If the person file doesn't exist yet, create it using the standard template before updating it. Don't skip this and just write a note.
3. Wikilinks are mandatory for every named person, company, and project in every file saved. This is how the knowledge graph builds.
4. If Daniel's notes are very sparse (e.g., just "good call, will send proposal"), still create the meeting note and log the interaction — sparse notes are still worth preserving. Ask one clarifying question if something important is missing (like the agreed next step).
5. Never ask "should I save this?" — just save and report.

---

## Self-Improvement

When Daniel adds something to a saved note afterward ("I forgot to mention X"):
- Note what category of thing gets forgotten (often: next steps, pricing discussed, specific stakeholder signals)
- Add a prompt to the extract phase above to specifically ask about that category

When Daniel says a particular summary or action item extraction was exactly right:
- Note the framing that worked
