# Offline access

Copyright © 2026 Christopher Snow.

The owner requested offline app support on 18 October 2026. Apply the existing independent drafting, reader, sceptic, fixes and checker workflow, recorded in `docs/notes/offline/review/`. Deployment to main is already authorised.

## Slice

Save the complete production site on an explicit download: introduction, Modules 0 and 2, original recordings, all output variants, still pictures, evidence, scripts, styles and fonts. Generate a content-hashed manifest from the complete Vite output. Use browser Cache Storage and a service worker scoped to `/video-lab/`. No external runtime dependencies and no changes to the synchronised platform.

A worker installs only after all files are present and verified against build-time SHA-256 integrity. A failed download must never report ready. Missing browser storage can be repaired by downloading again. Serve complete cached assets, including single byte ranges for native video seeking. Unknown and cross-origin requests continue to the network. Cached document and hashed scripts stay on one release until an update is complete. Updates wait for explicit reload or closing old tabs. Existing local challenge work, theme and notes remain in localStorage.

## Verification and limitations

Unit tests cover range boundaries, suffixes, clamping, invalid ranges and 416 responses. Browser tests must cover download, network-disconnected reload and new tab, both modules and every recording variant, grading and saved work, a failed download and retry, missing cache detection/repair, update lifecycle, phone/desktop themes and no overflow. Inspect offline manifests against the complete distribution. Run the unchanged full check entry point before deployment and verify offline behaviour on the live Pages site.

Offline requires an initial successful online download in a browser with service workers and Cache Storage enabled, served over HTTPS or localhost. Browser storage may be removed by the user, private browsing expiry or browser eviction. External source links still need a connection. Actual Safari/physical phones are not the existing verified baseline.

Sources: MDN Service Worker API, CacheStorage, Request.integrity, HTTP Range requests, Storage quotas and eviction criteria; browser implementations and automated evidence are the immediate behavioural sources.
