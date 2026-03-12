'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring, Variants } from 'framer-motion';
import GoldButton from '@/components/ui/GoldButton';

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
};

const fadeUpSpring: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 30,
    },
  },
};

// Character-by-character reveal variant
const charVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      delay: i * 0.03,
    },
  }),
};

function AnimatedText({ text, className }: { text: string; className?: string }) {
  const chars = text.split('');
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={charVariant}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function GoldParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 5,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      delay: Math.random() * 4,
      duration: 5 + Math.random() * 4,
    })),
    []
  );

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: 'radial-gradient(circle, rgba(201,169,110,0.6) 0%, transparent 70%)',
          }}
          animate={{
            y: [-10, -30, -10],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms for background
  const bgX = useTransform(springX, [0, 1], [-10, 10]);
  const bgY = useTransform(springY, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
      onMouseMove={handleMouseMove}
    >
      {/* Animated SVG background with slow rotation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute inset-[-20%] animate-[slowRotate_60s_linear_infinite]">
          <Image
            src="/images/hero-bg.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.08)_0%,_rgba(10,10,10,1)_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.05)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,169,110,0.04)_0%,_transparent_50%)]" />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, rgba(201,169,110,0.05), rgba(10,10,10,0), rgba(212,175,55,0.05), rgba(10,10,10,0))',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />

      {/* Floating gold particles */}
      <GoldParticles />

      {/* Decorative line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: 128 }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
      />

      {/* Content — foreground (no parallax offset for clarity) */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Subtitle */}
        <motion.p
          variants={fadeUpSpring}
          className="text-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6"
        >
          Luxury Brow Artistry
        </motion.p>

        {/* Main heading — animated character reveal */}
        <motion.h1
          variants={fadeUpSpring}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block">
            <AnimatedText
              text="Velvet Brow"
              className="text-shimmer"
            />
          </span>
          <span className="block text-white">
            <AnimatedText text="Studio" />
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUpSpring}
          className="text-gray-300 text-lg md:text-xl lg:text-2xl font-light mb-10 tracking-wide"
        >
          Where Precision Meets Beauty
        </motion.p>

        {/* CTA with magnetic hover */}
        <motion.div variants={fadeUpSpring}>
          <Link href="/book">
            <GoldButton className="text-sm md:text-base px-10 py-5">
              Book Your Appointment
            </GoldButton>
          </Link>
        </motion.div>

        {/* Floating feature badges */}
        <motion.div
          variants={fadeUpSpring}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {[
            { label: 'Costa Mesa, CA', icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' },
            { label: 'By Appointment Only', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: '5-Star Rated', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark/60 backdrop-blur-sm border border-gold/20 text-gray-300"
            >
              <svg
                className="w-4 h-4 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={badge.icon}
                />
              </svg>
              <span className="text-xs font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1, type: 'spring', stiffness: 100 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-gold"
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
