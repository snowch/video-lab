// Copyright © 2026 Christopher Snow
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CaptureController, type CaptureState } from "../capture/controller";
import { cancelProcessing, inspectEdit, runTool } from "../processing/engine";
import { useBlobURL, useProject } from "../journey/project";
import { assetURL, EncoderOffline } from "../journey/shared";
import type { StepName } from "../journey/routes";
import { parseCommand, toolPlan, validFilename } from "./command";
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
  const [lines, setLines] = useState<string[]>([]),
    [command, setCommand] = useState("");
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
  const generation = useRef(0),
    locked = useRef(false),
    mounted = useRef(true),
    capture = useRef<CaptureController | undefined>(undefined);
  const current = useRef({ step, project });
  current.current = { step, project };
  function print(line: string) {
    if (mounted.current) setLines((old) => [...old, line].slice(-400));
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
        print(cli.welcome);
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
    if (terminal.current)
      terminal.current.scrollTop = terminal.current.scrollHeight;
  }, [lines]);
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
  async function execute(text: string) {
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
    print(`$ ${text}`);
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
        simple(0);
        if (!locked.current) setNotice(cli.done);
        print(`${cli.help}\n${refStrings.helpExtra}`);
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
        window.open(assetURL("demo.html"), "_blank", "noopener,noreferrer");
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
                  ? [["media/build-queue.mp4", "capture.mp4"]]
                  : [
                      ["media/frames/000.jpg", "frame000.jpg"],
                      ["media/frames/048.jpg", "frame001.jpg"],
                      ["media/frames/072.jpg", "frame002.jpg"],
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
          if (tool === "reference" || tool === "comparison")
            setPreview(additions[0]!.name);
        } else {
          const plan = toolPlan(words);
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
            if (operation === generation.current) print(line);
          });
          live();
          if (result.text) print(result.text);
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
            print(cli.cleanupNotice);
          print(
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
    setCommand("");
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
      if (filesRef.current[file.name]) throw new Error(cli.exists);
      const bytes = await file.arrayBuffer();
      live();
      await put(
        [
          {
            name: file.name,
            blob: new Blob([bytes], { type: file.type || mimeFor(file.name) }),
            origin: "imported",
          },
        ],
        live,
      );
      live();
      print(`${cli.imported} ${file.name}`);
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
  return (
    <article
      className="journey-page cli-lab"
      data-step={step}
      data-reference={reference ?? ""}
    >
      <h1>{lesson.title}</h1>
      <p className="lesson-intro">{lesson.intro}</p>
      <section
        className="command-workspace"
        aria-labelledby="cli-heading"
        aria-busy={busy}
      >
        <h2 id="cli-heading">{cli.title}</h2>
        <p>{cli.scope}</p>
        <p>{cli.keyboard}</p>
        <pre
          className="terminal-output"
          ref={terminal}
          tabIndex={0}
          aria-label={cli.output}
        >
          {lines.join("\n") || cli.welcome}
        </pre>
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
        <p role="status">{notice}</p>
        <p>{persistent ? cli.storage : cli.session}</p>
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
        <details>
          <summary>{cli.files}</summary>
          <ul>
            {Object.values(files).map((f) => (
              <li key={f.name}>
                <code>{f.name}</code> · {f.blob.size.toLocaleString()} B ·{" "}
                {f.origin}
              </li>
            ))}
          </ul>
        </details>
      </section>
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
              <a href="https://peach.blender.org/about/">Blender Foundation</a>{" "}
              ·{" "}
              <a href="https://creativecommons.org/licenses/by/3.0/">
                CC BY 3.0
              </a>
            </p>
          )}
          {playbackFailed && <p role="alert">{cli.playbackError}</p>}
        </section>
      )}
      {reference && (
        <nav aria-label={lesson.heading}>
          <ol>
            {referenceLessons[reference].sections.map((section) => (
              <li key={section.id}>
                <a href={`#/${step}/reference/${section.id}`}>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <section aria-labelledby="cli-instructions">
        <h2 id="cli-instructions">{lesson.heading}</h2>
        {lesson.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <ol className="command-lessons">
          {lesson.examples.map((example) => (
            <li key={example.command}>
              <p>{example.note}</p>
              <pre>
                <code>{example.command}</code>
              </pre>
            </li>
          ))}
        </ol>
        <p>{lesson.challenge}</p>
      </section>
      {reference &&
        referenceLessons[reference].sections.map((section) => (
          <section id={`section-${section.id}`} key={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ol className="command-lessons">
              {section.examples.map((example, i) => (
                <li key={i}>
                  <p>{example.note}</p>
                  <pre>
                    <code>{example.command}</code>
                  </pre>
                </li>
              ))}
            </ol>
          </section>
        ))}
      <EncoderOffline />
      {lesson.next && (
        <a className="button" href={`#/${lesson.next}`}>
          {cli.next} {lessons[lesson.next].title}
        </a>
      )}
    </article>
  );
}
