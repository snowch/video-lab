# Separate guided-task drafting pass

Copyright © 2026 Christopher Snow.

23 October 2026. Read the current production CLI lessons, shared workspace wording and command-reference prose. Drafted from the builder's verified layout/behaviour brief: one current task beside the terminal on desktop and above it on mobile; manual Previous/Next navigation; task-scoped help with a complete `help all` alternative; expandable usage, background and task navigation. No implementation or browser review is claimed.

Created only `src/cli/guided.strings.ts` and this record. The `guided` export supplies compact layout, keyboard, scope and help labels plus Capture copy for four tasks: establish one source, list its exact filename, replay that file and download a source copy. Previous/Next changes instructions, not execution or measured success. All media actions still require typed commands; browser consent and file selection remain ordinary browser dialogs.

Capture offers record, provided sample and import as alternatives, never a mandatory sequence of all three. When browser capture APIs are absent, the unsupported message makes sample/import explicit and still requires the learner to type the loading command; it does not imply automatic tool execution. Existing sources and refused overwrites remain visible choices.

Expandable recording detail preserves the mechanism: scene tab, explicit capture and sharing choice, one Sort action, readable hold, stop/save versus cancel/discard, 15-second and 20 MiB limits, sensitive material/readability preparation, optional shared sound rather than microphone narration, actual MIME-derived filenames, and browser capture rather than native FFmpeg devices. The supplied tone is not narration or learner-created capture. Imported media remains an existing local file.

Sentence and meaning passes use British English and direct instructions. Compact guidance names the available action without concealing required source identity, permissions or timing; detailed explanations remain available without dominating the current task. Other lab task mappings, commands, layout and success checks remain builder-owned and unchanged by this drafting pass.


Audited `src/cli/strings.ts` and `src/cli/reference.strings.ts` after the reader identified stale help semantics. Welcome, argument guidance, Capture instructions and the full help listing now distinguish contextual `help` from the complete `help all` reference. Build's limits guidance and both reference-opening examples now request `help all` where they promise full vocabulary or bounds. Ordinary mentions of progressive hints and native FFmpeg help queries are unchanged. No guided strings, task model or UI was edited in this follow-up.
