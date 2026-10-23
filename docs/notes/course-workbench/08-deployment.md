# Published migration verification

Copyright © 2026 Christopher Snow.

Implementation commit: [`d3b93fb75fda0b308d3040392fc0a56c4bbcc89c`](https://github.com/snowch/video-lab/commit/d3b93fb75fda0b308d3040392fc0a56c4bbcc89c), deployed directly to main under the owner's standing authorisation. Live course: <https://snowch.github.io/video-lab/>.

## Cloud gate

Both workflows completed successfully for that exact implementation commit:

- [Quality checks 40029330583](https://github.com/snowch/video-lab/actions/runs/40029330583), job 120673363347.
- [Deploy GitHub Pages 40029330862](https://github.com/snowch/video-lab/actions/runs/40029330862), build job 120673364839 and deployment job 120675997545.

Each build runs the same full `npm run check` as local validation. The final local gate passed 80 unit and 155 browser tests, native media checks, platform/copyright/type/format checks and the production/offline build; details and earlier failed/interrupted runs are recorded in `07-validation.md`.

## Public browser verification

After Pages reported success, fresh Chromium and Firefox sessions opened the HTTPS public site at phone width in dark theme. TLS verification remained enabled, using the environment's configured proxy and trusted Firefox launcher. This run used the published origin; the earlier localhost harness rehearsal is not the public verification evidence.

Both public browsers passed the actual control flow:

- Source setup through Use practice video, exact selected filename and successful requests for all three new picture fixtures.
- Inspection example exactly `ffprobe mousepad-demo.mp4`, with genuine twelve-second Duration and H.264 Stream lines. No default JSON report or derived metadata summary.
- Missing-file command produces the actual tool error; Clear output resets output and operation feedback.
- Manually collapsed editor reopens through Use this command, with visible/focused explicit replacement confirmation before the trim command replaces the draft.
- Real WASM six-second trim, raw FFmpeg output, MP4 download independently inspected by native ffprobe: six seconds, 90 H.264 pictures, 1280×720 and one video stream without audio. The exact downloaded recipe matches the executed command and original Mousepad source SHA-256.
- Publish opens with native tools collapsed and replay available for the actual output.
- Reflection opens the personal note editor, preserves entered text on reopening, explicitly saves a custom filename and downloads exactly the learner-entered bytes.
- Real structured inspection-reference report passes all measured checks on the public app.
- Footer identifies the full implementation commit and reports that it matches the published version. No document horizontal overflow or browser page exceptions occurred.

Chromium additionally downloaded the complete offline bundle and the separate processing tools through the public app controls, disconnected the browser, reloaded the public URL with saved files intact, and successfully ran a real bare ffprobe offline. Firefox public offline saving was not repeated; the full automated offline/update/install coverage ran in all configured projects.

Evidence screenshots: `evidence/public-chromium.png` and `evidence/public-firefox.png`. Execution script and raw public transcript remain in the execution workspace at `/workspace/scratch/course-public.mjs` and `/workspace/scratch/course-public.log`; native downloaded-output reports are under `/workspace/scratch/course-public/`.

This does not certify physical-device screen-sharing permission dialogs, Safari, Windows or macOS. The independent checker separately verified actual MediaRecorder bytes using a controlled sharing-chooser seam. No old user work was cleared. The pre-existing untracked learner-audit directory remained outside the commits.

The documentation closure commit does not change runtime source or the published build identity.
