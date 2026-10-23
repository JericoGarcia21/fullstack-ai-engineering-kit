# HTTP security headers

## Scope

Use this reference for browser-facing HTTP responses. Determine whether headers are controlled by the application, web server, reverse proxy, CDN, or hosting platform. Inspect the effective response instead of relying only on source configuration.

Do not apply one policy blindly to HTML pages, APIs, static assets, downloads, redirects, and embedded resources. Select controls from actual threats and compatibility needs.

## Framing policy

Deny all framing unless the product explicitly requires embedding:

```http
Content-Security-Policy: frame-ancestors 'none'
X-Frame-Options: DENY
```

`frame-ancestors` is the primary modern control. `X-Frame-Options: DENY` is a legacy fallback. Supporting browsers enforce `frame-ancestors` and ignore X-Frame-Options when both are present.

Do not use `ALLOW-FROM`; modern browsers do not support it consistently. If legitimate embedding is approved, replace `'none'` with the smallest explicit origin allowlist. Do not use `*`.

The `frame-ancestors` directive must be delivered through an HTTP response header. It does not work from a CSP `<meta>` element.

Do not confuse these directives:

- `frame-ancestors` controls who may embed this website.
- `frame-src` controls which framed content this website may load.

## Content Security Policy

Inventory actual scripts, styles, fonts, images, connections, workers, frames, forms, and third-party services before writing the policy.

Start with `Content-Security-Policy-Report-Only` when immediate enforcement could break important workflows. Report-only mode observes violations but does not protect users.

Prefer nonces, hashes, or external scripts over allowing `'unsafe-inline'`. Avoid `'unsafe-eval'` unless a demonstrated dependency requires it and the residual risk is accepted.

Consider these restrictive directives when compatible:

```text
default-src 'self'
base-uri 'self'
object-src 'none'
frame-ancestors 'none'
form-action 'self'
```

Add resource-specific sources only when required by verified application behavior. Treat CSP reports as untrusted input, rate-limit collection, and avoid retaining sensitive URLs or user information unnecessarily.

## Other headers

Evaluate these according to the application and hosting environment:

- `Strict-Transport-Security`: enable only after HTTPS and certificate handling are reliable. Confirm subdomain readiness before `includeSubDomains`; preloading has long-lived consequences.
- `X-Content-Type-Options: nosniff`: prevent MIME-type guessing.
- `Referrer-Policy`: choose the strictest policy compatible with required referrals and analytics.
- `Permissions-Policy`: disable unnecessary browser capabilities while checking current browser support.
- `Cross-Origin-Opener-Policy`, `Cross-Origin-Embedder-Policy`, and `Cross-Origin-Resource-Policy`: use only after checking popup, authentication, embedded-content, worker, and third-party-resource requirements.
- Sensitive responses: review appropriate `Cache-Control` behavior separately.

Do not recommend obsolete headers as protection. In particular, do not treat `X-XSS-Protection`, HPKP, or `Expect-CT` as modern substitutes for CSP, safe output handling, certificate operations, or current browser controls.

## Implementation

1. Identify every configuration layer that can add or replace headers.
2. Define a route/resource policy matrix.
3. Check for duplicated or contradictory header values.
4. Implement the policy at the narrowest reliable shared layer.
5. Exercise authentication, payments, uploads, downloads, embeds, analytics, workers, and third-party integrations that may be affected.
6. Inspect actual responses and browser console or reporting output.
7. Move CSP from report-only to enforcement only after important violations are understood and resolved.

## Verification

Record the URL and response type, environment and revision, effective response headers, browser/version when relevant, CSP violations, enforcement state, workflows exercised, configuration owner, and PASS, FAIL, or NOT VERIFIED status. Include remaining exceptions, an owner, and retest conditions.

A scanner score or header-presence check does not prove that the policy is safe, effective, or compatible with the application.

## Completion evidence

- Browser-rendered application pages cannot be framed when embedding is not an approved requirement.
- CSP enforcement matches verified resource and integration requirements.
- Important workflows continue working under the enforced policy.
- HSTS scope matches actual HTTPS and subdomain readiness.
- Effective responses contain no unexplained duplicate or conflicting policies.
- Report-only observations remain distinguishable from enforced protection.

## Primary references

Reviewed public sources on 2026-10-23. Record the current specification or browser guidance used for a project because header support and recommendations can change.

- [Content Security Policy Level 3](https://www.w3.org/TR/CSP/): CSP processing, delivery, and `frame-ancestors` behavior.
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP): CSP design and deployment guidance.
- [MDN clickjacking defenses](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Clickjacking): `frame-ancestors` and X-Frame-Options interaction.
- [OWASP Secure Headers Project](https://secure-headers-project.owasp.org/): Header lifecycle, applicability, and defensive guidance.
