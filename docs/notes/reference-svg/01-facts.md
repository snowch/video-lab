# Reference tile and optional SVG workflow

Copyright © 2026 Christopher Snow.

## Approved slice

Group the four existing overview reference links into one unnumbered Appendices and reference tile, matching the chapter cards, with one optionality description. Add a short optional SVG-to-transparent-PNG procedure to the overlay page. Preserve routes, commands, stored work, practice checks and the numbered chapter list. Owner requests merge when complete.

## Facts and scope for separate drafting

- Existing routes: #/glossary, #/appendix/codecs, #/appendix/formats, #/appendix/recording. Existing codec/formats titles omit their link labels' `(optional)` suffix.
- SVG describes shapes and text and can include raster images. Rasterising vector shapes renders them onto a chosen pixel grid. Reference: W3C SVG2 introduction, https://www.w3.org/TR/SVG2/intro.html; already checked in ../formats-images/formats-facts.md, F15. Do not imply every SVG element is a vector or that arbitrary SVG works in the pinned browser FFmpeg.
- PNG can retain transparency (alpha); white pixels are opaque. See W3C PNG, https://www.w3.org/TR/png-3/ and ../formats-images/formats-facts.md F13. File extension changes do not rasterise/convert images.
- Current overlay source is 854 × 480. The verified existing command reads bunny-short.mp4 then annotation.png and runs `-filter_complex overlay`, producing annotated.mp4. Native and WASM evidence in ../formats-images/native-commands.json and commands-wasm.json.
- Learner has already met alpha, the overlay command, canvas coordinates and Files import. Optional own-work procedure can use an external SVG editor, e.g. Inkscape, retain the original SVG and export the entire page/canvas at 854 × 480 pixels with transparent background. No drawing-editor installation is required for the main exercise. No new SVG rendering code, capture API, media asset or FFmpeg capability claim.
- Use a distinct imported PNG filename and output filename to preserve supplied exercises; direct learner to edit the existing worked command. Replay to assess transparency and positioning. Automated practice criteria remain for supplied annotation, not arbitrary custom images.

## Review and validation

Separate prose drafter; builder integration; built desktop/phone light/dark learner review; separate sceptic; builder fixes; independent checker. Run full npm run check and verify final CI and deployment. No shared platform edits.
