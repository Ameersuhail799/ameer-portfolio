"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-namespace */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Create Lando Shader Material with Faux Depth Parallax & Noise Dissolve Transition
const LandoShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoiseTexture: null,
    uResolution: new THREE.Vector2(1920, 1080),
    uOniHelmetTexture: null,
    uOniPersonTexture: null,
    uOniMaskTexture: null,
    uDepthTexture: null,
    uMouse: new THREE.Vector2(0, 0),
    uProgress: 0.6,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 worldPosition;

    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
      worldPosition = worldPos.xyz;
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform sampler2D uNoiseTexture;
    uniform vec2 uResolution;
    uniform sampler2D uOniHelmetTexture;
    uniform sampler2D uOniPersonTexture;
    uniform sampler2D uOniMaskTexture;
    uniform sampler2D uDepthTexture;
    uniform vec2 uMouse;
    uniform float uProgress;

    varying vec2 vUv;
    varying vec3 worldPosition;

    vec2 uvFauxDepth(vec2 uv, vec2 mouse, sampler2D depthImage, vec2 threshold, vec2 offset) {
      float depth = texture2D(depthImage, uv).r;
      vec2 mouseThreshold = mouse / threshold;
      vec2 depthOffset = vec2(depth) - offset;
      return uv + depthOffset * mouseThreshold;
    }

    void main() {
      vec2 uv = vUv;
      vec2 uvFakeDepth = uvFauxDepth(uv, uMouse, uDepthTexture, vec2(0.3), vec2(0.5, 0.3));

      float noise = texture2D(uNoiseTexture, uv).r;
      float stepNoise = step(uProgress, noise);

      vec4 albedo = texture2D(uOniPersonTexture, uvFakeDepth);
      vec4 helmet = texture2D(uOniHelmetTexture, uvFakeDepth);

      vec4 colorFinal = mix(albedo, helmet, helmet.a * stepNoise);

      gl_FragColor = colorFinal;
    }
  `
);

extend({ LandoShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      landoShaderMaterial: any;
    }
  }
}

function ShaderPlane({ progress }: { progress: number }) {
  const materialRef = useRef<any>(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Load Textures
  const noise = useTexture('/textures/noise/noiseValueSoft.png');
  noise.wrapS = THREE.RepeatWrapping;
  noise.wrapT = THREE.RepeatWrapping;

  const oniHelmet = useTexture('/images/onihelmet.png');
  const oniPerson = useTexture('/images/onimain.png');
  const oniMask = useTexture('/images/onimask.png');
  const oniDepth = useTexture('/images/onidepth.png');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      const tx = (halfX - e.clientX) / halfX;
      const ty = (halfY - e.clientY) / halfY;
      targetMouse.current = { x: tx * 0.015, y: ty * 0.015 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!materialRef.current) return;

    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

    materialRef.current.uTime += delta;
    materialRef.current.uMouse.set(currentMouse.current.x, currentMouse.current.y);
    materialRef.current.uProgress = progress;
  });

  return (
    <mesh>
      <planeGeometry args={[8, 8, 64, 64]} />
      <landoShaderMaterial
        ref={materialRef}
        uNoiseTexture={noise}
        uOniHelmetTexture={oniHelmet}
        uOniPersonTexture={oniPerson}
        uOniMaskTexture={oniMask}
        uDepthTexture={oniDepth}
        uProgress={progress}
        transparent
      />
    </mesh>
  );
}

export default function LandoHeroCanvas() {
  const [progress, setProgress] = useState(0.65);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      setProgress(0.15);
    } else {
      setProgress(0.65);
    }
  }, [hovered]);

  return (
    <div
      className="relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden glass-card-red transition-all duration-500 group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{
          fov: 45,
          near: 1,
          far: 100,
          position: [0, 0, 9],
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.9} color="#ffffff" />
        <fog attach="fog" args={['#060608', 5, 20]} />
        <React.Suspense fallback={null}>
          <ShaderPlane progress={progress} />
        </React.Suspense>
      </Canvas>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

      {/* Interactive Control Pill */}
      <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-red-600/40 text-[10px] font-mono-custom text-red-400 font-bold uppercase tracking-widest backdrop-blur-md z-10 shadow-lg flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${hovered ? 'bg-red-500 animate-ping' : 'bg-red-600 animate-pulse-red'}`} />
        <span>{hovered ? 'HELMET SHADER ACTIVE' : 'HOVER TO DISSOLVE SHADER'}</span>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-950/90 border border-red-600/30 backdrop-blur-xl flex items-center justify-between z-10">
        <div>
          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block font-mono-custom">
            WEBGL 3D SHADER ENGINE
          </span>
          <span className="text-sm font-extrabold text-white uppercase tracking-wider">
            AMEER SUHAIL // FAUX DEPTH
          </span>
        </div>
        <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 font-black text-xs shadow-[0_0_15px_rgba(255,30,39,0.3)]">
          LN4
        </div>
      </div>

      {/* Corner Bracket Accents */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-red-500 pointer-events-none z-10" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-red-500 pointer-events-none z-10" />
    </div>
  );
}
