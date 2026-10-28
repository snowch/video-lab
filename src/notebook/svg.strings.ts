// Copyright © 2026 Christopher Snow
export const svgWorkflow = {
  title: "Use your own SVG drawing (optional)",
  intro:
    "After the supplied practice, you can make your own drawing in an external SVG editor such as Inkscape. SVG can describe vector shapes: lines and curves stored as drawing instructions. Exporting those shapes to PNG renders them onto a grid of pixels for the overlay command.",
  steps: [
    "Set the page or canvas to 854 × 480 pixels to match `bunny-short.mp4`. Draw your marks where you want them to appear in the video, and save the original SVG for later edits.",
    "Export the entire page or canvas as a PNG at 854 × 480 pixels with a transparent background. Do not crop the export to the drawing: the empty space preserves its position. A white background is opaque and will cover the footage.",
    "Import the PNG through Files with a distinct name, such as `my-annotation.png`, to keep the supplied `annotation.png`.",
    "In the existing worked command, replace `annotation.png` with your imported PNG’s filename and `annotated.mp4` with a new output name, such as `my-annotated.mp4`. Keep the other parts of the command and run it.",
  ],
  after:
    "Replay your output. Check that the footage shows through the empty parts of the drawing and that your marks sit where you intended. The practice check is for the supplied annotation; use the replay to assess your own drawing.",
};
