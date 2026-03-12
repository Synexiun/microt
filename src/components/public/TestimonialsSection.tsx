'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { sampleTestimonials } from '@/lib/sample-data';

function AnimatedStarRating({ rating, key: animKey }: { rating: number; key: number | string }) {
  return (
    <div className="flex items-center gap-1 mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.svg
          key={`${animKey}-star-${star}`}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: 1,
            scale: star <= rating ? 1 : 0.7,
            rotate: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: star * 0.1,
          }}
          className={`w-5 h-5 ${star <= rating ? 'text-gold' : 'text-dark-lighter'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </motion.svg>
      ))}
    </div>
  );
}

function TypewriterName({ name, key: animKey }: { name: string; key: number | string }) {
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    setDisplayedChars(0);
    const timer = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= name.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [name, animKey]);

  return (
    <span>
      {name.slice(0, displayedChars)}
      {displayedChars < name.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-gold"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % sampleTestimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = sampleTestimonials[current];

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-dark-light overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,169,110,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, rgba(212,175,55,0.08) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What Our Clients Say" />

        {/* Testimonial carousel with crossfade */}
        <div className="relative mt-12 min-h-[360px] md:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 25,
                filter: { duration: 0.4 },
              }}
              className="text-center"
            >
              {/* Gold quote marks that scale in */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                <svg
                  className="w-14 h-14 text-gold/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
              </motion.div>

              {/* Star rating — animated fill */}
              <div className="flex justify-center">
                <AnimatedStarRating rating={testimonial.rating} key={testimonial.id} />
              </div>

              {/* Quote text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-gray-300 text-lg md:text-xl leading-relaxed italic mb-8 font-light"
              >
                &ldquo;{testimonial.quote}&rdquo;
              </motion.p>

              {/* Animated gold divider */}
              <motion.div
                className="h-[1px] bg-gold/40 mx-auto mb-6"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              />

              {/* Author — typewriter name */}
              <p className="font-heading text-lg text-white font-bold">
                <TypewriterName name={testimonial.name} key={testimonial.id} />
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gold text-sm mt-1"
              >
                {testimonial.service}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-gray-500 text-xs mt-1"
              >
                {testimonial.location}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots with spring animation */}
        <div className="flex justify-center gap-3 mt-8">
          {sampleTestimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-colors duration-300 ${
                index === current
                  ? 'bg-gold'
                  : 'bg-dark-lighter hover:bg-gray-600'
              }`}
              animate={{ width: index === current ? 32 : 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
