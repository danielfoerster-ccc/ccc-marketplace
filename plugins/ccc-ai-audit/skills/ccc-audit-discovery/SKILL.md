---
name: ccc-audit-discovery
description: "Runs Phase 1+2 of the AI Automation Audit: scoped discovery and process documentation. Guides the consultant through a pre-discovery questionnaire, a structured discovery call (or processes notes from one already held), and detailed process mapping using the 7-element documentation model. Produces structured process docs saved to the client folder. Accounts for real-world timing — stakeholder interviews and data gathering happen between sessions. USE THIS SKILL when starting an audit for a new client, after a discovery call that needs structuring, when the user says 'start discovery for [client]', 'document their processes', 'I just had a discovery call with [client]', 'here are my notes from the call with [client]', or 'map their workflows'. Also trigger when raw call notes or transcripts are pasted for an audit engagement."
allowed-tools: Read, Write
---

# AI Audit — Phase 1+2: Scoped Discovery & Process Documentation

**Workflow: Prep → Discover → Document.** Prepares for the discovery interaction, structures the findings, and produces detailed process documentation ready for VALUE scoring.

**Time investment:** 4-7 hours total (2-4 hours discovery + 2-3 hours documentation)
**Spread across:** 2-5 days (discovery call → follow-ups → documentation)

---

## Phase 1: Scoped Discovery (2-4 hours)

### Step 1 — Load Context

Read the client's person file from `03 - OPERATIONS/Relationships & Network/People/[Name].md` and any existing notes in their client folder.

If no person file exists, ask for basic context: company name, industry, team size, primary tools.

### Step 2 — Pre-Discovery Questionnaire

If the discovery call hasn't happened yet, generate a pre-discovery questionnaire for the consultant to send to the client 2-3 days before the call. Read the full template from `references/pre-discovery-questionnaire.md` and customize it for the specific client's industry and context.

The questionnaire covers: business overview, technology stack, process priorities, goals and constraints. It takes the client 10-15 minutes and reduces discovery call time by 40-60%.

Save to: `[Client Folder]/AI Audit/00 - Pre-Discovery Questionnaire.md`

### Step 3 — Discovery Call Guide

If the call is upcoming, prepare a tailored question set. The four minimum viable inputs from the call:

1. **30-minute discovery call** with the decision-maker
2. **List of current software/tools** used
3. **Description of 3-5 most time-consuming processes**
4. **Primary business goals** for the next 12 months

Use the "Flipped Interaction" technique: instead of preparing 50 questions, prepare 10 targeted questions and let the conversation reveal the rest. Key question categories:

- Primary business challenges and what triggered interest in automation
- Which processes consume the most team time each week
- Where errors or delays frequently occur
- Which tools don't talk to each other (integration gaps)
- What they'd automate first if it were easy
- Who else in the team should we talk to (stakeholder mapping)

### Step 4 — Structure Discovery Notes

If the call already happened (consultant pastes notes, transcript, or Fathom summary):

1. Extract the four minimum viable inputs from whatever was provided
2. Identify the 3-5 processes mentioned
3. Flag any missing information that needs a follow-up
4. Note which stakeholders were mentioned for potential interviews

Save to: `[Client Folder]/AI Audit/01 - Discovery Notes.md`

Format:
```
## Discovery Notes — [Client Name]
**Date:** [Date]
**Participants:** [Names + roles]
**Source:** [Call / Fathom transcript / Notes / Questionnaire]

### Business Context
[2-3 sentences: industry, size, what triggered the audit]

### Current Tech Stack
[Bulleted list of all tools mentioned]

### Processes Identified (for Phase 2 documentation)
1. [Process Name] — [brief description, who owns it, pain level]
2. ...

### Integration Gaps
- [Tool A] → [Tool B]: [what's manual between them]

### Goals (next 12 months)
- [Goal 1]
- [Goal 2]

### Key Quotes
> "[Direct quote capturing the pain]" — [Name, Role]

### Follow-Up Needed
- [ ] [What's missing and who to ask]

### Stakeholders for Interviews
- [Name, Role] — relevant for [which process]
```

