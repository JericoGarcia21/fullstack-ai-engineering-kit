# backend-data-engineering: decision guide

## When to read

Use this guide when an endpoint changes persistence, a database change affects callers, or authorization, concurrency, migration, or query behavior is consequential.

## Decisions to resolve

- Specify request/response schemas, field allowlists, bounds, pagination, error codes, and compatibility. Scope access by tenant, owner, role, and lifecycle state on the server.
- Write invariants before tables: uniqueness scope, ownership, transitions, capacity, precision, and retention. Enforce reliable invariants with keys and constraints.
- Select transactions, isolation, and locking from the anomaly to prevent. Define idempotency scope and replay behavior for retried commands; avoid remote side effects inside a retried transaction.
- Plan expand/backfill/contract migrations when versions overlap. Bound batches, assess locks, verify backfills, and preserve recovery before removing old data.
- Use representative query plans and data. Consider selectivity, write amplification, storage, and tenant filtering before adding indexes.

## Worked scenario

`POST /bookings` derives tenant identity from authenticated context and atomically enforces capacity. Two independent connections request the final slot; one commits and the other receives a documented conflict. A retry with the same valid idempotency key returns the existing result. The migration remains compatible with the previous application version during rollout.

## Failure patterns

Avoid client-provided tenant authority, mass assignment, application-only uniqueness, floating-point money, unbounded backfills, indiscriminate retries, and assuming any transaction prevents every race.

## Completion evidence

- Contract tests cover malformed input, authorization denial, conflict, and dependency failure.
- Cross-tenant fixtures prove identifiers cannot bypass access boundaries.
- Constraints and concurrent writers preserve the named invariant.
- Migration, backup, restore, and destructive-operation evidence is explicit.

## Behavioral evaluation

Request: “Design and review a retried booking endpoint plus a tenant-scoped uniqueness migration while old and new app versions overlap.”

Evaluate contract, authorization, concurrency, compatibility, recovery, and evidence honesty. This scenario is proposed, not an executed result.

## Primary references

Reviewed public sources on 2026-10-19. Record applicable versions.

- [OpenAPI specification](https://spec.openapis.org/oas/): HTTP contracts.
- [OWASP ASVS](https://owasp.org/projects/asvs): Application security verification requirements.
- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html): PostgreSQL-specific isolation behavior; do not assume equivalence in other engines.
