// Copyright © 2026 Christopher Snow
export const cap = {
  lessonNumber: "MODULE 0 / CAPTURE YOUR FIRST SOFTWARE DEMO",
  title: "Capture your first software demo",
  objectives: [
    "Record a short screen demonstration of one visible software action and download the real file.",
    "Choose capture settings deliberately: readable scaling, a clear start and stop, and a pause after the result.",
    "Know what your browser recorded: format, resolution, duration and whether sound was captured.",
  ],
  sections: {
    question: "What did you actually record?",
    motivation: "Record one action, watch it back",
    prediction: "Predict what the recorder will name its file",
    investigation: "Inspect your recording",
    construction: "Static capture pipeline",
    failureExperiment: "When capture is not available",
    explanation: "What the browser capture APIs do",
    generalisation: "Capture habits that make a demo clear",
    challenge: "Plan a clean capture",
    reflection: "Note what went wrong",
  },
  captions: {
    recorder:
      "A real browser screen recorder. It captures a screen, window or tab you choose and produces a real file you can replay and download.",
    fallback:
      "A pre-recorded original demonstration used when this browser cannot capture a screen. You did not record this file; it is labelled so you can still inspect and edit it.",
    pipeline:
      "A static diagram of the browser capture pipeline: the visible app, the display or window you select, the browser recorder, the real output file, and playback.",
    challenge:
      "Plan your capture: choose the action, the surface and the capture settings, then check your plan.",
    reflection: "Optional notes for your next recording; these are not graded.",
  },
  start: "Start recording",
  stop: "Stop recording",
  reRecord: "Record again",
  download: "Download the recording",
  replay: "Replay",
  useFallback: "Use the pre-recorded original instead",
  fallbackActive: "Showing the labelled pre-recorded original",
  recording: "Recording…",
  requesting: "Waiting for you to choose a screen, window or tab…",
  elapsed: "Elapsed",
  state: "Recorder state",
  stateIdle: "Idle",
  stateRequesting: "Waiting for source",
  stateRecording: "Recording",
  stateStopped: "Stopped — replay or download below",
  container: "Format",
  resolution: "Resolution",
  tracks: "Captured tracks",
  audioIncluded: "Audio",
  audioYes: "Yes — a track was captured",
  audioNo: "No — video only",
  duration: "Duration",
  privacy:
    "Your recording stays in this browser. It is not uploaded anywhere, and no account is needed.",
  unsupported:
    "This browser cannot capture a screen here. Some mobile browsers and non-secure pages do not support screen capture. You can continue the course with the labelled pre-recorded original below.",
  denied:
    "Permission was denied or the picker was dismissed. Nothing was recorded.",
  ended: "The screen share ended before you stopped the recorder.",
  mimeNote:
    "The format name comes from the recorder's detected MIME type. Browsers usually record WebM; this course later builds an MP4 separately.",
  fallbackNote:
    "This file was recorded in advance from the course's original build-queue demo. It is a real recording, but it is not yours: the lesson labels it so no one mistakes it for a new capture.",
  fallbackFile: "build-queue-original.webm",
  challengeTitle: "Capture plan",
  fieldLabels: {
    surface: "What you will show",
    action: "The one action you will perform",
    scaling: "Application scaling before recording",
    hold: "Pause after the result, seconds",
  },
  options: {
    app: "One application window",
    tab: "One browser tab",
    screen: "The whole screen",
    zoom100: "100% (native size)",
    zoom125: "125%",
    zoom150: "150%",
    hold2: "2",
    hold4: "4",
    hold6: "6",
  },
  feedback: {
    surface:
      "Recording the whole screen captures unrelated windows and notifications. Choose the smallest surface that shows the action clearly: one window or one tab.",
    action:
      "A demo needs one visible action with a readable result. Showing several actions at once makes the viewer guess which one matters.",
    scaling:
      "Small text becomes unreadable when a wide window is squeezed into a video. Increase the application's scaling before you record so the result stays legible at playback size.",
    hold: "Stopping immediately after the result gives viewers no time to read it. Pause for a few seconds after the action completes, then stop.",
  },
  hints: [
    "Think about what a viewer needs to see: one action and its result.",
    "Notifications, extra windows and sensitive data all end up in a whole-screen recording.",
    "Text that is readable on your screen can be unreadable in a scaled-down video; zoom the app first.",
    "A clear start, the action, a pause on the result, then a stop.",
    "Reference: one window or tab; one action; enlarge the app's scaling; pause about four seconds after the result.",
  ],
  modelNote:
    "The recorder uses your browser's real screen-capture and recording APIs. The pipeline diagram is a static illustration of that flow; it does not animate or simulate a recorder.",
  modelVsReality:
    "The recorder, the produced file, the replay and the download are real browser behaviour on real bytes. The track and duration readouts come from the browser's MediaStream and MediaRecorder APIs; where the browser only estimates a value, the lesson says so.",
  nativeTitle: "Record on your own computer (optional)",
  nativeIntro:
    "The browser exercise above is the course's main path. If you want a terminal workflow, your own FFmpeg can capture a desktop directly. These commands are references, not part of the graded path; each is verified for the FFmpeg version and platform noted.",
  nativeWindows:
    "Windows (FFmpeg 7.x): ffmpeg -f gdigrab -r 30 -i desktop -c:v libx264 -pix_fmt yuv420p demo.mp4",
  nativeMac:
    "macOS (FFmpeg 7.x): ffmpeg -f avfoundation -r 30 -i 1:0 -c:v libx264 -pix_fmt yuv420p demo.mp4 (find device IDs with: ffmpeg -f avfoundation -list_devices true -i dummy)",
  nativeLinux:
    "Linux X11 (FFmpeg 7.x): ffmpeg -f x11grab -r 30 -video_size 1920x1080 -i :0.0 -c:v libx264 -pix_fmt yuv420p demo.mp4",
  nativeWayland:
    "Linux Wayland: FFmpeg cannot read the screen directly. Use a portal/PipeWire recorder such as OBS, or record with a browser and process the file with FFmpeg afterwards.",
  nativeAudio:
    "Audio is a separate choice on every platform: add a microphone or loopback input as a second -i and map it, for example -map 0:v:0 -map 1:a:0. Support varies by OS and device.",
  nativeLimits:
    "These commands assume a local FFmpeg install and a capture device the OS exposes. They are not portable across versions, and none of them runs inside this web page.",
} as const;
