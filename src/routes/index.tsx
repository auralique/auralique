import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Plus, Mail, Instagram, Linkedin } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { BookingModal } from "@/components/site/BookingModal";
import { PlatformLogos } from "@/components/site/PlatformLogos";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Journal } from "@/components/site/Journal";
import { Testimonials } from "@/components/site/Testimonials";
import {
  nav, principles, platforms, industries, services, benefits, process, engagements, portfolioCategories, faqs,
} from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import heroMotionVideo from "@/assets/videos/hero_beauty_motion.mp4.asset.json";
import { homepageTitle, homepageDescription, siteOrigin, structuredData } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const title = homepageTitle;
const description = homepageDescription;

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteOrigin}/` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${siteOrigin}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
  component: Index,
});

const pad = (n: number) => String(n + 1).padStart(2, "0");

function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("px-5 py-24 md:px-8 md:py-32", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Heading({ label, title, text, light }: { label?: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
      <div className="md:col-span-7">
        {label && <p className={cn("eyebrow mb-5", light ? "text-primary-foreground/80" : "text-primary")}>{label}</p>}
        <h2 className={cn("display text-4xl md:text-6xl", light ? "text-primary-foreground" : "text-foreground")}>{title}</h2>
      </div>
      {text && <p className={cn("self-end text-lg leading-relaxed md:col-span-5", light ? "text-primary-foreground/85" : "text-muted-foreground")}>{text}</p>}
    </div>
  );
}

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => { trackEvent("strategy_call_click"); setBookingOpen(true); };
  return (
    <>
      <Header onOpenBooking={openBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <main>
        {/* HERO */}
        <section id="home" className="relative overflow-hidden bg-primary px-5 pb-20 pt-20 text-primary-foreground md:px-8 md:pb-28 md:pt-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow fade-up mb-8 text-primary-foreground/80">Full-service e-commerce growth agency</p>
              <h1 className="display fade-up text-[13vw] leading-[0.95] md:text-[6.5rem]">
                We build.<br />We manage.<br /><em className="text-secondary">We grow.</em>
              </h1>
              <p className="display mt-10 text-2xl leading-snug md:text-3xl">
                Your beauty ecommerce agency and growth partner for ambitious skincare, haircare, cosmetics and personal-care brands.
              </p>
              <p className="mt-6 max-w-xl leading-relaxed text-primary-foreground/85">
                From beauty brand identity and Shopify store development to Amazon and Faire marketplace management, digital advertising and customer retention, AURALIQUE brings every part of your digital commerce growth together for brands internationally.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={openBooking} className="btn-inverse">Book a strategy call <ArrowRight size={16} /></button>
                <a href="#services" onClick={() => trackEvent("service_section_click")} className="btn-ghost-light">Explore our services</a>
              </div>
              <p className="eyebrow mt-16 flex flex-wrap gap-x-6 gap-y-2 text-primary-foreground/70">
                {["Strategy", "Commerce", "Creative", "Performance"].map((w, i) => (
                  <span key={w} className="flex items-center gap-6">{i > 0 && <span aria-hidden className="h-px w-8 bg-primary-foreground/40" />}{w}.</span>
                ))}
              </p>
            </div>
            <div className="fade-up lg:col-span-5">
              <figure className="relative overflow-hidden rounded-3xl border border-primary-foreground/25 shadow-2xl shadow-plum/30">
                <video
                  src={heroMotionVideo.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Animated illustration of beauty and skincare products"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="sr-only">Animated beauty and skincare product illustration</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <PlatformLogos />

        {/* ABOUT */}
        <Section id="about" className="bg-secondary">
          <Heading label="About AURALIQUE" title="More than an agency. Your growth partner." />
          <div className="grid gap-12 md:grid-cols-12">
            <div className="space-y-5 text-lg leading-relaxed text-foreground/85 md:col-span-6">
              <p>AURALIQUE is a premium full-service e-commerce growth and brand management agency helping beauty and personal-care businesses establish powerful digital identities, build effective online stores and scale their businesses across multiple sales channels.</p>
              <p>We combine strategic thinking, creative execution and performance-driven marketing to manage the essential parts of your digital commerce operation.</p>
              <p>Our mission is to make business growth simpler by bringing the right expertise, technology and strategy together under one partner.</p>
            </div>
            <ol className="md:col-span-5 md:col-start-8">
              {principles.map(([t, d], i) => (
                <li key={t} className="flex gap-6 border-t border-foreground/15 py-7 last:border-b">
                  <span className="display text-2xl text-primary">{pad(i)}</span>
                  <div><h3 className="display text-2xl">{t}</h3><p className="mt-1 text-muted-foreground">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* PLATFORMS */}
        <Section id="platforms">
          <Heading label="Platforms" title="One partner. Every growth channel." text="Shopify store management, Amazon marketplace management and Faire wholesale support — coordinated with the advertising, email and analytics channels your beauty brand needs." />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => (
              <article key={p.name} className="group bg-background p-8 transition-colors hover:bg-muted">
                <h3 className="display text-3xl tracking-wide text-primary">{p.name}</h3>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {p.items.map((it) => <li key={it} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{it}</li>)}
                </ul>
              </article>
            ))}
            <div className="flex flex-col justify-between bg-primary p-8 text-primary-foreground">
              <p className="display text-2xl">Need another channel?</p>
              <a href="#contact" className="eyebrow mt-6 inline-flex items-center gap-2">Let's talk <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </Section>

        {/* INDUSTRIES */}
        <Section className="bg-muted">
          <Heading label="Industries we serve" title="Built for beauty. Designed for growth." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map(([t, d], i) => (
              <article key={t} className="rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
                <span className="eyebrow text-primary">{pad(i)}</span>
                <h3 className="display mt-10 text-3xl">{t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* SERVICES */}
        <Section id="services">
          <Heading label="Services" title="Everything your brand needs to grow." text="From building your brand foundation to managing your marketing and optimizing your sales channels, AURALIQUE provides integrated solutions for every stage of digital commerce growth." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article key={s.title} className="group flex flex-col rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-primary hover:bg-secondary/40">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-primary">Service {pad(i)}</span>
                  <s.icon size={22} strokeWidth={1.4} className="text-primary transition-transform duration-300 group-hover:-rotate-6" />
                </div>
                <h3 className="display mt-8 text-[1.7rem] leading-tight">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
                <ul className="mt-6 grid gap-2 border-t border-border pt-6 text-sm text-foreground/80">
                  {s.items.map((it) => <li key={it}>— {it}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* WHY */}
        <Section className="bg-plum text-plum-foreground">
          <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5 text-secondary">Why AURALIQUE</p>
              <h2 className="display text-4xl md:text-6xl">Your business. One integrated growth partner.</h2>
            </div>
            <div className="space-y-4 self-end text-plum-foreground/80 md:col-span-5">
              <p>Managing an e-commerce business requires more than an attractive website or successful advertising campaign. It requires connected strategy, consistent execution and continuous optimization.</p>
              <p>AURALIQUE brings these essential capabilities together.</p>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-plum-foreground/15 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([t, d], i) => (
              <article key={t} className="bg-plum p-8 transition-colors hover:bg-primary">
                <span className="display text-3xl text-secondary">{pad(i)}</span>
                <h3 className="eyebrow mt-6 text-plum-foreground">{t}</h3>
                <p className="mt-3 text-plum-foreground/75">{d}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* PROCESS */}
        <Section id="process">
          <Heading label="Our process" title="A clear process. A stronger growth journey." text="Our ecommerce growth strategy connects discovery, channel planning, implementation and ongoing optimization around your brand's priorities." />
          <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-6">
            <span aria-hidden className="absolute left-[1.15rem] top-0 h-full w-px bg-border lg:left-0 lg:top-[1.15rem] lg:h-px lg:w-full" />
            {process.map(([t, d], i) => (
              <li key={t} className="relative flex gap-6 pb-10 lg:block lg:pb-0">
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{pad(i)}</span>
                <div className="lg:mt-8">
                  <h3 className="display text-2xl">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ENGAGEMENTS */}
        <Section className="bg-secondary">
          <Heading label="Engagement models" title="Solutions designed around your growth stage." text="Ecommerce management services tailored to your brand, channels and objectives — from launch foundations to ongoing multichannel growth." />
          <div className="grid gap-5 lg:grid-cols-3">
            {engagements.map((e, i) => (
              <article key={e.title} className={cn("flex flex-col rounded-2xl p-9 transition-transform duration-300 hover:-translate-y-1", i === 1 ? "bg-primary text-primary-foreground" : "bg-background")}>
                <span className={cn("eyebrow", i === 1 ? "text-secondary" : "text-primary")}>{pad(i)}</span>
                <h3 className="display mt-6 text-3xl">{e.title}</h3>
                <p className={cn("mt-2", i === 1 ? "text-primary-foreground/80" : "text-muted-foreground")}>{e.for}</p>
                <ul className={cn("mt-8 flex-1 space-y-2.5 border-t pt-6 text-sm", i === 1 ? "border-primary-foreground/25" : "border-border")}>
                  {e.items.map((it) => <li key={it}>— {it}</li>)}
                </ul>
                <button type="button" onClick={openBooking} className={cn("mt-10", i === 1 ? "btn-inverse" : "btn-primary")}>{e.cta} <ArrowRight size={14} /></button>
              </article>
            ))}
          </div>
        </Section>

        {/* PORTFOLIO */}
        <Section>
          <Heading label="Portfolio" title="Strategic thinking. Creative execution. Measurable growth." />
          <div className="grid gap-10 rounded-2xl border border-border p-10 md:grid-cols-2 md:p-14">
            <div>
              <h3 className="display text-4xl text-primary">Our portfolio is evolving.</h3>
              <p className="mt-4 max-w-md text-muted-foreground">We are building partnerships with ambitious beauty and personal-care brands. Contact us to discuss your next project.</p>
              <button type="button" onClick={openBooking} className="btn-primary mt-8">Discuss your project</button>
            </div>
            <ul className="flex flex-wrap content-start gap-2">
              {portfolioCategories.map((c) => <li key={c} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">{c}</li>)}
            </ul>
          </div>
        </Section>

        {/* JOURNAL */}
        <Journal />

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* FAQ */}
        <Section className="bg-muted">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-5 text-primary">FAQ</p>
              <h2 className="display text-4xl md:text-5xl">Frequently asked questions.</h2>
            </div>
            <div className="md:col-span-8">
              {faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-foreground/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                    {q}
                    <Plus size={18} className="shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 text-base text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" className="bg-primary text-primary-foreground">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5 text-primary-foreground/80">Contact</p>
              <h2 className="display text-5xl md:text-6xl">Ready to elevate your brand?</h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">Let's discuss your business, your growth objectives and how AURALIQUE can help you build, manage and scale your digital commerce operation.</p>
              <div className="mt-10 space-y-3 border-t border-primary-foreground/25 pt-8 text-primary-foreground/90">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:underline"><Mail size={16} /> {siteConfig.email}</a>
                <a href={siteConfig.instagram} className="flex items-center gap-3 hover:underline"><Instagram size={16} /> Instagram</a>
                <a href={siteConfig.linkedin} className="flex items-center gap-3 hover:underline"><Linkedin size={16} /> LinkedIn</a>
              </div>
            </div>
            <div className="lg:col-span-7"><EnquiryForm /></div>
          </div>
        </Section>
      </main>

      {/* FOOTER */}
      <footer className="bg-plum px-5 py-16 text-plum-foreground md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-3xl tracking-[0.18em]">AURALIQUE</p>
            <p className="display mt-2 text-xl italic text-secondary">Growth, Elevated.</p>
            <p className="mt-5 max-w-sm text-sm text-plum-foreground/70">A premium full-service e-commerce growth and brand management agency helping beauty and personal-care brands build, manage and scale.</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="eyebrow mb-4 text-secondary">Navigate</p>
            <ul className="space-y-2 text-sm text-plum-foreground/80">{nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-plum-foreground">{n.label}</a></li>)}</ul>
          </nav>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4 text-secondary">Services</p>
            <ul className="space-y-2 text-sm text-plum-foreground/80">{services.map((s) => <li key={s.short}><a href="#services" className="hover:text-plum-foreground">{s.short}</a></li>)}</ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-4 text-secondary">Connect</p>
            <ul className="space-y-2 text-sm text-plum-foreground/80">
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-plum-foreground">Email</a></li>
              <li><a href={siteConfig.instagram} className="hover:text-plum-foreground">Instagram</a></li>
              <li><a href={siteConfig.linkedin} className="hover:text-plum-foreground">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-4 border-t border-plum-foreground/15 pt-6 text-xs text-plum-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} AURALIQUE. All rights reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-plum-foreground">Privacy Policy</a><a href="#" className="hover:text-plum-foreground">Terms of Service</a></div>
        </div>
      </footer>
    </>
  );
}
