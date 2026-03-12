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
    hidden: { opacity: 0, y: 80, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: -80, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: 80, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  fade: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
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
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30,
        delay,
        filter: { duration: 0.6, delay },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
