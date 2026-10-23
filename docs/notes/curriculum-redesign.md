# Curriculum redesign — record, understand, edit, publish

Copyright © 2026 Christopher Snow.

**Design begun:** 21 October 2026. **Implementation reconciliation:** 23 October 2026. This replaces inaccurate assumptions in the initial outline with the actual implementation and dated evidence. The five-step initial path is implemented; reviewed quality and public deployment evidence are recorded in [Issue 3 acceptance](issue-3/acceptance.md).

## Outcome and artefact handoff

A learner with browser/file skills records or adopts a short software demo, understands a file's structure, inspects the intended source, makes an actual edit and downloads its MP4 and reproducible recipe. The first complete-demo checkpoint is Publish, module 8. Advanced modules 4–7 and 9–10 remain planned; they are not prerequisites for this initial capstone.

Canonical routes are Capture (`#/capture`, module 0), Build (`#/build`, 1), Inspect (`#/inspect`, 2), Edit (`#/edit`, 3) and Publish (`#/publish`, 8). The numbered curriculum is in [the course plan](../plan.md).

Capture/import/adoption establishes the project source. Build branches into a **separate structure experiment**, using supplied stills and synthetic sound; it neither converts nor replaces that source. Inspect explicitly selects the project recording or a build output. Edit uses the project recording and selected kept ranges. Publish shows the actual created edit and downloads. A provided Build/Edit reference remains a separately labelled precomputed example; viewing it does not create or complete a project export.

## Individual dispositions of the original inspection lesson

The old Module 0 lesson ID `what-is-video` remains, now metadata module 2, at `#/inspect/reference`. Its ten sections are retained as a coherent optional fixed-fixture reference after practical inspection. “Relocate” below changes the course position and route, not the evidence's identity.

| Original section | Disposition | Implemented purpose and boundary |
| --- | --- | --- |
| question | Retain and relocate | What the original recording contains; practical Inspect now precedes this numerical reference. |
| motivation | Retain and relocate | Named original build-queue recording and synthetic sound; not the selected learner file. |
| prediction | Retain and relocate | Muting prediction, preceded by the compact stream overview; no claim that playback rewrites the recording. |
| investigation | Retain and relocate | Original extracted-frame explorer, picture index and measured PTS. Never derives a reliable learner-frame index from browser time. |
| construction | Retain and relocate | Original container/streams diagram and interval counts. Build adds a simpler new encoding/muxing schematic; this detailed figure is not removed or substituted into the learner file. |
| failureExperiment | Retain and relocate | Picture versus audio-sample counts at a selected time, using the original fixture's separate units and boundaries. |
| explanation | Retain and relocate | Codec/container and timestamp/time-base explanation grounded in the original recording. |
| generalisation | Retain and relocate | Stream-order and variable-interval caution for unfamiliar files; the fixture remains constant-rate. |
| challenge | Retain and relocate | Six-field inspection challenge and five hints, graded against its original measured reference values. It is not regraded from an arbitrary imported recording. |
| reflection | Retain and relocate | Optional silent-narration notes keep the same local progress identity. |

| Original figure, challenge or asset | Disposition | Actual placement |
| --- | --- | --- |
| Compact `StreamOverview` with selected original pictures and illustrative sound band | Retain and relocate | Inspection reference prediction, labelled schematic rather than file bytes or waveform. |
| `Prediction` radio controls and feedback | Retain and relocate | Inspection reference; same taught muting question. |
| `Explorer` player, thumbnails, previous/next and PTS/tick readout | Retain and relocate | Inspection reference, original MP4 and extracted pictures. |
| `Streams` branches and one-second interval selection | Retain and relocate | Inspection reference, original stream metadata and counts. |
| `Failure` time selector and comparison | Retain and relocate | Inspection reference, original frame/audio evidence. |
| Inspection challenge/editor/grader | Retain and relocate | Fixed-fixture answers, retries/reset, five progressive hints; unchanged challenge identity. |
| `Reflection` local note control | Retain and relocate | Original reflection slot; not a new recording's metadata. |
| MP4, all extracted frames, fixture JSON and raw ffprobe output | Retain | Native-verified evidence; three stills additionally feed Build. |
| Old first-course position and home invitation to inspect before making anything | Retire and revise | Capture becomes the opening; practical Inspect has a production intention. No numerical reference material is falsely claimed deleted. |

## Individual dispositions of the original cutting lesson

The old Module 2 lesson ID `cutting-and-joining` remains, now metadata module 3, at `#/edit/reference`. Its prerequisite reference `what-is-video` and saved challenge identity remain. The practical editing path does not pretend its ungraded project operation is the fixed reference challenge.

