# Chapter 3 sample-rate fact brief

Copyright © 2026 Christopher Snow.

Prepared independently for implementation and a separate prose drafter on 29 October 2026. This is a verified fact/model handoff, not a review of a built page. No product files were edited.

## Existing context checked

Read `/workspace/video-lab/AGENTS.md`, `src/notebook/pages/frames-time-rate.ts`, `src/notebook/visuals/{TimeDiagrams.tsx,time-model.ts,time-model.test.ts,time.strings.ts,time.css,media.json}` and `docs/notes/{lesson-flow/frames-time-rate.md,visual-teaching/time-facts.md}`.

The current page places the audio definition beside the frame-rate paragraph, then shows a frame-only figure. Requested order should become frame explanation → frame figure → sample-rate explanation → sample-rate figure. Source metadata records 24/1 video pictures/s, 48,000 audio samples/s and two audio channels. The sample-rate visual must be explicitly an explanatory signal, rather than an extraction of the source's sound. The existing frame figure models [0,1 second), so copying its half-open time convention is coherent.

## Checked facts

- Audio sampling records a signal's value at regularly spaced instants. A sample is one value at one instant for one channel; sample rate counts those values per second for each channel. At 48,000 samples/s, successive samples of a channel are 1/48,000 second apart, approximately 20.83 microseconds. Stereo has two values at each sample instant; it is not a 96,000 Hz stream.
- The source's `48000 Hz` audio field reports sample rate. Hertz means per second here. A tone's frequency, also expressed in Hz, counts waveform cycles/s instead: a different quantity with the same unit.
- For uniformly sampled PCM, N samples per channel at rate fs represent N/fs seconds. Changing the rate while also computing the corresponding samples for the same signal can preserve duration and pitch. Reinterpreting the same unchanged PCM values at a different rate changes their timing, duration and pitch. Do not collapse these two operations into “changing sample rate makes audio faster” or “changing sample rate never changes playback”.
- Samples need not lie at peaks or zero crossings. A sample measures the value at its own instant, rather than the highest value between instants.
- A higher sample rate supplies more sample instants in a fixed interval. It does not by itself establish better sound, a louder sound, a higher-pitched tone or faster playback. For a signal whose frequencies are all below half the sample rate, ideal sampling/reconstruction can preserve the signal. This does not require straight lines between samples.
- The proposed tone is already below half of all three proposed rates. Thus all three can represent this ideal sine under the band-limited, noiseless model. Claiming that 16 samples/cycle restores this sine more accurately than 4 samples/cycle would misteach the model. More samples can extend the frequency range a system can represent; simple extra sample density alone is the learning objective here.

## Recommended model and equations

Use a mono, analytic sine wave; no browser playback or real recording extraction is needed.

```
toneFrequency = 1_000 cycles/s
duration = 0.002 s = 2 ms
amplitude = 0.8 (relative units)
signal(t) = 0.8 × sin(2π × 1_000 × t)
rates = [4_000, 8_000, 16_000] samples/s
initialRate = 8_000 samples/s
sampleTime(n, fs) = n/fs
sampleValue(n, fs) = signal(n/fs)
N = fs × duration
indices = integers n with 0 <= n < N
samplesPerCycle = fs/toneFrequency
```

| Rate | Samples per cycle | Samples in shown 2 ms | Spacing |
| --- | --- | --- | --- |
| 4,000 samples/s | 4 | 8 | 0.25 ms |
| 8,000 samples/s | 8 | 16 | 0.125 ms |
| 16,000 samples/s | 16 | 32 | 0.0625 ms |

Include the sample at zero; exclude the sample at exactly 2 ms. An inclusive right endpoint would misleadingly show 9/17/33 points. The continuous explanatory curve can extend to 2 ms. The visible span contains exactly two sine cycles, independently of the selected sample rate.

A 1 ms version is also mathematically sound and would show exactly 4/8/16 dots and one cycle. Prefer 2 ms for seeing repetition; either choice must keep interval, count and labels consistent. Do not silently say “4 samples per second” when meaning “4 samples per cycle”.

## Recommended visual interaction and labels

Keep one smooth analytic waveform fixed on a fixed time/amplitude scale. Plot dots at sample instants; optional thin vertical stems to the zero baseline help locate their signed heights. Show the same waveform across all choices. A labelled radio group or select with 4,000 / 8,000 / 16,000 samples per second is clearer than a continuous slider that could produce unintended intermediate rates. Keyboard and touch operation should change dots, count and spacing together.

Suggested label content for the separate writer to develop:

