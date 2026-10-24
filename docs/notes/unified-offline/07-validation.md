# Final validation — one offline download

Copyright © 2026 Christopher Snow.

The final `npm run check` passed formatting, copyright, synchronised platform verification, strict type checking, all 73 unit tests across 15 files, recorded-media/course checks, production build and all 190 Playwright browser tests in 4.7 minutes. The browser projects cover desktop and phone light/dark plus Firefox. No source changes followed this completed gate.

The final focused command `npx playwright test tests/offline.spec.ts --project=desktop-light --project=firefox` passed all 10 tests, including real-worker legacy lesson-only repair, unavailable/corrupt tools, retry reuse, tool eviction after Check for updates/focus, complete offline hashes and multi-tab update failure/recovery. The earlier focused journey/workbench/offline/workspace suite passed 17 tests before the minor stale-notice fix. The earlier full gate was deliberately interrupted when the sceptic found that issue and is not reported as passing.

Standalone Chromium and Firefox rehearsals tested one combined download, offline reload, actual WASM probe/encode, native ffprobe validation of the downloaded one-second output and the optional working entry's actual offline probe. Those rehearsals preceded the stale-notice fix; the independent final checker separately verified that fix, legacy repair and real offline processing against the final built bundle. Initial rehearsal selector mistakes are documented in 05-fixes and are not counted as successful runs.

The final locally reviewed combined package was 41,849,693 bytes, computed from the two manifests; commit stamping may alter the published lesson byte total, so public verification must compare its own manifests. Logs: `/workspace/scratch/unified-offline/check-final.log`, `fix-tests.log`, `focused.log` and `public-local-final.log`. Public workflows and saved-copy upgrade require the deployment record.
