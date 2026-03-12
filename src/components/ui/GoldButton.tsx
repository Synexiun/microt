"use client";

import React from "react";
import { motion } from "framer-motion";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function GoldButton({
  children,
  onClick,
  icon,
  className = "",
  type = "button",
  disabled = false,
}: GoldButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        bg-gold-gradient px-8 py-4
        text-black font-semibold uppercase tracking-widest text-sm
        rounded overflow-hidden
        transition-shadow duration-300
        hover:shadow-glow
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <span
        className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] animate-shimmer"
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
}
