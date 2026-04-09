# Instagram Audit — Real-World Learnings Log

Improvements discovered during actual client audits. Applied to the skill immediately after each run.

## Audit 1 — Light Audit, March 2026

| # | Learning | Problem | Fix Applied |
|---|----------|---------|-------------|
| 1 | Reel view counts not available on desktop web | Skill stated "view counts publicly visible on Reels" — this is only true in the mobile app / Insights | Updated Step 3.5: clarify view counts require app/Insights; use likes+comments on desktop |
| 2 | Competitor handles from context docs may not exist on Instagram | Both documented competitors had zero Instagram presence — skill had no guidance for this | Updated Step 3.7: added fallback search flow + "no competitors found = first-mover finding" scoring rule |
| 3 | Collab vs. own content ER must be split | Averaging collab posts with own content masked critically low own-content ER | Added to Step 3.3 and Dimension 4 scoring: always separate ER by content type |
| 4 | Format performance gap needs same-subject comparison | Same content in carousel (209 likes) vs Reel (29 likes) — clearest format signal possible | Added to Step 3.3: flag when same content appears in multiple formats and compare directly |
| 5 | Zero Highlights = Critical (not just Average) for service businesses | Skill scoring didn't distinguish between "few Highlights" and "zero Highlights" | Updated Dimension 1 known traps: score ≤15/100 if Highlights count = 0 for a service business |
| 6 | Instagram in-app search beats URL-based keyword search | URL keyword search returned zero results; in-app search bar works correctly | Updated Step 3.7: use in-app search bar, not URL-based approach |
| 7 | Name field SEO is a 5-minute quick win that's easy to miss | Handle was not keyword-optimised; name field was pure brand name | Strengthened Dimension 1 known traps: explicitly describe the name field tactic and its impact |
| 8 | Posting cadence formula not in skill | Skill didn't include how to estimate cadence from profile data | Added formula to Step 3.3: `posts / months_active ÷ 4 = posts/week` |
