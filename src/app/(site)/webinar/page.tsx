import Hero from "@/components/site/webinar/Hero";
import Sessions from "@/components/site/webinar/Sessions";
import Upcoming from "@/components/site/webinar/Upcoming";
import Archive from "@/components/site/webinar/Archive";
import About from "@/components/site/webinar/About";
import HowItWorks from "@/components/site/webinar/HowItWorks";
import LearningPath from "@/components/site/webinar/LearningPath";
import Testimonials from "@/components/site/webinar/Testimonials";
import Bonus from "@/components/site/webinar/Bonus";
import CtaSection from "@/components/site/webinar/CtaSection";

export default function WebinarPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Sessions      bg="bg-white" />
      <Upcoming      bg="bg-violet-50" />
      <Archive       bg="bg-white" />
      <About         bg="bg-violet-50" />
      <HowItWorks    bg="bg-white" />
      <LearningPath  bg="bg-violet-50" />
      <Testimonials  bg="bg-white" />
      <Bonus         bg="bg-violet-50" />
      <CtaSection    bg="bg-white" />
    </div>
  );
}
