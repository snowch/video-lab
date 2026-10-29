# Verified audio page drafting brief

Copyright © 2026 Christopher Snow.

New route `#/learn/frames-time/samples`, title requested: Count sound samples through time. Insert after Count pictures through time and before timestamps. Move the audio definition and SampleRateDiagram off frames-time/rate; retain its video-only lesson, exact route IDs, commands, drafts and practice.

## Prerequisites and objective

Previous pages teach source/output filenames, -i, -t, ffprobe, audio and video streams, -vn (omit video), and frame rate. Audio page should define sample, channel and audio sample rate before use, distinguish these from video frames, then resample a real output and inspect it. Preserve same four-second interval and natural pace/pitch; the rate counts signal values per second per channel. Stereo does not double the Hz value.

## Verified commands and native measurements

Native FFmpeg and ffprobe version 7.1.5-0+deb13u1, Debian gcc 14.2.0-19. Run 29 October 2026 in `public/media/notebook`, with outputs under this scratch folder; harness used -y solely to replace scratch outputs. Learner commands have no hidden flags.

Worked command 0: `ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 24000 resampled.wav`
Worked command 1: `ffprobe resampled.wav`
Practice starter: `ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 24000 practice-samples.wav`
Practice solution: `ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 16000 practice-samples.wav`

- Source: AAC audio at 48000 samples/s, two channels, eight-second duration.
- Worked output: WAV container, one pcm_s16le audio stream; 24000 Hz, two channels, duration 4.000000 s. duration_ts=96000 and time_base=1/24000: 96000 sample instants/values in each channel over four seconds (192000 scalar values across both channels). No video stream. `ffprobe resampled.wav` really displays `Duration: 00:00:04.00` and `Audio: pcm_s16le ... 24000 Hz, 2 channels, s16, 768 kb/s`. WASM may use stereo instead of 2 channels; do not require exact stream-label wording.
- Practice output: WAV, one audio stream at 16000 samples/s, two channels, 4.000000 s; duration_ts=64000/time_base=1/16000, hence 64000 values per channel. No video.
- -ar sets output audio sample rate in Hz when placed before the output filename. FFmpeg resamples (computes a new sample sequence with new spacing), rather than changing the timing interpretation of the original unchanged sequence. Same interval can therefore have fewer values without running at a different pace/pitch.
- -vn disables video output, keeping the example audio-only. WAV extension selects WAV container; no need to introduce PCM bit depth/codec internals unless essential. Explain -i, -t, -vn, -ar and output filename adjacent to their actual command; ffprobe prints actual output metadata for learner inspection.
- A supporting native generated 1000-cycle/s sine at 48000 samples/s resampled with -ar 24000 yielded 96000 samples over 4.0 s; positive zero-crossing interval measured 1000.0 cycles/s. Command: `ffmpeg -f lavfi -i sine=frequency=1000:sample_rate=48000:duration=4 -ar 24000 tone.wav`. This is supporting evidence, not a new learner command or Bunny-sound pitch measurement.

## Explanatory diagram (unchanged model)

Existing SampleRateDiagram models one analytic mono sine, 1000 cycles/s, fixed amplitude 0.8, interval [0, 0.002 s), two cycles. Controls 4000/8000/16000 samples/s show 8/16/32 sample points, spacing 0.25/0.125/0.0625 ms. Initial 8000. Curve independently computed, unchanged at each setting; right endpoint excluded for sample count. Existing strings explicitly identify invented model and deliberately lower-than-source rates. It is not extracted Bunny audio or actual resampled output. Move it to new page after first concept paragraph (coordinate expected paragraph with builder). Do not claim higher dot count means louder/faster/higher pitch or necessarily better quality. Existing detailed validated brief: docs/notes/sample-rate/02-facts.md.

## Limits and grading

Check actual output using inspectMedia/ffprobe, not command text. Expect duration four seconds, actual audio stream sample_rate=16000 numerically, audio present, video absent. Two-channel source has per-channel rate 16000, not 32000. A wrong 24000-rate output, silent video, missing/unparseable rate, old/changed output must fail. Existing hash evidence verifies current command/input/output. Metadata cannot certify pitch, timbre or subjective quality; replay compares pace/pitch against source opening four seconds. Downsampling can discard high-frequency detail and raising the rate again cannot restore that discarded detail. No pitch-shifting command or guarantee that audio sounds identical.

## Authoring contract

PageCopy needs exactly TWO worked entries matching commands above, plus title, goal, concept, practice, practiceObserve, hints (exactly five), checkLimit. Keep prose separate from command structure. Builder will remove old audio paragraph/heading without otherwise rewriting rate lesson.

## Sources

- Existing retrieved/checked W3C AudioBuffer, Smith DSP chapter and FFmpeg resampler/asetrate/aresample references in docs/notes/sample-rate/02-facts.md. Audio samples/s are per-channel; preserving actual signal timing through resampling differs from retiming unchanged values.
- Native command logs: /workspace/scratch/resolution-audio/native-worked.log, native-practice.log, native-practice-probe.json, native-tone.log. Actual WAV outputs available here.
- FFmpeg CLI docs https://ffmpeg.org/ffmpeg.html#Audio-Options document -ar as output/input sampling frequency, Hz; -vn disables video. Existing flags -i and -t already taught.
