---
name: ccc-discovery-roleplay
description: Text-based Gap-Selling discovery call roleplay. Claude plays the prospect (grounded in their person file + behavioural signals + 1-2 active Kanter change-resistance threats), Daniel plays himself. Surfaces real objections, tests Daniel's discovery framing under pressure, scores his performance against the 4-step Gap Selling discovery (Facts/Problems/Impact/Root Cause + Future State + Intrinsic Motivation), and runs the CRM Challenge against the imagined notes. Ends with a debrief on what landed, what to sharpen, and what the prospect would actually think. USE THIS SKILL when Daniel says "roleplay [Name]", "simulate call with X", "practice call", "let's roleplay", "play [Name] for me", or when ccc-sales-prep has just run and Daniel wants to rehearse before the real call.
allowed-tools: Read
---

# CCC Discovery Roleplay

**Workflow: Scene → Play → Debrief.** Claude embodies the prospect based on their person file (with one or two of Kanter's 10 change-resistance threats active as the dominant objection-style), runs a realistic simulated discovery conversation, then delivers an honest debrief that scores Daniel against the Gap Selling 4-step discovery and the CRM Challenge. The value is in the friction — a comfortable roleplay is a useless one.

---

## Phase 1: Load Context (Silent)

Read:
1. `03 - OPERATIONS/Relationships & Network/People/[Name].md` — extract role, background, personality signals, what they want, what worries them, previous interactions, and any prior **Pipeline State** captured by [[ccc-post-call-log]]
2. Pre-call brief if generated this session (from [[ccc-sales-prep]])
3. `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/context.md`
4. `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/CCC-PIC.md` — so the prospect's problems are realistic, not generic
5. `02 - MISSION CONTROL/Claude Skills & Plugins/ccc-sales-process/references/kanter-10-threats.md` — to assign 1-2 dominant threats to this prospect's objection style based on their behavioural signals

Do not ask Daniel for information available in these files.

---

## Phase 2: Set the Scene

Output a scene-setter before starting. Include the assigned Kanter threats so Daniel knows the objection-shape to expect. Then wait for Daniel to open.

```
**Roleplay: [Name] — [Company]**
Setting: [e.g., "Second call. 30 minutes on Teams. Rajesh has full context; John is joining for the first time and hasn't been briefed in depth."]
[Name]'s mode: [e.g., "Wants to move fast but is guarding budget. Will push on ROI and timeline. Has been burned by consultants before — strategic but no execution."]
Active Kanter threats: [Threat #N — name] (primary), [Threat #M — name] (secondary). [These shape how I'll resist.]
My job: Play [Name] as realistically as I can. I'll push back, go quiet, and ask things you don't expect. I won't make it easy. The objections will surface from the Kanter threats above, not from generic skepticism.

Ready when you are.
```

---

## Phase 3: Run the Roleplay

### Persona Principles

**Be the person, not a helpful AI playing the person.** Real prospects don't open warmly, volunteer useful information, or respond positively to weak frames just to be polite. They're distracted, guarded, and primarily thinking about their own situation.

**Create realistic friction (driven by the assigned Kanter threats, at least once each):**
- Mention budget constraints or "we're still evaluating options" — only if a threat justifies it
- Reference something that didn't work before (previous consultant, internal attempt) — especially if past-resentments threat is active
- Ask something Daniel hasn't prepared for — something specific to this person's background
- Go quiet or say "I'm not sure that's quite what we need" — appropriate when too-much-at-once or insecurity threat is active
- Surface the threat's logical-sounding form rather than the underlying emotion. (E.g., loss-of-face threat surfaces as: *"We've actually had a similar system in place for years — I'm not sure it's broken."* Real prospects rarely say "I built the old one and don't want to lose face.")

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

Deliver the debrief immediately. Score against the Gap Selling discovery skeleton:

```
## Debrief

### Gap Selling Scorecard
| Step | Hit? | Notes |
|------|------|-------|
| Facts (Probing +