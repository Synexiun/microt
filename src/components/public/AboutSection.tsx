'use client';

import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from './AnimatedSection';

const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '100%', label: 'Premium Products Only' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About the Artist"
          subtitle="Dedicated to the art of enhancing natural beauty"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12">
          {/* Artist image placeholder */}
          <AnimatedSection direction="left">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 border-2 border-gold/30 rounded-lg translate-x-4 translate-y-4" />
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-gold/20 bg-gradient-to-br from-dark-light via-dark to-dark-light flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gold/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <p className="text-gold/30 text-sm uppercase tracking-wider">
                    Artist Portrait
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Story text */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              <h3 className="font-heading text-2xl md:text-3xl text-white">
                Crafting Beauty with{' '}
                <span className="bg-gold-gradient bg-clip-text text-transparent">
                  Passion & Precision
                </span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                With over five years of dedicated practice in the art of permanent
                makeup, our lead artist brings a refined eye for symmetry, an
                unwavering commitment to perfection, and a deep understanding of
                facial aesthetics to every appointment.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Trained under internationally recognized masters and certified in
                advanced techniques including PhiBrows, microblading, ombre
                shading, lip blush, and permanent eyeliner, she has transformed
                the confidence of hundreds of clients across Southern California.
              </p>
              <p className="text-gray-400 leading-relaxed">
                At Velvet Brow Studio, we believe that luxury lies in the details.
                Every consultation is personalized, every stroke intentional, and
                every result a reflection of our dedication to enhancing your
                natural beauty — never masking it.
              </p>

              {/* Decorative divider */}
              <div className="w-16 h-[1px] bg-gold/40" />

              <p className="text-gold italic font-heading text-lg">
                &ldquo;Beauty is not about perfection — it&apos;s about enhancing
                what makes you uniquely you.&rdquo;
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-12 border-t border-dark-lighter">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl md:text-5xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
