---
name: ccc-linkedin-profile-audit
description: >
  CCC LinkedIn Profile Audit Skill. Audits LinkedIn profiles against Ben van Sprundel's
  profile-as-landing-page framework and CCC positioning standards. Uses Chrome to inspect
  the live profile, scores 6 weighted dimensions, generates ready-to-paste optimized copy
  for every section, and produces a .docx report with scorecard, rewrites, and completion
  checklist. Two modes: Own Profile (uses CCC foundational docs) and Client Profile
  (audits against CCC's gold standard profile).

  USE THIS SKILL when asked to: audit a LinkedIn profile, optimize a LinkedIn profile,
  review LinkedIn headline or About section, check LinkedIn copy, score a LinkedIn
  profile, improve LinkedIn presence, rewrite LinkedIn content, or prepare profile
  changes. Also triggers on: "LinkedIn audit", "LinkedIn profile review", "optimize my
  LinkedIn", "LinkedIn headline", "About section", "profile optimization", "LinkedIn
  profile score", "improve my profile", "LinkedIn landing page", "LinkedIn copy",
  "update my LinkedIn", "fix my LinkedIn".
allowed-tools: Read, Bash, Write, Glob, Grep
---

# CCC LinkedIn Profile Audit Skill

## Overview

**Workflow: Audit → Score → Rewrite → Report.**

This skill audits a LinkedIn profile against Ben van Sprundel's *profile as landing page*
framework and CCC's voice, positioning, and ICP standards. The key differentiator from
a generic LinkedIn review: it scores *and* rewrites. Every section with a gap gets
ready-to-paste optimized copy. The goal is to walk away with every element ready to go
live — not a list of vague suggestions.

**Two audit modes:**
- **Own Profile** — audits Daniel's CCC profile using foundational docs (positioning.md,
  voice.md, context.md, ICP.md). Generates CCC-aligned copy for every section.
- **Client Profile** — audits a client's profile against CCC's own finalized LinkedIn
  as the benchmark. Requires: client LinkedIn URL + their ICP/positioning context.

---

## Ben's Framework: Profile as Landing Page

Every element should push the ICP toward one action — booking a call or grabbing a
lead magnet. Visitors make their judgment in seconds. The five sections to audit:

| Section | What Ben requires | CCC weight |
|---------|-------------------|------------|
| Banner + Headline | Solution + Target Audience + Outcome called out clearly | 25% |
| Profile Photo + CTA Button | Professional, casual, coloured bg; CTA button always set | 10% |
| About Section | 5-part structure: hook → proof story → offers → who I help → links | 25% |
| Featured Section | 2 items: Book-a-Call CTA + Lead Magnet. One of the highest-CTR elements. | 20% |
| Experience Section | Company logo essential; description calls out ICP + links to offer | 10% |
| Activity & Social Proof | Recent original posting signals credibility and reach | 10% |

---

## Phase 0: Context Loading

**Load foundational documents before asking any questions.**

### Step 0.1 — Identify Audit Type

Ask: "Are we auditing your own profile or a client's profile?"
- **Own profile** → load CCC foundational docs (Step 0.2a)
- **Client profile** → load client context (Step 0.2b)

### Step 0.2a — Own Profile: Load CCC Foundational Docs

Look for these files in the workspace (adjust path to vault structure):
- `00 - CCC Foundation/positioning.md` → core positioning statement, ICP, value props
- `00 - CCC Foundation/voice.md` → tone, language DOs/DON'Ts, conviction statements
- `00 - CCC Foundation/context.md` → Daniel's role, network, infrastructure
- `00 - CCC Foundation/ICP.md` → ideal client profile (pain points, trigger moments, qualifiers)

Note what's found and what's missing. Missing docs don't block the audit — work with
what's available and call out the gap.

### Step 0.2b — Client Profile: Load Client Context

Ask for:
1. **LinkedIn URL** of the profile to audit
2. **ICP/Positioning context** — who do they target, what do they offer, key outcome
3. **CCC Gold Standard** — if Daniel's own profile has been audited and finalized,
   use it as the benchmark. Note if this is pending.

### Step 0.3 — Save Context Checkpoint

```bash
cat > linkedin-audit-context.json << 'EOF'
{
  "audit_type": "own|client",
  "profile_name": "",
  "linkedin_url": "",
  "context_docs_loaded": {
    "positioning": false,
    "voice": false,
    "context": false,
    "icp": false
  },
  "target_icp": "",
  "core_offer": "",
  "key_outcome": "",
  "primary_cta": "",
  "lead_magnet": ""
}
EOF
```

---

## Phase 1: Pre-Audit Setup

