import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

function MarqueeCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex w-80 shrink-0 flex-col rounded-2xl border border-border bg-background p-6">
      <div className="flex gap-0.5 text-primary" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/85">“{t.text}”</p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <img
          src={t.portrait}
          alt={t.alt}
          width={40}
          height={40}
          loading="lazy"
          className="h-10 w-10 shrink-0 rounded-full border border-border object-cover grayscale"
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

export function ReviewMarquee() {
  const topRow = testimonials.slice(0, 10);
  const bottomRow = testimonials.slice(10);
  return (
    <section aria-label="Client reviews" className="space-y-5 overflow-hidden bg-muted py-16 md:py-20">
      <MarqueeRow items={topRow} />
      <MarqueeRow items={bottomRow} reverse />
    </section>
  );
}
