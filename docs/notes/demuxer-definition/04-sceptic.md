# Independent sceptic review: demuxer definition

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by a separate technical sceptic. Scope: the one changed worked-example introduction at `#/learn/inside-video/inspect`; no product edits or commits.

## Built paragraph and factual review

Independently read the built paragraph at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect`, then checked it against `01-facts.md`, the source diff, the existing verified media facts, and the official [FFmpeg demuxer definition](https://ffmpeg.org/ffmpeg-formats.html#Demuxers). The official source was fetched during the immediately preceding container-brands review on the same date and retained under `/workspace/scratch/container-brands/sceptic/ffmpeg-formats.html`.

The built paragraph says:

> ffprobe inspects a media file without changing it. It uses a demuxer: a container reader that identifies the streams inside the file and reads their data separately. For example, an MP4 demuxer can read the video and audio streams stored together in an MP4 file. FFprobe then reports format information, duration and a description of each stream.

No factual defect found. FFmpeg describes demuxers as reading multimedia streams from a particular file type. The direct “container reader” definition names that role accurately. Reading each stream's data separately describes demultiplexing; the paragraph does not claim to save separate files, decode pictures or sound, or edit the input. The MP4 example uses “can”, so it does not require every MP4 file to contain both kinds of stream. It also makes no claim that the shared demuxer-name list uniquely classifies this file.

The existing verified fixture record identifies an MP4 containing video and audio. A fresh native check independently confirmed video stream 0 (`h264`), audio stream 1 (`aac`), eight-second duration and the shared MOV/MP4-family format name:

```sh
ffprobe -v error -show_entries format=format_name,duration:stream=index,codec_type,codec_name -of json public/media/notebook/bunny-short.mp4
```

Thus the concrete example and the summary fields match the supplied file; they are not invented measurements.

## Built presentation and limits

Ran `node /workspace/scratch/demuxer-definition/sceptic/read.mjs` using standalone Node Playwright, without Playwright CLI tests. The built paragraph matched the reviewed wording at widths 1440 and 390 in light and dark. Visually inspected all four paragraph screenshots: readable wrapping, visible emphasis on demuxer and no clipping. Document width equalled the viewport in each context. Evidence is in `/workspace/scratch/demuxer-definition/sceptic/`, including `observations.json`.

This narrow pass did not rerun processing, encodes or the full quality gate; no processing behaviour changed.

## Reader adjudication

Read the completed `03-reader.md`. Its no-finding conclusion and suggested retention are justified. Container and streams precede the definition on the actual page; the concrete MP4 example connects the new term to that existing explanation, and the final sentence connects it to the pending ffprobe output. No additional prerequisite is needed to understand this paragraph. The reader's reported desktop/phone, light/dark, normal/doubled-text and unchanged-control checks add no contrary evidence. No reader finding requires retention, rejection or a ranked fix.
