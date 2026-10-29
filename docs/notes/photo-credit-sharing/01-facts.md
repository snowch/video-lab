# Conditional photograph reuse notice

Copyright © 2026 Christopher Snow.

Owner approved replacing the unconditional reuse instruction with a sharing-conditional notice, removing the blanket statement that videos made from the photograph must be ShareAlike. Merge after checks.

The supplied cropped/resized landscape.jpg remains CC BY-SA 3.0, Hannes Röst's authorship, Fronalpstock title, dimensions, source link, changes and licence link remain. Only guidance changes; media bytes, commands, controls and grading do not.

Primary source: CC BY-SA 3.0 Unported legal code, sections 3(b), 4(a), 4(b), 4(c): https://creativecommons.org/licenses/by-sa/3.0/legalcode . Public site fetch returned403 today; verified the same legal code in Creative Commons' official repository: https://github.com/creativecommons/cc-legal-tools-data/blob/main/docs/licenses/by-sa/3.0/legalcode.en.html (scratch copy /workspace/scratch/photo-credit/legalcode.html).

- Section4(b): distribution/public performance of adaptations requires the specified ShareAlike licences; it explicitly does not require a collection apart from the adaptation to adopt that licence.
- Section4(c): distribution/public performance of work/adaptations/collections triggers credit requirements, including supplied author/title, source URI where practicable and identification of adaptations.
- Section4(a): include licence copy/URI and retain notices on distribution/public performance.
- Avoid classifying every video as an adaptation. Reader guidance should condition credit/source/licence/change-notice obligations on sharing, and ShareAlike on sharing an adaptation. Do not imply all private practice requires publication. No legal taxonomy lecture is needed in the learner notice.

Separate prose revision, built phone/desktop light/dark learner review, sceptic and independent checker required by AGENTS.md. Keep review proportionate to text-only scope. Run required full npm run check through CI plus local formatting/type/build and targeted built-page checks; do not add implementation-mirroring tests.

## Additional owner request: linked pixel-format reference

The owner also asks to replace the vague `-pix_fmt yuv420p` description with a useful direct explanation and an appendix reference. Add a concise pixel-formats section to the existing Media file formats appendix; link directly from the option notes on hold/sequence/animation, preserving edited commands on Back. No extra numbered chapter or reference tile.

Verified primary definition source: https://github.com/FFmpeg/FFmpeg/blob/n5.1.4/libavutil/pixfmt.h (matches pinned browser FFmpeg5.1.4 API family). Saved `/workspace/scratch/photo-credit/pixfmt.h`. Native `ffmpeg -hide_banner -pix_fmts` independently lists:
- yuv420p: planar, 8-bit components, 4:2:0, one Cb and Cr sample per2x2 Y samples; no alpha. Y is luma (brightness-related), U/V colour-difference components. 4:2:0 lowers colour sampling horizontally and vertically without reducing output width/height. p means separate component planes, not progressive video.
- yuv422p: planar8-bit, one of each colour-difference sample per2x1 luma samples.
- yuv444p: planar8-bit, one of each colour-difference sample per1x1 luma sample.
- rgb24: packed RGB8:8:8; rgba: packed RGBA8:8:8:8, alpha is opacity. Neither subsamples colour. yuv420p has no alpha; converting an overlay asset to it before composition loses transparency.
- yuv420p10le: same4:2:0 pattern,10-bit samples,little-endian storage; greater precision does not restore detail lost in earlier sampling or guarantee HDR.

FFmpeg option documentation: https://ffmpeg.org/ffmpeg.html#Advanced-Video-options and n5.1.4/doc/ffmpeg.texi. `-pix_fmt` requests output pixel format; if unsupported FFmpeg may warn and choose another. Describe intended setting, distinguish actual output report and avoid guaranteed support of every format in every codec/browser. Existing course uses8-bit4:2:0 for practical H.264 delivery; yuv444p/full colour may preserve coloured edges but destination must support it. Pixel format is separate from codec/container/resolution. Lower chroma resolution can soften fine coloured text/edges; higher chroma resolution/bit depth means more uncompressed picture data, not guaranteed encoded file size/quality.

Author concise separate copy from these facts; no need to include every technical edge case. Main option explanation should carry immediate meaning, appendix carries sampling/layout/precision/alpha and a few common comparisons. A direct section link needs a small explicit hash subroute and focused heading; test Back with edited commands plus fresh direct load and no encoder download merely reading.

## Additional owner request: literal option values across the course

The owner asks why image-input `-loop 1` uses1 and whether other pages need clearer option descriptions. A separate audit of all28pages retained the boolean-versus-repeat-count clarification and three small related improvements: export pixel-format request/reference, padding coordinate units/origin and CRF's factor-scale value versus percentage. See verified evidence and rejected expansions in `08-option-audit-a.md` and `09-option-audit-b.md`. Commands, assessment and media remain unchanged; merge includes these focused wording fixes after fresh built-page review and refreshed full CI. Earlier CI runs were deliberately superseded when scope expanded, not reported as failures or passes for the final revision.
