import { useEffect, useRef, useState } from 'react';
import { MARKETS, type Market } from '../data/pricing';
import { getStoredMarket, setStoredMarket, MARKET_EVENT } from '../lib/market';
import { INDIA_ONLY } from '../config';

// Compact flag-based country switcher for the header. Shares state with the
// pricing page via the market lib, so changing country updates pricing too.
const FLAG: Record<Market, string> = {
  US: '🇺🇸', NZ: '🇳🇿', AU: '🇦🇺', UK: '🇬🇧', EU: '🇪🇺', IN: '🇮🇳',
};

export const CountrySwitcher = () => {
  const [market, setMarket] = useState<Market | null>(null); // null = SSR/pre-mount → show globe
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarket(getStoredMarket());
    const onChange = (e: Event) => setMarket(((e as CustomEvent).detail as Market) ?? getStoredMarket());
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    window.addEventListener(MARKET_EVENT, onChange);
    document.addEventListener('click', onDoc);
    return () => { window.removeEventListener(MARKET_EVENT, onChange); document.removeEventListener('click', onDoc); };
  }, []);

  const choose = (m: Market) => { setStoredMarket(m); setMarket(m); setOpen(false); };

  // India-only launch: no country choice to make — hide the switcher entirely.
  if (INDIA_ONLY) return null;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Select country / region"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          background: 'transparent', border: '1px solid rgba(15,23,42,0.12)', borderRadius: 999,
          padding: '0.35rem 0.6rem', cursor: 'pointer', fontSize: '1.05rem', lineHeight: 1,
        }}
      >
        <span>{market ? FLAG[market] : '🌐'}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--salvia-text-muted)' }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 300,
          background: '#fff', border: '1px solid rgba(15,23,42,0.1)', borderRadius: 12,
          boxShadow: '0 16px 40px -12px rgba(15,23,42,0.25)', padding: '0.4rem', minWidth: 180,
        }}>
          {MARKETS.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => choose(m.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%',
                background: m.key === market ? 'rgba(255,78,0,0.08)' : 'transparent',
                border: 'none', borderRadius: 8, padding: '0.5rem 0.6rem', cursor: 'pointer',
                fontSize: '0.88rem', color: 'var(--salvia-primary)', fontWeight: m.key === market ? 700 : 500, textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '1.05rem' }}>{FLAG[m.key]}</span>
              <span style={{ flex: 1 }}>{m.label}</span>
              <span style={{ color: 'var(--salvia-text-muted)' }}>{m.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
