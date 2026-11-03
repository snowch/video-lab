// Copyright © 2026 Christopher Snow
import { useSyncExternalStore } from "react";
import { pages } from "./structure";

export const completionKey = (id: string) =>
  `video-lab:notebook:completion:v1:${id}`;
type StorageAccess = Pick<Storage, "getItem" | "setItem">;
type Snapshot = {
  completed: ReadonlySet<string>;
  unsaved: ReadonlySet<string>;
};

/** Reading marks are independent of command results and use one key per page. */
export class CompletionStore {
  private value: Snapshot;
  private listeners = new Set<() => void>();
  private ids: Set<string>;
  constructor(
    private storage: () => StorageAccess,
    ids: readonly string[],
  ) {
    this.ids = new Set(ids);
    const completed = new Set<string>();
    for (const id of ids) {
      try {
        if (storage().getItem(completionKey(id)) === "true") completed.add(id);
      } catch {
        /* Storage may be unavailable; marks still work in memory. */
      }
    }
    this.value = { completed, unsaved: new Set() };
  }
  get = () => this.value;
  private publish(completed: Set<string>, unsaved: Set<string>) {
    this.value = { completed, unsaved };
    this.listeners.forEach((listener) => listener());
  }
  set(id: string, done: boolean) {
    if (!this.ids.has(id)) return;
    const completed = new Set(this.value.completed);
    const unsaved = new Set(this.value.unsaved);
    if (done) completed.add(id);
    else completed.delete(id);
    try {
      this.storage().setItem(completionKey(id), String(done));
      unsaved.delete(id);
    } catch {
      unsaved.add(id);
    }
    this.publish(completed, unsaved);
  }
  reconcile = (event?: StorageEvent) => {
    const completed = new Set(this.value.completed);
    const unsaved = new Set(this.value.unsaved);
    for (const id of this.ids) {
      if (event?.key != null && event.key !== completionKey(id)) continue;
      if (!event && unsaved.has(id)) continue;
      try {
        if (event?.storageArea && event.storageArea !== this.storage()) return;
        if (this.storage().getItem(completionKey(id)) === "true")
          completed.add(id);
        else completed.delete(id);
        unsaved.delete(id);
      } catch {
        continue;
      }
    }
    this.publish(completed, unsaved);
  };
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    if (this.listeners.size === 1) {
      window.addEventListener("storage", this.reconcile);
      this.reconcile();
    }
    return () => {
      this.listeners.delete(listener);
      if (!this.listeners.size)
        window.removeEventListener("storage", this.reconcile);
    };
  };
}
let store: CompletionStore | undefined;
export function useCompletion() {
  store ??= new CompletionStore(
    () => localStorage,
    pages.map((page) => page.id),
  );
  const snapshot = useSyncExternalStore(store.subscribe, store.get, store.get);
  return { ...snapshot, set: store.set.bind(store) };
}
