import React from 'react';
import { Link } from 'react-router-dom';

import { INDIA_TIERS } from '../../data/pricing';
import { Rv, CountUp } from './Rv';

export const HospitalsBand: React.FC = () => (
  <div className="g-panel g-panel--cream" id="hospitals-band">
    <div className="g-container">
      <div className="g-hosp-grid">
        <div>
          <Rv as="span" className="g-kicker">
            <span className="g-dot" />
            For hospitals
          </Rv>
          <Rv as="h2" className="g-h2">
            Your HMIS runs the hospital. <span className="g-serif">Salvia defends it.</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1}>
            Not another system to migrate to. Salvia sits on top of what you have and captures
            the one thing your HMIS can't: what was actually said and done at the point of care.
          </Rv>
          <Rv className="g-hosp-point" delay={1}>
            <span className="g-t">✓</span>
            <p>
              <b>Runs alongside any HMIS</b> — no rip-and-replace, no migration project.
            </p>
          </Rv>
          <Rv className="g-hosp-point" delay={2}>
            <span className="g-t">✓</span>
            <p>
              <b>NABH-ready trail</b> — the documentation gap is the accreditation gap.
            </p>
          </Rv>
          <Rv className="g-hosp-point" delay={3}>
            <span className="g-t">✓</span>
            <p>
              <b>Per-note pricing with committed minimums</b> — never per-seat, never
              per-doctor licences.
            </p>
          </Rv>
          <Rv delay={3} style={{ marginTop: 32 }}>
            <Link className="g-btn g-btn--ink" to="/hospitals">
              How Salvia works for hospitals
            </Link>
          </Rv>
        </div>
        <Rv className="g-hosp-card" delay={2}>
          <div className="g-big">
            <i>
              <CountUp value={62} suffix="%" />
            </i>
          </div>
          <div className="g-lbl">
            of NABH non-compliances in a 2026 hospital audit study were fixable only by
            revising or creating documentation.
          </div>
          <hr />
          <div className="g-row">
            <span>Deployment</span>
            <b>On top of your HMIS</b>
          </div>
          <div className="g-row">
            <span>Pricing model</span>
            <b>Per note, committed minimum</b>
          </div>
          <div className="g-row">
            <span>Per-seat licences</span>
            <b>None, ever</b>
          </div>
          <div className="g-row">
            <span>Clinical AI model</span>
            <b>Premium tier, every note</b>
          </div>
        </Rv>
      </div>
    </div>
  </div>
);

const TIER_BLURBS: Record<string, string> = {
  base: 'For a single busy clinic getting off paper. Every feature included.',
  growth: 'For established practices where documentation volume is real.',
  unlimited: 'For multi-doctor and multi-branch groups on one shared record.',
};

export const PricingTeaserGrass: React.FC = () => (
  <section className="g-section g-center" id="pricing-teaser">
    <div className="g-container">
      <Rv as="span" className="g-kicker">
        <span className="g-dot" />
        Pricing
      </Rv>
      <Rv as="h2" className="g-h2">
        Priced per note.
        <br />
        <span className="g-serif">Not per doctor.</span>
      </Rv>
      <Rv as="p" className="g-sub" delay={1}>
        The AI is the point, so it's on every plan. Unlimited staff, always — you pay only for
        the notes you create.
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
        <Rv className="g-price g-price--dark" delay={4}>
          <h3>Hospitals</h3>
          <div className="g-amt">Custom</div>
          <div className="g-cap">Committed minimum, per note</div>
          <p>Premium clinical AI on every note, volume rates, Net-30 invoicing.</p>
          <Link className="g-btn g-btn--green" to="/hospitals">
            Talk to us
          </Link>
        </Rv>
      </div>
      <Rv className="g-price-notes" delay={3}>
        <span>Start with 50 free notes</span>
        <span>AI on every plan</span>
        <span>Unlimited staff</span>
        <span>Annual = 2 months free</span>
        <span>Prices exclude GST</span>
      </Rv>
      <Rv delay={3} style={{ marginTop: 34 }}>
        <Link className="g-btn g-btn--ghost" to="/pricing">
          Full pricing &amp; plan comparison →
        </Link>
      </Rv>
    </div>
  </section>
);

export const FinalCTAGrass: React.FC = () => (
  <section className="g-final">
    <div className="g-container">
      <Rv as="span" className="g-kicker">
        <span className="g-dot" />
        Ready when you are
      </Rv>
      <Rv as="h2" className="g-h2">
        The record you'll be
        <br />
        <span className="g-serif">glad exists.</span>
      </Rv>
      <Rv as="p" className="g-sub" delay={1} style={{ margin: '14px auto 0' }}>
        Your first 50 notes are free. Set-up takes less time than one late-night note.
      </Rv>
      <Rv className="g-hero-ctas" delay={2}>
        <Link className="g-btn g-btn--green" to="/start">
          Start free
        </Link>
        <a className="g-btn g-btn--ghost" href="#demo">
          Watch the demo
        </a>
      </Rv>
    </div>
  </section>
);
