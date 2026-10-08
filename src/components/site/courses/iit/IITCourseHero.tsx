import Image from "next/image";
import CollaborationLogos from "@/components/site/CollaborationLogos";
import { LineBadge } from "@/components/ui/LineBadge";

interface Props {
  name:         string;
  proxiedImage: string | null;
  category?:    string | null;
  children?:    React.ReactNode;   // intro copy and CTAs, rendered under the title
}

export default function IITCourseHero({ name, category, proxiedImage, children }: Props) {
  return (
    <section className="bg-gradient-to-br from-violet-100 via-fuchsia-50 to-blue-100 px-6 pt-32 pb-16 md:px-[60px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-2">

        {/* Left — title and intro */}
        <div>
          <CollaborationLogos size="sm" showLabels />

          {category && <LineBadge className="mt-8 mb-5">{category}</LineBadge>}

          <h1 className="mb-6 text-center text-3xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl md:text-left lg:text-5xl">
            {name}
          </h1>

          {children}
        </div>

        {/* Right — cover image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-violet-100 shadow-xl lg:sticky lg:top-28">
          {proxiedImage ? (
            <Image src={proxiedImage} alt={name} fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-violet-200 via-violet-100 to-blue-100" />
          )}
        </div>

      </div>
    </section>
  );
}
