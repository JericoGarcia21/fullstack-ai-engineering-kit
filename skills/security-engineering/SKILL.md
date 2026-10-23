---
name: security-engineering
description: "Threat-model or assess authentication, authorization, data handling, browser security headers, dependencies, and API abuse when security review or risk warrants it."
license: MIT
---

# Security Engineering

## Inputs and scope

Use for the task described above. Read relevant project instructions, existing artifacts, and user constraints. Scale the work to the change and risk; a small fix does not need a full project ceremony. Preserve existing authorization and behavior.

## Workflow

1. Identify assets, actors, entry points, trust boundaries, sensitive data flows, and plausible abuse. Select an ASVS version and risk-based verification scope; do not claim certification.
2. Review authentication, resource authorization, sessions, secrets, validation, uploads, dependencies, data exposure, and browser-facing HTTP security headers. Check BOLA/IDOR, injection, XSS, CSRF for cookie-authenticated state changes, CORS, password hashing, framing/clickjacking protection, and error disclosure as relevant.
3. Use least privilege and secure defaults. Evaluate rate limits and resource exhaustion, retention, deletion, and environment separation. Never hardcode credentials or copy live secrets into evidence.
4. Test only within authorized scope using safe fixtures. Distinguish reproduced vulnerabilities, suspected risks, and controls not verified. Cite evidence and affected paths without exposing sensitive data.
5. Deliver a threat model and actionable findings with severity, confidence, impact, remediation, owner, and retest criteria. A checklist is evidence organization, not proof of security.

## Decisions and verification

Select controls from a named ASVS version and the actual threat model. Use authorized fixtures and minimize side effects; a standards reference is not a compliance or certification claim.

Read [the decision guide](references/guide.md) when the task involves unfamiliar boundaries, significant implementation, or a detailed review. It contains failure cases, a worked scenario, completion checks, and primary references. For a small familiar change, apply only the relevant checks.

For browser-facing applications, read [HTTP security headers](references/http-security-headers.md) when reviewing or configuring CSP, framing protection, HSTS, MIME sniffing, referrer behavior, browser permissions, or cross-origin isolation.

Before handoff: Each high-risk trust boundary has a control and a verification method. Findings cite affected paths and reproducible evidence without exposing sensitive data. Unverified controls, residual risks, and remediation owners remain visible.

## Outputs and handoff

Use the toolkit's `templates/threat-model.md` when available, or create the equivalent artifact directly from the workflow. Report decisions, evidence, unresolved questions, and the next required action. Never invent command execution or approval.

Supporting resources are local to this skill and travel with its folder.
