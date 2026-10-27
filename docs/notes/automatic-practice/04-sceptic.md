# Independent technical sceptic review: automatic practice files

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by a separate sceptic agent. No product edits, commits, Playwright CLI tests or full-gate rerun by this reviewer.

## Source review

Read `01-facts.md` and the changes to `Notebook.tsx`, `Workspace.tsx`, `Cell.tsx`, `usePracticeFiles.ts` and `ui.strings.ts`, including the existing IndexedDB transaction code, storage fallback, active-command ownership and verified asset records.

No actionable correctness defect found. The page-keyed hook makes one automatic attempt per page visit after restoration and current operations, with explicit retry after failure or deletion. Its cleanup aborts the page's request. Preparation blocks both the Run button and Shift+Enter, while failure ends that temporary block. Loading passes only `page.assets`; it does not run a command or request processing tools. The overview's optional two-minute-video link is an ordinary download, outside workspace preparation.

The loader preserves existing names, verifies new bytes and SHA-256 before adding anything, limits each fetch/body read to 30 seconds, cleans up abort listeners/timers and suppresses its generic success notice. It re-reads storage after downloading and uses an atomic no-overwrite transaction, retrying actual name collisions. Automatic preparation also avoids writing a stale folder list. Existing session-only fallback remains explicit and usable.

## Independent built probes

Used the built entry at `http://127.0.0.1:4173/video-lab/`, isolated Chromium contexts and standalone Node Playwright. No source imports were used to bypass product controls. The only fault injections were browser request interception and an unavailable-IndexedDB getter.

| Concrete challenge | Observed result |
| --- | --- |
| Another tab imports the missing source name while its automatic download is paused. | Passed. Tab A paused the `bunny-short.mp4` download; tab B imported the different six-second video under that exact name through Files. After resuming A, storage still contained the imported origin and its exact SHA-256 `9cd433e2cc0566638732526ecf27106780de2351fcb7c0abf50d0c49ba160e42`. No source error appeared. |
| Navigate to a page requiring new inputs while a native command is active. | Passed. A real `ffprobe bunny-short.mp4` was paused during tool loading, then navigation selected subtitles. The page said preparation would wait; Run stayed disabled and neither captions nor font was requested. Releasing the tool request let the probe finish successfully, then prepared exactly source, captions and font. The prior command retained its actual H.264 output. |
| Persistent storage is unavailable. | Passed. Throwing `SecurityError` on IndexedDB still let automatic preparation complete in memory. The save warning remained visible; navigating to export and back retained the source without another download and preserved an edited command. Source replay remained visible. This is session availability, not a promise that media survives reload. |
| Source loading fails, but the learner imports their own file. | Passed. An aborted source download showed the contextual failure. The learner imported `own.mp4`, edited the real cell to `ffprobe own.mp4` and obtained “Command completed” with the actual filename in raw output. The source request count stayed at one: no automatic retry loop and no permanent execution block. |
| Visiting the overview silently prepares media/tools or the optional long video. | Rejected. No MP4 or encoder request occurred. The optional link points to `/video-lab/media/notebook/bunny.mp4` and is labelled as a two-minute-video download. |

Probe commands and results:

```sh
node /workspace/scratch/automatic-practice/sceptic/review.mjs
node /workspace/scratch/automatic-practice/sceptic/review.mjs --session-only
node /workspace/scratch/automatic-practice/sceptic/failure.mjs
```

The first command's import-race and active-command scenarios passed. Its initial session-fallback assertion incorrectly expected the literal word “session” in an existing warning. The actual warning accurately says work could not be saved; after correcting that harness expectation, the session-only scenario passed separately. This was a reviewer assertion error, not a product defect. The initial output is retained as `initial-results.json`; `results.json` consolidates the five accepted observations. Scripts and individual results are under `/workspace/scratch/automatic-practice/sceptic/`.

## Reader adjudication

Retain the reader's minor finding about duplicate pending statuses. Independently reproduced a held source fetch: the global live status said “Working” while the source section said “Loading practice files…”. The latter already explains the automatic operation where it matters, so the extra generic status adds clutter. This is a justified presentation finding, not a loading failure.

Read the completed `03-reader.md`. Its R1 quote and minor severity are justified by the independent reproduction. No other finding needs a fix or rejection: its ordinary replay, multi-source, subtitle-edit, draft, retry and responsive observations agree with the reviewed implementation and focused probes.

The builder's correction is appropriately narrow: workspace state identifies quiet automatic preparation, and the shell suppresses only the generic global working status during it, including its screen-reader live text. The flag resets in the operation's `finally` block; the reviewed loading/retry/storage logic is unchanged. Draft saving still selects its own status and keeps the status row visible.

Independently verified the rebuilt correction with:

```sh
node /workspace/scratch/automatic-practice/sceptic/fix.mjs
```

All three focused scenarios passed. During a held source fetch, phone/dark rendering retained “Loading practice files…” beside the source, the generic status span was empty, and its row was visually hidden. During an active real ffprobe followed by navigation, global “Working”, the command link and Cancel processing remained visible while local preparation correctly waited. After the probe completed, holding the subsequent captions fetch showed local loading with empty/hidden generic status again. With IndexedDB unavailable, the save warning remained visibly present alongside the local loading message. Visually inspected `fixed-pending-phone-dark.png` and `fixed-active-command.png`; results are in `fix-results.json` in the sceptic artifact directory.

**Disposition: R1 accepted, fixed and independently verified in the built app. No unresolved technical or reader finding remains in this focused review.**

## Addendum: final copy corrections

Independently checked the rebuilt empty Files dialog, `text/title` and `workflows/reuse` with `node /workspace/scratch/automatic-practice/sceptic/copy.mjs`; recorded their actual text and commands in `copy-results.json` in the same artifact directory. Read the source changes and the completed final-copy addendum in `03-reader.md`.

All three corrections are justified. The empty-state message explains that opening a lesson supplies practice videos and retains the import option. The title note preserves `fonts/DejaVuSans.ttf` and accurately identifies the font's letter-shape purpose; that path is both a declared automatic asset and the actual `drawtext` command's `fontfile`. The reuse note removes “Load both clips” while retaining the deliberate Files → New folder action for `previews`; both clips are declared page assets and the shown commands use `previews/` output paths. Automatic media preparation does not replace that folder-management task. The existing subtitles explanation still describes renderer font-folder behaviour, rather than a manual practice-loading task.

The reader found no additional issue across its 24 final-copy layout combinations. Its retention conclusion agrees with the source facts and independently read built text. No new fix or dissent; R1's independently verified resolution above remains unchanged. No product edits, CLI tests, encode or commit for this copy follow-up.

## Limits

The independent probes targeted concurrency, command ownership, storage fallback and failure recovery. They did not duplicate the builder's full project/browser matrix, offline bundle download, capacity and timeout tests, or run an encode. The transaction review supports preserving a name imported after the final re-read as well: the database check and insert share one read/write transaction, and collisions return `ConstraintError` for a fresh re-read. Persistent storage coordinates tabs; session-only memory remains local to the current app session.
