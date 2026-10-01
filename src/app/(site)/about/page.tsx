import type { Metadata } from "next";
import AboutHero from "@/components/site/about/AboutHero";
import FounderMessage from "@/components/site/about/FounderMessage";
import OurLeaders from "@/components/site/about/OurLeaders";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Employee } from "@/types/admin/employee";
import VisionMission from "@/components/site/about/VisionMission";
import CompanyValues from "@/components/site/about/CompanyValues ";
import WhyWeStarted from "@/components/site/about/WhyWeStarted";
import WhatWeDo from "@/components/site/about/WhatWeDo";
import OurPartners from "@/components/site/about/OurPartners";
import Members from "@/components/site/about/Members";
import MembersWorkWith from "@/components/site/about/MembersWorkWith";
import DirectorMessage from "@/components/site/about/DirectorMessage";
import IntroductionVideo from "@/components/site/about/IntroductionVideo";
import VisitCampus from "@/components/site/about/VisitCampus";

export const metadata: Metadata = {
  title: { absolute: "About MindLyft AI | AI Education & Solutions Company in Pune" },
  description:
    "Meet the team behind MindLyft AI, a Pune-based AI education and solutions company chaired by Srijan Pal Singh, with faculty from C3iHub, IIT Kanpur.",
  alternates: { canonical: "/about" },
};

const INTRO = [
  "MindLyft AI is an AI education and solutions company based in Pune. We teach people to build with artificial intelligence, and we help organisations put it to work.",
  "Most of what we do happens in a classroom at our Akurdi campus: hands-on programmes in generative AI, machine learning, data analytics and cybersecurity, taught in person by people who work in these fields. Alongside that, our solutions team builds AI systems for businesses — automation, analytics and custom software.",
  "The two sides inform each other. What we learn delivering real projects goes straight back into what we teach.",
];

const FACULTY_INTRO =
  "Our instructors teach what they practise. The AI and data faculty combine doctoral research with industry and corporate training experience. The cybersecurity faculty include instructors, forensic analysts and programme managers from C3iHub, IIT Kanpur, who have trained professionals across government, defence and public sector organisations.";


type EmployeeEnvelope = {
  isSuccess: boolean;
  data: {
    employees: Employee[];
    pagination: { total: number; page: number; limit: number; totalPages: number };
  };
};

const CATEGORY_ICONS: Record<string, string> = {
  "instructor":          "👨‍🏫",
  "founder & co-founder": "🏛️",
  "experts":             "🎓",
  "board of directors":  "👔",
  "advisors":            "💡",
};

function categoryIcon(name: string): string {
  return CATEGORY_ICONS[name.toLowerCase()] ?? "👤";
}

async function getTeamCategories() {
  try {
    const env = await dotnetFetch<EmployeeEnvelope>(
      "/v1/employees?status=ACTIVE&limit=200",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    if (!env.isSuccess || !Array.isArray(env.data?.employees)) return [];

    const grouped = new Map<string, Employee[]>();
    for (const emp of env.data.employees) {
      const key = emp.category?.trim();
      if (!key || key.toLowerCase() === "iit instructor") continue;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(emp);
    }

    const ORDER = [
      "founder & co-founder",
      "advisors",
      "board of directors",
      "experts",
      "upskill",
      "instructor",
    ];

    const entries = Array.from(grouped.entries()).map(([title, employees]) => ({
      title,
      icon: categoryIcon(title),
      leaders: employees.map((emp) => ({
        name:        emp.name,
        designation: emp.designation ?? "",
        subject:     emp.department,
        imageUrl:    emp.avatar ?? "",
        description: emp.description,
        video:       emp.video,
      })),
    }));

    return entries.sort((a, b) => {
      const ai = ORDER.indexOf(a.title.toLowerCase());
      const bi = ORDER.indexOf(b.title.toLowerCase());
      const an = ai === -1 ? ORDER.length : ai;
      const bn = bi === -1 ? ORDER.length : bi;
      return an - bn;
    });
  } catch {
    return [];
  }
}

export default async function About() {
  const categories = await getTeamCategories();

  return (
    <main>
      <AboutHero imageUrl="/assets/img/about/about.png" paragraphs={INTRO} />
<WhyWeStarted       bg="bg-violet-50" />
<VisionMission      bg="bg-white" />
<CompanyValues      bg="bg-blue-50" />
<WhatWeDo           bg="bg-violet-50" />
<OurPartners        bg="bg-white" />
<Members           />
<MembersWorkWith    bg="bg-blue-50" />

      <DirectorMessage
        directorName="Mr. Srijan Pal Singh"
        designation="Honorary Chairman"
        message={[
          "Srijan Pal Singh is a scientist, author, public speaker, and education innovator, and a Gold Medalist from IIM Ahmedabad. Former Advisor to President Dr. A.P.J. Abdul Kalam, he is Founder & CEO of the Dr. A.P.J. Abdul Kalam Centre and co-author of bestselling books with Dr. Kalam, contributing to innovation, education, and national development initiatives.",
        ]}
        imageUrl="/director.jpg"
        bg="bg-white"
      />

      <FounderMessage
        founderName="Ms. Pooja Ahire"
        designation="Founder & MD"
        message={[
          "In an era where intelligence defines innovation, we envisioned a platform that empowers every individual and organisation to embrace the future with confidence.",
          "",
          "Our journey began with a simple belief — AI is not just a technology; it is a transformative force that can elevate human potential.",
          "",
          "As the founder, my vision is to make AI accessible, understandable, and impactful for everyone. We are not just building technology — we are building a future where intelligence meets innovation. Together, let's create, learn, and lead in this exciting era of AI."
        ]}
        imageUrl="/assets/img/about/PoojaAhire.jpg"
        bg="bg-blue-50"
      />

<IntroductionVideo bg="bg-white" />
<OurLeaders
  bg="bg-violet-50"
  categories={categories}
  headingText="Our"
  headingHighlight="faculty"
  intro={FACULTY_INTRO}
/>
<VisitCampus     bg="bg-white" />
    </main>
  );
}
