# Visual format reference prose draft

Copyright © 2026 Christopher Snow.

Separate drafting pass from the verified `01-plan-facts.md` brief, existing format strings and tested sampling model. Drafted in `src/notebook/format-visuals.strings.ts`; existing prose and implementation files are unchanged by this pass.

The container introduction defines stream and codec before the diagram. Its caption identifies the MP4 contents as illustrative, and separates membership from physical byte layout. The remux comparison names a compatible MP4-to-Matroska example, states the stream-copy condition and distinguishes the drawing from an executed FFmpeg operation. Playback remains a destination-dependent question.

The sampling introduction defines sample, luma and colour differences before the grids. Selection explanations state the counts computed by the model for its common 2 × 2 group. The caption limits the figure to counts and grouping; it makes no claim about chroma siting, memory layout or measured colours. Component names and generated sample counts supply text alternatives to colour.

The overview groups formats by the material the learner needs, with one decision prompt per group. It avoids calling all audio formats containers. The pixel enlargement introduces picture positions before component sampling and explicitly identifies its colours as illustrative. The alpha foreground carries the visible label “Drawing”.

The alpha introduction defines the range before the control. Its caption describes the actual CSS demonstration and explains why composition must precede conversion to a format without alpha. Checkerboard and solid-background previews have distinct labels. Existing format precision and layout prose can sit below the optional summary without duplicating the primary explanations.

Builder follow-up: added a direct demuxer/muxer reader/writer definition and a local explanation of why reduced colour sampling can soften fine coloured detail. Alpha state labels contain words only because the control reports its own numeric value and supports intermediate values beyond the introductory example.

Wording follows British English and the upstream authoring/style rules. This pass drafts strings only; no tests, rendered-page review or independent validation were run by the drafting agent. The builder must check the final order of definitions and the rendered labels against the actual controls.
