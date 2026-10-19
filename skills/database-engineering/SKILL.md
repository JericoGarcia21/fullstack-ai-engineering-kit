---
name: database-engineering
description: "Design or change relational data models, integrity constraints, migrations, transaction behavior, and query plans."
license: MIT
---

# Database Engineering

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

## Workflow

1. Model entities, relationships, ownership, retention, deletion, and sensitive fields from workflows rather than screens.
2. Choose types, primary and foreign keys, unique/check constraints, and nullability to enforce invariants. Document timezone and money precision choices.
3. Design transactions and concurrency controls for competing writes. Select isolation or locking behavior using the target database capabilities.
4. Plan additive migrations, backfill, compatibility between application versions, backup/restore, and rollback or forward repair. Flag destructive steps for explicit authorization.
5. Inspect representative query plans and workload before adding indexes. Test integrity violations, migration behavior, and restore procedures where feasible; distinguish proposed indexes from measured improvement.

## Decisions and verification

Use the actual database engine/version documentation for constraints, locking, migration syntax, and isolation. PostgreSQL examples do not establish equivalent behavior in MySQL or SQLite.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

Before handoff: Constraint violations and concurrent writers cannot break the named invariant. Migrations are exercised on representative fixtures with application compatibility considered. Backup, restore, and destructive-operation evidence is explicit; a proposed procedure is not a rehearsed restore.

## Outputs and handoff

Use the toolkit's `templates/database-design.md` when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
