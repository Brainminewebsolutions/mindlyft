type ContactHeroProps = {
  title?: string;
  tagline?: string;
};

export default function ContactHero({
  title = "Contact Us",
  tagline = "We'd love to hear from you. Reach out and we'll get back to you shortly.",
}: ContactHeroProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* Left — content 60% */}
      <div
        className="flex w-[60%] flex-col justify-center px-10 lg:px-20"
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

      {/* Right — portrait image 40% */}
      <div className="relative h-screen w-[40%] overflow-hidden">
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
