# Agents, tools, and side effects

Read when models choose tools or plan actions. Use [the decision guide](guide.md) for primary references and the simpler workflow alternative.

## Tool contracts and authority

Define narrow tools with typed inputs, bounded outputs, stable errors, and clear consequences. Keep authenticated identity, tenant, credentials, and permission checks in trusted application code. Never accept a model-supplied role, tenant, or approval flag as authority. Scope downstream credentials to the minimum resource/action set.

For each tool, classify read-only versus mutating behavior, reversibility, external impact, and required authorization. Use existing user authorization where it applies. For a consequential action requiring confirmation, show the concrete target and effect, bind approval to those arguments, and revalidate at execution. Changed arguments or expired authority require a fresh decision.

## Execution bounds

Set a maximum number of steps, total deadline, token/cost budget, tool concurrency, and result-size limit. Detect repeated calls or lack of progress. Define stop, cancellation, partial-result, and escalation behavior. A background agent needs an owner and a way to stop it.

Make retried writes idempotent or require reconciliation after uncertain completion. Persist a minimal execution ledger when crash recovery or auditability requires it. Do not let a restart repeat already committed external effects.

## Untrusted instructions

User text, retrieved documents, websites, emails, and tool results may contain prompt injection. Enforce tool allowlists, resource permissions, URL/network restrictions where needed, output validation, and secret isolation independently of model compliance. System prompts and delimiters help express intent but cannot establish an authorization boundary.

## Worked failure and checks

An agent requests a refund, the provider commits it, and the response times out. A blind retry can refund twice. Use a provider-supported idempotency key or reconcile the original transaction before retrying. Confirm the tool checks the caller's order permission and approved refund amount on every invocation.

Test injected instructions, unauthorized IDs, malformed arguments, repeated writes, budget exhaustion, cancellation, tool failure, and timeout-after-commit. Use synthetic tools or a sandbox for evaluation; live mutations require authorization. Report actual traces with sensitive data redacted and do not equate task completion with safe execution.
