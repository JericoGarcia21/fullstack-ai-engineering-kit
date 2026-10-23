---
name: release-operations
description: "Prepare deployment and recovery operations, assess an exact release candidate against evidence-based gates, and execute live release actions only when explicitly authorized."
license: MIT
---

# Release Operations

## Inputs and scope

Use prepare mode for CI, configuration, migration, backup, rollback, monitoring, and runbooks. Use assess mode for PASS/FAIL/NOT VERIFIED release gates and go/no-go recommendations. Use deploy mode only when the user has authorized the exact target and live actions. Readiness approval does not itself authorize deployment.

## Workflow

1. Identify exact candidate revision/artifact, target environment, release scope, owners, requirements, approved exceptions, runtime, hosting, data, availability, and budget constraints.
2. Document reproducible build/start commands, artifact provenance, configuration names without secret values, secret delivery, TLS, health/readiness, graceful shutdown, logging/redaction, alerts, and least-privilege CI/environment separation.
3. Plan application and migration ordering, compatibility, backup/restore verification, rollback or forward repair, rollout signals, stop thresholds, and irreversible effects. Rehearse in an isolated environment when available.
4. Collect current acceptance, test, audit, security, accessibility, performance, configuration, migration, restore, rollback, and monitoring evidence proportionally to risk. Assign applicable gates PASS, FAIL, or NOT VERIFIED with evidence, date, environment, and owner.
5. Produce the runbook and go/no-go recommendation with residual risks and precise next actions. Record exceptions with accountable owner, rationale, expiry, and remediation. Stop before live deployment, migration, DNS, or infrastructure mutation unless that exact scope is authorized.

## Decisions and verification

Read [the decision guide](references/guide.md) for material releases or unfamiliar platforms. Preparation, assessment, exception acceptance, and deployment authorization must remain distinguishable even when one skill handles them.

For browser-facing releases, verify applicable security headers from the target environment's effective responses. Confirm that framing restrictions and enforced CSP match the approved policy. Source configuration and report-only observations are not enforcement evidence.

Before handoff, an operator can execute the runbook without undocumented commands or secrets; every required gate has evidence or a visible gap; and release and recovery plans refer to the same artifact, schema, and environment.

## Outputs and handoff

Use `templates/deployment-checklist.md`, `templates/release-readiness.md`, and `checklists/release-readiness.md` as applicable. Report actual rehearsals separately from proposed procedures. Do not grant exceptions or infer permission to mutate live systems.

Supporting resources are local to this skill and travel with its folder.
