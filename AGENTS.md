# Video Lab — binding agent instructions

Copyright © 2026 Christopher Snow.

## Goal and audience

Build an original, interactive, browser-based course named **Video Lab: From Frames to Finished Demos**. Its purpose is to teach professional software-demo editing and the underlying digital video and FFmpeg concepts. The learner is a technically experienced software/data engineer, not a novice computer user. Explain media concepts from first principles without turning the labs into simple guessing games.

Follow the *workflow*, not the subject matter, in:
- https://github.com/snowch/assembly-lab/blob/main/CLAUDE.md
- https://github.com/snowch/assembly-lab/blob/main/docs/plan.md
- https://github.com/snowch/assembly-lab/blob/main/docs/authoring.md
- https://github.com/snowch/assembly-lab/blob/main/docs/style.md
- https://github.com/snowch/digital-design/blob/main/docs/platform.md
- https://github.com/snowch/learning-platform

Read those files and this repo's plan before implementation. Adapt rules instead of blindly copying ARM-specific requirements or proprietary content. Reuse the public shared lesson platform by its documented copy/sync workflow; do not edit the synchronised platform directly.

## Scope of this Codex task

Implement the front-page introduction and **Module 0: What is a digital video?** as a complete, playable, deployed and tested vertical slice. Subsequent modules are a plan, not implementation deliverables. The initial implementation used a project branch and a reviewable PR. On 17 October 2026, the owner explicitly authorised deploying the reviewed implementation straight to `main`; this supersedes the original instruction to leave `main` unchanged. GitHub Pages deploys from `main` after the full quality check.

The owner requested Module 2 (Cutting and joining) on 17 October 2026. This extends the original scope to that complete lesson while Module 1 remains planned. Apply the same mandatory workflow, using `docs/notes/module-2-plan.md` and `docs/notes/module-2/review/` for Module 2. The standing authorisation to deploy reviewed changes to `main` applies.

## Editorial standard

British English. Direct, accurate, concrete, non-marketing prose. No filler, no rhetorical suspense, no generic AI-sounding transitions. Prefer a working example to a repeated explanation. Define an unfamiliar term only when it becomes necessary. A short paragraph is not necessarily an intelligible one: explain the mechanism and consequence.

Every learner-visible sentence (introduction, labels, captions, hints, feedback, accessibility text) must receive the same factual and prose review. Keep prose and labels separate from lesson structure in the style of Assembly Lab. The learner must never have to guess unshown facts to advance.

## Executable truth

- What a figure claims to show must be computed from the media fixture, native FFmpeg/ffprobe, Web APIs, or an explicitly identified explanatory model. Never fabricate measured properties or pretend a static illustration is a real processing result.
- Pin expected output values with tests. Commit the original source of all sample media, a reproducible media-generation script, or a clearly documented provenance record (including licence). Include exact commands and versions used to obtain recorded ffprobe output. Avoid embedding huge binaries or relying on remote copyrighted videos.
- Distinguish conceptual model, browser media behaviour, and actual FFmpeg behaviour. Document simplifications next to the affected figure. Handle variable-frame-rate uncertainty, time bases, stream order and timestamp semantics accurately within lesson scope.
- Do not make a browser lesson depend on a remote service. An advanced FFmpeg.wasm sandbox may come later; it is not a prerequisite for Module 0.
- The course must run on GitHub Pages with no server-side processing, including under the /video-lab/ base path.

## Lesson and exercise contract

Use the shared lesson platform's existing schema/term gate/ten-section pattern where appropriate (question, motivation, prediction, investigation, construction, failure experiment, explanation, generalisation, challenge, reflection). Do not add filler to reach ten sections. Each interactive must earn its place. Prioritise inspect → predict → run/observe → explain → change/retry. Provide useful error feedback and five progressive hints for graded challenges if required by the platform.

Every new UI primitive must be keyboard- and touch-usable; mobile and desktop should show the same learning substance without horizontal scrolling. Use a clean Material 3-influenced aesthetic, with light/dark themes, accessible contrast and no microscopic labels.

## Assembly Lab agent workflow — mandatory

1. Plan a slice in `docs/notes/module-0-plan.md`: prerequisite knowledge, facts and sources, media fixture, original example, term gate, interactives, grading, limitations.
2. Build model/fixture/metadata and tests before prose. Prose is drafted by a separate agent/session from a *verified fact brief*, then edited for clarity by the builder. If genuine subagents are unavailable, use distinct explicit passes and document the limitation.
3. Have a fresh learner reviewer inspect the built site at desktop and phone sizes in light and dark, including all controls. They must identify assumed prior knowledge, quote findings, severity and suggested direction, not write fixes.
4. Have a separate sceptic test every finding against the real page and sources, keep only justified findings, and record rejected ones.
5. Apply ranked fixes. A checker who did not make them verifies the *built page* rather than the author's claims.
6. Run full quality checks, report exact commands/results and blockers. No authoring agent declares its own work independently reviewed.

Record the reviews, dissent and resolution under `docs/notes/module-0/review/`. When distinct agents are unavailable, be explicit and do not falsely claim independent validation.

## Required checks

One `npm run check` entry point identical to CI, covering formatting, strict typecheck, unit tests, recorded-media facts, lesson schema, term gate, reference challenges, build and browser tests. Playwright covers phone/desktop, light/dark, no horizontal overflow, controls, useful errors and back/forward navigation. Record unrun checks as such; never declare a green build without running it. Add a GitHub Actions CI workflow and a Pages deployment workflow, with a README explaining enabling Pages if a repo setting is required.

Add copyright © 2026 Christopher Snow in source headers and footer, consistent with Assembly Lab. Research and list third-party asset/software licences.

## No premature scope growth

No full nonlinear video editor, timeline compositor, AI API, accounts, payment, streaming service, giant FFmpeg.wasm payload or imitation media results in Module 0. Ship a *small truthful learning tool* first. Leave later modules unimplemented but shown as planned.

## Offline support scope extension

On 18 October 2026 the owner requested offline app support. Apply the same mandatory workflow to this slice using `docs/notes/offline-plan.md` and `docs/notes/offline/review/`. The standing authorisation to deploy reviewed changes to `main` applies.

The owner additionally requested a desktop icon on 18 October 2026. Extend offline support with installable app metadata and icons; use `docs/notes/install-plan.md` and `docs/notes/install/review/` for its mandatory drafting and review workflow.
