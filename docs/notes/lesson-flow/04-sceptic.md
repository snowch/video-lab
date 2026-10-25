# Independent sceptic review

Copyright © 2026 Christopher Snow.

25 October 2026. Read AGENTS.md, `01-plan.md`, `02-shared-prose.md`, both independent reader reports, the relevant lesson definitions/prose, `Cell.tsx`, `ExampleDiagram.tsx`, `Workspace.check`, and recorded native/browser media evidence. No application source edits, builds or shared tests performed. This report evaluates the reviewed build before the root's ranked fixes; it does not certify those fixes.

## Independent built evidence

Used a fresh headless Chromium context against `http://127.0.0.1:4173/video-lab/`, with 390 × 844 and 1440 × 1000 viewports in both explicitly applied themes. Opened start, copy, keyframes, join, export format/verify/decode/faststart, subtitles and native batch: 40 route/device/theme states. Saved rendered text, actual editor values, measured editor-to-Run distances and three phone screenshots under `/workspace/scratch/lesson-flow/sceptic/`. This is targeted verification, not a repeat of either reader's complete 48-state matrix. No document overflow appeared in these 40 states. The captured running build identifies itself as `ce8d694+2359dea`; the readers captured earlier builds of the same revised slice.

Independently loaded the eight-second source and ran the original full decoding command and JSON inspection in the built browser. Full decode completed with `frame= 192` and `time=00:00:08.00`. JSON reports H.264 at 854 × 480, AAC at 48000 Hz, two audio channels, format duration 8.000000 and size 352138 bytes. These match `media.json`; logs are saved as `decode.txt` and `probe.txt`.

Deliberately ran `ffmpeg -xerror -i bunny-short.mp4 -t 1 -f null -` in the decode practice. Its log ends at 24 frames and one second, but Check result accepts the completed command. Its displayed feedback explicitly asks the learner to confirm intended streams and full duration. `Workspace.check` confirms this boundary: decode checks successful execution, an input and the presence of `null`, not duration, selected streams or decoding every frame. Probe checks similarly record an actual inspection, not a correct interpretation or a requested set of fields. File-output checks inspect only their configured metadata, with duration tolerance below 0.16 seconds; they do not compare source pictures, measure gain, inspect subtitle text or prove the stream-copy path. Keep the manual limits visible. A green metadata/check result must not be described as certifying the whole learning task.

The source record independently distinguishes the 8-second/192-picture opening extract, 6-second/144-picture action extract and 120-second parent excerpt. Subtitle source has exactly two cues, 0–3 and 3–6 seconds; its text is an original example, not dialogue transcription. The diagram's join lengths come from those source asset durations, and its fixed total is fourteen seconds. Timeline selection values come from the original example command. The colour diagram's four Y and one U/V sample counts are a labelled model, not measurements of the source. These claims match source/evidence; I did not independently play every generated output or make an auditory judgement.

A later follow-up browser attempt for timestamp, source-player metadata and native-download details received `ERR_CONNECTION_REFUSED` after the original browser review had completed. Timestamp and native handoff conclusions below therefore additionally rely on reader-rendered captures and the source rather than a second live visit. The root was informed. This is not an application finding.

## Accepted, ranked findings

### 1. Medium — execution action is too far from the editable command

Accept RF-1 and RLAST-1 as one shared layout defect. My own phone measurements put Run **1770.6 px** below the join editor, **1269.8 px** below export, **800.0 px** below start and **724.0 px** below subtitles. The practice cells, without option guides, have only a 52.4 px gap. This isolates the explanation/diagram placement as the cause, rather than an unavoidable small-screen limitation. Desktop also suffers on the long join cell. Keyboard users have a shortcut, but it is itself shown after the explanation and does not solve touch use.

Least disruptive fix: keep the complete editable command first, put its shortcut and single Run/copy/download toolbar directly after it, then retain the original-example diagram and all essential option explanations in the same worked cell before actual output/observation. This preserves the owner's command-before-explanation requirement and explains every visible flag. Do not remove substantive explanations, move them to optional disclosures, add a second editor or introduce a large sticky toolbar. Recheck edited-command notices, real output and replay order after the move.

### 2. Low — several independent tasks already contain the worked answer

Accept RF-2 and the decode/faststart part of RLAST-2, with reduced severity. The actual editors independently confirm that copy, exact-cut and faststart practice differ from their worked commands only by output name; JSON and decode practice are identical commands. Manual verification still has value, and the stated technical-check limitations are honest, so these are weak transfer opportunities rather than false result claims.

