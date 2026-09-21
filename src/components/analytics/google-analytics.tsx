"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Google Analytics 4 (gtag.js), wired for the static GitHub Pages export.
 *
 * Activation is build-time and env-driven, mirroring the GSC/Bing
 * verification tags in the root layout:
 *
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID  e.g. "G-XXXXXXXXXX" (required to enable)
 *   NEXT_PUBLIC_GA_CONSENT         "granted" (default) | "denied"
 *
 * With no (or an invalid) Measurement ID this component renders nothing and
 * zero GA code is included in the bundle — the site behaves exactly as it
 * does today. Set the ID as a GitHub Actions *variable* and the deploy
 * workflow passes it through to `next build`.
 *
 * Implementation note: rather than next/script (which injects scripts at
 * hydration time on the App Router), we render one self-contained inline
 * bootstrap in the static HTML. It defines dataLayer/gtag, writes Consent
 * Mode v2 defaults BEFORE any measurement, configures the property, and only
 * then appends the async gtag.js loader — guaranteeing the canonical snippet
 * ordering on a fully static page. The loader is async, so it never blocks
 * rendering or LCP.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const GA_ENABLED = /^G-[A-Z0-9-]{4,}$/.test(GA_ID);
const CONSENT = process.env.NEXT_PUBLIC_GA_CONSENT === "denied" ? "denied" : "granted";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Strip the GitHub Pages project prefix so GA reports show "/" instead of
 * "/Trisle_Website/". Keeps reporting stable if the site later moves to a
 * custom domain (where BASE_PATH becomes empty).
 */
function cleanPagePath(): string {
  const path = BASE_PATH
    ? window.location.pathname.replace(BASE_PATH, "")
    : window.location.pathname;
  return (path || "/") + window.location.search;
}

/**
 * Push a GA4 event. Safe no-op before gtag.js has loaded or when GA is
 * disabled. If the bootstrap hasn't registered window.gtag yet, the command
 * is queued on dataLayer as an array — the same shape gtag() itself pushes —
 * and gtag.js drains the queue the moment it loads.
 */
export function gaEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_ENABLED || typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", name, params);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", name, params]);
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  // The initial page_view is sent by gtag('config', ..., send_page_view);
  // skip the first render so client navigations don't double-count it.
  const firstRender = useRef(true);

  useEffect(() => {
    if (!GA_ENABLED) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    gaEvent("page_view", {
      page_path: cleanPagePath(),
      page_title: document.title,
    });
  }, [pathname]);

  if (!GA_ENABLED) return null;

  const bootstrap = `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('consent', 'default', {
    ad_storage: '${CONSENT}',
    ad_user_data: '${CONSENT}',
    ad_personalization: '${CONSENT}',
    analytics_storage: '${CONSENT}'
  });
  gtag('config', '${GA_ID}', {
    send_page_view: true,
    page_path: (function () {
      var base = '${BASE_PATH}';
      var path = base ? location.pathname.replace(base, '') : location.pathname;
      return (path || '/') + location.search;
    })()
  });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
  document.head.appendChild(s);
})();
`;

  return (
    <script
      id="ga-bootstrap"
      dangerouslySetInnerHTML={{ __html: bootstrap }}
    />
  );
}
