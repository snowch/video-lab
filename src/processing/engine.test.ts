// Copyright © 2026 Christopher Snow
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  cancelProcessing,
  durationEvidence,
  inspectMedia,
  measuredDuration,
  runJob,
  runTool,
} from "./engine";
const mock = vi.hoisted(() => ({
  probeCode: -1,
  probe: JSON.stringify({
    streams: [{ index: 0, codec_name: "h264", codec_type: "video" }],
    format: { format_name: "mov,mp4,m4a,3gp,3g2,mj2" },
  }),
  execCode: 0,
  terminated: 0,
  instances: 0,
  holdLoad: false,
}));
vi.mock("@ffmpeg/ffmpeg", () => ({
  FFmpeg: class {
    files = new Map<string, Uint8Array | string>();
    rejectLoad?: (reason: Error) => void;
    constructor() {
      mock.instances++;
    }
    on() {}
    async load() {
      if (mock.holdLoad)
        await new Promise((_, reject) => {
          this.rejectLoad = reject;
        });
    }
    async writeFile(name: string, bytes: Uint8Array) {
      this.files.set(name, bytes);
    }
    async exec(args: string[]) {
      this.files.set(args.at(-1)!, new Uint8Array([1, 2, 3]));
      return mock.execCode;
    }
    async ffprobe(args: string[]) {
      this.files.set(args[args.indexOf("-o") + 1]!, mock.probe);
      return mock.probeCode;
    }
    async readFile(name: string) {
      return this.files.get(name);
    }
    terminate() {
      mock.terminated++;
      this.rejectLoad?.(new Error("terminated"));
    }
  },
}));
const job = () => ({
  inputs: [{ name: "input.jpg", data: new Uint8Array([1, 2, 3]) }],
  args: ["-i", "input.jpg", "output.mp4"],
  output: "output.mp4",
});
beforeEach(() => {
  mock.probeCode = -1;
  mock.execCode = 0;
  mock.terminated = 0;
  mock.instances = 0;
  mock.holdLoad = false;
  mock.probe = JSON.stringify({
    streams: [{ index: 0, codec_name: "h264", codec_type: "video" }],
    format: { format_name: "mov,mp4,m4a,3gp,3g2,mj2" },
  });
  vi.stubGlobal("location", { href: "https://example.test/video-lab/" });
});
afterEach(() => {
  cancelProcessing();
  vi.unstubAllGlobals();
});
it("requires encoder exit success even when bytes were written", async () => {
  mock.execCode = 1;
  await expect(runJob(job())).rejects.toThrow("could not produce");
  expect(mock.terminated).toBe(1);
});
it("accepts pinned ffprobe sentinel only with complete valid measured metadata", async () => {
  const result = await runJob(job());
  expect(result.bytes).toEqual(new Uint8Array([1, 2, 3]));
  expect(result.probe.streams[0]?.codec_name).toBe("h264");
  expect(mock.terminated).toBe(1);
});
it.each([
  "{broken",
  JSON.stringify({ streams: [], format: { format_name: "mp4" } }),
  JSON.stringify({
    streams: [{ index: 0, codec_type: "video", codec_name: "h264" }],
    format: { format_name: "mp4" },
    error: { code: -1 },
  }),
])("rejects corrupt, empty or failed probe reports: %s", async (report) => {
  mock.probe = report;
  await expect(runJob(job())).rejects.toThrow();
  expect(mock.terminated).toBe(1);
});
it("rejects a reported ffprobe process failure even with plausible metadata", async () => {
  mock.probeCode = 1;
  await expect(runJob(job())).rejects.toThrow("inspection failed");
});
it("cancels before reading a blob has completed and permits a clean retry", async () => {
  let release!: (value: ArrayBuffer) => void;
  const blob = {
    size: 3,
    arrayBuffer: () =>
      new Promise<ArrayBuffer>((resolve) => {
        release = resolve;
      }),
  } as Blob;
  const pending = inspectMedia(blob);
  cancelProcessing();
  release(new ArrayBuffer(3));
  await expect(pending).rejects.toMatchObject({ name: "AbortError" });
  expect(mock.instances).toBe(0);
  await expect(runJob(job())).resolves.toHaveProperty("probe");
});
it("allows one operation at a time and terminates a loading worker on cancel", async () => {
  mock.holdLoad = true;
  const pending = runJob(job());
  await vi.waitFor(() => expect(mock.instances).toBe(1));
  await expect(runJob(job())).rejects.toThrow("current media operation");
  cancelProcessing();
  await expect(pending).rejects.toMatchObject({ name: "AbortError" });
  mock.holdLoad = false;
  await expect(runJob(job())).resolves.toHaveProperty("probe");
});

