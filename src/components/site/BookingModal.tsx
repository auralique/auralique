import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { X, ArrowLeft, ArrowRight, Loader2, CalendarCheck, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Stage = "select" | "step1" | "step2" | "calendly" | "confirmed";

const step1Schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid business email").max(255),
  brand: z.string().trim().min(1, "Please enter your brand or company name").max(100),
  website: z.string().trim().max(255).refine((v) => v === "" || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+.*$/.test(v), "Please enter a valid URL"),
});

const step2Schema = z.object({
  platforms: z.array(z.string()).min(1, "Select at least one option"),
  services: z.array(z.string()).min(1, "Select at least one option"),
  goal: z.string().min(1, "Please select your main goal"),
  revenue: z.string().min(1, "Please select a revenue range"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().trim().max(2000),
});

type Enquiry = z.infer<typeof step1Schema> & z.infer<typeof step2Schema>;
type Errors = Partial<Record<string, string>>;

const platformOptions = ["Shopify", "Amazon", "Faire", "Other", "Not launched yet"];
const serviceOptions = [
  "Shopify Design & Development", "Conversion Rate Optimization", "Email Marketing & Retention",
  "Branding & Creative", "Paid Advertising & Marketing", "Amazon Marketplace Management",
  "Faire Wholesale Growth", "E-commerce Management", "Other",
];
const goalOptions = [
  "Launch a new beauty or personal-care brand", "Improve my existing online store",
  "Increase sales and conversions", "Grow on Amazon", "Expand into wholesale",
  "Improve customer retention", "Build a stronger brand identity",
  "Scale across multiple platforms", "Other",
];
const revenueOptions = ["Pre-launch", "Under $5,000", "$5,000–$10,000", "$10,000–$25,000", "$25,000–$50,000", "$50,000–$100,000", "$100,000+"];
const budgetOptions = ["Not yet determined", "Under $1,000", "$1,000–$3,000", "$3,000–$5,000", "$5,000–$10,000", "$10,000+"];

const field = "w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary";
const label = "eyebrow mb-2 block text-foreground/80";

function Chips({ name, options, value, onChange }: { name: string; options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-labelledby={`${name}-label`}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            type="button"
            key={o}
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              on ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/80 hover:border-primary",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Progress({ step }: { step: 1 | 2 }) {
  return (
    <div className="mb-8">
      <p className="eyebrow mb-3 text-primary">Step {step} of 2</p>
      <div className="flex gap-2" aria-hidden>
        <span className="h-1 flex-1 rounded-full bg-primary" />
        <span className={cn("h-1 flex-1 rounded-full", step === 2 ? "bg-primary" : "bg-border")} />
      </div>
    </div>
  );
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [stage, setStage] = useState<Stage>("select");
  const [errors, setErrors] = useState<Errors>({});
  const [enquiry, setEnquiry] = useState<Enquiry>({
    name: "", email: "", brand: "", website: "",
    platforms: [], services: [], goal: "", revenue: "", budget: "", message: "",
  });
  const [calendlyState, setCalendlyState] = useState<"loading" | "loaded" | "error">("loading");
  const [booking, setBooking] = useState<{ date: string; time: string; timezone: string } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Reset & focus when opened; lock body scroll
  useEffect(() => {
    if (!open) return;
    setStage("select");
    setErrors({});
    setCalendlyState("loading");
    setBooking(null);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Listen for Calendly booking confirmation
  useEffect(() => {
    if (!open || stage !== "calendly") return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_scheduled") {
        const start = e.data?.payload?.event?.start_time as string | undefined;
        let date = "", time = "", timezone = "";
        if (start) {
          const d = new Date(start);
          timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          date = d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
          time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
        }
        setBooking({ date, time, timezone });
        setStage("confirmed");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, stage]);

  if (!open) return null;

  const err = (k: string) => errors[k] && <p className="mt-1.5 text-sm text-primary">{errors[k]}</p>;

  function submitStep1(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { name: fd.get("name"), email: fd.get("email"), brand: fd.get("brand"), website: fd.get("website") };
    const parsed = step1Schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as string] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setEnquiry((p) => ({ ...p, ...parsed.data }));
    setStage("step2");
  }

  function submitStep2(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      platforms: enquiry.platforms, services: enquiry.services,
      goal: enquiry.goal, revenue: enquiry.revenue, budget: enquiry.budget, message: enquiry.message,
    };
    const parsed = step2Schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as string] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    // Enquiry data is preserved in state, ready for a CRM/database integration.
    setCalendlyState("loading");
    setStage("calendly");
  }

  const calendlyUrl = (() => {
    const u = new URL(siteConfig.calendlyUrl);
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("hide_event_type_details", "1");
    u.searchParams.set("primary_color", "aa5e7a");
    if (enquiry.name) u.searchParams.set("name", enquiry.name);
    if (enquiry.email) u.searchParams.set("email", enquiry.email);
    return u.toString();
  })();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-plum/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Book a strategy call"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        className={cn(
          "relative max-h-[92vh] w-full overflow-y-auto rounded-2xl bg-background shadow-2xl",
          stage === "calendly" ? "max-w-4xl" : "max-w-2xl",
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close booking"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <X size={18} />
        </button>

        {/* STAGE: SELECT */}
        {stage === "select" && (
          <div className="p-8 md:p-12">
            <h2 className="display pr-10 text-3xl md:text-4xl">Choose How You Want to Work With Us</h2>
            <p className="mt-3 text-muted-foreground">Not every project needs a call. Choose the option that best fits your brand, goals, and business needs.</p>
            <div className="mt-10 rounded-2xl border border-border p-8 transition-colors hover:border-primary">
              <p className="eyebrow text-primary">01 / A conversation</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="display text-2xl md:text-3xl">Schedule a Strategy Call</h3>
                <span className="eyebrow rounded-full border border-primary px-4 py-1.5 text-primary">FREE</span>
              </div>
              <p className="mt-3 text-muted-foreground">Discuss your eCommerce store, current challenges, business goals, and opportunities for growth with the AURALIQUE team.</p>
              <button type="button" onClick={() => setStage("step1")} className="btn-primary mt-8">
                Schedule a strategy call <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STAGE: STEP 1 */}
        {stage === "step1" && (
          <form onSubmit={submitStep1} noValidate className="p-8 md:p-12">
            <Progress step={1} />
            <h2 className="display text-3xl md:text-4xl">Let's Build Something Great.</h2>
            <p className="mt-3 text-muted-foreground">Tell us a little about your brand so we can make our conversation as valuable as possible.</p>
            <div className="mt-8 grid gap-5">
              <div>
                <label htmlFor="bk-name" className={label}>Full name *</label>
                <input id="bk-name" name="name" defaultValue={enquiry.name} className={field} autoComplete="name" />
                {err("name")}
              </div>
              <div>
                <label htmlFor="bk-email" className={label}>Business email *</label>
                <input id="bk-email" name="email" type="email" defaultValue={enquiry.email} className={field} autoComplete="email" />
                {err("email")}
              </div>
              <div>
                <label htmlFor="bk-brand" className={label}>Brand or company name *</label>
                <input id="bk-brand" name="brand" defaultValue={enquiry.brand} className={field} />
                {err("brand")}
              </div>
              <div>
                <label htmlFor="bk-website" className={label}>Website URL (optional)</label>
                <input id="bk-website" name="website" defaultValue={enquiry.website} placeholder="yourbrand.com" className={field} />
                {err("website")}
              </div>
            </div>
            <div className="mt-10 flex items-center justify-between gap-4">
              <button type="button" onClick={() => setStage("select")} className="eyebrow inline-flex items-center gap-2 text-foreground/70 hover:text-primary">
                <ArrowLeft size={14} /> Back
              </button>
              <button type="submit" className="btn-primary">Continue <ArrowRight size={14} /></button>
            </div>
          </form>
        )}

        {/* STAGE: STEP 2 */}
        {stage === "step2" && (
          <form onSubmit={submitStep2} noValidate className="p-8 md:p-12">
            <Progress step={2} />
            <h2 className="display text-3xl md:text-4xl">Tell Us About Your Project</h2>
            <p className="mt-3 text-muted-foreground">Help us understand your business, current platforms and growth objectives.</p>
            <div className="mt-8 grid gap-7">
              <div>
                <span id="bk-platforms-label" className={label}>Which platforms are you currently using? *</span>
                <Chips name="bk-platforms" options={platformOptions} value={enquiry.platforms} onChange={(v) => setEnquiry((p) => ({ ...p, platforms: v }))} />
                {err("platforms")}
              </div>
              <div>
                <span id="bk-services-label" className={label}>What do you need help with? *</span>
                <Chips name="bk-services" options={serviceOptions} value={enquiry.services} onChange={(v) => setEnquiry((p) => ({ ...p, services: v }))} />
                {err("services")}
              </div>
              <div>
                <label htmlFor="bk-goal" className={label}>What is your main goal? *</label>
                <select id="bk-goal" value={enquiry.goal} onChange={(e) => setEnquiry((p) => ({ ...p, goal: e.target.value }))} className={field}>
                  <option value="" disabled>Select your main goal</option>
                  {goalOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
                {err("goal")}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-revenue" className={label}>Approximate monthly eCommerce revenue *</label>
                  <select id="bk-revenue" value={enquiry.revenue} onChange={(e) => setEnquiry((p) => ({ ...p, revenue: e.target.value }))} className={field}>
                    <option value="" disabled>Select range</option>
                    {revenueOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  {err("revenue")}
                </div>
                <div>
                  <label htmlFor="bk-budget" className={label}>Estimated project budget *</label>
                  <select id="bk-budget" value={enquiry.budget} onChange={(e) => setEnquiry((p) => ({ ...p, budget: e.target.value }))} className={field}>
                    <option value="" disabled>Select range</option>
                    {budgetOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  {err("budget")}
                </div>
              </div>
              <div>
                <label htmlFor="bk-message" className={label}>Tell us more about your project (optional)</label>
                <textarea
                  id="bk-message"
                  rows={4}
                  value={enquiry.message}
                  onChange={(e) => setEnquiry((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Describe your brand, challenges, and what you would like to achieve."
                  className={field}
                />
                {err("message")}
              </div>
            </div>
            <div className="mt-10 flex items-center justify-between gap-4">
              <button type="button" onClick={() => setStage("step1")} className="eyebrow inline-flex items-center gap-2 text-foreground/70 hover:text-primary">
                <ArrowLeft size={14} /> Back
              </button>
              <button type="submit" className="btn-primary">Continue to booking <ArrowRight size={14} /></button>
            </div>
          </form>
        )}

        {/* STAGE: CALENDLY */}
        {stage === "calendly" && (
          <div className="p-6 md:p-10">
            <h2 className="display pr-10 text-3xl md:text-4xl">Schedule Your Strategy Call</h2>
            <p className="mt-3 text-muted-foreground">You're one step closer to building something great. Choose a convenient date and time for your conversation with AURALIQUE.</p>
            <div className="relative mt-8 min-h-[560px] overflow-hidden rounded-2xl border border-border">
              {calendlyState === "loading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground" role="status">
                  <Loader2 className="animate-spin text-primary" size={28} />
                  <p className="text-sm">Loading the booking calendar…</p>
                </div>
              )}
              {calendlyState === "error" ? (
                <div className="flex min-h-[560px] flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="display text-2xl">Having trouble viewing the booking calendar?</p>
                  <a href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Open Calendly <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <iframe
                  src={calendlyUrl}
                  title="Calendly scheduling — book your AURALIQUE strategy call"
                  className="h-[640px] w-full border-0"
                  onLoad={() => setCalendlyState("loaded")}
                  onError={() => setCalendlyState("error")}
                />
              )}
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <button type="button" onClick={() => setStage("step2")} className="eyebrow inline-flex items-center gap-2 text-foreground/70 hover:text-primary">
                <ArrowLeft size={14} /> Back
              </button>
              <a href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer" className="eyebrow inline-flex items-center gap-2 text-foreground/70 hover:text-primary">
                Open in a new tab <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {/* STAGE: CONFIRMED */}
        {stage === "confirmed" && (
          <div className="p-8 text-center md:p-14">
            <CalendarCheck className="mx-auto text-primary" size={48} strokeWidth={1.4} />
            <h2 className="display mt-6 text-3xl md:text-4xl">Your Strategy Call Is Booked!</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Thank you for choosing AURALIQUE. We're looking forward to learning more about your brand and exploring how we can help you grow.
            </p>
            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-border p-6 text-left">
              <p className="eyebrow text-primary">Appointment</p>
              <p className="mt-3 text-lg font-semibold">{enquiry.name}</p>
              {booking?.date && <p className="mt-1 text-foreground/80">{booking.date}</p>}
              {booking?.time && <p className="text-foreground/80">{booking.time}{booking.timezone ? ` (${booking.timezone})` : ""}</p>}
              <p className="mt-3 text-sm text-muted-foreground">A calendar invitation has been sent to {enquiry.email}.</p>
            </div>
            <button type="button" onClick={onClose} className="btn-primary mt-10">Back to website</button>
          </div>
        )}
      </div>
    </div>
  );
}
