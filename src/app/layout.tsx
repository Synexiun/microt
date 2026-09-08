import type { Metadata } from "next";
import { Fraunces, Jost } from "next/font/google";
import JsonLdScript from "@/components/JsonLdScript";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velvetbrow.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Velvet Brow by Tannaz | Luxury Brow & Permanent Makeup",
  description:
    "Velvet Brow by Tannaz offers luxury permanent makeup services in Costa Mesa, CA. Specializing in microblading, PhiBrows, combo brows, lip blush, and permanent eyeliner. Where precision meets beauty.",
  keywords: [
    "microblading",
    "permanent makeup",
    "Costa Mesa",
    "PhiBrows",
    "lip blush",
    "permanent eyeliner",
    "combo brows",
    "luxury brows",
    "Velvet Brow by Tannaz",
  ],
  openGraph: {
    title: "Velvet Brow by Tannaz | Luxury Brow & Permanent Makeup",
    description:
      "Luxury permanent makeup services in Costa Mesa, CA. Microblading, PhiBrows, combo brows, lip blush, and permanent eyeliner by expert artists.",
    url: siteUrl,
    siteName: "Velvet Brow by Tannaz",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/custom/hero.png",
        width: 1200,
        height: 630,
        alt: "Velvet Brow by Tannaz - Luxury Permanent Makeup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Brow by Tannaz | Luxury Brow & Permanent Makeup",
    description:
      "Luxury permanent makeup services in Costa Mesa, CA. Where precision meets beauty.",
    images: ["/images/custom/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <body className="font-body bg-white text-ink antialiased">
        <JsonLdScript />
        {children}
      </body>
    </html>
  );
}
