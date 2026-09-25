import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

/** schema.org JSON-LD generated from the central config and product data. */
export function StructuredData() {
  const url = siteConfig.url;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FoodEstablishment",
        "@id": `${url}/#business`,
        name: siteConfig.name,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        url,
        telephone: siteConfig.phoneHref.replace("tel:", ""),
        image: `${url}/opengraph-image`,
        servesCuisine: ["Sri Lankan", "Sri Lankan Tamil"],
        address: { "@type": "PostalAddress", addressCountry: "LK" },
        currenciesAccepted: siteConfig.currency,
        sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
        hasMenu: {
          "@type": "Menu",
          name: `${siteConfig.name} உணவுகள்`,
          hasMenuItem: products.map((p) => ({
            "@type": "MenuItem",
            name: p.name,
            description: p.description,
            image: `${url}${p.image}`,
            offers: p.variants.map((v) => ({
              "@type": "Offer",
              name: v.label,
              price: v.price,
              priceCurrency: siteConfig.currency,
            })),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: siteConfig.name,
        inLanguage: "ta",
        publisher: { "@id": `${url}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
