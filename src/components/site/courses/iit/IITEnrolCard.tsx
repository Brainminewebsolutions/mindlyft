import Link from "next/link";
import { CalendarCheck, ShoppingBag, Sparkles, type LucideIcon } from "lucide-react";

interface Props {
  courseId:      string;
  price:         number;
  discount?:     number | null;
  discountPrice: number;
  status?:       string;
  facts?:        { Icon: LucideIcon; label: string; value: string }[];
}

// One pastel per fact so the grid reads as distinct items.
const FACT_COLORS = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-fuchsia-100 text-fuchsia-600",
  "bg-cyan-100 text-cyan-600",
];

export default function IITEnrolCard({ courseId, price, discount, discountPrice, status, facts = [] }: Props) {
  const hasDiscount = !!discount && discount > 0 && price > 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-500/10">
      <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500" />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px]">

        {/* Facts */}
        {facts.length > 0 && (
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 p-6 sm:grid-cols-2 sm:p-8 xl:grid-cols-3">
            {facts.map(({ Icon, label, value }, i) => (
              <div key={label} className="flex items-start gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${FACT_COLORS[i % FACT_COLORS.length]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</dt>
                  <dd className="text-sm font-semibold leading-snug text-gray-800">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        )}

        {/* Price and actions */}
        <div className="border-t border-violet-100 bg-gradient-to-br from-violet-100 to-blue-100 p-6 sm:p-8 lg:border-l lg:border-t-0">
          {hasDiscount ? (
            <div className="mb-5">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">₹{price.toLocaleString("en-IN")}</span>
                <span className="rounded-full border border-violet-200 bg-white px-2 py-0.5 text-xs font-bold text-violet-600">{discount}% OFF</span>
              </div>
              <p className="text-3xl font-bold text-violet-700">
                ₹{Math.round(discountPrice).toLocaleString("en-IN")}
                <span className="ml-1.5 align-middle text-xs font-semibold text-gray-400">+ GST</span>
              </p>
            </div>
          ) : (
            <p className="mb-5 text-3xl font-bold text-violet-700">
              {price === 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`}
            </p>
          )}

          {status === "UPCOMING" ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-bold text-white">
              <Sparkles className="h-4 w-4" />
              Coming Soon
            </div>
          ) : (
            <Link
              href={`/checkout/${courseId}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ShoppingBag className="h-4 w-4" />
              {price === 0 ? "Enrol for Free" : "Enrol Now"}
            </Link>
          )}
          <Link
            href="/contact"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-50"
          >
            <CalendarCheck className="h-4 w-4" />
            Book a free counselling call
          </Link>
        </div>

      </div>
    </div>
  );
}
