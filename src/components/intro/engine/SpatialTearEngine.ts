/**
 * Superfluid Glass Matrix - Spatial Tear & Snapback Engine
 * Calculates Chromatic Spatial Tension Lines, Double-Click Supernova Waves, and Elastic Snapbacks
 */

import { TensionLine, Shockwave } from './types';
import { GestureState, GestureRecognizer } from './GestureRecognizer';
import { PhysicsEngine } from './PhysicsEngine';

export class SpatialTearEngine {
  private activeTensionLine: TensionLine | null = null;
  private shockwaves: Shockwave[] = [];
  private maxShockwaves = 8;
  private maxTensionDistance = 350;

  /**
   * Process GestureState and update spatial tension / double-click / hover / snapback events
   */
  public update(
    gestureState: GestureState,
    physicsEngine: PhysicsEngine,
    gestureRecognizer?: GestureRecognizer
  ): void {
    const { activePointers, isPinching, isDragging, hoverPoint, lastGesture, doubleClickPoint } = gestureState;

    // SCENARIO 0: Double-Click Supernova Blast Pulse
    if (lastGesture === 'doubleclick') {
      const clickX = doubleClickPoint?.x ?? hoverPoint?.x ?? activePointers[0]?.x ?? 200;
      const clickY = doubleClickPoint?.y ?? hoverPoint?.y ?? activePointers[0]?.y ?? 200;

      // Spawn Dual High-Intensity Concentric Shockwave Rings
      this.spawnShockwave(clickX, clickY, 1.0);
      this.spawnShockwave(clickX, clickY, 0.75);

      // Inject high-energy blast impulse into PhysicsEngine Verlet loop
      physicsEngine.applyRadialImpulse(clickX, clickY, 280, 24.0);

      if (gestureRecognizer) {
        gestureRecognizer.consumeDoubleClick();
      }
    }
    // SCENARIO 1: Multi-Touch Pinch or Two-Point Drag Spatial Tear
    else if ((isPinching || activePointers.length >= 2) && activePointers.length >= 2) {
      const p1 = activePointers[0];
      const p2 = activePointers[1];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const tension = Math.min(1.0, dist / this.maxTensionDistance);

      this.activeTensionLine = {
        id: 'chromatic-tear',
        p1: { x: p1.x, y: p1.y },
        p2: { x: p2.x, y: p2.y },
        distance: dist,
        tension: tension,
        active: true,
      };

      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      physicsEngine.applyRadialImpulse(midX, midY, dist * 0.7, tension * 6.0);
    }
    // SCENARIO 2: Single-Pointer Drag Tear
    else if (isDragging && activePointers.length === 1) {
      const p = activePointers[0];
      const speed = Math.sqrt(p.velocityX * p.velocityX + p.velocityY * p.velocityY);

      if (speed > 0.3) {
        const tearLength = Math.min(220, Math.max(60, speed * 80));
        const normVx = p.velocityX / (speed || 1);
        const normVy = p.velocityY / (speed || 1);

        this.activeTensionLine = {
          id: 'single-tear',
          p1: { x: p.x - normVx * (tearLength / 2), y: p.y - normVy * (tearLength / 2) },
          p2: { x: p.x + normVx * (tearLength / 2), y: p.y + normVy * (tearLength / 2) },
          distance: tearLength,
          tension: Math.min(1.0, Math.max(0.3, speed / 2.0)),
          active: true,
        };

        physicsEngine.applyRadialImpulse(p.x, p.y, 110, Math.max(2.5, speed * 4.0));
      } else {
        physicsEngine.applyRadialImpulse(p.x, p.y, 90, 2.0);
        this.releaseTensionLine(physicsEngine);
      }
    }
    // SCENARIO 3: Single-Cursor Hover Repulsion Physics
    else if (hoverPoint && activePointers.length === 0) {
      physicsEngine.applyRadialImpulse(hoverPoint.x, hoverPoint.y, 130, 2.8);
      this.releaseTensionLine(physicsEngine);
    }
    // SCENARIO 4: Release Event -> Trigger Elastic Snapback Shockwave
    else {
      this.releaseTensionLine(physicsEngine);
    }

    // Step 2: Update Active Shockwaves
    this.updateShockwaves(physicsEngine);
  }

  /**
   * Release active tension line and spawn elastic snapback shockwave
   */
  private releaseTensionLine(physicsEngine: PhysicsEngine): void {
    if (this.activeTensionLine && this.activeTensionLine.active) {
      const line = this.activeTensionLine;
      const midX = (line.p1.x + line.p2.x) / 2;
      const midY = (line.p1.y + line.p2.y) / 2;

      this.spawnShockwave(midX, midY, line.tension);

      const forceStrength = line.tension * 18.0;
      physicsEngine.applyRadialImpulse(midX, midY, line.distance * 1.3, forceStrength);

      this.activeTensionLine.active = false;
      this.activeTensionLine = null;
    }
  }

  /**
   * Spawn shockwave ring
   */
  public spawnShockwave(x: number, y: number, tension: number): void {
    if (this.shockwaves.length >= this.maxShockwaves) {
      this.shockwaves.shift();
    }

    this.shockwaves.push({
      x,
      y,
      radius: 10,
      maxRadius: 180 + tension * 160,
      intensity: 1.0,
      speed: 6 + tension * 8,
    });
  }

  /**
   * Step shockwave animation radius and intensity decay
   */
  private updateShockwaves(physicsEngine: PhysicsEngine): void {
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const wave = this.shockwaves[i];
      wave.radius += wave.speed;
      wave.intensity = Math.max(0, 1.0 - wave.radius / wave.maxRadius);

      physicsEngine.applyRadialImpulse(wave.x, wave.y, wave.radius, wave.intensity * 2.5);

      if (wave.intensity <= 0.01 || wave.radius >= wave.maxRadius) {
        this.shockwaves.splice(i, 1);
      }
    }
  }

  /**
   * Get active chromatic tension line for RendererPass
   */
  public getTensionLine(): TensionLine | null {
    return this.activeTensionLine;
  }

  /**
   * Get active shockwaves for RendererPass
   */
  public getShockwaves(): Shockwave[] {
    return this.shockwaves;
  }

  /**
   * Clean up resources
   */
  public destroy(): void {
    this.activeTensionLine = null;
    this.shockwaves = [];
  }
}
