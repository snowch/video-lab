# Independent learner review: visual format references

Copyright © 2026 Christopher Snow.

Reviewed 29 October 2026 by a separate reader agent who did not draft or implement this slice. Browser inspection and initial findings preceded reading `01-plan-facts.md`, `02-prose.md` or production sources. Read `AGENTS.md` first, and subsequently checked the local/upstream plan, authoring and style prerequisites held in `/workspace/scratch/visual-formats/`. No production files changed. This is a learner review, not the separate sceptic or final checker verdict.

## Built page and evidence

Used standalone Node Playwright with headless Chromium against `http://127.0.0.1:4188/video-lab/`. Observed script bundle `assets/course-DrPKROMs.js`; this record applies to that build, before later ranked fixes. Routes inspected were `#/appendix/formats`, `#/appendix/formats/video-containers` and `#/appendix/formats/pixel-formats`. The short route names in the review brief were resolved from the actual page links.

Created and visually inspected full-page screenshots for all three pages at desktop 1440 × 1000 and touch phone 390 × 844, in rendered light and dark themes. Evidence is under `/workspace/scratch/visual-formats/reader/`, named `<formats|video-containers|pixel-formats>-<desktop|phone>-<light|dark>.png`. Additional evidence includes `alpha0-desktop.png`, `alpha1-desktop.png`, `pixel-phone-touch.png` and `details-{desktop,phone}.png`.

## Ranked findings

1. **R1, medium: the pixel enlargement does not enlarge its selected source.** The introduction says “This enlarged 2 × 2 example makes four positions visible”; the caption begins “Conceptual enlargement”. However, the white selection box is placed over a cyan/green diagonal source, while the enlarged four cells alternate green/yellow in vertical columns. The arrow visually asserts correspondence that the colours and structure do not support. “Illustrative colours” explains provenance but does not explain a change between two connected views. A learner may conclude enlargement changes pixel colours or that the highlighted source is decorative. Evidence: `pixel-formats-desktop-light.png` and `pixel-formats-phone-dark.png`, first figure. Direction: make a small explicit source pixel grid and enlarge exactly the same selected four cells, sharing their colours; retain the brief explanation that this is an illustrative picture. This is a visible consistency issue independent of measured-media provenance.

2. **R2, low: inherited prose repeats the remuxing explanation after its new complete example.** Above the figure: “Remuxing reads encoded streams from one container and writes them into another. Stream copy keeps the encoded media without encoding it again, provided the destination container accepts those codecs.” Below it, “Remuxing and encoding” starts: “Remuxing writes encoded streams into a new container without encoding them again, when that container accepts them.” Renaming also recurs in the caption, Extension definition and final sentence of this block. The new source/destination figure already carries the copy mechanism, so the following definition adds scrolling without a fresh inference, particularly on phone. Evidence: both video-container desktop screenshots and phone screenshots. Direction: keep one complete definition beside the diagram and retain only the later block's unique distinction about codec encoding and FFmpeg writer selection; consolidate the rename warning.

## Learning substance and prerequisites

The three-page split is useful: the overview answers material/destination choices, containers explain membership and copying, and pixel formats explain picture storage. The container boxes carry the relation between a file and its streams; the copy comparison carries the invariant stream names through a change of container. These are useful diagrams once R2 is resolved. The overview's three-way group is principally a readable decision summary rather than a mechanism diagram, which is appropriate to its job.

The sampling control demonstrates a meaningful comparison: the same four Y samples remain while U/V change between four, two and one values. Its single vertically stretched cell at 4:2:0 does not imply a smaller output picture because the caption explicitly says the picture dimensions stay unchanged and limits the grid to counts/grouping. The alpha control directly demonstrates partial visibility and the same opaque foreground on different backgrounds, so it adds evidence that prose alone would make the learner imagine. The first pixel figure would supply the missing bridge from whole picture to the sample comparison after R1.

No additional prerequisite blocker found in the new material. Pixel, sample, luma, U/V colour differences and alpha are defined before their controls; the existing option explanation defines eight-bit sample storage before the comparison. Container, stream and codec are introduced before the container figure, followed by the direct demuxer/muxer definitions. Ordinary file, browser and command familiarity fits the engineer audience. Codec names and format-family names in reference cards are identifiers to recognise, not undisclosed computations needed to operate the diagrams. Bit precision and planar layout remain optional detail after the primary comparisons.

## Controls, navigation and persistence

- All 12 page/viewport/theme combinations had document scroll width equal to client width: 1440 or 390 px. No horizontal page scrolling observed. Phone stacks container streams and alpha previews without losing labels or substance; the three sampling components remain comparable.
- Native radio keyboard ArrowLeft changed 4:2:0 → 4:2:2 → 4:4:4, moved checked/focused state, and updated the visible counts and explanation correctly. Touch taps selected each of the three patterns.
- The alpha slider exposes the accessible name “Foreground alpha:”. Keyboard Home/End produced 0.00 transparent/1.00 opaque and the corresponding actual foreground disappearance/appearance in screenshots. Touch at approximately a quarter and three quarters produced 0.25 and 0.75. Initial 0.50 shows both background patterns through the foreground.
- “Precision and storage layout” opened with Enter and touch, revealing the format-specific text without leaving the page. Closed details do not hide guidance required for the primary interactions.
- Followed pixel → containers → media formats → pixel links and the course link “Read the file description”; checked settled headings and actual routes. Each reference also worked on direct entry and after reload.
- Entered a distinctive `ffprobe -hide_banner bunny-short.mp4` draft in the inspection lesson, visited the pixel reference, then used browser Back. The draft survived both Back and lesson reload. No tool execution or tool download was needed for reference reading.

## Concerns considered and rejected

- **Every conceptual caveat is redundant:** rejected as a blanket concern. Membership versus physical byte position and sample grouping versus exact sample position are concrete potential misreadings. The CSS-alpha caption distinguishes a real rendering from codec behaviour and gives the useful composition-before-export consequence. R1's first-figure caption could become shorter after the drawing is corrected, but sentence length alone is not another ranked defect.
- **4:2:0 removes three quarters of the picture pixels:** rejected. The same Y group is retained, all changed sample counts are labelled, and the caption explicitly preserves picture dimensions. The source FFmpeg 5.1.4 pixel-format definitions subsequently corroborated the shown 4/2/1 chroma counts.
- **The diagrams claim actual MP4-to-Matroska processing or measured sample colours:** rejected. Their captions explicitly identify an illustrative/conceptual example and state that the diagram does not run FFmpeg or create a file.
- **Need a mandatory exercise before optional reference controls:** rejected. The task is an optional reference comparison, with no graded advancement or unshown knowledge required. The small fixed 2 × 2 group is already a complete comparison; a further preliminary activity would repeat it.
- **A subtitle track must appear in every container:** rejected. The MP4 is explicitly an example, and the caption allows other stream combinations. Matroska's card separately mentions selectable subtitles.

These focused browser checks were run as standalone Node scripts, without invoking the repository's Playwright CLI, full test suite, build or `npm run check`. They do not constitute final verification of subsequent fixes or a green full quality gate.
