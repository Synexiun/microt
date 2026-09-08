'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from './AnimatedSection';
import type { InstagramPost } from '@/types';

const TILE_IMAGES = [
  '/images/custom/microblading.png',
  '/images/custom/phibrows.png',
  '/images/custom/combo-brows.png',
  '/images/custom/lip-blush.png',
  '/images/custom/permanent-eyeliner.png',
];

interface InstagramSectionProps {
  instagramHandle?: string;
  profileUrl?: string;
  posts?: InstagramPost[];
}

interface Tile {
  key: string;
  href: string;
  image: string;
}

export default function InstagramSection({
  instagramHandle = '@velvet_brow_by_tannaz',
  profileUrl,
  posts = [],
}: InstagramSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handle = instagramHandle.replace(/^@/, '');
  const profile = profileUrl || `https://www.instagram.com/${handle}`;

  // Tiles show the studio's own work. Each links to the matching post added in
  // /admin/instagram, falling back to the profile so the row is never sparse
  // and never links nowhere.
  const tileCount = Math.max(posts.length, TILE_IMAGES.length);
  const tiles: Tile[] = Array.from({ length: tileCount }, (_, i) => ({
    key: posts[i]?.id ?? `studio-${i}`,
    href: posts[i]?.url ?? profile,
    image: TILE_IMAGES[i % TILE_IMAGES.length],
  }));

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Follow Us on Instagram"
          subtitle={instagramHandle}
        />

        <AnimatedSection direction="up">
          <div className="relative">
            {/* Scroll buttons */}
            <motion.button
              onClick={scrollLeft}
              whileHover={{ scale: 1.1, borderColor: 'rgba(31, 100, 117,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-dark-light/80 backdrop-blur-sm border border-dark-lighter flex items-center justify-center text-ink-soft hover:text-gold transition-all duration-300 hidden md:flex"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={scrollRight}
              whileHover={{ scale: 1.1, borderColor: 'rgba(31, 100, 117,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-dark-light/80 backdrop-blur-sm border border-dark-lighter flex items-center justify-center text-ink-soft hover:text-gold transition-all duration-300 hidden md:flex"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </motion.button>

            {/* Scroll container with smooth momentum */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {tiles.map((tile, index) => (
                <motion.a
                  key={tile.key}
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 25,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 10px 40px rgba(31, 100, 117,0.15)',
                  }}
                  className="flex-shrink-0 w-64 md:w-72 rounded-lg border border-dark-lighter hover:border-gold/30 bg-dark-light group cursor-pointer transition-all duration-300 snap-start relative overflow-hidden"
                >
                  {/* Animated gold gradient border on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    style={{
                      boxShadow: 'inset 0 0 0 1px rgba(31, 100, 117,0.3)',
                    }}
                  />

                  {/* Thumbnail image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={tile.image}
                      alt={`${instagramHandle} on Instagram`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-widest">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        View on Instagram
                      </span>
                    </div>
                  </div>

                  {/* Caption area */}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </div>
                      <span className="text-ink text-xs font-semibold">{handle}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Follow CTA */}
          <div className="text-center mt-10">
            <a
              href={profile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gold-gradient text-white text-xs font-semibold uppercase tracking-widest rounded hover:shadow-glow transition-shadow duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Follow {instagramHandle}
            </a>
            <p className="text-ink-soft text-sm mt-4">
              Follow us for daily inspiration and behind-the-scenes content
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
