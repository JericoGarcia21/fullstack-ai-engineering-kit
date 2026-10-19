# database-engineering: decision guide

## When to read

Use the actual database engine/version documentation for constraints, locking, migration syntax, and isolation. PostgreSQL examples do not establish equivalent behavior in MySQL or SQLite.

## Decisions to resolve

- Write invariants before tables: uniqueness scope, ownership, allowed state transitions, capacity, money precision, and deletion/retention rules. Enforce what can be expressed reliably with keys and constraints.

- Choose transaction boundaries and isolation from the anomaly to prevent. Explain locking order, contention, deadlock handling, and whole-transaction retry behavior for serialization failures.

- Plan expand/backfill/contract migrations when application versions overlap. Bound batches, estimate lock duration, verify backfills, and preserve recovery options before removing old columns.

- Use representative data and query plans to evaluate indexes. Consider selectivity, write amplification, storage, and tenant-scoped access. EXPLAIN ANALYZE can execute writes; use safe fixtures or an authorized environment.

## Worked scenario

A SELECT followed by INSERT can oversubscribe the final slot under concurrent requests. Select a database-enforced invariant or a correctly locked transactional capacity update, and test with two independent connections. Define the losing request’s result and transaction retry policy.

## Failure patterns

Avoid application-only uniqueness, floating-point money, timezone assumptions, unbounded backfills, and assuming that wrapping statements in any transaction prevents every race.

## Completion evidence

- Constraint violations and concurrent writers cannot break the named invariant.
- Migrations are exercised on representative fixtures with application compatibility considered.
- Backup, restore, and destructive-operation evidence is explicit; a proposed procedure is not a rehearsed restore.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Design a migration that adds tenant-scoped uniqueness to existing potentially duplicated data while old and new app versions overlap.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html): Isolation anomalies and concurrency guarantees specific to PostgreSQL.
