# Resolution and release gate

Copyright © 2026 Christopher Snow.

The practice target, solution, hints and comparison now use 1 fps: four pictures
over four seconds, with sound at its original pace. The worked 12 fps example and
the 12 fps starter remain as the comparison and starting point. Existing saved
commands remain editable and are not replaced by the new solution.

New native and browser execution records preserve the genuine command, probe and
tool versions. Historical 6 fps records remain intact. Verification now requires
four decoded frames, 1/1 average rate, four-second video/audio/container durations
and an audio stream for both executions. Independent decoded-picture timestamps
and audio-content/timing comparisons support the explanation beyond metadata.

Separate drafting, learner review, sceptic review and final checker records are
included here. The sceptic's singular-label finding is resolved: the built checker
now says “1 frame per second”. The final focused Chromium/Firefox regression
passed two tests, rejecting the former 6 fps answer and a silent output before
accepting the real 1 fps result. The final checker also verified layout and an
independent real execution. No outstanding review finding remains.

The full release gate is `npm run check`, identical to CI. Its final local and
GitHub results are recorded in the associated pull request before merge; the
focused checks alone are not a claim that the full release gate has passed.
