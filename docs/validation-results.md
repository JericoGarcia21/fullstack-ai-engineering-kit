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

## npm-compatible workspace installer

Verified locally on Windows with Node.js v24.14.1. PowerShell blocks npm.ps1 in this environment; npm.cmd was used without changing execution policy.

| Command | Actual result |
| --- | --- |
| `npm.cmd run validate` | Exit 0; 17 skills, 77 Markdown files, 0 errors |
| `npm.cmd test` | Exit 0; 22 tests passed, 0 failed, 0 skipped |
| `npm.cmd run test:package` | Exit 0; npm pack, offline tarball installation, npm executable resolution, and all 5 workspace modes passed |

New regression cases cover a project without package.json, existing instruction preservation, portable-only installation, conflicts before writing, junction rejection, CLI arguments, and paths with spaces. The artifact check used npm to execute the installed command for codex, claude, cursor, opencode and portable in isolated temporary directories.

GitHub downloading, public npm registry installation, actual agent-client discovery, macOS/Linux runtime execution, and remote CI remain NOT VERIFIED. The npm registry package has not been published. Package-manager installation verifies file placement and executable behavior, not agent compliance with instructions.

## Detailed skills and AI engineering expansion

Verified locally on Windows PowerShell, 2026-10-19. Earlier results above are historical.

| Command | Actual result |
| --- | --- |
| node scripts/validate.mjs | Exit 0; 18 skills, 86 Markdown files, 0 errors |
| npm.cmd test | Exit 0; 23 tests passed, 0 failed, 0 skipped |
| npm.cmd run test:package | Exit 0; npm pack, offline tarball installation, executable resolution, and all 5 workspace modes passed |

The canonical skill set now includes ai-engineering and its five local references. Installer tests verify that these references are copied and their local links resolve. The package smoke check verifies the AI feature template and references in the installed bundle and AI skill discovery paths in the four native installation modes. This proves file placement, not automatic discovery inside a running agent client.

All 17 existing skills have expanded decision guides with worked scenarios, failure patterns, completion checks, and primary references. Proposed behavioral scenarios are documented but have not been executed. No real model API, retrieval corpus, agent tool action, training job, product security assessment, or deployment was tested. The source review date does not refresh previous host integration claims. Installed duplicate skill folders were not edited; changes are in canonical skills/.

## App video tutorial skill

Verified locally on Windows PowerShell, 2026-10-19. Earlier results above remain historical.

| Command | Actual result |
| --- | --- |
| node scripts/validate.mjs | Exit 0; 19 skills, 93 Markdown files, 0 errors |
| npm.cmd test | Exit 0; 23 tests passed, 0 failed, 0 skipped |
| npm.cmd run test:package | Exit 0; npm pack, offline tarball installation, executable resolution, and all 5 workspace modes passed |
| git diff --check | Exit 0; no whitespace errors |

The app-video-tutorials skill includes capture, Remotion, narration/caption, video QA, and decision references. Installer tests verify all five references and their local links in four native layouts. Package checks verify the video plan and complete reference set in every bundle and the Remotion reference in native skill paths. This verifies file placement, not discovery inside running clients.

Official Remotion, Playwright recording, and W3C accessible-media documentation was reviewed; see the skill's source list. Remotion and optional upstream agent skills were not installed. No app capture, speech generation, video render, playback/audio review, or paid/cloud job was executed. The proposed behavioral scenario remains unexecuted. Existing installed skill copies were not refreshed.

## Version tracking and safe project updates (0.2.0)

Verified locally on Windows PowerShell, 2026-10-19. Earlier results above are historical.

| Command | Actual result |
| --- | --- |
| node scripts/validate.mjs | Exit 0; 19 skills, 95 Markdown files, 0 errors |
| npm.cmd test | Exit 0; 48 tests passed, 0 failed, 0 skipped |
| npm.cmd run test:package | Exit 0; npm pack, offline tarball installation, executable resolution, and init/status/check/preview/update in all 5 workspace modes passed |
| git diff --check | Exit 0; no whitespace errors |

