"use client";

import { gaEvent } from "@/components/analytics/google-analytics";

/**
 * Official Product Hunt "Featured" badge (dark theme, post 1258567).
 *
 * Rendered as the exact <a><img></a> markup Product Hunt's widget builder
 * emits: the SVG is served straight from api.producthunt.com, so there is
 * no local asset and no next/image pipeline (external SVGs are never
 * optimized, and the static export already ships images.unoptimized).
 * Fixed width/height keep CLS at zero, and the dark theme matches the
 * site's black/zinc palette.
 *
 * Clicks feed the GA4 event stream (`product_hunt_badge_click`) with the
 * placement as a dimension — a no-op while GA is dormant.
 */

const PH_URL =
  "https://www.producthunt.com/products/trisle?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-trisle";

const PH_IMG =
  "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1258567&theme=dark&t=1790108451463";

export function ProductHuntBadge({
  location,
  eager = false,
}: {
  location: "hero" | "footer";
  eager?: boolean;
}) {
  return (
    <a
      href={PH_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => gaEvent("product_hunt_badge_click", { location })}
      className="inline-block transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
    >
      <img
        src={PH_IMG}
        alt="Trisle - iOS 27's Triple Dynamic Island, now on Android | Product Hunt"
        width={250}
        height={54}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </a>
  );
}
