# Main integration and public verification

Copyright © 2026 Christopher Snow.

Source commit: `2bb123add2a21a7a5ded80dc2db51a042275e01a`, pushed directly to main
under the owner's standing authorisation after independent review and the complete
local quality gate. The unrelated untracked learner-audit directory was preserved.

## GitHub verification

[Quality checks](https://github.com/snowch/video-lab/actions/runs/40208748776)
passed on that commit: 82 unit tests, 269 browser tests and 31 deliberate project
skips. Browser phase took 16.5 minutes. All formatting, copyright, platform-sync,
type, media, lesson and native-command checks also passed as part of the same gate.
Decoded job log: `121215244008`.

[Pages deployment](https://github.com/snowch/video-lab/actions/runs/40208748779):
the first attempt was deliberately cancelled after more than ten minutes in
dependency installation. Its completed log (`121215244018`) shows slow Ubuntu
mirror downloads (for example, the 9 MB codec2 package took several minutes),
not a failed application test. The second attempt uses the same source and the
unchanged full quality gate. Its fresh runner completed dependency setup normally.
Second build job: `121218299015`.

The second attempt succeeded, including its own complete gate: 82 unit tests,
269 browser tests, 31 deliberate skips; browser phase 11.1 minutes. Deploy job
`121221222217` succeeded. Both workflow results are retained in
`evidence/ci-results.json`.

## Published saved-app update

The actual published release identifies source `2bb123a` and build
`96625ec3e81d10bd634e05f62bfa628fd47ce2c0945c9d8f146b428dc7a8f3ce`.
The complete offline download is 49,037,513 bytes (baseline 16,670,445 plus
processing tools 32,367,068).

`node /workspace/scratch/readability/public-update.mjs 2bb123add2a21a7a5ded80dc2db51a042275e01a`
completed with exit 0. It used the existing persistent Chromium profile containing
the previously published `8e49b837…` build and completed App status → Check for
updates → Update → Restart to update against the public site. The running embedded
build matched release metadata. All eight file hashes and all three complete cell
records were unchanged, including saved notes/drafts/execution records.

After closing the browser process, the test relaunched the profile offline before
navigation. The new embedded build, three-option first example and nonsticky phone
navigation appeared, and files/cells still matched the before snapshot. This is a
real saved-app upgrade and offline relaunch, not a mocked service worker. It did
not rerun processing in that profile: processing is covered by the complete suite
and the independent public fresh-context run.

`evidence/public-update.json` records release identity, preserved hashes and scope;
`evidence/public-updated-phone.png` shows the updated offline page. The independent
all-page public audit is recorded separately in `08-public-audit.md`.
