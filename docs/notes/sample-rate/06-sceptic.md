# Independent sceptic review

Copyright © 2026 Christopher Snow.

29 October 2026. Independent of builder and reader; no product edits. Read binding `AGENTS.md`, `reader.md`, verified `facts.md`, definition audit, current source and saved source extracts. Inspected reader screenshots and independently opened the built app at `http://127.0.0.1:4191/video-lab/` with Chromium/Playwright. This adjudicates the reviewed pre-fix build, not future changes.

## Kept findings

### R1 — medium, accepted with narrow scope

The built page defines sample rate as “the number of signal values stored per second” and a sample as “one value at one instant”; the figure then says its height “is the signal value: positive above zero and negative below”. These statements correctly describe the figure but do not explain what the values stand for. Chapter 2 establishes audio streams, not the physical meaning of a signed audio signal. The reader's circular-definition concern is justified for the media beginner in the stated audience.

Smallest useful fix: a short concrete recording example beside the sample definition/model: a microphone converts changing air pressure into a changing electrical signal, whose values can be stored as numbers. Explain positive/negative as departures either side of a neutral level in this model. The example should remain an example: sound may also be synthesised. Do not imply digital numbers measure absolute atmospheric pressure, that every microphone's electrical zero equals 0 V, or that negative values mean quieter sound. The axis already says relative units, so do not relabel ±1 as volts or pascals. Zero is an instantaneous centre crossing; it does not itself establish silence.

This is a small local explanation, not permission to add quantisation, bit depth, a transducer lesson, reconstruction, Nyquist, anti-alias filters or DSP exercises. The supplied Smith ADC chapter pp.35–37 explicitly uses a changing voltage and instantaneous samples; the verified fact brief independently establishes per-channel sample timing. The extra recording example is consistent with these facts but was not explicitly documented as a microphone source in that particular extract.

### R2 — low, accepted

Independent built-page measurement at 320 CSS px with root text at 200%: SVG 198.25 × 74.34375 CSS px; 32 circle elements at 16,000 samples/s; document width remains 320. Screenshot `sceptic-plot-320-2x.png` confirms the dots become extremely small against the persistent 2.5px curve and 1px surface-coloured dot outline. The reader's screenshot `rate-320-light-2x-svg.png` shows the same failure clearly. There is no control, overflow or missing-text failure; keep severity low.

Smallest useful fix: keep a useful minimum plot height at narrow sizes and preserve visible point silhouettes. A 160px floor is a reasonable candidate, but not independently validated here. If using `preserveAspectRatio="none"`, verify points after the change: circle geometry stretches into ellipses and their width still shrinks with the viewBox, so a taller SVG alone is insufficient evidence. Current non-scaling surface outline subtracts visibly from small dark fills; a non-scaling dark stroke or other bounded marker-size treatment can help. Check all three rates in light/dark at 320/200%; preserve the fixed two-cycle interval, labels, numeric equivalent and no horizontal page scrolling. No need for an interactive zoom or a redesign.

The separate frame row is also short at enlarged text, but its 24 dots remain separated and its count/rate comparison reads clearly. Do not promote it to a separate required fix without stronger evidence.

## Definition treatment — accepted; no new finding

Source `InlineText.tsx` confines `<dfn class="notebook-definition">` to explicitly authored **term** tokens; it does not turn incidental `<strong>` labels into definitions. `inline-text.css` uses weight 700, normal font style, inline padding and cloned wrapping backgrounds. Actual built DOM has no underline and cursor `auto`; there is no new link/tab-stop affordance.

Independent actual route inspection confirmed definitions on first-edit/shorten (cut/duration), inside-video/inspect (streams/container/codec/frame/pixels/demuxer/bitrate), quality/quality (including long Constant rate factor (CRF)), frames-time/rate, and appendix/codecs. The shared renderer provides the same treatment throughout authored notebook copy; separate glossary/reference definition lists already have term headings. This is appropriately bounded. No need to highlight every later occurrence, automatically detect glossary words, add definition boxes, or create new explanatory paragraphs for the visual request.

Computed light colours are text `rgb(18,105,94)` on tint `rgb(221,243,233)`: contrast 5.63:1. Dark colours are `rgb(130,221,195)` on `rgb(37,68,62)`: 6.62:1. Both pass normal text AA. Dark was inspected by setting the app's actual `data-theme="dark"` hook: system colour-scheme emulation alone leaves the app's explicit light theme unchanged. Screenshot `sceptic-dark-definition.png` saved. Source and reader screenshots confirm long-term wrapping; no nowrap or inline-block pill is introduced.

## Rejected expansions / claims

- Reject a sampling-theorem/reconstruction lesson as a remedy for either finding. The page teaches counting samples in fixed time; its current model correctly keeps the same waveform. The checked Smith pp.38–41 specifically rules out treating straight-line joins as accurate reconstruction, and all provided rates are sufficient for this ideal sine. No “higher rate makes this tone more accurate/better” copy should be added.
- Reject any claim that existing sample counts, timing, phase or endpoint logic are factually wrong. The source and reader's rendered counts agree at 8/16/32 samples on [0,2 ms), with unchanged two cycles and correct spacing.
- Reject treating the tiny plot as an accessibility blocker: native control, numerical summary, and equivalent prose remain usable, with no overflow. It is a worthwhile low-severity legibility fix.
- Reject a glossary/link interaction for tinted definitions: current visual emphasis satisfies the clarified request without adding navigation or UI.

This is not a final checker sign-off and does not certify any unbuilt proposed fix or the full repository quality gate.
