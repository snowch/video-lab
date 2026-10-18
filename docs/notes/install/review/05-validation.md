# Installation validation

Copyright © 2026 Christopher Snow.

Final local command on 18 October 2026:

```sh
npm run check
```

Exited 0. Formatting, source copyright, unchanged shared-platform hashes and strict TypeScript passed. All 27 unit tests passed, including the manifest identity and icon-dimension contract. Native FFmpeg checks passed for both modules. Production build passed; the complete offline bundle contains 172 files and 8,972,829 bytes. All 85 browser cases passed across Chromium desktop/phone in light/dark and Firefox desktop, including parsed app identity, installation eligibility, controlled prompt lifecycle, offline icon/manifest availability, and the complete existing lesson/offline/update suites.

The repaired storage-loss fixture separately passed 15 cases (three repeats in each of five browser projects):

```sh
npx playwright test tests/offline.spec.ts --grep 'incomplete download' --repeat-each 3
```

Earlier failures and fixture changes are recorded in `03-resolution.md`; automatic retries remain disabled. The final full run supersedes those failed gates. The independent checker verified the built feature and separately reviewed the final fixture changes; see `04-checker.md`.

The desktop/home-screen image is original SVG geometry with reproducible PNG exports. Chromium's real parsed manifest and eligibility were checked; synthetic prompt events do not establish native OS installation. Safari/iOS/physical Android/Windows shell icon placement was not tested in this Linux environment.

Deployment uses the existing main-triggered GitHub Actions checks and Pages workflow. The public-site follow-up verifies the deployed bundle version, exact icon bytes, parsed identity/eligibility, visible instructions, and offline reopening; deployment and live results are reported after the workflow completes, not presumed from this local pass.
