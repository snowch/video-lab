# Sceptic review — workspace cleanup

Copyright © 2026 Christopher Snow.

Independent reproduction against the built site at `http://127.0.0.1:4173/video-lab/` on 24 October 2026. No source edits. Read the reader's report, then used actual Chromium at 390 × 900, fresh browser context. Script and observations: `/workspace/scratch/workspace-cleanup/sceptic.mjs` and `sceptic.json`. Captured rendered evidence under `evidence/sceptic-*`.

## Retained findings

| Finding | Verdict | Actual reproduction and consequence |
| --- | --- | --- |
| R1 · Medium · non-contextual comparisons | Retain | Chose the Mousepad practice video, visited Edit's first step, opened Compare with a provided example and loaded its sole edit comparison. Source remains `mousepad-demo.mp4`, current instruction asks for `first-cut.mp4`, while preview changes to provided `reference-edit.mp4`. Dialog says only that it is a provided output and does not prove execution; it never says this is a different controlled scene. Build's first fixture-loading task has the same unexplained generic comparison action. The execution/provenance disclaimer is accurate but does not resolve which example the learner is comparing. Keep comparisons with the relevant reference/task and state source/purpose. |
| R2 · Low · duplicate inventory and unrelated history | Retain | Fresh Capture → Files shows Import file, View file inventory and Earlier achievements above its empty-state message. The actual file list already supplies inventory. An achievement action introduces controlled reference history before the learner has encountered it; the same function exists within reference controls. Remove both generic actions from Files rather than adding another disclosure. |
| R3 · Medium · baseline readiness overpromises offline commands | Additional justified finding | Downloaded baseline only in the unified global panel. Its ready text says “Lessons, recordings and challenges can now work without an internet connection.” In the same panel, tools status remains “Processing tools are not saved for offline use yet.” Actual command challenges need those optional tools, so the broad ready promise is misleading. The installation copy likewise tells the learner to wait for the “complete offline copy” without stating that command execution needs the second download. Narrow baseline status to lesson reading/supplied playback and state both downloads independently. |

## Rejected interpretations

- Do not remove Files merely because file management is secondary: download, replay, delete and source selection are useful, real capabilities. The flat modal keeps them out of the teaching path and gives one consistent entry point.
- Do not combine the 32.4 MB tools into an unconditional reading download. Separate explicit choice and readiness are truthful and useful; the problem is the baseline readiness wording, not the separate package.
- A provided-output execution disclaimer is still necessary. R1 asks for the missing relationship to the current source/task, not for removal of that disclaimer.

The original post-lesson management stack is absent in this reviewed build. Retained findings concern the remaining contextual placement and readiness claims, not a request to restore the old stack. The sceptic did not rerun the full suite or claim Firefox/physical-device coverage.
