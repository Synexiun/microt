'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GoldButton from '@/components/ui/GoldButton';

export default function BookingCTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.06)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,175,55,0.04)_0%,_transparent_50%)]" />

      {/* Decorative borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6">
            Begin Your Transformation
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform{' '}
            <span className="bg-gold-gradient bg-clip-text text-transparent">
              Your Look?
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Book a consultation today and discover the effortless beauty of
            expertly crafted permanent makeup.
          </p>

          <Link href="/book">
            <GoldButton className="text-sm md:text-base px-12 py-5">
              Book Your Appointment
            </GoldButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
