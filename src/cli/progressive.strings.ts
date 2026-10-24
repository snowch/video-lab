// Copyright © 2026 Christopher Snow
import type { StepName } from "../journey/routes";
import type { Task } from "./tasks";

export const progressiveUI = {
  sourceCard: "Your video",
  buildInputs: "Experiment inputs",
  buildFixtures: "Three supplied pictures and tone.wav",
  commandCard: "Your command",
  commandChoice: "Use command",
  chooseSource: "Choose a source video",
  downloadRecipe: "Download execution recipe",
  continuation: "Continue through the lesson",
  intro: {
    capture: "Choose an original recording and check that its action is clear.",
    inspect: "Read one useful part of the real ffprobe output at a time.",
    edit: "Make a first cut, change its timing, then learn how to join kept ranges.",
    build:
      "Give supplied pictures a display schedule, then combine them with sound.",
    publish: "Replay and download the actual output you intend to share.",
  },
  nav: {
    capture: "Get video",
    inspect: "Inspect",
    edit: "Edit",
    build: "Build",
    publish: "Publish",
  },
  referenceIntro: {
    inspect:
      "After the inspection lesson, use a separate controlled picture-and-sound recording to save and check a structured report. Your project source is unchanged.",
    edit: "After Edit and the Build sound experiment, use a separate controlled picture-and-sound recording to investigate cut boundaries and joined timestamps. Your project files stay available.",
  },
  steps: "Lesson steps",
  step: "Step",
  of: "of",
  chooseStep: "Choose a step",
  previous: "Back",
  next: "Next",
  yourCommand: "Your command",
  sourceReady: "Your source video",
  sourceEmpty: "Choose a video to begin",
  changeSource: "Change source",
  sourceReview:
    "Replay the video. Can you follow the action and read its result? This original stays available when you create an edit.",
  practiceNote:
    "Twelve seconds of Find and Replace in Mousepad, an independent text editor. This provided recording has no sound.",
  importNote:
    "Choose a video up to 20 MiB. It stays on this device; its workspace filename appears beside the preview.",
  inspectSource: "Inspect video",
  beginEdit: "Make a first cut",
  buildNext: "Build a video from pictures",
  publishNext: "Review and download",
  output: "Command output",
  result: "Saved output",
  producingCommand: "Command that produced this file",
  resultReview:
    "Replay the saved file to judge the edit. The command output reports processing; it cannot tell whether your explanation is clear.",
  noResult: "Run the command to see its output here.",
  browserHelp: "Workspace and browser limits",
  files: "Files",
  help: "Help",
  close: "Close",
  tools: "Lesson tools",
  noFiles:
    "No files are saved yet. Choose a video in Get video, or import a file here.",
  compare: "Compare with a provided example",
  comparisonNote:
    "These provided examples use separate source recordings, not your project video. The build and edit examples show the controlled build-queue scene; the optional film excerpt has its own credits. They are for comparison, not evidence that you ran an exercise.",
  source: "Source",
  outputFile: "Output filename",
  start: "Start time · -ss",
  duration: "Duration · -t",
  rate: "Pictures per second · -framerate",
  videoHandling: "Video · -c:v",
  audioHandling: "Sound · -c:a",
  colourStorage: "Colour storage · -pix_fmt",
  streamSelection: "Stream selection · -map",
  filterGraph: "Filter graph · -filter_complex",
  seconds: "seconds",
  input: "Input file · -i",
  tool: "Tool",
  option: "Option",
  argument: "Argument",
  completeCommand: "Complete command",
  apply: "Apply to command",
  builderNote:
    "Change the values for this step, then apply them. Read the complete command before running it.",
  builderManual:
    "This draft has options beyond this step's builder. Keep editing it in Type command, or explicitly load the lesson example to start again.",
  runFirst: "Load this step's command",
  continueNote:
    "Next changes the lesson step. It does not run a command or mark an exercise as passed.",
  savedFiles: "Choose an output to replay and download",
  recipe:
    "The matching .recipe.json file records the command and workspace input hashes. Download it with the output if you want to repeat the edit later.",
  publishEmpty:
    "Create an edited file in Edit first. Its preview and download will appear here with its execution recipe.",
  sourceDownloads: "Keep a source copy",
  referencePrerequisites: {
    inspect:
      "This reference follows the production inspection lesson. It uses a separate controlled recording with both pictures and sound, then asks you to save and check a structured report. Your project source is unchanged.",
    edit: "This reference follows Edit and the Build sound experiment. It uses a separate controlled recording with pictures and sound to investigate cut boundaries and joined timestamps. Your project files stay available.",
  },
  routeLabels: {
    capture: "Get video",
    inspect: "Inspect",
    edit: "Edit",
    build: "Build",
    publish: "Publish",
  },
} as const;

