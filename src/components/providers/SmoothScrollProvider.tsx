"use client";

/**
 * SmoothScrollProvider
 * --------------------
 * Owns the Lenis smooth-scroll instance for public/marketing pages only.
 * Mounted solely by the (site) route group's layout — admin/employee/student/
 * auth route groups never render this, so they get native browser scroll.
 *
 * Lenis is driven by its own requestAnimationFrame loop, independent of GSAP —
 * GSAP + ScrollTrigger are only loaded by LibraryLoader on pages that actually
 * have scroll-triggered animations (currently just the home page). Wiring
 * ScrollTrigger to Lenis's scroll event is therefore best-effort: if GSAP shows
 * up we bind it and fire `gsap:ready` for animation components waiting on it;
 * if it never shows up (most pages), Lenis still runs fine on its own.
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";

const MAX_GSAP_WAIT_ATTEMPTS = 50; // ~5s at 100ms/attempt

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    let intervalId: ReturnType<typeof setInterval>;
    let attempts = 0;

    const tryWireGsap = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (!gsap || !ScrollTrigger) return false;

      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);
      (window as any).gsapReady = true;
      window.dispatchEvent(new CustomEvent("gsap:ready"));

      // Recalculate all ScrollTrigger positions now that Lenis is driving scroll.
      // Without this, scrub animations set up by initMindlyft() use stale offsets.
      ScrollTrigger.refresh();
      return true;
    };

    if (!tryWireGsap()) {
      intervalId = setInterval(() => {
        if (tryWireGsap() || ++attempts >= MAX_GSAP_WAIT_ATTEMPTS) {
          clearInterval(intervalId);
        }
      }, 100);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      lenis.destroy();
      delete (window as any).lenis;
      delete (window as any).gsapReady;
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
