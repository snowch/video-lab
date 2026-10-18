# Independent sceptic and technical review — offline access

Copyright © 2026 Christopher Snow.

Reviewed 18 October 2026 by the existing independent sceptic. I did not author offline support, its prose or the reader report. I read the reader's findings, tested them against the built page and implementation, and made a separate technical/assumed-knowledge pass. No app source was edited.

Review timing matters: the builder had already patched the reader's original stale-current sequence when this pass began. My main reproductions used that build with the original generic failure message. I preserved it under `/workspace/scratch/offline-sceptic-dist/` while the builder prepared further fixes. The final rebuilt fixes require a different checker's verification.

## Reader findings challenged

### R1 — Upheld, medium; rank 1

**Reported defect:** A previous “Your saved copy is up to date” notice remained visible when a newer complete worker was waiting and “Reload to use update” was offered. The reader supplied an explicitly pre-fix reproduction and screenshot.

**Counterargument/current evidence:** An available reload button already implies that an update exists; the saved files were not lost. More importantly, the exact reported sequence now passes my independent test in Chromium desktop/light, Chromium phone/dark and Firefox desktop/light. After a current check, a new complete background update replaces the status with the correct update-ready explanation, including the consequence for other tabs. Do not describe that original sequence as still failing in the build I tested.

**Why the finding survives:** Conflicting update status is material to deciding which release to use, and the missing text explains a real multi-tab reload effect. The reader's original finding is justified. My separate state test also found an adjacent supported case in the preserved build: revision 1 remains complete and waiting; revision 2 then fails installation because a required image returns 503. The visible status becomes generic failure, while `registration.waiting` remains present and Reload is still offered. The explanation that other tabs reload disappears. This independently confirms that clearing one old notice is insufficient for every waiting-update/error combination.

**Smallest fix:** Retain the waiting update's explanation whenever its reload action is available, including alongside a failed later operation. Preserve useful failure feedback rather than merely replacing it with readiness. The builder reports adding such a separate paragraph; this review does not certify the final rebuilt binding.

**Recorded dissent:** I initially investigated a simpler disconnected-check variant while a worker was already waiting. It did **not** produce the assumed failure state in Chromium: the waiting explanation remained visible. One exploratory script timed out because it incorrectly expected generic failure there. That assumption was rejected. The supported combined-state reproduction instead uses an actual newer revision whose installation fails while the prior revision stays waiting. These are different cases; the disconnected-check experiment must not be cited as proof of the latter.

### R2 — Upheld, medium; rank 2

**Page evidence:** A failed update/check says, “The download or update could not finish. Check your connection and available browser storage, then retry. You can continue using the site online.” The available action is “Check for updates”, and the status retains `data-offline-ready="true"`.

**Counterargument:** The sentence does not explicitly claim the old copy was deleted, and online use is a valid fallback after an initial failure. Reloading a retained copy also restores the normal offline-ready message. Therefore reject any interpretation that this is observed loss/corruption of offline assets or that the generic message falsely reports a successful initial download.

**Why it survives:** The primary question in this facility is whether the learner can rely on the saved copy while disconnected. The message omits that known state and suggests an unavailable fallback after a disconnected check. A data attribute is not learner-facing readiness information.

I independently reproduced both a failed newer installation and a disconnected check after a complete save in Chromium desktop/light, phone/dark and Firefox desktop/light. The generic message appeared with readiness true. The old release then reloaded offline, native media played and sought successfully, a new offline tab opened the other lesson, and every one of its 165 manifest responses matched its build-time SHA-256 while disconnected. Thus the omitted readiness is real, not an inference from a stale UI flag alone.

**Smallest fix:** Distinguish unsuccessful updates/checks with a verified complete active copy from unsuccessful initial/incomplete saves. State retained offline availability and name the actual “Check for updates” retry action. Recheck the active copy before promising it remains complete; do not rely only on an earlier ready value. The separately drafted `updateFailed` message fits that distinction. Keep the initial-failure path cautious when no complete copy exists. If an older update also remains waiting, retain R1's reload explanation as well.

No reader finding is rejected in full. The rejected stronger interpretations and unsupported reproduction variant are recorded above.

## Independent technical and assumed-knowledge pass

No additional substantive product defect is ranked from this pass.

