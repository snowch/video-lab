# Notebook course — separate prose draft

Copyright © 2026 Christopher Snow.

Drafted in the separate `notebook_prose` agent/session from the builder's verified brief, `01-plan.md`, `media.json`, `commands.json`, `src/notebook/structure.ts` and `copy-types.ts`. The binding AGENTS workflow and the owner's generic-course scope supersede the earlier software-demo theme. This is a draft/authoring record, not an independent review of the built site.

## Deliverables

`src/notebook/copy.ts` exports `courseCopy: CourseCopy`. It provides ten chapter introductions and all 24 exact page IDs, with 27 worked-cell labels, 24 independent tasks, 120 progressive hints and explicit limits on every technical check. Every page introduces one concept through a goal, first-principles explanation, a prediction/reveal, worked commands, one-variable experimentation, independent practice and self-review. Options and graph syntax appear in explanation before execution. The native batch page explains every shell construct separately from browser commands.

`src/notebook/ui.strings.ts` retains its keys while clarifying raw command output, conditional browser persistence, stale results, script download, archival lessons and non-destructive one-time file copying. The source credit names Big Buck Bunny, the Blender Foundation, peach.blender.org and CC Attribution 3.0, describes the resized/re-encoded stereo-downmix extracts and distinguishes original example captions from transcription. The font has its own licence link.

## Factual boundaries

The regenerated media record confirms 854 × 480, 24 fps H.264 video and 48,000 Hz AAC stereo in the eight/six/120-second practice files. The long excerpt comes from original seconds 60–180; the source's extra timecode track is omitted. Commands are 51 actual native runs, using native FFmpeg 7.1.5; browser execution uses the separately confirmed WASM FFmpeg 5.1.4/core 0.12.10. Drafts do not translate native run times, file sizes or visual quality into claimed browser measurements.

Stream-copy cuts remain boundary-dependent; copied duration is not claimed to establish an exact opening. Average frame rate is distinguished from actual presentation timestamps and timestamp ticks. Scaling may adjust sample aspect ratio. Concatenation relies on the supplied clips' compatible properties and zero-start timelines. Audio stream presence does not establish gain or a fade. A successful render does not establish title wording, font size, subtitle edits or readability. H.264 presence does not establish CRF or preset, nor MP4 presence fast-start box order. Format inspection and full decoding have different limits. Browser checks cannot certify another player or observe native script execution.

The independent tasks match the structure's supplied solutions and expectations. Additional intention-dependent requirements, such as clip order, selected start, gain and lettering, are explicitly assigned to review rather than claimed as automatic grading. The export-format task also acknowledges that its technical check does not certify pixel format or audio codec.

## Draft validation

- Transpiled and imported the actual structure/copy modules using the installed TypeScript compiler. Confirmed ten chapters, 24 exact page IDs, matching labels for all 27 worked cells, exactly five hints per page, and no missing required prose fields.
- Ran `npx prettier --write src/notebook/copy.ts src/notebook/ui.strings.ts`.
- Ran `npx tsc --noEmit`. It reported only builder-owned `Workspace.tsx` errors at the time (an array inferred as `never[]`, `Probe.probe`, and implicit-any callbacks); no draft/type-shape errors. The builder was informed. This run was not a successful whole-project typecheck.

Built-site reader/sceptic/checker review, command execution in the integrated UI, persistence behaviour, theme/viewport review and complete repository checks remain the builder's next workflow stages. This drafting agent does not claim to have independently reviewed its own prose.

## Integrated-string author pass

After implementation, the drafting agent read the current notebook components, model, database, workspace checks, shared command parser/builder and new earlier-workbench banner. This is an author clarification pass, not the required independent built-site review. The builder reported actual browser trim and subtitle/font-folder success; this agent did not repeat or independently certify those runs.

