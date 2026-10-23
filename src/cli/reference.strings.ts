// Copyright © 2026 Christopher Snow
import {
  inspectionCommand,
  joinedCommand,
  type ReferenceLab,
} from "./reference-model";
import type { StepName } from "../journey/routes";

type Example = { note: string; command: string };
type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  examples: Example[];
};
type ReferenceLesson = {
  title: string;
  intro: string;
  heading: string;
  paragraphs: string[];
  examples: Example[];
  challenge: string;
  sections: Section[];
  next?: StepName;
};
const accurateCut =
  'ffmpeg -i reference-cuts.mp4 -filter_complex "[0:v:0]trim=start=3:end=5,setpts=PTS-STARTPTS[v];[0:a:0]atrim=start=3:end=5,asetpts=PTS-STARTPTS[a]" -map "[v]" -map "[a]" -c:v libx264 -preset ultrafast -pix_fmt yuv420p -r 12 -c:a aac -movflags +faststart accurate-3.mp4';
const noReset = joinedCommand
  .replaceAll(",setpts=PTS-STARTPTS", "")
  .replaceAll(",asetpts=PTS-STARTPTS", "")
  .replace("joined-check.mp4", "no-reset.mp4");

export const refStrings = {
  checkUsage:
    "Use check inspect REPORT.json or check edit OUTPUT.mp4. Submit an actual executed report or edit, not a provided example.",
  missingEvidence:
    "Executed evidence is missing for this file. Run the required probe or edit in this workspace, then check the saved result.",
  wrongSource:
    "This work does not use the required original reference source. Load reference inspect or reference cuts, then run the command against that exact file.",
  checkPassed:
    "The submitted artefact passed every measured check. Replay media and review its meaning separately.",
  checkFailed:
    "The submitted artefact did not pass every check. Read the measured results, revise the command and check the new output.",
  reportSaved: "Actual ffprobe JSON report saved:",
  catUsage: "Use cat FILE to display a saved text report, recipe or note.",
  noteUsage:
    'Use note FILE.txt "Your text" or note FILE.md "Your text". Quote the text as one argument.',
  noteSaved: "Note saved:",
  progressTitle: "Checked artefacts and earlier achievements",
  progressSession:
    "The check passed, but its progress record could not be saved for a later session. This does not confirm whether workspace files were saved; download important work.",
  notChecked: "No current artefact has passed this lab's executed checks.",
  checked: "Artefact passed the executed checks",
  changed:
    "The file has changed since it was checked. Run check again for the current bytes.",
  legacyTitle: "Earlier answer-based reference achievements",
  legacySaved:
    "Earlier saved achievement retained. It is not an executed-artefact check for this command lab.",
  legacyNone: "No earlier saved achievement was found.",
  legacyNotes: "Earlier reference notes, retained separately",
  helpExtra: `Reference sources and command-lab checks:
reference inspect       Load the original reference-inspect.mp4
reference cuts          Load the controlled-keyframe reference-cuts.mp4
ffprobe ... -o FILE.json Save an actual JSON report; use -of json
cat FILE                Display a saved report, recipe or note
note FILE.txt "TEXT"    Save an optional text note; .md also supported
check inspect FILE.json Check an actually executed report of the original source
check edit FILE.mp4     Inspect/decode an actual edit and compare source pictures
hint inspect|edit 1     Show a hint; choose 1 through 5 for progressive help
solution inspect|edit   Print a complete runnable reference command
progress                Show checked artefact hashes and retained earlier work

Run each command separately. Report/output names must fit the output-name limit.
A supplied output or imported report is not proof that you ran the exercise.
Different correct commands can pass: the checks inspect evidence and actual media, not exact spelling.`,
  hints: {
    inspect: [
      "Load reference inspect. Run an actual ffprobe inspection of reference-inspect.mp4; a copied or imported JSON file does not establish execution.",
      "Include -show_streams and -show_format. The report must identify this original MP4, its H.264 video and AAC audio.",
      "Include -show_frames too. Count only entries whose media_type is video; sound blocks are separate entries, not extra pictures.",
      "The required report contains 120 video pictures. Counting from zero, picture 75 has PTS 76800 ticks, or 6.25 seconds at time base 1/12288 second per tick. Save the complete report with -o inspect-report.json.",
      `Run: ${inspectionCommand}\nThen, as a separate command: check inspect inspect-report.json`,
    ],
    edit: [
      "Load reference cuts and use reference-cuts.mp4 as the actual input. The required order is opening [0,2), then result [4,6), with both sound and pictures.",
      "Trim video and audio separately: trim for pictures, atrim for sound. Keep start inclusive and end exclusive. Their requested durations add to four seconds.",
      "Reset every kept segment's clock before concat: setpts=PTS-STARTPTS for pictures and asetpts=PTS-STARTPTS for sound. Feed each segment's video and audio together to the join.",
      "The required output is H.264/AAC MP4, 960 × 540, with 48 pictures in the original order and clocks beginning at zero. A reversed join can have the right duration but the wrong pictures.",
      `Run: ${joinedCommand}\nThen, as a separate command: check edit joined-check.mp4`,
    ],
  } satisfies Record<ReferenceLab, string[]>,
  criterionLabels: {
    source: "Required original source",
    container: "MP4 container evidence",
    video: "Picture stream and encoding",
    audio: "Sound stream and encoding",
    frames: "Video picture count",
    timestamp: "Requested picture's presentation timestamp",
    duration: "Measured output duration",
    start: "Output clock starts",
    pictures: "Decoded pictures agree within the encoding tolerance",
    dimensions: "Picture dimensions",
    execution: "Actual workspace execution and source provenance",
  },
};

