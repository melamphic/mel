// Runtime config for /mel. Values come from Vite env vars in prod,
// fall back to local dev defaults so `npm run dev` works out of the box.

export const SAL_API_BASE: string =
  import.meta.env.VITE_SAL_API_BASE ?? 'http://localhost:8080';

export const SUPPORT_EMAIL: string =
  import.meta.env.VITE_SUPPORT_EMAIL ?? 'sales@salvia.nz';

export const APP_URL: string =
  import.meta.env.VITE_APP_URL ?? 'https://app.salvia.nz';

// India-only launch mode. When true (the default), the site forces the India
// market everywhere and hides the country switcher + currency selector — every
// other market (US/UK/NZ/AU/EU) is parked until we expand. Flip back to the
// full multi-market site by setting VITE_INDIA_ONLY=false.
export const INDIA_ONLY: boolean =
  (import.meta.env.VITE_INDIA_ONLY ?? 'true') !== 'false';
