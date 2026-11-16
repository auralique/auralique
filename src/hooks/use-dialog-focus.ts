import { useEffect, useRef, type RefObject } from "react";

export function useDialogFocus(open: boolean, panel: RefObject<HTMLElement | null>, close: () => void) {
  const closeRef = useRef(close);
  useEffect(() => { closeRef.current = close; }, [close]);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('button, a[href], input, summary')?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab") return;
      const elements = Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select, textarea, summary, iframe, [tabindex="0"]') ?? []).filter((el) => el.getClientRects().length > 0);
      const first = elements[0]; const last = elements.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || !panel.current?.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => { cancelAnimationFrame(frame); document.body.style.overflow = overflow; document.removeEventListener("keydown", keydown); previous?.focus({ preventScroll: true }); };
  }, [open, panel]);
}