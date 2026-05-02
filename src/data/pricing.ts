// Pricing data mirrors /pricing-model-v3.md (locked).
// Source of truth for the marketing pricing page.

export type Vertical = 'veterinary' | 'dental' | 'general_clinic';
export type TierKey = 'practice' | 'pro';
export type Cycle = 'monthly' | 'annual';

/// ISO market identifiers matching pricing-model-v3 §11. USD is the
/// canonical cost-modelling currency; the others are display-only and
/// rounded to clean numbers.
export type Market = 'US' | 'NZ' | 'AU' | 'UK';

export interface MarketMeta {
  key: Market;
  label: string;
  currency: string;
  symbol: string;
  taxNote: string;
}

export const MARKETS: MarketMeta[] = [
  { key: 'US', label: 'United States',   currency: 'USD', symbol: '$',  taxNote: 'Excl. local sales tax' },
  { key: 'NZ', label: 'New Zealand',     currency: 'NZD', symbol: 'NZ$', taxNote: 'Excl. GST 15%' },
  { key: 'AU', label: 'Australia',       currency: 'AUD', symbol: 'A$', taxNote: 'Excl. GST 10%' },
  { key: 'UK', label: 'United Kingdom',  currency: 'GBP', symbol: '£',  taxNote: 'Excl. VAT 20%' },
];

export interface Tier {
  key: TierKey;
  name: string;
  seats: string;
  notesPerMonth: number;
  /// Per-market list price in the local display currency. Locked at
  /// rollout per pricing-model-v3 §4–§6, reviewed quarterly.
  prices: Record<Market, number>;
  highlight?: string;
}

export interface Product {
  key: Vertical;
  brand: string;
  tagline: string;
  seatLabel: string;
  tiers: Tier[];
}

export const PRODUCTS: Product[] = [
  {
    key: 'veterinary',
    brand: 'Salvia Paws',
    tagline: 'Point-of-care clinical notes for veterinary clinics.',
    seatLabel: 'vets',
    tiers: [
      {
        key: 'practice',
        name: 'Practice',
        seats: '1–3 vets',
        notesPerMonth: 1500,
        prices: { US: 229, NZ: 385, AU: 365, UK: 181 },
        highlight: 'Most popular',
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 vets',
        notesPerMonth: 4000,
        prices: { US: 499, NZ: 839, AU: 795, UK: 395 },
      },
    ],
  },
  {
    key: 'dental',
    brand: 'Salvia Smile',
    tagline: 'Clinical notes for dental practices.',
    seatLabel: 'dentists',
    tiers: [
      {
        key: 'practice',
        name: 'Practice',
        seats: '1–3 dentists',
        notesPerMonth: 1200,
        prices: { US: 229, NZ: 385, AU: 365, UK: 181 },
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 dentists',
        notesPerMonth: 3000,
        prices: { US: 499, NZ: 839, AU: 795, UK: 395 },
        highlight: 'Most popular',
      },
    ],
  },
  {
    key: 'general_clinic',
    brand: 'Salvia Clinic',
    tagline: 'Point-of-care clinical notes for GPs and primary care.',
    seatLabel: 'providers',
    tiers: [
      {
        key: 'practice',
        name: 'Practice',
        seats: '1–3 providers',
        notesPerMonth: 2000,
        prices: { US: 249, NZ: 419, AU: 395, UK: 199 },
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 providers',
        notesPerMonth: 5000,
        prices: { US: 599, NZ: 1005, AU: 945, UK: 475 },
        highlight: 'Most popular',
      },
    ],
  },
];

// Annual plan: pay for 10 months, get 12 — 17% discount.
export const ANNUAL_DISCOUNT = 10 / 12;

// Stable plan_code for the sal backend. Format `{product}_{tier}_{cycle}`.
export function planCode(v: Vertical, tier: TierKey, cycle: Cycle): string {
  const product = v === 'veterinary' ? 'paws' : v === 'dental' ? 'smile' : 'clinic';
  return `${product}_${tier}_${cycle}`;
}

/// Displayed monthly price for a (tier, market, cycle) triple. The
/// monthly figure is the locked list price; annual shows the
/// monthly-equivalent after the 17% discount, rounded to a clean
/// number.
export function displayedMonthly(tier: Tier, market: Market, cycle: Cycle): number {
  const list = tier.prices[market];
  return cycle === 'annual' ? Math.round(list * ANNUAL_DISCOUNT) : list;
}

/// Resolves the [MarketMeta] for a market key. Falls back to US for
/// unknown values so a stale persisted preference can never break
/// rendering.
export function marketMetaFor(key: Market): MarketMeta {
  return MARKETS.find((m) => m.key === key) ?? MARKETS[0];
}

/// Best-effort browser locale → market detection. Used to pre-select
/// the market dropdown so a New Zealand vet sees NZD on first load.
/// Returns 'US' when no signal matches — a safe default given USD is
/// the canonical fallback.
export function detectMarket(): Market {
  if (typeof navigator === 'undefined') return 'US';
  const langs = (navigator.languages ?? [navigator.language ?? '']).map((l) => l.toLowerCase());
  for (const l of langs) {
    if (l.endsWith('-nz') || l === 'mi' || l === 'mi-nz') return 'NZ';
    if (l.endsWith('-au')) return 'AU';
    if (l.endsWith('-gb') || l === 'cy' || l === 'cy-gb') return 'UK';
  }
  // Time-zone heuristic for users with English-only language settings.
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    if (tz.startsWith('Pacific/Auckland') || tz === 'Pacific/Chatham') return 'NZ';
    if (tz.startsWith('Australia/')) return 'AU';
    if (tz === 'Europe/London' || tz === 'Europe/Belfast') return 'UK';
  } catch {
    // Ignore — fall through to US default.
  }
  return 'US';
}
