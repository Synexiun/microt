import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ScrollToTop from '@/components/public/ScrollToTop';
import NewsletterModal from '@/components/public/NewsletterModal';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <NewsletterModal />
    </>
  );
}
