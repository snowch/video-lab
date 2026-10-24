// Copyright © 2026 Christopher Snow
import type { WorkspaceFile } from "../cli/files";
export function validPath(name: string) {
  const parts = name.split("/");
  return (
    name.length <= 180 &&
    parts.length <= 8 &&
    parts.every(
      (part) =>
        /^[\p{L}\p{N}][\p{L}\p{N} ._-]{0,79}$/u.test(part) &&
        !part.endsWith(" ") &&
        part !== "inspection.json" &&
        !part.startsWith("cli-internal"),
    )
  );
}
export type NotebookFile = WorkspaceFile;
export type RunRecord = {
  command: string;
  code?: number;
  log: string;
  truncated?: boolean;
  error?: string;
  output?: string;
  inputs: { name: string; sha256: string }[];
  outputHash?: string;
  at: string;
};
export type CellRecord = {
  id: string;
  command: string;
  last?: RunRecord;
  prediction?: string;
  review?: string;
};
export function checkNotebookFiles(
  files: Record<string, NotebookFile>,
  folders: string[] = [],
) {
  const entries = Object.values(files);
  if (entries.length > 64)
    throw new Error(
      "The workspace allows at most 64 files. Download and remove unneeded files before adding more.",
    );
  if (entries.reduce((n, f) => n + f.blob.size, 0) > 32 * 1024 * 1024)
    throw new Error(
      "The workspace exceeds 32 MiB. Download and remove unneeded files first.",
    );
  for (const file of entries) {
    if (!validPath(file.name))
      throw new Error(
        "Use relative paths of at most eight parts and 180 characters. Each part must start with a letter or digit and may contain letters, digits, spaces, dots, hyphens or underscores (at most 80 characters, no trailing space). Parent paths, inspection.json and names starting cli-internal are unavailable.",
      );
    if (file.blob.size > 20 * 1024 * 1024)
      throw new Error("Each file must be at most 20 MiB.");
    if (
      [...Object.keys(files), ...folders].some((p) =>
        p.startsWith(file.name + "/"),
      )
    )
      throw new Error("A file and a folder cannot share a name.");
  }
  if (folders.some((f) => !validPath(f) || files[f]))
    throw new Error("Choose a valid, unused folder name.");
}
export function movedFiles(
  files: Record<string, NotebookFile>,
  from: string,
  to: string,
  folders: string[],
) {
  if (!validPath(to) || to.startsWith(from + "/"))
    throw new Error(
      "Choose a valid destination outside the folder being moved.",
    );
  if (
    files[to] ||
    folders.includes(to) ||
    Object.keys(files).some((p) => p.startsWith(to + "/"))
  )
    throw new Error(
      "The destination already exists. Choose another name; nothing was replaced.",
    );
  const selected = Object.keys(files).filter(
    (p) => p === from || p.startsWith(from + "/"),
  );
  const selectedFolders = folders.filter(
    (p) => p === from || p.startsWith(from + "/"),
  );
  if (!selected.length && !selectedFolders.length)
    throw new Error("That file or folder no longer exists.");
  const next = { ...files };
  for (const old of selected) delete next[old];
  for (const old of selected) {
    const name = to + old.slice(from.length);
    if (next[name] || folders.includes(name))
      throw new Error("The destination already exists. Nothing was replaced.");
    next[name] = { ...files[old]!, name };
  }
  const nextFolders = folders.filter((p) => !selectedFolders.includes(p));
  for (const old of selectedFolders) {
    const name = to + old.slice(from.length);
    if (nextFolders.includes(name) || next[name])
      throw new Error("The destination already exists. Nothing was replaced.");
    nextFolders.push(name);
  }
  checkNotebookFiles(next, nextFolders);
  return { files: next, folders: nextFolders };
}
export const hashBlob = (() => {
  const hashes = new WeakMap<Blob, Promise<string>>();
  return (blob: Blob) => {
    let hash = hashes.get(blob);
    if (!hash) {
      hash = blob
        .arrayBuffer()
        .then((bytes) => crypto.subtle.digest("SHA-256", bytes))
        .then((bytes) =>
          [...new Uint8Array(bytes)]
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""),
        );
      hashes.set(blob, hash);
    }
    return hash;
  };
})();
