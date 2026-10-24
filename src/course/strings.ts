// Copyright © 2026 Christopher Snow
import type { StepName } from "../journey/routes";
import type { Task } from "../cli/tasks";

export const chapterTitles: Record<StepName, string> = {
  capture: "Choose your source video",
  inspect: "Inspect your video",
  edit: "Trim and join clips",
  build: "Build video from pictures",
  publish: "Export and verify",
};

export const courseUI = {
  chapter: "Chapter",
  chapterNav: "Chapters",
  chapters: "Chapters",
  of: "of",
  outcome: "By the end of this chapter",
  references: "Reference labs",
  referenceNote:
    "Use these after the related chapter for deeper inspection and timing experiments. Their controlled recordings are separate from your project source.",
  inspectReference: "Inspect pictures, sound and timestamps",
  editReference: "Investigate cut boundaries and joins",
  planned: "Further topics · planned",
  plannedNote:
    "The five chapters below form the available course. These later topics are not yet lessons you can open.",
  optional: "Optional guides",
  lesson: "Lesson",
  chapterOverview: "Course overview",
  practice: "Independent practice",
} as const;

export const chapterIntro: Record<
  StepName,
  { purpose: string; outcome: string }
> = {
  capture: {
    purpose:
      "A software demo needs to make a change understandable to someone who did not perform it. Start by deciding what that viewer should notice.",
    outcome:
      "Choose a source recording, identify its starting state, action and result, and explain what the viewer needs to see.",
  },
  inspect: {
    purpose:
      "A filename does not tell you what a media file contains. Inspect the recorded evidence before choosing an edit or trying to repair a problem.",
    outcome:
      "Read duration, picture and sound streams, codec and dimensions, then distinguish what those facts tell you from what still needs replay.",
  },
  edit: {
    purpose:
      "An edit directs attention by choosing what remains and how long the viewer has to understand it. FFmpeg executes those choices; a successful command does not judge them.",
    outcome:
      "Make and compare timed cuts, explain a joined range's timing, and create your own edit with enough context and reading time.",
  },
  build: {
    purpose:
      "Constructing a small video from pictures makes its timing easier to understand. This is a separate experiment; your recorded project and edits stay available.",
    outcome:
      "Predict and measure a picture sequence's duration, then explain how encoded pictures and sound share a container.",
  },
  publish: {
    purpose:
      "A deliverable must work for its viewer outside the tool that produced it. Separate the file's technical properties from the clarity of its explanation.",
    outcome:
      "Select an actual output, keep the inputs and execution recipe needed to repeat it, and review the downloaded video for its intended viewer.",
  },
};

