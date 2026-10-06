import { Code2, BarChart3, GraduationCap, Users } from "lucide-react";
import type { InfoItem } from "@/components/site/courses/landing/content";

export const WORKSHOP_AUDIENCES: InfoItem[] = [
  {
    icon: Code2,
    title: "Engineers and developers",
    desc: "You can already build. You want to know where AI genuinely speeds you up and where it quietly introduces bugs you will find in production three weeks later.",
  },
  {
    icon: BarChart3,
    title: "Analysts and marketers",
    desc: "You work with data but stop at the spreadsheet. These sessions cover turning a hunch into a number, and a number into something a decision-maker will act on.",
  },
  {
    icon: GraduationCap,
    title: "Students and freshers",
    desc: "You have heard AI is the thing to learn and have no idea where to start. Start here, at no cost, before committing to a course.",
  },
  {
    icon: Users,
    title: "HR and operations teams",
    desc: "You are being asked what AI means for your team. Come and see the tools working, so the answer comes from having used them.",
  },
];

export const WORKSHOP_FAQS: { q: string; a: string }[] = [
  {
    q: "Are the workshops really free?",
    a: "Yes. No fee, no card details, no deposit.",
  },
  {
    q: "Do I need any background in AI or coding?",
    a: "No. Sessions are pitched so that someone with no technical background can follow along. Where a workshop does assume prior knowledge, it says so on its own page.",
  },
  {
    q: "Is this just a sales pitch for your paid courses?",
    a: "No. You will learn something usable in the session itself. Counsellors are available if you want to ask about full programmes, and will not approach you if you do not.",
  },
  {
    q: "Where are the workshops held?",
    a: "At our Akurdi campus in Pimpri-Chinchwad, two minutes from Akurdi Railway Station. A few sessions run online — each listing says which.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes.",
  },
];
