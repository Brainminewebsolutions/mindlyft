"use client";

import Image from "next/image";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

type FounderMessageProps = {
  founderName: string;
  designation: string;
 message: string[]; 
  imageUrl: string;
  signature?: string;
};

export default function FounderMessage({
  founderName,
  designation,
  message,
  imageUrl,
  signature,
  bg = "bg-blue-50",
}: FounderMessageProps & { bg?: string }) {
  return (
    <Section bg={bg}>
      <div className="max-w-6xl mx-auto">

        {/* Section Label */}
        <div className="text-center mb-8 md:mb-14">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            Leadership
          </span>
          <Subheading
            as="h2"
            centered
            color="black"
            size="xl"
            className="mt-4 leading-tight"
            highlightClassName="!text-blue-600"
            text="Message from our"
            highlight="Founder & MD"
          />
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

         

          {/* Right — Message */}
          <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center space-y-6">

            {/* Quote Icon */}
            <div className="text-6xl text-blue-200 font-serif leading-none">"</div>

            {/* Message Paragraphs */}
            <div className="space-y-4 -mt-4">
              {message.map((para, i) => (
                <p key={i} className="text-gray-600 text-lg leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="w-16 h-1 bg-blue-600 rounded-full" />

            {/* Signature */}
            {signature ? (
              <img
                src={signature}
                alt="Signature"
                className="h-14 object-contain object-left opacity-80"
              />
            ) : (
              <div>
                <p className="text-gray-900 font-bold text-lg">{founderName}</p>
                <p className="text-blue-600 text-sm font-medium">{designation}</p>
              </div>
            )}

          </div>

 {/* Left — Founder Image */}
          <div className="md:w-2/5 relative min-h-80">

            <Image
              src={imageUrl}
              alt={founderName}
              fill
              className="object-cover object-top"
            />

            {/* Overlay Name Card */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-6">
              <p className="text-white text-xl font-bold">{founderName}</p>
              <p className="text-blue-200 text-sm">{designation}</p>
            </div>

          </div>

        </div>

      </div>
    </Section>
  );
}