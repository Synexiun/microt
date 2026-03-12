'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from './AnimatedSection';

const stats = [
  { value: 1200, suffix: '+', label: 'Happy Clients' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 5, suffix: '-Star', label: 'Rated on Google' },
  { value: 100, suffix: '%', label: 'Premium Products Only' },
];

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {target >= 1000 ? count.toLocaleString() : count}{suffix}
    </span>
  );
}

function GoldSeparator() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative h-[2px] my-6 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/60 via-gold to-gold/60"
        initial={{ width: 0 }}
        animate={isInView ? { width: '4rem' } : { width: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  );
}

const textLines = [
  'With over eight years of dedicated practice in the art of permanent makeup, our lead artist brings a refined eye for symmetry, an unwavering commitment to perfection, and a deep understanding of facial aesthetics to every appointment. Trained at the prestigious PhiAcademy in Los Angeles and mentored by internationally renowned masters, she has honed her craft to deliver results that consistently exceed expectations.',
  'Certified in advanced techniques including PhiBrows, microblading, ombre shading, lip blush, and permanent eyeliner, she holds multiple accreditations from the Society of Permanent Cosmetic Professionals (SPCP) and the American Academy of Micropigmentation (AAM). Her ongoing commitment to education means she stays at the forefront of emerging techniques, pigment technology, and safety protocols.',
  'At Velvet Brow Studio, we believe that luxury lies in the details. Every consultation is deeply personalized, every stroke intentional, and every result a reflection of our dedication to enhancing your natural beauty \u2014 never masking it. Our studio uses only premium, hypoallergenic pigments and maintains the highest standards of hygiene and care, because your comfort and confidence are at the heart of everything we do.',
];

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About the Artist"
          subtitle="Dedicated to the art of enhancing natural beauty"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12">
          {/* Artist image with subtle parallax */}
          <AnimatedSection direction="left">
            <div ref={imageRef} className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 border-2 border-gold/30 rounded-lg translate-x-4 translate-y-4" />
              <motion.div
                style={{ y: imageY }}
                className="relative w-full h-full rounded-lg overflow-hidden border border-gold/20"
              >
                <img
                  src="/images/about-artist.svg"
                  alt="Lead artist at Velvet Brow Studio"
                  className="w-full h-full object-cover"
                />
                {/* Gold overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Story text - line by line reveal */}
          <div className="space-y-6">
            <AnimatedSection direction="right" delay={0.1}>
              <h3 className="font-heading text-2xl md:text-3xl text-white">
                Crafting Beauty with{' '}
                <span className="text-shimmer">
                  Passion &amp; Precision
                </span>
              </h3>
            </AnimatedSection>

            {textLines.map((line, i) => (
              <AnimatedSection key={i} direction="right" delay={0.2 + i * 0.15}>
                <p className="text-gray-400 leading-relaxed">{line}</p>
              </AnimatedSection>
            ))}

            <GoldSeparator />

            <AnimatedSection direction="right" delay={0.7}>
              <p className="text-gold italic font-heading text-lg">
                &ldquo;Beauty is not about perfection &mdash; it&apos;s about enhancing
                what makes you uniquely you.&rdquo;
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Stats with count-up animation */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-12 border-t border-dark-lighter">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 25,
                  delay: index * 0.15,
                }}
              >
                <p className="font-heading text-4xl md:text-5xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-2">
                  <CountUpNumber target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
