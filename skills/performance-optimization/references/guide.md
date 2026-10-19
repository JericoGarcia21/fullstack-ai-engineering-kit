# performance-optimization: decision guide

## When to read

Define the symptom and a reproducible workload before changing code. The USE method supports resource diagnosis; use browser, application, or database profilers for the relevant critical path.

## Decisions to resolve

- Record baseline revision, hardware/runtime, data volume, concurrency, cache state, sample count, latency distribution, throughput, and error rate as relevant. State the user-facing target.

- Trace time through client rendering, network, server work, database, queues, and external calls. Examine utilization, saturation, and errors; low CPU does not exclude I/O or lock contention.

- Choose an intervention supported by the bottleneck. For caches, define key scope, tenant isolation, invalidation, TTL, stale behavior, and memory bounds; for indexes, consider write cost.

- Repeat the workload under comparable conditions and report variability. Check correctness, permissions, memory, and failure behavior; improved average latency can hide worse tail latency.

## Worked scenario

An export endpoint is slow at realistic row counts. Measure query count and plan, transfer size, and serialization before adding a cache. If repeated per-row lookups dominate, bound or batch them and rerun the same workload; verify tenant filtering remains intact.

## Failure patterns

Avoid optimizing toy data, reporting a single fastest run, caching cross-tenant data under a shared key, and claiming index improvements without query evidence.

## Completion evidence

- Before/after results use comparable conditions and named metrics.
- The claimed improvement is measured, with uncertainty and trade-offs recorded.
- Correctness and access control survive the optimization.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Investigate an API whose median latency is acceptable but tail latency rises sharply under concurrent exports.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [Brendan Gregg USE method](https://www.brendangregg.com/usemethod.html): Resource utilization, saturation, and errors as investigation dimensions.
