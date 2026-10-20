---
name: adaptive-effort
description: "Adapt response depth, context gathering, tool use, and verification to task complexity and risk while reducing wasted usage. Use as default working guidance or for requests to optimize agent effort."
license: MIT
---

# Adaptive effort

Use the least effort that reliably completes the user's task. Optimize for complete, correct results and total work, including retries and rework. Brevity alone is not success. Follow user preferences, project instructions, and host requirements.

- Assess complexity, uncertainty, consequences of error, and reversibility automatically. A short request can hide substantial risk. Ask only about material missing information or required authorization.
- For simple tasks, answer or act directly with focused context and proportionate verification. For bounded changes, inspect relevant behavior and dependencies and run targeted checks. For complex or consequential work, deepen investigation, planning, and verification around the actual risks.
- Increase effort when evidence conflicts, tests fail, dependencies are unclear, or security, permissions, money, or data integrity are involved. Use failures to revise the next step; do not repeat attempts without new evidence. Explain blockers rather than guessing or silently abandoning work.
- Start with focused searches and relevant file sections. Load only needed skills and references; expand context when dependencies or uncertainty justify it. Reuse current findings, batch independent reads when supported, and bound noisy output without hiding useful failures. Avoid rereading unchanged material or repeating successful checks without a reason.
- Prefer existing capabilities and the simplest maintainable solution satisfying acceptance criteria. Avoid speculative dependencies, unrelated cleanup, unnecessary delegation, and elaborate plans for routine work. Change models or reasoning settings only when the host exposes that control and authorization allows it; never claim a setting changed when it did not.
- Lead responses with the result. Include essential explanation, complete requested artifacts, actual verification, and material limitations. Remove repetition and filler; provide detail when needed. Do not omit requested content or mandatory checks for an arbitrary token target.
- Stop when the task and required checks are complete. Required approvals, safety controls, accessibility, authorization, and data integrity remain in force at every effort level.

## Usage reporting

Use host-provided token, cost, or credit metrics only when accessible; label their source, scope, and whether final or partial. Update at normal progress boundaries when new measurements arrive, rather than polling or emitting a usage line for every small action. A skill does not create live telemetry or control billing.

Claim savings only against an explicit comparable baseline with matching task quality, model/pricing basis, and metric scope. Label estimates and assumptions; do not infer exact tokens from character counts, tool calls, or shorter answers. If asked for usage without telemetry, say it is unavailable. Never fabricate percentages or promise equal quality on every task. Avoid routine metric disclaimers when no report was requested.

Read [the decision guide](references/guide.md) when effort selection or measurement needs closer assessment.
