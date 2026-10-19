# App video tutorials: decision guide

## Choose the production approach

| Need | Suitable starting approach | Important limit |
| --- | --- | --- |
| Teach an exact sequence in the current app | Actual capture with focused callouts | Verify each step; hide unrelated private content |
| Add branding, titles, highlights, and reusable layouts | Remotion around captured clips/screenshots | Rendering tooling must be available and compatible |
| Explain a concept or unavailable future flow | Labeled illustrative animation | Do not present a mockup as tested product behavior |
| Revise existing footage quickly | Existing editor or capture tool | Preserve editable source and required export quality |

The preferred default is actual app capture plus restrained animated explanation. Remotion is a preference for programmable video, not a requirement to rewrite a working editing pipeline. A recorded tutorial does not require adding Remotion dependencies to the app itself.

## Resolve the teaching decisions

Define audience, learning objective, starting permissions, prerequisites, language, approximate duration, and destination. A user who wants to complete a task needs enough time to read and follow the steps. A promotional montage and an instructional walkthrough have different pacing and evidence needs; choose the requested outcome.

Select output dimensions, aspect ratio, frame rate, captions, and audio from the destination. When unspecified, a stated proposal such as a landscape 1080p web tutorial at 30 fps is reasonable; do not export every possible format by default. A vertical cut needs recomposition so app text remains readable, not simply a center crop.

Reuse supplied branding, screenshots, and licensed assets. Check fonts, music, footage, and voice usage rights before distribution. Link to current licensing rather than promising a tool is free for every business or use case. Keep external voice generation and asset uploads within the user's authorized processing scope.

## Worked scenario

Request: “Make a one-minute tutorial showing members how to reserve a club court.” Inspect the actual workflow and use a synthetic member. Storyboard a brief goal, choosing a date/court, selecting an available slot, confirming, and showing the resulting reservation. Record actual control labels. If approval is required, explain the pending state rather than inventing instant confirmation.

Capture at a stable viewport with reproducible fixtures. Use Remotion to add a short title, a focused highlight over the selected slot, and step labels. Preserve useful visual context during zooms. Time narration and captions to the visible actions and keep them clear of the active controls. Render a short representative segment before the full video, then inspect the complete export for accuracy and timing.

## Failure patterns

Avoid fictional interfaces, animated clicks before controls appear, double cursors, constant zooming, captions covering the task, music overpowering speech, secrets in raw footage, and calling a preview or source project a finished MP4. Synthetic data should be safe in the raw capture; post-production blur alone is a fragile privacy control.

## Behavioral evaluation

Proposed request: “Using a local booking app with synthetic data, prepare a 45-second captioned tutorial of a reservation. The app returns a pending approval state. Rendering tools may be unavailable.”

Observe whether the result teaches the real workflow, preserves the pending state, uses safe fixtures, chooses a proportionate production method, and accurately distinguishes a rendered/reviewed video from partial artifacts. Record input, app and tool versions, artifacts, actual render/review evidence, and gaps when running this scenario. It has not been executed as part of adding this skill.

## Primary references

Official public documentation reviewed on 2026-10-19. This was a documentation review, not a media-rendering or host integration test. Check APIs against the actual installed version.

- [Remotion agent skills](https://www.remotion.dev/docs/ai/skills): optional upstream guidance for coding agents; this toolkit does not bundle or install it automatically.
- [Remotion animation](https://www.remotion.dev/docs/animating-properties) and [sequences](https://www.remotion.dev/docs/sequence): frame-based animation and timeline composition.
- [Remotion rendering](https://www.remotion.dev/docs/render) and [render CLI](https://www.remotion.dev/docs/cli/render): export workflow and command reference.
- [Remotion license and terms](https://www.remotion.dev/docs/license): verify terms applicable to the project; the toolkit's MIT license does not relicense Remotion or media assets.
- [Playwright videos](https://playwright.dev/docs/videos): browser recording configuration and artifact lifecycle, when Playwright is the chosen capture tool.
- [Remotion captions](https://www.remotion.dev/docs/captions/): caption tooling; automatic transcripts still require review.
- [W3C accessible audio/video guidance](https://www.w3.org/WAI/media/av/): planning captions, transcripts, and descriptions appropriate to the content.
