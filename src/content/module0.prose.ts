// Copyright © 2026 Christopher Snow
import {
  audioStream,
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
  motivation: `This ${fixture.duration}-second recording shows a build queue. The capture script clicks Sort, and the browser puts the longest build first. The sound is a quiet synthetic tone, not narration. Inspecting the file lets you distinguish missing narration from a player that is merely muted. Listening is optional; the text describes the visual action.`,
  prediction:
    "A stream is a sequence of related media data inside a file, such as pictures or sound. This file contains a video stream and a synthetic audio stream. Predict whether muting the player changes which streams the file contains, then check your reasoning.",
  investigation: `A frame is one picture in the video stream. This recording contains ${frameCount} frames. Play the recording, then move the frame slider or choose a thumbnail. A frame index counts pictures from zero. The still below the player comes from the selected picture extracted from the recording. Its presentation timestamp, or PTS, says when that picture is due for display. PTS does not measure how long the player took to reconstruct the picture. FFmpeg is a set of media processing tools. Its inspection tool ffprobe recorded the timestamps used here. The rate readout gives pictures per second as a fraction: ${videoStream.rate} means ${Number(videoStream.rate?.split("/")[0]) / Number(videoStream.rate?.split("/")[1])} pictures per second here.`,
  construction: `The MP4 container organises the file's streams and their timing. Follow each branch in the diagram, then select a stream and a one-second interval. Video counts pictures; audio counts samples, individual measurements of sound. This file records ${audioStream.sampleRate?.toLocaleString("en-GB")} audio samples per second in ${audioStream.channels} channel. A channel is a separate sequence of sound measurements. Decoding reconstructs pictures or sound from stored data. An audio block groups samples reconstructed together. The different units explain why a picture count cannot stand in for a sound count.`,
  failureExperiment:
    "Test the claim that the audio sample and video picture at a selected time have matching indexes. Move the time control and compare their counts and units. An audio block packages several sound samples for decoding. Its start time can fall before the current video frame because sound blocks and pictures have separate boundaries. Sharing a playback clock does not make their indexes interchangeable.",
  explanation: `A codec specifies how media is encoded and decoded: stored as compressed data, then reconstructed for playback. This file uses H.264 for pictures and AAC for sound. MP4 names the container, not the picture codec. A time base gives the duration of one timestamp tick. Here the video time base is ${videoStream.timeBase} second per tick; adjacent frame timestamps differ by ${firstGap} ticks. Multiply ticks by the time base to obtain seconds. The decimal seconds shown by ffprobe are rounded; the recorded ticks remain exact. ffprobe is FFmpeg's command-line tool for inspecting media files.`,
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
    `Move the explorer to ${targetTime} seconds. Read the selected frame index and presentation timestamp beside the extracted still.`,
    `The target picture has PTS ${frameAt(targetTime).pts} ticks. Use the displayed time base, ${videoStream.timeBase} second per tick, to check its time in seconds.`,
    `Reference: video stream ${referenceAnswers.video}; audio stream ${referenceAnswers.audio}; container ${referenceAnswers.container}; picture codec ${referenceAnswers.codec}; frame ${referenceAnswers.frame}; PTS ${referenceAnswers.timestamp} seconds.`,
  ] as const,
};
