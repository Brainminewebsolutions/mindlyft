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

const PILL_COLORS = [
  "border-violet-200 bg-violet-100 text-violet-800",
  "border-blue-200 bg-blue-100 text-blue-800",
  "border-emerald-200 bg-emerald-100 text-emerald-800",
  "border-amber-200 bg-amber-100 text-amber-800",
  "border-fuchsia-200 bg-fuchsia-100 text-fuchsia-800",
];

interface Props {
  roles?: string[];
  intro?: string;
  note?:  string;
}

// Body only — the caller supplies the section heading.
export default function CareerOpportunities({
  roles = DEFAULT_ROLES,
  intro = "Upon successful completion of the program, learners can explore career opportunities such as:",
  note,
}: Props) {
  return (
    <div>
      <p className="mb-5 text-sm leading-relaxed text-gray-600">{intro}</p>

      <ul className="flex flex-wrap gap-2.5">
        {roles.map((role, i) => (
          <li key={role} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${PILL_COLORS[i % PILL_COLORS.length]}`}>
            <Briefcase className="h-3.5 w-3.5 opacity-70" />
            {role}
          </li>
        ))}
      </ul>

      {note && <p className="mt-5 text-sm leading-relaxed text-gray-600">{note}</p>}
    </div>
  );
}
