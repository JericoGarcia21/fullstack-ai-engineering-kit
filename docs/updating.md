# Installation status and updates

A git push changes the toolkit repository, not existing project installations. Each project keeps its own snapshot. New installations from 0.2.0 onward record their version and hashes in `.engineering-kit/installation.json`. Updating a global CLI also does not update those project files automatically.

## Quick start: update installed skills with PowerShell

You need Node.js 22 or newer, npm/npx, and Git available for the GitHub package commands. Open PowerShell in the project that already contains `.engineering-kit`. For example, replace this path with your own project:

```powershell
cd C:\Users\Jerico\Documents\intelchecker
```

Check what is installed and whether tracked toolkit files have local changes:

```powershell
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit fullstack-ai-engineering-kit status
```

Check for a newer published GitHub release (this does not update files):

```powershell
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit fullstack-ai-engineering-kit check-updates
```

The release check detects published releases, not every push. To preview the changes from the GitHub default branch, run:

```powershell
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit fullstack-ai-engineering-kit update --dry-run
```

Review the preview. If it reports no conflicts, apply the update:

```powershell
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit fullstack-ai-engineering-kit update
```

Check status again using the first command, then restart your coding agent to load the updated skills. Updates create backups in `.engineering-kit-backups/`. A successful update records installation tracking; future updates do not need `--baseline`.

These commands run the CLI through npx without installing a global command. The GitHub package selects the default branch; for a repeatable update, append `#RELEASE_TAG` or `#COMMIT_SHA` to the package specification, using the same reviewed revision for preview and apply. The npx commands require network access when the selected package is not cached. Although `status` itself is offline, obtaining its CLI through npx may use the network.

For tracked installations with the current CLI bundled locally, status can also run without fetching a package:

```powershell
node .engineering-kit/bin/cli.mjs status
```

That bundled CLI describes the installed snapshot; use an independent newer package or source for updating it.

### Common errors

