# Fresh learner review: optional codec appendix

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by a separate reader agent which did not author or edit the product. First read the actual built `http://127.0.0.1:4173/video-lab/#/appendix/codecs`, revised Chapter 2 paragraph and contextual entry points before reading `01-facts.md` or `02-copy.md`. All initial page text is preserved in `/workspace/scratch/codecs/reader/*-first-read.txt`.

## Findings

No actionable learner finding. Severity: none. Suggested direction: retain the current explanations, local limitations and optional placement.

All appendix copy, player captions, measurements, recipe, continuation/source links and the revised Chapter 2 introduction were read. Specific observations:

| Quoted built evidence | Learner assessment |
| --- | --- |
| “A codec defines how their pictures or sound are represented. An encoder produces that representation: libx264 writes H.264 video…” | Concrete codec/encoder distinction. Chapter 2 first explains streams, then uses the supplied MP4/H.264/AAC combination to introduce the codec role. |
| “Choose codecs your destination can play, then compare the result and file size.” | A usable decision sequence. H.264/HEVC/VP9/AV1 entries give practical contexts without a universal ranking; AAC/Opus/MP3/FLAC/PCM cover delivery, preservation and reference needs. |
| “Lossless compression reconstructs its input samples exactly, but cannot recover detail lost before those samples reached it.” | Distinguishes lossless preservation from restoration of earlier losses. PCM and the WAV container are explicitly separate. The AAC-LC profile is defined when introduced. |
| “Sample rate counts sound measurements per second in each channel. It is separate from encoded bitrate and playback speed…” | Explains the separate counts, then anchors the distinction in the unchanged 48,000 Hz/two-channel examples. Higher bitrate is not promised to yield better sound across different codecs/settings. |
| “The WAV reference comes from decoding the source's already-lossy AAC to 16-bit PCM… it is not the original studio recording.” | Comparison provenance is visible before playback. The two AAC outputs share that reference; the copy asks for matching moments/fixed comfortable volume and avoids prescribing what must be audible or a universal quality ranking. |
| “Download bunny-short.mp4 from a lesson's Files into a new working folder”; “native preparation recipe, not browser notebook cells.” | Source acquisition, installed-tool context, working folder and separate command execution are clear. Following notes explain omitted video, PCM encoding, AAC targets and the difference between those targets and whole-file size. |

The appendix is visibly “Optional reference”, and its entry links say “(optional)”. It adds no numbered chapter or graded task. Reading builds on stream/container concepts already introduced in Chapter 2; it does not require choosing a different codec to continue the course. Relevant further reading has descriptive labels, with the external nature stated by the source-section heading.

## Built interaction and layout checks

Standalone Node Playwright checked desktop 1440 × 1000 and phone 390 × 844, actual `html[data-theme]` light/dark and root text 16/32 px (200%): eight combinations. Document width equalled viewport width. Player panels, metadata, source/download labels and wrapped native commands remained readable. Saved screenshots include the introduction, reference player and recipe across the matrix, plus revised Chapter 2 at phone dark 200%.

All three native audio players actually played in both viewports: desktop Space and phone taps on their native play controls advanced playback time. Each reported eight seconds; starting a player paused the other two. Keyboard pause, seek through the native controls and volume adjustment also worked. All three download links were activated in both viewports; saved filenames and actual byte counts matched the displayed records (1,536,078 / 34,623 / 130,534 bytes). This establishes playback/control behaviour, not a subjective judgement of audible differences: no listening-quality claim is made by this review.

Players began paused at zero with `preload="none"`; a fresh read fetched neither audio nor WASM/tools. Playback and downloads also fetched no processing tools. Theme controls worked. Course-overview navigation, the index optional link and browser Back/Forward worked. Actual touch navigation passed from all six contextual entries: Chapter 2, quality setting, encoder effort, export format, glossary and course index. The three “Continue with the course” links opened their stated lessons and returned through Back.

## Evidence and limits

Artifacts: `/workspace/scratch/codecs/reader/`. `matrix.json`, `controls.json`, `links.json`, `reading-requests-*.json`, initial page-text reads, PNGs and downloaded audio preserve the results. Successful focused commands: `node` runs of `read.mjs`, `review.mjs` and `links.mjs`. `native-controls.mjs` and `seek.mjs` were supporting probes of the browser's native keyboard controls.

No product edits, commits, builds or Playwright CLI/full-suite runs by this reader. Native preparation recipes were read; media generation/native verification, active-workspace preservation and cold-offline certification are covered by the builder/sceptic/checker workflow rather than claimed here.
