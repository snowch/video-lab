# Visual teaching — independent technical sceptic

Copyright © 2026 Christopher Snow.

The `visual_sceptic` session reviewed the integrated built candidate served at
`http://127.0.0.1:4173/video-lab/`. It did not implement the figures, author their
copy, edit product files, build the candidate or run the full quality gate.
The full gate and subsequent independent fix check belong to the integration
workflow. The completed `04-reader.md` was read and every reported finding was
independently tested against the baseline built page and the relevant sources.

## Independent evidence

Read `AGENTS.md`, `01-plan.md`, `02-facts.md`, `03-copy.md`, `time-facts.md`,
`media-views-facts.md`, generated `media.json`, the provenance record, figure
components/copy/styles, integration diff and native verification script.

Browser audit: 14 figure-bearing routes × desktop 1440 × 1000 / phone 390 × 844 ×
light/dark = 56 built cases, with screenshots and image metrics under
`/workspace/scratch/visual-teaching/sceptic/`. All had no horizontal document
overflow and all figure images loaded. Key figures were visually inspected:
copy/encoding, dependencies, framing, quality, frame schedules, ticks, amplitude,
fade, subtitle timing and MP4 layout, plus the second annotated probe guide.
Additional 200% text copy-pipeline cases cover all four desktop/phone themes.

Commands run:

- `node scripts/visual-media.mjs` — passed. Verified source/provenance, raw probe
  excerpt, 192 video PTS, SRT cues, four framing PNGs, two real full-clip encodes;
  six images total 826,827 bytes. Native build was FFmpeg/ffprobe
  `7.1.5-0+deb13u1`, the recorded build.
- `npx vitest run src/notebook/visuals/time-model.test.ts src/notebook/InlineText.test.ts`
  — 2 files, 7 tests passed.
- Scratch Playwright audits `audit.mjs`, `enlarged.mjs`, `probe.mjs`, `control.mjs`
  — completed. The amplitude slider responds to Home (0), End (1), ArrowLeft
  (0.95); zero gain produces a flat line at unchanged horizontal sample positions.

## Accepted ranked findings on the baseline candidate

1. **High — annotated dimensions show a stream ID instead.** The reader reported
   this and the sceptic independently reproduced it in source and built output.
   The broad dimension regex matches `0x1` in `Stream #0:0[0x1]` before reaching
   `854x480`. The supplied annotation visibly reads
   `Stream #0:0 … Video: h264 … 0x1 … 24 fps`, while its prose explains `854x480`.
   This teaches the wrong field in the core reading guide. Match the measured
   width/height explicitly and add a regression test for the real recorded line.
   Evidence: `phone-dark-probe-guide.png`.
2. **Medium — desktop encoding path splits individual words.** The six-column
   chain at ordinary desktop size gives each box about 77 pixels. It renders
   `Decod/e`, `Picture/s`, `sampl/es` and `Option/al`. This obscures the intended
   pipeline despite technically avoiding overflow. The same issue persists at
   200% text. Phone's vertical chain is legible. At 200% phone text the dependency
   decode/discard caption also fragments words in its two-column layout; the
   faststart beginning/end sidebar and media labels likewise fragment. These
   additional reader findings were independently reproduced in the baseline
   browser, with screenshots `phone-dark-200-cut-join-keyframes.png` and
   `phone-dark-200-export-faststart.png`. Use wider or vertical stages and
   full-width captions/labels.
   Evidence: `desktop-light-cut-join-copy.png`, `desktop-dark-copy-200.png`.
3. **Medium — timestamp practice repeats the displayed solution.** The new
   concept figure prints `512 × 1/12288 s = 1/24 s`, then the unchanged practice
   asks how many ticks fit one `1/24`-second interval. The answer is already
   supplied immediately above. This is factually correct but weakens independent
   transfer. A two-picture interval provides a changed calculation while retaining
   the same inspection command and honest manual-check boundary.
   Evidence: `desktop-dark-frames-time-timestamps.png`, baseline page copy.
4. **Low — stacked stream arrows imply a serial relationship.** On phone, the
   source streams are stacked video then audio, followed by downward arrows to
   video-only and then audio-only outputs. They no longer align the selected
   stream with its output and can imply audio → video → audio conversion.
   The accurate caption mitigates this; removing the arrows on stacked layouts
   would remove the ambiguity. Evidence: `phone-light-inside-video-streams.png`.

## Every reader finding tested

- **R1 — accepted high**, as ranked finding 1. Reproduced on the actual annotated
  built guide and by matching the original recorded line with the original regex.
