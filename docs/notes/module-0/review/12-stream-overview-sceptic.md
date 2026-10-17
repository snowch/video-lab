# Independent sceptic review — first stream overview

Copyright © 2026 Christopher Snow.

Reviewed 17 October 2026 by the independent sceptic from `02-sceptic.md`. I did not author the component, its copy or the learner review. Scope is the new overview in Prediction and its effect on that section. I inspected the current production build, source and fixture before reading `11-stream-overview-reader.md`, then tested that report's conclusions. No product changes were made.

## Reader conclusions tested

The reader proposed no corrective finding. Each conclusion below was challenged against the page rather than treated as an accepted author claim.

| Reader conclusion | Independent evidence and attempted counterexample | Decision |
| --- | --- | --- |
| The figure supports the definition of a stream without assuming later media vocabulary. | The named sample boundary encloses two explicitly named lanes. “Selected pictures in display order” explains the picture sequence. The earlier definition supplies pictures/sound as examples. No codec, sample-count or tick explanation is needed to interpret the new figure. | Upheld; no corrective finding. |
| The pictures are genuine selected fixture stills. | `StreamOverview.tsx` takes alternate entries from the measured filmstrip and resolves them through `frames`. The current result is the 0, 4 and 8 second stills; rendered image URLs, alternative descriptions and visible labels agree. All three decoded successfully in my desktop and phone checks. A fresh native media verification independently checked every extracted still against the encoded recording. | Upheld; no invented media result. |
| The sound band is illustrative rather than a waveform or physical file layout. | The band is a single labelled rectangle with no peaks, numerical sound level, byte scale or block boundaries. The local note explicitly says it does not show data arrangement or measure changing sound level. The synthetic-tone label agrees with the unchanged generation evidence and fixture. | Upheld; no corrective finding. |
| The phone keeps the same containment and ordering substance. | My 390 × 844 dark screenshot retains the file boundary, both lane headings, all three time labels, sound label, direction arrow and explanatory note. Document width equals viewport width. Small screenshot contents are not needed to interpret membership or chronology; the later explorer supplies detailed inspection. | Upheld within the stated scope; no requirement to enlarge this static diagram's picture text. |
| Existing prediction controls remain usable. | The figure is inserted immediately before the unchanged fieldset, without a new interaction or control overlay. The reader explicitly exercised all prediction states and keyboard radio selection in four viewport/theme cases. Source inspection supports that limited claim; I do not claim to have repeated that reader sweep. | Upheld within the reported coverage; retain the existing controls. |

## Independent representational challenges

### Could the graphic imply a measured common time axis or an audio ending at the last picture?

**Candidate rejected; no issue severity assigned.** The pictures have increasing labelled times and are explicitly “selected”, so their equal visual spacing does not claim they are adjacent pictures or fill the recording. The arrow says only “Time moves from left to right”; it has no tick marks, duration scale or endpoint label. The audio band names a separate stream over time, without attaching its end to the final selected picture's time. The fixture's streams do share a playback timeline, so depicting picture and sound sequences together is accurate here.

This is a qualitative ordering diagram, not a quantitative alignment display. Its layout would be insufficient for reading an exact sound/picture boundary, but it offers no such task or claim. Adding an alignment warning or another axis is not justified by the current page. Preserve the selected-picture wording and avoid later adding measured-boundary claims without a timestamp-derived scale.

### Could sample selection imply that these are all or consecutive pictures?

**Candidate rejected; no issue severity assigned.** “Selected pictures in display order” appears directly above the tiles, and the note repeats that they are selected from the recording. The visible gaps make the selection concrete. Selection comes from actual fixture metadata; no alternate imagery or synthetic screen state has been substituted. No additional frame-count explanation is needed before the later frame lesson.

### Could a uniform sound band assert constant amplitude, audibility or live playback?

**Candidate rejected; no issue severity assigned.** The plain band carries a content label, not an amplitude scale. The adjacent explanation expressly excludes sound-level measurement. Earlier Motivation identifies the tone as synthetic and listening as optional. There is no moving indicator, waveform, audio control or claim that the diagram itself produces sound. An actual sine tone oscillates even when its envelope is steady; this figure does not draw or measure either quantity.

### Could the overview answer the prediction before the learner reasons about it?

**Candidate rejected; no issue severity assigned.** The diagram shows the file's existing picture and sound streams, facts already supplied by the definition paragraph. It does not show muting, a changed file or the prediction's verdict. The existing-file evidence is an appropriate starting condition for reasoning about a playback control.

## Ranked direction

**No product fix is ranked from this pass.** The reader supplied no corrective finding, and no independent concern above survived the page/fixture check. Preserve the named enclosing file, separate labelled lanes, selected-picture wording, real fixture bindings and local explanatory note. They are the evidence supporting this disposition, not optional decoration.

The next checker should confirm those properties in the rebuilt page, with the diagram and existing prediction controls at phone/desktop widths in both themes. Final quality/deployment checks remain the builder's responsibility; this focused review does not replace them.

## Executed evidence and limits

- Opened `http://127.0.0.1:4173/video-lab/#/module-0/prediction` in Chromium at 1440 × 1000/light and 390 × 844/dark. Inspected rendered text, decoded image URLs/alternative descriptions, screenshot layout and document width; both cases had no horizontal overflow. Visually reviewed my own screenshots in `/workspace/scratch/sceptic-overview-{desktop,phone}.png`.
- Read `src/StreamOverview.tsx`, its separate string file, relevant CSS, insertion in `Prediction`, current introductory prose, fixture/model bindings and the separate drafting record. Then read every observation and limit in `11-stream-overview-reader.md`.
- Ran `npm run media:verify`: passed, verifying the unchanged media hash, two streams, 120 picture timestamps, 469 decoded audio blocks and every extracted still against native FFmpeg.

This pass did not regenerate media, change the model, repeat the full learner control sweep, run a screen reader, use a physical phone, repeat Firefox testing, listen to the tone or run the full quality suite. It makes no independent accessibility-certification or deployed-hosting claim.
