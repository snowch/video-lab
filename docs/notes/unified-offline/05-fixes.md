# Ranked fixes — one offline download

Copyright © 2026 Christopher Snow.

The sceptic retained one minor correctness finding: after Check for updates, a missing cached WASM asset produced false readiness but left the previous “up to date” notice visible. Fixed refresh to clear only that stale `current` notice when either package is incomplete. Downloading, failure and activation notices retain their distinct meaning. The displayed status then explains the incomplete download and offers the same repair action.

Extended the real-worker legacy/eviction regression to check for updates, remove WASM, dispatch focus and assert the incomplete message before reloading or repairing. No cache, protocol, user-storage or processing changes were needed for this fix. The reader's one-action, summed-size, real offline-processing evidence remains applicable; checker reviews the final built bundle `course-It_gUWUO.js`, SHA-256 `ba73b36641939155b5117cc578299c2662b658c149ff4bd1e94ae0de1ec97588`.

The earlier full quality run was deliberately interrupted after this new finding; it is not counted as a completed gate. The complete final gate must be rerun after the fix. The initial standalone public rehearsal also corrected two harness selectors (nested installation details and duplicated preview/dialog download buttons); only the completed Chromium/Firefox rehearsal is counted as passing.
