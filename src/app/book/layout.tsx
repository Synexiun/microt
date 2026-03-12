import Link from "next/link";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark">
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-dark/80 backdrop-blur-md border-b border-dark-lighter">
        <Link
          href="/"
          className="font-heading text-xl text-gold hover:text-gold-light transition-colors duration-300"
        >
          Velvet Brow Studio
        </Link>
      </div>
      <main className="pt-20 pb-12">{children}</main>
    </div>
  );
}
