"use client";

import { useEffect, useState } from "react";

// Whether the signed-in student already owns this course / workshop / webinar.
// Returns null while the check is in flight, so callers can hold back the
// buy button instead of showing it and then swapping it out.
// Anonymous visitors (or any failure) resolve to false — the server still
// rejects duplicate purchases, this only drives the button state.
export function useOwnsProduct(
  productId: string | number,
  productType: "Course" | "Workshop" | "Webinar",
): boolean | null {
  const [owned, setOwned] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    setOwned(null);
    fetch(`/api/payments/owned?productId=${productId}&productType=${productType}`)
      .then((r) => (r.ok ? r.json() : { owned: false }))
      .then((j: { owned?: boolean }) => { if (!cancelled) setOwned(!!j.owned); })
      .catch(() => { if (!cancelled) setOwned(false); });
    return () => { cancelled = true; };
  }, [productId, productType]);

  return owned;
}
