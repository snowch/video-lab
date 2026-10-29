// Copyright © 2026 Christopher Snow
export const codecGuide = {
  title: "Choosing video and audio codecs",
  optional: "Optional reference",
  intro: [
    "A container organises streams; a **codec** defines how their pictures or sound are represented. An **encoder** produces that representation: `libx264` writes H.264 video, and FFmpeg's `aac` encoder writes AAC audio.",
    "The receiving app or device is where your video will be watched, edited or uploaded: for example, a phone, desktop player, editing app or website.",
  ],
  startTitle: "Start with the course export",
  startBody: [
    "For an ordinary video with sound, start with MP4 containing H.264 video and AAC audio. This widely supported combination is the course's working default.",
    "The export lesson supplies the command, using libx264 for H.264, aac for AAC and yuv420p for picture storage. Before exporting a long video, try a short section with movement, fine detail and any intended sound.",
  ],
  startLink: "Make the course MP4 export",
  checkTitle: "Try the file where it will be used",
  checkSteps: [
    {
      title: "Download the short export",
      text: "Use Download beneath the result player, or the file's Download action in Files. Keep the output filename so you can identify the file you test.",
    },
    {
      title: "Open, import or upload it",
      text: "Open the downloaded file in the player or device that will show it, import it into the editing app, or upload it to the website that will receive it. Playback inside this course tests this browser only.",
    },
    {
      title: "Check picture, sound and timing",
      text: "Play the result there. Check that the picture is recognisable, the expected sound is audible, and the video starts and ends at the intended moments. For a website, check its processed playback after the upload has finished.",
    },
    {
      title: "Use a failure to choose the next change",
      text: "If the app rejects the file or it plays incorrectly, read its message and upload/import guidance. For codecs and picture size, run `ffprobe compatible.mp4` using your output's actual filename and compare its Video and Audio lines. Files shows the saved file's size. Change the setting named by the message and try another short export.",
    },
  ],
  checkLimit:
    "A successful test establishes that this file works in that receiving setup. It does not establish playback on every device or in every app.",
  checkLink: "How to test an export in the receiving app",
  choosingTitle: "When published requirements apply",
  choosing: [
    "Find published upload or import requirements in the app's help or beside the upload control. Look for accepted file types, named codecs, picture dimensions and file-size limits. The course export command selects the MP4 container through its output filename; renaming an existing file does not convert its contents.",
    "The YouTube link below is an example of published upload guidance, not a required course step. It includes settings beyond the course export command. For an ordinary first export without such rules, use the starting combination and playback test above.",
    "Other codecs can be worth investigating for a specific request or a size or quality problem. Compression gains and processing effort depend on the material, encoder and settings. To try alternatives on a computer, `ffmpeg -encoders` lists the encoders in that installed FFmpeg build. The course examples use H.264 and AAC.",
  ],
  videoTitle: "Video choices",
  video: [
    {
      name: "H.264 / AVC",
      text: "The course starting choice, encoded with libx264 and packaged in MP4 with AAC sound. Keep it when your short export works in the receiving app or device.",
    },
    {
      name: "H.265 / HEVC",
      text: "Designed for greater compression efficiency than earlier standards. Investigate it if an editor or service requests HEVC, or if you need to compare compression options for a large video. Use an encoder that provides it, then compare picture quality, size, processing effort and actual playback.",
    },
    {
      name: "VP9",
      text: "A web-video option commonly packaged in WebM with Opus sound. Investigate it for a VP9 request or a WebM delivery workflow. WebM also allows other video codecs; follow any codec named by the website or app.",
    },
    {
      name: "AV1",
      text: "Designed for efficient video delivery, including web streaming. Investigate it for an AV1 delivery request or a comparison of compression options. With a suitable encoder, measure encoding effort, picture quality and size, then try playback on the devices that will use it.",
    },
  ],
  audioTitle: "Audio choices",
  audio: [
    {
      name: "AAC",
      text: "The course starting choice for sound with H.264 in MP4. It uses AAC-LC, the Low Complexity profile. A profile is a variant with particular coding features; investigate another only if the receiving app or published instructions call for it.",
    },
    {
      name: "Opus",
      text: "Lossy audio designed for speech and music, including real-time communication. Investigate it for a WebM or Ogg Opus request, or an audio-compression comparison; package it in a container accepted by the receiving app.",
    },
    {
      name: "MP3",
      text: "An established lossy format used in many existing audio workflows. Choose it when a player or delivery instruction specifically requests MP3; its age does not determine sound quality or file size.",
    },
    {
      name: "FLAC",
      text: "Lossless compression that reconstructs the exact input samples. Useful for keeping an audio copy without further sample loss, though files are often larger than lossy delivery versions.",
    },
    {
      name: "PCM",
      text: "Stores audio sample values without compression. PCM in WAV is a useful starting choice for editing or an audio reference. It is often much larger than compressed delivery audio; WAV is a container, not another name for PCM.",
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
      label: "MDN: web video codec guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs",
    },
    {
      label: "Example published requirements: YouTube upload settings",
      url: "https://support.google.com/youtube/answer/1722171?hl=en",
    },
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
