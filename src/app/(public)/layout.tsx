import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ScrollToTop from '@/components/public/ScrollToTop';
import NewsletterModal from '@/components/public/NewsletterModal';
import { getSiteContent } from '@/lib/constants';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { brand, socialLinks } = await getSiteContent();

  return (
    <>
      <Navbar socialLinks={socialLinks} />
      <main>{children}</main>
      <Footer brand={brand} socialLinks={socialLinks} />
      <ScrollToTop />
      <NewsletterModal />
    </>
  );
}
