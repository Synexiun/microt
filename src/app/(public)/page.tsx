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

export default async function HomePage() {
  const { brand, businessHours } = await getSiteContent();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingCTASection />
      <ConsentQRSection />
      <ContactSection brand={brand} businessHours={businessHours} />
      <InstagramSection instagramHandle={brand.instagramHandle} />
    </>
  );
}
