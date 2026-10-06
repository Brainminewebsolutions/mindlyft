import {
  Award, GraduationCap, BookOpenCheck,
  ShieldCheck, RefreshCw, Briefcase,
} from "lucide-react";
import type { InfoItem } from "@/components/site/courses/landing/content";

export const IIT_COLLABORATION: InfoItem[] = [
  {
    icon: Award,
    title: "The certificate is jointly issued",
    desc: "It carries C3iHub, IIT Kanpur alongside MindLyft AI. A recruiter screening two similar CVs treats that differently from a certificate the training provider issued to itself.",
  },
  {
    icon: GraduationCap,
    title: "The instructors come from C3iHub",
    desc: "Not MindLyft staff who studied the material. C3iHub cybersecurity instructors, forensic analysts and programme managers, several of whom have delivered training under national cybersecurity initiatives.",
  },
  {
    icon: BookOpenCheck,
    title: "The curriculum follows an academic standard",
    desc: "Course design is reviewed against C3iHub's own academic requirements rather than set by a sales team deciding what sounds current.",
  },
];

export type IITProgramme = {
  name:     string;
  hours:    number;
  format:   string;
  level:    string;
  fee:      string;
  audience: string[];
};

export const IIT_PROGRAMMES: IITProgramme[] = [
  {
    name: "75 Hours – Non-Technical",
    hours: 75,
    format: "Online",
    level: "Beginner, no technical background",
    fee: "₹50,000",
    audience: ["Managers", "Teachers", "Business Owners"],
  },
  {
    name: "75 Hours – Technical",
    hours: 75,
    format: "Online",
    level: "Requires IT fundamentals",
    fee: "₹40,900",
    audience: ["Developers", "Sysadmins", "IT Graduates"],
  },
  {
    name: "Level 1 – Beginner & Intermediate",
    hours: 40,
    format: "Hybrid: 16h classroom, 10h recorded, 8h live",
    level: "Entry to intermediate",
    fee: "₹50,000",
    audience: ["Beginners", "Students", "Career Changers"],
  },
  {
    name: "Level 2 – Advanced",
    hours: 60,
    format: "Hybrid: 24h classroom, 15h recorded, 12h live",
    level: "Advanced practitioner",
    fee: "₹75,000",
    audience: ["Level 1 Graduates", "IT Professionals", "Security Analysts"],
  },
  {
    name: "100-Hour Professional Certification",
    hours: 100,
    format: "Hybrid",
    level: "Full professional certification",
    fee: "₹1,20,300",
    audience: ["IT Professionals", "Security Analysts", "Consultants"],
  },
];

export const IIT_AUDIENCES: InfoItem[] = [
  {
    icon: ShieldCheck,
    title: "IT and security professionals",
    desc: "You already work in technology and want a credential that holds up in a security-specific hiring process. Start with the Technical track or Level 2.",
  },
  {
    icon: RefreshCw,
    title: "Career switchers into cybersecurity",
    desc: "Coming from another field and want a structured, credentialled route in. Level 1 or the Non-Technical 75-hour track is the entry point.",
  },
  {
    icon: Briefcase,
    title: "Managers and non-technical staff",
    desc: "You are accountable for security outcomes without being technical. The Non-Technical track covers what you need to make decisions and brief a team.",
  },
];

export const IIT_FAQS: { q: string; a: string }[] = [
  {
    q: "Which programme should I choose?",
    a: "If you work in IT, start with the Technical 75-hour track or Level 2. If you are new to the field, Level 1 or the Non-Technical track. A free counselling call will match you to the right one.",
  },
  {
    q: "Do I need a technical background?",
    a: "Not for the Non-Technical 75-hour track or Level 1. The Technical track and Level 2 assume IT fundamentals.",
  },
  {
    q: "Are these online or classroom?",
    a: "Both, depending on the programme. The two 75-hour tracks are online. Levels 1 and 2 and the 100-hour certification are hybrid, combining classroom sessions at Akurdi with recorded and live online material.",
  },
];
