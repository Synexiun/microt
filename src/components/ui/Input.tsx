"use client";

import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseInputProps {
  label?: string;
  error?: string;
  variant?: "input" | "textarea";
}

type InputFieldProps = BaseInputProps &
  InputHTMLAttributes<HTMLInputElement> & { variant?: "input" };

type TextareaFieldProps = BaseInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { variant: "textarea" };

type InputProps = InputFieldProps | TextareaFieldProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, variant = "input", className = "", ...props }, ref) => {
    const baseStyles = `
      w-full bg-dark-light border rounded px-4 py-3
      text-white placeholder-gray-500
      transition-all duration-300
      focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? "border-red-500" : "border-dark-lighter"}
      ${className}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        {variant === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${baseStyles} min-h-[120px] resize-y`}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={baseStyles}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
