# Ranked fixes and builder verification

Copyright © 2026 Christopher Snow.

23 October 2026. The separate learner completed the command-led path, a changed six-second join, replay and MP4/recipe downloads. No blocking teaching finding was reported. The separate sceptic tests the findings against real WASM execution and source.

1. **C2, low — accepted.** The core can print the exact bare `Aborted()` line both on successful FFmpeg runs and actual status-1 failures. Keep every raw line, keep nonzero execution as failure, and append the separately drafted explanation only when the observed line is exactly `Aborted()` and the actual FFmpeg return status is zero. Do not describe all abort messages as harmless, convert a failure to success, or hide the core's messages. Actual output remains replayable/downloadable and subject to ffprobe/native verification. The core JS `exec` catches Aborted-prefixed exceptions then returns `Module.ret`; this pinned behaviour is distinct from ffprobe's validated -1 cleanup sentinel.
2. **C1, low — accepted.** The primary workspace moved above the instructions. The prose drafter removed the stale word “below”, leaving the exact Command field label. No control or command is renamed.

## Implementation issues found during executable checks

- Initial command parser accidentally treated a backslash-newline continuation as an empty argument. The parser now removes it without starting a word; the quoted/filter/continuation unit test pins this behaviour.
- Navigation tests could target the prior step's still-mounted prompt before the route update. The browser helper now waits for the workspace's actual step attribute; step cleanup uses a layout effect so work is cancelled before the next page becomes interactive.
- Initial legacy migration test injected old database data after the already-mounted provider had read it, then mounted the workspace with that stale empty state. Reload the reference page before opening Capture to reproduce a genuinely pre-existing project. Old records and challenge completion are independently asserted.
- Firefox persisted Blob handles failed after reload when startup re-saved every loaded Blob to its own key. Restore now writes only new legacy additions and never replaces already-stored files while their read handles are in use. A separate diagnostic proved generated joined MP4 playback before and after reload; the all-project regression covers persisted playback and actual offline encoding/probing.
- Readiness checks now verify tool availability before attempting module-worker loading, including when navigator.onLine is stale. Cancellation/deadlines cover input loading, module import, worker loading and execution in the engine. No-tools offline attempts fail with a useful error; explicitly saved tools execute offline.
- A rapid reload after rm exposed a misleading retained completion status while the database deletion was pending. rm/import now mark their asynchronous work running and complete only after the storage attempt. Navigation/cancellation generation guards prevent a late command status replacing the next step's state. Storage failure remains an explicit session-only warning.
- Output names are bounded to sixty-eight characters so the full `.recipe.json` suffix fits the eighty-character file-name limit without truncating distinct names into the same recipe.

The join example additionally makes yuv420p/faststart explicit. Firefox's reload failure was traced to Blob replacement, not attributed to that command change. The revised join is executed against WASM and independently inspected as a five-second silent H.264 result.

Optional provided Build/Edit reference outputs and the credited Big Buck Bunny comparison remain available through explicit commands. They retain provided-origin labels, do not generate fake execution recipes, and are not fetched merely by opening a lesson. Fixed-fixture reference lessons, shared platform, bookmarks and saved progress are preserved.
