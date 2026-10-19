# AI evaluation and operations

Read before selecting a model, changing prompts/retrieval/tools, or preparing an AI release. See [the decision guide](guide.md) for primary references.

## Evaluation contract

Define the task, affected users, unacceptable failures, target quality, latency, cost, and human escalation. Build a versioned dataset representative of real use with permission to use the data. Include normal, difficult, unsupported, adversarial, and permission-sensitive cases. Separate development cases from held-out evaluation and avoid leakage from training or prompt examples.

Use deterministic checks for schema, identifiers, permissions, citations, and exact business rules. Use a documented human rubric for subjective quality. If using model judges, calibrate against human labels, inspect disagreements and positional bias, and record the judge model/prompt. A judge score alone is not ground truth. High-impact domains need domain-appropriate expert review.

## Comparison and regression

Run the same cases against baseline and candidate with recorded model identifiers, prompts, parameters, retrieval/index versions, and tool versions. Repeat nondeterministic cases when needed, and report sample size, variability, category-level results, failure examples, and uncertainty. Do not invent universal pass thresholds or conceal rare severe failures inside an average score.

Evaluate outages, throttling, malformed responses, context limits, cross-tenant access, prompt injection, unavailable sources, and repeated side effects. Define release blockers separately from quality preferences. Tests using mocks establish adapter behavior, not real-model task quality.

## Production feedback

Track end-to-end and tail latency, task outcome, refusals/abstentions, validation failures, tool failures, token usage, retries, and cost per completed task. Estimate monthly cost from stated traffic and measured usage; label assumptions. Enforce quotas and budget alerts rather than relying on an estimate.

Use redacted traces with bounded retention and controlled access. Avoid collecting raw sensitive prompts by default. Capture user feedback with appropriate consent, monitor drift and corpus freshness, and add representative failures to regression cases without contaminating the held-out set.

Define rollout/rollback signals and a known compatible prompt/model/index configuration. Offline success does not establish production quality. Report checks not executed because provider access, datasets, or tools were unavailable; give the exact next verification step.
