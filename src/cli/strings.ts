// Copyright © 2026 Christopher Snow
import type { StepName } from "../journey/routes";
export const cli = {
  title: "Command workspace",
  ready: "Ready for a command.",
  welcome:
    "Enter an FFmpeg or ffprobe command, or use the command builder. Use the app controls to set up files, replay media and download your work.",
  scope:
    "Run one command at a time against files saved in this browser workspace. FFmpeg and ffprobe process actual media locally; they do not upload it or read your computer's folders. This is not an operating-system shell: pipes, redirection and variable expansion are unavailable. Put a whole filter expression inside quotes. ffprobe shows its usual media summary; use -of json with report options for saved reports and lab checks.",
  keyboard:
    "Enter runs the command; Shift+Enter continues it on a new line. A new line does not start a second command. Up and Down recall one-line history. Cancel or Ctrl+C discards active processing.",
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
    "The operation did not finish. Read Workspace feedback and any Command output, correct the input and retry. Previously saved files remain available.",
  running:
    "The operation is running. Choose Cancel to stop active work; a progress percentage is not available.",
  done: "Completed.",
  cancelled:
    "Active work was cancelled. No incomplete output was saved; existing files remain available.",
  exit: "Tool return status:",
  probeSuccess:
    "ffprobe completed and the media check passed. This pinned browser build returns -1 after cleanup; that is not a native success exit status.",
  cleanupNotice:
    "This browser's pinned FFmpeg build can print the bare line Aborted() during cleanup even when the operation completes. This command returned status 0; any saved output is listed above. A nonzero status still means failure. Inspect and replay the output to check it.",
  saved: "Saved",
  recipeSaved: "Execution recipe:",
  imported: "Existing file imported as",
  downloaded: "Download requested:",
  removed: "Removed",
  empty:
    "No workspace files yet. Import a file or load the practice video before processing it.",
  missing: "File not found:",
  useLs: "Open Files and use the exact workspace filename.",
  arguments:
    "Use the current task's example or the command builder. Run one FFmpeg or ffprobe command at a time.",
  wait: "Another operation is active. Wait for it to finish, or choose Cancel before starting another operation.",
  loading: "Wait for saved workspace files to finish loading, then retry.",
  notMedia:
    "Choose Replay for a video, sound or picture file. Use Read or Download for a text report, recipe or note.",
  exists:
    "That filename already exists. The existing file has been kept. Download a copy before choosing Delete if you want to remove it and load a replacement.",
  overwrite:
    "That output filename already exists. Choose another name to keep both versions, or add -y to explicitly replace it.",
  fetchFailed:
    "The provided source could not be loaded. Connect to the internet and retry, or choose Download for offline use before disconnecting.",
  sampleSaved: "Practice video loaded. Replay it, then inspect its duration.",
  fixturesSaved:
    "Loaded frame000.jpg, frame001.jpg, frame002.jpg and tone.wav. These supplied pictures and synthetic sound are a separate experiment; your recording is unchanged.",
  referenceUsage:
    "Choose Load inspection source or Load cutting source for a detailed reference lab. Provided build and edit comparisons contain work generated in advance.",
  referenceSaved: "Provided reference saved; no processing was run:",
  comparisonSaved:
    "Provided comparison saved as comparison.mp4: five seconds, 86,088 bytes. This is an optional excerpt, not your captured or edited demo.",
  comparisonCredit:
    "Big Buck Bunny © 2008 Blender Foundation, https://peach.blender.org/. Shortened and re-encoded excerpt. CC BY 3.0: https://creativecommons.org/licenses/by/3.0/. Original licence statement: https://peach.blender.org/about/.",
  help: `The command editor runs real media tools:
ffmpeg ARGUMENTS     Run one media command with a named output, or a supported help query
ffprobe FILE         Read the file's usual media summary

Use the app controls for workspace actions:
Use practice video loads the provided Mousepad recording.
Import file opens the device's file chooser.
Files lists names, sizes and origins. Use as source selects an input.
Replay opens media; Read displays text; Download saves a copy; Delete removes a workspace file.
Load pictures and sound supplies the separate Build experiment.
Load inspection source and Load cutting source supply controlled reference media.
Cancel discards active processing; existing files remain available.

Run each media command separately. Multiple lines continue one command.
Use simple workspace filenames without folders: letters, digits, dots, hyphens or underscores, beginning with a letter or digit. Source filenames may be up to 80 characters; output names are limited to 68 so the recipe name also fits.
Limits: 12 working files plus 12 recipes, 24 files maximum, 32 MiB combined; each file must be nonempty and at most 20 MiB.
Each processing operation has a 120-second limit. Cancel and retry if needed.
Choose a new output name to keep both versions, or add -y to an FFmpeg command to replace an existing output explicitly.
The browser build supports fewer devices, codecs and protocols than some native installations. Shell pipes, redirection and variable expansion are unavailable.
For a saved structured report, add the required report options and -of json to ffprobe, then -o REPORT.json. Detailed reference checks require the correct source and actual execution. Read every check criterion; finishing a check does not mean every criterion passed. Earlier achievements remain separate from new checked artefacts.`,
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
    title: "Choose your source video",
    intro:
      "Choose the original recording you will inspect and edit. Use the practice video or import an existing recording.",
    heading: "Choose and replay a source recording",
    paragraphs: [
      "Use the practice video or choose Import file to bring a recording from your device into this browser workspace. To make your own recording first, use the optional recording guide, then import the saved file.",
      "The practice video is twelve seconds of Find and Replace in Mousepad, an independent editor, with no sound. It starts as mousepad-demo.mp4; the workspace may add a number to preserve an existing file. Keep an existing source if it is the recording you want to edit.",
      "Replay the source, check that its action and result are readable, and download a copy before editing. Later tasks use real FFmpeg and ffprobe commands; files carry across lesson steps.",
    ],
    examples: [
      { note: "Load the supplied original recording.", command: "sample" },
      {
        note: "Alternatively, choose an existing recording from your device.",
        command: "import",
      },
      {
        note: "Open Files to check the exact filename, size and origin.",
        command: "ls",
      },
      {
        note: "Replay the practice source; use your source's exact name if different.",
        command: "play mousepad-demo.mp4",
      },
      {
        note: "Download a source copy before editing.",
        command: "download mousepad-demo.mp4",
      },
    ],
    challenge:
      "Check the replay: can a viewer recognise the starting state, follow the action and read its result? Check sound only if you intended it. Keep this source file; Build uses separate supplied pictures.",
    next: "build",
  },
  build: {
    title: "How a video file is created",
    intro:
      "Use FFmpeg commands to create a small video from supplied pictures, then add sound. This separate experiment does not convert or replace your selected source recording.",
    heading: "Give pictures a display rate, then combine streams",
    paragraphs: [
      "A frame is one picture. Load pictures and sound supplies three JPEG pictures extracted from the Mousepad recording at 0, 6 and 10 seconds, plus a quiet synthetic tone. The pictures are snapshots, not continuous coverage of the action. The new video gives them a new display schedule. frame%03d.jpg tells FFmpeg to read frame000.jpg, frame001.jpg and frame002.jpg; this is an FFmpeg filename pattern, not shell expansion.",
      "Encoding represents pictures as stored video data; the ordered picture sequence is a video stream. A codec specifies how that data is encoded and reconstructed for playback. In the first FFmpeg command, -framerate 1 sets one input picture per second and -i names the input. -c:v libx264 chooses the H.264 video encoder. -pix_fmt yuv420p chooses a widely supported way to store picture colour. The output name video.mp4 selects the MP4 container, which organises streams and their timing.",
      "ffprobe inspects a file without editing it. Run ffprobe with the filename and read its Duration and Stream lines. The three-picture experiment lasts three seconds at one picture per second, or 1.5 seconds at two. MP4 may appear as the family mov,mp4,m4a,3gp,3g2,mj2: related formats recognised together, not several containers inside your file. Changing the rate changes the holds; it cannot restore action missing between the three snapshots.",
      "The sound example has two inputs: video.mp4 is input 0 and tone.wav is input 1. -map 0:v:0 selects input 0's first video stream; -map 1:a:0 selects input 1's first audio stream. -c:v copy copies encoded pictures without encoding them again; -c:a aac encodes the sound as AAC. The sound is a quiet synthetic tone, not narration. -shortest ends output at the shorter input. Muxing means organising these encoded streams together in a container: adding sound here does not re-encode the video.",
      "Keep experiments under distinct output names. To replace an existing FFmpeg output explicitly, add -y; use a new name to compare versions. Load the pictures and sound once, then reuse those files. Open Using the command workspace for file and processing limits. Reading a lesson does not load the processing tools; the first processing command needs a connection unless those tools were saved for offline use.",
    ],
    examples: [
      {
        note: "Choose Load pictures and sound. Your project recording stays separate.",
        command: "fixtures",
      },
      {
        note: "Encode one picture per second into a real video-only MP4.",
        command:
          "ffmpeg -framerate 1 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p video.mp4",
      },
      {
        note: "Read Duration and Stream in the output. Then edit the encoding command to use rate 2 and output faster.mp4, run it, and inspect faster.mp4 separately.",
        command: "ffprobe video.mp4",
      },
      {
        note: "Add the synthetic sound to video.mp4. Video is copied; sound is encoded.",
        command:
          "ffmpeg -i video.mp4 -i tone.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -shortest demo.mp4",
      },
      {
        note: "Choose Replay beside demo.mp4. Then run ffprobe demo.mp4 to check its video and audio streams.",
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
      "Open Files and choose Use as source beside the recording you intend to edit. The examples use mousepad-demo.mp4; use your selected source's exact name if it differs. A container organises a file's streams; a stream carries pictures or sound. ffprobe reads the named file without changing it.",
      "Read the Duration line and each Stream line in ffprobe's usual output. Video and Audio identify the media type; the following codec name identifies its encoding. A video line also reports picture dimensions. The Mousepad source has one H.264 video stream, 1280 × 720 pictures, a twelve-second duration and no audio stream. MP4 can appear as the recognised format family mov,mp4,m4a,3gp,3g2,mj2; matroska,webm likewise names related formats, not nested containers.",
      "Measurements answer what the file contains, not whether the demo succeeds. Replay it: is the correct surface visible, can you follow the action, and is small text readable? Check audio against your intention; its absence can be correct. A stream's presence does not prove it contains narration or that the sound is intelligible.",
      "Some browser WebM recordings omit a declared duration. An absent field is not zero. -show_packets lists chunks of encoded data. In the timing command, -show_entries selects stream_index, pts_time (when a packet's content is due for presentation) and duration_time in seconds. These are observed timing evidence. The last presentation time is not the known end when the final hold duration is unreported; keep edits conservatively within observed timing and replay the result.",
    ],
    examples: [
      {
        note: "Open Files and choose your recording as the source; keep the Build experiment outputs separate.",
        command: "ls",
      },
      {
        note: "Read the usual media summary. Use the exact selected-source filename.",
        command: "ffprobe mousepad-demo.mp4",
      },
      {
        note: "If duration is missing or you need timing detail, inspect packet stream indexes, presentation times and durations.",
        command:
          "ffprobe -v error -show_packets -show_entries packet=stream_index,pts_time,duration_time -of json mousepad-demo.mp4",
      },
    ],
    challenge:
      "Identify this recording's picture codec, dimensions and audio presence. Decide whether replay meets your intention; it may need no repair. Choose short kept ranges for Edit, preserving the action and enough time to read the result.",
    next: "edit",
  },
  edit: {
    title: "Cut and join: tell the story",
    intro:
      "Write an FFmpeg command to keep useful material from your recording. Type it directly or compose it with the command builder; the complete command remains visible.",
    heading: "Keep a range, then join two ranges",
    paragraphs: [
      "These examples use the twelve-second Mousepad practice recording. Substitute your selected source's exact filename and times within its observed duration. -i identifies the input. -ss 2 after the input starts the kept material two seconds in; -t 6 requests six seconds of output. -map 0:v:0 selects its first video stream. -map '0:a?' selects audio only if present; the question mark makes absent audio acceptable. The practice recording has no audio, so this cut remains silent.",
      "-c:v libx264 encodes pictures as H.264 and -c:a aac encodes any selected sound as AAC. -pix_fmt yuv420p selects a widely supported picture colour format. Re-encoding reconstructs and stores media again; lossy encoding can discard more detail each time. Stream copy avoids another encoding pass but does not guarantee every requested cut boundary. A requested time can fall between pictures: inspect and replay the output instead of assuming arbitrary times select exact source pictures.",
      "The second command joins two picture ranges. -filter_complex introduces linked processing operations, called a filter graph. [0:v:0] feeds the input video into each trim; [v0] and [v1] name intermediate results. trim includes start and excludes end, so [0,2) and [4,7) request two and three seconds. setpts=PTS-STARTPTS subtracts each range's initial presentation timestamp so its clock begins at zero. [v0][v1]concat=n=2:v=1:a=0[v] places two segments consecutively, with one video stream and no audio; -map [v] selects that named result; its brackets are quoted in the command. Quote the graph so semicolons remain inside one argument.",
      "The joined example uses -preset ultrafast for encoder speed settings, -pix_fmt yuv420p for a widely supported colour format and -movflags +faststart to place playback information near the MP4's start. It uses -an to omit sound. Keeping sound across several cuts needs separate audio trims, clock resets and a join. The stated ranges produce a five-second silent output from the practice recording. The first trim example preserves audio when present. The detailed cutting reference uses a separate controlled source to investigate copy and encode boundaries.",
      "Each successful FFmpeg output also saves a JSON execution recipe. It contains the exact arguments and SHA-256 hashes, identifiers calculated from file contents, for all media present in the workspace at execution time. That inventory can include files the command did not use; it is not a list of only required dependencies. Choose Download for the recipe and relevant source inputs. Failure or cancellation saves no incomplete replacement; existing outputs remain unless a successful FFmpeg command replaces them with -y or you choose Delete.",
    ],
    examples: [
      {
        note: "Keep six seconds starting two seconds into the practice recording. Keep audio if present; choose suitable times for your own source.",
        command:
          "ffmpeg -i mousepad-demo.mp4 -ss 2 -t 6 -map 0:v:0 -map '0:a?' -c:v libx264 -pix_fmt yuv420p -c:a aac cut.mp4",
      },
      {
        note: "Join source [0,2) and [4,7), with each segment's clock reset. This produces silent video by design.",
        command:
          'ffmpeg -i mousepad-demo.mp4 -filter_complex "[0:v:0]trim=start=0:end=2,setpts=PTS-STARTPTS[v0];[0:v:0]trim=start=4:end=7,setpts=PTS-STARTPTS[v1];[v0][v1]concat=n=2:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -preset ultrafast -pix_fmt yuv420p -movflags +faststart joined.mp4',
      },
      {
        note: "Run ffprobe on the joined output, then choose Replay beside that file. Use another output name when changing the edit to keep both versions.",
        command: "ffprobe joined.mp4",
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
      "Open Files and choose your final output. The examples use joined.mp4; select your own output if its name differs. Replay the edited file and check opening context, visible action, readable result and small text at the intended viewing size. Check sound against your intention: the joined example is silent, while the first trim retains audio when present.",
      "Download the source, final output and its recipe. A recipe lists the exact tool arguments and hashes of all workspace input files at execution time, including any unrelated files. Read the -i arguments to identify the inputs the command actually uses. For a native FFmpeg rerun, supply those files under the same names and use a native build with the required features. Only the FFmpeg or ffprobe command belongs in the terminal; file setup, replay and downloads use app controls here.",
      "Open the downloaded file outside this lab and, where possible, on the intended viewing device. Confirm playback, intended sound and a file size suitable for sharing. A successful encode or probe cannot certify that another player supports the file or that a viewer understands the explanation. Download important work; local browser storage is not a permanent backup.",
      "Provided build and edit comparisons are available when processing is unavailable. These files were generated in advance from the separate controlled reference scene. Replay shows their contents; downloading one does not establish that you ran an edit. Keep your own source and resume processing when the tools are available.",
      "The optional comparison is a five-second Big Buck Bunny excerpt of 86,088 bytes. Loading it is an explicit choice; reading this page does not fetch it. The complete offline download includes it. Replay includes the Blender Foundation credit and CC BY 3.0 licence links. Keep its origin distinct from your own captured and edited media.",
    ],
    examples: [
      {
        note: "Open Files and confirm your final output and its execution recipe are available.",
        command: "ls",
      },
      {
        note: "Choose Replay beside your final output.",
        command: "play joined.mp4",
      },
      {
        note: "Choose Download beside your edited MP4.",
        command: "download joined.mp4",
      },
      {
        note: "Choose Download beside the output's execution recipe to keep its arguments and input hashes.",
        command: "download joined.mp4.recipe.json",
      },
    ],
    challenge:
      "Can a viewer describe the initial state, action and result without your explanation? Review the downloaded file's playback, text, pacing, sound and size before sharing. Advanced production modules remain planned; this actual edited download is your initial capstone.",
  },
};
