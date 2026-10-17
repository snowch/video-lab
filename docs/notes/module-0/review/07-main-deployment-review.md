# Independent targeted review — main deployment follow-up

Copyright © 2026 Christopher Snow.

Reviewed 17 October 2026 by the independent gpt-6.1-sol checker with high reasoning effort. This is a narrow follow-up to `05-checker.md`, after the owner explicitly authorised deploying straight to `main`. I did not author the deployment change and made no source edits. This review covers the five-file configuration/documentation diff, not another learner-content review.

## Accepted configuration

- `.github/workflows/pages.yml` changes only the push branch from `codex/intro-module-0` to `main`. Manual dispatch remains available.
- The build still installs locked npm dependencies, native FFmpeg and Chromium/Firefox, then runs the complete `npm run check` before configuring Pages or uploading `dist/`. `scripts/check.sh` still covers formatting, copyright, copied-platform hashes, strict types, tests, native media verification, production build and browser tests. The separate CI workflow also runs that full entry point on pushes and pull requests.
- Deployment still has `needs: build`, so a failing build/check prevents deployment. The deployment job still names the `github-pages` environment; no protection is removed or bypassed. A fresh read of GitHub's deployment-branch-policies API returned exactly one permitted branch, `main`.
- `AGENTS.md` records the owner's later authorisation as superseding the initial instruction to leave `main` unchanged. README and the implementation/validation records distinguish the original project-branch blocker from the authorised main delivery. No lesson, model, fixture or synchronised platform file is changed by this diff.

The configuration is ready for the authorised main delivery. This inspection does not establish a successful remote check, merge or deployment.

## Pending documentation evidence at review time

README, `implementation.md` and `06-validation.md` refer readers to PR #2 for subsequent deployment/live-site verification. My first API read caught the delivery update in progress: PR #2 was still open against `codex/intro-module-0` with the original “Configured, not deployed” blocker. I reported that timing issue, then independently repeated the read after the delivery agent's update. The second response confirmed the new `main` base and a body explicitly stating: “Deployment and live-site verification will be recorded here after the merge and Actions run complete.” The stale PR status is therefore resolved; actual deployment/live evidence remains pending and is not claimed by this review. The documentation's references identify the delivery record, not proof that it has already completed.

## Independently executed checks and limits

```sh
git status --short
git diff --stat
git diff
cat .github/workflows/pages.yml
cat .github/workflows/ci.yml
cat scripts/check.sh
cat docs/notes/module-0/review/06-validation.md
gh pr view 2 --json number,state,body,url,baseRefName,headRefName
gh api repos/snowch/video-lab/environments/github-pages/deployment-branch-policies
```

The diff contained exactly the five requested files: the Pages workflow, `AGENTS.md`, README, implementation record and validation record; 9 insertions and 7 deletions before adding this report. Both GitHub reads succeeded. I did not modify GitHub settings or send any external message.

I did not rerun the browser review or full quality suite for this configuration/documentation-only change. CI and the Pages build remain responsible for executing the complete quality gate on the delivered revision. Branch protection, PR merge state, workflow success and the live site must be assessed from their actual delivery results, not inferred from this static review.
