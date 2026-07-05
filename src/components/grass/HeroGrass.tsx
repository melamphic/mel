import React from 'react';
import { Link } from 'react-router-dom';

import { Rv } from './Rv';

export const HeroGrass: React.FC = () => (
  <>
    <header className="g-hero">
      <h1 className="g-h1">
        Every consult,
        <br />
        on the record.
      </h1>
      <p className="g-sub">
        Salvia listens — <b>ambient in the OPD</b> or a short <b>voice note</b> after the
        consult — and turns the audio into complete clinical documentation, checked against
        your policies. The clinician verifies. The record is sealed.{' '}
        <b>You can prove what happened.</b>
      </p>
      <div className="g-hero-ctas">
        <Link className="g-btn g-btn--green" to="/start">
          Start free — 50 notes on us
        </Link>
        <a className="g-btn g-btn--ghost" href="#demo">
          Watch the demo
        </a>
      </div>
      <p className="g-hero-note">
        No card needed · Works alongside your HMIS · Unlimited staff on every plan
      </p>
      <div className="g-hero-art">
        <img
          src="/illustrations/hero_flow.webp"
          alt="A doctor speaks; the sound becomes a completed clinical form, checked and sealed"
          loading="eager"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
      </div>
    </header>

    {/* Demo film slot — replaced with the real film when it's ready */}
    <div className="g-film-wrap" id="demo">
      <Rv className="g-film">
        <button className="g-play" aria-label="Play the Salvia demo film" />
        <span className="g-film-caption">
          From spoken word to sealed, policy-checked record — in one take.
        </span>
      </Rv>
    </div>
  </>
);
