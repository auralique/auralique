import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/testimonials";

const INITIAL_COUNT = 6;

function Stars() {
  return (
    <div className="flex gap-1 text-primary" role="img" aria-label="Demonstration rating: five out of five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
      <div className="flex items-center justify-between">
        <Stars />
        <span className="eyebrow text-primary">{t.region}</span>
      </div>
      <p className="mt-6 flex-1 leading-relaxed text-foreground/85">“{t.text}”</p>
      <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
        <img
          src={t.portrait}
          alt={t.alt}
          width={56}
          height={56}
          loading="lazy"
          className="h-14 w-14 shrink-0 rounded-full border border-border object-cover grayscale"
        />
        <div>
          <p className="display text-lg leading-tight">{t.name}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{t.country}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t.service}</p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? testimonials : testimonials.slice(0, INITIAL_COUNT);

  return (
    <section id="reviews" className="bg-secondary px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 text-primary">Client experiences</p>
            <h2 className="display text-4xl md:text-6xl">Trusted by Brands. Built for Growth.</h2>
          </div>
          <div className="space-y-4 self-end md:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Discover how beauty and personal-care businesses experience a more strategic approach to e-commerce, branding and digital growth.
            </p>
            <p className="display italic text-foreground/70">Different markets. Different ambitions. One commitment to better growth.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="btn-primary"
          >
            {expanded ? (
              <>Show less <ChevronUp size={14} /></>
            ) : (
              <>View all reviews <ChevronDown size={14} /></>
            )}
          </button>
          <p className="max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
            Demonstration content: the names, portraits and reviews shown here are illustrative sample profiles,
            not verified AURALIQUE clients. They will be replaced with genuine customer reviews as they become available.
          </p>
        </div>
      </div>
    </section>
  );
}