export const enrichment: Record<string, string[]> = {
  "capture:source": [
    "Your source is the original recording you will inspect and edit. Use the practice video or import an existing recording; the original stays available when you create separate edits.",
    "Choose one change you want a viewer to understand. Replay the preview and look for its starting state, action and visible result. If the recording omits crucial evidence, shortening it cannot recover that explanation.",
  ],
  "inspect:duration": [
    "ffprobe reads a media file without changing it. Run it with your source filename and find Duration. Its hours:minutes:seconds display relates the report to the player's clock; for the practice video, 00:00:12.00 means twelve seconds. You do not need to interpret every other field yet.",
    "Duration tells you how much recorded time is available, not how long the finished demo should be. A pause may be removable, while the result may need reading time. Use the reported duration to bound possible edits, then replay to decide which recorded time is useful.",
  ],
  "inspect:streams": [
    "A stream is a sequence of related media data inside a file, such as pictures or sound. Each Stream line describes one stream: Video means pictures and Audio means sound. A container organises these streams and their timing in a file.",
    "Read the same ffprobe output again. The practice recording has one Video stream and no Audio stream, so its silence is expected. No audio stream means there is no recorded sound stream to turn up; an audio stream containing silence is a different problem. A listed audio stream still needs listening to establish whether its content is audible or useful.",
  ],
  "inspect:picture": [
    "The Video stream line names its codec: the format used to store and reconstruct pictures. It also reports picture width and height. The practice video uses H.264 and has 1280 × 720 pixels.",
    "MP4 is a container, not a video codec. The format-family label mov, mp4, m4a, 3gp, 3g2, mj2 groups related formats; it does not describe several containers nested inside your file. Read the Video line to establish the actual picture codec.",
    "Dimensions describe the stored picture grid, not how much of it the application text occupies. A large recording can still make a small dialog unreadable on a phone. Replay at the intended viewing size to assess detail and clarity that the metadata cannot judge.",
  ],
  "edit:length": [
    "ffmpeg creates a new media file. -i names its input; the final filename names its output. Here -t 6 asks for six seconds from the beginning, keeping the source unchanged. The practice source lasts twelve seconds; choose a suitable length if your own source is shorter.",
    "Before running, predict what the viewer will lose. Then replay first-cut.mp4: can you follow the action and recognise its result? Keep the original and separate output so you can compare them. Successful processing establishes that FFmpeg produced media, not that the shorter explanation still makes sense.",
  ],
  "edit:start": [
    "Add -ss 2 after the input to begin the kept material two seconds into the source. -t 6 remains six seconds of output: a length, not a source end position. This example keeps material from source time two towards source time eight seconds.",
    "Replay cut.mp4 and compare its opening with first-cut.mp4. Starting exactly at a click can lose the initial value or menu that explains it. Choose the start using the source clock, then judge whether the new output retains enough context without an unnecessary wait.",
  ],
  "edit:compare": [
    "Keep the start at two seconds and reduce the duration to four. Before running, predict whether that removes material from the beginning or end of the previous edit. Save shorter.mp4 so both versions remain available.",
    "Replay shorter.mp4 and cut.mp4 at the same display size. Can you identify the original value, follow the replacement and read the new value before each ends? If the result is rushed, extend its hold; if the opening loses context, move the start earlier. Change one value at a time so you can identify the cause of the difference.",
  ],
  "edit:encoding": [
    "The first cuts left encoder selection to FFmpeg. Encoding stores pictures according to a codec; decoding reconstructs them. Inspect cut.mp4 to check what was saved. In this pinned browser build the practice MP4 cuts use H.264, but .mp4 alone does not establish a picture codec.",
    "Re-encoding decodes the pictures and stores them again. Another lossy pass can change fine edges and small text, so replay those details. The later Build example makes the encoder choice explicit with -c:v libx264; libx264 implements H.264.",
    "Stream copy avoids a new picture-encoding pass, but retains dependencies between encoded pictures that can restrict convenient cut boundaries. The controlled cut reference investigates that trade-off. Do not assume copying gives the same requested boundaries as these decoded cuts.",
  ],
  "edit:ranges": [
    "A filter processes media as FFmpeg decodes it. The trim filter keeps a source range: start is included and end is excluded. Ranges [0,2) and [4,7) keep two seconds followed by three seconds, for a requested five-second sequence.",
    "The gap between those ranges is discarded, not added as a pause. Replay your source and decide what the gap contains. A join can remove a wait, but it can also remove the action that explains a changed state. Choose ranges from the content before judging them by their total length.",
  ],
  "edit:clocks": [
    "A presentation timestamp says when a picture is due to be shown. Trimming keeps the retained pictures' source timestamps: a range starting at four seconds still starts on that clock. setpts=PTS-STARTPTS subtracts the first retained timestamp from each timestamp, so the range begins at zero without restoring discarded pictures.",
    "First observe that operation on one range. -vf introduces a single video-filter chain; the quoted trim=start=4:end=7,setpts=PTS-STARTPTS chain keeps the range and resets its clock in order. -an deliberately omits sound. This prepares a small video-only section before the next lesson composes two sections.",
    "Run the command, then probe and replay range.mp4. The requested source interval is three seconds; inspect the output's actual start and duration rather than assuming every tool build reports identical container timing. The browser example retains forty-five pictures on a reset clock.",
  ],
  "edit:join": [
    "-filter_complex introduces a filter graph with named connections between operations. Each [0:v:0] feeds input 0's first video stream into a trim and clock reset. [v0] and [v1] name those results; they are connections inside FFmpeg, not saved files. Quote the whole graph so its semicolons remain in one argument.",
    "[v0][v1]concat=n=2:v=1:a=0[v] places two sections consecutively, producing one video stream and no audio. Each section must start at timestamp zero. [v] names the joined result and -map '[v]' selects it for the output; -an makes the sound omission deliberate. The minimal command uses the pinned MP4 encoder behaviour already observed; Build later makes encoding choices explicit.",
    "Probe the actual output and replay both sides of its boundary. Does the viewer have enough evidence to recognise what changed? A valid filter graph can still hide a necessary step. Keeping sound through a multi-range edit needs separate audio trims and clock resets, covered in the controlled cutting reference.",
  ],
  "build:pictures": [
    "Make room before loading the experiment. The workspace permits twelve working media, report or note files plus twelve recipes. Keep the original source, chosen edit and matching recipe. Download other versions you want to retain, then use Files to delete unneeded experiments and their recipes; do not delete source inputs a kept recipe needs.",
    "This separate experiment uses three JPEG pictures extracted from the Mousepad source at zero, six and ten seconds, plus quiet synthetic sound. Your project recording and chosen edit stay unchanged. Load the inputs once and reuse them.",
    "The pictures are snapshots, not continuous coverage of the action. Their filenames do not restore the original timing or missing movement. The next command gives these three pictures a new display schedule; choose a still-picture sequence only when that is enough for the explanation.",
  ],
  "build:rate": [
    "A frame is one picture in a video. Frame rate expresses pictures per second. With a constant input rate, duration follows from picture count divided by rate. Predict the duration for the three supplied pictures at one picture per second before running.",
    "-framerate 1 sets the input picture rate. frame%03d.jpg is FFmpeg's filename pattern for frame000.jpg, frame001.jpg and frame002.jpg, not shell expansion. -c:v libx264 selects the H.264 encoder and -pix_fmt yuv420p selects the colour storage introduced in Edit. The ordered encoded pictures form a video stream; video.mp4 organises it in an MP4 container.",
    "This input contains pictures and no sound. Run the command, inspect its actual duration and replay the holds. A calculated schedule can be correct while its reading time is unsuitable for the viewer.",
  ],
  "build:faster": [
    "Keep the same three pictures and change only the input rate from one to two pictures per second. Predict the duration before running; use the relationship between picture count and rate, or reveal the schedule model after making your prediction.",
    "Save faster.mp4 so video.mp4 remains available. Run the changed command, probe the actual output and replay both files. Compare how much time each picture receives. The changed schedule cannot restore movement that was never supplied to this experiment.",
  ],
  "build:sound": [
    "An audio stream carries sound data. tone.wav is quiet synthetic sound, not narration. Replay it at a comfortable device volume before combining it with pictures; its presence does not mean that every demo needs sound.",
    "The combined command uses two inputs with independent contents and durations: video.mp4 is input 0 and tone.wav is input 1. -map 0:v:0 selects the first input's first video stream; -map 1:a:0 selects the second input's first audio stream. Input numbers follow the order of the -i options, so read that order before interpreting each map.",
  ],
  "build:mux": [
    "-c:v copy copies the already encoded picture stream without another picture-encoding pass. -c:a aac encodes the supplied sound as AAC, an audio codec. Muxing organises encoded streams together in a container: here video is copied, sound is encoded, and both are muxed into demo.mp4.",
    "-shortest finishes when the shorter input ends, so this example's sound does not extend beyond the video. That is a duration rule, not an editorial judgement about whether an explanation has finished. Predict which streams ffprobe will list, then run the command, inspect demo.mp4 and replay its ending.",
  ],
  "publish:deliver": [
    "Choose the actual output you intend to share, replay it and download it. Technical review asks whether it contains the intended streams and plays on the target device. Editorial review asks whether another person can follow the action and read the result. Check sound when intended; successful processing does not establish either kind of review.",
    "Keep the matching execution recipe and source inputs. The recipe records the command and hashes calculated from file contents; its inventory may include unrelated workspace files, while -i arguments identify inputs actually used. A hash cannot recover missing source bytes. Keep those inputs and a suitable tool build if you need to repeat the edit.",
    "Open the downloaded file outside the lab and, where possible, on the intended viewing device. Check playback, readability, useful sound and sharing size, recording any check you cannot yet perform. This page prepares a deliverable; it does not upload it anywhere, and browser storage is not a permanent backup.",
  ],
};

