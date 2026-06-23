"use client";

import { useEffect } from "react";

export default function GsapInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let attempts = 0;
    const maxAttempts = 50; // 5 s total

    const intervalId = setInterval(() => {
      const initMindlyft = (window as any).initMindlyft;
      const gsapReady    = (window as any).gsapReady;

      // Wait for BOTH: Lenis wired to ScrollTrigger (gsapReady) AND main.js loaded
      if (typeof initMindlyft === "function" && gsapReady) {
        initMindlyft();
        clearInterval(intervalId);

        const ST = (window as any).ScrollTrigger;
        if (!ST) return;

        // Immediate refresh so triggers created by initMindlyft get correct positions
        ST.refresh();

        // Second refresh after all resources (images) have fully loaded —
        // needed because off-screen images have 0 offsetWidth until the browser
        // fetches them, which makes xPercent animations calculate 0px movement.
        if (document.readyState === "complete") {
          ST.refresh();
        } else {
          window.addEventListener("load", () => ST.refresh(), { once: true });
        }
        return;
      }

      if (++attempts >= maxAttempts) clearInterval(intervalId);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}
