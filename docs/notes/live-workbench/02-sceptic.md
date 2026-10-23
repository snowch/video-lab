# Independent sceptic review of the working lab

Copyright © 2026 Christopher Snow.

The separate `prototype_sceptic` agent tested both findings in `01-reader.md` against the built working lab on 23 October 2026. The agent did not implement the lab or its fixes. This review concerned real FFmpeg WASM execution, not the earlier simulated HTML prototype.

The served entry was `http://127.0.0.1:4173/video-lab/optional/command-workbench.html`, HTML SHA-256 `27f32597d8c204bb97ad87be124551283629cfcee1d857cfeac48407801fce7c`. Its application bundle was `workbench-Byb8M669.js`, SHA-256 `551533aba1369cdf542f38360d2b762841987ec0fea3805c2d568f931a4a2821`. The builder's pending source changes were not treated as already deployed fixes.

## Findings

| Finding | Decision | Independent evidence and direction |
| --- | --- | --- |
| R1: failure retains a running status and misdirects the learner to the log | **Keep, medium.** | In a fresh Chromium phone-dark context, loaded the practice recording, chose Type command and executed `ffmpeg -i missing.mp4 missing-output.mp4`. The error was `ffmpeg exited with status 1. See its log above.` The page simultaneously said `Running the command. You can cancel it; previous saved files remain available.` Run command was enabled, zero Cancel buttons existed, and the Processing log disclosure was closed below the error (document y≈934). The stale status contradicts the completed failure. Change it to an ended/failed state and locate or open the actual log without discarding the engine's diagnostic text. |
| R2: small-screen source replay needs enlargement guidance | **Keep, low.** | In Chromium at 390 × 844, the real source video had intrinsic dimensions 1280 × 720 but rendered at 358 × 201. At the held result around nine seconds, the configuration text was small in the embedded player. The instruction asks the learner to check that both replacements and final text are readable, but gives no enlargement guidance. A short suggestion to use the player's fullscreen control and landscape orientation is proportionate. It must not promise readability or fullscreen availability on every device. |

No finding was rejected. R2 is a usability aid, not a claim of corrupt media, insufficient source resolution or a need for simulated footage. The screenshot exposes the native fullscreen control; the problem is discovering a useful way to inspect the text. Actual device rotation and fullscreen behaviour were not tested.

## Evidence and limits

The failure reproduction used actual WASM invocation and ended with the engine's status-1 error. Source replay used the actual Mousepad file, not a static recreation. The phone screenshot visibly shows a separate text editor changing the configuration file. Existing recorded native evidence in `media/native-probe.json` and `media/native-trim.json` is consistent with a twelve-second silent H.264 source and six-second silent H.264 output; this pass did not repeat the reader's successful export/native-probe verification or the builder's full offline test.

Local scripts and evidence:

- `/workspace/scratch/workbench-sceptic.mjs`, `workbench-sceptic/failure.txt`, and `workbench-sceptic/failure-phone-dark.png`.
- `/workspace/scratch/workbench-sceptic-source.mjs` and `workbench-sceptic/source-phone-light.png`.

The initial failure harness used an exact button label without the displayed arrow; correcting that selector allowed the real reproduction above. This was a test-harness issue, not an application defect. No JavaScript page error occurred in the final failure reproduction. This sceptic pass verifies the reader's findings; it is not a claim of a complete accessibility audit, physical-device validation, or approval of unbuilt fixes. Both findings require the independent checker to inspect the corrected build.
