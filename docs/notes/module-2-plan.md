# Module 2 — Cutting and joining

Copyright © 2026 Christopher Snow.

## Authorised scope and prerequisites

The owner requested Module 2 directly on 17 October 2026. Implement a complete standalone lesson; Module 1 remains planned. Adapt the Module 0 authoring and review workflow to this directory. The learner needs file/browser familiarity and the picture/stream concepts from Module 0; a short recap introduces FFmpeg, copy versus encoding, inputs/outputs and commands locally. No command execution or installed software is needed to complete the browser lesson.

## Outcome and example

Edit the existing original build-queue recording: keep the opening context, remove waiting, and show the sorted result. Learners compare requested cut ranges with independently decoded outputs, choose clip order and result hold length, and explain why the output clock differs from the source clock.

## Verified-media-first design

Generate a derivative of the existing recording with controlled H.264 keyframes every two seconds, no B pictures, and the existing synthetic tone. Compare three two-second requests starting at 1, 3 and 5 seconds using input seeking with stream copy versus video/audio trim filters followed by encoding. Record actual streams, keyframes, PTS, durations, first/last images, commands and tool versions. Verify copied decoded pixels against the exact source pictures and encoded results against source pixels with a bounded codec-error tolerance. Report picture duration separately from container duration and any audio/video start offset.

Join A=[0,2) and B=[4,6) or B=[4,8), in AB or BA order, using trim/atrim, reset timestamps for each segment, then the concat filter and encode. Four precomputed playable results demonstrate order and hold duration. These are real recorded outputs, not processing performed by the browser. Arbitrary edits and a general editor are out of scope.

## Ten-section arc and controls

Question: preserve action and result while cutting waiting. Motivation: named recording, source player and FFmpeg bridge. Prediction: a requested cut between keyframes, with visible evidence. Investigation: select start and copy/encode; inspect real result, first/last decoded stills, keyframe strip, measured times and recorded command. Construction: arrange A and B, choose B's end, inspect output timeline and play the generated join. Failure experiment: test keeping source timestamps rather than rebasing; an explicitly mathematical timeline shows a gap, without pretending to render a broken export. Explanation: seek/copy versus trim/encode, timestamp reset, concat prerequisites and cut versus transition. Generalisation: different GOPs, VFR, audio boundaries and format compatibility. Challenge: a concrete edit brief with six independently graded choices/numbers, five hints, useful feedback, retry/reset/persistence. Reflection: compare accuracy, waiting and time to read the result.

## Accuracy boundaries

Only this controlled source has two-second keyframe spacing. Stream-copy behaviour depends on seek position, command, container and player; observed early pictures here are not a universal claim. All source bounds are inclusive start/exclusive end and aligned to this fixture's pictures. Audio uses different boundaries. Browser seeking is approximate; reference stills and native measurements establish cut positions. A hard cut introduces no overlap; a transition would blend/overlap and needs a different duration model. The concat filter requires matching stream parameters and zero-based segment timestamps; these fixtures already have compatible dimensions/rate/channel layout. No silent format normalisation is claimed.

## Validation and independent review

Pure timing and grading tests cover end exclusion, invalid intervals, join ordering, source/output time mapping and numeric input errors. Native verification checks committed media and metadata. Playwright exercises all cut choices, both join orders/hold lengths, prediction, failure experiment, reference challenge, errors, saved work/reset, navigation, media failure, themes and responsive layout. Run full npm run check, separate prose drafting from this verified fact brief, then reader → sceptic → ranked fixes → checker. Deploy main under standing owner authorisation and verify public assets and interaction.
