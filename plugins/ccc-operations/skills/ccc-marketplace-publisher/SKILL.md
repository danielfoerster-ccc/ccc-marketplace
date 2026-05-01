---
name: ccc-marketplace-publisher
description: >
  Syncs CCC vault plugins to the ccc-marketplace GitHub repo and pushes updates reliably.
  Clones fresh each time (bypasses the stale read-only Cowork cache), validates the
  GitHub token, compares vault plugin versions vs repo, copies updated SKILL.md files,
  ensures every plugin directory is registered in marketplace.json, commits, and pushes.
  Ends with a clear report of what changed + instruction to refresh in Cowork UI.
  USE THIS SKILL whenever Daniel says "sync marketplace", "publish marketplace updates",
  "push skills to marketplace", "marketplace out of date", "plugin not showing up",
  "marketplace not updating", "skill not appearing in marketplace", or after adding or
  updating any CCC plugin, skill, or the marketplace.json index.
allowed-tools: Read, Write, Bash
---

**Workflow: Clone → Compare → Sync → Push.** Fresh clone every run eliminates stale-cache
and diverged-history problems. All changes go through git with a clear commit message.

---

## Constants

Session paths change every Cowork session. Always discover `VAULT` dynamically — never hardcode a session ID like `stoic-eager-thompson` or `cool-vigilant-franklin`.

```bash
VAULT=$(ls -d /sessions/*/mnt/WELTENERNEUERER 2>/dev/null | head -1)
PLUGIN_ROOT="$VAULT/02 - MISSION CONTROL/Claude Skills & Plugins"
REPO_URL="https://github.com/danielfoerster-ccc/ccc-marketplace.git"
WORK_DIR="/tmp/ccc-marketplace-pub"
TOKEN_FILE="$VAULT/.github-token"
```

---

## Phase 1 — Validate the Token (canonical source: `.github-token`)

**Token source of truth = `$VAULT/.github-token`.** This is the file Daniel updates whenever he rotates the PAT. It is gitignored in the vault. Read it fresh every run — never cache it between phases.

```bash
TOKEN=$(cat "$VAULT/.github-token" 2>/dev/null | tr -d '\n\r ' || true)
if [[ -z "$TOKEN" ]]; then
  echo "ERROR: No GitHub token found at $VAULT/.github-token"
  echo "Create one at: github.com → Settings → Developer Settings → Personal Access Tokens (classic) → repo scope"
  exit 1
fi
```

**Do NOT read the token from `.local-plugins/known_marketplaces.json`.** That file is the Cowork read-only plugin cache. It gets baked at marketplace-install time and only updates when Daniel removes+re-adds the marketplace through the Cowork UI. It is a **cache**, not a source of truth. Reading from it causes the classic "why does my token keep expiring?" bug: Daniel rotates `.github-token`, the skill reads the stale cached URL, push fails with `Bad credentials`, looks exactly like expiry. It is not expiry — it is a stale-cache read. *(Discovered 2026-04-20.)*

Test the token immediately against the remote:

```bash
git ls-remote "https://x-access-token:${TOKEN}@github.com/danielfoerster-ccc/ccc-marketplace.git" HEAD
```

If this fails with `Bad credentials` or `Authentication failed` → **stop and tell Daniel**:
> "The PAT in `.github-token` has expired or been revoked. Rotate it at github.com → Settings → Developer Settings → Personal Access Tokens (classic) → Generate new token with `repo` scope. Paste it into `$VAULT/.github-token` (single line, no trailing newline)."

Once the new token is in `.github-token`, re-run from Phase 1. Never ask Daniel to paste the token into the chat — the file is the interface.

---

## Phase 2 — Fresh Clone

```bash
rm -rf "$WORK_DIR"
git clone "https://x-access-token:${TOKEN}@github.com/danielfoerster-ccc/ccc-marketplace.git" "$WORK_DIR"
git -C "$WORK_DIR" config user.email "dafoerst87@googlemail.com"
git -C "$WORK_DIR" config user.name "Daniel Förster"
```

Never edit the Cowork read-only cache at `.local-plugins/marketplaces/`. Always work in `/tmp/ccc-marketplace-pub/`.

---

## Phase 3 — Scan: Build the Comparison Table

Read `marketplace.json` from the repo:
```
/tmp/ccc-marketplace-pub/.claude-plugin/marketplace.json
```

For each plugin listed there:
1. Read its version from the repo: `/tmp/ccc-marketplace-pub/plugins/[plugin]/.claude-plugin/plugin.json`
2. Read its version from the vault: `[PLUGIN_ROOT]/[plugin]/.claude-plugin/plugin.json`
3. Compare

Also check: are there plugin directories in `/tmp/ccc-marketplace-pub/plugins/` that are **not** listed in marketplace.json? These are orphans — invisible to Cowork until registered.

Present a table before touching anything:

```
Plugin                    Vault     Repo      Status
─────────────────────────────────────────────────────
ccc-planning              1.1.2     1.0.0     OUTDATED
ccc-cashflow-management   1.1.0     1.1.0     ✓ current
ccc-operations            1.4.0     1.3.0     OUTDATED
48hr-launch-blueprint     —         1.0.1     ⚠ orphan (in repo, not in marketplace.json)
```

If everything shows ✓ current and no orphans → report that and stop. No push needed.

---

## Phase 4 — Sync

For each OUTDATED plugin:

