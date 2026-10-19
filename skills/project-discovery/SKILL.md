---
name: project-discovery
description: "Discover product goals, users, workflows, constraints, and MVP scope before starting a new software project."
license: MIT
---

# Project Discovery

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

## Workflow

1. Inspect existing repository guidance and working behavior; determine whether this is a new product or a bounded change.
2. Describe the user problem, current workaround, success measure, and primary workflow in concrete terms. Ask only questions that change scope, behavior, or architecture.
3. Separate core features, optional work, future improvements, and exclusions. Identify roles, permissions, sensitive data, budget, hosting, deadlines, and expected deliverables.
4. Record assumptions with confidence and who can resolve them. Do not silently turn missing answers into commitments.
5. Deliver a project brief and a readiness summary: known facts, proposed MVP, blocking decisions, and next planning artifacts. Continue planning without writing product code.

## Decisions and verification

Use discovery to resolve uncertainty about the problem and users. For a bounded change with known behavior, inspect that flow rather than reopening the entire product strategy.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

Before handoff: The brief distinguishes confirmed needs, proposed scope, and assumptions. Each blocking question names the decision it affects; nonblocking gaps have a stated assumption. The proposed success measure has a baseline or a named way to obtain one.

## Outputs and handoff

Use the toolkit's `templates/project-brief.md` when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
