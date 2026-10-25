# Runtime exit adapter — integration and fixes

Copyright © 2026 Christopher Snow.

The source investigation in 01 defines the bounded fix. The implementation keeps vendor JS/WASM unchanged, verifies their exact pinned hashes and adds a separately manifested adapter. It intercepts only the intentional exit after native code records a status; unexpected runtime faults still log and reject. Real command output is not filtered. Nonzero statuses, existing-output preservation, ffprobe validation and timeout/cancellation handling remain in place.

The separate prose pass updated provenance, current export guidance and the historical-run note. Fresh notebook records carry a runtime marker; saved records and raw logs are never rewritten. The note appears only on accepted historical runs with an exact bare abort line. Rerunning uses the current engine.

The fresh reader reported no change-specific findings; the independent sceptic accepted that result and checked the technical mechanism, original vendor bytes, output identity and genuine faults. The checker verified the built page, offline processing, partial-cache rejection and failed replacement preservation. No ranked reader fix was needed. During final integration, removed the obsolete optional-workbench shutdown explanation and dead legacy-CLI abort detection; the checker verified this limited integration separately. Raw logging callbacks are unchanged.

Focused validation: three adapter unit tests passed; the real-worker Playwright regression passed three cases with one intentional project skip across Chromium and Firefox. Coverage includes the reported five-second encode, native full decode, saved logs, real CLI errors, and injected genuine abort after valid probe JSON. Full repository and public-deployment results are recorded separately after completion.

The first full gate stopped at strict typechecking because two legacy journey assertions still referenced the removed cleanup-notice string. Updated those assertions to require no `Aborted()` in the actual output for normal success and ordinary option failure. This checks the fixed runtime behaviour directly. The accepted full gate runs after this correction.
