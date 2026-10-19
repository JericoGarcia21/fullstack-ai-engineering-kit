# Package installation

Requires Node.js 22+ and npm. Works in an existing folder for any programming language or framework, including projects with no package.json. The CLI writes project-local files; it does not install a runtime dependency into your application. Windows, macOS and Linux are intended targets; see [actual verification](validation-results.md) for the environments exercised.

## Future npm installation (publication deferred)

Version 0.2.0 has not been published to npm. Publication was deferred by the maintainer on 2026-10-19 while account security-key/2FA setup is unresolved. Use GitHub or a local checkout for now. The following commands are planned for after successful publication:

Select the release explicitly for repeatability:

```sh
npx --yes fullstack-ai-engineering-kit@0.2.0 init --agent codex
```

Or install the command globally and run it from each project:

```sh
npm install --global fullstack-ai-engineering-kit@0.2.0
fullstack-ai-engineering-kit init --agent codex
```

Use --agent claude, cursor, opencode, or portable for other installation modes. Existing installations use the explicit [update workflow](updating.md), not init. Registry publication and GitHub releases are separate operations. A local checkout can still be used before its version is published.

## Install directly from GitHub

After the package changes have been pushed to GitHub, open a terminal in your project folder:

```sh
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit fullstack-ai-engineering-kit init --agent codex
```

Use claude, cursor, opencode, or portable instead of codex. GitHub package fetching requires Git and network access. For repeatable installation, append a reviewed commit SHA to the GitHub package specification, for example `github:JericoGarcia21/fullstack-ai-engineering-kit#<COMMIT_SHA>` with the placeholder replaced.

The command runs init explicitly, which writes the installation. Preview first by adding `--dry-run`. Choose a different existing directory with `--target "/path/to/project"`; relative paths resolve from your terminal's current directory.

On Windows PowerShell, if script execution policy blocks npx.ps1, use `npx.cmd` with the same arguments. No policy change is needed.

## Install once for repeated use

After pushing the package changes:

```sh
npm install --global github:JericoGarcia21/fullstack-ai-engineering-kit
fullstack-ai-engineering-kit init --agent codex
```

Run the second command from each project directory. Global npm executable paths and permissions depend on your Node installation. On Windows, `npm.cmd` can replace npm when PowerShell blocks npm.ps1.

## Try a local checkout now

Before pushing or publishing, run the CLI directly from another project:

```sh
node /path/to/fullstack-ai-engineering-kit/bin/cli.mjs init --agent codex
```

Alternatively, from the toolkit checkout run `npm pack`, then install the resulting .tgz with `npm install --global /path/to/fullstack-ai-engineering-kit-0.2.0.tgz`. This uses the same package executable without a registry publication. `npm run test:package` exercises an offline tarball installation in temporary directories.

## What init creates

| Mode | Native skill destination | Workflow entry point |
| --- | --- | --- |
| codex | .agents/skills/ | Appends a labeled block to AGENTS.md |
| claude | .claude/skills/ | Appends a labeled block to CLAUDE.md |
| cursor | .cursor/skills/ | Creates .cursor/rules/fullstack-ai-engineering-kit.mdc |
| opencode | .opencode/skills/ | Appends a labeled block to AGENTS.md |
| portable | No native discovery assumed | Provide .engineering-kit/docs/portable-master-instructions.md manually |

All modes copy a self-contained toolkit into .engineering-kit/, including templates, checklists, references, worked examples, all skills, and the MIT license. Native modes expose 19 complete skill folders in the host-specific location. Codex links them to the project bundle; other native modes copy them. New bundles include installation.json with version, source identity, agent layout, and tracked file hashes. The entry point directs the agent to project planning and evidence requirements without replacing your existing instructions or prescribing the toolkit's test commands for your application.

Existing bundles, skills, or conflicting rules cause an error before normal writes begin. init is not an upgrade command. Use status, check-updates, and the explicit update command described in [updates and migration](updating.md); there is no force overwrite or background upgrade. An unexpected filesystem failure can leave a partial installation; inspect the reported paths before retrying. Symlink/junction destinations are rejected. Avoid concurrent installers in the same project.

Review the generated files and commit them if the team should share the instructions. No project package.json, dependency lockfile, or global agent configuration is modified by init. No install/postinstall lifecycle hook initializes workspaces automatically.

Reload your agent, verify project-discovery is available, and ask:

```text
Follow .engineering-kit/templates/project-initialization.md to plan my project.
Prepare requirements, architecture, security/QA needs and a feature plan.
Present necessary decisions before starting significant implementation.
```

## Publishing future versions

Registry releases are published explicitly. Bump the package version, update the changelog, inspect the exact tarball, and complete the repository and package checks. GitHub installation does not require npm registry publication.

If you own the package name, review the package contents and publish explicitly:

```sh
npm run validate
npm test
npm run test:package
npm pack --dry-run
npm login
npm publish --access public --registry=https://registry.npmjs.org/
```

Publishing requires an npm account, an available/owned package name, and npm publishing authentication. For an interactive account workflow, enable two-factor authentication and complete npm?s browser or CLI challenge; login alone may not be sufficient. Keep passwords, tokens, and recovery codes out of chat and repository files. If the unscoped name is unavailable, choose a scope you own and update package.json plus installation examples. Users can select the published version, or use the latest registry tag:

```sh
npx fullstack-ai-engineering-kit init --agent codex
```

Other package managers that support npm packages may run this CLI, but their commands and compatibility have not been verified here. No claim of native support for every AI workspace is made; portable mode is a manual fallback.

The package uses npm's documented [bin and files fields](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/), [npm exec](https://docs.npmjs.com/cli/v11/commands/npm-exec/), and [GitHub package specifications](https://docs.npmjs.com/cli/v11/using-npm/package-spec/).
