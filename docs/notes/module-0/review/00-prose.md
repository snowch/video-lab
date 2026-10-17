# Separate prose drafting pass

Copyright © 2026 Christopher Snow.

The separate drafting agent read `AGENTS.md`, the module plan, the verified fact brief, `docs/plan.md` and Assembly Lab's `docs/style.md` on 17 October 2026. The builder had executed the media verification before providing the fact brief. This pass inspected `src/media/model.ts` and `src/media/fixture.json` directly to align measured values and references with the fixture. It does not claim to have rerun native media verification.

Drafted `module0.prose.ts`, `module0.labels.ts` and `home.strings.ts`, separately from lesson structure and UI implementation. Measured counts, rates, timing and final reference answers come from model imports. The target time is explicitly a task parameter. Later modules are labelled as planned and only Module 0 is described as available.

Sentence pass: British English; no em dashes, withheld conclusions, promotional claims or unexplained abbreviations. Idea pass: introduced streams before the prediction; frames, indexes and presentation timestamps before inspection; samples and channels before comparing counts; codecs, time bases and ffprobe with their mechanisms. Kept the browser playback estimate separate from the recorded timestamps and extracted pictures. Described constant frame rate as a property of this recording, and the diagram as explanatory.

Reviewed every entry in the builder's `ui.strings.ts` against its use in `components.tsx`, then edited the file. Clarified browser timing, extracted stills, diagram limits, interval labels, sample-position calculation, playback feedback and evidence links. Checked that decoding, FFmpeg and ffprobe are defined in lesson prose; explained the frame-rate fraction beside the inspection instructions. The reflection caption is present. Prettier passed for the drafted content files. An initial TypeScript run failed on the builder's model using `findLast` with an older library target; the builder reported updating that target, and the final run is recorded below. This is drafting evidence, not an independent learner review, sceptical review or final built-page check.

Final drafting-pass command: `npx tsc --noEmit` did not pass because the copied platform's prose renderer imports `react-markdown`, `rehype-katex`, `remark-gfm` and `remark-math`, whose packages were not yet available during this pass. No content-file diagnostic was reported. The builder owns dependency installation and the full quality checks.
