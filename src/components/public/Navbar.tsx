'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import GoldButton from '@/components/ui/GoldButton';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  socialLinks: { instagram: string; tiktok: string; facebook: string };
}

export default function Navbar({ socialLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/' + href;
      }
    },
    []
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between"
            animate={{ height: scrolled ? 64 : 80 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="relative w-8 h-8 md:w-10 md:h-10 text-gold flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                  <path d="M12 6.5c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5zm0 10c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z" opacity=".3"/>
                </svg>
              </div>
              <span className="font-heading text-xl md:text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent">
                Velvet Brow Studio
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm uppercase tracking-wider relative group transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-gray-300 hover:text-gold'
                    }`}
                  >
                    {link.label}
                    {/* Gold underline that slides in from left */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-gold to-gold-light transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                );
              })}
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
          </motion.div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} socialLinks={socialLinks} />
    </>
  );
}
