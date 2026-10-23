# Fresh learner review of the working command lab

Copyright © 2026 Christopher Snow.

The separate `prototype_reader` agent reviewed the built working lab at `http://127.0.0.1:4173/video-lab/optional/command-workbench.html` on 23 October 2026. This was a new review of actual media processing, not reuse of the simulated-prototype approval. The reviewer made no implementation changes. Audience: an engineer familiar with files and terminals but new to media tools. The source and interface were first read in the browser; the slice plan and strings supplied scope, not evidence that controls worked.

## Findings for independent sceptic review

### R1 — Medium: failed processing retains an active-operation status

Typed and ran `ffmpeg -i missing.mp4 missing-output.mp4`. The app reported `ffmpeg exited with status 1. See its log above.` It simultaneously retained `Running the command. You can cancel it; previous saved files remain available.` The Run command button was enabled, Cancel was absent, and the operation had ended. A learner may wait for work that has already failed or look for a cancellation control that no longer exists.

The `Processing log` disclosure is below the error, although the error points above. Suggested direction: change the status to an ended/failed state when execution rejects, and point to the actual log location or open the log beside the error. Preserve the engine's real error information. Reproduced in the built desktop-light page, with no JavaScript error. Evidence: `/workspace/scratch/live-reader/controls.log` under `afterMissing`.

### R2 — Low: the phone replay needs guidance for reading the source text

The source instruction says `Check whether both replacements and the final text are readable.` The actual Mousepad recording is 1280 × 720, displayed about 360 × 203 in the phone player. Its configuration text is very small in that embedded presentation. The inline Trim replay has the same scale. Native player controls offer fullscreen, but neither replay instruction tells a learner to use it or rotate the device when examining text.

Suggested direction: provide one concise replay hint for small screens, or another direct way to enlarge the source/output. Do not claim the video becomes readable on every device. This is an aid to inspection, not a failure of encoding or a reason to add simulated graphics. See `evidence/reader-phone-source.png` and `evidence/reader-phone-light.png`. Physical device rotation/fullscreen behaviour was not tested.

## Executed learning flow

- Loaded the original Mousepad recording through an app button. The file was `mousepad-demo.mp4`, 74,303 bytes, labelled as a supplied original, twelve seconds and silent. It visibly showed a real independent editor, with the staging-to-production replacement and held result.
- Ran the displayed ffprobe command in the browser. Received an actual JSON report identifying H.264 video, 1280 × 720 pictures, twelve-second container duration and no audio stream. The validated pinned-core cleanup status was explicitly distinguished from a native success exit status.
- Ran the default real FFmpeg trim command, downloaded the generated `demo.mp4`, and checked the downloaded bytes with native ffprobe. It reported `6.000000` seconds and no audio stream. The optional audio mapping correctly accepted silent input.
- Reimported the downloaded six-second output under `reader imported.mp4`. The app announced its workspace name `reader-imported.mp4`; source playback advanced, and actual ffprobe reported six seconds with no audio stream. Changed back to the provided source, opened the imported file's deletion confirmation, used Keep file, then confirmed deletion. The workspace retained the provided source and removed only the import.
- Source replay is now available inline in Inspect and Trim. Opened it, sought to seven seconds and played beyond that point. It no longer requires a return to source selection to choose trim times.
- Changed to Type command, edited a command, returned to the builder, kept the typed draft, explicitly replaced it, and restored it. Copy command returned the visible typed command. A non-tool word (`sample`) was rejected with `Choose ffmpeg or ffprobe.`
- Cancelled a real processing operation. The app reported cancellation and retained only the original file; no partial output was saved.
- Opened Workspace and browser limits, Files and the processing-offline panel. The latter correctly distinguishes the lesson download from the additional 32.37 MB processing tools and tells the learner to save lessons first. This reviewer did not repeat the builder's complete offline download/reload test.

## Layout and scope

Inspected the built page in Chromium phone 390 × 844 light/dark, desktop 1365 × 900 light/dark, tablet 768 × 1024 light, and Firefox desktop 1365 × 900 light. Checked step navigation, native controls, inline source replay, theme-specific appearance and absence of document-wide horizontal overflow. No JavaScript page errors occurred in the genuine fresh-context flows. Screenshots are under `evidence/reader-*`.

The command and result remain together. Explanations, source replay, output settings, logs, limits and offline setup are disclosed when needed. The UI uses real FFmpeg/ffprobe commands; source selection, replay, download and cancel remain clearly browser controls. This slice is the working three-step lab, not a claim that all historical course pages have been migrated.

The reviewer initially tried to restore an IndexedDB snapshot through Playwright `storageState`. Playwright serialised Blob values as empty objects, so that artificial restored state could not represent real media. That harness route was discarded and is not an application finding. Genuine fresh contexts and real browser-created files were used for the reported flows. One wait also expected prototype wording instead of the working app's actual status; that assertion was corrected. Builder rebuilds were followed by fresh page loads. No physical touchscreen, screen reader or actual display-capture permission flow is claimed by this review.

Scripts and logs: `/workspace/scratch/live-reader/full.mjs`, `full.log`, `controls.mjs`, `controls.log`, `matrix.mjs`, and `import-delete.mjs`/`import-delete.log`. Native exported media evidence: `/workspace/scratch/live-reader/default.mp4`. These support the findings above; subsequent fixes require separate built-page verification.

The builder added the proposed small-screen replay hint during the final import/delete check. R2 above records the initial reviewed page and is not an independent verification of the entire subsequent build. A deletion-status assertion expected unused copy; the actual visible file count and list confirmed the deletion.
