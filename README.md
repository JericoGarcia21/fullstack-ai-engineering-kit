# Fullstack AI Engineering Kit

**An all-in-one engineering toolkit that helps AI coding assistants plan, build, test, review, and prepare software for release.**

Give your coding assistant a reusable workflow instead of explaining your engineering standards in every conversation. The kit provides 19 focused Agent Skills, project templates, review checklists, and an npm-compatible installer.

It runs through your existing coding assistant. Install it in a project folder, describe what you want to build, and ask the assistant to follow the workflow. You still choose the product, approve important decisions, and review the work.

## What does it help with?

| Stage | What the assistant is guided to do |
| --- | --- |
| Before coding | Understand the problem, users, scope, roles, constraints, and acceptance criteria; recommend an architecture and feature plan |
| During development | Build small complete features across UI, API, and database; handle permissions, validation, accessibility, and failure states |
| During review | Investigate bugs, review security and code quality, run relevant tests, and measure performance changes |
| Before release | Check actual evidence, production configuration, migrations, backups, recovery, monitoring, and deployment authorization |

Use it for new projects or existing applications. A small bug fix needs a bounded fix and useful verification; a larger application needs more planning. You do not need to invoke all 19 skills for every task.

The toolkit provides guidance and files. Your assistant needs its own access to your code, terminal, test runners, and other development tools. Installing the kit does not automatically test, secure, or deploy your application.

## Quick start

### 1. Check the requirements

- Node.js 22 or newer, with npm.
- Network access for registry installation; Git is additionally needed for direct GitHub installation.
- A coding assistant such as Codex, Claude Code, Cursor, or OpenCode.
- An existing project folder, which can be empty. No project package.json is required.

The installer works with project folders for any programming language or framework. Native skill discovery depends on the assistant and its version. Windows has been tested locally; macOS and Linux runtime verification remains pending.

### 2. Install in your project

Open a terminal **inside the project you want the assistant to work on**, then run:

```sh
npx --yes --package=github:JericoGarcia21/fullstack-ai-engineering-kit fullstack-ai-engineering-kit init --agent codex
```

This command uses the GitHub repository after these changes are pushed. npm registry publication is deferred pending account authentication setup; version 0.2.0 has not been published to npm. For an unpushed checkout, use the local installation option below.

Choose the value matching your assistant:

| Assistant | Option | Skills installed into | Workflow instructions |
| --- | --- | --- | --- |
| OpenAI Codex | `--agent codex` | `.agents/skills/` | Appended to `AGENTS.md` |
| Claude Code | `--agent claude` | `.claude/skills/` | Appended to `CLAUDE.md` |
| Cursor | `--agent cursor` | `.cursor/skills/` | New `.cursor/rules/fullstack-ai-engineering-kit.mdc` |
| OpenCode | `--agent opencode` | `.opencode/skills/` | Appended to `AGENTS.md` |
| Other assistants, including Buff and Free Buff | `--agent portable` | Available inside the reference bundle | Supply the portable instructions manually; native compatibility is unverified |

Add `--dry-run` to preview without changing files. Add `--target "/path/to/project"` to choose another existing folder.

On Windows PowerShell, use `npx.cmd` instead of `npx` if script execution policy blocks npx.ps1. You do not need to change the execution policy.

### 3. Open your coding assistant

Open or reload the assistant in the same project folder. Confirm that it can find the `project-discovery` skill and read the installed workflow instructions.

For portable mode, provide `.engineering-kit/docs/portable-master-instructions.md` to your assistant. If it cannot read local files, paste the relevant instructions into the conversation.

### 4. Describe your project

Copy and adapt this prompt:

```text
Follow .engineering-kit/templates/project-initialization.md to plan my project.

Product: A club equipment booking app.
Users: Members reserve equipment; staff manage equipment and bookings.
Main features: Browse availability, reserve a slot, view and cancel own bookings.
Constraints: A small team familiar with PHP, using shared hosting.

Clarify material gaps. Prepare requirements, acceptance criteria, architecture,
security and QA needs, and a feature-based implementation plan.
Present the necessary decisions before starting significant implementation.
```

In Codex, you can explicitly mention `$project-discovery`. In Claude Code, invoke `/project-discovery`. For the other assistants, ask them to load the relevant skill and confirm which file they read.

## How to use it after planning

### Build one approved feature

```text
Use fullstack-development to implement the approved booking creation feature.
Include the UI, server validation and authorization, database constraints,
failure feedback, relevant tests, and documentation.
Report the acceptance criteria completed and the actual test results.
```

### Work on an existing application

```text
Use debugging to investigate why cancelled bookings still appear as active.
Inspect the existing behavior, reproduce the problem, and make a bounded fix.
Preserve unrelated functionality and report actual regression verification.
```

### Review before release

```text
Use code-audit, security-engineering, qa-testing, and release-readiness to
assess this candidate release. Report findings and checks with evidence.
Mark gates PASS, FAIL, or NOT VERIFIED. Explain unresolved risks and recovery.
Do not deploy or modify live infrastructure.
```

Skill names describe the work you want. Request one skill or a few relevant skills together. Important decisions need approval unless you already delegated them; previously granted authorization should not be requested repeatedly.

## What gets installed?

