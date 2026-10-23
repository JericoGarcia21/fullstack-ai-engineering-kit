---
name: product-definition
description: "Discover product goals, users, workflows, constraints, and MVP scope, then turn the agreed scope into measurable requirements and acceptance criteria."
license: MIT
---

# Product Definition

## Inputs and scope

Use for new-product discovery, ambiguous feature definition, or requirements changes. Read project instructions, existing behavior, stakeholder evidence, and constraints. For a bounded change with known behavior, inspect that flow rather than reopening the whole product strategy. Scale traceability to risk.

## Workflow

1. Describe the user problem, actors, trigger, current workaround, primary workflow, consequence of failure, and success measure. Separate confirmed facts, proposals, assumptions, and unanswered questions.
2. Define the smallest complete user outcome. Mark MVP, optional, future, and excluded work; record roles, resource permissions, sensitive data, budget, hosting, deadlines, integrations, and operational ownership.
3. Assign stable requirement IDs and specify normal, invalid, boundary, permission-denied, empty, concurrent, repeated, dependency-failure, and recovery behavior where relevant.
4. Write observable acceptance criteria and map each requirement to a verification method. Replace vague qualities such as fast or intuitive with a measurable target or an explicit open decision.
5. Produce a project brief, requirements, and acceptance criteria. Identify blocking decisions before architecture or implementation depends on them; give nonblocking gaps a stated assumption and confidence.

## Decisions and verification

Use discovery mode when the problem, users, or MVP are uncertain. Use requirements mode when scope is agreed but behavior needs precision. Most new products need both in sequence.

Read [the decision guide](references/guide.md) for significant, unfamiliar, or detailed definition work. Before handoff, every MVP requirement has an observable pass/fail condition, permission and recovery behavior are explicit for sensitive actions, and proposed success measures have a baseline or named way to obtain one.

## Outputs and handoff

Use `templates/project-brief.md`, `templates/requirements.md`, and `templates/acceptance-criteria.md` when useful, or provide proportionate equivalents. Report evidence, decisions, assumptions, unresolved questions, and the next required action. Do not invent user research, approval, or verification.

Supporting resources are local to this skill and travel with its folder.
