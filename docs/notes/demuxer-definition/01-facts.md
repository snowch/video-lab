# Define demuxer at first use

Copyright © 2026 Christopher Snow.

The owner approved replacing Chapter 2’s worked-example introduction with a direct definition of a demuxer as a container reader, plus the concrete MP4/video/audio example proposed in the conversation. Merge is explicitly authorised.

This is a prose-only continuation of [the verified container-brands slice](../container-brands/01-facts.md). The official [FFmpeg demuxer documentation](https://ffmpeg.org/ffmpeg-formats.html#Demuxers) describes readers of streams from file types. The current source fixture contains video and audio in MP4, verified by the existing native media checks. Container and stream are introduced earlier on this page. Reading streams separately does not mean saving separate files or decoding pictures/sound. The text must not imply either.

Change only the worked introduction, retaining the real bare ffprobe command, raw output and existing metadata explanation. No new UI, tests duplicating prose, media assets or processing behaviour are needed. Use separate drafting, built learner review, sceptic adjudication, and built checking under this directory, then the required full `npm run check` and reviewed main merge. Preserve unrelated learner-audit notes.
