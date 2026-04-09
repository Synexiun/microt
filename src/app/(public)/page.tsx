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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [{ brand, businessHours }, testimonials, services] = await Promise.all([
    getSiteContent(),
    getTestimonials(),
    getServices(),
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
      <InstagramSection instagramHandle={brand.instagramHandle} />
    </>
  );
}
