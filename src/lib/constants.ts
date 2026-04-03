export const BRAND = {
  name: "Velvet Brow Studio",
  tagline: "Where Precision Meets Beauty",
  description:
    "Velvet Brow Studio is a luxury permanent makeup studio in Costa Mesa, CA, specializing in microblading, ombre/powder brows, combo brows, lip blush, and eye liner. Our expert artists combine artistry with precision to enhance your natural beauty.",
  location: "Costa Mesa, CA",
  address: "1847 Newport Blvd, Suite 200, Costa Mesa, CA 92627",
  phone: "(949) 555-0173",
  email: "hello@velvetbrowstudio.com",
  instagram: "@velvetbrowstudio",
} as const;

export const BUSINESS_HOURS: Record<string, { open: string; close: string } | null> = {
  Monday: { open: "9:00 AM", close: "6:00 PM" },
  Tuesday: { open: "9:00 AM", close: "6:00 PM" },
  Wednesday: { open: "9:00 AM", close: "6:00 PM" },
  Thursday: { open: "9:00 AM", close: "6:00 PM" },
  Friday: { open: "9:00 AM", close: "6:00 PM" },
  Saturday: { open: "9:00 AM", close: "6:00 PM" },
  Sunday: null,
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/velvetbrowstudio",
  tiktok: "#",
  facebook: "#",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

import { readJsonObject, writeJsonObject } from "@/lib/data";

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
    location: string;
    address: string;
    phone: string;
    email: string;
    instagramHandle: string;
  };
  businessHours: Record<string, { open: string; close: string } | null>;
  socialLinks: { instagram: string; tiktok: string; facebook: string };
}

const DEFAULT_SITE_CONTENT: SiteContent = {
  brand: {
    name: BRAND.name,
    tagline: BRAND.tagline,
    description: BRAND.description,
    location: BRAND.location,
    address: BRAND.address,
    phone: BRAND.phone,
    email: BRAND.email,
    instagramHandle: BRAND.instagram,
  },
  businessHours: BUSINESS_HOURS,
  socialLinks: { ...SOCIAL_LINKS },
};

export async function getSiteContent(): Promise<SiteContent> {
  const stored = await readJsonObject<SiteContent>("site-content.json");
  if (stored) return stored;
  await writeJsonObject("site-content.json", DEFAULT_SITE_CONTENT);
  return DEFAULT_SITE_CONTENT;
}

export async function getBrand(): Promise<SiteContent["brand"]> {
  return (await getSiteContent()).brand;
}

export async function getBusinessHours(): Promise<
  SiteContent["businessHours"]
> {
  return (await getSiteContent()).businessHours;
}

export async function getSocialLinks(): Promise<SiteContent["socialLinks"]> {
  return (await getSiteContent()).socialLinks;
}

export const BOOKING_TIMES = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
] as const;