export const postRunExplanations: Record<string, string[]> = {
  "build:faster": [
    "In the verified example, three supplied pictures at two pictures per second produce 1.5 seconds of video. Compare this with the Duration reported for your actual faster.mp4. If you changed the input count or rate, calculate the expectation for your own command instead.",
    "The holds are shorter; no missing motion has been restored. Use replay to decide whether this schedule still leaves enough reading time, even when its duration matches the calculation.",
  ],
};

export const additionalTasks: Record<StepName, Task[]> = {
  capture: [
    {
      id: "viewer-plan",
      title: "Plan for someone who was not there",
      paragraphs: [
        "Replay the selected source without performing the action yourself. Name the initial state, the action and the visible result. For the practice recording, look for the original configuration value, the Find and Replace operation and the changed value.",
        "Decide what a first-time viewer needs to know before the action starts. If a crucial label is too small to read, note that limitation now; trimming time will not enlarge it. The plan below describes the jobs of a demo, not measured phases in your recording.",
      ],
      examples: [],
      visual: "story",
    },
    {
      id: "source-practice",
      title: "Write your viewer brief",
      paragraphs: [
        "Choose one change in your source and describe the question it should answer. Write a short brief that names the starting state, action and result, plus one part you would keep or remove and why.",
        "Use evidence from replay. You are reviewing the recording's usefulness, not proving that every viewer will understand it. Keep this brief for the editing chapter.",
      ],
      examples: [],
      practice: {
        criteria: [
          "I named a specific viewer question rather than just the application being recorded.",
          "I identified the starting state, action and result in my selected recording.",
          "I explained one proposed editing choice using something visible in replay.",
        ],
        hints: [
          "Start with the sentence: after watching, the viewer should be able to recognise…",
          "Watch the opening. Which value, screen or label establishes what is about to change?",
          "Find the action itself. Then check whether the video shows evidence that it had an effect.",
          "Watch the result at the size your viewer is likely to use. Record any text you cannot read without pausing or enlarging it.",
          "For the practice recording, a possible question is how Find and Replace changes a configuration value. Identify the original value, replacement operation and resulting value, then justify the time each needs on screen.",
        ],
        review:
          "Write your viewer question, the evidence you found, and one editing intention. This is your review, not an automatically graded answer.",
      },
    },
  ],
  inspect: [
    {
      id: "inspect-practice",
      title: "Diagnose your source from evidence",
      paragraphs: [
        "Write and run a probe command for your selected source without loading an example. In your review, record its declared duration, picture codec, dimensions and whether it contains an audio stream. Say when a requested value is missing rather than inventing one.",
        "Then replay the same file. Explain one thing the report establishes and one judgement that still needs viewing or listening. If you import another recording, repeat the inspection with its exact workspace filename and compare the evidence.",
      ],
      examples: [],
      practice: {
        criteria: [
          "I ran ffprobe against the exact file I reviewed.",
          "I located duration, video codec, dimensions and audio presence, or explicitly recorded missing evidence.",
          "I separated a reported fact from a judgement about clarity, readability or useful sound.",
        ],
        hints: [
          "Choose the source you want to inspect and read its exact name beside the preview or in Files.",
          "Start with the tool name ffprobe followed by that filename. The basic summary is enough unless timing evidence is missing.",
          "Read Duration for the declared file length and the Video stream line for its codec and picture dimensions.",
          "Look for an Audio stream line. Its absence means there is no audio stream to amplify; its presence still needs listening.",
          "For the provided Mousepad source, expect twelve seconds, H.264 pictures at 1280 × 720 pixels and no audio stream. These facts do not prove that small text is readable on the viewer's device.",
        ],
        solution: "ffprobe mousepad-demo.mp4",
        review:
          "Record the file you inspected, its reported facts and one remaining viewing judgement. If you used the practice file, explain the evidence rather than only copying its expected values.",
      },
    },
  ],
  edit: [
    {
      id: "compare-story",
      title: "Compare what each cut explains",
      paragraphs: [
        "These provided cuts come from different ranges of the same Mousepad source. Before playing each one, predict what its source range might leave out. Then watch the opening, action and ending at the same display size.",
        "Describe what a viewer can infer from each version. Which omits useful context or ends before the result is clear? There is no universal best duration: the task is to justify a cut using the explanation your viewer needs.",
      ],
      examples: [],
      visual: "compare",
    },
    {
      id: "edit-practice",
      title: "Make and defend your own cut",
      paragraphs: [
        "Return to your selected source and viewer brief. Choose a start and duration that retain the action and a readable result. Write your own FFmpeg command and use a new output filename so earlier versions remain available.",
        "Before running, predict the source endpoint and output duration. Inspect the saved output and replay it. If the opening loses context or the ending is rushed, revise one timing value, save another version and explain the difference.",
      ],
      examples: [],
      practice: {
        criteria: [
          "I chose start and duration values within the source evidence and predicted the endpoint.",
          "I created a separate output, inspected it and replayed the actual saved file.",
          "I justified the retained context, action and reading hold, and described a revision or why none was needed.",
        ],
        hints: [
          "Use the source player to locate the first information your viewer needs and the point where the result becomes clear.",
          "Compute the desired duration from your planned endpoint minus your planned start. Keep the source endpoint and output length distinct.",
          "Begin with ffmpeg -i and the exact source filename. The final argument should be a new MP4 filename.",
          "Place -ss and your start after the input, then use -t for the kept duration. Replay the output rather than judging only the command log.",
          "One possible practice-source edit starts at one second and lasts seven seconds. It retains source time one through eight; compare its explanation with your own choice rather than treating these times as the only answer.",
        ],
        solution: "ffmpeg -i mousepad-demo.mp4 -ss 1 -t 7 independent.mp4",
        review:
          "Record your source, timing prediction, output filename and viewing judgement. Explain any revision. Successful processing alone is not evidence that the story is clear.",
      },
    },
  ],
  build: [
    {
      id: "build-practice",
      title: "Choose and test a picture schedule",
      paragraphs: [
        "Using the three supplied pictures, choose a display rate and predict the total duration before running anything. Write a new encoding command and save independent-build.mp4, keeping earlier experiments available.",
        "Probe and replay the output. Explain why its duration follows from the picture count and rate, then judge whether the holds are useful. State what this sequence cannot show about the movement between the original snapshots.",
      ],
      examples: [],
      visual: "rate",
      practice: {
        criteria: [
          "I recorded a picture rate and predicted duration before encoding.",
          "I created a new file, measured its duration and compared that measurement with my prediction.",
          "I explained the viewing trade-off and why a higher rate does not restore missing motion.",
        ],
        hints: [
          "Count the actual supplied pictures. Your prediction needs both that count and the chosen pictures-per-second rate.",
          "Divide picture count by rate to obtain seconds. A larger rate gives each supplied picture less display time.",
          "Use the taught -framerate option before the image input. Keep the frame%03d.jpg pattern so FFmpeg reads the ordered pictures.",
          "Use the encoder and colour format already introduced, save a new MP4, then run ffprobe on that actual output.",
          "For example, three pictures at two pictures per second last 1.5 seconds. This is one possible schedule, not a requirement to choose that rate or a claim that its holds are readable.",
        ],
        solution:
          "ffmpeg -framerate 2 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p independent-build.mp4",
        review:
          "Record the chosen rate, predicted and measured duration, and whether the picture holds explain enough. Distinguish a correct timing calculation from a useful demonstration.",
      },
    },
  ],
  publish: [
    {
      id: "handoff",
      title: "Prepare a repeatable handoff",
      paragraphs: [
        "Select the output that explains your recorded action. The still-picture Build experiment is separate, so choose its output only if that is the deliverable you intend. Download the actual media, its matching execution recipe and the source inputs named by the command.",
        "Read the recipe's command and input inventory. Its hashes identify file contents, but its inventory can include unrelated workspace files. Keep the inputs the command actually uses and note the tool version if someone else must repeat the edit.",
      ],
      examples: [],
    },
    {
      id: "publish-practice",
      title: "Review the downloaded demo as a viewer",
      paragraphs: [
        "Open the downloaded file outside the lab and, where possible, on the intended viewing device. Ask someone who did not perform the action what changed. If that review is not possible yet, record it as still to do rather than claiming it passed.",
        "Write a release note that names the file, intended viewer, technical checks performed and the evidence for your editing choices. Identify one limitation or remaining check. This prepares a shareable deliverable; it does not upload the file anywhere.",
      ],
      examples: [],
      practice: {
        criteria: [
          "I selected and downloaded the intended output, recipe and required source inputs.",
          "I recorded which playback, stream, sound and sharing checks I actually performed, and what remains untested.",
          "I used viewer evidence to assess context, action, readable result and pacing, without treating an encode as automatic approval.",
        ],
        hints: [
          "Start by naming the exact output you intend to share. Do not assume the most recently generated experiment is the project deliverable.",
          "Keep the corresponding recipe and the files its -i arguments name. A recipe alone cannot recreate missing source bytes.",
          "Open the downloaded media in another player and inspect the ending as well as the beginning. Check sound only when you intended it.",
          "Ask a viewer what changed and what result proves it. If they need your spoken explanation, identify the missing context or reading time.",
          "A useful release note separates measured facts, observed playback, viewer feedback and untested assumptions. Name a concrete remaining check instead of saying only that the file works.",
        ],
        review:
          "Write your release note and remaining checks. Mark unavailable outside-player or viewer checks as pending. This self-review records your judgement; it is not an automatic course certificate.",
      },
    },
  ],
};

