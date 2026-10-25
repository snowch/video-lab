# Timestamps page drafting decisions

- Preserved the single worked command and supplied practice command from the verified brief. No command, target or expected check changed.
- Used the native and WASM timestamp records and stream summaries in `docs/notes/notebook/commands{,-wasm}.json`. The worked command mixes audio and video frames; adjacent output lines must not be presented as successive video pictures. Observation uses video values near the end because the recorded WASM log drops early output.
- Preserved the essential distinction between average picture rate, individual presentation time and seconds per tick. Explained the conversion before asking for the 512-tick calculation. The relevant fixture metadata confirms video 24/1 with time base 1/12288 and audio time base 1/48000.
- Removed decoding-order detail because this page does not inspect decode timestamps or teach picture dependencies. Kept the variable-spacing limitation where learners interpret the stream average.
- Explained the worked command syntax once in its options. The parent builder added practiceOptions support, so the new practice section/field syntax is explained there after its command rather than introduced in the concept.
- No prediction: the arithmetic and mixed-stream limitation are explained directly, so an advance guess would repeat the lesson. The practice requires a useful unit conversion compatible with the existing inspection-only check.
- Formatting checked only for the owned files. This is a drafting record, not independent built-page review.

- Applied the independent reader’s finding: practice observation now checks the learner’s tick count by converting it back to seconds. Only the final hint supplies 512; the observation and check limitation do not reveal the answer.
