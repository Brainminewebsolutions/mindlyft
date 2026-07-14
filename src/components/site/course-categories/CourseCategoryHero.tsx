import CollaborationLogos from "@/components/site/CollaborationLogos";

interface Props {
  name:        string;
  description: string | null;
  image:       string | null;
}

export default function CourseCategoryHero({ name, description, image }: Props) {
  return (
    <div
      className="relative flex flex-col md:flex-row min-h-screen"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #fce8ff 60%, #f0d4ff 100%)" }}
    >
      {/* Image — stacked banner on mobile/tablet, absolute side panel at md+ */}
      <div className="relative w-full h-56 sm:h-72 order-first md:absolute md:right-0 md:top-16 md:order-none md:h-[calc(100%-4rem)] md:w-[50%]">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-200 via-violet-100 to-blue-100" />
        )}
      </div>

      {/* Left — text */}
      <div className="relative z-10 flex w-full min-w-0 flex-col justify-center gap-4 px-6 py-10 sm:px-8 md:w-[50%] md:px-14 md:py-24 lg:px-20">

        {/* Collaboration mark */}
        <CollaborationLogos size="md" />

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

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
      />
    </div>
  );
}
