/**
 * Digital Forge Engine - Procedural Architectural Catalyst
 * Transforms visitor movement intention into Apple-level 3D glass geometry and structural lattices.
 */

import { ForgeSpark, ForgeGlassPanel, ForgeStructuralBeam, SimulationBounds, ForgeStage } from './types';

export class PhysicsEngine {
  private bounds: SimulationBounds;
  private stage: ForgeStage = 'void';

  private spark: ForgeSpark;
  private glassPanels: ForgeGlassPanel[] = [];
  private structuralBeams: ForgeStructuralBeam[] = [];

  private maxGlassPanels = 32;
  private maxBeams = 80;

  private lastForgePoint = { x: 0, y: 0 };
  private forgeCounter = 0;

  constructor(bounds: SimulationBounds) {
    this.bounds = bounds;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    this.spark = {
      x: centerX,
      y: centerY,
      targetX: centerX,
      targetY: centerY,
      radius: 5,
      pulsePhase: 0,
      color: '#38bdf8',
      isAwakened: false,
    };

    this.lastForgePoint = { x: centerX, y: centerY };
  }

  /**
   * Execute 1 frame of physics update for Architectural Forge
   */
  public step(cursorPos: { x: number; y: number } | null): void {
    const { width, height } = this.bounds;
    const centerX = width / 2;
    const centerY = height / 2;

    // Pulse phase update
    this.spark.pulsePhase += 0.04;

    // STAGE 1: THE VOID — Center spark breathing
    if (!this.spark.isAwakened) {
      if (cursorPos) {
        this.spark.isAwakened = true;
        this.stage = 'creation';
        this.spark.targetX = cursorPos.x;
        this.spark.targetY = cursorPos.y;
      } else {
        this.spark.targetX = centerX + Math.sin(this.spark.pulsePhase * 0.8) * 14;
        this.spark.targetY = centerY + Math.cos(this.spark.pulsePhase * 0.6) * 14;
      }
    } else if (cursorPos) {
      this.spark.targetX = cursorPos.x;
      this.spark.targetY = cursorPos.y;
    }

    // Fluid spring lerp towards cursor target
    const dx = this.spark.targetX - this.spark.x;
    const dy = this.spark.targetY - this.spark.y;
    this.spark.x += dx * 0.15;
    this.spark.y += dy * 0.15;

    // STAGE 2: PROCEDURAL ARCHITECTURAL FORGE
    // Simple movement triggers intelligent geometric architecture generation
    if (this.spark.isAwakened) {
      const dist = Math.hypot(this.spark.x - this.lastForgePoint.x, this.spark.y - this.lastForgePoint.y);

      if (dist > 35) {
        this.forgeCounter++;
        const currX = this.spark.x;
        const currY = this.spark.y;

        // 1. Procedurally construct 3D Isometric Structural Beams
        const beamLength = 60 + Math.random() * 80;
        const angles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];

        angles.forEach((angle) => {
          if (this.structuralBeams.length >= this.maxBeams) {
            this.structuralBeams.shift();
          }
          this.structuralBeams.push({
            x1: currX,
            y1: currY,
            x2: currX + Math.cos(angle) * beamLength,
            y2: currY + Math.sin(angle) * beamLength,
            opacity: 0.8,
            color: this.forgeCounter % 2 === 0 ? '#38bdf8' : '#c084fc',
          });
        });

        // 2. Procedurally construct Glass Panel (Isometric Quad)
        const panelSize = 40 + Math.random() * 50;
        const vertices = [
          { x: currX - panelSize, y: currY - panelSize * 0.5 },
          { x: currX, y: currY - panelSize },
          { x: currX + panelSize, y: currY - panelSize * 0.5 },
          { x: currX, y: currY },
        ];

        if (this.glassPanels.length >= this.maxGlassPanels) {
          this.glassPanels.shift();
        }

        this.glassPanels.push({
          id: `panel-${Date.now()}-${Math.random()}`,
          vertices,
          opacity: 0,
          targetOpacity: 0.65,
          scale: 0.6,
          rotation: Math.random() * 0.2 - 0.1,
          color: this.forgeCounter % 3 === 0 ? 'rgba(192, 132, 252, 0.12)' : 'rgba(56, 189, 248, 0.08)',
          borderColor: this.forgeCounter % 2 === 0 ? '#38bdf8' : '#c084fc',
        });

        this.lastForgePoint = { x: currX, y: currY };
      }
    }

    // Step animation states for glass panels (Smooth grow & opacity emergence)
    for (let i = 0; i < this.glassPanels.length; i++) {
      const panel = this.glassPanels[i];
      panel.opacity += (panel.targetOpacity - panel.opacity) * 0.08;
      if (panel.scale < 1.0) {
        panel.scale += (1.0 - panel.scale) * 0.08;
      }
    }
  }

  public applyRadialImpulse(x?: number, y?: number, radius?: number, forceStrength?: number): void {
    // Architectural resonance impulse
    if (x === undefined || y === undefined || radius === undefined || forceStrength === undefined) return;
  }

  public getSpark(): ForgeSpark {
    return this.spark;
  }

  public getGlassPanels(): ForgeGlassPanel[] {
    return this.glassPanels;
  }

  public getStructuralBeams(): ForgeStructuralBeam[] {
    return this.structuralBeams;
  }

  public getStage(): ForgeStage {
    return this.stage;
  }

  public updateBounds(bounds: SimulationBounds): void {
    this.bounds = bounds;
  }

  public destroy(): void {
    this.glassPanels = [];
    this.structuralBeams = [];
  }
}
