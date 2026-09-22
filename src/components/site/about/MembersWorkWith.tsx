"use client";

import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

const LOGOS = [
  { name: "Ministry of Culture, Government of India", logo: "/assets/img/partners/ministry-of-culture.png" },
  { name: "ISRO",                                     logo: "/assets/img/partners/isro.png" },
  { name: "Advantage India Mission",                  logo: "/assets/img/partners/advantage-india-mission.png" },
  { name: "Government of Haryana",                    logo: "/assets/img/partners/govt-haryana.png" },
  { name: "U.S. Space & Rocket Center",               logo: "/assets/img/partners/us-space-rocket-center.png" },
  { name: "CDAC",                                     logo: "/assets/img/partners/cdac.png" },
];

export default function MembersWorkWith({ bg = "bg-white" }: { bg?: string }) {
  const track = [...LOGOS, ...LOGOS];

  return (
    <Section bg={bg} centered className="overflow-hidden hidden">
      <Subheading
        as="h2"
        centered
        color="violet"
        size="lg"
        className="font-black mb-2"
        text="Our members work with"
      />
      <p className="text-sm font-semibold text-gray-700 mb-12">Strategic Collaborations Driving AI Innovation</p>

      <div className="bg-violet-50 rounded-2xl py-12 overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 items-center">
          {track.map((item, i) => (
            <img
              key={`${item.name}-${i}`}
              src={item.logo}
              alt={item.name}
              className="h-14 max-w-[160px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
}
