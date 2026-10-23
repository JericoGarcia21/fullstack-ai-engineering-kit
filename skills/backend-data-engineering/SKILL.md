---
name: backend-data-engineering
description: "Design, implement, or review APIs and relational data boundaries, including validation, authorization, contracts, constraints, transactions, migrations, concurrency, and query plans."
license: MIT
---

# Backend and Data Engineering

## Inputs and scope

Use API mode for endpoint and contract work, data mode for schema, migration, or query work, and end-to-end mode when a server feature crosses both. Read the actual framework and database versions. Preserve established contracts and data behavior unless an approved requirement changes them.

## Workflow

1. Define the resource, ownership, invariants, method/path or data operation, schemas, status and error behavior, authentication, authorization, compatibility, retention, and deletion rules.
2. Validate and bound inputs on the server. Scope every list, count, export, batch, nested, and background access by tenant, owner, and role. Never treat authentication as sufficient authorization.
3. Enforce invariants with appropriate types, keys, unique/check constraints, nullability, parameterized queries, explicit transactions, safe concurrency, and idempotency where repeated commands can occur.
4. Plan additive migrations, backfills, overlapping application versions, backup/restore, and rollback or forward repair. Flag destructive steps for explicit authorization. Keep remote side effects outside retried transactions or coordinate them safely.
5. Inspect representative query plans before adding indexes. Test success, malformed input, authorization denial, integrity violations, conflicts, concurrent/retried requests, migrations, and dependency failures. Keep API contracts, callers, schema documentation, and fixtures synchronized.

## Decisions and verification

Use the smallest applicable mode, but review both API and persistence boundaries when one business invariant spans them. Engine-specific locking, isolation, migration syntax, and query evidence must come from the actual database version.

Read [the decision guide](references/guide.md) for significant or unfamiliar backend/data work. Before handoff, cross-tenant fixtures cannot bypass access boundaries, concurrent writers preserve named invariants, and migrations have explicit compatibility and recovery evidence.

## Outputs and handoff

Use `templates/api-contract.md` and `templates/database-design.md` when useful. Report changed contracts and schema, exact checks executed, migration/recovery status, unresolved risks, and the next action. Do not describe proposed indexes, restore steps, or contract tests as executed evidence.

Supporting resources are local to this skill and travel with its folder.
