// Selected Work records. Optional fields stay hidden until genuine, approved information is entered.
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
};

export const projectCategories: ("All Projects" | ProjectCategory)[] = [
  "All Projects", "Beauty & Personal Care", "Multi-category Retail", "Sports & Lifestyle", "Fashion & Lifestyle",
];

export const projects: Project[] = [
  {
    id: "juicy-chemistry", title: "Juicy Chemistry", category: "Beauty & Personal Care",
    classification: "Beauty E-commerce Experience",
    overview: "An established beauty and personal-care commerce experience bringing skincare, haircare and body-care products together through structured product discovery, informative product presentation and an educational brand experience.",
    tags: ["Beauty E-commerce", "Skincare", "Haircare", "Product Discovery", "E-commerce Experience"],
    // url pending owner confirmation of domain
  },
  {
    id: "yazijico", title: "Yazijico", category: "Multi-category Retail",
    classification: "Multi-category Shopify E-commerce Experience",
    overview: "A diverse e-commerce retail experience bringing multiple product categories into one storefront. The project provides an example of multi-category product organisation, collection navigation and online retail presentation.",
    tags: ["Shopify", "Multi-category Retail", "Product Catalogue", "Store Navigation", "E-commerce Experience"],
    platform: "Shopify", url: "https://yazijico.com/",
  },
  {
    id: "body-glove", title: "Body Glove", category: "Sports & Lifestyle",
    classification: "Sports & Lifestyle E-commerce Experience",
    overview: "A product-rich retail experience supporting a diverse sports and lifestyle catalogue. The storefront demonstrates the importance of structured navigation, product organisation and category-specific shopping journeys.",
    tags: ["Sports & Lifestyle", "E-commerce", "Product Catalogue", "Product Navigation", "Online Retail"],
    url: "https://www.bodyglove.com/",
  },
  {
    id: "dignite-store", title: "Dignite Store", category: "Fashion & Lifestyle",
    classification: "Women's Fashion & Lifestyle Shopify Store",
    overview: "A women's fashion and lifestyle storefront bringing together apparel, accessories and jewellery through a structured retail catalogue and customer-focused shopping experience.",
    tags: ["Shopify", "Fashion E-commerce", "Product Merchandising", "Lifestyle Retail", "Storefront Experience"],
    platform: "Shopify", url: "https://www.dignitestore.com/",
  },
];
