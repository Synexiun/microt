'use client';

import React, { useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from './AnimatedSection';

const placeholderPosts = [
  { id: 1, label: 'Before & After' },
  { id: 2, label: 'Studio Vibes' },
  { id: 3, label: 'Brow Transformation' },
  { id: 4, label: 'Client Love' },
  { id: 5, label: 'Lip Blush Magic' },
  { id: 6, label: 'Behind the Scenes' },
];

export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
          subtitle="@velvetbrowstudio"
        />

        <AnimatedSection direction="up">
          <div className="relative">
            {/* Scroll buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-dark-light/80 backdrop-blur-sm border border-dark-lighter flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 transition-all duration-300 hidden md:flex"
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
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-dark-light/80 backdrop-blur-sm border border-dark-lighter flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 transition-all duration-300 hidden md:flex"
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
            </button>

            {/* Scroll container */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {placeholderPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex-shrink-0 w-64 md:w-72 aspect-square rounded-lg border border-dark-lighter hover:border-gold/30 bg-gradient-to-br from-dark-light via-dark to-dark-light group cursor-pointer transition-all duration-300 snap-start relative overflow-hidden"
                >
                  {/* Instagram icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <svg
                        className="w-7 h-7 text-gold/40 group-hover:text-gold/60 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider group-hover:text-gray-400 transition-colors">
                      {post.label}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Follow note */}
          <p className="text-center text-gray-500 text-sm mt-8">
            Follow us for daily inspiration and behind-the-scenes content
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
