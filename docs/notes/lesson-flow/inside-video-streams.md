# Choose picture or sound — drafting decisions

- Evidence: `docs/notes/notebook/media.json` identifies the eight-second source with video and audio. The three `inside-video/streams` records in `commands.json` verify eight-second video-only and audio-only examples and the four-second video-only practice result. Corresponding browser command records are in `commands-wasm.json`.
- Prerequisites: source input and duration come from earlier lessons. Introduce streams as separate picture/sound sequences, with timing explaining their combined playback; avoid encoder detail and container terminology here.
- Explain each new switch beside its command, including the fact that it takes no value. Explain input/output names once. Do not repeat the first example's options in the second example.
- Direct attention to the log's Output section because input audio remains visible in the same log. Preserve the distinction between absent audio and silent audio without claiming replay alone proves stream absence.
- Practice combines the known duration limit with the new audio selection, retaining the verified starter, solution and output target. The automated scope excludes visual content, so the remaining manual check is the intended opening pictures.
- Omit prediction because the example goals already identify the expected stream selection. No source setup note is needed.
- Validation: owned TypeScript and note formatted with Prettier. Shared checks and built-page independent review remain with the integration workflow.
