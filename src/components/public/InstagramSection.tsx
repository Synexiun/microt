'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from './AnimatedSection';
import { sampleInstagramPosts } from '@/lib/sample-data';

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
            <motion.button
              onClick={scrollLeft}
              whileHover={{ scale: 1.1, borderColor: 'rgba(201,169,110,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-dark-light/80 backdrop-blur-sm border border-dark-lighter flex items-center justify-center text-gray-400 hover:text-gold transition-all duration-300 hidden md:flex"
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
              whileHover={{ scale: 1.1, borderColor: 'rgba(201,169,110,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-dark-light/80 backdrop-blur-sm border border-dark-lighter flex items-center justify-center text-gray-400 hover:text-gold transition-all duration-300 hidden md:flex"
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
              {sampleInstagramPosts.map((post, index) => (
                <motion.div
                  key={post.id}
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
                    boxShadow: '0 10px 40px rgba(201,169,110,0.15)',
                  }}
                  className="flex-shrink-0 w-64 md:w-72 rounded-lg border border-dark-lighter hover:border-gold/30 bg-dark-light group cursor-pointer transition-all duration-300 snap-start relative overflow-hidden"
                >
                  {/* Animated gold gradient border on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    style={{
                      boxShadow: 'inset 0 0 0 1px rgba(201,169,110,0.3)',
                    }}
                  />

                  {/* Thumbnail image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={`/images/gallery/gallery-${post.imageIndex}.svg`}
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Hover overlay with stats */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                      <motion.div
                        initial={false}
                        className="flex items-center gap-1.5 text-white"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <span className="text-sm font-semibold">{post.likes}</span>
                      </motion.div>
                      <div className="flex items-center gap-1.5 text-white">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        <span className="text-sm font-semibold">{post.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Caption area */}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-black"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </div>
                      <span className="text-white text-xs font-semibold">velvetbrowstudio</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      {post.caption}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-gray-500 text-[10px]">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </motion.div>
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
