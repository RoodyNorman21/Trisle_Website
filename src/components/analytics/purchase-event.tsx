"use client";

import { useEffect } from "react";
import { gaEvent } from "./google-analytics";

/**
 * Fires a GA4 `purchase` conversion when the thank-you page is reached via a
 * real Polar checkout redirect:
 *
 *   /success?checkout_id={CHECKOUT_ID}
 *
 * GA4 automatically de-duplicates purchase events sharing the same
 * transaction_id, so reloading the success page never double-counts.
 * Visits WITHOUT a checkout_id (people poking the URL manually) are ignored
 * on purpose — that keeps the conversion report clean.
 *
 * Requires the Polar dashboard Success URL to be set to:
 *   https://trisle-app.github.io/Trisle_Website/success?checkout_id={CHECKOUT_ID}
 */
const PRICE_EUR = 3.99;

export function PurchaseEvent() {
  useEffect(() => {
    const checkoutId = new URLSearchParams(window.location.search).get("checkout_id");
    if (!checkoutId) return;
    gaEvent("purchase", {
      transaction_id: checkoutId,
      currency: "EUR",
      value: PRICE_EUR,
      items: [
        {
          item_id: "trisle",
          item_name: "Trisle",
          price: PRICE_EUR,
          quantity: 1,
        },
      ],
    });
  }, []);

  return null;
}
