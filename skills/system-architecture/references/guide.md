# system-architecture: decision guide

## When to read

Base architecture on concrete quality scenarios and operational constraints. Use ATAM concepts to reason about trade-offs; a lightweight review is not a claim to have conducted a formal ATAM evaluation.

## Decisions to resolve

- For each significant quality target, state stimulus, operating conditions, expected response, and measurable bound. Separate expected load from guesses and identify the cost of missing the target.

- Draw deployment and trust boundaries, data ownership, synchronous calls, asynchronous jobs, and external dependencies. Explain where validation, authorization, and integrity are enforced.

- Compare plausible alternatives using team skills, hosting support, consistency needs, recovery, cost, and maintenance. Introduce queues, caches, or independent services only for a concrete requirement.

- Record an architecture decision with context, choice, alternatives, consequences, and revisit trigger. Plan dependency failures, deadlines, retry/idempotency boundaries, and observability.

## Worked scenario

A small booking product requires atomic capacity enforcement and email confirmations. A modular application with a relational transaction and durable notification job may fit. Explain how a committed booking survives an email outage before proposing separate booking and notification services.

## Failure patterns

Avoid diagram-only architecture, selecting distributed services for prestige, and treating provider uptime as end-to-end application availability.

## Completion evidence

- Important requirements map to a component or enforceable boundary.
- Failure behavior and recovery ownership are explicit for critical dependencies.
- Unverified scale/cost assumptions and triggers for revisiting the design are recorded.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Choose an architecture for a two-person team building a tenant-aware booking service on a limited hosting budget; expose assumptions and trade-offs.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [SEI ATAM collection](https://www.sei.cmu.edu/library/architecture-tradeoff-analysis-method-collection/): Quality attribute scenarios and architectural trade-offs.
