# Resolution: command help columns

Copyright © 2026 Christopher Snow.

The shared command-option definition list now uses one row per parameter, with
the syntax at the left and its description at the right. The description receives
two thirds of the available width. This removes the previous arrangement of whole
parameter/description groups into multiple columns. At 600 CSS pixels and below,
each description follows its parameter vertically to preserve phone readability.

Existing definition-list semantics, command order, prose, controls and processing
behaviour are retained. The change is confined to notebook CSS. No new tests were
added for this reversible presentation correction; existing browser coverage and
independent built-page checks exercise the relevant layouts and controls.

The separate reader found no actionable issue in 48 combinations. The sceptic
accepted that result after 30 independent checks, including both sides of the
responsive breakpoint. The final checker verified 60 layout combinations and six
control probes. No ranked fixes remained after these reviews. Their records state
the actual scope and the deliberate phone-stacking exception.

The [tablet preview](evidence/rate-820-light.png) is a native browser crop of the
frame-rate lesson's help list. It shows the requested parameter/description rows.

The full release gate is `npm run check`, identical to CI. The associated pull
request records the final local and GitHub results before merge; review completion
alone is not a claim that this wider quality gate has passed.
