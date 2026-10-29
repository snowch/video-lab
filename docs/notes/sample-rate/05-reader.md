# Independent built-page learner review

Copyright © 2026 Christopher Snow.

Reviewer: independent reader agent; no app fixes authored. Reviewed 29 October 2026 against the existing `dist` served at `http://127.0.0.1:4191/video-lab/`. Read `AGENTS.md`. Audience: a technically experienced computer user who has completed Chapters 1–2 but has no prior audio/video theory. This is an observed browser review, not acceptance of author statements. Chromium/Playwright used desktop 1440×1100, phone 390×844, and 320×900 with normal and 200% root text, in light and dark. The 200% check increases root font size; it is text enlargement, not whole-browser zoom.

## Findings for sceptic review

### R1 — Medium: the audio sample's underlying quantity remains abstract

Route: `#/learn/frames-time/rate`, Audio sample rate section.

Actual text: “Audio sample rate is the number of signal values stored per second for each audio channel. A sample is one value at one instant”; then “The curve’s height is the signal value: positive above zero and negative below.” The y-axis reads “Relative signal value”, with +1, 0 and −1.

This introduces `sample`, `channel`, `Hz` and milliseconds in useful, local explanations. However, as a media beginner, I can count dots without understanding what a sound value represents or what it means for sound to be negative. “Signal value” explains the curve through the same undefined quantity used to explain a sample. Chapters 1–2 establish that an audio stream carries sound; they do not supply that missing physical/representation link. The chart makes time and counts clear, but the measurement's meaning remains assumed.

Suggested direction: give a short concrete account of the quantity represented by the changing sound signal, its neutral point and its signed values. Keep this near the definition/model rather than adding a separate box or a long audio theory diversion. Do not equate negative values with quieter sound or digital sample size with loudness.

Evidence: `rate-dom.txt`, `inside-video-inspect.txt`, `rate-phone-light.png`, `rate-phone-dark.png`, `rate-320-light-1x-model.png`.

### R2 — Low: sample marks shrink under combined narrow width and text enlargement

Route: `#/learn/frames-time/rate`, sample-rate chart.

At 320 CSS pixels and 200% root text, the surrounding labels enlarge and reflow correctly, but the chart's SVG is about 198×74 CSS pixels (normal 320-pixel layout gives about 256×96). The relative chart width decreases because enlarged y-axis labels consume more width. The tiny point marks do not grow with the enlarged text. At 16,000 samples/s, individual dots become hard to distinguish from the curve even though the 32 vertical stems can still be seen. The 24-picture frame-rate row similarly uses a roughly 256×19-pixel SVG at this enlarged-text width.

This is a low-severity visual legibility concern, not a page overflow or inaccessible-control failure. The displayed sample count, interval, explanation and native selector remain readable. The graph still conveys two fixed cycles, but learners who enlarge text gain little enlargement of the critical sample marks.

Suggested direction: preserve recognisable sample marks and a useful plot height at narrow/enlarged-text sizes. Retain the numerical equivalent and avoid introducing horizontal page scrolling.

Evidence: `rate-320-light-2x-svg.png`, `rate-320-light-1x-model.png`, `rate-320-light-2x-model.png`; measured SVG rectangles were read from the actual rendered browser elements.

## Positive observations and checks

- The requested order is clear: Frame rate definition → frame-rate model → Audio sample rate definition → interactive sample-rate model → command activity. The frame model shows two rates across the same one-second width. The sound model preserves two cycles over the same two milliseconds when its rate changes.
- Native selector choices 4,000 / 8,000 / 16,000 visibly produce 8 / 16 / 32 dots, confirmed by rendered SVG circle counts. The displayed intervals are respectively 0.25 / 0.125 / 0.0625 ms. The text explicitly excludes the 2 ms endpoint; no ambiguous extra endpoint sample was counted.
- Keyboard use changed the select to 16,000 and retained a visible 2px outline. The desktop selector is 44 CSS pixels high. Touch-form operation at phone width changed the rate and command-builder values successfully.
- No horizontal page overflow at 390 or 320 CSS pixels, in either colour scheme, including 200% root text. Sample labels, axis labels and legend remain present. At 200%, axis unit labels wrap onto two lines but remain interpretable.
- The invented signal is clearly labelled. Text says these low rates keep dots visible, are not export suggestions, and that the source has 48,000 samples/s per channel. Nothing in this section claims that more dots always mean better sound, or confuses sample rate with bitrate or video frame rate.
- `Replay source` produced a ready browser video player with controls. The example command actually ran in the browser: raw FFmpeg output reported 48 output frames, 12 fps video and 48,000 Hz stereo audio; `paced.mp4` replay/download controls appeared. I did not acoustically assess playback in the headless browser.
- Copy command wrote the complete expected command to the clipboard; Download command generated `command.sh`; Command builder applied a changed `fps=10` value to the visible editable command; hint and reference-command controls revealed relevant guidance; Notes opened its text field and record-download action. I did not exhaust all five hints, run the independent practice, or test unrelated global App status/Files actions.
- Representative definition styling was read on `#/learn/first-edit/shorten`, `#/learn/inside-video/inspect`, `#/learn/quality/quality`, and `#/appendix/codecs`. Real `dfn` elements highlight only the term in bold with a contrasting tinted background. Surrounding explanatory prose stays ordinary. This makes definitions easy to find without boxing every paragraph. The sampled terms include cut/duration, streams/container/codec/frame/pixels/demuxer/bitrate, lossy compression/encoder/CRF, and codec/encoder/lossy/lossless/bitrate/sample rate in the appendix. Light/dark sample-rate views preserve this distinction.
- Chapter 2's frame/pixel/container/codec explanations and its separate treatment of sample rate prepare this page well. Chapter 9 and the codec appendix explicitly distinguish bitrate, quality and sample rate; the sampled text does not encourage a simple “higher is better” quality rule.

## Evidence files

`rate-dom.txt`: complete initial visible page text.

`browser-checks.json`: viewport overflow, keyboard selector focus/outline/height and replay state.

`control-checks.json`: rendered sample counts, clipboard/download/builder and revealed guidance.

`rate-after-run.txt`: actual browser FFmpeg command output and rendered output controls.

Screenshots: `rate-desktop-light.png` (whole page), `rate-desktop-dark.png` (top), `rate-phone-light.png` and `rate-phone-dark.png` (definition), `rate-desktop-select-keyboard.png` (focused selector/model), `rate-320-{light,dark}-{1,2}x-{definition,model}.png`, `rate-320-light-2x-svg.png`, `rate-command-builder.png`, `rate-run-desktop.png`, `rate-phone-guidance.png`. Representative route text and full-page dark screenshots are saved alongside this report.

No critical or high-severity findings. No authoring files edited, and no full repository quality check claimed.
