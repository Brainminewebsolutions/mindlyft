"use client";

import Image from "next/image";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

type DirectorMessageProps = {
  directorName: string;
  designation:  string;
  message:      string[];
  imageUrl:     string;
  signature?:   string;
};

export default function DirectorMessage({
  directorName,
  designation,
  message,
  imageUrl,
  signature,
  bg = "bg-violet-50",
}: DirectorMessageProps & { bg?: string }) {
  return (
    <Section bg={bg}>
      <div className="max-w-6xl mx-auto">

        {/* Section Label */}
        <div className="text-center mb-8 md:mb-14">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-violet-600 bg-violet-100 px-4 py-2 rounded-full">
            Leadership
          </span>
          <Subheading
            as="h2"
            centered
            color="mixed"
            size="xl"
            className="mt-4 leading-tight"
            text="Meet our Honorary"
            highlight="Chairman"
          />
          <div className="w-16 h-1 bg-violet-600 rounded-full mx-auto mt-4" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

          {/* Left — Director Image */}
          <div className="md:w-2/5 relative min-h-80">
            <Image
              src={imageUrl}
              alt={directorName}
              fill
              className="object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-violet-900 to-transparent p-6">
              <p className="text-white text-xl font-bold">{directorName}</p>
              <p className="text-violet-200 text-sm">{designation}</p>
            </div>
          </div>

          {/* Right — Message */}
          <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center space-y-6">

            <div className="text-6xl text-violet-200 font-serif leading-none">"</div>

            <div className="space-y-4 -mt-4">
              {message.map((para, i) => (
                <p key={i} className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <div className="w-16 h-1 bg-violet-600 rounded-full" />

            {signature ? (
              <Image
                src={signature}
                alt="Signature"
                width={0}
                height={0}
                sizes="240px"
                className="h-14 w-auto object-contain object-left opacity-80"
              />
            ) : (
              <div>
                <p className="text-gray-900 font-bold text-lg">{directorName}</p>
                <p className="text-violet-600 text-sm font-medium">{designation}</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </Section>
  );
}
