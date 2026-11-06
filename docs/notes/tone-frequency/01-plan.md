# Tone frequency and sample rate

Copyright © 2026 Christopher Snow.

The owner found “the signal repeats 1,000 times per second” confusing, requested the learning-design skill, approved a two-stage mockup, and authorised implementation and merge. Apply the [learning-design skill](https://github.com/snowch/assembly-lab/blob/main/.agents/skills/learning-design/SKILL.md), read on 6 November 2026, and the repository's independent authoring workflow.

## Learning brief

Observable outcome: explain what tone frequency and sample rate each count, and predict which counts change when a fixed-duration tone is resampled. The actual command task remains a four-second audio-only resample followed by inspection and listening.

Inspected in source before implementation: the sample-rate diagram, model, strings, unit and browser tests; frames-time/rate and frames-time/samples copy; original sample-rate fact brief; repository plan and binding instructions. No new browser review has yet occurred. Existing prerequisites cover duration, pictures per second and reading raw ffprobe fields. A wave, cycle, signed signal height and the distinction between two uses of Hz need visible preparation. The owner's question is observed confusion about repetition; confusing dots with cycles or more samples with higher pitch are hypotheses to test, not measured learner findings.

## Verified model and sources

The existing fact brief at ../sample-rate/02-facts.md records W3C Web Audio, DSP and FFmpeg sources. Preserve its fixed sine and half-open sample interval. A cycle completes the repeating shape, from an ascending zero crossing to the next ascending zero crossing. For y(t) = 0.8 sin(2 pi f t), a cycle lasts 1/f seconds. Over 0.004 seconds, 500 Hz gives two cycles and 1,000 Hz gives four. Equal amplitude and a shared time axis isolate frequency. Heights represent signed relative signal values, not a loudness scale. Real recordings need not have one repeating shape or one frequency.

Stage two preserves the existing 1,000 Hz sine across two milliseconds: rates 4,000/8,000/16,000 produce 8/16/32 values and gaps 0.25/0.125/0.0625 ms. More measurements leave this analytic curve and cycle count fixed. Low example rates reveal dots; they are not export recommendations. Resampling calculates new values for the same timed interval; reinterpreting unchanged samples at a different playback rate is a different operation. Existing prose covers per-channel counts, stereo and possible loss of high-frequency detail.

Optional user-triggered playback synthesises a one-second mono sine at the chosen frequency with a short fade at each end and low digital amplitude. Its sample rate comes from the browser AudioContext; it is not the 4 ms drawing played as an audio clip or an extraction of Bunny. Stop and release audio on navigation, switching or completion; report unavailable playback honestly. No permission, external service or processing tools are required. Web Audio AudioBuffer and AudioBufferSourceNode are the playback mechanism: https://www.w3.org/TR/webaudio-1.0/#AudioBuffer and https://www.w3.org/TR/webaudio-1.0/#AudioBufferSourceNode.

## Teaching route and success evidence

First explain signal height and one cycle, then compare two labelled equal-height waves over the same four milliseconds, with a highlighted first cycle and optional hearing. Next show the existing sampling diagram over two milliseconds, explicitly announcing the shorter zoom. Essential explanations remain visible without playback or optional disclosures. Keep units and explanatory limits near each diagram.

A fresh ungraded check asks about a 500 Hz tone resampled from 12,000 to 24,000 samples per second over one second. The correct explanation retains 500 cycles and doubles values per channel from 12,000 to 24,000. Plausible alternatives reveal a pitch-change rule or an unchanged-measurement rule; specific feedback follows submission. This is formative practice, not a recorded achievement or proof of understanding. No learner study is available.

Defer Nyquist calculations, aliasing demonstrations, reconstruction algorithms, bit depth and Fourier analysis. Keep the existing FFmpeg exercises, drafts, files, routes, completion and offline mechanisms unchanged.

## Delivery

Model and meaningful unit checks precede separate prose drafting. Independent built reader review at phone/desktop and light/dark, separate sceptic and independent checker follow. Test synthesis values and frequency, cycle geometry, playback cancellation and unavailable state, fresh-check feedback, keyboard operation, reflow, saved drafts and zero processing downloads. Run the full npm run check gate and green GitHub CI before merge under the owner's explicit authorisation. Record results and limits in this directory.
