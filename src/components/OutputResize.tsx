// Copyright © 2026 Christopher Snow
import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { outputResizeCopy as t } from "./output-resize.strings";
import "./output-resize.css";

/** Changes only the viewport of an existing read-only output element. */
export function OutputResize({
  target,
  controls,
}: {
  target: RefObject<HTMLPreElement | null>;
  controls: string;
}) {
  const helpId = useId();
  const [size, setSize] = useState(128);
  const [minimum, setMinimum] = useState(128);
  const maximum = Math.max(1200, minimum);
  const drag = useRef<{
    id: number;
    y: number;
    height: number;
    scale: number;
  } | null>(null);
  useLayoutEffect(() => {
    const element = target.current;
    if (!element) return;
    const measure = () => {
      // Layout dimensions stay in CSS pixels even with document zoom applied.
      if (!element.offsetHeight) return;
      setMinimum(
        Math.max(128, parseFloat(getComputedStyle(element).minHeight) || 0),
      );
      setSize(element.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);
  function resize(height: number) {
    const element = target.current;
    if (!element) return;
    const next = Math.round(Math.max(minimum, Math.min(maximum, height)));
    element.style.boxSizing = "border-box";
    element.style.maxHeight = "none";
    element.style.height = `${next}px`;
    setSize(next);
  }
  return (
    <div
      className="output-resize"
      role="separator"
      tabIndex={0}
      aria-orientation="horizontal"
      aria-label={t.label}
      aria-describedby={helpId}
      aria-controls={controls}
      aria-valuemin={Math.min(minimum, size)}
      aria-valuemax={Math.max(maximum, size)}
      aria-valuenow={size}
      aria-valuetext={t.currentHeight(size)}
      title={t.help}
      onPointerDown={(event) => {
        const element = target.current;
        if (!element || event.button !== 0 || !event.isPrimary) return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = {
          id: event.pointerId,
          y: event.clientY,
          height: element.offsetHeight,
          scale:
            element.getBoundingClientRect().height / element.offsetHeight || 1,
        };
      }}
      onPointerMove={(event) => {
        const start = drag.current;
        if (start?.id === event.pointerId)
          resize(start.height + (event.clientY - start.y) / start.scale);
      }}
      onPointerUp={(event) => {
        if (drag.current?.id !== event.pointerId) return;
        drag.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
      onLostPointerCapture={() => {
        drag.current = null;
      }}
      onKeyDown={(event) => {
        const next: Record<string, number> = {
          ArrowUp: size - 32,
          ArrowDown: size + 32,
          PageUp: size - 128,
          PageDown: size + 128,
          Home: minimum,
          End: maximum,
        };
        if (Object.hasOwn(next, event.key)) {
          event.preventDefault();
          resize(next[event.key]!);
        }
      }}
    >
      <span aria-hidden="true">↕ {t.label}</span>
      <span id={helpId} className="output-resize-help">
        {t.help}
      </span>
    </div>
  );
}
