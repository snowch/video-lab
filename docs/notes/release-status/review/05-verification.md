# Release footer verification

Copyright © 2026 Christopher Snow.

23 October 2026. Independent drafting, reader, sceptic, ranked resolution and checker records accompany this file.

## Local final gate

- `npx playwright test tests/release.spec.ts`: **10 passed**, across Chromium desktop/phone in both themes and Firefox, including genuine saved offline reload and deterministic online-event delivery.
- `npm run check`: **passed** after the scoped cancellation-status assertion correction recorded in 03-resolution.md. Formatting, copyright, shared-platform integrity, strict TypeScript, **54 unit tests**, native media verification, Module 2/journey fixture verification, production/offline build and **115 browser tests** all passed. Browser duration 2.7 minutes.
- `git diff --check`: passed.

Existing informational build warnings about dependency annotations and bundle size remain; they do not fail the gate. No shared-platform files or pre-existing learner audit files changed.

## Deployment

Published application commit: `3cf1a1ff09bc3aa4baa3cdc9b793d7fc24254bd6`.

- [Deploy GitHub Pages run 39945001879](https://github.com/snowch/video-lab/actions/runs/39945001879): **success**, including the full `npm run check`: **54 unit tests and 115 browser tests passed** (browser duration 3.1 minutes). Build and deploy jobs both completed successfully. Downloaded completed build logs to verify the exact counts.
- [Separate Quality checks run 39945001890](https://github.com/snowch/video-lab/actions/runs/39945001890): still running at closure, delayed in `sudo apt-get update && sudo apt-get install -y ffmpeg`, before browser installation or application checks. No result is claimed for that duplicate workflow. The Pages workflow independently executed and passed the same full quality entry point before publishing.
- `node /workspace/scratch/release-status-live.mjs 3cf1a1ff09bc3aa4baa3cdc9b793d7fc24254bd6`: **passed in Chromium and Firefox** against the actual HTTPS Pages site. Used inherited network proxy and trusted managed CA; Firefox imported that CA into its isolated test profile. No TLS bypass.

Both live engines verified the full commit link and same deployment SHA returned by fresh `release.json`, matching tick, different valid metadata producing a cross without reloading, a real baseline offline download followed by offline reload retaining the running SHA with unknown/offline status, focus recheck after reconnect returning to the tick, metadata absent from browser caches, and no phone-width horizontal overflow in dark mode. Mismatch was simulated by request interception in isolated test contexts; no server metadata was changed. No physical device/network or screen-reader claim is made.

Local build metadata used the then-current checkout SHA; production used GitHub Actions GITHUB_SHA. This closure changes documentation only and is committed with `[skip ci]`, so it does not replace the deployed application build. This also preserves the intended distinction between the actual published commit and later documentation-only main commits.
