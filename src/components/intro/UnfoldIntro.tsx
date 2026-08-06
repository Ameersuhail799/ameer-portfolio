"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UnfoldIntroProps {
  onComplete?: () => void;
}

export default function UnfoldIntro({ onComplete }: UnfoldIntroProps) {
  const [stage, setStage] = useState<'line' | 'unfold' | 'glass' | 'complete'>('line');
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Lock body scroll while intro is playing
    document.body.style.overflow = 'hidden';

    // Timeline Sequence (Total duration: 3.6 seconds)
    // 0.0s - 0.7s: Scene 1 (Single Glowing Line)
    // 0.7s - 1.9s: Scene 2 (Unfolding into Hero Layout Wireframe)
    // 1.9s - 3.0s: Scene 3 (Transforming into Glass & Content Fade-in)
    // 3.0s - 3.6s: Scene 4 (Complete Dissolve & Unlock)

    const timer1 = setTimeout(() => setStage('unfold'), 700);
    const timer2 = setTimeout(() => setStage('glass'), 1900);
    const timer3 = setTimeout(() => {
      setStage('complete');
      setIsDismissed(true);
      document.body.style.overflow = 'unset';
      document.body.style.overflowY = 'auto';
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.body.style.overflow = 'unset';
      document.body.style.overflowY = 'auto';
    };
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={() => {
      document.body.style.overflow = 'unset';
      document.body.style.overflowY = 'auto';
    }}>
      {!isDismissed && (
        <motion.div
          key="unfold-intro-container"
          className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden bg-[#07070a]"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === 'glass' ? 0.35 : stage === 'complete' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient Radial Background Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[140px]" />
          </div>

          {/* SCENE 1: Single Glowing Center Line */}
          {stage === 'line' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#38bdf8]"
                initial={{ width: '0%' }}
                animate={{ width: '60%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}

          {/* SCENE 2 & 3: Hero Wireframe Layout Unfold & Glass Transformation */}
          {(stage === 'unfold' || stage === 'glass') && (
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 pt-24 pb-16 flex items-center justify-center">
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column Hero Layout Wireframe */}
                <div className="lg:col-span-7 space-y-8 text-left">
                  
                  {/* Status Badge Outline */}
                  <motion.div
                    className={`inline-flex items-center px-4 py-1.5 rounded-full border ${
                      stage === 'glass'
                        ? 'border-indigo-500/30 bg-zinc-900/60 backdrop-blur-md'
                        : 'border-cyan-400/40 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                    }`}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2.5" />
                    <div className="h-3 w-44 bg-zinc-700/50 rounded animate-pulse" />
                  </motion.div>

                  {/* Main Title Wireframe Box (AMEER SUHAIL) */}
                  <div className="space-y-3">
                    <motion.div
                      className={`h-14 sm:h-20 max-w-xl rounded-xl border ${
                        stage === 'glass'
                          ? 'border-indigo-500/40 bg-indigo-500/5 backdrop-blur-md'
                          : 'border-cyan-400/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      }`}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      style={{ transformOrigin: 'left' }}
                    />
                    
                    {/* Role Subtitle Wireframe Line */}
                    <motion.div
                      className={`h-6 max-w-md rounded-md border ${
                        stage === 'glass'
                          ? 'border-purple-500/30 bg-purple-500/5'
                          : 'border-purple-400/50 shadow-[0_0_10px_rgba(192,132,252,0.2)]'
                      }`}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>

                  {/* Bio Paragraph Lines Wireframe */}
                  <div className="space-y-2 max-w-2xl pt-1">
                    <motion.div
                      className="h-3.5 w-full bg-zinc-800/40 rounded border border-zinc-700/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.35 }}
                    />
                    <motion.div
                      className="h-3.5 w-4/5 bg-zinc-800/40 rounded border border-zinc-700/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    />
                  </div>

                  {/* Tech Stack Pills Wireframe Row */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                      <motion.div
                        key={idx}
                        className={`h-7 w-20 rounded-lg border ${
                          stage === 'glass'
                            ? 'border-indigo-500/20 bg-indigo-500/10'
                            : 'border-indigo-400/40'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.45 + idx * 0.05 }}
                      />
                    ))}
                  </div>

                  {/* CTA Buttons Wireframe Outlines */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <motion.div
                      className={`h-12 w-36 rounded-xl border ${
                        stage === 'glass'
                          ? 'border-indigo-500/50 bg-indigo-600/30 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                          : 'border-cyan-400/80 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.65 }}
                    />
                    <motion.div
                      className={`h-12 w-36 rounded-xl border ${
                        stage === 'glass'
                          ? 'border-zinc-700/50 bg-zinc-900/40'
                          : 'border-purple-400/50'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    />
                  </div>
                </div>

                {/* Right Column Editorial Photo Card Frame Wireframe */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <motion.div
                    className={`relative w-full max-w-sm aspect-[4/5] rounded-3xl border ${
                      stage === 'glass'
                        ? 'border-indigo-500/40 bg-zinc-900/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(99,102,241,0.2)]'
                        : 'border-cyan-400/70 shadow-[0_0_25px_rgba(56,189,248,0.3)]'
                    }`}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </div>

              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
