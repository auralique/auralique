// Selected Work records. Optional fields stay hidden until genuine, approved information is entered.
import juicyCover from "@/assets/projects/juicy-chemistry.jpg.asset.json";
import yazijicoCover from "@/assets/projects/yazijico.jpg.asset.json";
import bodyGloveCover from "@/assets/projects/body-glove.jpg.asset.json";
import digniteCover from "@/assets/projects/dignite-store.jpg.asset.json";

export type ProjectCategory = "Beauty & Personal Care" | "Multi-category Retail" | "Sports & Lifestyle" | "Fashion & Lifestyle";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  classification: string;
  overview: string;
  tags: string[];
  /** Only set when the platform has been verified. */
  platform?: string;
  /** Only set when the domain is confirmed by the owner. */
  url?: string;
  /** Approved screenshot URLs (add via lovable assets). */
  images?: { src: string; alt: string }[];
  role?: string;
  services?: string[];
  objectives?: string;
  workCompleted?: string[];
  tools?: string[];
  challenges?: string;
  approach?: string;
  outcomes?: string[];
  date?: string;
  client?: string;
  caseTitle?: string;
  caseOverview?: string;
  industry?: string[];
  /** AURALIQUE's confirmed contribution — leave empty until confirmed. */
  contribution?: string;
  /** Additional approved screenshots for the case-study gallery. */
  gallery?: { src: string; alt: string }[];
  /** Indices into `services` in content.ts for related-service discovery. */
  relatedServices?: number[];
  permissionToDisplay?: boolean;
};

export const projectCategories: ("All Projects" | ProjectCategory)[] = [
  "All Projects", "Beauty & Personal Care", "Multi-category Retail", "Sports & Lifestyle", "Fashion & Lifestyle",
];

export const projects: Project[] = [
  {
    id: "juicy-chemistry",
    caseTitle: "Juicy Chemistry — Beauty E-commerce Experience", caseOverview: "Juicy Chemistry is a beauty and personal-care retail experience focused on skincare, haircare and body-care products. Its storefront brings together product collections, product information and educational brand content to support product discovery.", industry: ["Skincare", "Haircare", "Beauty", "Personal Care"], relatedServices: [0, 1, 5], permissionToDisplay: true, title: "Juicy Chemistry", images: [{ src: juicyCover.url, alt: "Juicy Chemistry organic glow and brightening face wash" }], category: "Beauty & Personal Care",
    classification: "Beauty E-commerce Experience",
    overview: "An established beauty and personal-care commerce experience bringing skincare, haircare and body-care products together through structured product discovery, informative product presentation and an educational brand experience.",
    tags: ["Beauty E-commerce", "Skincare", "Haircare", "Product Discovery", "E-commerce Experience"],
    url: "https://juicychemistry.com/",
  },
  {
    id: "yazijico",
    caseTitle: "Yazijico — Multi-category Shopify E-commerce Experience", caseOverview: "Yazijico is a multi-category retail storefront bringing different product collections together within one shopping experience. Its catalogue spans areas such as beauty and health, fashion, home and garden, electronics, kitchen products and lifestyle essentials.", industry: ["E-commerce Retail", "Beauty & Health", "Fashion", "Home & Lifestyle"], relatedServices: [0, 4, 5], permissionToDisplay: true, title: "Yazijico", images: [{ src: yazijicoCover.url, alt: "Yazijico solid colour loose jumpsuit" }], category: "Multi-category Retail",
    classification: "Multi-category Shopify E-commerce Experience",
    overview: "A diverse e-commerce retail experience bringing multiple product categories into one storefront. The project provides an example of multi-category product organisation, collection navigation and online retail presentation.",
    tags: ["Shopify", "Multi-category Retail", "Product Catalogue", "Store Navigation", "E-commerce Experience"],
    platform: "Shopify", url: "https://yazijico.com/",
  },
  {
    id: "body-glove",
    caseTitle: "Body Glove — Sports & Lifestyle E-commerce Experience", caseOverview: "Body Glove is a sports and lifestyle retail experience featuring a broad catalogue of products across swimwear, wetsuits, apparel, watersports equipment, accessories and related lifestyle categories.", industry: ["Sports", "Swimwear", "Watersports", "Lifestyle Retail"], relatedServices: [0, 4, 2], permissionToDisplay: true, title: "Body Glove", images: [{ src: bodyGloveCover.url, alt: "Body Glove storefront banner" }], category: "Sports & Lifestyle",
    classification: "Sports & Lifestyle E-commerce Experience",
    overview: "A product-rich retail experience supporting a diverse sports and lifestyle catalogue. The storefront demonstrates the importance of structured navigation, product organisation and category-specific shopping journeys.",
    tags: ["Sports & Lifestyle", "E-commerce", "Product Catalogue", "Product Navigation", "Online Retail"],
    url: "https://www.bodyglove.com/",
  },
  {
    id: "dignite-store",
    caseTitle: "Dignite Store — Women's Fashion Shopify Experience", caseOverview: "Dignite Store is a women's fashion and lifestyle retail experience featuring apparel, dresses, accessories, jewellery and other fashion collections.", industry: ["Women's Fashion", "Apparel", "Accessories", "Lifestyle"], relatedServices: [0, 1, 3], permissionToDisplay: true, title: "Dignite Store", images: [{ src: digniteCover.url, alt: "Dignite Store strapless pleated long dress" }], category: "Fashion & Lifestyle",
    classification: "Women's Fashion & Lifestyle Shopify Store",
    overview: "A women's fashion and lifestyle storefront bringing together apparel, accessories and jewellery through a structured retail catalogue and customer-focused shopping experience.",
    tags: ["Shopify", "Fashion E-commerce", "Product Merchandising", "Lifestyle Retail", "Storefront Experience"],
    platform: "Shopify", url: "https://www.dignitestore.com/",
  },
];
