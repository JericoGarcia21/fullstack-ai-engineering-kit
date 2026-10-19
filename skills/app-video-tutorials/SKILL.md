---
name: app-video-tutorials
description: "Create or update animated app tutorials, onboarding videos, and product walkthroughs using real app capture, scripted scenes, captions, narration, and video export. Prefer Remotion for programmable animation. Use for video deliverables, not ordinary in-app UI animation or unrelated cinematic generation."
license: MIT
---

# App Video Tutorials

## Inputs and scope

Inspect project instructions, the app/version being explained, existing media tooling, supplied footage, brand assets, and the requested learning outcome. Ask only for missing information that materially changes the tutorial: audience, workflow, language, destination/aspect ratio, narration, or access to the app. Infer reasonable defaults from context and state them. A short tutorial does not require product architecture documents.

Prefer real app footage or verified screenshots combined with animated explanations. Clearly identify reconstructed or illustrative screens; do not invent controls, successful actions, or capabilities. Use synthetic demo data and a safe account/environment for capture. Do not expose credentials, personal records, notifications, or private browser content.

## Workflow

1. Define what the viewer should be able to do afterward, prerequisites, and the exact app workflow. Inspect it when possible. Record access gaps and the app revision/date so the video can be updated later.
2. Choose capture, animation, or a hybrid. Prefer Remotion for reproducible React-based animation and reusable scenes; preserve existing media tooling when it meets the task. Check current documentation, installed versions, render prerequisites, and applicable licensing. No video framework, external agent skill, paid voice service, or cloud renderer is assumed installed or authorized.
3. Write a concise script and timed storyboard: starting state, one clear action per instructional beat, visible response, narration/caption, and end result. Use the toolkit's `templates/app-video-plan.md` when available or equivalent notes. Resolve consequential content decisions before expensive generation; proceed under existing delegation for routine creative choices.
4. Capture verified steps using the relevant [capture guidance](references/capture.md). Keep inputs, viewport, locale, timezone, demo fixtures, and app state reproducible. Avoid live financial, messaging, publishing, or destructive effects without authorization for that action.
5. Build scenes with purposeful zooms, highlights, cursor movement, and readable labels. Use [Remotion guidance](references/remotion.md) for frame-based timing, media loading, scene composition, and rendering. Keep production media work separate from application behavior changes unless those changes were requested.
6. Add narration and captions using [audio and accessibility guidance](references/audio-captions.md). Match the actual workflow and timing. Offer a silent captioned version if voice generation is unavailable or unwanted; identify any missing requested voice track honestly.
7. Preview representative scenes, render the intended artifact, then follow [video QA](references/video-qa.md). Watch the complete export and listen when audio is included. Fix inaccurate clicks, unreadable text, missing assets, caption errors, clipped audio, and timing gaps. A successful render command alone does not establish a usable tutorial.

## References and completion

Read [the decision guide](references/guide.md) for approach selection, a worked example, source attribution, and a proposed behavioral evaluation. Load the other references only when that production stage is relevant.

Deliver the requested video, editable source/project when applicable, caption/transcript files as appropriate, and concise reproduction notes: app version, assets, tool versions, composition/export settings, actual render command/result, and review performed. Report remaining gaps. If rendering cannot run, provide the useful script/storyboard/source and the exact blocked dependency; describe it as partial work, not a finished video. Publishing, uploading private assets, paid rendering, and live app actions require authorization for their actual scope.