Concrete preferred fix: use the already-supplied six-second action clip for copy, faststart, decode and structured inspection practice; preserve each page's verified worked example. Ask the learner to identify that input and its different duration, or support a delivery judgement with the actual log/field locations. Ask for a different three-second interval on exact-cut practice, such as source seconds 1–4. These introduce no new flags or prerequisite concepts. Update source loading, practice prose, hints, expected duration and reference command together, and execute/record every changed reference in native and WASM before asserting new output values. Keep manual start/content/copy/index-placement checks explicit. The root has chosen this direction; it still requires its own executable evidence and built checker.

Do not treat JSON practice as wholly redundant: asking for codec, size, field location and a delivery record adds interpretation beyond the worked dimensions/rate/duration task. Retain that new reading work. Changing its source strengthens it, but does not justify removing the JSON explanation.

### 3. Low — timestamp practice reveals its arithmetic answer immediately

Accept RF-3. The reader's rendered capture shows the exact 512-tick answer under the independent task, and the original practice text supplies it again in the check limitation. This makes the attempted calculation largely optional reading. The arithmetic itself is correct: `(1/24) ÷ (1/12288) = 512`.

Least disruptive fix: keep the stream values and the inverse check available, ask the learner to calculate first, and move the explicit 512 calculation to the final progressive hint. Keep Notes optional; no graded arithmetic field or compulsory reflection workflow is needed. Current source inspection shows the root making this change; this report does not independently certify its rebuilt appearance.

### 4. Low — optional native-script handoff lacks its concrete launch command

Accept RLAST-3 narrowly. The reviewed rendered page tells the learner to run the script in a POSIX shell, explains several harder shell constructs, and offers a download. `Notebook.tsx` confirms the actual filename is `previews.sh`; the page gives no matching invocation. Ordinary terminal familiarity does not establish downloaded-script execution knowledge.

Least disruptive fix: after the source-folder instruction, show `ffmpeg -version` as the availability check and `sh previews.sh` as the explicit launch from that folder. Explain that native FFmpeg is required and the script belongs alongside downloaded source MP4s. This avoids an unnecessary executable-permission prerequisite. An installation pointer is useful but absence of a complete cross-platform installer guide is not a blocker for an explicitly optional exercise.

## Rejected or narrowed concerns

- **Shared prose: original-example timelines could be mistaken for changing measurements — no further issue in the reviewed build.** Its caption already says “Original example timeline”, and changed commands receive the fixed-example notice. My rendered start capture and `ExampleDiagram` confirm the model stays tied to the original command. A persistent extra sentence is optional; do not add a second long warning without evidence of confusion.
- **Shared prose: colour diagram implies exact chroma siting — already resolved before this review.** My export screenshot and current strings explicitly say “sample counts” and exclude measured colours and exact sample positions. The model is legible at phone width and preserves the important Y/U/V distinction. No further factual correction is justified.
- **Shared prose: join plus signs imply arithmetic/audio mixing — already resolved before this review.** The reviewed diagram shows `[0:v] [0:a]` and `[1:v] [1:a]`, labels the inputs and sequence, and connects separate picture/sound outputs. Preserve it while fixing placement.
- **RLAST-2 applied equally to export/verify — narrowed.** Identical execution is true, but the practice adds field extraction and a delivery record. It deserves the stronger source-transfer task above, not a claim that it has no independent learning content.
- **Missing broad media prerequisites or wholesale repetitive definitions — not established.** The reader reports and targeted rendered review give specific explanations for the taught options and distinguish source, model and actual output. I found no basis for removing those explanations merely because they make the page long. This is a scoped conclusion, not a complete reference audit or a blanket no-issue claim.
- **Check success certifies full decoding or the intended edit — rejected as a claim the page makes.** The one-second experiment proves the check's limits; the reviewed feedback and check-limit prose explicitly delegate full-duration/content assessment to the learner. Preserve or sharpen that qualification during practice changes. Broadening the validator is separate functional work, not required to fix this flow review.

## Verification boundary

No Safari/Firefox, real touch device, subjective audio assessment, every practice solution or native script execution in this pass. No shared quality suite or rebuild was run by this reviewer. The root is responsible for newly changed command evidence; a separate checker must inspect the fixed built page and confirm command/action proximity, remaining explanation/result order, hints, source transfer tasks and real run/check behaviour before publication.
