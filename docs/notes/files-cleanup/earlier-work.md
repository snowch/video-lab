# Earlier work detection

Copyright © 2026 Christopher Snow.

`src/notebook/earlier-work.ts` exports `hasEarlierWork()`. Files can call it when opened; it does not read or depend on the notebook migration flag.

Verified storage facts:

- `src/cli/files.ts`: `video-lab-cli`, store `files`, contains named Blob records.
- `src/journey/project.tsx`: `video-lab-project`, store `media`, contains named Blob records. The project provider opens this database on a fresh visit, so its existence alone is insufficient evidence.
- `src/notebook/Workspace.tsx`: a `migrated` entry is written to notebook metadata after an attempted copy, including when no earlier files exist. It is not evidence of earlier work and cannot rule out a legacy file added later or missed by a previous copy.
- `src/cli/Workspace.tsx`: command drafts are plain text; history is a JSON string array. Source-selection and migration markers contain no saved work by themselves.
- `src/cli/progress.ts`: reference checks contain a filename, SHA-256 and check date.
- `platform/lesson-runtime/src/state.ts`: initial challenge state can have an empty artifact, zero attempts and zero hints. Actual lesson work is retained under `video-lab:v1:*`; current legacy lesson schemas use string-valued `artifact.answers`, and reflection notes are `slots.reflection`.
- `src/course/Teaching.tsx`: independent-practice review notes use `video-lab:review:*`.
- `src/workbench/main.tsx`: workbench state is saved even with empty drafts. Only nonempty draft text/restored text counts; default builder mode/options do not count.

The helper only opens legacy databases without a version. It aborts `onupgradeneeded`, rolling back creation of an absent database, and never creates stores. Existing stores are inspected with readonly cursors, counting named records with nonempty Blobs. Connections close after use. Blocked/error/denied storage resolves safely; a 1.5-second bound prevents stalled browser storage from leaving the Files decision pending. A late successful open after that bound is closed immediately. Theme, update metadata and migration flags are ignored.

Validation: `npx vitest run src/notebook/earlier-work.test.ts` passed 14 tests; `npx tsc --noEmit` passed. Tests cover absent database upgrade abort, readonly file reads from each legacy store after migration, empty/invalid records, actual drafts/history/notes/answers/checks, fresh baseline objects, denied storage, blocked requests and stalled opens. No build or browser CLI was run in this subtask. The test storage implementation is a deliberately small event-driven mock; browser-backed IDB behaviour remains part of parent built-site validation.
