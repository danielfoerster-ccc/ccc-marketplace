---
name: ccc-audit-scoring
description: "Runs Phase 3+4 of the AI Automation Audit: VALUE opportunity scoring and solution matching. Takes completed process documentation and scores each process using the VALUE framework (Volume, Automatable%, Labor, User impact, Effort). Then matches top-scoring processes to specific tools using the tool selection matrix. Produces a scored opportunity matrix and solution recommendations saved to the client folder. USE THIS SKILL when process docs are complete and ready for scoring, when the user says 'score the processes for [client]', 'run VALUE scoring', 'which processes should we automate first', 'match tools to opportunities', or 'prioritize the automation opportunities'. Also trigger when the consultant has finished stakeholder interviews and process documentation and wants to move to analysis."
allowed-tools: Read, Write
---

# AI Audit — Phase 3+4: VALUE Scoring & Solution Matching

**Workflow: Score → Rank → Match → Verify.** Each documented process gets a VALUE score, processes are ranked by priority, top opportunities are matched to specific tools, and the consultant confirms before moving to reporting.

**Time investment:** 2-4 hours total
**Requires:** Completed process documentation from Phase 2 (at minimum 3 processes with all 7 elements filled in)

---

## Phase 3: VALUE Opportunity Scoring (1-2 hours)

### Step 1 — Load Process Documentation

Read all process docs from `[Client Folder]/AI Audit/02 - Process Documentation/`. Also read `01 - Discovery Notes.md` for business context and goals.

If process docs are incomplete (missing time estimates, error rates, or frequency data), stop and tell the consultant what's missing. Incomplete data produces weak scores — the consultant may need to schedule follow-up calls with process owners to fill the gaps.

### Step 2 — Score Each Process

Apply the VALUE framework to every documented process. Read `references/value-scoring-model.md` for the full scoring rubric.

The five dimensions, each scored 1-5:

| Dimension | What It Measures |
|-----------|-----------------|
| **V** — Volume | How often the process executes |
| **A** — Automatable% | What percentage of steps can be automated |
| **L** — Labor | Total hours consumed per month |
| **U** — User Impact | How many people are affected |
| **E** — Effort (inverse) | How easy implementation is (5 = easiest) |

For each process, show the reasoning behind each score — not just the number. The consultant needs to explain this to the client, and a bare score without context feels arbitrary.

Format per process:
```
### [Process Name]

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| V — Volume | X | [Why this score, referencing actual frequency data] |
| A — Automatable% | X | [Which steps are automatable, which need humans] |
| L — Labor | X | [Monthly hours from process doc] |
| U — User Impact | X | [Who's affected, how] |
| E — Effort | X | [Complexity assessment — tools needed, integrations] |
| **Total** | **XX/25** | |
```

### Step 3 — Build the Opportunity Matrix

Rank all processes by total VALUE score and assign priority:

| Score Range | Priority | Recommendation |
|-------------|----------|---------------|
| 20-25 | High | Immediate automation — include in Quick Wins or Foundation |
| 15-19 | Medium | Plan for Foundation or Full Transformation package |
| 10-14 | Low | Revisit in 6 months or include only in Full Transformation |
| Below 10 | Not Recommended | Do not automate — explain why |

Save to: `[Client Folder]/AI Audit/03 - VALUE Scoring Matrix.md`

Format:
```
## VALUE Scoring Matrix — [Client Name]
**Date:** [Date]
**Processes Scored:** [Number]

### Opportunity Matrix

| Process | V | A | L | U | E | Total | Priority |
|---------|---|---|---|---|---|-------|----------|
| [Name] | X | X | X | X | X | **XX** | High |
| ... |

### Score Details
[Full scoring breakdown for each process as shown in Step 2]

### Implementation Order

**Phase 1 — Quick Wins (30-60 days)**
[Highest-scoring process(es) — explain why they go first]

**Phase 2 — Foundation (60-120 days)**
[Medium-scoring processes — explain sequencing logic]

**Phase 3 — Expansion (120+ days)**
[Remaining processes or those requiring more complex setup]

### Red Flags
[Any processes that score well but have concerns — compliance, frequent process changes, unstructured data]
```

---

## Phase 4: Solution Matching (1-2 hours)

### Step 4 — Match Tools to Opportunities

For each process scoring 15+ (Medium or High priority), recommend specific tools. Read `references/tool-selection-matrix.md` for the decision criteria.

The core selection logic:

