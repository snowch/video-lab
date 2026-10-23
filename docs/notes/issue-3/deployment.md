# Issue 3 — public deployment verification

Copyright © 2026 Christopher Snow.

## First implementation release

Application commit `10624f0bee13b59ea33782690cb91d201f53aa30` deployed to <https://snowch.github.io/video-lab/> on 23 October 2026. [Pages run 39938982535](https://github.com/snowch/video-lab/actions/runs/39938982535) passed its complete quality gate and deployment. The independent [Quality run 39938982742](https://github.com/snowch/video-lab/actions/runs/39938982742) passed 50 unit and 104 browser cases but failed the intermittent two-tab update navigation case. That failure is retained; a successful Pages build is not described as both workflows passing.

Live Chromium passed all four journey cases. Live Firefox passed all four after importing the workspace proxy's trusted CA into an isolated browser profile; its initial certificate-trust failures were test-environment failures, not an app assertion failure. TLS verification remained enabled. The eight passing cases include actual video creation/audio mux/probe, changed-rate rerun, source and sparse-picture editing, downloads/recipes/persistence/playback, real MediaRecorder test-surface bytes, failure/cancel/retry, legacy work, baseline-only offline fallback and separately saved offline encoding. Actual generated downloads were independently checked with native ffprobe.

A separate headful Chromium run used genuine getDisplayMedia and MediaRecorder against the virtual X11 desktop with an automated chooser. It recorded the public build-queue scene, performed Sort, held the result, stopped every track, replayed and downloaded actual VP9 WebM. That actual file was then imported on the public site, genuinely inspected and edited with two kept ranges, published, downloaded, reloaded and played as a silent H.264 MP4; native ffprobe measured 3.750 seconds. This is virtual-display API verification, not a physical chooser/device claim.

A persistent Chromium profile downloaded and reloaded the old deployed course offline before deployment. After deployment, Check for updates → Reload replaced the old cache and preserved a localStorage marker. The upgraded reading-only copy reloaded offline, promptly explained missing processing tools and loaded the honest three-second provided reference. The optional Big Buck Bunny remained unrequested until its explicit click, then played as five seconds with visible attribution. Home/Capture did not request the core or optional clip. The public app asset matched the locally checked `index-B4v3e-nW.js` hash recorded in [runtime evidence](runtime-evidence.md).

## Update robustness follow-up

Source inspection confirmed a silent-failure gap in the old update action; the exact original intermittent CI cause remains unproved. The follow-up adds a fresh registration, bounded receipt/control confirmation, explicit pending/failure states and a working retry. [Ranked resolution](review/05-resolution.md), [sceptic](review/04-built-sceptic.md) and [independent checker](review/06-checker.md) distinguish the confirmed gap from that unproved cause. Additional local and public release results follow once the reviewed update build has passed and deployed.

Public diagnostic commands ran from the repository working directory using the normal managed proxy/trust chain:

```sh
npx playwright test --config /workspace/scratch/issue3-live.config.mjs
node /workspace/scratch/issue3-live-capture.mjs
node /workspace/scratch/issue3-live-own-edit.mjs
node /workspace/scratch/issue3-upgrade-finish.mjs
node /workspace/scratch/issue3-live-optional.mjs
```

The scratch configuration changes only hosting/proxy/profile trust and output locations; the four enduring journey cases are `tests/journey.spec.ts`. Original failed attempts and passing Chromium/Firefox rerun logs remain under `/workspace/scratch/issue3-*`. Physical phones/tablets, Safari, audible quality, Windows/macOS capture execution and universal external-player support remain outside the executed evidence.

## Final verified release

Application commit **`c8521671d34e275ed7873c7d3e5fe724282d2393`** passed both [Quality checks 39941781209](https://github.com/snowch/video-lab/actions/runs/39941781209) and [Pages 39941781226](https://github.com/snowch/video-lab/actions/runs/39941781226), including full quality validation before successful deployment. The final local gate passed **54 unit tests and 105 browser cases**. The public app matches `index-YA4xirVA.js`, SHA-256 `e29c4816704e6798c4d0bd56ed3652e15f0b6cb1f1fe5e982e6a2ce5dd0d6e57`.

The four public journey cases passed in each browser. Seven passed in the combined final run; Chromium's full-path case encountered an HTTP503 for `media/module-2/encode-3-0.jpg` during baseline download. The UI reported failure rather than false readiness. The asset subsequently returned200, and the targeted full-path rerun passed, including actual offline processing. These are recorded as separate runs rather than claiming an initially clean eight-case run.

The new public update UI was additionally tested in Chromium and Firefox. In each isolated context, registering a query-versioned copy of the actual same-origin worker created a real waiting worker. Deliberately dropping the first activation message produced the pending and failure states; keyboard retry activated the genuine worker, reloaded both tabs and preserved a saved marker. This changes only isolated browser registrations, not server files.

Real public getDisplayMedia capture was repeated on the final build; all tracks ended and the actual WebM replayed/downloaded. Its actual bytes then passed public inspection, two-range editing, Publish download, recipe/source hash, persistence and playback, with native ffprobe measuring the new H.264 output at **3.750 seconds**. [Machine-readable verification](public-verification.json) records exact source/output sizes, hashes, clocks versus packet evidence, commands and environment limits.

The old persistent offline profile completed its transition to the new `Es9JGUdJWORxS8c+BnW9eY5fFE9Lx0Rno2fX0YDR5+A=` cache, removed the prior cache and kept its marker. An initial verifier read raced the successful reload because old/new home links were identical; reopening the profile independently confirmed the new bundle/cache and preserved data, then passed offline reload, missing-tools error and supplied-reference playback. Both public optional-media/bundle-hash checks also passed.

The implementation, independent review, full local/CI checks and public deployment requirements for the initial path are complete. Advanced modules remain honestly planned. A final documentation-only record commit uses `[skip ci]`: it changes no app, worker, media, dependency, build or test input; the deployed application commit and exact tested hash remain those above.
