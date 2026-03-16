'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BRAND, NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gold transition-colors duration-300"
      aria-label={label}
      whileHover={{
        scale: 1.2,
        filter: 'drop-shadow(0 0 8px rgba(201,169,110,0.5))',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribeStatus('success');
        setEmail('');
      } else {
        setSubscribeStatus('error');
      }
    } catch {
      setSubscribeStatus('error');
    }
  };

  return (
    <footer className="relative bg-dark overflow-hidden">
      {/* Animated gold gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.6) 25%, rgba(212,175,55,0.8) 50%, rgba(201,169,110,0.6) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'textShimmer 6s linear infinite',
        }}
      />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, rgba(201,169,110,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 75% 50%, rgba(201,169,110,0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-shimmer mb-4 inline-block">
              Velvet Brow Studio
            </h3>
            <p className="text-gold text-sm uppercase tracking-wider mb-4">
              {BRAND.tagline}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Costa Mesa&apos;s premier luxury permanent makeup studio. We combine
              artistry with precision to enhance your natural beauty, one stroke
              at a time. Specializing in microblading, ombre/powder brows, combo
              brows, lip blush, and eye liner.
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Serving Costa Mesa, Newport Beach, Irvine, and surrounding Orange
              County areas.
            </p>
          </div>

          {/* Column 2: Quick Links with underline slide-in */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-gold transition-colors duration-300 relative group inline-block"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 text-sm hover:text-gold transition-colors duration-300 relative group inline-block"
                >
                  FAQ
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link
                  href="/consent"
                  className="text-gray-400 text-sm hover:text-gold transition-colors duration-300 relative group inline-block"
                >
                  Consent Form
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-gold text-sm font-semibold hover:text-gold-light transition-colors duration-300 relative group inline-block"
                >
                  Book Now
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold-light transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
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
                <a
                  href={`tel:${BRAND.phone}`}
                  className="text-gray-400 text-sm hover:text-gold transition-colors relative group"
                >
                  {BRAND.phone}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
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
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-gray-400 text-sm hover:text-gold transition-colors relative group"
                >
                  {BRAND.email}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
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
                <span className="text-gray-400 text-sm">
                  1847 Newport Blvd, Suite 200
                  <br />
                  Costa Mesa, CA 92627
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for exclusive offers, beauty tips, and studio updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-dark-light border border-dark-lighter rounded px-4 py-3 text-white placeholder-gray-500 text-sm transition-all duration-300 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 focus:shadow-glow-sm"
              />
              <motion.button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(201,169,110,0.3)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full bg-gold-gradient px-6 py-3 text-black font-semibold uppercase tracking-widest text-xs rounded hover:shadow-glow transition-shadow duration-300 disabled:opacity-50"
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
              {subscribeStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-xs"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
              {subscribeStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social icons with scale + glow on hover */}
          <div className="flex items-center gap-5">
            <SocialIcon href={SOCIAL_LINKS.instagram} label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={SOCIAL_LINKS.tiktok} label="TikTok">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={SOCIAL_LINKS.facebook} label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </SocialIcon>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-xs text-center">
            &copy; 2026 Velvet Brow Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
