/**
 * Superfluid Glass Matrix - Unified Gesture Recognizer
 * Independent TypeScript Input Normalizer for Mouse, Pointer, and Multi-Touch Gestures
 */

import { TouchPoint } from './types';

export type GestureType =
  | 'hover'
  | 'click'
  | 'drag'
  | 'hold'
  | 'doubleclick'
  | 'singletouch'
  | 'multitouch'
  | 'pinch'
  | 'stretch';

export interface GestureState {
  activePointers: TouchPoint[];
  pointerCount: number;
  hoverPoint: { x: number; y: number } | null;
  doubleClickPoint: { x: number; y: number } | null;
  isDragging: boolean;
  isHolding: boolean;
  isPinching: boolean;
  pinchDistance: number;
  pinchDelta: number;
  pinchCenter: { x: number; y: number } | null;
  lastGesture: GestureType | null;
}

export class GestureRecognizer {
  private targetElement: HTMLElement | null = null;
  private activePointers = new Map<number, TouchPoint>();
  private holdTimer: number | null = null;
  private lastClickTime = 0;
  private lastClickPos = { x: 0, y: 0 };
  private prevPinchDistance = 0;

  private state: GestureState = {
    activePointers: [],
    pointerCount: 0,
    hoverPoint: null,
    doubleClickPoint: null,
    isDragging: false,
    isHolding: false,
    isPinching: false,
    pinchDistance: 0,
    pinchDelta: 0,
    pinchCenter: null,
    lastGesture: null,
  };

  private gestureListeners: ((state: GestureState) => void)[] = [];

  constructor(targetElement?: HTMLElement) {
    if (targetElement) {
      this.attach(targetElement);
    }
  }

  /**
   * Attach input event listeners to target DOM element
   */
  public attach(element: HTMLElement): void {
    this.detach();
    this.targetElement = element;

    // Pointer & Mouse Events
    element.addEventListener('pointerdown', this.onPointerDown);
    element.addEventListener('pointermove', this.onPointerMove);
    element.addEventListener('pointerup', this.onPointerUp);
    element.addEventListener('pointercancel', this.onPointerUp);
    element.addEventListener('dblclick', this.onDoubleClick);

    // Touch Events for Native Multi-Touch Pinching
    element.addEventListener('touchstart', this.onTouchStart, { passive: true });
    element.addEventListener('touchmove', this.onTouchMove, { passive: true });
    element.addEventListener('touchend', this.onTouchEnd);
    element.addEventListener('touchcancel', this.onTouchEnd);
  }

  /**
   * Detach event listeners and reset active pointer maps
   */
  public detach(): void {
    if (this.targetElement) {
      const el = this.targetElement;
      el.removeEventListener('pointerdown', this.onPointerDown);
      el.removeEventListener('pointermove', this.onPointerMove);
      el.removeEventListener('pointerup', this.onPointerUp);
      el.removeEventListener('pointercancel', this.onPointerUp);
      el.removeEventListener('dblclick', this.onDoubleClick);

      el.removeEventListener('touchstart', this.onTouchStart);
      el.removeEventListener('touchmove', this.onTouchMove);
      el.removeEventListener('touchend', this.onTouchEnd);
      el.removeEventListener('touchcancel', this.onTouchEnd);

      this.targetElement = null;
    }
    this.clearHoldTimer();
    this.activePointers.clear();
  }

  private onPointerDown = (e: PointerEvent): void => {
    const rect = this.getRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const point: TouchPoint = {
      id: e.pointerId,
      x,
      y,
      prevX: x,
      prevY: y,
      velocityX: 0,
      velocityY: 0,
      timestamp: performance.now(),
    };

    this.activePointers.set(e.pointerId, point);
    this.updateState('singletouch');

    // Hold Timer Detection (Press & Hold > 250ms)
    this.clearHoldTimer();
    this.holdTimer = window.setTimeout(() => {
      if (this.activePointers.has(e.pointerId)) {
        this.state.isHolding = true;
        this.updateState('hold');
      }
    }, 250);
  };

