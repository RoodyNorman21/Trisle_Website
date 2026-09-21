"use client";

/**
 * Polar.sh embedded checkout.
 *
 * The popup is built on a public Checkout Link, so no secrets live here.
 * The link can be overridden per environment via NEXT_PUBLIC_POLAR_CHECKOUT_LINK.
 *
 * Docs: https://polar.sh/docs/features/checkout/embed
 * NOTE: the checkout iframe only renders on hosts whitelisted under
 * Polar Dashboard -> Settings -> Preferences -> Embedding. Until the host
 * is whitelisted, Polar refuses to frame the checkout (frame-ancestors),
 * the SDK's "loaded" event never fires and create() never resolves —
 * that is why openPolarCheckout() races a load timeout and falls back
 * to opening the hosted checkout page in a new tab.
 */

const CHECKOUT_LINK =
  process.env.NEXT_PUBLIC_POLAR_CHECKOUT_LINK ||
  "https://buy.polar.sh/polar_cl_jkMs1ZdTOWI93aVTCiwdz1zKZKPLWr78XVJwC2IsUjI";

/** How long to wait for the embedded checkout to signal "loaded". */
const LOAD_TIMEOUT_MS = 10_000;

type EmbedCheckoutInstance = {
  addEventListener: (type: string, listener: (event: Event) => void) => void;
  close: () => void;
};

type EmbedCheckoutModule = {
  PolarEmbedCheckout: {
    create: (
      url: string,
      options?: {
        theme?: "light" | "dark";
        onLoaded?: (event: Event) => void;
      },
    ) => Promise<EmbedCheckoutInstance>;
  };
};

let instance: EmbedCheckoutInstance | null = null;
let opening = false;

export function getPolarCheckoutLink(): string {
  return CHECKOUT_LINK;
}

/**
 * Manually tear down everything the SDK injects while its overlay is up.
 * Needed when the checkout frame never fires "loaded" (e.g. host not
 * whitelisted yet): the SDK would otherwise leave a full-viewport iframe,
 * a loader spinner and a body scroll lock behind forever.
 */
function teardownInjectedOverlay() {
  if (typeof document === "undefined") return;
  document.body.classList.remove("polar-no-scroll");
  document
    .querySelectorAll<HTMLIFrameElement>(
      'iframe[src*="polar.sh"][src*="embed=true"]',
    )
    .forEach((el) => el.remove());
  document
    .querySelectorAll<HTMLDivElement>(".polar-loader-spinner")
    .forEach((el) => el.parentElement?.remove());
}

/**
 * Opens the dark-themed Polar checkout popup. Resolves once the checkout
 * iframe is fully loaded (or after falling back to the hosted page).
 *
 * Failure fallback: if the embed can't initialize in time (host not
 * whitelisted yet, blocked CDN, offline, SDK error), the hosted checkout
 * page opens in a new tab so the purchase journey is never dead-ended.
 */
export async function openPolarCheckout(): Promise<void> {
  // An existing popup is open — don't stack a second one.
  if (instance || opening) return;
  opening = true;

  let settled = false;

  try {
    const { PolarEmbedCheckout } =
      (await import("@polar-sh/checkout/embed")) as EmbedCheckoutModule;

    const creation = PolarEmbedCheckout.create(CHECKOUT_LINK, {
      theme: "dark",
    });

    const timeout = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), LOAD_TIMEOUT_MS),
    );

    const checkout = await Promise.race([creation, timeout]);

    if (!checkout) {
      // The frame never signalled "loaded" — get rid of the stuck overlay
      // and let the user finish the purchase on the hosted page instead.
      teardownInjectedOverlay();
      console.error(
        "[polar] embedded checkout did not load in time — opening hosted checkout",
      );
      window.open(CHECKOUT_LINK, "_blank", "noopener,noreferrer");
      creation.then(
        (late) => late?.close(), // frame showed up late: discard it
        () => undefined,
      );
      return;
    }

    settled = true;
    instance = checkout;

    // The SDK removes the iframe from the DOM on close; reset our handle
    // so the next click opens a fresh checkout session.
    checkout.addEventListener("close", () => {
      instance = null;
    });
  } catch (err) {
    console.error(
      "[polar] embedded checkout failed — opening hosted checkout",
      err,
    );
    teardownInjectedOverlay();
    window.open(CHECKOUT_LINK, "_blank", "noopener,noreferrer");
  } finally {
    if (!settled) instance = null;
    opening = false;
  }
}
