import Image from "next/image";
import { SITE_CONFIG } from "@/constants/siteConfig";

interface Props {
  name:         string;
  proxiedImage: string | null;
}

export default function IITCourseHero({ name, proxiedImage }: Props) {
  return (
    <div
      className="relative flex h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #fce8ff 60%, #f0d4ff 100%)" }}
    >
      {/* LEFT — content */}
      <div className="relative z-10 flex w-full flex-col justify-center gap-6 px-8 py-24 md:w-[54%] md:px-14 lg:px-20">

        {/* Collaboration badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Image src={SITE_CONFIG.logo1} alt="Mindlyft AI" width={100} height={100} className="rounded object-contain" />
            <span className="text-sm font-bold text-gray-700 tracking-wide">Mindlyft AI</span>
          </div>
          <span className="text-gray-400 text-lg font-light">×</span>
          <div className="flex items-center gap-3">
            <Image src={SITE_CONFIG.c3iHubLogo} alt="C3iHub IIT Kanpur" width={100} height={100} className="rounded object-contain" />
            <span className="text-sm font-bold text-gray-700 tracking-wide">C3iHub, IIT Kanpur</span>
          </div>
        </div>
 
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-gray-900">
          {name}
        </h1>

      </div>

      {/* RIGHT — image */}
      <div className="absolute right-0 top-0 hidden h-full w-[50%] md:block pt-16">
        {proxiedImage ? (
          <img src={proxiedImage} alt={name} className="h-full w-full object-cover" />
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
