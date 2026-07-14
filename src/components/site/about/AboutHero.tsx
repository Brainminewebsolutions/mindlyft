import { AnimateIn } from "@/components/ui/AnimateIn";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";

type AboutHeroProps = {
  description: string;
  imageUrl?: string;
};

export default function AboutHero({ description }: AboutHeroProps) {
  return (
    <>
        
      {/* ── Description section ── */}
    <div className="bg-white px-6 py-14 md:py-30">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
    
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
          <div className="text-center">
                <AnimateIn delay={100} direction="right">
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                    About{" "}
                    <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                      Us
                    </span>
                  </h2>
                </AnimateIn>
              </div>
      </div>
  <p className="text-gray-500 text-lg md:text-xl leading-[1.9] font-light">
        {description}
      </p>

    </div>

  </div>
</div>
    </>
  );
}
