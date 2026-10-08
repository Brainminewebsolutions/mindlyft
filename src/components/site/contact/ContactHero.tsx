import Image from "next/image";
type ContactHeroProps = {
  title?: string;
  tagline?: string;
};

export default function ContactHero({
  title = "Contact Us",
  tagline = "We'd love to hear from you. Reach out and we'll get back to you shortly.",
}: ContactHeroProps) {
  return (
    <div className="flex w-full flex-col lg:min-h-screen lg:flex-row">

      {/* Left — content, full width and centered on mobile/tablet, 60% and left-aligned at lg+ */}
      <div className="flex w-full flex-col items-center justify-center bg-[linear-gradient(135deg,#1e1b4b_0%,#4c1d95_60%,#6d28d9_100%)] px-6 pt-28 pb-14 text-center sm:px-10 sm:pt-32 sm:pb-16 lg:w-[60%] lg:items-start lg:px-20 lg:py-0 lg:text-left">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[4px] text-violet-300 sm:tracking-[5px]">
          Get In Touch
        </p>
        <h1 className="text-4xl font-black leading-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
          {tagline}
        </p>
        <div className="mt-6 flex gap-2 sm:mt-8">
          <span className="h-2 w-8 rounded-full bg-violet-400 opacity-70" />
          <span className="h-2 w-2 rounded-full bg-violet-400 opacity-40" />
          <span className="h-2 w-2 rounded-full bg-violet-400 opacity-20" />
        </div>
      </div>

      {/* Right — portrait image, 4:3 banner on mobile/tablet, full-height 40% side panel at lg+ */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:w-[40%]">
        <Image
          src="/Contact.jpeg"
          alt="MindlyftAI Office"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b]/30 to-transparent" />
      </div>

    </div>
  );
}
