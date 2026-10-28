# Formats and images: integration validation

Copyright © 2026 Christopher Snow.

28 October 2026. These results distinguish implementation checks, independent review and the final repository gate.

- `npx tsc --noEmit`: passed.
- `npm test`: 27 files, 116 tests passed, including numbered-input staging and excluding replaced outputs from input evidence.
- `npx prettier --check .`: passed.
- The first full gate reached browser test discovery, then exposed a Node 24 JSON-import requirement in the shared practice-asset module. Added the explicit `with { type: "json" }` import attribute. Strict typecheck and discovery of the complete browser suite then passed; the full gate is rerun after that correction.
- Initial focused Playwright run across desktop light, phone dark and Firefox: nine passed, six intentionally skipped, three failed solely because the new test expected uppercase `MKV` while the reference correctly displayed Matroska and `.mkv`. Corrected that assertion. The actual eight worked/practice media paths and offline execution passed.
- `npx playwright test tests/formats-images.spec.ts --grep 'touch argument'`: all five configured browser/theme/device projects passed after the assertion correction. This verifies all four source sets, image previews, builder edits, doubled text, appendix and glossary links, and no processing-tool download just for reading.
- Native and pinned-browser command records cover all eight worked/practice commands. Integrated tests additionally download and independently decode outputs, inspect duration/rate/dimensions/audio, held-picture stability, numbered-picture order and persistent overlay/transparent regions. Practice metadata failures and explicit output replacement are exercised.
- `node scripts/image-media.mjs`: passed on host FFmpeg 7.1.5 and a clean Ubuntu 24.04 container using FFmpeg 6.1.1-3ubuntu5 and Node 24.19.0. See `media-facts.md` for the narrowly documented pixel-format reporting difference and exact container reproduction. Source hashes, full decoding, every-frame order and transparency checks remain strict.
- Independent reader, sceptic, ranked fixes and rebuilt checker are recorded in `02-reader.md` through `05-checker.md`. The checker reports no remaining findings. Their reports state exact execution and visual coverage without claiming physical-device, exhaustive accessibility or subjective audiovisual validation.

The final merge gate is the repository's unchanged `npm run check` entry point, including the added image-media verification and the full browser suite. Its final local result and GitHub Actions check links are recorded in the pull request; deployment must subsequently match the merged commit. Focused checks above are not a substitute for that gate.
