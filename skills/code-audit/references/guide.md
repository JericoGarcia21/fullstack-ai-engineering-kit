# code-audit: decision guide

## When to read

Audit behavior in context: changed lines, callers, configuration, data assumptions, and tests. Separate confirmed defects from risks and optional maintainability suggestions.

## Decisions to resolve

- Record the revision and review scope. Follow critical input-to-output paths and inspect invariants at trust and transaction boundaries rather than reading files in isolation.

- Look for concrete trigger conditions: null or empty values, unexpected roles, retries, concurrent calls, partial failure, stale state, and incompatible schema/contract changes.

- For each finding, describe trigger, observed or reasoned failure, user impact, severity, confidence, and a precise location. Mark a static reasoning finding honestly when reproduction was unavailable.

- Use scanners and tests as supporting evidence; assess exploitability and reachable paths. Recommend the smallest sound remediation and a check that would detect recurrence.

## Worked scenario

A cancellation handler increments capacity before checking whether the booking was already canceled. Explain how a repeated request inflates availability, cite the transition and caller, and propose an atomic state transition plus a repeated-request check.

## Failure patterns

Avoid speculative vulnerability lists, style-only blockers, duplicate reports of the same root cause, and claims that no findings means no defects.

## Completion evidence

- Findings are actionable and distinguish required fixes from preferences.
- Claims about performance or exploitability have evidence or an explicit uncertainty.
- The report states review limits and checks actually executed.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Audit an order cancellation diff with a background retry caller; report only evidence-backed issues and meaningful verification gaps.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [Google code review guidance](https://google.github.io/eng-practices/review/reviewer/): Design, correctness, complexity, tests, and maintainability.
- [OWASP ASVS](https://owasp.org/projects/asvs): Versioned application security verification requirements.
