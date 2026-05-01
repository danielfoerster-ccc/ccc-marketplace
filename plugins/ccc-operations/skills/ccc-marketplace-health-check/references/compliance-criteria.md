*Last updated: 2026-04-09. Review before use if older than 90 days.*

# Marketplace Compliance Criteria

These are the checks the health check skill runs against every SKILL.md and plugin in the marketplace. Update this file when new criteria are added or thresholds change.

---

## Per-Skill Checks (SKILL.md)

### 1. YAML Frontmatter

- `name` field present
- `description` field present and ≤1024 characters
- `description` written in third person ("Runs a…", "Guides the user…")
- `allowed-tools` field present (list format with `- ` prefix)

### 2. Line Count

- SKILL.md must be <500 lines
- If over limit: check whether content can be extracted to `references/`

### 3. Rules Section

- Must have a `## Rules` heading (outside of code blocks) — **case-insensitive match**
- Known passing variants: `## Rules`, `## RULES`, `## Rules (Update When Things Go Wrong)`, `## RULES (Failure Modes)`, `## Rules & Anti-Patterns`, `## Rules (Update This Section When Things Go Wrong)`
- Match rule: `re.search(r'^##\s+rules', line, re.IGNORECASE)` — any heading starting with "## Rules" (case-insensitive) passes
- Must contain at least 2 rules (not just a placeholder heading)

### 4. Self-Improvement Section

- Must have a `## Self-Improvement` heading (outside of code blocks) — **case-insensitive match**
- Known passing variants: `## Self-Improvement`, `## SELF-IMPROVEMENT`, `## Self Improvement`
- Match rule: `re.search(r'^##\s+self.improvement', line, re.IGNORECASE)`
- Must contain at least 1 instruction for how the skill should evolve

### 5. Named Workflow Pattern

- Should have a named workflow or process pattern (e.g., "**Workflow: X → Y → Z**" or "## The X Pattern")
- This is a RECOMMENDED check, not a hard fail — flag as WARNING if missing

### 6. References Folder

- Check whether `references/` subfolder exists
- If the skill is >300 lines and has no references folder: flag as WARNING (content may benefit from extraction)
- If <200 lines and simple: no references folder is fine

### 7. No Client Data

- Scan for patterns that look like real client data:
  - Real person names in financial contexts (not anonymized placeholders like "[Client]")
  - Specific financial figures tied to named individuals
  - Email addresses, phone numbers, addresses
- This is a CRITICAL check — any match is an immediate fail

---

## Per-Plugin Checks (plugin.json)

### 1. Required Fields

- `name` — present and matches directory name
- `version` — present, valid semver format (X.Y.Z)
- `description` — present
- `author` — present with `name` subfield

### 2. Optional but Recommended

- `keywords` — array of 8-12 relevant keywords (WARNING if missing)
- `author.url` — website URL (WARNING if missing)

### 3. Consistency

- Plugin directory name should match `name` field in plugin.json
- All skills listed in the plugin's `skills/` directory should exist (no orphan entries, no missing directories)

---

## Marketplace-Level Checks (README.md)

### 1. Plugin Coverage

- Every plugin directory in `plugins/` must have a corresponding section in README.md
- Every section must list all skills in that plugin's `skills/` directory

### 2. Install Commands

- The installation block must include `/plugin install [name]@ccc-marketplace` for every plugin

### 3. Metadata

- "Last updated" date should be within 30 days of the check date
- Version number should match or exceed the highest plugin version

---

## Scoring

Each check produces one of three results:

| Result | Meaning |
|--------|---------|
| **PASS** | Meets criteria |
| **WARN** | Recommended but not blocking — should fix before next release |
| **FAIL** | Must fix before shipping |

**Overall health score:** `(PASS count) / (PASS + FAIL count) × 100` (warnings excluded from denominator)
