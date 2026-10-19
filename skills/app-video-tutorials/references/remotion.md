# Remotion production and rendering

Read when creating programmable animated video. Primary documentation and licensing links are in [the decision guide](guide.md). Check current APIs against the project's installed version before coding.

## Project and asset boundaries

Reuse an existing Remotion project when available. Otherwise keep video source and dependencies in a dedicated media project/workspace so app runtime behavior is unaffected. Inspect the package manager, lockfile, runtime support, and rendering/browser prerequisites. Keep Remotion package versions compatible. Do not run a global/latest installer or fetch optional upstream skills simply because an example suggests it; use the user's authorized scope and established dependency policy.

Use local, licensed fonts and assets or explicitly authorized remote resources. Resolve media through the framework's supported asset/media APIs and wait for fonts, images, and metadata using version-appropriate render lifecycle mechanisms. Avoid capturing live app network state during render: use verified stable media so frames do not depend on changing data or authentication.

## Timeline and animation

Define composition ID, width/height, fps, and total frames. Express the storyboard as scenes with named start/end points. Convert seconds to integer frame positions consistently; document whether a scene end is exclusive. Account for transition overlap rather than adding durations blindly.

Drive visual state from the current frame using supported interpolation/spring APIs. Wall-clock time, timers, unseeded randomness, CSS transitions, and mutable global state can yield inconsistent renders. Keep cursor travel, click emphasis, callouts, media trims, and camera transforms on the same timeline. Be aware that nested sequences shift the local frame origin; use the correct local/global timing for overlays and narration.

Pause on relevant controls and confirmed outcomes. Use easing to guide attention without distracting motion. Keep labels within safe margins and leave space for captions. Recompose layouts for new aspect ratios instead of shrinking a full desktop interface until text is unreadable.

## Preview and export

Preview first/last frames, scene transitions, a dense UI segment, captions, and the longest narration. Render a short representative segment before an expensive full export. Use the installed CLI/script and its current help; choose codec, container, pixel format, dimensions, fps, and audio settings for the destination.

Illustrative command shape, not an executed command or promise of installed tooling:

```sh
npx remotion render src/index.ts Tutorial out/tutorial.mp4
```

Substitute the actual entry point, registered composition, and path. Prefer the existing package script or local executable when present. Running npx without a local dependency may fetch packages; do not assume it is offline. Record the exact executed command, tool versions, output, and result. Do not start paid/cloud rendering without authorization for that scope.

Inspect the rendered file using [video QA](video-qa.md). Keep editable source, storyboard, assets, and reproduction settings together. A Studio preview is not evidence that export completed or that audio remained synchronized.
