// Copyright © 2026 Christopher Snow
// Module worker for real FFmpeg.wasm jobs. Loads the vendored, version-pinned
// single-thread core from same-origin vendor/ffmpeg/ and runs EXEC/FFPROBE and
// FS read/write requests off the main thread. One request at a time; the
// runner serialises jobs.
/// <reference lib="webworker" />
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { base } from "./base";

declare const self: DedicatedWorkerGlobalScope;

export type WorkerRequest =
  | {
      readonly id: number;
      readonly type: "EXEC";
      readonly args: readonly string[];
    }
  | {
      readonly id: number;
      readonly type: "FFPROBE";
      readonly args: readonly string[];
    }
  | {
      readonly id: number;
      readonly type: "WRITE_FILE";
      readonly path: string;
      readonly data: Uint8Array;
    }
  | { readonly id: number; readonly type: "READ_FILE"; readonly path: string }
  | {
      readonly id: number;
      readonly type: "DELETE_FILE";
      readonly path: string;
    };

export type WorkerReply =
  | {
      readonly id: number;
      readonly type: "EXEC" | "FFPROBE";
      readonly code: number;
      readonly log: readonly string[];
    }
  | {
      readonly id: number;
      readonly type: "WRITE_FILE" | "DELETE_FILE";
      readonly ok: true;
    }
  | {
      readonly id: number;
      readonly type: "READ_FILE";
      readonly data?: Uint8Array;
    };

let ffmpeg: FFmpeg | undefined;
let loading: Promise<FFmpeg> | undefined;
let buffer: string[] = [];

async function load(): Promise<FFmpeg> {
  if (ffmpeg) return ffmpeg;
  if (!loading) {
    loading = (async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const instance = new FFmpeg();
      instance.on("log", ({ message }) => {
        buffer.push(message);
      });
      await instance.load({
        coreURL: `${base}vendor/ffmpeg/ffmpeg-core.js`,
        wasmURL: `${base}vendor/ffmpeg/ffmpeg-core.wasm`,
      });
      ffmpeg = instance;
      return instance;
    })();
  }
  return loading;
}

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;
  buffer = [];
  const reply = async (): Promise<WorkerReply> => {
    const instance = await load();
    switch (request.type) {
      case "EXEC": {
        const code = await instance.exec([...request.args]);
        return { id: request.id, type: "EXEC", code, log: buffer };
      }
      case "FFPROBE": {
        const code = await instance.ffprobe([...request.args]);
        return { id: request.id, type: "FFPROBE", code, log: buffer };
      }
      case "WRITE_FILE": {
        await instance.writeFile(request.path, request.data);
        return { id: request.id, type: "WRITE_FILE", ok: true };
      }
      case "READ_FILE": {
        try {
          const data = (await instance.readFile(request.path)) as Uint8Array;
          return { id: request.id, type: "READ_FILE", data };
        } catch {
          return { id: request.id, type: "READ_FILE", data: undefined };
        }
      }
      case "DELETE_FILE": {
        try {
          await instance.deleteFile(request.path);
        } catch {
          // Deleting an absent file is a successful cleanup.
        }
        return { id: request.id, type: "DELETE_FILE", ok: true };
      }
    }
  };
  try {
    const result = await reply();
    buffer = [];
    self.postMessage(
      result,
      result.type === "READ_FILE" && result.data ? [result.data.buffer] : [],
    );
  } catch (error) {
    let failed: WorkerReply;
    if (request.type === "EXEC" || request.type === "FFPROBE") {
      failed = {
        id: request.id,
        type: request.type,
        code: -1,
        log: [...buffer, String(error)],
      };
    } else {
      failed = { id: request.id, type: "DELETE_FILE", ok: true };
    }
    buffer = [];
    self.postMessage(failed);
  }
};
