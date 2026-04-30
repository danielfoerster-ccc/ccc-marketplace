# Open Questions for Daniel Review

Three questions to resolve before Stage 1 launch (2026-05-01):

---

## Question 1: Daily Check-in Integration Depth

**Current design:** Option A (lightweight) — the skill runs as a separate invocation after daily check-in, accessed via `/third-brain-mastery` or a manual prompt.

**Alternative:** Option B (tighter) — daily-checkin directly suggests the skill after TOP 3 are locked, with the operator confirming whether to practice that day.

**Decision needed:** Which integration feels right? Option A delays the practice (user must explicitly invoke), but respects the daily-checkin's lean 10-minute constraint. Option B couples them more tightly, ensuring the practice happens daily but adds ~2-3 minutes to daily check-in's runtime.

**My recommendation:** Start with Option A (lightweight). The first week of practice, tight coupling will make it feel mandatory rather than reflexive. After Day 3-4, when Daniel feels the pattern, it can be tightened.

---

## Question 2: Test Cases & Real Data

**Current status:** evals.json contains three realistic test cases (Day 1 vague question, Day 3 reflex day, Day 7 graduation), but they're synthetic — not against your actual daily check-in files.

**What's needed:** Before launch, verify the skill correctly:
1. Loads your actual weekly plan and TOP 3 from vault
2. Appends correctly to your actual mastery log
3. Updates state.json without conflicts

**Action:** Run a manual pilot on 2026-05-01 morning. Invoke `/third-brain-mastery`, pick one real TOP 3 question, and confirm the output files appear where expected. This is a sanity check, not a full eval loop.

**If issues surface:** Likely causes are file-path mismatches (vault structure vs. skill expectations). Quick fix via SKILL.md Phase 0 adjustments.

---

## Question 3: Mastery Log Weekly Rollover

**Current design:** The skill appends to `Third Brain Mastery Log.md` inside the current week folder (e.g., `26-04-21 to 25/`).

**Edge case:** When you move to a new week (e.g., 2026-05-05, the week rolls over), should the mastery log:
- **Option A:** Reset (new file in new week folder) — cleaner visually, but loses the full 7-day progression if it spans weeks
- **Option B:** Continue (live in one central location, e.g., root of Daily Notes) — keeps the full history but gets cluttered if you do multi-stage practice

**Recommendation:** Option A, but with a caveat. If your 7-day streak spans a week boundary (e.g., starts Thursday, ends Tuesday of next week), the skill should **append to the new week's log and carry the day count forward**. The visual reset is cleaner, but the streak continuity is preserved.

**Decision needed:** Is Option A the right UX for you, or should this live in one central "Stage 1 Master Log" that Daniel reads weekly?

---

## Summary

These are design questions, not blocking issues. The skill is functionally complete for v0.1 and ready to launch on 2026-05-01 if you confirm the integration depth (Q1) and weekly rollover preference (Q3). The test cases (Q2) are a lightweight sanity check — not a full eval loop, since this is a process skill where qualitative observation matters more than quantitative assertions.

No decisions required to hit the 2026-05-01 launch date. These can be confirmed in your first daily check-in with the skill and adjusted in v0.1-patch or v0.2.
