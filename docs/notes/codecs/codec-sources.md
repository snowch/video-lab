# Codec appendix: verified source brief

Copyright © 2026 Christopher Snow.

Research checked 27 October 2026 by the technical reviewer, before the separate prose draft. Read the repository's `AGENTS.md`. This is a fact brief, not learner-facing prose or an implementation. Research artifacts are under `/workspace/scratch/codecs/`.

## Primary sources

| Source | Claims supported |
| --- | --- |
| [ITU-T H.264](https://www.itu.int/rec/T-REC-H.264/en) | H.264 is Advanced Video Coding, also called AVC. The official FFmpeg encoder documentation identifies it as H.264/MPEG-4 AVC. |
| [ITU-T H.265 summary](https://www.itu.int/itu-t/recommendations/rec.aspx?rec=H.265) and [recommendation index](https://www.itu.int/rec/T-REC-H.265/en) | H.265 is HEVC, High Efficiency Video Coding. ITU describes its development in response to demand for greater compression, evolving earlier standards including H.264. This establishes a design aim, not a guaranteed saving on a particular file. |
| [WebM Project VP9](https://www.webmproject.org/vp9/) | VP9 is the WebM Project's open video codec; libvpx supplies an implementation. The page links separate codec and MP4-binding specifications, supporting the distinction between a codec and its container. Its dated product-support list is not a current compatibility matrix. |
| [AOMedia AV1](https://aomedia.org/specifications/av1/) and [AV1 bitstream/decoding specification](https://aomediacodec.github.io/av1-spec/) | AV1 is AOMedia Video 1, an open codec designed for efficient video compression. The specification defines bitstream formats and decoding, rather than one mandatory encoder or preset. The overview's general efficiency claims do not establish a universal numerical ranking. |
| [FFmpeg encoder documentation source](https://github.com/FFmpeg/FFmpeg/blob/master/doc/encoders.texi), corresponding [manual](https://ffmpeg.org/ffmpeg-codecs.html) | Distinct implementations for H.264, HEVC, AV1, VP9, AAC, Opus, MP3 and FLAC; encoder options and build-time dependencies. Native AAC defaults to the AAC-LC profile. AAC uses quantisation/perceptual coding. Encoder wrappers are conditional on how FFmpeg was built. |
| [FFmpeg detailed description](https://ffmpeg.org/ffmpeg.html#Detailed-description) | Demuxing, decoding, filtering, encoding and muxing are distinct operations; stream copy omits decoding/re-encoding. A codec and an encoder implementation are not interchangeable names. |
| [Fraunhofer AAC-family implementation note](https://www.iis.fraunhofer.de/en/ff/amm/impl.html) and [AAC-family DASH technical bulletin](https://www.iis.fraunhofer.de/content/dam/iis/de/doc/ame/wp/FraunhoferIIS_Application-Bulletin_DASH_AAC.pdf) | AAC is a family with different profiles/tools, including AAC-LC and HE-AAC variants. Do not imply that every device supporting one profile supports every member. |
| [Opus RFC 6716](https://www.rfc-editor.org/rfc/rfc6716.html) and [Opus project overview](https://opus-codec.org/) | Opus handles speech and general audio/music, with interactive/low-delay applications as a design focus, also storage/streaming. Its bit allocation and quantisation are lossy, not bit-exact sample preservation. No claim that it is always superior for every signal or player follows. |
| [Fraunhofer MP3](https://www.iis.fraunhofer.de/en/ff/amm/consumer-electronics/mp3.html), [RFC 3551 §4.5.13](https://www.rfc-editor.org/rfc/rfc3551.html#section-4.5.13), FFmpeg `libmp3lame` documentation | MP3 is the established MPEG audio Layer III format, with continuing legacy use. RFC 3551 identifies MPEG audio layers and their sample-rate/channel signalling. Fraunhofer distinguishes MP3 from newer AAC-family technology; its comparisons are not independent measurements for this course. |
| [FLAC RFC 9639](https://www.rfc-editor.org/rfc/rfc9639.html) and [Xiph FLAC overview](https://xiph.org/flac/) | FLAC compresses digital audio losslessly. Decoding lossless compression returns the original input data; lossy coding approximates or irreversibly changes it. The guarantee concerns the samples supplied to the encoder. |
| [Microsoft WAVEFORMATEX](https://learn.microsoft.com/en-us/previous-versions/dd757713(v=vs.85)) | Separates channel count, samples per second, bits per sample and average bytes per second. For ordinary integer PCM, block alignment is channels × bits/sample ÷ 8; bytes/s is sample rate × block alignment. |

The FFmpeg codecs HTML endpoint returned 503 during this research; the successfully fetched official FFmpeg documentation source is the basis for its encoder facts. A previously verified same-day FFmpeg detailed-description capture is saved as `ffmpeg-overview-verified.html`. The initial guessed Fraunhofer AAC URL returned 404; use the working implementation page and technical bulletin above. The AV1 overview moved to `/specifications/av1/`; use that destination. Do not treat failed-response artifacts or the older WebM FAQ's dated codec/browser list as current compatibility evidence.

## Video comparison facts for the drafter

| Codec | Identity and practical distinction | Defensible decision context |
| --- | --- | --- |
| H.264 / AVC | A video coding standard, implemented by software such as x264 and by other software/hardware encoders. It is the actual codec of the supplied practice source and the existing course's MP4 export. | Retain the course's established export when it meets the destination's requirements. A successful H.264 file here is evidence for that file/browser, not every profile, bit depth or player. |
| H.265 / HEVC | A later ITU/ISO standard developed for greater compression efficiency. `libx265` is an encoder implementation, not another container or a synonym for all HEVC encoders. | Consider when the actual destination accepts HEVC and a measured result justifies the change. Assess encoding effort and target decoding support; do not promise “half the size”. |
| VP9 | WebM Project video codec, available through libvpx. WebM is a container; VP9 is a video codec. Codec and container specifications are separate. | A relevant alternative for a workflow or service requesting VP9/WebM. Check the actual required container, video profile and audio combination. Do not infer current browser coverage from the old support announcements on its project page. |
| AV1 | AOMedia video codec with a compression-efficiency design focus. AV1 has multiple encoder implementations, including libaom, SVT-AV1 and rav1e. | A candidate when the delivery system and target devices support the chosen AV1 output. Measure quality/size and encoding cost rather than promising a fixed improvement or labelling it universally best. |

General technical limits:

- These codecs are commonly used in lossy delivery modes; do not claim that every encoding mode of every video codec is inherently lossy. For example, the official x264 wrapper documentation includes a lossless mode.
- Codec specifications describe encoded representations/decoding, not one fixed compression result or processing speed. Output depends on content, implementation, settings, dimensions, frame rate and audio as well as the codec.
- Newer does not guarantee smaller or better output on every source. Any numerical savings, speed or quality ranking would need a controlled executed comparison; none was performed for this brief.
- A CRF number is an encoder-specific control. Equal numbers across codecs or implementations do not establish equal visual quality. Do not carry the course's libx264 CRF examples across this table as equivalent targets.

## Audio comparison facts for the drafter

| Format/codec | Compression class in this appendix | Defensible practical distinction |
| --- | --- | --- |
| AAC | Ordinary AAC-LC is lossy; this is the profile used by the course source/default AAC encoder. | Current MP4 delivery example. AAC has several profiles; compatibility must cover the particular one. Do not collapse AAC-LC, HE-AAC and xHE-AAC into identical requirements. |
| Opus | Lossy. | Designed for speech and music, including interactive communication and streaming/storage. Suitable to consider when the target delivery format accepts it. Avoid claiming that Opus is speech-only or universally compatible. |
| MP3 | Ordinary MPEG audio Layer III is lossy. | Useful when a destination or existing audio workflow specifically needs MP3. Its age or popularity does not prove a smaller file or better sound than AAC/Opus at a given setting. |
| FLAC | Losslessly compressed audio. | Preserve the input PCM sample values using compression; the amount saved depends on the signal. Saving decoded AAC/MP3/Opus as FLAC preserves that decoded signal; it does not recover information discarded by the earlier lossy encoding. |
| PCM | Uncompressed sample representation in the ordinary linear PCM sense used here; not lossless compression. | Useful for sample-based editing/interchange where supported. Storage depends directly on sample rate, sample representation/bit depth and channel count. WAV is a container and can hold PCM or other formats; WAV does not uniquely mean PCM. |

Scope the lossy/lossless distinction to the representation at that step. Resampling, changing sample precision, filtering or an earlier lossy generation may already have changed samples before FLAC/PCM writing. “Lossless” does not mean a guarantee of better perceived sound than every lossy file, nor does uncompressed PCM repair a poor source.

## Bitrate, sample rate and compatibility

- **Audio sample rate:** samples per second in each channel, measured in Hz. The verified source has 48000 Hz stereo audio.
- **Encoded audio bitrate:** encoded bits per second of playback, generally covering the stream rather than the whole media file. It is not the sample rate. Audio files can have the same sample rate but different compressed bitrates/quality. The source's recorded AAC audio is about 64 kb/s while still being 48000 Hz stereo; the whole MP4 is about 352 kb/s including video and container information. These are already verified source figures, not new codec-comparison results.
- **Optional explanatory PCM calculation, not a measured course asset:** 48,000 samples/s/channel × 2 channels × 16 bits/sample = 1,536,000 bits/s (192,000 bytes/s), excluding container overhead, for packed 16-bit integer PCM. Do not present this as the supplied AAC's bitrate or claim the formula applies to compressed audio. Microsoft documents the underlying field relationships.
- **Selection:** distinguish encoder availability in this FFmpeg build, decoder/player support, and accepted container/codec combinations. None implies the other two. The appendix must not imply that every codec in the reference can be encoded by the pinned browser workbench.
- **Playback compatibility:** verify the actual destination and exact output, including container, codec/profile, pixel/sample representation, dimensions/rates and channels. A filename alone does not identify its streams. Avoid a fixed “works in all browsers/devices” matrix or unsupported legal/licensing guarantees.
- **Course links:** existing inspection, export, quality/preset and sound lessons already develop these distinctions. Preserve those verified explanations; no new unverified commands, sample encodes, benchmark numbers or automatic processing are established by this research.

## Handoff limits

No new codec encodes, browser codec-availability probes or performance measurements were run. Existing source figures refer to the reviewed native fixture/provenance and source-media verification. Source terms above support a concise practical appendix; they do not establish codec league tables, universal compatibility, licensing advice or availability of particular encoders in this app. Separate prose, built reader/sceptic/checker review and the mandatory full quality gate remain necessary before publication.
