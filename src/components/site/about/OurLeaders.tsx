"use client";

type Leader = {
  name: string;
  designation: string;
  experience?: string;
  subject?: string;
  imageUrl: string;
  description?: string;
  video?: string;
};

type Category = {
  title: string;
  icon: string;
  leaders: Leader[];
};

type OurLeadersProps = {
  categories: Category[];
};

function LeaderAvatar({ name, imageUrl }: { name: string; imageUrl: string }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover object-top"
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-blue-500">
      <span className="text-4xl font-bold text-white">{name.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="relative h-[350px] cursor-pointer group" style={{ perspective: "1000px" }}>
      {/* Flipper */}
      <div
        className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Full-card image */}
          <LeaderAvatar name={leader.name} imageUrl={leader.imageUrl} />

          {/* Subject badge */}
          {leader.subject && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {leader.subject}
            </div>
          )}

          {/* Bottom gradient overlay with name/designation */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pt-14 px-4 pb-4 bg-gradient-to-t from-violet-900/90 to-transparent">
            <h4 className="text-lg font-extrabold !text-white leading-tight drop-shadow">{leader.name}</h4>
            {leader.designation && (
              <p className="text-white text-base   mt-1 drop-shadow">{leader.designation}</p>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-violet-600 to-blue-600"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {leader.video ? (
            <video
              src={leader.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col justify-center h-full px-7 py-8 text-white space-y-4">
              <h4 className="text-xl font-bold">{leader.name}</h4>
              {leader.designation && (
                <p className="text-white/70 text-sm font-medium">{leader.designation}</p>
              )}
              <div className="w-10 h-0.5 bg-white/30 rounded-full" />
              <p className="text-sm text-white/85 leading-relaxed line-clamp-6">
                {leader.description || "No description available."}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function OurLeaders({ categories }: OurLeadersProps) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-transparent px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Heading */}
        <div className="text-center space-y-4">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Meet Our <span className="text-blue-600">Leaders</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our experienced and dedicated team of educators is committed to
            helping every student reach their full potential.
          </p>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category.title} className="space-y-8">

            {/* Category Heading */}
            <div>
               
              <div>
                {/* <h3 className="text-2xl font-bold text-gray-900">
                
                </h3> */}
                <div className="mb-6 flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-violet-300" />
        <span className="text-2xl font-semibold uppercase tracking-[0.3em] text-violet-600">
           {category.title}
        </span>
        <div className="h-px w-16 bg-violet-300" />
      </div>

              </div>
              <div className="flex-1 h-px bg-gray-200 ml-2" />
            </div>

            {/* Leaders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.leaders.map((leader) => (
                <LeaderCard key={leader.name} leader={leader} />
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