it("keeps a measured container duration ahead of packet-derived timing", () => {
  const probe = JSON.parse(mock.probe);
  probe.format.duration = "3.000000";
  probe.packets = [
    { stream_index: 0, pts_time: "0.1" },
    { stream_index: 0, pts_time: "2.1" },
  ];
  expect(durationEvidence(probe)).toEqual({ seconds: 3, basis: "container" });
});
it("reports the observed video packet end when a streaming container omits duration", () => {
  const probe = JSON.parse(mock.probe);
  probe.packets = [
    { stream_index: 0, pts_time: "0.05", duration_time: "0.1" },
    { stream_index: 1, pts_time: "12.0", duration_time: "0.1" },
    { stream_index: 0, pts_time: "0.25", duration_time: "0.1" },
  ];
  expect(durationEvidence(probe)).toEqual({
    seconds: 0.3,
    basis: "packet-end",
  });
});
it("does not invent the unknown final picture hold in a streaming recording", () => {
  const probe = JSON.parse(mock.probe);
  probe.packets = [
    { stream_index: 0, pts_time: "0.083" },
    { stream_index: 0, pts_time: "0.416" },
  ];
  expect(durationEvidence(probe)?.basis).toBe("packet-span");
  expect(durationEvidence(probe)?.seconds).toBeCloseTo(0.333);
  expect(measuredDuration(probe)).toBeCloseTo(0.333);
});
it("leaves missing timing unavailable", () => {
  expect(durationEvidence(JSON.parse(mock.probe))).toBeUndefined();
});

it("fails promptly offline without saved tools, then permits a connected retry", async () => {
  vi.stubGlobal("navigator", { onLine: false });
  vi.stubGlobal("caches", { match: vi.fn().mockResolvedValue(undefined) });
  await expect(runJob(job())).rejects.toThrow("Download for offline use");
  expect(mock.instances).toBe(0);
  vi.stubGlobal("navigator", { onLine: true });
  await expect(runJob(job())).resolves.toHaveProperty("bytes");
});

it("runs learner arguments without a source preset and retains the probe sentinel as evidence", async () => {
  const result = await runTool({
    tool: "ffprobe",
    inputs: job().inputs,
    args: ["-show_streams", "-of", "json", "input.jpg"],
  });
  expect(result.code).toBe(-1);
  expect(JSON.parse(result.text!).streams[0].codec_name).toBe("h264");
});
it.each(["{}", "{broken", JSON.stringify({ error: { code: -1 } })])(
  "rejects an empty, corrupt or failed CLI probe report: %s",
  async (report) => {
    mock.probe = report;
    await expect(
      runTool({
        tool: "ffprobe",
        inputs: job().inputs,
        args: ["-of", "json", "input.jpg"],
      }),
    ).rejects.toThrow();
  },
);
it("allows FFmpeg version/help with an empty workspace but rejects nonzero execution", async () => {
  await expect(
    runTool({ tool: "ffmpeg", inputs: [], args: ["-version"] }),
  ).resolves.toEqual({ code: 0 });
  mock.execCode = 1;
  await expect(
    runTool({
      tool: "ffmpeg",
      inputs: job().inputs,
      args: job().args,
      output: "output.mp4",
    }),
  ).rejects.toThrow("status 1");
});

it("saves an actual ffprobe report under the learner's -o destination", async () => {
  const report = await runTool({
    tool: "ffprobe",
    inputs: job().inputs,
    args: ["-show_streams", "-of", "json", "input.jpg", "-o", "report.json"],
    output: "report.json",
  });
  expect(JSON.parse(report.text!).streams[0].codec_name).toBe("h264");
});
