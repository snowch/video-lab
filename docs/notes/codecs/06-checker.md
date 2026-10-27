# Independent built-page checker: codec appendix

Copyright © 2026 Christopher Snow.

Checked 27 October 2026 by a separate checker agent which did not author or edit the product. Read the complete actual built `http://127.0.0.1:4173/video-lab/#/appendix/codecs` before the slice's notes. Applied the repository `AGENTS.md`; then read `01-facts.md` through `05-resolution.md`, including the sceptic's completed reader adjudication, the recorded sample metadata/provenance and the source diff. Initial built text is preserved as `first-look.txt` in the checker artifacts.

**Pass. No unresolved finding or requested product fix.**

## Copy and integration

Read all appendix prose, nine codec/PCM choices, three captions/measurements, native recipe, continuation links and source labels. The copy makes the practical choice conditional on destination support, material, encoder/settings and comparison of the result. It separates codec, encoder and container; lossy encoding, lossless preservation and uncompressed PCM; and bitrate, sample rate and playback speed. AAC-LC/profile is explained locally. No universal efficiency, support or listening-quality ranking is promised.

The listening qualifications are present before playback: the WAV comes from already-lossy source AAC converted to 16-bit PCM, both AAC outputs use that reference, and the passage is not an original studio recording or universal benchmark. Fixed comfortable device volume and matching moments are requested. The 32/128 kb/s labels explicitly identify encoder targets; sample rate/channels remain unchanged and recorded file sizes include container information.

The three displayed commands exactly match the recorded native preparation arguments with repository prefixes removed. The page explains source download, installed native FFmpeg, a new working folder, separate commands, `-vn`, `pcm_s16le`, `aac` and the two bitrate targets. It clearly distinguishes this recipe from browser notebook cells. The appendix has no executable cell or forced progression. Source credit, provenance and descriptive external references remain visible.

The revised Chapter 2 paragraph renders exactly, after the stream explanation: supplied MP4 contains H.264/AAC, a codec defines the stream representation, players need container and codec support, and the filename suffix alone is insufficient. Its phone/dark/doubled-text view is readable. Chapter 9 retains its actual H.264/libx264, yuv420p and AAC command plus the distinct encoder/muxer explanation.

Independently followed all six optional entry links by phone touch: index, glossary, Chapter 2, quality setting, encoder effort and export format. Each opened the appendix; Back/Forward restored the intended routes. All three course-continuation links opened their stated lessons, and Course overview returned to the index.

The reader's no-finding conclusion and the sceptic's final adjudication agree with this independently observed built result. Their factual distinctions, optional placement and qualifications are justified. No dissent, ranked fix or post-review product correction remains.

## Playback, downloads and layout

- Desktop 1440 × 1000 and touch-enabled phone 320 × 844, actual light/dark themes, computed root text 16/32 px: all eight combinations had document width equal to viewport width. Inspected saved introduction, reference-player and native-recipe screenshots across devices/themes, including doubled-text wrapping. Captions, filenames, metadata, controls and commands remain readable within the page.
- All three players start paused at zero, with native controls, `preload="none"` and no autoplay. A fresh reading makes no audio or processing-tool request. Playback and downloads also make no processing-tool request.
- Started each actual player with native Space on desktop and taps on the native play button at phone 200% text. Each advanced playback time, reported eight seconds and had no media error. Starting each next player paused the other two. Native keyboard pause, seek and volume adjustment also worked.
- Activated every audio download on both devices. All six downloads had the expected filenames and exact recorded byte counts and SHA-256 hashes: reference.wav 1,536,078 bytes, aac-32.m4a 34,623 bytes, aac-128.m4a 130,534 bytes. Displayed measurements agree with the record.

These checks establish playback, controls and file identity. They make no subjective audibility judgement and infer no playback/encoding capability for the other listed codec alternatives.

## Offline and workspace

Prioritised the explicit offline probe against the frozen build. App status → Download for offline use completed without HTTP errors. With networking disabled, a new page opened the appendix, all three actual audio files played with advancing time/eight-second duration, and the inspection continuation opened with its practice source ready. Closed the browser and told the builder the probe had finished before permitting its full gate to replace built assets.

Separately imported a learner text file beside the inspection sources and authored `ffprobe -hide_banner bunny-action.mp4`. Held tool loading while that real command was active, then opened the appendix through its lesson link. Global Working/Cancel and Files remained available. Releasing the command let it finish; Back restored the authored command and actual raw output. Both source files and the imported file's exact text remained intact.

## Evidence and limits

Successful standalone Node Playwright commands:

```sh
node /workspace/scratch/codecs/checker/offline.mjs
node /workspace/scratch/codecs/checker/ui.mjs
node /workspace/scratch/codecs/checker/integration.mjs
```

Artifacts are under `/workspace/scratch/codecs/checker/`: scripts, initial and final built text, Chapter 2/9 text, `matrix.json`, `controls.json`, `links.json`, `workspace.json`, `offline.json`, request logs, exact downloaded audio, actual ffprobe output and screenshots. The initial integration harness read the imported text immediately, before the existing asynchronous file-preview read completed. Waiting for that read resolved the harness race; the complete integration probe then passed without product changes.

No infrastructure disconnect affected these checks. This checker made no product edit, commit, build, encode, native sample regeneration or Playwright CLI/full-suite run. The existing sample record and download identities were checked; native media verification and the full quality gate are the builder's separate evidence.
