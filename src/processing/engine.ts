// Copyright © 2026 Christopher Snow
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { validPath } from "../notebook/model";
import { encoderBaseUrl, limits } from "./config";

/** Fields come from ffprobe JSON for the bytes supplied to the worker. */
export interface Probe {
  packets?: Array<{
    stream_index: number;
    pts_time?: string;
    dts_time?: string;
    duration_time?: string;
  }>;
  streams: Array<{
    index: number;
    codec_name: string;
    codec_type: string;
    width?: number;
    height?: number;
    sample_rate?: string;
    channels?: number;
    channel_layout?: string;
    r_frame_rate?: string;
    avg_frame_rate?: string;
    time_base?: string;
    start_time?: string;
    duration?: string;
    nb_frames?: string;
    [key: string]: unknown;
  }>;
  format: {
    format_name: string;
    format_long_name?: string;
    duration?: string;
    start_time?: string;
    size?: string;
    bit_rate?: string;
    [key: string]: unknown;
  };
}
export interface MediaJob {
  inputs: Array<{ name: string; data: Uint8Array }>;
  args: string[];
  output: string;
}
export interface MediaResult {
  bytes: Uint8Array<ArrayBuffer>;
  probe: Probe;
  command: string[];
  logs: string[];
}
type ActiveJob = {
  engine?: FFmpeg;
  cancelled: boolean;
  interrupt?: () => void;
};
let active: ActiveJob | undefined;

