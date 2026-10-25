# Compact status: separate prose draft

Copyright © 2026 Christopher Snow.

Drafted separately from the implementation using `01-facts.md` and the existing strings. Keep the title “App status”, the expanded headings “Version” and “Offline access”, and the existing explanatory/action copy. Use ordinary text badges so meaning is available without colour.

## Closed version badge

Reuse the existing short labels for successful and transitional checks:

| Existing state or condition | Badge |
| --- | --- |
| `checking` | Checking for updates |
| `latest` | Up to date |
| known update, not prepared | Update available |
| update `downloading` | Downloading update |
| prepared/pending update | Update ready |
| `offlineCheck` | Cannot check for updates |
| `failedCheck` | Couldn’t check for updates |
| `restarting` | Restarting Video Lab |
| `prepareUnavailable` | Update unavailable |
| `updatePaused` | Update paused |
| `restartFailed` | Restart paused |

Known pending/update evidence must survive check uncertainty. Show the current update operation where it explains the immediate state; retain the full existing reason and recovery text inside Version. “Restart paused” describes a blocked or failed restart without claiming any activation completed. “Update unavailable” describes preparation failure without claiming the running app failed.

## Closed offline badge

| Existing state or condition | Badge |
| --- | --- |
| `offlineIdle` | Not saved offline |
| `offlineSaving` | Saving offline copy |
| `offlineReady` / verified complete copy | Saved offline |
| `offlineIncomplete` | Offline copy incomplete |
| `offlineUnavailable` | Offline unavailable |
| removing | Removing offline copy |

The first five labels follow the inspected Assembly Lab compact terminology. Expanded copy remains the existing longer and precise description. Do not substitute “Offline” for an inability to check updates: freshness and saved availability are separate. Failure/cancellation messages remain visible within the panel; a retained verified complete copy can continue to say “Saved offline”.

## Running identity

Keep “Running version” with the existing source link and deterministic build suffix inside Version. Retain “No source commit recorded” when appropriate. The disclosure itself needs no build string and no extra instruction sentence.

These labels are a draft for builder editing and built-page review; this document does not claim independent learner or sceptic validation.
