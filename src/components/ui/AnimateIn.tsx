"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "zoom" | "flip";
}

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden: Record<string, React.CSSProperties> = {
    up:    { transform: "translateY(40px)",  opacity: 0 },
    down:  { transform: "translateY(-40px)", opacity: 0 },
    left:  { transform: "translateX(-50px)", opacity: 0 },
    right: { transform: "translateX(50px)",  opacity: 0 },
    fade:  { opacity: 0 },
    zoom:  { transform: "scale(0.85)",       opacity: 0 },
    flip:  { transform: "rotateX(25deg) translateY(30px)", opacity: 0, transformOrigin: "top center" },
  };

  const shown: React.CSSProperties = {
    transform: "translateY(0) translateX(0) scale(1) rotateX(0deg)",
    opacity: 1,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.65s ease`,
        transitionDelay: `${delay}ms`,
        ...(visible ? shown : hidden[direction]),
      }}
    >
      {children}
    </div>
  );
}
