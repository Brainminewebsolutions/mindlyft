import Image from "next/image";
import CollaborationLogos from "@/components/site/CollaborationLogos";

interface Props {
  name:         string;
  proxiedImage: string | null;
  category?:     string | null;
}

export default function IITCourseHero({ name, category, proxiedImage }: Props) {
  return (
    <div
      className="relative flex flex-col md:flex-row min-h-screen"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #fce8ff 60%, #f0d4ff 100%)" }}
    >
      {/* Image — stacked banner on mobile/tablet, absolute side panel at md+ */}
      <div className="relative w-full h-56 sm:h-72 order-first md:absolute md:right-0 md:top-0 md:order-none md:h-full md:w-[50%] md:pt-16">
        {proxiedImage ? (
          <Image src={proxiedImage} alt={name} fill priority sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-200 via-violet-100 to-blue-100" />
        )}
      </div>

      {/* LEFT — content */}
      <div className="relative z-10 flex w-full min-w-0 flex-col justify-center gap-6 px-6 pt-16 pb-10 sm:px-8 md:w-[50%] md:px-14 md:pt-32 md:pb-24 lg:px-20">

        {/* Collaboration badges */}
        <CollaborationLogos size="sm" layout="inline" showLabels />

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-violet-600!">{category}</h3>
 
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-gray-900">
          {name}
        </h1>

      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
      />
    </div>
  );
}
