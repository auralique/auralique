import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

function MarqueeCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex w-80 shrink-0 flex-col rounded-2xl border border-border bg-background p-6 max-md:w-64 max-md:p-4">
      <div className="flex gap-0.5 text-primary" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/85 max-md:mt-3">“{t.text}”</p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4 max-md:mt-3 max-md:gap-2 max-md:pt-3">
        <img
          src={t.portrait}
          alt={t.alt}
          width={40}
          height={40}
          loading="lazy"
          className="h-10 w-10 shrink-0 rounded-full border border-border object-cover grayscale max-md:h-8 max-md:w-8"
        />
        <div className="min-w-0">
          <p className="display truncate text-base leading-tight">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.country}</p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={cn("marquee-track gap-5 pr-5", reverse && "marquee-reverse")}>
        {doubled.map((t, i) => (
          <MarqueeCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const topRow = testimonials.slice(0, 10);
  const bottomRow = testimonials.slice(10);

  return (
    <section id="reviews" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto mb-14 grid max-w-7xl gap-6 px-5 md:mb-20 md:grid-cols-12 md:px-8">
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
      <div className="space-y-5 overflow-hidden">
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground lg:hidden">Illustrative sample experiences — not verified client reviews.</p>
        <MarqueeRow items={topRow} />
        <MarqueeRow items={bottomRow} reverse />
      </div>
    </section>
  );
}
