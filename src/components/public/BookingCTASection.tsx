'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GoldButton from '@/components/ui/GoldButton';

const trustBadges = [
  {
    label: 'No Deposit Required',
    icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
  },
  {
    label: 'Free Consultation',
    icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155',
  },
  {
    label: 'Satisfaction Guaranteed',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
  },
];

function FloatingGoldElements() {
  const elements = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: 40 + Math.random() * 60,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 4,
        opacity: 0.03 + Math.random() * 0.04,
      })),
    []
  );

  return (
    <>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.left}%`,
            top: `${el.top}%`,
            background: `radial-gradient(circle, rgba(201,169,110,${el.opacity * 3}) 0%, transparent 70%)`,
            border: '1px solid rgba(201,169,110,0.06)',
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

export default function BookingCTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(26,26,26,1) 25%, rgba(10,10,10,1) 50%, rgba(26,26,26,1) 75%, rgba(10,10,10,1) 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease infinite',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.08)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,175,55,0.05)_0%,_transparent_50%)]" />

      {/* Floating decorative gold elements */}
      <FloatingGoldElements />

      {/* Decorative borders */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
          backgroundSize: '200% 100%',
          animation: 'textShimmer 6s linear infinite',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
          backgroundSize: '200% 100%',
          animation: 'textShimmer 6s linear infinite',
          animationDelay: '3s',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 25,
            filter: { duration: 0.6 },
          }}
        >
          <p className="text-shimmer uppercase tracking-[0.3em] text-xs md:text-sm mb-6 inline-block">
            Begin Your Transformation
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Experience the Art of{' '}
            <span className="text-shimmer">
              Perfect Brows
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Book your complimentary consultation and discover your signature
            look. Limited appointments available each week.
          </p>

          <Link href="/book">
            <GoldButton className="text-sm md:text-base px-12 py-5 glow-pulse-btn">
              Book Your Appointment
            </GoldButton>
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 25,
                  delay: 0.3 + index * 0.1,
                }}
                className="flex items-center gap-2 text-gray-400"
              >
                <svg
                  className="w-5 h-5 text-gold/60"
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
                <span className="text-sm">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
