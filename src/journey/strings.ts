// Copyright © 2026 Christopher Snow
export const j = {
  common: {
    firstProcessingDownload:
      "The first processing run downloads about 32.4 MB of tools. Run it on a suitable connection. Save the tools separately if you need reliable offline processing.",
    next: "Continue",
    back: "Previous step",
    source: "Selected source recording",
    provided: "Provided recording",
    captured: "Earlier browser recording",
    imported: "Existing recording selected from this device",
    generated: "Created in this browser",
    download: "Download this recording",
    playbackError:
      "The browser could not play this file. Download it and try another player. You can still inspect the measured file information.",
    busy: "Processing the selected media. The time needed depends on the file and your device; a percentage is not available.",
    cancel: "Cancel processing",
    cancelled:
      "Processing was cancelled. Your source is still available; you can retry.",
    retry: "Try again",
    processingFailed:
      "Processing could not finish. Keep your source, check your connection if the processing tools have not been downloaded, and retry. You can also inspect the labelled provided examples. Viewing them does not create your own export.",
    storageSaved:
      "Project media is saved in this browser on this device. Browser storage can be removed, so download important recordings and recipes.",
    storageSession:
      "Project storage is unavailable. Your media is available for this session only; download it before closing or reloading the page.",
    clearProject: "Clear project media",
    clearConfirm:
      "Remove this project's saved recordings and outputs from this browser? Keep downloaded copies of anything you need.",
    encoderTitle: "Add offline processing tools",
    encoderNeedLessons:
      "Save the lessons above before downloading the processing tools.",
    encoderNote:
      "The processing tools add about 32.4 MB. They are optional for reading lessons and playing the supplied media. Save them while connected if you want to process files offline. Processing stays on this device.",
    encoderDownload: "Download processing tools for offline use",
    encoderSaving:
      "Downloading the additional processing tools. Keep this page open until they are ready.",
    encoderReady:
      "Processing tools are saved. FFmpeg and ffprobe can run offline in this browser.",
    encoderMissing: "Processing tools are not saved for offline use yet.",
    encoderFailed:
      "The processing tools could not be saved. Check your connection and available browser storage, then retry. Lesson reading and provided examples remain separate from this download.",
    evidence: "Technical evidence",
    command: "Actual FFmpeg command",
    rawProbe: "Full measured file information",
    localNote:
      "Recordings and processing stay in your browser. No media upload is required.",
    processingLimits:
      "Use an input no larger than 20 MiB and no longer than 30 seconds for these exercises. Only one media operation runs at a time. If processing cannot finish on this device, cancel, keep your source and retry with a shorter or smaller file.",
    optionalSampleTitle: "Optional: compare a different recording",
    loadSample: "Load the optional Big Buck Bunny excerpt",
    sampleNote:
      "This five-second provided excerpt is for comparison, not your captured demo. Loading it downloads about 86.1 KB. It is optional and is not included in the baseline offline lesson download.",
    sampleCredit:
      "Big Buck Bunny © 2008 Blender Foundation, peach.blender.org. Shortened and re-encoded excerpt, licensed CC BY 3.0.",
    noSource:
      "Choose the practice video or import an existing recording in Get video before continuing with your project.",
    inspectFirst:
      "Inspect the selected source before choosing edit bounds. Its measured timing determines the available range.",
    runFirst: "Inspect this source first",
    precomputedAction: "Load the provided reference result",
    providedResult: "Provided result, generated in advance",
    providedResultNote:
      "This is a recorded reference, not a result produced by your current choices. Use it to compare evidence; make an actual edit to produce your project export.",
    sourceName: "Source filename",
    origin: "Where this file came from",
    fileSize: "File size",
    duration: "Measured duration",
    dimensions: "Picture dimensions",
    container: "Detected container family",
    mp4Family: "MP4 / QuickTime format family",
    webmFamily: "Matroska / WebM format family",
    formatFamilyNote:
      "These family names describe the inspector's format reader. Picture and sound streams are listed separately.",
    videoCodec: "Picture codec",
    audioCodec: "Sound codec",
    audioPresent: "Audio stream present",
    audioAbsent: "No audio stream found",
    seconds: "seconds",
  },
  capture: {
    title: "Choose your source video",
  },
  build: {
    title: "How a video file is created",
    intro:
      "Build a small MP4 from supplied pictures, then add sound. This is a separate structure experiment, not a conversion of your recording. Your project source stays available for Inspect and Edit.",
    picturesTitle: "Three selected pictures, not continuous motion",
    picturesNote:
      "These pictures come from the original build-queue recording at source times 0, 4 and 6 seconds. They show the initial state, the sorted result and a later hold of that result. They do not show the click or the movement between pictures.",
    firstPicture: "Initial state",
    secondPicture: "Sorted result",
    thirdPicture: "Later hold of the result",
    pictureAlt: "Selected picture from the original build-queue recording",
    sourceTime: "Time in the original recording",
    outputInterval: "Time shown in the new output",
    rate: "Pictures per second",
    rateQuestion: "Will the viewer have enough time to read the result?",
    rateNote:
      "A frame is one picture. At one picture per second, the three supplied pictures occupy successive one-second intervals. At two pictures per second, each lasts half a second. Increasing this rate shortens this experiment; it does not restore missing pictures of the action.",
    encodingTitle: "Encode pictures into a video stream",
    encodingNote:
      "Encoding represents the pictures as stored video data. A codec specifies how that data is represented and reconstructed for playback; this experiment uses H.264 for pictures. An ordered sequence of that data is a video stream. The encoder puts it in an MP4 container, the file format that organises streams and their timing.",
    encode: "Create video-only MP4",
    videoReady:
      "The video-only MP4 was created in this browser. Replay it and inspect its measured duration before adding sound.",
    muxTitle: "Add an audio stream",
    muxNote:
      "The supplied sound is a quiet synthetic tone in a WAV file, not narration. The operation uses the AAC codec to encode it as audio and copies the existing video stream into a new MP4. Putting encoded streams and their timing together in a container is called muxing; adding this sound does not re-encode the video.",
    mux: "Add synthetic sound to the MP4",
    muxReady:
      "The new MP4 contains the video and audio streams. Compare its measured file information with the video-only result.",
    needsVideo: "Create the video-only MP4 before adding sound.",
    changed:
      "The picture rate changed. Run Create video-only MP4 again to produce an output for this setting, then add sound again if needed. Earlier outputs do not demonstrate the new rate.",
    reference: "View the provided build example",
    referenceNote:
      "This example was generated in advance at one picture per second: three seconds in total, reduced to 640 × 360, with synthetic sound. It has fixed settings independent of the selector. It supports reading and comparison when processing is unavailable; it does not show that your browser completed the operation.",
    diagramTitle: "Encoding and muxing have different jobs",
    diagramPictures: "Supplied pictures",
    diagramVideoEncoder: "Encode pictures",
    diagramVideo: "Video stream",
    diagramSound: "Supplied synthetic sound",
    diagramAudioEncoder: "Encode sound",
    diagramAudio: "Audio stream",
    diagramMux: "Combine streams and timing",
    diagramContainer: "MP4 container",
    diagramNote:
      "This schematic explains the relationships. The actual output and file measurements come from running the operation; the arrows do not measure processing progress or show bytes inside a file.",
    next: "Return to your project source in Inspect",
  },
  inspect: {
    title: "Inspect and prepare real media",
    intro:
      "Choose the file you intend to edit, then inspect its actual contents. Return to the recording from Capture for your running project. You can also inspect a build-experiment output or choose a small MP4 or WebM from your device; keep those source choices distinct.",
    intentionTitle: "Compare the file with your intention",
    intention: [
      "Is the intended tab, window or screen visible?",
      "Can you follow the action and read its result?",
      "Did you intend sound, and does playback match that intention?",
    ],
    intentionNote:
      "No audio stream is not automatically a fault. Picture dimensions tell you the image size, but replay is needed to judge small text. A file that meets your intention needs no invented diagnosis.",
    select: "File to inspect",
    own: "Project recording from Capture",
    provided: "Provided original recording",
    video: "Video-only build experiment",
    muxed: "Build experiment with synthetic sound",
    upload: "Choose an MP4 or WebM from this device",
    uploadNote:
      "The file stays local. Selecting a file is not uploading it to a server.",
    run: "Inspect this file",
    ready:
      "Inspection finished. These measurements describe the selected file, not the fixed reference recording.",
    changed:
      "The selected file changed. Run Inspect this file to measure the new selection.",
    factsTitle: "What the selected file contains",
    factsNote:
      "The container organises the file. A stream carries pictures or sound. A codec specifies how that stream's data is represented and reconstructed for playback. The inspection reads these properties from the selected file.",
    durationNote:
      "Some recordings omit a declared duration. The inspector then uses observed picture timing, labelled separately. If the final picture's hold is unreported, that timing span can be shorter than playback. It does not become a declared duration in the file.",
    declaredDuration: "Duration reported by the container",
    observedDuration: "Duration derived from observed picture timing",
    missingValue: "Not reported by this file",
    referenceTitle: "Detailed reference: the original recording",
    referenceNote:
      "The frame, timestamp and tick explorer below uses its own fixed original recording. Its counts and times are not measurements of your chosen file. Use it to learn the timing concepts, then return to your project's actual evidence.",
    next: "Edit the project recording",
  },
  edit: {
    title: "Cut and join: tell the story",
    intro:
      "Keep enough opening context, the action and a readable result. Remove waiting that adds nothing to the explanation. Choose the source explicitly and set one or two kept ranges; the result is a real edited MP4.",
    source: "Recording to edit",
    rangesTitle: "Choose what to keep",
    firstStart: "First range start, seconds",
    firstEnd: "First range end, seconds",
    secondRange: "Keep a second range after the first",
    secondStart: "Second range start, seconds",
    secondEnd: "Second range end, seconds",
    rangeNote:
      "Each requested range includes its start and excludes its end. End minus start gives the requested duration; keep each range at least 0.2 seconds and within the inspected source bounds. Actual picture boundaries fall on the output's 12-pictures-per-second timeline, so the measured duration can differ. Encoded sound can also make the file slightly longer. The second kept range follows the first without a deliberate gap.",
    defaultNote:
      "For the provided recording, the suggested ranges preserve the Sort action, remove some waiting and hold the readable result. Your own recording has different timing: replay it and choose bounds within its measured duration.",
    pipelineTitle: "What the edit does",
    pipelineDecode: "Reconstruct pictures and sound",
    pipelineTrim: "Keep the selected ranges",
    pipelineReset: "Start each kept segment's clock at zero",
    pipelineJoin: "Place segments consecutively",
    pipelineEncode: "Encode the MP4 output",
    pipelineNote:
      "Decoding reconstructs media from stored data. Before cutting, the edit places pictures on a 12-pictures-per-second timeline. It repeats held pictures where needed; this adds no new motion detail. It then trims pictures and sound separately, resets each segment's clock, joins the segments if needed and encodes the MP4. Check the actual output's timing and playback rather than assuming its duration exactly matches the requested ranges.",
    qualityNote:
      "Stream copy can reuse encoded data without another encoding pass, but precise cut boundaries often require decoding and re-encoding. Lossy encoding discards picture or sound detail, and another pass can discard more. Some compression is lossless; compression does not always mean lost detail.",
    run: "Create edited MP4",
    resolutionLimit:
      "This small exercise accepts at most 1920 × 1080 pixels per picture (or an equivalent pixel count), 30 seconds and 20 MiB. Use a smaller capture or the provided recording.",
    invalidRange:
      "Use finite start and end times within the measured source duration. Each end must be later than its start.",
    changed:
      "The source or kept ranges changed. Create a new edited MP4 before treating an output as the result of these choices.",
    ready:
      "The edited MP4 was created in this browser. Replay it to check the action and result before publishing.",
    downloadRecipe: "Download command and edit recipe",
    recipeNote:
      "The recipe identifies the source, kept ranges and actual command. Keep it with the source recording if you want to reproduce the edit. The working input name tells you how to name the source when running the saved command.",
    referenceTitle: "Controlled reference: copy and encode",
    referenceNote:
      "These recorded comparisons use their own original source with known keyframes. They explain boundary behaviour; they are not a preview of your current recording or a new processing result.",
    fallback: "View the provided edited reference",
    fallbackNote:
      "This edit was generated in advance. You can replay it and compare its evidence if processing is unavailable. It remains a provided reference, so it does not count as an export produced by your choices.",
    next: "Review and download in Publish",
  },
  publish: {
    title: "Export, publish and verify",
    intro:
      "This is the first complete-demo checkpoint. Replay the actual edited file, download it with its recipe, and check it before sharing. The later production modules are optional next steps, not requirements for finishing this initial demo.",
    outputTitle: "The file you will share",
    generatedNote:
      "This output was created in your browser from the selected source and edit ranges. Check the filename and recipe before downloading.",
    providedNote:
      "You are viewing a provided edited reference. It demonstrates a possible finished demo, but you have not produced an export here. Return to Edit and run your chosen edit to create one.",
    missing:
      "No edited output is available. Return to Edit, choose the recording and kept ranges, then create an MP4. If processing is unavailable, you can still review the labelled provided reference.",
    checklistTitle: "Check the actual exported file",
    checklist: [
      "The opening gives enough context to understand the action.",
      "The action remains visible and its result is held long enough to read.",
      "Small text is readable at the size the viewer will use.",
      "Sound or silence matches the intended explanation; a synthetic tone is not narration.",
      "The downloaded MP4 plays in another player or on the intended viewing device.",
      "The file size is suitable for where you will share it.",
      "The source recording and downloaded recipe identify how this edit was made.",
    ],
    checklistNote:
      "A successful inspection cannot certify readability, clear explanation or playback on another device. Replay the downloaded file and make these checks yourself.",
    download: "Download finished MP4",
    downloadRecipe: "Download command and edit recipe",
    recipeMissing:
      "No recipe is attached to this provided reference. Create an edit to download the command and ranges for your own output.",
    returnToEdit: "Return to Edit",
    storageNote:
      "Download important work. Saved browser media can be removed, and it does not automatically follow you to another browser or device.",
    nextTitle: "Further production topics",
    nextNote:
      "Readability, sound, compression, captions and AI-assisted production remain planned modules. You can finish this initial source-to-export path without waiting for them.",
  },
} as const;
