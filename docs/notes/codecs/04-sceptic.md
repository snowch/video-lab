# Independent technical sceptic review: codec appendix

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by a separate sceptic agent against the actual built `http://127.0.0.1:4173/video-lab/#/appendix/codecs`. This reviewer researched the primary fact brief but did not draft or edit the product prose or implementation. No product edits, commits, CLI test suites, builds or encodes were performed in this review.

## Facts, prose and executable evidence

Read the complete built appendix, Chapter 2's changed introduction, the reference-route integration, `01-facts.md`, `codec-sources.md`, `media-provenance.md`, `wasm.md`, `codecs-media.json` and its generation/verification script. The actual built text is saved under `/workspace/scratch/codecs/sceptic/built-text.txt`.

No technical defect found in the learner copy or supplied examples.

| Challenge | Adjudication |
| --- | --- |
| Does the codec comparison promise a universal ranking or browser/player support? | Rejected. Every alternative is conditional on the destination, material/settings and measured result. Compression efficiency is a design aim or possibility; no percentage saving, fixed performance or universal best codec is claimed. VP9 is explicitly distinguished from its WebM container. |
| Does it confuse codecs with encoders, containers or profiles? | Rejected. `libx264` and `aac` are encoder implementations producing H.264/AAC streams; containers organise those streams. The Chapter 2 introduction accurately names the actual supplied streams. AAC-LC is expanded and profile is defined before advising that destinations may accept particular variants. |
| Do lossy/lossless/PCM descriptions overclaim preservation? | Rejected. Compression concepts precede the audio list. Lossless concerns exact input samples, not recovery of previously discarded detail. PCM is distinguished from compression and from the WAV container. The reference explicitly comes from already-lossy AAC and conversion to 16-bit sample values. No original-studio or restored-quality claim appears. |
| Are bitrate, sample rate, channels or sizes conflated? | Rejected. Bitrate is encoded bits/s of playback; sample rate is measurements/s/channel. The labels call 32/128 kb/s encoder targets. Both compressed files retain 48 kHz and two channels, and the displayed byte sizes include container information. No equality between target and measured whole-file rate is claimed. |
| Does the listening passage make an untested audibility claim? | Rejected. It invites comparison at fixed comfortable device volume, says differences may be noticed, and denies a universal ranking from this passage. No particular artifact, loudness difference or listening preference is asserted. |
| Does the recipe promise all these encoders in the browser? | Rejected. The commands are explicitly a native terminal preparation recipe, not notebook cells. They match the recorded arguments with repository prefixes removed. No AV1 command or unsupported browser encoder is offered. Actual pinned WASM AAC capability is documented separately and not substituted for native sample bytes. |

Fresh independent file reads, SHA-256 calculations and native ffprobe inspection matched every recorded sample:

| File | Bytes | Codec/profile | Duration | Rate/channels | Measured audio bitrate | Measured whole-file bitrate |
| --- | ---: | --- | ---: | --- | ---: | ---: |
| reference.wav | 1,536,078 | pcm_s16le, 16 bits/sample | 8 s | 48,000 Hz / 2 | 1,536,000 bit/s | 1,536,078 bit/s |
| aac-32.m4a | 34,623 | AAC LC | 8 s | 48,000 Hz / 2 | 32,235 bit/s | 34,623 bit/s |
| aac-128.m4a | 130,534 | AAC LC | 8 s | 48,000 Hz / 2 | 127,890 bit/s | 130,534 bit/s |

Inspection used `ffprobe -v error -show_entries stream=codec_name,profile,sample_rate,channels,duration,bit_rate,bits_per_sample:format=duration,bit_rate -of json FILE`, separately for all three committed files. The apparent numerical equality between bytes and whole-file bit/s follows from eight-second duration, not interchangeable units. The recorded script pins source/output identities, independently probes the actual stream properties and fully decodes each sample. Its current preparation arguments apply no loudness normalisation, rate override or channel override and independently encode the same PCM reference twice. No new encode was needed to adjudicate these facts.

The source attribution identifies Big Buck Bunny, © 2008 Blender Foundation, the adaptation chain and CC BY 3.0, with links to the film, licence and detailed provenance. External references are labelled as such. The appendix can be read without opening those sources.

## Independent built behaviour

Ran standalone Node Playwright:

```sh
node /workspace/scratch/codecs/sceptic/review.mjs
node /workspace/scratch/codecs/sceptic/offline.mjs
```

Both scripts passed. On direct entry, all three audio elements had native controls, `preload="none"`, no autoplay and a paused state. Reading requested neither the supplied audio files nor processing tools. Each actual file played beyond 0.1 seconds without a media error and reported an eight-second duration. Starting each next player left exactly one player playing. A normal AAC download matched its recorded hash. At 390-pixel phone width, dark theme and doubled text, document width equalled viewport width.

A real `ffprobe -hide_banner bunny-action.mp4` was paused while loading its tools, then the actual lesson link opened the appendix. Global cancellation remained visible. After release, the command completed; Back restored its authored command and raw output naming the actual input, and Forward reopened the reference. The reference remains inside the existing notebook provider. An extra lifecycle observation found that navigating away paused the detached playing element in Chromium; no continuing background playback was observed.

The builder was notified before the explicit offline save to keep the build stable. Saving completed, then a new page opened the appendix with network access disabled. All three actual players advanced, retaining one-player exclusivity. Every offline download matched its committed byte count and SHA-256. This verifies complete supplied assets, not just cached player metadata. The builder was notified when this probe finished.

Scripts, built text, `results.json`, `offline-results.json`, `lifecycle.json` and the phone/dark/doubled-text screenshot are in `/workspace/scratch/codecs/sceptic/`.

## Reader adjudication

Read the completed `03-reader.md`. Its no-finding conclusion and suggested retention are justified. The quoted codec/encoder, lossless, sample-rate, reference-provenance and native-recipe explanations match the independently reviewed facts and actual built text. Its recorded native keyboard/touch controls, seek/pause/volume, downloads, responsive layouts and six optional entry points provide no contrary evidence. The independent probes above additionally cover hashes, active-workspace preservation and cold offline assets, which the reader correctly leaves outside its own claim.

There is no reader finding to retain, reject or rank. The possible technical objections tested above were rejected against source evidence and the real page. **No unresolved technical or learner finding remains in this focused review.** Final built checking and the full quality gate remain separate records.

## Limits

This review tested actual playback/decoding and controls in headless Chromium, not subjective audibility or universal device compatibility. The separate reader and builder cover their own viewport/browser matrices. No HEVC, VP9, AV1, Opus, MP3 or FLAC encode/playback capability is inferred from this appendix or from an encoder name being listed. The full quality gate and final independent checker are separate validation records.
