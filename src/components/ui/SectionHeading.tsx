"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`text-center mb-16 ${className}`}
    >
      <h2
        className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? "text-dark" : "text-white"
        }`}
      >
        {title}
      </h2>
      <div className="flex justify-center mb-6">
        <div className="w-24 h-[2px] bg-gold-gradient rounded-full" />
      </div>
      {subtitle && (
        <p
          className={`max-w-2xl mx-auto text-base md:text-lg ${
            light ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
