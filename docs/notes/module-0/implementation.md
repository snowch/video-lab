# Module 0 implementation note

Copyright © 2026 Christopher Snow.

## Reused

The shared lesson schema and runtime are copied without modification at the commit recorded in `platform/SOURCE.json`. The course supplies a `Book`, the required ten sections, its figure registry, structured answer editor, six-case grader and browser storage. The runtime supplies progressive hints, failed-test rendering, reset confirmation and regrading saved work. The checked-copy script comes from Assembly Lab and verifies every synchronised file hash.

## Built

- An original functioning build-queue HTML app and deterministic browser screenshot capture, encoded by native FFmpeg. Measurements and every inspection JPEG come from the encoded MP4. The fixture retains exact PTS ticks as well as ffprobe's rounded seconds.
- A pure TypeScript lookup over the ordered recorded timestamp list. The UI's selected-frame reference does not claim to identify the browser decoder's currently rendered frame. The model clamps times outside this fixture to its first/last picture and rejects nonfinite time inputs.
- A responsive course shell, hash navigation, persisted light/dark choice, native preview and touch/keyboard frame controls. The container diagram branches into the measured streams; interval inspection uses the measured frame list and audio sample rate. Diagram geometry and calculated audio sample positions are labelled as explanatory.
- An original lesson drafted in a separate session after the fixture and initial facts tests passed, then edited against actual component context. Course prose, labels and UI strings are separate from the structure.
- One inspection challenge. The reference is derived from stream types and the timeline, not independently handwritten in prose. Blank work fails all cases, each field has its own misconception feedback, and editing a completed answer removes the completion badge until it passes again.

## Tradeoffs

The single bundled fixture avoids uploads, server processing and multi-megabyte FFmpeg.wasm initialisation. Native H.264/AAC preview is verified in Chromium and Firefox. Extracted stills also support inspection if decoding is unavailable. These checks do not establish compatibility with physical iOS/Android devices or Safari; phone coverage is Chromium touch emulation.

The shared Markdown runtime also includes maths support used by other courses; the first bundle is about 253 kB gzip. No remote fonts or runtime services are loaded. Future performance work could separate that optional upstream renderer, with any shared change made in the platform repository first.

The recording uses constant spacing. Later lessons can add a second real variable-frame-rate fixture; the current lesson explains why average frame rate alone is insufficient without pretending this fixture varies. Sample counts are positions implied by the sample rate over an interval, not a count of padded AAC decoder output.

The public Pages environment allows only `main`. Initial project-branch delivery was blocked by that protection. The owner subsequently authorised deploying the reviewed implementation directly to `main`; the Pages workflow now targets that branch and retains the existing environment restriction. Review and browser evidence use the production build served at `/video-lab/`; PR #2 records subsequent live-site verification.

## Review roles

The builder's work is not its own independent verdict. A fresh `gpt-6.1-sol` drafting agent (medium effort) wrote the prose from a previously verified fact brief. A separate `gpt-6.1-sol` reader (high effort) inspected the built site, and a fresh `gpt-6.1-sol` sceptic (extra high effort) tests those findings and technical claims. A further checker who did not author the fixes will inspect the rebuilt page. Detailed coverage, dissent and the final result live under `review/`; a role's completion is established by its report, not this intended sequence.