New coverage verifies manifests and offline status, unchanged-local-edit preservation, conflicts before writes, added/removed skill files and Codex links, read-only previews, backups, a simulated write failure with rollback, a simulated manifest-publish failure restoring newly added links, hardlink isolation, exclusive update locks, unsafe manifest paths, unexpected junctions, and source/baseline independence. Migration cases include an untracked 17-skill Codex copy installation gaining the two new skills and a linked legacy bundle. Discovery repair retains the original baseline for local edits.

GitHub checks were tested using fixture responses for a newer release, missing release, rate limit, invalid version, and offline failure. The public GitHub API and npm package-ref documentation were reviewed on 2026-10-19. No live release endpoint, remote package download, GitHub notification, release publication, or npm publication was exercised. Version 0.2.0 is a local release candidate, not a claim of publication.

The updater applies reviewed local source bytes without running incoming modules or lifecycle hooks. Recovery is best effort, not a filesystem-wide atomic transaction: crash/power-loss recovery and real storage-failure behavior were not rehearsed. Tests ran on Windows; macOS/Linux runtime behavior, concurrent hostile filesystem changes, and running agent-client discovery remain NOT VERIFIED. Existing real projects were not updated. See [updates and migration](updating.md) for usage, legacy baseline requirements, conflict handling, and manual recovery.

## npm 0.2.0 publication preparation

Verified locally on Windows PowerShell, 2026-10-19. The user authorized public npm publication. The release is the current reviewed working tree (including uncommitted toolkit changes), not a claim that those changes were pushed to GitHub.

| Gate | Status and evidence |
| --- | --- |
| Requirements and authorization | PASS: user requested public registry publication of the existing toolkit |
| Toolkit validation | PASS: node scripts/validate.mjs; 19 skills, 95 Markdown files, 0 errors |
| Regression tests | PASS: npm.cmd test; 48 passed, 0 failed, 0 skipped |
| Package behavior | PASS: npm.cmd run test:package; offline tarball init/status/check/preview/update in all 5 modes |
| Filesystem safety and recovery | PASS within tested scope: conflict, link/path, hardlink, backup, and simulated rollback regression cases |
| Configuration and identity | PASS: explicit public npm registry/access in publishConfig; browser login verified account npm_jerico123 |
| Documentation | PASS: npm installation and pinned update instructions prepared; publication results are recorded separately |
| Package contents and registry result | NOT VERIFIED at this preparation step; inspect the packed artifact before publication |

There are no production services, databases, UI, or model executions in this release; service monitoring, migration/restore, UI accessibility, and model quality gates are inapplicable to publishing this instruction/CLI package. Actual discovery inside running coding agents and non-Windows runtime behavior remain unverified and are disclosed. Registry versions are immutable: correct a bad release with a new version and, where appropriate, deprecation rather than attempting to overwrite it. No GitHub release or npm publication is claimed by this preparation record.

### Exact artifact review and first registry attempt

The 0.2.0 tarball contains 112 files, 98,157 compressed bytes, and 328,253 unpacked bytes. Its SHA-512 integrity is SQWmGIkwHUC4FIQjeqWR6hpS4Jqj02bM1Rjvql/GHv0d0iDH2DBmkD5jjvcOqT3olTa6CoBMDQjVAwqdFaWXzw==. Packed paths excluded installed duplicates, caches, local environment files, npm configuration, and key-file extensions. A recognized credential-pattern scan found no matches; this is a bounded content review, not a guarantee of absence of every possible secret. Runtime dependencies are empty.

The authenticated account was npm_jerico123. The explicit public-registry publish attempt returned HTTP 403 requiring two-factor authentication or an eligible publishing token. No successful publication or registry installation is claimed by this attempt. Publication is pending completion of npm's account authentication requirement. The artifact remains available locally under the ignored .validation-tmp/release directory.

### Maintainer deferred npm publication

On 2026-10-19 the maintainer explicitly deferred npm publication for a future session. Registry publication was not successful; account authentication/security-key setup remained unresolved. README and installation guidance were revised to use GitHub/local distribution and label npm examples as future commands. No public registry installation was verified. The preparation artifact and failed-attempt record above remain historical evidence, not a released version. Future publication must rebuild/review the current artifact and recheck release gates. Existing project installations were not changed, and no GitHub push or release was performed.
