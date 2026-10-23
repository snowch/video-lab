# Release footer — independent built reader review

Copyright © 2026 Christopher Snow.

23 October 2026. Scope: only the new release footer and the update action it names, at `http://127.0.0.1:4173/video-lab/`. Reviewed bundle `assets/index-D-HnIeCX.js`, showing running build `3dc7da2`. Read AGENTS; did not inspect implementation/tests before trying the footer. No application edits.

## Finding R1 — Medium: the update instruction names a control unavailable to an ordinary online visitor

With a fresh browser context and no downloaded offline copy, I routed the deployed metadata response to a different valid commit. The footer correctly reported:

> “✕ A different version is published”
>
> “To update, open Offline access and app installation, select Check for updates, then use Reload to use update when offered.”

Following that instruction opens a panel which says:

> “No complete offline copy has been saved yet. Connect to the internet and download it before going offline.”

Its only relevant button is **Download for offline use**. There is no **Check for updates** button (also confirmed by the accessible button locator returning zero matches). A learner who uses the site online cannot follow the footer's named update path, and may infer they must download the offline bundle to update an ordinary open page.

**Direction:** Give an update route appropriate to the visitor's actual state. Ordinary online use and an installed/saved offline copy need not expose identical controls. Keep the existing offline-update instructions only where those controls are available, or make the named action available without requiring an unrelated offline download.

**Counterevidence:** The status itself is accurate and the wording says reload is used “when offered”. Existing offline-copy users may have the named check action. This is an action-handoff issue for the fresh online state, not evidence that metadata comparison or the offline update mechanism is broken.

Evidence: [different-version instruction](evidence/reader-different-phone.png), [panel reached by following it](evidence/reader-update-panel-phone.png).

## Observed states and strengths

| Condition | Visible result |
| --- | --- |
| Normal matching `release.json` | “✓ Matches the published version” |
| Different valid commit in routed metadata | “✕ A different version is published”, plus the instruction above |
| Invalid commit value in routed JSON | “? The published version could not be checked” |
| Metadata request aborted | Same unknown/check-failed wording; no false tick or cross |
| Context set offline after a matching result | “? Offline: cannot check the published version” |
| Context reconnected | Automatically returned to the matching tick |

The words make each icon understandable; colour is not the sole signal. “Different” avoids assuming a mismatching commit is necessarily newer. “Running build” makes the short identifier's role clear for the course's technical audience. Failure and offline states correctly describe uncertainty rather than claiming the saved version is current.

The short hash links to the full commit path `https://github.com/snowch/video-lab/commit/3dc7da2e0f8cf36c58a6677f33686fef19894a35`. Keyboard focus reached that link; Enter navigated to the expected destination, and Tab proceeded to Source and evidence. The GitHub response was intercepted solely to verify navigation without leaving the local review; the remote commit page's content/availability was not audited.

## Visual and scope checks

Viewed desktop 1440 × 1000 and phone 390 × 844 in light and dark. Footer lines and the longer mismatch instruction wrapped legibly. The inspected phone document width equalled its 390-pixel viewport, with no horizontal overflow. The footer remains secondary to lesson content. No additional justified readability or keyboard finding emerged.

State changes were exercised through browser request interception and offline emulation, not through an actual deployment rollback or a physical mobile device. This is a reader review of built behaviour, not full service-worker/cache verification or an assertion that the surrounding course was reviewed again. Additional captures are scratch-only under `/workspace/scratch/release-reader/`. Separate sceptic review should test R1 against the current build before fixes are accepted.
