# Independent built-page learner review — App status

Copyright © 2026 Christopher Snow.

A separate reader inspected the actual built application without editing app source, tests or builds. Read AGENTS, the issue, the fact brief and separate prose brief; formed the browser assessment independently of the author's test verdicts. Standalone browser harnesses and raw observations are under `/workspace/scratch/issue6/reader/`. The first reviewed A build was `7d8c20297ad531424278cba6c7b4b07261938b45b63ff85cc4e3cfc6c7a94735`; the genuinely built second asset set was `97558bcce476ce42e9ccda638b5e20603d3f64a4e9c8977ada7fffc758194261`. No bundle text or worker-version substitution was used.

## Retained findings

### R1 — empty storage-limited workspace cannot restart (medium)

Actual browser reproduction: make `IDBFactory.open` throw `InvalidStateError` from startup, open a fresh empty `#/capture` workspace, detect and prepare the second real build, then choose **Restart to update**. There are no imported/generated files, notes or edits to lose. Nevertheless the panel always reports: “Restart could not finish. In every Video Lab tab or window, finish processing and typing, and save or download any unsaved work.” The user has no such work to save and cannot complete the offered action.

The main workspace guard requires `project.persistent` even when its records are empty. This turns unavailable storage into a permanent restart veto rather than protecting actual unsaved work. Suggested direction: distinguish storage capability from non-durable user content and pending writes; allow an empty online workspace to restart while retaining guards for actual unsaved/session-only work. Inspect the equivalent workbench guard as part of the fix; only the main-course reproduction is claimed here. Evidence: `empty-storage.mjs`, `empty-storage-results.json`, `empty-storage.log`; `evidence/reader-empty-storage-restart.png`.

### R2 — re-download after removal can silently do nothing (medium)

Actual independent reproduction of the author's candidate: save lessons using the retained `DOWNLOAD` protocol, complete the save with **Resume download**, choose the practice source, enter a reference note, remove the offline copy, read the retained note, then choose **Download for offline use**. The panel remains at “Not saved for offline use” with an enabled Download button and no failure or progress message. A live registration inspection returns no registration, although the page still has an activated controller; there are no page exceptions. The requested recovery did not happen.

The sequence reproduced on its first iteration. Simpler fresh Download → Remove → Download loops passed eight of eight iterations, and a variant which downloaded the retained generated file before re-downloading also passed. That difference is evidence of a lifecycle/timing issue, not grounds for rejecting the failing sequence. Suggested direction: coordinate removal, controlled-registration lifetime and subsequent saving as one recoverable lifecycle; expose an operation in progress and fence stale readiness responses. Verify the exact legacy/reference-note sequence and quick retry, not only a delayed fresh save. The root cause is not established by this review. A later author trace observed a second register call returning an activated worker, actual asset downloads and then no live registration; that evidence does not support asserting that every failing click was discarded by a busy guard.

Evidence: `remove-legacy.mjs`, `remove-legacy-results.json`, `remove-legacy.log`; `evidence/reader-remove-redownload-race.png`. Passing comparison sequences are in `remove-race-results.json` and `deep-results.json`.

### R3 — Later is not retained across closing all windows (medium)

Prepared the genuinely built B release from a complete A save, chose **Later**, confirmed the closed control still displayed Update ready and the running identity was A, then closed every app window and the persistent Chromium browser process. Relaunched that same profile with the network disconnected. Without ever choosing Restart to update, the newly opened app ran B (`97558b…`) instead of A (`7d8c20…`).

The observed transition is consistent with a waiting worker naturally activating once its old clients close and selecting any prepared snapshot on activation. That browser lifecycle is normal, but the issue requires activation only on an explicit restart action, so preparation/defer and permission to switch need distinct durable state. Suggested direction: retain the selected A snapshot until an authorised restart, including when the browser itself activates the newer worker; then prove closing/reopening after Later retains A and a subsequent explicit Restart selects B. The sceptic should assess this against the requested contract rather than treating normal worker activation itself as a defect.

Evidence: `natural.mjs`, `natural-results.json`, `natural.log`; `evidence/reader-deferred-after-all-tabs-closed.png`.

## Browser evidence and learner experience

Reviewed both the main source lesson and standalone workbench in fresh Chromium contexts at 390 × 900 and 1280 × 900, light and dark, with reduced motion requested. All eight contexts kept the closed running identity visible, separated Version and Offline access when open, and reflowed at 200% root text size without document overflow. Reading/checking did not request encoder assets. The confirmation dialog opened, Escape dismissed it, and focus returned to its trigger. Screenshots are `evidence/reader-{390,1280}-{light,dark}-{course,workbench}.png`.

Actual touch taps and keyboard Enter were separately used on the overview, recording appendix, controlled inspection reference and standalone entry. The same control was available on all four, the keep/remove confirmation returned focus, and no document overflow occurred. The relevant status nodes expose polite live regions. This is DOM/keyboard/touch-automation evidence, not a claim of listening to a physical screen reader.

A real HTTP origin served the two built directories. A complete A save detected B, prepared it with actual verified-byte progress, deferred with a visible Update ready badge, then explicitly restarted two open course windows onto the same B identity. Each retained its route; the inspection draft remained exactly `ffprobe mousepad-demo.mp4`. No automatic reload occurred while the two windows remained open. The updated copy then reloaded offline and ran actual WASM ffprobe on the retained twelve-second source. See `review.mjs`/`results.json` and deferred/offline-probe screenshots.

A separate persistent Chromium profile downloaded the full copy, generated a one-second file and removed the offline assets. The retained generated file had the same SHA-256 before and after removal: `36cc9ecb11397848d8af70521ea10677e9c1bdb1720736da36b08cd7e63d56d3`. Its sibling cache and sibling answer key remained; cache enumeration immediately after removal contained only that sibling cache. After a successful re-download, the browser process closed and a new persistent browser process launched with network disconnected. The source replayed; actual WASM ffprobe and FFmpeg worked. Native ffprobe of the downloaded fresh-offline output reported 1.000000 seconds and fifteen pictures. See `deep.mjs`/`deep-results.json`, `fresh-offline.mp4` and `evidence/reader-fresh-offline.png`.

Chromium's actual origin quota was lowered through the debugging protocol to provoke a cache-write failure, then raised to allow retry. The first download did not falsely claim availability; retry completed. A separate real download was cancelled, offered Resume download and completed when resumed. Lowering quota after a complete A save caused B preparation to fail, while A remained verified complete and usable through an offline reload. These were actual cache operations and worker progress, not scripted percentages or a mocked processing engine. See `failure.mjs`/`failure-results.json` and quota/cancel screenshots.

## Observations, rejected concerns and limits

When a prepared update is pending and the connection disappears, the primary status remains Update ready and the panel explains that an internet connection is needed to check the published version. Offline availability is shown separately. The exact Cannot check for updates label is not the primary pending label, but this did not make an Up to date claim; I did not retain it as a user-impact finding.

The app describes restart effects before the action and keeps native FFmpeg and external links outside browser-offline guarantees. Install guidance remains conditional and separate from saving the app. A real operating-system installation was not performed.

This reader did not run the full quality gate, Firefox, physical Safari/iPad/Android, assistive audio, public deployment, every unsaved-input path or the active-FFmpeg restart veto. Those need their own author/checker evidence. The empty-IDB failure above is an explicit injected storage condition. No claim that source inspection alone proves browser behaviour is made.
