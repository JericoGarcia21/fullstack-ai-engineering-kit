# frontend-development engineering: decision guide

## When to read

Follow the existing framework and component conventions. Select browser and framework documentation matching the installed versions instead of assuming a particular stack.

## Decisions to resolve

- Identify the source of truth for server data, URL state, form drafts, and derived values. Avoid duplicated state that becomes inconsistent during navigation or retries.

- Model asynchronous transitions explicitly: initial load, refreshing, empty, pending mutation, validation failure, authorization failure, and retryable failure. Cancel or disregard stale responses.

- Use native controls and semantic structure before custom interactions. Associate labels and errors, preserve focus during updates, and announce meaningful asynchronous outcomes.

- Treat API responses, query parameters, and user content as untrusted. Use safe rendering and validate server-side; optimistic UI needs rollback and must not imply a server commit.

## Worked scenario

A user searches for “June” and immediately changes to “July.” If June returns last, it must not overwrite July results. After a reservation conflict, refresh availability, preserve appropriate form data, and present the server error accessibly.

## Failure patterns

Avoid effect loops, duplicated derived state, inaccessible clickable containers, and disabling the whole interface indefinitely after a failed request.

## Completion evidence

- The main flow works with keyboard input and narrow viewports.
- Tests cover a stale response or failed mutation when the change introduces that risk.
- Client bundles contain no secrets, and server rejection is handled even when UI controls permit an action.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Implement a searchable reservation list where requests can finish out of order and an update can return a conflict.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [MDN core curriculum](https://developer.mozilla.org/en-US/curriculum/core/): Web platform fundamentals and accessible implementation.
- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/): Task-focused interaction patterns; adapt to the actual product and brand.
