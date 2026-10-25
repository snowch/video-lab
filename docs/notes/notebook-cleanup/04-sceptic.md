# Notebook cleanup — independent sceptic

Copyright © 2026 Christopher Snow.

Separate sceptic agent, 25 October 2026. Read `AGENTS.md` and cleanup records `01-plan.md`, `02-prose.md` and `03-reader.md`. No product edits made. This pass tests the reader's finding and the changed controls only.

## R1: justified initially, resolved in the current build

Retain R1 as a valid low-severity initial finding. I visually inspected `/tmp/notebook-cleanup-reader/desktop-dark-home.png`: its introduction explicitly ends “Earlier lessons remain available as an archive with their existing work.” The Git diff for `src/notebook/copy.ts` independently shows that exact sentence removed from the original introduction. The reader did observe a remaining promotion; the later correction does not invalidate that finding.

I then tested the actual current preview at `http://127.0.0.1:4173/video-lab/`, rather than relying on the prose record. The quoted sentence is absent on desktop light and phone dark. I visually inspected the new desktop light homepage and phone dark homepage with Chapters open. The desktop introduction ends “No media knowledge is assumed.” The overview has no archive card, and chapter navigation contains the ten chapters and recording appendix without an archive entry. R1 is resolved in this build. No reader finding was rejected, and no additional finding arose within this narrowed scope.

## Current built-page evidence

Ran `node /tmp/notebook-cleanup-sceptic/check.mjs`, a standalone Chromium Playwright script using fresh contexts at desktop 1440 × 1000/light and phone 390 × 844/dark. The script adapts the reader's control selectors but independently loads and records the current preview. Results are in `/tmp/notebook-cleanup-sceptic/result.json`; four screenshots are alongside it.

- Home and `#/learn/first-edit/shorten` had no visible archive/earlier links, and no horizontal document overflow. On phone I opened the actual Chapters dialog in each state. The short homepage note reflows legibly in the inspected screenshots.
- Files → Earlier work reached `#/earlier` with “Earlier lessons and reference labs (archive)” in both contexts. Browser Back restored the first lesson with the Files dialog closed.
- Earlier work was disabled while a New text file form remained unfinished, and while `note.txt` contained unsaved text in Edit text, in both contexts.
- Direct bookmarks `#/earlier`, `#/capture`, `#/inspect/reference` and `#/edit/reference` rendered the archive, Choose your source video, What is a digital video?, and Cutting and joining respectively.
- Source review confirms the new button uses the existing `blocked` value, defined as `w.busy || dirty || Boolean(form)`. Thus the busy-state protection is wired into this control as well; this is source evidence, not a simulated in-flight operation.

## Limits

This is not a full course, persistence, accessibility or processing review. I did not simulate a busy file operation, seed historical answer/evidence databases, or test every old deep link. I did not run the repository-wide check; the coordinating author is running it separately. The two contexts cover both sizes and themes without duplicating the reader's four-context matrix. Transient `/tmp` evidence is available in this session and is not a committed artifact. A separate checker still needs to record final verification.
