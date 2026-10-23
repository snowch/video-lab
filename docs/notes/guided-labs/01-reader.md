# Guided labs: independent reader

Copyright © 2026 Christopher Snow.

Reviewed 23 October 2026 at the local preview. I read the slice plan and homepage prerequisites, then followed the built instructions before reading implementation or tests. The learner knows terminals, browsers and files but has no assumed media knowledge. This review covers the new task presentation across all seven available labs; it does not repeat the complete media-regression audit.

## R1 — Low: instructions still promise the full vocabulary and limits from contextual help

The inspection reference's first task says “See the command vocabulary and workspace limits” before the example `help`. The editing reference says “Run help for workspace commands and limits”; Build's fifth task says “Run help for file and processing limits.” Actual `help` now returns current-task commands and short essentials, ending “Type help all for the complete workspace command list.” It does not directly return the promised limits. The learner can recover from that pointer, so this is a small avoidable detour rather than a blocker.

Suggested direction: use `help all` wherever the instruction promises the full vocabulary or bounds; describe ordinary `help` as current-task assistance. The parent has assigned this prose correction and reports a new build is forthcoming. This record preserves the observed mismatch; the separate sceptic/checker should verify its resolution.

No other justified findings or pedagogical blockers emerged. The first loaded version repeated the overall production heading for its individual tasks. After refreshing to `index-JLqlWbLe.js`, I observed distinct titles, including “Encode the picture sequence”. The superseded titles are not an outstanding finding.

## Actual first-use evidence

With `getDisplayMedia` absent in a fresh browser context, Capture opened with: “Screen recording is unavailable in this browser. Choose the provided recording or import your own file. You still type the command to load it.” Switching between those choices changed instructions without changing output or loading a file. The sample's provenance is explicit: supplied media containing the Sort action and a synthetic tone, not a recording I made.

I typed `sample`, `ls`, `play "capture.mp4"` and `download "capture.mp4"` through the four capture tasks. The source appeared as 128,737 bytes, the player loaded its ten-second media, and an actual `capture.mp4` download was saved. I then imported the same bytes under `my-demo.mp4`; Capture's replay example changed to `play my-demo.mp4`, preserving the chosen filename. The task prose still instructs the learner to inspect exact names rather than assuming `capture.mp4` is an alias.

Contextual `help` in the download task returned the download example and short essentials; `help all` retained the full command reference, limits, hints, checks and provenance rules. I also ran `fixtures`, the displayed one-frame-per-second FFmpeg encode and the displayed ffprobe command. Actual `video.mp4` was created with its execution recipe; the report showed one video stream and a three-second duration. This is direct execution evidence for the retained workspace, not a claim that all production commands were rerun in this slice.

I manually traversed all tasks: Capture 4, Build 6, Inspect 4, Edit 4, Publish 5, and each reference 10. Next/Previous changed instructions without executing commands. The repeated explanation is honest: “It changes the instructions; check the command output yourself before moving on.” After traversing the references without submitting their checks, `progress` still said no current artifact had passed either lab. There was no automatic success from navigation.

The old inspection `#/module-0/investigation` bookmark selected task 4, “Locate a picture by presentation time”. The old editing `#/module-2/failureExperiment` bookmark selected task 6, “Run a real failure of clip clocks”. All tasks exposed the section links; choosing the edit challenge selected task 9 and its canonical hash, with its title visible near the top. Browser Back restored the prior failure section. Enter activated Next task from keyboard focus.

## Teaching and layout

The task split retains necessary mechanisms beside the relevant commands: pictures and display rate, encoding/codec/container, probing, stream mapping and muxing in Build; actual source identity and missing-duration uncertainty in Inspect; trim ranges, optional audio, clock resets and explicit silent joins in Edit; actual output, source inputs and recipe limitations in Publish. The reference sequence still explains picture indexes versus audio blocks, time bases, fixed-source evidence, keyframes, copy versus accurate cuts, clock failures, decoded-output checks, hints and optional notes. I found no required concept silently removed into an unrelated task.

The expandable background and workspace instructions remain accessible. I opened them: capture timing, provenance, browser recording limits and optional shared sound remained available, as did shell boundaries, quoting, cancellation and keyboard usage. The primary task retains its actionable command and explanation rather than requiring the background disclosure for every step.

At 1440 × 1000, the current task and terminal occupy adjacent columns. At 390 × 844, the current task precedes the terminal; longer explanations still require vertical reading, but only the selected task occupies the main lesson flow. Output was bounded at 238 desktop / 201 phone pixels in the populated example, keeping the command input close to the output. Screenshots in both actual light and dark themes were readable. All seven routes at both sizes and both themes had one command input and document widths exactly matching the viewport, with no horizontal page overflow.

Visual scratch evidence is under `/workspace/scratch/guided-reader/`. This pass used Chromium keyboard/click actions, simulated API absence, file import and actual browser media tools. It did not test a real operating-system capture chooser, physical touch gestures, screen-reader behaviour or every encoder again. No app fixes were made by this reviewer.
