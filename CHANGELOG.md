# Changelog

Versions below describe toolkit changes. Registry availability and GitHub release publication are separate; consult the release evidence for publication results.

## Unreleased

- Extend `security-engineering` with focused HTTP security-header guidance. Deny framing by default with CSP `frame-ancestors 'none'` plus `X-Frame-Options: DENY`, cover safe CSP rollout and related browser policies, and require effective-response verification during release assessment.
- Consolidate 21 overlapping skills into 17 clearer entry points: `product-definition`, `backend-data-engineering`, `diagnostics`, and `release-operations` replace eight narrower predecessors while preserving their work as explicit modes.
- Add outcome-based workflow recipes to the skill catalog and update installer tests, examples, compatibility guidance, and public invocation names.
- Existing installations should preview the update before applying it. Unchanged retired skill files are removed and the merged skills are added; local edits to retired skills cause a conflict and must be reconciled manually. Project instruction files are preserved, so replace old explicit skill names there yourself.
- Add adaptive-effort as default workflow guidance in repository, installed native entry points, and portable instructions. Scale effort to complexity and risk while preserving task completeness and required checks.
- Existing installations: after updating, append the following to the project AGENTS.md, CLAUDE.md, or toolkit Cursor rule (portable users should reload the updated portable instructions). Updates preserve these project entry points.

  > Apply adaptive effort by default: keep simple tasks concise and focused; deepen investigation and verification for complexity, risk, uncertainty, or failures. Preserve complete results and required checks. Avoid repeated work; report usage or savings only with supporting measurements. See .engineering-kit/skills/adaptive-effort/SKILL.md when needed.

- Add measurement boundaries and evaluation scenarios; no live telemetry integration or measured savings are claimed.

## 0.2.0 — 2026-10-19

- Expand all engineering skills with decision guides, failure cases, and primary references.
- Add AI engineering and animated app tutorial video skills, bringing the catalog to 19 skills.
- Track project installations with version, source revision when available, content digest, agent mode, and file hashes.
- Add status, explicit GitHub release checks, offline source comparisons, update previews, conflict protection, and backups with recovery logs.
- Support migration of older bundle installations with a separately supplied original baseline. Preserve project instructions and unrelated skills.
- Updates do not download or execute remote toolkit code. Run a reviewed newer CLI package or provide a local source. No background update checks or automatic installation.

## 0.1.0

- Initial engineering skills, planning templates, checklists, and project-local installer.
