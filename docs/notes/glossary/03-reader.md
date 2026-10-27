# Fresh learner review: glossary

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by a separate reader agent which did not author or edit the product. Read the actual built `http://127.0.0.1:4173/video-lab/#/glossary` and all 32 definitions/examples before reading `01-facts.md` and `02-copy.md`. Initial read is preserved in `/workspace/scratch/glossary/reader/first-read.txt`.

## Finding

**R1 — Minor: indirect further-reading destination for audio sample rate.** The glossary introduction offers to “open the lesson that explains it in use”. Audio sample rate links to “Learn more: Read the file description” (`inside-video/inspect`). That page identifies the rate in ffprobe output, then says “48000 Hz gives the audio sample rate; Frames and time explains this separately from picture rate.” The built `frames-time/rate` page directly explains “sound measurements per second, for each channel” and distinguishes them from pictures. Suggested direction: point this entry directly to that existing explanation. This is a navigation usefulness finding; the glossary definition and numeric example are understandable and accurate. Evidence: `linked-inside-video-inspect.txt` and `linked-frames-time-rate.txt` in the reader artifact directory. Separate sceptic adjudication requested.

No other actionable reader finding.

## Definitions and prerequisites

All 32 terms and their examples were read, including the likely confusing pairs:

- Container, Stream, Audio channel, Codec, Demuxer, Muxer, Encoding, Decoding, Stream copy, Metadata and Brand. The stereo example separates channels from streams. “Demuxing does not itself decode the data or require separate output files” and “does not itself encode pictures or sound” keep reading/writing containers distinct from codecs. Brand declarations retain their conformance limit.
- Pixel, Frame, Dimensions, Pixel format, Scaling, Cropping, Padding and Filter. The entries distinguish stored grids, decoded storage and editing operations. “Cropping changes the field of view without resizing the retained objects in pixels” is concrete; scaling and padding have distinct consequences.
- Duration, Frame rate, Audio sample rate, Timestamp, Presentation timestamp, Time base and Keyframe. The source-second 2-to-5 example makes duration versus end position clear. “A tick is a clock unit and need not equal one video frame interval” prevents a likely timing confusion. Average frame rate is not presented as proof of equal spacing.
- Bitrate, Lossy compression, Constant rate factor (CRF), Preset, Amplitude and Subtitle. Higher bitrate is not equated with quality, CRF with fixed size, preset with playback speed, or half amplitude with half perceived loudness. The subtitle example identifies both cue timing and the burned-in consequence.

Specialised terms used within definitions can be found on the same alphabetical page; the examples make their practical purpose visible. No additional quiz, hidden definition panel or automatic term popover interrupts reading.

## Built behaviour and layout

Standalone Node Playwright checked desktop 1440 × 1000 and phone 390 × 844, actual `html[data-theme]` light/dark, and root text 16/32 px (200%): eight combinations. All 32 entries remained in alphabetical order with one lesson link each; document width equalled viewport width. Readable first-viewport, long timestamp-entry and no-results screenshots are saved. Large phone text reflows vertically, including the longer term heading and numeric example.

The overview's main Glossary link and the app footer link both opened the page, including by phone tap. Sample lesson links for Audio channel, Time base and Pixel format opened their stated lessons; browser Back returned to the glossary. The page's Course overview link returned to the course index. Search has the visible accessible label “Find a term”. Name/alias searches for fps, CRF, Hz, multiplexing, PTS, resolution and demuxing found the relevant entries, including case/outer-space handling. No-results text explains the next action. Keyboard Tab reaches Clear search; Enter clears and returns focus to the input. Phone touch clear also restores all 32 entries.

A later focused pass on the rebuilt final aliases confirmed `isom` → Brand, plus mp41, major brand, compatible brands, sample_rate, kbps and avg_frame_rate. `isom-phone-dark-200.png` records the requested lookup at large phone text. This final pass followed the eight-context layout pass; definitions/UI were unchanged by the alias addition.

A cold glossary read requested no practice media or processing tools. In a separate real-workspace check, started `ffprobe -hide_banner bunny-action.mp4`, left while its status was “Working”, used glossary search and Files, then returned through browser Back. The command completed, its raw log named bunny-action.mp4, the authored command remained intact, and both source files were still available. No encode was repeated.

## Evidence and limits

Artifacts: `/workspace/scratch/glossary/reader/`. `matrix.json`, `interactions.json`, `reading-requests.json`, `final-aliases.json`, `workspace.json`, `active-command.log`, page-text reads and PNGs record the observations. Commands completed successfully: standalone `node` runs of `read.mjs`, `review.mjs`, `workspace.mjs`, `aliases.mjs` and `linked-context.mjs` in that directory. This is the focused glossary reader review, not the full quality gate or a cold-offline certification. No product source edits, commits or Playwright CLI/full-suite invocation by this reader.
