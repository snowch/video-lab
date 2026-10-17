# Independent checker — first-use stream overview

Copyright © 2026 Christopher Snow.

Checked 17 October 2026 by the independent gpt-6.1-sol checker with high reasoning effort. I did not author the new component, its copy, or the reader/sceptic reports. I read `11-stream-overview-reader.md`, `12-stream-overview-sceptic.md`, the component, its separate strings and relevant CSS, then independently checked the actual rebuilt page at `http://127.0.0.1:4173/video-lab/#/module-0/prediction`. I made no product changes.

## Disposition

Accepted. No corrective finding or substantive regression emerged from this focused check. The reader and sceptic conclusions are supported by the rendered page:

- A single visible boundary labelled “Sample file” and `build-queue.mp4` encloses separately labelled video and audio lanes. “Selected pictures in display order” and “Time moves from left to right” state the relationship without requiring later codec/timestamp vocabulary.
- All three real pictures loaded in every tested context, each with natural dimensions 960 × 540. Their actual image paths were `/video-lab/media/frames/000.jpg`, `048.jpg` and `096.jpg`; the visible times and alternative descriptions agreed at 0, 4 and 8 seconds, in that order. The “selected” wording avoids presenting them as all or consecutive pictures.
- The audio lane is a plain, labelled band saying “Quiet synthetic tone”. It has no waveform peaks or sound-level scale. The visible local note explicitly says that it illustrates a separate stream over time and does not show the arrangement of data inside the file or measure changing sound level. The enclosing outline therefore communicates membership in one sample, not a measured byte layout.
- Existing prediction controls remain below the figure and respond correctly. An empty check asks for a prediction. The wrong choice explains that muting is a playback control and does not rewrite the file. The correct choice explains that the audio stream remains. Keyboard ArrowDown from the first radio selected the second radio in every context.

I visually inspected the whole Prediction section in all four contexts below. Both lanes, all three times, the sound label, filename, direction label, explanatory note and prediction controls remain readable in light and dark. The internal application text in the small phone pictures is not needed to understand membership or sequence; the figure's labels supply that meaning.

## Independent coverage and evidence

| Browser | Viewport | Theme | Result |
| --- | --- | --- | --- |
| Chromium 156.0.8078.4 | 1440 × 1000 | light | Passed |
| Chromium 156.0.8078.4 | 1440 × 1000 | dark | Passed |
| Chromium 156.0.8078.4 | 390 × 844, touch enabled | light | Passed |
| Chromium 156.0.8078.4 | 390 × 844, touch enabled | dark | Passed |

Each case checked actual loaded image URLs/dimensions, visible time/filename/interpretation labels, empty/wrong/correct prediction states, radio keyboard operation, figure/document overflow and uncaught page errors. The figure's client and scroll widths matched: 840 pixels on desktop and 320 on phone. Document widths likewise matched the 1440/390 pixel viewports. There were no uncaught page errors.

Representative screenshots from this checker, captured before answering the prediction:

- [Desktop light](screenshots/stream-overview-desktop-light.png)
- [Phone dark](screenshots/stream-overview-phone-dark.png)

These are actual element screenshots of the built Prediction section, including its prose, diagram and unchanged controls. The other two theme/layout captures are temporary `/workspace/scratch/checker-stream-overview-{desktop-dark,phone-light}.png`. Structured observations are in `/workspace/scratch/checker-stream-overview-results.json`.

Executed commands for this check:

```sh
cat docs/notes/module-0/review/11-stream-overview-reader.md
cat docs/notes/module-0/review/12-stream-overview-sceptic.md
cat src/StreamOverview.tsx
cat src/content/stream-overview.strings.ts
rg -n -A 65 -B 5 'stream-overview' src/style.css
node /workspace/scratch/checker-stream-overview.mjs
head -n 31 /workspace/scratch/video-lab-stream-check.log
tail -n 8 /workspace/scratch/video-lab-stream-check.log
```

The independent browser script exited 0 after all four cases. I also inspected the builder's full-check log: it records seven passing tests, native verification of the media hash/two streams/120 picture timestamps/469 audio blocks/every still, a production build and 25 passing browser tests. That `npm run check` execution belongs to the builder; I did not rerun or claim it as mine.

## Limits

This check uses headless Chromium and phone emulation, not a physical phone or screen reader. It includes keyboard radio selection, not an exhaustive keyboard-only audit. I did not repeat Firefox, the entire lesson review, native media measurements, media generation, audible-tone evaluation or live-hosting verification. Actual image loading and truthful local labelling were independently checked; the native-media agreement remains supported by the separately attributed sceptic/builder verification. No blocker remains within this focused scope.
