import {
  Brain,
  Briefcase,
  Handshake,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Technology Leadership",
    description:
      "We work at the forefront of AI, ML, and automation.",
    featured: false,
  },
  {
    icon: Briefcase,
    title: "Business-First Thinking",
    description:
      "Every product is designed for real business impact.e.",
  },
  {
    icon: Handshake,
    title: "Collaborative Approach",
    description:
      "We partner closely with clients to co-create outcomes.",
  },
  {
    icon: BadgeCheck,
    title: "Reliable Delivery",
    description:
      "Secure, scalable solutions built for long-term success.",
  },
];

export default function WhyChooseMindlyft() {
  return (
    <section className="py-18 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-violet-600">
            Mindlyft AI stands out because we blend
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Cutting-edge artificial intelligence with human insight to deliver
            solutions that are smart, practical, and built for real-world
            impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;

            return (
             <div
  key={item.title}
  className={`group rounded-[30px] p-8 text-center transition-all duration-300 hover:-translate-y-2 ${
    item.featured
      ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
      : "bg-gray-100 hover:bg-gradient-to-br hover:from-violet-500 hover:to-purple-600"
  }`}
>
                <div
                  className={`w-18 h-18 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    item.featured
                      ? "bg-white/20"
                      : "bg-white"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      item.featured
                        ? "text-white"
                        : "text-violet-600"
                    }`}
                  />
                </div>

                <h3
                  className={`text-2xl font-bold mb-4 ${
                    item.featured ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`leading-8 ${
                    item.featured
                      ? "text-violet-100"
                      : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-violet-600">
           Watch a Short Introduction Video About Our Company.
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
           Discover who we are, what we do, and how we create value
for our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[550ms] ease-in-out"
>
  <source
    src="../videos/Fir2.mp4"
    type="video/mp4"
  />
</video>
        </div>
      </div>
    </section>
    
  );
}