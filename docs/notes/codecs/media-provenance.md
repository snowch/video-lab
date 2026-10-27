# Codec listening comparison provenance

Copyright © 2026 Christopher Snow.

The eight-second source is the existing `public/media/notebook/bunny-short.mp4`: an extract of **Big Buck Bunny**, © 2008 Blender Foundation, [peach.blender.org](https://peach.blender.org/), [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/). The original film source and the course's excerpt preparation are recorded in [the notebook media record](../notebook/media.json). The recording is supplied practice media, not learner work.

The appendix's files are additional adaptations of that existing extract. Native FFmpeg decodes its AAC audio to stereo 48 kHz signed 16-bit PCM WAV, then independently encodes that WAV twice using the native AAC encoder at requested 32 and 128 kbit/s. The source's earlier lossy compression remains in the reference; conversion to PCM does not restore discarded detail. No loudness normalisation, sample-rate change or channel-count change is applied. Each supplied file lasts eight seconds. These are examples of additional compression on this passage, not a benchmark of codecs or a promise of audible differences on every device.

Exact commands, FFmpeg/ffprobe versions, source and output SHA-256 hashes, sizes, durations and stream properties are in [codecs-media.json](../../../src/notebook/codecs-media.json). Regenerate with `node scripts/codec-media.mjs --generate`. Verify with `node scripts/codec-media.mjs`, also part of `npm run check`; this checks hashes, actual stream metadata and complete decoding. Regenerating with a different FFmpeg version may produce different bytes and requires refreshing and reviewing the record.

The displayed preparation recipe uses the same arguments with repository directory prefixes removed, for a native terminal whose working folder contains `bunny-short.mp4`. It produces `reference.wav`, `aac-32.m4a` and `aac-128.m4a`. The appendix players use the committed files. The separate [WASM capability probe](wasm.md) verifies AAC encoding in the pinned browser runtime; its bytes are not substituted for the native supplied recordings.
