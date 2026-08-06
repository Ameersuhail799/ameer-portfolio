"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GALLERY_IMAGES = [
  { src: "/gallery/20260215_165950.jpg", title: "Creative Focus", tag: "Photography" },
  { src: "/gallery/20260711_083143-1.jpg", title: "Urban Perspective", tag: "Design" },
  { src: "/gallery/20260718_182456.jpg", title: "Visual Moments", tag: "Media" },
  { src: "/gallery/20260718_182457.jpg", title: "Framed Architecture", tag: "Art" },
  { src: "/gallery/IMG_0793~2.jpg", title: "Lighting Dynamics", tag: "Visuals" },
  { src: "/gallery/IMG_20250120_230044_404.webp", title: "Digital Texture", tag: "3D Art" },
  { src: "/gallery/IMG_20260718_181530.jpg", title: "Atmospheric Tone", tag: "Creative" },
  { src: "/gallery/IMG_20260718_181531.jpg", title: "Horizon Capture", tag: "Studio" },
  { src: "/gallery/PXL_20241222_120004880~6.jpg", title: "Street Vignette", tag: "Life" },
  { src: "/gallery/PXL_20241229_152253392~4.jpg", title: "Composition I", tag: "Design" },
  { src: "/gallery/retouch_2025120117281780.jpg", title: "Studio Light", tag: "Retouch" },
  { src: "/gallery/retouch_2026040404284589.jpg", title: "Monochrome Vibe", tag: "Style" },
  { src: "/gallery/retouch_2026040404312235.jpg", title: "Visual Contrast", tag: "Series" },
  { src: "/gallery/retouch_2026052815510134.jpg", title: "Modern Frame", tag: "Portrait" },
  { src: "/gallery/retouch_2026052823172617.jpg", title: "Final Cut", tag: "Exhibition" },
];

export default function WorksGallerySection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-widest block mb-2">
            {"VISUAL GALLERY"}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
            INTERACTIVE WORKS CANVAS
          </h2>
        </div>
        <p className="text-zinc-400 text-sm max-w-md mt-4 md:mt-0 leading-relaxed">
          Click any photograph to view in high definition or drag across the interactive visual reel below.
        </p>
      </div>

      {/* Horizontal Scroll Gallery Reel */}
      <div className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-none">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={img.src + i}
            className="w-[280px] sm:w-[320px] h-[400px] shrink-0 rounded-3xl overflow-hidden glass-panel border border-white/10 relative group cursor-pointer snap-center shadow-xl hover:border-indigo-500/50 transition-all duration-500"
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => setSelectedImg(img.src)}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Floating Tag */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider">
                {img.tag}
              </span>
            </div>

            {/* Bottom Title */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-base font-display font-extrabold text-white uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
                {img.title}
              </h3>
              <span className="text-xs text-zinc-400 font-medium block mt-0.5">
                Click to expand &rarr;
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 glass-panel shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <img
                src={selectedImg}
                alt="Enlarged view"
                className="w-full h-full object-contain max-h-[80vh] rounded-2xl"
              />
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white font-bold flex items-center justify-center hover:bg-red-600 transition-colors"
                onClick={() => setSelectedImg(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
