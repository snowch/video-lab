// Copyright © 2026 Christopher Snow
import { cap } from "./strings";

export const prose = {
  question:
    "A software demo is a recording of one action and its result, made so a viewer can follow it. Before you can improve a recording, you need one. What will you record, and what will your browser actually produce?",
  motivation: `Record a short demonstration of one visible software action: show an initial state, perform the action, then pause on the result so a viewer has time to read it. Aim for five to fifteen seconds.

Use the recorder below. It asks your browser for permission to capture a screen, a window or a tab — you choose which. Nothing is recorded until you press Start, and the recording stays in this browser: it is never uploaded. ${cap.privacy}

Prefer to practise on a ready-made file? The labelled pre-recorded original at the bottom of this section is a real recording of the course's build-queue demo that you can inspect and edit all the same.`,
  prediction: `The recorder below writes a real file using your browser's MediaRecorder API. Browsers usually record **WebM**, not MP4, even though this course later teaches you to build an MP4.

Before you start, predict: what format will your recording be in — WebM or MP4? The answer is detected from the recorder's actual MIME type after you stop, not assumed from the file name.`,
  investigation: `After you stop, the lesson reports what the browser actually captured: the format (from the detected MIME type), the picture resolution, the elapsed time and which tracks exist.

Replay the recording and watch it as a viewer would. Notice the dead time at the start and end, whether the text is readable, and whether any sound was captured. Audio is optional: whether your microphone or the tab's sound is included depends on the browser, the operating system and what you allow. The lesson never records audio silently — a captured audio track is always listed here.`,
  construction: `The diagram below shows the capture pipeline as a static picture: the visible app, the display or window you select, the browser recorder, the real output file, and playback of that file.

Two boundaries matter. First, the browser asks the operating system for a screen, window or tab; the page cannot choose for you or keep the permission. Second, the recorder writes a format the browser supports — usually WebM. Building an MP4 is a separate step you will do yourself in the next lesson.`,
  failureExperiment: `Screen capture is not available everywhere. Some mobile browsers do not support it, and it always requires a secure context (HTTPS or localhost) and a user gesture.

If the recorder reports that capture is unsupported, or you decline the permission prompt, nothing fails silently: the lesson switches to the labelled pre-recorded original below. That file is a real recording, but it is not yours — the label says so, and no success message pretends otherwise.`,
  explanation: `Two browser APIs do the work. \`navigator.mediaDevices.getDisplayMedia()\` asks the browser to let you pick a screen, window or tab; it returns a live capture feed or throws if permission is denied. \`MediaRecorder\` records that feed into a single file, choosing a MIME type the browser supports — the lesson reads that type and names the format honestly (WebM, or MP4 where the browser supports it).

The recording is a real file: you can replay it in the page and download it. The browser reports the picture size and track list from the capture; the elapsed time is measured by the page. Where the browser only estimates a value — for example some duration metadata — the lesson says so rather than inventing precision.`,
  generalisation: `Good capture habits make the editing easier:

- Make the action's text readable: increase the application's zoom or scaling before recording.
- Record the smallest surface that shows the action: one window or one tab, not the whole screen with notifications and unrelated windows.
- Hide or move sensitive data before you start.
- Start deliberately, perform one action, pause on the result for a few seconds, then stop.
- Say or note what you did if you record narration; a silent demo still needs its on-screen text to carry the explanation.

${cap.nativeTitle}. ${cap.nativeIntro}

- ${cap.nativeWindows}
- ${cap.nativeMac}
- ${cap.nativeLinux}
- ${cap.nativeWayland}

${cap.nativeAudio} ${cap.nativeLimits}`,
  challenge: `Plan the capture you would make of the course's build-queue demo: show the initial queue, press Sort, and let the viewer read the sorted result. Choose the surface, the single action, the scaling and the pause, then check your plan. Each field is checked separately.`,
  reflection: `Watch your recording once more. What would you change: the framing, the pacing, the zoom, the sound? Write an optional note for your next capture; it is not graded.`,
  modelVsReality: cap.modelVsReality,
  modelNote: cap.modelNote,
  challengeTask: `Plan a clean capture of the build-queue demo. Choose the surface you would record, name the one action, choose the application scaling you would set first, and choose how long to pause on the result before stopping.`,
  hints: [...cap.hints] as readonly string[],
  originality: {
    textbookExample:
      "A feature list of screen-recording apps with no recording made.",
    howThisDiffers:
      "Record a real demonstration with the browser's own capture APIs, replay and download the actual file, and inspect what was captured before editing it.",
  },
};