### Step 1.1 — Confirm LinkedIn URL

LinkedIn profiles follow: `https://www.linkedin.com/in/[custom-url]/`
Confirm the exact URL — custom URLs are case-sensitive and may have changed.

### Step 1.2 — Browser Login Check (REQUIRED GATE)

Open Chrome and navigate to the profile URL. **Before doing anything else, confirm the
login state.**

```
STOP AND CHECK:
- If LinkedIn is showing a login wall or redirect → STOP.
  Tell the user: "LinkedIn is showing a login page. Please log into LinkedIn in Chrome
  before I continue — I need to be logged in to see the full profile (About text,
  Featured items, contact info, CTA button)."
  Wait for confirmation, then re-navigate.

- If you can see the profile content → proceed.
```

LinkedIn is heavily JS-rendered. After confirming login, allow 3–5 seconds for the full
page to load before capturing any data. Take a screenshot immediately after load — use
it to verify what's visible.

---

## Phase 2: Discovery Questions

Only ask what context docs haven't already answered.

1. **Primary CTA** — What action should a profile visitor take? (Book a call / Download toolkit / Follow / Other)
2. **Lead magnet** — What's the lead magnet? (Name, URL, what it gives the visitor)
3. **Known weak spots** — What does the profile owner already suspect is underperforming?
4. **Language priority** — German-primary, English-primary, or bilingual? (Affects headline variants)

---

## Phase 3: Data Collection via Chrome

Navigate systematically. Capture everything verbatim — headlines, About text, Featured
captions, descriptions. Verbatim text is essential for copy rewrite in Phase 5.

### Step 3.1 — Banner + Headline

Record:
- Banner image: present? what does it communicate? is there visible text?
- Headline text (full, verbatim)
- Custom URL (keyword-optimised or default `/in/firstname-lastname/`?)

Evaluate against Ben's formula: **[Identity] | [Offer for ICP] → [Specific Outcome]**
- Is the solution explicitly stated?
- Is the target audience called out?
- Is a specific outcome named (hours, revenue, metric)?

### Step 3.2 — Profile Photo + CTA Button

Record:
- Photo quality: professional? casual? coloured or white background?
- Is the person recognisable at small (thumbnail) size?
- **CTA button**: is one set? (appears below the headline) What does it say? Where does it link?

⚠️ **The CTA button is the most-clicked element on a LinkedIn profile** (Ben's framework,
emphasis his). Missing = Priority 1 fix regardless of everything else. It takes 30 seconds
to set: Edit Profile → Contact info → Add website → set "Other" with label.

### Step 3.3 — About Section

Click "see more" before capturing — the truncated preview is NOT the full section.
Record the full About section text (verbatim).

Evaluate against Ben's 5-part structure:
1. **Above the fold (first 2 lines)**: Instantly clear who you help and what you build?
2. **Proof story (2–4 lines)**: Credibility, context, what you've done?
3. **Offers + outcomes (bullet list)**: Core offers each mapped to a specific outcome?
4. **Who I help (short list)**: Types of clients/companies explicitly named?
5. **Stay connected (links)**: CTA link, lead magnet link, newsletter or YouTube?

For **Own Profile audit**, cross-reference against voice.md:
- Any use of "consultant", "transform", "empower", "next-level"? Flag each instance.
- Does it land on specific numbers (hours saved, margin points, timeline)?
- Does it read like a landing page or like a CV?

### Step 3.4 — Featured Section

Record:
- Total number of Featured items
- For each item: title (verbatim), description/caption (verbatim), destination URL

Evaluate:
- Item 1: is it a clear Book-a-Call CTA with a strong title and visual?
- Item 2: is it a lead magnet or high-value resource for the ICP?
- More than 2 items? (2 is optimal per Ben — more dilutes attention)
- Are thumbnails visually compelling or generic/default?

⚠️ **The Featured section has one of the highest CTRs on any LinkedIn profile** (Ben's
framework). Empty = Priority 1. Generic content or "demo placeholder" = Priority 1.
This is the second piece of real estate most people completely neglect.

### Step 3.5 — Experience Section

Record:
- Current role title + company name
- Company logo: visible? (requires a LinkedIn Company Page to exist)
- Current role description: present? Full text verbatim.
- Number of past roles
- Any skills, endorsements, recommendations visible

Evaluate:
- Logo showing? If not: fastest trust-building fix available (10 min to create a Company Page)
- Does the description call out the ICP?
- Does it include a link or CTA?

### Step 3.6 — Activity & Social Proof

