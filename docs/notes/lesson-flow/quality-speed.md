# quality/speed copy decisions

- Kept the single worked command, practice solution, filenames and eight-second H.264/audio expectations unchanged.
- Used the verified native and WASM entries for quality/speed in commands.json and commands-wasm.json. Both retain the timeline and audio; the recorded fast preset output is smaller than the ultrafast output. No recorded timing or size is presented as a universal expectation.
- Assumes the preceding CRF lesson. Explains search effort as the underlying mechanism before introducing the preset syntax beside the worked command. Defines processing speed only where learners encounter the actual log.
- Explains the new preset flag once beside its command. The practice option explains the different preset value; hints support the edit without another change exercise.
- Omitted the original prediction because the concept already answers it. Omitted source setup prose because this page needs no special setup beyond the standard supplied source.
- Manual review covers preset/CRF command choice, output-size and processing-rate comparison, and visible detail; automated checks cannot establish those judgements.
- Validation: owned TypeScript and note formatted with Prettier. Shared checks remain the root agent’s responsibility; no independent built-page review claimed here.
