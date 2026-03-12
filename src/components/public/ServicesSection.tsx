'use client';

import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { services } from '@/lib/services';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from './AnimatedSection';

const startingPrices: Record<string, string> = {
  microblading: '$400',
  phibrows: '$500',
  'combo-brows': '$450',
  'lip-blush': '$400',
  'permanent-eyeliner': '$300',
};

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * 12,
      rotateY: (x - 0.5) * 12,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  return (
    <AnimatedSection direction="up" delay={index * 0.1}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        <div
          className={`h-full rounded-lg p-8 flex flex-col group relative overflow-hidden transition-all duration-500 glass ${
            isHovered ? 'shadow-glow-lg' : ''
          }`}
          style={{
            border: isHovered
              ? '1px solid rgba(201,169,110,0.4)'
              : '1px solid rgba(42,42,42,1)',
          }}
        >
          {/* Animated gold shimmer overlay on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(201,169,110,0.08), transparent)',
                backgroundSize: '200% 100%',
                animation: 'textShimmer 2s linear infinite',
              }}
            />
          )}
          {children}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Tailored beauty solutions for the modern woman"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {services.map((service, index) => (
            <TiltCard key={service.slug} index={index}>
              {/* Service image - using high-quality unsplash beauty placeholders */}
              <div className="w-full aspect-[16/10] rounded-lg overflow-hidden mb-6 bg-dark border border-dark-lighter relative">
                <Image
                  src={`https://images.unsplash.com/photo-1588513511116-43beaf66caaa?auto=format&fit=crop&q=80&w=600&h=400`}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Name */}
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                {service.name}
              </h3>

              {/* Short description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                {service.shortDescription}
              </p>

              {/* Price and duration */}
              <div className="flex items-center justify-between text-sm mb-6 pt-4 border-t border-dark-lighter/50">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Starting at</span>
                  <motion.span
                    className="text-gold font-semibold text-lg"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {startingPrices[service.slug] || service.priceRange}
                  </motion.span>
                </div>
                <span className="text-gray-500 flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {service.duration}
                </span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 mt-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </motion.svg>
                </Link>
                <Link
                  href={`/book?service=${service.slug}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ml-auto"
                >
                  Book Now
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
