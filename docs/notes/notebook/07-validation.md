# Notebook course — integrated validation

Copyright © 2026 Christopher Snow.

The final course has ten chapters and 24 concept pages. `media.json` pins the official source, licence, exact preparation arguments/native version and measured supplied bytes. `commands.json` records 51 actual native worked/reference executions. `commands-wasm.json` records the matching 51 genuine built-page Chromium executions, raw returned statuses/logs, input/output hashes and independent native probes of downloaded file outputs. Every such media output also passed full native decoding. Every independent cell's stated technical check completed. The two subtitle executions were rerun after the explicit font-family correction; earlier uncaptioned encodes are not presented as correct visual evidence. The separate checker inspected original and edited lettering in actual decoded frames.

The downloadable native batch script also ran in an actual POSIX shell against the two supplied short clips. Both produced five-second, 640 × 360 previews. This is native execution evidence, not a browser execution claim.

The separate reader, sceptic and checker records are 03–06. The checker discovered a substantive missing-subtitle defect that container/codec checks missed; 05 records its correction and 06 verifies the final built default. Targeted fresh-process local offline processing, file safety, reflow and stale-result checks are independently documented there.

## Check attempts and corrections

An initial full check passed 80 unit tests and 251 browser tests but failed five outdated default-home expectations after the new course became the default. Their archive coverage now visits the explicit archive; new-course coverage checks all 24 pages. Two further failures were test-artifact ENOENT errors caused by a concurrent separate Playwright runner using the same output directory; no product assertion failed in those cases. Later integrated runs use one runner.

New targeted tests exposed test-harness mistakes which were corrected: a hash-only navigation does not execute a newly installed page-init storage-failure hook, so the storage-error scenario explicitly reloads; an existing Last executed command marker is not completion of a new Firefox encode, so the assertion waits for the correct new executed command. ZIP export gained standard Unicode-path metadata after an older native unzip interpreted UTF-8 names incorrectly; the actual native unzip now reads the exact path and bytes.

The first added restart test withheld the ACTIVATE request, which also prevented the worker from querying any windows. It therefore could not test modal freezing. The corrected test delivers the request and withholds one safe acknowledgement, observes actual modal inertness, then verifies abort restores controls and the saved draft. That targeted test passed. Its interrupted broader run is not claimed as a green check.

## Final local and public results

The local integrated `npm run check` passed: 19 unit-test files / 80 tests; 264 browser tests passed and 21 deliberate project skips, in 9.7 minutes. Formatting, copyright, shared-platform integrity, strict TypeScript, recorded media, lesson/reference checks, native fixture validation and production build passed in the same entry point.

The final narrowly scoped multiline-export correction followed that build. Its targeted real browser/native-shell regression passed (one desktop-light test, 1.3 seconds), as did a separate checker's actual clipboard/script execution, final TypeScript and formatting checks. No native processing arguments were added. The committed full CI entry point also includes that new regression.

A further full local `npm run check` on committed implementation `e8a548f3e376b9658b79494c70213ef756952929`, including the export correction, passed: 19 unit-test files / 80 tests; 265 browser tests passed and 25 deliberate skips, in 9.5 minutes. No concurrent Playwright runner shared its artifacts. Both GitHub workflows passed on that same implementation: [Quality checks](https://github.com/snowch/video-lab/actions/runs/40136158795) and [Deploy GitHub Pages](https://github.com/snowch/video-lab/actions/runs/40136158623). Each independently ran the complete entry point: 80 unit tests and 265 browser passes / 25 deliberate skips, with browser durations 15.2 and 15.5 minutes. The actual decoded job-log summaries are in `ci-evidence.json`; Pages deployment also completed successfully.

The published source commit is `e8a548f3e376b9658b79494c70213ef756952929`, build `f0d189c710fd1ba1fcba2943db52465756102986615728f835cbcae2d6d5a7f9`. The single complete offline download totals **49,014,197 bytes** (202 baseline assets / 16,647,129 bytes, plus 32,367,068 processing-tool bytes).

Actual public verification used normal TLS through the configured proxy, including the trusted Firefox launcher, without disabling certificate checks. Fresh persistent Chromium and Firefox profiles each downloaded the complete app. Each browser process was fully closed, then relaunched with the network disconnected before opening the notebook route. Both loaded the supplied source/SRT/font, ran the real subtitle command, replayed its eight-second 854 × 480 result, downloaded it and passed native full decoding. The native-decoded first cue band contained 1,826 dark outline pixels (the uncaptioned source has none); the visible sentence was inspected in the public Firefox frame. Running build, published commit and complete offline readiness matched. No page errors were recorded.

A separately saved **previous public version** (build `8a56c6005bd6ab31c6c1a5ba77a5a501dc2ac7cd584ec6f5f5661d8724307ccb`) used explicit App status Check → Update → Restart. Its existing command draft survived. The older `mousepad-demo.mp4` blob and new notebook copy matched each other and the canonical original SHA-256. Its complete offline availability survived the update; full-process offline relaunch and actual subtitle processing/replay/native decoding then passed too. This is an upgrade from the actual earlier public app, not a fabricated old manifest.

The three public JSON records and public screenshots are under [evidence](evidence/). These release checks finished 24 October 2026 at 22:12 UTC. The subsequent evidence-only commit does not change or republish the application source.

## Limits

Browser checks use Playwright Chromium/Firefox, with phone/touch emulation and light/dark themes. They do not establish testing on physical Android/iOS devices, Safari, every native FFmpeg build or spoken screen-reader output. Native decoding and metadata do not establish editorial judgement, audible quality or the meaning of captions; the course states those checking limits.
