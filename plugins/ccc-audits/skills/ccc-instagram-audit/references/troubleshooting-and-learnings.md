# Instagram Audit — Troubleshooting, Related Skills & Learnings

## Troubleshooting

### Instagram Not Loading in Chrome
- Wait 5–10 seconds for JS rendering
- Try scrolling once to trigger lazy loading
- If login wall appears: confirm with user whether to log in or proceed in Light mode

### Like Counts Hidden
- Instagram allows accounts to hide like counts
- Use comment counts only for engagement rate (note as [Estimated])
- ⚠️ Reel view counts are NOT visible on desktop web (grid or individual Reel view)
  — they require the Instagram mobile app or Insights access. Do not flag this as
  an error. Note as [Insights Required] and use like+comment data instead.

### Profile Not Found
- Confirm handle spelling with user
- Search Instagram directly (sometimes handles have periods, underscores)
- Check for multiple similar accounts (e.g. @monochrome.me.studio vs @monochromberlin)

### Brand Voice Doc Has Contradictions
- Document them as findings, do not resolve them in the audit
- State: "This contradiction was present in the brand documentation before this audit. It needs a decision from [client name] before implementing any bio changes."
- Do NOT pick a side — surface the decision, don't make it

### Context Docs Not Available
- Proceed with observation-based scoring
- Note at the top of the report: "This audit is observation-based. A brand voice document and client context document would upgrade alignment scoring for Dimensions 1, 2, and 3."

---

## Related Skills

| Skill | When to use |
|-------|-------------|
| `docx` | Required for report generation (Phase 5) |
| `ccc-seo-audit` | If Instagram audit reveals SEO gaps on the linked website |
| `gmb-audit` | Run alongside Instagram for a full local presence audit |
| `ccc-sop-creator` | If a repeatable Instagram content process needs to be documented post-audit |

---

## Real-World Learnings Log

Improvements discovered during actual client audits. Add a row after every run where something surprising emerged.

### Audit 1 — monochrome.me (@monochrome.me.studio), March 2026 — Light Audit

| # | Learning | Problem | Fix Applied |
|---|----------|---------|-------------|
| 1 | Reel view counts not available on desktop web | Skill stated "view counts publicly visible on Reels" — this is only true in the mobile app / Insights | Updated Step 3.5: clarify view counts require app/Insights; use likes+comments on desktop |
| 2 | Competitor handles from context docs may not exist on Instagram | Both documented competitors had zero Instagram presence — skill had no guidance for this | Updated Step 3.7: added fallback search flow + "no competitors found = first-mover finding" scoring rule |
| 3 | Collab vs. own content ER must be split | Averaging collab posts with own content masked critically low own-content ER (2.9% vs 13.9% collab) | Added to Step 3.3 and Dimension 4 scoring: always separate ER by content type |
| 4 | Format performance gap needs same-subject comparison | Katharinapk: 209 likes as carousel, 29 likes as Reel for identical story — this is the clearest format signal possible | Added to Step 3.3: flag when same content appears in multiple formats and compare directly |
| 5 | Zero Highlights = Critical (not just Average) for service businesses | Skill scoring didn't distinguish between "few Highlights" and "zero Highlights" | Updated Dimension 1 known traps: score ≤15/100 if Highlights count = 0 for a service business |
| 6 | Instagram in-app search beats URL-based keyword search | URL keyword search returned zero results; in-app search bar works correctly | Updated Step 3.7: use in-app search bar, not URL-based approach |
| 7 | Name field SEO is a 5-minute quick win that's easy to miss | Handle was not keyword-optimised; name field was pure brand name | Strengthened Dimension 1 known traps: explicitly describe the name field tactic and its impact |
| 8 | Posting cadence formula not in skill | Skill didn't include how to estimate cadence from profile data | Added formula to Step 3.3: `posts / months_active ÷ 4 = posts/week` |

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| v1.0 | March 2026 | Initial skill — framework built, first run: monochrome.me (Light Audit) |
| v1.1 | March 2026 | 8 improvements from monochrome.me audit — see Learnings Log above |