  private onPointerMove = (e: PointerEvent): void => {
    const rect = this.getRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const existing = this.activePointers.get(e.pointerId);

    if (existing) {
      const dt = Math.max(1, performance.now() - existing.timestamp);
      existing.velocityX = (x - existing.x) / dt;
      existing.velocityY = (y - existing.y) / dt;
      existing.prevX = existing.x;
      existing.prevY = existing.y;
      existing.x = x;
      existing.y = y;
      existing.timestamp = performance.now();

      this.state.isDragging = true;
      this.updateState('drag');
    } else {
      // Hover State
      this.state.hoverPoint = { x, y };
      this.updateState('hover');
    }
  };

  private onPointerUp = (e: PointerEvent): void => {
    const rect = this.getRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.clearHoldTimer();
    this.activePointers.delete(e.pointerId);

    if (this.activePointers.size === 0) {
      this.state.isDragging = false;
      this.state.isHolding = false;
      this.state.isPinching = false;

      // Double Click Detection
      const now = performance.now();
      const distFromLast = Math.hypot(x - this.lastClickPos.x, y - this.lastClickPos.y);

      if (now - this.lastClickTime < 350 && distFromLast < 30) {
        this.state.doubleClickPoint = { x, y };
        this.updateState('doubleclick');
      } else {
        this.updateState('click');
      }

      this.lastClickTime = now;
      this.lastClickPos = { x, y };
    } else {
      this.updateState('singletouch');
    }
  };

  private onDoubleClick = (e: MouseEvent): void => {
    const rect = this.getRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.state.doubleClickPoint = { x, y };
    this.updateState('doubleclick');
  };

  private onTouchStart = (e: TouchEvent): void => {
    if (e.touches.length >= 2) {
      this.processMultiTouch(e);
    }
  };

  private onTouchMove = (e: TouchEvent): void => {
    if (e.touches.length >= 2) {
      this.processMultiTouch(e);
    }
  };

  private onTouchEnd = (): void => {
    if (this.activePointers.size < 2) {
      this.state.isPinching = false;
      this.prevPinchDistance = 0;
    }
  };

  private processMultiTouch(e: TouchEvent): void {
    const rect = this.getRect();
    const t1 = e.touches[0];
    const t2 = e.touches[1];

    const x1 = t1.clientX - rect.left;
    const y1 = t1.clientY - rect.top;
    const x2 = t2.clientX - rect.left;
    const y2 = t2.clientY - rect.top;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const pinchCenter = {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2,
    };

    if (this.prevPinchDistance > 0) {
      const pinchDelta = distance - this.prevPinchDistance;
      this.state.isPinching = true;
      this.state.pinchDistance = distance;
      this.state.pinchDelta = pinchDelta;
      this.state.pinchCenter = pinchCenter;

      const gestureType: GestureType = pinchDelta < 0 ? 'pinch' : 'stretch';
      this.updateState(gestureType);
    }

    this.prevPinchDistance = distance;
  }

  private updateState(lastGesture: GestureType): void {
    this.state.activePointers = Array.from(this.activePointers.values());
    this.state.pointerCount = this.activePointers.size;
    this.state.lastGesture = lastGesture;

    for (let i = 0; i < this.gestureListeners.length; i++) {
      this.gestureListeners[i](this.state);
    }
  }

  public consumeDoubleClick(): void {
    this.state.lastGesture = null;
    this.state.doubleClickPoint = null;
  }

  private clearHoldTimer(): void {
    if (this.holdTimer !== null) {
      clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
  }

  private getRect(): DOMRect {
    if (this.targetElement) {
      return this.targetElement.getBoundingClientRect();
    }
    return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight } as DOMRect;
  }

  /**
   * Subscribe to normalized gesture state updates
   */
  public onGesture(callback: (state: GestureState) => void): () => void {
    this.gestureListeners.push(callback);
    return () => {
      this.gestureListeners = this.gestureListeners.filter((cb) => cb !== callback);
    };
  }

  public getState(): GestureState {
    return this.state;
  }

  public destroy(): void {
    this.detach();
    this.gestureListeners = [];
  }
}
