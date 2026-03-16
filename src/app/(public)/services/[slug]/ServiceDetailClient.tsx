"use client";

import React from "react";
import Link from "next/link";
import { Service } from "@/types";
import AnimatedSection from "@/components/public/AnimatedSection";
import GoldButton from "@/components/ui/GoldButton";
import FAQAccordion from "./FAQAccordion";

interface ServiceDetailClientProps {
  service: Service;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Banner */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-light/50 to-dark" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection direction="fade">
            <p className="text-gold uppercase tracking-[0.25em] text-sm font-semibold mb-6">
              Our Services
            </p>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-gold-gradient">
              {service.name}
            </h1>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.2}>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {service.shortDescription}
            </p>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.3}>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.duration}
              </span>
              <span className="w-1 h-1 rounded-full bg-gold/50" />
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.priceRange}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="space-y-6">
              {service.description.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-300 leading-relaxed text-base md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 md:py-28 bg-dark-light/30">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                The Process
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-[2px] bg-gold-gradient rounded-full" />
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Every appointment follows our meticulous step-by-step process to ensure exceptional results.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-12 md:space-y-16">
            {service.processSteps.map((step, index) => (
              <AnimatedSection
                key={index}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.1}
              >
                <div
                  className={`flex flex-col md:flex-row items-start gap-6 md:gap-10 ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-glow">
                      <span className="text-black font-bold text-xl md:text-2xl">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  {/* Step Content */}
                  <div className={`flex-1 ${index % 2 !== 0 ? "md:text-right" : ""}`}>
                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Healing Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Healing Timeline
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-[2px] bg-gold-gradient rounded-full" />
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                What to expect during the healing process after your appointment.
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-gold via-gold/50 to-gold/10" />

            <div className="space-y-10">
              {service.healingTimeline.map((entry, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                  <div className="flex gap-6 md:gap-8">
                    {/* Gold Dot */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full bg-dark border-[3px] border-gold flex items-center justify-center">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gold" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="pb-2">
                      <h3 className="text-gold font-semibold text-base md:text-lg mb-2">
                        {entry.day}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section className="py-20 md:py-28 bg-dark-light/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Investment in Beauty
            </h2>
            <div className="flex justify-center mb-10">
              <div className="w-24 h-[2px] bg-gold-gradient rounded-full" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-dark border border-dark-lighter rounded-lg p-8 md:p-12 mb-10">
              <p className="text-gold-gradient font-playfair text-5xl md:text-6xl font-bold mb-4">
                {service.priceRange}
              </p>
              <p className="text-gray-400 text-lg mb-2">
                Session duration: <span className="text-white">{service.duration}</span>
              </p>
              {service.touchUpPrice && (
                <p className="text-gray-400 text-sm mt-2">
                  Touch Up{" "}
                  <span className="text-gray-500">(after 6–7 weeks)</span>
                  {" — "}
                  <span className="text-gold font-semibold">
                    {service.touchUpPrice}
                  </span>
                </p>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Link href="/book">
              <GoldButton className="text-base px-12 py-5">
                Book This Service
              </GoldButton>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-[2px] bg-gold-gradient rounded-full" />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-dark-light border border-dark-lighter rounded-lg p-6 md:p-8">
              <FAQAccordion faqs={service.faqs} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Back to Services */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors duration-300 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm uppercase tracking-widest font-semibold">
                Back to All Services
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
