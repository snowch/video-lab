# Issue 3 — independent built learner review

Copyright © 2026 Christopher Snow.

23 October 2026. Reviewed the preview at `http://127.0.0.1:4173/video-lab/`, home → Capture → Build → Inspect → Edit → Publish. Read the requested implementation plan and fact brief, then attempted the learner flow without reading lesson implementation or tests. Assumed ordinary browser/file/basic-code skills and no media vocabulary. This reviewer previously reviewed the outline and old course; this is a fresh encounter with the redesigned built interface, not a claim of no prior involvement.

The main session loaded `assets/index-CrYeGO8Z.js`. A later fresh touch-context fallback session loaded `assets/index-zP4d6wwk.js`. The builder was changing files concurrently. Findings below describe the observed versions; announced fixes are not counted as verified merely because the builder reports them.

## Outcome

The actual processing path succeeded. After the headless browser declined screen sharing, I adopted the explicitly labelled provided original, ran real picture encoding and audio addition, changed the rate and reran, inspected the original source, created the suggested edit, and downloaded its MP4 and recipe. No required media decision on that path depended on guessing an untaught fact. The independent source/experiment distinction, timing explanation and intention-led inspection resolve the main outline concerns.

Two medium issues affect the supplied-reference explanation and recipe reproducibility. Two small terminology issues affect the first measured table. There was no processing blocker in this run.

## Findings for sceptic review

### B1 — Medium: the provided Build example does not match the currently taught timing, without explaining the difference

In a fresh mobile/touch context, Build defaults to **1 picture per second**, with output intervals **0–1, 1–2, 2–3 seconds**. It explains: “At one picture per second, the three supplied pictures occupy successive one-second intervals.”

Tapping “View the provided build example” displays `provided-with-audio.mp4`, **1.495 s**, **640 × 360**, **57,171 B**. Its only relationship explanation is: “This example was generated in advance. It supports reading and comparison when processing is unavailable; it does not show that your browser completed the operation.” Nothing states its different fixed input settings or explains why this example lasts about half the taught three seconds.

A learner using the fallback cannot reconcile that duration with the rate/count rule from the preceding paragraph. Give the provided example its actual rate/settings and a clear relationship to the live controls, or use a reference that matches the displayed default. The ordinary created output correctly measured 3.000 s, so this concerns the fallback explanation, not the live encoder.

Evidence: [default rate](evidence/reader-build-rate1-phone.png), [reference duration](evidence/reader-build-reference-duration-phone.png). Observed in `index-zP4d6wwk.js`.

### B2 — Medium: the downloaded recipe uses an unexplained different input filename

The original recipe download identifies `source: "build-queue.mp4"` and its SHA-256, but both `command` and `commandLine` read `capture.mp4`. The Publish disclosure likewise starts `ffmpeg -i capture.mp4`. The downloaded source has its original name; no visible instruction or field in this recipe explains the substitution.

The learner can understand the saved ranges, but cannot directly rerun the promised recipe against the downloaded source without guessing a rename or command change. Explain the internal working filename and how it maps to the named original. The source hash and ranges are good counterevidence: provenance is present, and the actual browser edit succeeds. This is a reproducibility handoff problem, not evidence of processing the wrong file.

Evidence: [original downloaded recipe](evidence/reader-original-edit-recipe.json). Observed in `index-CrYeGO8Z.js`. The builder subsequently reported a mapping field and explanatory text; a separate checker must verify the newer download.

### B3 — Low: “codec” first appears in Build's result before its explanation

The first video-only result lists “Picture codec — h264” and “Sound codec — No audio stream found”. Build has defined encoding, stream and container but not codec. The useful definition arrives later, after running Inspect: “A codec specifies how that stream's data is represented and reconstructed for playback.”

Move or briefly repeat that definition where Build first asks learners to inspect its output. The learner need not choose a codec to complete the experiment, and can understand the audio-presence change without decoding `h264`, so severity is low.

### B4 — Low: the raw format-family string needs interpretation

