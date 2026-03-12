'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import GoldButton from '@/components/ui/GoldButton';

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.08)_0%,_rgba(10,10,10,1)_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.05)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,169,110,0.04)_0%,_transparent_50%)]" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6"
        >
          Luxury Brow Artistry
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gold-gradient bg-clip-text text-transparent">
            Velvet Brow
          </span>
          <br />
          <span className="text-white">Studio</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-gray-300 text-lg md:text-xl lg:text-2xl font-light mb-10 tracking-wide"
        >
          Where Precision Meets Beauty
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <Link href="/book">
            <GoldButton className="text-sm md:text-base px-10 py-5">
              Book Your Appointment
            </GoldButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-5 h-5 text-gold/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
