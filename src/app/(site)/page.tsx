import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Lock, Shield, ClipboardCheck, Folder, KeyRound, Activity } from "lucide-react";

import TestimonialsCard from '../../components/site/home/TestimonialsCard' 

import WorkshopsCard from '../../components/site/home/WorkshopsCard'
import VideoHeroSection from '../../components/site/home/VideoHeroSection'

import ToolSection from '../../components/site/home/ToolSection'
import IITExpertiseSection from '@/components/site/home/IITExpertiseSection'
import CoursesCard from '../../components/site/home/CoursesCard'
import WhatWeDo from '@/components/site/home/WhatWeDo'
import NextGenAI from '../../components/site/home/NextGenAI'
import Innovation from '../../components/site/home/Innovation'
 import OurClients from "@/components/site/home/OurClients";
 import GsapInit from "@/components/GsapInit";
import FeaturedSection from "@/components/site/home/FeaturedSection";
import WhyChooseUs from "@/components/site/home/WhyChooseUs";
import AiItSolutions from "@/components/site/home/AiItSolutions";
 
export default function HomePage() {
  return (
    <>
      <GsapInit />
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
                <Suspense fallback={<div className="h-screen" />}>
                  <IITExpertiseSection />
                </Suspense>
              </div>
              <Suspense fallback={<div className="h-[600px]" />}>
                <CoursesCard />
              </Suspense>

              <Suspense fallback={<div className="h-64" />}>
                <ToolSection />
              </Suspense>

              <WhatWeDo />

              <OurClients />

              <Suspense fallback={<div className="h-[500px]" />}>
                <WorkshopsCard />
              </Suspense>
              <WhyChooseUs />

              <Suspense fallback={<div className="h-[400px]" />}>
                <TestimonialsCard />
              </Suspense>

              <AiItSolutions />

              <Innovation />

               <NextGenAI />

            </div>
          </div>
           
        </div>
      </>

     
    </>
  );
}
