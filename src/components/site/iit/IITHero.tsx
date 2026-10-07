import { AnimateIn } from "@/components/ui/AnimateIn";

export default function IITHero({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-16 md:px-[60px]"
      style={{
        backgroundImage: "url('/assets/img/hero/hero-bg-3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Light overlay — keeps brand light-theme */}
      <div className="absolute inset-0 bg-white/85 md:bg-transparent md:bg-gradient-to-r md:from-white md:via-white/90 md:to-white/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center md:mx-0 md:text-left">

        <AnimateIn delay={100}>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
            IIT Kanpur cyber security courses in Pune,{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              with C3iHub
            </span>
          </h1>
        </AnimateIn>
        <AnimateIn delay={200}>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0 mb-10">
            Most cybersecurity certificates in this market are issued by the institute that sold you
            the course. This one is not.
          </p>
        </AnimateIn>

      </div>
    </section>
  );
}
