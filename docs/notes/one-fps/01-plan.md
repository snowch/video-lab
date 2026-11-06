# One-picture-per-second practice

Copyright © 2026 Christopher Snow.

The owner requested a more visibly jumpy frame-rate exercise. Change the practice
target from 6 fps to 1 fps while retaining the opening four seconds and sound.
Keep the worked 12 fps example and the deliberately incorrect 12 fps starter.
Update the solution, expected rate, hints, comparison and recorded executions
together. Preserve existing drafts rather than overwriting learners' commands.

Verified fact brief: native FFmpeg executed
`ffmpeg -i bunny-short.mp4 -t 4 -vf "fps=1" practice-rate.mp4` on the supplied
eight-second source. ffprobe with `-count_frames -show_streams -show_format`
reported four decoded video frames, rate `1/1`, video and container duration
4.000000 seconds, and an AAC audio stream lasting 4.000000 seconds. At constant
1 fps each picture spans one second. Sound remains at its original pace; reducing
video picture rate does not slow the scene or sound. Browser execution must also
be measured before claiming compatibility.

Use separate prose drafting, built-page reader/sceptic/checker review, a real
browser 1 fps execution, acceptance/rejection checks and the full `npm run check`.
Record actual native/WASM evidence; retain historical evidence honestly labelled
as historical rather than rewriting old logs to resemble new executions.
