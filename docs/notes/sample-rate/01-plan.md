# Paired rates and visible definitions

Copyright © 2026 Christopher Snow.

The owner requested an audio sample-rate visual in Chapter 3, paired with the existing frame-rate description and figure. They also clarified that existing definitions throughout the course should stand out more visually, rather than adding more terminology.

## Slice

- Keep the current video-rate command, source, outputs and practice unchanged.
- Present Frame rate → definition → existing picture-time figure, then Audio sample rate → definition → one interactive sampling figure.
- Model a fixed one-channel, 1,000-cycle-per-second sine over 2 ms. Change only sampling instants among 4,000/8,000/16,000 samples/s; count 8/16/32 samples before the right endpoint. Draw the analytic curve independently of sample dots; do not imply linear interpolation is reconstructed sound or that extra dots guarantee better quality.
- Give defined terms a consistent inline accent and tint. Existing authored `**term**` markers are verified defining terms; ordinary JSX bold labels, literal command output and learner text retain their treatment. Mark the existing cut/duration, video filter and preset definitions consistently without adding new exposition.
- Keep text labels and a changing text equivalent outside SVG; use a native control, theme variables and wrapping at narrow widths. No processing tool download is needed for either figure.

## Evidence and workflow

`02-facts.md` records W3C, DSP and FFmpeg facts. A separate medium-effort prose agent drafted the copy in `03-prose.md`; a high-effort implementation agent built the model/visual and six unit tests. A separate audit checked all existing authored bold terms before the shared styling change. Reader, sceptic and final checker inspect the built result. The builder integrates and edits only justified findings.

Run unit/type/build checks, targeted browser interaction/reflow/raw-output checks and the full CI quality entry point. Preserve stored files/drafts, old routes and existing work. Merge and verify deployment when checks pass, under the owner's standing authorisation.
