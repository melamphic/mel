import React from 'react';
import { Link } from 'react-router-dom';

import { INDIA_TIERS } from '../../data/pricing';
import { Rv } from './Rv';

export const HospitalsBand: React.FC = () => (
  <section className="g-section" id="hospitals-band">
    <div className="g-container">
      <div className="g-split">
        <div>
          <Rv as="h2" className="g-h2">
            Your HMIS runs the hospital. <span className="g-hl">Salvia defends it.</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1}>
            Not another system to migrate to. Salvia sits on top of what you have and captures
            the one thing your HMIS can't: what was actually said and done at the point of
            care. In one 2026 audit study, <b>62% of NABH non-compliances</b> were fixable
            only by revising or creating documentation.
          </Rv>
          <Rv className="g-facts" delay={2}>
            <div className="g-fact"><span>Deployment</span><b>On top of your HMIS — no migration</b></div>
            <div className="g-fact"><span>Pricing model</span><b>Per note, committed minimum</b></div>
            <div className="g-fact"><span>Per-seat licences</span><b>None, ever</b></div>
            <div className="g-fact"><span>Clinical AI model</span><b>Premium tier, every note</b></div>
          </Rv>
          <Rv delay={3} style={{ marginTop: 30 }}>
            <Link className="g-btn g-btn--green" to="/hospitals">
              How Salvia works for hospitals
            </Link>
          </Rv>
        </div>
        <Rv className="g-split-art" delay={1}>
          <img
            src="/illustrations/ill_hospital.webp"
            alt="A hospital building protected by a shield"
            loading="lazy"
            onError={(e) => ((e.target as HTMLImageElement).src = '/illustrations/shield.webp')}
          />
        </Rv>
      </div>
    </div>
  </section>
);

const TIER_BLURBS: Record<string, string> = {
  base: 'For a single busy clinic getting off paper. Every feature included.',
  growth: 'For established practices where documentation volume is real.',
  unlimited: 'For multi-doctor and multi-branch groups on one shared record.',
};

export const PricingTeaserGrass: React.FC = () => (
  <section className="g-section g-center" id="pricing-teaser">
    <div className="g-container">
      <Rv as="h2" className="g-h2">
        Priced per note. <span className="g-hl">Not per doctor.</span>
      </Rv>
      <Rv as="p" className="g-sub" delay={1}>
        The AI is on every plan. Unlimited staff, always — you pay only for the notes you
        create. Start with 50 free notes.
      </Rv>
      <div className="g-price-grid">
        {INDIA_TIERS.map((t, i) => (
          <Rv
            className={`g-price${t.highlight ? ' g-price--pop' : ''}`}
            key={t.key}
            delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}
          >
            {t.highlight && <span className="g-pop-tag">{t.highlight}</span>}
            <h3>{t.name}</h3>
            <div className="g-amt">
              ₹{t.monthlyINR.toLocaleString('en-IN')}
              <span>/mo</span>
            </div>
            <div className="g-cap">
              {t.draftCap ? `${t.draftCap.toLocaleString('en-IN')} AI notes / month` : 'Custom volume'}
            </div>
            <p>{TIER_BLURBS[t.key]}</p>
            <Link className={`g-btn ${t.highlight ? 'g-btn--green' : 'g-btn--ghost'}`} to="/start">
              Start free
            </Link>
          </Rv>
        ))}
        <Rv className="g-price" delay={4}>
          <h3>Hospitals</h3>
          <div className="g-amt">Custom</div>
          <div className="g-cap">Committed minimum, per note</div>
          <p>Premium clinical AI on every note, volume rates, Net-30 invoicing.</p>
          <Link className="g-btn g-btn--ghost" to="/hospitals">
            Talk to us
          </Link>
        </Rv>
      </div>
      <Rv as="p" className="g-price-note" delay={3}>
        Annual billing = 2 months free · Prices exclude GST ·{' '}
        <Link to="/pricing" style={{ color: 'var(--g-green)', fontWeight: 600 }}>
          Full pricing &amp; plan comparison →
        </Link>
      </Rv>
    </div>
  </section>
);

export const FinalCTAGrass: React.FC = () => (
  <section className="g-final">
    <div className="g-container">
      <div className="g-final-grid">
        <div>
          <Rv as="h2" className="g-h2">
            The record you'll be <span className="g-hl">glad exists.</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
            Your first 50 notes are free. Set-up takes less time than one late-night note.
          </Rv>
          <Rv className="g-hero-ctas" delay={2} style={{ marginTop: 30 }}>
            <Link className="g-btn g-btn--green" to="/start">
              Start free
            </Link>
            <a className="g-btn g-btn--ghost" href="#demo">
              Watch the demo
            </a>
          </Rv>
        </div>
        <Rv className="g-final-art" delay={1}>
          <img src="/illustrations/ill_globe_india.webp" alt="A globe with a location pin on India" loading="lazy" />
        </Rv>
      </div>
    </div>
  </section>
);
