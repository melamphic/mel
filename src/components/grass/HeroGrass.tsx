import React from 'react';
import { Link } from 'react-router-dom';

import { Rv } from './Rv';

// Drawn at screenshot fidelity — the workspace the laptop shows.
const Workspace: React.FC = () => (
  <div className="g-ui" aria-hidden="true">
    <div className="g-ui-bar">
      <i className="g-ui-dot" /><i className="g-ui-dot" /><i className="g-ui-dot" />
      <span className="g-ui-bar-title">Salvia — Note review</span>
      <span className="g-ui-tag" style={{ marginLeft: "auto" }}>87% aligned</span>
      <span className="g-ui-bar-pill" style={{ marginLeft: 8 }}>Draft</span>
    </div>
    <div className="g-ui-body">
      <div className="g-ui-side">
        <div className="g-ui-side-item g-ui-side-item--active">Today</div>
        <div className="g-ui-side-item">Patients</div>
        <div className="g-ui-side-item">Forms</div>
        <div className="g-ui-side-item">Policies</div>
        <div className="g-ui-side-item">Reports</div>
      </div>
      <div className="g-ui-main">
        <div className="g-ui-patient">
          <span className="g-ui-avatar">RS</span>
          <div>
            <div className="g-ui-pt-name">Ravi Sharma · 46 / M</div>
            <div className="g-ui-pt-meta">OPD follow-up · 4 Jul, 11:20 am</div>
          </div>
          <span className="g-ui-lang">hi-IN + en</span>
        </div>
        <div className="g-ui-audio">
          <div className="g-ui-wave">
            {Array.from({ length: 26 }, (_, i) => (
              <i key={i} style={{ height: 4 + ((i * 7) % 12) }} />
            ))}
          </div>
          <span className="g-ui-audio-t">0:42</span>
        </div>
        <p className="g-ui-transcript">
          "Bukhaar teen din se hai, BP 130/85… paracetamol 650 di hai, three days, review
          Monday ko…"
        </p>
        <div className="g-ui-field">
          <span className="g-ui-f-label">Chief complaint</span>
          <span className="g-ui-f-value">Fever × 3 days</span>
          <span className="g-ui-conf">AI · 98%</span>
        </div>
        <div className="g-ui-field">
          <span className="g-ui-f-label">Vitals</span>
          <span className="g-ui-f-value">BP 130/85 mmHg</span>
          <span className="g-ui-conf">AI · 97%</span>
        </div>
        <div className="g-ui-field">
          <span className="g-ui-f-label">Rx</span>
          <span className="g-ui-f-value">Paracetamol 650 mg · TDS × 3d</span>
          <span className="g-ui-conf">AI · 99%</span>
        </div>
        <div className="g-ui-field">
          <span className="g-ui-f-label">Follow-up</span>
          <span className="g-ui-f-value">Monday review</span>
          <span className="g-ui-conf">AI · 96%</span>
        </div>
        <div className="g-ui-footer">
          <span className="g-ui-policy">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="6" fill="#1E7A4E" />
              <path d="M4 6.6l1.8 1.8L9.2 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            Policy check passed · NABH consult record
          </span>
          <span className="g-ui-sign">Submit</span>
        </div>
      </div>
    </div>
  </div>
);

// The phone: live capture screen, mid-recording.
const Capture: React.FC = () => (
  <div className="g-cap" aria-hidden="true">
    <div className="g-cap-label"><i />Listening…</div>
    <div className="g-cap-name">Ravi Sharma</div>
    <div className="g-cap-meta">OPD follow-up · General Medicine</div>
    <div className="g-cap-wave">
      {Array.from({ length: 16 }, (_, i) => (
        <i key={i} style={{ animationDelay: `${(i % 5) * 0.09}s` }} />
      ))}
    </div>
    <div className="g-cap-timer">0:42</div>
    <div className="g-cap-stop" />
  </div>
);

export const HeroGrass: React.FC = () => (
  <>
    <header className="g-stage">
      {/* graphic teal checker band behind the product (mojek-style) */}
      <div className="g-checker" aria-hidden="true" />
      <div className="g-toast g-toast--l" aria-hidden="true">
        <span className="g-toast-ic">✓</span>
        <span>
          Policy check passed
          <small>OPD consult · Dr. Nair · just now</small>
        </span>
      </div>
      <div className="g-toast g-toast--r" aria-hidden="true">
        <span className="g-toast-ic">🔒</span>
        <span>
          Record sealed
          <small>Audio + policy v3.2 attached</small>
        </span>
      </div>

      <div className="g-stage-copy">
        <h1 className="g-h1">
          Every consult,
          <br />
          <span className="g-hl">on the record.</span>
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
      </div>

      {/* the product itself, in the world */}
      <div className="g-devices">
        <div className="g-laptop">
          <div className="g-laptop-screen">
            <div className="g-laptop-notch" />
            <Workspace />
          </div>
          <div className="g-laptop-base" />
        </div>
        <div className="g-phone">
          <div className="g-phone-screen">
            <Capture />
          </div>
        </div>
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
