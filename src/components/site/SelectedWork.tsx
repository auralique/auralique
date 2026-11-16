import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
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

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary md:p-6">
      <ProjectCover project={project} index={index} />
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="eyebrow text-primary">Project {pad(index)}</span>
        {project.platform && <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{project.platform}</span>}
      </div>
      <h3 className="display mt-4 text-3xl">{project.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
      <p className="mt-4 flex-1 leading-relaxed text-foreground/80">{project.overview}</p>
      <button type="button" onClick={onOpen} className="eyebrow mt-6 inline-flex items-center gap-2 self-start border-b border-primary pb-1 text-primary">
        View project <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="border-t border-border pt-5"><p className="eyebrow mb-2 text-primary">{label}</p><div className="text-foreground/85">{children}</div></div>;
}
const List = ({ items }: { items: string[] }) => <ul className="space-y-1">{items.map((i) => <li key={i}>— {i}</li>)}</ul>;

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  useDialogFocus(true, panel, onClose);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-plum/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(e) => e.stopPropagation()}
        className="relative max-h-[94dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-background p-6 sm:rounded-3xl md:p-10">
        <button type="button" onClick={onClose} aria-label="Close project" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-border hover:border-primary"><X size={18} /></button>
        <p className="eyebrow text-primary">{project.category}</p>
        <h2 id="project-title" className="display mt-3 pr-12 text-4xl md:text-5xl">{project.title}</h2>
        <p className="mt-2 text-muted-foreground">{project.classification}</p>
        {project.images && project.images.length > 0 && (
          <div className="mt-6 grid gap-3">{project.images.map((im) => <img key={im.src} src={im.src} alt={im.alt} loading="lazy" className="max-h-[60vh] w-full rounded-xl bg-muted object-contain" />)}</div>
        )}
        <div className="mt-8 space-y-5">
          <Field label="Overview"><p className="leading-relaxed">{project.overview}</p></Field>
          {project.platform && <Field label="Platform">{project.platform}</Field>}
          {project.date && <Field label="Project date">{project.date}</Field>}
          {project.role && <Field label="AURALIQUE's role">{project.role}</Field>}
          {project.services?.length ? <Field label="Services delivered"><List items={project.services} /></Field> : null}
          {project.objectives && <Field label="Objectives">{project.objectives}</Field>}
          {project.workCompleted?.length ? <Field label="Work completed"><List items={project.workCompleted} /></Field> : null}
          {project.tools?.length ? <Field label="Platforms & tools"><List items={project.tools} /></Field> : null}
          {project.challenges && <Field label="Challenges">{project.challenges}</Field>}
          {project.approach && <Field label="Approach & execution">{project.approach}</Field>}
          {project.outcomes?.length ? <Field label="Verified outcomes"><List items={project.outcomes} /></Field> : null}
          <Field label="Focus areas">
            <ul className="flex flex-wrap gap-2">{project.tags.map((t) => <li key={t} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">{t}</li>)}</ul>
          </Field>
        </div>
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-10">Visit live website <ArrowUpRight size={14} /></a>
        )}
      </div>
    </div>
  );
}

export function SelectedWork({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All Projects");
  const [active, setActive] = useState<Project | null>(null);
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
          {visible.map((p) => <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} onOpen={() => setActive(p)} />)}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-secondary p-8 md:flex-row md:items-center md:p-12">
          <div className="max-w-xl">
            <h3 className="display text-3xl md:text-4xl">Have a Project in Mind?</h3>
            <p className="mt-3 text-muted-foreground">Let's explore the possibilities for your brand and create an e-commerce experience built around your ambitions.</p>
          </div>
          <button type="button" onClick={onOpenBooking} className="btn-primary shrink-0">Book a strategy call <ArrowRight size={14} /></button>
        </div>
      </div>
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
