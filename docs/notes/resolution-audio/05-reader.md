# Independent built-site learner review

Copyright © 2026 Christopher Snow.

29 October 2026. Reviewer: a fresh agent/session that did not author the implementation or prose. Read `AGENTS.md`, then visited the built preview at `http://127.0.0.1:4192/video-lab/` before reading implementation sources or drafting briefs. Product files were not edited. This is the reader pass; findings still require the separate sceptic pass.

## Scope and evidence

Reviewed `#/appendix/resolution`, `#/learn/frames-time/rate` and `#/learn/frames-time/samples` at desktop 1440 × 1000 and phone 390 × 844, in light and dark themes. All twelve initial route/viewport/theme combinations had document scroll width equal to viewport width. Screenshots, text captures, browser scripts and actual command reports are under `/workspace/scratch/resolution-audio-reader/`; the artifacts are intentionally outside the repository.

Read each route in learner order before looking at sources. Exercised both diagram selectors at every available setting, including keyboard Arrow/Enter selection; source replay; editable commands; command builders and applying a changed sample rate; copy/download command; actual encodes; the bare ffprobe inspection; actual output replay controls; output wrapping; practice checking; all five hints; reference-command disclosure; notes; previous/next and browser back/forward; and all four internal appendix continuation links. Processing controls were exercised in representative desktop/phone sessions; the full command sequence was not repeated separately for every theme. Global file-management and App status functionality were outside this narrow content review.

Key artifacts:

- `*-desktop-light.png`, `*-desktop-dark.png`, `*-phone-light.png`, `*-phone-dark.png`: full-page layout evidence.
- `samples-phone-model-16000.png`: readable phone graph, including all 32 samples, axis values, time labels and model caveat.
- `samples-after-probe.txt`, `samples-pass.txt`, `controls-log.txt`, `finish-log.txt`: actual tool output, wrong-rate check and corrected checks.
- `rate-retest.txt`, `rate-retest.png`: clean successful video practice check.
- `resolution-phone-0.png`, `resolution-phone-1.png`, `resolution-phone-2.png`: all highlighted resolution options.
- `supplementary.json`: keyboard and internal-link/back/forward observations.

## Ranked findings

### R1 — Low: comparison outlines do not identify the other resolutions

Exact invitation: “Choose a landscape grid to compare its dimensions and pixel count with the others.” The default selected value is “720p · 1280 × 720”; the figure reports “1280 × 720 · 921,600 pixels per frame”. The selected fill is identifiable, but neither dashed alternative rectangle has a visible label or legend. A learner must infer the mapping from relative size or cycle through the selector and remember it before comparing the outlines. This is most noticeable on a phone, where there is no nearby persistent list of all three dimensions after the selector closes.

Evidence: `resolution-phone-light.png` and the three `resolution-phone-*.png` option captures. Subsequent source inspection confirms that the SVG contains only rectangles, and the visible output describes only the currently selected grid.

Suggested direction: add a compact keyed list/legend for all three outlines, or label their edges outside the drawing. Keep the existing calculated-model caveat and avoid implying picture-detail comparisons. This is a small clarity improvement, not a factual error or blocker.

No high- or medium-severity content or interaction finding was established.

## Learner progression and factual observations

The separation works as a short progression. “Count pictures through time” explains fps, then changes picture count over a fixed four seconds. Its next page is “Count sound samples through time”; that page defines a sample, channel and per-channel sample rate before asking for an audio-only resample, then continues to “Locate each picture in time”. I found no new unshown prerequisite needed to perform the sample-rate task. Existing source/output filenames, `-i`, `-t`, streams and basic ffprobe use are appropriate prior-course knowledge; the audio page still explains every flag used in its new worked command.

The sample figure explicitly says “This invented one-channel signal is not the source recording.” At 4,000/8,000/16,000 samples/s it displayed 8/16/32 samples in 2 ms and 0.25/0.125/0.0625 ms spacing. The curve and its two cycles stayed fixed; the dots became closer. These options make density changes visible without presenting them as recommended export rates. Phone labels, dots and controls remained readable in both themes.

The actual audio command produced `resampled.wav`; the bare inspection report showed `Duration: 00:00:04.00` and `Audio: pcm_s16le ... 24000 Hz, 2 channels ...`, with no video stream. The wrong starter output at 24000 Hz failed with “✗ Audio sample rate: expected 16000 Hz per channel; found 24000”. The corrected 16000 Hz output passed all four checks, including actual duration 4.000000 and absence of video. Source replay exposed an eight-second video; the two audio outputs exposed four-second audio players. I did not make a subjective listening assessment in the headless browser; the page correctly leaves pace/pitch judgement to the learner and states that metadata cannot establish how it sounds.

The video command produced real FFmpeg logs showing 24 output frames for the six-fps practice. The clean final check reported duration 4.000000, audio present, video present and average rate six fps. Source setup required one replay action rather than a sequence of file-management tasks. Raw tool output remained separate from app check feedback.

The resolution guidance provides conditional starting choices, explains upscaling limits and crop/pad/stretch consequences, and asks for a short export tested in the actual receiving app/device. It explicitly says the course source is 854 × 480, so it does not pretend that enlarging it demonstrates HD/UHD source detail. The diagram caveat identifies a calculated dimension model rather than a processed picture. The four continuation links opened their named real pages. The external sources were present as labelled links; this review inspected the supplied verified briefs after the learner pass rather than independently re-fetching the external documents.

## Rejected/transient observations and limits

An initial immediate DOM capture after opening Command builder briefly contained its generic parse instruction. Waiting for the component effect displayed the correct fields; this was an observation-timing artefact, not a retained finding.

During a concurrent full build, one video Check result attempt displayed `TypeError: Failed to fetch dynamically imported module: .../encoder/0.12.10/ffmpeg-adapter.js`. The coordinating builder confirmed that `dist` was being replaced between Vite build and encoder preparation. A fresh browser context after the build completed passed the identical practice check (`rate-retest.txt`). This was not retained as a product finding.

An initial correction attempt omitted `-y` while reusing an output filename; the app exposed its explicit replacement guidance. This is appropriate file protection. The final checks used a fresh context/output and succeeded.
