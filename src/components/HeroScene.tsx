"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    // Continuous slow rotation increment
    baseRotation.current.y += 0.002;
    baseRotation.current.x += 0.001;

    // Mouse movement influence (target offset)
    const targetX = baseRotation.current.x + state.pointer.y * 0.3;
    const targetY = baseRotation.current.y + state.pointer.x * 0.3;

    // Smooth interpolation (lerping)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetX,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetY,
      0.05
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.3, 64, 64]} />
      <MeshDistortMaterial
        color="#4c1d95" // Deep violet base color
        roughness={0.2}
        metalness={0.6}
        distort={0.35}
        speed={1.5}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        {/* Main dramatic point light front/above */}
        <pointLight position={[0, 5, 5]} intensity={2} color="#ffffff" />
        {/* Accent light with cool purple color from the side/bottom */}
        <pointLight position={[-5, -3, 2]} intensity={1.5} color="#8b5cf6" />
        
        <DistortedSphere />
      </Canvas>
    </div>
  );
}


