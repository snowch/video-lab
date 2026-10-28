# CI file-import synchronisation

Copyright © 2026 Christopher Snow.

## Failure and scope

The owner reported failed CI on 28 October 2026. Both Quality checks run 40757899571 and Pages run 40757899588 failed at main 0a5b819, after the file-actions PR 8 merge. Each had 415 passing browser cases, 74 configured skips and the same Firefox failure: tests/files-cleanup.spec.ts waited for Download notes.txt, which never existed. The preceding resizing commit fcb15e3 passed both hosted workflows.

This fix changes only test synchronisation. No learner copy, controls, storage locks, import semantics or timeouts change. Source instructions in AGENTS.md remain applicable; a separate technical checker reviews the correction. A new prose/learner drafting pass is not applicable to this test-only change.

## Cause and deterministic evidence

The test invokes setInputFiles twice in succession. That operation delivers the input change event; it does not await FileManager's asynchronous imported()/w.add() work. Workspace.operation() sets its lock, then awaits refreshing stored files, reading imported bytes and committing them to IndexedDB. A second operation in that interval is rejected with “Finish or cancel the active operation first.” The visible Import button is disabled during this interval, but direct access to the hidden input bypasses it.

Four unmodified Firefox runs passed locally (32 passes and eight configured skips). That does not disprove the asynchronous race. A separate deterministic reproduction pauses the first imported File's arrayBuffer using a controlled promise, with no timed sleep. It confirms that Import is disabled; starting the second import anyway produces the quoted error and leaves notes.txt absent. Releasing the first import and awaiting both its visible committed row and enabled Import before the second produces an exact Original notes download. The script is /workspace/scratch/ci-file-actions/reproduce.mjs. The GitHub artifact download returned Forbidden, so the investigation uses the workflow logs, source and independently reproduced failure rather than claiming to have inspected the hosted trace.

## Correction

After the first setInputFiles, wait for bunny-short.mp4's row and enabled Import. After the second, assert notes.txt's row is present before continuing. These observable conditions establish imported fixtures before the existing media-preview, actual download/content, rename/copy/delete and focus assertions. No retries, sleeps or timeout increases mask the failure. The worktree's unrelated older learner-audit notes are preserved.
