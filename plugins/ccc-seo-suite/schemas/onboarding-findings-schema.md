# Onboarding-Findings Schema

Findings-files produced from external discovery-calls (rather than via interactive `ccc-seo-onboard` interview) must conform to this schema so that `ccc-seo-onboard intake_source=external_call` can validate and bootstrap from them.

## Frontmatter (required)

```yaml
---
type: call-findings
client: "[[<Client Name>]]"
call_date: YYYY-MM-DD
call_duration_min: <int>
call_recording: <URL or none>
transcript: "[[<filename of transcript>]]"
purpose: <one-line purpose>
created: YYYY-MM-DD
---
```

## Required Sections (one H2 per onboarding-block A–I)

The skill validates that each of the 9 onboarding-blocks from `ccc-seo-onboard` Stage 1 has an answer. Section headings can be in German or English but must contain the recognizable block-letter or label.

### Block A — Identity & Domain
Sub-fields expected (somewhere in this section's body):
- Client legal name + display name
- Primary domain URL
- Subdomain or path-prefix arrangement
- Library prefix preference

### Block B — Business Context
- Elevator pitch (1–2 sentences)
- ICP (specific role + company type + scale)
- Problem the business solves
- Offer mix (self-serve / high-touch / both)
- Revenue scale

### Block C — Strategy Decision
- Focus: Service / Product / Hybrid
- YMYL flag and applicable domains

### Block D — Languages + Locations
- Primary language
- Additional languages
- Primary location (DACH country)
- Hreflang needs

### Block E — Brand Voice
- 3–5 Tone characteristics
- 3–5 Language DOs
- 3–5 Language DON'Ts
- 2–3 Conviction statements

### Block F — Author Profile(s)
- For each author: name, role, short bio, long bio, credentials with year ranges, photo URL/status, LinkedIn URL, languages, expertise areas
- YMYL qualification per applicable domain

### Block G — Credentials Capture
- GSC connection state
- WordPress REST status
- DataForSEO availability
- Tavily availability

### Block H — Existing State
- Existing pillar tree or content strategy
- Existing GSC history
- Existing publishing cadence
- Prior SEO agency engagement

### Block I — Engagement Parameters
- Engagement length committed
- Publishing cadence target
- Reporting cadence
- Operator + client roles

## Validation Rules

When `ccc-seo-onboard intake_source=external_call` reads a findings-file:

1. **Frontmatter check** — all required frontmatter keys present and non-empty.
2. **Section-presence check** — sections matching all 9 blocks A–I exist (heuristic regex match on H2 headers).
3. **Critical-content check** — for each block, at least one bullet/sentence found in the section body.
4. **YMYL-author-qualification check** — if `ymyl: partial | strict` in Block C, every author listed in Block F must have YMYL qualification statement.

Validation produces a structured report. If any block fails, skill switches to interactive-mode for that specific block (not the whole interview).

## Example

See [[2026-05-13 — Onboarding Call Findings & Strategy Inputs]] in Kai Reichel's client folder for a worked example.

---

*Introduced: v0.2.0 (2026-05-18) — enables fast-forward onboarding when intake already done via Discovery-Call.*
