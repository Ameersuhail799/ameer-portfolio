/**
 * Digital Forge Engine - Architectural Data Models
 * Generative Architectural Wireframes & Frosted Glass Facets
 */

export type QualityLevel = 'ultra' | 'medium' | 'low';

export interface QualityConfig {
  dprCap: number;
  enableGlow: boolean;
}

export const QUALITY_PRESETS: Record<QualityLevel, QualityConfig> = {
  ultra: {
    dprCap: 2.0,
    enableGlow: true,
  },
  medium: {
    dprCap: 1.5,
    enableGlow: false,
  },
  low: {
    dprCap: 1.0,
    enableGlow: false,
  },
};

export interface TouchPoint {
  id: number;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  velocityX: number;
  velocityY: number;
  timestamp: number;
}

export interface TensionLine {
  id: string;
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  distance: number;
  tension: number;
  active: boolean;
}

export interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  intensity: number;
  speed: number;
}

export type ForgeStage = 'void' | 'creation' | 'forging' | 'completion';

export interface ForgeSpark {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  pulsePhase: number;
  color: string;
  isAwakened: boolean;
}

// Architectural Glass Facet (Procedurally constructed polygon)
export interface ForgeGlassPanel {
  id: string;
  vertices: { x: number; y: number }[];
  opacity: number;
  targetOpacity: number;
  scale: number;
  rotation: number;
  color: string;
  borderColor: string;
}

// Structural Lattice Line (Architectural beam)
export interface ForgeStructuralBeam {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  color: string;
}

export interface SimulationBounds {
  width: number;
  height: number;
  dpr: number;
}