**a) Copy SKILL.md files from vault → repo.** For each skill in the plugin:
```bash
skill_src="[PLUGIN_ROOT]/[plugin]/skills/[skill]"
skill_dst="/tmp/ccc-marketplace-pub/plugins/[plugin]/skills/[skill]"
mkdir -p "$skill_dst/references"
cp "$skill_src/SKILL.md" "$skill_dst/SKILL.md"
# Copy references if they exist
cp "$skill_src/references/"* "$skill_dst/references/" 2>/dev/null || true
```

**b) Update plugin.json in repo** to match the vault version.

**c) Update the version field** in marketplace.json for this plugin entry.

For each ORPHAN directory in repo (exists in `plugins/` but not in `marketplace.json`):
- Read its `plugin.json` for name, description, version, author, keywords
- Add a proper entry to marketplace.json
- This makes it installable from the marketplace UI

Do NOT auto-add vault plugins that aren't already in the marketplace. Only Daniel decides what goes public.

**⛔ PRIVATE SKILL GUARD — mandatory before every sync:**
Before copying ANY skills for `ccc-operations`, explicitly verify these two skills are NOT included:
- `ccc-marketplace-health-check`
- `ccc-marketplace-publisher`

These are vault-only tools that must NEVER appear in the public repo. If found in the diff at any point → abort, remove, then re-commit. No exceptions.

---

## Phase 5 — Commit and Push

```bash
cd /tmp/ccc-marketplace-pub
git add -A
git diff --cached --stat   # show the diff summary before committing
```

Write a commit message that lists what changed:
```
sync: [plugin-a] v1.0.0→1.1.2, [plugin-b] added to marketplace.json

[One line per meaningful change]

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

Then push:
```bash
git push "https://x-access-token:${TOKEN}@github.com/danielfoerster-ccc/ccc-marketplace.git" main
```

If the push fails with `Authentication failed` or `Bad credentials`:
1. Re-read `.github-token` fresh — the token may have been rotated mid-session.
2. If the freshly-read token also fails → the PAT has been revoked. Ask Daniel to rotate it into `.github-token`, then retry the push only (no need to re-clone).
3. **Never** fall back to reading the token from `known_marketplaces.json`. See Phase 1.

---

## Phase 6 — Report

After a successful push, give Daniel a clear summary:

```
✅ Marketplace synced and pushed.

Changed:
  • ccc-operations v1.3.0 → v1.4.0  (added: ccc-marketplace-publisher)
  • ccc-planning v1.0.0 → v1.1.2    (3 skill files updated)

Registered in marketplace.json:
  • 48hr-launch-blueprint (was orphaned directory, now visible)

No changes:
  • ccc-audits, ccc-gtm, ccc-buyback, ccc-cashflow-management (all current)

⚠️  To see the updates in Cowork: go to Settings → Plugins → ccc-marketplace →
    remove it → re-add with this URL (token from $VAULT/.github-token):
    https://x-access-token:<TOKEN>@github.com/danielfoerster-ccc/ccc-marketplace.git
```

Include the full URL with the current token value substituted (read from `.github-token`) so Daniel can paste it directly. Re-adding the marketplace through the UI is what refreshes the Cowork cache at `known_marketplaces.json` — without this step, the cache stays stale and the next "phantom expiry" is already brewing.

---

## Rules

1. **Always clone fresh.** Never work with the Cowork cache at `.local-plugins/marketplaces/ccc-marketplace/` — it's read-only and may have a diverged git history. `/tmp/ccc-marketplace-pub/` is the only working directory.

2. **Validate the token before doing anything else.** A 2-second `git ls-remote` saves the frustration of doing all the work and failing at the push.

3. **Show the comparison table before syncing.** Daniel should see what will change. If everything is current, say so and stop — don't make unnecessary commits.

4. **marketplace.json is the Cowork discovery index.** A plugin directory without a marketplace.json entry is completely invisible to Cowork users, regardless of its version. Orphan directories must be registered.

5. **Don't auto-publish private vault plugins.** Only sync what's already in marketplace.json, or what Daniel explicitly requests to add. The vault has internal plugins that should stay internal.

6. **After pushing, always include the full re-add URL in the report.** The local Cowork cache won't auto-refresh. Daniel must remove and re-add the marketplace — make it one copy-paste, not a hunt for the URL.

7. **Never bump versions without reason.** Only update the version in marketplace.json if the skills actually changed. Unnecessary version bumps train Daniel to ignore them.

8. **Token source of truth = `$VAULT/.github-token`. Never `known_marketplaces.json`.** The Cowork plugin cache holds a snapshot of the marketplace URL (including the token) from the moment Daniel last added the marketplace. It does not update when Daniel rotates the PAT — only a UI re-add refreshes it. Reading the token from the cache causes phantom "token expiry" failures that are actually stale-cache reads. Use `.github-token` every time. *(Rule added 2026-04-20 after this exact failure mode burned a session.)*

9. **Never hardcode session IDs.** The session ID (e.g. `cool-vigilant-franklin`, `stoic-eager-thompson`) changes every Cowork session. Use `VAULT=$(ls -d /sessions/*/mnt/WELTENERNEUERER 2>/dev/null | head -1)` to discover the vault path dynamically, matching the convention in `publish.sh`. A hardcoded path will break the next time Daniel starts a new session.

---

## Self-Improvement

When a push fails for a new reason: add the failure mode and fix to Rules above.
When a new vault plugin structure is encountered: update the scan logic in Phase 3.
When Daniel adds a plugin to the public marketplace for the first time: document what fields were needed for the marketplace.json entry so future additions are faster.