export const productionTasks: Record<StepName, Task[]> = {
  capture: [
    {
      id: "source",
      title: "Choose a source video",
      paragraphs: [
        "Your source is the original recording you will inspect and edit. Use the practice video or import an existing recording.",
        "Look for a visible starting state, one action and a readable result. The source preview lets you check these before editing.",
      ],
      examples: [
        { note: progressiveUI.practiceNote, command: "sample" },
        { note: progressiveUI.importNote, command: "import" },
      ],
    },
  ],
  inspect: [
    {
      id: "duration",
      title: "Read the duration",
      paragraphs: [
        "ffprobe reads a media file without changing it. Run it with your source filename and find the Duration line in the output.",
        "For the practice video, 00:00:12.00 means twelve seconds. This tells you how much recorded time is available for an edit. You do not need to interpret every other field yet.",
      ],
      examples: [
        {
          note: "Read Duration in the real tool output.",
          command: "ffprobe mousepad-demo.mp4",
        },
      ],
    },
    {
      id: "streams",
      title: "Find pictures and sound",
      paragraphs: [
        "A stream is a sequence of related media data inside a file, such as pictures or sound. Each Stream line describes one stream; Video means pictures and Audio means sound.",
        "Read the same ffprobe output again. The practice recording has one Video stream and no Audio stream, so its silence is expected. Your recording may contain both. A listed audio stream does not prove that its content is audible or useful; replay it to check.",
      ],
      examples: [
        {
          note: "Look for Video and Audio on the Stream lines.",
          command: "ffprobe mousepad-demo.mp4",
        },
      ],
    },
    {
      id: "picture",
      title: "Read picture details",
      paragraphs: [
        "The video stream line names its codec: the format used to store and reconstruct the pictures. It also reports picture width and height. The practice video uses H.264 and has 1280 × 720 pixels.",
        "A container organises a file's streams and timing. MP4 is a container; it does not name the video codec. The recognised family mov,mp4,m4a,3gp,3g2,mj2 groups related formats, rather than several containers nested inside your file.",
        "Replay your source at the intended viewing size. Dimensions and codec names cannot tell you whether small text is readable or the action is clear.",
      ],
      examples: [
        {
          note: "Find the codec and dimensions on the Video line.",
          command: "ffprobe mousepad-demo.mp4",
        },
      ],
    },
    {
      id: "timing",
      title: "When duration is missing",
      paragraphs: [
        "Some browser recordings do not declare a duration. A missing value is not zero. If your source already has a useful duration, continue to Edit; this timing investigation is optional.",
        "A packet carries a chunk of encoded media. Its presentation timestamp says when that content is due to be shown or heard. -show_packets requests packets, and -show_entries limits the fields to stream_index, pts_time and duration_time. The _time values are seconds. -of json gives the report a structured JSON format; -v error hides routine log messages.",
        "Inspect the last observed times, keeping edits conservatively within the available evidence. The last presentation time is not a known end time when its final hold duration is missing. Replay the result instead of treating missing timing as an exact measurement.",
      ],
      examples: [
        {
          note: "Use this structured timing report only if the ordinary summary is insufficient.",
          command:
            "ffprobe -v error -show_packets -show_entries packet=stream_index,pts_time,duration_time -of json mousepad-demo.mp4",
        },
      ],
    },
  ],
  edit: [
    {
      id: "length",
      title: "Keep six seconds",
      paragraphs: [
        "ffmpeg creates a new media file. -i names its input; the final filename names its output. Here -t 6 asks for six seconds from the beginning. The source is kept unchanged.",
        "Before running, predict which part will remain. Then replay first-cut.mp4: does it include enough time to understand the action? The practice video lasts twelve seconds; use a suitable length if your own source is shorter.",
      ],
      examples: [
        {
          note: "Create a separate six-second file.",
          command: "ffmpeg -i mousepad-demo.mp4 -t 6 first-cut.mp4",
        },
      ],
    },
    {
      id: "start",
      title: "Choose the start",
      paragraphs: [
        "Add -ss 2 after the input to start the kept material two seconds into the source. -t 6 still means six seconds of output: it is a length, not the source's end time.",
        "For this example, the kept material begins at source time two seconds and continues towards source time eight seconds. Replay cut.mp4 and compare its opening with first-cut.mp4. Do you still have enough context?",
      ],
      examples: [
        {
          note: "Move the start while keeping the same output length.",
          command: "ffmpeg -i mousepad-demo.mp4 -ss 2 -t 6 cut.mp4",
        },
      ],
    },
    {
      id: "compare",
      title: "Change one value",
      paragraphs: [
        "Keep the start at two seconds and reduce the duration to four. Predict whether this removes material from the beginning or the end of the previous edit, then run the command.",
        "Replay shorter.mp4 and cut.mp4. The start is unchanged; the shorter version finishes two seconds earlier. Decide how long the result needs to remain visible. A shorter file is useful only if the viewer can still follow it.",
      ],
      examples: [
        {
          note: "Use a new filename so both edits remain available.",
          command: "ffmpeg -i mousepad-demo.mp4 -ss 2 -t 4 shorter.mp4",
        },
      ],
    },
    {
      id: "encoding",
      title: "What FFmpeg encoded",
      paragraphs: [
        "The first cuts left encoder selection to FFmpeg. Encoding turns pictures into stored video data according to a codec. With this practice recording and the pinned browser build, the default MP4 encoder creates H.264 video.",
        "Inspect cut.mp4 to check what was actually saved. Do not infer the codec from .mp4: that ending selects a container, and another build or input can behave differently. -c:v libx264 makes the video encoder choice explicit; libx264 implements H.264.",
        "Re-encoding reconstructs the pictures and stores them again. Lossy encoding can discard more detail each time, so replay small text as well as reading metadata.",
      ],
      examples: [
        {
          note: "Check the Video line in your actual cut.",
          command: "ffprobe cut.mp4",
        },
      ],
    },
    {
      id: "colour",
      title: "Choose compatible colour storage",
      paragraphs: [
        "A pixel format describes how picture colour samples are represented. -pix_fmt yuv420p chooses a format supported by many players. Our practice cuts already use it by default; later commands spell it out so that the choice is deliberate.",
        "Codec and pixel-format support belong to the player as well as the file. Replay an output on its intended viewing device before sharing. Choosing H.264 and yuv420p is a useful compatibility choice, not proof that every player will accept every file.",
      ],
      examples: [],
    },
    {
      id: "selection",
      title: "Select streams deliberately",
      paragraphs: [
        "The first cuts used FFmpeg's default stream selection. -map makes selection explicit. In -map 0:v:0, the first 0 means input 0, v means video and the final 0 means that input's first video stream.",
        "For a source that may contain sound, -map '0:a?' selects its audio streams when present. The question mark makes this selection optional, so the silent practice source is still valid. -an instead omits audio. Quoting keeps an expression together as one command argument.",
        "The join below intentionally selects pictures only. Build will add a known sound input separately, so you can hear and inspect what changes.",
      ],
      examples: [],
    },
    {
      id: "ranges",
      title: "Plan two kept ranges",
      paragraphs: [
        "A filter processes media as FFmpeg decodes it. The trim filter keeps a source range: start is included and end is excluded. Ranges [0,2) and [4,7) keep two seconds followed by three seconds, for five seconds in total.",
        "Replay your source and decide what those ranges contain. Which part are you removing between them? Use times within your own recording if you are not using the practice source.",
      ],
      examples: [],
    },
    {
      id: "clocks",
      title: "Start each range's clock at zero",
      paragraphs: [
        "A presentation timestamp says when a picture is due to be shown. Trimming a range keeps its source timestamps: a range starting at four seconds still starts on that source clock.",
        "setpts=PTS-STARTPTS subtracts the range's first timestamp from every timestamp in it. Each range then begins at zero, as the concat filter requires for joining. Resetting the clock changes timing values; it does not put discarded pictures back.",
      ],
      examples: [],
    },
    {
      id: "join",
      title: "Join the two ranges",
      paragraphs: [
        "-filter_complex introduces a filter graph: named connections between processing operations. Each [0:v:0] feeds the first input's first video stream into a trim. [v0] and [v1] name the trimmed, clock-reset results; concat places them consecutively.",
        "concat=n=2:v=1:a=0 joins two segments into one video stream with no audio. [v] names its result, and -map '[v]' selects it for the output. Quote the entire graph so its semicolons stay inside one argument.",
        "The command explicitly uses the H.264 encoder and colour format introduced earlier. -an makes the silent output deliberate. Keeping sound through several cuts needs separate audio trims and clock resets, covered in the cutting reference.",
      ],
      examples: [
        {
          note: "Run after reading the range and clock steps. Predict a five-second silent result for the practice recording.",
          command:
            'ffmpeg -i mousepad-demo.mp4 -filter_complex "[0:v:0]trim=start=0:end=2,setpts=PTS-STARTPTS[v0];[0:v:0]trim=start=4:end=7,setpts=PTS-STARTPTS[v1];[v0][v1]concat=n=2:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -pix_fmt yuv420p joined.mp4',
        },
      ],
    },
    {
      id: "review",
      title: "Check the joined story",
      paragraphs: [
        "Inspect joined.mp4 and replay its cut boundary. The practice ranges produce five seconds of silent video. A successful encode does not establish that the action still makes sense or that the result stays visible long enough.",
        "Keep the version that explains the action best. To change the edit, use another output name; add -y only when you deliberately want to replace an existing output. Build now uses separate supplied pictures to show how a video and sound stream are made.",
      ],
      examples: [
        {
          note: "Check Duration, then replay the actual saved file.",
          command: "ffprobe joined.mp4",
        },
      ],
    },
  ],
  build: [
    {
      id: "pictures",
      title: "Start with three pictures",
      paragraphs: [
        "A frame is one picture in a video. This separate experiment starts with three JPEG pictures extracted from the Mousepad recording at zero, six and ten seconds. Your project recording and edits stay unchanged.",
        "Load the pictures and a quiet synthetic sound. The pictures are snapshots, not continuous coverage of the action. We will give them a new display schedule, then add the sound.",
      ],
      examples: [
        {
          note: "Load these inputs once, then reuse them.",
          command: "fixtures",
        },
      ],
    },
    {
      id: "rate",
      title: "Give pictures a display rate",
      paragraphs: [
        "Frame rate is the number of pictures shown per second. Predict how long three pictures last at one picture per second, then run the command.",
        "-framerate 1 sets the input picture rate. frame%03d.jpg is FFmpeg's filename pattern for frame000.jpg, frame001.jpg and frame002.jpg; it is not shell expansion. The explicit libx264 encoder and yuv420p colour format use the compatibility choices introduced in Edit.",
        "The ordered encoded pictures form a video stream. video.mp4 stores that stream in an MP4 container. This file has no sound because its inputs are pictures.",
      ],
      examples: [
        {
          note: "Encode the three stills as one video.",
          command:
            "ffmpeg -framerate 1 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p video.mp4",
        },
      ],
    },
    {
      id: "measure",
      title: "Check the new schedule",
      paragraphs: [
        "Read Duration and the Video stream line, then replay video.mp4. Three pictures at one picture per second produce three seconds of video.",
        "These holds are a new schedule. The three-second file does not compress twelve seconds of continuous action into three seconds; most source pictures were never supplied to this experiment.",
      ],
      examples: [
        {
          note: "Compare the measured duration with your prediction.",
          command: "ffprobe video.mp4",
        },
      ],
    },
    {
      id: "faster",
      title: "Double the picture rate",
      paragraphs: [
        "Keep the same three pictures and change only the input rate from one to two pictures per second. Predict the duration before running.",
        "Save faster.mp4 so the first version remains available. At two pictures per second, three pictures last 1.5 seconds. Replay both versions: the holds shorten, but no missing motion is restored.",
      ],
      examples: [
        {
          note: "Change the schedule, keeping the source pictures.",
          command:
            "ffmpeg -framerate 2 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p faster.mp4",
        },
        {
          note: "Run separately to check the duration.",
          command: "ffprobe faster.mp4",
        },
      ],
    },
    {
      id: "sound",
      title: "Add a sound input",
      paragraphs: [
        "An audio stream carries sound data. tone.wav is quiet synthetic sound, not narration. Replay it before using it, and keep your device volume comfortable.",
        "The combined-file command will have two inputs: video.mp4 is input 0 and tone.wav is input 1. -map 0:v:0 selects the first input's first video stream; -map 1:a:0 selects the second input's first audio stream. The input numbers follow the order of the -i options.",
      ],
      examples: [
        {
          note: "Listen to the supplied sound before combining it with pictures.",
          command: "play tone.wav",
        },
      ],
    },
    {
      id: "mux",
      title: "Copy pictures and encode sound",
      paragraphs: [
        "-c:v copy copies the already encoded video data. It avoids another picture-encoding pass. -c:a aac encodes the sound as AAC, an audio codec.",
        "Muxing means organising encoded streams together in a container. Here FFmpeg copies video, encodes sound and muxes both into demo.mp4. -shortest finishes when the shorter input ends, so the sound does not extend beyond the three-second video.",
        "Predict which stream names will appear in ffprobe after this command. Adding a sound stream does not establish that it contains a useful explanation; this one contains only a tone.",
      ],
      examples: [
        {
          note: "Create the combined file without re-encoding its pictures.",
          command:
            "ffmpeg -i video.mp4 -i tone.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -shortest demo.mp4",
        },
      ],
    },
    {
      id: "review",
      title: "Verify pictures and sound",
      paragraphs: [
        "Inspect demo.mp4 and find both Video and Audio stream lines. Replay it to check the picture order, holds and quiet tone. Compare this with the video-only file.",
        "You supplied pictures and a schedule, encoded a video stream, then combined it with encoded sound in an MP4 container. Return to your edited recording for sharing: this still-picture experiment is separate from that project.",
      ],
      examples: [
        {
          note: "Check the streams actually present in the saved file.",
          command: "ffprobe demo.mp4",
        },
      ],
    },
  ],
  publish: [
    {
      id: "deliver",
      title: "Review the file you will share",
      paragraphs: [
        "Choose your final edited output, replay it and download it. Check opening context, visible action, readable result and the time available to read small text. Check sound only if you intended it. This page prepares a deliverable; it does not upload it to a hosting account.",
        "Download its matching execution recipe and keep the source inputs. The recipe records the exact command and hashes calculated from workspace file contents. Its inventory can include unrelated files; the command's -i arguments identify the inputs it actually uses.",
        "Open the downloaded file outside this lab and, where possible, on the intended viewing device. Confirm playback, useful sound and a suitable sharing size. A successful encode cannot certify player compatibility or that a viewer understands the explanation. Browser storage is not a permanent backup.",
      ],
      examples: [],
    },
  ],
};
