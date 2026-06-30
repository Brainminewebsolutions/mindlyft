import { AnimateIn } from "@/components/ui/AnimateIn";

export default function Members() {
  return (
   <section className="py-10 bg-white">
     <div className="text-center mb-16">
          <AnimateIn delay={100} direction="right">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Our Members&nbsp;
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
               Work With
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
               Strategic collaborations driving AI innovation
            </p>
          </AnimateIn>
        </div>

      

      <div className="bg-violet-50 py-8 overflow-hidden">
        <div className="flex animate-scroll">
          <img
            src="/images/clieimg.png"
            alt="Members Work With"
            className="h-40 w-auto shrink-0"
          />

          {/* duplicate image for seamless loop */}
          <img
            src="/images/clieimg.png"
            alt="Members Work With"
            className="h-40 w-auto shrink-0"
          />
        </div>
      </div>

     
    </section>
  );
}