import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlugAsync, getAllServiceSlugsAsync } from "@/lib/services";
import ServiceDetailClient from "./ServiceDetailClient";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getAllServiceSlugsAsync()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlugAsync(slug);

  if (!service) {
    return {
      title: "Service Not Found | Velvet Brow Studio",
    };
  }

  return {
    title: `${service.name} | Velvet Brow Studio`,
    description: service.shortDescription + " Premium permanent makeup services in Costa Mesa, CA. Book your appointment today.",
    openGraph: {
      title: `${service.name} | Velvet Brow Studio`,
      description: service.shortDescription,
      url: `https://velvetbrowstudio.com/services/${service.slug}`,
      siteName: "Velvet Brow Studio",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.name} at Velvet Brow Studio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | Velvet Brow Studio`,
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
