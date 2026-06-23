"use client";

import {SITE_CONFIG} from "@/constants/siteConfig";
 
export default function ContactInfo( ) {
  const cards = [
    {
      icon: "📍",
      title: "Our Address",
      detail: SITE_CONFIG.address,
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
    },
    {
      icon: "📞",
      title: "Phone Number",
      detail: SITE_CONFIG.phone,
      bg: "bg-green-50",
      border: "border-green-200",
      iconBg: "bg-green-100",
    },
    {
      icon: "📧",
      title: "Email Address",
      detail: SITE_CONFIG.email,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      iconBg: "bg-yellow-100",
    },
    {
      icon: "🕐",
      title: "Office Hours",
      detail: SITE_CONFIG.hours,
      bg: "bg-purple-50",
      border: "border-purple-200",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Heading */}
        <div className="text-center space-y-4">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            Find Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Our Contact <span className="text-blue-600">Information</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`${card.bg} ${card.border} border rounded-2xl p-6 flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              {/* Icon */}
              <div className={`${card.iconBg} w-14 h-14 rounded-full flex items-center justify-center text-2xl`}>
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-gray-900 font-bold text-lg">
                {card.title}
              </h3>

              {/* Divider */}
              <div className="w-8 h-0.5 bg-gray-300 rounded-full" />

              {/* Detail */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}