---
name: ccc-cashflow-client-onboard
description: "Guides CCC consultants through 32-step cashflow client onboarding: contract → payment → data access → scheduling → expectations. Generates engagement calendar, client folder structure, and 'Ready for Assessment' confirmation. Use this for new cashflow client intake, client engagement setup, onboarding checklist, client kickoff, welcome new client, start engagement, post-contract setup. Consultant-only skill."
allowed-tools: "Read, Write, Edit, Bash"
---

## Workflow: Guided 32-Step Onboarding

This skill guides you through four sequential phases that transform a signed contract into an active, data-complete, fully-scheduled engagement ready for assessment. Each phase builds on the previous one; all 32 steps must be completed before assessment begins.

**4 Phases:**
1. **Administrative Setup (Steps 1–8, Days 1–3)** — Contract filing, payment, CRM setup
2. **Access Provisioning (Steps 9–16, Days 3–10)** — Data access confirmed, 12+ months statements received
3. **Scheduling (Steps 17–31, Days 5–14)** — All meetings locked (kick-off, assessment, report, 4 quarterly reviews, follow-ups, year-end review)
4. **Expectations & Prep (Steps 32–33, Days 7–14)** — Timeline overview, responsibilities, success metrics, welcome packet, implementation benchmarks tracking

The skill walks you through each step in sequence, collecting information about your client, then generates:
- A printable 33-step checklist (for CRM or project management tool)
- An engagement calendar showing all 10–12 meetings + key dates
- A client folder structure (ready to create in your project management system)
- A master engagement document with client profile, success metrics, and communication preferences
- Email templates for data requests, scheduling, and client communications

**Core principle:** Sloppy onboarding leads to delayed assessment, incomplete data, and client frustration. Clean onboarding (all 32 steps within 10–14 days) ensures smooth assessment, rich data, confident recommendations, and clients ready to execute.

## How It Works

The skill operates in three distinct modes:

### Mode 1: Full Intake (New Client, No Info Yet)
Answer questions about your client (name, business type, revenue, contacts, payment received?) and I'll generate all 32 checklist items, engagement timeline, and templates. Typical duration: 15–20 minutes.

### Mode 2: Checklist Tracking (In Progress, Need Updates)
You're partway through onboarding. Paste your current checklist status and I'll:
- Identify which steps you've completed
- Flag any that are blocked or missing
- Suggest next actions
- Update your engagement calendar in real-time

### Mode 3: Missing Data Recovery (Data Gaps, Client Slow to Respond)
You're stuck waiting for data or client responses. Tell me what's missing, and I'll:
- Draft follow-up emails with clear, specific requests
- Suggest timeline adjustments
- Flag risk factors (late data could delay assessment)
- Recommend escalation tactics if client is unresponsive

## Procedure

### Step 1: Start the Onboarding Process

When you invoke this skill, tell me:
- **Client name** — [Legal name of business]
- **Your name** — [Your name as the consultant]
- **Contract signed date** — [YYYY-MM-DD]
- **Client business type** — [e.g., SaaS, E-commerce, Service, Agency]
- **Annual revenue (approx)** — [€X]
- **Primary contact** — [Name, email, phone]
- **Finance contact (if different)** — [Name, email, phone, role]
- **Payment status** — [Invoice sent / Payment received / Payment due date]
- **Accounting software** — [DATEV, Lexoffice, QuickBooks, Xero, other]
- **Your preferred CRM/project tool** — [HubSpot, Pipedrive, Notion, Asana, Obsidian]

If you don't have all of this, I'll ask follow-up questions.

### Step 2: I Generate Your Master Checklist

I'll create a complete, printable 32-step checklist organized by phase:

```
ONBOARDING CHECKLIST: [CLIENT NAME]
Contract signed: [DATE]
Target completion: [DATE + 14 days]

PHASE 1: ADMINISTRATIVE SETUP ☐
☐ Step 1: Contract signed & filed
☐ Step 2: Confirm payment method & schedule
... [etc., all 8 steps]

PHASE 1 COMPLETE: [SPACE FOR DATE] ✓
```

