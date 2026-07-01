"use client";

import { useEffect } from "react";

export default function GsapInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let intervalId: ReturnType<typeof setInterval>;
    let attempts = 0;

    function runInit(): boolean {
      const initMindlyft = (window as any).initMindlyft;
      const gsapReady    = (window as any).gsapReady;
      if (typeof initMindlyft !== "function" || !gsapReady) return false;

      initMindlyft();
      clearInterval(intervalId);
      window.removeEventListener("gsap:ready", onGsapReady);

      const ST = (window as any).ScrollTrigger;
      if (!ST) return true;
      ST.refresh();
      if (document.readyState === "complete") {
        ST.refresh();
      } else {
        window.addEventListener("load", () => ST.refresh(), { once: true });
      }
      return true;
    }

    function onGsapReady() { runInit(); }

    if (!runInit()) {
      // React immediately to the gsap:ready event rather than waiting for the next tick
      window.addEventListener("gsap:ready", onGsapReady);
      // Fallback poll in case gsap:ready already fired or initMindlyft arrives late
      intervalId = setInterval(() => {
        if (runInit() || ++attempts >= 50) clearInterval(intervalId);
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("gsap:ready", onGsapReady);
    };
  }, []);

  return null;
}
