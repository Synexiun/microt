"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FAQS = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by calling us directly or using our online booking system by clicking Book Online. Walk-ins may also be accepted depending on availability.",
  },
  {
    question: "Do you follow sanitation and hygiene protocols?",
    answer:
      "Yes, absolutely! We follow strict state board regulations to ensure a clean and safe environment for all our clients. All tools are sanitized and sterilized, and single-use products are used where applicable.",
  },
  {
    question: "How long does a typical appointment take?",
    answer:
      "It depends on the service:\n• Microblading / Ombre Brows: 2–2.5 hours\n• Combo Brows: 2.5–3 hours\n• Lip Blush: 1.5–2 hours\n• Eye Liner: ~1.5 hours\n\nWe will let you know the exact time when you book.",
  },
  {
    question: "What happens during a Lip Blush appointment?",
    answer:
      "We add soft color to your lips using a gentle tattoo method. It helps even out lip tone and gives a healthy, natural look that can last 2–3 years.",
  },
  {
    question: "Is Eye Liner Tattoo safe?",
    answer:
      "Yes. We use safe, sterile tools and a gentle technique to apply pigment along the lash line. The result creates a defined look and can save time in your daily routine.",
  },
  {
    question: "How long do my results last?",
    answer:
      "Microblading and Ombre Brows typically last 12–24 months. Lip Blush lasts 2–3 years. Eye Liner lasts 2–5 years. Results vary depending on skin type, aftercare, and lifestyle. A touch-up appointment (available 6–7 weeks after your first session) helps perfect and extend your results.",
  },
  {
    question: "Can I choose the style or shape for my service?",
    answer:
      "Absolutely. Brows, lips, and liner styles are fully customized to suit your face shape and personal preferences. Every result is tailored to you.",
  },
  {
    question: "Do you offer touch-ups?",
    answer:
      "Yes. For all permanent makeup services, we recommend a touch-up appointment 6–7 weeks after your first session. Touch-up pricing: Microblading $100, Ombre/Powder Brows $100, Combo Brows $120, Lip Blush $100, Eye Liner $100.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes, we do! Gift cards are a great way to treat someone special to a luxury beauty experience. They can be purchased in-store or by contacting us directly.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-dark-lighter last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
        aria-expanded={open}
      >
        <span className="text-white font-medium text-base md:text-lg pr-4 group-hover:text-gold transition-colors duration-300">
          {question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <motion.svg
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-5 h-5 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </motion.svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 px-1 text-gray-400 leading-relaxed whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Frequently Asked Questions
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
            Got Questions?
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Find answers to the most common questions about our services,
            booking, and what to expect.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-dark-light border border-dark-lighter rounded-xl p-6 md:p-10">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-dark-light border border-gold/20 rounded-xl p-10">
            <h2 className="font-heading text-2xl md:text-3xl text-white mb-3">
              Ready to Book Your Appointment?
            </h2>
            <p className="text-gray-400 mb-8">
              Our artists are here to help you look and feel your best.
            </p>
            <Link
              href="/book"
              className="inline-block bg-gold-gradient px-10 py-4 text-black font-semibold uppercase tracking-widest text-sm rounded hover:shadow-glow transition-shadow duration-300"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <Link
          href="/book"
          className="block bg-gold-gradient text-black text-center py-4 rounded-xl font-semibold uppercase tracking-widest text-sm shadow-glow"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
