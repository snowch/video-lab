# Issue 3 — independent production-build checker

Copyright © 2026 Christopher Snow.

23 October 2026. Checked by the existing independent gpt-6.1-sol checker with high reasoning effort. I did not author this redesign or its fixes. I read `AGENTS.md`, the issue-3 reader/sceptic findings and `05-resolution.md`, then exercised the actual production preview at `http://127.0.0.1:4173/video-lab/`. I changed no application source. This is not a claim of a reviewer with no previous knowledge of Video Lab.

The build changed during this review. The complete first processing path used `index-CqIhzda6.js`; the imported-origin/offline preflight follow-up used `index-Dbqd2QMz.js`. Phone/tablet runtime checks, sparse-input corrections and the newly retained six-second export used **`index-Dt1XsU5h.js`**, SHA-256 **`17592aebf0cca6341ba2bd31717198f75e15633b032b353d35694eebe804e134`**. The later wording-only build is checked in the supplement below. Observations are attributed to those versions rather than treating every earlier check as a final-bundle run.

## Ranked fixes verified

### B1 — Accepted as resolved

With the live selector deliberately set to two pictures per second, I loaded the provided Build example. The actual downloaded file measured **3.000 seconds**, **640 × 360**, with picture and audio streams. The displayed note explicitly identifies its fixed one-picture-per-second, three-second, reduced-resolution settings and says these are independent of the selector. Changing the selector removes the displayed reference instead of pretending it regenerated that file.

The real Build controls separately produced a **3.000-second video-only MP4** at one picture per second, then an actual H.264/AAC result after adding sound. Changing to two pictures per second invalidated the earlier result and disabled adding sound until another video was made; the new video measured **1.500 seconds**. Its saved rate and measured output agreed after reload. The first complete runs were in Chromium and Firefox; the final-bundle phone/tablet matrix reconfirmed the fixed-reference explanation and actual three-second evidence in both themes.

### B2 — Accepted as resolved

I downloaded actual produced recipes from Edit/Publish, not an example JSON. They retain the selected source filename, its SHA-256, kept ranges, `workingInputName`, command arguments and rendered command line. The command's input agrees with `workingInputName`. The page visibly explains how to name the source when replaying the saved command, beside the recipe link in both Edit and Publish.

I also followed that handoff: copied the actual source bytes to the stated working name and executed the downloaded argument array with native FFmpeg. The earlier six-second recipe and the final sparse two-range recipe both reconstructed outputs with the expected streams and duration. The final six-second export and recipe retained below were freshly created and downloaded on the final bundle; its recipe includes the corrected picture-timing pipeline.

### B3 — Accepted as resolved

Build defines a codec within its first encoding explanation, before the result table: “A codec specifies how that data is represented and reconstructed for playback”. It identifies H.264 there, and AAC in the audio-addition explanation. I checked the rendered text beside the first output controls and table, including the final phone/tablet cases. Interpreting the table no longer requires waiting for Inspect's later definition.

### B4 — Accepted as resolved

The measured MP4 tables display “MP4 / QuickTime format family” under “Detected container family”. Their local note explains that these names describe the inspector's format reader and that streams are listed separately. Opening Full measured file information still exposes the actual `mov,mp4,m4a,3gp,3g2,mj2` value. I verified both the readable result and unmodified raw evidence in actual and provided MP4 results. I do not claim a separate WebM-family rendering check from this MP4 path.

## Additional checker finding C1 — medium, fixed and independently rechecked

This review found a real timing defect after the original four fixes. I imported the actual three-second, one-picture-per-second audio/video Build output, selected only `[0,1.25)` and downloaded the edited result. Native inspection showed **2.000 seconds of video but 1.250 seconds of audio**. The source's video picture times were 0, 1 and 2 seconds. Applying output `-r 12` after trimming retained the sparse source pictures' longer holds. This was a pipeline defect, not a selector mistake or a finding waived because a test suite passed.

