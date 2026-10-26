# Files cleanup: independent learner review

Copyright © 2026 Christopher Snow.

Reviewed the built candidate at `http://127.0.0.1:4173/video-lab/` on 26 October 2026 after the root's build-ready signal. This reviewer did not implement the product changes or build the app. Browser work used standalone Node/Playwright scripts, not the shared Playwright CLI fixtures. Evidence is in `/workspace/scratch/files-cleanup/reader/` (`review.mjs`, `extra.mjs`, `thresholds.mjs`, their JSON results, downloaded files and screenshots).

## Findings

### R1 — High: browser history can silently discard a text edit

Quoted UI: **“Unsaved changes”**, **“Discard changes”**, **“Cancel”**.

The ordinary Close and Escape routes correctly show those choices. Browser Back can bypass them when the preceding entry is the archive. I followed `#/` → Files → Earlier work → `#/` → Files → `note.txt`, changed the editor to **“Unsaved after archive”**, then used browser Back. The URL became `#/earlier`, the notebook dialog unmounted, and no confirmation appeared. Forward returned to `#/` with Files closed. The unsaved draft was not retained.

This loses learner-authored text through a standard navigation action despite the dialog's visible protection promise. Suggested direction: preserve the dirty editor or give the same explicit discard/cancel choice before browser history can unmount it. Verify Back and Forward across notebook/archive boundaries as well as within notebook pages. Root and independent sceptic were notified before this report was completed. `extra-results.json` records the route and missing editor; `extra.mjs` preserves the reproduction.

The sceptic independently confirmed R1 and established that the route-unmount mechanism pre-exists this cleanup. It is a preservation gap now reachable through the home Files utility, not a claim that this patch introduced the underlying routing behaviour.

## Clarity and control placement

The default is substantially quieter. Fresh Files shows **“Your files”**, its one-sentence purpose, **“Import files”**, closed **“More file options”**, and the useful empty-state instruction. It shows no quota paragraph, search field, breadcrumb or Earlier work action on an empty workspace. Import is visually prominent. File names clearly behave as preview/edit actions; Download remains visible. Rename/move, copy and confirmed deletion belong in each row's More actions and do not require a lesson-specific menu. The secondary file options contain actual general file tasks and the storage caveat. No extra setup concepts are needed to understand the default.

Files is an ordinary button without a count in the site header. On a lesson the Course overview back link remains separate. At 320 pixels the header reflows with Files visible above App status. The default dialog and row actions remain readable in light and dark themes. At doubled text on a 320-pixel screen the introductory text uses most of the initial viewport, but ordinary vertical dialog scrolling reaches the options and rows; labels wrap, remain legible, and do not require horizontal scrolling. I inspected screenshots rather than relying only on dimension checks.

## Actual operations and keyboard behaviour

- Imported text and SVG files, previewed the real SVG (`naturalWidth: 120`), edited text, saved it, and downloaded the exact revised bytes. Renamed and copied files, received a useful collision error with nothing replaced, cancelled a deletion with the file retained, then confirmed deletion.
- Created a folder and an empty text file. The folder's empty message and the empty editable textarea are distinct from the root empty state. A real directory import retained `folder-import/sub/nested.txt`; opening it showed **“Actual nested import”**.
- Imported `encode-1.mp4`, observed a real two-second, 960 × 540 video preview, and played it (`paused: false`, advancing playback time). Download all files produced a ZIP; Python's ZIP reader confirmed both entries and the exact saved text bytes.
- Search was absent for the small root and appeared above eight immediate entries. A query with no matches showed **“No files or folders match your search.”** Folder navigation displayed breadcrumbs. Reload retained the renamed file and **“Saved revised notes”** contents.
- Focus began on Close, returned to the header Files button after closing, entered the rename field and the safe Cancel button for deletion, and returned to the text editor after cancelling the unsaved-close choice. Twenty Tab presses remained within the modal. Escape first closed an expanded disclosure and focused its summary while retaining the dialog. Ordinary dirty Escape showed the confirmation and preserved the edit on Cancel.
- Earlier work was absent on the fresh state despite legacy databases existing. After creating an actual earlier review note it appeared, and its action navigated to `#/earlier`. This review did not reimplement the helper's exhaustive storage cases; their unit tests and source facts are separate evidence.
- At 51 stored files no limit guidance appeared; at 52 it showed the warning and the correct 64-file/32-MiB/20-MiB limits. Two imported 14-MiB files also triggered the total-byte warning. A further 21-MiB import was rejected with the actual total-quota error and no successful-save claim.

## Viewports and limits of this pass

Inspected built screenshots at 1440 × 1000, 768 × 1000 and 320 × 740, light/dark, with 100% and 200% root text size (12 combinations). These are enlarged-text checks, not a claim of a browser's native zoom setting. All page widths equalled the viewport width; all dialog scroll widths equalled their client widths. Additional screenshots cover header placement and expanded options at phone size with doubled text. Main interaction checks used Chromium; root separately reported a Firefox focus-restoration failure and assigned it to the implementer, so this reader did not duplicate it as a new finding.

No build, full quality run, hosted deployment, offline relaunch or independent fix verification was performed by this reader. Early exploratory runs hit test-selector errors and read asynchronous editor/focus changes before they settled; the final scripts wait for those updates. Those harness artefacts are not findings. R1 remains the only new product finding from this pass.
