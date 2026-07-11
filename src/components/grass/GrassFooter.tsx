import React from 'react';
import { Link } from 'react-router-dom';

import salviaLogo from '../../assets/salvia.png';

const COLS: { title: string; links: [string, string][] }[] = [
  { title: 'By practice', links: [['Hospitals', '/hospitals'], ['Veterinary', '/veterinary'], ['Dental', '/dental'], ['General Practice', '/general-practice'], ['Allied Health', '/allied-health']] },
  { title: 'Allied disciplines', links: [['Physiotherapy', '/physiotherapy'], ['Osteopathy', '/osteopathy'], ['Chiropractic', '/chiropractic'], ['Occupational Therapy', '/occupational-therapy'], ['Podiatry', '/podiatry'], ['Speech Therapy', '/speech-therapy']] },
  { title: 'Modules', links: [['Audio → Forms', '/products/point-of-care-evidence'], ['Form Engine', '/products/statutory-form-infrastructure'], ['Policy Engine', '/products/institutional-compliance-hub'], ['Blog', '/blog'], ['Pricing', '/pricing']] },
  { title: 'Company', links: [['Frameworks we support', '/frameworks'], ['Book a demo', '/start'], ['Contact sales', '/contact-sales'], ['Melamphic', '/melamphic']] },
  { title: 'Legal', links: [['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Data Processing (DPA)', '/dpa'], ['Security', '/security'], ['Cookie Policy', '/cookies']] },
];

export const GrassFooter: React.FC = () => (
  <footer style={{ background: '#fff', borderTop: '1px solid #EFEFEF', padding: '64px 0 48px', fontFamily: 'var(--g-font)' }}>
    <div className="g-container">
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr repeat(5, 1fr)', gap: 28 }} className="g-foot-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 700, fontSize: 18, color: 'var(--g-ink)' }}>
            <img src={salviaLogo} alt="" style={{ width: 30, height: 30, objectFit: 'contain' }} />
            Salvia
          </div>
          <p style={{ fontSize: 13, color: 'var(--g-ink-faint)', lineHeight: 1.6, marginTop: 12, maxWidth: 220 }}>
            The evidence layer for Indian healthcare. Audio in, sealed audit-ready records out.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--g-ink-faint)', marginBottom: 12 }}>{c.title}</div>
            {c.links.map(([label, to]) => (
              <Link key={to + label} to={to} style={{ display: 'block', fontSize: 13.5, fontWeight: 500, color: 'var(--g-ink-soft)', padding: '4px 0', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #EFEFEF', marginTop: 40, paddingTop: 20, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', fontSize: 12.5, color: 'var(--g-ink-faint)' }}>
        <span>© {new Date().getFullYear()} Melamphic AI Private Limited</span>
        <span>Made in India 🇮🇳</span>
      </div>
    </div>

    {/* സാൽവിയ — the sign-off band */}
    <div className="g-mega" aria-hidden="false">
      <img className="g-mega-sp g-mega-sp--speak" src="/illustrations/ill_speak.webp" alt="" loading="lazy" />
      <img className="g-mega-sp g-mega-sp--dog" src="/illustrations/vet_mic_dog.webp" alt="" loading="lazy" />
      <img className="g-mega-sp g-mega-sp--check" src="/illustrations/shield.webp" alt="" loading="lazy" />
      <img className="g-mega-sp g-mega-sp--fall" src="/illustrations/tpl_fall.webp" alt="" loading="lazy" />
      <img className="g-mega-sp g-mega-sp--globe" src="/illustrations/globe.webp" alt="" loading="lazy" />
      <img className="g-mega-sp g-mega-sp--doc" src="/illustrations/sp_doc.webp" alt="" loading="lazy" />
      <div className="g-mega-word">
        <img src="/illustrations/salvia_footer.webp" alt="Salvia" loading="lazy" />
      </div>
      <p className="g-mega-line">Made in Malabar, for the world.</p>
      <Link className="g-mega-corp" to="/melamphic">Melamphic AI Private Limited</Link>
    </div>

    <style>{`@media (max-width: 960px) { .g-foot-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
  </footer>
);
