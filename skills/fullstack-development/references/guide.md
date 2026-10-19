# fullstack-development: decision guide

## When to read

Build a user-visible vertical slice with its authorization, persistence, failure behavior, and useful checks. Consult specialist skills only for the boundaries the slice actually changes.

## Decisions to resolve

- Map the acceptance scenario through UI input, API validation, resource authorization, transaction, response, and visible confirmation. Identify which layer owns each invariant.

- Sequence schema and contract changes so intermediate revisions remain compatible. Separate incomplete features using an existing feature-control mechanism when necessary.

- Implement recovery with the feature: retained form state, stable error codes, safe retries, conflict handling, and observable failures. Keep sensitive details out of user errors and logs.

- Run checks appropriate to the changed boundary, then inspect the diff for unrelated work, unused dependencies, and stale docs. Do not expand a bounded fix into a platform rewrite.

## Worked scenario

For cancellation, implement the permission rule, allowed booking states, atomic capacity release, API result, and UI confirmation together. Repeated cancellation must follow a documented policy without releasing capacity twice.

## Failure patterns

Avoid finishing UI, API, and data as separate unintegrated phases and calling them a completed feature. A green build does not establish a working user journey.

## Completion evidence

- A complete acceptance journey is demonstrable from the user entry point.
- Denied, repeated, and conflicting actions preserve server and database invariants.
- Contracts, tests, and operating notes match the resulting behavior.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Add cancellation to a working booking app while preserving its API conventions and proving capacity is released once.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [NIST SSDF](https://csrc.nist.gov/projects/ssdf): Secure development lifecycle practices; record the selected publication and status.
- [DORA continuous delivery](https://dora.dev/capabilities/continuous-delivery/): Repeatable delivery supported by testing and operational feedback.
