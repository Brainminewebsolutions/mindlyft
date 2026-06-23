"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutUs3() {
  return (
    <>
      {/* About Us Section Start */}
      <section className="about-area style-three bg-black relative overflow-hidden z-[1] ptb-130">
        {/* Top Shape */}
        <img
          src="/assets/img/about/about-shape-1.png"
          alt="Shape"
          className="section-shape-one absolute top-0 right-0 z-[-1]"
        />

        {/* Bottom Shape */}
        <img
          src="/assets/img/about/about-shape-2.png"
          alt="Shape"
          className="section-shape-one absolute bottom-0 left-0 z-[-1]"
        />

        <div className="container style-one relative">
          {/* Main Thumbnail */}
          <img
            src="/assets/img/about/about-thumb-2.png"
            alt="About Thumbnail"
            className="about-thumb round-10 move-left"
          />

          {/* Subtitle */}
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Innovation
          </span>

          {/* Title */}
          <h2 className="section-title style-four font-medium !text-white/75 2xl:pr-6">
            Building the Future With{" "}
            <span className="thumb round-oval">
              <img
                src="/assets/img/about/about-thumb-4.jpg"
                alt="Thumbnail"
                className="round-oval"
              />
            </span>{" "}
            AI-Powered Learning and Cybersecurity That Evolves{" "}
            With Every Challenge — MindlyftAI Turns Complexity Into Clarity
          </h2>

          {/* Rotating circle */}
          <style>{`
            @keyframes spinCircle { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
          <Link
            href="/innovation"
            className="circle-text-wrap group relative z-[1] rounded-full flex flex-col items-center justify-center ml-auto w-[160px] h-[160px] cursor-pointer"
          >
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-0.5">
              <div style={{backgroundColor:"var(--color-violet-600)"}}  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 group-hover:bg-violet-600">
                <ArrowUpRight style={{color:"white"}} size={22} className="text-violet-400 transition-colors duration-200 group-hover:text-white" />
              </div>
            </div>
            {/* Rotating SVG text */}
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full"
              style={{ animation: "spinCircle 10s linear infinite" }}
            >
              <defs>
                <path id="circlePath" d="M 80,80 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
              </defs>
              <text className="fill-white/50 text-[11px] font-semibold tracking-[0.2em]" style={{ fontSize: 11, fontWeight: 600 }}>
                <textPath href="#circlePath" startOffset="0%">
                  MINDLYFTAI • INNOVATION • AI &amp; TECH •&nbsp;
                </textPath>
              </text>
            </svg>
          </Link>
        </div>

        {/* Bottom Image */}
        <img
          src="/assets/img/about/about-img-3.png"
          alt="About Image"
          className="about-img absolute bottom-0 z-[1] move-right"
        />
      </section>
      {/* About Us Section End */}
    </>
  );
}
