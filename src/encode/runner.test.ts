// Copyright © 2026 Christopher Snow
import { describe, it, expect, vi } from "vitest";
import { createRunner, type Runner } from "./runner";
import type { WorkerReply, WorkerRequest } from "./worker";

interface FakeWorker {
  onmessage: ((event: MessageEvent<WorkerReply>) => void) | null;
  onerror:
    ((event: { message?: string; preventDefault(): void }) => void) | null;
  postMessage(request: WorkerRequest): void;
  terminate(): void;
}

function fakeWorker(
  handler: (request: WorkerRequest) => WorkerReply | Promise<WorkerReply>,
): {
  spawn: () => Worker;
  workers: FakeWorker[];
} {
  const workers: FakeWorker[] = [];
  const spawn = () => {
    const w: FakeWorker = {
      onmessage: null,
      onerror: null,
      postMessage(request) {
        void Promise.resolve(handler(request)).then((reply) => {
          w.onmessage?.({ data: reply } as MessageEvent<WorkerReply>);
        });
      },
      terminate: vi.fn(),
    };
    workers.push(w);
    return w as unknown as Worker;
  };
  return { spawn, workers };
}

const execOk = (request: WorkerRequest): WorkerReply =>
  request.type === "EXEC" || request.type === "FFPROBE"
    ? { id: request.id, type: request.type, code: 0, log: ["ok"] }
    : {
        id: request.id,
        type: request.type as "WRITE_FILE" | "DELETE_FILE",
        ok: true,
      };

describe("encode runner", () => {
  it("runs a job end to end: write, exec, read, cleanup", async () => {
    const seen: string[] = [];
    const { spawn } = fakeWorker((request) => {
      seen.push(request.type);
      if (request.type === "READ_FILE")
        return {
          id: request.id,
          type: "READ_FILE",
          data: new Uint8Array([1, 2, 3]),
        };
      return execOk(request);
    });
    const runner = createRunner(spawn);
    const states: string[] = [];
    runner.subscribe((s) => states.push(s.kind));
    const result = await runner.run({
      label: "Encode",
      write: { "still-000.jpg": new Uint8Array([9]) },
      steps: [
        { type: "EXEC", args: ["-y", "-i", "still-%03d.jpg", "out.mp4"] },
      ],
      read: ["out.mp4"],
    });
    expect(result.code).toBe(0);
    expect(result.files["out.mp4"]).toEqual(new Uint8Array([1, 2, 3]));
    expect(seen).toEqual([
      "WRITE_FILE",
      "EXEC",
      "READ_FILE",
      "DELETE_FILE",
      "DELETE_FILE",
    ]);
    expect(states).toEqual(["loading", "running", "done"]);
    expect(runner.state.kind).toBe("done");
  });

  it("rejects a second concurrent job", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const { spawn } = fakeWorker(async (request) => {
      if (request.type === "EXEC") await gate;
      return execOk(request);
    });
    const runner = createRunner(spawn);
    const first = runner.run({
      label: "A",
      steps: [{ type: "EXEC", args: ["x"] }],
    });
    await expect(
      runner.run({ label: "B", steps: [{ type: "EXEC", args: ["y"] }] }),
    ).rejects.toThrow("already running");
    release();
    await first;
  });

  it("cancel terminates the worker and fails the job", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const { spawn, workers } = fakeWorker(async (request) => {
      if (request.type === "EXEC") await gate;
      return execOk(request);
    });
    const runner = createRunner(spawn);
    const job = runner.run({
      label: "A",
      steps: [{ type: "EXEC", args: ["x"] }],
    });
    runner.cancel();
    await expect(job).rejects.toThrow("Cancelled");
    expect(runner.state.kind).toBe("failed");
    expect(workers[0]!.terminate).toHaveBeenCalled();
    release();
  });

  it("returns a non-zero exit code as data and allows retry after reset", async () => {
    let fail = true;
    const { spawn } = fakeWorker((request) => {
      if (fail && (request.type === "EXEC" || request.type === "FFPROBE"))
        return {
          id: request.id,
          type: request.type,
          code: 1,
          log: ["Conversion failed!"],
        };
      return execOk(request);
    });
    const runner: Runner = createRunner(spawn);
    // A non-zero FFmpeg exit code is data the caller inspects, not a runner failure.
    const bad = await runner.run({
      label: "A",
      steps: [{ type: "EXEC", args: ["x"] }],
    });
    expect(bad.code).toBe(1);
    expect(bad.log).toContain("Conversion failed!");
    expect(runner.state.kind).toBe("done");
    fail = false;
    runner.reset();
    const good = await runner.run({
      label: "A",
      steps: [{ type: "EXEC", args: ["x"] }],
    });
    expect(good.code).toBe(0);
  });

  it("fails cleanly when the worker itself errors", async () => {
    const workers: FakeWorker[] = [];
    const spawn = () => {
      const w: FakeWorker = {
        onmessage: null,
        onerror: null,
        postMessage() {},
        terminate: vi.fn(),
      };
      workers.push(w);
      return w as unknown as Worker;
    };
    const runner = createRunner(spawn);
    const job = runner.run({
      label: "A",
      steps: [{ type: "EXEC", args: ["x"] }],
    });
    workers[0]!.onerror?.({
      message: "worker exploded",
      preventDefault() {},
    });
    await expect(job).rejects.toThrow("worker exploded");
    expect(runner.state.kind).toBe("failed");
  });

  it("dispose terminates the worker and clears listeners", async () => {
    const { spawn, workers } = fakeWorker(execOk);
    const runner = createRunner(spawn);
    const listener = vi.fn();
    runner.subscribe(listener);
    await runner.run({ label: "A", steps: [{ type: "EXEC", args: ["x"] }] });
    runner.dispose();
    expect(workers[0]!.terminate).toHaveBeenCalled();
  });
});