- Caption: “Sample-rate model: more measurements in the same time”.
- Control label: “Samples per second”.
- Time labels: “0 ms”, “1 ms”, “2 ms”.
- Vertical label: “Relative signal value”, with positive and negative sides identifiable.
- Fixed model text: “Same 1,000 Hz tone · two cycles in 2 ms”.
- Selected-state text: “4,000 samples per second · 4 samples per cycle · 8 samples shown” (recomputed for each option).
- Legend: “Curve: illustrative signal” and “Dots: sample values”.
- Instruction: change rate and observe that dots become closer while the waveform, cycle count and shown time stay fixed.
- Limitation: invented one-channel signal, rather than source sound; deliberately low rates keep points visible and are not recommended production settings. The source itself has 48,000 samples/s per channel.

Keep visible HTML text equivalent to the SVG substance, as existing TimeDiagrams does. If the SVG is `aria-hidden`, nearby text must convey the current rate/count and unchanged two cycles/2 ms, plus dots representing values measured at sample instants. A single polite status region for the recomputed summary may help, but avoid announcing every point.

Do not connect sample dots with a polygon or stepped line labelled as reconstructed audio. A dense path approximation of the analytic sine is legitimate if it is identified as the original explanatory curve, computed separately from the selected samples. The finite drawing is illustrative; it is not a reconstruction algorithm. No need to introduce quantisation, bit depth, anti-alias filters, channel packing, sinc mathematics or an additional FFmpeg task on this first-principles page.

## Meaningful model checks for implementer

- Counts are 8/16/32 on [0,0.002 s); first time is zero and last is less than duration.
- Gaps are 1/fs and increase correctly when rate decreases.
- Dot values equal the fixed sine at their own times; positive and negative values occur.
- The 4,000-rate instants/values are a subset of those at 8,000 and 16,000 for this phase-aligned model.
- Sample count divided by selected sample rate remains 0.002 s for every setting; tone frequency and analytic curve do not change.
- At 4,000 Hz the first four relative values are approximately [0, 0.8, 0, -0.8]. Use tolerance for floating-point zero.
- Reject nonfinite or nonpositive sample rates and invalid durations if exposing a general helper; no need to add a general DSP API for this small figure.

## Sources actually retrieved and checked

All retrieved on 29 October 2026 through the configured network proxy after reading the cloud-environment runtime/network skill and checking current enforced unrestricted policy. Raw source copies are under `/workspace/scratch/sample-rate/sources/`.

1. **W3C Web Audio API Recommendation**, [AudioBuffer](https://www.w3.org/TR/webaudio-1.0/#AudioBuffer), [BaseAudioContext.sampleRate](https://www.w3.org/TR/webaudio-1.0/#dom-baseaudiocontext-samplerate). AudioBuffer represents one or more channels of linear PCM; its sample rate is in sample-frames/s. The duration attribute is the buffer's length divided by its sample rate. BaseAudioContext defines its sample rate “in sample-frames per second” and Nyquist frequency as half that value. This supports per-channel timing, units, N/fs and distinction between sample values and signal cycles.
2. **Steven W. Smith, The Scientist and Engineer's Guide to Digital Signal Processing**, Chapter 3, [ADC and DAC, hosted by Analog Devices](https://www.analog.com/media/en/technical-documentation/dsp-book/dsp_book_Ch3.pdf), printed pp. 38–41, especially Fig. 3-3 and surrounding prose. The chapter explicitly gives 3.2 samples per sine cycle as proper sampling under the signal-frequency constraint and says reconstruction “must be more sophisticated than just drawing straight lines between the data points”. Its sampling-theorem discussion requires signal frequencies below half the sample rate. This directly rules out the misleading inference that denser dots are required for an accurate low-frequency sine or that joining dots models playback.
3. **FFmpeg filters documentation**, [asetrate](https://ffmpeg.org/ffmpeg-filters.html#asetrate): “Set the sample rate without altering the PCM data. This will result in a change of speed and pitch.” [aresample](https://ffmpeg.org/ffmpeg-filters.html#aresample): “Resample the input audio to the specified parameters, using the libswresample library.” This is the concrete tool-level distinction behind the playback caveat. No new command is proposed for the learner.
4. **FFmpeg resampler documentation**, [description and options](https://ffmpeg.org/ffmpeg-resampler.html): confirms distinct input and output sample rates and the resampling operation. Used as corroboration; the page is not needed in learner prose.
5. **Repository media evidence**, `src/notebook/visuals/media.json`, `source.streams` and raw `probe.lines`: source audio is AAC, 48,000 Hz, stereo; source video is 24 fps. Treat those as fixture evidence, not new measurements by this agent.

The initial attempt to fetch `https://www.dspguide.com/ch3/2.htm` returned HTTP 465; the identical book chapter was obtained successfully from Analog Devices. This is not a fact-verification blocker.
