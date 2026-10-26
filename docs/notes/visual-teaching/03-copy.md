# Visual teaching — separate prose draft

Copyright © 2026 Christopher Snow.

The `visual_prose` session drafted the page copy and figure labels separately from
model/media implementation. This is an authoring record, not independent review
of the built site.

## Briefs and evidence

- `01-plan.md` defines the approved relationships and progressive terminology.
- `02-facts.md` verifies source codecs, dimensions, rates, native ffprobe fields,
  complete video timestamps, subtitle bytes and generated comparison assets.
- `media-views-facts.md` supplies copy/encoding and dependency model boundaries,
  native framing and quality example scope, and MP4 layout qualifications.
- `time-facts.md` supplies presentation schedules, tick conversion, invented-signal
  multiplication, the linear fade envelope and actual supplied subtitle intervals.
- `src/notebook/visuals/media.json` records supplied native examples, commands,
  tool versions and measured properties. Native quality sizes describe complete
  MP4s including audio, rather than still-image assets or edited browser output.
- Existing `docs/notes/notebook/{media,commands,commands-wasm}.json` and
  `02-prose.md` retain the original verified command and grading boundaries.

## Scope and sequencing

Revised concepts on the fourteen figure-bearing pages: initial inspection and
stream selection; picture rate and timestamp ticks; stream copy and dependency
cuts; scale/crop/pad; audio level and fade; subtitle cues; encoding quality; and
MP4 faststart. Figures own repeated mechanism descriptions while page prose
retains command-specific interpretation, practice requirements and check limits.

The first inspection introduces streams, container, codec and simple pixel
dimensions. It still runs bare ffprobe with raw output. The audio sample-rate
explanation now appears alongside frame rate in Frames and time, where the two
counts can be distinguished without crowding the opening file description.
Timestamp ticks follow picture rate, with seconds obtained by multiplying ticks
by the time base.

First definitions use selective bold emphasis. Filenames, output fields and
literal commands use inline code in the supported teaching prose. Flags and
command structures were not changed. The first inspection observation and its
three explanatory paragraphs were intentionally replaced with concise guidance
for the supplied annotated excerpt. Other observations, practice observations,
command flags, route IDs and promised checks remain unchanged.

Drafted stable-key labels in `inspect.strings.ts`, `media-views.strings.ts` and
`time.strings.ts` from their respective briefs. The inspection guide labels the
selected native fields and omitted fields explicitly; it never replaces or
claims to follow the raw edited-command output. Copy distinguishes explanatory models, supplied native
examples and the learner's own edited-command results. Dependency models do not
promise an early visible opening for every copied cut; real reference patterns
can differ. Amplitude is distinct from perceived loudness. Fade gain is distinct
from a waveform. Subtitle figures show the supplied file. Faststart diagrams
show order rather than byte proportions and do not measure network startup.

## Author checks and remaining review

Formatted the edited TypeScript files with Prettier and reviewed the diff for
accidental structural changes. A TypeScript-parser comparison against HEAD
confirmed identical option flag strings on all fourteen edited pages. No build,
browser review, full quality gate or
commit was run by this drafting session. Independent reader, sceptic and checker
review belongs to the integration workflow; this record does not claim it.

## Independent-review follow-up

The independent reader and sceptic confirmed that the timestamp figure gives
the 512-tick answer requested by the original practice. Changed only that page’s
practice, practice observation and five hints to ask for two consecutive picture
intervals, from the first picture to the third. The task transfers the worked
one-interval relationship without stating the answer in its prompt. The final
hint gives 1024 ticks and 2/24 = 1/12 second (approximately 0.083333 seconds),
consistent with the verified source PTS values 0 and 1024 in `media.json`.
The command, options and check limit remain unchanged. Regular spacing is
explicitly a verified property of this source, rather than inferred from an
average alone. This follow-up was formatted; built-site checking remains with
the independent checker.

A further reader finding identified CRF and libx264 in the quality figure before
the worked command introduced them. Moved the encoder/libx264 relationship and
CRF’s lower/higher meaning into the preceding concepts. The worked options now
explain the option syntax and video-only suffix without repeating those
definitions. Retained the limits on exact file size and restoring lost detail;
no commands, practice requirements or check claims changed.

The final R3/R4 author pass replaces “Copy compressed packets” with the already
established “Copy encoded data”. Trimmed concept/figure overlap on audio level,
fade, stream copy and faststart. Concepts retain waveform/amplitude and listening
conditions; fade/start/duration definitions; decoder/encoder, retained encoded
quality and container compatibility; and index/moov definitions plus the player’s
need to locate and time media. Figures own their multiplication and bypass paths,
fade envelope, MP4 ordering and supplied-example/model qualifications. Command
observations, explanations, practice requirements and check limits were retained.
Only prose files changed in this pass; edited TypeScript was formatted.

The final checker’s remaining unexplained “packets” in the keyframe page’s
`-c copy` option meaning was replaced with “data”; raw commands and logs are
unchanged. Fade concepts retain the general start-plus-duration calculation,
explicitly locating when a fade-out reaches silence.
