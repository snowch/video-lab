# CI file import — independent review

Copyright © 2026 Christopher Snow.

28 October 2026. Separate checker; no product edits, builds, Playwright CLI/global setup, commits or pushes. Reviewed the failing test, actual import/storage source, `01-cause.md` and the final test-only diff. Independently exercised Firefox against the parent's existing built preview on port 4177 with a standalone external script.

## Decision

The correction addresses the demonstrated asynchronous race without weakening the test. No finding or additional change requested.

`setInputFiles` dispatches the file input change event; `FileManager` starts `imported()` without returning its asynchronous completion to that operation. `Workspace.operation()` acquires its lock before awaiting refreshing files, reading bytes and committing IndexedDB. A second import during that interval is rejected. The visible Import button respects the busy state, while directly targeting the hidden input in the test bypasses that control.

The final diff adds observable completion checks after the first upload: the video row must be visible and Import enabled. Together these establish the first fixture has committed and the workspace accepts another operation. After the second upload, the notes row must also be visible before continuing. All existing preview, actual-download/content, rename/copy/delete and focus assertions remain. There are no sleeps, retries, timeout increases or learner-facing changes. The extra checks model the ready state available to a learner rather than changing the application's serial-operation contract.

## Independent execution

Ran:

```sh
node /workspace/scratch/ci-file-actions/checker/check.mjs
```

The script exited successfully. In two fresh Firefox contexts, intercepted only the first imported video's actual `Blob.arrayBuffer()` and paused it on an explicitly released promise, with no timed delay:

- **Original overlapping sequence:** Import was disabled and the video row absent while bytes were paused. A direct second `setInputFiles` produced “Finish or cancel the active operation first.” Releasing the first import produced the video row, but neither the notes row nor its Download action existed. Independently reading IndexedDB confirmed only the video was saved.
- **Corrected sequence:** Released the first import, then used the final diff's visible-video-row and enabled-Import checks before setting the second file. The notes row appeared; downloading it yielded exactly `Original notes`. An independent IndexedDB read confirmed both files existed and the stored notes Blob contained exactly the same text.

Evidence is outside the repository at `/workspace/scratch/ci-file-actions/checker/`: `check.mjs`, `results.json`, both case screenshots and `source-review.json`. The source snapshot records original main `0a5b819` and the relevant asynchronous call/lock/test locations.

The parent's initially passing unmodified repeats do not invalidate this deterministic overlap. This check reproduces the failure mechanism and validates the specific completion conditions; it does not claim that a retrieved hosted trace was inspected or that every historical CI failure has been proved from that trace. The parent's repeated-project tests and subsequent full local/hosted gates remain separate and are not declared complete here. No new prose/learner review is needed for this test-only synchronisation correction.
