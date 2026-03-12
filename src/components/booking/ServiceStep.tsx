"use client";

import React from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/services";

interface ServiceStepProps {
  selectedSlug: string;
  onSelect: (slug: string) => void;
}

export default function ServiceStep({
  selectedSlug,
  onSelect,
}: ServiceStepProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="font-heading text-3xl text-white text-center mb-2">
        Select Your Service
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Choose the treatment that is right for you
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => {
          const isSelected = selectedSlug === service.slug;

          return (
            <motion.button
              key={service.slug}
              onClick={() => onSelect(service.slug)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative text-left p-6 rounded-lg border transition-all duration-300 glass hover-glow
                ${
                  isSelected
                    ? "bg-dark shadow-glow ring-2 ring-gold border-transparent"
                    : "bg-dark/50 border-gold/20 hover:border-gold/50"
                }
              `}
            >
              {isSelected && (
                <motion.div
                  layoutId="service-glow"
                  className="absolute inset-0 rounded-lg border-2 border-gold shadow-glow pointer-events-none"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <h3 className="font-heading text-lg text-white mb-2">
                {service.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {service.shortDescription}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{service.duration}</span>
                <span className="text-gold font-semibold">
                  {service.priceRange}
                </span>
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-black"
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
                  </div>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
