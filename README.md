# fullstack-ai-engineering-kit

A reusable engineering toolkit for AI coding agents: discover and plan before code, build tested vertical features, and review evidence before release. It includes 17 focused Agent Skills, practical templates, checklists, a worked project, native integration instructions, and dependency-free validation. It does not guarantee secure or production-ready software.

## Start here

1. Read [the workflow](references/workflow.md) and choose a proportional scope.
2. Install skills using [agent-specific instructions](docs/agent-compatibility.md), or provide [portable instructions](docs/portable-master-instructions.md).
3. Copy [the project initialization prompt](templates/project-initialization.md). Review requirements and architecture before significant implementation unless decisions were explicitly delegated.
4. Build feature slices; use [security](checklists/security.md), [UX](checklists/frontend-ux.md), [QA](templates/qa-test-plan.md), and [release](checklists/release-readiness.md) evidence.

## Install and validate

Requires Node.js 22+; no npm packages are required. From this directory:

```sh
node scripts/validate.mjs
node --test scripts/validate.test.mjs scripts/install.test.mjs
node scripts/install.mjs --agent codex --target /path/to/project
node scripts/install.mjs --agent codex --target /path/to/project --write
```

Installation previews by default and refuses existing skill folders. Use claude, cursor, or opencode for the other native paths. Merge project workflow instructions manually. Buff, Free Buff and unverified agents receive the portable fallback; no native support is claimed.

## Sample invocation

```text
Use project-discovery from fullstack-ai-engineering-kit to plan a club equipment
booking app. Members reserve slots; staff manage resources. The team knows PHP
and expects shared hosting. Follow templates/project-initialization.md. Produce
requirements, architecture, security/QA needs and a feature plan. Present open
decisions and stop before implementation until they are approved.
```

In Codex use $project-discovery; in Claude Code use /project-discovery after installation. See [the worked example](examples/club-booking/README.md) for meaningful completed planning artifacts.

## Contents

- [Skill catalog](docs/skill-catalog.md): discovery, requirements, architecture, design, frontend, backend, database, fullstack, security, audit, QA, debugging, accessibility, performance, deployment, documentation and release.
- [Templates](templates/project-brief.md) and [initialization prompt](templates/project-initialization.md): reusable planning and evidence artifacts.
- [Validation scope](docs/validation.md), [manual evaluation](examples/agent-evaluation.md), and [repository tree](docs/repository-tree.txt).
- [Official sources and attribution](references/sources.md), [contribution guide](CONTRIBUTING.md), and [license explanation](docs/license.md).

## Publish to GitHub

Create an empty GitHub repository first. From the parent workspace:

```sh
cd fullstack-ai-engineering-kit
git init -b main
git add .
git commit -m "Add fullstack AI engineering toolkit"
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

Replace the URL placeholder before running. Authentication, repository creation, licensing/ownership review, client integration checks, and remote CI verification remain manual. These commands are instructions, not a record of execution. No GitHub repository or deployment is created automatically.

Licensed under the [MIT License](LICENSE). Copyright (c) 2026 Jerico B. Garcia. Retain the license notice. External references keep their own licenses. Documentation conventions were reviewed on 2026-10-18 and may change with agent versions.
