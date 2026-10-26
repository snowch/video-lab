# Files cleanup: independent final checker

Copyright © 2026 Christopher Snow.

Checked the final built candidate at `http://127.0.0.1:4173/video-lab/` on 26 October 2026 after the root's final build-ready signal. This checker did not implement product changes, build the candidate, or run the shared Playwright CLI. I read the scoped plan, fact/copy records, reader and sceptic findings, resolution and correction notes, then used independent standalone Node/Playwright scripts against the real built UI. Evidence is under `/workspace/scratch/files-cleanup/checker/`.

No remaining blocker was found in this slice. The reader's accepted R1 and the separately reported Firefox completion-focus problem are resolved on the final built candidate.

## Corrections verified

- Imported `history.txt` containing **SAVED BEFORE HISTORY**, edited it to **UNSAVED HISTORY**, then used browser Back from notebook to archive and Forward back. Reopening Files restored the dirty editor and its exact text. An actual readonly IndexedDB read confirmed that the stored Blob still contained the original text until Save completed. Cancel in the close confirmation retained the editor and returned focus to it. Save changed the stored Blob to the draft. A later explicit Discard restored the saved text on reopening and cleared the pending guard.
- Started New text file, typed `unfinished/path.txt`, and crossed the same history boundary. The unfinished path and form returned; no such file existed in IndexedDB. Form Cancel removed the form and cleared pending work; a later history round trip did not restore it.
- While the dirty text and partial form were each unmounted in the archive, dispatching a cancelable `beforeunload` event was prevented. The actual registered restart participant, queried with a MessageEvent whose source was the real app ServiceWorker, returned `APP_RESTART_ACK` with `safe: false`. After explicit Discard or form Cancel it returned `safe: true`, and beforeunload was no longer prevented. This verifies the global guard through the built participant; it is not a claim that this checker prepared and activated a second release.
- Firefox and Chromium both passed the complete import → actual eight-second video preview/playback → text download → rename Cancel → successful rename → copy → rename collision → delete Cancel → confirmed delete chain. Cancel returned to the originating More actions summary. Successful rename and deletion, whose original rows were removed, returned focus to Import files. The downloaded text contained its exact original bytes; the copied text was editable and saveable. Both collision candidates remained present after the useful error.

## Quiet default and real operations

Fresh Files showed Your files, the short purpose, Import files, closed More file options and the truthful empty state. Search, breadcrumb, quota guidance, storage paragraph and Earlier work were absent. There was one Files header button on both overview and lesson; the lesson's Course overview navigation remained available. Closing Files returned focus to its header trigger on both routes.

Created an actual folder and an empty text file, opened the empty editor, and imported a real directory retaining `directory/sub/nested.txt`. Its preview contained **NESTED CHECKER BYTES**. Download all files generated a real ZIP; Python's standard ZIP reader independently checked the video entry, nested path, exact imported text bytes and empty text bytes. All file operations were performed through the built app.

Search was absent at eight immediate entries and appeared at nine. A no-match query remained editable with the distinct no-match message. Quota guidance was absent at 51 files and appeared at 52 with the existing 64-file/32-MiB/20-MiB limits. It was absent at 26,000,000 stored bytes and present at 27,000,000. A further 21,000,000-byte import was rejected with the real total-quota error. Migration flags alone did not expose Earlier work; adding an actual saved legacy command draft did, and its action opened the archive.

## Visual inspection

Captured and visually inspected the final dialog at 320, 390, 820 and 1440 pixels, in light and dark themes, at 100% and 200% root text size: 16 combinations. These are enlarged-text checks, not native browser zoom. Full screenshots and per-width contact sheets are retained. The dialog and document widths also matched their available widths in every combination.

Labels, filenames, headings and actions remained readable and within the dialog. At 320 pixels with doubled text, the title wraps and the long dialog scrolls vertically; I also inspected separate scrolled screenshots of expanded More file options and row actions. The controls remain reachable and readable. Some long button words wrap at this extreme size, including the ZIP action, without concealing its meaning. Desktop and tablet layouts retain clear action grouping and suitable spacing. The light/dark comparison was inspected from actual screenshots, not inferred from overflow assertions alone.

## Actual saved-app offline check

Used App status → Download for offline use and waited for the full **Available offline** status (50,889,121 B on this candidate). Put the browser context offline and reloaded the saved app. Files reopened with its previously imported text. Edited and saved that text, imported another text file, downloaded the exact edited bytes, then reloaded again while still offline and verified the saved text. This is actual UI save/reload/file-operation evidence; it is not an installed app-window or offline FFmpeg-processing test.

## Commands and limits

Successful standalone runs:

- `node /workspace/scratch/files-cleanup/checker/check.mjs`
- `node /workspace/scratch/files-cleanup/checker/layout-storage-offline.mjs`
- `node /workspace/scratch/files-cleanup/checker/offline-only.mjs`
- Python `zipfile.ZipFile` assertions on `actual-download.zip`.

The scripts write JSON results, downloaded ZIP and screenshots alongside the scripts. Early harness attempts waited for a worker before registering one, sampled saved bytes before the asynchronous Save transaction completed, used an ambiguous Course overview/Save locator, or expected the full offline status wording on its shorter summary badge. Those harness errors were corrected and complete runs passed; they are not product findings. No product code was changed by this checker.

Full quality checks, hosted CI/deployment, production update activation and hosted offline verification belong to the root's release validation record. This report does not certify unrun work.

## Follow-up after hosted font-dependent overflow

The root reported that the first hosted Quality run finished with 328 browser checks passed, 49 skipped and three failures in the narrow doubled-text document-width assertion. The separate sceptic reproduced a real local cause with DejaVu Sans: the background overview chapter-card grid expanded to approximately 291.938 pixels inside a 256-pixel available width, making the document 324 pixels wide at a 320-pixel viewport. The Files dialog itself remained within its width. The initial visual pass above used each browser's default font and did not establish equivalent behaviour for DejaVu Sans. I did not inspect hosted CI screenshots or traces; attempts to download those artifacts were reported as HTTP 403.

After the root's new build-ready signal at 20:34:46 UTC, I independently checked the built correction, `.notebook-chapter-cards > li { min-width: 0; }`, without injecting a replacement CSS rule. `node /workspace/scratch/files-cleanup/checker/ci-overflow-followup.mjs` passed in Chromium and Firefox with both the default font and explicit DejaVu Sans, in light and dark themes, at 320 × 720 with 200% root text: eight combinations, each checked with Files closed and with both file disclosures expanded.

Every combination had a 320-pixel document, a 256-pixel chapter grid track, computed `min-width: 0px` on all ten cards, cards within the available width, and no element extending beyond the viewport's right edge. Expanded Files retained matching dialog client/scroll widths. I inspected screenshots of the background chapter cards, dialog top, scrolled file options and row actions in all eight combinations. Large text wraps extensively on this narrow screen but remains visible through ordinary vertical scrolling; the correction removes the horizontal expansion without hiding overflow.

The follow-up script, full geometry JSON and 32 screenshots are in `/workspace/scratch/files-cleanup/checker/` with `ci-overflow-followup` and `followup-` names; contact sheets group the screenshots by browser and view. No further scoped blocker was found. Hosted reruns and deployment remain the root's responsibility.
