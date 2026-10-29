# Independent sceptic review: visual format references

Copyright © 2026 Christopher Snow.

Reviewed 29 October 2026 by a separate agent who neither drafted nor implemented the slice. Read `AGENTS.md` and the verified fact brief, inspected the built pages and implementation, and formed initial judgements before reading `03-reader.md` when it appeared. No production edits or commits made.

## Observed build and evidence

Inspected `http://127.0.0.1:4188/video-lab/` at `#/appendix/formats`, `#/appendix/formats/video-containers` and `#/appendix/formats/pixel-formats`. Standalone Node Playwright, using the installed `playwright` library directly rather than the test CLI, captured all twelve combinations of 1440 × 1000 desktop / 390 × 844 touch phone and light / dark. Visually inspected every full-page screenshot. They show the original cyan/green source, yellow/green enlargement and repeated remux definition, before the builder's ranked fixes. Initial screenshot capture was approximately 12:22 UTC; an initial bundle identity was not recorded, so the reader's `course-DrPKROMs.js` identifier is not independently asserted here.

Evidence: `/workspace/scratch/visual-formats/sceptic/`, including twelve full-page screenshots, four alpha/detail screenshot pairs, `observations.json` and `touch-nav.json`. Reproduction script: `/workspace/scratch/visual-formats/sceptic-review.mjs`. The additional touch/navigation check at approximately 12:25 UTC recorded `assets/course-BAnKRss6.js`; that later control check is distinguished from the initial visual evidence and is not final verification of fixes.

All twelve combinations had document width equal to viewport width (1440 or 390), with no page errors. The phone retains all comparison substance; streams and alpha previews stack, while sampling planes stay adjacent. Labels remain readable in both themes. The figures identify streams/components with text, without relying on colour alone.

## Retained findings and rank

1. **R1, medium — retain.** “This enlarged 2 × 2 example makes four positions visible” and the selection/arrow imply that the four cells represent the selected source. The actual selected source is a cyan/green diagonal; the enlargement alternates pale green/yellow columns. Both the screenshot and `formats.css` establish the mismatch. An illustrative model still needs internally consistent input/output views; the conceptual caption cannot repair a contradictory arrow. Fix direction: derive a small source grid and its selected 2 × 2 enlargement from the same four colours/positions. The builder's proposed shared 4 × 4 source with its exact top-left 2 × 2 enlargement is suitable. A brief illustrative-model caption is sufficient once that correspondence is real.

2. **R2, low — retain.** The complete remux definition above the source/destination figure is repeated below as “Remuxing writes encoded streams into a new container without encoding them again, when that container accepts them.” The neighbouring caption and Extension block also repeat the rename warning. This is visible redundant reading, especially on phone, rather than a factual defect. Keep one remux explanation next to its example, retain the later unique codec-change and FFmpeg writer-selection facts, and consolidate the rename explanation. Do not remove those unique facts merely to shorten the page.

These are the reader's only ranked findings; both survive independent checking. No additional blocking factual or control issue found.

## Technical checks against sources and the actual page

