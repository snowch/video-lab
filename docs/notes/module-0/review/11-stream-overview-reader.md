# Independent learner review — first stream overview

Copyright © 2026 Christopher Snow.

Reviewed 17 October 2026 by the independent reader from `01-reader.md` (gpt-6.1-sol, high reasoning effort, per parent-recorded settings). I did not author this component. Scope is the new `StreamOverview` in the built Prediction section at `http://127.0.0.1:4173/video-lab/#/module-0/prediction` and the existing prediction controls. I inspected the rendered page, screenshots, `src/StreamOverview.tsx`, `src/content/stream-overview.strings.ts`, fixture mapping and media-generation evidence. No author rationale or sceptic report was read for this follow-up.

No supported finding requires a product change in this narrow review. The observations below identify the evidence for that assessment; “none” means no issue severity is assigned.

## Learning substance and wording

**Severity: none.** The definition “A stream is a sequence of related media data inside a file, such as pictures or sound” is immediately supported by “Pictures and sound in one file”. A single outlined area headed “Sample file” and `build-queue.mp4` encloses separately labelled “Video stream” and “Audio stream” lanes. “Selected pictures in display order”, the increasing visible times and “Time moves from left to right” give the picture sequence an explicit order. The sound lane remains separate inside the same boundary. The figure does not require codec names, sample counts or timestamp-tick vocabulary. **Direction:** retain the containment, lane labels and explicit ordering when maintaining this figure.

## Factual and representational accuracy

**Severity: none.** The displayed pictures are actual fixture assets at 0, 4 and 8 seconds, selected through `fixture.filmstrip` and `frames`; all three loaded in each viewport/theme case. The text says “selected”, so the wide time gaps do not imply these are adjacent frames. The same fixture contains video and audio streams. “Quiet synthetic tone” agrees with the generation script's synthetic sine input and volume reduction.

The caption says: “The sound band illustrates a separate stream over time. This diagram does not show the arrangement of data inside the file or measure the changing sound level.” The rendered audio lane is a plain band with a text label, without waveform peaks, decoder blocks or byte offsets. The enclosing outline therefore reads as conceptual membership rather than a claimed measured file layout. **Direction:** retain the local explanatory caption and the distinction between selected real pictures and the illustrative sound band. No extra encoding or physical-layout detail is needed here.

## Interaction, phone layout and accessibility

**Severity: none.** The two choices and “Check prediction” remain below the figure. In every tested case, an empty submission displayed “Choose a prediction before checking it”; the incorrect choice displayed an explanation that muting does not rewrite the file; the correct choice explained that the audio stream remains. Radio selection also worked with ArrowDown from the first choice. No new interactive control has been introduced by the figure.

At phone width the common file boundary, both stream headings, all three picture tiles, their time labels, sound label and direction label remain visible without horizontal scrolling. The exact screen content within the small pictures is not readable at phone size, but interpreting that content is not needed for the diagram's containment/order task. The diagram's learner-facing text remains readable in light and dark. Colour is supplementary: headings and text identify the lanes. The figure has a caption/name, pictures use an ordered list, and each real image has an alternative description identifying the recording and its selected time. **Direction:** retain the text labels and semantic order; no correction is proposed from this review.

## Exact coverage and limits

| Browser | Viewport | Themes | Checks |
| --- | --- | --- | --- |
| Headless Chromium 156.0.8078.4 | 1440 × 1000 | light, dark | Prediction section screenshots; all image loads; containment and order; empty/incorrect/correct prediction; radio keyboard selection; page errors; document/figure overflow |
| Headless Chromium 156.0.8078.4 | 390 × 844, touch-enabled context | light, dark | Same checks and visual inspection |

Document width equalled viewport width in all four cases. On the phone the figure's client width and scroll width both measured 320 pixels; no horizontal overflow was present. All four cases produced no uncaught page errors. Temporary evidence is `/workspace/scratch/stream-reader.cjs`, `/workspace/scratch/stream-reader.log` and `/workspace/scratch/stream-reader-{desktop,phone}-{light,dark}.png`.

This follow-up did not re-review the whole course, run a screen reader, test a physical phone, repeat the Firefox sweep, listen to the synthetic tone, regenerate media or run the project quality suite. Accessibility observations concern rendered labels, HTML semantics, keyboard radio operation and visible layout; they are not a comprehensive accessibility certification. Fixture agreement was checked against the existing model and generation script, not a fresh native-media measurement.