| Message | What to do |
| --- | --- |
| `fullstack-ai-engineering-kit` is not recognized | Use the full npx command above. Running npx does not install a permanent global command. |
| PowerShell blocks `npx.ps1` | Replace `npx` with `npx.cmd` in the commands above. |
| `Existing bundle validation failed` after running `init` | Use `update` for an existing installation. `init` does not upgrade older bundles. |
| `Legacy update requires --agent and --baseline` | Follow [legacy migration](#migrate-a-previously-installed-project) below once, using the original unmodified source. Do not use the installed bundle as its own baseline. |
| Update reports conflicts | No update is applied. Follow [conflict handling](#what-changes-and-what-stays), preserve customizations, and preview again. |
| Release availability is unknown | The release lookup did not establish whether you are current. See the release-check details below or compare a reviewed local source. |

## Inspect a project

Run a current CLI from the project directory:

```sh
fullstack-ai-engineering-kit status
fullstack-ai-engineering-kit check-updates
```

`status` is offline. It reports the installed version, source content digest, agent/layout, and modified or missing tracked files. The digest distinguishes source content even when two snapshots share a version. A Git revision is recorded when available; it may describe a checkout with uncommitted changes, so the content digest identifies the actual snapshot. Untracked extra files are preserved but are not listed as tracked changes.

`check-updates` makes an explicit, bounded request to the public GitHub latest-release endpoint. It reports a newer stable version and a release-notes link; it installs nothing. A push or a tag without a published GitHub release does not produce a release notification. A missing release, unavailable repository, rate limit, or network failure is not proof that the project is current. There are no background checks or telemetry. `--json` is available for these commands.

For an offline comparison with a reviewed local checkout/package:

```sh
fullstack-ai-engineering-kit check-updates --source /path/to/new-toolkit
```

This also reports content differences when the version number is unchanged. Bump versions for releases rather than relying on same-version changes.

## Preview and apply

Run the selected newer CLI package, or supply its reviewed local source:

```sh
fullstack-ai-engineering-kit update --source /path/to/new-toolkit --dry-run
fullstack-ai-engineering-kit update --source /path/to/new-toolkit
```

npm publication is currently deferred; 0.2.0 is not on the registry. Use a reviewed GitHub package or independent local checkout now. After a successful registry publication, select the reviewed version explicitly:

```sh
npx --yes fullstack-ai-engineering-kit@0.2.0 update --dry-run
npx --yes fullstack-ai-engineering-kit@0.2.0 update
```

For subsequent releases, substitute their reviewed version. This still requires the legacy baseline options below for an untracked installation.

Without `--source`, update uses the package containing the running CLI. An old globally installed CLI does not acquire a newer toolkit merely because a GitHub release exists. Obtain the reviewed newer package first. The installed project bundle cannot be its own incoming source; use an independent newer CLI/package or checkout. Older-version downgrades are rejected. After a release is actually published, a GitHub package can be selected explicitly, replacing `RELEASE_TAG` with the reviewed release tag:

```sh
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit#RELEASE_TAG fullstack-ai-engineering-kit update --dry-run
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit#RELEASE_TAG fullstack-ai-engineering-kit update
```

The npx step fetches and executes the selected package using npm. The updater itself does not fetch archives, run package installation, execute source hooks, or load incoming toolkit modules. Use a reviewed tag or commit for repeatability. No release is published merely by these local code changes. Windows PowerShell users can use `npx.cmd` if execution policy blocks npx.ps1.

All commands accept `--target /absolute/or/relative/project` instead of changing directories. `update --json` returns the plan, conflicts, preserved files, and backup location. Exit codes are 0 for a successful operation/preview/check, 2 for update conflicts, and 1 for invalid input, unsafe paths, network errors, or other failures. An available update is data, not an error exit.

## What changes and what stays

The updater compares original hashes, current project files, and incoming hashes:

| Situation | Result |
| --- | --- |
| Only upstream changed a tracked file | Replace it after backing up the old bytes |
| Local and incoming bytes already match | Keep the file |
| Local edit/deletion with no upstream change | Preserve it and continue reporting it in status |
| Both local and upstream changed a file, or upstream removes a locally edited file | Stop the whole update with conflicts |
| Incoming path collides with different untracked content | Stop with a conflict |
| Upstream removes an unchanged tracked file | Back it up and remove that file |

No force option or automatic text merge is provided. Resolve a conflict by comparing the project, original source, and incoming file. Save the customization elsewhere and deliberately restore the original bytes to accept replacement, or manually integrate the incoming version until the file equals the desired result. Preview again before applying. Do not edit manifest hashes to hide conflicts.

Project-level AGENTS.md, CLAUDE.md, Cursor rules, application files, and unrelated skills are left untouched by update. If a release changes the recommended project entry point, its release notes must explain the manual change. The update does not switch agents. Native copied skills remain copies; tracked Codex links continue pointing at the project-local bundle. Unexpected links, redirected parents, and directory/file collisions are rejected. User-added extra files in managed folders are preserved. Empty directories can remain after removals.

Reload the coding agent after an update and verify the skills are available. File-placement tests do not establish discovery inside a running client.

## Migrate a previously installed project

Older installs have no original file hashes. `status` identifies them as legacy. A safe migration needs an independent original, unmodified toolkit checkout or extracted package matching the original installation, including its version and file bytes. Do not use the installed `.engineering-kit` as its own baseline: it may contain local edits. A reused version number alone cannot identify the correct original snapshot.

```sh
fullstack-ai-engineering-kit update --agent codex --baseline /path/to/original-toolkit --source /path/to/new-toolkit --dry-run
fullstack-ai-engineering-kit update --agent codex --baseline /path/to/original-toolkit --source /path/to/new-toolkit
```

Choose the agent that owns the existing installation. Supply `--agent portable` for bundle-only installs. Codex copies and project-local linked layouts are supported; mixed legacy layouts require manual reconciliation. Existing modifications participate in the same conflict checks. After migration, the manifest enables ordinary updates without `--baseline`.

With the GitHub CLI in PowerShell, replace the baseline path with the recovered original source directory:

```powershell
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit fullstack-ai-engineering-kit update --agent codex --baseline "C:\path\to\original-toolkit" --dry-run
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit fullstack-ai-engineering-kit update --agent codex --baseline "C:\path\to\original-toolkit"
```

Review the first command's preview before running the second. This uses the fetched CLI package as the incoming source. On subsequent updates, use the quick-start commands without `--baseline`.

If the original source cannot be recovered, do not guess a baseline. Back up the existing installation, install the new toolkit into a separate empty project directory, and manually reconcile toolkit-owned content. Never delete an entire shared skills directory or replace a project's instruction file. Standalone skill-only installs made with scripts/install.mjs have no bundle/manifest and require this manual reconciliation or migration to a project bundle.

## Backups and interrupted updates

Every applied update creates `.engineering-kit-backups/<timestamp-and-id>/` containing a recovery.json log, old bytes for overwritten/deleted files, staged new bytes, and the previous manifest when one existed. The log maps each numbered `old-N`/`new-N` file to its project-relative path and operation. Backups remain local; review their contents before sharing or deleting them. Consider ignoring `.engineering-kit-backups/` and `.engineering-kit-update.lock` in your project's version control. The installer does not edit your .gitignore.

Writes use an exclusive `.engineering-kit-update.lock`. Ordinary write failures trigger best-effort rollback, including the manifest, and report whether rollback completed. The updater is not a filesystem-wide atomic transaction: process termination, power loss, concurrent edits, or storage failure may leave partial state. Avoid simultaneous installers, app edits to managed files, or manual changes during update.

If interrupted, first ensure the recorded updater process is no longer running. Inspect the newest backup's recovery.json and compare destination bytes with the recorded before/after hashes. Restore overwritten/removed files from their old-N entries; remove only confirmed newly added files/links; restore the previous manifest or remove a newly created manifest as indicated by hadManifest. Check link targets and preserve unrelated content. Use status and a fresh preview after recovery. Only then remove a stale lock and retry. There is no automated crash-resume/restore command, and an incomplete rollback requires manual reconciliation.

## Notify users of future releases

Maintainers should bump package.json, update [the changelog](../CHANGELOG.md), run repository/package checks, and publish a GitHub release with the matching reviewed tag and migration notes. Publishing is a separate authorized action. Users can subscribe to repository release notifications using GitHub Watch settings, or run `check-updates` when they choose. Ordinary pushes are not automatically installed.

GitHub release lookup and npx execution were reviewed against [GitHub Releases API documentation](https://docs.github.com/en/rest/releases/releases#get-the-latest-release) and [npm exec documentation](https://docs.npmjs.com/cli/v11/commands/npm-exec/) on 2026-10-20. GitHub package selection was checked against [npm package specifications](https://docs.npmjs.com/cli/v11/using-npm/package-spec/) on 2026-10-19. See [validation results](validation-results.md) for runtime evidence and limits.

## Deferred publication plan

On 2026-10-19 the maintainer deferred npm publication because account security-key/2FA setup was unresolved. The prepared 0.2.0 artifact was not successfully published. The toolkit remains usable through an independent local checkout, or through GitHub once the working-tree changes are pushed.

Future steps: complete npm authentication, rerun release and package checks, rebuild and inspect the then-current artifact, publish with explicit authorization, verify an installation fetched from the public registry, and update the README with the verified registry command. Do not reuse an old artifact without reviewing intervening changes.

For current update visibility, push the changes and publish a corresponding GitHub release with versioned notes when authorized. Users can subscribe to GitHub release notifications or explicitly run check-updates using the newer CLI. Existing installations do not update automatically; legacy bundles need their original baseline for safe migration. An old CLI without the new commands must first be replaced by a newer reviewed CLI. No GitHub push or release was performed in this session.