function filename(name: string) {
  if (!validPath(name))
    throw new Error(
      "Use a valid relative media path without parent directories.",
    );
}
async function makeDirectories(engine: FFmpeg, name: string) {
  const parts = name.split("/").slice(0, -1);
  let parent = ".";
  for (const part of parts) {
    const path = parent === "." ? part : `${parent}/${part}`;
    const entries = await engine.listDir(parent);
    const existing = entries.find((entry) => entry.name === part);
    if (existing && !existing.isDir)
      throw new Error("A file blocks the requested folder.");
    if (!existing) await engine.createDir(path);
    parent = path;
  }
}
function validateInputs(inputs: MediaJob["inputs"]) {
  if (!inputs.length || inputs.length > limits.inputFiles)
    throw new Error("This exercise needs between one and twelve input files.");
  const names = new Set<string>();
  let size = 0;
  for (const input of inputs) {
    filename(input.name);
    if (names.has(input.name))
      throw new Error("Input filenames must be unique.");
    names.add(input.name);
    size += input.data.byteLength;
  }
  if (size > limits.inputBytes)
    throw new Error(
      "The input exceeds this exercise's 32 MiB processing limit.",
    );
  if (!size) throw new Error("The input file is empty.");
}
function parseProbe(value: string): Probe {
  const probe = JSON.parse(value) as Probe & { error?: unknown };
  if (
    probe.error ||
    !Array.isArray(probe.streams) ||
    !probe.streams.length ||
    !probe.format ||
    typeof probe.format.format_name !== "string" ||
    probe.streams.some(
      (stream) =>
        typeof stream.index !== "number" ||
        typeof stream.codec_type !== "string" ||
        typeof stream.codec_name !== "string",
    )
  )
    throw new Error("The media inspection did not return readable streams.");
  return probe;
}
async function probeFile(engine: FFmpeg, input: string) {
  const code = await engine.ffprobe(
    [
      "-v",
      "error",
      "-show_error",
      "-show_streams",
      "-show_format",
      "-show_packets",
      "-show_entries",
      "stream:format:packet=stream_index,pts_time,dts_time,duration_time:error",
      "-of",
      "json",
      input,
      "-o",
      "inspection.json",
    ],
    limits.timeoutMs,
  );
  // Core 0.12.10 ignores ffprobe's C return value, leaving ret at -1.
  // Accept that documented sentinel only with complete, valid JSON below.
  // Encoding itself always requires a real zero exit status.
  if (code !== 0 && code !== -1)
    throw new Error("The media inspection failed.");
  const data = await engine.readFile("inspection.json", "utf8");
  if (typeof data !== "string")
    throw new Error("The inspection returned no JSON.");
  return parseProbe(data);
}
async function withEngine<T>(
  inputs: MediaJob["inputs"] | (() => Promise<MediaJob["inputs"]>),
  operation: (engine: FFmpeg, logs: string[]) => Promise<T>,
  onLog?: (text: string) => void,
  allowEmpty = false,
): Promise<T> {
  if (typeof inputs !== "function" && (!allowEmpty || inputs.length))
    validateInputs(inputs);
  if (active)
    throw new Error("Wait for the current media operation, or cancel it.");
  const job: ActiveJob = { cancelled: false };
  active = job;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let timedOut = false;
  const logs: string[] = [];
  const deadline = new Promise<never>((_, reject) => {
    job.interrupt = () =>
      reject(new DOMException("Media operation cancelled.", "AbortError"));
    timer = setTimeout(() => {
      timedOut = true;
      job.engine?.terminate();
      reject(new Error("Processing took too long. Try a shorter recording."));
    }, limits.timeoutMs);
  });
  try {
    const files =
      typeof inputs === "function"
        ? await Promise.race([inputs(), deadline])
        : inputs;
    if (job.cancelled)
      throw new DOMException("Media operation cancelled.", "AbortError");
    if (!allowEmpty || files.length) validateInputs(files);
    // A failed module-worker import can hang in Firefox when offline. Check
    // the deliberately saved binary cache before creating that worker.
    if (navigator.onLine === false) {
      const coreUrls = [
        "ffmpeg-adapter.js",
        "ffmpeg-core.js",
        "ffmpeg-core.wasm",
      ].map((name) => new URL(`${encoderBaseUrl}${name}`, location.href).href);
      if (
        !("caches" in globalThis) ||
        !(await Promise.all(coreUrls.map((url) => caches.match(url)))).every(
          Boolean,
        )
      )
        throw new Error(
          "Connect to the internet and use Download for offline use before processing offline.",
        );
    }
    // Network emulation and some browsers can leave navigator.onLine stale.
    // Check availability before an offline module-worker import can hang.
    if (typeof window !== "undefined") {
      const coreURL = new URL(
        `${encoderBaseUrl}ffmpeg-adapter.js`,
        location.href,
      ).href;
      const cached =
        "caches" in globalThis
          ? await Promise.race([caches.match(coreURL), deadline])
          : undefined;
      if (!cached) {
        try {
          const response = await Promise.race([
            fetch(coreURL, {
              cache: "no-store",
              signal: AbortSignal.timeout(10000),
            }),
            deadline,
          ]);
          if (!response.ok) throw new Error("Tools unavailable");
        } catch {
          if (job.cancelled)
            throw new DOMException("Media operation cancelled.", "AbortError");
          throw new Error(
            "Processing tools are unavailable. Connect to the internet and use Download for offline use before processing offline.",
          );
        }
      }
    }
    // Neither the wrapper nor the core is requested by reading the course.
    const { FFmpeg } = await Promise.race([import("@ffmpeg/ffmpeg"), deadline]);
    if (job.cancelled)
      throw new DOMException("Media operation cancelled.", "AbortError");
    const engine = new FFmpeg();
    job.engine = engine;
    engine.on("log", ({ message }) => {
      logs.push(message);
      if (logs.length > 200) logs.shift();
      onLog?.(message);
    });
    await Promise.race([
      engine.load({
        coreURL: new URL(`${encoderBaseUrl}ffmpeg-adapter.js`, location.href)
          .href,
        wasmURL: new URL(`${encoderBaseUrl}ffmpeg-core.wasm`, location.href)
          .href,
      }),
      deadline,
    ]);
    for (const input of files) {
      if (job.cancelled)
        throw new DOMException("Media operation cancelled.", "AbortError");
      await Promise.race([makeDirectories(engine, input.name), deadline]);
      // The wrapper transfers buffers; leave the shared learner artefact intact.
      await Promise.race([
        engine.writeFile(input.name, input.data.slice()),
        deadline,
      ]);
    }
    const result = await Promise.race([operation(engine, logs), deadline]);
    if (job.cancelled)
      throw new DOMException("Media operation cancelled.", "AbortError");
    return result;
  } catch (error) {
    if (job.cancelled)
      throw new DOMException("Media operation cancelled.", "AbortError");
    if (timedOut)
      throw new Error("Processing took too long. Try a shorter recording.");
    if (error instanceof Error) throw error;
    throw new Error(
      typeof error === "string" ? error : "Media processing failed.",
    );
  } finally {
    if (timer) clearTimeout(timer);
    // Destroying the worker also releases its virtual files and WASM memory.
    job.engine?.terminate();
    if (active === job) active = undefined;
  }
}
export async function runJob(
  job: MediaJob,
  onLog?: (text: string) => void,
): Promise<MediaResult> {
  filename(job.output);
  if (job.inputs.some((input) => input.name === job.output))
    throw new Error("Choose an output filename different from the input.");
  if (
    job.output === "inspection.json" ||
    job.inputs.some((i) => i.name === "inspection.json")
  )
    throw new Error("That filename is reserved for media inspection.");
  if (job.args.length > 150 || job.args.some((arg) => arg.length > 3000))
    throw new Error("The media command exceeds this exercise's limits.");
  return withEngine(
    job.inputs,
    async (engine, logs) => {
      const command = [...job.args];
      const code = await engine.exec(command, limits.timeoutMs);
      if (code !== 0)
        throw new Error(
          "FFmpeg could not produce this output. Check the input and try again.",
        );
      const data = await engine.readFile(job.output);
      if (!(data instanceof Uint8Array) || !data.byteLength)
        throw new Error("FFmpeg produced no media bytes.");
      if (data.byteLength > limits.outputBytes)
        throw new Error("The output exceeds this exercise's 20 MiB limit.");
      const bytes = new Uint8Array(data);
      const probe = await probeFile(engine, job.output);
      return { bytes, probe, command, logs: [...logs] };
    },
    onLog,
  );
}
export async function inspectMedia(
  blob: Blob,
  onLog?: (text: string) => void,
): Promise<Probe> {
  if (blob.size > limits.inputBytes)
    throw new Error(
      "The input exceeds this exercise's 32 MiB processing limit.",
    );
  return withEngine(
    async () => [
      { name: "recording.bin", data: new Uint8Array(await blob.arrayBuffer()) },
    ],
    (engine) => probeFile(engine, "recording.bin"),
    onLog,
  );
}
export function cancelProcessing() {
  const job = active;
  if (!job) return;
  job.cancelled = true;
  job.interrupt?.();
  job.engine?.terminate();
  if (active === job) active = undefined;
}

