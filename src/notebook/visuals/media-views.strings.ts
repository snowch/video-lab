// Copyright © 2026 Christopher Snow
// Figure copy is kept separate so it receives the lesson's prose review.
export const mediaViewCopy = {
  copyTitle: "Two paths through FFmpeg · explanatory model",
  copyPath: "Stream copy",
  encodePath: "Decode and encode",
  compressedSource: "Compressed source streams",
  copyPackets: "Copy encoded data",
  compressedOutput: "Compressed streams in a new file",
  decode: "Decode",
  picturesAndSound: "Pictures and sound samples",
  optionalFilters: "Optional filters",
  encode: "Encode",
  copyNote:
    "Copying bypasses decoding and encoding. Filters need decoded pictures or sound, so they take the other path.",
  dependencyTitle: "Starting between decoding points · simplified model",
  sourceOrder: "Source pictures in display order",
  frameNames: ["A", "B", "C", "D", "E", "F"],
  independent: "A starts decoding",
  dependent: "Each later picture needs the picture before it",
  requestedStart: "Requested start: C",
  copyDependencies: "Copy preserves dependencies",
  copyDependencyNote:
    "C still needs B, and B still needs A. A copied cut may retain earlier material needed for decoding; timestamps and the player affect its visible opening.",
  decodeDiscard: "Decode first, then discard",
  decodedBefore: "Decode A and B; discard their pictures",
  encodedKept: "Encode kept pictures C–F into a new beginning",
  dependencyLimit:
    "This model gives each picture one earlier reference. Real video can use several references, including pictures displayed later. A copied cut keeps those dependencies.",
  framingTitles: {
    scale: "Resize the whole picture · supplied native example",
    crop: "Keep a smaller view · supplied native example",
    pad: "Add a canvas around the view · supplied native example",
  },
  sourceFrame: "Supplied source frame",
  outputFrame: "Filtered frame",
  framingNotes: {
    scale:
      "The whole view fits a smaller grid. Both images use the same display scale to reveal the change in stored dimensions.",
    crop: "The crop keeps a central square and removes the sides. It is shown at the same display scale as the source, so the remaining objects keep their size.",
    pad: "The full view is scaled down, then placed on a square canvas. The black bands are pixels in the output frame.",
  },
  framingSourceNote:
    "These are native examples from bunny-short.mp4 at the same source time, supplied to illustrate the filter. Your command produces its own result.",
  sourceImageAlt:
    "The full landscape frame from the supplied Big Buck Bunny clip.",
  framingImageAlts: {
    scale: "The same complete landscape scene on a smaller pixel grid.",
    crop: "The central square from the source scene, with the side areas removed.",
    pad: "The complete landscape scene scaled to fit within a square, with black bands above and below.",
  },
  qualityTitle: "Compare encoded detail · supplied native examples",
  qualityNote:
    "Native libx264 encodes of the same source, showing matching detail at the same moment. Sizes measure each complete eight-second MP4, including audio. These are supplied examples; your command produces its own result.",
  qualityCrop: "Matching detail crop",
  qualitySetting: "CRF",
  completeFile: "Complete MP4",
  bytes: "bytes",
  qualityImageAlt:
    "Matching detail from the supplied Big Buck Bunny frame after native libx264 encoding at CRF",
  qualityLimit:
    "Judge the detail as well as the size. These measurements describe this source and encoder run; CRF does not promise a fixed file size.",
  evidence: "Example source and measurements",
  sourceTime: "Source time",
  seconds: "s",
  dimensions: "Stored dimensions",
  cropPosition: "Crop origin",
  pixels: "pixels",
  faststartTitle: "Move the index before the media · schematic MP4 layout",
  fileBeginning: "File beginning",
  fileEnd: "File end",
  beforeFaststart: "Index at the end",
  afterFaststart: "With faststart",
  header: "File header",
  media: "Compressed video and audio",
  index: "Index (moov)",
  faststartNote:
    "With the index near the beginning, a player can obtain it before most media bytes arrive. Rectangle lengths do not represent byte sizes.",
  faststartSourceNote:
    "The supplied clips already have this layout. This model shows the operation; local replay cannot measure its network benefit. Startup also depends on the network, server and player.",
};
