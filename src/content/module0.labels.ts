// Copyright © 2026 Christopher Snow
export const labels = {
  title: "What is a digital video?",
  objectives: [
    "Distinguish a file container, its streams and their codecs.",
    "Locate a picture using recorded presentation timestamps.",
    "Explain why audio samples and video frames have different counts.",
  ],
  sections: {
    question: "What did the recording capture?",
    motivation: "Inspect before cutting",
    prediction: "Predict the effect of muting",
    investigation: "Inspect pictures and timestamps",
    construction: "Follow the streams",
    failureExperiment: "Test matching indexes",
    explanation: "Read the file and timing vocabulary",
    generalisation: "Inspect an unfamiliar recording",
    challenge: "Complete an inspection record",
    reflection: "Investigate silent narration",
  },
  captions: {
    prediction:
      "Muting changes playback. Predict what happens to the file before checking.",
    explorer:
      "The player previews the recording. The extracted still and recorded timestamps identify the selected picture.",
    streams:
      "An explanatory diagram of the measured streams. Choose a branch and interval to compare pictures with sound samples.",
    failure:
      "Compare a picture index with an audio sample position at the same playback time.",
    challenge:
      "Read the evidence above, enter your answers and run the checks. You can edit and retry.",
    reflection:
      "Your optional note stays in this browser. It does not affect the challenge result.",
  },
  challengeTitle: "Recording inspection",
  fields: {
    video: "Video stream index",
    audio: "Audio stream index",
    container: "File container",
    codec: "Picture codec",
    frame: "Frame index, counted from zero",
    timestamp: "Frame PTS in seconds",
  },
  feedback: {
    video:
      "Read the index on the video branch. The stream index identifies the picture sequence within this file.",
    audio:
      "Read the index on the audio branch. Muting the player does not remove that branch from the file.",
    container:
      "Use the name of the format that organises the whole file. A picture codec describes only one stream.",
    codec:
      "Use the codec shown for the video stream. The file container and the audio codec describe different things.",
    frame:
      "Select the requested time in the explorer and read its frame index. Seconds and picture indexes have different units.",
    timestamp:
      "Enter the selected picture’s PTS in seconds. The tick count needs the time base before it becomes seconds.",
  },
};
