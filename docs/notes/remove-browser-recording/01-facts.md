# Remove browser screen recording

Copyright © 2026 Christopher Snow.

The owner requests removing browser screen recording because its display-capture API is not Baseline across widely used browsers. Prior authoritative MDN getDisplayMedia research and the existing capability guard confirm differing support; this change removes the feature rather than retaining a disabled option or support warning. The goal is consistent source selection through practice media or an imported recording.

Remove actual getDisplayMedia/MediaRecorder entry points and lifecycle/controller from both the production CommandLab and optional working command-builder entry. Remove recording/stop controls and browser recording instructions. Keep native FFmpeg Windows/macOS/X11 and phone/tablet device-recording instructions in the optional appendix. Do not replace browser capture with an invented CLI tool. Default the guide to a neutral Choose your device/method placeholder, with no guessed OS. Linux Wayland/unknown-session alternatives must say desktop recorder, then import (no browser chooser suggestion). Browser WASM remains real local FFmpeg/ffprobe processing of saved files, not recording.

Preserve old captured file origins, saved Blob bytes, source selection, drafts, recipes, achievements, all bookmarks including #/capture and #/appendix/recording, and offline/update/install behaviour. A previously captured recording remains usable through Files, replay, download, inspection and editing. No storage migration/deletion is needed. Existing native metadata/evidence from docs/notes/capture-guide remains valid and unchanged. Historical review documents are records, not live instructions, and should not be rewritten.

Separate prose draft, built reader/sceptic/fix/checker, full npm run check and reviewed main/public upgrade verification are required. Replace obsolete recording tests with a regression proving no capture APIs are called even when present, that existing captured-origin files still work, and practice/import remain functional. Deleting the retired controller's own unit tests is feature removal, not hiding failures; record final test counts accurately.
