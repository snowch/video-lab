# Integrated verification

Copyright © 2026 Christopher Snow.

23 October 2026. `npm run check` passed locally: formatting, copyright, synchronised-platform check, strict TypeScript, 75 unit tests, native fixture/hash/picture verification, Module 2 and production media verification, production build/offline integrity and 125 Playwright cases across desktop light/dark, phone light/dark and Firefox (3.1 minutes for browser tests).

Before the full gate, a focused run passed 95 cases and failed five copies of one migration test. That fixture seeded an old project after visiting the new reference CLI had already marked migration complete. Removing the migration marker when constructing the simulated old installation corrected the test; all five migration cases and the complete final suite then passed. No application migration was changed to accommodate an invalid fixture.

Independent review records and the final checker are recorded separately; this builder's gate is not independent review. Deployment and live verification results follow when completed.

A separate actual-browser offline exercise saved the baseline and additional tools, disabled the context network, then reloaded. Both reference sources loaded offline; actual WASM saved the full ffprobe report and passed inspection, encoded the audio/video concat and passed decoded-picture checks, and retained checked progress after another offline reload. This script initially used the wrong string namespace, a closed tools disclosure and the wrong test attribute locator; correcting those harness mistakes yielded the complete pass without application changes.

The committed native evidence script was reproduced from the repository root with a fresh temporary output directory. It completed successfully and reproduced correct-join RMS 0.5173159003362846 and reversed-join RMS 5.471916940159089. No sample or synchronised platform files changed.
