# Skill catalog

Native installation is described in [agent compatibility](agent-compatibility.md). Skills can also be read directly by any file-capable agent.

| Skill | When to use |
| --- | --- |
| [adaptive-effort](../skills/adaptive-effort/SKILL.md) | Default guidance for scaling effort to complexity, risk, and uncertainty while reducing wasted usage; measured usage reporting only. |
| [lazy-genius](../skills/lazy-genius/SKILL.md) | Optional developer persona for inventive solutions with minimal code and complexity. Invoke explicitly with `$lazy-genius`. |
| [product-definition](../skills/product-definition/SKILL.md) | Discover product goals, users, workflows, constraints, and MVP scope, then turn the agreed scope into measurable requirements and acceptance criteria. |
| [system-architecture](../skills/system-architecture/SKILL.md) | Choose and document a proportionate system architecture, stack, boundaries, and trade-offs before significant implementation. |
| [frontend-development](../skills/frontend-development/SKILL.md) | Design and implement product interfaces with visual hierarchy, responsive accessible components, state handling, and API integration. |
| [backend-data-engineering](../skills/backend-data-engineering/SKILL.md) | Design, implement, or review API and relational-data boundaries using API, data, or end-to-end modes. |
| [fullstack-development](../skills/fullstack-development/SKILL.md) | Build an approved feature across UI, API, database, tests, and documentation in small reviewable increments. |
| [security-engineering](../skills/security-engineering/SKILL.md) | Threat-model or assess authentication, authorization, data handling, browser security headers, dependencies, and API abuse when security review or risk warrants it. |
| [code-audit](../skills/code-audit/SKILL.md) | Review code correctness, architecture, maintainability, security, dependencies, and test gaps; produce evidence-backed prioritized findings. |
| [qa-testing](../skills/qa-testing/SKILL.md) | Plan and execute risk-based tests for user workflows, permissions, APIs, boundaries, regressions, and failure recovery. |
| [diagnostics](../skills/diagnostics/SKILL.md) | Diagnose correctness failures or performance bottlenecks using reproducible evidence, profiling, bounded fixes, and comparable verification. |
| [accessibility-review](../skills/accessibility-review/SKILL.md) | Review and remediate semantic HTML, keyboard behavior, focus, contrast, forms, and assistive technology support. |
| [documentation](../skills/documentation/SKILL.md) | Write or update practical software documentation grounded in actual behavior, setup, architecture, and operating evidence. |
| [release-operations](../skills/release-operations/SKILL.md) | Prepare deployment and recovery, assess an exact candidate, and execute live actions only under explicit authorization. |
| [ai-engineering](../skills/ai-engineering/SKILL.md) | Design, implement, evaluate, or operate AI features using model APIs, document retrieval, tool-using agents, or trained models. |
| [cinematic-product-video](../skills/cinematic-product-video/SKILL.md) | Plan, script, animate, edit, sound-design, preview, and render product ads, launches, demos, branded reels, motion graphics, and footage recuts using Remotion or HyperFrames; no other agent skill required. |

Each skill includes a local decision guide with primary references and task-specific verification. See the [source map](../references/skill-sources.md). For AI tasks, load only the relevant retrieval, agent, evaluation, or training reference.

## Common workflows

| Outcome | Recommended sequence |
| --- | --- |
| Plan a new product | `product-definition` → `system-architecture` → approval |
| Build a feature | `frontend-development` for interface work → `fullstack-development` → relevant frontend or backend/data specialist → `qa-testing` |
| Investigate a problem | `diagnostics` → regression testing → optional `code-audit` |
| Review a release | `code-audit` + `security-engineering` + `qa-testing` + `accessibility-review` → `release-operations` in assess mode |
| Build an AI feature | `product-definition` + `system-architecture` + `ai-engineering` + `fullstack-development` + security and QA review |
