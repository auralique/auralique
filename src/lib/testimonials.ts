import ingridSolberg from "@/assets/testimonials/ingrid-solberg.jpg";
import frejaLindstrom from "@/assets/testimonials/freja-lindstrom.jpg";
import elinaVirtanen from "@/assets/testimonials/elina-virtanen.jpg";
import matteoBellini from "@/assets/testimonials/matteo-bellini.jpg";
import luciaFernandez from "@/assets/testimonials/lucia-fernandez.jpg";
import camilleLaurent from "@/assets/testimonials/camille-laurent.jpg";
import oliviaWhitmore from "@/assets/testimonials/olivia-whitmore.jpg";
import amaraKensington from "@/assets/testimonials/amara-kensington.jpg";
import sophieTremblay from "@/assets/testimonials/sophie-tremblay.jpg";
import gabrielleDesrochers from "@/assets/testimonials/gabrielle-desrochers.jpg";
import madisonBrooks from "@/assets/testimonials/madison-brooks.jpg";
import isabellaMontgomery from "@/assets/testimonials/isabella-montgomery.jpg";
import valentinaRojas from "@/assets/testimonials/valentina-rojas.jpg";
import marianaOliveira from "@/assets/testimonials/mariana-oliveira.jpg";
import catalinaHerrera from "@/assets/testimonials/catalina-herrera.jpg";
import meiLinChen from "@/assets/testimonials/mei-lin-chen.jpg";
import aikoTanaka from "@/assets/testimonials/aiko-tanaka.jpg";
import priyaMalhotra from "@/assets/testimonials/priya-malhotra.jpg";
import hanaPark from "@/assets/testimonials/hana-park.jpg";
import ananyaWijesinghe from "@/assets/testimonials/ananya-wijesinghe.jpg";

export interface Testimonial {
  name: string;
  country: string;
  region: string;
  service: string;
  text: string;
  portrait: string;
  alt: string;
}

