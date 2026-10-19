# Review the delivered video

Read after a representative render and again before delivery. Source code, build success, or a montage of extracted stills alone cannot establish continuous playback or audio quality.

## Checks and evidence

| Check | What to inspect | Evidence to report |
| --- | --- | --- |
| App accuracy | Labels, permissions, starting state, click targets, and resulting state match the actual app | App version/date, inspected flow, discrepancies |
| Teaching | Prerequisites, sequence, reading time, and visible end result let the viewer complete the task | Full playback observations and corrected timestamps |
| Visuals | Text readability at delivery size, crops, highlights, cursor alignment, safe margins, transitions, missing assets | Inspected scenes/frames and viewport/player size |
| Captions | Wording, meaningful audio cues, timing, line wrapping, and unobstructed controls | Caption version and final playback review |
| Audio | Speech clarity, music balance, clipping, cuts, duration, and synchronization | Actual listening and measurements if performed |
| Encoding | Container/codec, dimensions, fps, duration, audio track, corruption, and target playback | Probe/tool result and playback environment |
| Privacy and rights | No private records, tokens, notifications, unlicensed media, or unintended voice use | Sanitized asset review and unresolved rights gaps |
| Reproduction | Source, assets, composition, versions, and export settings match the delivered artifact | Command/result, file paths, manifest, and known limits |

Inspect the entire final export and listen when audio exists. Also inspect scene boundaries, the first/last frames, and difficult content at a useful zoom. Where playback tools are missing, perform available metadata/frame checks, clearly mark playback/audio unverified, and preserve that limitation in handoff.

An illustrative metadata check when FFmpeg tools are installed is:

```sh
ffprobe -v error -show_format -show_streams out/tutorial.mp4
```

This is not an executed result and does not prove the content is correct. Use the actual artifact path and available platform tool. If a render fails, retain useful diagnostics, identify the cause, and bound retries; do not repeatedly invoke costly jobs without a reasoned change.

## Delivery

Deliver only the formats requested or clearly needed for the destination: video, caption/transcript, editable source, and a short reproduction note. Identify the captured app version and any illustrative sections. State exactly what was rendered and reviewed, including any missing requested track or unchecked playback environment.

Uploading, publishing, paid rendering, and external processing of private footage remain separate actions requiring appropriate authorization. Do not claim a platform upload, compatibility test, or accessibility conformance that was not performed.
