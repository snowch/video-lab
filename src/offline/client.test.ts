// Copyright © 2026 Christopher Snow
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { activateWaiting } from "./client";
class Channel {
  static last: Channel;
  port1 = {
    onmessage: undefined as
      undefined | ((event: { data: { ready: boolean } }) => void),
    close: vi.fn(),
  };
  port2 = {};
  constructor() {
    Channel.last = this;
  }
}
class Worker extends EventTarget {
  state = "installed";
  postMessage = vi.fn();
}
class Container extends EventTarget {
  controller: object | null = {};
}
let worker: Worker, container: Container;
const activate = (timeout = 100) =>
  activateWaiting(
    worker as unknown as ServiceWorker,
    container as unknown as ServiceWorkerContainer,
    timeout,
  );
const acknowledge = () =>
  Channel.last.port1.onmessage!({ data: { ready: true } });
const control = () => {
  container.controller = worker;
  container.dispatchEvent(new Event("controllerchange"));
};
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("MessageChannel", Channel);
  worker = new Worker();
  container = new Container();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
it("does not confuse an activation acknowledgement with taking control", async () => {
  let complete = false;
  const pending = activate().then(() => {
    complete = true;
  });
  acknowledge();
  await Promise.resolve();
  expect(complete).toBe(false);
  control();
  await pending;
  expect(Channel.last.port1.close).toHaveBeenCalledOnce();
  expect(vi.getTimerCount()).toBe(0);
});
it("also accepts control arriving before acknowledgement", async () => {
  let complete = false;
  const pending = activate().then(() => {
    complete = true;
  });
  control();
  await Promise.resolve();
  expect(complete).toBe(false);
  acknowledge();
  await pending;
  expect(complete).toBe(true);
});
it("times out a lost activation message and permits a genuine retry", async () => {
  const failed = expect(activate(30)).rejects.toThrow("did not take control");
  await vi.advanceTimersByTimeAsync(30);
  await failed;
  expect(Channel.last.port1.close).toHaveBeenCalledOnce();
  const retry = activate();
  acknowledge();
  control();
  await expect(retry).resolves.toBeUndefined();
});
it("rejects a replaced waiting worker and removes its listeners", async () => {
  const pending = expect(activate()).rejects.toThrow("was replaced");
  worker.state = "redundant";
  worker.dispatchEvent(new Event("statechange"));
  await pending;
  expect(Channel.last.port1.close).toHaveBeenCalledOnce();
  expect(vi.getTimerCount()).toBe(0);
});
