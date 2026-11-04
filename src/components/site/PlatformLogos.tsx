import type { ReactNode } from "react";
import {
  siShopify, siMeta, siGoogle, siTiktok, siPinterest, siGoogleanalytics, siGooglesearchconsole, siClaude,
} from "simple-icons";

type SI = { path: string; hex: string };

const si = (i: SI) => (
  <svg viewBox="0 0 24 24" className="h-12 w-12" style={{ fill: `#${i.hex}` }} aria-hidden>
    <path d={i.path} />
  </svg>
);

// Brand marks not in the Simple Icons library, drawn as faithful SVGs on transparent backgrounds.
const amazon = (
  <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
    <path d="M6 26c10 7 26 8 36 1" fill="none" stroke="#FF9900" strokeWidth="4" strokeLinecap="round" />
    <path d="M36 22l7 4-4 7" fill="none" stroke="#FF9900" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const faire = (
  <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
    <circle cx="24" cy="24" r="22" fill="#333333" />
    <text x="24" y="33" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fill="#FFFFFF">F</text>
  </svg>
);
const klaviyo = (
  <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
    <path d="M6 13h36l-8 11 8 11H6z" fill="#232426" />
  </svg>
);
const merchant = (
  <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
    <path d="M8 18h32l-3 24H11z" fill="#4285F4" />
    <path d="M17 18v-4a7 7 0 0114 0v4" fill="none" stroke="#34A853" strokeWidth="4" />
    <circle cx="24" cy="30" r="5" fill="#FBBC04" />
  </svg>
);
const chatgpt = (
  <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <rect key={r} x="18" y="5" width="12" height="22" rx="6" fill="none" stroke="#111111" strokeWidth="3" transform={`rotate(${r} 24 24)`} />
    ))}
  </svg>
);

const platforms: [string, ReactNode][] = [
  ["Shopify", si(siShopify)], ["Amazon", amazon], ["Faire", faire], ["Klaviyo", klaviyo], ["Meta", si(siMeta)],
  ["Google", si(siGoogle)], ["TikTok", si(siTiktok)], ["Pinterest", si(siPinterest)],
  ["Google Analytics 4", si(siGoogleanalytics)], ["Google Merchant Center", merchant],
  ["Google Search Console", si(siGooglesearchconsole)], ["ChatGPT", chatgpt], ["Claude", si(siClaude)],
];

export function PlatformLogos() {
  return (
    <section aria-labelledby="ecosystem-title" className="border-b border-border bg-muted px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <p className="eyebrow mb-4 text-primary">Our ecosystem</p>
        <h2 id="ecosystem-title" className="display mx-auto max-w-3xl text-3xl md:text-5xl">Platforms &amp; tools we work with.</h2>
        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
          {platforms.map(([name, icon]) => (
            <li key={name} className="group flex flex-col items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center transition duration-300 group-hover:-translate-y-1 group-hover:scale-110">{icon}</span>
              <span className="text-sm font-medium text-foreground/80">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