Both Build and Inspect label `mov,mp4,m4a,3gp,3g2,mj2` as “Container format”, while the task says the learner created an MP4. There is no explanation of whether these are multiple containers in one file, alternative names or an inspection-tool family.

Keep the actual evidence, but explain its meaning near the learner-facing format result. This is especially useful in the lesson that first distinguishes a container from its streams. The `.mp4` filename and explicit MP4 task provide enough guidance to continue, so it is not a blocker. The reference-duration screenshot also captures this label.

## Actual learner trace

| Step | Observed action and result |
| --- | --- |
| Capture | Read initial state → Sort → readable hold; optional shared audio explicitly does not mean microphone narration. Start produced the useful failure “The browser may have declined sharing or could not record the selected surface. Try again, or choose the provided recording.” Adopted provided `build-queue.mp4`; no claim that I recorded it. |
| Build: video | Explicit Create produced `video.mp4`, **3.000 s, 32,198 B, 960 × 540, h264, no audio stream**. The page calls it created in this browser. |
| Build: audio | Add synthetic sound produced `demo.mp4`, **3.000 s, 59,698 B, h264 + aac**. The prose distinguishes encoding sound from copying the existing video and muxing streams. |
| Build: change/retry | Keyboard changed rate to 2; previous audio result was invalidated. Create produced a new video-only file, **1.500 s, 27,543 B**, agreeing with the half-second intervals and duration explanation. |
| Inspect | Default source was still the original Capture recording, not the filmstrip. Actual probe reported **10.000 s, 128,737 B, 960 × 540, h264 + aac**. The page explicitly says no audio need not be a fault and measurements do not certify readable text. |
| Edit | Inspected the source again when the page requested it. Used suggested **[0,2), [3,7)**; actual result `edited-demo.mp4` reported **6.000 s, 151,961 B, 960 × 540, h264 + aac**. Source/output ranges and resetting segment clocks were explained. The new short lossiness explanation makes the copy/re-encode trade-off intelligible. |
| Publish | Clearly labelled “Created in this browser”. Downloaded MP4 and JSON recipe successfully. Native preview advanced to **3.46 s of 6 s** without error and showed the sorted result. Checklist asks about actual action, readability, intended sound, size and playback elsewhere; it correctly says inspection cannot certify these. [Visible result](evidence/reader-created-edit-desktop.png). |
| Provided-only path | Fresh context could tap the Build and Edit reference buttons. Publish with no created edit said “No edited output is available” and directed return to Edit/review of the labelled reference. It did not invent a learner export. This is an honest evidence-only path, though it does not constitute a produced-demo capstone. |

## Reading and interaction observations

The source handoffs are clear: Build explicitly says “not a conversion of your recording”; Inspect returns to the project recording; retained detailed references are separately labelled. The three stills are correctly described as initial state, sorted result and later hold, not as continuous action. Static filmstrip labels explain source versus output time and change with the rate. A real rerun gives the control a visible consequence.

Reviewed desktop at 1440 × 1000 and phone at 390 × 844, in light and dark. Inspected Capture's audio/record controls, Build's filmstrip/schematic/rate controls, Inspect's intention prompts/source selector, Edit's range fields, and Publish playback/download area. Text and form labels remained readable; inspected mobile pages had a 390-pixel document width, without horizontal overflow. Small source-picture text remains small on phone, but timing and control explanations are separate readable text. Screenshots beyond retained evidence remain in `/workspace/scratch/issue3-reader/`.

Used keyboard selection for the rate and a mobile touch-emulated context for reference/navigation taps. This is not physical-device certification. No real OS capture chooser was available, so successful capture and actual microphone/system-audio behaviour are unverified here. The original recording was provided, but its encoding/editing operations were actually run. The built preview, not another external player/device, supplied the playback observation. Full CI, exhaustive old-reference checks, cache/cancellation stress tests and source-code review were outside this learner pass.

## Handoff

Keep the original observations above for the separate sceptic and checker. The builder reported subsequent changes to recipe filename mapping, initial download-size notice, capture metadata and retained Publish measurements. The fresh fallback session did visibly show the new 32.4 MB first-run notice; the other announced changes are not independently certified by this report.
