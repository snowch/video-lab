# Video Lab — course plan

Copyright © 2026 Christopher Snow.

**Status:** initial proposal. This document sets direction, not evidence that modules exist.

## Purpose

Teach a technically experienced learner to plan, edit, explain and export high-quality software demonstrations, using real media and FFmpeg where it helps. The course is about **video editing and production**, with digital media engineering as the explanatory foundation. It is not a catalogue of command flags, nor an attempt to build a replacement for DaVinci Resolve.

The course's guiding idea: **A video editor chooses what the viewer sees, hears, and has time to understand.** Media formats and processing tools constrain how that choice can be implemented.

## Learner prerequisites

Comfortable with a terminal, files, basic code and an ordinary browser. No prior video editing, FFmpeg, codec or audio-production knowledge. Course is suitable for desktop and a tablet; exercises that need native FFmpeg are clearly optional or have an observable browser counterpart.

## Curriculum

The owner extended the implementation to Module 2 on 17 October 2026. Modules 0 and 2 are available; Module 1 remains planned. Module 2 introduces the FFmpeg concepts it needs without requiring an unavailable lesson.

| Module | What it teaches | Signature hands-on activity |
| --- | --- | --- |
| 0. What is a digital video? | frames, timing, audio streams, container versus codec; how to inspect an actual recording | media explorer + frame/time/stream inspection |
| 1. How FFmpeg sees media | command grammar, input/output options, `ffprobe`, stream specifiers, `-map`, copy versus encode | build commands, inspect stream choices and real results |
| 2. Cutting and joining | trims, keyframes, timestamps, time bases, concat, cuts versus transitions | cut accuracy explorer, compare copy and re-encode |
| 3. Compression and quality | resolution, fps, codec, bitrate, CRF, presets, text readability | encode and inspect different outputs |
| 4. Editing for understanding | pacing, structure, zoom, crop, callouts, continuity, J/L cuts | make a technical explanation clearer |
| 5. Audio | levels, noise, normalisation, mixing, narration, intelligibility | inspect waveforms and repair poor audio |
| 6. Filters and compositing | chains, graphs, overlays, subtitles and images | build and debug an FFmpeg filtergraph |
| 7. Publish and deliver | format suitability, export profiles, audio and caption accessibility, metadata | export and verify a production-ready demo |
| 8. AI-assisted editing | transcription, transcript cuts, captions, proposed cuts and human review | compare agent edits against viewer comprehension |
| 9. Final project | editorial decisions and reproducible automation | turn a raw technical screen recording into a clear concise demo |

Streaming, devices, chapters, attachments and hardware acceleration are optional reference sections, not required for the introduction.

## Technology decisions

1. Reuse `snowch/learning-platform` under its existing checked-copy synchronisation mechanism, and use Assembly Lab's authoring conventions. Prefer React, TypeScript and Vite consistent with the family.
2. Host at `https://snowch.github.io/video-lab/` via GitHub Pages. Static, no login.
3. Build course-specific media model and visualisation components separately from the platform. Use actual short media fixtures, recorded `ffprobe` facts and browser player behaviour. Explanatory diagrams can be deterministic pure TypeScript.
4. Defer `ffmpeg.wasm` until a later module clearly needs real in-browser encoding; do not over-engineer Module 0.
5. Preserve provenance and reproducibility for every media measurement; CI should verify the fixture if native FFmpeg is available and clearly distinguish skips.
6. Carry interaction meaning on touch and keyboard, not hover alone. Use clear visuals that explain time and multiple streams without an overlong glossary.

## Scope, checkpoints and definition of done

**Checkpoint A (this task):** binding project rules, curriculum, sources and media provenance, front page, one complete original Module 0 lesson, working UI figures and graders, automated test suite, CI and GitHub Pages deployment configured. Run independent reader → sceptic → fix → checker process and write its results.

**Checkpoint B (later):** Module 1 and cut/encode runtime architecture review.

**Checkpoint C onward:** each module is a working increment reusing the previous figures, not a bulk generation of prose.

A module is complete only when its experiments work, claims are checked against real media, tests pass, browser interactions have been exercised at phone and desktop widths, review findings have been resolved or documented, and a short module note records design tradeoffs.

## Originality and source restrictions

The photographed 11-page *FFmpeg Basics: A Tutorial Introduction* supplied in conversation is an inspiration for topic coverage, **not available as a repository source text** and must not be copied or paraphrased from unseen pages. Use primary FFmpeg and browser media documentation. All lessons, situations, examples, interactive illustrations, exercises and graphics are original. Record exact source URLs and licences in `docs/sources.md`.

## Open decisions for the owner

- Course subtitle: proposed *From Frames to Finished Demos*.
- First fixture: generated eight-to-twelve-second original screen-demo recording with readable text plus one recorded audio stream (recommended).
- Exact browser support baseline and optional native exercises.
Proceed with these reversible recommendations for the first implementation; report them at checkpoint A.
