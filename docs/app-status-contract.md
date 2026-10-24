# Video Lab App status contract

Copyright © 2026 Christopher Snow.

Both supported HTML entries mount the same control under the header. Closed status includes the embedded source commit and deterministic build suffix; the source commit link is in Version. Offline completeness and deployed freshness are separate state dimensions. Shared labels follow Video Lab issue 6 and the related Assembly Lab 35, Metadata Systems 2 and GPU Lab 22 issues.

## Published metadata and identity

`release.json` is same-origin and excluded from offline snapshots. Shape: `{commit: string|null, build: string, version: string, bytes: number}`. Commit is a real forty-character source SHA when available. Build is a deterministic SHA-256 over sorted production source/public/platform/scripts/config/lockfile input names and bytes plus commit; it distinguishes changed production inputs under the same commit. The HTML/JavaScript embeds that identity at build time and never adopts fetched identity as its running version. Source archives use their build hash and explicitly lack a source commit.

The build script derives `version` from the actual asset manifest, encoder manifest and worker sources. `bytes` is the exact combined full offline total, including manifest-described media and tools. Asset entries have path, byte length and SHA-256 integrity. Changed inputs create new worker/cache identity. Pinning the lockfile/build toolchain supports reproducibility; the actual manifest hashes, not input identity alone, verify each prepared asset set.

Checks use network-only fetch with a unique query, AbortController timeout, response/schema validation and generation fencing. The worker deliberately does not intercept release.json or sw.js. Opening, reconnect, visibility/focus and visible connected one-minute polling trigger checks; in-flight deduplication and short event throttling avoid concurrent bursts. Checks do not download media or processing tools. A failed/offline check never becomes Up to date based on a cached snapshot. An existing pending update badge survives uncertainty.

## Preparation, snapshots and restart

Each release stages into its own base-path cache; encoder assets retain their versioned cache. Presence is not completeness: saved responses must have the expected status, length and SHA-256. Reuse is permitted only after verification, including older caches. Progress reports actual verified bytes of the requested operation; before measurable progress it is indeterminate. Abort leaves partial new assets resumable and the previous active snapshot intact.

The active snapshot stores the exact lesson/encoder manifest and cache names. A prepared record does not authorise selection. A safe explicit restart records activation intent only after every affected app window acknowledges its guards and freezes interaction. Missing acknowledgement, active processing/saving, composition or actual non-durable work aborts the attempt and unlocks participants. The committed worker must take control and reach activated state before the participating document reloads; unrelated controller changes never reload it. Hash routes and per-window saved command drafts survive.

If all windows close while an update is merely prepared, natural worker activation retains the previous snapshot. The next launch still has the pending update and can explicitly restart using the now-active worker. No automatic reload or hidden activation permission is inferred from a prepared marker. Online-only first registration may control an existing online document without reloading it; preparing does not opt into the separate processing-tool download.

## Legacy and removal

Legacy string STATUS, DOWNLOAD, ENCODER_STATUS, DOWNLOAD_ENCODER, REMOVE_ENCODER and ACTIVATE remain recognised. Old string download commands retain one final reply; structured requests add progress and complete-download/preparation operations. Old lesson-only caches are incomplete until the same full-download action verifies tools as well.

A one-time old-protocol migration recognises pre-contract caches and prepares the replacement while retaining the old copy. An older window cannot acknowledge the new guard protocol, so it is never forcibly reloaded. Save work and close old windows, then reopen online to finish that migration. Subsequent App status updates use explicit intent. Application IndexedDB databases, historical captured-origin records, local/session drafts and achievement keys are not migrated destructively.

Remove offline copy confirms and cancels applicable downloads, then deletes only names prefixed `video-lab-offline:<base pathname>:`. It keeps the lightweight controlling registration to avoid the demonstrated still-controlled unregister/re-register race. Registration/empty caches never earn an availability claim. Removal does not clear origin storage, user media, notes, answers, notebooks or sibling-course caches/registrations. Older complete releases remain available during failed replacement; their cache reclamation is through explicit scoped removal.

## Evidence

The browser fixture builds a real second asset set in an isolated source tree, with an added production asset and unchanged source commit. It does not rewrite a compiled bundle or inject a fake worker version. Browser suites and independent scripts exercise both sets at real HTTP origins, real worker caching/activation, raw WASM output, actual downloaded media and native inspection. Physical OS install/Safari/assistive-audio checks remain separate limitations, not inferred from automation.

Preparation carries the expected metadata build and manifest version. A worker from another deployment rejects that request before downloading or marking ready; the caller's postcondition check is additional protection. Activation control RPCs are bounded separately from long media/download transfers, including an already-active deferred worker. A final cohort check aborts if another window joined during acknowledgement.

Full download/resume repairs the selected active snapshot; PREPARE stages the worker's own release. Structured requests bind both operations to the expected build and manifest version before any readiness marker is written. Explicit full-download intent persists across partial failure/eviction and is removed with the offline copy, so replacement preserves the requested completeness. Active App status downloads/removals veto another window's restart; the window initiating a safe explicit restart can acknowledge its own restart operation.