The builder moved conversion to the 12-picture-per-second timeline before trimming and added separately drafted explanations of repeated held pictures, requested versus measured bounds and sound padding. I independently verified the actual final WASM outputs:

| Browser/input | Requested ranges | Native video duration | Native audio duration |
| --- | --- | --- | --- |
| Chromium, actual 1 fps Build result with sound | `[0,1.25)` | 1.250 s | 1.250 s |
| Chromium, same input | `[0.25,1.5)`, `[2,2.5)` | 1.750 s | 1.750 s |
| Chromium, actual 1 fps video-only Build result | `[0,1.25)` | 1.250 s | No audio stream |
| Chromium, same silent input | `[0.25,1.5)`, `[2,2.5)` | 1.750 s | No audio stream |
| Firefox, actual 1 fps Build result with sound | `[0,1.25)` | 1.250 s | 1.250 s |
| Firefox, same input | `[0.25,1.5)`, `[2,2.5)` | 1.750 s | 1.750 s |

Each result was downloaded and natively probed. Each recipe places `fps=12` before `trim`, identifies the real selected source by hash, and records the actual chosen ranges. Reloading Publish preserved both the measured result and byte-identical downloadable output. Native replay of the final audio two-range recipe also measured 1.750 seconds. A separate tablet-dark actual import/edit produced and retained the corrected 1.250-second result.

The final rendered range and pipeline notes explain 12 fps boundary rounding, possible sound padding and repeated holds without claiming recovered motion. **C1 is accepted as resolved.** The original two-second observation is retained here and in the failed-attempt trace; its temporary MP4 filename was subsequently overwritten by a fixed result, so I do not claim that the old bytes remain available.

## Actual five-step path and persistence

The first complete path succeeded independently in Chromium 156.0.8078.4 and Firefox 157.0 at 1440 × 1000/light:

1. **Capture:** I deliberately supplied a declined-sharing response to exercise the failure/fallback route, then explicitly adopted the original `build-queue.mp4`. The page labelled it provided and kept it as the project source. This was not a successful screen capture or a fabricated recording.
2. **Build:** Actual WASM video creation, audio addition and rate change/retry produced the measured files described under B1. Reading the course and choosing the provided recording had not requested the encoder binaries or optional Big Buck Bunny clip.
3. **Inspect:** After building separate experiments, the default project recording remained the original 10-second source. An actual inspection measured its two streams and duration. The source and experiment were not silently substituted.
4. **Edit:** An invalid zero-length range produced actionable feedback. Correcting it and using the suggested original-source ranges produced an actual six-second H.264/AAC MP4. The working-name explanation and actual recipe were available.
5. **Publish:** I downloaded the finished MP4 and recipe, played the produced file and observed advancing playback, checked a review item, then reloaded. The output, measured probe and download remained. The final-bundle evidence run freshly repeated original-source inspection/edit/export, measured 6.000 seconds and played the file before retaining the evidence below.

The corrected import label was independently verified on the final bundle at phone and tablet sizes in both themes: existing files say **“Existing recording selected from this device”**, rather than “Created in this browser”. An imported actual MP4 persisted after reload. An unsupported `.txt` selection was rejected without replacing the real project source. Subsequent actual editing of an imported file legitimately produced a new generated result.

Provided-only Edit references remained clearly labelled. Viewing one measured six seconds but did not create a project export; Publish said no edited output was available and offered no finished-download link. Cancelling a real Build tool-loading operation retained the source and removed stale results. Clear-project cancellation preserved the selected file; confirmation removed project media while old lesson progress remained.

## Responsive and legacy checks

