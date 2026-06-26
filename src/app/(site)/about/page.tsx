import AboutHero from "@/components/site/about/AboutHero";
import FounderMessage from "@/components/site/about/FounderMessage";
import OurLeaders from "@/components/site/about/OurLeaders";
import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Employee } from "@/types/admin/employee";
import VisionMission from "@/components/site/about/VisionMission";
import CompanyValues from "@/components/site/about/CompanyValues ";
import WhyChooseMindlyft from "@/components/site/about/features";
import WhoWeAre from "@/components/site/about/WhoWeAre";
import OurPartners from "@/components/site/about/OurPartners";
import MembersWorkWith from "@/components/site/about/MembersWorkWith";
import WhatsNew from "@/components/site/about/WhatsNew";
import DirectorMessage from "@/components/site/about/DirectorMessage";
import IntroductionVideo from "@/components/site/about/IntroductionVideo";



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
      { cache: "no-store" } as RequestInit,
    );
    if (!env.isSuccess || !Array.isArray(env.data?.employees)) return [];

    const grouped = new Map<string, Employee[]>();
    for (const emp of env.data.employees) {
      const key = emp.category?.trim() || "Team";
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(emp);
    }

    const ORDER = [
      "founder & co-founder",
      "advisors",
      "board of directors",
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
      <AboutHero
        imageUrl="/assets/img/about/about.png"
        description="Mindlyft AI is a purpose-driven technology company that builds AI-powered solutions to elevate business intelligence, automate complex workflows, and humanise digital experiences.
         We combine the latest advances in artificial intelligence with thoughtful design and practical business strategy to help organisations unlock value, accelerate decision-making, and drive innovation. At Mindlyft AI, we believe in pushing the boundaries of what businesses can achieve — not just through software, but through smart, data-driven intelligence that anticipates user needs and delivers measurable impact.
         "
      />
<VisionMission      bg="bg-white" />
<CompanyValues      bg="bg-blue-50" />
<WhoWeAre           bg="bg-violet-50" />
<OurPartners        bg="bg-white" />
<MembersWorkWith    bg="bg-blue-50" />
<WhyChooseMindlyft  bg="bg-violet-50" />

      <DirectorMessage
        directorName="Mr. Director Name"
        designation="Director"
        message={[
          "Placeholder message from the Director.",
        ]}
        imageUrl="/assets/img/about/director.jpg"
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

<WhatsNew        bg="bg-violet-50" />
<IntroductionVideo bg="bg-white" />
<OurLeaders      bg="bg-white" categories={categories} />
    </main>
  );
}
