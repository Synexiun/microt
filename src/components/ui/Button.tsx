"use client";

import React, { forwardRef, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-black hover:bg-gold-light active:bg-gold-dark focus:ring-gold/50",
  secondary:
    "border border-gold text-gold bg-transparent hover:bg-gold/10 active:bg-gold/20 focus:ring-gold/50",
  ghost:
    "bg-transparent text-white hover:text-gold hover:bg-white/5 active:bg-white/10 focus:ring-white/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-medium rounded
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
