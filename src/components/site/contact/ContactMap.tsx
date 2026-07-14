"use client";

import Link from "next/link";
import {SITE_CONFIG} from "@/constants/siteConfig";
  
export default function ContactMap( ) {
  return (
    <section className="bg-white px-6 py-12 md:py-20">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">

        {/* Heading */}
        <div className="text-center space-y-4">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            Our Location
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Find Us on <span className="text-blue-600">Map</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto" />
          <p className="text-gray-500 text-lg">
            Visit us at our coaching center. We are easy to find!
          </p>
        </div>

        {/* Map Card */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">

          {/* Address Bar */}
          <div className="bg-blue-600 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3 text-white">
              <span className="text-2xl">📍</span>
              <p className="font-medium text-sm md:text-base">{SITE_CONFIG.address}</p>
            </div>

            {/* <Link
              href={SITE_CONFIG.mapEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-white text-blue-600 px-5 py-2 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors duration-200"
            >
              🗺️ Get Directions
            </Link> */}

          </div>

          {/* Google Map Embed */}
          <div className="w-full h-96 md:h-[500px]">
            <iframe
              src={SITE_CONFIG.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Coaching Class Location"
            />
          </div>

          {/* Bottom Info Strip */}
          <div className="bg-gray-50 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">

            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <span>🚌</span>
              <span>Bus Stop — 2 min walk</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <span>🅿️</span>
              <span>Free Parking Available</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <span>🚇</span>
              <span>Metro Station — 5 min</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}