You'll also get:
- **Engagement Calendar** — kick-off (Week 2–3), 2-week empowerment/check-in call (Week 2–3), assessment (Week 3–4), report walkthrough (Week 5–6), 30-day strategy session (Month 1), 60-day strategy session (Month 2), quarterly reviews Q1–Q4 (Months 3, 6, 9, 12), follow-up calls after each quarterly review, year-end review (Month 12)
- **Client Folder Structure** — organized hierarchy for Contracts, Data, Reports, Meeting Notes, Tracking
- **Email Templates** — Data request, payment reminder, scheduling confirmation, welcome packet, final "Ready for Assessment" message

### Step 3: Track Your Progress

As you complete steps, tell me:
- "We've completed Steps 1–5 (Phase 1 done)"
- "Client sent bank statements on [DATE], payment received on [DATE]"
- "Kick-off call scheduled for [DATE] [TIME]"

I'll update your checklist in real-time, flag any gaps, and surface blockers.

### Step 4: Generate Final Deliverables

Once all 32 steps are done, I'll generate:
- A filled-in, date-stamped checklist (save to CRM or Notion)
- Master engagement document with all client info, success metrics, and timeline
- Final "Ready for Assessment" email template (send to client to confirm everything is locked)

## Rules (Update When Things Go Wrong)

1. **No assessment before 32/32.** Hard rule. Missing steps = incomplete picture = wrong analysis. Finish onboarding first, always.

