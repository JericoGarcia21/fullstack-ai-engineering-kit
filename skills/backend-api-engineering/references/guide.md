# backend-api-engineering: decision guide

## When to read

Define and preserve the API contract before implementation. Authentication identifies a caller; authorization must still be enforced for each requested resource and action.

## Decisions to resolve

- Specify request/response schemas, field allowlists, size bounds, pagination, error codes, and backward compatibility. Reject or deliberately handle unknown fields according to the established contract.

- Scope database access by tenant, owner, and role on the server. Apply checks to list, count, export, batch, nested, and background operations; avoid existence leaks where policy requires it.

- Keep atomic business changes within a transaction. For retryable commands, define idempotency key scope, request fingerprint, expiration, concurrent duplicate behavior, and replay result.

- Bound timeouts and retries for dependencies. Avoid remote side effects inside a retried database transaction; consider an outbox when commit and notification delivery must be coordinated.

## Worked scenario

POST /bookings receives a resource and slot, derives the tenant from authenticated context, checks membership, and atomically enforces capacity. A retry with the same valid idempotency key returns the existing result. A concurrent competing booking receives a documented conflict without leaking another member’s record.

## Failure patterns

Avoid mass assignment, trusting a client-provided tenant, global catch blocks that return success, and indiscriminate retries of non-idempotent operations.

## Completion evidence

- Contract tests exercise success, malformed input, authorization denial, conflict, and dependency failure.
- Cross-tenant fixtures prove that identifiers cannot bypass the access boundary.
- Concurrent/retried requests preserve the business invariant where applicable.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Review a batch export endpoint and a retried booking command for authorization, contract, and duplicate-effect failures.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [OpenAPI specification](https://spec.openapis.org/oas/): Machine-readable HTTP contracts; record the version supported by the project tooling.
- [OWASP ASVS](https://owasp.org/projects/asvs): Versioned application security verification requirements.
