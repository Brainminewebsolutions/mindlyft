"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LETTERS = ["M", "i", "n", "d", "L", "y", "f", "t", " ", "A", "I"];

export default function FooterWatermark() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const textStyle: React.CSSProperties = {
    fontSize: "clamp(4rem, 13.5vw, 220px)",
    fontFamily: "'Playfair Display', Georgia, serif",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');

        @keyframes waveRise {
          0%   { transform: translateY(80px); opacity: 0; }
          60%  { transform: translateY(-16px); opacity: 1; }
          80%  { transform: translateY(6px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 1; }
        }

        @keyframes waveBobble {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }

        ${LETTERS.map((_, i) => `
          .wm-letter-${i} {
            opacity: 0;
            display: inline-block;
          }
          .wm-visible .wm-letter-${i} {
            animation: waveRise 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s forwards;
          }
        `).join("")}

        .wm-robo {
          animation: none;
        }
        .wm-visible .wm-robo {
          animation: waveBobble 3s ease-in-out infinite ${LETTERS.length * 0.07 + 0.5}s;
        }
      `}</style>

      <div ref={ref} className="pb-14 pt-6 mt-10 w-full overflow-hidden">
        <div className={`flex items-end justify-center w-full select-none pointer-events-none ${visible ? "wm-visible" : ""}`}>

          {LETTERS.map((letter, i) => {
            const isI = i === LETTERS.length - 1; // last letter = "I" with robot
            const isL = letter === "L";
            const isSpace = letter === " ";

            if (isSpace) {
              return (
                <span
                  key={i}
                  className={`wm-letter-${i}`}
                  style={{ width: "clamp(0.6rem, 1.8vw, 1.4rem)" }}
                />
              );
            }

            if (isI) {
              return (
                <span key={i} className={`wm-letter-${i}`}>
                  <div className="flex flex-col items-center gap-0">
                    <div className="wm-robo" style={{ filter: "drop-shadow(0 4px 12px rgba(29,78,216,0.5))", lineHeight: 0, marginBottom: "4px" }}>
                      <Image
                        src="/assets/img/blog/blog-11.jpg"
                        alt="Robot"
                        width={120}
                        height={120}
                        className="rounded-full object-cover object-top"
                      />
                    </div>
                    <span className="font-black" style={textStyle}>I</span>
                  </div>
                </span>
              );
            }

            return (
              <span
                key={i}
                className={`wm-letter-${i} font-black`}
                style={{
                  ...textStyle,
                  ...(isL ? { color: "#7c3aed", WebkitTextFillColor: "#7c3aed" } : {}),
                }}
              >
                {letter}
              </span>
            );
          })}

        </div>
      </div>
    </>
  );
}