Scroll to the Activity section. Record:
- Date of most recent original post (not repost, not reaction — original content)
- Visible engagement on last 2–3 posts (likes, comments — estimate ranges are fine)
- Follower count and connection count (usually visible near the top)
- Is the activity feed showing mostly own posts, or mostly reactions to others' content?

---

## Phase 3b: Data Checkpoint

Save all collected data before analysis. This enables session resumption if needed.

```bash
cat > linkedin-audit-data.json << 'EOF'
{
  "profile": {
    "name": "",
    "custom_url": "",
    "headline": "",
    "follower_count": 0,
    "connection_count": 0,
    "cta_button_present": false,
    "cta_button_label": "",
    "cta_button_destination": ""
  },
  "banner": {
    "present": false,
    "visible_text": "",
    "calls_out_solution": false,
    "calls_out_audience": false,
    "calls_out_outcome": false
  },
  "about_section": {
    "full_text": "",
    "part1_hook_present": false,
    "part2_proof_present": false,
    "part3_offers_present": false,
    "part4_who_i_help_present": false,
    "part5_links_present": false,
    "banned_language_found": []
  },
  "featured_section": {
    "item_count": 0,
    "items": []
  },
  "experience": {
    "current_role": "",
    "company": "",
    "company_logo_present": false,
    "description_text": "",
    "past_roles_count": 0
  },
  "activity": {
    "most_recent_original_post_date": "",
    "avg_engagement_notes": "",
    "content_mix": "original|reactions|mixed"
  },
  "audit_date": ""
}
EOF
```

---

## Phase 4: Scoring

Score each dimension 0–100. Apply weights. Sum for overall score.

**Dimension 1 — Banner + Headline (25%)**

| Score | Criteria |
|-------|----------|
| 85–100 | Headline uses formula (Identity + Offer for ICP + Specific Outcome). Banner visually reinforces. Visitor knows in 5 seconds who you help. |
| 65–84 | Headline hits 2 of 3 formula elements. Banner present but generic. |
| 40–64 | Headline is a job title with no audience or outcome. Banner absent or stock photo. |
| 0–39 | Headline is confusing, keyword-stuffed with no clarity, or says nothing about value. No banner. |

*Known traps:* Headline in one language for an audience primarily in another (flag as strategic misalignment). Banner present but no text (missed opportunity, cap at 70).

**Dimension 2 — Profile Photo + CTA Button (10%)**

| Score | Criteria |
|-------|----------|
| 85–100 | Professional, casual, smiling, coloured background. CTA button set and linked to primary offer. |
| 65–84 | Good photo. CTA button present but linked to a weak destination (generic homepage). |
| 40–64 | Acceptable photo but no CTA button. |
| 0–39 | Missing CTA button AND photo is unprofessional, generic, or absent. |

*The CTA button fix is always Priority 1 regardless of the score. 30 seconds. Do it.*

**Dimension 3 — About Section (25%)**

| Score | Criteria |
|-------|----------|
| 85–100 | All 5 parts present. Above-fold hook makes ICP and offer clear in 2 lines. Offers mapped to specific outcomes. Links live. Voice aligned to brand. |
| 65–84 | 3–4 parts present. Hook readable but not sharp. Links present. |
| 40–64 | 2 parts or fewer. Generic text. No outcomes. No links. |
| 0–39 | Outdated, empty, or a CV. No hook. No offers. Reads like a biography. |

*For Own Profile: deduct 5 points per banned language instance. Add observation note for each specific number used (good signal).*

**Dimension 4 — Featured Section (20%)**

| Score | Criteria |
|-------|----------|
| 85–100 | 2 items. Item 1 = compelling Book-a-Call CTA with strong visual. Item 2 = lead magnet or resource for ICP. Both linked correctly. |
| 65–84 | 1–2 items present, but one is off-target, generic, or links somewhere unexpected. |
| 40–64 | Items present but not strategic (old post, company article, no CTA intent). |
| 0–39 | Empty, placeholder content, or single item with zero strategic intent. |

**Dimension 5 — Experience Section (10%)**

| Score | Criteria |
|-------|----------|
| 85–100 | Company logo present. Current role description calls out ICP and includes a CTA link. Past roles filled in. |
| 65–84 | Logo present. Description thin — no ICP callout or link. |
| 40–64 | No company logo (Company Page not created). Description present. |
| 0–39 | No logo, no description. Profile reads as "not fully operational." |

**Dimension 6 — Activity & Social Proof (10%)**

| Score | Criteria |
|-------|----------|
| 85–100 | Original posts within 7 days. Visible engagement (comments, reactions). Activity feed shows original content, not just reposts. |
| 65–84 | Original posts within 14 days. Decent engagement. |
| 40–64 | Original posts within 30 days. Limited engagement. |
| 0–39 | No visible original content in 30+ days, or activity feed is entirely reactions to others' posts. |