| Context | Coverage |
| --- | --- |
| Chromium desktop, 1440 × 1000/light | Complete actual path, downloads/native probes, recipe replay, separate saved-tools offline processing; final six-second evidence run |
| Firefox desktop, 1440 × 1000/light | Complete actual path/downloads; final sparse audio cuts/recipes; baseline-only offline failure and connected retry |
| Chromium phone, 390 × 844/light and dark, touch enabled | Capture/Build/Inspect/Edit/Publish controls; fixed reference; import origin/persistence; raw evidence; honest missing export; cancellation/clear checks in light |
| Chromium tablet, 820 × 1180/light and dark, touch enabled | Same five-page reference/import checks; dark additionally performed and downloaded an actual sparse-source edit and retained Publish evidence |

All completed scripted cases reported zero uncaught page errors. Document width matched the viewport on the checked pages, including expanded raw measurement evidence. I visually inspected the retained [phone-dark Build/reference page](evidence/06-checker-phone-dark-build-reference.png), [tablet-dark produced Publish page](evidence/06-checker-tablet-dark-created-publish.png), and [final desktop produced Publish page](evidence/06-checker-desktop-created-publish.png). These are actual built-page captures, not mock-ups.

In both full desktop engine runs I seeded the old public lesson storage schema with completed reference work, visited `#/module-0/challenge` and `#/module-2/challenge`, and observed canonical `#/inspect/reference/challenge` / `#/edit/reference/challenge` routes with both challenges still complete. This tests migration compatibility in isolated contexts, not access to an actual user's browser profile. A final phone-light check also confirmed that clearing new project media did not clear the seeded legacy completion.

## Optional tools and offline boundary

The first complete Chromium run explicitly saved the baseline lessons, then separately downloaded the processing tools. With networking disabled and after reload, actual Build processing still produced the expected 1.500-second file. The binary tools were not silently included in the baseline lesson manifest.

On the subsequent `index-Dbqd2QMz.js` build I independently tested a fresh baseline-only save in Chromium and Firefox. The baseline manifest excluded `encoder/` and `optional/` assets; the extra-tools panel correctly said its tools were not saved. Offline processing failed promptly, in about **89 ms / 128 ms**, with guidance to save the tools, rather than hanging on a worker import. The provided three-second reference still loaded offline. Reconnecting and retrying performed actual video encoding, and the original project source remained available. This predates only the later edit-timing change; I do not relabel it as a repeated final-bundle offline run.

The first-processing size disclosure and separate offline status were visible. The optional comparison clip was not fetched on the required path. I did not independently play that optional clip or repeat the entire offline update/cache matrix during this redesign check.

## Durable actual files and reproduction

These MP4s are actual browser-generated outputs and their actual source, not provided outputs relabelled as processing results:

| Evidence file | Bytes | SHA-256 |
| --- | --- | --- |
| [Six-second final WASM export](evidence/06-checker-created-six-second.mp4) | 151,961 | `40e7421846e15f5bbcd4f412b2208f10eb30e6878b0092ca489c363a84701895` |
| [Sparse actual Build source](evidence/06-checker-sparse-source.mp4) | 59,698 | `fc91e122c552b9f5efda0e87aec50aeb69ff670f9d6d9ba59e6f284fbfa70f58` |
| [Fixed sparse WASM cut](evidence/06-checker-sparse-cut.mp4) | 75,511 | `931d455d93f02e2cdd684c976f688b8863f64f734fbc5f18718a0ff63b62b5ee` |

The [six-second recipe](evidence/06-checker-created-six-second-recipe.json) identifies `public/media/build-queue.mp4` by its actual selected filename and SHA-256. The [sparse recipe](evidence/06-checker-sparse-cut-recipe.json) identifies the selected file as `chromium-muxed.mp4`; its identical retained bytes are named `06-checker-sparse-source.mp4` here. To replay either recipe, copy its matching source bytes to the recipe's explicit `workingInputName`, then execute its saved `command` arguments with FFmpeg. This filename alias is documented rather than left for the reviewer to guess.

