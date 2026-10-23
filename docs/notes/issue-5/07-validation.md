# Validation and acceptance ledger

Copyright © 2026 Christopher Snow.

Issue: https://github.com/snowch/video-lab/issues/5. This ledger describes the implementation rather than treating functional tests as a UX review.

| Requirement | Evidence |
| --- | --- |
| Approved interface throughout the real course | Five production routes, both references and the aligned optional workbench; source/command screenshots at 390/820/1365 in light/dark; independent reader, sceptic and checker |
| One source interaction, immediate named preview and continuation | Capture has one task; no filename/replay/download obstacle course; focused browser source/import path and actual recording lifecycle tests |
| Short steps, goal/action/result and contextual navigation | Shared focused shell, short route names and local task labels, form before raw result, nearby saved preview/download; desktop adjacency and phone reading-order assertions |
| Concepts introduced before choices | Separate prose draft and route/prerequisite map; duration, start and comparison precede encoding/colour/selection/ranges/clocks/joins; Build defines frames/rate and sound before mux; reference prerequisite bridges |
| Real transferable commands and raw output | Bare ffprobe default; requested CLI output unchanged; browser actions remain buttons; private grade logs and wrapper diagnostics are optional; multiple reference commands visible before loading |
| Truthful first cuts | Native FFmpeg 7.1.5 and pinned browser core verify actual H.264/yuv420p outputs; six/six/four seconds and 90/90/60 pictures; replay and source hash unchanged |
| Touch builder and manual drafts | Relevant named fields, visible complete command, changed-candidate Apply, explicit custom-draft replacement/recovery; file/source/template switching and reload tests; valueless -shortest output-name regression |
| Valid results and errors | Real output bytes and matching source-hashed recipes, explicit old-file producing command; stale draft changes/errors cannot relabel saved output; cancellation/retry and collision/overwrite coverage retained |
| Complete Build, editing and references | Actual rate changes, audio/video mux, join and both evidence graders; wrong/incomplete/imported evidence rejected; all original controlled fixture identities retained |
| Saved work and legacy compatibility | Existing files, project migration, selected source, notes, drafts and earlier achievements retained; old module/reference section routes and browser history exercised |
| State feedback and accessibility | Measured checks remain separate from manual navigation; inactive controls removed from primary flow; keyboard focus respects intervening learner focus; local output scroll cues/wrapping; fresh and populated 200% text reflow tests |
| Offline/PWA/update | Existing baseline/optional tools/install/release tests retained; first-run 32.4 MB notice beside Run; public pre-release browser profile seeded with real output/recipe, source, draft and both downloads for upgrade verification |
| Release | Full local gate, CI, public Chromium/Firefox and old-profile/offline upgrade results recorded below and in 08-deployment.md before closure |

## Completed focused checks

- `npx tsc --noEmit`: passed during implementation.
- `npm run test`: 80 tests across 16 files passed during implementation.
- `node scripts/verify-workbench.mjs`: source hash and media properties, source-derived stills, actual 1/2 fps outputs and all three minimal native cuts passed.
- First targeted desktop browser run: 15 passed, 4 failed. Three failures were obsolete UI/readiness adapters; the fourth was an adapter opening a hidden duplicate instead of the visible source action. These adapters were corrected to use actual current controls; meaningful media/error/overwrite assertions retained.
- Corrected course/journey desktop run: 13 passed. Subsequent combined course/focused/journey/optional run: 19 passed.
- Focused phone run: 4 passed, including first cuts and doubled-text navigation.
- Final dark focused/course reflow run: 10 passed.
- Rapid source/import/draft/Next/Enter workflow: 5 repeated desktop-dark runs passed after deferred-focus correction.
- Builder output-label regression: passed through the actual Build mux step.

## Superseded full-gate runs

The first complete gate reached 86 passing browser tests, then was interrupted with 2 active and 82 unrun to apply the checker's enlarged-text navigation fix. It is not a successful final gate.

The next gate exposed the remaining long recipe-button reflow failure in both desktop themes and a rapid focus race in the imported-source workflow. At interruption: 65 passed, 3 failed, 2 interrupted, 105 unrun. The failed reflow assertions were retained; buttons/result headers now wrap. The focus callback now respects an already focused editor. This run is not reported as green.

A later gate was superseded by the checker's final private-validation-log presentation fix. It reached 30 passed, 2 interrupted and 143 unrun. The final gate below must run after the last code change.

## Final release gate

Final `npm run check` completed successfully after the last implementation change: formatting, copyright, synchronised-platform hashes, strict TypeScript, **80 unit tests across 16 files**, recorded media/model checks, native minimal-cut measurements, production build and **175 browser tests across five projects**. Browser stage: 4.7 minutes. Projects: desktop light/dark, phone light/dark and Firefox. No final failures, skips or interrupted tests. Execution log: /workspace/scratch/issue5/check-complete.log.

The independent checker completed the final broad and targeted passes with no blocking findings; its final built asset and SHA-256 are recorded in 06-checker.md. A separate release-verification harness passed locally in Chromium and Firefox: actual six/six/four-second cuts, source-hashed recipe, raw native errors, chosen Publish output, own note, structured reference grade and stateful 200% text. The harness first needed an explicit wait for the newly displayed step command before Enter; that exploratory timeout is not a passing public check. Public deployment and old-profile update verification are recorded separately in 08-deployment.md.

No physical-device claim is made: viewports, text-size changes and browser engines are exercised in automation and independent browser reviews.
