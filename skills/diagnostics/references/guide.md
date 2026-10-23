# diagnostics: decision guide

## When to read

Use this guide for intermittent failures, concurrency and retry defects, cross-layer latency, tail behavior, or any change whose diagnosis depends on careful experimental control.

## Decisions to resolve

- Record revision, environment, input, frequency, data volume, concurrency, cache state, sample count, latency distribution, throughput, error rate, and user-visible target as applicable.
- State each hypothesis with a prediction and a safe experiment. Prefer observation before mutation and change one relevant variable at a time.
- Trace time and behavior through client, network, server, database, queue, and dependencies. Examine utilization, saturation, errors, ordering, locking, caching, permissions, and external failures as evidence directs.
- For caches, define tenant-safe keys, invalidation, TTL, stale behavior, and memory bounds. For indexes, consider query evidence and write cost.
- Repeat the original reproduction or workload under comparable conditions; verify correctness, access control, tail behavior, memory, and recovery.

## Worked scenario

Orders appear twice and tail latency rises after provider timeouts. Compare request IDs and commits to distinguish rendering duplication from repeated writes, then profile waiting time. If retries caused duplicate commits, correct idempotency and verify timeout-after-commit behavior. If lock contention drives tail latency, measure the bounded change under the same concurrent workload.

## Failure patterns

Avoid changing several variables at once, swallowing errors, unbounded retries, optimizing toy data, reporting only the fastest run, or caching cross-tenant data under a shared key.

## Completion evidence

- Evidence establishes the causal mechanism or clearly labels remaining hypotheses.
- The original reproduction and adjacent recovery cases are verified or explicitly unavailable.
- Performance results use comparable conditions, named metrics, and variability.
- Correctness and access control survive the change.

## Behavioral evaluation

Request: “Diagnose intermittent duplicate orders and sharply rising tail latency after payment-provider timeouts using sanitized logs and a local stub.”

Evaluate hypothesis quality, experimental control, safety, correctness, measurement, and evidence honesty. This scenario is proposed, not an executed result.

## Primary references

Reviewed public sources on 2026-10-19.

- [Google SRE troubleshooting](https://sre.google/sre-book/effective-troubleshooting/): Hypothesis-driven diagnosis.
- [Brendan Gregg USE method](https://www.brendangregg.com/usemethod.html): Utilization, saturation, and errors.
