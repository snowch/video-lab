# Chapter width: resolution and validation

Copyright © 2026 Christopher Snow.

Reader R1 is accepted: the chapter workspace used the paragraph-width shell.
Sceptic S1 is accepted: removing that CSS rule would also widen reference prose.
The final implementation changes the class condition in `Notebook.tsx` so only
chapter pages stop using the narrow shell. Reference pages retain their existing
class and width. Paragraph and diagram measures, phone gutters and the bounded
course shell stay in CSS. No learner-visible wording changed, so a separate prose
draft was not applicable.

Independent reader, sceptic and checker agents are distinct from the implementing
agent. Their scoped built-site reviews are recorded in this directory. These are
layout and interaction checks, not evidence of learning outcomes or a claim to
have reviewed every chapter's teaching.

The initial broad CSS candidate's quality run was stopped after the sceptic
identified S1. The full check was restarted on the final scoped implementation.

## Final results

- `npm run check` — passed with exit code 0. Formatting, copyright,
  synchronised-platform integrity, strict TypeScript, 138 unit tests across 33
  files, all recorded-media/native-command checks and production/offline builds
  passed. Playwright completed with 506 passed and 99 configured skips across
  desktop light/dark, phone light/dark and Firefox (19.7 minutes).
- `node /workspace/scratch/chapter-width/checker.cjs` — passed independent final
  layout/control checks at 390, 820 and 1365 pixels in both themes. All 24 sampled
  route/viewport/theme combinations had no horizontal overflow.
- `git diff --check` — passed.

The final full-check log is `/workspace/scratch/video-lab-check-final.log` in the
working environment. No required check failed. Review does not claim testing on
physical devices. The change is prepared for review; it has not been deployed.