- **Complete release and integrity:** The build enumerates the production files, hashes their contents and includes the worker/range sources in the release version. Saving fetches with the recorded integrity, accepts complete HTTP 200 responses and activates only after installation succeeds. In my initial-save failure tests, a required-image 503 never produced readiness; retry completed the copy. With the network disabled, all 165 manifest assets matched their expected hashes in each of the three browser cases. I inspected the wrong-content rejection test, but did not independently repeat that separate corruption scenario.
- **Media ranges:** All twelve range unit tests pass. My independent offline requests returned 206 with the correct body lengths and content ranges for a bounded range and a suffix, and 416 for an unsatisfiable range. The actual Module 2 source and Module 0 recording both played and advanced after seeking offline. These observations support the short-recording playback contract, not an arbitrary large-video streaming claim.
- **Update isolation:** The manifest and cache version bind the document, scripts and saved media to one release. Failed new installation leaves the active release available; a completed update waits for activation. My explicit activation retained a saved lesson note, and offline reload/new-tab opening still worked. The fixture changes only the worker version while retaining the same app assets, so it tests lifecycle/status rather than compatibility between different future lesson schemas.
- **Missing storage and repair:** Deleting a saved image caused readiness to become false on refresh. Downloading again repaired it. The completeness check tests actual asset presence, not only registration existence. Storage can still be cleared later; the visible limits correctly avoid a permanence promise.
- **Scope and unrelated resources:** The worker handles only known same-origin assets under this deployment path; unknown/external requests fall through to the network. Cache cleanup uses the deployment-specific prefix. The suite includes unrelated-cache isolation; I inspected that code/test but did not independently repeat its separate scenario.
- **State persistence:** Offline app files use Cache Storage; existing lesson notes/answers/theme use the unchanged browser storage path. My saved note survived activation and disconnected reload. The reader separately exercised offline grading, saved completion and persistent-profile restart; those are their observations, not a duplicate claim of my own coverage.
- **Necessary user knowledge:** The panel explains that saving needs an initial connection, belongs to this browser/device, can be removed, and does not sync notes to another device. It separately names external source links as requiring internet. It does not require understanding service workers, integrity hashes or byte ranges. Disclosure/reload/connectivity are ordinary browser operations for this audience. Status text, rather than colour alone, carries readiness. The remaining confusion was the operation/readiness distinction in R1/R2, not an additional missing prerequisite.

The primary [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) reference supports scoped secure-context operation, complete installation, waiting updates and activation. [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage), [request integrity](https://developer.mozilla.org/en-US/docs/Web/API/Request/integrity), [HTTP ranges](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests) and [storage quotas/eviction](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) were checked against the implementation and its bounded UI claims. Existing source records link these references; locally fetched copies were inspected during this pass.

## Exact independent coverage and limits

- Opened the actual production preview at `http://127.0.0.1:4173/video-lab/` at 390 × 844/light; opened the panel with Enter and inspected its visible first-use text/layout.
- Used independent real HTTP origins serving the same built files with `Cache-Control: no-store`, not route mocks. Chromium 156.0.8078.4: 1440 × 1000/light and 390 × 844/dark with touch enabled. Firefox 157.0: 1440 × 1000/light. In each: failed initial download/retry; current check/background waiting update; explicit activation; failed newer installation; offline reload; all-manifest hash verification; the three range requests; native source seeking/playback; offline new-tab opening; disconnected update check; missing-file detection/repair; saved-note persistence. All cases had zero uncaught page errors and no horizontal overflow.
- Additional Chromium test against the preserved build: a failed new installation while a prior complete revision remained waiting, as described under R1. Also recorded the rejected disconnected-check variant.
- `npx vitest run src/offline/range.test.ts`: passed, one file and twelve tests.
- Visually inspected my own phone-dark failed-update and desktop-light waiting-update screenshots. Temporary scripts/results/screenshots are `/workspace/scratch/offline-sceptic-*`; the combined-state proof is `offline-sceptic-waiting-install-results.json` and its corresponding screenshot.

I did not edit app code, run the full quality suite, repeat the reader's complete four-theme/player/control sweep, test a physical phone or screen reader, listen to audio, test actual storage quota exhaustion/browser-managed eviction, restart a browser profile, or verify live Pages hosting. R2 and the persistent waiting-note fixes were being built after my preserved baseline tests; final resolution belongs to the independent checker.
