import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

export function Header({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useDialogFocus(open, headerRef, () => setOpen(false));

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto grid min-h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:flex sm:h-18 sm:justify-between sm:py-4 md:px-8">
        <a href="#home" className="display text-2xl tracking-[0.2em] text-primary" aria-label="AURALIQUE home">
          AURALIQUE
        </a>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onOpenBooking} className="btn-primary hidden sm:inline-flex">Book a strategy call</button>
          <Button variant="outline" size="icon"
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile" className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-border bg-background shadow-lg lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="display block border-b border-border py-4 text-2xl text-foreground">{n.label}</a>
              </li>
            ))}
            <li className="pt-5">
              <button type="button" onClick={() => { setOpen(false); onOpenBooking(); }} className="btn-primary w-full">Book a strategy call</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
