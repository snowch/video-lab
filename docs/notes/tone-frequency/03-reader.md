# Fresh reader review: tone frequency and sample rate

Copyright © 2026 Christopher Snow.

Reviewed the actual built `#/learn/frames-time/samples` page at `http://127.0.0.1:4173/video-lab/` on 6 November 2026. This reviewer did not author the product or lesson prose. Scope was the learning route, visible prerequisites, diagrams, optional tone controls and fresh prediction check. Read the slice plan, then formed this review from the page before reading the sceptic's conclusions.

## Findings and direction

No actionable learning or layout finding in the inspected states; no severity-ranked fix is requested. Retain the following connections rather than shortening them into unexplained labels:

- “One cycle is a complete repeat of the wave. The bracket starts where the curve passes upwards through zero and ends when it does that again.” The bracket and shaded first cycle make the repeat count inspectable: the 500 Hz plot has two complete cycles over 4 ms, and the 1,000 Hz plot has four. Equal heights and matching time axes allow this comparison without assuming knowledge of waveform notation.
- “Here, the curve’s height shows a relative signal value: positive above zero and negative below it.” The nearby resting-level and “not a loudness scale” explanation supplies the signed-height prerequisite before the plots. Frequency, cycle, sample and channel are defined visibly; essential reading does not depend on hearing a tone or opening a disclosure.
- “Now zoom in from 4 ms to 2 ms and keep the 1,000 Hz tone fixed.” This explicitly explains the changed time window before the second diagram. “Counting the dots counts measurements, not cycles” connects the new marks to the prior repeating curve. Changing the rate visibly changes dot density while preserving that curve.
- “Both can be labelled Hz, so check which rate a number describes.” This addresses the shared unit directly. The invented-tone, single-channel and low-example-rate limits are adjacent to the figures; learners are not invited to infer that Bunny contains a single repeating wave or that 4,000 samples/s is an export recommendation.
- The resampling explanation precedes “Predict a resample.” The new 500 Hz, one-second, 12,000-to-24,000 example requires transferring the distinction beyond the displayed sampling example. Incorrect pitch feedback says, “1,000 cycles in one second would mean a higher-pitched tone”; incorrect unchanged-count feedback explains why each channel now needs 24,000 values. These identify the mistaken rule, rather than only marking the choice wrong. The check is visibly separate from the existing command practice.

## Actual browser observations

A scratch Playwright Chromium probe covered 390 px phone and 1,365 px desktop in light and dark themes. In all four combinations:

- First-cycle highlights occupied half and one quarter of the common four-millisecond plot domain, matching 500 and 1,000 Hz.
- Selecting 4,000, 8,000 and 16,000 samples/s yielded 8, 16 and 32 dots; displayed spacings were 0.25, 0.125 and 0.0625 ms. The curve path remained identical.
- Keyboard selection changed the rate; its focus outline was visible. Arrow navigation changed the prediction radio selection. Check prediction was disabled before a choice, and all three submissions produced specific feedback.
- The 500 Hz tone control entered its playing state and stopped on request. The 1,000 Hz control entered its playing state and returned automatically. No processing-tool request occurred during these interactions.
- At 200% root text size there was no document horizontal overflow. Screenshots were captured for each normal figure and the enlarged sampling figure.

Visually inspected phone light and dark tone figures, desktop dark tone and sampling figures, the phone dark prediction check, and the phone light sampling figure at 200% text. Prose, chart labels and control names remained readable. On phone, the longer 1,000 Hz playback button wraps below its label without covering the plot. The shaded first cycles remain distinguishable in both themes.

After the final audio-startup adjustment was rebuilt, a fresh 390 px dark Chromium check again passed 500 Hz start/stop and 1,000 Hz natural completion, and confirmed exactly one sampling-diagram selector. Viewed its new tone screenshot. The three-second unavailable-audio branch is delegated to the separate sceptic; this review does not claim to have exercised that branch.

Scratch evidence: `/workspace/scratch/tone-frequency/reader/review.cjs`, `measurements.json`, `tone-*`, `sample-*`, `check-*`, and `tone-final-390-dark.png`.

## Limits

This is an independent reviewer inspection, not observation of a recruited learner or evidence of learning gains. Browser playback observations concern actual control/status transitions, not audible output on a physical device. I did not certify physical sound level, independently audit the synthesis implementation, repeat FFmpeg processing, or run the full quality gate. The sceptic and final checker own their separate source, execution and completion checks.
