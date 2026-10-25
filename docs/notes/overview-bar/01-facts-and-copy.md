# Overview bar: verified facts and separate copy pass

Copyright © 2026 Christopher Snow.

## Scope and method

This separate drafting pass inspects the existing source for the narrow request to remove the redundant course-overview bar. It does not change product files or claim built-page validation. The builder owns the implementation and subsequent reader, sceptic and checker passes required by AGENTS.md.

## Verified facts

- `NotebookShell` currently renders the same toolbar above the home page and every notebook lesson. Its Course overview link points to `#/`, so on the overview it links to the page already open.
- The Files button opens the existing shared `FileManager`. Its count is the number of stored file entries, not completed exercises. Keep access to this existing dialog on both home and lesson pages.
- The home already has the primary action Start chapter 1. Files can sit beside it without a separate strip above the introduction. Lesson pages still benefit from Course overview and Files together as contextual navigation.
- The toolbar status currently selects Opening workspace, Working, Saving work, the unsaved-work warning, or Saved in this browser on this device, in that order. `busy` includes initial loading, processing and file operations. A Working label must therefore not imply that FFmpeg alone is running.
- `Workspace` marks storage as unsafe when storage cannot open or when files/cells cannot be saved durably. It also guards restarts and page closure. These guards must remain; deleting routine saved-status text does not make work durable.
- The Files dialog already states: “Files are saved in this browser when storage is available. Download important work; browser storage can be cleared.” That contextual storage note remains useful even when saving succeeds.
- Active processing has a link to its command page and a Cancel processing control. It can continue while the learner visits the overview, so these controls must remain reachable there too.

## Copy and placement

Reuse existing strings. No new learner-facing sentence is needed for this change.

| Context | Existing copy | Placement |
| --- | --- | --- |
| Overview | Start chapter 1 →; Files · count | Actions in the introduction |
| Lesson | Course overview; Files · count | Compact contextual navigation |
| Pending save | Saving work | Conditional feedback while saving |
| Processing or file operation | Working | Conditional feedback after opening finishes |
| Active command | FFmpeg or ffprobe command; Cancel processing | Available on overview and lesson pages while active |
| Storage failure | Some work could not be saved. Download your files and page records before closing or updating. | Visible on overview and lesson pages whenever storage is unsafe |
| Files dialog | Existing browser-storage note | Retain above file tools |

Remove the routine Opening workspace and Saved in this browser on this device messages from the page strip. The existing Files dialog explains storage at the point where it matters. Do not replace the removed home toolbar with another permanent strip.

## Storage-warning preservation

Treat the unsaved-work warning separately from transient busy/saving feedback. The current status priority hides it during operations; the revised layout should keep the warning visible whenever `sessionOnly` is true, including on the home page and during processing or saving. A generic browser-storage note in Files cannot replace that warning: it describes a possibility, whereas the warning reports work that actually failed to save.

Keep `w.notice`, command results, existing download controls, dirty-editor confirmation, restart guards and persistence behaviour intact. Preserve focus return to whichever Files button opened the dialog.

## Editorial assessment

The retained labels already describe their actions directly. Files is sufficient; adding “workspace management” or explanatory copy would add another concept without helping the learner. Removing the self-link and routine save chatter gives the introduction a clear next action while retaining exceptional feedback and recovery actions.
