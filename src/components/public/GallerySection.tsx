'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Modal from '@/components/ui/Modal';
import { sampleGalleryImages } from '@/lib/sample-data';

const categoryMap: Record<string, string> = {
  microblading: 'Microblading',
  phibrows: 'Brows',
  'combo-brows': 'Brows',
  'lip-blush': 'Lips',
  'permanent-eyeliner': 'Eyeliner',
};

const categories = ['All', 'Microblading', 'Brows', 'Lips', 'Eyeliner'] as const;

type Category = (typeof categories)[number];

interface GalleryItem {
  id: string;
  title: string;
  category: Category;
  image: string;
  type: string;
}

const galleryItems: GalleryItem[] = sampleGalleryImages.map((img, index) => ({
  id: img.id,
  title: img.title,
  category: (categoryMap[img.serviceSlug] || 'Microblading') as Category,
  image: `/images/gallery/gallery-${index + 1}.svg`,
  type: img.type,
}));

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      layoutId={`gallery-${item.id}`}
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 30,
        delay: index * 0.05,
        filter: { duration: 0.3 },
      }}
      onClick={onClick}
      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group border border-dark-lighter hover:border-gold/30 transition-all duration-300"
    >
      {/* Gallery image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gold overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />

      {/* Type badge */}
      {item.type === 'before-after' && (
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-gold/90 text-black text-[10px] font-bold uppercase tracking-wider rounded z-10">
          Before &amp; After
        </span>
      )}

      {/* Hover content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={false}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
        >
          {/* View icon */}
          <div className="w-10 h-10 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-5 h-5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-white text-sm font-medium">{item.title}</p>
          <p className="text-gold/60 text-xs mt-1">{item.category}</p>
        </motion.div>
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-gold/30" />
    </motion.div>
  );
}

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

        {/* Filter tabs with sliding gold underline */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 relative">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gold-gradient text-black shadow-glow-sm'
                  : 'bg-dark-light text-gray-400 border border-dark-lighter hover:border-gold/30 hover:text-white'
              }`}
            >
              {cat}
              {activeFilter === cat && (
                <motion.div
                  layoutId="gallery-tab-indicator"
                  className="absolute inset-0 rounded-full bg-gold-gradient -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Gallery grid with staggered entrance */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedItem(item)}
              />
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
            {/* Large image */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-dark-light">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl text-white mb-1">
                  {selectedItem.title}
                </h3>
                <p className="text-gold text-sm">{selectedItem.category}</p>
              </div>
              {selectedItem.type === 'before-after' && (
                <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider rounded-full">
                  Before &amp; After
                </span>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
