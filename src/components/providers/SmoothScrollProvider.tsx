"use client";

/**
 * SmoothScrollProvider
 * --------------------
 * Owns the Lenis smooth-scroll instance for public/marketing pages only.
 * Mounted solely by the (site) route group's layout — admin/employee/student/
 * auth route groups never render this, so they get native browser scroll.
 * (Lenis calls event.preventDefault() on every wheel event, which blocks
 * scrolling entirely on pages with no GSAP scroll animations to drive it.)
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const cleanup = () => {
      const lenis = lenisRef.current;
      const tickerFn = tickerRef.current;
      const gsap = (window as any).gsap;

      if (lenis) {
        lenis.destroy();
        delete (window as any).lenis;
      }

      if (tickerFn && gsap?.ticker) {
        gsap.ticker.remove(tickerFn);
      }

      delete (window as any).gsapReady;
      lenisRef.current = null;
      tickerRef.current = null;
    };

    if (lenisRef.current) return;

    let intervalId: ReturnType<typeof setInterval>;

    const tryInit = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;

      if (!gsap || !ScrollTrigger) return; // scripts not loaded yet — interval will retry

      clearInterval(intervalId);

      if (lenisRef.current) return; // already initialised by a concurrent retry

      const lenis = new Lenis({
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const tickerFn = (time: number) => lenis.raf(time * 1000);
      tickerRef.current = tickerFn;
      lenisRef.current = lenis;

      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      (window as any).lenis = lenis;
      (window as any).gsapReady = true;
      window.dispatchEvent(new CustomEvent("gsap:ready"));

      // Recalculate all ScrollTrigger positions now that Lenis is driving scroll.
      // Without this, scrub animations set up by initMindlyft() use stale offsets.
      ScrollTrigger.refresh();
    };

    tryInit();
    intervalId = setInterval(tryInit, 100);

    return () => {
      clearInterval(intervalId);
      cleanup();
    };
  }, []);

  return <>{children}</>;
}
