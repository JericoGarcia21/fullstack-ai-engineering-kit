# frontend-development design: decision guide

## When to read

Read visual-direction.md for substantial visual work. Use established interaction patterns as usability references while establishing a product-specific hierarchy, density, and visual identity.

## Decisions to resolve

- Start from the primary task, content priority, and user context. Choose forms, tables, navigation, or progressive disclosure from what users need to accomplish.

- Define typography, spacing, color roles, focus treatment, and component states. Explain any departures from the existing design system; avoid copying a reference brand wholesale.

- Specify error placement, retained input, destructive-action consequences, permission states, long labels, localization, empty results, and narrow-screen behavior.

- Review a representative screen with realistic content and at least one difficult state. Record observed usability issues separately from aesthetic preferences and untested assumptions.

## Worked scenario

For a reservation console, make date, resource, availability, and the next action easy to scan. Show the conflict and preserve selections if a slot is taken during submission. A calendar may suit temporal comparison; a list may be better for narrow-screen selection.

## Failure patterns

Avoid attractive happy-path mockups that omit real content, error recovery, navigation, or keyboard interaction. A design-system component does not guarantee accessibility after customization.

## Completion evidence

- The primary action and information hierarchy remain clear with realistic long content.
- Form errors explain the correction and preserve useful work.
- Responsive, focus, contrast, and state checks identify what was visually inspected.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Design a staff booking screen with dense reservations, a cancellation action, narrow-screen use, and a server conflict state.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/): Task-focused interaction patterns; adapt to the actual product and brand.
- [NN/g discovery](https://www.nngroup.com/articles/discovery-phase/): Problem framing, research questions, and evidence before solutions.
