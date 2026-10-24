// Copyright © 2026 Christopher Snow
export const recordingGuide = {
  sourceTitle: "Choose your source video",
  title: "Record your own screen",
  eyebrow: "Optional appendix",
  link: "Recording guide (optional)",
  back: "Back to source video",
  overviewTitle: "Optional guides",
  overviewNote:
    "Use this guide if you want to make your own recording. The practice video supports the same inspection and editing lessons.",
  intro:
    "Record with a desktop FFmpeg installation or your device's recorder, then import the saved video into the course. You can also use the practice video without making a recording.",
  prepareTitle: "Prepare one action",
  prepare:
    "Show a clear starting state, perform one action and hold a readable result. Make the application text large enough to read, close unrelated windows and notifications, and check that the recorded area contains no sensitive information.",
  methodLabel: "Where will you record?",
  methodNote: "Choose a method to see its instructions.",
  methodPlaceholder: "Choose your device",
  methods: [
    { id: "windows", label: "Windows · native FFmpeg" },
    { id: "macos", label: "macOS · native FFmpeg" },
    { id: "linux", label: "Linux · native FFmpeg" },
    { id: "mobile", label: "Phone or tablet" },
  ],
  native: {
    title: "Record in a desktop terminal",
    location:
      "These commands need FFmpeg installed on your computer. Run them in a desktop terminal, not the course's Command field. The browser's WebAssembly build cannot open these desktop capture devices.",
    install:
      "If the terminal cannot find ffmpeg, install a native build first. Capture devices and encoders depend on that build.",
    installLink: "FFmpeg downloads",
    installHref: "https://ffmpeg.org/download.html",
    checkTitle: "Check your installation",
    devicesTitle: "List available capture devices",
    devicesNote:
      "Run this command and find the input device named in the instructions for your system below.",
    encodersTitle: "List available encoders",
    encodersNote:
      "Find libx264 in this list. The recording commands use it to encode pictures as H.264; choose another FFmpeg build or a desktop recorder if it is unavailable.",
    recordTitle: "Record the prepared action",
    timing:
      "These examples record five seconds without sound. Prepare the application first, then start the command, perform the action as recording begins and hold the result. If five seconds is too short, increase the number after -t before running it.",
    output:
      "The final filename is the output saved on your computer. Choose a new filename for each attempt so you keep earlier recordings.",
    optionsTitle: "What the common options mean",
    options: [
      {
        option: "-f",
        explanation:
          "Selects the capture input device. Each operating system uses a different device, named below.",
      },
      {
        option: "-framerate 15",
        explanation:
          "Requests 15 captured pictures per second. This setting belongs to the input here.",
      },
      {
        option: "-i",
        explanation:
          "Names the source to capture. Its form depends on the input device.",
      },
      {
        option: "-t 5",
        explanation: "Limits the output recording to five seconds.",
      },
      {
        option: "-an",
        explanation:
          "Omits sound. These examples do not request microphone narration.",
      },
      {
        option: '-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2"',
        explanation:
          "Rounds the picture width and height down to even numbers for the chosen colour format. The quotes keep the filter expression together. This does not add image detail.",
      },
      {
        option: "-c:v libx264",
        explanation:
          "Encodes the captured pictures as H.264 video using the libx264 encoder.",
      },
      {
        option: "-pix_fmt yuv420p",
        explanation:
          "Chooses a widely supported way to store picture colour. The final .mp4 filename selects the MP4 container that holds the encoded video.",
      },
    ],
    importTitle: "Bring the recording into the course",
    importSteps: [
      "Replay the saved file on your computer. Check that the starting state, action and readable result are visible.",
      "Return to Get video, choose Import file and select the recording. The file must be no larger than 20 MiB.",
      "Replay the imported source, keep a downloaded copy and continue to Inspect.",
    ],
  },
  windows: {
    title: "Windows: capture the desktop",
    input: "Find gdigrab in the device list.",
    setup:
      "Run the commands in PowerShell or Command Prompt. The gdigrab input with -i desktop captures the whole desktop, including other visible applications. Check the area before starting.",
    commandTitle: "Record five seconds on Windows",
    sourceTitle: "Windows capture device documentation",
    sourceHref: "https://ffmpeg.org/ffmpeg-devices.html#gdigrab",
  },
  macos: {
    title: "macOS: choose the screen device",
    input: "Find avfoundation in the device list.",
    setup:
      "Run the commands in Terminal. Allow screen recording for the terminal or capturing application in macOS when asked. You may need to reopen the terminal after changing this permission.",
    listTitle: "Find your screen's device index",
    listNote:
      "Run this listing command and find the screen entry in the video-device list. Do not assume that device 0 is a screen; it may be a camera. Listing does not record a file, and some builds print an input-opening error after the list.",
    replace:
      "Before running the recording template, replace SCREEN_INDEX with the index of your screen from that list. Leave :none after it: this explicitly selects no audio input. -capture_cursor 1 includes the pointer.",
    commandTitle: "Recording template · replace SCREEN_INDEX first",
    sourceTitle: "macOS capture device documentation",
    sourceHref: "https://ffmpeg.org/ffmpeg-devices.html#avfoundation",
  },
  linux: {
    title: "Linux: capture an X11 region",
    sessionTitle: "Check your desktop session first",
    sessionIntro:
      "X11 and Wayland are Linux desktop display systems. In a terminal opened from the desktop you want to record, run this shell command to show its reported session type.",
    sessionResult:
      "If it prints x11, continue with the X11 checks below. If it prints wayland, use a desktop recorder and import the saved file. If it prints nothing or another value, this check has not identified an X11 desktop; check your desktop settings or use one of those recording alternatives.",
    input: "Find x11grab in the device list.",
    setup:
      "This command is for an X11 desktop. Run it from a terminal in that graphical session, with access to its display. The shell expands ${DISPLAY} to the current X11 display name; this is native terminal syntax, not syntax for the course's Command field.",
    region:
      "Place the application in the upper-left 1280 × 720-pixel region. -video_size 1280x720 sets that region's size and +0,0 starts it at the upper-left corner. Change the size if needed so the region fits your display.",
    wayland:
      "For a Wayland desktop, use a desktop recorder that supports your system, then import the saved file. An XWayland display or a DISPLAY variable does not mean x11grab can record the whole Wayland desktop.",
    commandTitle: "Record five seconds from an X11 display",
    sourceTitle: "X11 capture device documentation",
    sourceHref: "https://ffmpeg.org/ffmpeg-devices.html#x11grab",
  },
  mobile: {
    title: "Record on a phone or tablet",
    intro:
      "Use your device's screen recorder, then import the saved video. The browser lab does not provide a native desktop capture device on mobile.",
    appleTitle: "iPhone or iPad",
    appleSteps: [
      "Prepare the application you want to demonstrate. Open Control Centre and choose Screen Recording; add the control first if it is missing.",
      "After the countdown, show the starting state, perform the action and hold its result.",
      "Stop with the recording indicator or the recording control in Control Centre. Find the saved video in Photos.",
    ],
    appleLink: "Apple screen-recording instructions",
    appleHref: "https://support.apple.com/en-us/102653",
    androidTitle: "Android",
    androidSteps: [
      "On a supported device, open Quick Settings and choose Screen record. You may need to edit Quick Settings to add it; names and locations vary by device.",
      "Choose any sound and touch-display options deliberately, then start recording and perform the prepared action.",
      "Hold the result, stop from the recording notification and find the saved video in your device's photos or video files.",
    ],
    androidLink: "Android screen-recording instructions",
    androidHref: "https://support.google.com/android/answer/9075928?hl=en",
    limitations:
      "Some applications prevent recording their pictures or sound. Check the saved video rather than assuming that everything visible or audible was captured.",
    importTitle: "Import the saved video",
    importNote:
      "Return to Get video and choose Import file. Select the recording from your device; if the chooser does not offer it from Photos, save or export it to Files first. Keep it within 20 MiB, then replay the imported source before continuing.",
  },
  copy: "Copy command",
  copyTemplate: "Copy template",
  copied: "Copied to clipboard.",
  copyFailed:
    "The command could not be copied. Select the text and copy it manually.",
  commandRegion: "Native terminal command",
  scrollHint: "Scroll sideways to read the full command.",
  sourcesTitle: "Further reading",
  sourcesNote: "These external instructions need an internet connection.",
} as const;
