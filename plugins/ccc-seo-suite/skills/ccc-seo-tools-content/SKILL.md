---
name: ccc-seo-tools-content
description: |
  E-E-A-T quality gate for every article published through ccc-seo-suite. Wraps the BenAI marketplace skill seo:seo-content with a CCC-specific persistence + decision layer: scores get written to the article's frontmatter (`eeat_score:`), warn-vs-hard-block thresholds applied per article's YMYL flag, audit history written to vault for trend analysis, and pass/fail decision returned to the calling skill (typically ccc-seo-publish-wp).
  Use this skill when an article needs E-E-A-T scoring before publish — `ccc-seo-publish-wp` calls it as a mandatory gate. Also called manually when an operator says "score this article", "E-E-A-T check", "quality audit", "indexing readiness check". Always-on from Phase 2 onward — never deferred to "optimization later" because E-E-A-T failures cause indexing failures (see Investment Mastery 37% non-indexing case in methodology §5).
allowed-tools: "Read, Write, Bash, WebFetch"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  wraps: "seo:seo-content (BenAI marketplace SEO plugin)"
  layer: atomic-substrate
  category: marketplace-wrap
  wrap_depth: full-extension
  ccc_role: quality-gate
distribution: ccc-internal
---

# ccc-seo-tools-content — E-E-A-T Quality Gate

**Workflow: Receive article → score via `seo:seo-content` → apply YMYL-aware threshold → write score to frontmatter + audit history → return pass/fail.**

## What this is

The E-E-A-T quality gate. Wraps `seo:seo-content` (BenAI's E-E-A-T scorer) with the CCC decision logic: when does an article PASS, when does it WARN, when does it HARD-BLOCK. Reads the article's `ymyl:` flag to decide threshold strictness. Writes the score back to the article's frontmatter. Maintains an E-E-A-T audit trail per client.

## When to use

- **Mandatory:** every `ccc-seo-publish-wp` call invokes this as a pre-publish gate. No publish without an E-E-A-T pass.
- Manual: operator wants to score an existing article (post-hoc) to detect E-E-A-T regressions.
- During recovery: clients with existing indexing failures (per methodology §5.3) get every affected article re-scored.

## Procedure

1. **Receive inputs:**
   - `article_path` (required) — path to the article markdown file in client's `06 - Articles/`
   - `client` (required) — wikilink to client (for threshold and history)
   - `mode` (optional) — `gate` (default — used by publish flow) or `audit` (manual / batch — doesn't block on warn)

2. **Read the article frontmatter** to get:
   - `ymyl:` flag (bool)
   - `language:`
   - `author:` (resolves to author profile)
   - `shape:`

3. **Validate author qualification (YMYL only):** if `ymyl: true`, check the author profile's `ymyl_qualified.[domain]` matches the YMYL domain configured for the article. If unqualified author + YMYL article, **HARD FAIL** — do not even invoke the marketplace skill, return immediately with reason "unqualified author for YMYL content".

4. **Invoke `seo:seo-content`** with the article body + frontmatter context. Capture the structured output: per-signal scores (Experience, Expertise, Authoritativeness, Trustworthiness, Schema, Internal Linking, Meta Completeness, Substantive Depth) + composite score 0–100.

5. **Apply CCC threshold logic:**

   | Article state | Threshold | Action on score |
   |---|---|---|
   | Non-YMYL, mode=gate | warn ≥ 70, pass = 70+ default | <70: WARN, allow publish; 70+: PASS |
   | Non-YMYL, mode=audit | warn ≥ 70 | <70: flag in report; 70+: silent pass |
   | YMYL, mode=gate | hard-block <85 | <85: HARD FAIL, abort publish; 85+: PASS |
   | YMYL, mode=audit | warn <85 | <85: flag in report; 85+: silent pass |

   Per-client overrides allowed (operator can tighten non-YMYL threshold over time as the cohort calibrates). Read `client_overrides.eeat_threshold_nonymyl` and `client_overrides.eeat_threshold_ymyl` from `00 - Strategy.md` frontmatter if set.

6. **Write score to article frontmatter:** update `eeat_score: <int>` in the article's frontmatter. Also write per-signal sub-scores into a `eeat_breakdown:` field for diagnostic use.

7. **Append to E-E-A-T audit history:** write a row to `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/01 - Tech Audit/eeat-history.md`:
   ```
   | Date | Article | Composite | Experience | Expertise | Auth | Trust | Schema | Links | Meta | Depth | Result |
   ```
   First-time write: create the file with header.

8. **Return** structured result:
   ```yaml
   pass: true | false
   composite_score: <int>
   threshold_applied: <int>
   ymyl: <bool>
   reason_if_fail: "<string>"
   warnings: ["<string>", ...]
   recommended_fixes: ["<string>", ...]
   ```

## Threshold calibration over time

The default thresholds (70 non-YMYL warn, 85 YMYL block) are starting points. Once a client has 12+ articles with d90 GSC data, `ccc-seo-analyze-cohort` can recommend tightening the warn threshold to whatever floor distinguishes winners from losers on this specific site. Operator approves, and `client_overrides.eeat_threshold_nonymyl` is updated.

## Failure modes and recovery

If the gate hard-fails on YMYL:
- Return list of which signals scored low + recommended fixes.
- Operator (or the calling skill) takes the article back to `ccc-seo-write-article` with the fix recommendations as additional constraints.
- Re-score after rewrite. Repeat until pass or operator escalates.

If the gate warns on non-YMYL:
- Surface warnings in the publish-flow output.
- Operator can override and publish anyway, OR send back to write for fixes.
- Pattern of repeated warnings signals a systematic issue with the article-write skill or the brand voice configuration — flag for operator review.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §5 (E-E-A-T as the indexing foundation), §11 (anti-patterns).

Marketplace skill source: `seo:seo-content` (BenAI) — September 2025 QRG-aligned scoring framework.

## Anti-patterns

- Do NOT skip the YMYL author qualification check. Unqualified author + YMYL = guaranteed indexing failure.
- Do NOT bypass the gate for "urgent" publishes. Speed is not a tradeoff against E-E-A-T failures — failed indexing means the article doesn't exist regardless of speed.
- Do NOT modify the marketplace skill's scoring logic. CCC overrides live at the threshold layer, not the scoring layer.
- Do NOT lower thresholds for clients without cohort evidence. Lowering thresholds without data is rationalising poor quality.
