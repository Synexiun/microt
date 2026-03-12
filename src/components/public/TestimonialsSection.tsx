'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

interface Testimonial {
  id: number;
  name: string;
  service: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophia M.',
    service: 'Microblading',
    quote:
      'I walked in feeling uncertain and walked out feeling like the most beautiful version of myself. The attention to detail was extraordinary — every stroke was deliberate and artful. My brows have never looked this natural.',
  },
  {
    id: 2,
    name: 'Isabella R.',
    service: 'PhiBrows',
    quote:
      'The PhiBrows experience at Velvet Brow Studio is truly unmatched. From the precise mapping to the final reveal, I felt completely at ease. My friends think I was simply born with perfect brows. That is the highest compliment.',
  },
  {
    id: 3,
    name: 'Olivia T.',
    service: 'Combo Brows',
    quote:
      'After years of spending twenty minutes every morning on my brows, I finally took the leap with combo brows. The blend of hair strokes and shading is seamless. Waking up with flawless brows every day feels like pure luxury.',
  },
  {
    id: 4,
    name: 'Emma K.',
    service: 'Lip Blush',
    quote:
      'The lip blush treatment completely transformed my morning routine. The color is so natural and perfectly suited to my skin tone. I receive compliments constantly and no one can tell it is permanent makeup. Absolutely worth every penny.',
  },
  {
    id: 5,
    name: 'Ava L.',
    service: 'Permanent Eyeliner',
    quote:
      'As someone who could never get eyeliner straight, this has been life-changing. The lash enhancement is subtle yet makes my eyes look so much more defined. The studio itself is immaculate and the artist made me feel completely comfortable.',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-dark-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What Our Clients Say" />

        {/* Testimonial carousel */}
        <div className="relative mt-12 min-h-[280px] md:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center"
            >
              {/* Gold quote marks */}
              <div className="flex justify-center mb-6">
                <svg
                  className="w-12 h-12 text-gold/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
              </div>

              {/* Quote text */}
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic mb-8 font-light">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="w-12 h-[1px] bg-gold/40 mx-auto mb-6" />

              {/* Author */}
              <p className="font-heading text-lg text-white font-bold">
                {testimonials[current].name}
              </p>
              <p className="text-gold text-sm mt-1">
                {testimonials[current].service}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-gold w-8'
                  : 'bg-dark-lighter hover:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
