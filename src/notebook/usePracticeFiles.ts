// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { useNotebook } from "./Workspace";

/** One automatic attempt per page visit; retry failures/deletions explicitly. */
export function usePracticeFiles(names: string[]) {
  const w = useNotebook();
  const attempted = useRef(false);
  const request = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const missing = names.some((name) => !w.files[name]);
  useEffect(() => {
    if (!w.ready || w.busy || attempted.current) return;
    attempted.current = true;
    if (!missing) return;
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    void w
      .load(names, { signal: controller.signal, quiet: true })
      .catch((e) => {
        if (!controller.signal.aborted)
          setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
  }, [w.ready, w.busy, missing, names, retry]);
  useEffect(
    () => () => {
      request.current?.abort();
      attempted.current = false;
    },
    [],
  );
  return {
    ready: w.ready && !missing && !loading,
    loading: loading || !w.ready || !attempted.current,
    waiting: w.busy && !attempted.current,
    error,
    retry: () => {
      attempted.current = false;
      setError("");
      setRetry((value) => value + 1);
    },
  };
}
