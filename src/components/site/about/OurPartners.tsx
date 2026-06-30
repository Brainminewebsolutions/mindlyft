import { AnimateIn } from "@/components/ui/AnimateIn";

const PARTNERS = [
  { name: "HOMI Lab",      logo: "/images/ourpartner/partner1.png" },
  { name: "Kalam Centre",  logo: "/images/ourpartner/partner2.png" },
];

export default function OurPartners({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} py-14 px-6 md:px-14 lg:px-24 text-center`}>
       <div className="text-center mb-16">
          <AnimateIn delay={100} direction="right">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Our&nbsp;
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
               Partners
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
              With Acknowledgement &amp; Support From
            </p>
          </AnimateIn>
        </div>


      <div className="bg-violet-50 rounded-2xl py-14 px-6">
        <div className="flex flex-wrap justify-center gap-8">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center bg-white rounded-xl shadow-sm border border-violet-100 w-50 h-50 p-4"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      
    </section>

    
  );
}
