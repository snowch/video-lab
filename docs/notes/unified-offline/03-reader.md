# Independent learner review — one offline download

Copyright © 2026 Christopher Snow.

Reviewed the built application at `http://127.0.0.1:4173/video-lab/` as a technically experienced learner who knows browsers, files and terminals but has not studied video processing. Read the verified brief and separately drafted copy before testing. I made no application-source changes. Reviewed bundle: `course-BP3W0lxI.js`, SHA-256 `abfd2859c44940125e41efc8b826e98f7dda5099c8630c9fe357aa68439a9697`.

## Built-page coverage

Fresh Chromium contexts at 390 × 900 and 1280 × 900 in both light and dark showed one Download for offline use action. Opening the disclosure and reading it made no request under `/encoder/`. The small manifest fetch is distinct from downloading processing tools. The displayed combined size was **41.85 MB · 41,849,659 B**, exactly the sum of the built lesson and encoder manifests. No separate processing-tools panel, separate tool readiness or second tool-download button appeared. The existing installation help remained a distinct action.

In each of the four contexts I opened the disclosure and triggered its download using keyboard focus and Enter. One activation led to Ready offline, explicitly including lessons, practice media and FFmpeg/ffprobe tools. The page reflowed at 200% root font size without document horizontal overflow. Inspected representative light/dark phone and desktop screenshots directly; the offline status and action remain legible.

After the actual complete download, selected the practice video, saved `ffprobe mousepad-demo.mp4` as a command draft, disconnected the browser context and reloaded. The draft survived. Actual WASM ffprobe ran while offline in all four contexts, reporting the supplied video's twelve-second duration. In phone/light I additionally ran actual offline `ffmpeg -i mousepad-demo.mp4 -t 1 reader.mp4`, downloaded the generated file through Files, and independently measured it with native ffprobe: H.264, duration **1.000000 seconds**. No page exceptions occurred.

## Older saves and repair

A separate fresh context used the retained service-worker DOWNLOAD protocol to create the same lesson-only cache as the previous release. On reload, the app reported “Some files are saved, but the offline download is incomplete” and `data-offline-ready=false`; it offered the same Download for offline use action. Completing that action retained the selected source and exact custom draft `ffprobe -v error mousepad-demo.mp4`.

I then deleted the cached WASM asset to model browser-storage eviction and dispatched the normal focus refresh. The page changed from ready to the incomplete status without a reload. The same download action repaired it and returned to full readiness. No saved user data was deleted by this check.

## Findings and limits

No justified learner-confusion or functional finding in this slice. “Download lessons, practice media and FFmpeg/ffprobe tools together for offline use” explains what the sole download does without requiring the learner to understand two internal packages. The complete readiness claim is supported by real offline processing, while partial saves have a clear repair path.

This review did not independently exercise failed/corrupt network downloads, public deployment, app-update activation, unsupported browsers, Firefox, or native recording. The root quality gate and later sceptic/checker/deployment passes cover their own reported cases. Reproduction script and observations are `/workspace/scratch/unified-offline/reader.mjs`, `reader.log` and `reader/results.json`; screenshots are under `evidence/reader-*`.
