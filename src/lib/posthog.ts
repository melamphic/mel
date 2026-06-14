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
