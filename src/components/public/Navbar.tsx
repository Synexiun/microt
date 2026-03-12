'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import GoldButton from '@/components/ui/GoldButton';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-md shadow-lg border-b border-dark-lighter'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-heading text-xl md:text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent">
                Velvet Brow Studio
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm uppercase tracking-wider text-gray-300 hover:text-gold transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link href="/book">
                <GoldButton className="py-3 px-6 text-xs">Book Now</GoldButton>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group"
              aria-label="Open menu"
            >
              <span className="block w-6 h-[2px] bg-white group-hover:bg-gold transition-colors duration-300" />
              <span className="block w-6 h-[2px] bg-white group-hover:bg-gold transition-colors duration-300" />
              <span className="block w-4 h-[2px] bg-white group-hover:bg-gold transition-colors duration-300 self-end mr-[2px]" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
