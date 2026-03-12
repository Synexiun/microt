'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Modal from '@/components/ui/Modal';

const categories = ['All', 'Microblading', 'Brows', 'Lips', 'Eyeliner'] as const;

type Category = (typeof categories)[number];

interface GalleryItem {
  id: number;
  title: string;
  category: Category;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Natural Microblading', category: 'Microblading' },
  { id: 2, title: 'Ombre Powder Brows', category: 'Brows' },
  { id: 3, title: 'Rosy Lip Blush', category: 'Lips' },
  { id: 4, title: 'Classic Eyeliner', category: 'Eyeliner' },
  { id: 5, title: 'PhiBrows Artistry', category: 'Microblading' },
  { id: 6, title: 'Combo Brows', category: 'Brows' },
  { id: 7, title: 'Nude Lip Blush', category: 'Lips' },
  { id: 8, title: 'Lash Enhancement', category: 'Eyeliner' },
  { id: 9, title: 'Bold Brow Transformation', category: 'Microblading' },
  { id: 10, title: 'Soft Arch Brows', category: 'Brows' },
  { id: 11, title: 'Berry Lip Blush', category: 'Lips' },
  { id: 12, title: 'Winged Eyeliner', category: 'Eyeliner' },
];

const gradients: Record<string, string> = {
  Microblading:
    'from-gold/20 via-champagne/10 to-dark-light',
  Brows:
    'from-gold-dark/20 via-dark-light to-dark',
  Lips:
    'from-rose-900/20 via-gold/10 to-dark-light',
  Eyeliner:
    'from-dark via-gold/10 to-dark-light',
};

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Work"
          subtitle="See the transformations"
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gold-gradient text-black shadow-glow-sm'
                  : 'bg-dark-light text-gray-400 border border-dark-lighter hover:border-gold/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group border border-dark-lighter hover:border-gold/30 transition-all duration-300"
              >
                {/* Placeholder gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    gradients[item.category] || 'from-dark-light to-dark'
                  }`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                    <svg
                      className="w-5 h-5 text-gold/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </p>
                  <p className="text-gold/60 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </p>
                </div>

                {/* Hover glow border */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-gold/20" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        className="max-w-2xl"
      >
        {selectedItem && (
          <div>
            {/* Large placeholder */}
            <div
              className={`aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br ${
                gradients[selectedItem.category] || 'from-dark-light to-dark'
              } flex items-center justify-center mb-4`}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
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
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                    />
                  </svg>
                </div>
                <p className="text-gold/40 text-sm">Portfolio Image</p>
              </div>
            </div>
            <h3 className="font-heading text-xl text-white mb-1">
              {selectedItem.title}
            </h3>
            <p className="text-gold text-sm">{selectedItem.category}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}
