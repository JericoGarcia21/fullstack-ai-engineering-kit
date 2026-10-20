# Skill reference map

Public sources reviewed on 2026-10-19. This map supplements the host/integration review in [sources](sources.md); it does not update those older verification dates. Guidance is original and adapted proportionally. Sources are standards, official documentation, or original specialist guidance, not interchangeable certifications.

| Skill | Primary references |
| --- | --- |
| [project-discovery](../skills/project-discovery/SKILL.md) | [NN/g discovery](https://www.nngroup.com/articles/discovery-phase/) |
| [requirements-engineering](../skills/requirements-engineering/SKILL.md) | [NASA requirements validation](https://swehb.nasa.gov/spaces/7150/pages/16449673/SWE-055%2B-%2BRequirements%2BValidation) |
| [system-architecture](../skills/system-architecture/SKILL.md) | [SEI ATAM collection](https://www.sei.cmu.edu/library/architecture-tradeoff-analysis-method-collection/) |
| [frontend-design](../skills/frontend-design/SKILL.md) | [GOV.UK patterns](https://design-system.service.gov.uk/patterns/); [NN/g discovery](https://www.nngroup.com/articles/discovery-phase/) |
| [frontend-engineering](../skills/frontend-engineering/SKILL.md) | [MDN core curriculum](https://developer.mozilla.org/en-US/curriculum/core/); [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) |
| [backend-api-engineering](../skills/backend-api-engineering/SKILL.md) | [OpenAPI specification](https://spec.openapis.org/oas/); [OWASP ASVS](https://owasp.org/projects/asvs) |
| [database-engineering](../skills/database-engineering/SKILL.md) | [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html) |
| [fullstack-development](../skills/fullstack-development/SKILL.md) | [NIST SSDF](https://csrc.nist.gov/projects/ssdf); [DORA continuous delivery](https://dora.dev/capabilities/continuous-delivery/) |
| [security-engineering](../skills/security-engineering/SKILL.md) | [OWASP ASVS](https://owasp.org/projects/asvs); [NIST SSDF](https://csrc.nist.gov/projects/ssdf) |
| [code-audit](../skills/code-audit/SKILL.md) | [Google code review guidance](https://google.github.io/eng-practices/review/reviewer/); [OWASP ASVS](https://owasp.org/projects/asvs) |
| [qa-testing](../skills/qa-testing/SKILL.md) | [Playwright best practices](https://playwright.dev/docs/best-practices); [NASA requirements validation](https://swehb.nasa.gov/spaces/7150/pages/16449673/SWE-055%2B-%2BRequirements%2BValidation) |
| [debugging](../skills/debugging/SKILL.md) | [Google SRE troubleshooting](https://sre.google/sre-book/effective-troubleshooting/) |
| [accessibility-review](../skills/accessibility-review/SKILL.md) | [WCAG 2.2](https://www.w3.org/TR/WCAG22/); [MDN core curriculum](https://developer.mozilla.org/en-US/curriculum/core/) |
| [performance-optimization](../skills/performance-optimization/SKILL.md) | [Brendan Gregg USE method](https://www.brendangregg.com/usemethod.html) |
| [devops-deployment](../skills/devops-deployment/SKILL.md) | [DORA continuous delivery](https://dora.dev/capabilities/continuous-delivery/); [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/) |
| [documentation](../skills/documentation/SKILL.md) | [Diataxis](https://diataxis.fr/); [Google technical writing](https://developers.google.com/tech-writing/overview) |
| [release-readiness](../skills/release-readiness/SKILL.md) | [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/); [NIST SSDF](https://csrc.nist.gov/projects/ssdf) |
| [ai-engineering](../skills/ai-engineering/SKILL.md) | [Anthropic building effective agents](https://www.anthropic.com/engineering/building-effective-agents); [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf); [OWASP GenAI Security Project](https://genai.owasp.org/); [Google Cloud MLOps](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning) |
| [app-video-tutorials](../skills/app-video-tutorials/SKILL.md) | [Remotion rendering](https://www.remotion.dev/docs/render); [animation](https://www.remotion.dev/docs/animating-properties); [agent skills](https://www.remotion.dev/docs/ai/skills); [license](https://www.remotion.dev/docs/license); [Playwright videos](https://playwright.dev/docs/videos); [W3C accessible media](https://www.w3.org/WAI/media/av/) |

## Adaptive effort

[adaptive-effort](../skills/adaptive-effort/SKILL.md) is original toolkit guidance added on 2026-10-20. It makes no new host integration or measured savings claims. Its [decision guide](../skills/adaptive-effort/references/guide.md) defines comparison requirements and proposed behavioral checks.

## Applying the references

- Record the publication, version/status, control or section, applicability, and evidence when a project adopts a standard. Distinguish draft guidance from final publications.
- Framework, provider, and database details depend on the installed version. Follow official documentation for the chosen stack; references do not mandate a vendor.
- The OWASP GenAI project evolves. Record the exact Top 10 or agent-security publication used instead of assuming an edition remains current.
- A documentation review is not a runtime integration test, security assessment, or executed behavioral evaluation.
- Do not copy proprietary manuals or reproduce complete external guides. Link to the source and maintain concise original decision guidance locally.
