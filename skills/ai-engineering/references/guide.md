# AI engineering: decision guide

## Choose the approach

| Need | Starting approach | Evidence before adding complexity |
| --- | --- | --- |
| Exact calculation or policy enforcement | Deterministic code | A model must not replace enforceable authorization or arithmetic invariants |
| Extraction, classification, or generation | One model call with validated output | A representative baseline fails the agreed quality target |
| Answers from private or changing documents | Retrieval plus generation | Documents are available, usable, and permission-filtered; evaluation separates retrieval from generation |
| Known sequence of steps | Explicit workflow | Dynamic planning is needed often enough to justify agent failure modes |
| Variable tool selection and planning | Bounded agent | Tool permissions, stop conditions, observable success, and recovery are defined |
| Consistent learned task behavior or custom predictive model | Fine-tuning or training | Data rights, baseline comparison, held-out evaluation, and operational ownership justify training |

## Application integration

Keep provider credentials on trusted server infrastructure. Check current SDK and model documentation against the installed versions. Encapsulate provider details where useful, but avoid a speculative abstraction across providers with different behavior.

Define a total deadline, per-call timeout, retryable failures, backoff with jitter, maximum attempts, and cancellation propagation. Count retries and tool iterations against the total cost/time budget. A timeout after a tool commit must not blindly repeat the side effect. Handle throttling, model refusal, malformed output, context limits, provider outages, and interrupted streaming explicitly.

Schema-valid output can still be incorrect. Validate business rules, identifiers, units, ranges, and references before persistence or action. Escape content for its destination. Decide whether streamed output is provisional and how the UI handles a partial response that cannot be completed safely.

## Worked scenario

A tenant-aware support assistant answers from internal policy documents. Start with retrieval and a single validated response containing answer text and source IDs. The server derives the tenant and accessible document set. If supporting evidence is missing, return an explicit unsupported result or hand off to a person. Do not add an autonomous refund tool simply because the model can propose refunds.

Test answerability, citations, conflicting policies, another tenant's document ID, injected document instructions, deleted sources, and provider timeouts. Measure retrieval coverage and answer correctness separately. Set quality targets with the product owner rather than inventing a universal accuracy threshold.

## Completion and behavioral evaluation

Verify a useful baseline, permission-safe data flow, bounded failure behavior, and reproducible evaluation. Preserve failed cases and distinguish proposed controls from executed checks.

Proposed request: “Build a support assistant over tenant-private documents, with citations and escalation when evidence is missing.” Evaluate whether the solution prevents cross-tenant access, abstains appropriately, and avoids unnecessary agency. Record the actual outcome when this scenario is run; it has not been executed here.

## Primary references

Public sources reviewed 2026-10-19. These are guidance, not product certification.

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): workflows, agents, and composition trade-offs.
- [NIST Generative AI Profile, AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf): generative AI risk management.
- [OWASP GenAI Security Project](https://genai.owasp.org/): consult and record the exact security publication/version relevant to the project.
- [Google Cloud MLOps](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning): model-training lifecycle; see [training](training.md).
