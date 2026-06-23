/**
 * gsap-config.ts — single source of truth for GSAP access in React components.
 *
 * We deliberately return window.gsap / window.ScrollTrigger instead of
 * importing the npm bundle, because:
 *
 *  1. layout.tsx loads gsap.min.js + scrollTrigger.min.js as global scripts.
 *  2. main.js registers SplitText, CustomEase, etc. on those same globals.
 *  3. Importing the npm package creates a SECOND, independent GSAP instance
 *     that is unaware of those plugins and (critically) unaware of the Lenis
 *     tick integration set up by SmoothScrollProvider.
 *
 * Call getGsap() / getScrollTrigger() INSIDE useEffect only — never at module
 * level or during render, where window may be undefined (SSR).
 */

import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

/** Returns the globally loaded GSAP core (same instance as main.js uses). */
export function getGsap(): typeof GsapType {
  return (window as any).gsap as typeof GsapType;
}

/** Returns the globally loaded ScrollTrigger (wired to Lenis by SmoothScrollProvider). */
export function getScrollTrigger(): typeof ScrollTriggerType {
  return (window as any).ScrollTrigger as typeof ScrollTriggerType;
}

/**
 * Runs `callback` once SmoothScrollProvider has finished wiring Lenis to GSAP.
 * If already ready (e.g. component remounts) the callback fires synchronously.
 * Returns a cancel function — call it in the useEffect cleanup.
 *
 * @example
 * useEffect(() => {
 *   const cancel = onGsapReady(() => { ... build animations ... });
 *   return cancel;
 * }, []);
 */
export function onGsapReady(callback: () => void): () => void {
  if ((window as any).gsapReady) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener("gsap:ready", handler, { once: true });
  return () => window.removeEventListener("gsap:ready", handler);
}
