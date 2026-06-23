import { useEffect, useState } from 'react';
import { MARKETS, detectMarket, type Market } from '../data/pricing';
import { INDIA_ONLY } from '../config';

// Shared market/country preference — used by the header CountrySwitcher AND the
// pricing page, so changing country anywhere updates everywhere. Persisted in
// localStorage; changes broadcast via a window event so open pages react live.
export const MARKET_STORAGE_KEY = 'salvia.pricing.market';
export const MARKET_EVENT = 'salvia:market';

export function getStoredMarket(): Market {
  if (INDIA_ONLY) return 'IN'; // India-only launch — every market resolves to IN
  try {
    const s = localStorage.getItem(MARKET_STORAGE_KEY) as Market | null;
    if (s && MARKETS.some((m) => m.key === s)) return s;
  } catch { /* ignore */ }
  return detectMarket();
}

export function setStoredMarket(m: Market): void {
  try { localStorage.setItem(MARKET_STORAGE_KEY, m); } catch { /* ignore */ }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MARKET_EVENT, { detail: m }));
  }
}

/**
 * React hook: current market, reacting live to the header CountrySwitcher.
 * SSR-safe — returns 'US' (global) until mounted, so prerendered HTML is the
 * global variant and India visitors switch to India copy on the client.
 */
export function useMarket(): Market {
  const [market, setMarket] = useState<Market>(INDIA_ONLY ? 'IN' : 'US');
  useEffect(() => {
    if (INDIA_ONLY) return; // pinned to IN — no switcher, no live updates
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarket(getStoredMarket());
    const on = (e: Event) => setMarket(((e as CustomEvent).detail as Market) ?? getStoredMarket());
    window.addEventListener(MARKET_EVENT, on);
    return () => window.removeEventListener(MARKET_EVENT, on);
  }, []);
  return market;
}

/** Convenience: true when the visitor's market is India. */
export function useIsIndia(): boolean {
  return useMarket() === 'IN';
}
