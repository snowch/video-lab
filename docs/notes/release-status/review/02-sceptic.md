# Release footer — separate sceptic

Copyright © 2026 Christopher Snow.

23 October 2026. Read `plan.md` and [01-reader.md](01-reader.md), then independently exercised the production preview at `http://127.0.0.1:4173/video-lab/`. The observed corrected bundle was **`index-DnYZmfnU.js`**, displaying running commit `3dc7da2`. Inspected release and offline source after viewing the page. No application edits, whole-course rerun or public-deployment verification were performed.

## R1 — Uphold original medium handoff issue; corrected guidance verified

The reader's original instruction always directed the visitor to “Check for updates”. In an independent fresh context with a different valid commit returned by the metadata endpoint, I opened the actual named panel: **zero** Check for updates buttons and **one** Download for offline use button. Source confirms that Check for updates is rendered only when the saved copy is ready. Thus the original instruction was genuinely unusable for an ordinary online visitor; it was not merely a preference about phrasing.

The current built footer says:

> If you saved an offline copy, open Offline access and app installation, select Check for updates, then use Reload to use update when offered. Otherwise, refresh the page while connected.

This supplies an available action for the fresh online case and keeps the existing update path conditional. It does not require downloading the offline bundle merely to refresh an ordinary page. “When offered” correctly avoids promising immediate availability of a waiting worker. The finding is addressed in the observed build. I did not simulate every evicted or partially saved cache state or rerun the existing multi-tab update lifecycle for this narrow wording correction.

Reject the broader interpretation that R1 establishes a broken commit comparison, broken update mechanism or a need for automatic activation. The original status was correct; the defect was the instruction following it. The implementation still does not activate a worker or reload a recording when a different commit is detected.

## Independent state and source checks

In **Chromium and Firefox**, with a 390 × 844 viewport in dark mode, I independently intercepted the release response and observed:

| Evidence | Actual result |
| --- | --- |
| Full commit matches running build | “✓ Matches the published version” |
| Different valid full commit | “✕ A different version is published”, with corrected conditional guidance |
| Invalid commit string | “? The published version could not be checked” |
| Aborted metadata request | Same unknown state; no false match/mismatch claim |
| Offline context plus explicit standard offline event | “? Offline: cannot check the published version” |
| Reconnected context plus explicit standard online event | Returned to matching tick |

Focus events also caused fresh checks during these cases. Both observed phone document widths were **390 px**, without horizontal overflow. The earlier fresh-context mismatch/panel check used light mode. These are browser-emulated states and controlled endpoint responses, not actual remote deployments or physical-device connectivity changes.

Source confirms the running SHA and emitted `release.json` use the same validated build value; comparison uses the full forty-character commit rather than the displayed abbreviation. The request uses `no-store`, a fresh query, a ten-second abort, and generation checks that prevent a superseded response from replacing newer state. The offline builder excludes `release.json`; inspection of the generated offline manifest found no release endpoint. The worker only intercepts listed lesson/encoder assets, so the release check is not supplied from that cache. “Different” is accurate without claiming the published commit is necessarily newer.

## Reconnection claim and limits

The reported Firefox automation case—`setOffline(false)` changes `navigator.onLine` after a cached reload without emitting `online`—does not establish a defective application listener. My explicit-event checks verified that the application responds to the standard online event in both browsers. Source additionally checks on focus, visible-tab return and a 60-second interval while visible and online. I did not wait through that timer or independently reproduce the particular cached-reload automation discrepancy; those are distinct scopes. Reject an unqualified claim of a real-browser reconnection bug based only on that missing simulated event, while also avoiding a claim that every physical reconnection is certified.

No additional justified finding emerged. The corrected footer is suitable for the independent checker and full quality gate; this report does not declare those later checks complete.
