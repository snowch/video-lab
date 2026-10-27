# Supplied ffprobe guide copy

Copyright © 2026 Christopher Snow.

Drafted separately from the verified brief in `01-plan-facts.md`, after reading the existing strings and guide rendering. These are recommended learner-visible strings; no implementation is included here.

## `inputMeaning`

`Input #0` identifies the first input file. `mov,mp4,m4a,3gp,3g2,mj2` names one reader that handles related container formats. This supplied file is an MP4; the separate `Stream` lines identify what it contains.

## New Duration row

Excerpt: `Duration: 00:00:08.00 … bitrate: 352 kb/s`

Use the following as two paragraphs beside the excerpt, preserving literal code styling. If the strings remain separate from structure, `durationMeaning` can hold two paragraph strings.

`Duration` is eight seconds. `bitrate: 352 kb/s` is the average data rate for the whole file, including video, sound and container information. `kb/s` means kilobits per second: approximately 352,000 bits each second. With eight bits in a byte, that is about 44,000 bytes per second.

This averages the data across the file's duration; it does not mean every second contains the same amount. Bitrates on individual `Stream` lines describe those streams separately. Bitrate measures data rate, not playback speed.

## Factual basis and editorial choices

The brief verifies the supplied file's eight-second duration and its measured whole-file average of 352138 bits/s. The displayed integer `352 kb/s` therefore needs approximate conversions. The reader name comes from native demuxer help and FFmpeg's MOV reader declaration; the copy does not present it as an exhaustive list of supported extensions or as a stream count. Retain the existing video and audio descriptions unchanged.

The two Duration paragraphs separate the field and unit definitions from the limits of interpreting an average. No new activity or codec explanation is required.

## Builder edit

The implemented Input paragraph explicitly says ffprobe prints the shared reader’s format names and gives MOV/3GP as concrete examples, matching the owner-approved explanation without claiming an exhaustive extension list. The Duration copy keeps two paragraphs, clarifies that `352 kb/s` (not the unit alone) is about 352,000 bits per second of playback, bolds the newly defined term and retains the file/stream and average/playback distinctions.