export interface DurationEvidence {
  seconds: number;
  basis: "container" | "packet-end" | "packet-span";
}
/** Keep packet-derived timing separate from the container's actual metadata. */
export function durationEvidence(probe: Probe): DurationEvidence | undefined {
  const duration = Number(probe.format.duration);
  if (Number.isFinite(duration) && duration > 0)
    return { seconds: duration, basis: "container" };
  const video = probe.streams.find((stream) => stream.codec_type === "video");
  if (!video) return undefined;
  const packets = (probe.packets ?? []).filter(
    (packet) =>
      packet.stream_index === video.index &&
      Number.isFinite(Number(packet.pts_time)),
  );
  if (!packets.length) return undefined;
  const first = Math.min(...packets.map((packet) => Number(packet.pts_time)));
  const last = packets.reduce((a, b) =>
    Number(a.pts_time) > Number(b.pts_time) ? a : b,
  );
  const finalDuration = Number(last.duration_time);
  const end =
    Number(last.pts_time) +
    (Number.isFinite(finalDuration) && finalDuration > 0 ? finalDuration : 0);
  const seconds = end - first;
  if (!(seconds > 0)) return undefined;
  return {
    seconds,
    basis:
      Number.isFinite(finalDuration) && finalDuration > 0
        ? "packet-end"
        : "packet-span",
  };
}
export function measuredDuration(probe: Probe): number | undefined {
  return durationEvidence(probe)?.seconds;
}