- **R2 — accepted medium**, as expanded ranked finding 2. Independently reproduced
  desktop pipeline and both phone/enlarged dependency/faststart cases. The
  important distinction is legibility versus overflow; the page fits but words
  are fragmented. The reader's tablet example is consistent with the same CSS;
  the sceptic did not separately repeat a tablet viewport.
- **R3 — accepted medium.** The baseline quality concept defines only a general
  quality target; the next figure uses `libx264`, `CRF 18` and `CRF 35`. The
  expansion and lower/higher direction appear later inside the first command.
  Confirmed directly in the baseline browser by `reader-findings.mjs`. Source
  search finds no earlier page definition of CRF/libx264. The copy figure also
  uses “packets” before explaining packet boundaries. The existing “encoded
  data” language teaches the same bypass without this prerequisite. Define the
  quality control before the figure and use established data wording in the
  model; preserve actual command/log terminology.
- **R4 — accepted low with narrowed scope.** There are real adjacent overlaps in
  amplitude multiplication/timing and half-amplitude loudness caveats; stream
  copying's bypass/filter requirements; and faststart's supplied-ready and
  local/network qualifications. Keep first definitions of amplitude, decoder,
  encoder, stream copy and index. Let the figure own the repeated relationship
  and its nearby limitation. For fade, preserve the definition and start-plus-
  duration arithmetic, which supports a distinct calculation; only the
  unchanged-duration/no-shortening claim overlaps. Reject a blanket reduction of
  the command-specific explanations or definitions: those serve another purpose.

The two independent additional findings (timestamp practice and stacked output
arrows) remain ranked findings 3 and 4 above. No reader finding was rejected in
full, and none of the accepted prose issues is a factual media blocker.

## Verified claims and rejected concerns

- **Reject incorrect framing scale/crop proportions.** Both frames share one
  display scale. On desktop source is 567 × 319 and crop 319 × 319; on phone,
  source is 358 × 201 and crop 201 × 201. PNG natural dimensions match the native
  record. Integer CSS rounding is expected. Padding bands belong to genuine
  filtered pixels and have no false exact band-size label.
- **Reject dependency arrow reversal.** The arrows point towards the preceding
  reference, in agreement with the accompanying labels. The model is explicitly
  synthetic, source pictures are in display order, and multiple/forward reference
  and visible copied-opening limitations are stated. It does not claim a real
  GOP or guarantee that every copied cut visibly starts early.
- **Reject fabricated quality measurements.** Native commands, original source,
  hashes, full-MP4 bytes, matched crop coordinates and tool versions are recorded.
  Whole output sizes are correctly distinguished from PNG size and learner
  results. The same 256 × 192 detail is displayed at equal scale. Page prose
  correctly states that larger re-encoding cannot restore lost detail.
- **Reject false timing/audio/subtitle facts.** All 192 source PTS were checked;
  512 ticks × 1/12288 s equals 1/24 s. The frame schedules use [0, 1), not an
  inclusive twenty-fifth endpoint. Audio sample rate is per channel. Amplitude
  uses an invented signal, gain does not move samples, and loudness is qualified.
  Fade gain falls linearly from 1 at 5 s to 0 at 8 s. Actual SRT cue intervals
  are 0–3 and 3–6 s, followed by no cue to 8 s; the figure states it does not track
  learner edits.
- **Reject false faststart measurement.** The figure labels its layout as
  schematic, disclaims byte proportions and local network benefit, and states
  that supplied clips already have an early index.
- **Reject raw-log mutation by typography.** The integration diff only applies
  `InlineText` to authored prose fields. Raw command/output remain plain React
  text in their original `pre` elements; no runner, schema, progress or command
  structure changes were introduced by these figure integrations. The inline
  parser tests cover code literals and escaped HTML.

## Native verifier portability assessment

The default gate pins committed asset identities and complete MP4 sizes without
re-encoding them using CI's potentially different libx264 build. It re-extracts
PNGs from the committed source/encodes and compares decoded RGB pixels with
MAE < 1, allowing small native decode/scale rounding differences. Stream/frame/
caption facts are compared semantically. The exact raw ffprobe excerpt is
compared only when the current ffprobe version equals its recorded version.
The generated facts' image hashes describe committed files, rather than scratch
PNG compression bytes, so a changed PNG encoder does not defeat this tolerance.
These choices address the relevant Ubuntu different-build failure modes.

A second native build was not executed. Passing on this installed build and code
inspection support portability but do not prove every future native build; CI's
actual Ubuntu run remains required. No concrete portability blocker was found.
