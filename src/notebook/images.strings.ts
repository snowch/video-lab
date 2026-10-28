// Copyright © 2026 Christopher Snow
export const imageCopy = {
  chapterTitle: "Build video from images",
  chapterSummary:
    "Give still pictures duration, play drawings in order and place a transparent graphic over video.",
  viewSource: "View source",
  filmstripCaption:
    "Source drawings in filename order. These thumbnails show the supplied pictures; run the command to create and replay their timing as video.",
  transparentPngExplanation:
    "The checkerboard marks transparent space in this preview; it is not part of the PNG. The arrow and ring sit on a transparent canvas. Its alpha channel describes opacity at each pixel: transparent areas let the underlying video show through when the pictures are combined.",
  photoCredit:
    "Fronalpstock, Switzerland, photographed by Hannes Röst. Cropped and resized to 640 × 360 pixels for this course.",
  photoSourceLabel: "Original photograph on Wikimedia Commons",
  photoLicenceLabel: "Creative Commons Attribution-ShareAlike 3.0",
  shareAlikeWarning:
    "The adapted photograph is CC BY-SA 3.0. Keep the photographer credit, source and licence links, indicate your changes, and license adaptations, including videos made from it, under the ShareAlike terms.",
  formatsAppendixLabel: "Media file formats (optional)",
} as const;
