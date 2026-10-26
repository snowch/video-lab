# Codec forward references

Copyright © 2026 Christopher Snow.

Scope: from Chapter 2, Read the file description, point learners to existing later teaching about codecs without expanding this introductory lesson or changing command execution.

Verified facts from `src/notebook/structure.ts`, `copy.ts` and the corresponding page files:

- Chapter 4, `cut-join/copy`: Copy compressed streams introduces decoding, encoding and stream copying, including compatible containers. Uses `-c copy`.
- Chapter 8, `quality/quality`: Choose an encoding quality setting introduces lossy compression, libx264 as an H.264 encoder, and CRF comparisons. `quality/speed` separately explores encoder effort.
- Chapter 9, `export/format`: Choose an export format selects libx264 and AAC explicitly with `-c:v` and `-c:a`, and explains container/player compatibility.
- These pages do not survey competing codec families. Link descriptions must not claim that they do.
- Chapter 2 already defines container, stream and codec, with H.264/AAC examples. Its task is reading ffprobe, not choosing codecs.
- Canonical links are `#/learn/<chapter>/<page>`. The overview already lists pages directly. Native anchors preserve history and base-path operation.
- InlineText intentionally supports only code and bold, not links. Use structured internal-page references, without changing learner command or raw-output rendering.

Plan: one compact, optional set of forward links on this page, with clear destination names/chapter context. Keep the normal next-page route. Separate prose agent drafts from these facts; reader, sceptic and final built checker review the scoped change. Run the required full gate, then publish the reviewed change under standing main authorisation. No new media, models, exercises or storage changes.
