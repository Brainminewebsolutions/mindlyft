import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import "@/app/template-styles.css";
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
  title: "Home",
  description:
    "Explore MindLyft AI's learning services, AI consulting, and innovative products — bridging academia and industry with IIT-backed expertise.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <GsapInit />
      <LibraryLoader />
      <>
        <div>
          <div className="cursor">
            <span className="cursor-text" />
          </div>
          <div className="cursor-inner" />
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