[Output provenance](evidence/06-checker-output-provenance.json) records the browser/build identity, exact file sizes/hashes including the JSON recipes, source mapping and native six-second probe. The sparse source was downloaded from an actual one-picture-per-second Build-plus-audio operation, reimported as an existing file and actually edited on the final build. The output timings and codecs were checked with:

```text
ffprobe -v error -show_streams -show_format -of json <downloaded-file>
```

Native recipe replay used `ffmpeg -v error -y` followed by the downloaded `command` array in a directory containing the correctly named source. It verifies reproduction of streams/timing, not a promise of identical encoder bytes across versions.

## Commands, quality attribution and limits

Independent scripts and structured observations remain under `/workspace/scratch/issue3-checker/`:

```sh
node /workspace/scratch/issue3-checker/path.mjs
node /workspace/scratch/issue3-checker/offline-no-core.mjs
node /workspace/scratch/issue3-checker/responsive.mjs
node /workspace/scratch/issue3-checker/sparse-fix.mjs
node /workspace/scratch/issue3-checker/final-evidence.mjs
```

All final completed runs exited 0. Corresponding `*-results.json` files preserve per-context bundle hashes, probes, recipes, widths and errors. Exploratory harness errors included looking for an upload control on Capture instead of Inspect and querying an old page's two probe tables before hash navigation finished. One initial attempt timed out before a lesson heading appeared during the period of rebuilding; its cause was not established and it was rerun on the declared ready build. These are distinguished from the real C1 timing failure above.

I inspected the builder's completed `/workspace/scratch/issue3-final-gate.log`: **50 unit tests**, native fixture verification, production build and **105 passing browser cases (2.1 minutes)**. The builder reported full-command exit 0. I did not run or claim that full suite as my own; earlier failing/intermittent runs remain in the builder's resolution record. Firefox recording negotiation/finalisation and the real virtual-desktop capture evidence belong to the builder's separately recorded checks; I did not duplicate their diagnosis or independently verify OS capture success.

Limits: browser/touch emulation, not physical phones/tablets, a screen reader or another viewing device. Playback used actual media elements and files, but audible quality and every native player menu were not assessed. Capture denial was deliberately supplied; no actual OS sharing chooser or microphone/system-audio success is claimed. I did not run the full quality entry point, exhaust real storage quota, certify arbitrary codecs/files, test Safari/WebKit or verify public deployment. A readable screenshot and a successful probe do not certify the exported story for another viewer.

B1–B4 and the additional C1 are accepted as resolved within the directly observed coverage. No remaining independent-review blocker was found on the final build. Public deployment verification remains separate.

## Final wording-only supplement

The builder subsequently corrected one historical reference phrase without changing processing. On `index-B4v3e-nW.js`, SHA-256 **`ff52bb6f25933f51c5b5f569241b454baf983520c6538065768c3e4f61560d86`**, I independently opened `#/edit/reference/motivation` at 390 × 844. The visible paragraph now says the sample is “a separately encoded version of the provided original build-queue recording, made for comparing cuts”. It no longer calls it the “Module 0 recording”, which could refer to the learner's newly captured project. Document width remained 390 pixels.

`node /workspace/scratch/issue3-checker/prose-final.mjs` exited 0; `prose-final-results.json` records the exact rendered paragraph and fetched bundle hash. This is a narrow rendered-text check. Actual processing/files/recipes above retain their exact prior bundle provenance. The builder is repeating the full quality command for this wording-only build; I do not claim that later run complete before its result is available. No additional independent-review blocker was found.

## Post-deployment update-control robustness supplement

The subsequent Quality CI failure timed out waiting for the first tab to navigate after selecting Reload. The builder reported that Pages' separate full gate passed, but that does not erase the Quality failure. The failing CI trace could not be downloaded because the artifact endpoint returned a proxy CONNECT 403. I have not established the intermittent failure's cause.

