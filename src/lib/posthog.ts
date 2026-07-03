// PostHog is loaded lazily (dynamic import) and initialised off the critical
// path, so its ~180KB never blocks first render / hydration. Events fired
// before it finishes loading are queued and flushed once it's ready, so no
// pageviews or events are lost.

type PostHog = typeof import('posthog-js')['default'];

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com';
const ENABLED = !!KEY;

let ph: PostHog | null = null;
let initializing: Promise<void> | null = null;
const queue: Array<(p: PostHog) => void> = [];

function enqueue(run: (p: PostHog) => void): void {
  if (!ENABLED) return;
  // Consent-first: events fired before the user grants analytics consent are
  // DROPPED, not buffered — otherwise the pre-consent pageviews would be
  // flushed (and sent) the moment consent arrives, which violates the
  // consent-before-collection principle (GDPR / DPDP).
  if (!hasAnalyticsConsent()) return;
  if (ph) run(ph);
  else queue.push(run);
}

export function initPostHog(): Promise<void> {
  if (initializing) return initializing;
  if (!ENABLED) return Promise.resolve();
  initializing = import('posthog-js').then(({ default: posthog }) => {
    posthog.init(KEY as string, {
      api_host: HOST,
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      person_profiles: 'identified_only',
      defaults: '2025-05-24',
    });
    ph = posthog;
    while (queue.length) queue.shift()!(ph);
  });
  return initializing;
}

export function capturePageview(path: string, title?: string): void {
  enqueue((p) => p.capture('$pageview', {
    $current_url: window.location.origin + path,
    path,
    ...(title ? { title } : {}),
  }));
}

export function track(event: string, props?: Record<string, unknown>): void {
  enqueue((p) => p.capture(event, props));
}

export function identify(distinctId: string, props?: Record<string, unknown>): void {
  enqueue((p) => p.identify(distinctId, props));
}

// --- Cookie / analytics consent -------------------------------------------
// Analytics (PostHog) only runs after the user grants consent via the banner.
export const CONSENT_KEY = 'salvia.cookie-consent'; // 'granted' | 'denied'

export function getConsent(): 'granted' | 'denied' | null {
  try { return localStorage.getItem(CONSENT_KEY) as 'granted' | 'denied' | null; } catch { return null; }
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === 'granted';
}

/** Persist the choice and start/stop analytics accordingly. */
export function setAnalyticsConsent(granted: boolean): void {
  try { localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied'); } catch { /* ignore */ }
  if (granted) {
    // Re-granting after an earlier opt-out must re-enable capture.
    if (ph && ph.has_opted_out_capturing()) ph.opt_in_capturing();
    void initPostHog();
  } else {
    queue.length = 0; // drop anything buffered while the SDK was loading
    if (ph) ph.opt_out_capturing();
  }
}
