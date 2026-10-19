---
name: ai-engineering
description: "Design, implement, evaluate, or operate AI features using model APIs, document retrieval, tool-using agents, or trained models. Use for AI system behavior and lifecycle work; ordinary application code without AI behavior belongs to the relevant engineering skill."
license: MIT
---

# AI Engineering

## Inputs and scope

Read project instructions, approved scope, existing architecture, data permissions, and working behavior. Identify whether the request concerns an AI application, retrieval system, agent, or model-training pipeline. Preserve the chosen provider and stack unless evidence justifies a change. Do not add AI when deterministic code meets the requirement more reliably or cheaply.

For significant work, present the proposed behavior, architecture, evaluation targets, privacy/security boundaries, costs, and feature slices before implementation unless these decisions are already approved or delegated. A bounded prompt or integration fix needs a proportional plan rather than a new project ceremony.

## Workflow

1. Define the user outcome, allowed actions, unacceptable errors, human escalation, and a deterministic baseline. Establish representative evaluation cases and measurable quality, latency, and cost targets before choosing a model or architecture.
2. Select the smallest suitable approach: deterministic code, a model call, retrieval, a fixed workflow, an agent, fine-tuning, or model training. Record why added complexity is needed and what evidence would change the choice. Verify current provider capabilities in official documentation before integration claims.
3. Define input/output schemas, data classification, tenant boundaries, provider retention/residency requirements, and secret handling. Treat prompts, retrieved content, model responses, and tool arguments as untrusted data. Enforce authorization in application code on every tool and retrieval access.
4. Implement bounded calls: deadlines, cancellation, concurrency, token/output limits, retry budgets, and documented failure behavior. Validate structured output and domain rules before use. Do not execute generated SQL, shell commands, HTML, or consequential actions without appropriate validation and authorization.
5. Evaluate task success and failure cases on versioned fixtures, including adversarial input, unsupported answers, permission boundaries, outages, and cost exhaustion. Compare with the baseline; report sample size, rubric, failures, uncertainty, and unexecuted checks.
6. Version prompts, schemas, model identifiers, retrieval settings, tool definitions, and datasets as applicable. Add privacy-aware telemetry, regression checks, rollout/rollback triggers, and an owner for quality incidents. Deployment requires authorization for the actual target.

## Read only the relevant references

- [Decision guide](references/guide.md): architecture selection, application integration, and an end-to-end example.
- [Retrieval](references/retrieval.md): document ingestion, citations, access control, freshness, and retrieval evaluation.
- [Agents and tools](references/agents.md): tool authorization, prompt injection boundaries, bounded execution, and side effects.
- [Evaluation and operations](references/evaluation.md): datasets, rubrics, regression gates, cost/latency, and production feedback.
- [Training and MLOps](references/training.md): projects that actually train or fine-tune models; skip for ordinary API integration.

## Outputs and handoff

Use the toolkit's `templates/ai-feature-plan.md` when available, or provide equivalent decisions and evidence directly. Include the selected approach, data flow and trust boundaries, versioned configuration, evaluation results, cost/latency observations, recovery behavior, and remaining risks. Do not invent benchmarks, claim prompt injection is solved by a system prompt, or report an offline test as production quality evidence.
