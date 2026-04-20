// Pricing data mirrors /pricing-model-v3.md (locked).
// Source of truth for the marketing pricing page.

export type Vertical = 'veterinary' | 'dental' | 'general_clinic';
export type TierKey = 'solo' | 'practice' | 'pro';
export type Cycle = 'monthly' | 'annual';

export interface Tier {
  key: TierKey;
  name: string;
  seats: string;
  notesPerMonth: number;
  // Monthly list price in USD (excl. tax). Single-currency per v3 simplification.
  priceUSD: number;
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
    tagline: 'Ambient notes for veterinary clinics.',
    seatLabel: 'vets',
    tiers: [
      {
        key: 'solo',
        name: 'Solo',
        seats: '1 vet',
        notesPerMonth: 500,
        priceUSD: 99,
      },
      {
        key: 'practice',
        name: 'Practice',
        seats: '2–3 vets',
        notesPerMonth: 1500,
        priceUSD: 229,
        highlight: 'Most popular',
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 vets',
        notesPerMonth: 4000,
        priceUSD: 499,
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
        priceUSD: 229,
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 dentists',
        notesPerMonth: 3000,
        priceUSD: 499,
        highlight: 'Most popular',
      },
    ],
  },
  {
    key: 'general_clinic',
    brand: 'Salvia Clinic',
    tagline: 'Ambient notes for GPs and primary care.',
    seatLabel: 'providers',
    tiers: [
      {
        key: 'practice',
        name: 'Practice',
        seats: '1–3 providers',
        notesPerMonth: 2000,
        priceUSD: 249,
      },
      {
        key: 'pro',
        name: 'Pro',
        seats: '4–7 providers',
        notesPerMonth: 5000,
        priceUSD: 599,
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

// Displayed monthly USD price (annual shows monthly-equivalent after discount).
export function displayedMonthly(tier: Tier, cycle: Cycle): number {
  return cycle === 'annual' ? Math.round(tier.priceUSD * ANNUAL_DISCOUNT) : tier.priceUSD;
}
