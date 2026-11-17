import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

const openService = (i: number) => {
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  window.dispatchEvent(new CustomEvent("auralique:open-service", { detail: i }));
};

export function Header({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const svcRef = useRef<HTMLLIElement>(null);
  const hover = useRef(false);
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

  useEffect(() => {
    if (!svc) return;
    const down = (e: MouseEvent) => { if (!svcRef.current?.contains(e.target as Node)) setSvc(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setSvc(false); };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [svc]);

  const linkCls = "inline-flex h-6 items-center whitespace-nowrap text-[0.8rem] font-medium tracking-[0.08em] text-plum/80 transition-colors hover:text-primary";

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-background transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-border shadow-[0_6px_24px_-18px_var(--plum)]" : "border-transparent",
      )}
    >
      <div className={cn(
        "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[height] duration-300 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]",
        scrolled ? "h-16" : "h-16 lg:h-20",
      )}>
        <a href="#home" className="flex items-baseline gap-3" aria-label="AURALIQUE home">
          <span className="display text-2xl tracking-[0.2em] text-primary">AURALIQUE</span>
          <span className="eyebrow hidden text-[0.58rem] tracking-[0.3em] text-plum/60 xl:inline">Growth, Elevated.</span>
        </a>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {nav.map((n) => n.href === "#services" ? (
              <li key={n.href} ref={svcRef} className="relative" onMouseEnter={() => { hover.current = true; setSvc(true); }} onMouseLeave={() => { hover.current = false; setSvc(false); }}>
                <span className="flex items-center gap-1">
                  <a href={n.href} className={linkCls}>{n.label}</a>
                  <button type="button" aria-label="Show services" aria-expanded={svc} aria-controls="services-menu"
                    onClick={() => setSvc((v) => hover.current || !v)} className="flex h-6 w-6 items-center justify-center text-plum/70 hover:text-primary">
                    <ChevronDown size={14} className={cn("transition-transform duration-200", svc && "rotate-180")} />
                  </button>
                </span>
                {svc && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                    <ul id="services-menu" className="w-80 rounded-2xl border border-border bg-background p-2 shadow-[0_20px_50px_-24px_var(--plum)]">
                      {services.map((s, i) => (
                        <li key={s.title}>
                          <button type="button" onClick={() => { setSvc(false); openService(i); }}
                            className="flex w-full gap-3 rounded-xl px-4 py-3 text-left text-sm text-plum transition-colors hover:bg-muted hover:text-primary">
                            <span className="eyebrow pt-0.5 text-[0.6rem] text-primary">{String(i + 1).padStart(2, "0")}</span>{s.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={n.href}><a href={n.href} className={linkCls}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={onOpenBooking} className="btn-primary hidden whitespace-nowrap !px-5 !py-3 lg:inline-flex">Book a strategy call</button>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-plum lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile" className="fade-up fixed inset-x-0 bottom-0 top-16 overflow-y-auto overscroll-contain border-t border-border bg-background lg:hidden" style={{ animationDuration: "0.35s" }}>
          <ul className="mx-auto flex max-w-xl flex-col px-6 py-6">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="display flex min-h-14 items-center border-b border-border text-3xl text-plum">{n.label}</a>
              </li>
            ))}
            <li className="pt-8">
              <button type="button" onClick={() => { setOpen(false); onOpenBooking(); }} className="btn-primary w-full">Book a strategy call</button>
            </li>
            <li className="eyebrow pt-8 text-center text-[0.6rem] text-plum/50">Growth, Elevated.</li>
          </ul>
        </nav>
      )}
    </header>
  );
}
