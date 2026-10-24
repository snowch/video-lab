# Fresh learner review — workspace cleanup

Copyright © 2026 Christopher Snow.

Independent reader; no source changes. Reviewed the built site at `http://127.0.0.1:4173/video-lab/` on 24 October 2026 as a technically experienced engineer with ordinary terminal/browser knowledge but no assumed video expertise. This review concerns contextual controls and the affected lesson paths, not a renewed factual audit of every course paragraph.

## Actual coverage

Chromium at 390 × 900 and 1365 × 900, light and dark. Surveyed Capture, Inspect, Edit, Build, Publish and both controlled reference investigation routes. Used Files and Help, opened relevant comparison dialogs, and captured rendered screenshots under `evidence/reader-*`. No document horizontal overflow or page exceptions were observed in these four viewport/theme combinations.

- Capture ends at actual source preview/download/continuation. No trailing nested workspace/processing sections remain. Its record-help disclosure explains an actual optional source action rather than duplicating generic app management.
- Files opens on every route. Empty state explains how to obtain a file. Escape dismisses it and returns focus to Files. Practice source persists through route changes. Actual import of `my-video.mp4`, its download, source selection back to `mousepad-demo.mp4`, deletion of the imported copy, and replay all worked.
- Saved a personal reference note, read its actual bytes via Files, and confirmed feedback was shown outside the dismissed dialog. Checked Files and Help at 200% root font size on 390-pixel viewport: neither dialog nor document overflowed horizontally. Help Escape returns focus to Help.
- Ran actual `ffprobe mousepad-demo.mp4` and read the native duration/stream output. Command help and browser diagnostics are available in one flat Help dialog instead of sitting between result and continuation.
- In one global Offline access panel, saved baseline lessons, observed its ready state, saved the optional 32,367,068-byte tools, observed their separate ready state, then set the browser offline, reloaded and ran the actual bare probe successfully. No panel hopping or forced tool download was needed.

Scripts and JSON observations: `/workspace/scratch/workspace-cleanup/reader.mjs`, `reader.json`, `reader-actions.mjs`, `reader-actions.json`, `reader-more.mjs`, `reader-more.json`. These are working evidence, not repository runtime dependencies. Screenshots show actual rendered states.

## Findings for sceptic

### R1 · Medium — the new comparison action is not contextual enough

At Edit step 1, “Keep six seconds”, the toolbar advertises **“Compare with a provided example”** before the learner makes a first cut. Its dialog says only:

> This is a provided output for comparison. Loading it does not show that you ran the exercise.

The sole action **“Load edit comparison”** loads `reference-edit.mp4`. The current source remains `mousepad-demo.mp4` and the visible command remains the initial six-second `first-cut.mp4` command. The supplied output comes from the separate controlled reference scene, not this Mousepad source. Nothing in this dialog or its preview explains that relationship. A new learner can reasonably infer that this is an example of the current exercise, then see a different application/action. Build has the same generic action and separate-scene output on its initial fixture-loading step. Inspect reference's optional Big Buck Bunny output is likewise a generic unrelated option before any particular comparison question.

Suggested direction: place provided comparisons beside the exercise or controlled reference they actually explain, and explicitly identify their source, purpose and distinction from the learner's output. Avoid a prominent full-width global comparison button on every step of these lessons. Preserve optional loading and provenance; do not make reading silently download comparison media. Evidence: `reader-loaded-edit-comparison.png` and route survey screenshots.

### R2 · Low — Files still contains duplicate inventory and unrelated achievements

Even its fresh empty state offers **“View file inventory”** and **“Earlier achievements”** above the actual file list. The inventory action duplicates the list in the same dialog, dismisses the dialog and prints another listing into lesson feedback. Earlier achievements is useful reference evidence, but on Capture it introduces a task history the learner has not encountered; the references already have this action beside hints and notes.

Suggested direction: keep Files for actual saved files, import and per-file actions. Put achievement evidence in its existing reference context. Remove the redundant second inventory representation. Evidence: `reader-empty-files-390-light.png` and `reader-files-390-light.png`.

## Assessment

The original post-lesson accordion problem is substantially resolved. Files/Help modals preserve discoverability and stay out of the instruction/result/continuation sequence. R1 is the remaining meaningful learner-confusion risk: general comparisons have been promoted to a toolbar without establishing why a different supplied film belongs to the current task. R2 is a smaller remaining instance of the same generic-control carry-over.
