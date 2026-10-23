# Verification

Copyright © 2026 Christopher Snow.

23 October 2026. Source media/core bytes are unchanged; their pinned provenance remains in the live-workbench slice.

- Actual WASM capability spike: bare ffprobe prints the normal Duration/Stream summary. Successful and missing-input calls both return wrapper -1. Paired private JSON error/format inspection distinguishes them. Native/WASM readable logs and actual paired results are in `media/`. Version/help return actual zero; the adapter accepts those without an input check. No native success code is invented.
- Parser/model tests pass for bare ffprobe, optional explicit JSON, safe saved-report paths, authentic edit arguments, source protection and imported names. Existing named JSON report evidence/recipes and grading remain intact.
- The final engine/default implementation passed `npm run check`: formatting, copyright, unchanged platform sync, strict typecheck, **79 unit tests**, native media facts, production/offline build and **150 browser tests in 3.5 minutes**. Log: `/workspace/scratch/raw-output-readable-full-check.log`.
- The subsequent low-priority log-following fix passed strict typecheck, formatting and **20 focused browser cases in 38.9 seconds**, across desktop/phone light/dark and Firefox. Assertions include default bare command, real Duration/Stream output, no derived badges, tail position, manual backscroll retention, optional JSON at its beginning, displayed/downloaded JSON byte equality, actual six-second/90-frame export and input-hashed recipe, cancellation, corrupt/missing inputs, unknown option failure, quiet success, version, and actual offline execution. Log: `/workspace/scratch/raw-output-final-focused.log`. CI repeats the full quality gate for the exact final deployment commit.
- The independent reader and sceptic retained one low finding about the banner initially obscuring useful summary lines. `03-resolution.md` records the follow-tail fix; the final independent checker verifies the corrected built page. Interim explicit-JSON presentation reviews remain clearly labelled and do not substitute for the final bare-default review.

Reviewed final workbench bundle before deployment metadata stamping: `workbench-CfPx4GZJ.js`, SHA-256 `defa1b1eca011a80a9b7b53baa5bda820c801bc709e9b0c0721ea5cf96d39809`. Deployment/public checks are recorded in `06-deployment.md` after completion. No physical-device or universal-native-tool compatibility claim is made.
