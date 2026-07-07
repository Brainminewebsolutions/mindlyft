"use client";

import { useEffect } from "react";

export default function LibraryLoader() {
  useEffect(() => {
    // Swiper and mindlyft-init are dynamically imported so they're code-split
    // into their own chunk rather than bloating the initial JS bundle.
    import("swiper/bundle").then(({ default: Swiper }) => {
      (window as any).Swiper = Swiper;
      import("@/lib/mindlyft-init").then(({ initMindlyft }) => {
        (window as any).initMindlyft = initMindlyft;
      });
    });

    // gsap + its plugins are dynamically imported (rather than statically at
    // module scope) so they're code-split into their own chunk instead of
    // bloating the initial JS bundle every page pays for, whether or not it
    // uses them. SmoothScrollProvider/GsapInit already poll for window.gsap
    // and window.ScrollTrigger, so loading them a beat later here is safe.
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/ScrollToPlugin"),
      import("gsap/SplitText"),
      import("gsap/CustomEase"),
    ]).then(([{ gsap }, { ScrollTrigger }, { ScrollToPlugin }, { SplitText }, { CustomEase }]) => {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, CustomEase);

      // Expose gsap globals that SmoothScrollProvider polls for.
      // Because gsap is a module singleton, this is the same instance that
      // all animation components (CinematicSection, ServiceStack, etc.) use.
      (window as any).gsap = gsap;
      (window as any).ScrollTrigger = ScrollTrigger;
      (window as any).SplitText = SplitText;
      (window as any).CustomEase = CustomEase;
    });
  }, []);

  return null;
}
