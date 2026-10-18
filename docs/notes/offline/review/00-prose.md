# Separate offline UI prose draft

Copyright © 2026 Christopher Snow.

Read the offline plan, verified fact brief and current repository instructions on 18 October 2026. Applied the British English and clarity guidance from Assembly Lab's style guide already read in the earlier drafting assignment. This separate pass created only `src/offline/strings.ts` and this record. No implementation or browser review is claimed.

The verified brief reports a complete asset download, checks before readiness, recorded-media seeking support and twelve passing range tests. This copy describes those checked capabilities without exposing service workers, caches or integrity mechanisms. It makes no fixed download-size claim. Readiness is described as a complete copy in one browser on one device, rather than permanent storage or account synchronisation.

Drafted full status messages and action labels for the requested keys: title, description, idle, downloading, ready, offlineReady, offlineMissing, checking, current, updateReady, failed, unsupported, download, retry, check, reload and limits. Failure and missing-file messages explain recovery without claiming the browser is disconnected solely from its network-status flag. Update wording leaves the current lesson uninterrupted until the learner requests reload and names the consequence for other open tabs. Previously saved local challenge work and notes remain distinct from the downloaded app files.

Sentence pass: direct actions, short status messages, no implementation vocabulary or promotional claims. Meaning pass: an initial online download precedes offline access; incomplete download cannot claim readiness; browser storage and private-session limits are explicit; external source links still require internet; online use remains available when offline saving is unsupported. The builder must check message-to-state bindings and the rendered control context before independent learner, sceptic and checker reviews.

## Failure-state wording follow-up

The independent reader reported that the generic failure message suggests online use even when an unsuccessful update leaves a complete saved copy available offline. The builder supplied the verified state distinction: `ready=true` with a failed update notice retains that copy. Drafted `updateFailed` for this state only. It confirms offline availability first, explains that the update check or download did not finish, and directs recovery through the exact “Check for updates” action after checking connectivity and storage.

Also broadened `offlineMissing` to “No complete offline copy is available in this browser”. This covers both a never-downloaded site and an incomplete saved copy without asserting that a prior download occurred. These are prose changes only. The sceptic still needs to validate the findings and the builder must bind the new message to the verified state; this drafting follow-up does not claim either review or implementation.
