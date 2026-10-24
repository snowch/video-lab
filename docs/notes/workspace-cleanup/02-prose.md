# Contextual workspace controls — prose draft

Copyright © 2026 Christopher Snow.

Separate drafting pass from the verified implementation brief. This pass changes no source and makes no claim that the rendered interface has been reviewed.

## Placement and purpose

Get video ends with its source preview, source download and continuation. Recording guidance appears with the recording choice. It needs no command editor, comparison collection or processing-tool setup beneath it.

A compact, consistent lesson toolbar contains **Files** on every lesson and **Help** where native commands are used. Their dialogs are separate from the task, result and continuation. Keep dialog content flat: a title, relevant explanation and actual controls. Do not replace the removed nested disclosures with new nested disclosures.

## Exact recommended labels

| Context | Text |
| --- | --- |
| Files toolbar button and dialog heading | Files |
| Dialog close button | Close |
| Empty files | No files are saved yet. Choose a video in Get video, or import a file here. |
| File storage explanation | These files are saved in this browser on this device. Download important work; browser storage can be cleared. |
| Import action | Import file |
| Saved achievement action | View saved progress |
| Media file action | Replay |
| Text or report action | Read |
| File download | Download |
| File deletion | Delete |
| Source selection | Use as source |
| Help toolbar button and heading | Help |
| Help section heading | Running commands |
| Help section heading | Browser diagnostics |
| Empty diagnostics | No browser diagnostics have been recorded. |
| Contextual comparison action | Compare with a provided example |
| Provided comparison explanation | This is a provided output for comparison. Loading it does not show that you ran the exercise. |

Keep filenames beside each file and in accessible action names where repeated controls need disambiguation. Preserve the existing accurate command-scope, keyboard, storage and processing-limit explanations in Help; this cleanup does not change tool behaviour.

## One offline setup panel

Retain the app-level title **Offline access and app installation** so existing navigation remains recognisable. Inside it, use two visible sections rather than another pair of nested disclosures:

1. **Save lessons and practice media**
2. **Add offline processing tools**

Introductory copy:

> Save lessons and practice media first. Add the separate processing tools if you want to run FFmpeg and ffprobe offline. Both downloads stay in this browser on this device.

Lesson download button: **Download for offline use**. Retain the existing truthful download, retry, readiness and update states. State the measured baseline size only when obtained from the current manifest; the brief's approximately 9.4 MB is not a permanent constant.

Processing explanation:

> The processing tools add about 32.4 MB. They are optional for reading lessons and playing the supplied media. Save them while connected if you want to process files offline. Processing stays on this device.

Measured size display may retain **32.37 MB · 32,367,068 B**, using the manifest value rather than hard-coding a separate copy.

Before lessons are ready:

> Save the lessons above before downloading the processing tools.

Processing download button: **Download processing tools for offline use**.

While downloading:

> Saving the processing tools. Keep this page open until they are ready.

Ready:

> Processing tools are saved. FFmpeg and ffprobe can run offline in this browser.

Missing:

> Processing tools are not saved for offline use yet.

Failure:

> The processing tools could not be saved. Check your connection and browser storage, then retry.

Retain installation and update controls in this same app-level panel. Installing the app must not imply either offline download is complete. No learner should need to leave this panel, complete a prerequisite elsewhere and return.

## Review questions

- Does the final source preview lead directly to continuation without optional management sections beneath it?
- Can Files be found from every available lesson without disturbing the selected task or command draft?
- Are comparisons offered only where their content helps the current exercise?
- Does Help remain secondary while errors and requested command output stay visible?
- Does offline setup show both download states and their relationship in one place, without forcing the larger tools download?

## Baseline status corrections

The baseline download supports reading lessons and playing the supplied media. It does not by itself make native command exercises available offline. Replace the earlier broad challenge-readiness promise with these scoped states:

| State | Exact recommended text |
| --- | --- |
| Description | Save lessons and practice media for offline reading and playback. Add the processing tools below to run FFmpeg and ffprobe offline. |
| Idle | Lessons and practice media are not saved for offline use yet. Download them while connected. |
| Downloading | Saving lessons and practice media. Keep this page open until they are ready. |
| Ready, connected | Lessons and practice media are saved for offline reading and playback in this browser. Running commands offline also needs the processing tools below. |
| Ready, disconnected | Your saved lessons and practice media are available offline. Running commands also needs the processing tools below. |
| Missing, disconnected | Lessons and practice media are not fully saved in this browser. Reconnect and download them before relying on offline access. |
| Current | Your saved lessons and practice media are up to date. |
| Manifest size caption | Lesson and practice media download: |

Append the actual baseline manifest's formatted size to the caption. Use its measured bytes; do not imply that this figure includes the optional processing tools or learner files.

Installer clarification:

> Installing Video Lab adds an app icon. It does not save the lessons or processing tools for offline use; use the downloads above.

Existing status precedence for waiting updates, failed downloads and unsupported browsers should remain truthful. A baseline-ready state must never stand in for processing-tool readiness. Tool readiness stays visible separately in the same panel.
