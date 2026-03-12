'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'fade';
  delay?: number;
  once?: boolean;
}

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-100px' }}
      variants={variants[direction]}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
