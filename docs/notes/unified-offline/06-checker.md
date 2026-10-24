# Independent checker — one offline download

Copyright © 2026 Christopher Snow.

Read AGENTS and the verified brief, separate prose, learner, sceptic and ranked-fix records. Tested the actual built application at `http://127.0.0.1:4173/video-lab/`, not an isolated component or author description. The requested final bundle `course-It_gUWUO.js` was actually requested in each context; its on-disk SHA-256 is `ba73b36641939155b5117cc578299c2662b658c149ff4bd1e94ae0de1ec97588`. I made no application-source changes.

## Built-page verification

Four fresh Chromium contexts covered 390 × 900 and 1280 × 900 in light and dark. The panel exposed one Download for offline use action, no separate processing-tool download or panel, and a size matching the two actual manifests: **41.85 MB · 41,849,693 B** for this final bundle. Opening the page and panel did not fetch an encoder asset. The final fix changes the earlier reviewed bundle's byte count slightly; the UI derives the displayed count from the manifest sum rather than the earlier recorded number.

In all four contexts, selected the practice source, saved the exact custom draft `ffprobe -v error mousepad-demo.mp4`, and used keyboard focus and Enter on the single download action. Completion reported full readiness and preserved the draft. At 200% root font size the document had no horizontal overflow. Inspected the phone/light rendered screenshot directly; the unified status, action and installation controls remain readable without a second tools card.

Independently repeated the sceptic's precise finding in every context: after complete saving, Check for updates reported “Your saved copy is up to date.” I removed only the cached WASM asset and dispatched the normal focus refresh. The fixed page changed to `data-offline-ready=false`, explained that some files were saved but the download was incomplete, and stopped displaying the stale up-to-date message. The same download action repaired it. This verifies the final built fix, not merely the added test or source change.

After repair, disconnected and reloaded each context. The exact draft survived. Actual WASM `ffprobe mousepad-demo.mp4` completed offline in all four contexts, reporting the twelve-second source duration. In phone/light, additionally ran actual offline `ffmpeg -i mousepad-demo.mp4 -t 1 checker.mp4`, downloaded through the Files dialog and independently inspected the bytes with native ffprobe: H.264, **1.000000 seconds**. No page exceptions occurred.

The phone/dark context first created a real lesson-only save using the retained DOWNLOAD worker protocol, modelling the previous release. On reload the unified UI correctly reported incomplete readiness and offered the same action. It completed without losing the selected source or command draft. No storage migration or deletion was used to make these checks pass.

## Result and limits

No retained finding. The stale-current finding is resolved in the final built bundle. Reproduction and observations: `/workspace/scratch/unified-offline/checker.mjs`, `checker.log`, `checker.json` and `checker.mp4`; screenshots are under `evidence/checker-*`.

I did not independently rerun failed/corrupt downloads, update activation across tabs, Firefox, unsupported browsers, the optional working entry, public deployment or the full quality gate. The preceding sceptic and separate final validation/deployment records state their own coverage. This checker pass claims only the actual checks above.
