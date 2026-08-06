"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollRevealHeading({ children, className = "" }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const el = headingRef.current;
    if (!el) return;

    // Detect prefers-reduced-motion media query
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Simplify to a simple fade with no scaling or translation
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    } else {
      // Standard subtle entrance scrub: y: 40 -> 0, scale: 0.9 -> 1, opacity: 0 -> 1
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    }

    return () => {
      // Clean up the specific ScrollTrigger instances created for this heading
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <h2 ref={headingRef} className={className}>
      {children}
    </h2>
  );
}
