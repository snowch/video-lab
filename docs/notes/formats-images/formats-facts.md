# Media formats appendix — verified fact brief

Copyright © 2026 Christopher Snow.

Research date: 28 October 2026. This is evidence for a separate drafting agent,
not learner-facing prose. Scope: optional formats reference, not a new numbered
chapter, codec comparison, or expansion of browser processing support.

## Sources inspected

All links below were fetched successfully during this pass. HTML, text extracts
and relevant FFmpeg source are in the uncommitted scratch directory
`/workspace/scratch/formats-images/formats-facts/`. The Apple QuickTime pages
returned a JavaScript documentation shell, so substantive MOV claims below use
FFmpeg's documentation instead. External pages are references, not dependencies
for reading the appendix offline.

| ID | Source | Evidence used |
| --- | --- | --- |
| F1 | [FFmpeg: detailed description](https://ffmpeg.org/ffmpeg.html#Detailed-description) | Demuxers, streams, codecs, muxers, stream copy and transcoding. |
| F2 | [FFmpeg: format documentation](https://ffmpeg.org/ffmpeg-formats.html) | MOV/MP4 family; MP3 raw stream and tags; AAC/ADTS; image2 sequence and input frame rate. |
| F3 | [MDN: media container formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers) | Extensions, container/codec distinction, MP3 exception, M4A, WAV, compatibility conditions. Browser matrices are contextual, not eternal guarantees. |
| F4 | [Matroska: technical introduction](https://www.matroska.org/technical/basics.html) | Container rather than codec; multiple selectable video/audio/subtitle streams and chapters. |
| F5 | [WebM Project: container guidelines](https://www.webmproject.org/docs/container/) | Restricted Matroska subset; VP8/VP9 with Vorbis/Opus. This older document does not discuss AV1. |
| F6 | [FFmpeg: WebM muxer implementation](https://github.com/FFmpeg/FFmpeg/blob/master/libavformat/matroskaenc.c) | Current implementation's explicit restriction: VP8/VP9/AV1 video, Vorbis/Opus audio, WebVTT subtitles. This is upstream evidence, not a test of the app's pinned build. |
| F7 | [Microsoft: AVI RIFF file reference](https://learn.microsoft.com/en-us/windows/win32/directshow/avi-riff-file-reference) | AVI structure, multiple data streams, video-only or video/audio files; separate OpenDML extensions. |
| F8 | [RFC 3533: Ogg encapsulation](https://www.rfc-editor.org/rfc/rfc3533) | Ogg is an encapsulation format; Ogg Vorbis is a codec mapping, not an alternative name for all Ogg. |
| F9 | [RFC 7845: Ogg Opus](https://www.rfc-editor.org/rfc/rfc7845) | Opus in Ogg; section 9 recommends `.opus` for the specified Ogg Opus files. |
| F10 | [RFC 9639: FLAC](https://www.rfc-editor.org/rfc/rfc9639) | Lossless audio compression and native FLAC format. |
| F11 | [FFmpeg: MOV/MP4 muxer implementation](https://github.com/FFmpeg/FFmpeg/blob/master/libavformat/movenc.c) | `codec_ipod_tags` includes AAC and ALAC; `ff_ipod_muxer` lists `m4v,m4a,m4b` extensions. M4A does not uniquely identify AAC. |
| F12 | [MDN: image formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types) | Ordinary JPEG uses, PNG sharp-detail/transparency uses, WebP options, SVG diagrams and icons. |
| F13 | [W3C: PNG specification](https://www.w3.org/TR/png-3/) | Lossless raster storage; optional alpha; pixel scanlines; zero alpha transparent and maximum alpha opaque. |
| F14 | [Google: WebP container specification](https://developers.google.com/speed/webp/docs/riff_container) | Lossy/lossless modes, alpha, animation, metadata and RIFF container. |
| F15 | [W3C: SVG introduction](https://www.w3.org/TR/SVG2/intro.html) | Vector shapes, images and text; XML standalone syntax; transforms, compositing and animation. |
| F16 | [MDN: raster image](https://developer.mozilla.org/en-US/docs/Glossary/Raster_image) | Pixel-grid definition; raster/bitmap terminology. |
| F17 | [JPEG committee: JPEG 1](https://jpeg.org/jpeg/index.html) | JPEG 1 standard includes the familiar DCT lossy system plus less common lossless/hierarchical options. Avoid “all JPEG is necessarily lossy”. |
| F18 | [MP4 Registration Authority](https://mp4ra.org/) | Registered identifiers/brands for the ISO base media family; extension alone does not describe every stream/property. |

## Concepts to preserve

- **Container/file format:** organises encoded media and associated information.
  MP4/MOV/MKV/WebM/AVI are container examples. One file can have multiple streams,
  and a video file need not have an audio stream. [F1–F7]
- **Stream:** a media sequence within a container, such as video pictures or
  audio samples. Distinguish it from network streaming. [F1, F4]
- **Codec:** defines the representation used to encode/decode a stream; container
  support and codec support are separate. An encoder is an implementation.
  Existing optional guide `#/appendix/codecs` supplies the fuller comparison.
  [F1, existing `src/notebook/codecs.strings.ts`]
- **Extension:** filename suffix/convention that helps software choose a handler.
  It is neither proof of actual bytes nor a complete stream inventory. Renaming
  bytes does not convert them. Do not teach every extension as a generic
  container: MP3, native FLAC and ordinary image files require different nuance.
  [F2, F3, F10, F12]
- Changing container can sometimes copy supported encoded streams without
  re-encoding (remuxing); changing the codec requires encoding. Container/codec
  restrictions can prevent stream copy. Neither renaming nor remuxing promises
  that an otherwise unsupported codec becomes playable. [F1, F5, F6]
- An output suffix can help FFmpeg infer its muxer; that is software selecting a
  writer, not the act of changing a name converting an existing file. [F1, F2]
- Practical recommendations below are conditional use cases, not rankings.
  File size, visible/audible quality, editability and playback depend on encoded
  streams/settings/content and destination, not suffix alone. [F1–F3]

## Video format facts for drafting

| Name / common extension | Verified facts | Practical use and tradeoff; wording limits |
| --- | --- | --- |
| MP4 / `.mp4` | MPEG-4 Part 14 container in the ISO base media family; commonly carries H.264 video and AAC audio, including this course's supplied file. Other codecs are possible. [F2, F3, F18] | Practical delivery starting point with the course's H.264/AAC settings. Check actual target's container, codec and picture/audio requirements. “Every MP4 plays everywhere” is false. |
| MOV / `.mov` | QuickTime-family container; closely related structurally to MP4, not another codec or a guarantee of one compression method. [F2] | Encountered in Apple/camera/editing workflows; suitable when the receiving editor specifies it. Do not equate MOV with ProRes, lossless storage or uniformly huge files. Verify editor/player support. |
| Matroska / `.mkv` | Flexible container with video, audio, subtitle tracks, metadata and chapters. [F4] | Useful when retaining several selectable tracks or chapters. Browser/device acceptance varies. “Supports many codecs” does not mean an arbitrary browser can decode them. |
| WebM / `.webm` | Matroska subset with restricted codecs. VP8/VP9 video and Vorbis/Opus audio are established combinations; current FFmpeg also permits AV1 video. [F5, F6] | Web delivery where the destination accepts that combination. H.264/AAC MP4 cannot simply be renamed or stream-copied unchanged into WebM. Do not describe WebM as supporting every Matroska codec. |
| AVI / `.avi` | RIFF-based audio/video container that can hold differing stream types and codecs; video-only is possible. [F7] | Encountered in older capture, editing and delivery workflows. Retain/use when a particular tool requires it and test that codec combination. Age is context, not universal compatibility. Do not say AVI is necessarily uncompressed, lossless, obsolete everywhere or unable to contain modern codecs. |

## Audio format facts for drafting

| Name / common extension | Verified facts | Practical use and tradeoff; wording limits |
| --- | --- | --- |
| MP3 / `.mp3` | MPEG audio Layer III encoded audio, normally a frame stream with optional metadata such as ID3. FFmpeg calls its writer an MP3 muxer, but this does not make it a generic multi-codec container. [F2, F3] | Established lossy audio delivery, including older players/workflows. No inherent quality or file-size guarantee from the suffix. Never claim an MP3 file can contain AAC instead. |
| AAC / `.aac`; MPEG-4 audio / `.m4a` | AAC is the codec. `.aac` commonly contains AAC with ADTS framing; FFmpeg's ADTS writer accepts one AAC stream. `.m4a` conventionally identifies audio in the MP4 family; AAC is common, but ALAC is also possible. [F2, F3, F11] | Distinguish an AAC stream from its packaging. AAC in MP4 is a common delivery option; check whether the destination expects M4A/MP4 or ADTS. `.m4a` does not by itself establish lossy versus lossless audio. |
| WAV / `.wav` | RIFF/WAVE audio container, commonly PCM but capable of other encodings. [F3] | PCM WAV is useful for editing/reference exchange and usually much larger than lossy delivery audio at comparable duration/sample settings. Say “PCM WAV”, not “all WAV is uncompressed”. Decoding lossy audio into WAV cannot restore discarded detail. |
| FLAC / `.flac` | Lossless codec and native file format; reconstructs encoded input samples without compression loss. [F10] | Useful for retaining a lossless audio copy with compression. Usually larger than lossy delivery copies; compatibility must be checked. Cannot recover losses already present in its input. Native `.flac` and FLAC carried in Ogg are different packaging. |
| Ogg / `.ogg`, Opus / `.opus` | Ogg is the container; Vorbis and Opus are codecs it can carry. `.opus` is the recommended suffix for the Ogg Opus file described by RFC 7845. Opus also exists outside Ogg. [F8, F9] | Ogg Vorbis/Opus are audio delivery choices when accepted by the target. `.ogg` is not a synonym for Vorbis and `.opus` is not a universal container-independent raw Opus file. No blanket browser guarantee. |

## Still-image format facts for drafting

| Name / common extension | Verified facts | Practical use and tradeoff; wording limits |
| --- | --- | --- |
| JPEG / `.jpg`, `.jpeg` | Common photographic raster format, normally lossy in everyday web/camera use; ordinary JPEG has no alpha transparency. The broader JPEG standards include other modes. [F12, F17] | Useful for photographs when some loss is acceptable. Strong compression can damage sharp text/edges. Avoid “all JPEG standards are lossy” and fixed relative-size claims. |
| PNG / `.png` | Lossless raster compression, optional alpha transparency; standard now also covers animation. [F12, F13] | Useful for screenshots, diagrams, text and transparent graphics. May be larger than lossy photographic formats. Lossless compression preserves the supplied image data; it does not reverse earlier loss or guarantee a small file. |
| WebP / `.webp` | Raster format with lossy and lossless modes, optional alpha and animation. [F12, F14] | Useful for web image delivery when receiving tools support it. Compare actual image quality/size rather than asserting it always beats JPEG/PNG. `.webp` alone does not reveal whether lossless mode was used. |
| SVG / `.svg` | Vector graphics document with shapes, text and potentially embedded images; standalone files use XML syntax. Can include transforms, filters and animation. [F15] | Good for scalable diagrams/logos/icons. Vector shapes render at different sizes without enlarging a fixed pixel grid. Embedded raster images remain raster; fonts/resources can affect rendering. Do not promise arbitrary SVG is supported by the app's FFmpeg. Render to a suitable raster image before a video workflow that requires pixels. |

Alpha is not preserved by every later export. A transparent PNG/WebP can become
an opaque video if the chosen video codec/pixel format or compositing process
does not retain transparency. Neither “MP4 always supports transparency” nor
“MP4 can never support transparency” belongs in this reference.

## Glossary facts to draft separately

- **Alpha / alpha channel:** per-pixel opacity information. PNG defines zero as
  fully transparent, maximum as fully opaque; intermediate values are partially
  transparent for compositing. An alpha-capable format need not use transparent
  pixels. [F13, section 6.2; F14]
- **Raster image:** pixel grid; JPEG/PNG/WebP are examples. Increasing display
  dimensions does not create missing source detail. [F16; F12–F14]
- **Vector graphic:** describes shapes/lines/curves and their appearance; SVG is
  an example. Rendering produces pixels at the chosen output size. Avoid
  promising that every element in an SVG is a vector. [F15]
- **Image sequence:** ordered still-image files treated as successive video
  frames. FFmpeg `image2` supports numbered patterns such as `%03d`; input
  `-framerate` supplies their presentation rate. Ordinary filenames alone do not
  supply playback duration. For the simple one-file-per-frame constant-rate
  model, N frames at r frames/s occupy N/r seconds. Image2 expects matching image
  size, pixel format and image format across the sequence. [F2, `image2`]

## App constraints established by source inspection

Inspected branch: `codex/formats-and-image-video`. No runtime capability tests or
product changes were made by this researcher. These facts describe the existing
implementation, not a proposal to expand it.

- `src/cli/command.ts`, `toolPlan(words, true)` notebook output whitelist:
  `mp4 webm wav mp3 ogg png jpg gif mkv mov flac opus srt txt`. This excludes
  `.avi`, `.aac`, `.m4a`, `.jpeg`, `.webp` and `.svg`. The older workbench's
  whitelist is narrower: `mp4 webm wav mp3 ogg png jpg gif`.
- `src/notebook/Workspace.tsx` calls that notebook plan and uses `mediaMime`.
  `mediaMime` delegates to `src/cli/files.ts` `mimeFor`, then adds selected text,
  MKV, MOV, FLAC and Opus cases. It does not universally detect file contents.
- Base MIME mapping covers MP4/WebM/WAV/MP3/Ogg/JPG/PNG/GIF/JSON. Some extensions
  in the requested general reference have no filename-derived MIME mapping.
- `src/notebook/FileManager.tsx` chooses `<video>`, `<audio>` or `<img>` using
  `blob.type || mediaMime(name)`. Browser decoding errors yield unavailable
  preview feedback. An imported Blob can carry a MIME type even when the suffix
  lacks a mapping. A chosen MIME type does not prove actual decode support.
- Therefore keep four questions distinct: can a file be stored/imported; can the
  pinned processing build read/encode it; does the command adapter accept the
  requested output path; can this browser preview the resulting bytes?
- Do not turn the appendix into an app support matrix or instruct learners to
  rename unsupported output suffixes as a workaround. Generic format knowledge
  must not imply all listed formats can be generated in this notebook.
- Existing guide route is `#/appendix/codecs`, parsed in
  `src/notebook/structure.ts`. Link to it rather than duplicating its comparison.
- The main appendix must be readable from saved app assets without fetching
  sources or processing tools. Mark further reading as external. Do not add
  mandatory execution, download, account or installation prerequisites.

## Editorial exclusions

No universal compatibility tables, claimed size/quality rankings, universal AVI
codec limits, MP3-as-AAC-container claim, `.m4a`-means-AAC claim,
WAV-equals-PCM claim, Ogg-equals-Vorbis claim, WebM-equals-all-Matroska claim,
all-SVG-content-is-vector claim, or claim that renaming converts bytes. No new
commands are necessary for this optional reference. Facts here are ready for a
separate prose pass; independent learner/sceptic/checker review remains pending.
