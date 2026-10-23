# All labs CLI — separate built sceptic

Copyright © 2026 Christopher Snow.

23 October 2026. Reviewed the plan, reader candidates and the built preview at `http://127.0.0.1:4173/video-lab/`, then inspected relevant routing, command, grading and storage source. Cross-checked the completed [01-reader.md](01-reader.md); its two findings are disposed of below, with no additional reader finding omitted. Observed bundle **`index-kx2Kn7kT.js`**, running build `7a00f6e`. No application changes or full CI rerun were made. This is focused review of the all-labs conversion, not renewed certification of unrelated deployment, capture or offline behaviour.

## R1 — Uphold, low; corrected quota explanation verified

The original “12 media files” wording did not describe the count once reports and notes became working files. A learner could reasonably expect text reports not to consume that stated media allowance. The limit itself is a documented workspace constraint; there is no basis for demanding unlimited storage.

I independently imported one JSON report and created eleven notes. Attempting the next note correctly failed with the currently built message:

> The workspace holds at most 12 working files plus 12 recipes. Download important work, then use rm to remove an unneeded file.

The source counts non-recipe working files, including reports and notes; help explicitly lists “12 media/report/note files”. The corrected wording and recovery direction match the observed bound. This closes the wording finding in the reviewed build without claiming exhaustive quota/storage-failure testing.

## R2 — Reject as a broken legacy bookmark: `/failure` was not the original section name

The reported `#/module-2/failure` redirects to `#/edit/reference/failure` but does not scroll. I reproduced that behaviour. However, the prior navigation generated its section suffix from `s.kind`; the shared `LessonView` generated `section-${section.kind}`. The existing lesson's actual kind is **`failureExperiment`**, not `failure`. Thus the tested suffix does not establish a lost previously valid bookmark.

Independent fresh 390 × 844 browser pages gave:

| Entered route | Actual result |
| --- | --- |
| `#/module-2/failureExperiment` | Canonical `#/edit/reference/failureExperiment`, scroll Y 7649; target heading at Y 0.266 |
| `#/edit/reference/failureExperiment` | Same correct target and scroll |
| `#/module-0/failureExperiment` | Canonical `#/inspect/reference/failureExperiment`, scroll Y 6895; target heading at Y −0.375 |

Earlier investigation/challenge legacy routes also reached their new command lessons in my review. Adding an informal `/failure` alias could be an optional convenience, but is not a justified regression fix. Source evidence: prior `src/main.tsx` navigation uses `#/${step}/reference/${s.kind}`; `platform/lesson-runtime/src/LessonView.tsx` uses the matching kind-based heading ID.

## Commands and measured checks — independently exercised

- **Executed report:** ran `reference inspect`, saved an actual ffprobe report without `-show_frames`, and checked it. Stream/container criteria passed while picture count and requested PTS failed. Reran with `-show_frames` to a new report: the check passed **120 video pictures**, picture 75 at **76800 ticks / 6.250000 seconds**, and the original stream/container evidence. The report was downloaded as a real JSON file.
- **Imported evidence is distinct:** imported that same valid downloaded JSON in a new context. `check inspect inspect-report.json` rejected it with “Executed evidence is missing for this file.” A convincing report alone is not treated as proof of execution.
- **Different correct spelling:** took the visible join example, changed the encoder preset from `ultrafast` to `fast` and used `independent.mp4`. The real output passed all seven edit criteria: H.264/AAC, **960 × 540**, **4.000000 seconds**, video start zero, **48 decoded pictures**, and maximum reduced-picture RGB RMS **0.417**, below the stated threshold of 2.
- **Wrong order fails despite matching headline numbers:** executed the reversed join to `reverse.mp4`. It retained four seconds, 48 pictures, dimensions, codecs and start zero, but failed the actual picture comparison with maximum RMS **5.472**. This directly supports the claim that the checker examines the output sequence rather than only the command spelling or duration.
- **Provided completion is not executed work:** `reference edit` loaded a labelled provided result. Submitting it to `check edit` failed for missing executed evidence. The successful independent edit's progress remained recorded after this failed alternative.
- **Text work and support:** `note finding.txt "..."` created the requested text; `cat` displayed it. `hint inspect 3` explained selecting video frame entries separately from sound blocks. `progress` reported checked filenames and SHA-256 values, and separately labelled earlier answer-based achievements. I did not seed and revalidate every historical saved-progress permutation.

Source inspection corroborates these observations: actual ffprobe `-o` output is read from the worker and saved with execution evidence; native-style typed FFmpeg argument arrays reach the engine. Edit checks decode the submitted and known-source bytes and compare their reduced picture sequence. This is genuine command-led work. It is not a claim of cryptographic anti-cheat protection against someone manually modifying browser storage, nor that measured media criteria certify viewer understanding.

## Interface and scope

Checked all **seven active pages**—Capture, Build, Inspect, Edit, Publish and both references—at **1440 × 1000** and **390 × 844**, using the application's theme button to verify actual light and dark states. Each page exposed one labelled Command field and no select, numeric-input or range-input exercise controls. All 28 route/size/theme states had document width equal to viewport width. Visually inspected the phone workspace in both themes; the command field, keyboard guidance, run action, status and file disclosure were legible. Real command execution used keyboard Enter. This is focused keyboard/layout evidence, not screen-reader conformance or physical-phone certification.

Reject the broader objections that a command interface must reproduce the removed GUI answer forms, or that real media playback/file/permission controls violate the CLI requirement. The source names, supplied-versus-created distinction, teaching examples and explicit grading criteria remain visible. Long filter graphs are demanding, but the relevant mapping, trimming, timestamp reset, quoting and concat operations are taught before the submitted task.

The demonstrated inspection and edit paths work, including useful failure feedback and a meaningful wrong-output check. R1 was justified and is visibly corrected; R2 does not establish a regression. No additional justified blocker emerged in this pass. The separate checker and full quality gate retain responsibility for final-bundle acceptance, broader lifecycle tests and deployment.
