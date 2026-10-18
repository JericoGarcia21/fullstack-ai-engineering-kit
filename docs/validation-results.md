# Validation results

Generation environment: Windows PowerShell, 2026-10-18. Commands ran from the toolkit root.

| Command | Actual result |
| --- | --- |
| `node scripts/tree.mjs --write` | Exit 0; complete tree printed and saved to docs/repository-tree.txt |
| `node scripts/validate.mjs` | Exit 0; 17 skills, 76 Markdown files, 0 errors |
| `node --test scripts/validate.test.mjs scripts/install.test.mjs` | Exit 0; 12 tests passed, 0 failed, 0 skipped |

The tests exercised all four agent installation layouts in temporary directories, dry-run behavior, copies with local references, overwrite/conflict prevention, invalid target/agent rejection, malformed metadata, missing required files, broken Markdown targets, heading fragments, and code-block exclusion.

Official public documentation was accessible and reviewed; see [sources](../references/sources.md). Native discovery inside the actual Codex, Claude Code, Cursor, and OpenCode clients remains NOT VERIFIED. Buff and Free Buff native compatibility remains unverified and receives only a portable fallback.

No browser, product security audit, deployment, or remote GitHub CI result is claimed. The scripts verify this instruction repository and its installation packaging only. Python was unavailable, so the bundled Python skill-creator validator could not run; the repository's Node.js metadata and packaging checks ran instead. Manual behavioral agent scenarios remain pending.
