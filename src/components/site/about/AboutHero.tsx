const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";

type AboutHeroProps = {
  description: string;
  imageUrl?: string;
};

export default function AboutHero({ description }: AboutHeroProps) {
  return (
    <>
      {/* ── Hero ── */}
      {/* <div className="relative h-screen overflow-hidden">
        <img
          src={ABOUT_IMAGE}
          alt="About MindlyftAI"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/70 via-violet-900/30 to-transparent" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
          >
            We Shape{" "}
            <span className="text-blue-200">Bright Futures</span>
          </h1>
        </div>
      </div> */}

      {/* ── Description section ── */}
    <div className="bg-white px-6 py-30">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
    
    {/* Content Left */}
    <div className="flex-1 text-center md:text-left space-y-6">
      
    
      <img
        src={ABOUT_IMAGE}
        alt="About Us"
        className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
      />
      <div className="w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 md:mx-0 mx-auto" />
    </div>

    {/* Image Right */}
    <div className="flex-1">
      <div className="flex items-center justify-center md:justify-start gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400" />
        <span className="text-xs font-bold uppercase tracking-[4px] text-violet-500">
          About Us
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-400" />
      </div>
  <p className="text-gray-500 text-lg md:text-xl leading-[1.9] font-light py-4">
        {description}
      </p>

    </div>

  </div>
</div>
    </>
  );
}
