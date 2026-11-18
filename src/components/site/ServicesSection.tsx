import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useModalRoute, slugFor } from "@/hooks/use-modal-route";
import { findServiceIndex, serviceSlugs } from "@/lib/content-urls";
import { ArrowRight, X } from "lucide-react";
import { services } from "@/lib/content";
import { serviceDetails, type ServiceDetail } from "@/lib/service-details";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

type Service = (typeof services)[number];
const pad = (n: number) => String(n + 1).padStart(2, "0");

function DetailBody({ d, headingLevel }: { d: ServiceDetail; headingLevel: "h3" | "h4" }) {
  const H = headingLevel;
  return (
    <div className="space-y-10 text-foreground/85">
      <div className="grid gap-5 md:grid-cols-2">
        {d.groups.map((g) => (
          <section key={g.title} className="rounded-2xl border border-border bg-background p-6">
            <H className="display text-xl text-plum">{g.title}</H>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {g.items.map((it) => <li key={it} className="flex gap-2.5"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{it}</li>)}
            </ul>
          </section>
        ))}
      </div>
      {d.approach.length > 0 && (
        <section>
          <H className="eyebrow mb-4 text-primary">Our approach</H>
          <ol className="grid gap-3 sm:grid-cols-2">
            {d.approach.map((a, i) => <li key={a} className="flex gap-3"><span className="display text-primary">{pad(i)}</span>{a}</li>)}
          </ol>
        </section>
      )}
      <section>
        <H className="eyebrow mb-4 text-primary">What this service helps you achieve</H>
        <ul className="flex flex-wrap gap-2">
          {d.benefits.map((b) => <li key={b} className="rounded-full bg-secondary px-4 py-2 text-sm text-plum">{b}</li>)}
        </ul>
      </section>
      {(d.platforms || d.idealFor) && (
        <div className="grid gap-6 border-t border-border pt-8 md:grid-cols-2">
          {d.platforms && <div><H className="eyebrow mb-2 text-primary">Platforms</H><p>{d.platforms}</p></div>}
          {d.idealFor && <div><H className="eyebrow mb-2 text-primary">Ideal for</H><p>{d.idealFor}</p></div>}
        </div>
      )}
      {d.note && <p className="border-l-2 border-primary pl-4 text-sm italic text-muted-foreground">{d.note}</p>}
    </div>
  );
}

export function ServiceDetailModal({ service, detail, onClose, onBook }: { service: Service; detail: ServiceDetail; onClose: () => void; onBook: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  useDialogFocus(true, panel, onClose);
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-plum/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose} role="presentation">
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="service-modal-title" onClick={(e) => e.stopPropagation()}
        className="flex h-[94dvh] w-full max-w-[920px] flex-col overflow-hidden rounded-t-3xl bg-muted shadow-2xl sm:h-auto sm:max-h-[92vh] sm:rounded-3xl">
        <div className="flex items-center justify-between gap-6 border-b border-border px-6 py-5 md:px-12">
          <p className="eyebrow text-primary">{detail.category}</p>
          <button type="button" onClick={onClose} aria-label="Close service details" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-primary hover:text-primary-foreground"><X size={18} /></button>
        </div>
        <div className="article-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 md:px-12 md:py-10">
          <p className="eyebrow text-muted-foreground">{service.title}</p>
          <h1 id="service-modal-title" className="display mt-3 text-3xl leading-tight text-plum md:text-5xl">{detail.headline}</h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/85">{detail.intro}</p>
          <div className="my-10 h-px bg-border" aria-hidden />
          <DetailBody d={detail} headingLevel="h3" />
          <button type="button" onClick={onBook} className="btn-primary mt-12 w-full sm:w-auto">Book a strategy call <ArrowRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index, onOpen }: { service: Service; index: number; onOpen: () => void }) {
  const d = serviceDetails[index]!;
  return (
    <article onClick={(e) => { if (!(e.target as HTMLElement).closest("summary, a")) onOpen(); }}
      className="group flex cursor-pointer flex-col rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-primary hover:bg-secondary/40">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-primary">Service {pad(index)}</span>
        <service.icon size={22} strokeWidth={1.4} className="text-primary transition-transform duration-300 group-hover:-rotate-6" />
      </div>
      <h3 className="display mt-8 text-[1.7rem] leading-tight"><Link to="/services/$slug" params={{ slug: serviceSlugs[index]! }} resetScroll={false} onClick={(e) => { e.preventDefault(); onOpen(); }} className="hover:text-primary">{service.title}</Link></h3>
      <p className="mt-3 text-muted-foreground">{service.desc}</p>
      <ul className="mt-6 grid flex-1 content-start gap-2 border-t border-border pt-6 text-sm text-foreground/80">
        {service.items.map((it) => <li key={it}>— {it}</li>)}
      </ul>
      <details>
        <summary onClick={(e) => { e.preventDefault(); onOpen(); }} aria-label={`Explore service: ${service.title}`}
          className="eyebrow mt-8 inline-flex cursor-pointer list-none items-center gap-2 text-foreground transition-colors group-hover:text-primary [&::-webkit-details-marker]:hidden">
          Explore service <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </summary>
        <div className="mt-6"><p className="mb-6">{d.headline} {d.intro}</p><DetailBody d={d} headingLevel="h4" /></div>
      </details>
    </article>
  );
}

export function ServicesGrid({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { pathname, open, close } = useModalRoute();
  const slug = slugFor(pathname, "services");
  const selected = slug ? findServiceIndex(slug) : -1;
  const openAt = (i: number) => open({ to: "/services/$slug", params: { slug: serviceSlugs[i]! } });
  useEffect(() => {
    const handler = (e: Event) => openAt((e as CustomEvent<number>).detail);
    window.addEventListener("auralique:open-service", handler);
    return () => window.removeEventListener("auralique:open-service", handler);
  });
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} onOpen={() => openAt(i)} />)}
      </div>
      {selected >= 0 && (
        <ServiceDetailModal service={services[selected]!} detail={serviceDetails[selected]!} onClose={close}
          onBook={() => { close(); onOpenBooking(); }} />
      )}
    </>
  );
}
