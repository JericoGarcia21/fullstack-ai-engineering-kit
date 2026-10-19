# devops-deployment: decision guide

## When to read

Prepare a reproducible runbook for the actual hosting platform. Readiness work may proceed locally; production deployment, live migrations, DNS, and infrastructure changes require existing authorization for that scope.

## Decisions to resolve

- Document artifact provenance, runtime versions, build/start commands, persistent storage, configuration names, secret delivery, and least-privilege identities. Promote a known artifact rather than rebuilding differently per environment.

- Separate liveness from readiness where the platform supports it. Define graceful shutdown, request/job draining, timeouts, log redaction, and actionable alerts with an owner.

- Order schema and application changes for compatibility. State backup age, restore procedure, expected recovery time/data loss, and recovery limits for irreversible operations.

- Define rollout steps and stop conditions using error rate, latency, and business outcomes. Use a canary only when traffic, metrics, and rollback mechanisms make its result meaningful.

## Worked scenario

Release a schema-compatible booking change to staging using the intended artifact. Exercise reservation creation and cancellation, simulate the notification dependency being unavailable, and rehearse application rollback. Explain why reverting code cannot undo a destructive data migration.

## Failure patterns

Avoid ephemeral storage for persistent data, secrets in CI logs, production migrations in untrusted PR jobs, and rollbacks that assume data compatibility without checking.

## Completion evidence

- An operator can execute the runbook without undocumented commands or secret values.
- Monitoring, migration ordering, and rollback triggers are explicit.
- Executed rehearsals are distinguishable from proposed procedures and live authorization.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Prepare a deployment and recovery runbook for a web app with a relational database and a background worker on a constrained hosting platform.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [DORA continuous delivery](https://dora.dev/capabilities/continuous-delivery/): Repeatable delivery supported by testing and operational feedback.
- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/): Gradual rollout, comparison signals, and rollback decisions.
