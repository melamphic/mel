import posthog from 'posthog-js';

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com';

let initialized = false;

export function initPostHog(): void {
  if (initialized) return;
  if (!KEY) return;
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    person_profiles: 'identified_only',
    defaults: '2025-05-24',
  });
  initialized = true;
}

export function capturePageview(path: string, title?: string): void {
  if (!initialized) return;
  posthog.capture('$pageview', {
    $current_url: window.location.origin + path,
    path,
    ...(title ? { title } : {}),
  });
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.capture(event, props);
}

export function identify(distinctId: string, props?: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.identify(distinctId, props);
}

export { posthog };
