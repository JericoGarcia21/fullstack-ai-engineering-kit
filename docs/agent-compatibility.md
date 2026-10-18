# Agent installation and limitations

Official conventions reviewed 2026-10-18; [sources and review limits](../references/sources.md). These are documented mechanisms, not observed client integration test results. This repository is a source package: skills/ alone is not a native discovery directory.

## Project installation

From the toolkit directory, preview installation into an existing project with Node.js 22 or newer:

```sh
node scripts/install.mjs --agent codex --target /path/to/project
node scripts/install.mjs --agent codex --target /path/to/project --write
```

Replace codex with claude, cursor, or opencode. On Windows use a quoted absolute path such as `"C:/work/my-project"`. The default is a dry run. Existing skill folders cause an error; nothing is overwritten. The installer copies complete skill folders including local references, but does not edit project instructions or global configuration. Review and merge the master workflow into existing instructions manually.

| Agent | Installer project path | Other officially documented path | Invocation / entry point |
| --- | --- | --- | --- |
| Codex | .agents/skills/name/SKILL.md | ~/.agents/skills/name/SKILL.md | CLI/IDE: $project-discovery or /skills; AGENTS.md |
| Claude Code | .claude/skills/name/SKILL.md | ~/.claude/skills/name/SKILL.md | /project-discovery; CLAUDE.md |
| Cursor | .cursor/skills/name/SKILL.md | ~/.cursor/skills/name/SKILL.md; also .agents/skills | Ask for the skill; verify in Customize > Skills; .cursor/rules/*.mdc |
| OpenCode | .opencode/skills/name/SKILL.md | ~/.config/opencode/skills/name/SKILL.md; also .agents/skills and .claude/skills | Ask to load project-discovery through the skill tool; AGENTS.md |

Do not install the same name in multiple paths unnecessarily. Codex can show duplicate names; discovery and precedence differ by host. If skills do not appear, inspect metadata, permissions, host version, and restart/reload as needed. Codex repository discovery follows directories toward the repository root. OpenCode uses worktree-aware upward discovery. Claude has its own project/nested discovery rules.

## Instruction entry points

This repository includes AGENTS.md, CLAUDE.md, and a Cursor MDC rule for work on the toolkit. For another project, merge their relevant guidance into existing project instructions; copying toolkit AGENTS.md wholesale would introduce toolkit-only validation commands. Use the portable master text as the project workflow and retain local stack commands. Native skills remain self-contained even without central templates. Keep a separate toolkit checkout accessible if you want its shared templates and checklists.

## Limits

- Native paths do not override sandbox permissions, user authorization, or host policies. Skill selection is not guaranteed.
- Cursor user skills and remote environments have different sync behavior; prefer project-installed skills for repository sharing and consult current docs for Cloud Agents.
- Claude-specific frontmatter extensions and OpenCode-specific settings are intentionally absent from the portable skill files.
- Codex plugin publishing is separate from local skill installation. This kit has no plugin registry submission or managed organization deployment.
- Buff, Free Buff, and other unverified hosts: use [portable master instructions](portable-master-instructions.md); do not invent configuration paths.

After installation, ask the host to list/load project-discovery and identify its loaded file. Run [manual scenarios](../examples/agent-evaluation.md). Record actual outcomes before claiming tested compatibility.
