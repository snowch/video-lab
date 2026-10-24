# Independent sceptic — browser recording removal

Copyright © 2026 Christopher Snow.

I read the verified fact brief, binding scope extension, reader report and actual source, then tested the built application at `http://127.0.0.1:4173/video-lab/`. Reviewed course bundle: `course-B-KVrnfC.js`, SHA-256 `622e964bf53885eea5396f59421dfdd85924d52370f716011c5e59283e8657ac`. I made no application-source edits.

## Actual coverage

Independent Chromium runs at 390 × 844 and 1280 × 900 exercised real source import, source preview, optional-guide navigation and return with the selected imported source retained. The neutral selector initially had no selected device and no visible instructions. Keyboard ArrowDown/Enter selected Windows. All four methods rendered, with no document horizontal overflow. Linux session identification precedes installation checks, and Wayland/unknown instructions lead to desktop recording and import. The optional workbench loaded and previewed the practice video. Injected throwing display-capture and recorder APIs were never called. No page exceptions occurred.

For compatibility beyond the reader's simulated MP4-origin check, I seeded the existing real browser-created `/workspace/scratch/native-capture/browser-recording.webm` into IndexedDB with origin `captured`. On reload its preview played and advanced in time; its downloaded bytes matched the original SHA-256; Inspect ran the actual WASM ffprobe command and reported VP9. No new browser capture was performed. This verifies actual older WebM bytes, rather than merely relabelling a provided MP4.

Source inspection found no `getDisplayMedia`, `MediaRecorder`, `CaptureController`, Record screen or screen-chooser entry points in `src`. The retired controller is absent. The `captured` file origin and IndexedDB version/store remain unchanged, including old project-record migration. Processing cancellation remains and is distinct from removed recording stop controls. Native capture examples retain real desktop FFmpeg commands, while the guide explicitly excludes running them in the browser Command field.

Reproduction scripts and observations are in `/workspace/scratch/remove-browser-recording/sceptic.mjs`, `sceptic.json` and `sceptic-legacy.mjs`.

## Retained and rejected findings

The reader proposed no findings. I found no additional justified issue requiring a fix in this removal slice.

Rejected concerns:

- Removing browser recording need not remove older recorded files. The unchanged storage path and real saved-WebM playback/download/probe test directly support retention.
- Remaining native/device recording instructions are not abandoned browser recording controls. They explicitly produce a saved file outside the course and import it.
- Remaining `captured` origins and historical browser-recording review prose are compatibility metadata and historical records; removing them would conflict with the authorised scope.
- Lack of an automatically selected desktop OS is intentional. The neutral selector avoids presenting an incorrect device-specific command before the learner chooses.

## Limits

I did not independently repeat the reader's dark-theme, 200% text or offline-download runs, execute native screen recording on each OS, test Safari/Firefox, or run the full quality gate. Those are not claimed as independently checked here. This sceptic pass validates the built removal and retained media path; the separate checker, full quality gate and public deployment verification remain required.
