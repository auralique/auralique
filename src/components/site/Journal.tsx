import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, X } from "lucide-react";
import { journalArticles, type JournalArticle } from "@/lib/journal";

function BlogCard({ article, index, onOpen }: { article: JournalArticle; index: number; onOpen: (a: JournalArticle) => void }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow text-primary">{article.category}</span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={13} aria-hidden /> {article.readingTime}
        </span>
      </div>
      <h3 className="display mt-6 text-2xl leading-snug md:text-[1.75rem]">
        <span className="mr-2 text-sm text-primary/70 align-middle">{String(index + 1).padStart(2, "0")}</span>
        {article.title}
      </h3>
      <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{article.excerpt}</p>
      <button
        type="button"
        onClick={() => onOpen(article)}
        className="eyebrow mt-8 inline-flex items-center gap-2 self-start border-t border-border pt-5 text-foreground transition-colors group-hover:text-primary"
        aria-label={`Read article: ${article.title}`}
      >
        Read Article
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </article>
  );
}

function BlogModal({ article, onClose }: { article: JournalArticle; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-plum/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={article.title}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-[850px] flex-col overflow-hidden rounded-t-3xl bg-muted shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border px-6 pb-6 pt-7 md:px-12 md:pt-10">
          <div>
            <p className="eyebrow text-primary">{article.category}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={13} aria-hidden /> {article.readingTime}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-8 md:px-12 md:py-10">
          <h2 className="display text-3xl leading-tight text-plum md:text-4xl">{article.title}</h2>
          <div className="my-8 h-px bg-border" aria-hidden />
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-foreground/85">
            {article.body.map((block, i) =>
              block.type === "paragraph" ? (
                <p key={i}>{block.text}</p>
              ) : (
                <ul key={i} className="space-y-2.5 rounded-xl border border-border bg-background p-6">
                  {block.items.map((item) => (
                    <li key={item.text} className="flex gap-3 text-base">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>
                        {item.lead && <strong className="font-semibold text-plum">{item.lead} </strong>}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
          <p className="display mt-10 border-l-2 border-primary pl-5 text-xl italic text-plum md:text-2xl">
            “{article.closing}”
          </p>
        </div>
      </div>
    </div>
  );
}

export function Journal() {
  const [selected, setSelected] = useState<JournalArticle | null>(null);
  const open = useCallback((a: JournalArticle) => setSelected(a), []);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="journal" className="bg-secondary px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 text-primary">The Journal</p>
            <h2 className="display text-4xl text-foreground md:text-6xl">Insights for Brands Ready to Grow.</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-muted-foreground md:col-span-5">
            Expert perspectives, practical strategies and industry insights to help beauty and personal-care brands build stronger brands, smarter e-commerce experiences and sustainable growth.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {journalArticles.map((article, i) => (
            <BlogCard key={article.id} article={article} index={i} onOpen={open} />
          ))}
        </div>
      </div>

      {selected && <BlogModal article={selected} onClose={close} />}
    </section>
  );
}
