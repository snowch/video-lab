// Copyright © 2026 Christopher Snow
import type { StepName } from "../journey/routes";
export const cli = {
  title: "Command workspace",
  ready: "Ready for a command.",
  welcome:
    "Type help in the Command field and press Enter to list workspace commands.",
  scope:
    "Run one command at a time against files saved in this browser workspace. FFmpeg and ffprobe process actual media locally; they do not upload it or read your computer's folders. This is not an operating-system shell: pipes, redirection and variable expansion are unavailable. Put a whole filter expression inside quotes. ffprobe reports must use -of json.",
  keyboard:
    "Enter runs the command; Shift+Enter continues the same command on a new line. A new line does not start a second command. Up and Down recall history when the entry is one line. Ctrl+C or the cancel command discards active work. Use stop to finish and keep a recording.",
  input: "Command",
  run: "Run command",
  output: "Command output",
  moreOutput: "More output →",
  previousOutput: "← Previous output",
  wrapLines: "Wrap lines",
  outputScrolling:
    "Scroll sideways to read long output lines, or turn on Wrap lines to fit them to the available width.",
  file: "Import a file into the workspace",
  files: "Workspace files",
  storage:
    "Workspace files are saved in this browser on this device. Browser storage can be removed; download important source files, outputs and recipes.",
  session:
    "Browser storage is unavailable. These files are kept for this session only; download them before closing or reloading the page.",
  next: "Continue to",
  preview: "Replay",
  playbackError:
    "The browser could not play this output. The saved bytes remain available. Inspect codec_name and pix_fmt with ffprobe, or download the file and try a player that supports its encoding.",
  error: "Error:",
  failed:
    "The command did not finish. Read the error above, correct the command and retry. Previously saved files remain available.",
  running:
    "Running the command. Type cancel or press Ctrl+C to stop; a progress percentage is not available.",
  done: "Command completed.",
  cancelled:
    "Active work was cancelled. No incomplete output was saved; existing files remain available.",
  exit: "Process exit status:",
  probeSuccess:
    "The ffprobe JSON report was validated. This pinned browser build returns -1 after cleanup; that is not a native success exit status.",
  cleanupNotice:
    "This browser's pinned FFmpeg build can print the bare line Aborted() during cleanup even when the operation completes. This command returned status 0; any saved output is listed above. A nonzero status still means failure. Inspect and replay the output to check it.",
  saved: "Saved",
  recipeSaved: "Execution recipe:",
  imported: "Existing file imported as",
  downloaded: "Download requested:",
  removed: "Removed",
  empty:
    "No workspace files yet. Record, import or load the provided source before processing it.",
  missing: "File not found:",
  useLs: "Run ls and use the exact workspace filename.",
  arguments: "Check the arguments with help, then run one command at a time.",
  wait: "Another operation is active. Use stop to finish recording, or cancel to discard active work, before starting a new operation.",
  loading: "Wait for saved workspace files to finish loading, then retry.",
  captureUsage:
    "Use capture for pictures only, or capture --audio to request shared sound as well.",
  unsupported:
    "Screen recording is unavailable in this browser. Run sample for the provided original recording, or import to choose your own file.",
  notRecording:
    "No recording is running. Start with capture before using stop.",
  notMedia:
    "Use play with a video, sound or picture file. Recipes are text files to download.",
  exists:
    "That filename already exists. The existing file has been kept. Download it before using rm FILE if you want to remove it and load a replacement.",
  overwrite:
    "That output filename already exists. Choose another name to keep both versions, or add -y to explicitly replace it.",
  fetchFailed:
    "The provided source could not be loaded. Connect to the internet and retry, or save the lessons for offline use before disconnecting.",
  sampleSaved:
    "The provided original recording is saved as capture.mp4. It contains the Sort action and synthetic sound; it is not a recording you made.",
  fixturesSaved:
    "Loaded frame000.jpg, frame001.jpg, frame002.jpg and tone.wav. These supplied pictures and synthetic sound are a separate experiment; your recording is unchanged.",
  captureFailure:
    "Recording did not finish. Sharing may have been declined or the selected surface could not be recorded. Retry capture, or use sample or import.",
  captureComplete:
    "Run ls to find its actual filename, then play it and download a copy.",
  referenceUsage:
    "Use reference inspect or reference cuts for lab sources; reference build or reference edit loads a provided completed comparison.",
  referenceSaved: "Provided reference saved; no processing was run:",
  comparisonSaved:
    "Provided comparison saved as comparison.mp4: five seconds, 86,088 bytes. This is an optional excerpt, not your captured or edited demo.",
  comparisonCredit:
    "Big Buck Bunny © 2008 Blender Foundation, https://peach.blender.org/. Shortened and re-encoded excerpt. CC BY 3.0: https://creativecommons.org/licenses/by/3.0/. Original licence statement: https://peach.blender.org/about/.",
  capture: {
    idle: "Ready to request a recording surface.",
    requesting:
      "Choose a tab, window or screen in the browser's sharing dialog, or cancel there.",
    recording:
      "Recording the shared surface. Run stop when the result is readable. Recording also stops at the 15-second limit.",
    stopping: "Finishing the recording and releasing the shared surface.",
  },
  help: `Browser workspace commands, not native shell commands:
help                 List commands
ls                   List exact filenames, sizes and origins
scene                Open the original build-queue scene in a new tab
capture [--audio]    Request browser recording; optional shared sound, no microphone
stop                 Finish and keep a recording; capture stops at 15 seconds
sample               Load the provided original as capture.mp4; never overwrite
fixtures             Load three supplied pictures and synthetic tone; never overwrite
reference inspect    Load the original source as reference-inspect.mp4
reference cuts       Load the controlled source as reference-cuts.mp4
reference build      Load a provided three-second example as reference-build.mp4
reference edit       Load a provided six-second edit as reference-edit.mp4
comparison           Load the optional five-second comparison.mp4, 86,088 bytes
import               Choose an existing local file; keep its valid filename
play FILE            Replay video/sound or view a picture
download FILE        Download a file, including a JSON recipe
rm FILE              Remove one file; download important work first
clear                Clear displayed output; keep files and command history
cancel               Discard active processing or recording; keep existing files

Real media tools:
ffmpeg ARGUMENTS     Run one command with one named output, or a supported help query
ffprobe ARGUMENTS    Inspect with -of json; add -o REPORT.json to save the report

Run each command separately. Multiple lines continue ONE command.
Use simple filenames without folders: letters, digits, dots, hyphens or underscores, beginning with a letter or digit. Source filenames may be up to 80 characters; output filenames are limited to 68 so the recipe name also fits.
Limits: 12 media/report/note files plus 12 recipes, 24 files maximum, 32 MiB combined; each file must be nonempty and at most 20 MiB.
Each processing operation has a 120-second time limit. Cancel and retry if needed.
Choose a new output name, or add -y to explicitly replace an existing output.
Reference loading and comparison refuse to overwrite existing files. They load provided bytes, not a new encode. reference inspect/cuts supplies lab inputs; reference build/edit supplies completed comparisons. The optional comparison is excluded from the baseline offline download.
The browser build supports fewer devices, codecs and protocols than some native installations.
ffprobe uses JSON reports only here. -o REPORT.json saves actual executed evidence; cat reads it. Checks require the correct source and execution, not imported or provided finished work. Evaluation can finish normally while printing failed criteria; read each result. Notes refuse overwrites. Earlier saved answer achievements remain separate from new checked artefacts.`,
};

