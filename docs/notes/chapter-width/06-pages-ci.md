# Pages CI: wait for the text save before reloading

Copyright © 2026 Christopher Snow.

The owner reported a Pages failure after the chapter-width work. Pages run
`41650758768` on the preceding main revision failed the Firefox case
`tests/files-cleanup.spec.ts:151`, “text rows offer Edit, focus the editor and retain
saved changes”. Its assertion at line 185 expected `New notes` from `empty.txt`
after reload but received an empty string. This failure predates the chapter-width
change.

## Independent sceptic findings

The test awaits a Save click, which dispatches an asynchronous operation but does
not await its completion. `Workspace.writeText` first reloads workspace files,
copies the replacement Blob bytes, and awaits `writeFiles`. The IndexedDB helper
resolves on transaction completion, after which the operation finishes and
FileManager clears `dirty`. No early persistence-success return was found.

The first save already has an implicit completion wait: the following Edit action
cannot run while `w.busy || dirty || Boolean(form)`. The second save proceeds
directly to Close, which remains clickable. While saving, Close opens the Unsaved
changes confirmation; the test does not check that the Files dialog closed before
calling reload. It can therefore reload while the save is still pending.

A separate Firefox probe held Blob conversion during the nine-byte `New notes`
save. Save → Close left the dialog visible with the discard confirmation. Releasing
the held conversion persisted `New notes` in IndexedDB. This supports a test race
rather than a missing transaction-completion wait in the application.

The builder's controlled reproduction at
`/workspace/scratch/reproduce-file-save.cjs` adds a 1500 ms delay only to conversion
of a nine-byte text/plain Blob. The original test sequence showed an unsaved
warning and reloaded an empty file. Waiting for Edit empty.txt to become enabled
showed no warning and reloaded `New notes`. This diagnostic delay is not part of
the committed test.

## Correction

After the second Save click, wait for Edit empty.txt to become enabled, then click
Close and assert the Files dialog is hidden before reloading. The row's enabled
state means the async operation has ended and the dirty flag has cleared. Waiting
for Save to be disabled would be insufficient because that also occurs while the
operation is busy.

This changes test synchronisation only. It preserves the post-reload assertions
for both files and makes no application, storage, media or chapter-layout change.
Full check and repeat-run results are reported separately by the builder; this
source/reproduction review does not itself claim those runs passed.

## Validation of the correction

- `node /workspace/scratch/reproduce-file-save.cjs` — reproduced the old sequence
  losing the pending edit, and confirmed the completion wait retained it.
- `npx prettier --check tests/files-cleanup.spec.ts` — passed.
- `npx tsc --noEmit` — passed.
- `npx playwright test tests/files-cleanup.spec.ts -g 'text rows offer Edit' --repeat-each=5`
  — 25 passed across desktop light/dark, phone light/dark and Firefox.
- `git diff --check` — passed.

The earlier application revision passed the full local quality gate as recorded
in 05-validation.md. The follow-up changes only this test and its review record;
the updated PR will run the full quality gate in GitHub Actions. These targeted
results do not claim that the new remote run or a Pages deployment has finished.
