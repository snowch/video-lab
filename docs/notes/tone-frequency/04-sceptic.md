# Independent sceptic review: tone frequency and sample rate

Copyright © 2026 Christopher Snow.

A separate agent reviewed the learning brief, existing sample-rate fact brief,
new model and tests, prose, component source and built page on 6 November 2026.
The reviewer made no product changes and did not rebuild or run the full suite.

## Technical claims and prerequisites

The model uses `0.8 sin(2πft)`. At 500 and 1,000 Hz over the same 0.004 seconds,
it completes two and four cycles respectively. The first upward-zero-crossing
cycle ends at 0.002 and 0.001 seconds. Curve amplitude is equal, so the comparison
isolates frequency rather than changing height or duration. The highlighted SVG
regions have widths 308 and 154 in the common 640-unit viewBox, beginning at x=12.
Independent browser geometry checks place the bracket endpoints within 1.2 CSS
pixels of those cycle boundaries, including enlarged phone text. No misleading
cycle geometry was found.

The final page explains positive/negative relative signal height before the plots,
defines a complete cycle and frequency, and labels the tones as invented examples
rather than extracted practice audio. It explicitly distinguishes relative height
from loudness. The optional one-second playback is explained as longer than the
four-millisecond drawing. The final integration includes these explanations and
limits; initial source work in progress did not yet render all of them.

Stage two explicitly zooms to two milliseconds and retains the 1,000 Hz tone.
The half-open sampling interval includes zero and excludes two milliseconds:
4,000/8,000/16,000 samples/s therefore give 8/16/32 dots, with spacing
0.25/0.125/0.0625 ms. Independent interaction checks confirmed each count and summary,
while the analytic curve's path stayed identical. No claim that denser dots alone
make this already representable sine more accurate was introduced. Per-channel
counting and the two uses of Hz are distinguished visibly.

The fresh question follows the existing resampling definition and changes the
numbers to a one-second 500 Hz tone, 12,000 → 24,000 samples/s. The correct answer
retains 500 cycles and doubles values per channel. All three feedback branches
explain the relevant rule; changing the choice clears old feedback. This is a
valid new application of the demonstrated distinction. It does not establish
learner understanding or replace the actual FFmpeg exercise. The plan correctly
treats the owner's confusion as evidence and other misconceptions as hypotheses.

## Independent checks

Ran:

```sh
npx vitest run src/notebook/visuals/tone-model.test.ts src/notebook/visuals/sample-rate-model.test.ts
```

Result: **2 files, 10 tests passed**. The tests check cycle counts and extrema,
one-second playback length, central frequency crossings, fade endpoints, sample
counts/spacing and the fixed analytic signal. These are targeted model checks,
not a claim that the full quality gate passed.

Inspected the actual built page in Chromium at 390/light, 820/dark and 1365/light
with normal text, plus 390/dark at 200% text. Visually inspected native tone-figure
screenshots. All four probes had no horizontal document overflow. Sampling controls
and all prediction responses worked; no processing-encoder requests occurred.

## Actual synthesis and lifecycle

Wrapped the browser's real AudioContext methods for observation; the wrapper
still called the native context, buffer and source methods. The browser selected
44,100 samples/s. Each generated buffer was mono, 44,100 samples long and one
second in duration. Its first and last values were zero and its peak magnitude
was below 0.120001. The middle half-second contained 250 positive crossings for
the 500 Hz tone and 500 for the 1,000 Hz tone. This verifies the playback values
independently of the drawn points. The existing unit checks also cover 48 kHz.

Natural completion, switching tone, Stop and navigation each closed the relevant
context. No download event or processing-tool request occurred. The component
creates an in-memory AudioBuffer and does not call notebook file-writing APIs;
these explanatory tones are not saved course-media artifacts. The fades and
bounded amplitude avoid abrupt waveform endpoints and clipping in the generated
buffer. This does not certify the absence of every audible device/backend artifact
or establish physical-speaker audibility.

## Startup failure finding and correction

The builder's first focused browser run exposed a Firefox runtime whose native
AudioContext resume promise stayed pending because an audio backend was unavailable.
The initial code could therefore retain a playing state without scheduling sound.
This is a justified lifecycle finding, not evidence that the cycle model is wrong.

The corrected build distinguishes Starting from Playing and bounds startup at
three seconds. Independently injected a never-settling resume promise: the visible
status first read “Starting 500 Hz tone…” and then reported unavailable playback;
the context was closed and no button remained pressed. Injecting an unavailable
constructor also reported the fallback while leaving both plots and sampling usable.
The retired-request guard prevents an old request's later rejection from replacing
a newer request's state. The real-context synthesis/completion/cancellation probe
was rerun successfully against this corrected build.

The finding is resolved in the tested build. Browser silence or an unavailable
backend remains a disclosed capability limit; the essential learning content does
not require playback.

## Judgement of the independent reader report

Read the completed `03-reader.md`. It contains no actionable finding to challenge
or reject. Its conclusions are accepted: the reader's cycle counts, equal time
axes, first-cycle highlights, fixed sampling curve and count/spacing claims agree
with the model and independent browser probes above. The prerequisite sequence
also matches the final built page: signed height and a complete cycle precede the
plots, the shorter sampling interval is announced, and resampling is explained
before the fresh question. The reader correctly limits its playback observations
to browser control/state changes and makes no physical-audio or learning-gain claim.

No additional unresolved finding remains. The startup failure discovered during
focused testing was independently challenged and verified corrected above; the
final checker should retain the unavailable-audio and lifecycle checks alongside
the successful-playback path.

## Evidence and limits

Independent scripts, screenshots and measurements are under
`/workspace/scratch/tone-frequency/sceptic/`: `review.mjs`, `ui.json`, `tones-*.png`,
`playback.mjs`, `playback.json` and `playback-final.log`. The pending/unavailable
startup probes were separate browser commands. Review of the existing source
brief checks consistency with its recorded W3C/DSP/FFmpeg references; no new external
source retrieval or physical listening study is claimed.

This pass does not certify all lesson controls, every browser/device or learning
outcomes. The final independent checker and full repository quality gate remain
separate evidence.
