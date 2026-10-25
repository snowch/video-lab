# Runtime exit adapter — independent built-page checker

Copyright © 2026 Christopher Snow.

Date: 25 October 2026. This checker did not implement the product changes. Read `AGENTS.md` and the investigation, separate prose, reader and technical sceptic records. Tested the existing built preview at `http://127.0.0.1:4173/video-lab/`; did not start or terminate the preview, edit product code, or commit. The inspected screenshot identifies the running app as `d5ff391+08f4238`. The parent's full quality gate and later public deployment check are separate.

## Result

No blocking defect found within this check's coverage. The actual built notebook executed the reported command successfully in Chromium at tablet (820 × 1180) and phone (393 × 851) sizes, in light and dark themes:

```sh
ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4
```

All four runs showed “Command completed”, retained genuine FFmpeg output and statistics, omitted `Aborted()` and omitted the historical note. All four output downloads were 297,302 bytes, contained video and audio, and had native ffprobe duration `5.000000`. Every file passed a complete native decode using `ffmpeg -v error -xerror -i FILE -f null -`. Their identical SHA-256 was `4ecf1f3f52c8e817ee3f01cb4d5d7694f10caf66627552cb531b356190855556`. Inline replay actually played and advanced beyond 0.25 seconds. Screenshots and document-width assertions showed no page overflow at either size; inspected tablet-light and phone-dark screenshots retained command, status, raw output, replay and download controls.

For each viewport/theme, inserted a synthetic older session record with its original successful status and `Old saved output\nAborted()` log. Reloading displayed the historical note; independently compared the stored `last` object before rerunning and found it unchanged. The note clearly calls this an older browser runtime and offers rerunning. Rerunning the real command produced a fresh clean result and removed the note. This checks compatibility with that record shape, not an imported historical user's database.

## Failure and persistence checks

On tablet light, these actual commands failed with actionable missing-input or unknown-option tool output; ordinary `ffprobe bunny-short.mp4` subsequently completed and displayed the genuine H.264 inspection:

```sh
ffmpeg -y -i missing.mp4 first-cut.mp4
ffmpeg -y -unknown-option -i bunny-short.mp4 first-cut.mp4
ffprobe missing.mp4
```

A separate fresh-context preservation run first created the valid five-second output. After each failed FFmpeg command targeting that same filename, independently read the saved file Blob from IndexedDB and recomputed SHA-256: it remained the exact valid output hash above. This verifies the existing artifact survives a failed attempted replacement, rather than merely showing that a later successful rerun can recreate it.

## Offline checks

Used the actual App status “Download for offline use” action and waited for complete readiness. Inspected Cache Storage against the built encoder manifest: original JS/WASM, the new adapter and all three licence/provenance assets were present with their exact listed sizes. Disconnected the browser context, reloaded into a new page/processing worker and ran the exact five-second command successfully, with no abort diagnostic.

In a separate completed download, removed only `ffmpeg-adapter.js` from the real encoder cache to simulate an older partial save. Disconnected and reloaded, then attempted a new four-second command targeting `first-cut.mp4`. It failed instead of proceeding through the remaining old core assets. The prior five-second file's IndexedDB hash remained unchanged. The raw output pane displayed `—` for this preflight failure, rather than fabricated tool stderr. This is missing-adapter rejection coverage; it does not independently exercise every corrupt-byte/update-worker lifecycle.

## Reproducible evidence and limits

Ran from the repository root:

```sh
node scratch/runtime-abort/checker/check.mjs
node scratch/runtime-abort/checker/preservation.mjs
```

Both exited successfully. Evidence is under `scratch/runtime-abort/checker/`: the scripts, four full-page screenshots, four raw logs and downloaded MP4s, `results.json`, failure logs, `cached-encoder.json`, `offline.log` and `preservation.json`. Native media validation commands are in `check.mjs`.

The built-site reader found no justified change-specific issue requiring a ranked fix. This checker independently confirms the reported success, failure, compatibility and offline behaviours above. Genuine-abort injection, literal stderr preservation, unchanged vendor-byte provenance and cross-core output comparisons are supported by the separate sceptic and parent regression evidence; this checker did not duplicate those experiments. This pass does not claim Firefox, physical touch hardware, assistive technology, audible listening, every lesson or the full update lifecycle. Public deployment remains to be checked after deployment. No authoring agent's implementation is represented as independently reviewed by itself.

## Final integration follow-up

After the builder removed the obsolete optional-workbench diagnostic paragraph and dead legacy-CLI abort detection, visited the rebuilt `optional/command-workbench.html`, loaded practice media, continued to the editor and expanded its limits and Browser tool diagnostics. The actual rendered body contains no `Aborted()` explanation. Captured `optional-notes.txt` and `optional-notes.png` using `node scratch/runtime-abort/checker/optional.mjs`. Reviewed the limited CLI diff: deleting `sawBareAbort` and the obsolete diagnostic leaves the existing `raw(line)` callback intact. Reviewed the revised SOURCE wording; it now correctly attributes saving the exit status to the native function. These integration edits did not alter the notebook or adapter, so the four encoding runs were not repeated.

Evidence relocation: after review, the builder moved the generated scripts, logs, screenshots and media to `/workspace/scratch/runtime-abort/` outside the repository. The relative evidence commands above describe their original execution location; no generated media is included in the source commit.

## Test-reference correction

Independently inspected the final two-line change in `tests/journey.spec.ts` after the full gate caught references to the removed `cli.cleanupNotice` key. Both assertions now check that actual output does not contain the literal `Aborted()`: one follows a successful encode, and one follows an ordinary invalid-option command. The latter still positively requires `Unrecognized option`; neither assertion removes the existing completion/failure checks or changes product behaviour. This is appropriate for the narrow native-exit adapter: ordinary nonzero command termination also uses the saved exit path, while genuine unexpected-abort diagnostics and literal stderr remain covered by the separate dedicated fault tests. No additional product fix is required. The parent is rerunning the full gate; this inspection does not claim its outcome.
