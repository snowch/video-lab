// Copyright © 2026 Christopher Snow
// Main-thread runner for the encode worker: one job at a time, honest
// indeterminate progress, cancellation by worker termination, clean retry, and
// full cleanup of virtual-FS paths, object URLs and listeners.
import type { WorkerReply, WorkerRequest } from "./worker";

export type JobState =
  | { readonly kind: "idle" }
  | { readonly kind: "loading" }
  | { readonly kind: "running"; readonly label: string }
  | { readonly kind: "done"; readonly log: readonly string[] }
  | { readonly kind: "failed"; readonly message: string };

export interface RunJob {
  readonly label: string;
  readonly steps: ReadonlyArray<{
    readonly type: "EXEC" | "FFPROBE";
    readonly args: readonly string[];
  }>;
  readonly write?: Readonly<Record<string, Uint8Array>>;
  readonly read?: readonly string[];
  readonly signal?: AbortSignal;
}

export interface RunResult {
  readonly code: number;
  readonly log: readonly string[];
  readonly files: Readonly<Record<string, Uint8Array>>;
  /** Per-step results in step order: each EXEC/FFPROBE step's exit code and buffered log. */
  readonly steps: ReadonlyArray<{
    readonly code: number;
    readonly log: readonly string[];
  }>;
}

export interface Runner {
  readonly state: JobState;
  subscribe(listener: (state: JobState) => void): () => void;
  run(job: RunJob): Promise<RunResult>;
  cancel(): void;
  reset(): void;
  dispose(): void;
}

/**
 * Create a runner. `spawn` is injectable so unit tests exercise the state
 * machine without a real worker; the browser passes `() => new Worker(new URL("./worker.ts", import.meta.url), { type: "module" })`.
 */
export function createRunner(spawn: () => Worker): Runner {
  let worker: Worker | undefined;
  let state: JobState = { kind: "idle" };
  let nextId = 0;
  let cancelled = false;
  const listeners = new Set<(state: JobState) => void>();
  const pending = new Map<number, (reply: WorkerReply) => void>();
  const rejecters = new Map<number, (error: Error) => void>();
  const set = (next: JobState) => {
    state = next;
    for (const l of listeners) l(state);
  };
  const failAll = (error: Error) => {
    for (const reject of rejecters.values()) reject(error);
    rejecters.clear();
    pending.clear();
    set({ kind: "failed", message: error.message });
  };
  const ensureWorker = (): Worker => {
    if (!worker) {
      worker = spawn();
      worker.onmessage = (event: MessageEvent<WorkerReply>) => {
        const reply = event.data;
        const resolve = pending.get(reply.id);
        if (resolve) {
          pending.delete(reply.id);
          rejecters.delete(reply.id);
          resolve(reply);
        }
      };
      worker.onerror = (event) => {
        event.preventDefault();
        failAll(new Error(event.message || "Encoder worker error"));
      };
    }
    return worker;
  };
  const ask = <T extends WorkerRequest>(request: T): Promise<WorkerReply> =>
    new Promise((resolve, reject) => {
      const w = ensureWorker();
      pending.set(request.id, resolve);
      rejecters.set(request.id, reject);
      if ("data" in request && request.data instanceof Uint8Array)
        w.postMessage(request, [request.data.buffer]);
      else w.postMessage(request);
    });
  const terminate = () => {
    if (worker) {
      worker.terminate();
      worker = undefined;
    }
  };
  return {
    get state() {
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    async run(job) {
      if (state.kind === "running" || state.kind === "loading")
        throw new Error("A job is already running");
      cancelled = false;
      const onAbort = () => {
        cancelled = true;
        terminate();
        failAll(new Error("Cancelled"));
      };
      job.signal?.addEventListener("abort", onAbort, { once: true });
      set({ kind: "loading" });
      const files: Record<string, Uint8Array> = {};
      let lastCode = 0;
      let lastLog: readonly string[] = [];
      const stepResults: { code: number; log: readonly string[] }[] = [];
      const written: string[] = [];
      const read: string[] = [];
      try {
        for (const [name, data] of Object.entries(job.write ?? {})) {
          if (cancelled) throw new Error("Cancelled");
          await ask<WorkerRequest>({
            id: ++nextId,
            type: "WRITE_FILE",
            path: name,
            data: new Uint8Array(data),
          });
          written.push(name);
        }
        for (const step of job.steps) {
          if (cancelled) throw new Error("Cancelled");
          set({ kind: "running", label: job.label });
          const reply = await ask<WorkerRequest>({
            id: ++nextId,
            type: step.type,
            args: step.args,
          });
          if (reply.type === "EXEC" || reply.type === "FFPROBE") {
            lastCode = reply.code;
            lastLog = reply.log;
            stepResults.push({ code: reply.code, log: reply.log });
          }
        }
        for (const name of job.read ?? []) {
          if (cancelled) throw new Error("Cancelled");
          const reply = await ask<WorkerRequest>({
            id: ++nextId,
            type: "READ_FILE",
            path: name,
          });
          if (reply.type === "READ_FILE" && reply.data)
            files[name] = reply.data;
          read.push(name);
        }
        for (const name of [...written, ...read])
          await ask<WorkerRequest>({
            id: ++nextId,
            type: "DELETE_FILE",
            path: name,
          }).catch(() => {});
        if (cancelled) throw new Error("Cancelled");
        set({ kind: "done", log: lastLog });
        return { code: lastCode, log: lastLog, files, steps: stepResults };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        set({ kind: "failed", message });
        throw error instanceof Error ? error : new Error(message);
      } finally {
        job.signal?.removeEventListener("abort", onAbort);
      }
    },
    cancel() {
      if (state.kind === "running" || state.kind === "loading")
        onAbortInternal();
    },
    reset() {
      if (state.kind === "running" || state.kind === "loading") return;
      set({ kind: "idle" });
    },
    dispose() {
      terminate();
      listeners.clear();
      pending.clear();
      rejecters.clear();
    },
  };
  function onAbortInternal() {
    cancelled = true;
    terminate();
    failAll(new Error("Cancelled"));
  }
}

/** Create the browser encode runner bound to the real module worker. */
export function createBrowserRunner(): Runner {
  return createRunner(
    () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
  );
}
