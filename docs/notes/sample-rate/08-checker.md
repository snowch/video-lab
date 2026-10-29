# Independent final built-page checker

Copyright © 2026 Christopher Snow.

29 October 2026. I did not author the implementation or the R1/R2 fixes and made no product edits. I read `AGENTS.md`, the sample-rate plan, verified fact brief, reader review and sceptic review. This is an independent check of the built page, not acceptance of the builder's claims.

## Build identity and execution

Checked `http://127.0.0.1:4191/video-lab/`, route `#/learn/frames-time/rate`. The final matrix was rerun after the builder's final copy-only extraction of the +1 / 0 / −1 labels into the strings module and after `build-final.log` finished successfully.

Final fresh Chromium and Firefox resource records both show `assets/course-Djum75Pp.js` and `assets/course-DkgCIBoH.css`. JavaScript SHA-256: `a2dc0b1080bc2242d9fd20b030522723a4ac9ac0d1612f3d691a0d54358780eb`.

`release.json`: commit `d0810bc6a7c1f3591036c846d6d988e6baa76ed1`, build `e806047a3fe3d20d212f7a0555aefa95e46faf92f4beb20329775b646ff11332`, version `pmEE17bhqKx0YnWGmqYbibaSiCW+lG8cNu40Hw4HQrY=`. The release commit identifies the build's base commit; there were uncommitted slice changes during this check.

Commands actually run:

- `node /workspace/scratch/sample-rate/checker.mjs` — final run PASS: 12 browser/theme/viewport combinations, eight definition route/theme inspections, zero page errors.
- `node /workspace/scratch/sample-rate/checker-last-load.mjs` — fresh final-bundle resource, label and screenshot check in both browsers PASS.
- `sha256sum dist/assets/course-Djum75Pp.js` — hash above.

Browsers: Chromium 156.0.8078.4, Firefox 157.0. Matrix: each browser at desktop 1440×1100, touch-enabled phone 390×844, and 320×900 with 200% root text, in actual light and dark `data-theme` states. The enlarged-text check is text enlargement, not full-browser zoom. All three rates were checked in every combination (36 state checks).

## Findings and fix verification

No remaining defect found in the requested slice.

R1 verified resolved. The built page now says “a microphone converts sound into a changing electrical signal” and “Sampling records its value as a number at regular instants”, followed by positive/negative values on opposite sides of a resting level marked zero. This supplies the concrete sound → electrical signal → stored number link missing from the reviewed page. It does not label the relative ±1 axis as volts/pascals or claim that a zero crossing proves silence. The microphone is explicitly an example. The invented, one-channel model and source's separate 48,000 samples/s/channel remain explicit.

R2 verified resolved in the built page. At 320 px / 200% text, the plot is 198.25×160 CSS px in Chromium and approximately 191.58×160 in Firefox, in both themes. The previous reviewed height was about 74 px. I visually inspected plot screenshots for the 8/16/32-point states and the final-build 32-point close-ups in both engines. Round marks actually paint in both browsers despite the zero-length `h0` path. They retain recognisable silhouettes and separation at the narrow enlarged-text width. Computed dot treatment is a 5px non-scaling round stroke, rather than an ellipse scaled with the SVG. The curve remains distinct, and stems help locate values. No horizontal page overflow occurred in any checked state.

Scientific check against the verified brief: rendered dot coordinates were parsed independently from the actual built SVG and compared with x = 12 + (n/fs)/0.002 × 616 and y = 120 − 0.8 sin(2π × 1000 × n/fs) × 100. All 36 states match within 1e-9 drawing units. Counts are 8/16/32; summaries give 0.25/0.125/0.0625 ms spacing. Indices begin at zero and stop before 2 ms. All 257 actual curve vertices independently match the same two-cycle sine within 1e-8 drawing units, and the entire curve path is identical across rate changes. The time labels stay 0 / 1 / 2 ms. There is no sample-to-sample reconstruction line or higher-rate quality claim.

Native selection worked by keyboard in both engines across the matrix: focus, ArrowUp, Enter changed 16,000 to 8,000 and restored 16 marks. Focus remained on the select; visible outlines and at least 44px control height were measured. Touch-enabled phone contexts successfully tapped the native select; browser automation selected 4,000 and the rendered count became eight. This verifies touch hit-testing and selection response, not a physical device's operating-system picker.

The command was edited to `fps=10` before sampling changes and stayed byte-for-byte unchanged through every rate change. Chromium also retained the edit after reload. No request for `/encoder/` resources or an FFmpeg WASM file occurred during any matrix visit. Thus reading and operating the figures did not trigger processing-tool download. No browser page errors were observed.

Definition styling was checked on `first-edit/shorten`, `inside-video/inspect`, `quality/quality`, and `appendix/codecs`, at 320 px / 200% text in both actual themes. Defining terms render as inline `dfn`, weight 700, tinted background and accent text. Light values remain rgb(18,105,94) on rgb(221,243,233); dark values rgb(130,221,195) on rgb(37,68,62). The long “Constant rate factor (CRF)” spans two inline line rectangles, with no overflow; “Lossy compression” wraps too. Existing ordinary `strong` labels such as “Practice source”, “CRF 18” and “CRF 35” keep transparent backgrounds. The real edit textarea retains the literal command rather than acquiring definition markup.

## Evidence and limits

Machine-readable evidence: `checker-results.json` (all matrix states, computed geometry, controls, definitions, requests/errors), `checker-final-build.json` (browser versions, final resource URLs and release metadata).

Screenshots: `checker-{chromium,firefox}-{light,dark}-{desktop,phone,320-2x}-{model,page}.png`; enlarged-text all-rate plots `checker-{chromium,firefox}-{light,dark}-{4000,8000,16000}-plot.png`; final-bundle close-ups `checker-final-{chromium,firefox}-plot.png`; definition screenshots `checker-definition-*-{light,dark}-320-2x.png`. Full rendered main text is saved as `checker-*-text.txt`.

I did not run the full repository quality entry point, run FFmpeg, acoustically assess playback, use physical phones, test screen-reader speech, exhaust unrelated global controls or validate the deployed site. Those are outside this final fix check. The earlier reader's processing evidence is not presented as a new run by me. This report establishes independent verification of the requested built-page changes only; it does not self-certify implementation or stand in for the builder's full quality/deployment evidence.
