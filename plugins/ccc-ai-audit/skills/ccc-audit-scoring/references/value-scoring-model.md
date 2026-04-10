*Last updated: April 2026. Review before use if older than 90 days.*

# VALUE Scoring Model — Full Rubric

Score each process 1-5 on all five dimensions. Total possible: 25 points.

---

## V — Volume

How often is this process executed?

| Score | Frequency | Examples |
|-------|-----------|---------|
| 1 | Rarely (less than monthly) | Annual compliance filing, yearly contract renewal |
| 2 | Monthly | Month-end close, monthly invoicing batch |
| 3 | Weekly | Weekly reporting, weekly team updates |
| 4 | Daily | Daily order processing, daily data entry |
| 5 | Multiple times per day | Real-time lead routing, continuous customer support |

**Scoring notes:** Count actual executions, not just how often someone thinks about the process. A process that runs "daily" but only on weekdays is ~22/month, not 30.

---

## A — Automatable%

What percentage of the process steps can be automated with current no-code/low-code tools?

| Score | Automatable % | What This Means |
|-------|--------------|----------------|
| 1 | Less than 20% | Almost entirely human judgment — nuanced decisions, creative work, relationship-dependent |
| 2 | 20-40% | A few steps can be automated but core work requires humans |
| 3 | 40-60% | Roughly half automated — triggers and data moves are automatable, decisions need humans |
| 4 | 60-80% | Most steps are automatable with humans reviewing or handling exceptions |
| 5 | 80-100% | Fully automatable — rule-based, structured data, clear trigger-action patterns |

**Scoring notes:** Be honest about what "automatable" means today. Don't score a 5 because AI could theoretically handle it — score based on tools the client can actually use and maintain. If the process requires reading unstructured emails and making judgment calls, that's a 2, not a 4.

---

## L — Labor

How many hours does this process consume per month across all people involved?

| Score | Monthly Hours | Scale |
|-------|--------------|-------|
| 1 | Under 5 hours/month | Minor — less than 1 hour/week |
| 2 | 5-20 hours/month | Noticeable — 1-5 hours/week |
| 3 | 20-40 hours/month | Significant — half a work week per month |
| 4 | 40-80 hours/month | Major — 1-2 full work weeks per month |
| 5 | Over 80 hours/month | Massive — 2+ full work weeks per month |

**Scoring notes:** Calculate using actual data from the process doc: `Time per execution × Frequency per month`. Include all people involved — if 3 people each spend 10 min, that's 30 min per execution. Distinguish between active time (hands on keyboard) and elapsed time (including waiting). Use active time for labor scoring.

---

## U — User Impact

How many people are affected by this process — either doing it, waiting on it, or receiving its output?

| Score | People Affected | Scope |
|-------|----------------|-------|
| 1 | 1 person | Single person's task |
| 2 | 2-3 people | Small team or handoff between two roles |
| 3 | 4-10 people | Department-level impact |
| 4 | 11-50 people | Cross-department or customer-facing with moderate volume |
| 5 | 50+ people | Organization-wide or high-volume customer impact |

**Scoring notes:** Count everyone affected, not just the people executing. If a slow onboarding process affects every new customer (50/month), that's a 5 for user impact even if only 1 person runs the process. Think about who waits, who gets errors, who has to fix things when it breaks.

---

## E — Effort (Inverse)

How easy is the implementation? This is scored inversely — higher score means easier to implement.

| Score | Implementation Effort | What It Looks Like |
|-------|----------------------|-------------------|
| 1 | Very complex | Custom development needed, multiple APIs without existing connectors, regulatory review required |
| 2 | Complex | Multiple integrations with custom logic, uncommon tools, significant testing needed |
| 3 | Moderate | Several tools to connect, some configuration needed, standard APIs available |
| 4 | Simple | 2-3 tools, basic workflow, well-documented integrations |
| 5 | Very simple | Pre-built templates available, popular app connections, <4 hours setup |

**Scoring notes:** Consider the client's technical capacity. If they have no technical team, reduce the Effort score by 1 for anything requiring ongoing maintenance. Factor in: number of tools to connect, availability of native integrations, complexity of the logic (linear vs. branching), and whether templates exist.

---

## Score Interpretation

| Total Score | Priority | Action |
|-------------|----------|--------|
| 20-25 | 🔴 High Priority | Recommend immediate automation. Include in Quick Wins or Foundation package. |
| 15-19 | 🟡 Medium Priority | Plan for Foundation or Full Transformation package. Good ROI but may need more setup. |
| 10-14 | 🟢 Low Priority | Revisit in 6 months. Include only in Full Transformation or defer entirely. |
| Below 10 | ⚪ Not Recommended | Do not automate at this time. Explain why — the honesty builds trust. |

---

## Scoring Example

**Process:** Customer Onboarding (from GrowthLab sample)

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| V — Volume | 4 | 8 new customers/week = daily frequency |
| A — Automatable% | 5 | All 6 steps are trigger-action patterns with structured data. No judgment calls. |
| L — Labor | 4 | 60 min × 32/month = 32 hours/month |
| U — User Impact | 4 | Affects every new customer (32/month) + 3 internal team members |
| E — Effort | 5 | HubSpot → Make → Drive/Gmail/Asana/Calendly all have pre-built connectors |
| **Total** | **22/25** | 🔴 High Priority — implement immediately |

---

## Common Scoring Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Scoring Volume based on how important it feels | Volume is frequency, not importance | Count actual executions per month |
| Giving Automatable% a 5 because "AI can do anything" | AI capabilities ≠ practical automatable% | Score based on what works today with tools the client can use |
| Using elapsed time instead of active time for Labor | Waiting time inflates the score unfairly | Use hands-on time; note elapsed time separately |
| Ignoring downstream users for User Impact | The person running it isn't the only one affected | Count everyone who waits, receives, or fixes |
| Scoring Effort without considering the client's team | A technical solution is only easy if someone can maintain it | Adjust for the client's actual technical capacity |
