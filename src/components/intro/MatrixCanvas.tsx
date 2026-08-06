"use client";

import React, { useEffect, useRef } from 'react';
import { QUALITY_PRESETS, SimulationBounds, QualityLevel } from './engine/types';
import { PhysicsEngine } from './engine/PhysicsEngine';
import { GestureRecognizer } from './engine/GestureRecognizer';
import { RendererPass } from './engine/RendererPass';

interface MatrixCanvasProps {
  qualityLevel?: QualityLevel;
  className?: string;
}

export default function MatrixCanvas({
  qualityLevel = 'ultra',
  className = '',
}: MatrixCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Engine References
  const physicsEngineRef = useRef<PhysicsEngine | null>(null);
  const gestureRecognizerRef = useRef<GestureRecognizer | null>(null);
  const rendererPassRef = useRef<RendererPass | null>(null);

  const animFrameIdRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = QUALITY_PRESETS[qualityLevel];

    // 1. Bounds Setup & DPR Calculation
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, config.dprCap);

    const bounds: SimulationBounds = {
      width: Math.max(1, Math.floor(rect.width)),
      height: Math.max(1, Math.floor(rect.height)),
      dpr,
    };

    canvas.width = Math.floor(bounds.width * dpr);
    canvas.height = Math.floor(bounds.height * dpr);
    canvas.style.width = `${bounds.width}px`;
    canvas.style.height = `${bounds.height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 2. Initialize Engine Instances
    const physicsEngine = new PhysicsEngine(bounds);
    const gestureRecognizer = new GestureRecognizer(container);
    const rendererPass = new RendererPass(ctx, bounds, config);

    physicsEngineRef.current = physicsEngine;
    gestureRecognizerRef.current = gestureRecognizer;
    rendererPassRef.current = rendererPass;

    // 3. Execution Pipeline in Frame Loop:
    // Gesture -> Physics.step() -> RendererPass.render()
    const frameLoop = () => {
      if (!isPausedRef.current) {
        const gestureState = gestureRecognizer.getState();
        const activePtr = gestureState.activePointers[0];
        const cursorPos = activePtr ? { x: activePtr.x, y: activePtr.y } : gestureState.hoverPoint;

        // Step A: Physics Integration Step
        physicsEngine.step(cursorPos);

        // Step B: Multi-Pass Canvas Rendering
        rendererPass.render(physicsEngine);
      }

      animFrameIdRef.current = requestAnimationFrame(frameLoop);
    };

    // Start Frame Loop
    animFrameIdRef.current = requestAnimationFrame(frameLoop);

    // 4. ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const newWidth = Math.max(1, Math.floor(entry.contentRect.width));
      const newHeight = Math.max(1, Math.floor(entry.contentRect.height));
      const newDpr = Math.min(window.devicePixelRatio || 1, config.dprCap);

      const newBounds: SimulationBounds = {
        width: newWidth,
        height: newHeight,
        dpr: newDpr,
      };

      canvas.width = Math.floor(newWidth * newDpr);
      canvas.height = Math.floor(newHeight * newDpr);
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;

      ctx.setTransform(newDpr, 0, 0, newDpr, 0, 0);

      physicsEngine.updateBounds(newBounds);
      rendererPass.updateBounds(newBounds, config);
    });

    resizeObserver.observe(container);

    // 5. Visibility Change Handler
    const handleVisibilityChange = () => {
      isPausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 6. Cleanup Sequence
    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }

      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();

      gestureRecognizer.destroy();
      physicsEngine.destroy();

      physicsEngineRef.current = null;
      gestureRecognizerRef.current = null;
      rendererPassRef.current = null;
    };
  }, [qualityLevel]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none touch-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
