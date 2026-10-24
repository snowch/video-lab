# Deployment — substantive chapters

Copyright © 2026 Christopher Snow.

Implementation release: `ec04453bde779b2cdf15285574f0dcc9b3bb5b87`, pushed to main under the owner's standing reviewed-deployment authorisation. The subsequent evidence-only commit does not change the published application build.

## GitHub Actions

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40117012567), check job `120940269539`.
- [Deploy GitHub Pages](https://github.com/snowch/video-lab/actions/runs/40117012565), build job `120940269683`.

Both workflows completed successfully. Pages deploy job `120942469583` also succeeded. Decoded completed-job logs were fetched separately for the quality and Pages build jobs: both report **17 unit-test files, 76 unit tests and 220 browser tests passed**. The quality browser phase took 7.2 minutes and Pages' separate phase 8.3 minutes. The local gate in record 07 also passed; public success is not inferred solely from local tests.

## Published application and saved-copy upgrade

Live URL: https://snowch.github.io/video-lab/ . Actual public browser checks use normal TLS verification through the configured network proxy; Firefox uses the trusted system certificate wrapper. No ignored certificate errors or local replacement application responses are used.

Fresh public Chromium and Firefox both completed the single combined **42,010,028-byte** offline download, disconnected and reloaded, ran actual WASM ffprobe and FFmpeg, downloaded the encoded result and passed native ffprobe validation. Reading before choosing a download did not request processing tools. The optional working entry also ran its actual ffprobe offline. The published footer points to the exact implementation SHA and no page exceptions occurred.

Both browsers also loaded the new independent-practice page offline, retained an entered self-review across reload and downloaded its actual text. The supplied seven-second comparison actually played, the picture-rate model withheld its answer until the explicit reveal, and contextual installation displayed one available path. These are separate content/control observations, not only successful bundle requests.

The retained Chromium profile completed the real old-release check/update/reload and passed its exact WebM hash and draft assertions. Its complete offline readiness was already true after update. The first author harness then incorrectly tried to click a Download button which is intentionally absent for a ready copy, and timed out. Corrected the standalone harness to skip a redundant download when readiness is true; no application source or deployment changed. Rerunning the remaining validation against that same upgraded profile passed offline reload, actual VP9 probe, new encode/download/native validation, unchanged original WebM hash, new chapter playback/models, review persistence/download and the optional working entry. The initial update observation and subsequent continuation are recorded separately rather than claiming a second old-release update.

Logs: `public-live.log` (both fresh browsers), `public-upgrade.log` (initial real update and harness timeout), and `public-upgrade-final.log` (successful continuation). All live and upgrade checks used the published GitHub Pages application, including its real service worker and cached assets.

The older complete offline copy was seeded before publication from release `8b2f42266670d29491f5425211879172df2edafb`, including processing tools. Its real earlier captured WebM was imported through the real file chooser; only the stored origin label was set to captured to represent historical metadata. No removed browser-recording feature was invoked. Before/after SHA-256: `e1a328b8e7cfe7cea683629e05fa98d8b5e12cc6fe785b41a678305558a39818`. Its retained draft is `ffprobe -v error earlier-browser.webm`.

The standalone public harness is `/workspace/scratch/course-depth/public.mjs`, with separate fresh and retained-profile modes. Its logs and native-probed downloaded outputs are recorded under the same scratch directory. Screenshots are committed under `evidence/public-*`.

These checks establish actual execution and preservation in the tested browsers, not editorial quality of every possible learner output or physical OS installation. Advanced topics remain explicitly planned. Safari and physical iPad/Android installation were not run.
