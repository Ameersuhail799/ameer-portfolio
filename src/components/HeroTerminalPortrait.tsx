"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TerminalDot {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
}

interface HeroTerminalPortraitProps {
  imageSrc?: string;
  className?: string;
}

export default function HeroTerminalPortrait({
  imageSrc = '/gallery/ameer_headshot.jpg',
  className = '',
}: HeroTerminalPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<TerminalDot[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      if (!isMounted) return;

      const sampleWidth = 140;
      const sampleHeight = 185;
      const offCanvas = document.createElement('canvas');
      offCanvas.width = sampleWidth;
      offCanvas.height = sampleHeight;
      const offCtx = offCanvas.getContext('2d');

      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imgData.data;

      // Studio White Background Flood-Fill (Marks background as 1)
      const isBackground = new Uint8Array(sampleWidth * sampleHeight);
      const queue: number[] = [];

      for (let x = 0; x < sampleWidth; x++) {
        queue.push(x, 0);
        queue.push(x, sampleHeight - 1);
      }
      for (let y = 0; y < sampleHeight; y++) {
        queue.push(0, y);
        queue.push(sampleWidth - 1, y);
      }

      while (queue.length > 0) {
        const cy = queue.pop()!;
        const cx = queue.pop()!;
        const idx = cy * sampleWidth + cx;

        if (isBackground[idx] === 1) continue;

        const pixIdx = idx * 4;
        const r = data[pixIdx];
        const g = data[pixIdx + 1];
        const b = data[pixIdx + 2];

        if (r > 200 && g > 200 && b > 200) {
          isBackground[idx] = 1;
          if (cx > 0 && isBackground[cy * sampleWidth + (cx - 1)] === 0) queue.push(cx - 1, cy);
          if (cx < sampleWidth - 1 && isBackground[cy * sampleWidth + (cx + 1)] === 0) queue.push(cx + 1, cy);
          if (cy > 0 && isBackground[(cy - 1) * sampleWidth + cx] === 0) queue.push(cx, cy - 1);
          if (cy < sampleHeight - 1 && isBackground[(cy + 1) * sampleWidth + cx] === 0) queue.push(cx, cy + 1);
        }
      }

      const lumMap = new Float32Array(sampleWidth * sampleHeight);
      const edgeMap = new Float32Array(sampleWidth * sampleHeight);

      for (let y = 0; y < sampleHeight; y++) {
        for (let x = 0; x < sampleWidth; x++) {
          const idx = y * sampleWidth + x;
          const pixIdx = idx * 4;
          const r = data[pixIdx];
          const g = data[pixIdx + 1];
          const b = data[pixIdx + 2];
          lumMap[idx] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        }
      }

      for (let y = 1; y < sampleHeight - 1; y++) {
        for (let x = 1; x < sampleWidth - 1; x++) {
          const idx = y * sampleWidth + x;
          const gx = Math.abs(lumMap[idx + 1] - lumMap[idx - 1]);
          const gy = Math.abs(lumMap[idx + sampleWidth] - lumMap[idx - sampleWidth]);
          edgeMap[idx] = Math.min(1.0, gx + gy);
        }
      }

      const tempDots: TerminalDot[] = [];

      for (let py = 0; py < sampleHeight; py += 2) {
        for (let px = 0; px < sampleWidth; px += 2) {
          const mapIdx = py * sampleWidth + px;

          if (isBackground[mapIdx] === 1) continue;

          const lum = lumMap[mapIdx];
          const edge = edgeMap[mapIdx];

          const normX = px / sampleWidth;
          const normY = py / sampleHeight;

          // Feature mapping: Dark pixels (hair, eyes, eyebrows, lips, contours) render as glowing dots!
          const isDarkFeature = lum < 0.60;
          const isHighEdge = edge > 0.08;

          let sampleProb = 0.30;
          let dotAlpha = 0.70;
          let dotSize = 1.5;

          if (isDarkFeature || isHighEdge) {
            sampleProb = 0.92; // High dot density for eyes, hair curls, facial details
            dotAlpha = 0.95;
            dotSize = 1.8;
          } else {
            sampleProb = 0.25;
            dotAlpha = 0.50;
            dotSize = 1.3;
          }

          if (Math.random() < sampleProb) {
            const rand = Math.random();
            let color = '#38bdf8'; // Glowing Electric Cyan Terminal Dot

            if (rand > 0.82 && rand <= 0.93) {
              color = '#c084fc'; // Glowing Purple Accent
            } else if (rand > 0.93) {
              color = '#ffffff'; // Crisp White Accent
            }

            tempDots.push({
              x: normX,
              y: normY,
              size: dotSize,
              alpha: dotAlpha,
              color: color,
            });
          }
        }
      }

      dotsRef.current = tempDots;
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      time += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const dots = dotsRef.current;

      if (dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const canvasX = dot.x * width;
          const canvasY = dot.y * height;

          const pulse = Math.sin(time * 2 + i * 0.1) * 0.12;
          const finalAlpha = Math.max(0.2, Math.min(1.0, dot.alpha + pulse));

          ctx.globalAlpha = finalAlpha;
          ctx.beginPath();
          ctx.arc(canvasX, canvasY, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.shadowColor = dot.color;
          ctx.shadowBlur = 5;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      ctx.globalAlpha = 1.0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [imageSrc]);

  return (
    <div
      className={`w-full h-full relative flex items-center justify-center transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 blur-2xl -z-10 pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]"
      />
    </div>
  );
}