2. **Data access is the critical path.** Everything else can happen in parallel, but you cannot move to assessment until you have:
   - Accounting software login tested (actually log in and verify access, don't just request)
   - Receipt/expense tracking tool invitations (e.g., Receipt Bank, Lexoffice) sent and confirmed
   - Tax authorization forms completed (e.g., RC59 or Vollmacht in DACH region)
   - 12+ months of bank statements (all accounts, all months)
   - P&L for past 3 years (or at least 12 months)
   - Online banking read-only access or statement export confirmed

3. **Schedule all meetings upfront (10–12 total over 12 months).** Don't schedule just the kick-off and assessment. Lock these on the calendar during onboarding: 2-week empowerment/check-in call, 30-day strategy session, 60-day strategy session, all 4 quarterly reviews (Q1, Q2, Q3, Q4), follow-up calls after each quarterly review, and year-end review. Tentative dates are fine, but they must be on the calendar. This prevents momentum loss and ensures continuous engagement.

4. **Require primary decision-maker + finance person for assessment and report walkthrough.** Only accepting bookkeeper = no owner buy-in = no implementation. Non-negotiable.

5. **Clarify what changes and when.** Client expectations about "how long will this take?" directly affect their willingness to implement. Be realistic: "Week 1: account setup (easy). Weeks 2–4: allocation changes (10 min/week). Month 2+: behavioral change (this is where the work lives)."

6. **If onboarding stalls beyond 14 days, escalate.** Slow client response = warning sign. Call them (don't email). "I have a window open [DATE]. Let's lock it." Create urgency.

7. **Use email templates for consistency.** The templates in this skill are battle-tested. Personalize them (names, dates, details), but don't rewrite them from scratch. Consistency = trust.

8. **Document everything in writing.** Kick-off call scheduled? Send calendar invite + confirmation email. Data access confirmed? Log the date. Payment received? Mark it in your CRM and send acknowledgment. Paper trail matters.

## Output Format

### Checklist Document
Save this to your CRM or Notion as-is. Use it to track progress with the client. Print it, mark boxes as you go.

### Engagement Calendar
Markdown table or iCal format, showing:
- All 10–12 meetings (kick-off, 2-week check-in, assessment, 30-day strategy session, 60-day strategy session, report walkthrough, Q1–Q4 reviews, follow-ups after each quarterly review, year-end review)
- Your prep time (blocks before each call)
- Deliverable deadlines (report due date, etc.)
- Client milestone dates (send data by X, decision by Y)

### Client Folder Structure
Copy-paste this into your project management tool or file system:

```
03 - OPERATIONS/[Client Name]/
├── Contracts/
│   ├── [Client Name] - CCC Engagement Contract - YYYY-MM-DD.pdf
│   └── [Client Name] - Engagement Expectations - YYYY-MM-DD.md
├── Data/
│   ├── Bank Statements/
│   ├── Financial Statements/
│   ├── Tax Returns/
│   └── [Client Name] - Account Structure - Current.md
├── Reports/
│   ├── Draft/
│   └── Final/
├── Meeting Notes/
│   ├── Kick-off - YYYY-MM-DD.md
│   ├── Assessment - YYYY-MM-DD.md
│   ├── Report Walkthrough - YYYY-MM-DD.md
│   └── Quarterly Reviews/
└── Tracking/
    └── [Client Name] - Engagement Master.md
```

### Master Engagement Document
A single markdown file with:
- Client profile (name, business, revenue, location, contacts)
- Engagement dates (signature, kick-off, assessment, report, Q1–Q4 dates)
- Success definition (3 metrics you've agreed on)
- Communication preferences (primary contact, email/WhatsApp/phone, response time expectations)
- Account structure summary (what each account is for)
- Internal notes (key concerns, founder personality, business risks)

### Email Templates
Pre-written, ready to customize:
- Data request email (specific ask: accounting login, 12 months statements, P&L)
- Scheduling confirmation email (all meetings locked, agenda, prep requirements)
- Welcome packet email (timeline overview, responsibilities, process explanation, success metrics)
- Final "Ready for Assessment" email (checklist confirmation, next steps)

## Self-Improvement

When you complete an onboarding and it goes well:
- Note which email template resonated most with the client
- Document any customizations you made that worked better than the template
- Save approved examples to the references/ folder

When an onboarding stalls or a step gets missed:
- Add a rule above explaining the failure mode and how to prevent it
- Note any client red flags (slow to respond, missing key contacts, unclear goals) that surfaced
- Share the pattern with other CCC consultants

When a client gives you feedback on the process:
- "The welcome packet was too long" → shorten references/welcome-packet-template.md
- "I didn't understand the 12 Profit Points framework" → clarify the explanation in the email template
- "I missed the meeting because the timezone wasn't clear" → add timezone confirmation to Step 23

This skill lives in your vault. Update it as you learn.

---

## Step 33: Implementation & Roll-Out Benchmarks (Living Tracker)

**Important:** This final step is intentionally left unchecked throughout the entire engagement. It is NOT a completion item.

This step creates a living document that tracks whether agreed-upon benchmarks are being met over time. It includes:
- Baseline metrics (taken at assessment)
- Quarterly benchmark targets (set during report walkthrough)
- Rolling actual performance against targets
- Notes on implementation progress, obstacles, and adjustments

Add to your client folder structure:
```
Tracking/
└── [Client Name] - Implementation & Roll-Out Benchmarks.md
```

This document stays open from assessment through the final quarterly review. Each quarterly review call includes a 10-minute benchmarks update. Do NOT close this step — it's your accountability mechanism.

---

## Related Files

For detailed step-by-step guidance, 32-step checklist breakdown, all email templates, and troubleshooting:
→ See `references/onboarding-checklist.md` (complete reference guide)

For the underlying methodology and philosophy:
→ See the SOP: `02 - MISSION CONTROL/SOPs & Playbooks/Cashflow Management/SOP Client Engagement Onboarding — CCC 2026-04-08.md`

For quarterly review meetings (after assessment):
→ See `SOP Quarterly Review & Rollout Adjustment — CCC`

For assessment itself (after onboarding):
→ See `SOP Profit Strategy Assessment Report — CCC`
