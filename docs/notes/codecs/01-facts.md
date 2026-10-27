# Optional codec choices appendix

Copyright © 2026 Christopher Snow.

The owner approved a clearer Chapter 2 introduction plus an optional appendix comparing common video/audio codecs and explaining audio compression, then requested implementation and merge. This extends scope without adding a numbered chapter. Keep the main course's H.264/AAC examples and existing definitions. Add contextual links from Chapter 2, Compression choices, Export and the glossary, plus the course index.

## Learning objective and scope

A reader who has learned container, stream and codec can choose a plausible delivery combination, distinguish codec from encoder, explain lossy/lossless audio and the independent roles of bitrate/sample rate, then compare actual short audio outputs. Avoid an exhaustive standards catalogue, universal codec rankings, or a compatibility promise for every device. No new grading or forced progression. Reference reading and supplied playback must not load WASM automatically.

Video entries: H.264/AVC, H.265/HEVC, VP9, AV1. Audio entries: AAC, Opus, MP3, FLAC and uncompressed PCM. Explain common practical uses, tradeoffs and destination support; use the independently researched primary-source brief `codec-sources.md`. Explain an encoder is an implementation producing a codec format (libx264 → H.264; aac → AAC). Changing container suffix is not proof of codec conversion. More efficient compression can reduce data for a comparable result but depends on content, settings and implementation; encoding/decoding effort and device support matter.

Audio lossy compression models which sound information can be represented less precisely or omitted; enough reduction can introduce audible artifacts. Lossless reconstructs the exact input samples, not an earlier recording already damaged by lossy encoding. PCM stores sample values without compression. Higher bitrate at the same duration generally costs more space but does not guarantee better sound across codecs/settings or restore discarded detail. Sample rate counts measurements/s/channel, not encoded bits/s or playback speed.

## Executable listening evidence

`scripts/codec-media.mjs --generate` prepared three real files from the same eight-second Big Buck Bunny source (existing source provenance and CC BY 3.0 licence). `node scripts/codec-media.mjs` checks source/file hashes, actual ffprobe properties and full native decoding. Exact commands, installed FFmpeg/ffprobe versions and values are in `src/notebook/codecs-media.json`.

- reference.wav: decode source AAC to 16-bit PCM WAV, stereo 48000 Hz, 8 s, 1,536,078 B. This reference already contains the source AAC's losses and the conversion to 16-bit sample values. It is not an uncompressed original studio recording.
- aac-32.m4a: encode reference.wav using `-c:a aac -b:a 32k`, stereo 48000 Hz, 8 s, 34,623 B.
- aac-128.m4a: encode the same reference.wav using `-c:a aac -b:a 128k`, stereo 48000 Hz, 8 s, 130,534 B.

Bitrates 32/128 kb/s are requested encoder targets, not measured whole-file rates. File sizes include container overhead. No loudness normalisation, rate or channel change between versions; encourage constant comfortable device volume and play one at a time. Do not claim a particular artifact is necessarily audible, label the tiny sample a universal codec benchmark, or equate a player's decoded duration rounding with new content. Preload none, no autoplay; app pauses other appendix players when one starts. Native controls and download fallback. Sources/provenance link visible, examples clearly supplied. Assets are included in one offline save. Metadata displayed from recorded facts, not copied constants.

## Integration and verification

Route `#/appendix/codecs` is inside the notebook workspace, preserving drafts/files/active commands and global cancel/restart protection, analogous to glossary. It has course-overview navigation, headings, concise prose entries and contextual lesson links. New strings in separate prose module. No chapter-number route or extra collapsed sections. Plain wrapping layout, no wide comparison table requiring phone scrolling. Codec choices link in glossary and relevant lessons.

Native preparation commands may be shown as a labelled reproducibility recipe, not browser cells. If any commands are described as browser-runnable, their capability must be verified in actual pinned WASM first (`wasm.md`). No unsupported encoder is promised. Built tests cover routes/links/history, phone/desktop light/dark and 200% reflow, actual player metadata/playback/exclusivity/download, no WASM on reading, offline assets/cold page and retained workspace. Native file checks join `npm run check`. Separate prose → built learner → sceptic → ranked fixes → independent checker → full gate → merge.
