"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

export type PortraitMode = 'dots' | 'hologram' | 'matrix';

interface StoredDot {
  x: number; // Normalized X (0 to 1)
  y: number; // Normalized Y (0 to 1)
  size: number;
  alpha: number;
  orderIndex: number;
  char?: string;
  color?: string;
  vx?: number;
  vy?: number;
}

interface Hotspot {
  id: string;
  normX: number;
  normY: number;
  label: string;
  sub: string;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'head', normX: 0.50, normY: 0.18, label: 'FULL STACK DEVELOPER', sub: 'Next.js • React • Node • Tailwind' },
  { id: 'eyes', normX: 0.50, normY: 0.36, label: 'AI & MACHINE LEARNING', sub: 'Python • PyTorch • Computer Vision' },
  { id: 'chest', normX: 0.50, normY: 0.65, label: 'B.TECH IT // KTU', sub: 'Information Technology • 3rd Year' },
];

const MATRIX_CHARS = ['0', '1', '<', '>', '/', '{', '}', ';', '#', 'A', 'M', 'E', 'E', 'R'];

interface ParticlePortraitCanvasProps {
  progress?: number;
  mode?: PortraitMode;
  isWarping?: boolean;
  imageSrc?: string;
  className?: string;
}

export default function ParticlePortraitCanvas({
  progress = 1.0,
  mode = 'dots',
  isWarping = false,
  imageSrc = '/gallery/ameerpic~2.jpeg',
  className = '',
}: ParticlePortraitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<StoredDot[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const progressRef = useRef(progress);
  const modeRef = useRef(mode);
  const isWarpingRef = useRef(isWarping);

  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    progressRef.current = Math.max(0, Math.min(1, progress));
  }, [progress]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    isWarpingRef.current = isWarping;
  }, [isWarping]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normMouseX = (x / rect.width) * 2 - 1;
    const normMouseY = (y / rect.height) * 2 - 1;

    setTilt({ x: normMouseX * 10, y: -normMouseY * 10 });
    mousePosRef.current = { x: x / rect.width, y: y / rect.height, active: true };

    const hovered = HOTSPOTS.find((h) => {
      const dx = (x / rect.width) - h.normX;
      const dy = (y / rect.height) - h.normY;
      return Math.sqrt(dx * dx + dy * dy) < 0.08;
    });
    setActiveHotspot(hovered || null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    mousePosRef.current = { x: -1000, y: -1000, active: false };
    setActiveHotspot(null);
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

      const sampleWidth = 180;
      const sampleHeight = 240;
      const offCanvas = document.createElement('canvas');
      offCanvas.width = sampleWidth;
      offCanvas.height = sampleHeight;
      const offCtx = offCanvas.getContext('2d');

      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imgData.data;

      // Flood-Fill Background Removal (Guarantees ZERO dots outside the person)
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
        const a = data[pixIdx + 3];

        if ((r + g + b < 85) || (a < 20)) {
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

      // Feature-Aware Sampling (Eyes, eyebrows, nose, mouth, curly hair texture pop crisply)
      const tempDots: { x: number; y: number; size: number; alpha: number; char: string; color: string }[] = [];

      for (let py = 0; py < sampleHeight; py += 2) {
        for (let px = 0; px < sampleWidth; px += 2) {
          const mapIdx = py * sampleWidth + px;

          if (isBackground[mapIdx] === 1) continue;

          const lum = lumMap[mapIdx];
          const edge = edgeMap[mapIdx];

          const normX = px / sampleWidth;
          const normY = py / sampleHeight;

          const isHair = normY < 0.35;
          const isEyesEyebrowsNose = normX > 0.32 && normX < 0.68 && normY >= 0.28 && normY <= 0.44;
          const isMouthJaw = normX > 0.32 && normX < 0.68 && normY > 0.44 && normY <= 0.54;
          const isFaceSkin = normX > 0.28 && normX < 0.72 && normY >= 0.28 && normY <= 0.54;

          let sampleProb = 0.35;
          let dotAlpha = 0.85;
          let dotSize = 1.6;

          if (isHair) {
            sampleProb = 0.85;
            dotAlpha = 0.95;
            dotSize = 1.7;
          } else if (isEyesEyebrowsNose) {
            if (edge > 0.12 || lum < 0.48) {
              sampleProb = 0.95;
              dotAlpha = 1.0;
              dotSize = 1.8;
            } else {
              sampleProb = 0.30;
              dotAlpha = 0.65;
              dotSize = 1.4;
            }
          } else if (isMouthJaw) {
            if (edge > 0.12 || lum < 0.45) {
              sampleProb = 0.90;
              dotAlpha = 0.95;
              dotSize = 1.7;
            } else {
              sampleProb = 0.30;
              dotAlpha = 0.65;
              dotSize = 1.4;
            }
          } else if (isFaceSkin) {
            sampleProb = 0.28;
            dotAlpha = 0.60;
            dotSize = 1.4;
          } else {
            sampleProb = 0.38;
            dotAlpha = 0.75;
            dotSize = 1.5;
          }

          if (Math.random() < sampleProb) {
            const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            const colorRand = Math.random();
            let color = '#ffffff';

            if (colorRand > 0.85 && colorRand <= 0.93) {
              color = '#c084fc';
            } else if (colorRand > 0.93) {
              color = '#38bdf8';
            }

            tempDots.push({
              x: normX,
              y: normY,
              size: dotSize,
              alpha: dotAlpha,
              char: char,
              color: color,
            });
          }
        }
      }

      tempDots.sort((a, b) => a.y - b.y);

      const count = tempDots.length;
      const finalDots: StoredDot[] = tempDots.map((dot, index) => ({
        x: dot.x,
        y: dot.y,
        size: dot.size,
        alpha: dot.alpha,
        char: dot.char,
        color: dot.color,
        orderIndex: count > 0 ? index / count : 0,
        vx: (Math.random() - 0.5) * 0.03,
        vy: (Math.random() - 0.5) * 0.03 - 0.02,
      }));

      dotsRef.current = finalDots;
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

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const pVal = progressRef.current;
      const currentMode = modeRef.current;
      const warping = isWarpingRef.current;
      const dots = dotsRef.current;
      const mouse = mousePosRef.current;

      if (dots.length > 0 && pVal > 0.001) {
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];

          if (dot.orderIndex > pVal) continue;

          const fadeProgress = Math.min(1.0, (pVal - dot.orderIndex) / 0.05 + 0.9);

          let drawX = dot.x;
          let drawY = dot.y;

          if (warping) {
            dot.x += (dot.vx || 0.01) * 2.5;
            dot.y += (dot.vy || 0.01) * 2.5;
            dot.size *= 1.04;
            drawX = dot.x;
            drawY = dot.y;
          } else if (mouse.active) {
            const dx = mouse.x - dot.x;
            const dy = mouse.y - dot.y;
            const distSq = dx * dx + dy * dy;
            const magRadius = 0.025;

            if (distSq < magRadius) {
              const dist = Math.sqrt(distSq);
              const force = (1.0 - dist / Math.sqrt(magRadius)) * 0.025;
              drawX -= (dx / dist) * force;
              drawY -= (dy / dist) * force;
            }
          }

          const canvasX = drawX * width;
          const canvasY = drawY * height;
          const finalAlpha = Math.min(1.0, dot.alpha * fadeProgress);

          ctx.globalAlpha = finalAlpha;

          if (currentMode === 'dots') {
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, dot.size, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
          } else if (currentMode === 'hologram') {
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, dot.size * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = dot.color || '#38bdf8';
            ctx.shadowColor = dot.color || '#38bdf8';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if (currentMode === 'matrix') {
            ctx.font = '10px monospace';
            ctx.fillStyle = i % 5 === 0 ? '#34d399' : '#38bdf8';
            ctx.fillText(dot.char || '1', canvasX, canvasY);
          }
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
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none"
      />

      {/* Interactive Target Hotspots */}
      {HOTSPOTS.map((h) => (
        <div
          key={h.id}
          className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center cursor-pointer group z-20"
          style={{ left: `${h.normX * 100}%`, top: `${h.normY * 100}%` }}
        >
          <span className="absolute inset-0 rounded-full border border-indigo-400/40 animate-ping opacity-75" />
          <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
        </div>
      ))}

      {/* Floating HUD Tooltip Card on Hover */}
      {activeHotspot && (
        <div
          className="absolute z-30 pointer-events-none px-4 py-2 rounded-xl bg-zinc-950/90 border border-indigo-500/30 backdrop-blur-md shadow-2xl transition-all duration-200"
          style={{
            left: `${Math.min(75, Math.max(25, activeHotspot.normX * 100))}%`,
            top: `${activeHotspot.normY * 100 - 12}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <p className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
            {activeHotspot.label}
          </p>
          <p className="text-xs font-sans text-zinc-300 font-medium">
            {activeHotspot.sub}
          </p>
        </div>
      )}
    </div>
  );
}
