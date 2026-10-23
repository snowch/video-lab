// Copyright © 2026 Christopher Snow
import type { Probe } from "../processing/engine";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
export type MediaKind = "capture" | "video" | "muxed" | "edit";
export type MediaRecord = {
  id: MediaKind;
  blob: Blob;
  name: string;
  origin: "capture" | "imported" | "provided" | "generated";
  created: number;
  command?: string[];
  rate?: number;
  probe?: Probe;
  recipe?: {
    source: string;
    workingInputName: string;
    sourceSha256: string;
    ranges: { start: number; end: number }[];
    command: string[];
    created: string;
  };
  capture?: {
    seconds: number;
    width?: number;
    height?: number;
    audio: boolean;
  };
};
type Records = Partial<Record<MediaKind, MediaRecord>>;
function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("video-lab-project", 1);
    request.onupgradeneeded = () =>
      request.result.createObjectStore("media", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("storage-blocked"));
  });
}
async function stored<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await database();
  try {
    return await new Promise<T>((resolve, reject) => {
      const transaction = db.transaction("media", mode);
      const request = operation(transaction.objectStore("media"));
      transaction.oncomplete = () => resolve(request.result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}
const ProjectContext = createContext<{
  records: Records;
  ready: boolean;
  persistent: boolean;
  active: boolean;
  setActive: (active: boolean) => void;
  save: (record: MediaRecord) => Promise<void>;
  clear: () => Promise<void>;
  discard: (kind: MediaKind) => Promise<void>;
} | null>(null);
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<Records>({});
  const [ready, setReady] = useState(false);
  const [persistent, setPersistent] = useState(true);
  const [active, setActive] = useState(false);
  useEffect(() => {
    let mounted = true;
    void stored<MediaRecord[]>("readonly", (store) => store.getAll())
      .then((media) => {
        if (mounted)
          setRecords(Object.fromEntries(media.map((item) => [item.id, item])));
      })
      .catch(() => {
        if (mounted) setPersistent(false);
      })
      .finally(() => {
        if (mounted) setReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);
  async function save(record: MediaRecord) {
    setRecords((current) => {
      // A changed source invalidates the previous final export.
      const next = { ...current, [record.id]: record };
      if (record.id === "capture") delete next.edit;
      if (record.id === "video") delete next.muxed;
      return next;
    });
    try {
      await stored("readwrite", (store) => store.put(record));
      if (record.id === "capture")
        await stored("readwrite", (store) => store.delete("edit"));
      if (record.id === "video")
        await stored("readwrite", (store) => store.delete("muxed"));
    } catch {
      setPersistent(false);
    }
  }
  async function discard(kind: MediaKind) {
    setRecords((current) => {
      const next = { ...current };
      delete next[kind];
      return next;
    });
    try {
      await stored("readwrite", (store) => store.delete(kind));
    } catch {
      setPersistent(false);
    }
  }
  async function clear() {
    setRecords({});
    try {
      await stored("readwrite", (store) => store.clear());
    } catch {
      setPersistent(false);
    }
  }
  return (
    <ProjectContext.Provider
      value={{
        records,
        ready,
        persistent,
        active,
        setActive,
        save,
        clear,
        discard,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
export function useProject() {
  const value = useContext(ProjectContext);
  if (!value) throw new Error("ProjectProvider required");
  return value;
}
export function useBlobURL(blob?: Blob) {
  const [url, setURL] = useState<string>();
  useEffect(() => {
    if (!blob) {
      setURL(undefined);
      return;
    }
    const value = URL.createObjectURL(blob);
    setURL(value);
    return () => URL.revokeObjectURL(value);
  }, [blob]);
  return url;
}
