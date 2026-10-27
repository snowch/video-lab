// Copyright © 2026 Christopher Snow
export const codecGuide = {
  title: "Choosing video and audio codecs",
  optional: "Optional reference",
  intro: [
    "A container organises streams; a **codec** defines how their pictures or sound are represented. An **encoder** produces that representation: `libx264` writes H.264 video, and FFmpeg's `aac` encoder writes AAC audio.",
    "Choose codecs your destination can play, then compare the result and file size. The course uses H.264 video and AAC audio in MP4 as a practical starting point.",
  ],
  choosingTitle: "Start with the destination",
  choosing: [
    "Check the target browser, device or publishing service for both codec and container support. Changing a filename ending does not prove that the streams were converted.",
    "More efficient compression can use less data for a comparable result. The gain and processing effort depend on the material, encoder and settings; test a short representative section before encoding everything.",
  ],
  videoTitle: "Video choices",
  video: [
    {
      name: "H.264 / AVC",
      text: "A common delivery choice, often in MP4. The course uses the libx264 encoder; retain this combination when it meets your destination's requirements.",
    },
    {
      name: "H.265 / HEVC",
      text: "Designed for greater compression efficiency than earlier standards. Consider it when your destination accepts HEVC, then compare picture quality, size and processing effort on your material.",
    },
    {
      name: "VP9",
      text: "A web-video option commonly used in the WebM container. Consider it for a service requesting VP9 or WebM, checking the required picture settings and audio combination.",
    },
    {
      name: "AV1",
      text: "Designed for efficient video delivery, including web streaming. Consider it when the destination and target devices support your output, and measure encoding effort as well as quality and size.",
    },
  ],
  audioTitle: "Audio choices",
  audio: [
    {
      name: "AAC",
      text: "Lossy audio commonly paired with H.264 in MP4. The course uses AAC-LC, the Low Complexity profile. A profile is a variant with particular coding features; check which one your destination accepts.",
    },
    {
      name: "Opus",
      text: "Lossy audio designed for speech and music, including real-time communication. Common in web applications; check the container and destination for file delivery.",
    },
    {
      name: "MP3",
      text: "An established lossy format used in many existing audio workflows. Choose it when the destination specifically needs MP3; its age does not determine sound quality or file size.",
    },
    {
      name: "FLAC",
      text: "Lossless compression that reconstructs the exact input samples. Useful for keeping an audio copy without further sample loss, though files are often larger than lossy delivery versions.",
    },
    {
      name: "PCM",
      text: "Stores audio sample values without compression, useful for references and editing where supported. It is often much larger than compressed delivery audio; WAV is a common container, not another name for PCM.",
    },
  ],
  compressionTitle: "What audio compression changes",
  compression: [
    "**Lossy** encoding saves data by representing some sound information less precisely or omitting it. Strong reductions can introduce audible changes. **Lossless** compression reconstructs its input samples exactly, but cannot recover detail lost before those samples reached it.",
    "**Bitrate** counts encoded bits per second of playback. More data generally costs more space at the same duration, but a higher bitrate does not guarantee better sound across codecs and settings.",
    "**Sample rate** counts sound measurements per second in each channel. It is separate from encoded bitrate and playback speed: both compressed examples below keep the reference's sample rate and channels.",
  ],
  listeningTitle: "Listen to two AAC targets",
  listening: [
    "These supplied files use the same short passage from Big Buck Bunny, an animated film © 2008 Blender Foundation. Play one at a time at a comfortable device volume, and keep that volume fixed while comparing the same moments.",
    "The WAV reference comes from decoding the source's already-lossy AAC to 16-bit PCM. It includes those earlier losses and the conversion to 16-bit sample values; it is not the original studio recording.",
    "Both AAC files were encoded from that reference. Compare what you hear with their recorded sizes; you may notice differences, but this passage does not establish a universal quality ranking.",
  ],
  tracks: [
    {
      title: "PCM reference",
      note: "Decoded source audio stored as 16-bit PCM in WAV.",
    },
    {
      title: "AAC: 32 kb/s target",
      note: "A lower bitrate target applied to the same reference samples.",
    },
    {
      title: "AAC: 128 kb/s target",
      note: "A higher bitrate target applied to the same reference samples.",
    },
  ],
  download: "Download audio",
  size: (bytes: number) => `${bytes.toLocaleString("en-GB")} bytes`,
  metadata: (duration: number, rate: number, channels: number) =>
    `${duration} seconds · ${rate.toLocaleString("en-GB")} Hz · ${channels} channels`,
  playbackError:
    "This browser could not play the file. Download it to try another player.",
  recipeTitle: "How the supplied files were made",
  recipeIntro: [
    "Download `bunny-short.mp4` from a lesson's Files into a new working folder. In a native terminal with FFmpeg installed, open that folder and run each command separately.",
    "These commands reproduce the supplied audio in new output files. They are a native preparation recipe, not browser notebook cells.",
  ],
  recipeNotes: [
    "The first command reads the source MP4, omits video with `-vn`, and writes 16-bit PCM audio using `pcm_s16le`.",
    "The next commands each read that WAV and select the `aac` encoder. Their `-b:a` values request audio bitrate targets; the recorded file sizes also include container information, so these targets are not exact whole-file bitrates.",
    "Preparation did not normalise loudness or change the sample rate or channel count.",
  ],
  sourcesTitle: "Sources and further reading (external)",
  sources: [
    {
      label: "Codec comparison: primary sources and factual limits",
      url: "https://github.com/snowch/video-lab/blob/main/docs/notes/codecs/codec-sources.md",
    },
    {
      label: "Recorded audio preparation: commands, versions and provenance",
      url: "https://github.com/snowch/video-lab/blob/main/docs/notes/codecs/media-provenance.md",
    },
    {
      label: "FFmpeg: codecs, encoders and stream processing",
      url: "https://ffmpeg.org/ffmpeg.html#Detailed-description",
    },
    {
      label: "FFmpeg: audio and video encoder options",
      url: "https://ffmpeg.org/ffmpeg-codecs.html",
    },
    {
      label: "ITU: H.264 / AVC recommendation",
      url: "https://www.itu.int/rec/T-REC-H.264/en",
    },
    {
      label: "ITU: H.265 / HEVC recommendation",
      url: "https://www.itu.int/rec/T-REC-H.265/en",
    },
    {
      label: "WebM Project: VP9",
      url: "https://www.webmproject.org/vp9/",
    },
    {
      label: "AOMedia: AV1 specification",
      url: "https://aomedia.org/specifications/av1/",
    },
    {
      label: "Opus: speech and audio codec specification",
      url: "https://www.rfc-editor.org/rfc/rfc6716",
    },
    {
      label: "FLAC: lossless audio codec specification",
      url: "https://www.rfc-editor.org/rfc/rfc9639",
    },
    {
      label:
        "Big Buck Bunny: © 2008 Blender Foundation, original film and credits",
      url: "https://peach.blender.org/",
    },
    {
      label: "Practice audio licence: Creative Commons Attribution 3.0",
      url: "https://creativecommons.org/licenses/by/3.0/",
    },
  ],
  continueTitle: "Continue with the course",
  chapterIntro:
    "The **container** is the file format that organises the streams. The supplied MP4 holds H.264 video and AAC audio: each **codec** defines how that stream's pictures or sound are encoded and decoded. A player needs to understand both the container and its codecs. The `.mp4` ending alone does not identify the codecs inside.",
  link: "Choosing video and audio codecs (optional)",
} as const;
