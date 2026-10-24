# Separate prose draft — App status

Copyright © 2026 Christopher Snow.

A separate drafting agent read AGENTS, the verified issue-6 fact brief, the current Video Lab issue and the related Assembly Lab, Metadata Systems and GPU Lab issue bodies. Drafted only `src/app-status/strings.ts` and this record; no component, worker, storage, test or deployment changes were made.

The shared labels retain the exact requested App status, Version, Offline access and status/action wording. Version freshness and offline availability have separate messages: failure to reach the published release does not imply loss of an offline copy, and a saved copy does not establish freshness. The loaded source identity is described without substituting the fetched identity; a source archive says no source commit was recorded.

The download description covers lessons, practice media and browser processing tools in one action. Size and progress are supplied by the implementation; no example totals or timer percentages appear in the copy. The progress label is “Saved and checked”, because verified bytes may be reused rather than downloaded again. Download failure is generic; the previous-copy reassurance is a separate string which must be rendered only after verifying that copy.

Restart explains the effect on all open Video Lab tabs and windows before the action, preserves only saved work, and tells the user to finish processing/typing and save or download unsaved work. Failure guidance includes closing older tabs after saving, because they may not participate in the safe-restart contract. It does not expose worker names, message types or locks.

Removal confirmation names only downloaded app assets and explicitly preserves imported/generated files, drafts, notes, answers and other apps/courses. Unsupported environments retain online use. The limits distinguish browser-local storage, network-dependent external links and separately installed native tools. No claims of OS installation, automatic editorial approval or fabricated completeness are added.

This is a draft from the verified brief, not independent evidence that the implementation honours these promises. The managing builder must recheck any changed technical claim, and the built-page reader, sceptic and checker must cover every rendered state and its actions.

Follow-up lifecycle labels distinguish cancellation from failure: “Update download stopped. Your current version stays open. Choose Update to resume.” is separate from the offline-download Resume message, so an interrupted replacement does not imply that a complete saved copy has become incomplete. “Removing offline copy” names deletion already in progress; “Retry removal” is the recovery action after a failed removal. These additions preserve the shared required states and omit registration details.

The in-progress cancellation label is “Stopping download”. It covers cancellation requested while registration or a transfer is still finishing, without claiming that cancellation has already completed. The paused message follows acknowledgement and cleanup.

The size-check failure message is “The download size is unavailable. Connect to the internet and choose Check for updates.” It is shown only when no measured total is available and the release check failed or cannot run offline; it does not substitute an estimated size or suggest starting a download without the required total.
