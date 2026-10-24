# Separate prose draft — one offline download

Copyright © 2026 Christopher Snow.

Drafted from the verified `01-facts.md` brief without changing download, cache, processing or update logic. The owner asks for one download, so the panel explains that lessons, practice media and FFmpeg/ffprobe tools are saved together. The former lesson heading and separate processing-tool strings are removed. The existing Download for offline use label remains the single initial action.

Ready states explicitly include all three parts. The new `partial` state says some files are saved but the download is incomplete, and directs the learner to download again while connected. The complete offline claim is reserved for verified completion. Download/retry and update failure wording retains useful connection/storage feedback. The shorter storage note explains device/browser locality, possible clearing and which actions need a connection without adding another panel.

First-run tool notes now point to Offline access and app installation → Download for offline use. Installation points to that singular action. Existing optional-comparison notes now say the complete offline download includes the recording, matching the planned manifest inclusion. Captured-file provenance and unrelated course prose remain unchanged.

Files drafted: `src/offline/strings.ts`, `src/journey/strings.ts`, `src/workbench/strings.json`, `src/install/strings.ts`, and the affected source/comparison notes in `src/cli/strings.ts`. Formatted these files with Prettier. Built learner, sceptic and checker review remain separate requirements.
