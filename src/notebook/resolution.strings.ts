// Copyright © 2026 Christopher Snow
export const resolutionGuide = {
  title: "Choosing a video resolution",
  optional: "Optional reference",
  link: "Choosing a video resolution (optional)",
  intro: [
    "**Resolution** describes a frame's stored pixel dimensions: width × height. A player can show that grid at many screen sizes, so a large player does not establish a high-resolution source.",
    "Start with the receiving app's accepted dimensions, your intended viewing size and the detail in your source. The choices below are starting points to test.",
  ],
  choicesTitle: "Choose a starting size",
  choices: [
    {
      name: "Ordinary landscape video",
      dimensions: "1920 × 1080 · 1080p",
      use: "Start here when the source has enough detail and the receiving app accepts it.",
    },
    {
      name: "Smaller landscape delivery",
      dimensions: "1280 × 720 · 720p",
      use: "Try this for a small player or a tighter delivery budget. Check that important detail remains readable.",
    },
    {
      name: "Portrait delivery",
      dimensions: "1080 × 1920 · 9:16",
      use: "A useful starting size if the destination accepts it. Check the framing of subjects and captions.",
    },
    {
      name: "Optional UHD delivery",
      dimensions: "3840 × 2160 · 4K UHD",
      use: "Choose it when source detail and viewing needs justify the extra processing. It has four times the pixels of 1920 × 1080.",
    },
  ],
  sourceTitle: "Keep the source's limits in view",
  source: [
    "Upscaling calculates more pixels from the existing picture. It cannot recover scene detail absent from the source. Keep a small source at useful dimensions unless the destination requires a larger frame.",
    "The course source is 854 × 480. Enlarging it to 720p, 1080p or 4K would not demonstrate the detail of an HD or UHD original.",
    "**Aspect ratio** describes the picture's width-to-height shape; pixel shape can also affect displayed proportions. To fit a different shape, cropping removes picture edges and padding adds space around the picture. Stretching distorts subjects. Follow the destination's framing guidance; some players adapt without added bars.",
    "Resolution alone does not determine file size. Duration, frame rate, picture content, codec, compression settings, audio and container information also contribute.",
  ],
  diagramTitle: "Compare stored pixel grids",
  diagramIntro:
    "Choose a landscape grid to compare its dimensions and pixel count with the others. The 480p example uses the course source's 854 × 480 dimensions.",
  diagramSelectLabel: "Highlight a resolution",
  diagramOutlines: ["Smallest outline", "Middle outline", "Largest outline"],
  diagramPDefinition:
    "In labels such as 720p, the number gives the frame height in pixels and p means progressive scan: each frame is a complete picture.",
  diagramPixelCount: (count: number) =>
    `${count.toLocaleString("en-GB")} pixels per frame`,
  diagramCaveat:
    "Calculated dimension model: the rectangles fit this page and compare stored pixel counts. They are not measured screen sizes or examples of captured picture detail.",
  testTitle: "Test the intended viewing size",
  test: [
    "Export a short section containing small text, captions, faces or important edges. Download it and open or upload it in the app and device that will receive it.",
    "Watch at the intended size, including full screen if relevant. Check readable detail and framing. For an upload, check the processed playback too. Change the size only when the result or destination requirements give you a reason.",
  ],
  exerciseTitle: "Try a smaller local preview",
  exercise: [
    "In Resize the picture, make the real 640 × 360 and 320 × 180 previews. Compare paused frames at the same displayed size. Look for detail you can still distinguish and replay to check proportions and sound.",
  ],
  exerciseLink: "Open Resize the picture",
  continueTitle: "Continue with the course",
  sourcesTitle: "Sources and further reading (external)",
  sources: [
    {
      label: "FFmpeg: scaling and displayed proportions",
      url: "https://ffmpeg.org/ffmpeg-filters.html#scale",
    },
    {
      label: "YouTube: resolution, aspect ratios and player behaviour",
      url: "https://support.google.com/youtube/answer/6375112?hl=en",
    },
    {
      label: "YouTube: upload encoding settings",
      url: "https://support.google.com/youtube/answer/1722171?hl=en",
    },
  ],
} as const;
