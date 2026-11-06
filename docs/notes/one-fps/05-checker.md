# Independent final checker: one-picture-per-second practice

Copyright © 2026 Christopher Snow.

A separate checker inspected the final built page on 6 November 2026 at
`http://127.0.0.1:4173/video-lab/#/learn/frames-time/rate`. This agent did not
edit the implementation, prose, regression test or recorded command evidence.
No rebuild or full quality gate was run by this checker.

## Built-page checks

Ran `node /workspace/scratch/one-fps/final-check.cjs` successfully. It opened
fresh contexts at 390 and 1365 CSS pixels, light and dark themes, normal and
200% root text sizes: eight combinations. In each combination it verified:

- The practice requests the opening four seconds at 1 fps with sound, and its
  comparison explains four total frames, each shown for one second.
- The worked command remains at 12 fps. The practice starter also remains at
  12 fps, so the learner must make the requested change.
- All five hints are available; the fourth specifies `fps=1` and the reference
  command uses `fps=1` with the four-second interval and original audio enabled.
- The document has no horizontal overflow at the tested sizes and scales.

Native screenshots of the practice panel were inspected at phone/light and
desktop/dark sizes. The instruction, comparison, check limitation and controls
are readable. Enlarged-text cases were measured by the script; this is not a
physical-device or assistive-technology certification.

## Independent execution and S1 resolution

The checker edited a fresh practice cell to
`ffmpeg -i bunny-short.mp4 -t 4 -vf "fps=1" checker-rate.mp4`, reloaded the page
and verified that the authored command persisted. It then ran that actual command
and activated Check result. The built page reported that the checked properties
match and visibly displayed **“Average rate 1 frame per second”**. The result
screenshot was inspected. Sceptic finding S1 is resolved in the built UI.

Downloaded the resulting file and independently ran native ffprobe with
`-count_frames -show_streams -show_format -of json`. It reports four decoded
video frames, average rate `1/1`, video duration 4.000000 seconds, an audio stream
lasting 4.000000 seconds and container duration 4.000000 seconds. This check
establishes actual output properties rather than inferring them from the command.

The final targeted regression log was also inspected:
`/workspace/scratch/one-fps/test-run-final.log` reports two passes in 15.3 seconds,
one each in Chromium desktop-light and Firefox. That test performs the former
6 fps rejection, silent 1 fps rejection and specified 1 fps-with-sound acceptance,
then counts the downloaded output's frames and checks its durations and streams.
Those negative cases were run by the separate regression agent, not represented
as additional independent executions by this checker.

The sceptic's independent audio-content/timing comparison and browser playback
record address evidence beyond stream presence. This checker does not claim to
have listened through physical speakers or repeated that signal comparison.

## Evidence and limits

Measurements and the independent result/probe are in
`/workspace/scratch/one-fps/final-check.json`; screenshots are
`final-390-light.png`, `final-390-dark.png`, `final-1365-light.png`,
`final-1365-dark.png` and `final-check-label.png` in the same directory.
The executed checker command and captured stdout are `final-check.cjs` and
`final-check.log`; its downloaded output is `final-checker-rate.mp4`.

No further actionable issue was found in this focused check. The parent owns the
full `npm run check` and GitHub results. This review verifies the changed exercise
and representative controls, not every lesson or browser implementation.

Read the completed reader and sceptic notes before final sign-off. Their bounded
conclusions are supported by the checks above; S1 has a verified built-page fix
and no additional finding remains unresolved.
