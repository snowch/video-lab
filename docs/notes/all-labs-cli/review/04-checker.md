# All labs CLI — independent final built checker

Copyright © 2026 Christopher Snow.

23 October 2026. Independent gpt-6.1-sol checker, high reasoning effort. Read `AGENTS.md`, the all-labs plan and reviews 01–03. I authored neither the conversion nor its fixes. Checked actual built behaviour at `http://127.0.0.1:4173/video-lab/`; no application edits. Bundle **`index-kx2Kn7kT.js`**, fetched SHA-256 **`bacff85be542a50ba8694d721ca69de7f02d83b9c0652efbe3c42827d484c6e4`**.

**Accepted within this focused coverage. R1 is resolved; R2 remains rejected as an invalid historical-bookmark example. No new independent-review blocker found.** This verdict does not certify a later public deployment.

## Findings and real execution

**R1:** I imported a real report, then created eleven text notes. The next note failed with the built message “The workspace holds at most 12 working files plus 12 recipes. Download important work, then use rm to remove an unneeded file.” Help explicitly says “12 media/report/note files”. Removing one note allowed a replacement note to save. This independently verifies the wording, actual bound and recovery with non-media files; no quota increase or automatic deletion was needed.

**R2:** In both Chromium desktop-light and Firefox phone-dark, valid `#/module-0/failureExperiment` and `#/module-2/failureExperiment` links canonicalised to their inspection/editing reference routes and placed the actual section at the viewport top, within 0.4 pixels. `#/module-0/investigation` also worked. Source/review evidence establishes `failureExperiment` as the original section kind; the reader's invented `/failure` suffix does not establish a lost bookmark. I do not claim that unsupported shortened suffix scrolls correctly.

In **Chromium 1440 × 1000/light** and **Firefox 390 × 844/dark**, I independently typed and executed:

| Work | Observed result in both engines |
| --- | --- |
| `reference inspect`, actual stream/format probe saved without frames, then `check inspect` | Source/stream checks passed; required picture count and timestamp failed usefully |
| Actual `-show_streams -show_format -show_frames -of json` probe saved with `-o checker-report.json`, then `cat` and `check inspect` | All six criteria passed: 120 video pictures, picture 75 at 76800 ticks / 6.250000 s |
| Real AV trim/reset/concat with changed graph labels and **`-preset veryfast`**, saved as `checker-av.mp4` | All seven criteria passed, including H.264/AAC, 960 × 540, 4.000000 s, zero video start, 48 decoded pictures, RGB RMS max **0.637** against limit below 2 |
| Same command with the concat input pairs reversed | Six structural criteria still passed; decoded-picture criterion failed, RGB RMS max **5.493** |
| Provided `reference edit` submitted to the edit checker | Rejected for missing executed evidence |

The passing join independently used `[p0]`, `[s0]`, `[p1]`, `[s1]`, `[p]`, `[s]` graph labels, rather than the example's labels, and a different encoder preset. It preserved the required opening `[0,2)` followed by result `[4,6)` with separately reset picture/sound clocks. The reversed candidate still had four seconds and both streams; its failure therefore demonstrates meaningful content checking rather than command-spelling or headline-duration matching. A copied valid report imported into a separate context was also rejected for missing executed evidence.

The [actual passing output](evidence/checker-av.mp4) and [wrong-order output](evidence/checker-reversed.mp4) were downloaded from the command workspace. Native ffprobe confirmed four seconds, H.264 and AAC. The downloaded [raw recipe](evidence/checker-av-recipe.json.txt) records the exact typed graph/preset/output and the correct source hash. The [raw executed report](evidence/checker-report.json.txt) contains the independently counted picture/timestamp evidence. `.txt` suffixes preserve their downloaded JSON bytes without formatting changes; the original download names and SHA-256 values are in [provenance](evidence/checker-provenance.json). Supply `public/media/module-2/build-queue-cuts.mp4` under the recipe's exact `reference-cuts.mp4` name when replaying its arguments. No native recipe re-encode is claimed in this pass.

## Preserved work, bookmarks and interface

Before visiting the labs I seeded both actual old storage schemas with completed answer-based achievements and separate original reflection notes. `progress` displayed those as earlier achievements, explicitly **not** new executed-artifact checks. Initially neither current artifact had passed. After the actual checks, `progress` separately identified the new report/edit filenames and hashes. After the reversed/provided failures and a reload, the earlier passing edit remained the recorded success; both original reflections remained. A new `note checker-note.txt "..."` survived reload and `cat` returned its exact text.

Both engines retained the generated output after reload, downloaded it byte-for-byte identically, and visibly replayed it beyond 0.15 s without a media error. Chromium and Firefox independently produced the same submitted MP4 SHA-256: **`a2e6e4e787fc066a08033771d564dafa9c38a252ddaf4a91c6a319fd3e368600`**. This is an observed pair of results, not a general deterministic-encoding guarantee. Rechecking the restored file passed again.

I checked all **seven available lab routes**—Capture, Build, Inspect, Edit, Publish, inspection reference and editing reference—at **1440 × 1000** and **390 × 844**, in light and dark: **28 route/size/theme states**. Theme changes used the real application button and verified the actual `data-theme` value. Each route exposed one labelled Command field and no select, range, number, radio, checkbox or old challenge-editor exercise controls. Every document width matched its viewport. Commands used keyboard Enter. Completed execution scripts reported zero uncaught page errors.

I visually inspected reference workspace captures in both sizes and themes: text, command entry, focus, help and controls remained legible. Retained examples: [desktop light](evidence/checker-desktop-light.png), [phone dark](evidence/checker-phone-dark.png). I also inspected the actual Firefox phone-dark passing-check capture, retained in scratch. The long graphs remain real commands with the same substance on small screens.

## Commands, attribution and limits

```sh
node /workspace/scratch/all-labs-checker/check.mjs
node /workspace/scratch/all-labs-checker/layout-quota.mjs
ffprobe -v error -show_streams -show_format -of json <downloaded-file>
```

Final executions exited **0**. `results.json` and `layout-quota-results.json` in that scratch directory retain per-engine checks, current/legacy progress, measured bookmark positions and the 28 layout states. An initial layout attempt guessed the wrong theme-button accessible name; correcting the checker to the actual “Change colour theme” label completed the sweep without an app change. It is not a product failure.

I inspected `/workspace/scratch/all-labs-check.log`: **75 unit tests and 125 browser cases passed**, with the builder's formatting/type/platform/native-media/build checks; browser stage 3.1 minutes. The builder reported full `npm run check` exit 0. I did not execute or claim that whole gate as my independent suite. The separate fully offline report/join/check/reload exercise in `05-verification.md` belongs to the builder; this pass does not relabel it as my own.

Limits: browser-emulated sizes/themes and seeded legacy storage, not a physical device, actual user's existing profile, screen reader, OS sharing chooser or another viewing device. I did not repeat all five progressive hints, every historical anchor, every extraction/copy/clock-failure command, quota/storage-failure edge case, capture, cancellation, offline matrix, release-update lifecycle or whole production path; those have separate evidence. I did execute `hint inspect 4` and `solution inspect`. No public deployment, CI result, cryptographic anti-cheat property or certainty that the edited story communicates well is implied by measured media checks.
