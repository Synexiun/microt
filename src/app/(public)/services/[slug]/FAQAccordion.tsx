"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

function FAQAccordionItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-dark-lighter last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium text-base md:text-lg pr-4 group-hover:text-gold transition-colors duration-300">
          {question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </motion.svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 px-1 text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div className="divide-y-0">
      {faqs.map((faq, index) => (
        <FAQAccordionItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
