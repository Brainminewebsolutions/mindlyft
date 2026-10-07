import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeader } from "@/components/site/courses/landing/InfoSection";
import { IIT_PROGRAMMES } from "./content";

export default function IITProgrammes({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section id="programmes" className={`${bg} px-6 md:px-[60px] pt-20 scroll-mt-24`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Programmes"
          heading="Choose your programme"
          intro={
            <p>
              Five tracks. The right one depends on your technical background and how much classroom
              time you want.
            </p>
          }
        />

        {/* Phones: one card per programme — the table needs more width than a phone has */}
        <div className="space-y-4 md:hidden">
          {IIT_PROGRAMMES.map(({ name, hours, format, level, fee, audience }) => (
            <div key={name} className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold leading-snug text-gray-900">{name}</h3>
                <span className="shrink-0 text-base font-bold text-violet-700">{fee}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {audience.map(label => (
                  <span key={label} className="rounded-full border border-violet-200 bg-white px-2 py-0.5 text-[11px] font-medium text-violet-600">
                    {label}
                  </span>
                ))}
              </div>
              <dl className="mt-4 space-y-2 border-t border-violet-100 pt-4 text-sm">
                {[["Hours", String(hours)], ["Format", format], ["Level", level]].map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <dt className="w-16 shrink-0 text-xs font-bold uppercase tracking-wider text-violet-700">{label}</dt>
                    <dd className="text-gray-600">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <AnimateIn delay={150} direction="up" className="hidden md:block">
          <div className="overflow-x-auto rounded-2xl border border-violet-100 bg-white shadow-sm">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-violet-50 text-xs font-bold uppercase tracking-wider text-violet-700">
                <tr>
                  <th scope="col" className="px-5 py-4">Programme</th>
                  <th scope="col" className="px-5 py-4">Hours</th>
                  <th scope="col" className="px-5 py-4">Format</th>
                  <th scope="col" className="px-5 py-4">Level</th>
                  <th scope="col" className="px-5 py-4">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100">
                {IIT_PROGRAMMES.map(({ name, hours, format, level, fee, audience }) => (
                  <tr key={name} className="align-top hover:bg-violet-50/50 transition-colors">
                    <th scope="row" className="px-5 py-4 font-semibold text-gray-900">
                      {name}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {audience.map(label => (
                          <span
                            key={label}
                            className="rounded-full border border-violet-200 bg-white px-2 py-0.5 text-[11px] font-medium text-violet-600"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </th>
                    <td className="px-5 py-4 text-gray-600">{hours}</td>
                    <td className="px-5 py-4 text-gray-600">{format}</td>
                    <td className="px-5 py-4 text-gray-600">{level}</td>
                    <td className="px-5 py-4 font-bold text-violet-700 whitespace-nowrap">{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
