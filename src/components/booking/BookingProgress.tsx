"use client";

import React from "react";

const steps = ["Service", "Date & Time", "Your Info", "Review"];

interface BookingProgressProps {
  currentStep: number;
}

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10 px-4">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          const isFuture = stepNum > currentStep;

          return (
            <React.Fragment key={label}>
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    text-sm font-semibold transition-all duration-500
                    ${
                      isCompleted
                        ? "bg-gold text-black"
                        : isActive
                        ? "bg-gold text-black shadow-glow"
                        : "bg-dark-lighter text-gray-500 border border-dark-lighter"
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={`
                    text-xs font-medium hidden sm:block transition-colors duration-300
                    ${
                      isActive
                        ? "text-gold"
                        : isCompleted
                        ? "text-gold/70"
                        : "text-gray-500"
                    }
                  `}
                >
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4 h-px relative -mt-5 sm:-mt-0">
                  <div className="absolute inset-0 bg-dark-lighter" />
                  <div
                    className="absolute inset-y-0 left-0 bg-gold transition-all duration-500"
                    style={{
                      width: isFuture ? "0%" : isActive ? "50%" : "100%",
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