| Problem Type | Primary Tool | When to Choose It |
|-------------|-------------|-------------------|
| Simple app-to-app connections | Zapier | Non-technical client, popular apps, simple trigger→action |
| Complex multi-step workflows | Make | Visual builder needed, branching logic, multiple API calls |
| Data processing at scale | n8n | Technical team available, data privacy critical, high volume |
| Text analysis and generation | AI APIs (ChatGPT/Claude) | Dynamic content, classification, summarization |
| Voice/phone automation | Synthflow, VAPI | 24/7 phone support, call routing |
| Internal knowledge base | Custom GPT / RAG | Company-specific knowledge retrieval |

For each recommendation, specify:
- The exact tool(s) and why
- Estimated monthly tool cost
- Setup hours
- Complexity rating (Low / Medium / High)
- What the automated flow looks like (trigger → steps → output)

### Step 5 — Calculate ROI per Opportunity

For each recommended automation, calculate using the client's actual numbers:

```
Annual Time Savings = Process Time × Frequency × 12 × Automation%
Annual Cost Savings = Time Savings × Hourly Rate
First-Year ROI = (Annual Savings - Implementation Cost) / Implementation Cost × 100%
```

The hourly rate should come from the client's context — if not explicitly stated, ask the consultant to estimate. Never use generic industry averages without flagging them as estimates.

### Step 6 — Red Flag Check

Before finalizing, check every recommendation against red flags. Do NOT recommend automation when:

- The process changes frequently (monthly or more)
- It requires significant human judgment at core decision points
- It handles unstructured data without clear patterns
- Volume is below 20 executions per month (ROI won't justify the effort)
- Compliance requirements aren't fully understood yet
- The client doesn't have anyone who can maintain it

Flag anything that triggers these — the consultant can override, but the flag must be visible.

Save to: `[Client Folder]/AI Audit/04 - Solution Matching.md`

Format:
```
## Solution Matching — [Client Name]
**Date:** [Date]

### Solution Recommendations

#### 1. [Process Name] — VALUE Score: XX/25

**Problem:** [One sentence from process doc]
**Solution:** [Tool] workflow: [Trigger] → [Step 1] → [Step 2] → [Output]
**Expected Result:** [Current time] → [Automated time] | Save [X] hrs/month ($[X]) | [Error improvement]

**Complexity:** [Low/Medium/High] | **Tool:** [Name] ($[X]/month) | **Setup:** [X] hours

**ROI Calculation:**
- Annual time savings: [X] hours
- Annual cost savings: $[X]
- Implementation cost: $[X] (setup) + $[X] (tools/year)
- First-year ROI: [X]%

---
[Repeat for each process]

### Tool Stack Summary

| Tool | Monthly Cost | Used For |
|------|-------------|----------|
| [Name] | $[X] | [Which automations] |

**Total monthly tool cost:** $[X]
**Total annual tool cost:** $[X]

### Red Flags & Exceptions
[Any flagged items from the red flag check]
```

### Step 7 — Consultant Review

Present the complete scoring and matching to the consultant for review before moving to the report phase. Key questions:

- Do the scores match your intuition from the discovery conversations?
- Are there client-specific factors that should adjust any scores?
- Does the implementation order make sense given the client's capacity and priorities?
- Are the tool recommendations appropriate for the client's technical level?

The consultant may have context from stakeholder interviews that changes priorities — a process might score medium but the CEO cares about it deeply, or a high-scoring process might be blocked by a compliance review. Adjust accordingly and document why.

---

## Rules

1. Never score a process without specific data. "Takes some time" is not scorable. If the process doc says "a few minutes," send the consultant back to get real numbers.
2. Always show scoring reasoning, not just numbers. A bare matrix without explanation looks like it was generated randomly. The reasoning is what builds credibility with the client.
3. Use the client's actual numbers for ROI calculations. If hourly rates aren't available, ask for them. Flag any estimates clearly as estimates.
4. Don't force automation on everything. If a process scores below 10, say so clearly and explain why it's not worth automating. Recommending against automation builds more trust than recommending everything.
5. Check tool recommendations against the client's technical capacity. n8n is powerful but useless if nobody on the team can maintain it. Match the tool to the team, not just the problem.
6. The implementation order is a recommendation, not a decree. The consultant and client may resequence based on business priorities, and that's fine — but the VALUE scores provide the analytical backbone.

---

## Self-Improvement

When a VALUE score doesn't match the consultant's field experience, note what dimension was miscalibrated and why. When a tool recommendation turns out to be wrong (e.g., the client's Zapier plan can't handle the volume), add the edge case to the tool selection matrix. When a particular industry has scoring patterns (e.g., healthcare processes always score low on Effort due to compliance), document the pattern for future audits.
