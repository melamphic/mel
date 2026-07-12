// Runtime config for /mel. Values come from Vite env vars in prod; fall back
// to per-environment defaults so `npm run dev` works out of the box AND a
// missing/empty prod env var can never silently point the app at a dead or
// relative URL.
//
// Why the helper: Vite injects "" for an env var that is defined-but-empty,
// and `??` keeps "" — which made the signup POST to a *relative*
// `/api/v1/access-requests` on the marketing domain (405, no backend). We treat
// blank as unset and fall back by environment (PROD → real hosts, dev → local).
function fromEnv(value: string | undefined, prod: string, dev: string): string {
  const v = (value ?? '').trim();
  if (v) return v.replace(/\/+$/, '');
  return import.meta.env.PROD ? prod : dev;
}

export const SAL_API_BASE: string = fromEnv(
  import.meta.env.VITE_SAL_API_BASE,
  'https://api.hellosalvia.com',
  'http://localhost:8080',
);

export const APP_URL: string = fromEnv(
  import.meta.env.VITE_APP_URL,
  'https://app.hellosalvia.com',
  'http://localhost:3000',
);

export const SUPPORT_EMAIL: string =
  (import.meta.env.VITE_SUPPORT_EMAIL ?? '').trim() || 'sales@hellosalvia.com';

// India-only launch mode. When true (the default), the site forces the India
// market everywhere and hides the country switcher + currency selector — every
// other market (US/UK/NZ/AU/EU) is parked until we expand. Flip back to the
// full multi-market site by setting VITE_INDIA_ONLY=false.
export const INDIA_ONLY: boolean =
  (import.meta.env.VITE_INDIA_ONLY ?? 'true') !== 'false';
