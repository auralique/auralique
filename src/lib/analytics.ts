export type ConversionEvent = "strategy_call_click" | "contact_form_start" | "contact_form_submit" | "calendly_booking_completed" | "service_section_click" | "blog_article_open";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Only non-identifying, predefined labels may reach analytics.
export function trackEvent(event: ConversionEvent, labels?: { article_id?: string }) {
  if (typeof window === "undefined") return;
  if (window.gtag) window.gtag("event", event, labels ?? {});
  else if (window.dataLayer) window.dataLayer.push({ event, ...labels });
}

export function isConfirmedCalendlyMessage(origin: string, data: unknown, fromFrame: boolean): boolean {
  if (origin !== "https://calendly.com" || !fromFrame || !data || typeof data !== "object") return false;
  return "event" in data && data.event === "calendly.event_scheduled";
}