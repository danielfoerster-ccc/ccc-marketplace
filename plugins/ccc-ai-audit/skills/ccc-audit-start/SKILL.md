---
name: ccc-audit-start
description: "Entry router for the CCC AI Automation Audit. Assesses where the operator is in the audit process and routes to the correct phase skill. Covers the full 5-phase lifecycle: scoped discovery, process documentation, VALUE opportunity scoring, solution matching, audit report, and tiered proposal. USE THIS SKILL when someone mentions 'AI audit', 'automation audit', 'run an audit', 'start an audit for [client]', 'where are we with the audit', 'audit status', or any request about conducting a systematic evaluation of a business's workflows and automation opportunities. Also trigger when Daniel says 'diagnostic engagement' or 'audit a new client' or 'let's assess [company]'. Always use this skill as the entry point when the user hasn't specified which audit phase skill they need."
allowed-tools: Read, Write
---

# CCC AI Automation Audit — Entry Router

**Workflow: Assess → Route.** Determines where the operator is in the audit lifecycle and routes to the correct phase skill.

---

## What Is an AI Automation Audit?

A systematic evaluation of a business's workflows to identify where AI tools and automation can save time, reduce errors, and cut costs. The consultant maps how the business actually operates, scores each process by automation potential, matches problems to specific tools, and delivers a professional report with a tiered implementation proposal.

The full audit takes 8-14 hours of consultant work spread across multiple sessions over 1-2 weeks. Between sessions, the consultant conducts stakeholder interviews, collects data, and reviews processes — this real-world time is part of the methodology, not a limitation.

**Source methodology:** `03 - OPERATIONS/Execution Intelligence Agency/AI Audit/` (6 files, BenAI 5-Phase Framework)

---

## The 5-Phase Lifecycle

| Phase | Skill | Duration | What Happens |
|-------|-------|----------|-------------|
| 1+2 | `ccc-audit-discovery` | 4-7 hours | Scoped discovery call + process documentation. Pre-discovery questionnaire, stakeholder interviews, process mapping with 7 elements. |
| 3+4 | `ccc-audit-scoring` | 2-4 hours | VALUE scoring on all documented processes + solution matching via tool selection matrix. |
| 5a | `ccc-audit-report` | 2-3 hours | Professional 5-page audit report with executive summary, current state, opportunity matrix, solutions, and implementation roadmap. |
| 5b | `ccc-audit-proposal` | 1-2 hours | Tiered commercial proposal (Quick Wins / Foundation / Full Transformation) with ROI calculations using the client's own numbers. |

**Total:** 8-14 hours across 1-2 weeks. Expected conversion: 75% of paid audits convert to implementation.

---

## Phase 0 — Assess Current State

When this skill triggers, determine where the operator is:

**Q1:** "Which client is this audit for?"

Then check the client folder at `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client Name]/` for any existing audit files:

| If you find... | They're at... | Route to... |
|----------------|--------------|-------------|
| No client folder or no audit files | Not started | `ccc-audit-discovery` — start from scratch |
| Pre-discovery questionnaire or discovery notes, no process docs | Mid-Phase 1 | `ccc-audit-discovery` — continue where they left off |
| Process documentation files, no VALUE scores | Phase 2 complete | `ccc-audit-scoring` |
| VALUE scores + tool recommendations, no report | Phase 3+4 complete | `ccc-audit-report` |
| Report delivered, no proposal | Phase 5a complete | `ccc-audit-proposal` |
| Report + proposal delivered | Audit complete | Congratulate. Suggest: follow-up, retainer conversation, or case study documentation. |

**Q2** (only if not started): "Have you had a discovery call with them yet, or are we starting from zero?"

Based on the answers, route to the correct skill and summarize what's been done and what comes next.

---

## Client Folder Structure

Every audit creates files in the client's folder. The standard structure:

```
03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client Name]/
  AI Audit/
    00 - Pre-Discovery Questionnaire.md
    01 - Discovery Notes.md
    02 - Process Documentation/
      [Process Name].md (one per evaluated process)
    03 - VALUE Scoring Matrix.md
    04 - Solution Matching.md
    05 - Audit Report — [Client Name].md
    06 - Proposal — [Client Name].md
```

---

## Rules

1. Always check for existing audit files before routing. Don't restart an audit that's already in progress.
2. If the operator mentions a client who doesn't have a person file yet, create one from the template at `03 - OPERATIONS/Relationships & Network/People/_TEMPLATE — Person.md` before routing to discovery.
3. The audit is spread across multiple sessions. Each skill saves its outputs to the client folder so progress persists between sessions.
4. If the operator wants to skip phases (e.g., "I already know the processes, just score them"), allow it — but note what context might be missing.

---

## Self-Improvement

When an audit flow gets stuck at a particular phase transition, note what information was missing and add it as a checkpoint in the routing logic above. When a new audit pattern emerges (e.g., "mini-audit" for smaller engagements), document it as a variant.
