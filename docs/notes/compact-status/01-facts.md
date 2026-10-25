# Compact App status: verified brief

Copyright © 2026 Christopher Snow.

Verified on 25 October 2026. This slice changes the placement and disclosure of existing App status information. It does not change update, offline, installation or saved-work behaviour.

## Reference facts

The public [Assembly Lab](https://snowch.github.io/assembly-lab/) entry fetched on this date identifies source commit `318e0c4fdea5d682ff3259a02c322c7f401ffdac`. Its static HTML places App status in `header.shell-header`. The hydrated source at that exact commit places `AppStatus` inside the app header and uses a native `details`/`summary` disclosure. Its summary contains the title, a decorative chevron, a version badge and a separate offline badge. Source commit, running build and commit date remain inside the expanded panel.

Exact sources:

- [AppStatus.tsx](https://github.com/snowch/assembly-lab/blob/318e0c4fdea5d682ff3259a02c322c7f401ffdac/apps/course/src/AppStatus.tsx): header-relative panel sizing, native disclosure, Escape returning focus to summary, independent readable indicators and detailed identity.
- [App.tsx](https://github.com/snowch/assembly-lab/blob/318e0c4fdea5d682ff3259a02c322c7f401ffdac/apps/course/src/App.tsx): `AppStatus` mounted in the header.
- [strings.status.ts](https://github.com/snowch/assembly-lab/blob/318e0c4fdea5d682ff3259a02c322c7f401ffdac/apps/course/src/strings.status.ts): compact offline states are “Not saved offline”, “Saving offline copy”, “Saved offline”, “Offline copy incomplete” and “Offline unavailable”. Current version copy is “Up to date”.
- [layout brief](https://github.com/snowch/assembly-lab/blob/318e0c4fdea5d682ff3259a02c322c7f401ffdac/docs/notes/app-status-layout/brief.md): author records removing source/build/date from the closed button, preserving independent update/offline indicators, constraining panel width/height, and retaining verified storage and restart decisions.

Fetched reference files are retained outside the product at `/workspace/scratch/compact-status/reference/`. This is source inspection, not a claim of browser verification of the reference site. Assembly Lab source and public HTML carry Copyright © 2026 Christopher Snow. This slice introduces no third-party image or asset; source inspection informs the layout and existing shared terminology.

## Existing Video Lab facts and safety constraints

Verified against `src/app-status/AppStatus.tsx`, `strings.ts`, `useAppStatus.ts` and `docs/app-status-contract.md` before implementation:

- Both app entries already use the same stateful App status component. Existing summary exposes the embedded source/build identity; Version includes its source link. Moving identity into Version preserves access without a prominent closed version card.
- Release freshness and full offline completeness are independent. `latest` follows a successful validated live release check matching the embedded running build. `offlineCheck` and `failedCheck` must never be shortened to “Up to date”.
- Pending prepared updates remain visible even if the latest release check fails or the connection is lost. Prepared does not mean activated; activation remains an explicit guarded restart.
- Full offline readiness requires verified lessons/media and processing tools (`lessons.ready && tools.ready`). A registered worker, partial cache or prepared update is insufficient.
- Offline state can be idle, saving, ready, incomplete or unavailable; removal and active transfers also have existing flags. A failed replacement can retain an older complete offline copy, so failure alone must not imply the verified copy vanished.
- Retain transfer progress/cancellation, update preparation, confirmation before scoped removal, installation controls, per-window acknowledgement and restart safety. Do not change hooks, worker protocol, caches, stored drafts, user media or achievements for this presentation task.
- Identity remains the embedded running identity, never the fetched deployed identity. Preserve both commit and deterministic build suffix in expanded Version, including the truthful source-archive fallback.

## Design decisions to validate

Place the same App status disclosure in both headers; display the title and two short text badges when closed; show all identity, actions and explanation in its expanded panel. Keep native keyboard activation and visible focus; support Escape/focus return, phone widths, intermediate widths, short screens, enlarged text and both colour themes. Badge colour supplements text. Ensure an open panel fits the viewport and can scroll to every control. Existing update/offline state and behaviour tests remain applicable.

The old contract's closed-identity wording describes the previous design. Update that presentation sentence when implementing; keep its behavioural constraints intact.
