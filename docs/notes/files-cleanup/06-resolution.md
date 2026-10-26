# Integration and ranked fixes

Copyright © 2026 Christopher Snow.

1. Reader R1 / independently confirmed by sceptic: the existing hash router
   unmounted a dirty Files dialog when browser Back left the notebook for the
   archive. The dialog's text state was lost without changing the saved file.
   Keep pending text/form state in this app window across component unmounts;
   restore it on reopening Files. Do not save the draft over the file. Clear
   pending state after Save, Cancel or explicit Discard. A global App restart
   guard and beforeunload check retain protection even while the archive is
   showing. Ordinary back/forward URLs and browser history remain untouched.
2. Focused Firefox regression: after a rename removed the original row, a
   requestAnimationFrame could try to restore focus before React committed the
   closed form and enabled Import. Restore focus in a post-commit effect once
   controls are enabled. Use the existing summary if connected, otherwise Import.
   Cancel and copy continue to return to their original disclosure. The sceptic
   could not reproduce this intermittent timing failure in standalone scripts;
   the focused suite recorded the failed assertion and trace.

The initial focused run (`files-cleanup`, `course-index`, `notebook`,
`notebook-update`, desktop-light/phone-dark/Firefox) exited 1: 34 passed,
16 skipped, one failed Firefox focus assertion. No test was removed to conceal
that result. Root owns rerun/full gate and deployment evidence in 08-validation.

Other choices: keep the normal header Files button available on notebook home
and lessons, replacing the separate lesson utility. Main header uses one React
portal into a stable slot; the same Files dialog/state persists between notebook
pages. Archive controls retain their existing ownership. Source setup stays on
the lesson; the dialog has no source selector. Friendly labels are derived from
real provenance; supplied non-video assets are not called videos. Existing
storage limits and file-byte behaviour remain unchanged. Seventeen focused
read-only legacy detection tests cover absent/blocked storage, actual files,
notes/checks and local/session drafts; migration/theme flags do not count.

The unrelated learner-audit directory and synchronised shared platform were not
changed. Implementation, prose, reader, sceptic and checker are separate agents;
root does integration and release verification.
