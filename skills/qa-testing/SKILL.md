---
name: qa-testing
description: "Plan and execute risk-based tests for user workflows, permissions, APIs, boundaries, regressions, and failure recovery."
license: MIT
---

# Qa Testing

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

## Workflow

1. Map acceptance criteria to risks and test layers. Use unit tests for logic, integration tests for boundaries, and end-to-end tests for critical user journeys rather than duplicating all cases at every layer.
2. Choose equivalence classes and boundary values; use pairwise combinations for independent dimensions but explicitly test high-risk interactions.
3. Cover roles, cross-tenant access, invalid input, API failures, concurrency, retry behavior, and recovery with deterministic fixtures and isolated state.
4. Use the existing runner (for example Playwright, Vitest, Jest, PHPUnit). Prefer stable accessible locators and controlled setup; avoid arbitrary sleeps and tests that merely mirror implementation.
5. Record command, environment, revision, actual result, artifacts, unresolved failures, and coverage gaps. Mark unavailable checks NOT VERIFIED and never create fictional screenshots or CI success.

## Decisions and verification

Choose tests by failure risk and observable behavior. Use the existing runner; Playwright guidance applies to browser testing and does not mandate Playwright for every project.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

Before handoff: Critical acceptance criteria and permission boundaries have meaningful coverage. Tests fail for the intended defect and avoid depending on arbitrary timing or execution order. The report records command, environment, actual outcome, artifacts, and unchecked risks.

## Outputs and handoff

Use the toolkit's `templates/qa-test-plan.md` when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
