# Independent technical sceptic: bitrate purpose

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 against the built preview at
`http://127.0.0.1:4173/video-lab/`. I did not draft or edit the product. I read the
rendered pages and technical evidence independently, then read the completed
`03-reader.md` and adjudicated its findings. No product changes are requested.

## Evidence and independent checks

Read `AGENTS.md`, `01-facts.md`, the prior
`docs/notes/visual-teaching/02-facts.md` and
`docs/notes/probe-bitrate/01-plan-facts.md`, the three changed product files and
command definitions, `/workspace/scratch/bitrate-purpose/native.json`, and the
libx264 section of the saved official `/workspace/scratch/codecs.txt`. That
section separately defines `crf` as setting quality for constant-quality mode
and `b` as setting bitrate. The fixture preparation, brands and native reader
source references support the MP4 provenance separately from the reader's name.

Ran the standalone Node script
`node /workspace/scratch/bitrate-purpose/sceptic/review.mjs`, importing Playwright
directly, without invoking its CLI or the full suite. It completed successfully.
Artifacts are under `/workspace/scratch/bitrate-purpose/sceptic/`:

- Text and full-page screenshots for both routes at 1440 × 1000 and 390 × 844,
  each in light and dark. All eight document-width checks report no horizontal
  overflow in `review.json`. Inspected the phone dark inspection page and desktop
  light quality page screenshots visually as well as their rendered text.
- Actual browser `ffprobe bunny-short.mp4` and `ffprobe bunny-action.mp4` logs:
  both print the shared reader list and H.264/AAC streams; durations are eight
  and six seconds, with whole-file summary rates 352 and 367 kb/s respectively.
- Actual, unmodified browser CRF 18/35 commands completed. Their logs identify
  `rc=crf`, the requested 18.0/35.0 factors, final `Lsize` 670/287 kB and final
  time 8.00 seconds. These corroborate the same-duration size comparison without
  treating rounded log sizes as exact byte measurements.

An initial script attempt tried to click Load practice files again after both
files were already present; the UI correctly no longer offered that action. I
corrected the review harness to load only when offered and reran it successfully.
This was a harness assumption, not a product failure.

## Adjudication of learner findings

The learner reports no blocking or medium finding and requests no fixes. Each
substantive conclusion is accepted:

| Learner conclusion | Sceptic adjudication |
| --- | --- |
| The reader list does not establish MP4 identity. | Accepted. `mov,mp4,m4a,3gp,3g2,mj2` names one reader's related formats. The built guide explicitly states the ambiguity, supplies the known MP4 provenance, and the practice asks only for duration, stream count, types and codecs. It no longer asks learners to infer MP4 from this list. |
| Bitrate and kb/s are defined before their consequences. | Accepted. The built definition includes pictures, sound and container information, decimal kilobits and an explicit whole-file average. Native metadata gives 352,138 bytes × 8 / 8 seconds = 352,138 bits/s, consistent with the approximate 352,000-bit/s interpretation of the integer summary. |
| Storage/download and streaming explain the practical purpose. | Accepted. The size comparison explicitly holds duration equal. “Generally needs a faster connection” is a qualified practical consequence, not an asserted exact connection-speed threshold. |
| The quality tradeoff avoids equating more bits with better quality. | Accepted. The guide says stronger compression “can” reduce quality and identifies source, codec and settings as relevant. Chapter 8 also says re-encoding cannot restore lost detail. Its larger CRF18 illustration therefore makes no unsupported improvement claim about the source. |
| Chapter 8 provides the practical continuation. | Accepted. The rendered optional link targets the actual CRF lesson, whose opening defines lossy compression and encoder and explains both changed flags beside the commands. The learner's desktop/phone navigation evidence matches the route definitions. |
| Equal-duration file sizes rank average whole-file bitrates. | Accepted. All supplied native examples have duration 8.000000. CRF18 is 685,427 bytes / 685,427 bits/s; CRF35 is 293,763 bytes / 293,763 bits/s. Both contain H.264 and AAC. The simple equality of byte count and bit/s here results from eight-second duration, not a general conversion rule. The built text makes no such conversion claim. |
| CRF targets quality rather than bitrate or exact size. | Accepted. This matches libx264's documented controls and the executed logs. “Lower values generally” appropriately qualifies the detail/data direction. Fixed native examples are explicitly separated from the learner's own result and cannot be read as promised browser sizes. |
| The revised paragraphs have distinct teaching purposes. | Accepted. Quantity/units, practical cost and possible quality loss answer different questions. The Chapter 8 repetition occurs at the worked comparison and practice decision where learners use the relation. No extra activity or flag is needed. |

The reader's controls evidence is consistent with the unchanged controls and my
own completed inspection/encoding runs. The reader explicitly does not claim
that the quality practice check finished: its captured “Working” state is an
observation limit, not evidence of a failed check. I likewise do not certify that
check's eventual result here. The full repository gate is the builder's separate
responsibility. Neither review claims a listening assessment from headless runs.

## Considered concerns rejected

These are technical possibilities considered by the sceptic, not additional
findings attributed to the learner:

- Requiring buffering, transport overhead or rate-variation terminology in the
  Chapter 2 streaming sentence: rejected. The current qualified wording does
  not claim that the average is an exact minimum network capacity, and explains
  the intended practical consequence accurately within scope.
- Requiring container-brand inspection or an additional probe command: rejected.
  The lesson now supplies the MP4 fact and teaches what the displayed reader
  list can establish. New commands are unnecessary to remove the inference.
- Requiring a bitrate-target command, CBR/VBR lesson, formula exercise or new
  bitrate control: rejected. The approved purpose is a practical introduction
  connected to the existing CRF decision. The revised text explicitly prevents
  treating CRF as a bitrate setting.
- Treating different fresh native/browser sizes as a false figure: rejected.
  The figure labels measured supplied native examples and qualifies build/run
  differences. Recorded and fresh results agree on the substantive relation.

No accepted issue requires a ranked product fix. Proceed to the independent
built checker and full required quality gate; this scoped review does not
substitute for either.
