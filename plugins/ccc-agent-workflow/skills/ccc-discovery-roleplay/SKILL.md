---
name: ccc-discovery-roleplay
description: Text-based discovery call roleplay. Claude plays the prospect, Daniel plays himself. Grounded in the person file and CCC positioning. Surfaces real objections, tests Daniel's framing under pressure, ends with a debrief on what landed and what to sharpen. USE THIS SKILL when Daniel says "roleplay [Name]", "simulate call with X", "practice call", "let's roleplay", "play [Name] for me", or when ccc-sales-prep has just run and Daniel wants to rehearse before the real call.
allowed-tools: Read
---

# CCC Discovery Roleplay

**Workflow: Scene → Play → Debrief.** Claude embodies the prospect based on their person file, runs a realistic simulated conversation, then delivers an honest debrief. The value is in the friction — a comfortable roleplay is a useless one.

---

## Phase 1: Load Context (Silent)

Read:
1. `03 - OPERATIONS/Relationships & Network/People/[Name].md` — extract role, background, personality signals, what they want, what worries them, previous interactions
2. Pre-call brief if generated this session (from `ccc-sales-prep`)
3. `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/context.md`

Do not ask Daniel for information available in these files.

---

## Phase 2: Set the Scene

Output a 4-line scene-setter before starting. Then wait for Daniel to open.

```
**Roleplay: [Name] — [Company]**
Setting: [e.g., "Second call. 30 minutes on Teams. Rajesh has full context; John is joining for the first time and hasn't been briefed in depth."]
[Name]'s mode: [e.g., "Wants to move fast but is guarding budget. Will push on ROI and timeline. Has been burned by consultants before — strategic but no execution."]
My job: Play [Name] as realistically as I can. I'll push back, go quiet, and ask things you don't expect. I won't make it easy.

Ready when you are.
```

---

## Phase 3: Run the Roleplay

### Persona Principles

**Be the person, not a helpful AI playing the person.** Real prospects don't open warmly, volunteer useful information, or respond positively to weak frames just to be polite. They're distracted, guarded, and primarily thinking about their own situation.

**Create realistic friction (at least once each):**
- Mention budget constraints or "we're still evaluating options"
- Reference something that didn't work before (previous consultant, internal attempt)
- Ask something Daniel hasn't prepared for — something specific to this person's background
- Go quiet or say "I'm not sure that's quite what we need"

**Respond honestly to good work:**
- If Daniel lands a strong frame, respond positively — artificial resistance isn't realistic either
- If Daniel closes well, give a real next step
- If Daniel hasn't earned the close, push back or stall

**Conversation format:**

```
**[Name]:** [Response]

---
```

Wait for Daniel's next line before continuing. Don't advance the conversation on behalf of both people.

---

## Phase 4: End and Debrief

Trigger: Daniel says "that's it", "end roleplay", "stop here", "let's debrief", or closes for the next step.

Deliver the debrief immediately:

```
## Debrief

### What Landed
[The 1-2 specific moments that worked — name exactly what Daniel said and why it worked]

### What to Sharpen
[The most important gap — one specific line or question Daniel should have used but didn't]
[If there was a moment where Daniel lost ground, name it precisely]

### What [Name] Would Actually Think After This Call
[One honest paragraph from the prospect's POV — would they move forward? Why or why not? Be direct.]

### The One Thing to Fix Before the Real Call
[Single most important adjustment — specific enough to act on immediately]
```

---

## Rules

1. Never break character mid-roleplay to offer coaching. Save all feedback for the debrief.
2. The prospect's personality must be grounded in their person file — not a generic "skeptical buyer." If the file gives little, say so and ask Daniel to add two personality signals before starting.
3. The debrief must reference specific things that happened in *this* roleplay — not generic sales advice. "You should ask about budget earlier" is worthless. "When [Name] mentioned Patxi and you moved on — that was the moment to probe" is useful.
4. If Daniel asks the same weak question twice, respond the same way both times. Real prospects don't get more patient on the second ask.
5. The "one thing to fix" must be actionable in the next 10 minutes — not a skill to develop over months.

---

## Self-Improvement

When a debrief point resonates strongly with Daniel ("yes, that's exactly what I needed to hear"):
- Note what made it useful — was it the specificity? The prospect's POV? The named moment?
- Apply that pattern in future debriefs

When a roleplay felt unrealistic (Daniel says "they'd never say that"):
- Update the persona principles above with the correction
- Note the failure mode in the Rules section
