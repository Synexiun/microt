"use client";

import React, { useRef, useState, useCallback } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
      onClick?.();
    },
    [onClick]
  );

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        bg-gold-gradient px-8 py-4
        text-black font-semibold uppercase tracking-widest text-sm
        rounded overflow-hidden
        transition-shadow duration-300
        hover:shadow-glow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {/* Animated shimmer overlay */}
      <span
        className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] animate-shimmer"
        aria-hidden="true"
      />

      {/* Cursor-following glow */}
      <span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Text shimmer overlay */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-shimmer"
          style={{
            background: 'linear-gradient(90deg, #000 0%, #333 25%, #000 50%, #333 75%, #000 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'textShimmer 4s linear infinite',
          }}
        >
          {children}
        </span>
      </span>
    </motion.button>
  );
}
