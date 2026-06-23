"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

// Register plugins once at module scope — idempotent across re-renders.
// This also ensures the plugins are available on the shared gsap singleton
// before SmoothScrollProvider or any animation component accesses them.
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, CustomEase);

export default function LibraryLoader() {
  useEffect(() => {
    // Expose gsap globals that SmoothScrollProvider polls for.
    // Because gsap is a module singleton, this is the same instance that
    // all animation components (CinematicSection, ServiceStack, etc.) use.
    (window as any).gsap = gsap;
    (window as any).ScrollTrigger = ScrollTrigger;
    (window as any).SplitText = SplitText;
    (window as any).CustomEase = CustomEase;

    // scrollcue's npm package has no proper ESM/CJS exports, so we inject it
    // as a script element. It sets window.scrollCue the same way the old
    // Script tag in layout.tsx did, preserving identical runtime behaviour.
    const script = document.createElement("script");
    script.src = "/assets/js/scrollcue.min.js";
    script.onload = () => {
      // Swiper and mindlyft-init are deferred to this callback so they are
      // code-split into a separate chunk and only loaded after scrollcue is ready.
      import("swiper/bundle").then(({ default: Swiper }) => {
        (window as any).Swiper = Swiper;
        import("@/lib/mindlyft-init").then(({ initMindlyft }) => {
          (window as any).initMindlyft = initMindlyft;
        });
      });
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
