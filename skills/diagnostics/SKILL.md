---
name: diagnostics
description: "Diagnose correctness failures or performance bottlenecks using reproducible evidence, falsifiable hypotheses, profiling, bounded fixes, and comparable verification."
license: MIT
---

# Diagnostics

## Inputs and scope

Use correctness mode for broken behavior and performance mode for latency, throughput, memory, rendering, query, or resource symptoms. Use both when a performance change could affect correctness or authorization. Preserve evidence and work only in authorized environments.

## Workflow

1. Record expected versus observed behavior or the user-visible performance symptom, revision, environment, inputs, frequency, representative dataset/workload, and target. Capture a reproduction or baseline before changing code.
2. Form a small set of falsifiable hypotheses. Compare working and failing cases; trace control/data flow or profile client, network, server, database, queue, memory, and resource utilization as evidence directs.
3. Identify the causal mechanism or measured bottleneck. Choose the smallest supported change; do not swallow errors, weaken authorization, add blind retries, or optimize an unrepresentative toy case.
4. Rerun the original reproduction or comparable workload. For performance results, report samples, units, variability, cache state, and environment. Verify correctness, permissions, recovery, and adjacent regression risks.
5. Remove temporary instrumentation and deliver cause, change, exact verification, remaining uncertainty, and follow-up. If measurement cannot run, label the proposal a hypothesis and provide the required experiment.

## Decisions and verification

Read [the decision guide](references/guide.md) for intermittent, concurrent, cross-layer, or measurement-sensitive problems. A plausible explanation is not a verified cause, and a faster single run is not a measured improvement.

Before handoff, evidence explains why the issue occurs and why the change addresses it; performance comparisons use equivalent conditions; and remaining uncertainty or temporary mitigation has an owner or next action.

## Outputs and handoff

Use `templates/debugging-report.md` or `templates/performance-report.md` according to the mode. Report actual commands and results without inventing logs, benchmarks, or production equivalence.

Supporting resources are local to this skill and travel with its folder.
