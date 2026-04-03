import { getSiteContent } from "@/lib/constants";

export default async function JsonLdScript() {
  const { brand, businessHours } = await getSiteContent();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://velvetbrowstudio.com";

  const openingHoursSpec = Object.entries(businessHours)
    .filter(([, hours]) => hours !== null)
    .map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day,
      opens: hours!.open,
      closes: hours!.close,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: brand.name,
    description: brand.description,
    url: siteUrl,
    telephone: brand.phone,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Costa Mesa",
      addressRegion: "CA",
      addressCountry: "US",
    },
    openingHoursSpecification: openingHoursSpec,
    image: `${siteUrl}/images/custom/hero.png`,
    priceRange: "$$",
  };

  // Escape to prevent early script-tag termination from admin-entered content
  const safe = JSON.stringify(jsonLd).replace(/<\/script>/gi, "<\\/script>");

  return (
    <script
      type="application/ld+json"
      // trusted: content is our own CMS data, serialized via JSON.stringify
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
