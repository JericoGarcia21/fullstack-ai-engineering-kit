# qa-testing: decision guide

## When to read

Choose tests by failure risk and observable behavior. Use the existing runner; Playwright guidance applies to browser testing and does not mandate Playwright for every project.

## Decisions to resolve

- Map requirements to the cheapest layer that detects the risk: pure logic, database/API integration, contract, or end-to-end. Reserve broad browser journeys for critical integration behavior.

- Build deterministic fixtures with isolated users/tenants, explicit time, cleanup, and controlled dependencies. Exercise empty, boundary, invalid, denied, concurrent, and partial-failure cases when relevant.

- Use accessible locators and condition-based waits. Keep test order independent; capture traces or logs for diagnosis without storing credentials or personal data.

- Investigate flakes rather than increasing retries indefinitely. Distinguish product defects, environment failures, and test defects; quarantine only with an owner and resolution plan.

## Worked scenario

Capacity tests use two independent transactions competing for one slot and assert exactly one committed booking. A browser test confirms that the loser sees a useful conflict and current availability. Repeating the same click sequentially does not test the concurrency invariant.

## Failure patterns

Avoid equating line coverage with correctness, mocking away the boundary being verified, or treating a retried flaky run as unexplained proof of reliability.

## Completion evidence

- Critical acceptance criteria and permission boundaries have meaningful coverage.
- Tests fail for the intended defect and avoid depending on arbitrary timing or execution order.
- The report records command, environment, actual outcome, artifacts, and unchecked risks.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Plan and execute risk-based checks for a reservation feature with capacity conflicts, two tenants, and a failing email provider.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [Playwright best practices](https://playwright.dev/docs/best-practices): Isolated tests, user-visible behavior, and resilient locators.
- [NASA requirements validation](https://swehb.nasa.gov/spaces/7150/pages/16449673/SWE-055%2B-%2BRequirements%2BValidation): Clarity, completeness, consistency, verifiability, and traceability.
