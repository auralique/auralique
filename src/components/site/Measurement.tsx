import { useEffect } from "react";
import { measurementConfig } from "@/lib/measurement-config";

// Existing/future consent management can dispatch this event after opt-in.
// No script, cookie or tracking request is made before consent.
export function Measurement() {
  useEffect(() => {
    let script: HTMLScriptElement | undefined;
    const enable = () => {
      if (script) return;
      const ga = /^G-[A-Z0-9]+$/.test(measurementConfig.ga4Id) ? measurementConfig.ga4Id : "";
      const gtm = /^GTM-[A-Z0-9]+$/.test(measurementConfig.gtmId) ? measurementConfig.gtmId : "";
      if (!ga && !gtm) return;
      window.dataLayer = window.dataLayer ?? [];
      script = document.createElement("script");
      script.async = true;
      if (gtm) {
        window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
      } else {
        window.gtag = function (..._args: unknown[]) { window.dataLayer?.push(arguments); };
        window.gtag("js", new Date());
        window.gtag("config", ga);
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
      }
      document.head.appendChild(script);
    };
    window.addEventListener("auralique:analytics-consent", enable);
    return () => window.removeEventListener("auralique:analytics-consent", enable);
  }, []);
  return null;
}