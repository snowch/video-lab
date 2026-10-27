# Independent built-page checker: automatic practice files

Copyright © 2026 Christopher Snow.

Checked 27 October 2026 by a separate checker agent which did not author or edit the product. Read `01-facts.md`, `02-copy.md`, `03-reader.md`, `04-sceptic.md` and `05-resolution.md`, including both final-copy addenda, then verified the final built app at `http://127.0.0.1:4173/video-lab/`.

**Pass. R1 is resolved; no unresolved finding or requested product fix.**

## Final built behaviour

| Focus | Independently observed result |
| --- | --- |
| Ordinary lesson entry | `first-edit/shorten`, `inside-video/inspect`, `text/subtitles`, `text/title` and `workflows/reuse` become practice-ready automatically. Normal entry has replay and an enabled real command editor/Run button, with no manual loading instruction or load/retry button. The first page retains its open source preview. |
| Replay and multiple sources | On desktop and touch-enabled phone, opened inspection replay and switched between `bunny-action.mp4` and `bunny-short.mp4`. Video durations were six/eight seconds respectively and playback time advanced for both. |
| Auxiliary files and learner work | Subtitles prepared the video, captions and supplied font. Opened the font folder through Files and confirmed `DejaVuSans.ttf`. Edited and saved an actual caption cue, authored a practice command, visited another lesson and returned: the changed captions and command remained intact. |
| Slow preparation and retry | Held the first source request. Only the contextual “Loading practice files…” status remained; the generic status span was empty and its row hidden. Run and Shift+Enter were blocked. Aborting produced the contextual connection error and Retry loading, with no retry loop. Run became available after failure; releasing the fault and tapping Retry made the page ready. |
| Active native command | Paused loading the tools for a real `ffprobe bunny-short.mp4`, then navigated to subtitles. The current command retained global “Working” and Cancel processing while local preparation waited. Releasing the command let it complete, then only local practice-loading status appeared. Returned to the original cell and confirmed preserved raw H.264/file output. No encode was repeated. |
| Save warning | With IndexedDB unavailable, the existing “Some work could not be saved” warning remained visible alongside quiet local preparation. Suppressing the generic activity text did not suppress this warning. |
| Existing sources offline | After preparation, disabled networking and navigated from subtitles to title. The existing source and font were ready without another asset request, and source replay remained available. This is an existing-files check, not a cold offline-install claim. |
| Overview | A fresh overview downloaded no practice MP4, subtitle, font or processing tools. Its real download link remains labelled “Download the two-minute practice video”, points to `/video-lab/media/notebook/bunny.mp4`, and has a download attribute. The optional clip was not automatically added during the reviewed lessons. |

## Final-copy adjudication

Read the final addenda in both `03-reader.md` and `04-sceptic.md`. Their no-new-finding conclusions are justified by the actual rebuilt surfaces:

- Empty Files says “No files yet. Practice videos appear when you open a lesson, or you can import your own files.” It introduces no manual setup task. On phone with doubled text, the paragraph remains reachable by ordinary dialog scrolling; independently scrolled to and inspected it.
- The title source note says the supplied `fonts/DejaVuSans.ttf` “provides the letter shapes used to draw the title”. The file purpose/path remain clear without a loading instruction.
- Reuse says “In Files, use New folder to create previews before running the commands on this page.” That output-folder action remains necessary and usable. Created `previews` with the actual Files controls, visited another page and returned: the folder remained. Automatic preparation does not replace this task.

The original R1 was justified. The final held-request probe confirms the agreed fix in both visual chrome and generic live text. The command and save-warning probes establish that the correction retains their distinct status behaviour. The reader/sceptic final-copy addenda introduce no conflicting finding or further fix.

## Layout, evidence and limits

Standalone Node Playwright measured 48 combinations: empty Files plus the five lesson source panels, desktop 1440 × 1000 and phone 320 × 844, actual light/dark theme, and computed root text 16/32 px. Document width equalled viewport width throughout. Inspected saved visual evidence across devices, themes and routes, including doubled-text title/reuse notes, scrolled empty Files and optional download, and phone/dark pending/error states. Prose and filenames wrap readably; replay and retry remain accessible. Native command editors stay editable and Run is enabled once normal preparation completes. No source view requires horizontal page scrolling.

Successful commands:

```sh
node /workspace/scratch/automatic-practice/checker/matrix.mjs
node /workspace/scratch/automatic-practice/checker/flows.mjs
node /workspace/scratch/automatic-practice/checker/folder-overview.mjs
node /workspace/scratch/automatic-practice/checker/offline-existing.mjs
```

Artifacts are under `/workspace/scratch/automatic-practice/checker/`: the four scripts; `matrix.json`, `flows.json`, `folder-overview.json`, `offline-existing.json`; extracted source/dialog text; actual ffprobe log; and layout, failure/status and scrolled-dialog/download screenshots.

This final check targets the approved user experience and review resolution. It does not repeat tab-race, capacity, timeout, full offline-bundle or project-wide checks covered separately. No product edits, commits, Playwright CLI tests or full quality gate were performed by this checker. The builder records the final full-gate and publication results separately.

## Addendum: obsolete Files-test expectation

Reviewed the builder's correction to the first case in `tests/files-cleanup.spec.ts`. The former unconditional empty-dialog expectation was obsolete after intentionally entering a lesson that automatically supplies its video. The revised case retains the empty overview assertion, waits for the actual source-ready attribute on the lesson, and then requires exactly one provided `bunny-short.mp4` row with no empty message. It retains the single-header-utility, import, quiet-dialog and focus assertions. The readiness helper observes the built UI; it does not inject files or bypass preparation.

Independently checked the same route sequence in the actual unchanged build with `node /workspace/scratch/automatic-practice/checker/files-expectation.mjs`. A fresh overview had zero file rows and its empty message. After entering `first-edit/shorten`, Files contained exactly one `bunny-short.mp4` row labelled “Practice video”, and no empty message. Evidence is in `files-expectation.json` alongside the script.

This correction aligns a stale test with the owner-requested behaviour; it does not mask a product defect. The checker's standalone probe passed. The builder separately records the targeted five-project rerun and final gate outcome; no CLI suite or product change was made by this checker.
