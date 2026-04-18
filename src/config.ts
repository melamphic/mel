// Runtime config for /mel. Values come from Vite env vars in prod,
// fall back to local dev defaults so `npm run dev` works out of the box.

export const SAL_API_BASE: string =
  import.meta.env.VITE_SAL_API_BASE ?? 'http://localhost:8080';

export const SUPPORT_EMAIL: string =
  import.meta.env.VITE_SUPPORT_EMAIL ?? 'sales@salvia.nz';
