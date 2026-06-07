// Pricing data mirrors /pricing-model-v3.md (locked).
// Source of truth for the marketing pricing page.

export type Vertical =
  | 'veterinary'
  | 'dental'
  | 'general_clinic'
  | 'allied_health';
export type TierKey = 'practice' | 'pro';
export type Cycle = 'monthly' | 'annual';

/// ISO market identifiers matching pricing-model-v3 §11. USD is the
/// canonical cost-modelling currency; the others are display-only and
/// rounded to clean numbers. EU = euro-area pricing (any EU country),
/// with VAT excluded since rates vary by member state.
/// GlobalMarket is the subset used for product tier pricing (Practice/Pro).
/// Market adds IN for the India-specific tier model.
export type GlobalMarket = 'US' | 'NZ' | 'AU' | 'UK' | 'EU';
export type Market = GlobalMarket | 'IN';

export interface MarketMeta {
  key: Market;
  label: string;
  currency: string;
  symbol: string;
  taxNote: string;
}

export const MARKETS: MarketMeta[] = [
  { key: 'US', label: 'United States',   currency: 'USD', symbol: '$',   taxNote: 'Excl. local sales tax' },
  { key: 'NZ', label: 'New Zealand',     currency: 'NZD', symbol: 'NZ$', taxNote: 'Excl. GST 15%' },
  { key: 'AU', label: 'Australia',       currency: 'AUD', symbol: 'A$',  taxNote: 'Excl. GST 10%' },
  { key: 'UK', label: 'United Kingdom',  currency: 'GBP', symbol: '£',   taxNote: 'Excl. VAT 20%' },
  { key: 'EU', label: 'Europe',          currency: 'EUR', symbol: '€',   taxNote: 'Excl. VAT (rate varies by country)' },
  { key: 'IN', label: 'India',           currency: 'INR', symbol: '₹',   taxNote: 'Excl. GST 18%' },
];

export interface Tier {
  key: TierKey;
  name: string;
  seats: string;
  notesPerMonth: number;
  /// Number of staff who can RECORD with AI (audio capture + AI form
  /// extraction). Practice = 3, Pro = 7. Other staff (nurses,
  /// reception) join free with view + handoff access. Enforced
  /// server-side by sal/internal/staff (see ErrAISeatCapReached).
  aiSeats: number;
  /// Per-market list price in the local display currency. Locked at
  /// rollout per pricing-model-v3 §4–§6, reviewed quarterly.
  /// India (IN) uses a separate tier model — see INDIA_TIERS.
  prices: Record<GlobalMarket, number>;
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
    brand: 'Salvia',
    tagline: 'Compliance-grade clinical documentation for veterinary practices.',
    seatLabel: 'vets',
    tiers: [
      {
        key: 'practice',
        name: 'Practice',
        seats: '1–3 vets',
        notesPerMonth: 1500,
        aiSeats: 3,
        prices: { US: 229, NZ: 385, AU: 365, UK: 181, EU: 209 },
        highlight: 'Most popular',
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 vets',
        notesPerMonth: 4000,
        aiSeats: 7,
        prices: { US: 499, NZ: 839, AU: 795, UK: 395, EU: 459 },
      },
    ],
  },
  {
    key: 'dental',
    brand: 'Salvia',
    tagline: 'Compliance-grade clinical documentation for dental practices.',
    seatLabel: 'dentists',
    tiers: [
      {
        key: 'practice',
        name: 'Practice',
        seats: '1–3 dentists',
        notesPerMonth: 1200,
        aiSeats: 3,
        prices: { US: 229, NZ: 385, AU: 365, UK: 181, EU: 209 },
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 dentists',
        notesPerMonth: 3000,
        aiSeats: 7,
        prices: { US: 499, NZ: 839, AU: 795, UK: 395, EU: 459 },
        highlight: 'Most popular',
      },
    ],
  },
  {
    key: 'general_clinic',
    brand: 'Salvia',
    tagline: 'Compliance-grade clinical documentation for GPs and primary care.',
    seatLabel: 'providers',
    tiers: [
      {
        key: 'practice',
        name: 'Practice',
        seats: '1–3 providers',
        notesPerMonth: 2000,
        aiSeats: 3,
        prices: { US: 249, NZ: 419, AU: 395, UK: 199, EU: 229 },
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 providers',
        notesPerMonth: 5000,
        aiSeats: 7,
        prices: { US: 599, NZ: 1005, AU: 945, UK: 475, EU: 549 },
        highlight: 'Most popular',
      },
    ],
  },
  {
    key: 'allied_health',
    brand: 'Salvia',
    tagline: 'Compliance-grade clinical documentation for allied health — physio, osteo, chiro, OT, podiatry, speech.',
    seatLabel: 'clinicians',
    tiers: [
      {
        key: 'practice',
        name: 'Practice',
        seats: '1–3 clinicians',
        notesPerMonth: 1800,
        aiSeats: 3,
        prices: { US: 229, NZ: 385, AU: 365, UK: 181, EU: 209 },
        highlight: 'Most popular',
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 clinicians',
        notesPerMonth: 4500,
        aiSeats: 7,
        prices: { US: 499, NZ: 839, AU: 795, UK: 395, EU: 459 },
      },
    ],
  },
];

