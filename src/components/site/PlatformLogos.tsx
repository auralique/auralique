import {
  siShopify, siMeta, siGoogle, siTiktok, siPinterest, siGoogleanalytics, siGooglesearchconsole,
} from "simple-icons";

type Icon = { path: string; hex: string; title: string };
type Platform = { name: string; icon?: Icon };

// Official brand marks from Simple Icons. Platforms without a verified mark
// (Amazon, Faire, Klaviyo, Merchant Center) render as clean text wordmarks.
const groups: { label: string; items: Platform[] }[] = [
  { label: "E-commerce & Wholesale", items: [{ name: "Shopify", icon: siShopify }, { name: "Amazon" }, { name: "Faire" }] },
  { label: "Advertising & Acquisition", items: [{ name: "Meta", icon: siMeta }, { name: "Google", icon: siGoogle }, { name: "TikTok", icon: siTiktok }, { name: "Pinterest", icon: siPinterest }] },
  { label: "Email, Analytics & Visibility", items: [{ name: "Klaviyo" }, { name: "Google Analytics 4", icon: siGoogleanalytics }, { name: "Google Merchant Center" }, { name: "Google Search Console", icon: siGooglesearchconsole }] },
];

function Logo({ p }: { p: Platform }) {
  return (
    <li className="flex shrink-0 items-center gap-3 opacity-80 transition duration-300 hover:scale-105 hover:opacity-100">
      {p.icon && (
        <svg role="img" aria-label={`${p.name} logo`} viewBox="0 0 24 24" className="h-7 w-7" style={{ fill: `#${p.icon.hex}` }}>
          <path d={p.icon.path} />
        </svg>
      )}
      <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-foreground">{p.name}</span>
    </li>
  );
}

export function PlatformLogos() {
  return (
    <section aria-labelledby="ecosystem-title" className="border-b border-border bg-muted px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 text-primary">Our ecosystem</p>
            <h2 id="ecosystem-title" className="display text-3xl md:text-5xl">Powered by the platforms that grow modern beauty brands.</h2>
          </div>
          <p className="self-end leading-relaxed text-muted-foreground md:col-span-5">
            We bring strategy, technology and marketing together across the platforms that help beauty and personal-care brands build, manage and scale their businesses.
          </p>
        </div>
        <div className="space-y-px">
          {groups.map((g) => (
            <div key={g.label} className="grid items-center gap-5 border-t border-border py-7 md:grid-cols-12">
              <p className="eyebrow text-primary md:col-span-3">{g.label}</p>
              <ul className="-mx-5 flex gap-12 overflow-x-auto px-5 [scrollbar-width:none] md:col-span-9 md:mx-0 md:flex-wrap md:gap-x-14 md:gap-y-6 md:overflow-visible md:px-0">
                {g.items.map((p) => <Logo key={p.name} p={p} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
