# Overview bar: independent sceptic

Copyright © 2026 Christopher Snow.

## Method

Read `AGENTS.md`, `01-facts-and-copy.md`, the reader's `02-reader.md`, the changed `Notebook.tsx` and `style.css`, and the unchanged Files dialog. Inspected the existing built preview at `http://127.0.0.1:4173/video-lab/` using independent Chromium scripts. No product edit, rebuild or preview restart was made.

External evidence is under `/workspace/scratch/overview-bar/sceptic/`: `check.mjs`, `results.json`, `wrap-check.mjs`, `wrap-results.json` and screenshots. `check.mjs` checks phone 390 × 844 in dark mode; `wrap-check.mjs` independently checks the reader's enlarged-text case in light mode. The reader's broader matrix is reader evidence, not an independently repeated complete matrix.

## Finding adjudication

**R1 — Retain as low, existing and outside this slice.** Independently reproduced the Files title and Close button wrapping within words at phone width 390 with 200% root text. The title occupies 109 × 138 CSS pixels with 57.6px text, and Close 111 × 124 with 32px text. See `phone-200-files.png` and `wrap-results.json`. The full accessible names remain intact, the dialog scrolls, the page has no horizontal overflow, and clicking Close restores focus to the home Files button. `FileManager.tsx`, its header markup and the relevant dialog styles are unchanged by this diff. Defer to a Files-dialog presentation pass; it does not justify widening the overview-bar removal.

No reader finding was rejected as factually unsupported. No blocking finding remains for the requested change.

## Independent checks

- Settled home has no `.notebook-toolbar`. Its routine saved status is still present for assistive technology and its container has `sr-only`; it does not occupy the visible strip. Home Files opens the existing dialog and clicking Close returns focus to that button. See `home-files.png` and `results.json`.
- Submitted `ffmpeg -stream_loop 1000 -i bunny-short.mp4 -t 1000 long-check.mp4` from the first worked cell after loading real practice files, navigated to the overview and explicitly waited for `.notebook-home` before checking. Visible Working, command link and Cancel processing remain. The command link targets `#/learn/first-edit/shorten`; Cancel removes the active controls and produces the existing cancellation notice. See `home-processing.png`. This checks submission, state retention, navigation and cancellation; it does not claim a completed encode or measured output.
- Forced IndexedDB access to throw `SecurityError` in a separate browser context. The exact unsafe-storage warning is visible on home, with an unclipped status container. See `home-unsafe.png`.
- In that unsafe-storage context, loaded practice files into the session, submitted a long command, navigated to home and again explicitly waited for home. The warning remains visible concurrently with Working, command link and Cancel processing. Cancellation succeeds. See `home-unsafe-processing.png` and `results.json`.
- Source confirms that unsafe-storage feedback is an independent conditional paragraph rather than a lower-priority branch of busy/saving text. Active controls remain siblings of the status and the quiet predicate cannot hide active or unsafe state. Workspace persistence and restart guards were not modified by the diff.

The stored command-link count of zero in `results.json` is measured after cancellation: the script asserts its correct href while active, then checks that active controls disappear. Initial drafts of the external script were corrected to disambiguate duplicate lesson Cancel buttons and to await the actual home render; the final evidence comes from the corrected successful run.
