import { useCallback, useEffect, useRef, useState } from "react";

type PreviewInput = {
  src: string;
  alt: string;
  title: string;
  lines: string[];
};

type PreviewState = PreviewInput & {
  left: number;
  top: number;
  width: number;
  height: number;
  tx: number;
  ty: number;
  scale: number;
  captionLeft: number;
  captionTop: number;
  captionWidth: number;
  connectorLeft: number;
  connectorWidth: number;
  connectorTop: number;
};

const CAPTION_WIDTH = 230;
const CAPTION_GAP = 26;

function buildState(input: PreviewInput, rect: DOMRect): PreviewState {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 24;

  const maxScale = Math.min(
    2.4,
    (vh - margin * 2) / rect.height,
    (vw - margin * 2 - CAPTION_WIDTH - CAPTION_GAP) / rect.width,
  );
  const scale = Math.max(1.25, Math.min(2.4, maxScale));

  const fw = rect.width * scale;
  const fh = rect.height * scale;

  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // Keep the zoom anchored near the furniture, only nudging it back on screen.
  const minCx = margin + fw / 2;
  const maxCx = vw - margin - fw / 2 - CAPTION_WIDTH - CAPTION_GAP;
  const minCy = margin + fh / 2;
  const maxCy = vh - margin - fh / 2;

  const targetCx = maxCx > minCx ? Math.min(Math.max(cx, minCx), maxCx) : (minCx + maxCx) / 2;
  const targetCy = maxCy > minCy ? Math.min(Math.max(cy, minCy), maxCy) : (minCy + maxCy) / 2;

  const tx = targetCx - cx;
  const ty = targetCy - cy;

  const finalLeft = targetCx - fw / 2;
  const finalTop = targetCy - fh / 2;

  return {
    ...input,
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    tx,
    ty,
    scale,
    captionLeft: finalLeft + fw + CAPTION_GAP,
    captionTop: finalTop + Math.min(fh * 0.22, 140),
    captionWidth: CAPTION_WIDTH,
    connectorLeft: finalLeft + fw,
    connectorWidth: CAPTION_GAP,
    connectorTop: finalTop + Math.min(fh * 0.22, 140) + 18,
  };
}

export function useHoverPreview(delay = 600) {
  const [state, setState] = useState<PreviewState | null>(null);
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const open = useCallback(
    (input: PreviewInput, element: HTMLElement) => {
      clear();
      timer.current = setTimeout(() => {
        const rect = element.getBoundingClientRect();
        setState(buildState(input, rect));
        requestAnimationFrame(() => requestAnimationFrame(() => setActive(true)));
      }, delay);
    },
    [clear, delay],
  );

  const close = useCallback(() => {
    clear();
    setActive(false);
    setState(null);
  }, [clear]);

  useEffect(() => clear, [clear]);

  const overlay = state ? (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      <div
        className="absolute inset-0"
        style={{
          background: "color-mix(in oklab, var(--background) 74%, transparent)",
          opacity: active ? 1 : 0,
          transition: "opacity 320ms linear",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: state.left,
          top: state.top,
          width: state.width,
          height: state.height,
          transform: active
            ? `translate3d(${state.tx}px, ${state.ty}px, 0) scale(${state.scale})`
            : "translate3d(0,0,0) scale(1)",
          transition: "transform 420ms cubic-bezier(.22,1,.36,1)",
          willChange: "transform",
        }}
      >
        <img
          src={state.src}
          alt={state.alt}
          className="h-full w-full object-cover"
          style={{
            boxShadow: active ? "0 40px 90px oklch(0 0 0 / 55%)" : "none",
            transition: "box-shadow 420ms ease",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: state.connectorLeft,
          top: state.connectorTop,
          width: active ? state.connectorWidth : 0,
          height: 1,
          background: "var(--color-primary)",
          opacity: active ? 0.8 : 0,
          transition: "width 340ms cubic-bezier(.22,1,.36,1) 120ms, opacity 240ms linear 120ms",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: state.captionLeft,
          top: state.captionTop,
          width: state.captionWidth,
          opacity: active ? 1 : 0,
          transform: active ? "translate3d(0,0,0)" : "translate3d(-8px,0,0)",
          transition: "opacity 300ms linear 180ms, transform 380ms cubic-bezier(.22,1,.36,1) 180ms",
        }}
      >
        <div className="bg-black/90 px-4 py-3 shadow-xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            {state.title}
          </p>
        </div>
        {state.lines.map((line, index) => (
          <div key={line} className="mt-[3px] bg-black/85 px-4 py-2 shadow-lg">
            <p
              className="font-sans text-[11px] font-light leading-5 tracking-wide"
              style={{ color: "var(--color-gold-bright)", opacity: 1 - index * 0.15 }}
            >
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return { open, close, overlay };
}
