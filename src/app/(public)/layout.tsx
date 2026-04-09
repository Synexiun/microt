import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ScrollToTop from '@/components/public/ScrollToTop';
import NewsletterModal from '@/components/public/NewsletterModal';
import { getSiteContent } from '@/lib/constants';

export const dynamic = "force-dynamic";

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
      {/* Persistent floating Book Now CTA — public pages only */}
      <div className="fixed bottom-6 right-6 z-50 animate-fadeUp" style={{ animationDelay: '1s' }}>
        <a
          href="/book"
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-light text-dark font-bold text-sm tracking-widest uppercase px-6 py-4 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          Book Now
        </a>
      </div>
    </>
  );
}
