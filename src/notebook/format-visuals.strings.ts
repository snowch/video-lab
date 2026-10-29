// Copyright © 2026 Christopher Snow
export const formatVisuals = {
  purposeTitle: "Choose for the material you need",
  purposeGroups: [
    {
      title: "Video and sound together",
      formats: "MP4 · MOV · Matroska (.mkv) · WebM · AVI",
      text: "Start with MP4 containing H.264 video and AAC sound. Investigate another container for a specific editor request, web-delivery request or need for selectable tracks.",
    },
    {
      title: "Audio on its own",
      formats: "MP3 · M4A · WAV · FLAC · Ogg",
      text: "Start with PCM in WAV for editing or a reference copy. FLAC keeps a compressed lossless copy; use MP3 or another delivery format when a player or publishing instruction requests it. These names cover both encoded audio formats and containers.",
    },
    {
      title: "Still pictures and graphics",
      formats: "JPEG · PNG · WebP · SVG",
      text: "Start with JPEG for photographs and PNG for sharp text, diagrams or transparency. Keep SVG for scalable shapes, then render it into pixels when adding it to a video. Investigate WebP for a web-image request or size comparison.",
    },
  ],
  containerTitle: "Video containers",
  containerIntro:
    "A container organises encoded media streams in one file. A stream is a sequence of video pictures or audio samples; its codec defines how those pictures or samples are represented. A player must understand both the container and the codecs inside.",
  containerDiagramLabel: "Example MP4 container and its streams",
  mp4: "MP4 container",
  h264Video: "H.264 video stream",
  aacAudio: "AAC audio stream",
  containerCaption:
    "Illustrative contents: this MP4 holds H.264 video and AAC audio. Other MP4 files can contain different streams or codecs. The boxes show membership, not byte positions in a file.",
  demuxerMuxer:
    "A demuxer reads streams from a container; a muxer writes streams into a container.",
  remuxTitle: "Copy streams into another container",
  remuxIntro:
    "Remuxing reads encoded streams from one container and writes them into another. Stream copy keeps the encoded media without encoding it again, provided the destination container accepts those codecs.",
  encodingNote:
    "Changing a codec requires encoding. An output suffix can help FFmpeg choose its writer.",
  sourceMp4: "Source: MP4",
  destinationMatroska: "Destination: Matroska (.mkv)",
  copyAction: "Copy H.264 video and AAC audio",
  remuxCaption:
    "Conceptual example: Matroska can hold these H.264 and AAC streams. The encoded media is copied into new packaging; playback still depends on the receiving player.",
  videoSignpost:
    "Video containers organise encoded video and audio streams. Explore an example MP4 and see how stream copy can move compatible streams into another container.",
  videoReferenceLink: "Explore video containers",
  magnifyTitle: "A picture is a grid of pixels",
  magnifyIntro:
    "A pixel is one position in a picture’s grid. This enlarged 2 × 2 example makes four positions visible. A pixel format describes how the picture’s component values are stored.",
  magnifyCaption:
    "Conceptual picture: the outlined 2 × 2 group is enlarged on the right. Each square marks one pixel position; the colours are illustrative.",
  samplingTitle: "Compare colour sampling",
  samplingIntro:
    "A sample is a stored value for one picture component. Y is luma, a brightness-related component. U and V store colour differences. Choose a sampling pattern to compare how many values each component uses for the same 2 × 2 group of picture positions.",
  samplingLegend: "Colour sampling pattern",
  samplingExplanation: {
    "4:4:4":
      "4:4:4 keeps one U and one V sample for every Y sample. This group has four samples of each component.",
    "4:2:2":
      "4:2:2 halves colour sampling horizontally. This group has four Y samples, two U samples and two V samples.",
    "4:2:0":
      "4:2:0 halves colour sampling horizontally and vertically. This group has four Y samples, one U sample and one V sample.",
  },
  componentLabels: {
    Y: "Y · luma",
    U: "U · colour difference",
    V: "V · colour difference",
  },
  sampleCount: (component: string, count: number) =>
    `${component}: ${count} ${count === 1 ? "sample" : "samples"}`,
  samplingCaption:
    "Conceptual counts for the same 2 × 2 picture group. The picture’s width and height stay unchanged. The grids show sample counts and grouping, not measured colours, exact sample positions or storage order.",
  samplingConsequence:
    "Reducing colour sampling can soften fine coloured text and edges because fewer samples describe the colour changes.",
  alphaTitle: "See how alpha controls opacity",
  alphaIntro:
    "Alpha is the opacity information used for transparency. At 0 the foreground is transparent; at 1 it is opaque. Values between them let the background show through. Change alpha to compare the same foreground over two backgrounds.",
  alphaRangeLabel: "Foreground alpha",
  alphaTransparent: "transparent",
  alphaPartial: "partly transparent",
  alphaOpaque: "opaque",
  checkerPreviewLabel: "Foreground over a checkerboard",
  compositePreviewLabel: "Foreground over a coloured background",
  drawing: "Drawing",
  alphaCaption:
    "This demonstration uses CSS transparency to combine a foreground with each background. It does not measure a codec. To keep this visible combination in a video format without alpha, compose the foreground over its background before export. Converting the foreground to yuv420p first loses its alpha.",
  detailsSummary: "Precision and storage layout",
  referenceNavLabel: "Format references",
  formatsNav: "Media file formats",
  containersNav: "Video containers",
  pixelsNav: "Pixel formats",
} as const;
