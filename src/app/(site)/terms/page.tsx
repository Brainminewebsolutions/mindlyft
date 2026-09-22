import { Scale, ShieldCheck, BookOpen, AlertCircle, RefreshCw, Mail } from "lucide-react";

const SECTIONS = [
  {
    icon: BookOpen,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the MindlyftAI platform, website, or any of our services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.",
      "We reserve the right to update these terms at any time. Continued use of our platform after changes constitutes acceptance of the revised terms.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Use of Services",
    content: [
      "You must be at least 18 years of age to use our services, or have the consent of a parent or legal guardian.",
      "You agree to use MindlyftAI services only for lawful purposes and in a manner that does not infringe the rights of others.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
      "Sharing, reselling, or distributing course content without explicit written permission from MindlyftAI is strictly prohibited.",
    ],
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    content: [
      "All content on the MindlyftAI platform — including courses, videos, text, graphics, and software — is the intellectual property of MindlyftAI or its content partners.",
      "You may not copy, reproduce, distribute, or create derivative works from our content without prior written consent.",
      "Course materials purchased are licensed for personal, non-commercial use only.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Payments & Refunds",
    content: [
      "All payments are processed securely. Prices are listed in Indian Rupees (INR) and are subject to change without prior notice.",
      "Refund requests must be submitted within 7 days of purchase. Refunds are evaluated on a case-by-case basis and are not guaranteed.",
      "IIT programs and workshop registrations may have separate refund policies as communicated at the time of enrollment.",
    ],
  },
  {
    icon: AlertCircle,
    title: "Limitation of Liability",
    content: [
      "MindlyftAI provides its platform and content 'as is' without warranties of any kind, express or implied.",
      "We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.",
      "MindlyftAI does not guarantee job placement, salary outcomes, or specific learning results from any course or program.",
    ],
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: [
      "If you have any questions regarding these Terms & Conditions, please contact us at legal@mindlyftai.com or visit our Contact page.",
      "For grievances, you may write to us at our registered address: 2nd Floor, ABC Tiara, opposite Akurdi Railway Station Road, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411035.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500 pt-28 pb-16 px-6 text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 60%, white 1px, transparent 1px), radial-gradient(circle at 75% 40%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full ring-1 ring-white/20 mb-6">
            <Scale className="w-4 h-4" />
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-white/80 text-base">
            Last updated: June 2026 &nbsp;·&nbsp; Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        {SECTIONS.map((section, i) => {
          const Icon = section.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-violet-100 shadow-sm p-8"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((para, j) => (
                  <li key={j} className="flex gap-3 text-gray-600 text-[15px] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    {para}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <p className="text-center text-sm text-gray-400 pt-4">
          © {new Date().getFullYear()} MindlyftAI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
