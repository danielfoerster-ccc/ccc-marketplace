---
name: ccc-seo-client-handoff
description: |
  Generates jargon-free client-facing review documents from internal Suite artifacts. Translates Pillar/Silo/Sub-Silo terminology into client-language (Themen-Gruppe / Unter-Thema / Artikel-Thema), strips all tool-names and methodology-jargon, and calibrates to the client's brand voice. Four handoff-types — onboarding-review, strategy-review, monthly-report, quarterly-report — each with a tailored client-facing structure, output as editable .docx.
  Use this skill whenever an operator says "create handoff doc for [Client]", "client-facing version of the strategy or report", "jargon-free version for [Client]", "[Client] needs to review the strategy", "send something to the client for review", or whenever an internal Suite deliverable needs translating into a client-readable format. Clients must never see tool-names (Seomator, DataForSEO, GSC), methodology jargon (Pillar, Silo, Cohort, E-E-A-T, SERP), or skill-names. This handoff layer is the firewall.
allowed-tools: "Read, Write, Edit, Bash, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 1.0.0
  layer: client-facing-output
  category: translation-layer
  shared_libs:
    - _lib/docx-helpers.js
    - _lib/voice-loader.js
  introduced: v0.2.0 (2026-05-18)
distribution: ccc-internal
---

# ccc-seo-client-handoff — Jargon-Free Client-Facing Translation Layer

**Workflow: Read internal artifacts → translate terminology → calibrate voice → emit .docx.**

## What this is

The firewall between internal Suite jargon and client-readable output. Without this skill, operators improvise client-versions of every internal deliverable — error-prone, inconsistent, leaks tool-names.

Solves the problem identified during the first full engagement (Kai Reichel, May 2026): internal Suite produces structured outputs (Strategy.md, Strategy-Session-Report.docx) that are unreadable for non-technical clients. Operator had to hand-build jargon-free review-docs each time. This skill formalizes that translation.

## When to use

