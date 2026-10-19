# Lazy Genius decision guide

Use this guide when the simplest solution is unclear or an unconventional approach needs evidence.

## Choose by total cost

Ask what can be removed or reused before adding a component. Compare correctness, implementation effort, operational burden, reversibility, and the next maintainer's ability to understand the result. A shorter patch that adds a service or hides failures can cost more than explicit code.

## Make imagination testable

State the uncertain premise, the smallest experiment that could disprove it, the success measure, and a stopping condition. Run experiments within existing authorization and use isolated data when changes could affect users. Keep observations distinct from guesses. Choose the conventional fallback if the experiment fails.

## Worked example

A page is slow and a new cache is proposed. Inspect and measure the request first. If repeated database calls dominate, test a bounded query consolidation against representative data and permissions. Compare latency and correctness with the original behavior. Ship the query improvement if it meets the target; introduce a cache only if remaining evidence justifies its invalidation and operational costs. Do not call a plausible optimization a measured improvement.

## Failure cases

- Fewer lines but denser logic: prefer readable code and explicit invariants.
- A shortcut that skips authorization or error handling: reject it and find another simplification.
- Endless exploration: stop at the experiment's boundary and use the best supported option.
- An attractive rewrite for a narrow bug: fix the cause within scope unless broader work is necessary and authorized.

## Completion evidence

The requested behavior works, relevant boundaries were checked or disclosed, the final change contains no abandoned experiments, and trade-offs are supported by observations. State remaining uncertainty without inventing results.
