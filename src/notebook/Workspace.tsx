// Copyright © 2026 Christopher Snow
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useProject } from "../journey/project";
import { disk, mimeFor } from "../cli/files";
import { parseCommand, toolPlan } from "../cli/command";
import {
  runTool,
  cancelProcessing,
  inspectMedia,
  type Probe,
} from "../processing/engine";
import { useRestartGuard } from "../app-status/safety";
import { readWorkspace, writeCell, writeFiles } from "./database";
import {
  checkNotebookFiles,
  hashBlob,
  movedFiles,
  audioSampleRateMatches,
  type NotebookFile,
  type CellRecord,
  type RunRecord,
} from "./model";
import { referencedInputs } from "./inputs";
import { practiceAssets } from "./assets";
import type { Expectation } from "./structure";
import { n } from "./ui.strings";
type FileMap = Record<string, NotebookFile>;
export function downloadBlob(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name.split("/").at(-1)!;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
export function mediaMime(name: string) {
  const base = mimeFor(name);
  return base !== "application/octet-stream"
    ? base
    : /\.(txt|md|srt|csv|sh)$/i.test(name)
      ? "text/plain"
      : name.endsWith(".mkv")
        ? "video/x-matroska"
        : name.endsWith(".mov")
          ? "video/quicktime"
          : name.endsWith(".flac")
            ? "audio/flac"
            : name.endsWith(".opus")
              ? "audio/ogg"
              : base;
}
const sessionKey = (id: string) => "video-lab:notebook:cell:" + id;
type Workspace = {
  files: FileMap;
  folders: string[];
  cells: Record<string, CellRecord>;
  ready: boolean;
  busy: boolean;
  preparingPractice: boolean;
  saving: boolean;
  sessionOnly: boolean;
  notice: string;
  active?: { id: string; command: string };
  liveLog: string;
  edit: (id: string, patch: Partial<CellRecord>) => void;
  run: (id: string, command: string) => Promise<void>;
  cancel: () => void;
  load: (
    names: string[],
    options?: { signal?: AbortSignal; quiet?: boolean },
  ) => Promise<void>;
  add: (files: NotebookFile[]) => Promise<void>;
  move: (from: string, to: string) => Promise<void>;
  copy: (from: string, to: string) => Promise<void>;
  remove: (path: string) => Promise<void>;
  folder: (name: string) => Promise<void>;
  writeText: (
    name: string,
    text: string,
    createOnly?: boolean,
  ) => Promise<void>;
  check: (record: CellRecord, expected: Expectation) => Promise<string[]>;
};
function sessionCells() {
  const cells: Record<string, CellRecord> = {};
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith("video-lab:notebook:cell:")) {
        const value = JSON.parse(sessionStorage.getItem(key)!);
        if (
          value &&
          typeof value.id === "string" &&
          typeof value.command === "string"
        )
          cells[value.id] = value;
      }
    }
  } catch {}
  return cells;
}
const Context = createContext<Workspace | null>(null);
export function NotebookWorkspace({ children }: { children: ReactNode }) {
  const project = useProject();
  const [files, setFiles] = useState<FileMap>({}),
    filesRef = useRef<FileMap>({});
  const [folders, setFolders] = useState<string[]>([]),
    foldersRef = useRef<string[]>([]);
  const restored = useRef(sessionCells());
  const [cells, setCells] = useState<Record<string, CellRecord>>(
      restored.current,
    ),
    cellsRef = useRef<Record<string, CellRecord>>(restored.current);
  const [ready, setReady] = useState(false),
    [active, setActive] = useState<{ id: string; command: string }>(),
    [operating, setOperating] = useState(false),
    [quietOperation, setQuietOperation] = useState(false),
    [saving, setSaving] = useState(false),
    [sessionOnly, setSessionOnly] = useState(false),
    [notice, setNotice] = useState(""),
    [liveLog, setLiveLog] = useState("");
  const live = useRef(true),
    locked = useRef(false),
    cancelled = useRef(false),
    pending = useRef(0),
    storageUnavailable = useRef(false),
    fallbackCells = useRef(new Set<string>()),
    unsafeCells = useRef(new Set<string>()),
    nonDurable = useRef(new Set<string>()),
    queue = useRef(Promise.resolve()),
    channel = useRef<BroadcastChannel | null>(null);
  function durableState() {
    if (live.current)
      setSessionOnly(
        storageUnavailable.current ||
          nonDurable.current.size > 0 ||
          unsafeCells.current.size > 0 ||
          fallbackCells.current.size > 0,
      );
  }
  useRestartGuard(
    () =>
      ready &&
      !locked.current &&
      pending.current === 0 &&
      nonDurable.current.size === 0 &&
      unsafeCells.current.size === 0,
  );
  function updateFiles(next: FileMap) {
    filesRef.current = next;
    if (live.current) setFiles(next);
  }
  function updateFolders(next: string[]) {
    foldersRef.current = next;
    if (live.current) setFolders(next);
  }
  function edit(id: string, patch: Partial<CellRecord>) {
    const value = {
      command: "",
      ...cellsRef.current[id],
      id,
      ...patch,
    } as CellRecord;
    cellsRef.current = { ...cellsRef.current, [id]: value };
    if (live.current) setCells(cellsRef.current);
    let sessionSafe = false;
    try {
      sessionStorage.setItem(sessionKey(id), JSON.stringify(value));
      sessionSafe = true;
    } catch {
      unsafeCells.current.add(id);
    }
    pending.current++;
    if (live.current) setSaving(true);
    queue.current = queue.current.then(async () => {
      try {
        await writeCell(value);
        unsafeCells.current.delete(id);
        fallbackCells.current.delete(id);
      } catch {
        fallbackCells.current.add(id);
        if (!sessionSafe) unsafeCells.current.add(id);
      } finally {
        pending.current--;
        durableState();
        if (live.current) setSaving(pending.current > 0);
      }
    });
  }
  async function refresh() {
    if (locked.current) return;
    try {
      const data = await readWorkspace();
      const next = Object.fromEntries(data.files.map((f) => [f.name, f]));
      for (const name of nonDurable.current)
        if (filesRef.current[name]) next[name] = filesRef.current[name];
      updateFiles(next);
      updateFolders(
        (data.meta.find((m) => m.key === "folders")?.value as
          string[] | undefined) ?? [],
      );
    } catch {
      /* Current in-memory work remains available. */
    }
  }
  useEffect(() => {
    live.current = true;
    const c =
      typeof BroadcastChannel === "undefined"
        ? null
        : new BroadcastChannel("video-lab:notebook");
    channel.current = c;
    if (c) c.onmessage = () => void refresh();
    const focus = () => void refresh();
    addEventListener("focus", focus);
    const unload = (e: BeforeUnloadEvent) => {
      if (
        locked.current ||
        pending.current ||
        nonDurable.current.size ||
        unsafeCells.current.size ||
        fallbackCells.current.size
      ) {
        e.preventDefault();
      }
    };
    addEventListener("beforeunload", unload);
    return () => {
      live.current = false;
      cancelled.current = true;
      cancelProcessing();
      c?.close();
      removeEventListener("focus", focus);
      removeEventListener("beforeunload", unload);
    };
  }, []);
  useEffect(() => {
    if (!project.ready) return;
    let stop = false;
    void (async () => {
      try {
        const data = await readWorkspace();
        let next = Object.fromEntries(data.files.map((f) => [f.name, f]));
        const oldCells = Object.fromEntries(data.cells.map((c) => [c.id, c]));
        try {
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key?.startsWith("video-lab:notebook:cell:")) {
              const value = JSON.parse(sessionStorage.getItem(key)!);
              if (
                value &&
                typeof value.id === "string" &&
                typeof value.command === "string"
              )
                oldCells[value.id] = value;
            }
          }
        } catch {
          /* DB copies remain intact. */
        }
        if (!data.meta.some((m) => m.key === "migrated")) {
          const earlier: NotebookFile[] = await disk<NotebookFile[]>(
            "readonly",
            (s) => s.getAll(),
          ).catch((): NotebookFile[] => []);
          for (const record of Object.values(project.records)) {
            const name =
              record.id === "capture"
                ? `capture.${record.blob.type.includes("webm") ? "webm" : "mp4"}`
                : record.name;
            if (!earlier.some((f) => f.name === name))
              earlier.push({
                name,
                blob: record.blob,
                origin:
                  record.origin === "capture" ? "captured" : record.origin,
                command: record.command?.join(" "),
              });
          }
          const additions = earlier.filter((f) => !next[f.name]);
          next = {
            ...Object.fromEntries(additions.map((f) => [f.name, f])),
            ...next,
          };
          checkNotebookFiles(next);
          await writeFiles(
            additions,
            [],
            [{ key: "migrated", value: true }],
            false,
          );
          if (additions.length && live.current)
            setNotice(
              `${additions.length} saved files copied from earlier lessons. Their originals remain available.`,
            );
        }
        if (stop) return;
        updateFiles(next);
        updateFolders(
          (data.meta.find((m) => m.key === "folders")?.value as
            string[] | undefined) ?? [],
        );
        cellsRef.current = { ...oldCells, ...cellsRef.current };
        setCells(cellsRef.current);
      } catch {
        storageUnavailable.current = true;
        durableState();
        if (!stop)
          setNotice(
            "Saved work could not be fully opened or copied. Earlier files have not been removed. Download new files and page records before closing.",
          );
      } finally {
        if (!stop) setReady(true);
      }
    })();
    return () => {
      stop = true;
    };
  }, [project.ready]);
  async function transaction(
    next: FileMap,
    dirs: string[],
    overwrite = true,
    allowSession = false,
    writeFolders = true,
  ) {
    checkNotebookFiles(next, dirs);
    const previous = filesRef.current;
    const removed = Object.keys(previous).filter((name) => !next[name]);
    const additions = Object.values(next).filter((f) => previous[f.name] !== f);
    const stable = await Promise.all(
      additions.map(async (f) => ({
        ...f,
        blob: new Blob([await f.blob.arrayBuffer()], {
          type: f.blob.type || mediaMime(f.name),
        }),
      })),
    );
    try {
      await writeFiles(
        stable,
        removed,
        writeFolders ? [{ key: "folders", value: dirs }] : [],
        overwrite,
      );
      for (const f of stable) nonDurable.current.delete(f.name);
      for (const name of removed) nonDurable.current.delete(name);
    } catch (e) {
      if (
        !allowSession ||
        (e instanceof DOMException && e.name === "ConstraintError")
      )
        throw e;
      for (const f of stable) nonDurable.current.add(f.name);
    }
    const committed = { ...next };
    stable.forEach((f) => (committed[f.name] = f));
    updateFiles(committed);
    updateFolders(dirs);
    durableState();
    channel.current?.postMessage("files");
  }
  async function operation(work: () => Promise<void>, quiet = false) {
    if (!ready) throw new Error("Wait for the workspace to finish opening.");
    if (locked.current)
      throw new Error("Finish or cancel the active operation first.");
    locked.current = true;
    setOperating(true);
    setQuietOperation(quiet);
    try {
      await work();
      if (!quiet) setNotice(n.moved);
    } finally {
      locked.current = false;
      if (live.current) {
        setOperating(false);
        setQuietOperation(false);
      }
    }
  }
  async function freshFiles() {
    try {
      const data = await readWorkspace();
      const next = Object.fromEntries(data.files.map((f) => [f.name, f]));
      for (const name of nonDurable.current)
        if (filesRef.current[name]) next[name] = filesRef.current[name];
      updateFiles(next);
      updateFolders(
        (data.meta.find((m) => m.key === "folders")?.value as
          string[] | undefined) ?? [],
      );
    } catch {
      /* Session-only work remains usable. */
    }
  }
  async function add(additions: NotebookFile[]) {
    await operation(async () => {
      await freshFiles();
      const next = { ...filesRef.current };
      for (const f of additions) {
        if (next[f.name])
          throw new Error(
            `A file named ${f.name} already exists. Rename it or choose another destination.`,
          );
        next[f.name] = f;
      }
      await transaction(next, foldersRef.current, false, true);
    });
  }
  async function load(
    names: string[],
    options: { signal?: AbortSignal; quiet?: boolean } = {},
  ) {
    await operation(async () => {
      options.signal?.throwIfAborted();
      await freshFiles();
      const next = { ...filesRef.current };
      const additions: NotebookFile[] = [];
      for (const name of [...new Set(names)]) {
        if (next[name]) continue;
        const asset = practiceAssets[name];
        if (!asset) throw new Error("That practice file is unavailable.");
        const controller = new AbortController();
        const abort = () => controller.abort();
        options.signal?.addEventListener("abort", abort, { once: true });
        let timedOut = false;
        const timer = setTimeout(() => {
          timedOut = true;
          controller.abort();
        }, 30000);
        let blob: Blob;
        try {
          options.signal?.throwIfAborted();
          const r = await fetch(
            new URL(import.meta.env.BASE_URL + asset.path, location.href),
            { signal: controller.signal },
          );
          if (!r.ok) throw new Error(n.sourceLoadFailed);
          blob = new Blob([await r.arrayBuffer()], { type: mediaMime(name) });
        } catch {
          options.signal?.throwIfAborted();
          throw new Error(timedOut ? n.sourceTimeout : n.sourceLoadFailed);
        } finally {
          clearTimeout(timer);
          options.signal?.removeEventListener("abort", abort);
        }
        if (
          blob.size !== asset.bytes ||
          (await hashBlob(blob)) !== asset.sha256
        )
          throw new Error(n.sourceMismatch);
        const f = { name, blob, origin: "provided" as const };
        next[name] = f;
        additions.push(f);
      }
      // Re-read after downloading: another tab may have added these names.
      // Never replace them or write a stale folder list during preparation.
      for (let attempt = 0; attempt < 3; attempt++) {
        options.signal?.throwIfAborted();
        await freshFiles();
        options.signal?.throwIfAborted();
        const current = { ...filesRef.current };
        const missing = additions.filter((file) => !current[file.name]);
        if (!missing.length) return;
        for (const file of missing) current[file.name] = file;
        try {
          await transaction(current, foldersRef.current, false, true, false);
          return;
        } catch (e) {
          if (
            !(e instanceof DOMException && e.name === "ConstraintError") ||
            attempt === 2
          )
            throw e;
        }
      }
    }, options.quiet);
  }
  async function move(from: string, to: string) {
    await operation(async () => {
      await freshFiles();
      const next = movedFiles(filesRef.current, from, to, foldersRef.current);
      await transaction(next.files, next.folders);
    });
  }
  async function copy(from: string, to: string) {
    await operation(async () => {
      await freshFiles();
      const file = filesRef.current[from];
      if (!file) throw new Error("Choose an existing file.");
      if (filesRef.current[to] || foldersRef.current.includes(to))
        throw new Error("The destination already exists.");
      await transaction(
        { ...filesRef.current, [to]: { ...file, name: to } },
        foldersRef.current,
        false,
      );
    });
  }
  async function remove(path: string) {
    await operation(async () => {
      await freshFiles();
      const next = Object.fromEntries(
        Object.entries(filesRef.current).filter(
          ([name]) => name !== path && !name.startsWith(path + "/"),
        ),
      );
      await transaction(
        next,
        foldersRef.current.filter(
          (name) => name !== path && !name.startsWith(path + "/"),
        ),
      );
    });
  }
  async function folder(name: string) {
    await operation(async () => {
      await freshFiles();
      if (foldersRef.current.includes(name) || filesRef.current[name])
        throw new Error("The destination already exists.");
      await transaction(filesRef.current, [...foldersRef.current, name]);
    });
  }
  async function writeText(name: string, text: string, createOnly = false) {
    await operation(async () => {
      await freshFiles();
      const f = filesRef.current[name];
      if (createOnly && f)
        throw new Error(
          "The destination already exists. Nothing was replaced.",
        );
      await transaction(
        {
          ...filesRef.current,
          [name]: {
            name,
            blob: new Blob([text], { type: "text/plain" }),
            origin: "note",
          },
        },
        foldersRef.current,
        !f ? false : true,
        false,
      );
    });
  }
  async function run(id: string, command: string) {
    if (locked.current) return;
    locked.current = true;
    cancelled.current = false;
    setActive({ id, command });
    edit(id, { command });
    setLiveLog("");
    let log: string[] = [];
    let timer: ReturnType<typeof setTimeout> | undefined;
    const record: RunRecord = {
      runtime: "exit-adapter-v1",
      command,
      log: "",
      inputs: [],
      at: new Date().toISOString(),
    };
    const raw = (line: string) => {
      log.push(...line.split("\n"));
      if (log.length > 1000) {
        record.truncated = true;
        log = log.slice(-1000);
      }
      if (!timer)
        timer = setTimeout(() => {
          timer = undefined;
          if (live.current) setLiveLog(log.join("\n"));
        }, 80);
    };
    try {
      const plan = toolPlan(parseCommand(command), true);
      await freshFiles();
      const output = "output" in plan ? plan.output : undefined;
      if (output && filesRef.current[output] && !plan.args.includes("-y"))
        throw new Error(n.overwrite);
      const inputs = referencedInputs(
        plan.args,
        filesRef.current,
        output,
        plan.tool,
      );
      record.inputs = await Promise.all(
        inputs.map(async (f) => ({
          name: f.name,
          sha256: await hashBlob(f.blob),
        })),
      );
      const result = await runTool(
        {
          tool: plan.tool,
          args: plan.args,
          output,
          inputs: await Promise.all(
            inputs.map(async (f) => ({
              name: f.name,
              data: new Uint8Array(await f.blob.arrayBuffer()),
            })),
          ),
        },
        raw,
      );
      record.code = result.code;
      if (cancelled.current) throw new DOMException("Cancelled", "AbortError");
      if (result.text) raw(result.text);
      if (output) {
        const data = result.bytes
          ? new Blob([result.bytes], { type: mediaMime(output) })
          : result.text
            ? new Blob([result.text], { type: "application/json" })
            : undefined;
        if (!data)
          throw new Error(
            "No output file was produced. Read the command output and check the output path before retrying.",
          );
        const file: NotebookFile = {
          name: output,
          blob: data,
          origin: plan.tool === "ffprobe" ? "report" : "generated",
          command,
          evidence: { tool: plan.tool, args: plan.args, inputs: record.inputs },
        };
        await freshFiles();
        await transaction(
          { ...filesRef.current, [output]: file },
          foldersRef.current,
          plan.args.includes("-y"),
          true,
        );
        record.output = output;
        record.outputHash = await hashBlob(data);
      }
      setNotice(n.done);
    } catch (e) {
      record.error = cancelled.current
        ? n.cancelled
        : e instanceof Error
          ? e.message
          : String(e);
      if (live.current) setNotice(cancelled.current ? n.cancelled : n.failed);
    } finally {
      clearTimeout(timer);
      record.log = log.join("\n");
      edit(id, {
        command: cellsRef.current[id]?.command ?? command,
        last: record,
      });
      locked.current = false;
      if (live.current) {
        setActive(undefined);
        setLiveLog("");
      }
      channel.current?.postMessage("files");
    }
  }
  function cancel() {
    cancelled.current = true;
    cancelProcessing();
  }
  async function check(cell: CellRecord, expected: Expectation) {
    if (locked.current) throw new Error("Finish or cancel processing first.");
    const last = cell.last;
    if (!last || last.error || last.command !== cell.command)
      throw new Error("Run this command successfully before checking.");
    await freshFiles();
    for (const input of last.inputs)
      if (
        !filesRef.current[input.name] ||
        (await hashBlob(filesRef.current[input.name]!.blob)) !== input.sha256
      )
        throw new Error("An input changed. Run this cell again.");
    if (expected.probe) {
      if (parseCommand(last.command)[0] !== "ffprobe" || !last.inputs.length)
        throw new Error("Run ffprobe on a workspace file first.");
      return [
        "An actual ffprobe inspection of the unchanged input is recorded.",
      ];
    }
    if (expected.decode) {
      if (
        parseCommand(last.command)[0] !== "ffmpeg" ||
        !last.command.includes("null") ||
        !last.inputs.length
      )
        throw new Error("Run the decoding command first.");
      return [
        "The recorded FFmpeg command completed without an execution error. Review the log to confirm the intended streams and full duration.",
      ];
    }
    const file = last.output ? filesRef.current[last.output] : undefined;
    if (!file || (await hashBlob(file.blob)) !== last.outputHash)
      throw new Error(
        "The output changed or was removed. Run this cell again.",
      );
    locked.current = true;
    setOperating(true);
    try {
      const probe = await inspectMedia(file.blob);
      const video = probe.streams.find((s) => s.codec_type === "video"),
        audio = probe.streams.some((s) => s.codec_type === "audio");
      const checks: string[] = [];
      const test = (good: boolean, label: string) => {
        checks.push(`${good ? "✓" : "✗"} ${label}`);
      };
      if (expected.duration !== undefined)
        test(
          Math.abs(Number(probe.format.duration) - expected.duration) < 0.16,
          `Duration close to ${expected.duration} seconds (actual ${probe.format.duration ?? "unavailable"})`,
        );
      if (expected.width !== undefined)
        test(
          video?.width === expected.width,
          `Width ${expected.width} pixels (actual ${video?.width ?? "no video"})`,
        );
      if (expected.height !== undefined)
        test(
          video?.height === expected.height,
          `Height ${expected.height} pixels (actual ${video?.height ?? "no video"})`,
        );
      if (expected.audio !== undefined)
        test(
          audio === expected.audio,
          expected.audio ? "Contains an audio stream" : "Has no audio stream",
        );
      if (expected.video !== undefined)
        test(
          Boolean(video) === expected.video,
          expected.video ? "Contains video" : "Has no video stream",
        );
      if (expected.codec)
        test(
          video?.codec_name === expected.codec,
          `Video codec ${expected.codec}`,
        );
      if (expected.format)
        test(
          probe.format.format_name.split(",").includes(expected.format),
          `Container includes ${expected.format}`,
        );
      if (expected.rate !== undefined) {
        const [a, b] = String(video?.avg_frame_rate).split("/").map(Number);
        test(
          Boolean(a && b && Math.abs(a / b - expected.rate) < 0.01),
          `Average rate ${expected.rate} frames per second`,
        );
      }
      if (expected.sampleRate !== undefined)
        test(
          audioSampleRateMatches(probe.streams, expected.sampleRate),
          `Audio sample rate: expected ${expected.sampleRate} Hz per channel; found ${
            probe.streams
              .filter((stream) => stream.codec_type === "audio")
              .map((stream) => stream.sample_rate ?? "sample rate unavailable")
              .join(", ") || "no audio"
          }`,
        );
      return checks;
    } finally {
      locked.current = false;
      setOperating(false);
    }
  }
  return (
    <Context.Provider
      value={{
        files,
        folders,
        cells,
        ready,
        busy: !ready || Boolean(active) || operating,
        preparingPractice: operating && quietOperation,
        saving,
        sessionOnly,
        notice,
        active,
        liveLog,
        edit,
        run,
        cancel,
        load,
        add,
        move,
        copy,
        remove,
        folder,
        writeText,
        check,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useNotebook() {
  const w = useContext(Context);
  if (!w) throw new Error("Notebook workspace is unavailable.");
  return w;
}