---

## Phase 2: Process Documentation (2-3 hours)

### Step 5 — Document Each Process

For each of the 3-5 processes identified in discovery, create a detailed process doc using the 7-element model. This often requires follow-up conversations or stakeholder interviews — the consultant may need to schedule 15-30 minute calls with process owners.

Create one file per process at `[Client Folder]/AI Audit/02 - Process Documentation/[Process Name].md`

The 7 elements to capture for each process:

| Element | What to Capture |
|---------|----------------|
| **Process Name** | Clear, descriptive title |
| **Owner** | Person responsible — name and role |
| **Trigger** | What initiates the process (e.g., "new sale closes in CRM") |
| **Steps** | Sequential activities, 5-15 steps. Include decision points and handoffs. |
| **Systems Involved** | Which tools are used at each step, and where data moves between them |
| **Time per Execution** | Active time (hands-on) AND elapsed time (including waiting). Clarify which. |
| **Frequency** | How often: daily/weekly/monthly volume. Get a specific number. |

Plus pain points and errors:

| Element | What to Capture |
|---------|----------------|
| **Common Errors** | What goes wrong regularly, with frequency (e.g., "30% of the time") |
| **Error Impact** | What happens when errors occur — cost, delay, customer impact |
| **Pain Points** | Team frustrations in their own words |
| **Delays** | Where work gets stuck waiting (approvals, handoffs, data availability) |

### Step 6 — Before/After Sketch

For each documented process, sketch a "before" (current state with manual steps marked) and "after" (proposed automated state). This becomes powerful visual evidence in the audit report.

Format within each process doc:
```
### Current Flow (Before)
[Trigger]
→ [MANUAL] [Step 1 description]
→ [MANUAL] [Step 2 description]
→ [AUTO-POSSIBLE] [Step 3 description]
...
Total: X min/execution | Error rate: ~Y%

### Proposed Flow (After)
[Trigger]
→ [AUTO] [Step 1 automated]
→ [AUTO] [Step 2 automated]
→ [HUMAN] [Step 3 — requires judgment]
...
Total: X min/execution (human review only) | Error rate: <Y%
```

### Step 7 — Completeness Check

Before moving to scoring, verify all process docs have:

- [ ] All 7 elements filled in with specific data (not "a few minutes" — exact times)
- [ ] Error rates quantified (even rough: "about 1 in 5")
- [ ] Pain points captured in the team's own words
- [ ] Systems/tools named specifically (not "the CRM" — "HubSpot")
- [ ] Time estimates clarified as active vs. elapsed
- [ ] At least one direct stakeholder quote per process

If anything is missing, flag it and tell the consultant what follow-up is needed before Phase 3.

---

## Rules

1. Never skip the completeness check. Incomplete process docs produce weak VALUE scores and generic recommendations that don't convert.
2. Accept that data collection takes time. If the consultant only has partial information from one call, save what exists, flag gaps, and stop. Don't fabricate data points — clients catch made-up numbers instantly and trust evaporates.
3. Document processes at the level needed to identify automation triggers and actions — not every micro-click, but not vague summaries either. The test: could someone who's never seen this process understand where the automation opportunities are?
4. When the consultant pastes raw notes or a transcript, extract structure aggressively — don't just reformat. Pull out the processes, the tools, the pain points, the numbers. Then flag what's missing.
5. Stakeholder interviews are critical. The person on the discovery call (usually the founder/CEO) often doesn't know the actual pain points. The process owner does. Always identify who else to talk to.

---

## Self-Improvement

When a discovery session misses key information that blocks scoring later, add the missing element to the completeness check. When a particular industry has unique documentation needs (e.g., compliance processes in healthcare), note the adaptation.
