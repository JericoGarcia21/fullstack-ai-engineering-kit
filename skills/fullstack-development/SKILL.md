---
name: fullstack-development
description: "Build an approved feature across UI, API, database, tests, and documentation in small reviewable increments."
license: MIT
---

# Fullstack Development

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

## Workflow

1. Confirm scope, architecture decisions or recorded delegation, acceptance criteria, and relevant project commands. For a small fix, use a short proportional plan.
2. Choose the smallest end-to-end feature slice. Identify schema, contract, permissions, UI states, and tests before changing code.
3. Implement server validation and authorization, persistence invariants, and client feedback together. Use existing framework practices and add dependencies only for a demonstrated need.
4. Keep changes reviewable; avoid premature abstractions, duplication, unused packages, and unrelated redesigns. Synchronize contracts and documentation with behavior.
5. Run meaningful checks for the changed risks and record exact outcomes. Report completed criteria, remaining gaps, and next slice; never equate generated code with working functionality.

## Decisions and verification

Build a user-visible vertical slice with its authorization, persistence, failure behavior, and useful checks. Consult specialist skills only for the boundaries the slice actually changes.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

Before handoff: A complete acceptance journey is demonstrable from the user entry point. Denied, repeated, and conflicting actions preserve server and database invariants. Contracts, tests, and operating notes match the resulting behavior.

## Outputs and handoff

Use the toolkit's `templates/implementation-plan.md` when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