export const referenceLessons: Record<ReferenceLab, ReferenceLesson> = {
  inspect: {
    title: "What is a digital video?",
    intro:
      "Inspect a known original recording with real commands. Extract pictures and sound, explain their timing, then submit the JSON report you actually produced. This fixed-source lab is separate from your project recording.",
    heading: "Inspect the original, then check the evidence",
    paragraphs: [],
    examples: [],
    challenge:
      "Use typed commands throughout. Your report, extracted media and notes are workspace files you can inspect and download.",
    sections: [
      {
        id: "question",
        title: "What does the recording contain?",
        paragraphs: [
          "Type one example in the Command field and press Enter. Run separate examples separately; Shift+Enter continues the same command. help shows current-task commands; help all gives the full reference and limits. Up/Down recalls one-line history, and cancel discards active work. These are browser workspace commands, not an operating-system shell; no pipes or redirection are available.",
          "A quiet player does not establish that a file lacks sound. We will inspect the file, then create a genuinely video-only version to distinguish a playback choice from changed file contents. If workspace space is full, download important files before removing unneeded ones with rm.",
        ],
        examples: [
          {
            note: "See the command vocabulary and workspace limits.",
            command: "help all",
          },
        ],
      },
      {
        id: "motivation",
        title: "Load the named original",
        paragraphs: [
          "reference inspect loads reference-inspect.mp4, the original build-queue recording. It shows an unsorted queue, a Sort action and the sorted result. Its quiet synthetic tone is not narration; listening is optional. This is supplied source material, not a recording you made.",
          "A container organises streams and their timing in one file. A stream carries pictures or sound; a codec specifies how that data is encoded and reconstructed. ffprobe reads this file's properties. -v error suppresses routine logging, -show_streams lists its streams, -show_format describes the whole file and -of json requests structured text.",
        ],
        examples: [
          {
            note: "Load this lab's source without replacing another file.",
            command: "reference inspect",
          },
          {
            note: "Read its actual container, stream indexes, codecs, dimensions and sound properties.",
            command:
              "ffprobe -v error -show_streams -show_format -of json reference-inspect.mp4",
          },
        ],
      },
      {
        id: "prediction",
        title: "Predict what selecting only pictures changes",
        paragraphs: [
          "-i names an input; the first input is numbered 0. -map 0:v:0 selects its first video stream and excludes unselected streams. -c copy transfers the selected encoded data without another encoding pass. Predict whether the new file will contain audio, then inspect it.",
          "This command writes different file contents. Muting the original player changes only playback and does not remove its audio stream.",
        ],
        examples: [
          {
            note: "Create a video-only copy under a distinct output name.",
            command:
              "ffmpeg -i reference-inspect.mp4 -map 0:v:0 -c copy pictures.mp4",
          },
          {
            note: "Check the actual new file rather than inferring its streams from silence.",
            command:
              "ffprobe -v error -show_streams -show_format -of json pictures.mp4",
          },
        ],
      },
      {
        id: "investigation",
        title: "Locate a picture by presentation time",
        paragraphs: [
          "A frame is one picture; count video frames from zero. A presentation timestamp, or PTS, says when a decoded picture is due for display, not how long decoding took. This original has 120 pictures; video picture 75 is due at 6.25 seconds. The full report also includes decoded audio blocks, so its combined entry number is not a video index.",
          "-show_frames reports decoded pictures and sound blocks. -o saves the actual JSON as a workspace file; cat displays it. For extraction, -vf supplies a picture filter. select=eq(n\\,75) keeps the picture whose zero-based counter n equals 75; the escaped comma belongs to that expression. -frames:v 1 writes one picture. The PNG comes from real decoding, not an estimated browser playback position.",
        ],
        examples: [
          {
            note: "Save the complete measured report for the challenge.",
            command: inspectionCommand,
          },
          {
            note: "Read the saved report; identify video entries separately from sound blocks.",
            command: "cat inspect-report.json",
          },
          {
            note: "Extract the requested picture from the actual recording.",
            command:
              'ffmpeg -i reference-inspect.mp4 -vf "select=eq(n\\,75)" -frames:v 1 frame75.png',
          },
          { note: "View the extracted picture.", command: "play frame75.png" },
        ],
      },
      {
        id: "construction",
        title: "Extract and measure sound separately",
        paragraphs: [
          "An audio sample is one measurement of sound. A channel is a separate sequence of those measurements. The original has one channel at 48,000 samples per second, not 48,000 pictures. -map 0:a:0 selects the input's first audio stream; -c:a pcm_s16le writes decoded sound measurements as signed 16-bit integers in a WAV file, a representation called PCM.",
          "Decoded audio blocks group samples. The report below keeps only audio with -select_streams a:0 and includes each block's nb_samples and pts_time. Most blocks contain 1024 samples. Their boundaries do not match picture boundaries: at one second the latest picture begins at 1 second, while the current original audio block begins at about 0.981333 seconds.",
        ],
        examples: [
          {
            note: "Create a real sound-only file, leaving the original unchanged.",
            command:
              "ffmpeg -i reference-inspect.mp4 -map 0:a:0 -c:a pcm_s16le sound.wav",
          },
          {
            note: "Inspect decoded sound blocks in the original. -show_entries selects the named stream and frame fields.",
            command:
              "ffprobe -v error -select_streams a:0 -show_streams -show_frames -show_entries stream=sample_rate,channels:frame=pts_time,nb_samples -of json reference-inspect.mp4",
          },
        ],
      },
      {
        id: "failureExperiment",
        title: "Test an invalid stream choice and recover",
        paragraphs: [
          "Stream indexes and codec names are concrete file/tool properties. This source has no tenth audio stream; 0:a:9 asks for one because those stream counters begin at zero. Run the first command and read the failure. No successful new sound file should be saved.",
          "The second command names a codec that does not exist. Failure does not mean your original was erased. Run ls, keep the source, and correct the mapping or encoder using the earlier working examples. Sharing a playback clock also does not make audio sample indexes interchangeable with video picture indexes.",
        ],
        examples: [
          {
            note: "Deliberately request a nonexistent audio stream.",
            command:
              "ffmpeg -i reference-inspect.mp4 -map 0:a:9 impossible.wav",
          },
          {
            note: "Deliberately request an unknown video encoder.",
            command:
              "ffmpeg -i reference-inspect.mp4 -c:v no_such_codec impossible.mp4",
          },
          {
            note: "Confirm the original and earlier successful outputs remain.",
            command: "ls",
          },
        ],
      },
      {
        id: "explanation",
        title: "Connect picture ticks to seconds",
        paragraphs: [
          "For this source, MP4 is the container, H.264 the picture codec and AAC the sound codec. The format string mov,mp4,m4a,3gp,3g2,mj2 names a recognised family, not several nested containers. Its video stream is index 0 and audio index 1; do not assume that order for other files.",
          "A time base gives seconds per timestamp tick. This video's time base is 1/12288; adjacent picture timestamps differ by 1024 ticks, giving 1/12 second. Picture 75 has PTS 76800 ticks: 76800 × 1/12288 = 6.25 seconds. Decimal seconds can be rounded; recorded tick counts remain exact. -select_streams v:0 below excludes audio so picture order is easier to read.",
        ],
        examples: [
          {
            note: "Read the actual video timestamps without interleaved audio entries.",
            command:
              "ffprobe -v error -select_streams v:0 -show_frames -show_entries frame=pts,pts_time -of json reference-inspect.mp4",
          },
        ],
      },
      {
        id: "generalisation",
        title: "Keep another file's evidence separate",
        paragraphs: [
          "This source has equally spaced pictures, called constant frame rate. Other recordings can have unequal intervals, called variable frame rate. An average rate cannot locate every picture in those files. Inspect their actual timestamps rather than reusing this source's counts, stream positions or time base.",
          "A browser player's playback position can be approximate and is not a reliable frame index. A missing declared duration, common in some browser recordings, is not zero; an observed timestamp span may omit the final picture's hold. Use import and a different filename for your own recording. This reference checker intentionally requires the known original source, not every possible valid recording.",
        ],
        examples: [
          {
            note: "Check filenames and origins before applying any fixed-source conclusion elsewhere.",
            command: "ls",
          },
        ],
      },
      {
        id: "challenge",
        title: "Check the report you actually produced",
        paragraphs: [
          "Submit the report created by the complete inspection command. The check reads actual source identity, MP4 format, H.264 video with its time base, AAC audio, 120 video pictures and picture 75's PTS. It also requires executed probe evidence against the original source; importing convincing-looking JSON is not execution.",
          "If a criterion fails, read its measured value, correct the probe and save a fresh report. hint inspect 1 through hint inspect 5 provides progressive help; solution inspect prints a runnable reference command. A successful artefact check is recorded separately from earlier answer-form achievements.",
        ],
        examples: [
          {
            note: "Check the saved report, not a filename standing in for an unexecuted command.",
            command: "check inspect inspect-report.json",
          },
          {
            note: "Request the first hint when needed; increase the number for more detail.",
            command: "hint inspect 1",
          },
          {
            note: "See current checked artefacts and separately retained earlier work.",
            command: "progress",
          },
        ],
      },
      {
        id: "reflection",
        title: "Plan how to investigate silent narration",
        paragraphs: [
          "A colleague says the narration is silent. What would you inspect before deciding to record again? Consider stream presence, actual sound content and playback settings. This original's tone is not narration. Save your own optional note with note FILE.txt followed by quoted text; the note is not graded.",
        ],
        examples: [
          {
            note: "Replace this text with your own inspection plan.",
            command:
              'note inspection-notes.txt "I will check the audio stream, listen deliberately and check playback settings before recording again."',
          },
          {
            note: "Keep a copy outside browser storage.",
            command: "download inspection-notes.txt",
          },
        ],
      },
    ],
  },
  edit: {
    title: "Cutting and joining",
    intro:
      "Run real cut and join commands on a controlled original recording. Compare requested and actual boundaries, test a failed clock reset, then submit an edit whose decoded pictures and sound can be checked.",
    heading: "Keep the opening, then the readable result",
    paragraphs: [],
    examples: [],
    challenge:
      "All editing choices are command arguments. Distinct output names let you compare real files without silently replacing earlier work.",
    sections: [
      {
        id: "question",
        title: "What must survive a cut?",
        paragraphs: [
          "Keep the opening context and readable result while removing waiting. For this challenge, retain source [0,2) followed by [4,6), with both pictures and sound. The notation includes each start and excludes its end. These ranges are two seconds each and request four seconds in total.",
          "Use the Command field to run one command at a time. Commands operate on actual workspace files; a provided finished example does not show that your edit ran. Run help all for the complete workspace commands and limits. Download important work before using rm to make space.",
        ],
        examples: [
          {
            note: "See the available commands and bounds.",
            command: "help all",
          },
        ],
      },
      {
        id: "motivation",
        title: "Load the controlled original",
        paragraphs: [
          "reference cuts loads reference-cuts.mp4, a separately encoded version of the provided original build-queue recording. It is not a re-encoding of your personal capture. The source has H.264 pictures, AAC synthetic sound and a known presentation schedule; the tone is not narration.",
          "ffprobe inspects rather than edits. -show_streams reports pictures/sound, -show_format reports the whole file, and -of json requests structured text. FFmpeg -i names an input and the final filename names the output. In mapping notation, input and stream counters start at zero: 0:v:0 is the first input's first video stream, 0:a:0 its first audio stream.",
        ],
        examples: [
          {
            note: "Load this lab's original source, not a provided completed edit.",
            command: "reference cuts",
          },
          {
            note: "Read actual stream and file information before cutting. -v error keeps routine logging quiet.",
            command:
              "ffprobe -v error -show_streams -show_format -of json reference-cuts.mp4",
          },
        ],
      },
      {
        id: "prediction",
        title: "Predict the start of a stream copy",
        paragraphs: [
          "A keyframe is a picture from which decoding can start independently. Pictures between keyframes may depend on earlier pictures. This controlled source was encoded with keyframes at 0, 2, 4, 6 and 8 seconds; -show_frames with key_frame exposes that measured pattern.",
          "Stream copy transfers encoded data without decoding and re-encoding. In the copy command, -ss 3 before -i requests input seeking, -t 2 requests two seconds, and -map selects both original streams. -c copy selects stream copy; -avoid_negative_ts make_zero shifts negative output timestamps. Predict whether the first retained picture can precede source time 3, then run and inspect the actual copy.",
        ],
        examples: [
          {
            note: "Read key_frame and presentation times for the video stream. -select_streams v:0 excludes sound entries; -show_entries limits the fields.",
            command:
              "ffprobe -v error -select_streams v:0 -show_frames -show_entries frame=key_frame,pts_time -of json reference-cuts.mp4",
          },
          {
            note: "Make the actual stream-copy cut under its own filename.",
            command:
              "ffmpeg -ss 3 -i reference-cuts.mp4 -t 2 -map 0:v:0 -map 0:a:0 -c copy -avoid_negative_ts make_zero copy-3.mp4",
          },
        ],
      },
      {
        id: "investigation",
        title: "Compare the request with an accurate trim",
        paragraphs: [
          "The recorded native copy experiment begins with source time 2, not the requested 3, and contains three seconds of pictures. Earlier material was preserved at the preceding keyframe for that command. Run ffprobe on your actual output: container duration can differ slightly from picture duration because audio has its own boundaries. Rewritten output PTS values are not original source timestamps.",
          "For an accurate picture-boundary cut, -filter_complex introduces linked operations, called a filter graph. trim selects pictures; atrim selects sound. start=3:end=5 keeps source [3,5). setpts=PTS-STARTPTS and asetpts=PTS-STARTPTS subtract each first timestamp so its clock starts at zero. [v] and [a] name the results selected by -map. Quote the whole graph so semicolons stay inside one argument.",
          "-c:v libx264 and -c:a aac encode H.264 pictures and AAC sound. -preset ultrafast selects encoder speed settings, -pix_fmt yuv420p chooses a widely supported picture colour format, -r 12 requests twelve output pictures per second, and -movflags +faststart places MP4 playback information near the start. This controlled trim requests two seconds; verify the actual bytes rather than generalising its result to arbitrary timestamps or sources.",
        ],
        examples: [
          {
            note: "Inspect the actual copied output's durations and stream starts.",
            command:
              "ffprobe -v error -show_streams -show_format -of json copy-3.mp4",
          },
          {
            note: "Decode, trim both streams, reset their clocks and encode an independent output.",
            command: accurateCut,
          },
          {
            note: "Inspect the accurate output and compare it with the copy, then replay each using play FILE.",
            command:
              "ffprobe -v error -show_streams -show_format -of json accurate-3.mp4",
          },
        ],
      },
      {
        id: "construction",
        title: "Join opening context and result",
        paragraphs: [
          "The command below keeps [0,2) and [4,6). [v0]/[a0] name the first segment's pictures/sound; [v1]/[a1] name the second's. Each clock is reset before the pairs enter concat. concat=n=2:v=1:a=1 joins two segments with one video and one audio stream. -map [v] and -map [a], quoted in the command, select both named outputs.",
          "With consecutive hard cuts, kept durations add and the second segment starts when the first ends. The required order gives opening context followed by the sorted result, with no overlap. Run the actual edit and replay it before checking. A sound stream existing does not by itself establish useful narration.",
        ],
        examples: [
          {
            note: "Create the four-second challenge candidate with both streams and reset clocks.",
            command: joinedCommand,
          },
          {
            note: "Replay the actual created file.",
            command: "play joined-check.mp4",
          },
        ],
      },
      {
        id: "failureExperiment",
        title: "Run a real failure of clip clocks",
        paragraphs: [
          "trim and atrim select content but do not reset its timestamps. This variant removes both picture and sound resets and writes no-reset.mp4, preserving the working candidate. Predict whether the two kept durations alone still guarantee a four-second output, then run it and inspect the actual result.",
          "Both native FFmpeg 7.1.5 and the pinned browser build produced eight seconds and 96 pictures for this exact no-reset command and source. That observation is not a universal prediction for every malformed concat or browser build. Your report and playback establish your run's behaviour. The difference explains why this concat pipeline requires each segment to start at zero.",
        ],
        examples: [
          {
            note: "Actually run the altered command; this is not a simulated failure drawing.",
            command: noReset,
          },
          {
            note: "Measure the generated file and compare its timing with joined-check.mp4. Add -count_frames and read nb_read_frames if you want decoded picture counts.",
            command:
              "ffprobe -v error -count_frames -show_streams -show_format -of json no-reset.mp4",
          },
        ],
      },
      {
        id: "explanation",
        title: "Separate source time, output time and quality",
        paragraphs: [
          "Source time identifies material in the original. Output time places it in the edit. Resetting each segment does not put every clip at output zero: concat places the reset segments consecutively. At the join, the second segment supplies the next picture. This is a hard cut; blending or overlapping clips needs a different duration calculation.",
          "Stream copy avoids another encoding pass but its seek boundaries depend on the command and source. Re-encoding reconstructs then encodes selected pictures/sound. Lossy encoding can discard detail again; not all compression is lossy. The controlled source's equal picture spacing makes these requested boundaries straightforward. Audio samples, encoded sound packets and pictures still have different boundaries, so inspect sound starts and file duration separately.",
        ],
        examples: [
          {
            note: "Read actual joined clocks, durations and stream encodings.",
            command:
              "ffprobe -v error -count_frames -show_streams -show_format -of json joined-check.mp4",
          },
        ],
      },
      {
        id: "generalisation",
        title: "Change order or result hold deliberately",
        paragraphs: [
          "Recall the working join command and use a new output name. Before concat, replace [v0][a0][v1][a1] with [v1][a1][v0][a0] to compare result-before-opening against opening-before-result. A reversed four-second output can have the right count but the wrong explanation. To give the result longer, change the second segment's video and audio end together from 6 to 8, keep both resets and use another output name. Replay and inspect each experiment.",
          "These alternatives are useful experiments but differ from the challenge's required ranges and order. For another source, inspect actual keyframes, presentation intervals, dimensions and sound layout. They are not inherited from this fixture. The concat filter used here is distinct from FFmpeg's similarly named concat file reader; do not transfer one mechanism's requirements to the other.",
        ],
        examples: [
          {
            note: "Recall the join with Up/Down, edit its arguments and output name, then inspect the new file with the earlier probe command.",
            command: "ls",
          },
        ],
      },
      {
        id: "challenge",
        title: "Check the edit's actual pictures and sound",
        paragraphs: [
          "Submit an executed MP4 from the controlled source, keeping [0,2) then [4,6), both video and audio, with reset clocks. The check measures approximately four seconds, H.264/AAC, 960 × 540 dimensions and 48 decoded pictures. It compares the opening source pictures followed by the required result pictures, not just the command's spelling. A different command can pass if it makes the required media with valid execution provenance. The checker compares decoded pictures reduced to 160 × 90, allowing small encoding differences rather than demanding identical pixels or compressed bytes. Its reported RMS is the square root of the mean squared differences in red, green and blue values; each picture must be below 2. No identical output bytes across encoder versions are promised.",
          "Read each criterion's actual evidence before revising. A provided completed edit or imported media does not establish this execution. hint edit 1 through hint edit 5 offers progressive help; solution edit prints a full reference command. Check the current bytes again after changing a file; archived achievements remain separate.",
        ],
        examples: [
          {
            note: "Submit the actual candidate output, not a supplied finished example.",
            command: "check edit joined-check.mp4",
          },
          {
            note: "Ask for a progressively more specific hint by increasing the number through 5.",
            command: "hint edit 1",
          },
          {
            note: "Inspect checked artefact hashes and retained earlier achievements/notes.",
            command: "progress",
          },
        ],
      },
      {
        id: "reflection",
        title: "Give the viewer enough time",
        paragraphs: [
          "Compare your original and longer result hold. How much time does a viewer need to read the sorted result and connect it to the opening? With narration, cutting time also changes sound. Save an optional note and download your chosen output with its execution recipe. The note is not graded; actual output checks and viewer understanding are different evidence.",
        ],
        examples: [
          {
            note: "Replace this text with your observation from the real outputs.",
            command:
              'note editing-notes.txt "I compared the result holds and will keep enough time for the viewer to read the sorted queue."',
          },
          {
            note: "Preserve the checked media outside browser storage.",
            command: "download joined-check.mp4",
          },
          {
            note: "Keep its executed command and source inventory with it.",
            command: "download joined-check.mp4.recipe.json",
          },
        ],
      },
    ],
  },
};
