# Definition presentation audit

Copyright © 2026 Christopher Snow.

Read-only source audit, 29 October 2026. No product edits. Scope: all 28 notebook pages in `src/notebook/structure.ts`, their shared authored strings, glossary, inline renderer and nearby reference layouts. Read the binding editorial standard in `AGENTS.md` and the earlier lesson-flow/actionable-guidance review resolutions. This is source evidence, not an independent built-site accessibility review.

The user clarified the request to **“Make definitions stand out more visually.”** This supersedes the initial interpretation that the course needed more definitions. Do not add curriculum or explanatory paragraphs for this request.

## Ranked recommendation

1. Give explicitly authored inline defining terms a consistent, restrained visual treatment. They currently render as ordinary `<strong>` through `InlineText.tsx:6–15`, so they compete with numerous unrelated strong labels. Use a semantic `<dfn>` or dedicated definition class with strong weight and a subtle accent/tint confined to the term. Keep the paragraph intact; no definition boxes, repeated explanation, tooltip dependency or glossary detour. The term and adjacent sentence together provide the definition.
2. Keep ordinary JSX `<strong>` out of this change. Examples include source filenames/headings in `Notebook.tsx`, result headings in `Cell.tsx`, codec names, comparison-track names and playback-test steps in `CodecGuide.tsx`, and diagram labels in `FormatVisuals.tsx`. A global `strong` selector would spread the emphasis to controls and labels.
3. If making the existing definition coverage consistent is included, mark only the small omissions below. Their definitions already exist; no prose rewrite is needed. This is optional polish after the core visual change, not a prerequisite to satisfy the clarified request.

## Existing authored bold is definitional

There are 43 authored `**...**` occurrences in notebook strings (excluding tests and comments). Every one is a defining term or a contextual redefinition; none is ordinary rhetorical emphasis. Therefore migrating these explicit occurrences to definition markup is a defensible bounded change. Do not infer definitions by matching all glossary names across prose: that would also highlight ordinary later mentions, miss inflections and mark code/output accidentally.

| File | Existing defining terms |
| --- | --- |
| `pages/inside-video-inspect.ts` | streams, frame, pixels, demuxer |
| `codecs.strings.ts` | codec, encoder, Lossy, Lossless, Bitrate, Sample rate, container, codec (8 occurrences; includes shared chapter introduction and optional reference) |
| `visuals/inspect.strings.ts` | bitrate |
| `pages/frames-time-rate.ts` | Frame rate, sample rate |
| `pages/frames-time-timestamps.ts` | presentation timestamp, ticks, time base |
| `pages/image-hold.ts` | pixel format |
| `pages/image-sequence.ts` | image sequence |
| `pages/image-animation.ts` | frame-by-frame animation |
| `pages/image-overlay.ts` | alpha |
| `pages/cut-join-copy.ts` | decoder, encoder, Stream copying |
| `pages/cut-join-keyframes.ts` | keyframe |
| `pages/framing-scale.ts` | Scaling |
| `pages/framing-crop.ts` | Cropping |
| `pages/framing-pad.ts` | Padding, canvas |
| `pages/sound-level.ts` | waveform, Amplitude |
| `pages/sound-fade.ts` | fade, start time, duration |
| `pages/text-subtitles.ts` | subtitle cue, burns in |
| `pages/quality-quality.ts` | Lossy compression, encoder, Constant rate factor (CRF) |
| `pages/export-format.ts` | muxer, muxing |
| `pages/export-faststart.ts` | index |

These terms do not exactly correspond to glossary entry names. For example, waveform, fade, frame-by-frame animation, index, muxing, start time and burns in lack exact matching entries. Conversely the glossary contains words with ordinary meanings and many aliases. Automatic glossary recognition is a poor boundary for semantic definition styling.

Some definitions recur deliberately: encoder in quality after cut/join, duration and start time in the new fade context, and bitrate/sample rate in the optional codec reference. Keep those locally useful authored explanations. Do not introduce global “already defined” state: deep links and optional references must remain understandable, and the task is presentation rather than removing existing copy.

## Small omissions, ranked

All paths below are relative to `src/notebook/`.

| Rank | Exact existing text / location | Earlier definition | Minimal change if included |
| --- | --- | --- | --- |
| 1 | `pages/quality-speed.ts:10`: “A preset groups these search and compression choices.” | No earlier main-course definition; glossary defines Preset and links here. | Mark `preset` as a defining term. No new sentence. |
| 2 | `pages/first-edit-shorten.ts:10`: “A cut selects part of a video. Its duration is how long that part plays.” | This is the first page. Later fade currently highlights duration, and glossary defines Duration. | Mark `cut` and `duration` here if first-page consistency is wanted. These are ordinary words with media-specific use, so use restraint. |
| 3 | `pages/frames-time-rate.ts:15`: “A video filter changes pictures or their timing.” | No earlier definition in the required path. Glossary Filter is linked to the later scale page. | Mark `video filter` in the already-present worked introduction. Do not add a separate filter section. |
| 4 | `pages/framing-scale.ts:35`: “The log calls this `SAR`, or sample aspect ratio; here it is 1281:1280.” | Mechanism is already explained immediately before the name: FFmpeg marks each output pixel as slightly wider than tall. | Optional: mark the plain phrase `sample aspect ratio` only; retain literal `SAR` as code. Lower priority because term naming follows a complete mechanism. |
| 5 | `pages/workflows-batch.ts:8`: “Batch processing applies the same operation to several files.” | No prior main-course definition; concept is familiar to the stated technical audience. | Optional mark of `Batch processing`; low instructional value and unnecessary for the core visual request. |

No need to mark every existing definition of input/output, JSON, width/height, extension or file format. The audience already understands ordinary computers. Likewise, “brightness-related luma” in the hold page is an immediate gloss, and the detailed pixel reference already explains it; expanding these would recreate the rejected growth into reference/tutorial material.

## Existing separate reference layouts

The glossary already uses `<dl>` with `<dt><h2>` terms and `<dd>` definition/example text (`Glossary.tsx:55–72`). It does not need every word inside each definition highlighted. The formats reference similarly uses `<dl>/<dt>/<dd>` for concept definitions (`FormatGuide.tsx:62–79`). Its explicit term headings can retain the established heading treatment. No new boxes or additional copy is warranted.

## Presentation and verification risks

- Keep weight as a visible non-colour distinction. Check text and tint contrast in light/dark themes; do not assume the link accent automatically passes on the new background.
- Avoid an underline, link cursor or new tab stop for a non-interactive definition. Do not imply a click opens the glossary unless the term really is an accessible link.
- Reset `<dfn>` italics if using it; do not stack incidental browser italics onto the new treatment. No tooltip-only definition or screen-reader verbosity is necessary because the defining sentence is already adjacent.
- Use inline wrapping for long terms such as “Constant rate factor (CRF)” and “frame-by-frame animation”. No `white-space: nowrap`, inline-block pill sizing or raised/lowered baseline that causes phone overflow or awkward line spacing at 200% text size.
- Preserve parser escaping, literal code and unfinished-marker behaviour covered by `InlineText.test.ts`. Do not parse raw logs, learner commands or imported filenames as authored markup.
- A focused built review should include an early paragraph with several terms (inside-video/inspect), a term in a worked explanation (export/format), the optional codec reference, the long CRF term, and a phone at doubled text, in both themes. Confirm that existing links/code remain distinguishable.

No processing-command change, new facts or media measurements are proposed. This audit does not certify final rendered styling, interaction, contrast ratios or the full project quality gate.
