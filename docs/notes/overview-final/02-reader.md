# Overview controls: final fresh learner review

Copyright © 2026 Christopher Snow.

## Scope and method

Independent reader pass against the stable built preview at `http://127.0.0.1:4173/video-lab/`; no rebuild or product edits. Read `AGENTS.md`, this slice's `01-facts-and-copy.md` and the product diff. Scope is the explicit removal of Files and routine saved text from the overview, retaining lesson access and exceptional feedback. Course prose was not audited.

Chromium matrix: desktop 1440 × 1000 and phone 390 × 844, light and dark, root text size 100% and 200%. External screenshots, scripts and results are in `/workspace/scratch/overview-final/reader/`; `review.mjs` and `observations.json` contain the full matrix. `recovery.mjs`, `recovery.json`, `warning.mjs` and `warning.json` record focused recovery checks.

## Findings

**R1 — Low, nonblocking: focus loses its useful destination after navigating Back with Files open.** Reproduction: home → “Start chapter 1 →” → “Files · 0” → browser Back → Escape. Files stays open over the overview until Escape. After closing, focus is on `BODY`; the next Tab reaches “Source and evidence” in the footer rather than a nearby course action. Reproduced in every matrix case. The overview no longer has the original Files opener, so ordinary return-to-opener cannot succeed. There is no keyboard trap: the dialog closes and all page controls remain reachable. Suggested direction: in a later focus pass, provide a useful focus destination when navigation removes a dialog opener. Evidence: the `back-modal` and `back-modal-tab` entries in `observations.json`, and `*-home-after-back-escape.png` screenshots.

No blocking finding was observed in the requested removal.

## Built-page observations

- The overview has “Start chapter 1 →”, no Files button, no Course overview self-link, and no routine “Saved in this browser on this device” text in either visible or accessible DOM output.
- Lesson “Course overview” and Files navigation remain available. In all eight size/theme/text combinations, opening lesson Files and pressing Escape returns focus to its Files opener.
- The dialog retains “Files are saved in this browser when storage is available. Download important work; browser storage can be cleared.”
- Neither home nor lesson horizontally overflows in the matrix. Representative screenshots: `desktop-light-100-home.png`, `phone-dark-100-home.png` and `phone-dark-200-lesson.png`.
- Recovery was exercised with a real imported `reader-recovery.txt`. After returning to the overview, entering through Start, opening lesson Files and downloading the file returned the original `reader recovery evidence` bytes. Evidence: `recovery.json` and `download-reader-recovery.txt`.
- With IndexedDB opening deliberately made to throw `SecurityError`, the overview visibly retains “Some work could not be saved. Download your files and page records before closing or updating.” It still has no Files button. Evidence: `phone-dark-storage-warning.png` and `warning.json`.

This reader pass did not repeat active FFmpeg execution, simultaneous unsafe-storage/processing, or full assistive-technology testing. Active operation controls are unchanged in this diff; the independent sceptic and regression checks cover those states.
