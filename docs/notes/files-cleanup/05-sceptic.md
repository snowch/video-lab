# Files cleanup: independent sceptic

Copyright © 2026 Christopher Snow.

Reviewed `04-reader.md`, the scoped plan/fact/copy records, current source and the built candidate at `http://127.0.0.1:4173/video-lab/` on 26 October 2026. This reviewer did not implement product changes or build the candidate. All browser work used standalone Node scripts in `/workspace/scratch/files-cleanup/sceptic/`; no shared Playwright CLI fixtures or build outputs were changed.

## Finding decisions

### R1 — Accepted: real loss of dirty text across an archive history boundary

Independently reproduced with awaited state assertions in `history.mjs`, recorded in `history.json`:

1. Visit `#/earlier`, then navigate to `#/`.
2. Open Files, import `notes.txt` with **SAVED TEXT**, open it and wait for that exact editor value.
3. Change the editor to **UNSAVED TEXT** and use browser Back.
4. The URL becomes `#/earlier`; the dialog unmounts without a discard/cancel choice.
5. Forward, reopen Files and open `notes.txt`: its editor contains **SAVED TEXT**. The dirty value was lost.

This confirms the reader's actual failure, rather than relying on a missing editor alone. High priority is justified by silent loss of learner-authored text. Ordinary modal close protection and App status restart protection do not cover this route change.

Source explains the result: `src/main.tsx` updates the route on `hashchange` and replaces `NotebookCourse` at the archive boundary. `FileManager.tsx` keeps text, dirty state and the confirmation in local component state. `useRestartGuard` participates in App status restart safety; it does not intercept history navigation or persist Files drafts.

Classification matters: the route-unmount behaviour and local dirty state also exist in HEAD before this cleanup. This is a pre-existing preservation gap newly reachable through the added overview Files entry, rather than proof that header relocation changed routing. A narrow Files draft-preservation or explicit discard/cancel solution is justified by this slice's dirty-work contract; it does not justify redesigning lesson navigation. Root received the independent reproduction promptly.

### Separately reported Firefox completion-focus race

Root's focused suite found a Firefox failure after a successful rename, where the removed row should fall back to Import files. The reader correctly did not claim this as its own finding. Source's original single animation-frame callback could run before React committed the enabled fallback. My standalone minimal Firefox/Chromium rename pass, and Firefox/Chromium passes including video preview, download and cancelled rename, restored Import focus on this candidate. Thus this review does not claim independent reproduction of that intermittent failure. Root owns the failing suite evidence and post-fix verification; the current source correction waits for a committed, usable target.

## Rejected findings and preferences

- The reader's initial empty-editor value, false focus return and empty post-reload text were samples taken before asynchronous Blob text reads or animation-frame focus restoration settled. Independent assertions confirmed an actually empty text editor, retained dirty text with editor focus after Cancel, and the exact saved text after reload. These are rejected harness artefacts.
- Initial focus on Close is a predictable safe modal entry point. Import is visible and keyboard reachable. Changing initial focus is an optional preference, not a demonstrated defect.
- General storage guidance, quota text, search and breadcrumbs need not be always visible. The scoped quiet default deliberately discloses them only when useful; the tested thresholds and navigation support that decision.
- Expanded disclosures use ordinary flow layout and remain reachable by scrolling. No evidence warrants adding nested setup or making every management action permanently visible.

No further justified regression was found in this pass.

## Independent supplementary checks

`review.mjs` / `results.json` passed: quiet fresh default; empty-file editing after another file; save, reload and exact text retention; ordinary dirty Escape/Cancel and editor focus; confirmed-delete cancellation and summary focus; rename collision rejection without overwrite; Escape closing More file options while keeping the dialog; Files focus restoration on a lesson.

`storage-thresholds.mjs` / `storage-thresholds.json` passed: 26,000,000 stored bytes did not show the warning; 27,000,000 did, matching 80% of 32 MiB. Opening fresh Files made only readonly legacy transactions and left the database list unchanged. An actual named nonempty legacy Blob inserted after migration made Earlier work visible, also with readonly detection transactions. These independently check real browser IndexedDB behaviour, complementing the helper's mocked unit tests. Fresh notebook startup already creates legacy stores elsewhere; their existence alone did not display Earlier work.

Source inspection additionally confirmed more-than-eight immediate-entry search logic, retaining a nonempty query, inferred folder breadcrumbs, file-count and byte quota conditions, actual Blob preview/download paths, row rename/copy/delete operations, and blocked destructive actions while text is dirty. The reader's complete viewport and operation coverage remains its own evidence, not independently re-certified here.

One exploratory focus script timed out waiting for a download row after replacing the hidden input twice without waiting for the first import to finish. Adding visible-row waits between imports resolved that harness error; the corrected Firefox and Chromium runs both passed. This is not a product finding.

This is candidate review, not post-fix checker approval. No full quality run, production deploy, saved-app update or offline relaunch was performed by this reviewer.
