---
name: release-readiness
description: "Assess a candidate release using acceptance, security, QA, accessibility, operational, and rollback evidence before deployment."
license: MIT
---

# Release Readiness

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

## Workflow

1. Identify exact candidate revision, target environment, release scope, owners, and approved exceptions. Reconcile requirements with completed and excluded work.
2. Collect test results, audit findings, security checks, accessibility evidence, configuration validation, migration/restore rehearsal, rollback, and monitoring readiness proportionally to risk.
3. Assign each applicable gate PASS, FAIL, or NOT VERIFIED with evidence, timestamp, and owner. Record non-applicability with rationale separately; do not treat unknown as pass.
4. Block recommendation for unmet required criteria or unaccepted material risks. Record exception owner, rationale, expiry, and remediation; do not grant exceptions on the user behalf.
5. Produce a go/no-go recommendation with residual risk and precise next actions. Readiness approval is distinct from authorization to deploy; do not mutate live systems without authorization.

## Decisions and verification

Assess an exact candidate and target environment. A go recommendation reports evidence and residual risk; it does not authorize deployment or establish that untested controls passed.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

Before handoff: Every required gate has current evidence or a visible gap. Release and recovery plans refer to the same artifact, schema, and target environment. Recommendation, exception acceptance, and deployment authorization remain distinguishable.

## Outputs and handoff

Use the toolkit's `templates/release-readiness.md` when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