type Lesson = {
  title: string;
  intro: string;
  heading: string;
  paragraphs: string[];
  examples: { note: string; command: string }[];
  challenge: string;
  next?: StepName;
};
export const lessons: Record<StepName, Lesson> = {
  capture: {
    title: "Capture your first software demo",
    intro:
      "Make or adopt a source recording: the original file you will inspect and edit. Commands are the primary controls throughout these labs.",
    heading: "Use the prompt, then record one action",
    paragraphs: [
      "Type or paste one example into the Command field, without a leading $ prompt, then press Enter or Run command. Read the output before running the next example. Shift+Enter adds a line to the same command; run separate commands separately. Type help to list available commands, and use Up/Down to recall a one-line command. The files and command history carry across lesson steps.",
      "Plan an initial state, one visible action and a readable result. Close unrelated notifications and windows, and check that the shared surface contains no sensitive material. Run scene to open the original build queue. Return here, run capture, choose the scene's tab or window, then click Sort in the scene. Hold the sorted result before returning here to run stop. Aim for about 5–15 seconds; capture stops at 15 seconds and rejects output over 20 MiB.",
      "capture uses your browser's screen-sharing and recording facilities. It is not FFmpeg accessing desktop devices. Sound is off by default. capture --audio requests sound from the shared surface, not a microphone; the browser and selected surface may provide none. Intentional silence is valid. FFmpeg processes files in later steps; native desktop capture with FFmpeg needs platform-specific devices outside this lab.",
      "The actual recording may be WebM or MP4. Run ls and use its exact filename later; a name may gain a number to preserve an existing capture. If recording is unavailable, run sample to load the provided original, or import to choose your own existing file. Imported files keep their valid filename and stay local. sample refuses to replace an existing capture.mp4: keep your recording rather than loading the alternative unnecessarily.",
    ],
    examples: [
      {
        note: "Open the scene before requesting its tab or window.",
        command: "scene",
      },
      {
        note: "Return here to request sharing, then perform the action in the selected scene.",
        command: "capture",
      },
      {
        note: "After holding the result, return here and finish the recording.",
        command: "stop",
      },
      {
        note: "Alternative to recording: load the supplied original with its Sort action and quiet synthetic tone. This is not narration or a capture you made.",
        command: "sample",
      },
      {
        note: "Find the exact filename, size and origin. Substitute your recording's filename in subsequent examples.",
        command: "ls",
      },
      {
        note: "Replay the provided MP4. Replace capture.mp4 if you recorded or imported a different file.",
        command: "play capture.mp4",
      },
      {
        note: "Run this separately to download a source copy before editing.",
        command: "download capture.mp4",
      },
    ],
    challenge:
      "Check the replay: can a viewer recognise the starting state, follow the action and read its result? Check sound only if you intended it. Keep this source file; Build uses separate supplied pictures.",
    next: "build",
  },
  build: {
    title: "How a video file is created",
    intro:
      "Use FFmpeg commands to create a small video from supplied pictures, then add sound. This separate experiment does not convert or replace your captured recording.",
    heading: "Give pictures a display rate, then combine streams",
    paragraphs: [
      "A frame is one picture. fixtures loads three JPEG pictures of the original scene: initial state, sorted result and later hold. Their original source times are 0, 4 and 6 seconds; they do not show continuous motion or the click. The new file gives them a new display schedule. frame%03d.jpg tells FFmpeg to read numbered inputs frame000.jpg, frame001.jpg and frame002.jpg; this is an FFmpeg filename pattern, not shell expansion.",
      "Encoding represents pictures as stored video data; the ordered picture sequence is a video stream. A codec specifies how that data is encoded and reconstructed for playback. In the first FFmpeg command, -framerate 1 sets one input picture per second and -i names the input. -c:v libx264 chooses the H.264 video encoder. -pix_fmt yuv420p chooses a widely supported way to store picture colour. The output name video.mp4 selects the MP4 container, which organises streams and their timing.",
      "ffprobe inspects a file without editing it. In the probe command, -v error shows errors without routine log messages, -show_streams reports each picture or sound stream, and -show_format reports the whole file. -of json requests structured text. Read format.duration: the three-picture experiment lasts three seconds at one picture per second, or 1.5 seconds at two. The report may name MP4 as the family mov,mp4,m4a,3gp,3g2,mj2; those are related formats recognised together, not multiple containers inside your file. Changing the input rate changes the holds, not the missing action detail.",
      "The sound example has two inputs: video.mp4 is input 0 and tone.wav is input 1. -map 0:v:0 selects input 0's first video stream; -map 1:a:0 selects input 1's first audio stream. -c:v copy copies encoded pictures without encoding them again; -c:a aac encodes the sound as AAC. The sound is a quiet synthetic tone, not narration. -shortest ends output at the shorter input. Muxing means organising these encoded streams together in a container: adding sound here does not re-encode the video.",
      "Keep experiments under distinct output names. To rerun a name that already exists, explicitly add -y to replace it, or use a new name to compare versions. Load fixtures only once unless you have deliberately removed them. Run help for file and processing limits. Reading the lesson does not load the processing tools; the first actual processing command needs a connection unless the additional tools were saved for offline use.",
    ],
    examples: [
      {
        note: "Load the three supplied pictures and synthetic sound. Your captured source stays separate.",
        command: "fixtures",
      },
      {
        note: "Encode one picture per second into a real video-only MP4.",
        command:
          "ffmpeg -framerate 1 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p video.mp4",
      },
      {
        note: "Inspect duration and streams. Then recall the encoding command, change the rate to 2 and the output name to faster.mp4, run it, and probe faster.mp4 separately.",
        command:
          "ffprobe -v error -show_streams -show_format -of json video.mp4",
      },
      {
        note: "Add the synthetic sound to video.mp4. Video is copied; sound is encoded.",
        command:
          "ffmpeg -i video.mp4 -i tone.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -shortest demo.mp4",
      },
      {
        note: "Replay demo.mp4. Afterwards, run the probe command again with demo.mp4 instead of video.mp4 to check both streams.",
        command: "play demo.mp4",
      },
    ],
    challenge:
      "Compare the measured durations of video.mp4 and faster.mp4. Why does doubling the rate shorten this example? Confirm that demo.mp4 contains both video and audio. Your own recording remains a different workspace file.",
    next: "inspect",
  },
  inspect: {
    title: "Inspect and prepare real media",
    intro:
      "Return to the recording you intend to edit. Run ffprobe against its actual filename and compare the file's contents with what you meant to record.",
    heading: "Read the file before choosing cuts",
    paragraphs: [
      "Run ls first. capture.mp4 below is the supplied recording, not an alias for whichever file you recorded or imported. Replace that argument with the exact workspace filename. A container organises a file's streams; a stream carries pictures or sound. ffprobe reads the actual selected file. Its JSON report does not alter the recording.",
      "In streams, codec_type identifies video or audio and codec_name identifies its encoding. width and height give picture dimensions. In format, duration and size describe the file when reported. MP4 may appear in a comma-separated format family, mov,mp4,m4a,3gp,3g2,mj2; that identifies formats the inspector recognises together, not several containers packed into one recording. Likewise matroska,webm names a related format family.",
      "Measurements answer what the file contains, not whether the demo succeeds. Replay it: is the correct surface visible, can you follow the action, and is small text readable? Check audio against your intention; its absence can be correct. A stream's presence does not prove it contains narration or that the sound is intelligible.",
      "Some browser WebM recordings omit a declared duration. An absent field is not zero. -show_packets lists chunks of encoded data. In the timing command, -show_entries selects stream_index, pts_time (when a packet's content is due for presentation) and duration_time in seconds. These are observed timing evidence. The last presentation time is not the known end when the final hold duration is unreported; keep edits conservatively within observed timing and replay the result.",
    ],
    examples: [
      {
        note: "Identify the recording to inspect, rather than a Build experiment output.",
        command: "ls",
      },
      {
        note: "Read its container and streams. Change only the input filename if yours differs.",
        command:
          "ffprobe -v error -show_streams -show_format -of json capture.mp4",
      },
      {
        note: "If duration is missing or you need timing detail, inspect packet stream indexes, presentation times and durations.",
        command:
          "ffprobe -v error -show_packets -show_entries packet=stream_index,pts_time,duration_time -of json capture.mp4",
      },
    ],
    challenge:
      "Identify this recording's picture codec, dimensions and audio presence. Decide whether replay meets your intention; it may need no repair. Choose short kept ranges for Edit, preserving the action and enough time to read the result.",
    next: "edit",
  },
  edit: {
    title: "Cut and join: tell the story",
    intro:
      "Write an FFmpeg command to keep useful material from your recording. The arguments you enter are the edit; there are no hidden range controls.",
    heading: "Keep a range, then join two ranges",
    paragraphs: [
      "These commands use the provided ten-second capture.mp4. Substitute your own source's exact filename and times within its observed duration. In the first command, -i identifies the input. -ss 1 after that input starts the kept material one second in; -t 4 requests four seconds of output. -map 0:v:0 selects its first video stream. -map 0:a:0? includes the first audio stream only if present; the question mark makes absent audio acceptable.",
      "-c:v libx264 encodes pictures as H.264 and -c:a aac encodes any selected sound as AAC. -preset ultrafast selects encoder speed settings; -pix_fmt yuv420p selects the picture colour format. Re-encoding reconstructs and stores media again; lossy encoding can discard more detail each time. Stream copy can avoid another encoding pass, but it does not guarantee every requested cut boundary. Requested time can also fall between pictures: probe and replay the output rather than assuming arbitrary times become exact source pictures.",
      "The second command joins two picture ranges. -filter_complex introduces linked processing operations, called a filter graph. [0:v:0] feeds the input video into each trim; [v0] and [v1] name intermediate results. trim includes start and excludes end, so [0,2) and [4,7) request two and three seconds. setpts=PTS-STARTPTS subtracts each range's initial presentation timestamp so its clock begins at zero. [v0][v1]concat=n=2:v=1:a=0[v] places two segments consecutively, with one video stream and no audio; -map [v] selects that named result; its brackets are quoted in the command. Quote the graph so semicolons remain inside one argument.",
      "The joined example uses -pix_fmt yuv420p for a widely supported picture colour format and -movflags +faststart to place playback information near the start of the MP4. It deliberately uses -an to omit sound. Keeping sound across multiple cuts needs its own trim, clock reset and join; this command does not do that. For the provided source, these ranges make a five-second silent output. Use the first trim example if you want to preserve available sound, then verify the actual output. The retained cutting reference explains controlled copy/encode boundaries separately.",
      "Each successful FFmpeg output also saves a JSON execution recipe. It contains the exact arguments and SHA-256 hashes, identifiers calculated from file contents, for all media present in the workspace at execution time. That inventory can include files the command did not use; it is not a list of only required dependencies. Download the recipe and relevant source inputs. Failure or cancellation saves no incomplete replacement; existing outputs remain unless a successful command explicitly replaces them with -y or you remove them with rm.",
    ],
    examples: [
      {
        note: "Keep four seconds starting one second into the supplied recording. Keep audio if present; substitute appropriate source times for your own file.",
        command:
          "ffmpeg -i capture.mp4 -ss 1 -t 4 -map 0:v:0 -map 0:a:0? -c:v libx264 -preset ultrafast -pix_fmt yuv420p -c:a aac cut.mp4",
      },
      {
        note: "Join source [0,2) and [4,7), with each segment's clock reset. This produces silent video by design.",
        command:
          'ffmpeg -i capture.mp4 -filter_complex "[0:v:0]trim=start=0:end=2,setpts=PTS-STARTPTS[v0];[0:v:0]trim=start=4:end=7,setpts=PTS-STARTPTS[v1];[v0][v1]concat=n=2:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p -movflags +faststart joined.mp4',
      },
      {
        note: "Measure the joined output. Then run play joined.mp4 separately. Use another output name when changing the edit if you want to keep both versions.",
        command:
          "ffprobe -v error -show_streams -show_format -of json joined.mp4",
      },
    ],
    challenge:
      "Change the times and output name to make your own edit. Replay each boundary: does the action still make sense, and does the result stay visible long enough? Check whether silence or retained sound matches your intended explanation.",
    next: "publish",
  },
  publish: {
    title: "Export, publish and verify",
    intro:
      "Download the actual file you created and its execution recipe. This initial complete-demo checkpoint prepares a deliverable; it does not publish to a hosting account.",
    heading: "Review and download the actual output",
    paragraphs: [
      "Run ls and choose your final output. Replace joined.mp4 below if you used a different name. Replay that file, not just its source. Check opening context, visible action, readable result and small text at the viewer's intended size. Check sound against your intention: the joined example is silent, while the first trim retains available audio.",
      "Download the source, final output and its recipe. A recipe lists the exact tool arguments and hashes of all workspace input files at execution time, including any unrelated files. Read the -i arguments to identify the inputs the command actually uses. For a native FFmpeg rerun, supply those files under the same names and use a native build with the required features. Workspace commands such as sample, play and download are browser conveniences, not commands to paste into an operating-system shell.",
      "Open the downloaded file outside this lab and, where possible, on the intended viewing device. Confirm playback, intended sound and a file size suitable for sharing. A successful encode or probe cannot certify that another player supports the file or that a viewer understands the explanation. Download important work; local browser storage is not a permanent backup.",
      "If processing is unavailable, run reference build or reference edit to load a provided example, then replay reference-build.mp4 or reference-edit.mp4 with play. These files were generated in advance; viewing or downloading them is not an export made by your commands. Keep your source and resume actual processing when the tools are available.",
      "For an optional comparison, run comparison, then play comparison.mp4. This explicitly loads a five-second Big Buck Bunny excerpt of 86,088 bytes; it is not fetched merely by reading the page and is excluded from the baseline offline download. The command prints the Blender Foundation credit and CC BY 3.0 licence links. References and comparison refuse to replace an existing file.",
    ],
    examples: [
      {
        note: "Confirm your output and its recipe exist. Use your chosen names below.",
        command: "ls",
      },
      { note: "Replay the actual final output.", command: "play joined.mp4" },
      { note: "Download the edited MP4.", command: "download joined.mp4" },
      {
        note: "Keep the arguments and input hashes with your media.",
        command: "download joined.mp4.recipe.json",
      },
    ],
    challenge:
      "Can a viewer describe the initial state, action and result without your explanation? Review the downloaded file's playback, text, pacing, sound and size before sharing. Advanced production modules remain planned; this actual edited download is your initial capstone.",
  },
};
