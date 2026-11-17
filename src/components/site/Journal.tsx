import { useCallback, useRef, useState } from "react";
import { ArrowRight, Clock, X } from "lucide-react";
import { journalArticles, type JournalArticle } from "@/lib/journal";
import { trackEvent } from "@/lib/analytics";
import { useDialogFocus } from "@/hooks/use-dialog-focus";
import { Button } from "@/components/ui/button";

function BlogCard({ article, index, onOpen }: { article: JournalArticle; index: number; onOpen: (a: JournalArticle) => void }) {
  return (
    <article onClick={(event) => { if (window.innerWidth < 768 && !(event.target as HTMLElement).closest('summary, a, button')) onOpen(article); }} className="journal-card group flex flex-col rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10 md:p-10">
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
      <details id={`article-${article.id}`}>
      <summary
        onClick={(event) => { event.preventDefault(); onOpen(article); }}
        className="eyebrow mt-8 inline-flex items-center gap-2 self-start border-t border-border pt-5 text-foreground transition-colors group-hover:text-primary"
        aria-label={`Read article: ${article.title}`}
      >
        Read Article
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </summary>
      <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
        {article.body.map((block, i) => block.type === "paragraph" ? <p key={i}>{block.text}</p> : block.type === "heading" ? <h4 key={i} className="display text-xl text-foreground">{block.text}</h4> : <ul key={i} className="list-disc pl-5">{block.items.map((item) => <li key={item.text}>{item.lead && <strong>{item.lead} </strong>}{item.text}</li>)}</ul>)}
        <p>{article.closing}</p>
        <ul className="flex flex-wrap gap-3">{article.related.map((l) => <li key={l.label}><a href={l.href} className="underline">{l.label}</a></li>)}</ul>
      </div>
      </details>
    </article>
  );
}

function BlogModal({ article, onClose }: { article: JournalArticle; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialogFocus(true, panelRef, onClose);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-plum/60 backdrop-blur-sm lg:items-center lg:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={article.title}
        onClick={(e) => e.stopPropagation()}
        className="mobile-dialog flex max-h-[92vh] w-full max-w-[850px] flex-col overflow-hidden rounded-t-3xl bg-muted shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border px-6 pb-6 pt-7 md:px-12 md:pt-10">
          <div>
            <p className="eyebrow text-primary">{article.category}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={13} aria-hidden /> {article.readingTime}
            </p>
          </div>
          <Button variant="outline" size="icon"
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="article-scroll min-h-0 overflow-y-auto px-6 py-8 md:px-12 md:py-10">
          <h2 className="display text-3xl leading-tight text-plum md:text-4xl">{article.title}</h2>
          <div className="my-8 h-px bg-border" aria-hidden />
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-foreground/85">
            {article.body.map((block, i) =>
              block.type === "paragraph" ? (
                <p key={i}>{block.text}</p>
              ) : block.type === "heading" ? (
                <h3 key={i} className="display pt-4 text-2xl leading-snug text-plum">{block.text}</h3>
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
          <nav aria-label="Related" className="mt-10 border-t border-border pt-6">
            <p className="eyebrow mb-4 text-primary">Continue exploring</p>
            <ul className="flex flex-wrap gap-2">
              {article.related.map((l) => (
                <li key={l.label}><a href={l.href} onClick={onClose} className="inline-flex min-h-11 items-center rounded-full bg-secondary px-4 py-2 text-sm text-plum transition-colors hover:bg-primary hover:text-primary-foreground">{l.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export function Journal() {
  const [selected, setSelected] = useState<JournalArticle | null>(null);
  const open = useCallback((a: JournalArticle) => { trackEvent("blog_article_open", { article_id: a.id }); setSelected(a); }, []);
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
