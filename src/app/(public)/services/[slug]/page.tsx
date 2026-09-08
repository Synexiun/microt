import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlugAsync } from "@/lib/services";
import ServiceDetailClient from "./ServiceDetailClient";

export const dynamic = "force-dynamic";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlugAsync(slug);

  if (!service) {
    return {
      title: "Service Not Found | Velvet Brow by Tannaz",
    };
  }

  return {
    title: `${service.name} | Velvet Brow by Tannaz`,
    description: service.shortDescription + " Premium permanent makeup services in Costa Mesa, CA. Book your appointment today.",
    openGraph: {
      title: `${service.name} | Velvet Brow by Tannaz`,
      description: service.shortDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://velvetbrow.com"}/services/${service.slug}`,
      siteName: "Velvet Brow by Tannaz",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.name} at Velvet Brow by Tannaz`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | Velvet Brow by Tannaz`,
      description: service.shortDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlugAsync(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
