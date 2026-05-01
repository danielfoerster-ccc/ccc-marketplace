# LinkedIn Profile Audit — Troubleshooting, Related Skills & Learnings

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
| 2 | English copy variants slip on voice rules | "world-class GTM frameworks" appeared in English About rewrite despite being banned in voice.md | Banned list now explicitly listed in references/copy-templates.md; applies to all variants |
| 3 | Copy phase generates fake conversion metrics | "+25–40% Experience → Call conversion" and similar ungrounded claims appeared in output | Hard rule added to Phase 5: no fabricated conversion lift estimates |

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| v1.0 | March 2026 | Initial skill — Ben's framework + CCC positioning standards |
| v1.1 | March 2026 | Hard login gate in Phase 1.2; banned language list explicit in references/copy-templates.md; no fabricated conversion metrics rule added to Phase 5 |
