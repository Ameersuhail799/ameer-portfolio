/**
 * Digital Forge Engine - Architectural Multi-Pass Canvas Renderer
 * Renders 3D Structural Beams, Frosted Glass Facets, and Central Volumetric Forge Core
 */

import { SimulationBounds, QualityConfig } from './types';
import { PhysicsEngine } from './PhysicsEngine';

export class RendererPass {
  private ctx: CanvasRenderingContext2D;
  private bounds: SimulationBounds;
  private config: QualityConfig;

  constructor(ctx: CanvasRenderingContext2D, bounds: SimulationBounds, config: QualityConfig) {
    this.ctx = ctx;
    this.bounds = bounds;
    this.config = config;
  }

  /**
   * Render Pipeline Execution for Generative Architectural Forge
   */
  public render(physicsEngine: PhysicsEngine): void {
    const { width, height } = this.bounds;

    // 1. Clear Pass (Deep Obsidian Void)
    this.ctx.clearRect(0, 0, width, height);

    const spark = physicsEngine.getSpark();
    const beams = physicsEngine.getStructuralBeams();
    const glassPanels = physicsEngine.getGlassPanels();

    // 2. Render 3D Structural Lattice Beams
    if (beams.length > 0) {
      this.ctx.save();
      this.ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < beams.length; i++) {
        const beam = beams[i];
        this.ctx.strokeStyle = beam.color;
        this.ctx.lineWidth = 1.0;
        this.ctx.globalAlpha = beam.opacity * 0.7;

        this.ctx.beginPath();
        this.ctx.moveTo(beam.x1, beam.y1);
        this.ctx.lineTo(beam.x2, beam.y2);
        this.ctx.stroke();
      }

      this.ctx.restore();
    }

    // 3. Render Frosted Architectural Glass Panels
    if (glassPanels.length > 0) {
      this.ctx.save();

      for (let i = 0; i < glassPanels.length; i++) {
        const panel = glassPanels[i];
        const v = panel.vertices;
        if (v.length < 4) continue;

        this.ctx.save();
        this.ctx.globalAlpha = panel.opacity;

        // Draw Glass Polygon Fill
        this.ctx.fillStyle = panel.color;
        this.ctx.beginPath();
        this.ctx.moveTo(v[0].x, v[0].y);
        for (let k = 1; k < v.length; k++) {
          this.ctx.lineTo(v[k].x, v[k].y);
        }
        this.ctx.closePath();
        this.ctx.fill();

        // Draw Sharp Glowing Border
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.strokeStyle = panel.borderColor;
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();

        this.ctx.restore();
      }

      this.ctx.restore();
    }

    // 4. Render Central Volumetric Forge Core Spark
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'lighter';

    const pulseScale = 1 + Math.sin(spark.pulsePhase) * 0.25;
    const coreRadius = spark.radius * pulseScale;
    const glowRadius = coreRadius * (spark.isAwakened ? 7 : 9);

    // Volumetric Forge Halo Glow
    const haloGrad = this.ctx.createRadialGradient(
      spark.x,
      spark.y,
      0,
      spark.x,
      spark.y,
      glowRadius
    );
    haloGrad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
    haloGrad.addColorStop(0.35, 'rgba(192, 132, 252, 0.45)');
    haloGrad.addColorStop(1, 'rgba(7, 7, 10, 0)');

    this.ctx.fillStyle = haloGrad;
    this.ctx.beginPath();
    this.ctx.arc(spark.x, spark.y, glowRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Bright Center Core
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(spark.x, spark.y, coreRadius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  public updateBounds(bounds: SimulationBounds, config: QualityConfig): void {
    this.bounds = bounds;
    this.config = config;
  }
}
