# CLI lab verification and deployment

Copyright © 2026 Christopher Snow.

23 October 2026. The command model, engine and fixtures were exercised before the separate prose draft. The reader, sceptic and checker are distinct agents who did not author the application fixes. Their records accompany this file. Model/settings, where available, are recorded by the individual reviewers.

## Final local gate

`npm run check` **passed** after the final command, storage-status, filename and reviewed-copy fixes: formatting, copyright, unchanged shared-platform integrity, strict TypeScript, **69 unit tests**, native original/Module 2/journey media verification, production/offline build and **125 browser tests** (browser duration 2.9 minutes).

The first final-gate attempt stopped at formatting because downloaded reader/sceptic execution recipes were byte-exact raw evidence. A precise `.prettierignore` entry preserves those raw JSON downloads, as already done for prior issue-3 review recipes; the complete entry point was rerun and passed. An earlier intermediate full gate also passed 68 units/125 browser cases, but is not substituted for the final result above.

Focused CLI regressions cover genuine learner-written command execution (changed frame rate, stream-copy/AAC mux, JSON probe, changed edit), downloaded-byte native inspection, source-hashed exact command recipes, actual canvas MediaRecorder bytes with a substituted permission chooser, denial/retry/track cleanup, file chooser/import and legacy migration, preserved challenge progress, command quoting/errors/history/cancellation/explicit replacement, persistence/removal, session-only fallback, optional provided references/credited comparison, saved-tools offline execution and no-tools failure. Actual physical desktop permission UI and real phones are not represented by browser emulation.

The final command-first production path has no range/encoding parameter forms. Original fixed-fixture reference pages and their interactions remain explanatory references with old bookmarks/progress. Native command reproduction is portable syntax with the required files/features, not a promise of bit-identical results across FFmpeg versions.

`git diff --check` passed. No synchronised platform or pre-existing learner-audit files were changed. Existing dependency-annotation/chunk-size build warnings remain informational.

## Publication and live checks

Published application commit: `00896ad194193fd964575ff5417df538c3728c39`.

- [Deploy GitHub Pages run 39954242987](https://github.com/snowch/video-lab/actions/runs/39954242987): **success**, including the full `npm run check`: **69 unit tests and 125 browser tests passed** (browser duration 4.1 minutes). Both build and deployment jobs completed. Completed build logs confirm the exact counts.
- [Separate Quality checks run 39954242587](https://github.com/snowch/video-lab/actions/runs/39954242587): still installing native FFmpeg packages at closure, before application checks. No success is claimed for this duplicate workflow. The Pages pipeline independently passed the same complete quality entry point before publication.
- `node /workspace/scratch/cli-live.mjs 00896ad194193fd964575ff5417df538c3728c39`: **passed in Chromium and Firefox** against the real HTTPS site. Both verified the deployed full commit/tick, real ffprobe of the supplied recording, a learner-written changed trim producing a three-second H.264/AAC MP4 independently inspected by native ffprobe, conditional cleanup explanation, exact downloaded command recipe, saved-file reload/playback, no parameter forms and phone-dark width.
- `node /workspace/scratch/cli-upgrade.mjs prepare` followed by `node /workspace/scratch/cli-upgrade.mjs verify`: **passed**. Before publishing, an actual old GUI installation in an isolated persistent Chromium profile saved the original recording and baseline offline copy. After publishing, its cached build showed the cross, explicitly downloaded the new complete copy, and used Reload to use update. The new CLI showed the matching tick, migrated the actual saved source to capture.mp4, retained a local marker, and executed real ffprobe on the migrated bytes (ten-second source). This tests a genuine old deployment/cache/project upgrade, not only injected legacy records.

All live requests used the inherited proxy and trusted managed CA; Firefox imported that CA into its isolated profile. No TLS bypass. No external messages/comments were sent. Physical mobile devices/permissions and all possible native FFmpeg versions remain outside the claim.

Production metadata is generated from Actions GITHUB_SHA. This closure updates documentation only with `[skip ci]`, so it does not replace the deployed application build; the footer correctly compares against actual published metadata rather than the later documentation-only main commit.
