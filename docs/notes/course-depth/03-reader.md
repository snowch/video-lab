# Independent learner review — course depth and chapters

Copyright © 2026 Christopher Snow.

Read the actual built course as an engineer familiar with terminals, files and browsers but without prior media knowledge. Reviewed `course-Bi-g2D0H.js`, SHA-256 `6a43a001687b9cbb0fd90febbcf7b184da7e084fa2735cad6fef49b0ed85b4f8`. I made no application-source changes. This report assesses learning preparation and observable behaviour; passing controls alone is not evidence that the teaching is complete.

## Coverage

Read all 31 rendered main-course lessons in sequence: source 3, inspection 5, editing 12, building 8 and export 3. The actual paragraph/command/guide capture is `/workspace/scratch/course-depth/reader/content.json`. The shared five titles and numbers match the overview and chapter navigation. References and planned topics are separate. The source brief, explicit technical/editorial distinction and independent reviews make the purpose substantially clearer than a list of tool commands.

Fresh Chromium contexts at 390 × 900 and 1280 × 900 in light and dark independently exercised the source choice, keyboard timing slider, frame-rate selection and explicit calculation reveal, all three real comparison clips, all five progressive hints, persistent review reload/download, and conditional installation prompt/instructions/installed states. The supplied clips actually played with measured browser durations 4, 7 and 3 seconds. Merely reading and operating those models made no encoder-asset requests. No page exceptions occurred in these completed control runs.

In phone/light I additionally wrote and executed `ffmpeg -i mousepad-demo.mp4 -ss 1 -t 7 reader.mp4`, downloaded the actual result through Files and independently inspected it with native ffprobe: H.264, 7.000000 seconds and 105 pictures. Review text survived reload and its actual text download contained the entered review in all four contexts. Representative screenshots are `evidence/reader-controls-*`; I inspected the phone/light and desktop/dark images directly. The all-lesson 200% phone survey found the overflow below; it is not reported as an all-state pass.

## Findings

### R1 — medium: sequential navigation leaves an orphaned rate diagram

After traversing Build through its final practice lesson, leaving it and returning to the rate lesson produces two identical “Give three pictures a schedule” figures inside the task panel. A fresh direct visit has one. The duplicate controls are not an extra learning exercise and make it unclear which calculation is active. The captured DOM and screenshot are `/workspace/scratch/course-depth/reader/duplicate.html` and `duplicate.png`.

Source inspection supports the cause: TeachingVisual and PracticeGuide use the same sibling key for the Build practice task. Give distinct component identities and verify the actual sequential route path, rather than only fresh deep links. This is a built behaviour finding; the suggested implementation direction is not a claimed fix.

### R2 — medium: the first filter composition lacks a smaller worked bridge

The editing chapter defines encoding, colour storage, selection, ranges and clocks, but then first composes them in the full join. “What FFmpeg encoded” introduces `-c:v libx264`, yet its executable example only probes the earlier cut. Colour, selection, ranges and clock lessons have no new executable example; their editor retains the earlier probe. The first joined command introduces a two-branch `-filter_complex` graph with trim/reset, concat, labelled output mapping, audio omission, encoder and pixel format together.

The definitions are mostly intelligible, including “setpts=PTS-STARTPTS subtracts the range's first timestamp,” but the learner has not observed that filter/clock operation in a small complete example before composing it with the others. A verified single-range bridge with a measured/replayed result, or deferring unrelated options until they are necessary, would distinguish definition from demonstration and practice. Do not add a pointless exercise for every flag; bridge the actual first composition.

### R3 — medium: a format-family token overflows phone text at 200%

On `#/inspect/lesson/picture`, the paragraph containing `mov,mp4,m4a,3gp,3g2,mj2` extends the 390-pixel document to 431 pixels at 200% root text size. The paragraph's client width is 350 pixels and its scroll width is 411. Its element bounds remain inside the column; the long text itself escapes. Reproduction and screenshot: `overflow-reader.mjs` and `reader-overflow.png` in the scratch directory. Permit long technical tokens to wrap in lesson prose or present the family in a wrap-safe form.

### R4 — minor: several new paragraphs repeat the existing explanation

“Read picture details” already asks “Replay your source at the intended viewing size” and explains codec versus container. Its added paragraphs again distinguish stored dimensions from readability and repeat the same viewing-size and codec/container instruction. “Start each range's clock at zero” repeats source-clock retention and the reset-to-zero explanation across the old and added paragraphs.

On a phone this adds scrolling without a new causal step or observation. Merge overlapping paragraphs and spend the space on the worked bridge or an informative model rather than retaining additive paraphrases.

### R5 — minor: a prediction is answered before the learner can try it

“Double the picture rate” asks “Predict the duration before running,” then immediately states “At two pictures per second, three pictures last 1.5 seconds.” The new rate diagram correctly waits for an explicit calculation reveal, but this adjacent worked step still prints its prediction answer upfront. Move the answer to a reveal/post-run comparison, or describe the step honestly as a worked explanation instead of a prediction.

### R6 — medium: the comparison action is squeezed beside an empty action card

On desktop, “Compare what each cut explains” places its real player in the narrow instruction column, around 386 pixels wide, while the roughly 694-pixel command card beside it is mostly empty with its command controls collapsed. The software text being judged is consequently much smaller than the available page width permits. See `evidence/reader-controls-1280-dark.png`. The phone player uses its available width; this is chiefly a desktop allocation issue.

Make the comparison player the primary action in the action column, or give this viewing lesson sufficient width while keeping explanation nearby. Fullscreen is available, but it does not justify leaving the larger main action area unused while asking learners to judge readability.

## Learning assessment and limits

The chapters now connect editing decisions to context, action, reading hold and viewer evidence. Build has a coherent concrete sequence from supplied pictures through rate, measured output, changed rate, separate sound and muxing. Export correctly separates reported technical properties, outside-player checks, viewer judgement and repeatable handoff, and allows unavailable checks to remain pending. Reference prerequisites and the independent source identity remain clear. The editing composition bridge and repeated prose are the remaining substantive teaching issues; more labels or successful command execution would not resolve them.

Initial broad-survey scripts stopped on findings and on a selector collision caused by the actual duplicate diagram. An early route/heading race labelled the overflow as the timing URL; the corrected independent reproduction establishes the picture-details paragraph. Those incomplete scripts are not counted as four full all-lesson/zoom passes. The completed content crawl and four fresh control contexts above are separate evidence. Reproduction: `reader-content.mjs`, `reader-controls.mjs`, `reader-controls.log`, `reader/controls.json`, plus the finding-specific DOM/log files.

I did not run Firefox, the full quality gate, offline download/update, physical OS installation or public deployment. The separate sceptic must challenge these findings; builder fixes and a checker on the final built page are still required.
