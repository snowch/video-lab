// Copyright © 2026 Christopher Snow
import { limits } from "../processing/config";
import { validFilename } from "./command";
export type WorkspaceFile = {
  name: string;
  blob: Blob;
  origin:
    | "provided"
    | "captured"
    | "imported"
    | "generated"
    | "recipe"
    | "report"
    | "note";
  command?: string;
  evidence?: {
    tool: "ffmpeg" | "ffprobe";
    args: string[];
    inputs: { name: string; sha256: string }[];
  };
};
export type Files = Record<string, WorkspaceFile>;
export async function disk<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const r = indexedDB.open("video-lab-cli", 1);
    r.onupgradeneeded = () =>
      r.result.createObjectStore("files", { keyPath: "name" });
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.onblocked = () => reject(new Error("Storage blocked"));
  });
  try {
    return await new Promise<T>((resolve, reject) => {
      const t = db.transaction("files", mode),
        r = action(t.objectStore("files"));
      t.oncomplete = () => resolve(r.result);
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error);
    });
  } finally {
    db.close();
  }
}
export function checkFiles(files: Files) {
  const entries = Object.values(files);
  if (
    entries.filter((f) => f.origin !== "recipe").length > limits.inputFiles ||
    entries.length > 24
  )
    throw new Error(
      "The workspace holds at most 12 working files plus 12 recipes. Download important work, then use rm to remove an unneeded file.",
    );
  if (entries.reduce((sum, f) => sum + f.blob.size, 0) > limits.inputBytes)
    throw new Error(
      "The workspace exceeds 32 MiB. Download important work, then use rm to remove an unneeded file.",
    );
  for (const file of entries) {
    if (!validFilename(file.name))
      throw new Error(
        "Use a filename of up to 80 letters, digits, dots, hyphens or underscores, beginning with a letter or digit. Folders are unavailable.",
      );
    if (!file.blob.size || file.blob.size > limits.outputBytes)
      throw new Error(
        "Each workspace file must be nonempty and at most 20 MiB.",
      );
  }
}
export function mimeFor(name: string) {
  const ext = name.split(".").at(-1)?.toLowerCase();
  return (
    (
      {
        mp4: "video/mp4",
        webm: "video/webm",
        wav: "audio/wav",
        mp3: "audio/mpeg",
        ogg: "audio/ogg",
        jpg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        json: "application/json",
      } as Record<string, string>
    )[ext ?? ""] ?? "application/octet-stream"
  );
}