| Original section | Disposition | Implemented purpose and boundary |
| --- | --- | --- |
| question | Retain and relocate | Keep action and result while removing waiting, now after the practical project introduction. |
| motivation | Retain and relocate | Named controlled-keyframe source plus local FFmpeg command recap. The recap remains useful in a self-contained reference. |
| prediction | Retain and relocate | Requested copy cut versus preceding keyframe in the controlled source. |
| investigation | Retain and relocate | Recorded copy/encode cuts, actual first/last pictures, source/output times and file measurements. |
| construction | Retain and relocate | Recorded AB/BA joins and short/long result holds. This is separate from running the learner's new edit. |
| failureExperiment | Retain and relocate | Explicitly calculated source-clock versus reset-and-append model; not a faulty rendered export. |
| explanation | Retain and relocate | Observed seeking, trim, timestamp reset, concat filter and hard-cut behaviour. |
| generalisation | Retain and relocate | Keyframe, variable timing, audio-boundary and concat-mechanism cautions. |
| challenge | Retain and relocate | Six-field edit-plan challenge, original reference answers and five hints; no arbitrary-file grading claim. |
| reflection | Retain and relocate | Optional editing notes remain in the same lesson storage. |

| Original figure, challenge or asset | Disposition | Actual placement |
| --- | --- | --- |
| `CutSource` player and recorded command | Retain and relocate | Editing reference, controlled original derivative. |
| `CutPrediction` keyframe strip/radio controls | Retain and relocate | Editing reference, known cut request and observed answer. |
| `CutExplorer` method/start selectors, outputs, stills and evidence | Retain and relocate | Six recorded cuts; selecting them does not run the new project processor. |
| `JoinExplorer` order/hold selectors, timeline and join-side stills | Retain and relocate | Four recorded joins, source/output clock interpretation. |
| `ClockExperiment` | Retain and relocate | Labelled mathematical exception to byte-processing interactions. |
| Edit-plan challenge/editor/grader | Retain and relocate | Original method/order/reset/end/duration/join reference values and persistence. |
| `EditReflection` | Retain and relocate | Same optional local notes. |
| Controlled source, ten outputs, boundary stills and native evidence | Retain | Existing verification remains in the full check. |
| Old numeric position and invitation to stop at an edit-plan answer | Retire and revise | Named Edit route now makes actual project bytes; Publish downloads/reviews them. |

The home prose and module availability are revised. The shared platform, reference schema, graders, fixtures, lesson IDs and stored-work keys are retained. No reference section is silently retired because a similar idea appears in a new practical page.

## Actual static-versus-interactive decisions

| Element | Decision | Why |
| --- | --- | --- |
| Capture pipeline | Static labelled sequence | Shows chosen surface → browser recorder → actual file without decorative activity or fake capture. |
| Build filmstrip | Static real pictures; calculated output intervals | Shows exactly which pictures are inputs and how their schedule changes. A real rerun creates new bytes. |
| Encoding/muxing schematic | Static labelled lanes | Explains pictures/sound → encoded streams → container; not file layout, measured waveform or progress. |
| Edit pipeline | Static labels | Explains decode → trim → reset → join → encode; actual processing belongs to the Run action. |
| Capture, inspection, Build and project Edit | Interactive real operations | Explicit actions acquire, read or transform actual media. Loading indicators do not invent percentage progress. |
| Native players and downloads | Real output evidence | Playback and saved bytes expose results; a probe alone does not establish a readable explanation. |
| Retained cut/join selectors | Interactive recorded comparisons | Learner choices select native-verified existing outputs with explicit source identity. |
| Retained clock experiment | Interactive explanatory model | Changing clock arrangement tests a concrete timing claim; no fake malformed video is rendered. |
| Publish checklist | Learner review controls | Records current self-checks; does not automatically certify external playback or export completion. |

## Original scene, provided fixtures and optional comparison

The build-queue scene is original. Build uses extracted pictures **000, 048 and 072**, at original source times **0, 4 and 6 seconds**. They show **initial state, sorted result and later hold**. They do not show the click or continuous movement. Their burned-in source times remain source labels; the Build page separately shows the new output intervals at the chosen one- or two-picture-per-second rate.

The capture fallback is a labelled original provided recording. Journey video-only/audio examples and a provided six-second edit were generated before the current click; their metadata is recorded in `public/media/journey/evidence.json` and reproduced by `scripts/journey-media.mjs`. Exact settings of a provided reference must be explained separately from the live control state; the built reader raised that as B1.

The optional Big Buck Bunny comparison appears in Publish only after an explicit load click. It is not the project source and is outside the baseline offline manifest. [Its record](issue-3/media/big-buck-bunny.json) pins the official Blender archive/member hashes, 60–65-second source interval, re-encode command, 320×180 H.264/AAC output, 86,088 bytes and CC BY 3.0 attribution. It does not imply any advanced module is implemented.

