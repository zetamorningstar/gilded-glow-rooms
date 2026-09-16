import { useCallback, useEffect, useRef, useState } from "react";

type PreviewItem = { src: string; alt: string };

export function useHoverPreview(delay = 2500) {
  const [item, setItem] = useState<PreviewItem | null>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const open = useCallback(
    (next: PreviewItem) => {
      clear();
      timer.current = setTimeout(() => {
        setItem(next);
        requestAnimationFrame(() => setVisible(true));
      }, delay);
    },
    [clear, delay],
  );

  const close = useCallback(() => {
    clear();
    setVisible(false);
    setItem(null);
  }, [clear]);

  useEffect(() => clear, [clear]);

  const overlay = item ? (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{
        background: visible
          ? "color-mix(in oklab, var(--background) 62%, transparent)"
          : "transparent",
        opacity: visible ? 1 : 0,
        transition: "opacity 900ms cubic-bezier(.2,.75,.2,1), background 900ms ease",
      }}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="max-h-[70vh] max-w-[72vw] object-contain shadow-2xl ring-1 ring-primary/30"
        style={{
          transform: visible ? "scale(1)" : "scale(0.86)",
          transition: "transform 1100ms cubic-bezier(.2,.75,.2,1)",
        }}
      />
    </div>
  ) : null;

  return { open, close, overlay };
}
