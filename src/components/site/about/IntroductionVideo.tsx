export default function IntroductionVideo({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} py-20 px-6 md:px-14 lg:px-24`}>
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-violet-600">
            Watch a Short Introduction Video About Our Company.
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Discover who we are, what we do, and how we create value for our customers.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl border border-violet-100">
          <video
            controls
            playsInline
            className="w-full h-auto"
            poster=""
          >
            <source src="/introvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </section>
  );
}
