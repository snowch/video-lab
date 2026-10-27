# Review resolution

Copyright © 2026 Christopher Snow.

R1 (minor): the learner reviewer observed both a generic global “Working” status and contextual “Loading practice files…” while a source request was held. The separate sceptic reproduced and retained the finding. Keep the contextual status and suppress the generic status for quiet automatic preparation, including its live-region text. Active commands, draft saving and session-only warnings retain their existing status behaviour. The loader, command execution and retry behaviour are unchanged by this fix.

Implementation exposes the existing quiet operation as `preparingPractice` to the shell and resets it when the operation finishes. The pending-download regression check asserts both hidden generic chrome and empty generic live text. The builder intentionally interrupted the first full check after this review finding to rebuild the corrected product and rerun the gate. That interrupted run is not a full pass.

The separate final checker verifies the built correction and normal/error/offline/source-preservation flows before merge. No additional setup confirmation or permanent status was introduced.

A final builder text sweep found stale manual-loading instructions in the empty Files dialog, the title lesson and the command-reuse lesson. The separate prose agent revised those strings: opening a lesson provides its practice videos, the supplied font's role remains explained, and the reuse lesson retains its still-required folder creation. The fontsdir explanation in the subtitles lesson describes FFmpeg behaviour and is unchanged. An early restarted check was interrupted to rebuild this final copy as well; final validation uses the complete revised source. Reader and technical follow-up plus final built checking cover these corrections.
