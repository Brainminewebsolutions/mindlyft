import {
  Sparkles, Bot, BarChart3, ShieldCheck, Code2,
  GraduationCap, Laptop, Briefcase, RefreshCw,
  Building2, CalendarClock,
  FolderGit2, Award, Ticket, MonitorPlay,
  FileText, MessagesSquare, Handshake,
  Phone, PlayCircle, ListChecks, Rocket,
  type LucideIcon,
} from "lucide-react";

export type InfoItem = { icon: LucideIcon; title: string; desc: string };

export const SPECIALISATIONS: InfoItem[] = [
  {
    icon: Sparkles,
    title: "Generative AI Courses in Pune",
    desc: "Learn to build with large language models, design effective prompts and ship GenAI applications. Our Gen AI course in Pune suits engineers, product teams and marketers alike.",
  },
  {
    icon: Bot,
    title: "Agentic AI and LLM Courses in Pune",
    desc: "Go beyond chat interfaces to systems that plan, use tools and complete multi-step tasks independently. The most advanced Agentic AI course in Pune available locally.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics Courses in Pune",
    desc: "Python, SQL, Power BI and AI-assisted analysis. Our Data Analytics courses in Pune are built for business, reporting and analyst roles with immediate hiring demand.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security Courses in Pune",
    desc: "Threat intelligence, cloud security, digital forensics and security operations. This cyber security course in Pune is developed with C3iHub, IIT Kanpur, a national centre for cybersecurity research.",
  },
  {
    icon: Code2,
    title: "AI Foundation and Python Courses",
    desc: "No background required. Start with Python, core machine learning and your first end-to-end project before moving into any specialisation.",
  },
];

export const AUDIENCES: InfoItem[] = [
  {
    icon: GraduationCap,
    title: "For Students and Freshers",
    desc: "Start with the AI Foundation Program or Python for AI. Both assume no prior experience and give you a portfolio project before you begin applying for roles.",
  },
  {
    icon: Laptop,
    title: "For Working IT Professionals",
    desc: "The Agentic AI, LLM & Generative AI Systems Program or AI-Assisted Software Development fit best. Both assume programming familiarity and run in formats that work alongside a full-time job.",
  },
  {
    icon: Briefcase,
    title: "For Non-Technical and Business Professionals",
    desc: "Artificial Intelligence for Business, or Professional Prompt Engineering. Neither requires coding, and both focus on applying AI to decisions, operations and communication.",
  },
  {
    icon: RefreshCw,
    title: "For Career Switchers",
    desc: "The AI Engineering Program is the complete route — fundamentals through production deployment, with placement support built in throughout.",
  },
];

export const FORMATS: InfoItem[] = [
  {
    icon: Building2,
    title: "Offline Classroom Training at Our Akurdi Campus",
    desc: "Configured systems, proper lab setups and small batches. Our campus sits opposite Akurdi Railway Station, reachable from Pimpri, Chinchwad, Ravet, Wakad and Hinjawadi.",
  },
  {
    icon: CalendarClock,
    title: "Hybrid and Weekend Batches for Working Professionals",
    desc: "Attend live sessions online during the week and come in for hands-on lab work. Several programs run weekend-only formats designed around a full-time job.",
  },
];

export const INCLUDES: InfoItem[] = [
  {
    icon: FolderGit2,
    title: "Live Projects and Real Datasets",
    desc: "Every module ends in a build, not a quiz. You leave with a portfolio you can walk an interviewer through.",
  },
  {
    icon: Award,
    title: "Joint IIT Kanpur Certification",
    desc: "A digitally verifiable certificate issued jointly by MindLyft AI and C3iHub, IIT Kanpur, shareable directly on LinkedIn.",
  },
  {
    icon: Ticket,
    title: "Jumbo Pass",
    desc: "Attend multiple live sessions and revisit concepts with different instructors. If a topic does not click the first time, you get another perspective at no extra cost.",
  },
  {
    icon: MonitorPlay,
    title: "Learning Management System Access",
    desc: "Recorded sessions, updated course material and resources available throughout your program and beyond.",
  },
];

export const PLACEMENT: InfoItem[] = [
  {
    icon: FileText,
    title: "Resume and LinkedIn Optimisation",
    desc: "ATS-friendly resume building and profile optimisation reviewed by people who screen candidates for a living.",
  },
  {
    icon: MessagesSquare,
    title: "Mock Interviews",
    desc: "Technical and HR rounds with faculty and external panels, with direct feedback after each one.",
  },
  {
    icon: Handshake,
    title: "Company Referrals and Hiring Drives",
    desc: "Active referrals to hiring partners across IT services, consulting, BFSI and product companies.",
  },
];

export const ENROL_STEPS: InfoItem[] = [
  {
    icon: Phone,
    title: "Book a Free Counselling Session",
    desc: "Online or in person at our Akurdi campus. We assess your background and recommend the right program.",
  },
  {
    icon: PlayCircle,
    title: "Attend a Free Demo Class",
    desc: "Experience the teaching, meet the faculty and see the labs before you commit to anything.",
  },
  {
    icon: ListChecks,
    title: "Choose Your Program and Batch",
    desc: "Select the specialisation and the timing that fits your schedule and current commitments.",
  },
  {
    icon: Rocket,
    title: "Complete Enrolment and Start Building",
    desc: "Pay in full or through no-cost EMI, and begin working on real projects from week one.",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I choose between the AI Foundation and AI Engineering programs?",
    a: "AI Foundation is the entry point — it covers machine learning, deep learning and NLP from the ground up with no prerequisites. AI Engineering is the complete career route, extending into MLOps, model serving and production deployment. If you are unsure, book a counselling session and we will place you correctly.",
  },
  {
    q: "What are the fees for AI courses at MindLyft AI?",
    a: "Fees start from ₹45,000 and vary by program duration and specialisation. Every course page lists its full fee openly. No-cost EMI is available on all programs.",
  },
  {
    q: "Can I switch to a different course after enrolling?",
    a: "Speak to your counsellor. We would rather move you into the right program early than have you complete the wrong one, and we handle this case by case.",
  },
  {
    q: "Do you provide recordings if I miss a session?",
    a: "Yes. All sessions are recorded and available through our Learning Management System, along with course material and resources.",
  },
  {
    q: "Is there an entrance test or eligibility requirement?",
    a: "No entrance test. Foundation and business-focused programs have no prerequisites. Advanced technical programs assume basic programming familiarity, which our Python course covers if you need it first.",
  },
  {
    q: "Do working professionals get separate batch timings?",
    a: "Yes. Several programs run in hybrid and weekend formats designed around a full-time job. Current batch timings are listed under Upcoming Batch Dates.",
  },
  {
    q: "What happens if the course I want is listed as opening soon?",
    a: "Register your interest and we will notify you as soon as the batch opens, usually before it is announced publicly. Seats in new batches fill quickly.",
  },
  {
    q: "Are the certificates recognised by employers?",
    a: "Certificates are jointly issued by MindLyft AI and C3iHub, IIT Kanpur, and are digitally verifiable. A recruiter can confirm your credential directly rather than taking it on trust.",
  },
];

export const CAMPUS_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=ABC+Tiara+Akurdi+Railway+Station+Pune";
