'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND, BUSINESS_HOURS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from './AnimatedSection';

function AnimatedIcon({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-gold/20 hover:shadow-glow-sm cursor-default"
      whileHover={{
        y: -3,
        boxShadow: '0 0 20px rgba(201, 169, 110, 0.3)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="We would love to hear from you"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-12">
          {/* Contact details */}
          <AnimatedSection direction="left">
            <div className="space-y-8">
              {/* Visit Our Studio */}
              <div>
                <h3 className="font-heading text-2xl text-white mb-6">
                  Visit Our{' '}
                  <span className="text-shimmer">
                    Studio
                  </span>
                </h3>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <AnimatedIcon delay={0}>
                  <svg
                    className="w-6 h-6 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </AnimatedIcon>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {BRAND.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <AnimatedIcon delay={0.1}>
                  <svg
                    className="w-6 h-6 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </AnimatedIcon>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {BRAND.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <AnimatedIcon delay={0.2}>
                  <svg
                    className="w-6 h-6 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </AnimatedIcon>
                <div>
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-gray-400">
                    1847 Newport Blvd, Suite 200
                    <br />
                    Costa Mesa, CA 92627
                  </p>
                </div>
              </div>

              {/* Free parking note */}
              <motion.div
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold/5 border border-gold/15"
                whileHover={{ borderColor: 'rgba(201,169,110,0.3)', scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <svg
                  className="w-5 h-5 text-gold flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gold/80 text-sm font-medium">
                  Free Parking Available
                </span>
              </motion.div>

              {/* Business hours with animated reveal */}
              <div className="flex items-start gap-4">
                <AnimatedIcon delay={0.3}>
                  <svg
                    className="w-6 h-6 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </AnimatedIcon>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-3">
                    Business Hours
                  </h4>
                  <table className="w-full">
                    <tbody>
                      {Object.entries(BUSINESS_HOURS).map(([day, hours], index) => (
                        <motion.tr
                          key={day}
                          className="border-b border-dark-lighter/50 last:border-0"
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 25,
                            delay: 0.4 + index * 0.05,
                          }}
                        >
                          <td className="text-gray-400 text-sm py-2 pr-4">
                            {day}
                          </td>
                          <td className="text-gray-300 text-sm py-2 text-right">
                            {hours
                              ? `${hours.open} - ${hours.close}`
                              : 'Closed'}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Map placeholder with gold border glow */}
          <AnimatedSection direction="right">
            <motion.div
              className="w-full h-full min-h-[400px] rounded-lg border border-dark-lighter bg-dark flex items-center justify-center relative overflow-hidden"
              whileHover={{
                borderColor: 'rgba(201,169,110,0.4)',
                boxShadow: '0 0 30px rgba(201,169,110,0.15), inset 0 0 30px rgba(201,169,110,0.05)',
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Subtle animated gold border glow */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(201,169,110,0.1)',
                }}
              />

              <div className="text-center">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(201,169,110,0.2)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <svg
                    className="w-8 h-8 text-gold/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                    />
                  </svg>
                </motion.div>
                <p className="text-gold/30 text-sm uppercase tracking-wider mb-2">
                  Map
                </p>
                <p className="text-gray-500 text-xs">
                  1847 Newport Blvd, Suite 200
                  <br />
                  Costa Mesa, CA 92627
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