- After `ccc-seo-onboard` completes → client-facing onboarding-review-doc for client to verify ICP, voice, methodology capture
- After `ccc-seo-strategy-session` completes → client-facing strategy-review-doc with all 95 topics as readable list
- Monthly cadence → client-facing monthly-report (what shipped, what's coming, win of the month)
- Quarterly cadence → client-facing quarterly-report (progress, recommendations, next quarter)

## Inputs

- `client` (required) — wikilink to client.
- `handoff_type` (required) — one of `onboarding-review`, `strategy-review`, `monthly-report`, `quarterly-report`.
- `source_artifacts` (optional, auto-detected if not given) — explicit paths to internal artifacts to translate.
- `interactive` (optional, default true) — operator reviews translated terminology before final .docx generation.

## Procedure

### Stage 0 — Pre-flight

1. Verify client folder exists at `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/`.
2. Load brand-voice profile via `_lib/voice-loader.js`. If missing → warn but proceed with generic warm-direct German.
3. Resolve source artifacts based on `handoff_type`:
   - `onboarding-review`: `00 - Strategy.md` (sections 1–3 + Decisions Log), `_authors/<author>.md`, `_voice/voice.<lang>.md`, `_reports/onboarding/<date>-readiness.docx` metadata
   - `strategy-review`: `00 - Strategy.md` (full Pillar Tree + Queue), `_planning/pillar-tree-final-<date>.json`, `_planning/competitors-<date>.md` (digested, not raw)
   - `monthly-report`: `10 - Publishing Log.md` (last 4 weeks), recent `_reports/weekly/*.docx` deltas
   - `quarterly-report`: `11 - Cohorts/winners-pattern.md`, full quarter's publishing log, GSC delta

### Stage 1 — Apply Jargon-Translation-Table

Internal terms map to client-language as follows. This table is THE source of truth — never deviate without explicit operator approval.

| Internal Term | Client-Facing Translation |
|---------------|---------------------------|
| Pillar | "große Themen-Gruppe" / "main topic area" |
| Silo | "Unter-Thema" / "sub-topic" |
| Sub-Silo | "Artikel-Thema" / "article topic" |
| Pillar-Tree | "Themen-Landkarte" / "topic map" |
| Semantic Empire | "Themen-Landkarte deiner Arbeit" / "the topic landscape of your work" |
| Topic Queue | "die Liste der geplanten Artikel" |
| Target KW | (omit — never expose) |
| Search Volume / Vol/Mo | (omit, or paraphrase as "wird häufig gegoogelt" / "frequently searched") |
| KW-Volumen / DataForSEO | (omit entirely) |
| SERP / SERP-Analyse | "Suchergebnisse" / "what shows up in Google" |
| SERP-Realität | "was Google heute zeigt" |
| Competitor analysis | "wir haben uns angeschaut, was die anderen in deinem Feld machen" |
| Cohort / winners-pattern | (omit — internal compounding mechanism, no client-language) |
| E-E-A-T | "wie wir mit deinen Themen umgehen (Glaubwürdigkeit + Abgrenzung zu Therapie)" |
| YMYL | "Themen die mentale Gesundheit berühren" / "sensitive health-adjacent topics" |
| Tech-Audit / Seomator | "ein paar technische Kleinigkeiten an der Website" |
| GSC / Google Search Console | "Googles Tool um zu sehen wie Leute deine Site finden" |
| GA4 / Google Analytics | "Besucher-Statistiken" |
| Hub-Page / Cluster-Index | "Übersichts-Seite" |
| Internal-Link-Scaffold | "Verlinkungen zwischen Artikeln" |
| PAA / People Also Ask | "Fragen die Google bei deinem Thema vorschlägt" |
| Quality Gate | (omit — internal mechanism) |
| ccc-seo-* / Skill-Name | (NEVER mention) |
| BenAI / Sirion / Methodology | (NEVER mention) |
| Cowork / Suite / Plugin | (NEVER mention) |

### Stage 2 — Apply Voice-Calibration

Load `_voice/voice.<lang>.md` via `_lib/voice-loader.js`. Extract:
- 5 Tone-Charakteristika
- 5 Language DOs
- 5 Language DON'Ts
- 2–3 Conviction Statements
- Sample-Phrasierungen

Use these as the writing-constraint for the client-doc. Never use Coach-Speak or buzzword-language even if the internal artifact uses it.

### Stage 3 — Generate handoff-type-specific structure

Each handoff-type has a canonical structure. Use `_lib/docx-helpers.js` for the build.

#### `onboarding-review` structure

1. Cover with title "Strategie-Übersicht zur Review" or equivalent in client language
2. Intro: "Lieber [Vorname], hier zusammengefasst was wir gemeinsam besprochen haben..."
3. Section 1: Was wir zusammen erreichen wollen (growth-target box)
4. Section 2: Wer du bist (bio, business model, methodology, biographical markers)
5. Section 3: Für wen wir schreiben werden (ICP — most important section for client review)
6. Section 4: In welcher Tonalität wir schreiben werden (voice profile in plain language)
7. Section 5: YMYL-Disclaimer (if applicable)
8. Section 6: Was du noch liefern müsstest (open items)
9. Section 7: Review-Fragen am Ende ("Stimmt das?", "Fehlt was?", "Wo siehst du es anders?")

#### `strategy-review` structure

1. Cover with title "Themen-Plan zur Review" + stats badge (5 Themen-Gruppen · 15 Unter-Themen · 75 Artikel-Themen)
2. Intro: "Lieber [Vorname], hier der Themen-Plan..."
3. Section: Die große Idee in einem Satz
4. Section: Wie das funktioniert (ohne Tech-Detail)
5. Section: Die N Themen-Gruppen als Übersichts-Tabelle
6. Section: Reihenfolge (Quick-Win-Order erklärt)
7. **Pro Pillar:** alle Silos + alle Sub-Silos als saubere Listen
8. Section: Was als allererstes kommt (erste 5 Wochen detailliert)
9. Section: Was du wann realistisch erwarten kannst (Monat 1–12 tabelle)
10. Review-Fragen am Ende

#### `monthly-report` structure

1. Cover with month + key-metric headline
2. Section: Was diesen Monat passiert ist (Artikel-Liste mit Links)
3. Section: Wie es bei Google läuft (one chart, plain language — keine GSC-Begriffe)
4. Section: Win des Monats (one feel-good observation)
5. Section: Was im nächsten Monat kommt
6. Section: Falls du Fragen hast (operator-contact)

#### `quarterly-report` structure

1. Cover with quarter + cumulative-stats
2. Section: Wo wir am Ende des Quartals stehen
3. Section: Was funktioniert hat (winners als concrete-examples, no "cohort-analysis"-Begriff)
4. Section: Was wir nächstes Quartal anders machen werden
5. Section: Empfehlung für nächste Quartal
6. Section: Falls du Fragen hast

### Stage 4 — Operator review

**Operator checkpoint** (if interactive): operator skims the generated draft, checks:
- Translation-table consistently applied (no jargon-leaks)?
- Voice-Calibration getroffen (would the client recognize their own tonality)?
- Sections complete and in right order?
- Review-Fragen at the end specific enough to drive useful client feedback?

Operator can:
- Approve → save final .docx
- Request term-translation revision → operator says which terms didn't translate well
- Request voice-recalibration → operator points to specific paragraphs that don't sound like client

### Stage 5 — Save + return

Final `.docx` goes to:
- `_reports/handoff/<date>-<handoff_type>-review.docx` for onboarding-review + strategy-review
- `_reports/handoff/<YYYY-MM>-monthly-client.docx` for monthly-report
- `_reports/handoff/<YYYY-Qn>-quarterly-client.docx` for quarterly-report

Also save build-script at same location as `build-handoff-<handoff_type>.js` so the doc can be regenerated after late-arriving content (operator typo-fix, additional intel, voice-refinement) without re-running the whole skill.

Return:
```yaml
status: ready | needs-review | aborted
client: "[[Client]]"
handoff_type: <type>
output_path: "_reports/handoff/..."
voice_calibrated: true | false  # false if voice.<lang>.md was missing
jargon_translations_applied: <int>
operator_approved: true | false
recommended_distribution: "WhatsApp link to file" | "Email attachment" | "Review session"
```

## Rules (Update This Section When Things Go Wrong)

1. **Never let internal tool-names slip into client-output.** Seomator, DataForSEO, GSC, GA4, ccc-seo-*, BenAI, Sirion, Cowork, Suite, Plugin, Skill — all forbidden. If something doesn't have a client-language equivalent in the translation-table, paraphrase generically ("ein Werkzeug zur Analyse").
2. **Never expose KW-volume numbers to clients** unless they're already SEO-literate. Numbers like "8.100 monatliche Searches" can mislead — the searcher-intent matters more than the count. Replace with qualitative descriptors ("wird häufig gegoogelt").
3. **Never use Pillar/Silo/Sub-Silo as client-vocabulary** even if you've explained the terms once. They're internal-only. Always use Themen-Gruppe / Unter-Thema / Artikel-Thema in DE, "topic area / sub-topic / article topic" in EN.
4. **Never produce a client-doc without first loading the voice profile.** If voice.<lang>.md is missing → warn operator + use generic warm-direct fallback + flag in return-block.
5. **Always end client-docs with specific review-questions.** Generic "Let me know what you think" doesn't drive useful feedback. List 5–7 concrete questions matching what's in the doc.
6. **Always offer transparent decisions.** If we made a brand-choice the client should know about (e.g., "we renamed your pillar 'Verantwortungsvolle Männlichkeit' to 'Authentisches Mannsein' because Google associates the former with NGOs"), say so explicitly. Surprise-decisions later cost trust.

## Anti-Patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| Operator pastes Strategy.md content into client-doc directly | Pillar/Silo/SERP/E-E-A-T everywhere — client confused | No translation layer | Always route through this skill's Stage 1 (translation table) |
| Client-doc uses generic Coach-Speak ("werde die beste Version von dir") | Doesn't sound like the client at all | Voice profile not loaded | Always load voice via Stage 2 — never skip |
| Strategy-review-doc lists all 95 topics in raw queue-table format | Overwhelming, unreadable | Internal-format leaked | Use the handoff-type-specific structure in Stage 3 (group by Pillar with prose intro per group) |
| Monthly-report includes "21 articles indexed, avg position 18.4" | GSC-jargon | Direct stat-export | Plain language ("Google zeigt deine Artikel inzwischen für [N] Suchanfragen — die meisten noch auf Seite 2") |

## Self-Improvement

When a client reads the doc and reacts (good or bad):
- Note which translations landed and which felt clunky → refine Stage 1 table
- Note which voice-calibrations missed the mark → flag in voice.<lang>.md for refinement
- If client says "I didn't understand X" → it's a translation gap, add to table

When a client signs off cleanly:
- Note which framing produced clean-signoff → save as reference example for future handoffs of same type

This skill's effectiveness is measured by how rarely clients ask "what does that mean?" — should approach zero across iterations.
                                                                                                                                                                   