Before the fix I instrumented the unchanged production worker and document in the actual staged-update HTTP fixture. Four deliberately varied cases—two ordinary clicks after opening another tab, an explicit foreground click and keyboard Enter—each posted ACTIVATE and reloaded both tabs. Both tabs reported `visibilityState="visible"` and `hasFocus()=true`, including the ordinary cases. One observed click posted ACTIVATE in the same tick and reached both controller-change/reload paths approximately 77 ms later. These passes do not support a foreground-tab diagnosis and do not prove the failed CI case harmless. The old handler's optional chained, unacknowledged message did permit a silent no-op if the waiting worker disappeared; that source-level robustness gap was real, without proof that it caused the CI failure. Read-only instrumentation, events and traces remain under `/workspace/scratch/issue3-checker/update-race/`.

I independently reviewed the replacement source in `OfflineAccess.tsx`, `client.ts` and `worker.ts`, without authoring it. Reload now obtains a fresh scoped registration, exposes a busy activation state, and uses a helper that requires both a positive acknowledgement and a changed controller, with a ten-second activation timeout and listener/channel cleanup. The worker acknowledges accepted `skipWaiting()`. Failure refreshes availability and enables retry; a fresh registration with no waiting worker but an active worker explicitly reloads. A shared ref guards duplicate explicit/global reload requests. The existing global controller-change handler can itself reload when new control arrives, so acknowledgement is the helper's contract, not a claim that every actual reload waits for an acknowledgement.

The built bundle checked was **`index-YA4xirVA.js`**, SHA-256 **`e29c4816704e6798c4d0bd56ed3652e15f0b6cb1f1fe5e982e6a2ce5dd0d6e57`**. I independently executed:

```sh
npx playwright test tests/offline.spec.ts --grep 'updates wait for a complete copy' --project=phone-light --project=phone-dark --project=firefox --output=/workspace/scratch/issue3-checker/update-activation-tests
node /workspace/scratch/issue3-checker/update-activation/check.mjs
```

The first command passed **3/3 cases in 40.1 seconds**, with no retries. It deliberately dropped the first ACTIVATE message, observed the rendered switching status and disabled Reload button, waited for the recoverable failure, then used keyboard Enter to retry. Both tabs navigated, the new release cache became active, saved notes and an unrelated application's cache survived, and offline playback worked. The case also retained the disconnected-check and waiting-update/later-failed-download coverage. These are my executions of the builder's regression, not independently authored test assertions.

The separate checker script used the same actual built assets with revision substitution in the real HTTP fixture, and independently injected **one negative acknowledgement** (`ready:false`) rather than a lost message. Chromium at 390 × 844 in light and dark, and Firefox at 390 × 844 in dark, all showed the failure text and retained the multi-tab update explanation, with an enabled retry control. Each keyboard retry then reached the genuine worker, reloaded both tabs and selected the release-2 cache. The note and unrelated cache remained. All three cases had zero uncaught page errors and document width exactly 390 pixels. Negative acknowledgement surfaced in 92–110 ms in these runs; those measurements are not a timeout guarantee. Structured results, full traces and native-message/controller event logs remain under `/workspace/scratch/issue3-checker/update-activation/`.

I visually inspected the actual [Chromium phone-light failure state](evidence/06-checker-update-rejection-phone-light.png) and [Firefox phone-dark failure state](evidence/06-checker-update-rejection-firefox-dark.png). The failure, retained update explanation and both enabled controls are readable and rendered without horizontal overflow.

Accepted within this focused coverage: the silent activation path now has visible progress, bounded failure and working keyboard recovery; genuine activation updates both tabs while preserving saved work. No new independent-review blocker was found. Limits: browser-emulated devices; no reconstructed CI failure or original trace, no physical background-tab suspension, and no independent whole-course/media rerun or public deployment check for this supplement. Fresh-registration branches for a missing registration or a worker already activated elsewhere were source-reviewed, not separately injected in the browser. The builder's new full quality gate and post-deployment CI result remain separate, pending evidence; this supplement does not declare those gates green or identify the original race's cause.
