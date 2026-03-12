import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { BRAND, BUSINESS_HOURS } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velvet Brow Studio | Luxury Brow & Permanent Makeup",
  description:
    "Velvet Brow Studio offers luxury permanent makeup services in Costa Mesa, CA. Specializing in microblading, PhiBrows, combo brows, lip blush, and permanent eyeliner. Where precision meets beauty.",
  keywords: [
    "microblading",
    "permanent makeup",
    "Costa Mesa",
    "PhiBrows",
    "lip blush",
    "permanent eyeliner",
    "combo brows",
    "luxury brows",
    "Velvet Brow Studio",
  ],
  openGraph: {
    title: "Velvet Brow Studio | Luxury Brow & Permanent Makeup",
    description:
      "Luxury permanent makeup services in Costa Mesa, CA. Microblading, PhiBrows, combo brows, lip blush, and permanent eyeliner by expert artists.",
    url: "https://velvetbrowstudio.com",
    siteName: "Velvet Brow Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Velvet Brow Studio - Luxury Permanent Makeup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Brow Studio | Luxury Brow & Permanent Makeup",
    description:
      "Luxury permanent makeup services in Costa Mesa, CA. Where precision meets beauty.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velvetbrowstudio.com";

  const openingHoursSpec = Object.entries(BUSINESS_HOURS)
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
    name: BRAND.name,
    description: BRAND.description,
    url: siteUrl,
    telephone: BRAND.phone,
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Costa Mesa",
      addressRegion: "CA",
      addressCountry: "US",
    },
    openingHoursSpecification: openingHoursSpec,
    image: `${siteUrl}/images/og-image.jpg`,
    priceRange: "$$",
  };

  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-montserrat bg-dark text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
