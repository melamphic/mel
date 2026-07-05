import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Rv } from './Rv';

// Floating 3D icons — outer shell takes mouse/scroll parallax, inner takes
// the idle bob animation, so the transforms never fight each other.
const FLOATS = [
  { cls: 'g-float g-float--1', src: '/illustrations/mic.webp', depth: 1.6 },
  { cls: 'g-float g-float--2', src: '/illustrations/form.webp', depth: 1.1 },
  { cls: 'g-float g-float--3', src: '/illustrations/shield.webp', depth: 2.2 },
  { cls: 'g-float g-float--4', src: '/illustrations/policy.webp', depth: 1.9 },
];

const H1_LINE1 = ['Every', 'consult,'];

const MARQUEE = [
  'OPD consults', 'IP rounds', 'Discharge summaries', 'Consent forms', 'Drug registers',
  'Incident reports', 'Vaccination records', 'NABH audit prep', 'Insurance claims', 'Referral letters',
];

export const HeroGrass: React.FC = () => {
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const tiles = Array.from(wrap.querySelectorAll<HTMLElement>('.g-float'));
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          tiles.forEach((t, i) => t.style.setProperty('--g-sy', `${y * (0.08 + i * 0.05)}px`));
        }
      });
    };
    const onPointer = (e: PointerEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      wrap.style.setProperty('--g-mx', `${((e.clientX - w / 2) / w) * -22}px`);
      wrap.style.setProperty('--g-my', `${((e.clientY - h / 2) / h) * -14}px`);
    };

    // Word-by-word headline entrance.
    wrap.querySelectorAll<HTMLElement>('.g-word').forEach((el, i) => {
      el.style.animationDelay = `${0.12 + i * 0.09}s`;
      el.classList.add('g-word-in');
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header className="g-hero g-grain" ref={wrapRef}>
        <div className="g-hero-atmo" aria-hidden="true" />
        {FLOATS.map((f) => (
          <div key={f.src} className={f.cls} style={{ ['--g-depth' as string]: f.depth }} aria-hidden="true">
            <div className="g-float-inner">
              <img src={f.src} alt="" loading="eager" />
            </div>
          </div>
        ))}
        <div className="g-hero-inner">
          <span className="g-eyebrow">
            <span className="g-dot" />
            AI clinical documentation &amp; compliance · built for India
          </span>
          <h1 className="g-h1">
            {H1_LINE1.map((w, i) => (
              <React.Fragment key={w}>
                <span className="g-word">{w}</span>
                {i < H1_LINE1.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
            <br />
            <span className="g-word g-serif">on the record.</span>
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
              ▶&nbsp; Watch the demo
            </a>
          </div>
          <p className="g-hero-note">
            No card needed · Works alongside your HMIS · Unlimited staff on every plan
          </p>
        </div>
      </header>

      {/* Demo film slot — replaced with the real film when it's ready */}
      <div className="g-film-wrap" id="demo">
        <Rv className="g-film">
          <div className="g-film-atmo" />
          <button className="g-play" aria-label="Play the Salvia demo film" />
          <span className="g-film-chip">Demo film</span>
          <span className="g-film-caption">
            From spoken word to sealed, policy-checked record — in one take.
          </span>
        </Rv>
      </div>

      {/* Register marquee — the paperwork universe Salvia covers */}
      <div className="g-marquee" aria-hidden="true">
        <div className="g-marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span className="g-chip" key={`${m}-${i}`}>
              <em>●</em> {m}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
