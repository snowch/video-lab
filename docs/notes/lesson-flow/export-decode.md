# export/decode copy decisions

- Retained the one worked command on the eight-second bunny-short.mp4 source. Following independent reader feedback, practice now transfers the decode test to the six-second bunny-action.mp4 source, with the parent updating structure, assets and executed evidence. The observation prompt asks learners to compare actual final processing time with the known source duration rather than supplying the expected final log line.
- Explained header inspection versus reconstruction before the command. Options are explained once adjacent to the command; no speculative prediction or separate change exercise.
- Verified browser evidence in `docs/notes/notebook/commands-wasm.json` records both video and audio, 192 frames, eight seconds and exit code 0. Its log also ends with `Aborted()`, so the copy explicitly prevents treating that text alone as a failed or successful decode.
- Kept completion distinct from content judgement and other-player compatibility. The check's limited scope remains explicit.
- Prerequisites: source streams, duration, tool output and replay from preceding pages. No new mapping syntax is introduced; the log's Stream mapping label is used as visible evidence.
- Validation: owned TypeScript and note formatted with Prettier. Shared checks and built-page independent review belong to the parent workflow.
