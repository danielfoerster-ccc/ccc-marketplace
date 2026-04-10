*Last updated: April 2026. Review before use if older than 90 days.*

# Tool Selection Matrix

Match automation opportunities to the right tool based on problem type, client capability, and requirements.

---

## Primary Tool Selection

| Problem Type | Primary Tool | Secondary Option | Why |
|-------------|-------------|-----------------|-----|
| Simple app-to-app connections | Zapier | Make | Largest template library (7000+ apps), easiest learning curve |
| Complex multi-step workflows | Make | n8n | Visual builder with branching, better error handling, good pricing at scale |
| Data processing at high volume | n8n | Make | Self-hostable, unlimited operations, no per-operation costs |
| Text analysis and generation | ChatGPT/Claude API | Built-in AI features | Most flexible for custom NLP, classification, summarization |
| 24/7 phone/voice automation | Synthflow, VAPI | Bland AI | Purpose-built for voice, handles natural conversation |
| Internal knowledge base | Custom GPT / RAG setup | Notion AI | Trainable on company docs, accessible to non-technical users |
| Email sequences and nurture | Native CRM (HubSpot, etc.) | Zapier + email tool | CRM-native is always more reliable for email automation |
| Document generation | Make + Google Docs API | n8n + templates | Template population from structured data |
| Scheduling and routing | Calendly/Cal.com + Zapier | Make | Pre-built scheduling logic, avoid reinventing |

---

## When to Choose Each Tool

### Zapier

**Choose when:**
- Client is non-technical (no developer on staff)
- Budget is limited (free tier available, paid from $20/month)
- Simple trigger → action workflows (1-3 steps)
- Popular apps involved (7000+ integrations)
- Client needs to maintain it themselves

**Avoid when:**
- Complex branching logic needed
- High volume (>2000 tasks/month on lower plans)
- Custom API calls required frequently
- Client needs visual workflow debugging

**Typical monthly cost:** $0-$70 for most small business use cases

### Make (formerly Integromat)

**Choose when:**
- Client needs visual workflow builder
- Complex branching logic required (if/then, routers, error handlers)
- Multiple API calls per workflow
- Better pricing needed for high-volume scenarios
- Consultant is building and handing over

**Avoid when:**
- Client is very non-technical and needs to modify workflows
- Very simple 2-step automations (Zapier is simpler)
- Client has no interest in understanding the visual builder

**Typical monthly cost:** $10-$30 for most scenarios

### n8n

**Choose when:**
- Client has a technical team or developer
- Data privacy is critical (self-hosting option)
- High volume (1000+ operations/day)
- Custom integrations needed (code nodes)
- Client wants full ownership of their automation infrastructure

**Avoid when:**
- No technical staff to maintain
- Client wants simple set-and-forget
- Budget doesn't include hosting costs
- Quick turnaround needed (steeper learning curve)

**Typical monthly cost:** $0 (self-hosted) or $20+ (cloud)

### AI APIs (ChatGPT, Claude, etc.)

**Choose when:**
- Text generation or analysis is core functionality
- Dynamic decision-making needed (not rule-based)
- Content varies significantly (can't use templates)
- Human-like interaction required
- Classification, summarization, or extraction from unstructured text

**Avoid when:**
- Simple rule-based logic suffices
- Deterministic output needed (AI outputs vary)
- Budget is very tight (API costs scale with usage)
- Client uncomfortable with AI-generated content

**Typical monthly cost:** $10-$100+ depending on volume

---

## Selection Criteria Checklist

When matching a process to a tool, check these in order:

1. **Does a native integration already exist?** (e.g., HubSpot → Asana natively) → Use it before adding a third-party tool
2. **Is the workflow linear or branching?** → Linear: Zapier. Branching: Make or n8n
3. **What's the monthly execution volume?** → Under 500: any tool. Over 2000: Make or n8n for cost
4. **Does it involve unstructured text?** → Yes: add AI API. No: stick with workflow tools
5. **Who maintains it after handover?** → Non-technical: Zapier. Technical: n8n. Middle: Make
6. **What's the budget?** → Minimal: Zapier free/Make free. Standard: paid tier of any. Custom: n8n self-hosted

---

## Red Flags — Do NOT Recommend Automation When:

| Red Flag | Why | What to Do Instead |
|----------|-----|-------------------|
| Process changes monthly or more | Automation breaks with every change. Maintenance cost exceeds savings. | Document the process, revisit when it stabilizes |
| Requires significant human judgment | AI can assist but shouldn't decide. Compliance risk. | Recommend AI-assisted (human-in-the-loop), not fully automated |
| Handles unstructured data without patterns | No reliable trigger-action mapping possible | Recommend data structuring first, then automate |
| Volume below 20 executions/month | ROI won't justify setup + maintenance costs | Note as future opportunity when volume grows |
| Compliance requirements not understood | Automating a regulated process without understanding the rules creates liability | Flag for legal/compliance review before automating |
| No one on staff to maintain | Automation without maintenance degrades and breaks. No one to call when it stops. | Include ongoing support in proposal OR recommend managed service |

---

## When to Recommend Custom Development

Only escalate beyond no-code when ALL of these are true:

1. No-code tools genuinely cannot handle the use case (not "it would be nicer with code")
2. Budget exceeds $50K and a technical team is available
3. Client explicitly understands the maintenance commitment
4. Regulatory requirements prevent third-party tools

**Default position:** Start simple. 95% of complex AI projects fail to deliver ROI. The first automation should be the simplest one that proves value.

---

## Tool Stack Combinations (Common Patterns)

| Client Type | Typical Stack | Why |
|------------|--------------|-----|
| Non-technical small business | Zapier + native tools | Lowest maintenance burden |
| Growing agency/service firm | Make + AI APIs + Zapier (simple stuff) | Good balance of power and usability |
| Tech-forward SMB | n8n + Make + AI APIs | Maximum flexibility and control |
| Enterprise team | n8n (self-hosted) + custom APIs | Data sovereignty, full control |
