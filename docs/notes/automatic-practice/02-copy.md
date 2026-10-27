# Automatic practice media copy

Copyright © 2026 Christopher Snow.

Separate prose draft from `01-facts.md`, reviewed in sentence and idea passes against the Assembly style checklist. These strings describe only the learner's current preparation state and next action.

| Key | Proposed string |
| --- | --- |
| `sourceLoading` | Loading practice files… |
| `sourceWaiting` | Practice files will load when the current command finishes. |
| `sourceRetry` | Load practice files |
| `sourceMissing` | A required practice file is missing. Load the practice files again to continue. |
| `sourceLoadFailed` | Could not load the practice files. Check your internet connection and try again. |
| `sourceTimeout` | Loading the practice files took too long. Try again. |
| `sourceMismatch` | A practice file did not match the expected contents. Try loading it again. |

Retain the current “Practice source” filename label and “Replay source” action. The retry action names what it does, including after deliberate deletion. It appears only when preparation needs the learner's intervention; ordinary page entry needs no loading instruction.

The failure copy does not promise that files were saved or that a complete offline copy exists. The integrity message explains the failed check without requiring knowledge of hashes or storage. Use `sourceWaiting` when an active command blocks loading; it does not describe restoration or other preparation stages.

This is proposed copy only. No source files were edited, and no tests or commits were made. Built-page learner, sceptic and checker review remain separate work.

## Builder edits

The builder adopted the other proposed strings and made these changes:

| Key | Final string |
| --- | --- |
| `sourceWaiting` | Practice files will load when the current operation finishes. |
| `sourceRetry` | Retry loading |
| `sourceMissing` | A required practice file is missing. Load it again to continue. |
| `longPractice` | Download the two-minute practice video |

“Current operation” covers file operations as well as commands, matching the actual loading wait. The learner only needs to know that preparation will resume after the current activity finishes. This replaces the narrower command-only wording above.

“Retry loading” is clear beside a loading failure or missing-file message, where the preceding copy supplies its object. The shorter missing-file message names the required file before referring to it as “it”. Both retain an explicit action after deliberate deletion without restoring an ordinary setup step.

The overview download label identifies both the action and the optional clip's duration. Keeping the link near the source credits preserves access without adding the two-minute clip to the first lesson's automatic preparation or introducing another lesson control. “Download” describes obtaining the file; it does not imply adding it to the notebook's files.

These edits are suitable for the implemented behaviour described by the builder. This addendum assesses wording only; it does not claim independent verification of the built page. No source edits, tests or commits were made by the prose drafter.

## Remaining manual-loading instructions

The prose drafter changed only two source strings in this final pass. The empty Files message now reads: “No files yet. Practice videos appear when you open a lesson, or you can import your own files.” This explains how to obtain files without directing the learner to a removed loading step.

The workflows page now reads: “In Files, use New folder to create previews before running the commands on this page.” Removing “Load both clips” aligns it with automatic preparation while retaining the necessary manual folder creation.

No tests or commits were made in this pass. These copy changes still require the builder's normal checks and review.

The title page's source note now reads: “The supplied font file fonts/DejaVuSans.ttf provides the letter shapes used to draw the title.” This removes the final manual-loading instruction while retaining the font's path and purpose. The subtitles page's explanation of FFmpeg font-folder behaviour remains unchanged. Only this source note changed in the additional pass; no tests or commits were made.
