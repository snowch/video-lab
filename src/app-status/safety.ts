// Copyright © 2026 Christopher Snow
import { useEffect, useRef } from "react";
const guards = new Set<() => boolean>();
export function safeToRestart() {
  return [...guards].every((guard) => guard());
}
export function useRestartGuard(safe: () => boolean) {
  const ref = useRef(safe);
  ref.current = safe;
  useEffect(() => {
    const check = () => ref.current();
    guards.add(check);
    return () => {
      guards.delete(check);
    };
  }, []);
}
