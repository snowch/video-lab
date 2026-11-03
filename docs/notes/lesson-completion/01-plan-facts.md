# Manual lesson completion

Copyright © 2026 Christopher Snow.

The owner requests a checkbox beside Next lesson and completion ticks in the course index, using Assembly Lab as a reference. Completion is self-declared and reversible; commands, checks and navigation never set it. All current numbered notebook pages, including the last, get the checkbox. Optional references and archived routes are outside this slice.

Verified sources: current `Notebook.tsx` renders the flat chapter/page index and end-of-page pager; `structure.ts` supplies stable page IDs. Assembly Lab's `apps/course/src/lesson-completion.ts` stores separate versioned localStorage keys per lesson, independently of challenge results, and reconciles storage events. Its current control is a button; the owner explicitly requests a native checkbox here.

Implement app-owned storage with one versioned key per stable page ID. Only literal true counts as completed; missing, malformed and unknown entries do not. Writes never touch other progress/files/drafts. Reconcile other-tab changes from current durable values. Failed writes retain this session's choice and show a short save-failure note. Do not block navigation. Completion ticks include accessible text and preserve link titles.

Verification: unit tests for storage isolation/failures/reconciliation; built-browser tests for mark/unmark, reload, back/forward, last page, no automatic completion, independent pages/tabs, storage failure, phone/desktop light/dark, keyboard and narrow/enlarged reflow. Mandatory separate prose, fresh built reader, sceptic and checker follow. Run full npm run check, open PR and merge only after successful quality gates.
