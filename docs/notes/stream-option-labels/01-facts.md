# Stream option labels and independent paths

Copyright © 2026 Christopher Snow.

The owner requested retaining “none” as a mnemonic, explicitly approving `-an — audio: none` and `-vn — video: none`, with two independent paths from the original file. Implement on a separate branch and do not merge or push to main.

Verified existing commands in `src/notebook/structure.ts` independently read `bunny-short.mp4`: `ffmpeg -i bunny-short.mp4 -an silent.mp4` and `ffmpeg -i bunny-short.mp4 -vn sound.wav`. These are output options: audio disabled in the first, video disabled in the second. The source remains unchanged. “Audio: none” and “video: none” are memory aids, not a claim about a formal expansion of the option name. Existing native teaching verification and actual command tests cover the outputs.

The current shared inspection diagram has a source container and two output columns. Those columns stack on small screens. Replace the ambiguous downward arrows with an explicit original-source label on each path. Show each approved flag/mnemonic, its destination filename and its retained stream. Do not change commands, measurements, notebook state or other diagrams. Copy stays in inspect.strings.ts. Separate drafting/independent built reviews and existing relevant checks apply. The unrelated untracked learner-audit notes remain untouched.
