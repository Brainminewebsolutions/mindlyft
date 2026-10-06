import Image from "next/image";
import { User } from "lucide-react";
import { toUploadUrl } from "@/lib/api/image-url";
import type { InstructorProfileData } from "./InstructorProfile";

interface Props {
  instructors: InstructorProfileData[];
  title?:      string;
  subtitle?:   string;
  altSuffix?:  string;
  color?:      string;
  bgColor?:    string;
}

export default function InstructorList({
  instructors,
  title    = "Meet Your Instructors",
  subtitle = "Learn from industry experts with real-world experience.",
  altSuffix,
  color    = "#7c3aed",
  bgColor  = "#f5f3ff",
}: Props) {
  if (instructors.length === 0) return null;

  return (
    <section className="py-14 px-6 md:px-14 lg:px-20" style={{ backgroundColor: bgColor }}>
      <div className="w-full">

        {/* Heading */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black mb-2" style={{ color }}>
            {title}
          </h2>
          <p className="max-w-3xl text-sm text-gray-500 leading-relaxed mx-auto md:mx-0">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => {
            const avatarUrl = toUploadUrl(instructor.avatar);
            return (
              <div
                key={instructor.name}
                className="group relative rounded-2xl overflow-hidden shadow-sm border h-[60vh] transition-all duration-300 hover:shadow-md"
                style={{ borderColor: `${color}18` }}
              >
                {/* Full image fills card */}
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={altSuffix ? `${instructor.name}, ${altSuffix}` : instructor.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <User className="h-16 w-16" style={{ color }} />
                  </div>
                )}

                {/* Name & designation — always visible at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-center"
                  style={{ background: "linear-gradient(to top, rgba(255,255,255,0.95) 60%, transparent)" }}
                >
                  <h3 className="text-base font-bold text-gray-900">{instructor.name}</h3>
                  {instructor.designation && (
                    <p className="mt-0.5 text-sm font-medium" style={{ color }}>
                      {instructor.designation}
                    </p>
                  )}
                </div>

                {/* Description — revealed on hover */}
                {instructor.description && (
                  <div
                    className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(255,255,255,0.97) 50%, rgba(255,255,255,0.6) 100%)" }}
                  >
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">{instructor.name}</h3>
                      {instructor.designation && (
                        <p className="text-sm font-medium mb-2" style={{ color }}>{instructor.designation}</p>
                      )}
                      <p className="text-xs leading-relaxed text-gray-600 line-clamp-10">
                        {instructor.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
