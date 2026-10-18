# Offline validation

Copyright © 2026 Christopher Snow.

## Initial full check

On 18 October 2026, `npm run check` passed formatting, source copyright, the unchanged shared platform check, strict TypeScript, 26 unit tests in five files, native verification of both modules' recordings/stills, production build and 70 Playwright cases. Browser projects: desktop Chromium light/dark, Pixel 7 Chromium light/dark, Firefox desktop light. The browser suite took about 1.3 minutes. Local log: `/workspace/scratch/offline/full-check.log`.

The first offline-specific pass found an initial-download retry bug (a failed registration with no worker was reused). The implementation now re-registers that case. The test suite also exposed an incorrect update-fixture regex and a reload assertion racing navigation; these were test harness issues and corrected before the passing run. All 20 offline cases passed before the initial full check.

After the full check, the background-update status follow-up passed the update scenario in all five browser projects: `npx playwright test tests/offline.spec.ts --grep updates` (5 passed). The review resolution and final check are recorded below when completed.

## Scope and limits

Tests use real HTTP origins with HTTP caching disabled, then Playwright's network-disconnected context. Every saved file is verified by SHA-256 while disconnected. Native video playback and seeking, grading, persisted notes/completion, reopening a new tab, failed downloads, corrupt content, retry, missing cached-file repair, failed/successful/background updates and other-cache preservation are covered. The independent reader additionally closed and reopened a persistent browser profile while offline.

Browser-managed quota exhaustion and eviction were not forced; tests inject unavailable/corrupt assets and delete a saved file. Actual Safari/WebKit, physical mobile devices and screen readers are unrun. Network simulation is through browser automation, not physically removing a connection. Public deployment verification follows the Pages workflow and is reported in the task delivery; the local check alone does not establish deployment.

## Final check after review fixes

`npm run check` passed again after the final app changes and corrected lifecycle test: formatting, copyright, unchanged platform, strict TypeScript, **26 unit tests**, all native media verification, the complete production/offline build and **70 browser cases** (about 1.4 minutes). Log: `/workspace/scratch/offline/final-check.log`. No check was skipped. The original Vite large-bundle advisory and the existing Zod annotation warning remain non-failing build advisories.

A preceding check exposed the builder's incorrect assertion that a disconnected update check must fail even while an update already waits. As the independent sceptic observed, the browser can return its existing waiting update. That assertion was corrected to accept the actual waiting state, then a genuinely failed newer installation (required asset HTTP 503) was used to verify the combined error/waiting explanation. The corrected targeted update suite passed all five projects before the final full check. This history is retained in `04-resolution.md`; the failed run is not counted as a green check.

The final production bundle contains 165 saved assets. Its generated manifest and worker are content-versioned; the build can reproduce them from committed source and the lockfile. Deployment is authorised to `main` under the owner's standing instruction. The Pages workflow reruns the same full check before deployment. Public-site offline verification is performed after workflow success, rather than inferred from the local results above.

## Network-confirmed update check

After the final manual-update truthfulness correction described in `04-resolution.md`, `npm run check` passed once more: **26 unit tests**, native media verification, production build and **70 browser cases** (1.4 minutes), plus formatting, copyright, unchanged-platform and type checks. No skips. Log: `/workspace/scratch/offline/network-confirmed-check.log`. The final saved-asset payload is **8,956,332 bytes across 165 files**. The waiting-update regression now also requires a disconnected manual check to report failure while preserving the available update's explanation. The final checker follow-up verifies this behaviour independently.
