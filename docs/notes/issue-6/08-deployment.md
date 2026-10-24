# Public deployment and saved-copy verification — App status

Copyright © 2026 Christopher Snow.

Implementation commit: [418664636cfc7a5b64a94dc931622b2545843f10](https://github.com/snowch/video-lab/commit/418664636cfc7a5b64a94dc931622b2545843f10). Published at https://snowch.github.io/video-lab/ . The same-origin deployed metadata reports build `8a56c6005bd6ab31c6c1a5ba77a5a501dc2ac7cd584ec6f5f5661d8724307ccb`, manifest `gDL_Qff9QFPCXkz_AV+cGin7bk2Hu8DoCvKP5Jg3zfw=`, and **42,019,263 bytes** for the combined save. The running disclosure and source link were checked against that actual metadata on both entries. This evidence-only followup uses `[skip ci]`, retaining the tested implementation as the published release.

## GitHub results

- [Quality checks, run 40123869959](https://github.com/snowch/video-lab/actions/runs/40123869959): success; decoded check-job 120961015735 logs show **18 files / 78 unit tests and 250 browser tests (14.1m)**.
- [Deploy GitHub Pages, run 40123869981](https://github.com/snowch/video-lab/actions/runs/40123869981): success; decoded build-job 120961015894 logs show **18 files / 78 unit tests and 250 browser tests (10.8m)** before actual Pages deployment.

Each ran the repository's full `npm run check`, including strict types, formatting, platform sync, pinned native media facts, lesson/reference verification and build. These are actual completed job logs, not an inference from source or queue status. The local final full gate separately passed 78/250 as recorded in 07.

Published manifests contain **195 app/lesson/media assets, 9,652,195 bytes**, and **five processing-tool assets, 32,367,068 bytes**. Actual published JS/CSS component sizes (already included in that total):

| Resource | Bytes |
| --- | ---: |
| `assets/course-C3vmEHy_.js` | 404,029 |
| `assets/course-DD94NG6G.css` | 31,179 |
| `assets/index-Bsc6sgzs.js` | 3,121 |
| `assets/model-BEWUripj.css` | 1,528 |
| `assets/model-BUi8jV9b.js` | 255,776 |
| `assets/workbench-BnAJ7Csa.js` | 30,973 |
| `assets/workbench-DWGQrL7H.css` | 10,566 |
| `assets/worker-BAOIWoxA.js` | 2,526 |

The generated bootstrap worker is about 35.62 kB (12.69 kB gzip in the Pages build log). Its transfer and network-only metadata are separate from the displayed manifest total. Local exact gzip measurements and the release contract are in 07 and docs/app-status-contract.md.

## Actual public browsers

Commands, in `/workspace/video-lab`:

- `EVIDENCE_PROFILE_TAG=-fresh2 node /workspace/scratch/issue6/public.mjs live 418664636cfc7a5b64a94dc931622b2545843f10`: Chromium completed a genuine fresh one-action full save, then closed the entire browser and reopened disconnected before its first navigation. Replay, real WASM ffprobe, real FFmpeg encode/download, native validation, exact identity/size and the standalone entry's offline probe passed. The subsequent Firefox portion reached complete readiness but its test launcher failed while reopening, as described below; that whole multi-browser invocation is not claimed to have exited successfully.
- `EVIDENCE_BROWSER=firefox EVIDENCE_PROFILE_TAG=-fresh3 node /workspace/scratch/issue6/public.mjs live 418664636cfc7a5b64a94dc931622b2545843f10`: **passed, exit 0**, using a new Firefox profile and the corrected trusted launcher. Same full-save → whole-browser close → fresh disconnected launch → replay/probe/encode/native validation → standalone offline-probe sequence. TLS verification remained enabled; only the environment proxy CA was trusted.
- `node /workspace/scratch/issue6/public.mjs upgrade 418664636cfc7a5b64a94dc931622b2545843f10`: **passed, exit 0** against the real public old saved profile. It was seeded before deployment on ec04453 with a complete old offline save, an actual earlier WebM and command draft. The old page failed closed rather than forcing a restart it could not acknowledge. Closing saved old windows and reopening completed the one-time migration. The downloaded source retained SHA-256 `e1a328b8e7cfe7cea683629e05fa98d8b5e12cc6fe785b41a678305558a39818`, the exact custom draft and its historical captured-origin metadata. A fresh offline process then replayed it, ran actual ffprobe and FFmpeg, downloaded a decodable output, and used the standalone entry offline.

The historical file was imported through the real old file chooser; its metadata alone was set to `captured` to represent an existing historical record. Its bytes are real media, not a fabricated capture, and no removed recording API/command was reintroduced.

Native checks use `ffprobe -v error -count_frames -show_entries format=duration:stream=codec_name,codec_type,width,height,nb_read_frames -of json FILE` and `ffmpeg -v error -i FILE -f null -`. Exact output byte counts, hashes, dimensions, durations and decoded picture counts are in `evidence/public-native-validation.json`. Both practice outputs contain fifteen H.264 pictures and last one second; the earlier WebM's one-second edit is reported with its actual timestamp-derived duration/picture count rather than an invented exact frame rate.

## Retained failed attempts and recovery

The first public fresh Chromium save stopped with fifteen verified baseline entries and correctly reported incomplete readiness. Its first missing asset was `icons/video-lab.svg`. A later real browser fetch, including the browser's SRI check, returned 200 and the exact expected 323 bytes/hash. The original failed response was not captured, so no definitive transport cause is claimed. `public-resume.mjs` then resumed the same profile and completed with real verified-byte progress; `public-resume-offline.mjs` passed a fresh disconnected launch, replay and actual ffprobe. The independent new Chromium profile above subsequently completed in one action. No application source was changed to disguise this failure.

The first resume-offline harness used a desktop viewport with a hidden mobile chapter selector. Its action timed out; after specifying the intended phone viewport, the actual offline run passed. The original log remains `public-resume-offline-harness-first.log` in scratch.

The first Firefox relaunch exposed a harness error: its TLS wrapper ran `certutil -N` against an existing profile database, producing an interactive overwrite prompt and ultimately exhausting the Node harness heap. The app's full download had already completed. The issue-specific replacement wrapper initialises only absent databases and imports the CA only when absent, with normal TLS verification. A separate clean-profile Firefox invocation then completed end to end. The failed log is `public-live-fresh2.log`; final successful logs are `public-firefox-final.log`, `public-upgrade.log` and `public-resume-offline.log`. No app fix or repeated source quality gate was needed for these harness corrections.

Screenshots: `public-live-chromium.png`, `public-live-firefox.png`, `public-upgrade-chromium.png`; pre-issue and independent before/after evidence is alongside them. Physical installation/device OS integration, Safari/iPad/Android hardware and spoken assistive output remain untested limits. The public checks use real Chromium/Firefox, persistent profiles, a normal verified proxy connection, actual workers/media and native decoding; they do not simulate download progress or processing.
