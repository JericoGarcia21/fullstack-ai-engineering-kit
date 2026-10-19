---
name: frontend-engineering
description: "Implement approved frontend behavior with reusable components, state handling, API integration, and responsive accessible HTML."
license: MIT
---

# Frontend Engineering

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

## Workflow

1. Read the approved UX and API contract; inspect existing component and state conventions before adding dependencies.
2. Build a vertical user flow with semantic HTML and explicit state ownership. Keep server data, transient UI state, and derived values distinct.
3. Handle request cancellation or stale responses, pending actions, validation, retries, errors, and empty results. Do not expose secrets in client bundles or treat hidden buttons as authorization.
4. Use design tokens and reusable components where repeated behavior warrants them; preserve page-specific hierarchy and avoid unnecessary component frameworks.
5. Verify keyboard interactions, responsive content, API error paths, and the primary workflow using the project test tools. Update evidence and API/UX documentation together.

## Decisions and verification

Follow the existing framework and component conventions. Select browser and framework documentation matching the installed versions instead of assuming a particular stack.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

Before handoff: The main flow works with keyboard input and narrow viewports. Tests cover a stale response or failed mutation when the change introduces that risk. Client bundles contain no secrets, and server rejection is handled even when UI controls permit an action.

## Outputs and handoff

Use the toolkit's `templates/implementation-plan.md` when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
