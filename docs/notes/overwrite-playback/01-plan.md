# Media playback after replacing a file

Copyright © 2026 Christopher Snow.

The learner reports that audio disappears after overwriting a filename with FFmpeg. Original-source playback works. First distinguish actual silent output from browser player/resource state; a successful encode or `play()` promise alone is not evidence of sound. Verify saved bytes with native probes and measured decoded samples; inspect the actual HTML media pipeline with a WebAudio analyser. Preserve explicit overwrite protection and failed-run file retention.

Investigate FilePreview lifecycle, asynchronous file refresh, current-cell versus retained-player behaviour and old events during replacement. Build a narrow regression from verified findings before editing. Source/lesson commands and learner prose need no change for a playback lifecycle fix. Use distinct reader, sceptic and built checker passes. Full `npm run check` remains the merge gate. The source workflow, plan and style files read for the preceding slice remain applicable.

Limit: phone viewport/touch emulation does not reproduce a physical Android audio backend. Report this explicitly; do not claim the exact reported silent playback reproduced without evidence. The standing authorisation to merge reviewed fixes applies.
