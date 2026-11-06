# Independent sceptic review: one-picture-per-second practice

Copyright © 2026 Christopher Snow.

A separate agent reviewed the fact brief, drafted prose, structure, grading and
actual native/WASM evidence on 6 November 2026. The reviewer made no implementation
changes and did not run a rebuild or full quality suite.

## Facts and teaching

The practice consistently requests the opening four seconds at 1 fps with sound.
The solution and expected rate use 1; the worked example and deliberately incorrect
starter retain 12. The comparison and last two hints agree with that distinction.
The prose explains reduced temporal detail rather than slow motion: the four-second
interval and original sound pace remain. No new prerequisite is assumed.

The existing check-limit statement remains accurate: the learner's automatic check
verifies duration, average rate and audio/video stream presence. It asks the learner
to replay for motion and sound pace. Neither the prose nor this review treats stream
presence alone as proof that the audio contains the correct sound.

The native probe records four decoded video frames at `1/1`, with four-second video,
audio and container durations. The actual browser record reports the same measured
properties, and its FFmpeg log identifies the pinned WASM build and actual command.
The downloaded browser output hashes to
`d86f54dce07a0c06d7c6b9f38ca9552b13cca8269f0f072d72c16fde2f5999cc`,
matching the persisted execution record. This is evidence from the generated file,
not an expected result substituted into the log.

Independent native decoding of that browser output found four distinct frame
checksums. Their presentation timestamps are 0, 1, 2 and 3 seconds, each with a
one-second duration. This supports the comparison's four-picture total and
one-second picture intervals more directly than average frame rate alone.

## Audio and playback challenge

Decoded the source's opening four seconds and the hash-matched WASM output to mono
48 kHz float samples. Each interval contains 192,000 samples. Source RMS is
0.0334703061; output RMS is 0.0333914029. Their zero-lag normalised correlation is
0.9998317659. The high alignment and non-zero signal support retained audio content
and timing through this specific conversion, rather than merely an AAC stream's
presence. Lossy re-encoding means byte-for-byte identity is not expected.

The builder's actual Chromium playback record reaches `currentTime=4`,
`duration=4`, `ended=true`, `muted=false`, `volume=1` and `readyState=4`. This shows
that the generated low-rate file advances through playback. The decoder and
browser-state evidence do not establish audibility through a physical device's
speakers; no such listening claim is made here. The focused regression also checks
that the former 6 fps answer and a silent 1 fps answer are rejected, while the
specified command is accepted and its downloaded frames/audio are inspected.

## Built-page review and finding

Independently inspected the built practice panel at 390 pixels/light and
1365 pixels/dark. The complete instruction, comparison, check limitation and
12 fps starter remain readable without document overflow. The instruction is
visibly 1 fps while the starter is 12 fps, making the required edit necessary.

S1 — low: the generated technical-check label originally read “Average rate 1
frames per second”. This new singular target exposed a plural-only label in
`Workspace.tsx`. The builder accepted the finding and added singular/plural
selection while preserving other rates. The regression expectation now uses
“Average rate 1 frame per second”. Source correction verified. The separate final
checker executed the rebuilt command and captured “✓ Average rate 1 frame per
second”; this reviewer inspected that actual result screenshot. S1 is resolved.

## Reader assessment

Read `03-reader.md` after its browser evidence and final focused regression were
recorded. Its no-additional-defect conclusion is accepted: the independent prose
and built-page review above confirms that the 12 fps starter is intentional, the
1 fps target is clear and the comparison describes the measured output. The
reader correctly limits its RMS observation to non-silence and its browser-state
observation to playback progress; the separate correlation check supplies stronger
content/timing evidence without claiming physical-device audibility. No reader
finding was rejected. S1 was the only additional finding and is resolved.

## Evidence and limits

The independent audio comparison is retained in
`/workspace/scratch/one-fps/sceptic-audio-comparison.json`; practice screenshots are
`sceptic-practice-390-light.png` and `sceptic-practice-1365-dark.png` in that directory.
Native frame timestamp/checksum probes were run against the hash-matched browser
file. Browser execution/playback records and regression results were inspected,
not represented as runs performed by this reviewer. This is a focused review of
the changed exercise, not a certification of every browser or physical device.
