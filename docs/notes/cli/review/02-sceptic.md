# CLI-first labs — separate built sceptic

Copyright © 2026 Christopher Snow.

23 October 2026. Read `plan.md` and the completed [reader review](01-reader.md), independently traversed the built five-step path at `http://127.0.0.1:4173/video-lab/`, and then inspected the relevant CLI, persistence and pinned-core source. Main Chromium observations used **`index-CJ2X9JUd.js`**, displaying build `74e8fbf`; the builder was making later wording changes concurrently. This is a focused sceptic pass, not a whole-course reaudit. No application fixes or full CI rerun were performed.

## C1 — Uphold, low; position-independent wording already verified

The reader's quoted instruction “Command field below” contradicts the actual layout: the workspace precedes Capture's instructions and examples. The field is still prominent and labelled, so this was a minor navigation inconsistency, not an inaccessible workflow. In my built reading, the instruction already says “Type or paste one example into the Command field”, without the incorrect direction. That resolves this finding in the observed build; no relocation or additional GUI control is necessary.

## C2 — Uphold, low; explanation must be conditional on the actual result

Independently reproduced after a real 2 fps encode and an altered join:

```text
Aborted()
Saved changed.mp4
Execution recipe: changed.mp4.recipe.json
Process exit status: 0
```

The output is real: native ffprobe of my downloaded `changed.mp4` reports **3.000000 s**, **36 video frames**, **77,643 B**, with no audio, agreeing with my typed `[0,1)` plus `[3,5)` silent join. This contradicts interpreting the bare diagnostic as proof that this successful encode failed. However, I also deliberately ran an unrecognised option and a missing input. **Both failures printed `Aborted()` too**, followed by `ffmpeg exited with status 1`; neither produced a saved output. Therefore a blanket instruction to ignore abort messages would be false.

Source evidence is specific: pinned `@ffmpeg/core` 0.12.10's `exec` catches exceptions whose message starts with `Aborted`, then returns `Module.ret`. Its `printErr` filters `Aborted(native code called abort())`, but does not filter the bare `Aborted()`. This explains how the visible line and a separate successful return can coexist; it does not establish that every abort is benign. The app rejects nonzero FFmpeg results and requires a nonempty output before saving it. Its separate ffprobe `-1` handling also requires valid nonempty JSON with no error object.

A short explanation is appropriate **only when this execution emitted the exact bare line and FFmpeg returned zero**. Preserve the actual log, exit status, error reporting and output checks. The drafted `cleanupNotice` appropriately says that this command returned zero, that nonzero still means failure, and that the learner should inspect/replay the result. At report writing it was present as source prose but had not appeared in my observed build; its conditional binding and final visible behaviour remain checker obligations. Do not claim this wording proves arbitrary output quality or classifies other abort messages.

## CLI truth and targeted implementation checks

- **Actual arguments:** typed `sample` and `fixtures`, then a 2 fps image command under a new name. Real ffprobe reported **1.500000 s / 27,543 B**. Typed a different filter graph, `[0,1)` followed by `[3,5)`, and downloaded the actual three-second output and [execution recipe](evidence/sceptic-changed.recipe.json). The recipe records that exact graph, filename and argument array. Source passes the parsed arguments to `engine.exec`; this is not a preset selected by a command-looking label.
- **Source identity:** `sample` names its provided source explicitly. The output recipe identifies `capture.mp4` by SHA-256 `502e9579c705521b805ec576d77b8f11038da3b245182ea31996e7305d991349`. It also lists unrelated workspace inputs, but Edit/Publish explicitly explain that inventory and direct readers to `-i` to identify required dependencies. Reject claiming that the disclosed inventory means silent source substitution.
- **Errors:** unrecognised `-bad_learner_flag` and `missing.mp4` reached real FFmpeg error handling, returned nonzero and saved no output. The existing source, successful output and recipe remained after reloading. Raw logs plus specific failures provide usable evidence; log length alone is not a missing-media-prerequisite defect.
- **Persistence:** after Chromium reload, `ls` retained the original source, supplied fixtures, generated outputs and recipes; the changed output played past 0.3 seconds with duration three seconds and no media error. In a separate Firefox phone-dark context I imported that real downloaded file. It remained labelled **imported**, and played both before and after reload, advancing beyond 0.24 seconds without a media error. This directly supports the current restored-Blob path. I did not reproduce the earlier invalid-handle build, and do not claim exhaustive IndexedDB or offline coverage.
- **Cancel/retry:** in Firefox, started a real encode of the imported source and pressed Ctrl+C. The workspace reported cancellation and no incomplete saved output. Retrying the typed command succeeded, saved `retry.mp4` and its recipe, and left `changed.mp4` available. This is one targeted lifecycle check, not a cancellation stress matrix.
- **References:** Firefox `reference build` printed “Provided reference saved; no processing was run”, listing a **62,664 B provided** file. `comparison` explicitly loaded an **86,088 B provided** excerpt and printed Blender Foundation credit plus CC BY 3.0/source links. These commands retain useful recorded examples without claiming the learner produced them. `reference edit` follows the separately labelled documented branch; I did not independently execute that branch in this pass.
- **Interface contract:** commands are the primary controls; browser playback, file chooser, sharing permission and offline installation are appropriate auxiliary interfaces. Media flags, filter labels, quoted expressions, source names and deliberate audio omission are taught beside the runnable examples. Reject a request to restore range/codec forms as a remedy for the owner-requested CLI conversion. A 390 px Firefox phone-dark viewport had a 390 px document width in the checked states.

## Decision and limits

Keep C1/C2 as small justified clarity fixes, with C1 already observed corrected. No concrete high-severity implementation issue emerged from the targeted command, saved-file, failure and cancellation checks. Full capture success, physical touch typing, the offline processing matrix, all storage edge cases and the surrounding retained reference course were not independently certified here. The separate checker must verify the conditional log explanation in the final built page, while preserving failure behaviour and raw evidence.
