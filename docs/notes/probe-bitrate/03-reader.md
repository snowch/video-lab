# Fresh learner review: supplied ffprobe guide

Reviewed the built page at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect` on 27 October 2026, before reading the author's fact brief, draft or rationale. This reviewer did not author the change or make fixes.

## Scope and method

This is a scoped learner review of the revised Input explanation and new Duration/bitrate row, with their surrounding guide and inspection controls. It is not a fresh audit of the entire course or shared workbench. I used standalone Node scripts with the repository's `playwright` package, without the Playwright CLI, a build or the full quality gate.

- Desktop: 1440 × 1000, light and dark.
- Phone: 390 × 844, light and dark.
- Read the rendered guide and inspected screenshots in all four combinations.
- Loaded the practice files and ran the actual first `ffprobe bunny-short.mp4` cell on desktop light and phone dark. Both returned an eight-second duration and `bitrate: 352 kb/s`, with 280 kb/s on the video stream and 64 kb/s on the audio stream.
- Used the theme control, phone output-wrapping checkbox and first command-builder control. The builder exposed the source selector; wrapping retained the complete raw output.
- Measured document and guide widths in all four combinations. The document was 1440/1440 or 390/390 client/scroll pixels; the guide was 567/567 or 358/358. There was no horizontal page or guide overflow. Guide prose rendered at 16 px with 26.4 px line height.

## Findings

No actionable finding in this slice. Severity: none. No fix direction is requested.

The following quoted wording resolves the likely learner ambiguities:

| Question | Built wording and assessment |
| --- | --- |
| Are the comma-separated formats streams or several containers inside this file? | “FFprobe uses one reader for MP4 and related formats, including MOV and 3GP, and prints that reader’s format names here.” This explains the list without requiring the term *demuxer*. “This file is an MP4” and the separate Stream lines make the distinction concrete. |
| What does 352 kb/s mean? | “`kb/s` means kilobits per second: `352 kb/s` is about 352,000 bits per second of playback, or 44,000 bytes per second (eight bits make one byte).” The units, decimal magnitude and bit/byte conversion are explicit. “About” avoids treating the displayed rounded rate as exact. |
| Is that the video rate or the whole file? | “The whole-file bitrate includes video, sound and container information” and “A bitrate on a `Stream` line describes only that stream.” These statements let a learner distinguish 352 from the actual output's 280 and 64 without requiring an unexplained sum. |
| Does the rate mean faster playback? | “This is an average across the file, so individual seconds can contain different amounts of data” and “Bitrate does not measure playback speed.” The average and playback-speed distinction are adjacent to the value. |
| What does the Duration value mean? | “`Duration` is eight seconds” interprets `00:00:08.00` directly beside the example. |
| Is the supplied guide a live result for my command? | “This guide always describes the supplied source. Your command produces its own raw output.” This remains visible before the selected fields. |

The two bitrate paragraphs add useful explanations rather than repeated instructions. On phone, the Duration example wraps the unit onto a second line but remains legible; the prose immediately repeats the value with its unit. Light and dark screenshots show clear text and code contrast. No shortening or new term definition is warranted for this small change.

## Assumptions and limits

The learner is the technically experienced engineer described in `AGENTS.md`. Ordinary decimal numbers and seconds are reasonable prerequisites. The page already explains stream, container, codec, frame and pixels before this guide; the change explains kilobits, bytes and the average where they become necessary. I did not assume prior knowledge of bitrate, demuxers or binary-prefix conventions.

This review observes the actual browser output but does not independently establish the native fixture's provenance or exact unrounded bitrate. That is for the fact brief and sceptic/source check. Copy/download actions, later exercise grading, navigation, app status and offline behaviour were outside this explanatory slice. This record is an independent reader observation, not final checker certification or a claim that the full quality gate passed.

## Evidence

Artifacts are under `/workspace/scratch/probe-bitrate/reader/`:

- `desktop-light-guide.png`, `desktop-dark-guide.png`, `phone-light-guide.png`, `phone-dark-guide.png`: the reviewed guide.
- `desktop-initial.png`, `desktop-light-run.png`, `phone-dark-run-guide.png`: page and actual-run context.
- `after-run.txt`, `phone-controls.txt`: rendered output and control context.
- `layout.json`: the four viewport/theme measurements and rendered guide text.

No implementation files were changed by this reviewer.
