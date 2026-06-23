const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80";

type ContactHeroProps = {
  title?: string;
  tagline?: string;
};

export default function ContactHero({
  title = "Contact Us",
  tagline = "We'd love to hear from you. Reach out and we'll get back to you shortly.",
}: ContactHeroProps) {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={CONTACT_IMAGE}
        alt="Contact MindlyftAI"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/70 via-violet-900/30 to-transparent" />

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          style={{ color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
        >
          {title}
        </h1>
        <p className="mt-4 text-white/85 text-base md:text-lg max-w-xl leading-relaxed">
          {tagline}
        </p>
      </div>
    </div>
  );
}