### Score Interpretation

| Score | Label | What it means |
|-------|-------|---------------|
| 80–100 | Excellent 🟢 | Profile works as a landing page. Visitors know in 5 seconds who you help and what to do next. |
| 65–79 | Good 🟡 | Solid foundation. 2–3 targeted fixes would push to excellent. |
| 50–64 | Average 🟠 | Profile informs but doesn't convert. Structured rewrite needed. |
| 35–49 | Below Average 🔴 | Gaps are visible enough that the right ICP won't act. |
| 0–34 | Poor ⛔ | Profile is a CV, not a landing page. Full rewrite required. |

---

## Phase 5: Copy Generation

**This is what separates this skill from a generic audit. Every section below 85 gets ready-to-paste copy.**

Generate copy using foundational docs as the source. Do not invent positioning that
isn't documented — use positioning.md, voice.md, and ICP.md as the material.

**Two hard rules for all copy in this phase:**
1. **No fabricated conversion metrics.** Never write "+X% engagement", "+Y% conversion",
   or "expected impact: Z%". Explain why copy works using Ben's framework criteria —
   not made-up performance numbers.
2. **No banned language.** See banned list in Section 5.3. This applies to all sections,
   including English variants where the guard tends to slip.

### 5.1 — Headline Variants

Follow Ben's formula: **[Identity] | [Offer for ICP] → [Specific Outcome]**

For CCC Own Profile:
- Identity: "Fractional GTM & Operations Strategist" (from context.md)
- ICP: "Marketing & AI Automation Agencies" (from ICP.md)
- Outcome: "20–100+ hours saved/week in 6 weeks, mehr Marge, ohne neue Leute"

Generate **3 headline variants**:
- **Variant A** — German-primary (DACH focus, ≤220 characters)
- **Variant B** — English-primary (international reach, ≤220 characters)
- **Variant C** — Bilingual or ICP-specific detail variant (≤220 characters)

Label clearly and explain the strategic reasoning for each.

**Do not generate conversion lift estimates** (e.g. "+15–20% visitor engagement",
"+25–40% call conversion"). These are unverifiable. Explain *why* a variant works
against Ben's framework criteria — not what percentage improvement it will deliver.

### 5.2 — Banner Brief

The banner is a visual, so provide a design brief rather than the file:
- **Headline text** (3–7 words, the main message)
- **Subline** (outcome statement, 10–15 words)
- **Style direction** (colours, tone — use positioning.md or CCC brand)
- **Recommended tool**: Canva
- **Target size**: 1584 × 396 px (LinkedIn recommended)

### 5.3 — About Section Rewrite

Write the full About section using Ben's 5-part structure, populated from foundational docs:

```
[PART 1 — ABOVE THE FOLD, 2 lines max]
[Who you help + what you build — immediately clear to the ICP]

[PART 2 — PROOF STORY, 2–4 lines]
[Credibility and context: what Daniel has built, where he's been, what he's doing now]

[PART 3 — OFFERS + OUTCOMES]
• [Offer 1] → [Specific outcome]
• [Offer 2] → [Specific outcome]
• [Offer 3] → [Specific outcome]

[PART 4 — WHO I HELP]
• [Client type 1]
• [Client type 2]
• [Client type 3]

[PART 5 — STAY CONNECTED]
→ [Primary CTA: "Book a free 20-min call → [Calendly link]"]
→ [Lead magnet: "Get the free Claude Cowork Agency Toolkit → [URL]"]
→ [Optional: Newsletter / YouTube link]
```

Apply voice.md rules strictly. **Banned language — never use in any generated copy:**
- "consultant" / "Berater" (Daniel is a Strategist, not a consultant)
- "transform" / "transformieren" — vague
- "empower" / "befähigen" — vague
- "world-class" — substance-free
- "next-level" — vague
- "cutting-edge" — cliché
- Any outcome without a number: "significant savings", "better results", "improved performance"

For every outcome statement, ask: *Is there a number? A timeline? A specific deliverable?*
If not, add one or cut the claim.

Generate both German and English versions if bilingual profile is planned.

### 5.4 — Featured Section Copy

For each Featured item, provide:
- **Title** (what LinkedIn shows as the card title — 6–10 words)
- **Description** (shown below title — 1–2 sentences, max 300 characters)
- **Destination URL**
- **Thumbnail brief** (what image should appear — design direction for Canva)

**Item 1 — Book-a-Call CTA:**
Goal: make the ask obvious. Direct benefit + low-friction framing.

