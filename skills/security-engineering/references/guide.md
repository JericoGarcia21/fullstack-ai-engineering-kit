# security-engineering: decision guide

## When to read

Select controls from a named ASVS version and the actual threat model. Use authorized fixtures and minimize side effects; a standards reference is not a compliance or certification claim.

## Decisions to resolve

- Map assets, actors, entry points, trust boundaries, data classifications, and abuse outcomes. Prioritize controls by plausible impact and exposure rather than checklist size.

- Trace identity through sessions/tokens and resource access. Inspect tenant boundaries, privileged roles, account recovery, revocation, and sensitive operations; client visibility is not enforcement.

- Check context-specific injection and output handling, uploads, outbound requests, secret management, dependencies, retention, and log redaction. Evaluate CSRF for cookie-authenticated state changes.

- Classify each finding as reproduced, suspected, or unverified. Pair impact and confidence with a minimal sanitized reproduction, remediation, and retest; do not copy tokens or personal data into reports.

## Worked scenario

A user changes an export job ID and receives another tenant’s download. Demonstrate with two synthetic tenants, trace authorization at job creation and download, and retest both paths after remediation. An unguessable ID or a signed URL alone does not establish correct issuance.

## Failure patterns

Avoid equating CORS with authorization, scanner findings with confirmed exploitability, or passing dependency scans with a secure application.

## Completion evidence

- Each high-risk trust boundary has a control and a verification method.
- Findings cite affected paths and reproducible evidence without exposing sensitive data.
- Unverified controls, residual risks, and remediation owners remain visible.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Assess a tenant-aware report export flow with asynchronous generation and signed downloads using only synthetic fixtures.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [OWASP ASVS](https://owasp.org/projects/asvs): Versioned application security verification requirements.
- [NIST SSDF](https://csrc.nist.gov/projects/ssdf): Secure development lifecycle practices; record the selected publication and status.
