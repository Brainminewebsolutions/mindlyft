"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";

export default function Innovation() {
  return (
    <>
      {/* About Us Section Start */}
      <section className="relative z-[1] overflow-hidden bg-black py-[60px] md:py-20 min-[992px]:py-[100px] min-[1200px]:py-[120px]">
        {/* Top Shape */}
        <Image
          src="/assets/img/about/about-shape-1.png"
          alt="Shape"
          width={0}
          height={0}
          sizes="50vw"
          className="absolute top-0 right-0 z-[-1] h-auto w-auto"
        />

        {/* Bottom Shape */}
        <Image
          src="/assets/img/about/about-shape-2.png"
          alt="Shape"
          width={0}
          height={0}
          sizes="50vw"
          className="absolute bottom-0 left-0 z-[-1] h-auto w-auto"
        />

        <div className="mx-auto w-full px-3 min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1300px] relative text-center md:text-left">
          {/* Main Thumbnail */}
          <Image
            src="/assets/img/about/about-thumb-2.png"
            alt="About Thumbnail"
            width={0}
            height={0}
            sizes="50vw"
            className="move-left absolute bottom-[30px] left-0 h-auto w-auto rounded-[10px] blur-[3px] [transform:rotate(20deg)] max-md:max-w-[120px]"
            suppressHydrationWarning
          />

          {/* Subtitle */}
          <SectionBadge variant="dark">Innovation</SectionBadge>

          {/* Title */}
          <Subheading
            className="!text-white/75 2xl:pr-6"
            text={
              <>
                Building the Future With{" "}
                <span className="rounded-[50px]">
                  <Image
                    src="/assets/img/about/about-thumb-4.jpg"
                    alt="Thumbnail"
                    width={0}
                    height={0}
                    sizes="200px"
                    className="h-auto w-auto rounded-[50px]"
                  />
                </span>{" "}
                AI-Powered Learning and Cybersecurity That Evolves{" "}
                With Every Challenge — MindlyftAI Turns Complexity Into Clarity
              </>
            }
          />

          {/* Rotating circle */}
          <style>{`
            @keyframes spinCircle { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
          <Link
            href="/innovation"
            className="group relative z-[1] rounded-full flex flex-col items-center justify-center ml-auto h-[270px] w-[270px] cursor-pointer"
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
        <Image
          src="/assets/img/about/about-img-3.png"
          alt="About Image"
          width={0}
          height={0}
          sizes="50vw"
          className="move-right absolute bottom-0 left-1/2 z-[1] h-auto w-[520px] max-w-[200px] md:max-w-[430px] min-[992px]:max-w-[520px] min-[1400px]:max-w-[630px]"
          suppressHydrationWarning
        />
      </section>
      {/* About Us Section End */}
    </>
  );
}
