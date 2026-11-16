import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { services } from "@/lib/content";
import { ServiceDetailModal } from "@/components/site/ServicesSection";
import { serviceDetails } from "@/lib/service-details";
import { projects, projectCategories, type Project } from "@/lib/projects";
import { useDialogFocus } from "@/hooks/use-dialog-focus";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function ProjectCover({ project, index }: { project: Project; index: number }) {
  const img = project.images?.[0];
  if (img) return <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[16/10] w-full rounded-xl bg-muted object-cover transition-transform duration-500 group-hover:scale-[1.02]" />;
  return (
    <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-xl bg-secondary p-6 md:p-8">
      <span className="eyebrow text-primary">{project.category}</span>
      <p className="display text-4xl text-foreground md:text-5xl">{project.title}</p>
      <span aria-hidden className="display pointer-events-none absolute -right-2 -top-6 text-[8rem] leading-none text-primary/10">{pad(index)}</span>
    </div>
  );
}

function CaseStudyBody({ project, H }: { project: Project; H: "h3" | "h4" }) {
  return (
    <>
      <section id={`cs-overview-${project.id}`} data-cs="overview" className="scroll-mt-24">
        <H className="eyebrow mb-3 text-primary">Project overview</H>
        <p className="leading-relaxed">{project.caseOverview ?? project.overview}</p>
        {project.industry?.length ? <ul className="mt-4 flex flex-wrap gap-2">{project.industry.map((t) => <li key={t} className="rounded-full bg-secondary px-3 py-1 text-sm text-plum">{t}</li>)}</ul> : null}
      </section>
      {project.objectives && <section><H className="eyebrow mb-3 text-primary">Project objectives</H><p className="leading-relaxed">{project.objectives}</p></section>}
      {(project.contribution || project.role || project.services?.length || project.workCompleted?.length) ? (
        <section id={`cs-scope-${project.id}`} data-cs="scope" className="scroll-mt-24">
          <H className="eyebrow mb-3 text-primary">Scope of work</H>
          {(project.contribution || project.role) && <p className="mb-3 leading-relaxed">{project.contribution ?? project.role}</p>}
          {project.services?.length ? <List items={project.services} /> : null}
          {project.workCompleted?.length ? <div className="mt-3"><List items={project.workCompleted} /></div> : null}
        </section>
      ) : null}
      {project.approach && <section><H className="eyebrow mb-3 text-primary">Approach & execution</H><p className="leading-relaxed">{project.approach}</p></section>}
      {(project.platform || project.tools?.length) ? (
        <section><H className="eyebrow mb-3 text-primary">Platforms & technology</H>
          <ul className="flex flex-wrap gap-2">{[project.platform, ...(project.tools ?? [])].filter(Boolean).map((t) => <li key={t} className="rounded-full border border-border px-3 py-1 text-sm">{t}</li>)}</ul>
        </section>
      ) : null}
      {project.outcomes?.length ? <section id={`cs-results-${project.id}`} data-cs="results" className="scroll-mt-24"><H className="eyebrow mb-3 text-primary">Project outcomes</H><List items={project.outcomes} /></section> : null}
      <section><H className="eyebrow mb-3 text-primary">Focus areas</H>
        <ul className="flex flex-wrap gap-2">{project.tags.map((t) => <li key={t} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">{t}</li>)}</ul>
      </section>
    </>
  );
}

const galleryOf = (p: Project) => [...(p.images ?? []), ...(p.gallery ?? [])];

export function CaseStudyCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <article onClick={(e) => { if (!(e.target as HTMLElement).closest("summary, a, details > div")) onOpen(); }}
      className="group flex cursor-pointer flex-col rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary md:p-6">
      <div className="overflow-hidden rounded-xl"><ProjectCover project={project} index={index} /></div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="eyebrow text-primary">Project {pad(index)}</span>
        {project.platform && <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{project.platform}</span>}
      </div>
      <h3 className="display mt-4 text-3xl">{project.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
      <p className="mt-4 flex-1 leading-relaxed text-foreground/80">{project.overview}</p>
      <details>
        <summary onClick={(e) => { e.preventDefault(); onOpen(); }} aria-label={`View case study: ${project.title}`}
          className="eyebrow mt-6 inline-flex cursor-pointer list-none items-center gap-2 border-b border-primary pb-1 text-primary [&::-webkit-details-marker]:hidden">
          View case study <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </summary>
        <div className="mt-6 space-y-6 text-foreground/85"><p className="display text-xl">{project.caseTitle ?? project.title}</p><CaseStudyBody project={project} H="h4" /></div>
      </details>
    </article>
  );
}

function Lightbox({ img, onClose }: { img: { src: string; alt: string }; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  useDialogFocus(true, panel, onClose);
  return (
    <div ref={panel} role="dialog" aria-modal="true" aria-label={img.alt} onClick={(e) => { e.stopPropagation(); onClose(); }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-plum/90 p-4">
      <button type="button" onClick={onClose} aria-label="Close image" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-background"><X size={18} /></button>
      <img src={img.src} alt={img.alt} onClick={(e) => e.stopPropagation()} className="max-h-[90dvh] max-w-full rounded-xl object-contain" />
    </div>
  );
}

export function CaseStudyModal({ project, index, onClose, onBook, onService }: { project: Project; index: number; onClose: () => void; onBook: () => void; onService: (i: number) => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const [current, setCurrent] = useState("overview");
  useDialogFocus(!zoom, panel, onClose);
  const gallery = galleryOf(project);
  const nav = [
    { key: "overview", label: "Overview" },
    ...(project.contribution || project.role || project.services?.length || project.workCompleted?.length ? [{ key: "scope", label: "Scope of Work" }] : []),
    ...(gallery.length ? [{ key: "gallery", label: "Gallery" }] : []),
    ...(project.outcomes?.length ? [{ key: "results", label: "Results" }] : []),
  ];
  const go = (key: string) => scroller.current?.querySelector(`[data-cs="${key}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const onScroll = () => {
    const el = scroller.current; if (!el) return;
    const top = el.getBoundingClientRect().top + 120;
    let active = nav[0]!.key;
    el.querySelectorAll<HTMLElement>("[data-cs]").forEach((s) => { if (s.getBoundingClientRect().top <= top) active = s.dataset.cs!; });
    setCurrent(active);
  };
  const related = (project.relatedServices ?? []).map((i) => ({ i, s: services[i] })).filter((x) => x.s);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-plum/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose} role="presentation">
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(e) => e.stopPropagation()}
        className="flex h-[100dvh] w-full max-w-[1080px] flex-col overflow-hidden bg-muted shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-3xl">
        <div className="border-b border-border bg-background px-5 pt-4 md:px-12">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow text-primary">Case study {pad(index)} · {project.category}</p>
            <button type="button" onClick={onClose} aria-label="Close case study" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground"><X size={18} /></button>
          </div>
          <nav aria-label="Case study sections" className="-mx-5 flex gap-1 overflow-x-auto px-5 pt-2 md:mx-0 md:px-0">
            {nav.map((n) => (
              <button key={n.key} type="button" onClick={() => go(n.key)} aria-current={current === n.key ? "true" : undefined}
                className={cn("min-h-11 shrink-0 border-b-2 px-3 text-sm transition-colors", current === n.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary")}>{n.label}</button>
            ))}
          </nav>
        </div>
        <div ref={scroller} onScroll={onScroll} className="article-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 md:px-12 md:py-12">
          <p className="display text-6xl leading-none text-primary/20 md:text-8xl" aria-hidden>{pad(index)}</p>
          <h2 id="project-title" className="display mt-2 text-3xl leading-tight text-plum md:text-5xl">{project.caseTitle ?? project.title}</h2>
          <p className="mt-3 text-muted-foreground">{project.classification}{project.platform ? ` · ${project.platform}` : ""}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/85">{project.overview}</p>
          <div className="my-10 h-px bg-border" aria-hidden />
          <div className="space-y-10 text-foreground/85">
            <CaseStudyBody project={project} H="h3" />
            {gallery.length > 0 && (
              <section data-cs="gallery" className="scroll-mt-24">
                <h3 className="eyebrow mb-4 text-primary">Project gallery</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {gallery.map((im, i) => (
                    <button key={im.src} type="button" onClick={() => setZoom(im)} aria-label={`Enlarge image: ${im.alt}`} className={cn("overflow-hidden rounded-xl bg-background", gallery.length === 1 && "sm:col-span-2")}>
                      <img src={im.src} alt={im.alt} loading={i ? "lazy" : undefined} className="aspect-[16/10] w-full object-contain transition-transform duration-500 hover:scale-[1.02]" />
                    </button>
                  ))}
                </div>
              </section>
            )}
            {related.length > 0 && (
              <section>
                <h3 className="eyebrow mb-4 text-primary">Related services</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {related.map(({ i, s }) => (
                    <button key={i} type="button" onClick={() => onService(i)} className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-5 text-left transition-colors hover:border-primary">
                      <span className="display text-lg leading-snug">{s!.title}</span><ArrowRight size={16} className="shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="mt-12 rounded-2xl bg-secondary p-6 md:p-10">
            <h3 className="display text-3xl text-plum md:text-4xl">Have a Similar Project in Mind?</h3>
            <p className="mt-3 max-w-2xl text-foreground/80">Let's discuss your brand, your goals and how AURALIQUE can help create an e-commerce experience built for your next stage of growth.</p>
            <button type="button" onClick={onBook} className="btn-primary mt-6 w-full sm:w-auto">Book a strategy call <ArrowRight size={14} /></button>
          </div>
        </div>
      </div>
      {zoom && <Lightbox img={zoom} onClose={() => setZoom(null)} />}
    </div>
  );
}

export function SelectedWork({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All Projects");
  const [active, setActive] = useState<Project | null>(null);
  const [service, setService] = useState<number | null>(null);
  const visible = projects.filter((p) => filter === "All Projects" || p.category === filter);
  return (
    <section id="work" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 text-primary">Selected work</p>
            <h2 className="display text-4xl md:text-6xl">E-commerce Experiences. Across Industries.</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-muted-foreground md:col-span-5">Our experience spans different industries and e-commerce business models, from specialist beauty and personal-care stores to multi-category retail, fashion and lifestyle. Explore selected digital commerce experiences.</p>
        </div>
        <div role="group" aria-label="Filter projects" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {projectCategories.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}
              className={cn("min-h-11 shrink-0 rounded-full border px-5 text-sm transition-colors", filter === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary")}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {visible.map((p) => <CaseStudyCard key={p.id} project={p} index={projects.indexOf(p)} onOpen={() => setActive(p)} />)}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-secondary p-8 md:flex-row md:items-center md:p-12">
          <div className="max-w-xl">
            <h3 className="display text-3xl md:text-4xl">Have a Project in Mind?</h3>
            <p className="mt-3 text-muted-foreground">Let's explore the possibilities for your brand and create an e-commerce experience built around your ambitions.</p>
          </div>
          <button type="button" onClick={onOpenBooking} className="btn-primary shrink-0">Book a strategy call <ArrowRight size={14} /></button>
        </div>
      </div>
      {active && <CaseStudyModal project={active} index={projects.indexOf(active)} onClose={() => setActive(null)}
        onBook={() => { setActive(null); onOpenBooking(); }} onService={(i) => { setActive(null); setService(i); }} />}
      {service !== null && <ServiceDetailModal service={services[service]!} detail={serviceDetails[service]!} onClose={() => setService(null)} onBook={() => { setService(null); onOpenBooking(); }} />}
    </section>
  );
}
