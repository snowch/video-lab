# Actionable guidance validation

Copyright © 2026 Christopher Snow.

Local checks:

- `npx prettier --check .`: passed for the integrated source; recheck after review records/artifact relocation.
- `npx tsc --noEmit`: passed.
- `npm test`: 119 unit tests passed in 28 files.
- `npm run build`: passed; 225 offline assets, including the revised references and existing audio/media.
- `npx playwright test tests/codecs.spec.ts tests/recording-guide.spec.ts tests/format-visuals.spec.ts tests/formats-images.spec.ts -g 'codec|optional recording|format references separate|image sources, touch'`: 28 passed, seven intentionally skipped, 42.1 seconds. Covers desktop/phone light/dark and Firefox, existing audio replay/single-player behaviour, offline codec reference/audio, active command/source/draft preservation, new focused deep links/fresh load/reload/Back, edited export draft through the example link, recording overview → Files → Import files, preserved legacy source/draft, existing format diagrams and no processing download merely reading.
- Standalone factual browser operation before prose: pinned WASM `ffprobe drawing-01.png` reports png, rgba(pc), 640x360 and nominal25fps. Native probe agrees on codec/pixel format/dimensions. This is input-metadata evidence; slideshow timing still comes from its command. No new codec efficiency, quality or compatibility measurements claimed.

The source audits and independent built learner/sceptic/final checker records distinguish their source, browser and screenshot checks from the automated suite. All reviews use actual built pages and inspect phone/desktop light/dark; they do not claim to test every receiving device or rerun unchanged OS capture commands. Review artifacts are outside the repo under `/workspace/scratch/actionable-guidance/`.

Full `npm run check` must pass on the final reviewed revision before merge. Permanent CI run links, exact full-suite results and merge state are recorded in the PR. No full local suite pass is claimed.
