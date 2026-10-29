# Audio samples page — separate prose draft

Copyright © 2026 Christopher Snow.

Drafted `src/notebook/pages/frames-time-samples.ts` separately from implementation, from the verified brief `/workspace/scratch/resolution-audio/audio-facts.md`. Read the repository AGENTS.md, notebook plan, PageCopy type and existing frame-rate/inspection pages for authoring and style context.

The first concept paragraph defines audio sample rate, sample and channel and explains that stereo retains its per-channel Hz value. It is ready for the unchanged sample-rate model immediately after paragraph 0. The next paragraphs define resampling and explain the representable-frequency tradeoff and irreversible loss of discarded detail without introducing another mathematical prerequisite. Rates are explicitly exercise choices rather than delivery defaults.

There are exactly two worked entries for the builder's verified commands:

1. `ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 24000 resampled.wav`
2. `ffprobe resampled.wav`

Every flag and output choice is explained beside its command. The second entry asks the learner to inspect actual duration, rate and stream presence. Its channel wording tolerates `stereo` or `2 channels` output. Worked and practice counts are per channel: 96,000 and 64,000 over four seconds respectively.

Independent practice requests `practice-samples.wav`, four seconds, audio only at 16000 Hz, with five progressive hints. Replay instructions ask for pace/pitch comparison without guaranteeing an audible difference. The check limitation names duration, actual sample rate and audio/video presence; listening and source-content comparison remain manual. Further reading links back to the picture-rate page.

The existing SampleRateDiagram strings are untouched. No files outside the new page and this drafting record were changed.

Builder-facing grading copy review: `Audio sample rate … Hz per channel` is accurate. Suggested more readable expected/found punctuation. A present audio stream with a missing rate should be labelled `sample rate unavailable`, rather than `no audio`.

Validation: `npx prettier --check src/notebook/pages/frames-time-samples.ts` passed. No integration or built-site validation was claimed by this prose author; those belong to the builder and independent reviewers.
