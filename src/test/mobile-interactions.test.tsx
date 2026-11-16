import { act, render, cleanup } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

function Dialog({ open, close }: { open: boolean; close: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  useDialogFocus(open, panel, close);
  return <div ref={panel}><button>Close</button></div>;
}

afterEach(() => { cleanup(); document.body.style.overflow = ""; });
describe("Mobile modal rules", () => {
  it("prevents background scrolling while open and restores prior scrolling on close", () => {
    document.body.style.overflow = "auto";
    const { rerender } = render(<Dialog open close={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<Dialog open={false} close={() => {}} />);
    expect(document.body.style.overflow).toBe("auto");
  });
  it("uses the current close callback on Escape without resetting the dialog lock", () => {
    const first = vi.fn(); const current = vi.fn();
    const { rerender } = render(<Dialog open close={first} />);
    rerender(<Dialog open close={current} />);
    act(() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })));
    expect(current).toHaveBeenCalledOnce(); expect(first).not.toHaveBeenCalled();
    expect(document.body.style.overflow).toBe("hidden");
  });
});