- **Container/streams:** the example explicitly identifies H.264 video and AAC audio as illustrative MP4 contents. Nested boxes show membership; text expressly distinguishes byte layout. The same stream names survive MP4 → Matroska. FFmpeg 5.1.4 `doc/ffmpeg.texi`, lines 104–114 and 194–213, describes demuxing/muxing and stream copy omitting decoding/encoding. Matroska's codec specification explicitly lists AVC/H.264 and AAC. The diagram's compatibility and unchanged-encoding claims therefore hold, without claiming an executed remux or universal player support.
- **WebM:** independently fetched FFmpeg n5.1.4 `matroskaenc.c`; line 1753 limits WebM to VP8/VP9/AV1 video and Vorbis/Opus audio (plus WebVTT subtitles). Its rejection of unchanged H.264/AAC is consistent with the card.
- **Sampling:** checked actual generated DOM counts and computed rows/columns for every mode in all four viewport/theme contexts. Y remains 2 × 2 / four samples; U/V are 2 × 2 / four for 4:4:4, 1 × 2 / two for 4:2:2, and 1 × 1 / one for 4:2:0. These match FFmpeg n5.1.4 `libavutil/pixfmt.h`, lines 66, 70–71. No claim that the expanded cells are chroma locations or measured colours is made. The dimensions statement and conceptual-count limitation make the shared area a valid grouping model.
- **Precision/storage terms:** source definitions corroborate planar YUV420P/422P/444P, packed RGB24/RGBA and 10-bit little-endian YUV420P10LE (lines 66–71, 93, 149). “p” is correctly planar, alpha is absent from yuv420p, and 10-bit precision is not claimed to restore source detail. FFmpeg's `-pix_fmt` section, lines 968–977, supports the warning that unsupported requests may select another encoder-supported format.
- **Alpha:** this is actual CSS opacity on a constant coloured foreground, including its text/border. Initial computed opacity was 0.5 in both previews. Keyboard Home/End gave 0/1, with ArrowLeft giving 0.95 after End, and both foreground styles followed each value. W3C CSS Color 4 §3.3 defines 0 as full transparency, 1 as full opacity and application to the whole element. A phone touchscreen tap near one-quarter yielded 0.25 and two computed opacities of 0.25. The caption truthfully describes CSS rather than codec processing; compositing before an export format without alpha preserves the visible combination.
- **Controls:** radio selection updates both counts and explanation; keyboard ArrowLeft changes 4:2:0 → 4:2:2. Touch taps selected all three values. Details opened correctly in all four contexts. Native inputs provide keyboard semantics and the range/radio labels are present. Tapping Pixel formats → Video containers and browser Back returned to the correct headings/routes. Reader evidence separately covers command-draft survival; this sceptic did not rerun that unrelated persistence scenario.

## Rejected or narrowed concerns

- **Remove all negative/conceptual caveats — reject.** Membership versus byte positions and sample grouping versus exact positions/storage are concrete ambiguities of these diagrams. The alpha figure must distinguish CSS rendering from codec preservation. They explain the evidence's limits and prevent false measured-media claims under `AGENTS.md`. The magnifier caption can be shorter after R1, but the useful distinction should remain. No independent ranked issue is justified merely by a caption containing a qualification.
- **Sampling loses three quarters of the picture pixels — reject.** Y stays at four, the labels identify changed U/V counts and the caption preserves picture dimensions. The 4:2:0 cells show grouping, not an output-resolution change.
- **Need a real FFmpeg run behind the container diagram — reject.** An explicitly identified explanatory model is allowed by `AGENTS.md`; compatibility is supported by primary sources, and the caption makes the diagram's status explicit.
- **Need an extra prerequisite exercise — reject.** The target is an optional reference. Pixel/sample/luma/colour-difference/alpha definitions precede their controls; the fixed 2 × 2 comparison is itself a complete small example. Nothing is graded using unshown knowledge.
- **Container example must include subtitles — reject.** Its stream pair is explicitly an example and Matroska's separate card covers optional subtitles/metadata/chapters.
- **CSS group opacity is a codec alpha test — reject.** The page expressly describes CSS and applies one uniform opacity to the foreground. This correctly illustrates opacity while making no codec precision or per-pixel storage measurement.

## Primary-source evidence

Existing verified copies: `/workspace/scratch/visual-formats/pixfmt` and `/workspace/scratch/visual-formats/ffmpeg`, from FFmpeg n5.1.4.

Additional independently fetched primary sources, 29 October 2026, saved under the sceptic evidence directory:

- [FFmpeg n5.1.4 Matroska/WebM muxer](https://github.com/FFmpeg/FFmpeg/blob/n5.1.4/libavformat/matroskaenc.c), saved as `matroskaenc-n5.1.4.c`.
- [Matroska codec mappings](https://www.matroska.org/technical/codec_specs.html), AVC/H.264 and AAC entries, saved as `matroska-codecs.html`.
- [W3C CSS Color 4 §3.3: Transparency](https://www.w3.org/TR/css-color-4/#transparency), saved as `css-opacity.html`.

This review ran focused standalone browser/source checks only. It does not assert the full quality gate, a new build, final fix verification or deployment. The independent checker should inspect the rebuilt enlargement and remux block after ranked fixes.
