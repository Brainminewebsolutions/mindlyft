import Link from "next/link";
import { Award, ShoppingBag } from "lucide-react";

interface Props {
  courseId:  string;
  price:     number;
  discount?: number | null;
}

export default function IITEnrolCard({ courseId, price, discount }: Props) {
  const discounted = discount && discount > 0
    ? Math.round(price * (1 - discount / 100))
    : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-violet-200 shadow-[0_8px_32px_rgba(139,92,246,0.10)]">
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-blue-500" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-white">
        <div className="flex items-center gap-4">
          
          <div>
            {discounted !== null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-violet-700">₹{discounted.toLocaleString("en-IN")}</span>
                <span className="text-sm text-gray-400 line-through">₹{price.toLocaleString("en-IN")}</span>
                <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">{discount}% OFF</span>
              </div>
            ) : (
              <span className="text-3xl font-black text-violet-700">
                {price === 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`}
              </span>
            )}
           </div>
        </div>
        <Link
          href={`/checkout/${courseId}`}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-[0_4px_20px_rgba(139,92,246,0.3)] no-underline shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          {price === 0 ? "Enrol for Free" : "Enrol Now"}
        </Link>
      </div>
    </div>
  );
}
