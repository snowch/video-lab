# Glossary copy draft

Copyright © 2026 Christopher Snow.

Drafted by a separate prose agent from `01-facts.md`, the reviewed notebook pages for inspection, timing, cutting, framing, sound, quality, subtitles and export, and `src/notebook/visuals/media.json`. Sentence and idea passes applied the Assembly style checklist. This drafting record does not claim independent built-page review.

The copy module supplies 32 alphabetical entries with unique descriptive IDs, one or two definition sentences, a concrete example and a stable lesson ID. The renderer can derive lesson link labels without embedding current page titles here. Search guidance describes names and abbreviations; aliases include fps, Hz, PTS, CRF, dimensions/resolution/width/height, muxing and demuxing. Aliases intentionally identify terminology and common lookups, rather than making all definition text searchable.

Definitions retain the practical distinctions in the brief: streams versus audio channels, audio measurement rate versus video picture rate, stored dimensions versus perceived quality, containers versus codecs, and reading/writing containers versus decoding/encoding streams. Encoding is not defined as universally lossy compression. Stream copy explicitly allows container bytes to change. The brand example distinguishes the `isom` family from the `mp41` declaration and retains the conformance limitation.

CRF controls the quality target without promising bitrate or size; preset controls encoder effort without promising identical quality across presets. Amplitude multiplication is not equated with perceived loudness. Time bases measure timestamp ticks rather than frame intervals; average frame rate alone does not establish regular spacing.

Numeric examples come from the recorded source/media facts or existing reviewed lesson commands: 854 × 480, 48000 Hz, 24 fps, 352 kb/s, timestamp ticks and time base, the framing expressions, CRF values, sample multiplier and subtitle interval. The scaling example acknowledges the pixel-shape adjustment, avoiding an implication that its stored grid preserves the source's exact width-to-height ratio.

Only `src/notebook/glossary.strings.ts` and this drafting note were written. No renderer changes, CLI checks, tests or commits were made by the prose drafter. Entry targets, formatting, search behaviour and built-page usability remain for the builder and independent review workflow.

## Builder clarity edits

The prose drafter read the four revised entries and agrees with the edits. “Reducing the data needed” states what compression changes without the possible file-saving meaning of “saving data”. The pixel-format definition now explains storage in familiar terms, and its `yuv420p` example gives the colour-versus-brightness distinction without introducing component-sample vocabulary. The export lesson retains the more precise luma explanation.

The scaling example now reports only the verified 640 × 360 stored dimensions. This avoids introducing pixel shape in a short reference entry while leaving the lesson to explain displayed proportions. This revision supersedes the earlier draft rationale about retaining the pixel-shape qualification.

Stream copy now transfers data “into an output file”. The wording permits the same container format on both sides and retains the warning that the file's layout and metadata can change. All four edits preserve the fact brief's distinctions and improve first-reading clarity.

The builder reports passing renderer and focused tests; the prose drafter did not run those checks or independently verify that result. This pass changed only this rationale, with no source edits, tests or commits.
