import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import TestimonialsCard from '../../components/site/home/TestimonialsCard'

import WorkshopsCard from '../../components/site/home/WorkshopsCard'
import VideoHeroSection from '../../components/site/home/VideoHeroSection'

import ToolSection from '../../components/site/home/ToolSection'
import IITExpertiseSection from '@/components/site/home/IITExpertiseSection'
import CoursesCard from '../../components/site/home/CoursesCard'
// import NextGenAI from '../../components/site/home/NextGenAIDynamic';
 import OurClients from "@/components/site/home/OurClients";
 import GsapInit from "@/components/GsapInit";
import LibraryLoader from "@/components/LibraryLoader";
import FeaturedSection from "@/components/site/home/FeaturedSection";
import {
  IITExpertiseSkeleton,
  CoursesSkeleton,
  ToolsSkeleton,
  OurClientsSkeleton,
  WorkshopsSkeleton,
  TestimonialsSkeleton,
} from "@/components/site/home/HomeSkeletons";

// Below-the-fold, non-data-fetching sections — split into their own chunks
// so they don't bloat the initial JS bundle the hero/above-fold content needs.
const WhatWeDo = dynamic(() => import("@/components/site/home/WhatWeDo"), {
  loading: () => <div className="h-screen" />,
});
const WhyChooseUs = dynamic(() => import("@/components/site/home/WhyChooseUs"), {
  loading: () => <div className="h-[500px]" />,
});
const AiItSolutions = dynamic(() => import("@/components/site/home/AiItSolutions"), {
  loading: () => <div className="h-[400px]" />,
});
const Innovation = dynamic(() => import("@/components/site/home/Innovation"), {
  loading: () => <div className="h-[400px]" />,
});

export const metadata: Metadata = {
  title: "AI Course in Pune — Gen AI, Agentic AI, Cyber Security & Data Analytics",
  description:
    "Join the best AI course in Pune at MindLyft AI. Industry-ready Gen AI, Agentic AI, Cyber Security and Data Analytics courses in Pune with IIT-backed expertise.",
  keywords: [
    "AI course in Pune",
    "Cyber Security course in Pune",
    "Gen AI course in Pune",
    "Agentic AI course in Pune",
    "Data Analytics courses in Pune",
    "MindLyft AI",
  ],
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <GsapInit />
      <LibraryLoader />
      <>
        <div data-home-page>
          {/* Custom cursor — `cursor`, `cursor-inner` and the `view` / `hidden` /
              `cursorinnerhover` state classes are hooks toggled by mindlyft-init.ts.
              Transforms are written as raw `transform` because the script sets
              `style.transform` and must replace, not combine with, these. */}
          <div className="cursor pointer-events-none fixed left-0 top-0 z-[999] flex h-[35px] w-[35px] items-center justify-center rounded-full border border-[#6366F1] bg-transparent [font-family:sans-serif] text-[10px] text-[#6366F1] opacity-0 transition-all duration-[350ms] ease-out [transform:translate(calc(-50%+15px),-50%)] [&.view]:h-[120px] [&.view]:w-[120px] [&.view]:cursor-pointer [&.view]:border-transparent [&.view]:bg-[#6366F1] [&.view]:text-base [&.view]:text-white">
            <span className="cursor-text pointer-events-none hidden [.view>&]:block" />
          </div>
          <div className="cursor-inner pointer-events-none fixed z-[999] h-[6px] w-[6px] rounded-full bg-[#6366F1] opacity-0 transition-[width,height,opacity] duration-[600ms] [transform:translate(-50%,-50%)] [&.cursorinnerhover]:h-[15px] [&.cursorinnerhover]:w-[15px] [&.cursorinnerhover]:opacity-50" />
          <div id="smooth-wrapper">
            <div id="smooth-content">

              <VideoHeroSection />
              <FeaturedSection />
  
              <div id="iit-courses">
                <Suspense fallback={<IITExpertiseSkeleton />}>
                  <IITExpertiseSection />
                </Suspense>
              </div>
              <Suspense fallback={<CoursesSkeleton />}>
                <CoursesCard />
              </Suspense>

              <Suspense fallback={<ToolsSkeleton />}>
                <ToolSection />
              </Suspense>

              <WhatWeDo />

              <Suspense fallback={<OurClientsSkeleton />}>
                <OurClients />
              </Suspense>

              <Suspense fallback={<WorkshopsSkeleton />}>
                <WorkshopsCard />
              </Suspense>
              <WhyChooseUs />

              <Suspense fallback={<TestimonialsSkeleton />}>
                <TestimonialsCard />
              </Suspense>

              <AiItSolutions />

              <Innovation />

               {/* <NextGenAI /> */}

            </div>
          </div>
           
        </div>
      </>

     
    </>
  );
}
