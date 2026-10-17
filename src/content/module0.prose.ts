// Copyright © 2026 Christopher Snow
import {
  fixture,
  frameAt,
  frameCount,
  referenceAnswers,
  targetTime,
  videoStream,
} from "../media/model";

const firstGap = fixture.frames[1]!.pts - fixture.frames[0]!.pts;

export const prose = {
  question:
    "Before cutting a screen recording, find out what pictures and sound the file contains and when they belong on screen. Can a quiet preview tell you whether sound was recorded?",
  motivation: `The sample file provided with this lesson, \`${fixture.file}\`, is a ${fixture.duration}-second recording of a build queue. You can play it below in [Inspect pictures and timestamps](#/module-0/investigation).

The capture script clicks Sort, and the browser puts the longest build first. The sound is a quiet synthetic tone, not narration. Inspecting the file lets you distinguish missing narration from a player that is merely muted. Listening is optional; the text describes the visual action.`,
  prediction: `A stream is a sequence of related media data inside a file, such as pictures or sound. The sample recording, \`${fixture.file}\`, contains a video stream and a synthetic audio stream. Predict whether muting its player changes which streams the file contains, then check your reasoning.`,
  investigation: `A frame is one picture in the video stream. This recording contains ${frameCount} frames. A frame index counts pictures from zero.

Play the recording, then move the frame slider or choose a thumbnail. The still below the player is the selected picture extracted from the recording. Use Previous frame and Next frame to inspect neighbouring pictures.

The presentation timestamp, or PTS, says when a picture is due for display. It does not measure how long the player took to reconstruct it. To find a requested time, move among recorded frames while watching their PTS readout.`,
  construction: `The MP4 container organises the file's streams and their timing. Follow the branches below, then select a stream and a one-second interval.

A codec specifies how a stream is encoded for storage and decoded, or reconstructed, for playback. This recording uses H.264 for pictures and AAC for sound; both encodings compress the stored data. Compression is a property of these encodings, not a requirement of every codec.

Video counts pictures. Audio counts samples, individual measurements of sound. A channel is a separate sequence of sound measurements. The audio branch explains how those samples are grouped.`,
  failureExperiment:
    "Test the claim that the audio sample and video picture at a selected time have matching indexes. Move the time control and compare their counts and units. An audio block packages several sound samples for decoding. Its start time can fall before the current video frame because sound blocks and pictures have separate boundaries. Sharing a playback clock does not make their indexes interchangeable.",
  explanation: `The container and codecs describe different parts of the recording. MP4 organises both streams, while each codec specifies how its stream is represented. Finding an audio stream does not establish that it contains narration; this file contains a synthetic tone.

The measured video timestamps connect picture order to time. Here adjacent pictures differ by ${firstGap} ticks, with ${videoStream.timeBase} second per tick. Multiplying the gap by the time base gives the time between pictures. The decimal seconds shown by ffprobe are rounded; the recorded ticks remain exact.`,
  generalisation:
    "For another recording, inspect the container, each stream and the recorded presentation timestamps before choosing cuts. A stream index identifies a stream within that file; do not assume that video always comes first. This sample has equally spaced pictures, called constant frame rate. Other recordings have unequal frame intervals, called variable frame rate. An average frame rate alone cannot locate each picture in those files.",
  challenge:
    "Use the explorer and the stream diagram to complete the inspection record. Every answer is available on this page. Run the checks, read any field feedback and revise your answers. The hints progress from where to look to a complete reference answer.",
  reflection:
    "A colleague reports that the narration is silent. What would you inspect before deciding to record it again? Consider whether an audio stream exists, what it contains and whether the player is muted. Write an optional note for your next recording; the note is not graded.",
  modelVsReality:
    "The browser plays the MP4 and reports its playback position as currentTime. That value is a browser time estimate and may have reduced precision. The frame inspector uses separately recorded ffprobe timestamps and independently extracted stills. It selects the last recorded presentation timestamp at or before your chosen time. It does not obtain a reliable frame index from the browser player.",
  modelNote:
    "This is a scripted capture of an original browser app, assembled into a recording. The stream diagram explains the file structure; it is not an audio waveform or a live decoding trace. The sampled thumbnails are extracted pictures from this file. All reported stream properties describe this recording, not every MP4.",
  challengeTask: `Inspect the picture due at ${targetTime} seconds. Enter the video and audio stream indexes, the container, the picture codec, the frame index and its PTS in seconds.`,
  hints: [
    "Start with the stream diagram. Each branch names its type and index. The container belongs to the whole file.",
    "A codec belongs to a stream. Find the picture codec on the video branch; the sound codec answers a different question.",
    `Move the recorded-frame slider close to ${targetTime} seconds, watching the PTS readout. Use Previous frame or Next frame until the recorded PTS matches the requested time, then read the frame index.`,
    `The target picture has PTS ${frameAt(targetTime).pts} ticks. Use the displayed time base, ${videoStream.timeBase} second per tick, to check its time in seconds.`,
    `Reference: video stream ${referenceAnswers.video}; audio stream ${referenceAnswers.audio}; container ${referenceAnswers.container}; picture codec ${referenceAnswers.codec}; frame ${referenceAnswers.frame}; PTS ${referenceAnswers.timestamp} seconds.`,
  ] as const,
};
