# Independent check of the working command lab

Copyright © 2026 Christopher Snow.

The separate `prototype_checker` agent verified the built working lab on 23 October 2026 without editing its implementation or prose. This is a new execution review, not reuse of the simulated HTML prototype's sign-off. No remaining blocker was found for the scoped three-step workbench.

Final entry HTML SHA-256: `856a4d4df34831d3f245114ecbda9e726a341b1636ecdd768ce3d219f6083940`. Application bundle: `workbench-IG0K6rpb.js`, SHA-256 `f5f5bf3bdd446d4436aa94d8bcfb372f16c21aafe0ee6ff85a90c89e9571fdd0`. The full execution matrix used entry hash `e29319cf0e4c01a605f1b7087845c52a69fccc7fbc043d6f0bed66d054c83494`; the final rebuild changed only the favicon reference. The unchanged application bundle was checked again, and `../icons/video-lab.svg` returned HTTP 200 with SVG content.

## Ranked fixes verified

**R1, missing-input failure:** executed `ffmpeg -i missing.mp4 missing-output.mp4` in each of five fresh browser cases. The real status-1 failure now ends with “The operation did not finish. Read the error and retry. Previously saved files remain available.” The error retains the actual tool failure and adds “Open Processing log for details.” No active Cancel control remains. Opening the log exposes the missing-input diagnostic. A subsequent real one-second encode succeeds, downloads and measures one second with native ffprobe. The original and prior outputs remain in Files.

**R2, small-screen replay guidance:** the source view and inline source replay both display the concise rotation/full-screen suggestion. The actual Mousepad recording plays; the hint does not substitute an illustration or claim that every device will make its text readable. Screenshots were inspected at phone and desktop sizes.

Computed inspection badges are restored above the complete JSON disclosure. The actual provided source reports `Video: h264 · 1280 × 720 pixels` and `File duration: 12 seconds`, with no audio badge because the executed report contains no audio stream. The pinned ffprobe cleanup return is explicitly distinguished from a native success exit status.

## Genuine media execution

Completed source → real ffprobe → real FFmpeg trim → replay/download in Chromium phone 390 × 844 light and dark, Chromium desktop 1365 × 900 light and dark, and Firefox tablet 768 × 1024 light. Every case used a fresh browser context and actual WASM processing. There were no JavaScript page errors or document-wide horizontal overflow.

The practice media visibly belongs to the independent Mousepad editor, rather than the course. Its downloaded bytes matched `public/media/mousepad-demo.mp4`, SHA-256 `d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e`. The executed report contains one H.264 video stream, twelve seconds and 180 frames. Every default downloaded edit measured six seconds, ninety frames and one silent video stream with native ffprobe. Execution recipes contained the displayed `-ss 2 -t 6` command and matching source hash. The generated output also played in the browser.

Changing duration retained the real earlier output with an explicit stale-result notice. Builder → typed command → keep → replace → restore preserved the custom draft; replacement and restoration focused the command field. Cancelling a real operation returned focus to that field and saved no partial output. Attempts to overwrite the selected source, reuse an existing output without `-y`, or run invented `sample` syntax produced specific errors. The post-test file list contained exactly the original, successful six-second and one-second outputs, and their two recipes—no failed or cancelled artefacts.

## Navigation, files and offline operation

A genuine imported file named `mousepad-demo.mp4` remained intact when the provided source was loaded under `mousepad-demo-2.mp4`. A filename containing spaces and an apostrophe was renamed explicitly to a valid workspace name, with the notice that the device's original was unchanged. Browser Back during delayed WASM startup cancelled active processing; Forward and a real retry then succeeded. The initial source history entry legitimately has no hash, so the independent harness was corrected to accept that route as well as `#source`.

Saved the complete offline site and the separate processing package through their actual controls. Switched the browser context offline, reloaded the workbench at `#inspect`, then ran ffprobe and the default trim without network access. The offline downloaded edit independently measured six seconds and ninety frames. The saved imported and provided source files remained available.

On the final favicon build, simulated an HTTP 503 only for the practice-video fetch after importing a source. The error gave the source-loading recovery guidance; the existing selected file remained listed and its download was byte-equal to the original import. No media was deleted by that failure.

## Evidence and limits

Independent scripts and execution evidence are under `/workspace/scratch/live-checker/`: `main.mjs`, `results.json`, `offline.mjs`, `offline.log`, `final.mjs`, `final.json`, and the actual downloaded MP4s. Selected screenshots are committed under `evidence/checker-*` and were visually inspected. The checker did not modify code, copy or the synchronised platform.

This verifies the working three-step URL, not migration of every historical course page. It is a browser-emulation and native-media check; physical touchscreens, actual device rotation/fullscreen, screen readers and a fresh desktop-capture permission flow were not exercised. Repository-wide checks and public deployment are reported separately by the builder.