**Item 2 — Lead Magnet (Claude Cowork Agency Toolkit):**
Goal: drive email signups. What they get, who it's for, why it's worth the email.

### 5.5 — Experience Description

Write the current role description (2–4 lines + CTA link):
- First line: call out ICP explicitly ("If you run a marketing or AI automation agency...")
- Second line: core offer in one sentence
- Third line (optional): one proof point or outcome
- Final line: link to primary CTA

---

## Phase 6: Report Generation

Generate a .docx report. Read the `docx` SKILL.md first.

### Report Structure

**Cover**
- Profile name + LinkedIn URL
- Audit date + mode (Own / Client)
- Prepared by: Claude Cowork Consultants

**Section 1: Executive Summary**
- Overall weighted score with label
- Top 3 strengths (what's already working)
- Top 3 critical gaps (Priority 1 fixes — with time estimate per fix)
- One-sentence readiness verdict: "Does this profile work as a landing page today?"

**Section 2: Dimension Scorecard**
Table: Dimension | Raw Score | Weight | Weighted Score | Label

**Section 3: Section-by-Section Analysis**
One subsection per dimension:
- Score + label
- What's working (cite actual profile text)
- What's missing
- Ready-to-paste copy rewrite (directly from Phase 5)

**Section 4: Priority Fix List**
Ranked by impact and effort:
- 🔴 Priority 1 — Fix today (< 30 min each): CTA button, Featured section, quick headline fix
- 🟡 Priority 2 — This week (< 2 hours each): About rewrite, Experience description
- 🟢 Priority 3 — Next sprint (design or production): Banner, profile photo, Company Page

**Section 5: Completion Checklist**
Checkbox format. One line per action item, grouped by section.

**Appendix (Client Mode only)**
- CCC Gold Standard reference profile summary (Daniel's finalized CCC LinkedIn — key elements)
- Gap comparison table: client profile vs. gold standard, dimension by dimension

---

## Troubleshooting

**LinkedIn requires login for full profile view.**
Some sections (full About text, contact info, Featured items) only show when Chrome is
logged into a LinkedIn account. Confirm the user is logged in before starting.

**About section is truncated.**
Always click "see more" — the above-fold truncation hides most of the section.
The first 300 characters are what every visitor sees before deciding to click. Flag weak
first 300 characters as a separate Priority 1 finding even if the full About is strong.

**Featured section doesn't render.**
Scroll down and wait — LinkedIn Featured items can take a few seconds to appear. If they
still don't show, refresh the page. Featured items are visible to logged-in users only.

**Company logo missing.**
This means no LinkedIn Company Page exists or the Experience entry isn't linked to one.
Fix: create the Company Page (under work → set up page → link from Experience entry).
This is a 10-minute task. Always flag as Priority 1 — Ben explicitly flags this as the
top trust signal mistake agency owners and service professionals make.

**Context docs not in workspace.**
Ask the user for:
1. Who they target (ICP in 1–2 sentences)
2. What they offer + key outcome
3. What action a profile visitor should take
Proceed with context-informed rewrites based on answers.

---

## Related Skills

| Skill | When to use |
|-------|-------------|
| `docx` | Required for report generation (Phase 6) |
| `ccc-instagram-audit` | Run alongside for a full social presence audit |
| `ccc-sop-creator` | To document the finalized profile as a repeatable optimization SOP |
| `gmb-audit` | Run alongside for a full local + online authority audit |

---

## Real-World Learnings Log

Improvements from actual audits. Add a row after every run where something surprising emerged.

| # | Learning | Problem | Fix Applied |
|---|----------|---------|-------------|
| 1 | Login gate must be explicit, not a passive warning | Subagent scored profile from assumptions when LinkedIn login wasn't confirmed — scores were fabricated | Phase 1.2 rewritten as a hard STOP gate with explicit user instruction |
| 2 | English copy variants slip on voice rules | "world-class GTM frameworks" appeared in English About rewrite despite being banned in voice.md | Banned list now explicitly listed in Phase 5.3; applies to all variants |
| 3 | Copy phase generates fake conversion metrics | "+25–40% Experience → Call conversion" and similar ungrounded claims appeared in output | Hard rule added to Phase 5: no fabricated conversion lift estimates |

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| v1.0 | March 2026 | Initial skill — Ben's framework + CCC positioning standards |
| v1.1 | March 2026 | Hard login gate in Phase 1.2; banned language list explicit in Phase 5.3; no fabricated conversion metrics rule added to Phase 5 |

---

*Daniel Förster & Heiko Lube | Claude Cowork Consultants (CCC)*
*claudecoworkconsultants.com*
