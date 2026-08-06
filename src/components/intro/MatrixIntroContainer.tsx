"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixCanvas from './MatrixCanvas';
import MatrixOverlayControls from './MatrixOverlayControls';
import { QualityLevel } from './engine/types';

interface MatrixIntroContainerProps {
  qualityLevel?: QualityLevel;
  onDismissed?: () => void;
}

export default function MatrixIntroContainer({
  qualityLevel = 'ultra',
  onDismissed,
}: MatrixIntroContainerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const dismissIntro = useCallback(() => {
    if (isDismissed) return;
    setIsDismissed(true);

    document.body.style.overflow = 'unset';
    document.body.style.overflowY = 'auto';

    if (onDismissed) {
      onDismissed();
    }
  }, [isDismissed, onDismissed]);

  // Check Reduced Motion & Lock Body Scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      dismissIntro();
      return;
    }

    document.body.style.overflow = 'hidden';

    // Dismiss Event Listeners (For future Stages 3 & 4)
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 40 || Math.abs(e.deltaX) > 40) {
        dismissIntro();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (Math.abs(touchStartY - touchY) > 50) {
        dismissIntro();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'Space', 'Enter', 'PageDown', 'PageUp', 'Escape'].includes(e.code)) {
        dismissIntro();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.overflowY = 'auto';

      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dismissIntro]);

  return (
    <AnimatePresence onExitComplete={() => {
      document.body.style.overflow = 'unset';
      document.body.style.overflowY = 'auto';
    }}>
      {!isDismissed && (
        <motion.div
          key="digital-forge-intro"
          className="fixed inset-0 z-[100] select-none overflow-hidden bg-[#07070a]"
          style={{ pointerEvents: isDismissed ? 'none' : 'auto' }}
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            opacity: 0,
          }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Interactive Digital Forge Canvas */}
          <MatrixCanvas qualityLevel={qualityLevel} />

          {/* Minimal UI Overlay Controls */}
          <MatrixOverlayControls />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
