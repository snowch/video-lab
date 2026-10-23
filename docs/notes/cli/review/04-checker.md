# CLI-first labs — independent final built checker

Copyright © 2026 Christopher Snow.

23 October 2026. Independent gpt-6.1-sol checker, high reasoning effort. I did not author the CLI implementation, prose, fixes or repository tests. Read `AGENTS.md`, the CLI plan and reviews 00–03; exercised the production preview at `http://127.0.0.1:4173/video-lab/`, then inspected the relevant command, execution and persistence source. No application edits.

Checked **`assets/index-k6jyCr65.js`**, fetched SHA-256 **`5bf6913b04f4c3510e5d4c517fc60808706628e055be740f0fb0fa9e43ae84f1`**. **C1 and C2 accepted as resolved. No remaining independent-review blocker found within the coverage below.** This is a local built-page verdict, not public-deployment verification.

## Findings verified

**C1:** Capture's actual instructions say “Type or paste one example into the Command field”, without the stale “below”. The workspace precedes the examples. Verified on the desktop execution path and both phone themes.

**C2:** An actual image encode printed the exact bare `Aborted()` line, saved real output and its recipe, returned status 0, and displayed the separately drafted cleanup explanation. The explanation explicitly preserves nonzero failures and asks the learner to inspect/replay output. I then **cleared the terminal before each failure** and ran:

```text
ffmpeg -checker-unknown-flag invalid.mp4
ffmpeg -i absent-source.mp4 -c:v libx264 absent-output.mp4
```

Both reached real FFmpeg, retained their actual raw errors and bare `Aborted()` line, and reported `ffmpeg exited with status 1`. Neither contained the success cleanup explanation. Existing files remained available. A subsequent validated ffprobe JSON report used its separate documented sentinel explanation, without the FFmpeg-success note. Source independently confirms the note is gated by FFmpeg, actual code zero and the exact observed bare line, rather than every abort-looking message.

## Actual command execution and provenance

Chromium desktop 1440 × 1000/light completed Capture → Build → Inspect → Edit → Publish using typed commands and Enter, including navigation between steps. `sample` loaded the explicitly provided source; its downloaded SHA-256 matched `public/media/build-queue.mp4` exactly: `502e9579c705521b805ec576d77b8f11038da3b245182ea31996e7305d991349`.

| Independent command variation | Actual result |
| --- | --- |
| `ffmpeg -framerate 3 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p checker-three.mp4` | Real JSON probe: 1.000000 s; raw abort/zero/cleanup note verified |
| Same image command with rate 2 and `checker-two.mp4` | Real JSON probe: 1.500000 s |
| Map the generated one-second video and `tone.wav`, copy video, encode AAC, `-shortest checker-mux.mp4` | Download/native ffprobe: actual video and audio streams |
| Probe `capture.mp4` by its exact filename | Actual supplied source: 10.000000 s |
| Quoted custom graph keeping `[1,2)` then `[6,8)`, resetting each clock, concat, mapped silent H.264/yuv420p output | Actual downloaded `checker-edit.mp4`: 3.000000 s; browser probe and native probe of those bytes agree |

The custom graph was not selected from a preset. The [downloaded execution recipe](evidence/checker-changed-join.recipe.json) retains the exact typed command and argument array, output filename and source hash. It explicitly uses `capture.mp4`; the all-workspace inventory also contains unrelated fixtures/results, as the lesson explains. The [actual WASM output](evidence/checker-changed-join.mp4) replayed, survived reload and downloaded again byte-for-byte identically, SHA-256 `2e6cb521d0268f3eeb1137e8fc6c36e270d303812a9e3f40144a50ca153d2017`.

For native recipe replay I copied the matching source to `capture.mp4` and executed `ffmpeg -v error -y` followed by the recipe's exact `args`. System FFmpeg **7.1.5** produced **2.916667 s**, one 12 fps frame shorter than the browser core **5.1.4 / @ffmpeg/core 0.12.10** output. This is a measured cross-version reproduction limit, not disagreement when probing the downloaded bytes. I do not claim bit-identical or boundary-identical encodes across versions. The command/probe/inspect teaching makes requested boundaries distinct from verified output.

## Own recording, Firefox persistence and removal

In Firefox at 390 × 844/dark, only the sharing chooser was replaced with an original moving 320 × 180 canvas track. The track and MediaRecorder were real browser APIs. No capture started before my `capture` command. After more than fourteen drawn frames I typed `stop`; every supplied track ended. The actual [captured WebM](evidence/checker-own-capture.webm) replayed after reload, with no media error. This is genuine recorded media, not fixture bytes presented as capture; it is not a test of the OS chooser, screen sharing or sound permission.

I then typed:

```text
ffmpeg -i capture.webm -ss 0.2 -t 0.6 -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p own-six-tenths.mp4
```

