"use client";

/**
 * SmoothScrollProvider
 * --------------------
 * Owns the Lenis smooth-scroll instance for public/marketing pages only.
 * Admin and student routes use native browser scroll — Lenis is skipped there
 * because it calls event.preventDefault() on every wheel event, which blocks
 * scrolling entirely when the page has no GSAP scroll animations.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Routes that must NOT use Lenis — native scroll only.
const NATIVE_SCROLL_PREFIXES = ["/admin", "/student", "/login", "/register"];

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const useNative = NATIVE_SCROLL_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix)
    );

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

    if (useNative) {
      cleanup();
      return;
    }

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
  }, [pathname]);

  return <>{children}</>;
}
