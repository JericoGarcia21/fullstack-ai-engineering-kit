---
name: frontend-development
description: "Design and implement product interfaces with purposeful visual hierarchy, responsive accessible components, state handling, and API integration. Use for frontend design, implementation, or both."
license: MIT
---

# Frontend Development

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

Deliver design, implementation, or both according to the request. Do not require a redesign for implementation-only work.

## Design workflow

1. Inspect existing screens, brand, user tasks, real content, and accessibility needs. Preserve functioning interaction patterns unless the requested outcome needs change.
   For a new interface or substantial redesign, read [reference research and visual direction](references/visual-direction.md). Use supplied references or research relevant real interfaces when browsing is available; record what was actually inspected. Establish a specific visual direction before building screens.
2. Choose layout and density from the workflow: a comparison task may need a table; a guided action may need a focused form. Establish typography, spacing, color, radius, and focus tokens.
3. Avoid arbitrary gradients, glow, excessive whitespace, oversized rounding, meaningless icons, repetitive cards, and visually uniform sections. Make contextual actions and content hierarchy explicit.
4. Specify empty, loading, validation, error, success, disabled, and permission states. Define mobile reflow, long-content behavior, keyboard order, and semantic structure.
5. Deliver a design brief or reviewable mockup with rationale and state coverage. Validate using realistic content, narrow viewports, keyboard navigation, and contrast; label unverified checks.
   Compare rendered screens with the brief and reference observations. Correct generic composition, weak hierarchy, and inconsistent details before handoff; do not claim visual verification from source code alone.

## Implementation workflow


1. Read the approved UX and API contract; inspect existing component and state conventions before adding dependencies.
2. Build a vertical user flow with semantic HTML and explicit state ownership. Keep server data, transient UI state, and derived values distinct.
3. Handle request cancellation or stale responses, pending actions, validation, retries, errors, and empty results. Do not expose secrets in client bundles or treat hidden buttons as authorization.
4. Use design tokens and reusable components where repeated behavior warrants them; preserve page-specific hierarchy and avoid unnecessary component frameworks.
5. Verify keyboard interactions, responsive content, API error paths, and the primary workflow using the project test tools. Update evidence and API/UX documentation together.


Follow existing framework conventions and documentation matching installed versions. For significant implementation or unfamiliar state/API boundaries, read [the engineering guide](references/engineering-guide.md). Test stale responses or failed mutations when the change introduces that risk; handle server rejection even when UI controls permit an action.

## Decisions and verification

Read visual-direction.md for substantial visual work. Use established interaction patterns as usability references while establishing a product-specific hierarchy, density, and visual identity.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

Before handoff: The primary action and information hierarchy remain clear with realistic long content. Form errors explain the correction and preserve useful work. Responsive, focus, contrast, and state checks identify what was visually inspected.

## Outputs and handoff

Use the toolkit's `templates/design-brief.md` for design and `templates/implementation-plan.md` for implementation when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
