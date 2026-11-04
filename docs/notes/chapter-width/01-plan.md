# Chapter width

Copyright © 2026 Christopher Snow.

The supplied screenshot shows a chapter using a narrow centred column while the
course overview fills the same tablet viewport. The chapter shell currently caps
its entire contents at `calc(62ch + 2.5rem)`, including videos and command editors.
The shared notebook shell already provides a bounded `68rem` layout with responsive
gutters. Paragraphs, option explanations and diagrams have their own `62ch` caps.

Apply the extra shell cap only to reference pages so notebook chapters share the
course overview's available width. Retain the existing text measures, responsive
gutters, media height cap, lesson order and controls. No learner-facing prose,
media facts, commands, storage or synchronised platform changes are needed.

Review the built site independently as reader, sceptic and checker, including the
reported tablet width, phone and desktop, both themes, editor/builder controls and
no horizontal overflow. Use existing reflow/control tests and the repository's
required `npm run check`; document failures and unrun checks accurately.
