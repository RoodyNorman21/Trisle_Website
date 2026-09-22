/**
 * Central consent storage for the Trisle website (GDPR / ePrivacy).
 *
 * The visitor's analytics choice lives in localStorage under a versioned
 * key so future consent-schema changes never misread old values. The same
 * key is read by the inline GA bootstrap (rendered at build time — it must
 * stay string-interpolated, see google-analytics.tsx) and by the React
 * consent banner, so both agree on a single source of truth.
 *
 * Nothing here ever touches the network — it is purely local state.
 */

export const CONSENT_STORAGE_KEY = "trisle.consent.v1";

export const CONSENT_SCHEMA_VERSION = 1;

export type ConsentStatus = "granted" | "denied";

export interface ConsentRecord {
  status: ConsentStatus;
  /** Epoch milliseconds of the choice — proof-of-consent timestamp. */
  ts: number;
  version: number;
}

/** Read the stored consent record. Safe on SSR and on corrupted storage. */
export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed?.status !== "granted" && parsed?.status !== "denied") return null;
    return {
      status: parsed.status,
      ts: typeof parsed.ts === "number" ? parsed.ts : 0,
      version: typeof parsed.version === "number" ? parsed.version : 0,
    };
  } catch {
    return null;
  }
}

/** Persist a consent choice with a fresh timestamp. */
export function writeConsent(status: ConsentStatus): ConsentRecord {
  const record: ConsentRecord = {
    status,
    ts: Date.now(),
    version: CONSENT_SCHEMA_VERSION,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private-browsing storage failures must never break the UX —
    // the in-memory choice still applies for this page session.
  }
  return record;
}

/** Forget the stored choice (used when reopening the settings prompt). */
export function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Ignore — nothing else to do.
  }
}

/** Custom window event fired by the footer to reopen the consent prompt. */
export const OPEN_CONSENT_EVENT = "trisle:open-consent";

export function requestOpenConsent(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT));
}
