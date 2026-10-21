# Video Lab — course plan

Copyright © 2026 Christopher Snow.

**Status:** redesigned direction. This document sets direction, not evidence that modules exist. The redesign record, current-to-target map and migration plan are in `docs/notes/curriculum-redesign.md` (issue #3, Phase 1).

## Purpose

Teach a technically experienced learner to **record, understand, edit and publish** a clear, high-quality software demonstration. The organising question is: *how do I record, improve, and publish a demo that viewers can understand?* FFmpeg, codecs, timestamps and file formats are means to that end, not the syllabus. The course is not a catalogue of command flags, nor an attempt to build a replacement for DaVinci Resolve.

The course's guiding idea: **A video editor chooses what the viewer sees, hears, and has time to understand.** Media formats and processing tools constrain how that choice can be implemented.

## Learner prerequisites

Comfortable with a terminal, files, basic code and an ordinary browser. No prior video capture, editing, FFmpeg, codec or audio-production knowledge. Screen capture is not a prerequisite: a labelled pre-recorded fixture carries learners whose device or browser cannot capture. Native FFmpeg capture exercises are clearly optional.

## Curriculum

The journey makes something first, then explains it. Each step hands the learner a real artefact to the next. The current implementation is the Phase 2/3 vertical slice in progress: the existing Module 0 inspection lesson and Module 2 cutting-and-joining lesson are retained and relocated into steps 2 and 3; their fixtures, verified measurements, graders and components are reused. Module numbering below is the redesigned order; stored progress survives because lesson IDs are unchanged and old routes are redirected.

| # | Module | What it teaches | Signature hands-on activity | Status |
| --- | --- | --- | --- | --- |
| 0 | Capture your first software demo | record one visible software action; replay, download; notice dead time and legibility | real `getDisplayMedia` + `MediaRecorder` capture, or labelled pre-recorded fallback | planned (Phase 2) |
| 1 | How a video file is created | pictures over time; encoding versus muxing; container | build a real MP4 from original stills with `ffmpeg.wasm`, add audio, mux, probe | planned (Phase 2) |
| 2 | Inspect and prepare real media | read container/stream/timing evidence; diagnose a capture problem | inspect the learner's own recording (relocated Module 0 material) | relocating (Phase 3) |
| 3 | Cut and join: tell the story | keep the action and result; copy versus re-encode; keyframes; concat | cut/join explorers on real outputs (relocated Module 2 material) | relocating (Phase 3) |
| 4 | Make the action readable | crop, zoom, frame, pace, minimal callouts | real filter runs; before/after stills | planned (Phase 4) |
| 5 | Make the sound clear | audio basics, levels, noise, narration, sync | inspect and improve a real recording's audio | planned (Phase 4) |
| 6 | Compression and picture quality | resolution, codec settings, bitrate; readability of small text | real encoded comparisons, measured size and stills | planned (Phase 4) |
| 7 | Captions, overlays and automation | captions, overlays, filter chains | build and validate a caption track on real media | planned (Phase 4) |
| 8 | Export, publish and verify | export profiles; verify playback, sound, captions, size | verify the finished deliverable | planned (Phase 4) |
| 9 | AI-assisted production (optional) | transcripts and suggested edits; hallucination and timing review | judge assisted edits against real media | planned (Phase 4) |
| 10 | Final project | the whole journey, integrated | complete concise demo + reproducible recipe + self-review | planned (Phase 4) |

Streaming, devices, chapters, attachments and hardware acceleration are optional reference sections, not required for the core journey.

## Technology decisions

1. Reuse `snowch/learning-platform` under its existing checked-copy synchronisation mechanism, and use Assembly Lab's authoring conventions. Prefer React, TypeScript and Vite consistent with the family.
2. Host at `https://snowch.github.io/video-lab/` via GitHub Pages. Static, no login.
3. Build course-specific media model and visualisation components separately from the platform. Use actual short media fixtures, recorded `ffprobe` facts and browser player behaviour. Explanatory diagrams are static, accessible and deterministic; no decorative animations or pseudo-processors.
4. Real in-browser processing with `ffmpeg.wasm` (single-thread core, version-pinned, loaded on demand in a worker only when an encoding lesson runs). Never on the home page or initial recording lesson; never in the baseline offline manifest. Verify encoder/muxer/inspection capabilities on the pinned build before authoring UI.
5. Preserve provenance and reproducibility for every media measurement; CI should verify the fixture if native FFmpeg is available and clearly distinguish skips.
6. Carry interaction meaning on touch and keyboard, not hover alone. Use clear visuals that explain time and multiple streams without an overlong glossary.
7. Where screen capture is unsupported, a labelled pre-recorded original fixture keeps the lesson meaningful; the fallback never claims to be a new capture.

## Scope, checkpoints and definition of done

**Phase 1 (this checkpoint):** written redesign, current-to-target map, static-versus-interactive audit, capture/privacy support matrix and WASM compatibility spike. Recorded in `docs/notes/curriculum-redesign.md`.

**Phase 2 (next):** first runnable learner path — real capture exercise with fallback, then frames → MP4 → audio/mux → probe with real `ffmpeg.wasm`. Prioritise this complete vertical slice before broad lesson proliferation.

**Phase 3:** relocate and reconnect the existing inspection and cutting/joining lessons; fix routes, progress migration, copy and term gates; demonstrate an actual short edited result.

**Phase 4:** remaining modules in independently tested slices; planned modules stay explicitly labelled until implemented.

A module is complete only when its experiments work on real bytes, claims are checked against real media, tests pass, browser interactions have been exercised at phone and desktop widths, review findings have been resolved or documented, and a short module note records design tradeoffs.

## Originality and source restrictions

The photographed 11-page *FFmpeg Basics: A Tutorial Introduction* supplied in conversation is an inspiration for topic coverage, **not available as a repository source text** and must not be copied or paraphrased from unseen pages. Use primary FFmpeg and browser media documentation. All lessons, situations, examples, interactive illustrations, exercises and graphics are original. Record exact source URLs and licences in `docs/sources.md`. Any recognised third-party sample (e.g. a Big Buck Bunny excerpt) is reproducibly derived, small, licensed and attributed, and never a baseline download.
