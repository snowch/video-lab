# Independent final checker: tone frequency and sample rate

Copyright © 2026 Christopher Snow.

A separate checker read the completed reader and sceptic reports, the verified
plan, final strings, synthesis model and components, then inspected the final
built page on 6 November 2026. This agent did not edit the product or prose,
rebuild the app, write the repository tests or run the full quality gate.

## Final built-page checks

Ran `node /workspace/scratch/tone-frequency/final-checker/check.cjs` successfully
against `http://127.0.0.1:4173/video-lab/#/learn/frames-time/samples`. Eight fresh
Chromium contexts covered 390 and 1365 CSS pixels, light and dark themes, normal
and 200% root text sizes. In every case:

- The two tones showed two and four cycles over the same four milliseconds.
  First-cycle highlights measured 308 and 154 SVG units within the common
  616-unit time domain, matching one half and one quarter of the interval.
- The signed-value explanation, cycle definition, relative-height limitation,
  generated one-second playback explanation and recording distinction were
  visible. The sampling stage explicitly announced the shorter two-millisecond
  window and fixed 1,000 Hz tone.
- Selecting 4,000, 8,000 and 16,000 samples/s produced 8, 16 and 32 dots, with
  displayed gaps 0.25, 0.125 and 0.0625 ms. The analytic curve path stayed exactly
  unchanged.
- Check prediction was disabled before a selection. All three responses produced
  their specific feedback, and changing the response cleared the previous
  feedback. Keyboard ArrowDown selected the pitch misconception and Enter on
  Check prediction produced its higher-pitch explanation.
- No horizontal document overflow, processing-tool request or download occurred.

Visually inspected phone/light and desktop/dark tone figures, plus the phone/dark
prediction check. Cycle brackets, shared time axes, signed values, the new
definitions and all three response labels remain readable. The phone's longer
playback control wraps without obscuring its plot. The prediction's feedback
explains the mistaken rule rather than merely declaring an answer wrong.
Enlarged-text states were exercised and measured, not claimed as physical-device
screenshots.

## Actual playback, failure and cleanup

An observation wrapper called the browser's real AudioContext and buffer/source
methods. The browser selected 44,100 samples/s. Both generated buffers were mono,
one second long, with peak magnitude 0.11999924 and zero-valued endpoints. Their
central half-seconds contained 250 and 500 positive zero crossings, independently
matching 500 and 1,000 Hz. Signed zero at a fade endpoint was correctly treated as
zero; an initial scratch assertion distinguishing +0 and -0 was corrected before
the successful run. This was a checker assertion issue, not a product defect.

Stop, natural completion, switching tones and page navigation each closed the
relevant native audio context. Switching left at most one active context. No
processing-tool request or download occurred during playback.

Independently injected a resume promise that never settles. The built status
first read **“Starting 500 Hz tone…”**, then reported unavailable playback after
3,405 ms including browser action/polling overhead. The context was closed and
neither playback button remained pressed. Sampling still worked. An unavailable
AudioContext constructor also displayed the fallback while preserving both
curves and the sampling control.

Additionally ran `node /workspace/scratch/tone-frequency/final-checker/retired.cjs`.
The first tone's resume remained pending while a second real tone started and
completed. After the first request's timeout elapsed, its retired error did not
replace the newer or completed status; both contexts were closed. The sceptic's
startup/lifecycle finding is resolved in the final built page.

An authored practice command also survived a full page reload. Explanatory
interactions triggered no encoder/WASM request. The existing command workspace
therefore remains available independently of these optional tones in the tested
flow.

## Resolution and limits

No additional actionable finding remains. The reader's prerequisite sequence,
cycle/sampling distinction and specific-feedback conclusions agree with this
check. The sceptic's corrected startup failure is independently verified above.

Scripts, stdout, native screenshots and measurements are in
`/workspace/scratch/tone-frequency/final-checker/`: `check.cjs`, `run.log`,
`result.json`, `tone-*`, `reason-*`, `retired.cjs`, `retired.log` and `retired.json`.
The parent owns the full repository and GitHub gates. This check used Chromium;
it does not certify every browser, physical-speaker audibility, physical volume
or learning gains from recruited learners.
