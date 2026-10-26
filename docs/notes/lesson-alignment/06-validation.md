# Validation and deployment

Copyright © 2026 Christopher Snow.

Product commit: `0845a7cb0b97bff34585bf61477418903f0de2f1`.

## Local validation

`npm run check` completed with exit 0 on the final source: formatting, copyright,
platform sync, strict TypeScript, 85 unit tests in 21 files, native media facts,
51 native notebook commands, production/offline build, and 287 browser tests
passed; 38 existing project-specific skips (10.4 minutes for the browser suite).
No tests were removed or weakened for this CSS correction.

Full log: `/workspace/scratch/lesson-alignment/check.log`.
An earlier full run was deliberately interrupted for the enlarged-phone fix;
its exit 130 and partial results are recorded in `04-resolution.md` and
`check-interrupted.log`. The successful run above covers the correction.

The independent final checker passed 288 layout observations (24 pages × three
viewport sizes × two themes × normal/enlarged root text), six additional narrow
source checks, and actual loading, preview, builder, FFmpeg/ffprobe, raw log,
file dialog and navigation interactions. See `05-checker.md` for exact scope
and limitations. These browser checks do not claim physical tablet testing.

## Hosted quality gate

[Quality checks, run 40372434931](https://github.com/snowch/video-lab/actions/runs/40372434931)
passed on the product commit: 85 unit tests, 287 browser tests passed and
38 skipped; browser suite 16.7 minutes. Its complete log is
`/workspace/scratch/lesson-alignment/ci-quality.log`.

## Pages and public verification

[Pages run 40372435104](https://github.com/snowch/video-lab/actions/runs/40372435104)
passed and deployed the same commit. Its full quality gate passed 85 unit tests
and 287 browser tests, with 38 skips; browser suite 17.3 minutes. Log:
`/workspace/scratch/lesson-alignment/ci-pages.log`.

Published build: `9b56087c1d155759baa03a419af36452827561fefcbd97a6e0f8cfbe9c32b5e2`.
The release metadata and the embedded running identity agree on the product
commit. Complete offline bundle: 49,042,199 bytes.

`node /workspace/scratch/lesson-alignment/public.mjs 0845a7cb0b97bff34585bf61477418903f0de2f1`
passed against https://snowch.github.io/video-lab/: all 24 pages in six fresh
contexts (1440px light/dark, 820px light, 834px dark, 390px light and 320px dark).
It verified aligned prose/editor widths, load-action placement and no page
overflow. On the inspection page it also checked Files dismissal/focus,
200% root text, full-width phone filenames and loaded video. Public overview
still has no Files toolbar. The live 820px screenshot was visually inspected.
Results and captures: `public-results.json`, `public.log`, `public-*.png` in the
same external evidence directory.

`node /workspace/scratch/lesson-alignment/public-update.mjs 0845a7cb0b97bff34585bf61477418903f0de2f1`
updated the existing saved app from build `140ef64474b4d7958e762809e1391c4fe01bc6746f94d88746bd127b47a90b2d`
using its actual Check for updates → Update → Restart to update controls. All
nine file hashes and four complete saved cell records remained unchanged.
After closing the browser process and relaunching offline, the new build,
course index and Files controls worked. The inspection lesson at tablet width
retained the corrected equal-width column and adjacent tool label with no
page overflow. Evidence: `public-update.json`, `public-update.log`,
`public-updated-tablet.png`; persistent profile:
`/workspace/scratch/notebook/final-public-chromium`.

This evidence-only record is committed with `[skip ci]`; it does not change the
published app identity. The unrelated untracked learner-audit folder remains
untouched.