/** Real CLI execution; the caller owns the persistent browser workspace. */
export async function runTool(
  job: {
    tool: "ffmpeg" | "ffprobe";
    inputs: MediaJob["inputs"];
    args: string[];
    output?: string;
  },
  onLog?: (line: string) => void,
): Promise<{ text?: string; bytes?: Uint8Array<ArrayBuffer>; code: number }> {
  if (job.output) filename(job.output);
  let forwardLogs = true;
  return withEngine(
    job.inputs,
    async (engine) => {
      if (job.output) await makeDirectories(engine, job.output);
      if (job.tool === "ffprobe") {
        const json = job.args.some(
          (arg, i) =>
            ["-of", "-print_format", "-output_format"].includes(arg) &&
            job.args[i + 1] === "json",
        );
        if (!json) {
          const code = await engine.ffprobe(job.args, limits.timeoutMs);
          if (code !== 0 && code !== -1)
            throw new Error(
              `ffprobe exited with status ${code}. See its log above.`,
            );
          if (code === 0) return { code };
          // The pinned wrapper returns -1 for both readable success and missing input.
          // Keep the requested command's genuine output, then independently validate
          // the same arguments with an internal error-report file. Never invent zero.
          forwardLogs = false;
          const validationCode = await engine.ffprobe(
            [
              ...job.args,
              "-v",
              "error",
              "-show_error",
              "-show_format",
              "-of",
              "json",
              "-o",
              "cli-internal-validation.json",
            ],
            limits.timeoutMs,
          );
          if (validationCode !== 0 && validationCode !== -1)
            throw new Error(
              "ffprobe could not inspect that input. See its log above.",
            );
          const validation = await engine.readFile(
            "cli-internal-validation.json",
            "utf8",
          );
          if (typeof validation !== "string")
            throw new Error("ffprobe returned no validation report.");
          const report = JSON.parse(validation) as Record<string, unknown>;
          if (
            !report ||
            typeof report !== "object" ||
            Array.isArray(report) ||
            report.error
          )
            throw new Error(
              "ffprobe could not inspect that input. See its log above.",
            );
          return { code };
        }
        const code = await engine.ffprobe(
          [
            ...job.args,
            "-show_error",
            ...(job.output ? [] : ["-o", "cli-internal-report.json"]),
          ],
          limits.timeoutMs,
        );
        if (code !== 0 && code !== -1)
          throw new Error(
            `ffprobe exited with status ${code}. See its log above.`,
          );
        const text = await engine.readFile(
          job.output ?? "cli-internal-report.json",
          "utf8",
        );
        if (typeof text !== "string")
          throw new Error("ffprobe returned no report.");
        const report = JSON.parse(text) as Record<string, unknown>;
        if (
          !report ||
          typeof report !== "object" ||
          !Object.keys(report).length ||
          report.error
        )
          throw new Error(
            "ffprobe could not inspect that input. See its log above.",
          );
        return { text, code };
      }
      const code = await engine.exec(job.args, limits.timeoutMs);
      if (code !== 0)
        throw new Error(
          `ffmpeg exited with status ${code}. See its log above.`,
        );
      if (!job.output) return { code };
      const bytes = await engine.readFile(job.output);
      if (!(bytes instanceof Uint8Array) || !bytes.byteLength)
        throw new Error("The command produced no output file.");
      if (bytes.byteLength > limits.outputBytes)
        throw new Error("The output exceeds the workspace's 20 MiB limit.");
      return { bytes: new Uint8Array(bytes), code };
    },
    (line) => {
      if (forwardLogs) onLog?.(line);
    },
    true,
  );
}

/** Actual decoded pictures for the command-led edit check. */
export async function inspectEdit(
  output: Blob,
  source: Blob,
  onLog?: (line: string) => void,
) {
  return withEngine(
    async () => [
      {
        name: "submission.mp4",
        data: new Uint8Array(await output.arrayBuffer()),
      },
      {
        name: "reference.mp4",
        data: new Uint8Array(await source.arrayBuffer()),
      },
    ],
    async (engine) => {
      const probe = await probeFile(engine, "submission.mp4");
      const decoded: Uint8Array<ArrayBuffer>[] = [];
      for (const name of ["submission.mp4", "reference.mp4"]) {
        const code = await engine.exec(
          [
            "-i",
            name,
            "-map",
            "0:v:0",
            "-vsync",
            "0",
            "-vf",
            "scale=160:90:flags=area",
            "-pix_fmt",
            "rgb24",
            "-f",
            "rawvideo",
            "pictures.rgb",
          ],
          limits.timeoutMs,
        );
        if (code !== 0)
          throw new Error(
            "The submitted pictures could not be decoded for checking.",
          );
        const data = await engine.readFile("pictures.rgb");
        if (!(data instanceof Uint8Array))
          throw new Error("No decoded pictures were returned.");
        decoded.push(new Uint8Array(data));
      }
      return { probe, output: decoded[0]!, source: decoded[1]! };
    },
    onLog,
  );
}
