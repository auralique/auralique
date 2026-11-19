import { useLocation } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Plus, Mail, Instagram, Linkedin } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { BookingModal } from "@/components/site/BookingModal";
import { PlatformLogos } from "@/components/site/PlatformLogos";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Journal } from "@/components/site/Journal";
import { SelectedWork } from "@/components/site/SelectedWork";
import { ServicesGrid } from "@/components/site/ServicesSection";
import { Testimonials } from "@/components/site/Testimonials";
import {
  nav, principles, platforms, industries, services, benefits, process, engagements, faqs,
} from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import brandLogo from "@/assets/auralique-logo-white.png.asset.json";
import heroMotionVideo from "@/assets/videos/hero_beauty_motion.mp4.asset.json";

import { trackEvent } from "@/lib/analytics";

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

// TechBehemoths verification mark. The artwork is probed before it is shown, so
// a CDN outage or blocked request never leaves an empty chip in the footer.
function VerificationBadge() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setAvailable(true);
    probe.onerror = () => setAvailable(false);
    probe.src = siteConfig.techbehemothsBadge;
    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, []);
  if (!available) return null;
  return (
    <a
      href={siteConfig.techbehemoths}
      target="_blank"
      rel="noopener"
      data-techbehemoths-verification
      aria-label="AURALIQUE is verified on TechBehemoths"
      className="inline-flex items-center rounded-full bg-plum-foreground px-4 py-2 opacity-90 transition-opacity hover:opacity-100"
    >
      <img
        src={siteConfig.techbehemothsBadge}
        alt="TechBehemoths Verification"
        className="h-5 w-auto"
      />
    </a>
  );
}

export function HomePage() {
  // Content URLs make the popup title the page H1, so the hero steps down a level.
  const HeroHeading = useLocation({ select: (l) => /^\/(blog|services|work)\//.test(l.pathname) }) ? "p" : "h1";
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = useCallback(() => { trackEvent("strategy_call_click"); setBookingOpen(true); }, []);
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
              <HeroHeading className="display fade-up text-[13vw] leading-[0.95] md:text-[6.5rem]">
                We build.<br />We manage.<br /><em className="text-secondary">We grow.</em>
                <span className="mt-6 block text-2xl leading-snug md:text-4xl">Beauty and personal care brands.</span>
              </HeroHeading>
              <p className="display mt-10 text-2xl leading-snug md:text-3xl">
                The beauty eCommerce agency and Shopify growth partner for ambitious skincare, haircare, cosmetics and personal-care brands.
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
          <ServicesGrid onOpenBooking={openBooking} />
        </Section>

        {/* SELECTED WORK */}
        <SelectedWork onOpenBooking={openBooking} />

        {/* WHY */}
        <Section className="bg-plum text-plum-foreground">
          <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5 text-secondary">Why AURALIQUE</p>
              <h2 className="display text-4xl md:text-6xl">Why choose a full-service eCommerce agency.</h2>
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

        {/* JOURNAL */}
        <Journal />

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* FAQ */}
        <Section className="bg-muted">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-5 text-primary">FAQ</p>
              <h2 className="display text-4xl md:text-5xl">Beauty eCommerce agency FAQs.</h2>
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
              <img src={brandLogo.url} alt="AURALIQUE — Growth, Elevated." loading="lazy" className="mt-10 h-auto w-full max-w-[190px] md:max-w-[250px]" />
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
        <div className="mx-auto mt-12 flex max-w-7xl justify-center">
          <VerificationBadge />
        </div>
        <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-4 border-t border-plum-foreground/15 pt-6 text-xs text-plum-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} AURALIQUE. All rights reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-plum-foreground">Privacy Policy</a><a href="#" className="hover:text-plum-foreground">Terms of Service</a></div>
        </div>
      </footer>
    </>
  );
}
