# Independent sceptic review

Copyright © 2026 Christopher Snow.

29 October 2026. Separate sceptic agent; no implementation edits or commit. Reviewed the fact brief, both prose records, `04-reader.md`, changed learner/source/provenance text, primary-source scratch copies and the built page at `http://127.0.0.1:4187/video-lab/`.

## Reader findings and dispositions

The reader requested no actionable fixes. Independently retained its assessments:

| Reader assessment | Sceptic evidence and disposition |
| --- | --- |
| Sharing-conditional credit and adaptation-specific ShareAlike are clear. | Built notice explicitly says “If you share” twice and retains author/title/source/licence/change information. Official CC legal code sections 4(a), 4(c) condition distribution/public-performance notices and attribution; 4(b) limits adaptation licensing and expressly distinguishes the surrounding collection. Retain. No blanket requirement that every video adopt ShareAlike remains. |
| The option explanation gives immediate meaning, with the optional reference at the point of need. | Independently followed the link from hold, sequence and animation at desktop and phone sizes. Each reaches/focuses the Pixel formats H2. Both the option and appendix distinguish sample resolution from picture dimensions. Retain. |
| Luma, colour differences, planar storage and alpha are defined adequately for an engineer new to media. | Built appendix defines these locally, uses a labelled conceptual 2 × 2 group, and makes no measured-photograph claim. FFmpeg definitions confirm the sampling/layout/alpha distinctions. Retain. |
| Uncompressed data, encoded size and destination support are distinguished. | Built conclusion rejects guaranteed encoded size/quality and asks the learner to inspect actual output. FFmpeg option documentation explicitly permits warning and encoder-supported fallback. Retain. |

## Additional retained findings

Two low-severity wording refinements were raised during source review and accepted by the builder:

1. “A codec describes how video is encoded” is too broad as a generic definition, since codecs also encode audio. Qualify it as “A video codec”.
2. “One U and V sample” in the yuv422p/yuv444p comparisons is less explicit than the surrounding beginner explanation. Say “one U sample and one V sample” to make clear there is one of each component.

Both refinements are present in the source. The independent checker must verify the final built wording; these findings do not justify a wider glossary or colour-science rewrite.

## Primary-source checks

- CC BY-SA 3.0 Unported, official Creative Commons repository copy: `/workspace/scratch/photo-credit/legalcode.html`, sections 3(b), 4(a), 4(b), 4(c). The source/provenance passages and `public/media/images/ATTRIBUTION.md` preserve the supplied adapted photograph's licence and conditional notice. Section 3(b) separately requires identifying modifications when creating adaptations; the short sharing notice is practical sharing guidance and makes no claim that all other licence conditions disappear during private work. Rejected expanding this slice into a legal taxonomy or declaring every photograph-containing video an adaptation.
- FFmpeg n5.1.4 `libavutil/pixfmt.h`, scratch copy `/workspace/scratch/photo-credit/pixfmt.h`: lines 66–71 confirm 4:2:0/4:2:2/4:4:4 ratios and packed RGB; line 93 confirms RGBA; lines 141–149 confirm ten-bit precision, the unchanged 4:2:0 sample pattern, little-endian storage and padded storage. “10 bits per sample” here describes precision, not a claim that the physical storage is packed into ten bits. No restoration of lost detail or HDR guarantee is claimed. Rejected adding padding and HDR detail as unnecessary for the stated explanation.
- FFmpeg n5.1.4 `doc/ffmpeg.texi`, scratch copy `/workspace/scratch/photo-credit/ffmpeg.texi`: lines 968–976 confirm `-pix_fmt` selection and warning/fallback when unsupported. The appendix says “requests” and “may”, rather than promising support in every codec/browser.
- The component planes contain different sample counts; planar does not mean progressive. 4:2:0 reduces chroma sampling in two directions, not the output width/height. yuv420p has no alpha, and converting an overlay to it before composition loses transparency. The built text states each distinction correctly.

## Independent built-page evidence

Standalone Playwright API, not the test-runner CLI: `node /workspace/scratch/photo-credit/sceptic/check.mjs` — passed. Evidence: `/workspace/scratch/photo-credit/sceptic/results.json`, `desktop-pixel.png` and `phone-pixel.png`.

Desktop 1366 × 900 light and phone 390 × 844 dark: all six image-lesson link journeys reached the expected hash, focused the H2 and placed it at the viewport top (fractional scroll rounding below one pixel). Back preserved an independently edited worked command in all six journeys. Direct section loading also focused the heading. No horizontal page overflow, browser page errors or encoder/core/WASM downloads occurred. Inspected both screenshots for wrapping and legibility. The reader's wider four-layout matrix additionally covers edited practice commands and reloads; no contradictory result found.

Initial script attempts used the visible theme-button text instead of its accessible name and asserted focus before the scheduled animation frame. Corrected the harness to use “Change colour theme”, await focus and allow subpixel scroll rounding; these were harness errors, not learner-facing defects.

No encodes were run: commands, media and grading are unchanged. This is scoped factual/reader scepticism, not a replacement for the independent checker or required quality checks.
