# Independent built-page check: reference card and optional SVG workflow

Copyright © 2026 Christopher Snow.

Checked 28 October 2026 against the final built preview at `http://127.0.0.1:4187/video-lab/` by an agent who made no production changes. Read `01-facts.md`, `03-reader.md` and `04-sceptic.md`. No substantive review fixes were required; this check independently verifies the integrated result. No defects found in the approved slice.

## Built-page and keyboard evidence

Ran standalone Node scripts importing installed Playwright, without Playwright CLI or its global setup:

- `node /workspace/scratch/reference-svg/checker/check.mjs`
- `node /workspace/scratch/reference-svg/checker/replay.mjs`

`/workspace/scratch/reference-svg/checker/matrix.json` records desktop 1440 × 1000 and phone 390 × 844 in light and dark. Separate browser contexts isolated theme/storage; the actual rendered `data-theme` matched each requested theme. Screenshots in the same directory record the card, optional prose and focused links.

In every combination, the unnumbered “Appendices and reference” card follows chapter 11, uses the chapter-card visual treatment and carries the single optionality description. Its four links reached the expected headings at `#/glossary`, `#/appendix/codecs`, `#/appendix/formats` and `#/appendix/recording`; browser Back returned to overview. The script waited for the destination heading before inspecting it. Overview, overlay and all four destinations had no document horizontal overflow.

For each of the four card links and the overlay “Media file formats (optional)” link, the script first located the preceding tab stop, then used actual Shift+Tab/Tab to reach the target and Enter to activate it. Every target had `:focus-visible` and a 3px solid outline: dark teal in light theme and pale teal in dark theme. Inspected screenshots confirm visible rings, including phone/dark; browser Back restored the expected route. This closes the earlier reader's supplementary keyboard coverage gap.

The rendered SVG section remains explicitly optional and after the supplied practice. It explains rasterisation, full-canvas 854 × 480 PNG export, transparent background and white's opacity. It instructs saving the original SVG, importing a distinct PNG filename and choosing a new output filename. The command consumes the exported PNG; the prose makes no direct SVG decoder claim. The final paragraph clearly reserves automatic practice assessment for the supplied annotation and directs custom-work assessment to replay.

## Bounded custom-output check

Independently imported the reader's original `my-annotation.png` into a fresh browser workspace and executed the adapted worked command:

```sh
ffmpeg -i bunny-short.mp4 -i my-annotation.png -filter_complex overlay my-annotated.mp4
```

`custom-result.txt` records successful actual browser FFmpeg execution. `custom-files.txt` confirms the supplied `annotation.png` and `bunny-short.mp4` remain alongside imported `my-annotation.png` and generated `my-annotated.mp4`.

Played the generated output through its inline HTML video. `custom-replay.json` records 854 × 480 dimensions, eight-second duration, playback at approximately 4.1 seconds with 103 presented frames and no dropped frames, then the ended state at eight seconds with 192 presented frames and no media error. Inspected `custom-replay-middle.png`: the orange arrow and ring appear over the source scene, with footage visible around and inside the unfilled marks rather than an opaque rectangular background.

## Limits

This is a focused final built-page check, not the full course regression suite or deployment verification; those remain the builder's separate checks. The PNG was the reader's browser-rendered export, not an independent Inkscape export. The custom encode/replay check ran in desktop light only. Browser playback counters and one inspected middle frame establish successful decoding and the observed transparency, not an exhaustive frame-by-frame visual judgement. No subjective listening or audible quality claim is made. No production edits or commits were made.