export const teachingUI = {
  postRunLabel: "Compare your prediction with the example",
  storyTitle: "A demo's three jobs",
  storyLabels: ["Starting state", "Action", "Visible result"],
  storyNote:
    "A planning model: these are jobs the explanation needs to do, not measured phases in your recording.",
  streamsTitle: "A container organises streams",
  container: "Container",
  pictures: "Picture stream",
  sound: "Sound stream",
  silent: "The practice source has no sound stream.",
  streamsNote:
    "This explanatory grouping shows kinds of content. Read the actual stream list and replay your own file to establish what it contains.",
  trimTitle: "Relate start, length and endpoint",
  start: "Source start",
  duration: "Kept duration",
  sourceEnd: "Source endpoint",
  seconds: "seconds",
  trimNote:
    "An explanatory timeline using the practice source's duration. These controls calculate a range; they do not edit your file or replace inspecting and replaying an output.",
  rateTitle: "Give three pictures a schedule",
  showCalculation: "Show the calculated schedule",
  predictionNote:
    "Predict the duration from the picture count and chosen rate, then reveal the calculation to compare your reasoning. This model does not measure or grade your encoded file.",
  rate: "Pictures per second",
  pictureLabels: ["First picture", "Second picture", "Third picture"],
  rateNote:
    "An explanatory equal-hold schedule. The calculation changes display time, not the pictures supplied or the movement missing between them.",
  compareTitle: "Watch the provided cuts",
  compareLabels: {
    early: "Opening section",
    context: "Middle section",
    late: "Later section",
  },
  compareNote:
    "Compare the opening context, action and result. Describe what each version retains or omits before deciding which serves your viewer.",
  sourceRange: "Source range",
  provided:
    "Provided comparison, generated in advance from the Mousepad source. Playing it is not evidence that you ran an edit.",
  practiceTitle: "Review your work",
  reviewLabel: "Your review",
  reviewSaved:
    "Your review draft is saved in this browser on this device. Download a copy to keep it outside browser storage.",
  reviewDownload: "Download review",
  selfReview:
    "These criteria guide your self-review. They do not automatically grade your command or certify the video's clarity.",
  hints: "Progressive help",
  nextHint: "Show next hint",
  reviewSession:
    "This review is available for this session only. Download a copy before closing or reloading the page.",
  solution: "One possible reference command",
  useSolution: "Use reference command",
} as const;
