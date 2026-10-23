# Reviewed release and public upgrade verification

Copyright © 2026 Christopher Snow.

Implementation commit: 74891ca4aa9a5e4cfb34b0657d44d36cfbe67b9e. Reviewed direct deployment to main is authorised by the owner and AGENTS.md. The independent review and final local quality gate are documented in 03-reader.md through 07-validation.md.

## GitHub Actions

- Quality checks: https://github.com/snowch/video-lab/actions/runs/40035118441 — success.
- Pages build/deploy: https://github.com/snowch/video-lab/actions/runs/40035118643 — success.
- Quality job: 120692563055; Pages build job: 120692563601; deploy job: 120695494215. All completed successfully. Both workflows execute the same npm run check entry point before publishing. The cloud quality log confirms 16 unit-test files and all 175 browser tests; its browser stage took 7.3 minutes. The local complete gate separately recorded 80 unit tests and 175 browser tests.

## Public browser verification

Passed on the actual HTTPS publication in Chromium and Firefox at 390 px/dark theme. Each fresh browser loaded https://snowch.github.io/video-lab/, adopted the Mousepad source with immediate preview, ran bare ffprobe, and executed the minimal six/six/four-second edits. Downloaded files independently reported H.264/yuv420p, 1280 × 720 and 90/90/60 pictures using native ffprobe. All three files replayed. The downloaded shorter.mp4 recipe contained the exact command and original source SHA-256.

Both engines then exercised a genuine missing-file error, selected Publish output, personal-note exact download and an actually executed structured inspection report passing every measured criterion. The populated reference page reflowed at 200% text, no page exceptions were observed, and the footer identified 74891ca4aa9a5e4cfb34b0657d44d36cfbe67b9e with the matching-published-version state. The session proxy and trusted browser TLS configuration were used; no certificate-verification bypass.

Evidence: evidence/public-{chromium,firefox}-{source,comparison}.png. Execution log: /workspace/scratch/issue5/public-live-final.log; downloaded output probe JSON: /workspace/scratch/issue5/public-{chromium,firefox}-probe.json. These are public checks, separate from the earlier local rehearsal.

An initial public harness submitted the report while its controlled source was still loading. The app correctly rejected a concurrent operation, and no report was created. The harness now waits for the actual enabled Run control before pressing Enter. The repeated complete Chromium and Firefox public runs passed; the initial blocked attempt is not counted as a successful report check.

## Existing-version upgrade

Before pushing the implementation, a persistent Chromium profile loaded the actually published previous build d3b93fb75fda0b308d3040392fc0a56c4bbcc89c. It saved the practice source, genuinely encoded upgrade-cut.mp4 with its recipe, retained the custom draft `ffprobe -v error mousepad-demo.mp4`, and explicitly downloaded baseline lessons and optional processing tools.

Passed: reopened that old profile online, used Check for updates and the update/reload path as needed, and confirmed the new published commit. The source, generated output, recipe and exact custom draft survived. The retained output replayed. With the browser disconnected, the new app reloaded, retained the draft, then ran an actual bare probe against the stored source using the previously saved tools; the raw output reported its twelve-second duration.

Evidence: evidence/public-upgrade-offline.png. Old-profile seed and upgrade logs: /workspace/scratch/issue5/public-seed.log and public-upgrade.log; original published-version/source/draft snapshot: public-before.json. This is a browser profile/service-worker upgrade test, not a claim that a physical desktop/mobile app was installed.

## Limits and closure

Physical phones/tablets and native OS sharing dialogs are not claimed. Responsive sizes and enlarged text are browser emulation; capture permission/lifecycle cases, unsupported storage, old progress, source protection, retries and deliberate overwrites are covered by the automated gate. Public deployment and retained offline work passed separate verification. Issue #5 is ready to close; no implementation or review blocker remains.
