# Validation

Copyright © 2026 Christopher Snow.

- `npm test`: 125 tests passed in 29 files, including six model tests pinning timing/counts, signed values and fixed signal/cycles.
- `npx tsc --noEmit`: passed.
- `npx prettier --check .`: passed after final integration.
- `npm run build`: passed; 225 offline assets.
- `npx playwright test tests/sample-rate.spec.ts tests/visual-teaching.spec.ts`: 17 passed, 3 intentional skips across all five browser projects (23.8 seconds after the reading/zoom fixes). This covers keyboard changes, sample count/spacing, unchanged curve/time and edited command, no encoder download, narrow enlarged-text layout, existing diagrams and literal raw output.
- The final axis-label extraction preserves identical labels/markup and received a fresh built-page check. Final hosted `npm run check` and deployment results are recorded in the pull request.

The independent checker record identifies the exact built checks and limitations. The local targeted run does not stand in for the full hosted quality gate.
