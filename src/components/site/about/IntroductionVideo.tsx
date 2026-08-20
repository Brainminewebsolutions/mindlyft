import { AnimateIn } from "@/components/ui/AnimateIn";

export default function IntroductionVideo({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} py-12 md:py-20 px-6 md:px-14 lg:px-24`}>
      <div className="max-w-5xl mx-auto">
 <div className="text-center mb-10 md:mb-16">
          <AnimateIn delay={100} direction="right">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
               Watch a Short Introduction&nbsp;
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Video About Our Company.
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
  Discover who we are, what we do, and how we create value for our customers.            </p>
          </AnimateIn>
        </div>

      

        <div className="rounded-2xl overflow-hidden shadow-xl border border-violet-100">
          <video
            controls
            playsInline
            preload="none"
            className="w-full h-96"
          >
            <source src="/introvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </section>
  );
}
