# Effort decisions and evaluation

## Worked decisions

| Request or evidence | Appropriate response |
| --- | --- |
| Explain a familiar term in one sentence | Answer directly; use tools only if uncertainty or host requirements justify them. |
| Fix a label in an existing form | Inspect the component and relevant context, make the bounded edit, verify the affected presentation and required project checks. |
| Change tenant permissions or payments | Inspect trust boundaries and callers; verify denial cases and data integrity even for a small diff. |
| A targeted check fails unexpectedly | Read the failure and relevant dependency, revise the hypothesis, broaden investigation as evidence warrants. |
| A large requested deliverable | Produce the full deliverable; concise framing must not truncate the work. |
| Live credit savings requested without telemetry | Explain that measurement is unavailable; do not invent a meter. |

## Failure patterns

Treating every task as simple misses hidden risk. Treating every task as complex wastes context and delays completion. Shortening output while omitting required behavior shifts cost to the user. Repeating tools without a new hypothesis wastes work. Fewer tool calls do not establish token savings.

## Measuring improvement

Compare equivalent tasks and acceptance criteria with and without the guidance. Record model/settings, context, tool costs, retries, elapsed time, and host-reported usage where available. Check completeness and correctness before interpreting reductions as improvements. A single example does not establish universal savings.

For a matching measured metric, savings = baseline usage - observed usage. Percentage savings = 100 * savings / baseline usage, only for a positive baseline. Negative savings are an increase and must remain visible. Keep input/output/cache tokens and monetary or subscription credits distinct; pricing conversions require a documented applicable rate. Different measurement scopes cannot establish savings.

## Proposed behavioral checks

These are evaluation scenarios, not executed evidence. Try a direct answer, a small code fix, a hidden permission defect, a failing regression, and a request for unavailable real-time usage. Check that effort increases when necessary, required work stays complete, simple answers remain concise, and no usage or model-control claims are invented. Installer tests establish file delivery only; they do not establish agent behavior or savings.
