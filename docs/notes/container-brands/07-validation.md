# Validation and publication

Copyright © 2026 Christopher Snow.

## Local checks

`npm run check` exited 0 on 27 October 2026. Log: `/workspace/scratch/container-brands/check.log`.

- Formatting, copyright, unchanged platform, strict TypeScript: passed.
- 25 unit files / 110 tests: passed.
- Native media and all 51 notebook reference commands: passed.
- Native visual verification additionally compares the two recorded Metadata lines with actual source tags. The supplied media assets and their hashes are unchanged.
- Production build and offline bundle: passed.
- Browser suite: 336 passed, 49 configured skips; 16.2 minutes. No full-gate failure or rerun.

The existing responsive visual test now checks the disclosure’s initially closed state, Enter/Space and pointer/touch operation, exact registry destination and expanded reflow. Existing byte-for-byte live-log checks remain intact. No network dependency on the registry is introduced.

Independent drafting, learner review, technical sceptic adjudication and built checking are recorded in 02–06. The builder additionally inspected the final 320px phone disclosure screenshot. No post-review product edits or unresolved findings. Reviews distinguish an already-loaded offline explanation from fresh cold offline installation; the full existing browser suite covers complete offline saving/upgrades separately.

Unrelated untracked `docs/notes/learner-audit-2026-10-18/` is excluded. The owner’s standing reviewed-main authorisation applies. Hosted and live verification results follow after publication.
