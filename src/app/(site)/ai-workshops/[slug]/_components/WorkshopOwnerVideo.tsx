"use client";

import { useEffect, useState } from "react";
import { useOwnsProduct } from "@/hooks/useOwnsProduct";
import { LiveRoom } from "@/components/live/LiveRoom";

interface Props {
  webinarId:   string;
  productType: "Workshop" | "Webinar";
  /**
   * "hero"  — overlaid on the right side of the hero image (tablet/desktop).
   * "below" — its own block under the hero (phones, where the hero is too short).
   * Each placement renders only at its own screen size, so there is never more
   * than one player on the page.
   */
  placement: "hero" | "below";
}

const DESKTOP_QUERY = "(min-width: 768px)";

// Shows the session's video (waiting room, live stream or recording) on the
// details page — only for a student who has already registered / paid.
export default function WorkshopOwnerVideo({ webinarId, productType, placement }: Props) {
  const owned = useOwnsProduct(webinarId, productType);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!owned || isDesktop === null) return null;
  if ((placement === "hero") !== isDesktop) return null;

  if (placement === "hero") {
    return (
      // Sits between the navbar and the title bar, on the right half of the image.
      <div className="absolute right-8 top-24 bottom-20 z-10 flex w-[calc(40vw+1.5rem)] items-center justify-end">
        {/* No inner scrollbar: the video's height is capped so the card always fits the hero. */}
        <div className="w-full overflow-hidden rounded-2xl bg-white/95 p-3 shadow-2xl">
          <LiveRoom workshopId={webinarId} hideHeader compact />
        </div>
      </div>
    );
  }

  return (
    <section id="session-video" className="bg-white border-b border-violet-100">
      <div className="px-[6vw] py-8">
        <p className="text-[1.1rem] font-extrabold text-[#1a1046] tracking-wide mb-4 pb-3 border-b-2 border-[#f0eeff]">
          Your {productType} Session
        </p>
        <LiveRoom workshopId={webinarId} hideHeader compact />
      </div>
    </section>
  );
}
