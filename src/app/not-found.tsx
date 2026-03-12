import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="font-playfair text-8xl md:text-9xl font-bold text-gold-gradient mb-6">
          404
        </h1>
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="
            relative inline-flex items-center justify-center gap-2
            bg-gold-gradient px-8 py-4
            text-black font-semibold uppercase tracking-widest text-sm
            rounded overflow-hidden
            transition-shadow duration-300
            hover:shadow-glow
          "
        >
          <span
            className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] animate-shimmer"
            aria-hidden="true"
          />
          <span className="relative z-10">Return Home</span>
        </Link>
      </div>
    </div>
  );
}
