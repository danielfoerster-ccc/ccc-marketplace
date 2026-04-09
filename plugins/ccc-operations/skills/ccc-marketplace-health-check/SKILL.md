---
name: ccc-marketplace-health-check
description: >
  Runs a full compliance and structural health check on the CCC marketplace
  GitHub repo (danielfoerster-ccc/ccc-marketplace). Scans every SKILL.md
  against skill-creator-pro guidelines (Rules section, Self-Improvement,
  allowed-tools, line limits, description length), validates all plugin.json
  manifests, checks README completeness, and flags any client data leaks.
  Produces a scored report with pass/warn/fail per skill and a prioritized
  fix list. Designed to run both on-demand and as a monthly scheduled task.

  USE THIS SKILL when asked to: run a marketplace health check, audit the
  marketplace, check skill compliance, verify plugin quality, validate the
  marketplace repo, or run the monthly marketplace check. Also triggers on:
  "marketplace audit", "skill compliance check", "are all plugins healthy",
  "check the marketplace", "plugin health", "marketplace review", "repo
  health check", "compliance sweep".
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Agent
---

**Workflow: Clone → Scan → Score → Report → Route Fixes.**

Deterministic health check that reads the marketplace repo and produces a compliance report. No user interaction needed during the scan — results are presented at the end with a prioritized action list.

## Phase 0: Access the Marketplace Repo

The marketplace lives at `danielfoerster-ccc/ccc-marketplace` on GitHub.

**Option A — Local clone exists:** Check if `/sessions/*/ccc-marketplace-push/` or similar exists from a previous session. If so, `git pull` to update.

**Option B — Fresh clone needed:** Clone to a writable location:
```bash
git clone https://github.com/danielfoerster-ccc/ccc-marketplace.git /sessions/<session>/ccc-marketplace-check/
```

If auth is needed, ask the user for a GitHub PAT.

Navigate to the repo root. All plugins live in `plugins/`.

## Phase 1: Discovery

Inventory what exists:

1. List all plugin directories in `plugins/`
2. For each plugin, find `plugin.json` and all `SKILL.md` files
3. Read `README.md` at repo root
4. Count totals: X plugins, Y skills

Report the inventory to the user before starting the scan.

## Phase 2: Skill-Level Scan

For each SKILL.md, run the checks defined in `references/compliance-criteria.md`. Use a Python script for speed and accuracy — the checks are mostly string/regex operations:

```python
# Core checks per SKILL.md:
# 1. YAML frontmatter: name, description (≤1024 chars), allowed-tools
# 2. Line count < 500
# 3. ## Rules section exists (outside code blocks)
# 4. ## Self-Improvement section exists (outside code blocks)
# 5. Named workflow pattern (WARNING only)
# 6. references/ folder exists (WARNING if >300 lines without one)
# 7. No client data patterns (CRITICAL)
```

**Code block stripping is essential.** Sections like `## Rules` inside ` ```markdown ``` ` code blocks don't count. Strip all code blocks before checking for section headings.

**Client data scan patterns:**
- Email addresses: `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b`
- Phone numbers: `\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b` or international formats
- Financial figures tied to named individuals (not anonymized examples)
- Skip: example data using `[Client]`, `[Name]`, `€[X]`, or obviously fictional amounts

## Phase 3: Plugin-Level Scan

For each plugin.json:

1. Validate required fields: `name`, `version`, `description`, `author`
2. Check `name` matches directory name
3. Check `keywords` field exists (WARNING if missing)
4. Verify every subdirectory in `skills/` has a `SKILL.md`
5. Check for orphan directories (skill folder exists but no SKILL.md inside)

## Phase 4: Marketplace-Level Scan

Check README.md:

1. Every plugin directory has a section in the README
2. Every skill within each plugin is listed in its README table
3. Install commands exist for every plugin
4. "Last updated" date is within 30 days
5. No broken section structure (orphan tables, missing headers)

## Phase 5: Score and Report

Calculate the health score: `PASS / (PASS + FAIL) × 100` (warnings excluded from denominator).

Generate a report with these sections:

```
# CCC Marketplace Health Check — [Date]

## Summary
- Plugins: X | Skills: Y
- Health Score: Z% (A pass, B fail, C warnings)

## Skill Results
[Table: plugin | skill | lines | status | issues]

## Plugin Results
[Table: plugin | version | fields | issues]

## README Coverage
[List of missing plugins/skills/install commands]

## Prioritized Fix List
1. CRITICAL: [any client data leaks]
2. FAIL: [grouped by issue type, most common first]
3. WARN: [grouped by issue type]

## Comparison to Last Check
[If a previous report exists, diff the results]
```

Save the report to:
- **Scheduled runs:** `00 - COMMAND CENTER/Daily Notes/2026/Q2/[current-week]/` as `YY-MM-DD - Marketplace Health Check.md`
- **On-demand runs:** present to user, offer to save to vault

## Phase 6: Route Fixes (Optional)

If the user asks to fix issues, prioritize by:

1. **CRITICAL** — client data leaks (fix immediately, never ship with these)
2. **Over 500 lines** — extract content to references (highest effort)
3. **Missing Rules/Self-Improvement** — add from template (mechanical, fast)
4. **Missing allowed-tools** — add to frontmatter (fast)
5. **README gaps** — add missing sections (fast)
6. **WARNINGS** — address in next release cycle

For each fix category, the skill can either fix inline or spawn agents for parallel fixes.

---

## Rules (Update When Things Go Wrong)

- Always strip code blocks before checking for `## Rules` and `## Self-Improvement` headings — code examples inside ``` blocks contain these headings as examples and must not count as the skill's own sections
- The `## Rules` heading has known variants: `## Rules`, `## Rules (Update When Things Go Wrong)`, `## Rules (Update This Section When Things Go Wrong)`, `## Rules & Anti-Patterns`. All pass. But `**Rules section**` in prose does not count.
- Description length check must handle multi-line YAML descriptions (the `>` or `|` block scalar format) — concatenate lines before measuring
- When scanning for client data, the regex will produce false positives on example/template data. Always exclude lines containing `[Client]`, `[Name]`, `€[X]`, `$[X]`, or Markdown code block content
- If the repo clone fails due to auth, don't abort — ask the user for a token and retry once
- Never modify files during the scan phase. The health check is read-only until the user explicitly asks for fixes in Phase 6
- Previous health check reports may exist in the vault — always check for the most recent one to enable diff comparisons

---

## Self-Improvement

After every health check run, review whether any check produced false positives or missed real issues. Update `references/compliance-criteria.md` with new criteria or adjusted thresholds. If a new skill pattern emerges that the current checks don't cover, add it.
