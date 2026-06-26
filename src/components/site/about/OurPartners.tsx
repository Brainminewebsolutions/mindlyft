const PARTNERS = [
  { name: "HOMI Lab",      logo: "/assets/img/partners/homi-lab.png" },
  { name: "Kalam Centre",  logo: "/assets/img/partners/kalam-centre.png" },
];

export default function OurPartners({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} py-14 px-6 md:px-14 lg:px-24 text-center`}>
      <h2 className="text-3xl md:text-4xl font-black text-violet-600 mb-2">Our partners</h2>
      <p className="text-sm text-gray-500 mb-12">With Acknowledgement &amp; Support From</p>

      <div className="bg-violet-50 rounded-2xl py-14 px-6">
        <div className="flex flex-wrap justify-center gap-8">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center bg-white rounded-xl shadow-sm border border-violet-100 w-40 h-28 p-4"
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
