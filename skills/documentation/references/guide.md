# documentation: decision guide

## When to read

Choose the document type from the reader’s task. Keep tutorials, task instructions, reference, and explanation distinct enough to be useful without forcing four documents for a small change.

## Decisions to resolve

- Identify audience, prerequisites, supported versions, and desired outcome. Inspect actual commands, configuration, contracts, and behavior before writing.

- For how-to instructions, include starting state, commands, observable success, and common recovery. Mark destructive steps and use placeholders for secret values without suggesting they are real credentials.

- For reference, document exact options, schemas, defaults, and errors. For explanation, record rationale, alternatives, and limits rather than duplicating procedural steps.

- Run safe examples in an isolated environment where possible. Verify links and distinguish executed examples, illustrative output, and unavailable checks; record version-sensitive assumptions.

## Worked scenario

A deployment guide names required environment variables without values, gives the real build/start commands, explains the health check, and describes a failed migration response. It does not claim a restore was rehearsed just because the restore command is documented.

## Failure patterns

Avoid mixing conceptual introductions into emergency runbooks, copying outdated CLI output, unexplained placeholders, and documenting imagined behavior.

## Completion evidence

- A reader can identify prerequisites and the expected result.
- Examples match the implementation and use consistent names and versions.
- Links, executed commands, and known documentation gaps are recorded honestly.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Write a contributor setup guide from an existing repository and mark every command you could not execute.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [Diataxis](https://diataxis.fr/): Separate tutorials, how-to guides, reference, and explanation.
- [Google technical writing](https://developers.google.com/tech-writing/overview): Audience-aware, clear technical explanation.
