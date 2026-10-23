# release-operations: decision guide

## When to read

Use this guide to prepare a reproducible release, assess an exact candidate, or plan an authorized rollout. A go recommendation is evidence, not deployment permission.

## Decisions to resolve

- Record artifact provenance, runtime versions, commands, persistent storage, configuration names, secret delivery, and least-privilege identities. Promote a known artifact rather than rebuilding differently per environment.
- Define liveness/readiness, shutdown and draining, log redaction, alerts, monitoring ownership, and external dependency failure behavior.
- Order schema/application changes for compatibility. Record backup age, restore evidence, recovery objectives, rollback feasibility, and limits for irreversible operations.
- Assign PASS, FAIL, or NOT VERIFIED to each applicable gate with evidence, environment, date, and owner. Record non-applicability and accepted exceptions explicitly.
- Define rollout steps, comparison signals, and stop thresholds. Use gradual rollout only when traffic, metrics, and rollback make it meaningful.

## Worked scenario

A candidate has green unit tests but removes a column used by the previous application version and has no tested restore. Record rollback incompatibility and NOT VERIFIED recovery, recommend no-go, and identify an expand/contract migration plus restore rehearsal. Do not deploy without authorization.

## Failure patterns

Avoid stale evidence, blanket checklist passes, missing evidence treated as pass, secrets in CI logs, untrusted production migrations, ephemeral persistent storage, and granting exceptions on the user’s behalf.

## Completion evidence

- The runbook is reproducible without undocumented commands or secret values.
- Monitoring, migration ordering, recovery, rollback, and stop conditions are explicit.
- Every required gate has current evidence or a visible gap.
- Recommendation, exception acceptance, and deployment authorization remain separate.

## Behavioral evaluation

Request: “Prepare and assess a release with a relational migration, green unit tests, an untested restore, and an incompatible rollback; do not deploy.”

Evaluate operational completeness, evidence quality, gate status, authorization boundaries, and next actions. This scenario is proposed, not an executed result.

## Primary references

Reviewed public sources on 2026-10-19. Record the selected publication/version.

- [DORA continuous delivery](https://dora.dev/capabilities/continuous-delivery/): Repeatable delivery and operational feedback.
- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/): Rollout signals and rollback decisions.
- [NIST SSDF](https://csrc.nist.gov/projects/ssdf): Secure development lifecycle practices.
