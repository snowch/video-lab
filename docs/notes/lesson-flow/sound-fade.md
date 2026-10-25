# sound/fade copy decisions

- Preserved the single worked command and the existing practice target, solution and output names. Native and WASM evidence in `docs/notes/notebook/commands*.json` confirms eight-second outputs with audio and video; the source is the eight-second `bunny-short.mp4` from `media.json`.
- Prerequisite: the previous volume page establishes multiplication of audio samples and audio filtering. Restated only the mechanism needed to distinguish a changing multiplier from a constant one. No encoding or container detail is needed here.
- Kept concept prose about timing and duration separate from command syntax. Explained the filter expression, colon syntax and each named setting once beside the command. Omitted a prediction because the concept already supplies the relevant timing calculation.
- Practice asks the learner to derive the halfway start and remaining duration, rather than copying both values from its instruction. Listening compares earlier onset and slower fall with the worked output at unchanged playback volume.
- The automatic check measures duration and stream presence, not fade timing or musical quality. Copy explicitly assigns fade timing to listening; source/output audio variation means perceived loudness need not fall evenly at every instant.
- Validation: owned TypeScript file formatted and checked with Prettier. No shared checks or built-page review performed by this drafting agent.
