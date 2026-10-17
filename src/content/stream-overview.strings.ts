// Copyright © 2026 Christopher Snow
import { fixture } from "../media/model";

export const streamOverview = {
  title: "Pictures and sound in one file",
  fileLabel: "Sample file",
  file: fixture.file,
  video: "Video stream",
  audio: "Audio stream",
  time: "Time moves from left to right",
  pictures: "Selected pictures in display order",
  tone: "Quiet synthetic tone",
  note: "The pictures are selected from this recording. The sound band illustrates a separate stream over time. This diagram does not show the arrangement of data inside the file or measure the changing sound level.",
  pictureAlt: "Selected picture from the build-queue recording",
} as const;
