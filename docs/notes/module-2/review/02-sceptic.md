# Independent sceptic and technical review — Module 2

Copyright © 2026 Christopher Snow.

Reviewed 17 October 2026 by the independent sceptic from Module 0. I did not author Module 2 or its reader report. I inspected the served lesson and implementation, ran independent technical checks, then read and challenged every finding in `01-reader.md`. No product source, fixture or committed media was changed by this reviewer.

## Reader findings challenged

### P1 — Upheld, low; rank 1

**Page evidence:** Explanation says, “Input seeking with stream copy preserved earlier material for this command.” The local introduction defines FFmpeg, an input filename, the output destination and `-i`, but never defines seeking or connects that word to moving within the source. The optional copy command contains `-ss` before `-i`; its presence does not explain the operation to a learner whose Module 1 remains unavailable.

**Counterargument:** The learner already operates time controls, and an experienced engineer may know “seek”. The earlier keyframe/dependency explanation and measured stills make the observed early start understandable without this term. Therefore this is not a hidden-answer, factual or blocking defect.

**Why the finding survives:** The explanation uses a new command operation to explain why the result occurs “for this command”. The stated prerequisites do not include FFmpeg command semantics. Neither Module 0's time controls nor the optional command text supplies that particular mechanism in plain English.

**Smallest direction:** Explain input seeking locally as moving to a chosen position in the source before processing. Connect this command's earlier seek point and preserved encoded material to the observed first picture. Retain the command-specific qualification; no command-language section is required. [FFmpeg's `-ss` documentation](https://ffmpeg.org/ffmpeg.html#Main-options) explicitly describes seeking to a preceding seek point and retaining the extra segment when stream copying.

### P2 — Upheld with limited scope, low; rank 2

**Page evidence:** The challenge is titled “Plan a precise edit”, but the brief supplies the cutting operation, clip order, source ranges and instruction to reset the clocks. Four of the six form entries repeat those instructions. The other two require valid duration/output-position arithmetic. My independent browser reference attempt passed; changing one timing answer cleared completion and produced one appropriate failure when rerun.

**Counterargument:** Following and checking a supplied brief is legitimate editorial work. The arithmetic is substantive, and the current grader checks the stated re-encoding requirement correctly. Reject any claim that the current expected answers are technically inconsistent with the brief, that no learning is assessed, or that necessary facts should be hidden to make the task harder.

**What survives:** The named planning exercise provides little evidence of choosing operations from an outcome. This is a local teaching mismatch, not a grader defect. A minimal alternative would explicitly frame it as calculating/checking an already supplied plan. If retaining the planning outcome, give an outcome and constraints that let learners infer the choices from visible experiments.

**Safe direction for a planning revision:** Distinguish the method decision for the demonstrated non-keyframe cut from the separate joined-demo plan. Require that demonstrated cut's requested first picture without earlier pictures, then use opening context and a specified result-hold length as the joining goal. Let the learner infer the order, clock arrangement and source end from those goals and visible source ranges. Keep the method field, feedback and hints explicit about which cut the method refers to. All necessary evidence already exists; no new output or model is required.

**Technical boundary on that revision:** Do not claim that the keyframe-aligned join ranges alone force re-encoding. A supplemental native copy at an existing keyframe retained the requested first source picture exactly and had the requested picture span, although audio/container timing still differed. That temporary experiment used the lesson's copy-command pattern and independently compared decoded first-picture bytes with the requested source picture. It establishes why a method question must identify the measured non-keyframe comparison or another genuine requirement. It does not establish that arbitrary copy-based joins would satisfy every audio/timing constraint.

No reader finding is rejected in full. Both remain low severity. The rejected stronger interpretations are recorded above to keep these two changes focused.

## Independent technical findings

No additional substantive technical defect survived this pass.

- **Actual starts and durations:** Fresh native verification passed for the controlled source, all six cut outputs and all four join outputs. It compared the committed hashes, stream properties, presentation timestamps and audio blocks with fresh `ffprobe` results, then checked decoded output pictures and all 28 extracted stills against their recorded mappings. Copies preserve the preceding source material in these commands; filtered/re-encoded cuts meet their existing picture boundaries. The displayed picture span, container duration and first video/audio presentation times remain separate. In particular, the nonzero video start offsets in two copied files are displayed rather than silently rebased to zero in the inspection labels.
- **Source/output clocks:** Boundary source times come from the source-picture mapping; output times come from the actual output frame records. They are not inferred from browser playback position. Every selected cut and join in my browser sweep loaded the matching file and displayed the corresponding stills and timing. For both join orders and result lengths, the calculated segment layout agreed with measured picture count, duration and the two join-side pictures. At the join the second segment supplies the picture; the output end is excluded.
- **Copy limitations:** Generalisation explicitly says the earlier pictures are “a measured result of this command, not a rule that all copies start early”. This is necessary and correct. Stream copy preserves encoded media without a new encode; timestamp metadata may still be rewritten. The page does not equate copying with preserving original presentation timestamps. The separate keyframe-copy experiment above reinforces this bounded claim.
- **Trim, reset and concat:** The recorded pipeline trims video/audio separately and subtracts their initial timestamps before concatenation. Primary [trim](https://ffmpeg.org/ffmpeg-filters.html#trim), [atrim](https://ffmpeg.org/ffmpeg-filters.html#atrim), [setpts/asetpts](https://ffmpeg.org/ffmpeg-filters.html#setpts_002c-asetpts) and [concat](https://ffmpeg.org/ffmpeg-filters.html#concat) documentation supports those distinct operations. The concat filter requires zero-based segments and corresponding compatible streams; some format negotiation is automatic, and different frame rates are permitted with variable-rate output. The lesson accurately describes parameters already matching in this fixture, without claiming every source must have identical frame rate. It distinguishes the filter from the similarly named file reader.
- **Calculated failure:** The local prose, figure caption and time-model note identify the gap drawing as a calculated placement model. It is not labelled a faulty FFmpeg export or a universal prediction of malformed commands. Both clock arrangements and axis endpoints update consistently in the browser.
- **First-use concepts:** Keyframe and stream copy are explained before prediction. Inclusive-start/exclusive-end ranges and source/output time are explained before their readouts. Module 0 supplies frame/PTS, stream, container, encoding/decoding, sample and channel knowledge; the prerequisite link names that lesson. The status text itself explains a hard cut as “no gap or overlap”; Explanation defines concat and distinguishes a blending transition. Optional full commands contain additional syntax, but understanding every flag is not needed to operate the page. P1 is the remaining first-use gap.
- **Grading:** The lesson/schema, reference, invalid values, unit/clock confusion and field-specific failures passed the seven Module 2 unit tests. My separate browser attempt used the rendered final hint, passed all six checks, then changed one timing answer. Completion cleared immediately; rerunning yielded one conceptual field error; reload regraded the wrong saved work. The challenge issue in P2 concerns what is being assessed, not acceptance of a wrong result. No challenge reference answers are reproduced in this report.
- **Asset paths:** The current source, ten outputs, 28 stills and evidence file use 40 existing plain internal filenames with no path separators or traversal. Player/still URLs come from verified fixture records selected by fixed lookup options, not arbitrary user-entered paths. They are served under the configured `/video-lab/media/module-2/` base. Commands are rendered as text with quoted arguments, not evaluated. No remote media or browser-side FFmpeg run is claimed.

## Independent evidence and limits

Executed against `http://127.0.0.1:4173/video-lab/#/module-2`:

- `node scripts/module2-media.mjs`: passed; controlled source, ten outputs, all recorded timing/audio/picture mappings and 28 stills.
- `npx vitest run src/module2/model.test.ts src/module2/lesson.test.ts`: passed; two files, seven tests.
- Independent Playwright sweep: Chromium 156.0.8078.4 at 1440 × 1000/light and 390 × 844/dark, plus Firefox 157.0 at 1440 × 1000/light. Read the rendered lesson; selected and actually played all six cuts and four joins in each case; decoded the displayed stills; inspected boundaries, durations and timeline labels; switched both clock arrangements; submitted empty challenge work and inspected an expanded command. All cases had zero uncaught page errors and no horizontal overflow.
- Independent Chromium grading/edit/reload attempt and supplementary native keyframe-copy probe described above. The supplementary output exists only in `/workspace/scratch/module2/`, not in course assets.
- Visually inspected my own phone cut/clock and desktop join screenshots. Temporary evidence is `/workspace/scratch/module2-sceptic-*`; primary FFmpeg documentation was inspected from the locally fetched current references in `/workspace/scratch/module2/`.

Read the Module 2 plan, fact brief, media record, generation script and exact command/version record, all model/grader/component/prose/label/lesson code, relevant integration and tests, then the reader report. I did not repeat the reader's entire four-theme control sweep, perform a physical-device/screen-reader audit, listen to the tone, regenerate committed assets, run the full quality suite or verify deployed hosting. The independent checker must judge the rebuilt page after fixes.