The [actual output](evidence/checker-own-edit.mp4) measured **0.550000 s** in the final run, with H.264 Constrained Baseline, yuv420p, 320 × 180, average 60 fps and MP4 start time 0.050000 s. Its [recipe](evidence/checker-own-edit.recipe.json) identifies the real `capture.webm` hash, `9ec0722e132ea2e609032e94df39b3b12d0099201b9701d427e43ecbb566e437`. After reload the generated output played beyond 0.33 s without error, and redownloaded bytes had the identical SHA-256 **`4751497e88d9ffff2d7d8add3621d59305881e0fc5f5709315ca31fb2d7557e4`**. This directly checks the restored Blob path. `rm capture.webm`, waiting for completion, then reload left that source removed; trying to play it produced the missing-file error while the generated output still played. Chromium separately passed removal/reload for `checker-two.mp4`.

An exploratory Firefox check initially appeared stalled because the video was below the viewport. Isolated import of those earlier exact MP4 bytes showed the same behaviour **before and after reload**: offscreen `play()` resolved, time stayed zero, paused was false, readyState became 2, and there was no error or ended event. Scrolling the preview into view and restarting reached ended in both cases. That earlier file measured 0.566667 s, start 0.033008 s, H.264 Constrained Baseline/yuv420p/60 fps. The final checker explicitly views playback before assessing it. This counterevidence rejects classifying that harness result as corrupted restored Blobs; it is not a promise that arbitrary FFmpeg outputs play in every browser.

## Offline, references and interface

In a separate Chromium context I imported the real captured WebM under **`checker-own-source.webm`**, preserving that chosen filename. After saving only lessons, disconnecting and reloading, processing failed usefully in about **23 ms** because the extra tools were not saved. After reconnecting and explicitly saving the processing tools, I disconnected and reloaded again. Actual typed processing succeeded offline:

```text
ffmpeg -i checker-own-source.webm -t 0.5 -r 12 -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p offline-own.mp4
```

The [downloaded result](evidence/checker-offline-edit.mp4) measured **0.416667 s**, replayed, and its [recipe](evidence/checker-offline-edit.recipe.json) hashes the exact imported source. This demonstrates real saved-tools execution and filename/source identity, not a claim that a half-second request must create exactly half a second from arbitrary captured timestamps.

`reference build` and `reference edit` actually loaded their separately named files with **provided** origin and no processing claim. They created no fake edit recipe. `comparison` was the first request for the optional film excerpt; no optional asset request occurred during the required path. Its actual preview/log displayed Big Buck Bunny © 2008 Blender Foundation, shortened/re-encoded notice, source and CC BY 3.0 credit/link. Repeating either reference/comparison command refused overwrite.

The additional layout script traversed all five production pages in Chromium desktop 1440 × 1000/dark and phone 390 × 844/light and dark. Together with the complete desktop-light path this covers desktop/phone in both themes. Checked pages had no numeric/range/select parameter controls; commands were the primary interaction. Enter execution and ArrowUp history recall worked, and missing-file feedback named `ls` and the exact filename. Every checked layout width equalled its viewport, with no uncaught page errors in the completed scripts. I visually inspected all three retained workspace/error captures; representative [desktop dark](evidence/checker-desktop-dark.png) and [phone dark](evidence/checker-phone-dark.png) remain here.

## Evidence, checks and limits

[Provenance](evidence/checker-provenance.json) records exact sizes/hashes, probes and recipe-to-source mappings. Downloaded recipe bytes are preserved verbatim. To replay the own-edit recipe, copy `checker-own-capture.webm` to its recorded `capture.webm`; for the offline recipe use `checker-own-source.webm`. The changed-join recipe uses the repository's original `public/media/build-queue.mp4` as `capture.mp4`; no silent input substitution is required.

Independent commands:

```sh
node /workspace/scratch/cli-checker/check.mjs
node /workspace/scratch/cli-checker/layout.mjs
node /workspace/scratch/cli-checker/firefox-replay.mjs
node /workspace/scratch/cli-checker/offline-import.mjs
ffprobe -v error -show_streams -show_format -of json <downloaded-file>
```

Final completed scripts exited **0**. Exploratory assertions were corrected where they demanded exact cross-version recipe timing, exact arbitrary captured-file requested duration, or playback of an offscreen Firefox video; the observed differences above remain explicit. Raw success/failure logs, full structured observations and scripts remain under `/workspace/scratch/cli-checker/`.

I inspected the builder's final `/workspace/scratch/cli-check-final.log`: **69 unit tests and 125 browser cases passed (2.9 minutes)**, with native media verification and production build. The builder reported full-command exit 0. I did not execute that whole quality entry point or claim it as my independent suite.

Limits: browser-emulated devices; no physical touch keyboard, OS sharing chooser, microphone/system audio, screen reader, another viewing device or universal codec certification. I did not independently rerun all legacy-reference progress/migration, cancellation, storage quotas, 120-second timeout, optional-film playback or multi-tab update cases. New output-name bounds and persistence migration guards were source-reviewed; the directly executed removal/restoration evidence is described above. No full surrounding-course reaudit, CI result or public-deployment verification is implied by this local checker verdict.
