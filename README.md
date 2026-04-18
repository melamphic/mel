# mel — Salvia marketing & signup site

Static site for [salvia.nz](https://salvia.nz) pricing + signup. Visitors
compare plans, enter clinic details, complete Stripe Checkout, and are
handed off to the main Salvia app via a short-lived JWT.

- **Stack:** Vite + React + TypeScript
- **Hosting:** static bucket behind a CDN (build output = `dist/`)
- **Backend:** talks to `sal` at `VITE_SAL_API_BASE`

## Quick start

```bash
cp .env.example .env      # fill in VITE_SAL_API_BASE if the backend isn't local
npm install
npm run dev               # http://localhost:5173
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production bundle into `dist/` |
| `npm run preview` | Serve the production bundle locally |
| `npm run lint` | ESLint |

## Environment

All variables must be prefixed with `VITE_` to be exposed to the browser.
See `.env.example` for the full list.

| Variable | Purpose |
|---|---|
| `VITE_SAL_API_BASE` | Base URL of the Sal backend (`http://localhost:8080` in dev). |
| `VITE_SUPPORT_EMAIL` | Address used by "Talk to sales" links on the pricing page. |

## Running the full stack

The signup flow needs three services running together — the backend mints
the handoff JWT, `/mel` redirects to it, and the Salvia app consumes it:

```bash
# 1. backend (sal) — exposes /api/v1/auth/signup/start + /billing/*
cd ../sal && make dev       # http://localhost:8080

# 2. this site
cd ../mel && npm run dev    # http://localhost:5173

# 3. Salvia app (Flutter web)
cd ../salvia/apps && flutter run -d chrome --web-port 3000
```

Both `sal` and `mel` must share the same `MEL_HANDOFF_JWT_SECRET`; see
`sal/.env.example` for the authoritative copy. Add `http://localhost:5173`
to `CORS_ORIGINS` in `sal/.env` so the signup POST is allowed.
