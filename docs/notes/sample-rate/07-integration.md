# Integration and ranked fixes

Copyright © 2026 Christopher Snow.

The builder retained the existing four-second FFmpeg example and independent practice. The two definitions now have explicit headings; each figure follows its own paragraph. A small optional heading field and paragraph-placement hook preserve other pages' existing concept layout.

## Accepted review findings

1. R1, medium: “signal value” needed a concrete example. A separate prose follow-up adds microphone → changing electrical signal → sampled number, then explains positive/negative values around the model's resting level. Zero is not labelled silence, and this example does not claim all sound was microphone-recorded. The checked DSP chapter describes voltage sampling and microphone signals.
2. R2, low: the plot became too small at 320px with 200% text. The SVG now maintains at least 160px height, while its horizontal scale fits the page. Round non-scaling 5px stroke markers keep sample points visible and circular when the axis scales differ. Labels remain HTML text. No horizontal chart scrolling was introduced.

The definition audit verified that existing authored bold markers denote terms being defined. Their rendering now uses semantic dfn with upright bold text, accent colour and a subtle tint. Ordinary JSX strong labels, raw output, commands and learner text are unaffected. Existing cut/duration, video-filter and preset sentences received matching markers without new explanation. No hover-only content, click affordance, glossary interaction or full-paragraph boxes were added.

The model is calculated independently from the selected samples. It does not join samples to pretend to reconstruct audio, claim higher quality from density, or use the attached image as a course asset. New SVG geometry is original and computed locally; no new media or processing dependency is needed.
