// Copyright © 2026 Christopher Snow
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CaptureController, type CaptureState } from "../capture/controller";
import { cancelProcessing, inspectEdit, runTool } from "../processing/engine";
import { useBlobURL, useProject } from "../journey/project";
import { assetURL, EncoderOffline } from "../journey/shared";
import { routeFor, type StepName } from "../journey/routes";
import { guided } from "./guided.strings";
import { lessonTasks, captureTasks } from "./tasks";
import { parseCommand, validFilename } from "./command";
import {
  checkFiles,
  disk,
  mimeFor,
  type Files,
  type WorkspaceFile,
} from "./files";
import { cli, lessons } from "./strings";
import { referenceLessons, refStrings } from "./reference.strings";
import {
  inspectChecks,
  pictureChecks,
  referenceSources,
  inspectionCommand,
  joinedCommand,
  type ReferenceLab,
  type CheckItem,
} from "./reference-model";
import { legacyProgress, loadChecks, progressKey } from "./progress";
import { availableName, planRun } from "../workbench/model";
import { NativeBuilder } from "./NativeBuilder";
import { courseUI as ux, browserAction } from "./course.strings";
const historyKey = "video-lab:cli-history";
function savedHistory(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(historyKey) ?? "[]");
    return Array.isArray(value)
      ? value.filter((v): v is string => typeof v === "string").slice(-100)
      : [];
  } catch {
    return [];
  }
}
async function hash(blob: Blob) {
  return [
    ...new Uint8Array(
      await crypto.subtle.digest("SHA-256", await blob.arrayBuffer()),
    ),
  ]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
export function CommandLab({
  step,
  reference,
}: {
  step: StepName;
  reference?: ReferenceLab;
}) {
  const project = useProject();
  const checked = useRef(loadChecks());
  const [files, setFiles] = useState<Files>({}),
    filesRef = useRef<Files>({});
  const [ready, setReady] = useState(false),
    [persistent, setPersistent] = useState(true);
  const captureSupported =
    typeof navigator.mediaDevices?.getDisplayMedia === "function" &&
    typeof MediaRecorder !== "undefined";
  const [taskIndex, setTaskIndex] = useState(0);
  const [wrapOutput, setWrapOutput] = useState(false);
  const [outputEdges, setOutputEdges] = useState({ left: false, right: false });
  const [lines, setLines] = useState<string[]>([]),
    [command, setCommand] = useState(() => {
      try {
        return localStorage.getItem("video-lab:course-command-draft") ?? "";
      } catch {
        return "";
      }
    });
  const [feedback, setFeedback] = useState<string[]>([]);
  const [diagnostic, setDiagnostic] = useState("");
  const [pendingCommand, setPendingCommand] = useState<string>();
  const [previousDraft, setPreviousDraft] = useState<string>();
  const [builder, setBuilder] = useState(false);
  const [noteName, setNoteName] = useState("reflection.txt"),
    [noteText, setNoteText] = useState("");
  const [sourceChoice, setSourceChoice] = useState(() => {
    try {
      return localStorage.getItem("video-lab:source") ?? "";
    } catch {
      return "";
    }
  });
  const followOutput = useRef(true);
  const [notice, setNotice] = useState(cli.ready),
    [busy, setBusy] = useState(false);
  const [captureState, setCaptureState] = useState<CaptureState>("idle");
  const [preview, setPreview] = useState<string>();
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const history = useRef(savedHistory()),
    historyIndex = useRef(history.current.length),
    draft = useRef("");
  const input = useRef<HTMLTextAreaElement>(null),
    picker = useRef<HTMLInputElement>(null),
    terminal = useRef<HTMLPreElement>(null);
  const nativeTools = useRef<HTMLDetailsElement>(null);
  const replacement = useRef<HTMLButtonElement>(null);
  const noteForm = useRef<HTMLDetailsElement>(null),
    noteInput = useRef<HTMLTextAreaElement>(null);
  const generation = useRef(0),
    locked = useRef(false),
    mounted = useRef(true),
    capture = useRef<CaptureController | undefined>(undefined);
  const current = useRef({ step, project });
  current.current = { step, project };
  function print(line: string) {
    if (mounted.current) setFeedback((old) => [...old, line].slice(-100));
  }
  function raw(line: string) {
    if (mounted.current) setLines((old) => [...old, line].slice(-2000));
  }
  function useCommand(value: string) {
    if (nativeTools.current) nativeTools.current.open = true;
    if (command.trim() && command !== value) {
      setPendingCommand(value);
      requestAnimationFrame(() => replacement.current?.focus());
    } else {
      setCommand(value);
      input.current?.focus();
    }
  }
  useEffect(() => {
    try {
      localStorage.setItem("video-lab:course-command-draft", command);
    } catch {
      /* The current draft still works in this session. */
    }
  }, [command]);
  // Private legacy action IDs never enter the learner's native command editor or transcript.
  function action(value: string, example = false) {
    if (example && value.startsWith("note ")) {
      const words = parseCommand(value);
      if (!noteText && noteName === "reflection.txt") setNoteName(words[1]!);
      if (noteForm.current) noteForm.current.open = true;
      requestAnimationFrame(() => noteInput.current?.focus());
      return;
    }
    void execute(value, true);
  }
  async function put(additions: WorkspaceFile[], live = () => {}) {
    live();
    const next = { ...filesRef.current };
    additions.forEach((file) => (next[file.name] = file));
    checkFiles(next);
    filesRef.current = next;
    setFiles(next);
    try {
      for (const file of additions)
        await disk("readwrite", (store) => store.put(file));
    } catch {
      if (mounted.current) setPersistent(false);
    }
  }
  const putRef = useRef(put);
  putRef.current = put;
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      generation.current++;
      cancelProcessing();
      capture.current?.destroy();
    };
  }, []);
  useEffect(() => {
    if (!project.ready) return;
    let live = true;
    void (async () => {
      let stored: WorkspaceFile[] = [];
      try {
        stored = await disk<WorkspaceFile[]>("readonly", (store) =>
          store.getAll(),
        );
      } catch {
        if (live) setPersistent(false);
      }
      if (!live) return;
      const next = Object.fromEntries(stored.map((f) => [f.name, f]));
      const additions: WorkspaceFile[] = [];
      // Preserve existing production artefacts; do not clear their original store.
      let migrated = false;
      try {
        migrated = localStorage.getItem("video-lab:cli-migrated") === "1";
      } catch {
        /* Retain legacy recovery when storage fails. */
      }
      for (const record of migrated
        ? []
        : Object.values(current.current.project.records)) {
        const name =
          record.id === "capture"
            ? `capture.${record.blob.type.includes("webm") ? "webm" : "mp4"}`
            : record.name;
        if (!next[name]) {
          next[name] = {
            name,
            blob: record.blob,
            origin: record.origin === "capture" ? "captured" : record.origin,
            command: record.command?.join(" "),
          };
          additions.push(next[name]!);
        }
      }
      try {
        checkFiles(next);
        filesRef.current = next;
        setFiles(next);
        // Do not rewrite stored Blobs while their read handles are in use.
        // Firefox can invalidate the old backing object after replacement.
        for (const file of additions)
          await disk("readwrite", (s) => s.put(file));
        try {
          localStorage.setItem("video-lab:cli-migrated", "1");
        } catch {
          /* Files remain saved in IndexedDB. */
        }
      } catch {
        if (live) {
          filesRef.current = next;
          setFiles(next);
          setPersistent(false);
        }
      }
      if (live) {
        setReady(true);
      }
    })();
    return () => {
      live = false;
    };
  }, [project.ready]);
  useLayoutEffect(() => {
    generation.current++;
    locked.current = false;
    cancelProcessing();
    setBusy(false);
    capture.current?.destroy();
    setCaptureState("idle");
    capture.current = makeCapture();
    setNotice(cli.ready);
    setTaskIndex(0);
    return () => {
      generation.current++;
      locked.current = false;
      cancelProcessing();
      capture.current?.destroy();
    };
  }, [step, reference]);
  useEffect(() => {
    project.setActive(busy || captureState !== "idle");
    return () => project.setActive(false);
  }, [busy, captureState, project.setActive]);
  useEffect(() => {
    if (terminal.current && followOutput.current)
      terminal.current.scrollTop = terminal.current.scrollHeight;
  }, [lines]);
  function measureOutput() {
    const el = terminal.current;
    if (!el) return;
    followOutput.current =
      el.scrollHeight - el.clientHeight - el.scrollTop < 32;
    const left = !wrapOutput && el.scrollLeft > 1;
    const right =
      !wrapOutput && el.scrollWidth - el.clientWidth - el.scrollLeft > 1;
    setOutputEdges((previous) =>
      previous.left === left && previous.right === right
        ? previous
        : { left, right },
    );
  }
  useLayoutEffect(() => {
    measureOutput();
    const observer = new ResizeObserver(measureOutput);
    if (terminal.current) observer.observe(terminal.current);
    window.addEventListener("resize", measureOutput);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureOutput);
    };
  }, [lines, wrapOutput]);
  function scrollOutput(direction: number) {
    const el = terminal.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8 });
    el.focus({ preventScroll: true });
    measureOutput();
  }
  const selected = preview ? files[preview] : undefined,
    mediaURL = useBlobURL(selected?.blob);
  useEffect(() => setPlaybackFailed(false), [mediaURL]);
  function makeCapture() {
    return new CaptureController({
      state: (state) => {
        setCaptureState(state);
        setNotice(cli.capture[state]);
      },
      error: (error) => {
        print(
          `${cli.error} ${error instanceof Error ? error.message : String(error)}. ${cli.captureFailure}`,
        );
        setNotice(cli.failed);
      },
      complete: (result) => {
        const ext = result.mime.includes("mp4") ? "mp4" : "webm";
        let name = `capture.${ext}`,
          index = 2;
        while (filesRef.current[name]) name = `capture-${index++}.${ext}`;
        void putRef
          .current([{ name, blob: result.blob, origin: "captured" }])
          .then(() => {
            print(
              `${cli.saved} ${name} (${result.blob.size} B). ${cli.captureComplete}`,
            );
            setNotice(cli.done);
            setPreview(name);
            selectSource(name);
          })
          .catch((e) => {
            print(String(e));
            setNotice(cli.failed);
          });
      },
    });
  }
  function cancel() {
    generation.current++;
    locked.current = false;
    cancelProcessing();
    capture.current?.destroy();
    capture.current = makeCapture();
    setCaptureState("idle");
    setBusy(false);
    setNotice(cli.cancelled);
    print(cli.cancelled);
  }
  function download(file: WorkspaceFile) {
    const url = URL.createObjectURL(file.blob),
      a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  async function execute(text: string, browser = false) {
    let words: string[];
    try {
      words = parseCommand(text);
    } catch (e) {
      print(`${cli.error} ${(e as Error).message}`);
      setNotice(cli.failed);
      return;
    }
    if (!words.length) return;
    const [tool, ...args] = words;
    if (!browser && tool !== "ffmpeg" && tool !== "ffprobe") {
      print(ux.nativeOnly);
      setNotice(cli.failed);
      return;
    }
    if (!browser) {
      setLines([`$ ${text}`]);
      followOutput.current = true;
      setDiagnostic("");
    }
    setFeedback([]);
    const simple = (count: number) => {
      if (args.length !== count) throw new Error(cli.arguments);
    };
    try {
      if (tool === "cancel") {
        simple(0);
        cancel();
        return;
      }
      if (tool === "help") {
        if (args.length > 1 || (args.length === 1 && args[0] !== "all"))
          throw new Error(guided.helpAll);
        if (!locked.current) setNotice(cli.done);
        print(cli.help);
        return;
      }
      if (tool === "clear") {
        simple(0);
        if (!locked.current) setNotice(cli.done);
        setLines([]);
        return;
      }
      if (tool === "ls") {
        simple(0);
        if (!locked.current) setNotice(cli.done);
        print(
          Object.values(filesRef.current)
            .map((f) => `${f.name}\t${f.blob.size} B\t${f.origin}`)
            .join("\n") || cli.empty,
        );
        return;
      }
      if (tool === "stop") {
        simple(0);
        if (captureState !== "recording") throw new Error(cli.notRecording);
        capture.current?.stop();
        return;
      }
      if (locked.current || captureState !== "idle") throw new Error(cli.wait);
      if (!ready) throw new Error(cli.loading);
      if (tool === "hint" || tool === "solution") {
        const lab = args[0];
        if (
          (lab !== "inspect" && lab !== "edit") ||
          args.length > (tool === "hint" ? 2 : 1) ||
          !args.length
        )
          throw new Error(refStrings.checkUsage);
        const level = Number(args[1] ?? 1);
        if (
          tool === "hint" &&
          (!Number.isInteger(level) || level < 1 || level > 5)
        )
          throw new Error(refStrings.checkUsage);
        print(
          tool === "hint"
            ? refStrings.hints[lab][level - 1]!
            : lab === "inspect"
              ? inspectionCommand
              : joinedCommand,
        );
        setNotice(cli.done);
        return;
      }
      if (tool === "scene") {
        simple(0);
        if (!locked.current) setNotice(cli.done);
        print(ux.recordAdvice);
        return;
      }
      if (tool === "capture") {
        if (args.length > 1 || (args.length === 1 && args[0] !== "--audio"))
          throw new Error(cli.captureUsage);
        if (
          !navigator.mediaDevices?.getDisplayMedia ||
          typeof MediaRecorder === "undefined"
        )
          throw new Error(cli.unsupported);
        // Invoke before any await: getDisplayMedia requires the learner's gesture.
        void capture.current?.start(args[0] === "--audio");
        return;
      }
      if (tool === "import") {
        simple(0);
        picker.current?.click();
        return;
      }
      if (tool === "play" || tool === "download" || tool === "rm") {
        simple(1);
        const file = filesRef.current[args[0]!];
        if (!file) throw new Error(`${cli.missing} ${args[0]}. ${cli.useLs}`);
        if (tool === "play") {
          if (!/^(video|audio|image)\//.test(file.blob.type))
            throw new Error(cli.notMedia);
          if (!locked.current) setNotice(cli.done);
          setPreview(file.name);
          print(`${cli.preview} ${file.name}`);
          return;
        }
        if (tool === "download") {
          setNotice(cli.done);
          download(file);
          print(`${cli.downloaded} ${file.name}`);
          return;
        }
        const operation = ++generation.current;
        locked.current = true;
        setBusy(true);
        setNotice(cli.running);
        const next = { ...filesRef.current };
        delete next[file.name];
        filesRef.current = next;
        setFiles(next);
        if (preview === file.name) setPreview(undefined);
        try {
          await disk("readwrite", (s) => s.delete(file.name));
        } catch {
          setPersistent(false);
        }
        if (operation !== generation.current || !mounted.current) return;
        locked.current = false;
        setBusy(false);
        setNotice(cli.done);
        print(`${cli.removed} ${file.name}`);
        return;
      }
      const operation = ++generation.current;
      const live = () => {
        if (!mounted.current || operation !== generation.current)
          throw new DOMException(cli.cancelled, "AbortError");
      };
      locked.current = true;
      setBusy(true);
      setNotice(cli.running);
      try {
        if (tool === "cat") {
          simple(1);
          const file = filesRef.current[args[0]!];
          if (!file) throw new Error(`${cli.missing} ${args[0]}`);
          if (!/\.(json|txt|md)$/i.test(file.name))
            throw new Error(refStrings.catUsage);
          const content = await file.blob.text();
          live();
          print(content);
        } else if (tool === "note") {
          if (
            args.length !== 2 ||
            !validFilename(args[0]!) ||
            !/\.(txt|md)$/i.test(args[0]!)
          )
            throw new Error(refStrings.noteUsage);
          if (filesRef.current[args[0]!]) throw new Error(cli.exists);
          await put(
            [
              {
                name: args[0]!,
                blob: new Blob([args[1]!], { type: "text/plain" }),
                origin: "note",
              },
            ],
            live,
          );
          live();
          print(`${refStrings.noteSaved} ${args[0]}`);
        } else if (tool === "progress") {
          simple(0);
          print(refStrings.progressTitle);
          for (const lab of ["inspect", "edit"] as const) {
            const saved = checked.current[lab],
              file = saved ? filesRef.current[saved.name] : undefined;
            const current =
              saved && file && (await hash(file.blob)) === saved.sha256;
            live();
            print(
              `${lab}: ${saved ? (current ? refStrings.checked : refStrings.changed) : refStrings.notChecked}${saved ? ` · ${saved.name} · SHA-256 ${saved.sha256}` : ""}`,
            );
            const legacy = legacyProgress(lab);
            print(
              `${refStrings.legacyTitle} ${lab}: ${legacy.complete ? refStrings.legacySaved : refStrings.legacyNone}`,
            );
            if (legacy.note) print(`${refStrings.legacyNotes} ${legacy.note}`);
          }
        } else if (tool === "check") {
          const [lab, name] = args;
          if (args.length !== 2 || (lab !== "inspect" && lab !== "edit"))
            throw new Error(refStrings.checkUsage);
          const file = filesRef.current[name!];
          if (!file) throw new Error(`${cli.missing} ${name}`);
          const expected = referenceSources[lab],
            evidence = file.evidence;
          if (
            !evidence ||
            evidence.tool !== (lab === "inspect" ? "ffprobe" : "ffmpeg")
          )
            throw new Error(refStrings.missingEvidence);
          if (
            !evidence.inputs.some(
              (i) => i.name === expected.name && i.sha256 === expected.sha256,
            ) ||
            !evidence.args.some((a) => a.includes(expected.name))
          )
            throw new Error(refStrings.wrongSource);
          let items: CheckItem[];
          if (lab === "inspect")
            items = inspectChecks(JSON.parse(await file.blob.text()));
          else {
            const source = filesRef.current[expected.name];
            if (!source || (await hash(source.blob)) !== expected.sha256)
              throw new Error(refStrings.wrongSource);
            live();
            const result = await inspectEdit(file.blob, source.blob, (line) => {
              if (operation === generation.current) print(line);
            });
            live();
            const p = result.probe,
              video = p.streams.find((s) => s.codec_type === "video"),
              audio = p.streams.find((s) => s.codec_type === "audio"),
              pictures = pictureChecks(result.output, result.source);
            items = [
              {
                id: "video",
                pass: video?.codec_name === "h264",
                actual: video?.codec_name ?? "missing",
              },
              {
                id: "audio",
                pass: audio?.codec_name === "aac",
                actual: audio?.codec_name ?? "missing",
              },
              {
                id: "dimensions",
                pass: video?.width === 960 && video?.height === 540,
                actual: `${video?.width}×${video?.height}`,
              },
              {
                id: "duration",
                pass: Math.abs(Number(p.format.duration) - 4) < 0.09,
                actual: String(p.format.duration),
              },
              {
                id: "start",
                pass:
                  Number.isFinite(Number(video?.start_time)) &&
                  Math.abs(Number(video?.start_time)) < 0.09,
                actual: String(video?.start_time),
              },
              {
                id: "frames",
                pass: pictures.count === 48,
                actual: String(pictures.count),
              },
              {
                id: "pictures",
                pass: pictures.pass,
                actual: `RGB RMS max=${pictures.maxRms.toFixed(3)}; limit<2`,
              },
            ];
          }
          live();
          for (const item of items)
            print(
              `${item.pass ? "PASS" : "FAIL"} ${refStrings.criterionLabels[item.id as keyof typeof refStrings.criterionLabels] ?? item.id}: ${item.actual}`,
            );
          if (items.every((i) => i.pass)) {
            checked.current[lab] = {
              name: name!,
              sha256: await hash(file.blob),
              checked: new Date().toISOString(),
            };
            live();
            try {
              localStorage.setItem(
                progressKey,
                JSON.stringify(checked.current),
              );
            } catch {
              print(refStrings.progressSession);
            }
            print(refStrings.checkPassed);
          } else print(refStrings.checkFailed);
        } else if (
          ["sample", "fixtures", "reference", "comparison"].includes(tool!)
        ) {
          if (tool === "reference") {
            if (
              args.length !== 1 ||
              !["build", "edit", "inspect", "cuts"].includes(args[0]!)
            )
              throw new Error(cli.referenceUsage);
          } else simple(0);
          const paths =
            tool === "comparison"
              ? [["optional/big-buck-bunny-5s.mp4", "comparison.mp4"]]
              : tool === "reference"
                ? args[0] === "inspect" || args[0] === "cuts"
                  ? [
                      [
                        referenceSources[
                          args[0] === "inspect" ? "inspect" : "edit"
                        ].path,
                        referenceSources[
                          args[0] === "inspect" ? "inspect" : "edit"
                        ].name,
                      ],
                    ]
                  : [
                      [
                        args[0] === "build"
                          ? "media/journey/with-audio.mp4"
                          : "media/journey/edited-demo.mp4",
                        `reference-${args[0]}.mp4`,
                      ],
                    ]
                : tool === "sample"
                  ? [
                      [
                        "media/mousepad-demo.mp4",
                        availableName("mousepad-demo.mp4", filesRef.current),
                      ],
                    ]
                  : [
                      ["media/mousepad-frames/frame000.jpg", "frame000.jpg"],
                      ["media/mousepad-frames/frame001.jpg", "frame001.jpg"],
                      ["media/mousepad-frames/frame002.jpg", "frame002.jpg"],
                      ["media/journey/tone.wav", "tone.wav"],
                    ];
          if (paths.some(([, name]) => filesRef.current[name!]))
            throw new Error(cli.exists);
          const additions = await Promise.all(
            paths.map(async ([path, name]) => {
              const response = await fetch(assetURL(path!));
              if (!response.ok) throw new Error(cli.fetchFailed);
              return {
                name: name!,
                blob: new Blob([await response.arrayBuffer()], {
                  type: mimeFor(name!),
                }),
                origin: "provided" as const,
              };
            }),
          );
          live();
          await put(additions, live);
          live();
          print(
            tool === "sample"
              ? cli.sampleSaved
              : tool === "fixtures"
                ? cli.fixturesSaved
                : tool === "reference"
                  ? `${cli.referenceSaved} ${additions[0]!.name}`
                  : `${cli.comparisonSaved}
${cli.comparisonCredit}`,
          );
          if (tool === "sample") {
            selectSource(additions[0]!.name);
            setPreview(additions[0]!.name);
          }
          if (tool === "reference" || tool === "comparison")
            setPreview(additions[0]!.name);
        } else {
          const plan = planRun(text, filesRef.current, sourceChoice);
          if (
            plan.output &&
            filesRef.current[plan.output] &&
            !plan.args.includes("-y")
          )
            throw new Error(
              plan.tool === "ffprobe" ? cli.exists : cli.overwrite,
            );
          const snapshot = Object.values(filesRef.current).filter(
            (f) => f.origin !== "recipe",
          );
          const inputs = await Promise.all(
            snapshot.map(async (f) => ({
              name: f.name,
              data: new Uint8Array(await f.blob.arrayBuffer()),
            })),
          );
          live();
          let sawBareAbort = false;
          const result = await runTool({ ...plan, inputs }, (line) => {
            if (line === "Aborted()") sawBareAbort = true;
            if (operation === generation.current) raw(line);
          });
          live();
          if (result.text) {
            followOutput.current = false;
            raw(result.text);
            requestAnimationFrame(() => {
              if (terminal.current) terminal.current.scrollTop = 0;
            });
          }
          const written =
            result.bytes ??
            (result.text && plan.output
              ? new TextEncoder().encode(result.text)
              : undefined);
          if (written && plan.output) {
            const recipe = {
              tool: plan.tool,
              args: plan.args,
              command: text,
              created: new Date().toISOString(),
              inputs: await Promise.all(
                snapshot
                  .filter((f) => f.origin !== "recipe")
                  .map(async (f) => ({
                    name: f.name,
                    bytes: f.blob.size,
                    sha256: await hash(f.blob),
                  })),
              ),
              output: plan.output,
            };
            live();
            const recipeName = `${plan.output}.recipe.json`;
            await put(
              [
                {
                  name: plan.output,
                  blob: new Blob([written], {
                    type: mimeFor(plan.output),
                  }),
                  origin: plan.tool === "ffprobe" ? "report" : "generated",
                  command: text,
                  evidence: {
                    tool: plan.tool,
                    args: plan.args,
                    inputs: recipe.inputs,
                  },
                },
                {
                  name: recipeName,
                  blob: new Blob([JSON.stringify(recipe, null, 2)], {
                    type: "application/json",
                  }),
                  origin: "recipe",
                },
              ],
              live,
            );
            live();
            print(
              `${cli.saved} ${plan.output}\n${cli.recipeSaved} ${recipeName}`,
            );
            if (plan.tool === "ffmpeg") setPreview(plan.output);
          }
          if (plan.tool === "ffmpeg" && result.code === 0 && sawBareAbort)
            setDiagnostic(cli.cleanupNotice);
          setDiagnostic(
            result.code === -1
              ? cli.probeSuccess
              : `${cli.exit} ${result.code}`,
          );
        }
        live();
        setNotice(cli.done);
      } finally {
        if (operation === generation.current) {
          locked.current = false;
          setBusy(false);
        }
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      print(`${cli.error} ${e instanceof Error ? e.message : String(e)}`);
      setNotice(cli.failed);
    }
  }
  function submit() {
    const value = command.trim();
    if (!value) return;
    history.current = [...history.current, value].slice(-100);
    historyIndex.current = history.current.length;
    draft.current = "";
    try {
      localStorage.setItem(historyKey, JSON.stringify(history.current));
    } catch {
      /* Session history remains usable. */
    }
    void execute(value);
    input.current?.focus();
  }
  async function imported(file?: File) {
    if (!file) return;
    if (locked.current || captureState !== "idle") {
      print(cli.wait);
      return;
    }
    const operation = ++generation.current;
    const live = () => {
      if (!mounted.current || operation !== generation.current)
        throw new DOMException(cli.cancelled, "AbortError");
    };
    locked.current = true;
    setBusy(true);
    setNotice(cli.running);
    try {
      const name = availableName(file.name, filesRef.current);
      const bytes = await file.arrayBuffer();
      live();
      await put(
        [
          {
            name,
            blob: new Blob([bytes], { type: file.type || mimeFor(file.name) }),
            origin: "imported",
          },
        ],
        live,
      );
      live();
      if ((file.type || mimeFor(name)).startsWith("video/")) selectSource(name);
      print(`${cli.imported} ${name}`);
      setNotice(cli.done);
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        print(`${cli.error} ${(e as Error).message}`);
        setNotice(cli.failed);
      }
    } finally {
      if (operation === generation.current) {
        locked.current = false;
        setBusy(false);
      }
    }
  }
  const lesson = reference ? referenceLessons[reference] : lessons[step];
  const source =
    (files[sourceChoice]?.blob.type.startsWith("video/")
      ? files[sourceChoice]
      : undefined) ??
    Object.values(files)
      .slice()
      .reverse()
      .find(
        (file) =>
          file.blob.type.startsWith("video/") &&
          file.origin !== "generated" &&
          !file.name.startsWith("reference-") &&
          file.name !== "comparison.mp4",
      );
  const sourceName = source?.name ?? "mousepad-demo.mp4";
  const tasks =
    step === "capture" && !reference
      ? captureTasks(sourceName, captureSupported, !!source)
      : lessonTasks(step, reference);
  const section = reference
    ? routeFor(window.location.hash).section
    : undefined;
  const activeTask = reference
    ? Math.max(
        0,
        tasks.findIndex((task) => task.id === section),
      )
    : Math.min(taskIndex, tasks.length - 1);
  const currentTask = tasks[activeTask]!;
  const examples = currentTask.examples.map((example) => ({
    ...example,
    command: reference
      ? example.command
      : example.command.replace(
          /(?<![a-zA-Z0-9._-])(?:mousepad-demo|capture)\.mp4(?![a-zA-Z0-9._-])/g,
          () => sourceName,
        ),
  }));
  const nativeExample = examples.find((e) =>
    /^ff(mpeg|probe)\b/.test(e.command),
  )?.command;
  function selectSource(name: string) {
    setSourceChoice(name);
    try {
      localStorage.setItem("video-lab:source", name);
    } catch {
      /* Session source remains available. */
    }
  }

  function chooseTask(index: number) {
    if (reference)
      window.location.hash = `#/${step}/reference/${tasks[index]!.id}`;
    else setTaskIndex(index);
    requestAnimationFrame(() => {
      const heading = document.getElementById("current-task");
      heading?.focus({ preventScroll: true });
      if (window.innerWidth < 900) heading?.scrollIntoView({ block: "start" });
    });
  }

  return (
    <article
      className="journey-page cli-lab"
      data-step={step}
      data-reference={reference ?? ""}
    >
      <h1>{lesson.title}</h1>
      <p className="lesson-intro">{lesson.intro}</p>
      <div className="lab-workbench">
        <section
          className="task-panel"
          aria-labelledby="current-task"
          id={reference ? `section-${currentTask.id}` : undefined}
        >
          <p className="task-count">
            {guided.currentTask} · {activeTask + 1} {guided.of} {tasks.length}
          </p>
          <h2 id="current-task" tabIndex={-1}>
            {currentTask.title}
          </h2>
          {currentTask.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <ol className="command-lessons">
            {examples.map((example, index) => (
              <li key={index}>
                {example.note && <p>{example.note}</p>}
                {/^ff(mpeg|probe)\b/.test(example.command) ? (
                  <>
                    <pre>
                      <code>{example.command}</code>
                    </pre>
                    <button
                      type="button"
                      onClick={() => useCommand(example.command)}
                    >
                      {ux.useCommand}
                    </button>
                  </>
                ) : reference &&
                  currentTask.id === "reflection" &&
                  /^download .*\.(txt|md)$/.test(example.command) ? null : (
                  <button
                    type="button"
                    disabled={
                      busy ||
                      !ready ||
                      (example.command === "stop"
                        ? captureState !== "recording"
                        : captureState !== "idle")
                    }
                    onClick={() => action(example.command, true)}
                  >
                    {browserAction(example.command)}
                  </button>
                )}
              </li>
            ))}
          </ol>
          {step === "capture" && activeTask === 0 && captureSupported && (
            <details>
              <summary>{guided.capture.recordingDetailTitle}</summary>
              {guided.capture.recordingDetails.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </details>
          )}
          <p className="task-navigation-note">{guided.manualNavigation}</p>
          <details>
            <summary>{guided.navigation}</summary>
            <nav aria-label={guided.navigation}>
              <ol>
                {tasks.map((task, index) => (
                  <li key={task.id}>
                    {reference ? (
                      <a
                        href={`#/${step}/reference/${task.id}`}
                        aria-current={index === activeTask ? "step" : undefined}
                      >
                        {task.title}
                      </a>
                    ) : (
                      <button
                        type="button"
                        aria-current={index === activeTask ? "step" : undefined}
                        onClick={() => chooseTask(index)}
                      >
                        {index + 1} · {task.examples[0]?.note || task.title}
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </details>
        </section>
        <section
          className="command-workspace"
          aria-labelledby="cli-heading"
          aria-busy={busy}
        >
          <h2 id="cli-heading">
            {step === "capture"
              ? ux.sourceFiles
              : step === "publish"
                ? ux.publishFiles
                : cli.title}
          </h2>
          <details className="workspace-actions">
            <summary>{ux.setup}</summary>
            <div className="course-actions">
              {[
                "sample",
                "fixtures",
                "import",
                "ls",
                "progress",
                ...(reference
                  ? [
                      reference === "inspect"
                        ? "reference inspect"
                        : "reference cuts",
                    ]
                  : []),
              ].map((value) => (
                <button
                  type="button"
                  key={value}
                  disabled={busy || !ready}
                  onClick={() => action(value)}
                >
                  {browserAction(value)}
                </button>
              ))}
              {captureSupported && (
                <button
                  type="button"
                  disabled={busy || !ready || captureState !== "idle"}
                  onClick={() => action("capture")}
                >
                  {ux.record}
                </button>
              )}
              {captureSupported && (
                <button
                  type="button"
                  disabled={busy || !ready || captureState !== "idle"}
                  onClick={() => action("capture --audio")}
                >
                  {ux.recordAudio}
                </button>
              )}
              <button
                type="button"
                disabled={captureState !== "recording"}
                onClick={() => action("stop")}
              >
                {ux.stop}
              </button>
            </div>
          </details>
          <p className="selected-source">
            {ux.source}: <code>{source?.name ?? ux.noSource}</code>
          </p>
          <details
            className="native-tools"
            ref={nativeTools}
            open={step !== "capture" && step !== "publish"}
          >
            <summary>{ux.nativeTools}</summary>
            <div className="course-actions">
              <button
                type="button"
                aria-pressed={builder}
                onClick={() => setBuilder(true)}
              >
                {ux.builder}
              </button>
              <button
                type="button"
                aria-pressed={!builder}
                onClick={() => setBuilder(false)}
              >
                {ux.manual}
              </button>
            </div>
            {builder && (
              <NativeBuilder
                command={command || nativeExample || `ffprobe ${sourceName}`}
                onChange={useCommand}
              />
            )}
            {pendingCommand && (
              <section role="alert" className="draft-confirm">
                <p>{ux.replaceQuestion}</p>
                <pre>{pendingCommand}</pre>
                <button
                  type="button"
                  ref={replacement}
                  onClick={() => {
                    setPreviousDraft(command);
                    setCommand(pendingCommand);
                    setPendingCommand(undefined);
                  }}
                >
                  {ux.replace}
                </button>
                <button
                  type="button"
                  onClick={() => setPendingCommand(undefined)}
                >
                  {ux.keepDraft}
                </button>
              </section>
            )}
            {previousDraft !== undefined && (
              <button
                type="button"
                onClick={() => {
                  setCommand(previousDraft);
                  setPreviousDraft(undefined);
                }}
              >
                {ux.restore}
              </button>
            )}
            <div className="workspace-transcripts">
              <p>{guided.scope}</p>
              <p>{guided.keyboard}</p>
              <details className="workspace-usage">
                <summary>{guided.usage}</summary>
                <p>{cli.scope}</p>
                <p>{cli.keyboard}</p>
                <p>{cli.outputScrolling}</p>
                <p>{cli.storage}</p>
                <p>{ux.limits}</p>
              </details>
              <button
                type="button"
                aria-pressed={wrapOutput}
                aria-controls="cli-output"
                onClick={() => setWrapOutput((value) => !value)}
              >
                {cli.wrapLines}
              </button>
              <span id="cli-output-scrolling" className="sr-only">
                {cli.outputScrolling}
              </span>
              <div
                className="terminal-frame"
                data-left={outputEdges.left}
                data-right={outputEdges.right}
              >
                <pre
                  id="cli-output"
                  className={`terminal-output${wrapOutput ? " terminal-output-wrapped" : ""}`}
                  ref={terminal}
                  onScroll={measureOutput}
                  tabIndex={0}
                  aria-label={cli.output}
                  aria-describedby="cli-output-scrolling"
                >
                  {lines.join("\n")}
                </pre>
              </div>
              {(outputEdges.left || outputEdges.right) && (
                <div className="terminal-scroll-controls">
                  {outputEdges.left && (
                    <button
                      type="button"
                      aria-controls="cli-output"
                      onClick={() => scrollOutput(-1)}
                    >
                      {cli.previousOutput}
                    </button>
                  )}
                  {outputEdges.right && (
                    <button
                      className="terminal-scroll-right"
                      type="button"
                      aria-controls="cli-output"
                      onClick={() => scrollOutput(1)}
                    >
                      {cli.moreOutput}
                    </button>
                  )}
                </div>
              )}
            </div>
            <details>
              <summary>{ux.diagnostics}</summary>
              <p>{diagnostic || ux.noDiagnostics}</p>
            </details>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <label htmlFor="cli-input">{cli.input}</label>
              <textarea
                id="cli-input"
                ref={input}
                value={command}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                rows={3}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                  if (
                    e.key === "c" &&
                    e.ctrlKey &&
                    (busy || captureState !== "idle")
                  ) {
                    e.preventDefault();
                    cancel();
                  }
                  if (
                    (e.key === "ArrowUp" || e.key === "ArrowDown") &&
                    !command.includes("\n")
                  ) {
                    e.preventDefault();
                    if (historyIndex.current === history.current.length)
                      draft.current = command;
                    historyIndex.current = Math.max(
                      0,
                      Math.min(
                        history.current.length,
                        historyIndex.current + (e.key === "ArrowUp" ? -1 : 1),
                      ),
                    );
                    setCommand(
                      history.current[historyIndex.current] ?? draft.current,
                    );
                  }
                }}
              />
              <button type="submit" disabled={!ready}>
                {cli.run}
              </button>
            </form>
          </details>
          <pre className="workspace-feedback" aria-label={ux.feedback}>
            {feedback.join("\n")}
          </pre>
          <div className="course-actions">
            <button
              type="button"
              onClick={cancel}
              disabled={!busy && captureState === "idle"}
            >
              {ux.cancel}
            </button>
            <button
              type="button"
              onClick={() => {
                action("clear");
              }}
            >
              {ux.clear}
            </button>
          </div>
          <p role="status">{notice}</p>
          <div className="task-controls">
            <button
              type="button"
              disabled={activeTask === 0}
              onClick={() => chooseTask(activeTask - 1)}
            >
              {guided.previous}
            </button>
            <button
              type="button"
              disabled={activeTask === tasks.length - 1}
              onClick={() => chooseTask(activeTask + 1)}
            >
              {guided.next}
            </button>
          </div>
          {activeTask === tasks.length - 1 && lesson.next && (
            <a className="button" href={`#/${lesson.next}`}>
              {cli.next} {lessons[lesson.next].title}
            </a>
          )}

          {!persistent && <p>{cli.session}</p>}
          <input
            ref={picker}
            className="cli-file-picker"
            type="file"
            aria-label={cli.file}
            accept="video/*,audio/*,image/*,.json"
            onChange={(e) => {
              void imported(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <details open className="workspace-files">
            <summary>{cli.files}</summary>
            <ul>
              {Object.values(files).map((f) => (
                <li key={f.name}>
                  <code>{f.name}</code> · {f.blob.size.toLocaleString()} B ·{" "}
                  {f.origin}
                  <div className="course-actions">
                    {/^(video|audio|image)\//.test(f.blob.type) ? (
                      <button
                        type="button"
                        disabled={busy || !ready}
                        onClick={() => action(`play ${f.name}`)}
                      >
                        {ux.replay} {f.name}
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={busy || !ready}
                        onClick={() => action(`cat ${f.name}`)}
                      >
                        {ux.read} {f.name}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => action(`download ${f.name}`)}
                    >
                      {ux.download} {f.name}
                    </button>
                    <button
                      type="button"
                      disabled={busy || !ready}
                      onClick={() => action(`rm ${f.name}`)}
                    >
                      {ux.delete} {f.name}
                    </button>
                    {f.blob.type.startsWith("video/") && (
                      <button
                        type="button"
                        disabled={busy || !ready}
                        onClick={() => selectSource(f.name)}
                      >
                        {ux.useSource} {f.name}
                      </button>
                    )}
                    {reference && (
                      <button
                        type="button"
                        disabled={busy || !ready}
                        onClick={() => action(`check ${reference} ${f.name}`)}
                      >
                        {ux.check} {f.name}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </details>
          {reference && (
            <details className="reference-controls" ref={noteForm}>
              <summary>{ux.referenceTools}</summary>
              <div className="course-actions">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => action(`hint ${reference} ${level}`)}
                  >
                    {ux.hint} {level}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => action(`solution ${reference}`)}
                >
                  {ux.solution}
                </button>
                <button type="button" onClick={() => action("progress")}>
                  {ux.progress}
                </button>
              </div>
              <label htmlFor="personal-note-name">{ux.noteName}</label>
              <input
                id="personal-note-name"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
              />
              <label htmlFor="personal-note-text">{ux.noteText}</label>
              <textarea
                id="personal-note-text"
                ref={noteInput}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button
                type="button"
                disabled={busy || !ready}
                onClick={() =>
                  action(`note ${noteName} ${JSON.stringify(noteText)}`)
                }
              >
                {ux.saveNote}
              </button>
            </details>
          )}
          {
            <details>
              <summary>{ux.comparisons}</summary>
              {["reference build", "reference edit", "comparison"].map(
                (value) => (
                  <button
                    type="button"
                    key={value}
                    disabled={busy || !ready}
                    onClick={() => action(value)}
                  >
                    {browserAction(value)}
                  </button>
                ),
              )}
            </details>
          }
          {selected && mediaURL && (
            <section className="cli-preview">
              <h2>
                {cli.preview} {selected.name}
              </h2>
              <p>
                {selected.origin} · {selected.blob.size.toLocaleString()} B
              </p>
              {selected.blob.type.startsWith("image/") ? (
                <img src={mediaURL} alt={selected.name} />
              ) : selected.blob.type.startsWith("audio/") ? (
                <audio
                  src={mediaURL}
                  controls
                  aria-label={selected.name}
                  onError={() => setPlaybackFailed(true)}
                />
              ) : (
                <video
                  src={mediaURL}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={selected.name}
                  onError={() => setPlaybackFailed(true)}
                />
              )}
              {selected.name === "comparison.mp4" && (
                <p>
                  {cli.comparisonCredit}{" "}
                  <a href="https://peach.blender.org/about/">
                    Blender Foundation
                  </a>{" "}
                  ·{" "}
                  <a href="https://creativecommons.org/licenses/by/3.0/">
                    CC BY 3.0
                  </a>
                </p>
              )}
              {playbackFailed && <p role="alert">{cli.playbackError}</p>}
            </section>
          )}
        </section>
      </div>
      <details className="lesson-background">
        <summary>{guided.background}</summary>
        <h2>{lesson.heading}</h2>
        {lesson.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p>{lesson.challenge}</p>
        {step === "capture" &&
          guided.capture.recordingDetails.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
      </details>
      <EncoderOffline />
    </article>
  );
}
