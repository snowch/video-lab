# Running commit and published-version indicator

Copyright © 2026 Christopher Snow.

The footer identifies the Git commit compiled into this running app, linking its seven-character abbreviation to the full commit. A tick means the full commit matches a fresh same-origin published release.json; a cross means a different published build is available. Offline, checking, invalid metadata and failed network requests remain explicit unknown states. Compare the actual deployed build, not unpublished main commits.

Vite emits release.json and injects the same build SHA from GITHUB_SHA or local Git. The small release endpoint is excluded from the offline manifest and service-worker interception. Requests use no-store and a fresh query; check on load, focus, reconnection, visible-tab return and once a minute while visible/online. Abort superseded checks and clean listeners/timers. It never activates an update or reloads a recording.

Verify current/different commits, unknown/offline/reconnect, superseded requests and production metadata/offline exclusion. Use distinct prose drafting, built reader, sceptic, ranked fixes and independent checker under this directory. Full npm run check and CI/Pages precede live verification. Preserve existing project media, progress and pre-existing audit files.
