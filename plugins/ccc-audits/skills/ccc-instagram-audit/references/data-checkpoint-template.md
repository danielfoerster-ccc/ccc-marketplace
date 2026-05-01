# Instagram Audit — Data Checkpoint Template

Use this template in Phase 3b to save collected data before analysis. Run via bash:

```bash
cat > instagram-audit-data.json << 'EOF'
{
  "profile": {
    "handle": "",
    "name_field": "",
    "bio": "",
    "link_in_bio": "",
    "followers": 0,
    "following": 0,
    "post_count": 0,
    "profile_pic_quality": "",
    "category": "",
    "verified": false
  },
  "feed_analysis": {
    "aesthetic_score_notes": "",
    "format_breakdown": {"reels_pct": 0, "carousel_pct": 0, "static_pct": 0},
    "avg_engagement_rate_own_content": 0,
    "avg_engagement_rate_collab": 0,
    "best_performing_post": "",
    "worst_performing_post": "",
    "caption_formula_followed": true,
    "posting_cadence_posts_per_week": 0
  },
  "highlights": {
    "count": 0,
    "names": [],
    "covers_branded": true
  },
  "competitors": [],
  "brand_alignment_issues": [],
  "insights_available": false,
  "audit_date": ""
}
EOF
```
