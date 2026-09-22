"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { CONSENT_STORAGE_KEY, readConsent } from "@/lib/consent";

/**
 * Google Analytics 4 (gtag.js), wired for the static GitHub Pages export.
 *
 * Activation is build-time and env-driven, mirroring the GSC/Bing
 * verification tags in the root layout:
 *
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID  e.g. "G-XXXXXXXXXX" (required to enable)
 *   NEXT_PUBLIC_GA_CONSENT         "banner" (default) | "granted" | "denied"
 *
 * Consent modes (GDPR / ePrivacy):
 *   - "banner"  STRICT PRIOR CONSENT. The inline bootstrap defines the
 *     dataLayer/gtag stubs and a window.__trisleGaStart() entry point, but
 *     measures NOTHING until the visitor opts in via the consent banner.
 *     A stored "granted" choice (returning visitor) auto-starts analytics
 *     immediately. A stored "denied" choice or no choice => zero network
 *     traffic to Google, no cookies, not even cookieless pings.
 *   - "granted" Legacy behavior: load immediately (only for deployments
 *     that intentionally skip the banner).
 *   - "denied"  GA fully disabled regardless of any stored choice.
 *
 * With no (or an invalid) Measurement ID this component renders nothing and
 * zero GA code is included in the bundle.
 *
 * Implementation note: rather than next/script (which injects scripts at
 * hydration time on the App Router), we render one self-contained inline
 * bootstrap in the static HTML. It runs before hydration, so a returning
 * visitor's stored consent is honored with no flash and no flicker, and the
 * async gtag.js loader never blocks rendering or LCP.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const GA_ENABLED = /^G-[A-Z0-9-]{4,}$/.test(GA_ID);
const RAW_CONSENT = process.env.NEXT_PUBLIC_GA_CONSENT || "banner";
const CONSENT_MODE: "banner" | "granted" | "denied" =
  RAW_CONSENT === "granted" || RAW_CONSENT === "denied" ? RAW_CONSENT : "banner";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    /** Defined by the inline bootstrap in "banner" mode; idempotent. */
    __trisleGaStart?: () => void;
    /** True once consent defaults + config + loader have actually run. */
    __trisleGaStarted?: boolean;
  }
}

/**
 * Whether analytics is allowed to record RIGHT NOW. Used by gaEvent() so
 * pre-consent events are dropped instead of silently queuing on dataLayer
 * (where gtag.js would flush them the moment a late opt-in happens).
 */
export function analyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (CONSENT_MODE === "granted") return true;
  if (CONSENT_MODE === "denied") return false;
  return readConsent()?.status === "granted";
}

/**
 * Whether the visitor-facing consent banner should be active: only when GA
 * is actually configured AND consent mode is "banner" (strict prior consent).
 * Exported so the banner and footer settings link share the exact same
 * build-time decision.
 */
export const GA_CONSENT_BANNER_ACTIVE = GA_ENABLED && CONSENT_MODE === "banner";

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
 * Push a GA4 event. Safe no-op before gtag.js has loaded, when GA is
 * disabled, or when the visitor has not granted analytics consent. If the
 * bootstrap hasn't registered the real gtag yet but consent IS granted
 * (accept just happened, loader still in flight), the command is queued on
 * dataLayer as an array — the same shape gtag() itself pushes — and gtag.js
 * drains the queue the moment it loads.
 */
export function gaEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_ENABLED || typeof window === "undefined") return;
  if (!analyticsAllowed()) return;
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

  if (!GA_ENABLED || CONSENT_MODE === "denied") return null;

  // Shared by all modes: canonical gtag.js ordering — stubs, consent defaults
  // BEFORE measurement, config, then the async loader.
  const startGa = `
  function startGa() {
    if (window.__trisleGaStarted) return;
    window.__trisleGaStarted = true;
    gtag('consent', 'default', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
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
  }`;

  // "granted" mode: fire immediately, exactly like the pre-banner behavior.
  // "banner" mode: expose the start point, then auto-start only for visitors
  // whose stored consent record says granted. Storage read failures stay
  // on the safe side (no analytics).
  const bootstrap =
    CONSENT_MODE === "granted"
      ? `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  window.__trisleGaStart = startGa;
  startGa();
})();
`
      : `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  window.__trisleGaStart = startGa;
  var allowed = false;
  try {
    var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
    if (raw) {
      var rec = JSON.parse(raw);
      allowed = !!rec && rec.status === 'granted';
    }
  } catch (e) { allowed = false; }
  if (allowed) startGa();
})();
`;

  return (
    <script
      id="ga-bootstrap"
      dangerouslySetInnerHTML={{ __html: `(function () { ${startGa} ${bootstrap} })();` }}
    />
  );
}
