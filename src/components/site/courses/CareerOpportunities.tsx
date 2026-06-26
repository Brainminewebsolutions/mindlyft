import { Briefcase } from "lucide-react";

const DEFAULT_ROLES = [
  "Cybersecurity Analyst",
  "SOC Analyst",
  "Security Consultant",
  "Cloud Security Associate",
  "Threat Intelligence Analyst",
  "Security Operations Executive",
  "Risk & Compliance Analyst",
  "Digital Forensics Associate",
  "Information Security Associate",
];

interface Props {
  roles?: string[];
  color?:   string;
  bgColor?: string;
}

export default function CareerOpportunities({
  roles   = DEFAULT_ROLES,
  color   = "#7c3aed",
  bgColor = "#f5f3ff",
}: Props) {
  return (
    <section className="py-14 px-6 md:px-14 lg:px-20" style={{ backgroundColor: bgColor }}>
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-snug mb-2" style={{ color }}>
            Career Opportunities
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            Upon successful completion of the program, learners can explore career opportunities such as:
          </p>
        </div>

        {/* Roles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {roles.map((role) => (
            <div
              key={role}
              className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm"
              style={{ borderColor: `${color}22` }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${color}15` }}
              >
                <Briefcase className="h-4 w-4" style={{ color }} />
              </span>
              <span className="text-sm font-semibold text-gray-800">{role}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