/**
 * Illustrative demonstration profiles only — fictional names, portraits and
 * sample reviews. Replace entries with verified customer-submitted reviews
 * when genuine testimonials become available.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Ingrid Solberg",
    country: "Norway",
    region: "Northern Europe",
    service: "Shopify store development",
    text: "AURALIQUE rebuilt our Shopify store with a clarity we had never managed in-house. The structure finally makes sense, and the ongoing management means small issues get handled before they become problems.",
    portrait: ingridSolberg,
    alt: "Black and white portrait of Ingrid Solberg, a fictional demonstration reviewer from Norway",
  },
  {
    name: "Freja Lindström",
    country: "Sweden",
    region: "Northern Europe",
    service: "Email marketing & Klaviyo",
    text: "Our email flows were an afterthought until AURALIQUE took over. The Klaviyo automations they set up feel considered rather than aggressive, and the monthly reporting is genuinely easy to follow.",
    portrait: frejaLindstrom,
    alt: "Black and white portrait of Freja Lindström, a fictional demonstration reviewer from Sweden",
  },
  {
    name: "Elina Virtanen",
    country: "Finland",
    region: "Northern Europe",
    service: "E-commerce strategy",
    text: "What I appreciate most is the strategic thinking. Instead of chasing every trend, they helped us decide what not to do. That kind of honesty is rare.",
    portrait: elinaVirtanen,
    alt: "Black and white portrait of Elina Virtanen, a fictional demonstration reviewer from Finland",
  },
  {
    name: "Matteo Bellini",
    country: "Italy",
    region: "Southern Europe",
    service: "Amazon marketplace management",
    text: "Amazon felt impenetrable to us. AURALIQUE organised our listings, cleaned up the catalogue and now manages the account day to day. It is one less thing I worry about.",
    portrait: matteoBellini,
    alt: "Black and white portrait of Matteo Bellini, a fictional demonstration reviewer from Italy",
  },
  {
    name: "Lucía Fernández",
    country: "Spain",
    region: "Southern Europe",
    service: "Brand identity & packaging",
    text: "They translated the feeling of our products into a visual identity that actually looks like us. The packaging direction was thoughtful, not flashy.",
    portrait: luciaFernandez,
    alt: "Black and white portrait of Lucía Fernández, a fictional demonstration reviewer from Spain",
  },
  {
    name: "Camille Laurent",
    country: "France",
    region: "Southern Europe",
    service: "Meta advertising",
    text: "Our Meta campaigns used to be set-and-forget. Now they are structured, tested and explained to us in plain language. The creative guidance alone was worth it.",
    portrait: camilleLaurent,
    alt: "Black and white portrait of Camille Laurent, a fictional demonstration reviewer from France",
  },
  {
    name: "Olivia Whitmore",
    country: "United Kingdom",
    region: "United Kingdom",
    service: "Full-service management",
    text: "Having one partner across our store, advertising and email has simplified everything. Communication is calm and consistent, which I value more than big promises.",
    portrait: oliviaWhitmore,
    alt: "Black and white portrait of Olivia Whitmore, a fictional demonstration reviewer from the United Kingdom",
  },
  {
    name: "Amara Kensington",
    country: "United Kingdom",
    region: "United Kingdom",
    service: "Conversion rate optimization",
    text: "The conversion work was methodical — small, well-reasoned changes rather than a dramatic redesign. Each one was explained and measured before the next.",
    portrait: amaraKensington,
    alt: "Black and white portrait of Amara Kensington, a fictional demonstration reviewer from the United Kingdom",
  },
  {
    name: "Sophie Tremblay",
    country: "Canada",
    region: "North America",
    service: "Faire wholesale setup",
    text: "We had no idea where to start with wholesale. AURALIQUE set up our Faire presence properly and manages it alongside our retail store without confusing the two.",
    portrait: sophieTremblay,
    alt: "Black and white portrait of Sophie Tremblay, a fictional demonstration reviewer from Canada",
  },
  {
    name: "Gabrielle Desrochers",
    country: "Canada",
    region: "North America",
    service: "Google advertising",
    text: "Google Ads always felt like a black box. Their team made it understandable and keeps us informed without drowning us in dashboards.",
    portrait: gabrielleDesrochers,
    alt: "Black and white portrait of Gabrielle Desrochers, a fictional demonstration reviewer from Canada",
  },
  {
    name: "Madison Brooks",
    country: "United States",
    region: "North America",
    service: "TikTok advertising",
    text: "TikTok was intimidating for a brand like ours. They found a tone that works for the platform without making us feel like we were chasing a trend that did not fit.",
    portrait: madisonBrooks,
    alt: "Black and white portrait of Madison Brooks, a fictional demonstration reviewer from the United States",
  },
  {
    name: "Isabella Montgomery",
    country: "United States",
    region: "North America",
    service: "Shopify store management",
    text: "Responsive, organised and refreshingly straightforward. Store updates happen when they say they will, and questions get real answers.",
    portrait: isabellaMontgomery,
    alt: "Black and white portrait of Isabella Montgomery, a fictional demonstration reviewer from the United States",
  },
  {
    name: "Valentina Rojas",
    country: "Chile",
    region: "South America",
    service: "SEO & Google visibility",
    text: "The SEO work was slower than ads, exactly as they said it would be. I appreciated that they set expectations honestly from the very beginning.",
    portrait: valentinaRojas,
    alt: "Black and white portrait of Valentina Rojas, a fictional demonstration reviewer from Chile",
  },
  {
    name: "Mariana Oliveira",
    country: "Brazil",
    region: "South America",
    service: "Brand & store development",
    text: "From identity to store build, everything felt connected. It never seemed like separate services stitched together — it felt like one plan.",
    portrait: marianaOliveira,
    alt: "Black and white portrait of Mariana Oliveira, a fictional demonstration reviewer from Brazil",
  },
  {
    name: "Catalina Herrera",
    country: "Colombia",
    region: "South America",
    service: "Growth strategy",
    text: "They treat our small brand with the same seriousness I would expect for a much larger one. The quarterly planning sessions have changed how we think about growth.",
    portrait: catalinaHerrera,
    alt: "Black and white portrait of Catalina Herrera, a fictional demonstration reviewer from Colombia",
  },
  {
    name: "Mei Lin Chen",
    country: "Singapore",
    region: "Asia",
    service: "Multi-channel management",
    text: "Coordinating Shopify, Amazon and our ad channels used to take three different freelancers. Now it is one conversation.",
    portrait: meiLinChen,
    alt: "Black and white portrait of Mei Lin Chen, a fictional demonstration reviewer from Singapore",
  },
  {
    name: "Aiko Tanaka",
    country: "Japan",
    region: "Asia",
    service: "Email marketing",
    text: "The attention to detail in our email programme is excellent. Every campaign feels considered, and the design stays true to our brand.",
    portrait: aikoTanaka,
    alt: "Black and white portrait of Aiko Tanaka, a fictional demonstration reviewer from Japan",
  },
  {
    name: "Priya Malhotra",
    country: "India",
    region: "Asia",
    service: "Marketplace management",
    text: "Marketplace management is where they quietly excel. Our Amazon presence is finally consistent with the rest of the brand.",
    portrait: priyaMalhotra,
    alt: "Black and white portrait of Priya Malhotra, a fictional demonstration reviewer from India",
  },
  {
    name: "Hana Park",
    country: "South Korea",
    region: "Asia",
    service: "Creative & advertising",
    text: "The creative direction for our campaigns is beautiful without being generic. They understood the aesthetic side of beauty retail immediately.",
    portrait: hanaPark,
    alt: "Black and white portrait of Hana Park, a fictional demonstration reviewer from South Korea",
  },
  {
    name: "Ananya Wijesinghe",
    country: "Sri Lanka",
    region: "Asia",
    service: "Ongoing partnership",
    text: "What stands out is the consistency. Month after month, the work is careful, the communication is clear, and nothing feels rushed.",
    portrait: ananyaWijesinghe,
    alt: "Black and white portrait of Ananya Wijesinghe, a fictional demonstration reviewer from Sri Lanka",
  },
];
