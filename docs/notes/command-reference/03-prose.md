# Command reference: separate prose draft

Copyright © 2026 Christopher Snow.

Drafted 30 October 2026 by a separate prose agent from the verified `02-facts.md` brief and `01-plan.md`. Read the repository editorial and separate-author workflow requirements in `AGENTS.md`; used the existing reference types/UI contract. The builder requested the verified sample-rate encoder-support caveat, which the fact investigator then added to the brief. Lesson link labels come directly from `courseCopy.pages` to retain the teaching page's actual title.

The draft is `src/notebook/command-reference.strings.ts`. It contains purpose groups for tool/file placement, duration and image input, streams/encoding, filters, inspection and native-only capture/preparation/batch. Every entry supplies a purpose, an example, meaning and consequential placement/context, plus an existing teaching link. The introduction identifies full commands and fragments and keeps this a lookup appendix outside the chapter sequence.

Self-review against the brief: all 33 taught literal options have `options` inventory values; all ten taught filters and their parameters have lookup coverage. Image2 number patterns, output paths, quotes, stream selectors/graph labels and stdout have explicit coverage. Filter parameters remain distinct from command flags, including `afade` t=out versus -t and scale's negative numeric height. -loop 1 is described as enabling looping rather than a loop count. Native device inputs, placeholders, Linux session variables, even-dimension expressions and shell batch syntax are explicitly separate from browser execution. The shell overview points to the full existing script rather than teaching an additional shell lesson. No archived/newer media options have been added to the taught inventory.

Examples are commands or exact fragments supplied by the verified brief. The draft does not claim capture hardware was tested, or universal playback/encoder/device support. Official source links are drawn from the brief. This prose self-review is not an independent learner or sceptic review; the builder owns integration and required checks.

## Follow-up: runnable command help

The owner requested an actual `ffmpeg -h` cell during implementation. Added its separate heading/introduction/command strings and a `-h` lookup entry, now taught by this appendix. Checked `src/cli/command.ts`: exact `ffmpeg -h` is already a no-output query. Ran installed native FFmpeg 7.1.5 `ffmpeg -h`: exit 0; it prints basic/general command options without a media input or output. The browser runner must supply the real browser-build log; the prose does not substitute native output. Detailed `-h filter=scale` is not claimed here because the inspected query planner did not yet support it.

Defined filtergraph at its first group introduction, replaced unexplained ASS terminology with a direct style-override explanation, and renamed the native group to distinguish native examples from options that can also work in the browser.

## Follow-up: timestamp diagram

The owner also requested a clearer timestamp diagram. A separate fact/model agent supplied the verified model and string schema: the first four measured source picture timestamps, adjacent-interval selection, and calculated clock marks every 128 ticks. Drafted only `src/notebook/visuals/timestamp.strings.ts` from that brief. Copy distinguishes absolute picture timestamps from elapsed intervals, clock marks from additional pictures, one tick from a picture interval, and source measurements from edited output. It does not reveal the separate two-interval practice answer. The fact/model agent owns diagram implementation and checks.

## Independent timestamp practice revision

The sceptic identified that the new diagram exposed the old first-to-third-picture practice result. After the fact investigator verified the sixth source frame directly with native ffprobe and the committed measurement (see `08-timestamp-facts.md`), revised only the timestamp page’s practice, practice observation and five hints to ask for the span from the first picture to the sixth. The always-visible task and observation supply no solved elapsed time or tick count. Hints progressively reveal the five intervals and conversion; only the final hint gives the verified 2560 ticks and approximately 0.208333 seconds. Other lesson prose, commands and inspection-only grading remain unchanged.
