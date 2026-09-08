import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import ServicesSection from '@/components/public/ServicesSection';
import GallerySection from '@/components/public/GallerySection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import BookingCTASection from '@/components/public/BookingCTASection';
import ConsentQRSection from '@/components/public/ConsentQRSection';
import ContactSection from '@/components/public/ContactSection';
import InstagramSection from '@/components/public/InstagramSection';
import { getSiteContent } from '@/lib/constants';
import { getTestimonials } from '@/lib/testimonials';
import { getServices } from '@/lib/services';
import { readJsonFile } from '@/lib/data';
import type { InstagramPost } from '@/types';

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    { brand, businessHours, socialLinks },
    testimonials,
    services,
    instagramPosts,
  ] = await Promise.all([
    getSiteContent(),
    getTestimonials(),
    getServices(),
    readJsonFile<InstagramPost>('instagram.json'),
  ]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <GallerySection />
      <TestimonialsSection testimonials={testimonials} />
      <BookingCTASection />
      <ConsentQRSection />
      <ContactSection brand={brand} businessHours={businessHours} />
      <InstagramSection
        instagramHandle={brand.instagramHandle}
        profileUrl={socialLinks.instagram}
        posts={instagramPosts}
      />
    </>
  );
}
