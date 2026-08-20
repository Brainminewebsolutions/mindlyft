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

      {/* Left — content, full width on mobile/tablet, 60% at lg+ */}
      <div
        className="flex w-full flex-col justify-center px-6 py-16 sm:px-10 lg:w-[60%] lg:px-20 lg:py-0"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 60%, #6d28d9 100%)" }}
      >
        <p className="mb-3 text-[11px] font-black uppercase tracking-[5px] text-violet-300">
          Get In Touch
        </p>
        <h1
          className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl"
          style={{ color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
        >
          {title}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
          {tagline}
        </p>
        <div className="mt-8 flex gap-2">
          <span className="h-2 w-8 rounded-full bg-violet-400 opacity-70" />
          <span className="h-2 w-2 rounded-full bg-violet-400 opacity-40" />
          <span className="h-2 w-2 rounded-full bg-violet-400 opacity-20" />
        </div>
      </div>

      {/* Right — portrait image, banner on mobile/tablet, full-height 40% side panel at lg+ */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-auto lg:w-[40%]">
        <img
          src="/Contact.jpeg"
          alt="MindlyftAI Office"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b]/30 to-transparent" />
      </div>

    </div>
  );
}
