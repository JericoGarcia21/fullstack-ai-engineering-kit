# product-definition: decision guide

## When to read

Use this guide when product evidence is incomplete, requirements are consequential, or scope changes need traceability. Discovery decides what outcome belongs in scope; requirements make that outcome testable.

## Decisions to resolve

- Identify actors, task triggers, current workarounds, frequency, failure consequences, and success measures. Distinguish buyers, operators, administrators, and end users when their needs differ.
- Keep an evidence ledger with source/date, observation, interpretation, confidence, and unanswered question. A stakeholder preference is not automatically evidence of user behavior.
- Define actor, preconditions, trigger, observable result, and failure result. Keep business rules separate from proposed UI or implementation unless those choices are actual constraints.
- Specify permissions by action, resource scope, ownership, tenant, lifecycle state, and privileged override. Resolve boundaries such as timezones, rounding, limits, repeated requests, simultaneous actions, and external failures.
- Map requirements to acceptance cases and verification methods. When scope changes, identify affected contracts, data, tests, dependencies, and approval rather than silently revising the baseline.

## Worked scenario

A club asks for a booking app because spreadsheet conflicts are common. Confirm whether members reserve directly or staff approve. Define an MVP around reliable reservation and cancellation rather than an assumed dashboard. A concurrency requirement might state that when two authorized members request the final slot, at most one reservation commits and the other receives a documented conflict. Map it to a concurrent integration test.

## Failure patterns

Avoid solution-led discovery, invented personas, treating requested features as validated needs, vague requirements, and promising dates before constraints are known. Given/When/Then syntax does not rescue an untestable rule.

## Completion evidence

- Confirmed needs, proposals, assumptions, and exclusions are distinguishable.
- Every MVP requirement has an observable pass/fail condition.
- Sensitive actions specify permission-denied and recovery behavior.
- Blocking questions name the decision they affect; nonblocking gaps state an assumption.

## Behavioral evaluation

Request: “A small clinic wants an appointment app but has only described its spreadsheet. Produce a scoped brief, requirements, permission rules, failure cases, and acceptance checks without inventing policy.”

Evaluate whether the result resolves material definition decisions, preserves scope and authorization, and reports evidence honestly. This scenario is proposed, not an executed result.

## Primary references

Reviewed public sources on 2026-10-19. Record the exact version or publication used when applying a standard.

- [NN/g discovery](https://www.nngroup.com/articles/discovery-phase/): Problem framing, research questions, and evidence before solutions.
- [NASA requirements validation](https://swehb.nasa.gov/spaces/7150/pages/16449673/SWE-055%2B-%2BRequirements%2BValidation): Clarity, completeness, consistency, verifiability, and traceability.
