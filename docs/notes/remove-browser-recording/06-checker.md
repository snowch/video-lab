# Independent checker — browser recording removal

Copyright © 2026 Christopher Snow.

I read AGENTS and the fact, separate prose, reader, sceptic and ranked-resolution records, then tested the actual built application at `http://127.0.0.1:4173/video-lab/`. I made no application-source edits. The inspected `course-B-KVrnfC.js` bundle has SHA-256 `622e964bf53885eea5396f59421dfdd85924d52370f716011c5e59283e8657ac`.

## Checks performed

Fresh Chromium contexts at 390 × 900 and 1280 × 900 in light and dark exercised source selection, practice loading, guide navigation, all four methods, source return and exact custom inspection-draft retention. All 16 method/size/theme states reflowed without document overflow at 200% root text size. The guide initially shows the neutral Choose your device placeholder and no instruction card. Keyboard ArrowDown/Enter selects Windows. Its exact options are Windows native FFmpeg, macOS native FFmpeg, Linux native FFmpeg and phone/tablet, with no browser method.

In each of the four contexts I imported a real MP4 through the optional workbench's actual file chooser. Its source preview and subsequent bare `ffprobe checker-source.mp4` command matched the imported filename. Neither production nor optional workbench exposed Record screen, Stop recording or Finish recording controls. Throwing display-capture and recorder API replacements recorded zero calls across the exercised entry points; there were no page exceptions. This is a useful positive control: the check does not rely on the browser lacking those APIs.

Separately, I inserted the existing genuine earlier browser-created WebM into the normal files store with origin `captured`, then reloaded. This models an already saved entry rather than performing new capture. The video played, its actual downloaded bytes retained the original SHA-256, and running actual WASM `ffprobe checker-old.webm` completed with raw VP9 output. No storage or source code was changed by this check. Source search also found no `getDisplayMedia`, `MediaRecorder`, `CaptureController` or retired recording-control labels in `src`; historical route IDs and captured-origin migration remain.

Reproduction and observations: `/workspace/scratch/remove-browser-recording/checker.mjs`, `checker.json` and `checker.log`. The standalone check passed. No justified finding requires a further fix.

## Limits

I did not rerun the complete quality gate, public deployment, saved-copy upgrade, offline download or native recording on Windows/macOS/Linux; those belong to their separately recorded validation. I did not claim clipboard execution: the script's optional clipboard branch did not match a command-region label and is excluded from this report. The actual device instructions and copy controls were covered by the preceding reader and existing browser tests. This checker verifies the built removal, useful source controls, guide choices and retained media independently of the author's claims.
