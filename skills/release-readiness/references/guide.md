# release-readiness: decision guide

## When to read

Assess an exact candidate and target environment. A go recommendation reports evidence and residual risk; it does not authorize deployment or establish that untested controls passed.

## Decisions to resolve

- Reconcile accepted requirements, changed paths, dependencies, migrations, configuration, and known issues with the release scope. Evidence from an older candidate needs an explicit applicability assessment.

- For each required gate, record PASS, FAIL, or NOT VERIFIED, evidence, environment, date, and owner. Record non-applicability with a concrete rationale rather than silently omitting it.

- Check rollback feasibility, restore evidence, monitoring, support ownership, and irreversible effects. Define rollout signals and stop thresholds appropriate to the release.

- Produce go/no-go with blockers and residual risks. Only an authorized decision-maker can accept a material exception; record its scope, rationale, owner, expiry, and remediation.

## Worked scenario

All unit tests pass, but a migration removes a column still used by the previous application version. Record a rollback incompatibility and no-go until rollout/recovery is resolved or an authorized owner explicitly accepts a documented alternative. A database backup alone does not demonstrate restore readiness.

## Failure patterns

Avoid stale test evidence, blanket checklist passes, treating missing evidence as low risk automatically, and granting exceptions on the user’s behalf.

## Completion evidence

- Every required gate has current evidence or a visible gap.
- Release and recovery plans refer to the same artifact, schema, and target environment.
- Recommendation, exception acceptance, and deployment authorization remain distinguishable.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Assess a release with green unit tests, an untested restore, and an incompatible rollback migration; give evidence-based next actions.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/): Gradual rollout, comparison signals, and rollback decisions.
- [NIST SSDF](https://csrc.nist.gov/projects/ssdf): Secure development lifecycle practices; record the selected publication and status.
