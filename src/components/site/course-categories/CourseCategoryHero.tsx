import { SectionBadge } from "@/components/ui/SectionBadge";

interface Props {
  name:        string;
  description: string | null;
  image:       string | null;
}

export default function CourseCategoryHero({ name, description, image }: Props) {
  return (
    <div
      className="relative flex h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #fce8ff 60%, #f0d4ff 100%)" }}
    >
      {/* Left — text */}
      <div className="relative z-10 flex w-full flex-col justify-center gap-4 px-8 py-24 md:w-[54%] md:px-14 lg:px-20">
        <SectionBadge variant="light">Professional Certification Program</SectionBadge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-gray-900">
          {name}
        </h1>
        <p className="text-base font-medium italic text-violet-500">
          Future-Proof Your Career with AI-Powered Cybersecurity
        </p>
        {description && (
          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg">
            {description}
          </p>
        )}
      </div>

      {/* Right — image */}
      <div className="absolute right-0 top-16 hidden h-full w-[50%] md:block">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-200 via-violet-100 to-blue-100" />
        )}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
      />
    </div>
  );
}
