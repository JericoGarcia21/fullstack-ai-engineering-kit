# debugging: decision guide

## When to read

First separate user impact and urgent mitigation from root-cause diagnosis. Preserve evidence and work within authorized environments; a plausible explanation is not yet a verified cause.

## Decisions to resolve

- Record expected/observed behavior, first known occurrence, revision, environment, input, and frequency. Compare a working case with a failing case to narrow the search.

- Write hypotheses with a prediction and a safe experiment that distinguishes them. Inspect logs, traces, state, and recent changes; prefer observation before speculative mutation.

- Reduce the failure to a minimal case without removing the condition that causes it. Check time, ordering, concurrency, caching, permissions, and external failures when observations point there.

- Confirm the causal mechanism, make a bounded fix, and rerun the reproduction plus adjacent risky cases. Document temporary mitigation separately and remove diagnostic code that is no longer needed.

## Worked scenario

A reservation appears twice only after network timeouts. Compare request IDs and commits to distinguish duplicate UI rendering from repeated server writes. If retries caused two commits, correct idempotency at the server and verify a timeout-after-commit retry.

## Failure patterns

Avoid changing several variables at once, swallowing errors, flushing production data without authorization, and using unbounded retries to conceal a fault.

## Completion evidence

- Evidence explains why the defect occurs and why the change addresses it.
- The original reproduction and relevant recovery cases are verified or explicitly unavailable.
- Remaining uncertainty and any temporary mitigation have clear follow-up.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Diagnose intermittent duplicate orders following a payment-provider timeout using sanitized logs and a local stub.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [Google SRE troubleshooting](https://sre.google/sre-book/effective-troubleshooting/): Hypothesis-driven diagnosis and evidence collection.
