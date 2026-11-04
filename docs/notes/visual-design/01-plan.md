# Video Lab visual design

Copyright © 2026 Christopher Snow.

The owner asked to use a styling skill to make Video Lab beautiful. Apply the
public [Frontend Design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md),
read at blob `a5333457c414d20d625f307df945842c0952ecc3`. The site is a working
FFmpeg learning notebook, for technically experienced learners; the design must
make footage, commands and results easy to inspect.

## Direction and tokens

An editing studio with a calm reading surface. The footage is the visual focus;
interface colour and typography support it. No new marketing copy, invented
metrics, decorative controls or changes to command behaviour.

- Paper `#f3f5fa`, surface `#ffffff`, ink `#17243b`, secondary ink `#58657b`,
  action blue `#2854d8`, monitor `#172139`.
- Dark mode uses navy surfaces, pale text and lighter blue actions with dark labels.
- Manrope, locally bundled under its OFL licence, supplies body and display type.
  Use weight and scale for hierarchy; retain the system monospace for actual code.
- Left-aligned text, prose below 80 characters, existing wide chapter workspace,
  a larger media-led home introduction, generous section spacing and a quieter
  chapter index. Borders identify working editors or separate content groups.

Two layouts considered:

```text
A: learning notebook (chosen)       B: dashboard
[brand / status / tools]            [sidebar][cards cards]
[title + intro | footage]           [stats ][cards cards]
[chapter sequence in two columns]   [table ][activity   ]

Chapter:
[overview]
[chapter / page context]
[title + goal]
[practice source and wide player]
[readable explanation]
[command workspace: editor / Run / result]
[practice workspace]
[completion and next page]
```

Review against the brief: reject dashboard B because this course is a sequential
lesson, with no dashboard metrics. Keep the source picture as the one bold visual;
remove the idea of decorative waveform backgrounds or animated hero entrances.
Use blue for controls consistently, rather than colouring individual headline
words. Chapter numbers remain because they represent the actual course order.
Reference pages keep their current readable width. Existing lesson wording stays.

## Implementation and verification

Refine shared palette, typography, header and buttons; restyle the notebook home,
chapter index, lesson hierarchy, media frames and command workspaces. Keep existing
routes, controls, keyboard order, storage and actual media processing. Fonts must
load from this app and be included in the offline manifest.

Inspect built overview, chapter and reference pages at phone, tablet and desktop
sizes in both themes. Independent reader, sceptic and checker reviews follow the
repository workflow. Check enlarged text, contrast, focus, media, editor/builder
switching, output and navigation. Run the full required quality gate after fixes.

## User feedback on interior balance

The owner found the first pass still squashed to the left. The wider shell alone
left the timeline, option definitions and prose capped at their old width inside
the working panel. Revise the composition: full-width cut plans; option definitions
distributed across responsive columns; a primary Run action separated from export
actions; tool identity aligned to the panel's opposite edge. Widen prose to 76ch
and centre the bounded reading blocks beneath media and command explanations.
Text itself stays left aligned. Narrow screens retain a single reading flow.
