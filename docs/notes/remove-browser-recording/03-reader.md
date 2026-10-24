# Independent learner review — remove browser recording

Copyright © 2026 Christopher Snow.

Reviewed the actual built site at `http://127.0.0.1:4173/video-lab/` on 24 October 2026 as an engineer familiar with terminals, browsers and files, without assuming media knowledge. No application-source edits. The review concerns removal of browser recording and retained source/guide workflows, not a fresh audit of every course paragraph.

## Actual coverage

Chromium at 390 × 900 and 1365 × 900, light and dark. Inspected the course overview, source selection, all four appendix methods, and `optional/command-workbench.html`. The 16 method/viewport/theme states had no document horizontal overflow at normal or 200% root text size and no page exceptions. Representative rendered screenshots are under `evidence/reader-*`.

The main source task now offers **Use practice video** and **Import file**, with its optional recording-guide link. Neither source entry exposes Record screen, shared-sound capture, Stop/Finish recording, a disabled recording button, or an unsupported-browser warning. I supplied browser capture APIs that throw if called; practice loading, navigation and optional-workbench setup still worked without calling them.

The appendix begins with **Choose your device** and no method-specific instruction card. Its four choices are Windows, macOS, Linux and phone/tablet; there is no browser method and no guessed operating system. The selector works by keyboard. Native instructions explicitly say to use an installed desktop FFmpeg terminal, not the course Command field. macOS retains device enumeration, the camera-index warning and explicit SCREEN_INDEX replacement. Linux places its session check before installation/device checks and directs Wayland or inconclusive results to a desktop recorder and import, rather than the removed browser chooser. Phone/tablet guidance names device recording followed by import. No current instruction encountered directs the learner back to a removed browser recording control.

## Stateful checks

- Across all four size/theme combinations, loaded the practice source, saved a custom `ffprobe -v error mousepad-demo.mp4` draft, visited the appendix and returned. Source preview and exact draft were retained.
- The optional workbench still loads the provided source and exposes its actual preview/download/continuation. Imported `my-import.mp4` through the real file chooser; the selected source and subsequent `ffprobe my-import.mp4` command were correct.
- Seeded a saved file with origin `captured` using the known Mousepad fixture bytes to model an earlier saved recording. After reload, its source preview and download worked. Actually ran bare ffprobe through WASM against that entry and observed the expected twelve-second duration. The downloaded bytes retained fixture SHA-256 `d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e`. This models stored-origin compatibility; it is not a claim that a new browser capture occurred.
- Saved baseline lessons without opting into processing tools, disconnected the browser context, reloaded the appendix, selected mobile instructions and returned to the saved captured-origin source. The guide/default selector and retained source worked offline.
- The main survey loaded no `/encoder/` asset: choosing media or reading the guide does not initialise the processing engine. The separate actual-probe check deliberately loaded processing tools online.

Scripts/observations: `/workspace/scratch/remove-browser-recording/reader.mjs`, `reader.json`, `reader-actions.mjs` and `reader-actions.json`. Final logs: `reader-final2.log` and `reader-actions.log`. Two initial harness assumptions were corrected: attempting to reset a disabled placeholder and matching the optional Continue button without its visible arrow. Neither was an application failure, and neither incomplete run is counted as a passed survey.

## Findings

No justified blocking or learner-confusion finding from this slice. The neutral selector communicates that the reader must choose a device, and the simple source task no longer depends on display-capture browser support. Existing captured-origin media remains useful without offering new browser recording. Independent sceptic/checker and the repository quality gate remain separate from this reader pass.
