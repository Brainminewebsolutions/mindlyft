import {
  Shield,
  Database,
  Share2,
  SlidersHorizontal,
  UserCheck,
  Lock,
  ExternalLink,
  Globe,
  Clock,
  RefreshCw,
  Mail,
  MapPin,
  ShieldCheck,
  Scale,
} from "lucide-react";

const SECTIONS = [
  {
    icon: Shield,
    title: "Overview",
    content: [
      "This Privacy Policy governs how MindlyftAI (\"We\") collects, uses, maintains, and discloses information of users (\"Learners\", \"You\") of the mindlyftai.graphy.com platform.",
      "By accessing the Platform, providing your Personal Information, or otherwise signalling your agreement when presented, you consent to the collection, use, and disclosure of information as described in this Policy and our Terms of Use.",
      "\"Personal Information\" means information that identifies a Learner — such as name, identification number, email address, age, date of birth, gender, location, photograph, and/or phone number — provided at registration or any time thereafter.",
      "\"Sensitive Personal Information\" includes passwords and financial data, health data, official identifiers (such as biometric data, Aadhaar, social security number, driver's licence, or passport), information about sexual life or identity, race, ethnicity, political or religious belief, and other data classified as sensitive under applicable Data Protection Laws (India's IT Rules 2011, the DPDP Act 2023, GDPR, and CCPA).",
    ],
  },
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "We do not ask you for Personal Information unless it is truly needed — for example, when registering for Content on the Platform — and we do not share it except to comply with applicable law, develop our products and services, or protect our rights.",
      "Personal Identifiable Information: name and email address, submitted voluntarily by you. You may decline to provide this, though it may limit your access to certain services or products on the Platform.",
      "Non-Personal Identifiable Information: browser name, language preference, referring site, date and time of requests, operating system, and internet service provider. In the event of an app error, we may also collect Log Data (IP address, device name, OS version, app configuration, time and date of use) through third-party tools.",
      "Cookies: This Service does not use cookies directly, but the app may use third-party code and libraries that use cookies to collect information and improve their services. You may disable cookies in your browser, though some parts of the Platform may not function properly as a result.",
    ],
  },
  {
    icon: Share2,
    title: "How We Use and Share Your Information",
    content: [
      "To provide access to the Platform and its services/products — including customer service, fulfilling purchases, verifying users, and resolving issues.",
      "To conduct KYC verification where required by applicable law or SEBI regulations.",
      "To improve the Platform and maintain safety, including preventing, detecting, and investigating fraud, misuse, or threats to our users, network, or rights.",
      "To communicate with you or market our services/products, including responding to inquiries. You may unsubscribe from future communications at any time by writing to us.",
      "We may share information with third-party service providers who help facilitate, operate, analyse, or support the Service on our behalf — they are contractually obligated not to use it for any other purpose.",
      "We do not sell, trade, or otherwise exploit your personally identifiable information. We may share aggregated, de-identified demographic data with business partners and trusted affiliates.",
    ],
  },
  {
    icon: SlidersHorizontal,
    title: "Your Choices",
    content: [
      "Limit the information you provide: you can choose what to share, and update or delete it at any time — though missing information may limit access to certain Platform features.",
      "Limit the communications you receive: you can choose what communications to receive from us, except those required for legal or security purposes.",
      "Reject cookies: you can change your browser settings to reject or remove cookies, though some services on the Platform may not function properly as a result.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Right to Confirmation and Access to your Personal Information held by us, along with supporting information.",
      "Right to Correction — you may ask us to rectify inaccurate, incomplete, or outdated Personal Information.",
      "Right to Nominate another person to act on your behalf and exercise your rights in the event of your death or incapacity.",
      "Right to Erasure of your Personal Information from the Platform, which may result in permanent deletion of your account.",
      "You may exercise these rights using the options provided within the Platform upon login, or by writing to us at the Grievances contact below. We may request additional information to verify your identity.",
    ],
  },
  {
    icon: Lock,
    title: "Protection of Your Information",
    content: [
      "We take reasonable measures to protect against unauthorized access, use, alteration, or destruction of your Personal Information.",
      "Disclosure is limited to employees, contractors, and affiliated organizations who need the information to provide our services and have agreed not to disclose it to others, or in response to a court order or governmental request.",
      "We may also disclose information where necessary to comply with applicable laws and regulations, protect the rights, property, or safety of a third party, our users, or ourselves, or to investigate fraud and misuse. Where legally permitted, we will attempt to give you prior notice before such disclosure.",
    ],
  },
  {
    icon: ExternalLink,
    title: "Third-Party Websites",
    content: [
      "The Platform may contain links to websites and services of our partners, suppliers, advertisers, sponsors, and licensors. These sites are not controlled by us, and we are not responsible for their content or privacy practices. Browsing such sites is subject to their own terms and policies.",
    ],
  },
  {
    icon: Globe,
    title: "Cross-Border Data Transfer",
    content: [
      "Your information, including Personal Information, is stored, processed, and transferred on Amazon Web Services (AWS) servers located in India, and may also be transferred to servers in other countries depending on our affiliates and service providers.",
      "These countries may have different privacy laws. If you access the Platform from outside India — including the USA, EU, EEA, or UK — you consent to the transfer of your information to India and other countries outside your country of residence.",
    ],
  },
  {
    icon: Clock,
    title: "Data Retention",
    content: [
      "We retain your information for as long as required to fulfil the purposes described in this Policy, including legal obligations and business compliance.",
      "We may not be able to delete publicly shared content (such as comments or feedback), but we will anonymize your Personal Information so you can no longer be identified in association with it.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Modifications to This Policy",
    content: [
      "We may modify, revise, or change this Policy from time to time. When we do, we will revise the updated date at the top of this page. We encourage you to check this page frequently — unless stated otherwise, our current Policy applies to all information we hold about you.",
    ],
  },
  {
    icon: Mail,
    title: "Grievances",
    content: [
      "If you have any questions about this Policy, wish to exercise your rights, or have concerns or grievances about your privacy, please write to us with a thorough description at office@mindlyftal.com.",
    ],
  },
  {
    icon: MapPin,
    title: "Additional Rights for Indian Residents",
    content: [
      "If you are located in India, you may have the following rights under the Personal Data Protection Bill (PDPB) once it becomes legislation: Right to Confirmation and Access, Right to Correction, Right to Grievance Redressal, Right to be Forgotten, and Right to Erasure.",
      "You may exercise these rights using the options provided within the Platform upon login, or by writing to us at the Grievances contact above.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Additional Rights for UK / EU / EEA Residents",
    content: [
      "If you are located in the United Kingdom, a European Union country, or the European Economic Area, you have the following rights under the UK and EU General Data Protection Regulation (GDPR): Right to Access your Personal Information, Right to Rectification, Right to Erasure, Right to Object to Processing, Right to Restrict Processing, and Right to Data Portability.",
      "You also have the right to lodge a complaint with the relevant supervisory authority (see edpb.europa.eu/about-edpb/board/members_en) or seek a remedy through the courts, and the right not to be subject to a decision based solely on automated processing, including profiling, that produces legal or similarly significant effects.",
    ],
  },
  {
    icon: Scale,
    title: "Additional Rights for California Residents (CCPA)",
    content: [
      "If you are a California resident, you have the right to know what Personal Information we collect, access it, opt in or out of marketing and analytics activities, receive equal service without discrimination, and request deletion of your Personal Information.",
      "We collect categories of Personal Information including identifiers, California Customer Records-type data, internet or network activity, geolocation data, audio/visual information, and inferences, used as described in \"How We Use and Share Your Information\" above.",
      "We have not sold Personal Information in the preceding 12 months, but have disclosed relevant categories to service providers, affiliates, and advisors for business purposes.",
      "To submit a Request to Know or Request to Delete, email us at the Grievances contact above. We are required by law to verify your identity before fulfilling a request, and authorized agents may submit requests on your behalf with appropriate authorization. You will not receive discriminatory treatment for exercising your CCPA rights.",
    ],
  },
];

export default function PrivacyPage() {
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
            <Shield className="w-4 h-4" />
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/80 text-base">
            Last updated: June 2026 &nbsp;·&nbsp; Learn how we collect, use, and protect your information.
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
