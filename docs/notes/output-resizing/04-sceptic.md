# Output resizing — independent technical sceptic

Copyright © 2026 Christopher Snow.

28 October 2026. Separate reviewer; no product edits, builds, Playwright CLI/global setup, commits or merge. Read issue 7, the shared component, its strings/CSS, all three integrations and `03-reader.md`. Used standalone Node Playwright against the actual built previews on 4174, then a separately started 4175 after the reader stopped 4174.

## Decision

No justified product finding or fix requirement established. The implementation changes the existing read-only output element's viewport through inline height/max-height/box-sizing, without replacing its text, command, files, execution or cancellation path. Existing output scrolling/wrapping remains on the original pre. Static examples are not targets. The optional workbench keeps its hidden output components mounted, so their selected heights survive reruns and report visibility changes; hidden components are absent from ordinary visual/accessibility interaction.

The unmodified compact default remains until a resize: actual notebook, reference and optional initial outputs measured 320 CSS pixels with no inline height. The component reads the target's CSS minimum, clamps chosen height to at least 128 and at most 1200 CSS pixels in the tested layouts, and observes actual dimensions for its announced value. It stores no persistent or dirty-work state. Keeping a size through navigation/reload is outside the issue's mounted-pane contract.

## Independent built checks

Ran actual `ffprobe bunny-short.mp4` in the notebook in Chromium and Firefox. In both engines:

- Arrow keys changed height by 32, Page keys by 128; Home/End selected 128/1200 and additional movement clamped at those bounds.
- Right-button dragging was ignored. Primary mouse capture continued resizing outside the handle and stopped on release. Explicit capture release and pointer cancellation stopped subsequent motion from changing height.
- The exact 1,975-character ffprobe text and command draft remained unchanged across resizing, wrapping and a genuine rerun. The selected 224-pixel height survived that sequence. No page errors occurred.
- At 200% document CSS zoom, keyboard steps/bounds remained correct in CSS pixels, and a 64-screen-pixel drag changed the height by 32 CSS pixels. This tests CSS zoom, not physical pinch zoom or browser-menu zoom.
- Tab moved away from the handle. Its separator had a name, horizontal orientation, a description covering every key, a live measured current value, bounds and an `aria-controls` ID resolving to the correct pre. The handle measured 44 pixels high. `touch-action: none` was confined to that handle in source.

Also exercised Chromium's genuine CDP pen event path (`pointerType: "pen"`): a 48-pixel captured drag outside the handle resized correctly; release and further pen motion left the height unchanged. This is browser-synthesised pen input, not physical stylus hardware.

On a tablet-sized dark Chromium page (820 × 1180), independently ran real `ffprobe reference-inspect.mp4` in the earlier/reference workspace and real `ffprobe mousepad-demo.mp4` in the optional workbench. Their selected heights, respectively 256 and 384 pixels, remained through wrapping and rerun. Earlier log content was retained in the reference workspace's append-only history; the optional log remained exactly identical. No tablet page overflow was found. The separately reviewed code leaves saved-file management and processing cancellation unchanged.

Scripts and measurements: `/workspace/scratch/output-resize/sceptic/review.mjs`, `results.json`, `summary.txt`, `integrations.mjs`, `integrations.json`. Output screenshots are alongside them. One early integration-harness assertion incorrectly expected “Command completed.” rather than the actual legacy “Completed.”; it was corrected. The reader stopped its preview before the retry, so the final successful integration run used 4175. These were harness/server coordination issues, not product defects.

## Reader adjudication and limits

`03-reader.md` establishes no findings to accept or reject. Its actual desktop/tablet/phone, light/dark, doubled-rendering, touch, wrapping and rerun observations agree with the source and independent checks above. It correctly distinguishes CSS zoom from browser/pinch zoom and marks text-selection, byte invariance, screen readers, physical hardware and capture-loss checks outside its own execution. The independent exact-text/capture-loss/pen checks above supplement that report without relabelling its work as this reviewer's.

No new media encode was needed for this viewport-only change. This reviewer did not independently run a screen reader, physical touch/pen hardware, a full-course or offline/update regression suite. The parent's focused tests/full quality gate and the separate built checker remain distinct requirements; their results are not claimed here.
