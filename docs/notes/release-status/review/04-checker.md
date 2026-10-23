# Release footer — independent built checker

Copyright © 2026 Christopher Snow.

23 October 2026. Independent gpt-6.1-sol checker, high reasoning effort; I authored neither the footer, its strings, its fixes nor its repository tests. Read `AGENTS.md`, the plan, reader, sceptic and resolution, then checked the actual production preview at `http://127.0.0.1:4173/video-lab/`. I changed no application source.

Checked **`assets/index-DnYZmfnU.js`**, fetched SHA-256 **`8a9c18579b7153e7a421741233c784ed0ae598193bcc9a969544a7c036d44696`**. Its running commit and actual `release.json` both identified **`3dc7da2e0f8cf36c58a6677f33686fef19894a35`**. This identifies the reviewed local build, not verification of a subsequent public deployment.

## Verdict and R1

**R1 accepted as resolved. No additional independent-review blocker found within this focused coverage.** The built mismatch hint reads:

> If you saved an offline copy, open Offline access and app installation, select Check for updates, then use Reload to use update when offered. Otherwise, refresh the page while connected.

In fresh contexts, the named panel had Download for offline use and no Check for updates. The corrected conditional instruction gives those visitors an available refresh route without requiring that unrelated download. I actually refreshed a fresh online page: it returned to the matching tick, retained my editing note, and still had no service-worker registration. In saved-copy contexts in both Chromium and Firefox, Check for updates was available and an actual same-build check completed successfully. I did not manufacture a newer waiting worker for this footer check; “when offered” correctly qualifies Reload, whose separate lifecycle review remains in issue-3's checker supplement.

## Independently observed behaviour

| Check | Actual built result |
| --- | --- |
| Valid matching full commit | `✓ Matches the published version` |
| Valid different full commit | `✕ A different version is published`, with corrected hint |
| Different full commit sharing the running SHA's first seven characters | Cross, establishing that the comparison is not limited to the visible abbreviation |
| Invalid metadata or aborted request | `? The published version could not be checked`; no false tick |
| Disconnection after a successful check | `? Offline: cannot check the published version` |
| Reconnection plus explicit standard online event | Matching tick returned |
| Seven-character link | `3dc7da2`, with full SHA in title and the exact GitHub `/commit/<full-sha>` href |
| Keyboard Enter on the commit link | Navigated to that full-SHA URL; GitHub response intercepted locally solely to check navigation |

For the state sweep I used controlled metadata responses, real browser fetches to the built preview, focus events and offline emulation. Each context retained a deliberately entered editing note and an in-memory document sentinel, with **zero spontaneous main-frame navigations or beforeunload events**. There were zero uncaught page errors in the five completed state sweeps. The footer did not activate an update or replace the document when the published commit differed.

The primary sweep used Chromium desktop **1440 × 1000**, light and dark; Chromium phone **390 × 844**, light and dark; and Firefox **390 × 844**, dark. Every checked document width equalled its viewport width. I visually inspected all four Chromium mismatch screenshots: the status words, SHA link and complete conditional hint were legible and wrapped without horizontal overflow. Retained examples: [desktop light](evidence/checker-desktop-light.png) and [phone dark](evidence/checker-phone-dark.png).

## Offline boundary

In Chromium phone-dark and Firefox phone-dark, I actually downloaded the baseline copy and confirmed the saved-copy check control worked. The generated offline manifest omitted `release.json`, and the initially populated lesson cache contained no release endpoint.

I then deliberately inserted false `release.json` metadata into that lesson cache. A direct, query-free `fetch(release.json, {cache:"no-store"})` still returned the actual server commit; its browser response reported **`fromServiceWorker() === false`**. After disconnecting and reloading from the genuine saved lesson copy, the footer retained the running SHA but reported offline uncertainty. A direct release-endpoint fetch rejected despite the deliberately planted cached response. Thus the endpoint is not silently served by the lesson worker even if a matching cache entry exists. The poisoned cache existed only in the isolated checker contexts.

Source inspection additionally confirmed no-store requests with fresh query values, full forty-character validation/comparison, superseded-request generation guards, abort/cleanup, and rechecks on focus, visibility, connection and a visible/online interval. These source observations do not replace the directly observed checks above.

## Commands, quality attribution and limits

Independent checker scripts, structured results and all five context screenshots remain under `/workspace/scratch/release-checker/`:

```sh
node /workspace/scratch/release-checker/check.mjs
node /workspace/scratch/release-checker/link-refresh.mjs
```

Both commands exited **0**. The first completed five context sweeps, including both actual saved-copy/cache tests; the second checked same-abbreviation/different-full-SHA comparison, fresh online refresh without registration/download, note retention and keyboard navigation. `results.json` records the fetched build hash and per-context evidence; `link-refresh-results.json` records the targeted follow-up.

The builder's full `npm run check` is separate. During this review the builder reported an initial gate with 110 browser cases passing and five failing: the existing cancellation test's global status locator also matched the new footer status, in all five projects. The builder narrowed that test to the main processing region, without changing application code, and started a fresh full gate. I do not claim the pending rerun passed or treat a test-selector correction as independent product validation. Final gate, CI and live results belong in the builder's separate verification record.

Limits: browser-emulated devices and network states, not physical mobile hardware, a screen reader, a deployment rollback or a real network reconnection. Reconnection deliberately dispatches the standard online event because Firefox automation can omit it after a cached reload. I did not wait through the 60-second interval, inject a ten-second fetch timeout or race superseded responses; those paths were source-reviewed only. I did not access the remote GitHub commit content, run the full quality entry point, repeat the whole media/course suite or verify public deployment. The focused footer verdict does not declare later quality or deployment gates green.