Changed the compression goal from unexplained “quantisation targets” to “quality targets”. Tightened the decode check limit: the implementation records command completion, and the learner must still confirm full duration and intended stream selection in the command/log. It cannot automatically certify full decoding after arbitrary command edits. Changed the generic busy label to “Working” because it also covers file operations, made the file-storage note conditional, and replaced ambiguous “Keep” cancellation buttons with “Cancel”.

Proposed builder-owned string replacements:

- Audio-presence checks: “Contains sound” → “Contains an audio stream”; “Has no sound stream” → “Has no audio stream”. Stream presence does not prove audibility.
- Opening/migration catch: “Browser storage is unavailable. New files can be used in this session; download important work.” → “Saved work could not be fully opened or copied. Earlier files have not been removed. Download new files and page records before closing.” This catch also covers migration failures, not just unavailable storage. The builder was alerted that the toolbar must not show “Saved” after this catch without separate evidence of durable state; prose alone cannot fix that state issue.
- File-count limit: “The workspace holds 64 files.” → “The workspace allows at most 64 files.” Retain the existing download/removal guidance.
- Invalid-path guidance should explicitly allow spaces, which the model accepts, and name real limits. Suggested full text: “Use a relative path such as clips/my video.mp4. Names must start with a letter or digit; spaces, dots, hyphens and underscores are allowed. Do not use .., inspection.json or names beginning cli-internal. Maximum: 80 characters per name, eight levels and 180 characters overall; no trailing spaces.”
- Existing-destination errors in copy/new-folder operations: “The destination already exists.” → “The destination already exists. Choose another name; nothing was replaced.”
- Missing output: “The command did not produce a file.” → “No output file was produced. Read the command output and check the output path before retrying.”
- The earlier-entry banner is accurate. Suggested consistency edit only: “Earlier standalone workbench” → “Earlier standalone workbench (archive)”; “Open the notebook course” stays.

Other inspected hardcoded labels (recording guide link, page navigation, output-scroll accessibility labels, text-preview truncation) accurately describe their controls. Native tool errors remain genuine tool output; app messages remain separate. No source/backend edits were made by this drafting agent.

After this pass, `npx prettier --check src/notebook/copy.ts src/notebook/ui.strings.ts` and `npx tsc --noEmit` both passed. This supersedes the earlier transient typecheck failure for the current integrated source; it does not replace the builder's full quality check or independent review.

## Runtime-output clarification draft

Copyright © 2026 Christopher Snow.

The independent reader and sceptic confirmed that the real browser runtime can print `Aborted()` during a run otherwise accepted by the app. Added separate `runtimeFfmpeg` and `runtimeProbe` labels without modifying the raw logs. The FFmpeg note identifies an actual returned status of zero and applies equally to file-producing and null-output runs. It does not claim that a file was created or that failed aborts are harmless. The ffprobe note identifies the actual `-1` status, the app's validated JSON inspection report and native success status zero; it does not relabel `-1` as zero or treat it alone as success. The builder owns persisted status evidence and conditional rendering: show each note only for its matching recorded tool/status, an accepted run without an execution error, and an actual `Aborted()` log entry.

## Subtitle font-selection correction

Copyright © 2026 Christopher Snow.

The checker inspected actual burned-in-subtitle pixels and found that merely supplying `fontsdir=fonts` could produce a valid video with no visible lettering: this browser libass build did not resolve its default Arial fallback to the supplied font. The builder is verifying and adopting an explicit `force_style=Fontname=DejaVu Sans` setting in the worked, starter and reference commands and command evidence. This drafting pass does not independently claim to have executed that correction.

Updated the subtitle page to explain the distinction between loading a font folder and selecting the font's internal family, the `force_style` override and `Fontname` setting, and why the complete expression must remain quoted around the space in `DejaVu Sans`. No promise is made about fallback to device-installed fonts or support for other fonts. Practice names the selected family; review explicitly checks visible letters over a cue interval. The technical-check limit now states that duration and stream presence cannot establish that lettering was rendered at all. This correction demonstrates why valid output and a successful media command do not replace replay or pixel-based inspection.
