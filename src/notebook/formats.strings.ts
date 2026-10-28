// Copyright © 2026 Christopher Snow
export const formatGuide = {
  title: "Media file formats",
  optional: "Optional reference",
  link: "Media file formats (optional)",
  intro: [
    "Choose a format for the tool or audience receiving your file. A familiar filename ending helps identify a likely format, but does not establish its contents or whether a player can decode them.",
    "This reference explains common video, audio and image choices. Use the codec guide for a fuller comparison of video and audio compression.",
  ],
  conceptsTitle: "Read the file and its contents separately",
  concepts: [
    {
      name: "Container",
      text: "A file format that organises encoded media and associated information. MP4 can hold video and audio streams; a video file can also have no audio.",
    },
    {
      name: "Stream and codec",
      text: "A stream is a sequence of media within the file, such as video pictures or audio samples. Its codec defines how those pictures or samples are represented. A player needs to understand both the container and the codecs inside.",
    },
    {
      name: "Extension",
      text: "The filename suffix, such as .mp4, is a convention used by software to choose a handler. Renaming a file does not convert its bytes. Some formats, such as MP3, specify an encoded stream rather than a container for arbitrary codecs.",
    },
    {
      name: "Remuxing and encoding",
      text: "Remuxing writes encoded streams into a new container without encoding them again, when that container accepts them. Changing a codec requires encoding. An output suffix can help FFmpeg choose its writer, but renaming an existing file performs neither operation.",
    },
  ],
  videoTitle: "Video containers",
  video: [
    {
      name: "MP4",
      extensions: ".mp4",
      description:
        "An MPEG-4 container commonly carrying H.264 video and AAC audio, as in the course source. Other codec combinations are possible.",
      use: "A practical delivery starting point with the course's H.264/AAC settings. Check the destination's codec, picture and audio requirements; the MP4 suffix alone does not guarantee playback.",
    },
    {
      name: "MOV",
      extensions: ".mov",
      description:
        "A QuickTime-family container closely related to MP4. MOV does not specify one codec or compression method.",
      use: "Often encountered in Apple, camera and editing workflows. Use it when the receiving editor requests it, checking the streams it accepts; MOV does not imply ProRes, lossless video or a particular file size.",
    },
    {
      name: "Matroska",
      extensions: ".mkv",
      description:
        "A flexible container for video, audio, selectable subtitles, metadata and chapters.",
      use: "Useful for keeping several selectable tracks or chapters together. Browser and device acceptance varies, and a player still needs decoders for the chosen codecs.",
    },
    {
      name: "WebM",
      extensions: ".webm",
      description:
        "A restricted Matroska-based container using VP8, VP9 or AV1 video and Vorbis or Opus audio.",
      use: "Useful for web delivery when the destination accepts that combination. H.264/AAC streams from MP4 cannot be copied unchanged into WebM; different codecs require encoding.",
    },
    {
      name: "AVI",
      extensions: ".avi",
      description:
        "A RIFF-based container for video and audio streams, including video-only files. Its streams can use different codecs.",
      use: "Encountered in older capture, editing and delivery workflows. Use it when a particular tool requires it and test the codec combination; AVI does not necessarily mean uncompressed or lossless video.",
    },
  ],
  audioTitle: "Audio formats and packaging",
  audio: [
    {
      name: "MP3",
      extensions: ".mp3",
      description:
        "MPEG audio Layer III: a lossy encoded audio stream, usually accompanied by metadata such as ID3 tags. It is not a general container for other codecs.",
      use: "An established delivery choice for players and workflows that request MP3. Sound quality and file size depend on the encoding settings and material.",
    },
    {
      name: "AAC and MPEG-4 audio",
      extensions: ".aac · .m4a",
      description:
        "AAC is a codec. An .aac file commonly packages it with ADTS framing. M4A conventionally means audio in the MP4 family; it can contain AAC or another codec such as lossless ALAC.",
      use: "AAC in MP4 is a common audio delivery choice. Check whether the destination expects M4A/MP4 or ADTS; the .m4a suffix alone does not establish whether audio is lossy.",
    },
    {
      name: "WAV",
      extensions: ".wav",
      description:
        "A RIFF/WAVE audio container, commonly holding uncompressed PCM samples but capable of other encodings.",
      use: "PCM WAV is useful for editing and reference exchange where supported, usually with much larger files than lossy delivery audio. Decoding a lossy source into WAV cannot recover discarded sound detail.",
    },
    {
      name: "FLAC",
      extensions: ".flac",
      description:
        "A lossless audio codec and native file format. Decoding reconstructs its input samples without compression loss.",
      use: "Useful for keeping a compressed, lossless audio copy when the receiving tool supports it. It is usually larger than a lossy delivery copy and cannot repair losses already present in its input.",
    },
    {
      name: "Ogg and Opus",
      extensions: ".ogg · .opus",
      description:
        "Ogg is a container that can carry Vorbis or Opus audio. The .opus suffix is recommended for Ogg Opus files; Opus can also be packaged elsewhere.",
      use: "Ogg Vorbis and Ogg Opus are delivery choices when accepted by the target. Ogg does not uniquely identify Vorbis, and the receiving player must support the contained codec.",
    },
  ],
  imagesTitle: "Still-image formats",
  images: [
    {
      name: "JPEG",
      extensions: ".jpg · .jpeg",
      description:
        "A raster format: a fixed grid of pixels. Everyday photographic JPEGs normally use lossy compression and have no alpha transparency.",
      use: "Useful for photographs when some loss is acceptable. Strong compression can damage text and sharp edges; increasing display size cannot recover missing detail.",
    },
    {
      name: "PNG",
      extensions: ".png",
      description:
        "A losslessly compressed raster format with optional alpha, the per-pixel opacity information used for transparency. PNG also supports animation.",
      use: "Useful for screenshots, diagrams, text and transparent graphics. Photographs may need more space than a lossy version; lossless storage preserves the supplied data without undoing earlier losses.",
    },
    {
      name: "WebP",
      extensions: ".webp",
      description:
        "A raster format with lossy and lossless modes, optional transparency and animation. Its suffix does not identify the compression mode.",
      use: "Useful for web image delivery when receiving tools support it. Compare actual quality and size on your pictures rather than assuming it always produces smaller files.",
    },
    {
      name: "SVG",
      extensions: ".svg",
      description:
        "A vector graphics document describing shapes, text and potentially embedded raster images. Rendering turns the document into pixels at a chosen size.",
      use: "Useful for scalable diagrams, logos and icons. Embedded raster detail stays fixed, and fonts or external resources can affect rendering. Render to a suitable raster image for a video workflow that requires pixels.",
    },
  ],
  choosingTitle: "Choose for the next step",
  choosing: [
    "Check what the receiving tool needs, including codecs, dimensions, audio settings and transparency. File size and visible or audible quality depend on the encoded content and settings as well as the format.",
    "Transparency can be lost in a later video export. A transparent PNG or WebP does not guarantee that the chosen video codec, pixel format or compositing process will preserve alpha.",
    "Test a short representative result in the actual destination. Remuxing may avoid another encode, but it cannot make an unsupported codec playable.",
  ],
  scopeTitle: "This reference and the notebook",
  scope: [
    "These are general format choices, not a list of formats this notebook can create. Importing or storing a file, processing it and previewing it are separate capabilities.",
    "Processing depends on the notebook's FFmpeg build and accepted output paths. Preview depends on this browser's decoders. A native FFmpeg installation may provide different capabilities; consult its build and the destination's requirements.",
    "The reference can be read offline once the app is saved. External sources below are further reading and require a connection.",
  ],
  continueTitle: "Continue with the course",
  sourcesTitle: "Sources and further reading (external)",
  sources: [
    {
      label: "FFmpeg: streams, codecs, containers and stream copy",
      url: "https://ffmpeg.org/ffmpeg.html#Detailed-description",
    },
    {
      label: "FFmpeg: container and image-sequence formats",
      url: "https://ffmpeg.org/ffmpeg-formats.html",
    },
    { label: "MP4 Registration Authority", url: "https://mp4ra.org/" },
    {
      label: "Matroska: technical introduction",
      url: "https://www.matroska.org/technical/basics.html",
    },
    {
      label: "WebM: container guidelines",
      url: "https://www.webmproject.org/docs/container/",
    },
    {
      label: "FFmpeg: current Matroska/WebM writer and codec restrictions",
      url: "https://github.com/FFmpeg/FFmpeg/blob/master/libavformat/matroskaenc.c",
    },
    {
      label: "Microsoft: AVI RIFF file reference",
      url: "https://learn.microsoft.com/en-us/windows/win32/directshow/avi-riff-file-reference",
    },
    {
      label: "Ogg encapsulation specification",
      url: "https://www.rfc-editor.org/rfc/rfc3533",
    },
    {
      label: "Ogg Opus specification",
      url: "https://www.rfc-editor.org/rfc/rfc7845",
    },
    {
      label: "FLAC specification",
      url: "https://www.rfc-editor.org/rfc/rfc9639",
    },
    {
      label: "JPEG committee: JPEG 1",
      url: "https://jpeg.org/jpeg/index.html",
    },
    { label: "W3C: PNG specification", url: "https://www.w3.org/TR/png-3/" },
    {
      label: "Google: WebP container specification",
      url: "https://developers.google.com/speed/webp/docs/riff_container",
    },
    {
      label: "W3C: SVG introduction",
      url: "https://www.w3.org/TR/SVG2/intro.html",
    },
  ],
} as const;
