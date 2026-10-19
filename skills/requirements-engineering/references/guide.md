# requirements-engineering: decision guide

## When to read

Use stable requirement IDs and explicit examples to make behavior testable. Apply traceability in proportion to risk; do not impose aerospace documentation ceremony on a small web change.

## Decisions to resolve

- Describe actor, preconditions, trigger, observable result, and failure result. Keep business rules separate from a proposed UI or implementation unless those choices are actual constraints.

- Specify permissions by action and resource scope, including ownership, tenant, lifecycle state, and privileged overrides. Clarify visibility versus permission to modify.

- Resolve boundaries: timezones, inclusive/exclusive dates, rounding, limits, repeated requests, simultaneous actions, and external failures. Define measurable nonfunctional targets with workload and environment.

- Map each requirement to acceptance cases and a verification method. When scope changes, identify affected contracts, data, tests, dependencies, and approval rather than silently revising the baseline.

## Worked scenario

REQ-BOOK-04: when two authorized members request the final slot, at most one reservation commits. The other receives a conflict and sees current availability. Map this to a concurrent integration test; a disabled button alone cannot satisfy it.

## Failure patterns

Avoid vague words such as fast, secure, or easy without a target. A Given/When/Then format does not rescue an untestable requirement.

## Completion evidence

- Every MVP requirement has an observable pass/fail condition.
- Permission-denied and recovery behavior are specified for sensitive actions.
- Open decisions and changed requirements are distinguishable from approved behavior.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Turn “staff can refund orders quickly” into requirements, permission rules, failure cases, and acceptance checks without inventing a refund policy.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [NASA requirements validation](https://swehb.nasa.gov/spaces/7150/pages/16449673/SWE-055%2B-%2BRequirements%2BValidation): Clarity, completeness, consistency, verifiability, and traceability.
