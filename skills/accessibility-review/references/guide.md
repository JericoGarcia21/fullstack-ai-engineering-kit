# accessibility-review: decision guide

## When to read

Agree on the WCAG version/level and review scope. Combine automated checks with manual keyboard, zoom/reflow, and assistive-technology checks; report the combinations actually exercised.

## Decisions to resolve

- Prioritize complete user journeys: navigation, forms, authentication, dialogs, errors, and asynchronous feedback. Include permission and empty states when they affect task completion.

- Prefer native elements. Inspect accessible name, role, value, label associations, headings, landmarks, reading order, and meaningful image alternatives before adding ARIA.

- Check visible focus, logical order, traps, dialog return focus, touch target behavior, contrast, text resizing, reflow, and motion. Apply the exact criterion conditions and exceptions.

- For dynamic updates, assess focus stability and appropriate announcements. Record browser/assistive-technology versions, reproduction, criterion, impact, and retest result.

## Worked scenario

After opening a cancellation dialog with the keyboard, focus moves into it, remains appropriately contained while open, and returns to a sensible control after dismissal. A failed submission is identified and announced without erasing useful input. Verify behavior rather than inferring it from aria-modal.

## Failure patterns

Avoid ARIA added to compensate for the wrong element, inaccessible customized library components, and claims of screen-reader support based only on static scans.

## Completion evidence

- Findings link an observed barrier to a specific applicable criterion.
- The critical journey works with keyboard alone in the tested environment.
- Automated, manual, and unverified results remain distinct; partial scope is not whole-site conformance.

Report changed behavior, decisions, checks actually executed, unresolved evidence gaps, and the next action. Scale artifacts to the change; do not create unused documents.

## Behavioral evaluation

Request: “Review a modal booking form with inline errors, an asynchronous availability update, and narrow-screen reflow.”

Evaluate whether the result resolves the task-specific decisions above, preserves scope and authorization, and reports evidence honestly. Record inputs, environment, output, observations, and failures when executing this scenario. This scenario is proposed, not an executed test result.

## Primary references

Reviewed public sources on 2026-10-19. These links inform the guidance; they do not establish product compliance or compatibility. Consult the relevant section and record the exact version when applying a standard.

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): Normative accessibility success criteria; record version and target level.
- [MDN core curriculum](https://developer.mozilla.org/en-US/curriculum/core/): Web platform fundamentals and accessible implementation.