// Annual plan: pay for 10 months, get 12 — 17% discount.
export const ANNUAL_DISCOUNT = 10 / 12;

// Stable plan_code for the sal backend. Format `{product}_{tier}_{cycle}`.
export function planCode(v: Vertical, tier: TierKey, cycle: Cycle): string {
  const product =
    v === 'veterinary' ? 'paws'
    : v === 'dental' ? 'smile'
    : v === 'allied_health' ? 'motion'
    : 'clinic';
  return `${product}_${tier}_${cycle}`;
}

/// Displayed monthly price for a (tier, market, cycle) triple. The
/// monthly figure is the locked list price; annual shows the
/// monthly-equivalent after the 17% discount, rounded to a clean
/// number. Only valid for GlobalMarket — India uses indiaDisplayedMonthly.
export function displayedMonthly(tier: Tier, market: GlobalMarket, cycle: Cycle): number {
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
    if (l.endsWith('-in') || l === 'hi' || l === 'bn' || l === 'ta' || l === 'te' || l === 'mr' || l === 'gu' || l === 'kn' || l === 'ml') return 'IN';
    if (l.endsWith('-gb') || l === 'cy' || l === 'cy-gb') return 'UK';
    if (
      l.endsWith('-ie') || l === 'ga' || l === 'ga-ie' ||
      l.startsWith('de') || l.startsWith('fr') || l.startsWith('es') ||
      l.startsWith('it') || l.startsWith('nl') || l.startsWith('pt') ||
      l.startsWith('fi') || l.startsWith('sv') || l.startsWith('da') ||
      l.startsWith('el') || l.startsWith('pl') || l.startsWith('cs') ||
      l.startsWith('hu') || l.startsWith('ro') || l.startsWith('bg') ||
      l.startsWith('et') || l.startsWith('lv') || l.startsWith('lt') ||
      l.startsWith('mt') || l.startsWith('hr') || l.startsWith('sl') ||
      l.startsWith('sk')
    ) return 'EU';
  }
  // Time-zone heuristic for users with English-only language settings.
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    if (tz.startsWith('Pacific/Auckland') || tz === 'Pacific/Chatham') return 'NZ';
    if (tz.startsWith('Australia/')) return 'AU';
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'IN';
    if (
      tz === 'Europe/London' || tz === 'Europe/Belfast' ||
      tz === 'Europe/Isle_of_Man' || tz === 'Europe/Jersey' ||
      tz === 'Europe/Guernsey'
    ) return 'UK';
    // Any other Europe/* timezone falls into the EU market.
    if (tz.startsWith('Europe/') || tz === 'Atlantic/Madeira' || tz === 'Atlantic/Azores' || tz === 'Atlantic/Canary') return 'EU';
  } catch {
    // Ignore — fall through to US default.
  }
  return 'US';
}

// ---------------------------------------------------------------------------
// India market — separate 3-tier model (Base / Growth / Unlimited).
// Not per-seat; differentiated by total monthly draft cap and AI inclusion.
// ---------------------------------------------------------------------------

export type IndiaTierKey = 'base' | 'growth' | 'unlimited';

export interface IndiaTier {
  key: IndiaTierKey;
  name: string;
  monthlyINR: number;
  annualINR: number;    // 10-month price (2 months free)
  draftCap: number | null; // null = no per-clinic cap (global pool ceiling only)
  aiIncluded: boolean;
  highlight?: string;
  features: string[];
}

export const INDIA_TIERS: IndiaTier[] = [
  {
    key: 'base',
    name: 'Base',
    monthlyINR: 2500,
    annualINR: 25000,
    draftCap: null,
    aiIncluded: false,
    features: [
      'Drug register + controlled substance log',
      'Forms, policies & PDF export',
      'Incident & consent management',
      'Patient records',
      'Email support — 48hr',
    ],
  },
  {
    key: 'growth',
    name: 'Growth',
    monthlyINR: 6000,
    annualINR: 60000,
    draftCap: 750,
    aiIncluded: true,
    highlight: 'Most popular',
    features: [
      'Everything in Base',
      'AI voice → clinical note',
      'AI form & policy generation',
      '750 AI drafts / month',
      'Email support — 24hr',
    ],
  },
  {
    key: 'unlimited',
    name: 'Unlimited',
    monthlyINR: 14000,
    annualINR: 140000,
    draftCap: null,
    aiIncluded: true,
    features: [
      'Everything in Growth',
      'Unlimited AI drafts',
      'Priority AI queue',
      'Multi-location support',
      'Dedicated onboarding call',
    ],
  },
];

/// Monthly-equivalent price to display for an India tier.
/// Annual shows the per-month equivalent of the 10-month annual price.
export function indiaDisplayedMonthly(tier: IndiaTier, cycle: Cycle): number {
  return cycle === 'annual' ? Math.round(tier.annualINR / 12) : tier.monthlyINR;
}

export function indiaPlanCode(tier: IndiaTierKey, cycle: Cycle): string {
  return `in_${tier}_${cycle}`;
}