## Capture support and privacy boundaries

| Environment/path | Evidence and practical route | Limitations |
| --- | --- | --- |
| Secure browser with display capture and a supported recorder type | Explicit click invokes the real chooser, then MediaRecorder; actual MIME determines extension. | Browser/surface controls sharing and optional audio. No microphone promise. Capture caps at 15 seconds/20 MiB. |
| Managed Chromium on a virtual Linux display | Real getDisplayMedia recording, replay/download and ended tracks were observed in [native-capture.md](issue-3/native-capture.md). | Test flag selected the virtual monitor. Not a human permission/source-selection test or physical-device certification. |
| Chromium/Firefox production processing | Real encode/mux/probe/playback in [wasm-spike.md](issue-3/wasm-spike.md). | Does not certify Firefox desktop display capture, every codec, Safari or a physical phone. |
| Unsupported or declined browser capture | Adopt labelled original source or import supported MP4/WebM. | Source fallback solves capture availability, not missing processing tools. |
| Windows native gdigrab / macOS AVFoundation | Optional documented terminal commands; macOS device enumeration is explicit. | Source-reviewed, not executed on those operating systems. |
| Native Linux/X11 | Real FFmpeg capture of the visible app on a virtual X server was executed and independently probed. | Not physical hardware performance evidence. |
| Wayland | Browser chooser or supported portal/PipeWire desktop-recorder workflow; import the result. | x11grab/XWayland does not promise capture of the full Wayland desktop. |
| Phones, tablets and Safari | Responsive reading/control layout and provided-source route; processing support must be assessed honestly. | Desktop emulation is not physical mobile recording or Safari certification. |

Choose only the intended surface, make text readable, close unrelated notifications/windows and inspect sensitive material before recording. Shared audio is opt-in and may be absent. Stop/navigation releases acquired tracks; a late permission result is disposed. Native capture runs on the learner's own machine; browser WASM has no desktop capture-device access.

## Corrections to initial outline assumptions

The old opener defined stream, frame, PTS and other terms inline; its `introduces` metadata is not a learner-visible vocabulary list. The redesign therefore makes a positive sequencing choice—earlier production and ownership—not a claim that prior independent reviews found all terminology untaught. The outline reader and sceptic rejected that overstatement (O5).

The pinned `@ffmpeg/core` 0.12.10 **does include ffprobe**. Actual new MP4/WebM probing, encoding and playback are recorded in the compatibility spike. The adapter validates full actual JSON, format/streams and errors, including the pinned successful -1 cleanup sentinel. Encoding still requires status 0 and inspected output bytes. It does not substitute assumed metadata or a static label for a real run.

The original assumption that every chapter transforms the same bytes was also too broad. Build is an explicit branch. Inspect compares the actual file with an intention; silence and small dimensions alone do not prove failure. The outline's O1–O4 resolutions are recorded in [reader](issue-3/review/01-outline-reader.md) and [sceptic](issue-3/review/02-outline-sceptic.md).

## Routes, storage, offline and completion

Named routes avoid numeric collisions. `#/module-0[/section]` redirects to `#/inspect/reference[/section]`; `#/module-2[/section]` to `#/edit/reference[/section]`. They never become aliases for the new numeric module 0/2 pages. Stable lesson IDs preserve existing platform progress, hints and notes, and reference answers are regraded rather than trusting stored completion.

Project media has separate IndexedDB storage and explicit session-only failure wording. The actual source, created experiment files and created edit remain distinct records. Source/range changes invalidate stale edits; rate changes invalidate stale Build/audio outputs. An explicit clear-project control removes saved project media. Downloads remain necessary for important work.

The baseline offline manifest excludes `encoder/` and `optional/`. A separate explicit tool download totals 32,367,068 bytes including notices; the build manifest is authoritative. Offline lessons and tools report readiness separately. Without processing tools, a learner may read and inspect provided evidence but cannot claim a produced demo. The core is GPL-2.0-or-later, wrapper/util MIT; notices and exact source references are distributed with the optional core and baseline wrapper notice.

Implementation is not blanket approval. [The built reader](issue-3/review/03-built-reader.md) actually completed encoding, muxing, rate rerun, inspection and a six-second edited MP4/recipe download from the provided original source. B1–B4 received sceptic disposition, ranked fixes and independent built-page verification. The checker subsequently found C1, sparse-picture edit timing; its fix and separate sceptic/checker rechecks are preserved as well. Final integrated checks and public Pages verification are tracked separately; future modules remain planned regardless of initial-path closure.
