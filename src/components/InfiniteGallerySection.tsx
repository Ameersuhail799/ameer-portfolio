"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const InfiniteGallery = dynamic(() => import('./InfiniteGallery'), {
  ssr: false,
});

export default function InfiniteGallerySection() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse-red shadow-[0_0_10px_#e10600]" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            INTERACTIVE CANVAS GALLERY
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block uppercase tracking-wider">
          [ DRAG & WHEEL ZOOM ON EMPTY CANVAS ]
        </span>
      </div>

      {/* Bounded Floating Photo Canvas Frame */}
      <div className="relative h-[650px] w-full rounded-3xl overflow-hidden border border-red-600/30 bg-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.95)] group">
        <InfiniteGallery
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
        
        {/* Corner frame overlays */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-red-500 pointer-events-none" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-red-500 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-red-500 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-red-500 pointer-events-none" />
      </div>
    </section>
  );
}
