# Capture the real app

Read for screen recordings, browser automation, or screenshot-based walkthroughs. See [the decision guide](guide.md) for primary sources and approach selection.

## Establish a repeatable session

- Record the app URL/environment, revision or capture date, role, viewport, display scale, locale, timezone, and initial data state. Use demo accounts and synthetic fixtures.
- Inspect the complete flow before recording. Know its loading, validation, permission, and final states. Capture the actual result; do not substitute a success overlay for a failed operation.
- Capture only the app region needed. Remove unrelated tabs, autofill suggestions, system notifications, account names, tokens, debug panels, and private records before recording. Do not include stored authentication files in deliverables.
- Determine whether the session can send emails, create payments, publish content, or alter live data. Use a sandbox/stub with a truthful label where appropriate; get action-specific authorization before live effects when it is not already present.

## Browser and manual capture

Use available approved browser automation, native recording, or supplied footage. In Playwright projects, match video dimensions to the intended viewport and verify the configured recording mode retains the footage needed for a successful tutorial; a failure-only recording policy may discard it. Finalize/close the browser context before consuming a recorded video artifact, following the installed version's API. Keep capture output outside test cleanup paths that would remove it prematurely.

Wait for meaningful visible conditions such as a loaded list or confirmation state. Avoid fixed sleeps as a substitute for readiness, while allowing deliberate reading pauses for instructional pacing. Do not inject fabricated app state simply to imitate a successful interaction. A fixture-backed demonstration should still exercise the real UI and business behavior being taught.

If the tool cannot record or control the app, use verified supplied screenshots or prepare a capture checklist and script. State which controls or transitions could not be inspected. Do not claim a browser or recorder capability merely because a tool with a similar name exists.

## Footage and overlays

Keep an asset manifest: source, capture settings, app version, consent/rights where relevant, and scene usage. Preserve raw originals privately when needed for editing; distribute only sanitized deliverables. If a sensitive value was recorded accidentally, replace the capture where feasible and inspect every delivered frame/path rather than assuming one blur covers all appearances.

When adding an animated cursor over recordings, avoid showing a second cursor. Record pointer positions or derive them from verified frames and the actual crop/scale. Transform click points with the footage when zooming or reframing. Never infer exact click coordinates from an unrelated viewport.