Every mode creates `.engineering-kit/` with a self-contained reference copy of the toolkit, including its skills, templates, checklists, examples, documentation, and MIT license.

Native modes also install 19 skill folders in the assistant's discovery directory and add a workflow entry point. For example, a Codex project receives:

```text
your-project/
|-- .engineering-kit/          Reference toolkit and reusable documents
|-- .agents/skills/            19 Codex-discoverable skill folders
|-- AGENTS.md                  Existing guidance plus the toolkit workflow block
`-- ...                        Your application files
```

Existing instruction text is preserved. Existing toolkit bundles, skill folders, or conflicting rules cause init to stop rather than overwrite them. Use the explicit update commands for existing installations; init does not upgrade them. Updates preview changes, preserve local customizations, stop on conflicts, and back up replaced files. See [updates and migration](docs/updating.md). Unexpected filesystem failures can leave partial files, so inspect the reported paths before retrying.

The installer does not change your application's package.json, dependency lockfile, or global agent settings. Review the generated files and commit them if your team should share the workflow.

## Check and update an installed project

```sh
fullstack-ai-engineering-kit status
fullstack-ai-engineering-kit check-updates
fullstack-ai-engineering-kit update --dry-run
fullstack-ai-engineering-kit update
```

Update uses the running CLI package; run a reviewed newer CLI first or pass --source with a reviewed local toolkit path. Users see pushed changes on GitHub; check-updates detects published GitHub releases, not ordinary pushes. Pushing to GitHub or updating a global CLI does not update existing projects automatically. Older installs need their original source as a migration baseline. See [update instructions](docs/updating.md) and [changelog](CHANGELOG.md). Release checks are explicit and install nothing.

## Included skills

| Area | Skills |
| --- | --- |
| Planning | project-discovery, requirements-engineering, system-architecture |
| Interface | frontend-design, frontend-engineering, accessibility-review |
| Application and data | backend-api-engineering, database-engineering, fullstack-development |
| Quality and review | security-engineering, code-audit, qa-testing, debugging, performance-optimization |
| AI systems | ai-engineering |
| Video tutorials | app-video-tutorials |
| Delivery | devops-deployment, documentation, release-readiness |

See the [skill catalog](docs/skill-catalog.md) for each skill's purpose and instructions, and the [reference map](references/skill-sources.md) for the primary sources informing them. Skills include focused decision guides with failure cases, worked scenarios, completion evidence, and proposed behavioral evaluations.

Use ai-engineering for model APIs, document retrieval, tool-using agents, evaluation, and model-training lifecycle work. Read only the references relevant to the project; ordinary API integration does not require a training pipeline.

Use app-video-tutorials to create accurate app walkthroughs with real capture, animated highlights, captions, optional narration, and export review. Remotion is preferred for programmable animation; tools and upstream skills are not installed automatically. Start with the [video plan](templates/app-video-plan.md).

Example request: "Use app-video-tutorials to create a 60-second captioned tutorial of the booking workflow using demo data. Use Remotion for animated callouts and deliver the video plus editable source."

## Other installation options

After these changes are pushed, install the GitHub command once and reuse it across projects:

```sh
npm install --global github:JericoGarcia21/fullstack-ai-engineering-kit
```

Then run this from each project folder:

```sh
fullstack-ai-engineering-kit init --agent codex
```

To use a local checkout before pushing or publishing, run this **from another project folder**, replacing the toolkit path:

```sh
node /path/to/fullstack-ai-engineering-kit/bin/cli.mjs init --agent codex
```

The [installation guide](docs/package-installation.md) covers tarball installation, pinned GitHub revisions, Windows commands, and publishing to npm. Other package managers have not been verified. npm registry publication is a future plan; registry install commands become usable only after a successful publication. GitHub installs can be pinned to a reviewed commit.

## Examples and documentation

- [Worked booking-app example](examples/club-booking/README.md): concrete requirements, architecture, data model, API contract, feature plan, and readiness decisions.
- [Project initialization prompt](templates/project-initialization.md): a reusable start for new projects.
- [Engineering workflow](references/workflow.md): guidance before code, during development, and before deployment.
- [Security checklist](checklists/security.md), [UX checklist](checklists/frontend-ux.md), [QA plan](templates/qa-test-plan.md), and [release gates](checklists/release-readiness.md).
- [Agent compatibility](docs/agent-compatibility.md), [official sources](references/sources.md), and [complete repository tree](docs/repository-tree.txt).

## Validation and contributing

From the toolkit checkout:

```sh
npm run validate
npm test
npm run test:package
```

The checks cover required files, skill metadata, local Markdown links, installer behavior, and offline npm package execution. These are toolkit checks; use your application's own test commands to verify product features.

The latest recorded local results are 19 skills and 95 Markdown files validated with no errors, 48 regression tests passed, and package execution passed for all five installation modes. Actual discovery inside agent clients and remote GitHub CI remain unverified. See [validation results](docs/validation-results.md) for evidence and limits, and [CONTRIBUTING.md](CONTRIBUTING.md) to contribute.

## License

[MIT License](LICENSE)

Copyright (c) 2026 Jerico B. Garcia

External references retain their own licenses and terms. Agent conventions were reviewed on 2026-10-18 and can change with tool versions. The toolkit does not guarantee that AI-generated software is secure, accessible, or production-ready.
