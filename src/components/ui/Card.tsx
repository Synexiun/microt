"use client";

import React from "react";

type CardPadding = "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: CardPadding;
  glow?: boolean;
  onClick?: () => void;
}

const paddingStyles: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className = "",
  padding = "md",
  glow = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-dark-light border border-dark-lighter rounded-lg
        transition-all duration-300
        ${glow ? "hover:shadow-glow hover:border-gold/30" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
