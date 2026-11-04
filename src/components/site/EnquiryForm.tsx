import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { formOptions } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid business email").max(255),
  brand: z.string().trim().min(1, "Please enter your brand name").max(100),
  website: z.string().trim().max(255).refine((v) => v === "" || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+.*$/.test(v), "Please enter a valid URL"),
  industry: z.string({ required_error: "Please select an industry" }).min(1, "Please select an industry"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  budget: z.string({ required_error: "Please select a budget range" }).min(1, "Please select a budget range"),
  message: z.string().trim().min(10, "Tell us a little about your objectives").max(2000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;
type Status = "idle" | "sending" | "sent" | "not-configured" | "error";

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
              on ? "border-primary-foreground bg-primary-foreground text-primary" : "border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function EnquiryForm() {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd.entries()), platforms, services };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof Errors] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    if (!siteConfig.enquiryEndpoint) {
      setStatus("not-configured");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(siteConfig.enquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-lg border border-primary-foreground/30 bg-primary-foreground/5 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none transition focus:border-primary-foreground focus:bg-primary-foreground/10";
  const label = "eyebrow mb-2 block text-primary-foreground/80";
  const err = (k: keyof Errors) => errors[k] && <p className="mt-1.5 text-sm text-secondary">{errors[k]}</p>;

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-primary-foreground/30 p-10 text-primary-foreground" role="status">
        <CheckCircle2 className="mb-4" />
        <p className="display text-3xl">Thank you — your enquiry has been sent.</p>
        <p className="mt-3 text-primary-foreground/80">We'll be in touch shortly to arrange a conversation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div><label htmlFor="name" className={label}>Full name</label><input id="name" name="name" className={field} autoComplete="name" />{err("name")}</div>
      <div><label htmlFor="email" className={label}>Business email</label><input id="email" name="email" type="email" className={field} autoComplete="email" />{err("email")}</div>
      <div><label htmlFor="brand" className={label}>Brand name</label><input id="brand" name="brand" className={field} />{err("brand")}</div>
      <div><label htmlFor="website" className={label}>Website URL</label><input id="website" name="website" placeholder="yourbrand.com" className={field} />{err("website")}</div>
      <div>
        <label htmlFor="industry" className={label}>Industry</label>
        <select id="industry" name="industry" defaultValue="" className={cn(field, "[&>option]:text-foreground")}>
          <option value="" disabled>Select industry</option>
          {formOptions.industries.map((o) => <option key={o}>{o}</option>)}
        </select>{err("industry")}
      </div>
      <div>
        <label htmlFor="budget" className={label}>Monthly marketing budget</label>
        <select id="budget" name="budget" defaultValue="" className={cn(field, "[&>option]:text-foreground")}>
          <option value="" disabled>Select range</option>
          {formOptions.budgets.map((o) => <option key={o}>{o}</option>)}
        </select>{err("budget")}
      </div>
      <div className="sm:col-span-2"><span id="platforms-label" className={label}>Current platforms</span><Chips name="platforms" options={formOptions.platforms} value={platforms} onChange={setPlatforms} />{err("platforms")}</div>
      <div className="sm:col-span-2"><span id="services-label" className={label}>Services required</span><Chips name="services" options={formOptions.services} value={services} onChange={setServices} />{err("services")}</div>
      <div className="sm:col-span-2"><label htmlFor="message" className={label}>Message / business objectives</label><textarea id="message" name="message" rows={5} className={field} />{err("message")}</div>
      <div className="flex flex-col gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-inverse w-full sm:w-auto sm:self-start">
          {status === "sending" && <Loader2 className="animate-spin" size={16} />} Send your enquiry
        </button>
        {status === "not-configured" && (
          <p role="status" className="flex gap-2 text-sm text-primary-foreground/90">
            <AlertCircle size={18} className="shrink-0" />
            Your details are valid, but online enquiries aren't connected yet, so this message was not sent. Please email us at {siteConfig.email}.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="flex gap-2 text-sm text-primary-foreground/90"><AlertCircle size={18} className="shrink-0" />Something went wrong sending your enquiry. Please try again or email {siteConfig.email}.</p>
        )}
      </div>
    </form>
  );
}
