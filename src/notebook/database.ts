// Copyright © 2026 Christopher Snow
import type { NotebookFile, CellRecord } from "./model";
export type Meta = { key: string; value: unknown };
export async function database() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const r = indexedDB.open("video-lab-notebook", 1);
    r.onupgradeneeded = () => {
      for (const [name, keyPath] of [
        ["files", "name"],
        ["cells", "id"],
        ["meta", "key"],
      ])
        r.result.createObjectStore(name!, { keyPath: keyPath! });
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.onblocked = () =>
      reject(
        new Error(
          "Close another older notebook window, then retry opening storage.",
        ),
      );
  });
}
export async function readWorkspace() {
  const d = await database();
  try {
    return await new Promise<{
      files: NotebookFile[];
      cells: CellRecord[];
      meta: Meta[];
    }>((resolve, reject) => {
      const t = d.transaction(["files", "cells", "meta"]);
      const f = t.objectStore("files").getAll(),
        c = t.objectStore("cells").getAll(),
        m = t.objectStore("meta").getAll();
      t.oncomplete = () =>
        resolve({ files: f.result, cells: c.result, meta: m.result });
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error);
    });
  } finally {
    d.close();
  }
}
export async function writeCell(cell: CellRecord) {
  const d = await database();
  try {
    await new Promise<void>((resolve, reject) => {
      const t = d.transaction("cells", "readwrite");
      t.objectStore("cells").put(cell);
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error);
    });
  } finally {
    d.close();
  }
}
/** A single transaction covers folder/file moves, imports and replacement checks. */
export async function writeFiles(
  additions: NotebookFile[],
  removed: string[],
  meta: Meta[] = [],
  overwrite = true,
) {
  const d = await database();
  try {
    await new Promise<void>((resolve, reject) => {
      const t = d.transaction(["files", "meta"], "readwrite"),
        s = t.objectStore("files");
      let conflict = false;
      for (const name of removed) s.delete(name);
      for (const file of additions) {
        if (overwrite) s.put(file);
        else {
          const r = s.get(file.name);
          r.onsuccess = () => {
            if (r.result) {
              conflict = true;
              t.abort();
            } else s.put(file);
          };
        }
      }
      for (const item of meta) t.objectStore("meta").put(item);
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
      t.onabort = () =>
        reject(
          conflict
            ? new DOMException(
                "A destination already exists. Nothing was replaced.",
                "ConstraintError",
              )
            : t.error,
        );
    });
  } finally {
    d.close();
  }
}
