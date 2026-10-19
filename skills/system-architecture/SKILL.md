---
name: system-architecture
description: "Choose and document a proportionate system architecture, stack, boundaries, and trade-offs before significant implementation."
license: MIT
---

# System Architecture

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

## Workflow

1. Read requirements, constraints, existing architecture, and deployment options. Preserve a working stack unless a concrete requirement justifies replacement.
2. Compare a small number of viable stacks using team skills, runtime support, cost, data consistency, maintenance, and portability. Prefer a modular monolith unless independent scaling or ownership requires more.
3. Describe frontend, backend, authentication, database, third-party services, trust boundaries, failure modes, and a proposed folder structure. Separate client convenience from server authority.
4. Define data entities and API contracts where relevant, including errors, authorization, concurrency, and external-service failures. Record privacy and operational constraints.
5. Produce architecture.md, database-design.md, and implementation-plan.md. Present decisions and obtain approval before significant implementation unless that decision is explicitly delegated; record prior delegation rather than asking again.

## Decisions and verification

Base architecture on concrete quality scenarios and operational constraints. Use ATAM concepts to reason about trade-offs; a lightweight review is not a claim to have conducted a formal ATAM evaluation.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

Before handoff: Important requirements map to a component or enforceable boundary. Failure behavior and recovery ownership are explicit for critical dependencies. Unverified scale/cost assumptions and triggers for revisiting the design are recorded.

## Outputs and handoff

Use the toolkit's `templates/architecture.md` when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
