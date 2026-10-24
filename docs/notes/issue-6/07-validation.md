# Validation and acceptance — App status

Copyright © 2026 Christopher Snow.

The final source build tested before committing is `71425058bd1b6c4b4a704b2879e176f62a5381a5239703f8938b5355acf0ff48` at source head `d392cea4abcccdad13887c61c9d79011d7416623`. The real second build `782d8f2eb61a149d339f2a1cbbe9283c1d35f717c983f62d5b3bcfa41a42488c` adds an actual production asset in an isolated tree at the same source commit. Its manifest and generated bundles differ; the tests do not rewrite compiled identity or simulate processing/progress. CI/public builds embed the subsequent implementation commit and consequently have a different deterministic identity.

## Commands and results

- `npx playwright test tests/offline.spec.ts tests/release.spec.ts --project=phone-light --project=firefox`: **26 passed (1.8m)**, final source. Log: `/workspace/scratch/issue6/final-focused.log`.
- `npm run check`: **passed: 78 unit tests in 18 files and 250 browser tests (8.6m)** across desktop/phone light/dark and Firefox. Formatting, copyright, platform sync, strict types, media facts, lesson/term/reference verification and the production build also passed; exit status 0. Log: `/workspace/scratch/issue6/check-final.log`.
- `node /workspace/scratch/issue6/public-final.mjs migrate`: passed actual old compiled release → current compiled release at a real local HTTP origin, using persistent browser profiles. The old page cannot acknowledge the new restart protocol and fails closed. Save/close/reopen finishes the one-time migration, retains an actual downloaded WebM hash and command draft, and preserves the complete offline save. A true browser-process restart with offline set before navigation then passed replay, real ffprobe, a downloaded FFmpeg encode validated with native ffprobe, and the standalone entry's offline probe. Log: `local-migration-final.log`.
- `node /workspace/scratch/issue6/cache-guard.mjs`: passed the additional parent-owned cache-operation guard test. Evicted A's cached index while a complete B waited; held A's actual repair response in another window; confirmed B itself remained prepared. Restart failed without changing either A window. Completing repair then explicitly retrying restarted both to B. Log: `cache-guard.log`; exact identities/results: `cache-guard-results.json` in scratch. The first harness accidentally served old sw.js while reloading, replacing waiting B; its failed precondition was corrected by retaining B deployment and refreshing readiness without navigation. That first attempt is not counted as application evidence.
- `npx prettier --check .` and `git diff --check`: passed before the full run; final documentation formatting is rechecked before each commit.

The first final-focused command used a nonexistent `phone` project; it did not execute tests. The corrected command above ran all 26. Earlier failed/interrupted investigations are described in 05-fixes and retained in scratch; no abandoned run is counted as passing. The final migration harness was rerun in a distinct profile after interrupting an earlier attempt; only its completed run is counted.

## Measured production assets

The local final build's offline manifests describe **195 lesson/app/media assets, 9,652,195 bytes**, plus **32,367,068 bytes** of actual pinned processing tools: **42,019,263 bytes combined**. This is the displayed total before saving, not a mockup value. Bootstrap worker/metadata transfer is separate; opening/checking App status does not download media/tools. CI embeds its own commit, so a few bytes may differ in its rebuilt manifests; public evidence records that release's actual total.

Actual built JS/CSS below, bytes and reproducibly calculated gzip level 9 (`gzip.compress(..., mtime=0)`); these are component resources, not extra bytes to add to the manifest total.

| Resource | Bytes | gzip bytes |
| --- | ---: | ---: |
| `course-CgEq5yoA.js` | 404,029 | 93,198 |
| `course-DD94NG6G.css` | 31,179 | 6,797 |
| `index-Bsc6sgzs.js` | 3,121 | 1,268 |
| `model-BEWUripj.css` | 1,528 | 632 |
| `model-ULjHh_aF.js` | 255,776 | 80,179 |
| `workbench-CuKpywTO.js` | 30,973 | 10,480 |
| `workbench-DWGQrL7H.css` | 10,566 | 2,948 |
| `worker-BAOIWoxA.js` | 2,526 | 1,165 |

`sw.js`: 35,621 bytes, generated with the real manifests. Build warnings concern dependency annotation positions in Zod; the compiler removes those annotations and completes. No build error is suppressed.

## Acceptance evidence

The separate drafting, fresh built-site reader, separate sceptic, ranked fixes and independent checker are records 01–06. The checker passed the final A/B builds with no retained findings; the checker did not claim the parent's full gates, public deployment or old compiled migration.

- Both supported entries expose one app-level control and closed running identity/pending badge; source identity remains embedded. The common labels/metadata behaviour were checked against all three related project issues; no sibling repository was modified.
- Real two-build tests cover detection, preparation, deferral, all-window explicit restart and failure/retry. A true persistent close/reopen retains old A until explicit restart. Valid but mismatched metadata cannot prepare another release. Empty limited storage can update; actual non-durable files, processing, composition, unsaved notes/review and cache operations protect work.
- Network-only checks exercise malformed/error/timeout/stale/offline responses. Cached content never establishes current deployment freshness; complete offline readiness remains separate.
- Actual saved media replay, offline WASM ffprobe/FFmpeg and native validation are covered after disconnected reloads and fresh persistent launches. Online-only preparation does not silently opt into processing-tool downloads.
- Cancellation, legacy partial saves/final-only replies, corruption, real quota failure, eviction/repair and failed replacement preserve the old complete copy. Scoped removal retains notes, media/drafts/achievements and sibling storage, then permits a fresh full save.
- Independent review covers both entries at phone/desktop in both themes, doubled text, reduced motion, real tap/keyboard, dialog Escape/focus return and polite status regions. Physical OS install/window integration, real Safari/iPad/Android hardware and spoken screen-reader output were not exercised; touch/viewport/emulated standalone and DOM live regions do not establish those claims.

Before screenshots are `evidence/before-public-390.png` and `before-public-1280.png` from actual pre-issue Pages release ec04453. After screenshots and intermediate failure evidence are `reader-*`, `sceptic-*` and final `checker-*`; actual deployed screenshots follow in 08-deployment. See [the release/storage contract](../../app-status-contract.md) for metadata, selected snapshots, scoped removal and the legacy migration procedure.
